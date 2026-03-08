import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'fr' | 'en' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    'nav.about': 'À propos',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'hero.title': 'Bienvenue chez Mayo',
    'hero.subtitle': 'Crèche multilingue à Nice',
    'hero.description': 'Un environnement bienveillant et stimulant pour l\'épanouissement de vos enfants',
    'hero.cta': 'Nous contacter',
    'about.title': 'À propos de Mayo',
    'about.description': 'Mayo est une crèche multilingue située au cœur de Nice, offrant un environnement chaleureux et enrichissant pour les enfants de 3 mois à 3 ans. Notre approche pédagogique favorise le développement harmonieux de chaque enfant à travers des activités ludiques et éducatives en français, anglais et russe.',
    'about.feature1.title': 'Équipe qualifiée',
    'about.feature1.description': 'Professionnels expérimentés et passionnés',
    'about.feature2.title': 'Environnement sûr',
    'about.feature2.description': 'Espaces adaptés et sécurisés',
    'about.feature3.title': 'Approche multilingue',
    'about.feature3.description': 'Immersion naturelle en 3 langues',
    'services.title': 'Nos Services',
    'services.care.title': 'Accueil personnalisé',
    'services.care.description': 'Chaque enfant bénéficie d\'une attention particulière adaptée à ses besoins',
    'services.education.title': 'Programme éducatif',
    'services.education.description': 'Activités ludiques favorisant l\'éveil et l\'apprentissage multilingue',
    'services.meals.title': 'Repas équilibrés',
    'services.meals.description': 'Cuisine maison avec des produits frais et de qualité',
    'services.schedule.title': 'Horaires flexibles',
    'services.schedule.description': 'Ouvert de 8h à 18h du lundi au vendredi',
    'contact.title': 'Contactez-nous',
    'contact.address': 'Nice, France',
    'contact.phone': 'Téléphone',
    'contact.email': 'Email',
    'contact.hours': 'Lundi - Vendredi: 8h00 - 18h00',
    'footer.rights': 'Tous droits réservés.',
  },
  en: {
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'hero.title': 'Welcome to Mayo',
    'hero.subtitle': 'Multilingual nursery in Nice',
    'hero.description': 'A caring and stimulating environment for your children\'s development',
    'hero.cta': 'Contact us',
    'about.title': 'About Mayo',
    'about.description': 'Mayo is a multilingual nursery located in the heart of Nice, offering a warm and enriching environment for children from 3 months to 3 years old. Our educational approach promotes the harmonious development of each child through fun and educational activities in French, English, and Russian.',
    'about.feature1.title': 'Qualified team',
    'about.feature1.description': 'Experienced and passionate professionals',
    'about.feature2.title': 'Safe environment',
    'about.feature2.description': 'Adapted and secure spaces',
    'about.feature3.title': 'Multilingual approach',
    'about.feature3.description': 'Natural immersion in 3 languages',
    'services.title': 'Our Services',
    'services.care.title': 'Personalized care',
    'services.care.description': 'Each child receives special attention adapted to their needs',
    'services.education.title': 'Educational program',
    'services.education.description': 'Fun activities promoting awakening and multilingual learning',
    'services.meals.title': 'Balanced meals',
    'services.meals.description': 'Home-cooked with fresh, quality products',
    'services.schedule.title': 'Flexible hours',
    'services.schedule.description': 'Open from 8am to 6pm Monday to Friday',
    'contact.title': 'Contact us',
    'contact.address': 'Nice, France',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.hours': 'Monday - Friday: 8:00 AM - 6:00 PM',
    'footer.rights': 'All rights reserved.',
  },
  ru: {
    'nav.about': 'О нас',
    'nav.services': 'Услуги',
    'nav.contact': 'Контакты',
    'hero.title': 'Добро пожаловать в Mayo',
    'hero.subtitle': 'Многоязычный детский сад в Ницце',
    'hero.description': 'Заботливая и стимулирующая среда для развития ваших детей',
    'hero.cta': 'Связаться с нами',
    'about.title': 'О Mayo',
    'about.description': 'Mayo - это многоязычный детский сад в центре Ниццы, предлагающий теплую и обогащающую среду для детей от 3 месяцев до 3 лет. Наш образовательный подход способствует гармоничному развитию каждого ребенка через веселые и образовательные занятия на французском, английском и русском языках.',
    'about.feature1.title': 'Квалифицированная команда',
    'about.feature1.description': 'Опытные и увлеченные специалисты',
    'about.feature2.title': 'Безопасная среда',
    'about.feature2.description': 'Адаптированные и безопасные помещения',
    'about.feature3.title': 'Многоязычный подход',
    'about.feature3.description': 'Естественное погружение в 3 языка',
    'services.title': 'Наши услуги',
    'services.care.title': 'Индивидуальный уход',
    'services.care.description': 'Каждый ребенок получает особое внимание, адаптированное к его потребностям',
    'services.education.title': 'Образовательная программа',
    'services.education.description': 'Веселые занятия, способствующие пробуждению и многоязычному обучению',
    'services.meals.title': 'Сбалансированное питание',
    'services.meals.description': 'Домашняя еда из свежих качественных продуктов',
    'services.schedule.title': 'Гибкий график',
    'services.schedule.description': 'Открыто с 8:00 до 18:00 с понедельника по пятницу',
    'contact.title': 'Свяжитесь с нами',
    'contact.address': 'Ницца, Франция',
    'contact.phone': 'Телефон',
    'contact.email': 'Эл. почта',
    'contact.hours': 'Понедельник - Пятница: 8:00 - 18:00',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.fr] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
