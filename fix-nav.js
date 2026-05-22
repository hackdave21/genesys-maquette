const fs = require('fs');
const path = require('path');

const files = [
  { name: 'frontend/index.html', active: '>Accueil</a>' },
  { name: 'frontend/portfolio.html', active: '>Portfolio</a>' },
  { name: 'frontend/services.html', active: '>Services</a>' },
  { name: 'frontend/about.html', active: '>À propos</a>' },
  { name: 'frontend/contact.html', active: '>Contact</a>' }
];

files.forEach(f => {
  const filePath = path.join(__dirname, f.name);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix the nav background
    content = content.replace(/bg-white dark:bg-white\/90 dark:bg-\[#080808\]\/90/g, 'bg-white/90 dark:bg-[#050505]/90');
    
    // The active link currently has: class="text-gray-900 dark:text-white text-sm font-medium"
    // We want to replace it for the specific active item.
    // The active item text is in f.active.
    // E.g. <a href="index.html" class="text-gray-900 dark:text-white text-sm font-medium">Accueil</a>
    
    const activeRegex = new RegExp(`class="text-gray-900 dark:text-white text-sm font-medium"(${f.active})`);
    content = content.replace(activeRegex, `class="text-brand-orange dark:text-brand-orange text-sm font-bold"$1`);
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed ' + f.name);
  }
});
