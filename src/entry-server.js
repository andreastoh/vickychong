// Build-time entry used by scripts/prerender.mjs to generate static HTML.
import vickyPortrait from './img/vicky.webp';
import { BOOKS, MEDIA } from './data.js';
import { ROUTES, NOT_FOUND, SITE_URL, href, renderApp } from './views.js';

export { ROUTES, NOT_FOUND, SITE_URL, href };

const absolute = (url) => (url.startsWith('http') ? url : SITE_URL + url);

const PERSON_REF = { '@id': `${SITE_URL}/#person` };

const PERSON = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Vicky Chong',
  url: `${SITE_URL}/`,
  image: absolute(vickyPortrait),
  description: 'Singaporean author of short fiction, including the collection Racket and Other Stories (Penguin Random House SEA, 2021).',
  jobTitle: 'Author',
  nationality: { '@type': 'Country', name: 'Singapore' },
  award: '2018 Nick Joaquin Literary Awards Asia-Pacific',
  // Her profiles on other sites. These help Google tie the pages together as one author.
  sameAs: [
    'https://www.goodreads.com/author/show/21725452.Vicky_Chong',
    'https://penguin.sg/book_author/vicky-chong/',
  ],
};

// Interviews, podcasts and articles about her, as listed on the Media page.
// (Videos stay generic: Google's VideoObject requires a thumbnail and upload date we don't have.)
const MEDIA_TYPES = { Article: 'Article', Podcast: 'PodcastEpisode' };

// Structured data (schema.org) for each page.
export function jsonLd(path) {
  const graph = [];
  if (path === '/') {
    graph.push(
      { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: 'Vicky Chong', inLanguage: 'en-SG', publisher: PERSON_REF },
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
          // She wrote single-author books outright; in anthologies she is one of several contributors.
          [book.category === 'Anthology' ? 'contributor' : 'author']: { ...PERSON_REF, '@type': 'Person', name: 'Vicky Chong' },
          datePublished: book.year,
          description: book.description,
          ...(book.isbn ? { isbn: book.isbn } : {}),
          ...(book.publisher ? { publisher: { '@type': 'Organization', name: book.publisher } } : {}),
          ...(book.coverImage ? { image: absolute(book.coverImage) } : {}),
          ...(book.readUrl || book.purchaseUrl ? { url: absolute(book.readUrl || book.purchaseUrl) } : {}),
        },
      })),
    });
  }
  if (path === '/media') {
    graph.push({
      '@type': 'ItemList',
      name: 'Interviews, podcasts and press featuring Vicky Chong',
      itemListElement: MEDIA.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': MEDIA_TYPES[item.type] || 'CreativeWork',
          name: item.title,
          description: item.description,
          url: absolute(item.link),
          publisher: { '@type': 'Organization', name: item.source },
          about: PERSON_REF,
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
