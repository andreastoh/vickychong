import { BOOKS, ESSAYS, EVENTS, PAST_ENGAGEMENTS, ACHIEVEMENTS, MEDIA } from './data.js';

const vickyPortrait = 'src/img/vicky.png';

// Router state
let currentPath = window.location.hash || '#/';

// Modal state
let selectedBook = null;

// Icons (Lucide-like SVG strings)
const ICONS = {
  ArrowRight: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
  ShoppingBag: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
  Menu: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>',
  X: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
  Calendar: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>',
  MapPin: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  ExternalLink: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>',
  BookOpen: '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
  Newspaper: '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>',
  Globe: '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',
  Mic: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>',
  Video: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>',
  Award: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/></svg>'
};

// Helper to render icons
function icon(name) {
  return ICONS[name] || '';
}

// Navigation
function navigate(path) {
  currentPath = path;
  window.location.hash = path;
  render();
  window.scrollTo(0, 0);
}

window.onhashchange = () => {
  currentPath = window.location.hash || '#/';
  render();
};

// Modal functions
function openModal(book) {
  selectedBook = book;
  render();
}

function closeModal() {
  selectedBook = null;
  render();
}

// Components
function Navbar() {
  const navLinks = [
    { name: 'Books', path: '#/books' },
    { name: 'Events', path: '#/events' },
    { name: 'Media', path: '#/media' },
    { name: 'About', path: '#/about' },
  ];

  const isMobileMenuOpen = document.getElementById('mobile-menu')?.classList.contains('hidden') === false;

  return `
    <nav class="fixed top-0 w-full z-50 glass-nav transition-colors duration-300 border-b border-outline-variant/10">
      <div class="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        <a href="#/" class="font-headline italic text-2xl font-bold text-on-surface tracking-tight nav-link hover:text-primary transition-colors duration-300" data-path="#/">
          Vicky Chong
        </a>

        <div class="hidden md:flex items-center space-x-8">
          ${navLinks.map(link => `
            <a href="${link.path}" class="font-headline text-lg tracking-tight transition-colors hover:text-primary nav-link ${currentPath === link.path ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant'}" data-path="${link.path}">
              ${link.name}
            </a>
          `).join('')}
        </div>

        <button id="mobile-menu-toggle" class="md:hidden text-on-surface">
          ${isMobileMenuOpen ? icon('X') : icon('Menu')}
        </button>
      </div>

      <div id="mobile-menu" class="hidden md:hidden bg-surface border-b border-outline-variant/10 px-8 py-6 space-y-4">
        ${navLinks.map(link => `
          <a href="${link.path}" class="block font-headline text-xl nav-link ${currentPath === link.path ? 'text-primary' : 'text-on-surface-variant'}" data-path="${link.path}">
            ${link.name}
          </a>
        `).join('')}
      </div>
    </nav>
  `;
}

function Footer() {
  return `
    <footer class="bg-surface-container-low py-16 px-12 border-t border-outline-variant/10">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div class="text-center md:text-left">
          <a href="#/" class="font-headline text-2xl italic font-bold text-on-surface block mb-2 nav-link hover:text-primary transition-colors duration-300" data-path="#/">
            Vicky Chong
          </a>
          <p class="font-body text-sm text-on-surface-variant uppercase tracking-widest">
            © 2026 Vicky Chong. All Rights Reserved.
          </p>
        </div>

        <div class="flex flex-wrap justify-center md:justify-end gap-8 font-label text-sm tracking-wide uppercase">
          <a href="#/books" class="text-on-surface-variant hover:text-primary transition-colors nav-link" data-path="#/books">Books</a>
          <a href="#/events" class="text-on-surface-variant hover:text-primary transition-colors nav-link" data-path="#/events">Events</a>
          <a href="#/media" class="text-on-surface-variant hover:text-primary transition-colors nav-link" data-path="#/media">Media</a>
          <a href="#/about" class="text-on-surface-variant hover:text-primary transition-colors nav-link" data-path="#/about">About</a>
        </div>
      </div>
    </footer>
  `;
}

