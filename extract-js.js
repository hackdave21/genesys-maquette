const fs = require('fs');
const path = require('path');

const mainJsContent = `// Theme logic
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

// Initialize Icons
document.addEventListener("DOMContentLoaded", () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});
`;

fs.writeFileSync(path.join(__dirname, 'frontend/js/main.js'), mainJsContent, 'utf8');

const portfolioJsContent = `function filterPorfolio(el, category) {
  document.querySelectorAll('.g-filter').forEach(b => {
    b.className = 'g-filter filter-inactive border rounded-full px-5 py-2 text-sm font-medium transition-all';
  });
  el.className = 'g-filter filter-active border rounded-full px-5 py-2 text-sm font-medium transition-all';
  
  document.querySelectorAll('.portfolio-item').forEach(item => {
    if (category === 'all' || item.classList.contains(category)) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}
`;
fs.writeFileSync(path.join(__dirname, 'frontend/js/portfolio.js'), portfolioJsContent, 'utf8');

const servicesJsContent = `function toggleBilling(mode) {
  const btnProject = document.getElementById('btn-project');
  const btnSub = document.getElementById('btn-sub');
  document.querySelectorAll('.price').forEach(el => {
    el.textContent = el.dataset[mode === 'project' ? 'project' : 'sub'];
  });
  if (mode === 'project') {
    btnProject.className = 'px-6 py-2.5 rounded-full text-sm font-semibold bg-brand-orange text-gray-900 dark:text-white transition-all';
    btnSub.className = 'px-6 py-2.5 rounded-full text-sm font-semibold text-gray-500 dark:text-[#666] transition-all';
  } else {
    btnSub.className = 'px-6 py-2.5 rounded-full text-sm font-semibold bg-brand-orange text-gray-900 dark:text-white transition-all';
    btnProject.className = 'px-6 py-2.5 rounded-full text-sm font-semibold text-gray-500 dark:text-[#666] transition-all';
  }
}

function toggleFaq(btn) {
  const body = btn.nextElementSibling;
  const arrow = btn.querySelector('.faq-arrow');
  const isOpen = body.classList.contains('open');
  // Close all
  document.querySelectorAll('.faq-body').forEach(b => b.classList.remove('open'));
  document.querySelectorAll('.faq-arrow').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-item').forEach(f => f.style.borderColor = '#1f1f1f');
  if (!isOpen) {
    body.classList.add('open');
    arrow.classList.add('open');
    btn.closest('.faq-item').style.borderColor = '#FF6B2B';
  }
}
`;
fs.writeFileSync(path.join(__dirname, 'frontend/js/services.js'), servicesJsContent, 'utf8');

const contactJsContent = `function selectBudget(el) {
  document.querySelectorAll('.budget-pill').forEach(b => {
    b.className = 'budget-pill border border-gray-300 dark:border-[#2a2a2a] text-gray-500 dark:text-[#666] bg-transparent rounded-full px-4 py-2 text-xs font-medium hover:border-gray-400 dark:hover:border-[#444] hover:text-gray-400 dark:hover:text-[#ccc]';
  });
  el.className = 'budget-pill border border-brand-orange text-brand-orange bg-brand-orange/10 rounded-full px-4 py-2 text-xs font-medium';
}

function submitForm() {
  const msg = document.getElementById('successMsg');
  msg.classList.remove('hidden');
  msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
`;
fs.writeFileSync(path.join(__dirname, 'frontend/js/contact.js'), contactJsContent, 'utf8');

// Now process the HTML files to remove the old <script> tags and include the new ones

const files = [
  { name: 'frontend/index.html', scripts: ['js/main.js'] },
  { name: 'frontend/about.html', scripts: ['js/main.js'] },
  { name: 'frontend/portfolio.html', scripts: ['js/main.js', 'js/portfolio.js'] },
  { name: 'frontend/services.html', scripts: ['js/main.js', 'js/services.js'] },
  { name: 'frontend/contact.html', scripts: ['js/main.js', 'js/contact.js'] }
];

files.forEach(f => {
  const filePath = path.join(__dirname, f.name);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Regex to match the script block before </body>
    // It captures everything from <script> to </script> at the end
    const scriptRegex = /<script>[\s\S]*?<\/script>\s*<\/body>/;
    
    let replacementScripts = f.scripts.map(s => '<script src="' + s + '"></script>').join('\n  ') + '\n</body>';
    
    if (scriptRegex.test(content)) {
      content = content.replace(scriptRegex, replacementScripts);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated ' + f.name);
    } else {
      console.log('Could not find script block in ' + f.name);
    }
  }
});
