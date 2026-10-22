import './style.css';
import { BOOKS, ESSAYS } from './data.js';
import { ROUTES, NOT_FOUND, href, normalizePath, isKnownRoute, renderApp } from './views.js';

// Redirect old hash URLs (e.g. /#/books) to the real page URL (/books/).
if (window.location.hash.startsWith('#/')) {
  const legacyPath = normalizePath(window.location.hash.slice(1));
  window.history.replaceState({}, '', href(legacyPath) + window.location.search);
}

const state = {
  path: normalizePath(window.location.pathname),
  filter: new URLSearchParams(window.location.search).get('filter'),
  isMobileMenuOpen: false,
  selectedBook: null,
};

const app = document.getElementById('app');

function updateHead() {
  const meta = isKnownRoute(state.path) ? ROUTES[state.path] : NOT_FOUND;
  document.title = meta.title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
}

function render() {
  app.innerHTML = renderApp(state);
  updateHead();
  attachEventListeners();
  if (state.selectedBook) document.getElementById('modal-close')?.focus();
}

function navigate(path) {
  state.isMobileMenuOpen = false;
  state.selectedBook = null;
  if (path !== state.path || state.filter) {
    state.path = path;
    state.filter = null;
    window.history.pushState({}, '', href(path));
  }
  render();
  window.scrollTo(0, 0);
}

window.addEventListener('popstate', () => {
  state.path = normalizePath(window.location.pathname);
  state.filter = new URLSearchParams(window.location.search).get('filter');
  state.selectedBook = null;
  render();
});

function openModal(book) {
  state.selectedBook = book;
  render();
}

function closeModal() {
  const id = state.selectedBook?.id;
  state.selectedBook = null;
  render();
  // Return keyboard focus to the button that opened the excerpt.
  if (id) document.querySelector(`.excerpt-btn[data-id="${id}"]`)?.focus();
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && state.selectedBook) closeModal();
});

function attachEventListeners() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.onclick = (e) => {
      // Let the browser handle new-tab / new-window clicks.
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      navigate(link.getAttribute('data-path'));
    };
  });

  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  if (mobileMenuToggle) {
    mobileMenuToggle.onclick = () => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
      render();
      document.getElementById('mobile-menu-toggle')?.focus();
    };
  }

  document.querySelectorAll('.excerpt-btn').forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-id');
      const book = BOOKS.find(b => b.id === id) || ESSAYS.find(e => e.id === id);
      if (book) openModal(book);
    };
  });

  ['modal-close', 'modal-close-btn', 'modal-overlay'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.onclick = closeModal;
  });

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.onclick = () => {
      state.filter = btn.getAttribute('data-filter');
      const url = new URL(window.location);
      url.searchParams.set('filter', state.filter);
      window.history.pushState({}, '', url);
      render();
    };
  });
}

// Pages are pre-rendered at build time. If the HTML already matches the
// current URL, just wire up the buttons; otherwise render in the browser.
if (app.firstElementChild && !state.filter && app.dataset.path === state.path) {
  attachEventListeners();
} else {
  render();
}