function Modal() {
  if (!selectedBook) return '';

  return `
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-on-surface/40 backdrop-blur-sm fade-in" id="modal-overlay"></div>
      <div class="relative w-full max-w-2xl bg-surface p-8 md:p-12 shadow-2xl overflow-hidden slide-up">
        <button id="modal-close" class="absolute top-6 right-6 text-on-surface-variant hover:text-primary transition-colors">
          ${icon('X')}
        </button>
        
        <div class="space-y-6">
          <div class="space-y-2">
            <span class="font-label text-xs uppercase tracking-widest text-primary font-bold">Excerpt From</span>
            <h2 class="font-headline text-3xl font-bold text-on-surface">${selectedBook.title}</h2>
          </div>
          
          <div class="w-12 h-1 bg-primary"></div>
          
          <div class="font-body text-lg text-on-surface-variant leading-relaxed italic max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
            "${selectedBook.excerpt}"
          </div>
          
          <div class="pt-4">
            <button id="modal-close-btn" class="bg-primary text-white px-8 py-3 rounded-sm font-label text-xs uppercase tracking-widest hover:bg-primary-container transition-all active:scale-95">
              Close Reader
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function HomePage() {
  const latestRelease = BOOKS.find(b => b.featured) || BOOKS[0];
  const latestWorks = BOOKS.slice(1, 4);

  const titleParts = latestRelease.title.split(' ');
  const titleMain = titleParts.slice(0, -3).join(' ');
  const titleItalic = titleParts.slice(-3).join(' ');

  return `
    <div class="pt-24 fade-in">
      <section class="relative min-h-[80vh] flex items-center px-8 md:px-16 overflow-hidden">
        <div class="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div class="lg:col-span-7 z-10 space-y-8">
            <div class="space-y-4">
              <span class="font-label text-sm uppercase tracking-[0.2em] text-primary font-semibold">Latest Release</span>
              <h1 class="font-headline text-5xl md:text-7xl font-bold leading-tight text-on-surface">
                ${titleMain} <br/>
                <span class="italic text-primary">${titleItalic}</span>
              </h1>
              <p class="font-headline text-xl text-on-surface-variant max-w-xl leading-relaxed italic">
                ${latestRelease.description}
              </p>
            </div>
            <div class="flex flex-wrap gap-6 pt-4">
              ${latestRelease.readUrl ? `
                <a href="${latestRelease.readUrl}" target="_blank" rel="noopener noreferrer" class="bg-primary text-white px-10 py-4 rounded-sm font-label text-sm uppercase tracking-widest hover:bg-primary-container transition-all flex items-center gap-3 active:scale-95">
                  Read Online ${icon('ArrowRight')}
                </a>
              ` : latestRelease.purchaseUrl ? `
                <a href="${latestRelease.purchaseUrl}" target="_blank" rel="noopener noreferrer" class="bg-primary text-white px-10 py-4 rounded-sm font-label text-sm uppercase tracking-widest hover:bg-primary-container transition-all flex items-center gap-3 active:scale-95">
                  Order Now ${icon('ShoppingBag')}
                </a>
              ` : `
                <button class="bg-primary text-white px-10 py-4 rounded-sm font-label text-sm uppercase tracking-widest hover:bg-primary-container transition-all flex items-center gap-3 active:scale-95">
                  Order Now ${icon('ShoppingBag')}
                </button>
              `}
              <button class="border border-outline-variant/30 text-primary px-10 py-4 rounded-sm font-label text-sm uppercase tracking-widest hover:bg-surface-container-low transition-all active:scale-95 excerpt-btn" data-id="${latestRelease.id}">
                Read Excerpt
              </button>
            </div>
          </div>

          <div class="lg:col-span-5 relative">
            <div class="relative z-10 w-full aspect-[3/4] max-w-md mx-auto bg-surface-container-high shadow-[0_20px_40px_rgba(90,65,56,0.12)] p-4 flex items-center justify-center">
              <img src="${latestRelease.coverImage}" alt="${latestRelease.title}" class="max-w-full max-h-full object-contain book-shadow" referrerPolicy="no-referrer" />
            </div>
            <div class="absolute top-12 -right-12 w-full h-full bg-surface-container-low -z-0"></div>
          </div>
        </div>
      </section>

      <section class="py-24 bg-surface-container-low">
        <div class="max-w-7xl mx-auto px-8 md:px-16">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div class="relative">
              <div class="aspect-square bg-surface-container-high overflow-hidden">
                <img src="${vickyPortrait}" alt="Vicky Chong Portrait" class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
            </div>
            <div class="space-y-6">
              <h2 class="font-headline text-4xl font-bold text-on-surface">The Voice Behind the Words</h2>
              <div class="w-12 h-1 bg-primary"></div>
              <p class="font-body text-lg text-on-surface-variant leading-relaxed">
                Vicky Chong is a Singaporean author whose work delves into the nuances of domestic life and the historical echoes of Southeast Asia. Her narratives are celebrated for their lyrical precision and emotional depth.
              </p>
              <p class="font-body text-lg text-on-surface-variant leading-relaxed">
                With multiple short stories published in international journals and a burgeoning collection of novels, Vicky continues to explore the intersections of tradition and modernity through the lens of the everyday.
              </p>
              <a href="#/about" class="inline-flex items-center gap-2 font-label text-sm uppercase tracking-widest text-primary font-bold group nav-link" data-path="#/about">
                Full Biography <span class="group-hover:translate-x-1 transition-transform">${icon('ArrowRight')}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section class="py-32 bg-surface">
        <div class="max-w-7xl mx-auto px-8 md:px-16">
          <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div class="space-y-4">
              <span class="font-label text-sm uppercase tracking-[0.2em] text-primary font-semibold">Curated Collection</span>
              <h2 class="font-headline text-4xl font-bold text-on-surface">Latest Works & Short Stories</h2>
            </div>
            <a href="#/books" class="font-label text-sm uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors pb-1 border-b border-outline-variant/30 nav-link" data-path="#/books">
              View All Publications
            </a>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            ${latestWorks.map(book => `
              <div class="group">
                <div class="bg-surface-container-lowest p-8 mb-6 transition-all duration-300 group-hover:-translate-y-2 h-full flex flex-col">
                  ${book.coverImage ? `
                    <div class="aspect-[2/3] bg-surface-container-high shadow-sm mb-8 overflow-hidden flex items-center justify-center p-4">
                      <img src="${book.coverImage}" alt="${book.title}" class="max-w-full max-h-full object-contain book-shadow" referrerPolicy="no-referrer" />
                    </div>
                  ` : `
                    <div class="aspect-[2/3] bg-surface-container-high shadow-sm mb-8 flex flex-col items-center justify-center p-4 border border-outline-variant/10 italic text-on-surface-variant text-sm">
                      ${icon('BookOpen')}
                      <span class="mt-2">Short Story</span>
                    </div>
                  `}
                  <span class="font-label text-[10px] uppercase tracking-widest text-primary font-bold">${book.category}</span>
                  <h3 class="font-headline text-2xl font-bold text-on-surface mb-2 mt-1">${book.title}</h3>
                  <p class="font-body text-sm text-on-surface-variant mb-6">${book.description}</p>
                  
                  <div class="mt-auto flex flex-col gap-3">
                    ${book.readUrl ? `
                      <a href="${book.readUrl}" target="_blank" rel="noopener noreferrer" class="text-primary font-label text-[10px] uppercase tracking-widest font-bold hover:underline underline-offset-4 w-fit">
                        Read Online
                      </a>
                    ` : ''}
                    ${book.purchaseUrl && !book.title.includes('SAMPAN') ? `
                      <a href="${book.purchaseUrl}" target="_blank" rel="noopener noreferrer" class="text-primary font-label text-[10px] uppercase tracking-widest font-bold hover:underline underline-offset-4 w-fit">
                        Purchase
                      </a>
                    ` : ''}
                    ${book.excerpt ? `
                      <button class="text-on-surface-variant font-label text-[10px] uppercase tracking-widest font-bold hover:underline underline-offset-4 w-fit excerpt-btn" data-id="${book.id}">
                        Read Excerpt
                      </button>
                    ` : ''}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <section class="py-32 bg-surface-container-low overflow-hidden">
        <div class="max-w-7xl mx-auto px-8 md:px-16">
          <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div class="space-y-4">
              <span class="font-label text-sm uppercase tracking-[0.2em] text-primary font-semibold">Media & Press</span>
              <h2 class="font-headline text-4xl font-bold text-on-surface">Featured Showcases</h2>
            </div>
            <a href="#/media" class="font-label text-sm uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors pb-1 border-b border-outline-variant/30 nav-link" data-path="#/media">
              All Media Appearances
            </a>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${MEDIA.filter(item => item.featured).map(item => `
              <div class="bg-surface p-8 border border-outline-variant/10 flex flex-col h-full group hover:bg-white transition-all duration-300">
                <div class="flex justify-between items-start mb-6">
                  <div class="text-primary/40 group-hover:text-primary transition-colors">
                    ${icon(item.icon)}
                  </div>
                  <span class="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">${item.type}</span>
                </div>
                <h3 class="font-headline text-xl text-on-surface mb-4 group-hover:text-primary transition-colors">${item.title}</h3>
                <p class="font-body text-sm text-on-surface-variant leading-relaxed mb-8 line-clamp-2">${item.description}</p>
                <div class="mt-auto pt-6 border-t border-outline-variant/10 flex justify-between items-center">
                  <span class="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">${item.source}</span>
                  <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="text-primary">
                    ${icon('ExternalLink')}
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    </div>
  `;
}

function BooksPage() {
  // Simple filter logic
  const hashParts = window.location.hash.split('?');
  const urlParams = new URLSearchParams(hashParts[1] || '');
  const filter = urlParams.get('filter') || 'All Works';
  const categories = ['All Works', 'Fiction', 'Essays', 'Anthologies'];

  const filteredBooks = filter === 'All Works' 
    ? BOOKS 
    : (filter === 'Essays' ? [] : BOOKS.filter(b => b.category === filter || (filter === 'Anthologies' && b.category === 'Anthology')));

  const featuredBooks = filteredBooks.slice(0, 2);
  const otherBooks = filteredBooks.slice(2);

  const filteredEssays = (filter === 'All Works' || filter === 'Essays') ? ESSAYS : [];

  return `
    <div class="pt-24 pb-20 fade-in">
      <header class="max-w-7xl mx-auto px-8 py-16">
        <h1 class="font-headline text-5xl md:text-7xl text-on-surface leading-tight mb-4">
          The Published <br/><span class="italic text-primary">Collections</span>
        </h1>
        <p class="font-body text-lg text-on-surface-variant max-w-2xl leading-relaxed">
          Explore the literary world of Vicky Chong. From poignant short story collections to sweeping narratives, discover stories that linger long after the final page.
        </p>
      </header>

      <section class="bg-surface-container-low py-6 mb-16">
        <div class="max-w-7xl mx-auto px-8 flex gap-8 items-center overflow-x-auto whitespace-nowrap scrollbar-hide">
          <span class="font-label text-xs uppercase tracking-widest text-on-surface-variant">Filter By:</span>
          ${categories.map(cat => `
            <button class="font-label text-sm transition-colors filter-btn ${filter === cat ? 'font-semibold text-primary' : 'text-on-surface-variant hover:text-on-surface'}" data-filter="${cat}">
              ${cat}
            </button>
          `).join('')}
        </div>
      </section>

      <section class="max-w-7xl mx-auto px-8">
        ${featuredBooks.length > 0 ? `
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-24">
            ${featuredBooks.map((book, idx) => `
              <article class="flex flex-col md:flex-row gap-12 items-start">
                ${book.coverImage ? `
                  <div class="w-full md:w-1/2 relative group ${idx % 2 !== 0 ? 'lg:order-2' : ''}">
                    <div class="absolute -inset-4 bg-surface-container-high -z-10 transform ${idx % 2 === 0 ? 'rotate-2' : '-rotate-1'}"></div>
                    <div class="aspect-[3/4] bg-surface-container-low flex items-center justify-center p-6 shadow-sm">
                      <img src="${book.coverImage}" alt="${book.title}" class="max-w-full max-h-full object-contain book-shadow transition-transform duration-500 group-hover:-translate-y-2" referrerPolicy="no-referrer" />
                    </div>
                  </div>
                ` : ''}
                <div class="w-full ${book.coverImage ? 'md:w-1/2' : 'max-w-3xl mx-auto'} pt-4 ${book.coverImage && idx % 2 !== 0 ? 'lg:order-1 lg:text-right' : ''}">
                  <span class="font-label text-xs uppercase tracking-widest text-secondary font-semibold">${book.category} • ${book.year}</span>
                  <h2 class="font-headline text-4xl text-on-surface mt-4 mb-6 leading-tight">${book.title}</h2>
                  <p class="font-body text-on-surface-variant leading-relaxed mb-8">${book.description}</p>
                  <div class="flex flex-col gap-4 ${idx % 2 !== 0 ? 'md:flex-row-reverse justify-start' : 'md:flex-row'}">
                    ${book.readUrl ? `
                      <a href="${book.readUrl}" target="_blank" rel="noopener noreferrer" class="w-full md:w-fit bg-primary text-white px-8 py-3 rounded-sm font-label text-sm uppercase tracking-widest hover:bg-primary-container transition-all text-center">
                        Read Online
                      </a>
                    ` : book.purchaseUrl ? `
                      <a href="${book.purchaseUrl}" target="_blank" rel="noopener noreferrer" class="w-full md:w-fit bg-primary text-white px-8 py-3 rounded-sm font-label text-sm uppercase tracking-widest hover:bg-primary-container transition-all text-center">
                        Purchase Copy
                      </a>
                    ` : `
                      <button class="w-full md:w-fit bg-primary text-white px-8 py-3 rounded-sm font-label text-sm uppercase tracking-widest hover:bg-primary-container transition-all">
                        Purchase Copy
                      </button>
                    `}
                    ${book.excerpt ? `
                      <button class="w-full md:w-fit border border-outline-variant/20 text-primary px-8 py-3 rounded-sm font-label text-sm uppercase tracking-widest hover:bg-surface-container-low transition-all excerpt-btn" data-id="${book.id}">
                        Read Excerpt
                      </button>
                    ` : ''}
                  </div>
                </div>
              </article>
            `).join('')}
          </div>
        ` : ''}

        ${otherBooks.length > 0 ? `
          <div class="mt-32">
            <h3 class="font-headline text-3xl text-on-surface mb-12 flex items-center gap-4">
              Other Publications
              <span class="h-[1px] bg-outline-variant flex-grow opacity-30"></span>
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              ${otherBooks.map(book => `
                <div class="bg-surface-container-lowest p-8 flex flex-col items-center text-center h-full">
                  ${book.coverImage ? `
                    <div class="w-full aspect-[2/3] bg-surface-container-low mb-8 flex items-center justify-center p-4 shadow-sm overflow-hidden">
                      <img src="${book.coverImage}" alt="${book.title}" class="max-w-full max-h-full object-contain book-shadow transition-transform hover:scale-[1.02]" referrerPolicy="no-referrer" />
                    </div>
                  ` : `
                    <div class="w-full aspect-[2/3] bg-surface-container-low mb-8 flex flex-col items-center justify-center p-4 shadow-sm border border-outline-variant/10 italic text-on-surface-variant text-sm">
                      ${icon('BookOpen')}
                      <span class="mt-2">Short Story</span>
                    </div>
                  `}
                  <span class="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2">${book.category}</span>
                  <h4 class="font-headline text-xl text-on-surface mb-4 flex-grow">${book.title}</h4>
                  <div class="flex flex-col gap-2 mt-auto">
                    ${book.readUrl ? `
                      <a href="${book.readUrl}" target="_blank" rel="noopener noreferrer" class="text-primary font-label text-xs uppercase tracking-widest font-semibold hover:underline underline-offset-4">
                        Read
                      </a>
                    ` : book.purchaseUrl ? `
                      <a href="${book.purchaseUrl}" target="_blank" rel="noopener noreferrer" class="text-primary font-label text-xs uppercase tracking-widest font-semibold hover:underline underline-offset-4">
                        Purchase
                      </a>
                    ` : `
                      <button class="text-primary font-label text-xs uppercase tracking-widest font-semibold hover:underline underline-offset-4">Purchase</button>
                    `}
                    ${book.excerpt ? `
                      <button class="text-secondary font-label text-xs uppercase tracking-widest font-semibold hover:underline underline-offset-4 excerpt-btn" data-id="${book.id}">
                        Read Excerpt
                      </button>
                    ` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        ${filteredEssays.length > 0 ? `
          <div class="mt-32 pb-24">
            <h3 class="font-headline text-3xl text-on-surface mb-12 flex items-center gap-4">
              Essays & Commentary
              <span class="h-[1px] bg-outline-variant flex-grow opacity-30"></span>
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
              ${filteredEssays.map(essay => `
                <div class="bg-surface-container-low p-10 border-l-4 border-primary group hover:bg-surface-container-high transition-all duration-300">
                  <h4 class="font-headline text-2xl text-on-surface mb-4 group-hover:text-primary transition-colors">${essay.title}</h4>
                  <p class="font-body text-on-surface-variant mb-8 leading-relaxed">${essay.description}</p>
                  <div class="flex gap-6">
                    <a href="${essay.readUrl}" target="_blank" rel="noopener noreferrer" class="font-label text-xs uppercase tracking-widest font-bold text-primary hover:underline underline-offset-8">
                      Read Essay
                    </a>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </section>
    </div>
  `;
}

function EventsPage() {
  const featuredEvent = EVENTS[0];
  const upcomingSchedule = EVENTS.slice(1);

  return `
    <div class="pt-32 pb-24 fade-in">
      <header class="max-w-7xl mx-auto px-8 mb-24">
        <div class="grid grid-cols-12 gap-8">
          <div class="col-span-12 md:col-span-8">
            <h1 class="font-headline text-6xl md:text-8xl font-bold tracking-tighter text-on-surface mb-8">
              Gatherings <span class="italic font-normal text-primary">& Conversations</span>
            </h1>
            <p class="font-body text-xl text-on-surface-variant max-w-2xl leading-relaxed">
              Join Vicky Chong for live readings, literary workshops, and intimate discussions on the craft of storytelling. From local bookshops to international festivals.
            </p>
          </div>
        </div>
      </header>

      ${featuredEvent ? `
      <section class="max-w-7xl mx-auto px-8 mb-32">
        <div class="relative bg-surface-container-high p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center">
          <div class="w-full md:w-1/2 aspect-[4/5] relative overflow-hidden group">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFDwpG1vWFyc1qlW9VUICmGs6o4drhsHl2myM-WKm01gLzeBnz-UpPpYVGz1Ja4RCNlRnmQSgMbRUj4G7eLqUQKW2fw9KSf3N235btpTaHpeusXc61YqebDc2w573xIJb9iF1ci-OcC3_9pX2Eeothvm3FncT30Q8-1TKsHX6GIYAW9CZ5jNVcu7CkGryAesOfjwlxtedM3mm-BXsftHtT-_EZ1VQ-0R1eTHW-e-bEHZNRp7TiMoXgC3GD3AIuWyp11_O3xuRytIiC" alt="Literary event space" class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
            <div class="absolute top-6 left-6 bg-primary text-white px-4 py-2 font-label font-semibold tracking-widest uppercase text-xs">
              Next Appearance
            </div>
          </div>
          <div class="w-full md:w-1/2 space-y-6">
            <div class="flex items-center gap-4 text-primary font-label font-medium tracking-wide">
              ${icon('Calendar')}
              <span>${featuredEvent.date}</span>
            </div>
            <h2 class="font-headline text-4xl md:text-5xl font-bold leading-tight">${featuredEvent.title}</h2>
            <p class="font-body text-lg text-on-surface-variant leading-relaxed">
              ${featuredEvent.description}
            </p>
            <div class="flex items-center gap-3 text-on-surface-variant mb-8">
              ${icon('MapPin')}
              <span class="font-body">${featuredEvent.location}</span>
            </div>
            <button class="bg-primary hover:bg-primary-container text-white px-8 py-4 rounded-sm transition-all duration-300 font-label font-semibold uppercase tracking-widest text-sm flex items-center gap-3">
              RSVP FOR SEATING ${icon('ArrowRight')}
            </button>
          </div>
        </div>
      </section>
      ` : `
      <section class="max-w-7xl mx-auto px-8 mb-32">
        <div class="bg-surface-container-low p-16 text-center border border-outline-variant/10">
          <h2 class="font-headline text-3xl text-on-surface mb-4 italic">No upcoming appearances scheduled.</h2>
          <p class="font-body text-on-surface-variant">Please check back soon for new event announcements.</p>
        </div>
      </section>
      `}

      <section class="max-w-7xl mx-auto px-8 mb-32">
        <h3 class="font-headline text-3xl font-bold mb-12 flex items-center gap-4">
          Upcoming Schedule
          <span class="h-px flex-grow bg-outline-variant/30"></span>
        </h3>
        ${upcomingSchedule.length > 0 ? `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${upcomingSchedule.map(event => `
            <div class="bg-surface-container-low p-8 border-b-4 border-primary/20 hover:border-primary transition-all duration-300 group">
              <div class="text-sm font-label text-primary font-bold mb-4">${event.date}</div>
              <h4 class="font-headline text-2xl font-bold mb-4 group-hover:text-primary transition-colors">${event.title}</h4>
              <p class="font-body text-on-surface-variant mb-6 line-clamp-3">${event.description}</p>
              <div class="flex items-center justify-between">
                <span class="text-xs font-label uppercase tracking-widest text-on-surface-variant">${event.type}</span>
                <button class="text-primary font-bold font-label hover:underline underline-offset-4 flex items-center gap-1">
                  DETAILS ${icon('ExternalLink')}
                </button>
              </div>
            </div>
          `).join('')}
        </div>
        ` : `
        <p class="font-body text-on-surface-variant italic">The schedule is currently being updated. Stay tuned for future dates.</p>
        `}
      </section>

      <section class="max-w-7xl mx-auto px-8">
        <div class="bg-surface-container-low p-12">
          <h3 class="font-headline text-3xl font-bold mb-12">Past Engagements</h3>
          <div class="space-y-0">
            ${PAST_ENGAGEMENTS.map((past, idx) => `
              <div class="group flex flex-col md:flex-row md:items-center py-8 hover:bg-surface-container-high transition-colors px-4 ${idx !== PAST_ENGAGEMENTS.length - 1 ? 'border-b border-outline-variant/30' : ''}">
                <div class="w-48 text-on-surface-variant font-label font-medium mb-2 md:mb-0">${past.date}</div>
                <div class="flex-grow">
                  <h5 class="font-headline text-xl font-bold group-hover:text-primary transition-colors">${past.title}</h5>
                  <p class="text-sm text-on-surface-variant font-body">${past.description}</p>
                </div>
                <div class="mt-4 md:mt-0 text-on-surface-variant font-body text-sm italic">${past.location}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    </div>
  `;
}

function MediaPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const filter = urlParams.get('filter') || 'All';
  const categories = ['All', 'Magazine', 'Podcast', 'Video', 'Article', 'Award'];

  const parseDate = (dateStr) => {
    const [month, year] = dateStr.trim().split(' ');
    const months = {
      'JAN': 0, 'FEB': 1, 'MAR': 2, 'APR': 3, 'MAY': 4, 'JUN': 5,
      'JUL': 6, 'AUG': 7, 'SEP': 8, 'OCT': 9, 'NOV': 10, 'DEC': 11
    };
    return new Date(year, months[month] || 0);
  };

  const filteredMedia = filter === 'All' 
    ? MEDIA 
    : MEDIA.filter(item => item.type === filter);

  const sortedMedia = [...filteredMedia].sort((a, b) => parseDate(b.date) - parseDate(a.date));

  return `
    <div class="pt-24 pb-20 fade-in">
      <header class="max-w-7xl mx-auto px-8 py-16">
        <h1 class="font-headline text-5xl md:text-7xl text-on-surface leading-tight mb-4">
          Media <br/><span class="italic text-primary">& Press</span>
        </h1>
        <p class="font-body text-lg text-on-surface-variant max-w-2xl leading-relaxed">
          Showcasing Vicky Chong's contributions to literary discourse through magazines, podcasts, and video features.
        </p>
      </header>

      <section class="bg-surface-container-low py-6 mb-16">
        <div class="max-w-7xl mx-auto px-8 flex gap-8 items-center overflow-x-auto whitespace-nowrap scrollbar-hide">
          <span class="font-label text-xs uppercase tracking-widest text-on-surface-variant">Filter By:</span>
          ${categories.map(cat => `
            <button class="font-label text-sm transition-colors filter-btn ${filter === cat ? 'font-semibold text-primary' : 'text-on-surface-variant hover:text-on-surface'}" data-filter="${cat}">
              ${cat}
            </button>
          `).join('')}
        </div>
      </section>

      <section class="max-w-7xl mx-auto px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${sortedMedia.map(item => `
            <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="group bg-surface-container-lowest border border-outline-variant/10 p-8 flex flex-col h-full hover:border-primary transition-all duration-300">
              <div class="flex justify-between items-start mb-8">
                <div class="text-primary opacity-60 group-hover:opacity-100 transition-opacity">
                  ${icon(item.icon)}
                </div>
                <span class="font-label text-[10px] uppercase tracking-widest text-on-surface-variant bg-surface-container-high px-2 py-1">${item.type}</span>
              </div>
              <div class="flex-grow">
                <h3 class="font-headline text-2xl text-on-surface mb-4 group-hover:text-primary transition-colors">${item.title}</h3>
                <p class="font-body text-on-surface-variant text-sm leading-relaxed mb-6">${item.description}</p>
              </div>
              <div class="pt-6 border-t border-outline-variant/10 flex justify-between items-center">
                <div class="flex flex-col">
                  <span class="font-label text-[10px] uppercase tracking-widest text-primary font-bold">${item.source}</span>
                  <span class="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">${item.date}</span>
                </div>
                <div class="text-primary transform translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                  ${icon('ExternalLink')}
                </div>
              </div>
            </a>
          `).join('')}
        </div>
        ${sortedMedia.length === 0 ? `
          <div class="py-20 text-center">
            <p class="text-on-surface-variant font-body italic">No items found for this category.</p>
          </div>
        ` : ''}
      </section>
    </div>
  `;
}

function AboutPage() {
  return `
    <div class="pt-24 fade-in">
      <section class="max-w-7xl mx-auto px-8 py-16 md:py-24">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div class="md:col-span-5 relative">
            <div class="absolute -top-4 -left-4 w-full h-full bg-surface-container-high -z-10"></div>
            <img src="${vickyPortrait}" alt="Author Portrait" class="w-full grayscale hover:grayscale-0 transition-all duration-700 shadow-xl" />
          </div>
          <div class="md:col-span-7">
            <span class="font-label text-primary uppercase tracking-[0.3em] text-xs mb-4 block">The Voice Behind The Words</span>
            <h1 class="text-5xl md:text-7xl font-headline mb-8 text-on-surface leading-tight">Vicky Chong</h1>
            <p class="text-xl md:text-2xl font-headline italic text-on-surface-variant leading-relaxed max-w-2xl">
              "I believe stories are the only mirrors that don't just show us who we are, but who we could become."
            </p>
          </div>
        </div>
      </section>

      <section class="bg-surface-container-low py-24">
        <div class="max-w-4xl mx-auto px-8">
          <div class="space-y-12">
            <div class="flex flex-col md:flex-row gap-8 items-start">
              <h2 class="text-3xl font-headline text-primary md:w-1/3 sticky top-32">The Early Narrative</h2>
              <div class="md:w-2/3 text-lg leading-loose text-on-surface-variant space-y-6">
                <p>Born into a family of voracious readers, Vicky’s journey began in the quiet corners of public libraries. Her fascination with the human condition led her to pursue a career that bridges the gap between traditional journalism and contemporary fiction.</p>
                <p>Her work often explores the intersection of cultural heritage and modern identity, drawing inspiration from her extensive travels across Southeast Asia and her deep-seated love for the tactile nature of historical archives.</p>
              </div>
            </div>
            <div class="flex flex-col md:flex-row gap-8 items-start pt-12">
              <h2 class="text-3xl font-headline text-primary md:w-1/3 sticky top-32">Craft & Inspiration</h2>
              <div class="md:w-2/3 text-lg leading-loose text-on-surface-variant space-y-6">
                <p>Vicky's writing process is deeply anchored in the "Editorial Voice." Every manuscript starts with a fountain pen and a blank sheet of cream paper, a ritual that maintains her connection to the physical act of creation.</p>
                <p>She draws inspiration from the works of Virginia Woolf and contemporary masters of the short form. Her narrative style is characterized by "Intentional Asymmetry," much like the design of this space—breaking standard patterns to reveal deeper truths.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="max-w-7xl mx-auto px-8 py-24">
        <h2 class="text-4xl font-headline mb-16 text-center">Recognition & Reach</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          ${ACHIEVEMENTS.map(ach => `
            <div class="bg-surface-container-lowest p-10 flex flex-col justify-between min-h-[320px] group hover:bg-white transition-colors duration-300">
              <div>
                <div class="text-primary mb-6">${icon(ach.icon)}</div>
                <h3 class="text-2xl font-headline mb-4">${ach.title}</h3>
                <p class="text-on-surface-variant font-body">${ach.description}</p>
              </div>
              <div class="pt-8 border-t border-outline-variant/20">
                <span class="text-xs font-label uppercase tracking-widest text-primary">${ach.meta}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <section class="bg-primary py-24 text-white text-center">
        <div class="max-w-3xl mx-auto px-8">
          <h2 class="text-4xl md:text-5xl font-headline mb-8">Let's craft the next chapter together.</h2>
          <p class="text-lg opacity-90 font-body tracking-wide mb-12">For speaking engagements, interviews, or collaborative projects, my desk is always open.</p>
          
          <div class="space-y-4">
            <span class="font-label text-xs uppercase tracking-[0.3em] block opacity-70">Contact Me</span>
            <a href="mailto:chong_vicky@hotmail.com" class="text-2xl md:text-3xl font-headline hover:text-surface-container-high transition-colors border-b border-white/30 pb-2 inline-block">
              chong_vicky@hotmail.com
            </a>
          </div>
        </div>
      </section>
    </div>
  `;
}

// Main render function
function render() {
  const app = document.getElementById('app');
  let content = '';

  switch (currentPath) {
    case '#/':
    case '':
      content = HomePage();
      break;
    case '#/books':
      content = BooksPage();
      break;
    case '#/events':
      content = EventsPage();
      break;
    case '#/media':
      content = MediaPage();
      break;
    case '#/about':
      content = AboutPage();
      break;
    default:
      content = HomePage();
  }

  app.innerHTML = `
    <div class="min-h-screen flex flex-col">
      ${Navbar()}
      <main class="flex-grow">
        ${content}
      </main>
      ${Footer()}
      ${Modal()}
    </div>
  `;

  // Attach event listeners
  attachEventListeners();
}

function attachEventListeners() {
  // Navigation links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.onclick = (e) => {
      e.preventDefault();
      navigate(link.getAttribute('data-path'));
    };
  });

  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.onclick = () => {
      mobileMenu.classList.toggle('hidden');
      render(); // Re-render to update icon
    };
  }

  // Excerpt buttons
  document.querySelectorAll('.excerpt-btn').forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-id');
      const book = BOOKS.find(b => b.id === id) || ESSAYS.find(e => e.id === id);
      if (book) openModal(book);
    };
  });

  // Modal close
  const modalClose = document.getElementById('modal-close');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalOverlay = document.getElementById('modal-overlay');
  
  if (modalClose) modalClose.onclick = closeModal;
  if (modalCloseBtn) modalCloseBtn.onclick = closeModal;
  if (modalOverlay) modalOverlay.onclick = closeModal;

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.onclick = () => {
      const filter = btn.getAttribute('data-filter');
      const hash = window.location.hash.split('?')[0];
      window.location.hash = `${hash}?filter=${filter}`;
      currentPath = window.location.hash;
      render();
    };
  });
}

// Initial render
render();
