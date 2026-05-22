const fs = require('fs');
const path = require('path');

const frontendFiles = [
  { name: 'frontend/index.html', key: 'index' },
  { name: 'frontend/portfolio.html', key: 'portfolio' },
  { name: 'frontend/services.html', key: 'services' },
  { name: 'frontend/about.html', key: 'about' },
  { name: 'frontend/contact.html', key: 'contact' }
];

// Helper to generate the responsive navigation HTML
function getResponsiveNav(activePage) {
  const getLinkClass = (page) => {
    return activePage === page
      ? 'text-brand-orange dark:text-brand-orange text-sm font-bold'
      : 'text-gray-600 dark:text-[#888] text-sm font-medium hover:text-gray-900 dark:text-white transition-colors';
  };

  const getMobileLinkClass = (page) => {
    return activePage === page
      ? 'text-brand-orange dark:text-brand-orange text-base font-bold'
      : 'text-gray-600 dark:text-[#888] text-base font-medium hover:text-gray-900 dark:text-white transition-colors';
  };

  return `<!-- NAV -->
  <nav class="sticky top-0 z-50 bg-white/90 dark:bg-[#050505]/90 backdrop-blur-md border-b border-gray-200 dark:border-[#1f1f1f]">
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <a href="index.html" class="block">
        <img src="assets/logo.PNG" alt="GENESYS" class="h-7 w-auto">
      </a>
      
      <!-- Desktop Nav Links -->
      <div class="hidden md:flex items-center gap-8">
        <a href="index.html" class="${getLinkClass('index')}">Accueil</a>
        <a href="portfolio.html" class="${getLinkClass('portfolio')}">Portfolio</a>
        <a href="services.html" class="${getLinkClass('services')}">Services</a>
        <a href="about.html" class="${getLinkClass('about')}">À propos</a>
        <a href="contact.html" class="${getLinkClass('contact')}">Contact</a>
        <a href="login.html" class="text-gray-600 dark:text-[#888] text-sm font-medium hover:text-gray-900 dark:text-white transition-colors flex items-center gap-1.5"><i data-lucide="user" class="w-4 h-4"></i> Connexion</a>
        <button onclick="toggleTheme()" class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-[#1a1a1a] text-gray-600 dark:text-[#888] hover:text-brand-orange transition-colors" aria-label="Toggle theme"><i data-lucide="moon" class="w-4 h-4 hidden dark:block"></i><i data-lucide="sun" class="w-4 h-4 block dark:hidden"></i></button>
        <a href="contact.html" class="bg-brand-orange text-gray-900 dark:text-white text-sm font-semibold px-5 py-2.5 rounded-md hover:bg-orange-600 transition-colors">Demander un devis</a>
      </div>

      <!-- Mobile Controls (visible on mobile only) -->
      <div class="flex md:hidden items-center gap-4">
        <button onclick="toggleTheme()" class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-[#1a1a1a] text-gray-600 dark:text-[#888] hover:text-brand-orange transition-colors" aria-label="Toggle theme">
          <i data-lucide="moon" class="w-4 h-4 hidden dark:block"></i>
          <i data-lucide="sun" class="w-4 h-4 block dark:hidden"></i>
        </button>
        <button onclick="toggleMobileMenu()" class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-[#1a1a1a] text-gray-600 dark:text-[#888] hover:text-brand-orange transition-colors" aria-label="Toggle mobile menu">
          <i id="burgerIcon" data-lucide="menu" class="w-5 h-5"></i>
        </button>
      </div>
    </div>

    <!-- Mobile Dropdown Menu -->
    <div id="mobileMenu" class="hidden md:hidden bg-white/95 dark:bg-[#050505]/95 backdrop-blur-md border-b border-gray-200 dark:border-[#1f1f1f] px-6 py-6 transition-all duration-300">
      <div class="flex flex-col gap-4">
        <a href="index.html" class="${getMobileLinkClass('index')}">Accueil</a>
        <a href="portfolio.html" class="${getMobileLinkClass('portfolio')}">Portfolio</a>
        <a href="services.html" class="${getMobileLinkClass('services')}">Services</a>
        <a href="about.html" class="${getMobileLinkClass('about')}">À propos</a>
        <a href="contact.html" class="${getMobileLinkClass('contact')}">Contact</a>
        <a href="login.html" class="text-gray-600 dark:text-[#888] text-base font-medium hover:text-gray-900 dark:text-white transition-colors flex items-center gap-1.5"><i data-lucide="user" class="w-4.5 h-4.5"></i> Connexion</a>
        <div class="border-t border-gray-200 dark:border-[#1f1f1f] pt-4 mt-2">
          <a href="contact.html" class="block text-center bg-brand-orange text-gray-900 dark:text-white text-sm font-semibold py-3 rounded-md hover:bg-orange-600 transition-colors">Demander un devis</a>
        </div>
      </div>
    </div>`;
}

