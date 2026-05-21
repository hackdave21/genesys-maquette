const fs = require('fs');
const path = require('path');

const files = [
  'frontend/index.html',
  'frontend/about.html',
  'frontend/portfolio.html',
  'frontend/services.html',
  'frontend/contact.html'
];

const replacements = [
  // Backgrounds
  { regex: /bg-\[#050505\]/g, replace: 'bg-white dark:bg-[#050505]' },
  { regex: /bg-\[#0d0d0d\]/g, replace: 'bg-gray-50 dark:bg-[#0d0d0d]' },
  { regex: /bg-\[#080808\]/g, replace: 'bg-white dark:bg-[#080808]' },
  { regex: /bg-\[#080808\]\/90/g, replace: 'bg-white/90 dark:bg-[#080808]/90' },
  { regex: /bg-\[#111\]/g, replace: 'bg-gray-100 dark:bg-[#111]' },
  { regex: /bg-\[#1a1a1a\]/g, replace: 'bg-gray-200 dark:bg-[#1a1a1a]' },
  { regex: /bg-\[#1a0800\]/g, replace: 'bg-orange-50 dark:bg-[#1a0800]' },
  { regex: /bg-\[#1a1200\]/g, replace: 'bg-yellow-50 dark:bg-[#1a1200]' },
  
  // Opacity backgrounds
  { regex: /bg-\[#0d0d0d\]\/80/g, replace: 'bg-white/80 dark:bg-[#0d0d0d]/80' },
  { regex: /to-\[#0d0d0d\]/g, replace: 'to-white dark:to-[#0d0d0d]' },
  
  // Gradients
  { regex: /from-\[#1a0800\]/g, replace: 'from-orange-50 dark:from-[#1a0800]' },
  { regex: /from-\[#1a0a00\]/g, replace: 'from-orange-50 dark:from-[#1a0a00]' },
  { regex: /from-\[#001a0d\]/g, replace: 'from-green-50 dark:from-[#001a0d]' },
  { regex: /from-\[#0a0a1a\]/g, replace: 'from-purple-50 dark:from-[#0a0a1a]' },
  { regex: /from-\[#1a1000\]/g, replace: 'from-yellow-50 dark:from-[#1a1000]' },
  { regex: /from-\[#001020\]/g, replace: 'from-blue-50 dark:from-[#001020]' },
  { regex: /from-\[#1a0000\]/g, replace: 'from-red-50 dark:from-[#1a0000]' },
  
  // Borders
  { regex: /border-\[#1a1a1a\]/g, replace: 'border-gray-200 dark:border-[#1a1a1a]' },
  { regex: /border-\[#1f1f1f\]/g, replace: 'border-gray-200 dark:border-[#1f1f1f]' },
  { regex: /border-\[#222\]/g, replace: 'border-gray-300 dark:border-[#222]' },
  { regex: /border-\[#2a2a2a\]/g, replace: 'border-gray-300 dark:border-[#2a2a2a]' },
  { regex: /border-\[#333\]/g, replace: 'border-gray-300 dark:border-[#333]' },
  { regex: /border-white\/50/g, replace: 'border-gray-400 dark:border-white/50' },
  
  // Texts
  { regex: /text-white/g, replace: 'text-gray-900 dark:text-white' },
  { regex: /text-\[#888\]/g, replace: 'text-gray-600 dark:text-[#888]' },
  { regex: /text-\[#777\]/g, replace: 'text-gray-600 dark:text-[#777]' },
  { regex: /text-\[#666\]/g, replace: 'text-gray-500 dark:text-[#666]' },
  { regex: /text-\[#555\]/g, replace: 'text-gray-500 dark:text-[#555]' },
  { regex: /text-\[#444\]/g, replace: 'text-gray-400 dark:text-[#444]' },
  { regex: /text-\[#333\]/g, replace: 'text-gray-400 dark:text-[#333]' },
  
  // Hovers
  { regex: /hover:text-white/g, replace: 'hover:text-brand-orange dark:hover:text-white' },
  { regex: /hover:border-\[#444\]/g, replace: 'hover:border-gray-400 dark:hover:border-[#444]' },
  { regex: /hover:border-\[#555\]/g, replace: 'hover:border-gray-400 dark:hover:border-[#555]' },
  { regex: /hover:bg-white\/10/g, replace: 'hover:bg-gray-100 dark:hover:bg-white/10' },
];

files.forEach(f => {
  const filePath = path.join(__dirname, f);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add theme toggle script before lucide.createIcons()
    const toggleScript = `
    // Theme logic
    function toggleTheme() {
      const html = document.documentElement;
      if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
    }
    
    // Init theme
    if (localStorage.getItem('theme') === 'light') {
      document.documentElement.classList.remove('dark');
    }
    `;
    if (!content.includes('toggleTheme()')) {
      content = content.replace('lucide.createIcons();', toggleScript + '\n    lucide.createIcons();');
    }
    
    // Add toggle button to navbar
    const navRegex = /(<div class="flex items-center gap-8">[\s\S]*?)(<a href="contact.html" class="bg-brand-orange)/;
    if (!content.includes('onclick="toggleTheme()"')) {
      content = content.replace(navRegex, `$1<button onclick="toggleTheme()" class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-[#1a1a1a] text-gray-600 dark:text-[#888] hover:text-brand-orange transition-colors" aria-label="Toggle theme"><i data-lucide="moon" class="w-4 h-4 hidden dark:block"></i><i data-lucide="sun" class="w-4 h-4 block dark:hidden"></i></button>\n        $2`);
    }

    replacements.forEach(r => {
      content = content.replace(r.regex, r.replace);
    });
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated ' + f);
  }
});
