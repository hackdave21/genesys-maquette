const fs = require('fs');
const path = require('path');

const themeScript = `
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
    
    lucide.createIcons();`;

const portfolioSpecific = `
    function filterPorfolio(el, category) {
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

const servicesSpecific = `
    function toggleBilling(mode) {
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

const contactSpecific = `
    function selectBudget(el) {
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

const scriptsToRestore = {
  'frontend/index.html': `<script>${themeScript}\n  </script>`,
  'frontend/about.html': `<script>${themeScript}\n  </script>`,
  'frontend/portfolio.html': `<script>${portfolioSpecific}${themeScript}\n  </script>`,
  'frontend/services.html': `<script>${servicesSpecific}${themeScript}\n  </script>`,
  'frontend/contact.html': `<script>${contactSpecific}${themeScript}\n  </script>`
};

Object.keys(scriptsToRestore).forEach(f => {
  const filePath = path.join(__dirname, f);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find where the scripts were added. They look like:
    // <script src="js/main.js"></script>
    // <script src="js/portfolio.js"></script>
    // </body>
    
    // We regex replace everything from the first <script src="js/ to </body>
    const scriptRegex = /<script src="js\/[^>]+><\/script>(\s*<script src="js\/[^>]+><\/script>)*\s*<\/body>/g;
    
    if (scriptRegex.test(content)) {
      content = content.replace(scriptRegex, scriptsToRestore[f] + '\n</body>');
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Restored ' + f);
    } else {
      console.log('No replacement found in ' + f);
    }
  }
});

// Remove js directory and its files
const jsDir = path.join(__dirname, 'frontend/js');
if (fs.existsSync(jsDir)) {
  fs.readdirSync(jsDir).forEach(file => {
    fs.unlinkSync(path.join(jsDir, file));
  });
  fs.rmdirSync(jsDir);
  console.log('Removed js directory');
}
