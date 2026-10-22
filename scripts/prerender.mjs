// Runs after `vite build`: writes a static HTML file for every page, plus
// 404.html and sitemap.xml, so search engines can read each page directly.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const { ROUTES, NOT_FOUND, SITE_URL, href, render, jsonLd } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
);

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function replaceOnce(html, pattern, replacement) {
  const found = typeof pattern === 'string' ? html.includes(pattern) : pattern.test(html);
  if (!found) throw new Error(`Template is missing ${pattern}`);
  // Plain-string replacements are inserted literally (no "$" substitutions).
  return typeof pattern === 'string' ? html.replace(pattern, () => replacement) : html.replace(pattern, replacement);
}

function buildPage(routePath, meta, { notFound = false } = {}) {
  const url = SITE_URL + href(routePath);
  const title = escapeAttr(meta.title);
  const description = escapeAttr(meta.description);
  let html = template;
  html = replaceOnce(html, /<title>[^<]*<\/title>/, `<title>${title}</title>`);
  html = replaceOnce(html, /(<meta name="description" content=")[^"]*(")/, `$1${description}$2`);
  html = replaceOnce(html, /(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`);
  html = replaceOnce(html, /(<meta property="og:description" content=")[^"]*(")/, `$1${description}$2`);
  html = replaceOnce(html, /(<meta name="twitter:title" content=")[^"]*(")/, `$1${title}$2`);
  html = replaceOnce(html, /(<meta name="twitter:description" content=")[^"]*(")/, `$1${description}$2`);
  if (notFound) {
    html = replaceOnce(html, /\s*<link rel="canonical"[^>]*>/, '');
    html = replaceOnce(html, /\s*<meta property="og:url"[^>]*>/, '');
    html = html.replace('</head>', '  <meta name="robots" content="noindex" />\n  </head>');
    html = replaceOnce(html, '<div id="app"></div>', `<div id="app">${render('/404')}</div>`);
  } else {
    html = replaceOnce(html, /(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
    html = replaceOnce(html, /(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`);
    const ld = jsonLd(routePath);
    if (ld) html = replaceOnce(html, '</head>', `  ${ld}\n  </head>`);
    html = replaceOnce(html, '<div id="app"></div>', `<div id="app" data-path="${routePath}">${render(routePath)}</div>`);
  }
  return html;
}

for (const [routePath, meta] of Object.entries(ROUTES)) {
  const outDir = routePath === '/' ? dist : path.join(dist, routePath);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), buildPage(routePath, meta));
  console.log(`prerendered ${href(routePath)}`);
}

fs.writeFileSync(path.join(dist, '404.html'), buildPage('/404', NOT_FOUND, { notFound: true }));
console.log('prerendered 404.html');

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Object.keys(ROUTES).map(p => `  <url>
    <loc>${SITE_URL}${href(p)}</loc>
    <lastmod>${today}</lastmod>
  </url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
console.log('wrote sitemap.xml');

fs.rmSync(ssrDir, { recursive: true, force: true });
