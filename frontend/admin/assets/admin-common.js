// admin-common.js - Script commun pour l'administration GENESYS

// Données par défaut pour initialiser le LocalStorage
const DEFAULT_TESTIMONIALS = [
  {
    id: "1",
    name: "Jean-Pierre Lawson",
    company: "Directeur Commercial - Togo Telecom",
    text: "La production vidéo réalisée par GENESYS pour notre campagne institutionnelle a dépassé toutes nos attentes. Une équipe professionnelle, à l'écoute et extrêmement réactive. Nous recommandons sans hésitation !",
    rating: 5,
    date: "2026-05-15",
    status: "published",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "Amina Bello",
    company: "Fondatrice - Bella Mode",
    text: "Grâce aux Reels réguliers produits par GENESYS, notre taux d'engagement sur Instagram a augmenté de 150% en seulement deux mois. Nos ventes en ligne ont suivi la même courbe !",
    rating: 5,
    date: "2026-05-20",
    status: "published",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "Koffi Mensah",
    company: "Gérant - Le Belvédère Lomé",
    text: "Un service impeccable pour la promotion de notre restaurant. Les vidéos de cocktails attirent beaucoup de nouveaux clients chaque week-end sur notre terrasse.",
    rating: 4,
    date: "2026-05-28",
    status: "draft",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop"
  }
];

const DEFAULT_VIDEOS = [
  {
    id: "1",
    title: "Ecobank Togo - Spot Digital",
    desc: "Vidéo promotionnelle pour le lancement de la nouvelle application mobile d'Ecobank Togo. Focus sur la rapidité et la sécurité des transactions.",
    category: "Publicité",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&auto=format&fit=crop",
    status: "visible",
    featured: true,
    date: "2026-04-10"
  },
  {
    id: "2",
    title: "Aftermovie Togo Fashion Week 2026",
    desc: "Résumé cinématique des meilleurs moments de la Togo Fashion Week, mettant en avant les créateurs locaux et l'ambiance des défilés.",
    category: "Événement",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop",
    status: "visible",
    featured: true,
    date: "2026-05-18"
  },
  {
    id: "3",
    title: "Reels Teranga Burger - Promo Été",
    desc: "Série de vidéos courtes et rythmées pour Instagram et TikTok présentant les nouveaux burgers de la saison.",
    category: "Reels",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop",
    status: "visible",
    featured: false,
    date: "2026-05-28"
  },
  {
    id: "4",
    title: "Film Institutionnel - Port de Lomé",
    desc: "Présentation corporate des infrastructures modernes du Port Autonome de Lomé et son rôle de hub logistique régional.",
    category: "Corporate",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&auto=format&fit=crop",
    status: "archive",
    featured: false,
    date: "2026-02-15"
  }
];

