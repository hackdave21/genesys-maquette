const fs = require('fs');
const path = require('path');

const frontendFiles = [
  'frontend/index.html',
  'frontend/portfolio.html',
  'frontend/services.html',
  'frontend/about.html',
  'frontend/contact.html'
];

const adminFiles = [
  'admin/dashboard.html',
  'admin/devis.html',
  'admin/projets.html'
];

// Process frontend files to insert Connexion link before theme toggle button
frontendFiles.forEach(fileName => {
  const filePath = path.join(__dirname, fileName);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${fileName}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Insert Connexion link if not already present
  if (!content.includes('login.html')) {
    content = content.replace(
      /<button onclick="toggleTheme\(\)" class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-\[#1a1a1a\] text-gray-600 dark:text-\[#888\] hover:text-brand-orange transition-colors" aria-label="Toggle theme"><i data-lucide="moon" class="w-4 h-4 hidden dark:block"><\/i><i data-lucide="sun" class="w-4 h-4 block dark:hidden"><\/i><\/button>/g,
      `<a href="login.html" class="text-gray-600 dark:text-[#888] text-sm font-medium hover:text-gray-900 dark:text-white transition-colors flex items-center gap-1.5"><i data-lucide="user" class="w-4 h-4"></i> Connexion</a>
        <button onclick="toggleTheme()" class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-[#1a1a1a] text-gray-600 dark:text-[#888] hover:text-brand-orange transition-colors" aria-label="Toggle theme"><i data-lucide="moon" class="w-4 h-4 hidden dark:block"></i><i data-lucide="sun" class="w-4 h-4 block dark:hidden"></i></button>`
    );
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Injected login nav link in: ${fileName}`);
  } else {
    console.log(`Login link already exists in: ${fileName}`);
  }
});

// Process admin files to insert Logout icon
adminFiles.forEach(fileName => {
  const filePath = path.join(__dirname, fileName);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${fileName}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Insert log-out icon next to avatar if not already present
  if (!content.includes('login.html')) {
    content = content.replace(
      /<div class="flex items-center gap-2">\s*<div class="w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center text-xs font-bold">TA<\/div>\s*<span class="text-sm text-\[#888\]">Thierry Amenyah<\/span>\s*<\/div>/g,
      `<div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center text-xs font-bold">TA</div>
            <span class="text-sm text-[#888]">Thierry Amenyah</span>
          </div>
          <a href="login.html" class="text-[#666] hover:text-red-400 transition-colors" title="Déconnexion">
            <i data-lucide="log-out" class="w-4 h-4"></i>
          </a>
        </div>`
    );
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Injected logout icon in admin file: ${fileName}`);
  } else {
    console.log(`Logout link already exists in: ${fileName}`);
  }
});

console.log('Navigation links integration complete!');