// Global script block helper to insert burger toggle function
const jsBurgerCode = `function toggleMobileMenu() {
      const menu = document.getElementById('mobileMenu');
      const icon = document.getElementById('burgerIcon');
      if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        icon.setAttribute('data-lucide', 'x');
      } else {
        menu.classList.add('hidden');
        icon.setAttribute('data-lucide', 'menu');
      }
      lucide.createIcons();
    }
    
    lucide.createIcons();`;

// Process all files
frontendFiles.forEach(f => {
  const filePath = path.join(__dirname, f.name);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${f.name}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Replace entire Nav tag
  content = content.replace(/<!-- NAV -->[\s\S]*?<\/nav>/, getResponsiveNav(f.key));

  // 2. Inject toggle JS function
  content = content.replace(/lucide\.createIcons\(\);/g, jsBurgerCode);

  // 3. Grid corrections specific to files
  if (f.key === 'index') {
    // Hero main
    content = content.replace(
      /max-w-7xl mx-auto px-6 py-24 grid grid-cols-2 gap-16 items-center relative z-10/g,
      'max-w-7xl mx-auto px-6 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10'
    );
    // Stats hero
    content = content.replace(
      /grid grid-cols-3 gap-4/g,
      'grid grid-cols-1 sm:grid-cols-3 gap-4'
    );
    // Portfolio grid
    content = content.replace(
      /grid grid-cols-3 gap-6/g,
      'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
    );
    // Services grid
    content = content.replace(
      /grid grid-cols-4 gap-5/g,
      'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'
    );
    // Testimonials grid
    content = content.replace(
      /grid grid-cols-2 gap-6/g,
      'grid grid-cols-1 lg:grid-cols-2 gap-6'
    );
    // CTA flex
    content = content.replace(
      /max-w-7xl mx-auto px-6 flex items-center justify-between/g,
      'max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left'
    );
  }

  if (f.key === 'about') {
    // Hero intro
    content = content.replace(
      /max-w-7xl mx-auto px-6 grid grid-cols-2 gap-16 items-center/g,
      'max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center'
    );
    // Hero stats
    content = content.replace(
      /grid grid-cols-3 gap-5/g,
      'grid grid-cols-1 sm:grid-cols-3 gap-5'
    );
    // Values grid
    content = content.replace(
      /grid grid-cols-3 gap-6/g,
      'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
    );
    // Team intro
    content = content.replace(
      /max-w-7xl mx-auto px-6 grid grid-cols-2 gap-16/g,
      'max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16'
    );
    // Team secondary grid
    content = content.replace(
      /grid grid-cols-2 gap-4/g,
      'grid grid-cols-1 sm:grid-cols-2 gap-4'
    );
    // CTA flex
    content = content.replace(
      /max-w-7xl mx-auto px-6 flex items-center justify-between/g,
      'max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left'
    );
  }

  if (f.key === 'portfolio') {
    // Filters grid (not filters list which is flex)
    content = content.replace(
      /flex items-end justify-between/g,
      'flex flex-col lg:flex-row lg:items-end justify-between gap-8'
    );
    // Featured main cols
    content = content.replace(
      /grid grid-cols-2/g,
      'grid grid-cols-1 lg:grid-cols-2'
    );
    // Featured text p-10
    content = content.replace(
      /p-10 flex flex-col justify-center/g,
      'p-6 sm:p-10 flex flex-col justify-center'
    );
    // Portfolio item grid
    content = content.replace(
      /grid grid-cols-3 gap-5/g,
      'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
    );
    // CTA flex
    content = content.replace(
      /max-w-7xl mx-auto px-6 flex items-center justify-between/g,
      'max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left'
    );
  }

  if (f.key === 'services') {
    // Process Portfolioflow
    content = content.replace(
      /grid grid-cols-3 gap-6/g,
      'grid grid-cols-1 md:grid-cols-3 gap-6'
    );
    // Tariff grid
    content = content.replace(
      /grid grid-cols-4 gap-5/g,
      'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'
    );
    // CTA flex
    content = content.replace(
      /max-w-7xl mx-auto px-6 flex items-center justify-between/g,
      'max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left'
    );
  }

  if (f.key === 'contact') {
    // Main grid cols-[1.6fr_1fr]
    content = content.replace(
      /max-w-7xl mx-auto px-6 grid grid-cols-\[1.6fr_1fr\] gap-12/g,
      'max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-12'
    );
    // Form fields double input cols
    content = content.replace(
      /grid grid-cols-2 gap-5 mb-5/g,
      'grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5'
    );
    // Follow grid cols
    content = content.replace(
      /grid grid-cols-3 gap-3/g,
      'grid grid-cols-1 sm:grid-cols-3 gap-3'
    );
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Successfully made responsive: ${f.name}`);
});

console.log('Mobile responsiveness & Burger menus integrated perfectly!');
