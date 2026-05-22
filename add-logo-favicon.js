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

// Process frontend files
frontendFiles.forEach(fileName => {
  const filePath = path.join(__dirname, fileName);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${fileName}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Add Favicon if not already present
  if (!content.includes('favicon.PNG')) {
    content = content.replace(
      /<meta charset="UTF-8">/g,
      '<meta charset="UTF-8">\n  <link rel="icon" type="image/png" href="assets/favicon.PNG">'
    );
  }

  // 2. Replace Nav Logo
  content = content.replace(
    /<a href="index\.html" class="font-clash text-xl font-bold tracking-widest">GENE<span class="text-brand-orange">S<\/span>YS<\/a>/g,
    `<a href="index.html" class="block">
        <img src="assets/logo.PNG" alt="GENESYS" class="h-7 w-auto dark:brightness-0 dark:invert transition-all duration-300">
      </a>`
  );

  // 3. Replace Footer Logo
  content = content.replace(
    /<a href="index\.html" class="font-clash text-2xl font-bold text-gray-900 dark:text-white tracking-widest block mb-4">GENE<span class="text-brand-orange">S<\/span>YS<\/a>/g,
    `<a href="index.html" class="block mb-4">
            <img src="assets/logo.PNG" alt="GENESYS" class="h-8 w-auto dark:brightness-0 dark:invert transition-all duration-300">
          </a>`
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Processed frontend file: ${fileName}`);
});

// Process admin files
adminFiles.forEach(fileName => {
  const filePath = path.join(__dirname, fileName);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${fileName}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Add Favicon if not already present
  if (!content.includes('favicon.PNG')) {
    content = content.replace(
      /<meta charset="UTF-8">/g,
      '<meta charset="UTF-8">\n  <link rel="icon" type="image/png" href="assets/favicon.PNG">'
    );
  }

  // 2. Replace Sidebar Brand
  content = content.replace(
    /<a href="\.\.\/index\.html" class="font-clash text-lg font-bold tracking-widest block">GENE<span class="text-brand-orange">S<\/span>YS<\/a>/g,
    `<a href="../index.html" class="block mb-2">
        <img src="assets/logo.PNG" alt="GENESYS" class="h-7 w-auto brightness-0 invert transition-all duration-300">
      </a>`
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Processed admin file: ${fileName}`);
});

console.log('All files processed successfully!');
