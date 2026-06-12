export const allSites = {
  mayocreche: {
    name: 'Mayo Crèche',
    url: 'https://mayocreche.fr',
    description: 'Crèches multilingues & nursery privée sur la Côte d\'Azur',
  },
  insurance: {
    name: "Je m'assure moins cher",
    url: 'https://jemassuremoinscher.fr',
    description: 'Comparateur d\'assurances — 70+ assureurs comparés gratuitement',
  },
  ai: {
    name: 'Mammouth AI',
    url: 'https://mammouth-ai.com',
    description: 'Agents IA et automatisation pour entrepreneurs et PME',
  },
  motors: {
    name: 'Mammouth Motors',
    url: 'https://mammouthmotors.com',
    description: 'Export voitures Dubai → Afrique & gardiennage voitures de collection à Nice',
  },
  effl: {
    name: 'English for Future Leaders',
    url: 'https://effl.lovable.app',
    description: 'Coaching premium d\'anglais business pour dirigeants et entrepreneurs',
  },
};

export const getContextualLinks = (domain: string) => {
  const partnerLinks = [
    {
      url: 'https://jemassuremoinscher.fr/assurance-creche',
      text: 'Assurance crèche recommandée',
    },
    {
      url: 'https://mammouth-ai.com',
      text: 'Automatiser votre gestion',
    },
    {
      url: 'https://mammouthmotors.com',
      text: 'Mammouth Motors – Export & collection',
    },
    {
      url: 'https://effl.lovable.app',
      text: 'English for Future Leaders',
    },
  ];

  const links: Record<string, Array<{ url: string; text: string }>> = {
    'mayocreche.fr': partnerLinks,
    'mayocreche.com': partnerLinks,
  };

  return links[domain] || partnerLinks;
};