const DEFAULT_PACKS = [
  {
    id: "1",
    name: "Pack BRONZE",
    title: "Starter visibilité",
    category: "abonnements",
    price: "250 000 FCFA",
    note: "≈ 380 € / mois",
    target: "PME débutantes, commerçants, professions libérales",
    features: [
      "4 vidéos/mois (1 mère + 3 dérivés)",
      "12 publications sociales",
      "Stratégie mensuelle",
      "Reporting simple",
      "2 plateformes au choix"
    ],
    engagement: "Engagement : 3 mois minimum",
    status: "active",
    icon: "circle",
    iconColor: "#CD7F32",
    highlighted: false
  },
  {
    id: "2",
    name: "Pack SILVER",
    title: "Croissance",
    category: "abonnements",
    price: "500 000 FCFA",
    note: "≈ 760 € / mois",
    target: "PME en croissance, marques émergentes, e-commerce",
    features: [
      "8 vidéos/mois (2 mères + 6 dérivés)",
      "24 publications sociales",
      "Community management",
      "Analyse concurrence mensuelle",
      "Reporting ROI détaillé",
      "4 plateformes (FB, IG, TikTok, LI)"
    ],
    engagement: "Engagement : 6 mois minimum",
    status: "active",
    icon: "shield",
    iconColor: "#9ca3af",
    highlighted: false
  },
  {
    id: "3",
    name: "Pack GOLD",
    title: "Leadership",
    category: "abonnements",
    price: "900 000 FCFA",
    note: "≈ 1 377 € / mois",
    target: "Marques établies, institutions, scaleups, diaspora",
    features: [
      "16 vidéos/mois (4 mères + 12 dérivés)",
      "48 publications sociales",
      "Community management complet",
      "Publicités payantes (budget 100K inclus)",
      "Stratégie mensuelle en présentiel",
      "7 plateformes + YouTube SEO",
      "Reporting ROI premium"
    ],
    engagement: "Engagement : 12 mois minimum",
    status: "active",
    icon: "star",
    iconColor: "#C5A572",
    highlighted: true
  },
  {
    id: "4",
    name: "Pack PERFORMANCE",
    title: "Risque partagé",
    category: "abonnements",
    price: "150 000 FCFA dépôt initial",
    note: "+ 10% du CA additionnel (6 mois)",
    target: "PME à budget limité avec une bonne offre produit. On partage le risque ET les fruits.",
    features: [
      "Mêmes livrables que le Pack SILVER",
      "Audit préalable obligatoire",
      "Contrat d'exclusivité marketing",
      "Accès aux analytics client"
    ],
    engagement: "Signature GENESYS",
    status: "active",
    icon: "trending-up",
    iconColor: "#FF6B2B",
    highlighted: false
  },
  {
    id: "5",
    name: "Pack Souvenir",
    title: "Demi-journée de captation",
    category: "evenements",
    price: "350 000 FCFA",
    note: "Livraison 10 jours",
    target: "Demi-journée (4h) de captation vidéo et photo",
    features: [
      "1 vidéaste + 1 photographe",
      "Film résumé 3-5 min",
      "100 photos retouchées"
    ],
    engagement: "À la demande",
    status: "active",
    icon: "camera",
    iconColor: "#9ca3af",
    highlighted: false
  },
  {
    id: "6",
    name: "Pack Prestige",
    title: "Journée complète",
    category: "evenements",
    price: "750 000 FCFA",
    note: "Livraison 14 jours",
    target: "Journée complète (10h) de captation",
    features: [
      "2 vidéastes + 1 photographe",
      "Film cinématique 5-8 min",
      "Drone inclus",
      "Teaser 60s réseaux sociaux",
      "250 photos retouchées"
    ],
    engagement: "Recommandé",
    status: "active",
    icon: "award",
    iconColor: "#C5A572",
    highlighted: true
  },
  {
    id: "7",
    name: "Pack Royal",
    title: "Équipe complète",
    category: "evenements",
    price: "1 500 000 FCFA",
    note: "Livraison 21 jours",
    target: "2 jours de captation",
    features: [
      "3 vidéastes + 2 photographes + 1 drone",
      "Film 10-15 min qualité cinéma",
      "3 teasers réseaux sociaux",
      "500 photos retouchées",
      "Album digital premium"
    ],
    engagement: "À la demande",
    status: "active",
    icon: "crown",
    iconColor: "#CD7F32",
    highlighted: false
  },
  {
    id: "8",
    name: "Audit stratégique complet",
    title: "One-shot",
    category: "oneshot",
    price: "150 000 FCFA",
    note: "Délai : 7 jours",
    target: "Analyse complète de votre présence digitale",
    features: [
      "Audit de vos réseaux sociaux",
      "Recommandations éditoriales",
      "Stratégie de diffusion"
    ],
    engagement: "À la demande",
    status: "active",
    icon: "search",
    iconColor: "#FF6B2B",
    highlighted: false
  },
  {
    id: "9",
    name: "Clip institutionnel",
    title: "One-shot",
    category: "oneshot",
    price: "800 000 — 1 500 000 FCFA",
    note: "Délai : 14 jours",
    target: "Film institutionnel de 2-3 minutes",
    features: [
      "Scénarisation et storyboarding",
      "Interview et plans de coupe",
      "Montage et étalonnage",
      "Habillage graphique"
    ],
    engagement: "À la demande",
    status: "active",
    icon: "clapperboard",
    iconColor: "#FF6B2B",
    highlighted: false
  }
];

// Initialise les données de l'application dans le localStorage
function initData() {
  if (!localStorage.getItem('genesys_testimonials')) {
    localStorage.setItem('genesys_testimonials', JSON.stringify(DEFAULT_TESTIMONIALS));
  }
  if (!localStorage.getItem('genesys_videos')) {
    localStorage.setItem('genesys_videos', JSON.stringify(DEFAULT_VIDEOS));
  }
  if (!localStorage.getItem('genesys_packs')) {
    localStorage.setItem('genesys_packs', JSON.stringify(DEFAULT_PACKS));
  }
}

