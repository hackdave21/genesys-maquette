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
  'frontend/admin/dashboard.html',
  'frontend/admin/devis.html',
  'frontend/admin/projets.html'
];

// Process frontend files
frontendFiles.forEach(fileName => {
  const filePath = path.join(__dirname, fileName);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${fileName}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Revert filters on h-7 logo (nav)
  content = content.replace(
    /class="h-7 w-auto dark:invert dark:hue-rotate-180 transition-all duration-300"/g,
    'class="h-7 w-auto"'
  );

  // Revert filters on h-8 logo (footer)
  content = content.replace(
    /class="h-8 w-auto dark:invert dark:hue-rotate-180 transition-all duration-300"/g,
    'class="h-8 w-auto"'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Reverted logo filters in frontend file: ${fileName}`);
});

// Process admin files
adminFiles.forEach(fileName => {
  const filePath = path.join(__dirname, fileName);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${fileName}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Revert filters on h-7 logo (sidebar)
  content = content.replace(
    /class="h-7 w-auto brightness-0 invert transition-all duration-300"/g,
    'class="h-7 w-auto"'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Reverted logo filters in admin file: ${fileName}`);
});

console.log('Logo filters reverted successfully across all files!');
