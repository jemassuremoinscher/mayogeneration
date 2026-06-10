export const allSites = {
  mayocreche: {
    name: 'Mayo Crèche',
    url: 'https://mayocreche.fr',
    description: 'Crèches & services de garde',
  },
  insurance: {
    name: "Je m'assure moins cher",
    url: 'https://jemassuremoinscher.fr',
    description: 'Courtage en assurance',
  },
  ai: {
    name: 'Mammouth AI',
    url: 'https://mammouth-ai.com',
    description: 'Agents IA pour entrepreneurs',
  },
};

export const getContextualLinks = (domain: string) => {
  const links: Record<string, Array<{ url: string; text: string }>> = {
    'mayocreche.fr': [
      {
        url: 'https://jemassuremoinscher.fr/assurance-creche',
        text: 'Assurance crèche recommandée',
      },
      {
        url: 'https://mammouth-ai.com',
        text: 'Automatiser votre gestion',
      },
    ],
    'mayocreche.com': [
      {
        url: 'https://jemassuremoinscher.fr/assurance-creche',
        text: 'Assurance crèche recommandée',
      },
      {
        url: 'https://mammouth-ai.com',
        text: 'Automatiser votre gestion',
      },
    ],
  };

  return links[domain] || links['mayocreche.fr'];
};
