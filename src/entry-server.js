// Build-time entry used by scripts/prerender.mjs to generate static HTML.
import vickyPortrait from './img/vicky.webp';
import { BOOKS } from './data.js';
import { ROUTES, NOT_FOUND, SITE_URL, href, renderApp } from './views.js';

export { ROUTES, NOT_FOUND, SITE_URL, href };

const absolute = (url) => (url.startsWith('http') ? url : SITE_URL + url);

const PERSON = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Vicky Chong',
  url: `${SITE_URL}/`,
  image: absolute(vickyPortrait),
  jobTitle: 'Author',
  nationality: { '@type': 'Country', name: 'Singapore' },
  award: '2018 Nick Joaquin Literary Awards Asia-Pacific',
};

// Structured data (schema.org) for each page.
export function jsonLd(path) {
  const graph = [];
  if (path === '/') {
    graph.push(
      { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: 'Vicky Chong', publisher: { '@id': `${SITE_URL}/#person` } },
      PERSON,
    );
  }
  if (path === '/about') {
    graph.push({ '@type': 'ProfilePage', url: `${SITE_URL}/about/`, mainEntity: PERSON });
  }
  if (path === '/books') {
    graph.push({
      '@type': 'ItemList',
      name: 'Books and short stories by Vicky Chong',
      itemListElement: BOOKS.map((book, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': book.coverImage ? 'Book' : 'ShortStory',
          name: book.title,
          author: { '@id': `${SITE_URL}/#person`, '@type': 'Person', name: 'Vicky Chong' },
          datePublished: book.year,
          description: book.description,
          ...(book.coverImage ? { image: absolute(book.coverImage) } : {}),
          ...(book.readUrl || book.purchaseUrl ? { url: absolute(book.readUrl || book.purchaseUrl) } : {}),
        },
      })),
    });
  }
  if (!graph.length) return '';
  // Escape "<" so the JSON can never close the <script> tag early.
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
  return `<script type="application/ld+json">${json}</script>`;
}

export function render(path) {
  return renderApp({ path, filter: null, isMobileMenuOpen: false, selectedBook: null });
}
