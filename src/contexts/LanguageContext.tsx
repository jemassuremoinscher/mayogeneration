import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'fr' | 'en' | 'ru' | 'it';

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
    'hero.subtitle': 'Une crèche premium multilingue sur la Côte d\'Azur',
    'hero.description': 'Français, anglais — et une troisième langue propre à chaque crèche.',
    'hero.cta': 'Inscrivez-vous à la liste d\'attente prioritaire',
    'hero.cta.visit': 'Faites la visite immersive',
    'about.title': 'À propos de Mayo',
    'about.description': 'Mayo est une crèche multilingue située au cœur de la Côte d\'Azur, offrant un environnement chaleureux et enrichissant pour les enfants de 3 mois à 3 ans.',
    'about.feature1.title': 'Équipe qualifiée',
    'about.feature1.description': 'Professionnels expérimentés et passionnés',
    'about.feature2.title': 'Environnement sûr',
    'about.feature2.description': 'Espaces adaptés et sécurisés',
    'about.feature3.title': 'Approche multilingue',
    'about.feature3.description': 'Immersion naturelle en plusieurs langues',
    'services.title': 'Nos Services',
    'services.care.title': 'Accueil personnalisé',
    'services.care.description': 'Chaque enfant bénéficie d\'une attention particulière',
    'services.education.title': 'Programme éducatif',
    'services.education.description': 'Activités ludiques et apprentissage multilingue',
    'services.meals.title': 'Repas équilibrés',
    'services.meals.description': 'Cuisine maison avec des produits frais',
    'services.schedule.title': 'Horaires flexibles',
    'services.schedule.description': 'Ouvert de 8h à 18h du lundi au vendredi',
    'contact.title': 'Contactez-nous',
    'contact.address': 'Côte d\'Azur, France',
    'contact.phone': 'Téléphone',
    'contact.email': 'Email',
    'contact.hours': 'Lundi - Vendredi: 8h00 - 18h00',
    'footer.rights': 'Tous droits réservés.',
    'status.priority': 'Ouverture prioritaire',
    'status.waitlist': 'Sur liste d\'attente',
    'status.priorityNote': 'Places limitées',
    'lang.highlighted': 'Langue mise en avant',
    'lang.networkNote': 'Toutes les langues du réseau Mayo restent accessibles sur demande.',
    'cta.waitlist': 'M\'inscrire sur la liste d\'attente prioritaire de ce secteur',
    'cta.bookVisit': 'Réserver ma visite immersive',
  },
  en: {
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'hero.title': 'Welcome to Mayo',
    'hero.subtitle': 'A premium multilingual nursery on the French Riviera',
    'hero.description': 'French, English — plus a third language unique to each nursery.',
    'hero.cta': 'Join the priority waitlist',
    'hero.cta.visit': 'Take the immersive tour',
    'about.title': 'About Mayo',
    'about.description': 'Mayo is a multilingual nursery on the French Riviera, offering a warm and enriching environment for children aged 3 months to 3 years.',
    'about.feature1.title': 'Qualified team',
    'about.feature1.description': 'Experienced and passionate professionals',
    'about.feature2.title': 'Safe environment',
    'about.feature2.description': 'Adapted and secure spaces',
    'about.feature3.title': 'Multilingual approach',
    'about.feature3.description': 'Natural immersion in multiple languages',
    'services.title': 'Our Services',
    'services.care.title': 'Personalized care',
    'services.care.description': 'Each child receives special attention',
    'services.education.title': 'Educational program',
    'services.education.description': 'Fun activities and multilingual learning',
    'services.meals.title': 'Balanced meals',
    'services.meals.description': 'Home-cooked with fresh products',
    'services.schedule.title': 'Flexible hours',
    'services.schedule.description': 'Open 8am to 6pm Monday to Friday',
    'contact.title': 'Contact us',
    'contact.address': 'French Riviera, France',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.hours': 'Monday - Friday: 8:00 AM - 6:00 PM',
    'footer.rights': 'All rights reserved.',
    'status.priority': 'Priority opening',
    'status.waitlist': 'On waitlist',
    'status.priorityNote': 'Limited spots',
    'lang.highlighted': 'Highlighted language',
    'lang.networkNote': 'All Mayo network languages remain available on request.',
    'cta.waitlist': 'Join this area\'s priority waitlist',
    'cta.bookVisit': 'Book my immersive tour',
  },
  ru: {
    'nav.about': 'О нас',
    'nav.services': 'Услуги',
    'nav.contact': 'Контакты',
    'hero.title': 'Добро пожаловать в Mayo',
    'hero.subtitle': 'Премиум многоязычный детский сад на Лазурном Берегу',
    'hero.description': 'Французский, английский — и третий язык, свой для каждых яслей.',
    'hero.cta': 'Записаться в приоритетный лист ожидания',
    'hero.cta.visit': 'Пройти виртуальный тур',
    'about.title': 'О Mayo',
    'about.description': 'Mayo — многоязычный детский сад на Лазурном Берегу, тёплая и развивающая среда для детей от 3 месяцев до 3 лет.',
    'about.feature1.title': 'Квалифицированная команда',
    'about.feature1.description': 'Опытные и увлечённые специалисты',
    'about.feature2.title': 'Безопасная среда',
    'about.feature2.description': 'Адаптированные и безопасные помещения',
    'about.feature3.title': 'Многоязычный подход',
    'about.feature3.description': 'Естественное погружение в несколько языков',
    'services.title': 'Наши услуги',
    'services.care.title': 'Индивидуальный уход',
    'services.care.description': 'Каждый ребёнок получает особое внимание',
    'services.education.title': 'Образовательная программа',
    'services.education.description': 'Игровые занятия и многоязычное обучение',
    'services.meals.title': 'Сбалансированное питание',
    'services.meals.description': 'Домашняя еда из свежих продуктов',
    'services.schedule.title': 'Гибкий график',
    'services.schedule.description': 'Открыто с 8:00 до 18:00 пн-пт',
    'contact.title': 'Свяжитесь с нами',
    'contact.address': 'Лазурный Берег, Франция',
    'contact.phone': 'Телефон',
    'contact.email': 'Эл. почта',
    'contact.hours': 'Пн - Пт: 8:00 - 18:00',
    'footer.rights': 'Все права защищены.',
    'status.priority': 'Приоритетное открытие',
    'status.waitlist': 'В листе ожидания',
    'status.priorityNote': 'Мест мало',
    'lang.highlighted': 'Приоритетный язык',
    'lang.networkNote': 'Все языки сети Mayo доступны по запросу.',
    'cta.waitlist': 'Записаться в приоритетный лист ожидания этого района',
    'cta.bookVisit': 'Записаться на виртуальный тур',
  },
  it: {
    'nav.about': 'Chi siamo',
    'nav.services': 'Servizi',
    'nav.contact': 'Contatti',
    'hero.title': 'Benvenuti da Mayo',
    'hero.subtitle': 'Un asilo nido premium multilingue sulla Costa Azzurra',
    'hero.description': 'Francese, inglese — e una terza lingua diversa per ogni asilo.',
    'hero.cta': 'Iscrivetevi alla lista d\'attesa prioritaria',
    'hero.cta.visit': 'Fai la visita immersiva',
    'about.title': 'Chi è Mayo',
    'about.description': 'Mayo è un asilo nido multilingue sulla Costa Azzurra, un ambiente caloroso e stimolante per bambini da 3 mesi a 3 anni.',
    'about.feature1.title': 'Équipe qualificata',
    'about.feature1.description': 'Professionisti esperti e appassionati',
    'about.feature2.title': 'Ambiente sicuro',
    'about.feature2.description': 'Spazi adatti e protetti',
    'about.feature3.title': 'Approccio multilingue',
    'about.feature3.description': 'Immersione naturale in più lingue',
    'services.title': 'I nostri servizi',
    'services.care.title': 'Accoglienza personalizzata',
    'services.care.description': 'Ogni bambino riceve un\'attenzione particolare',
    'services.education.title': 'Programma educativo',
    'services.education.description': 'Attività ludiche e apprendimento multilingue',
    'services.meals.title': 'Pasti equilibrati',
    'services.meals.description': 'Cucina fatta in casa con prodotti freschi',
    'services.schedule.title': 'Orari flessibili',
    'services.schedule.description': 'Aperto dalle 8 alle 18, lun-ven',
    'contact.title': 'Contattaci',
    'contact.address': 'Costa Azzurra, Francia',
    'contact.phone': 'Telefono',
    'contact.email': 'Email',
    'contact.hours': 'Lunedì - Venerdì: 8:00 - 18:00',
    'footer.rights': 'Tutti i diritti riservati.',
    'status.priority': 'Apertura prioritaria',
    'status.waitlist': 'Su lista d\'attesa',
    'status.priorityNote': 'Posti limitati',
    'lang.highlighted': 'Lingua valorizzata',
    'lang.networkNote': 'Tutte le lingue della rete Mayo restano disponibili su richiesta.',
    'cta.waitlist': 'Iscrivimi alla lista d\'attesa prioritaria di questa zona',
    'cta.bookVisit': 'Prenota la mia visita immersiva',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    const dict = translations[language] as Record<string, string>;
    return dict[key] || (translations.fr as Record<string, string>)[key] || key;
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

// Helpers
export const LANGUAGE_LABELS: Record<Language, string> = {
  fr: 'Français',
  en: 'English',
  ru: 'Русский',
  it: 'Italiano',
};

export const HIGHLIGHTED_LANG_LABEL: Record<Language, Record<string, string>> = {
  fr: { fr: 'Français', en: 'Anglais', ru: 'Russe', it: 'Italien' },
  en: { fr: 'French', en: 'English', ru: 'Russian', it: 'Italian' },
  ru: { fr: 'Французский', en: 'Английский', ru: 'Русский', it: 'Итальянский' },
  it: { fr: 'Francese', en: 'Inglese', ru: 'Russo', it: 'Italiano' },
};