// Fonction de bascule des sous-menus dans la Sidebar
function toggleSubmenu(id) {
  const menu = document.getElementById(id);
  const arrowId = id.replace('submenu-', 'arrow-');
  const arrow = document.getElementById(arrowId);
  
  if (menu) {
    if (menu.classList.contains('hidden')) {
      menu.classList.remove('hidden');
      menu.classList.add('flex');
      if (arrow) arrow.classList.add('rotate-180');
    } else {
      menu.classList.remove('flex');
      menu.classList.add('hidden');
      if (arrow) arrow.classList.remove('rotate-180');
    }
  }
}

// Gestion des états actifs dans la Sidebar en fonction de l'URL courante
function setupSidebarActiveStates() {
  const currentPath = window.location.pathname;
  const pageName = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'dashboard.html';

  // Association des pages à leurs sous-menus respectifs
  const submenuMap = {
    'temoignages-ajouter.html': 'submenu-temoignages',
    'temoignages-liste.html': 'submenu-temoignages',
    'videos-ajouter.html': 'submenu-videos',
    'videos-liste.html': 'submenu-videos'
  };

  const activeSubmenuId = submenuMap[pageName];
  if (activeSubmenuId) {
    const menu = document.getElementById(activeSubmenuId);
    if (menu) {
      menu.classList.remove('hidden');
      menu.classList.add('flex');
      const arrowId = activeSubmenuId.replace('submenu-', 'arrow-');
      const arrow = document.getElementById(arrowId);
      if (arrow) arrow.classList.add('rotate-180');
      
      // Mettre en évidence le bouton parent du sous-menu
      const parentBtn = menu.previousElementSibling;
      if (parentBtn) {
        parentBtn.classList.add('text-white', 'bg-[#141414]');
      }
    }
  }

  // Mettre en surbrillance le lien de navigation actif
  const allLinks = document.querySelectorAll('aside nav a');
  allLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && pageName === href) {
      const isSubmenuLink = link.closest('#submenu-temoignages') || link.closest('#submenu-videos');
      if (isSubmenuLink) {
        // Lien de sous-menu actif
        link.className = 'flex items-center gap-2 py-1.5 text-xs text-brand-orange font-semibold transition-colors';
      } else {
        // Lien de menu principal actif
        link.className = 'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-brand-orange bg-brand-orange/10 font-medium';
      }
    } else if (href && !link.closest('#submenu-temoignages') && !link.closest('#submenu-videos')) {
      // S'assurer que les autres liens principaux n'ont pas la classe active
      if (pageName !== href) {
        link.className = 'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#888] hover:bg-[#141414] hover:text-white font-medium transition-colors';
      }
    }
  });
}

// Utilitaire pour afficher des notifications (Toast)
function showToast(message, type = 'success') {
  // Supprime un éventuel toast déjà existant
  const existingToast = document.getElementById('admin-toast');
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement('div');
  toast.id = 'admin-toast';
  toast.className = `fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3.5 rounded-xl border shadow-lg transition-all duration-300 transform translate-y-10 opacity-0`;
  
  let icon = 'check-circle';
  let classes = 'bg-[#0d0d0d] border-brand-green/30 text-white';
  let iconColor = 'text-brand-green';

  if (type === 'error') {
    icon = 'alert-triangle';
    classes = 'bg-[#0d0d0d] border-red-500/30 text-white';
    iconColor = 'text-red-500';
  } else if (type === 'info') {
    icon = 'info';
    classes = 'bg-[#0d0d0d] border-brand-orange/30 text-white';
    iconColor = 'text-brand-orange';
  }

  toast.className += ' ' + classes;
  toast.innerHTML = `
    <i data-lucide="${icon}" class="w-5 h-5 ${iconColor}"></i>
    <span class="text-xs font-medium">${message}</span>
  `;

  document.body.appendChild(toast);
  lucide.createIcons();

  // Animation d'entrée
  setTimeout(() => {
    toast.classList.remove('translate-y-10', 'opacity-0');
  }, 50);

  // Animation de sortie et retrait
  setTimeout(() => {
    toast.classList.add('translate-y-10', 'opacity-0');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4000);
}

// Initialisations globales au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  initData();
  setupSidebarActiveStates();
});
