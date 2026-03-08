import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { MapPin, Calendar, Clock, Users, Sparkles, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Establishment {
  city: string;
  slug: string;
  occupancy: number;
  totalSpots: number;
  filledSpots: number;
  lastSpot?: boolean;
  comingSoon?: boolean;
}

const establishments: Establishment[] = [
  { city: 'Nice – Médecin', slug: 'creche-nice-medecin', occupancy: 85, totalSpots: 12, filledSpots: 10 },
  { city: 'Cannes', slug: 'creche-cannes', occupancy: 0, totalSpots: 12, filledSpots: 0, comingSoon: true },
  { city: 'Antibes', slug: 'creche-antibes', occupancy: 0, totalSpots: 12, filledSpots: 0, comingSoon: true },
  { city: 'Monaco', slug: 'creche-monaco', occupancy: 0, totalSpots: 10, filledSpots: 0, comingSoon: true },
];

const tr = {
  fr: {
    badge: 'Temps Réel',
    title: 'Disponibilités en Temps Réel',
    subtitle: 'Consultez les places disponibles dans nos établissements',
    spots: 'places sur',
    lastSpot: 'Dernière place disponible !',
    comingSoon: 'Ouverture prochaine',
    bookCta: 'Réserver mon créneau de visite',
    calTitle: 'Choisissez votre créneau',
    calSubtitle: 'Sélectionnez un jour et un horaire pour votre visite',
    morning: 'Matin',
    afternoon: 'Après-midi',
    confirm: 'Confirmer ce créneau',
    confirmed: 'Créneau réservé ! Nous vous confirmons par email.',
    months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    days: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
  },
  en: {
    badge: 'Real Time',
    title: 'Real-Time Availability',
    subtitle: 'Check available spots in our nurseries',
    spots: 'spots of',
    lastSpot: 'Last spot available!',
    comingSoon: 'Opening soon',
    bookCta: 'Book a visit slot',
    calTitle: 'Choose your slot',
    calSubtitle: 'Select a day and time for your visit',
    morning: 'Morning',
    afternoon: 'Afternoon',
    confirm: 'Confirm this slot',
    confirmed: 'Slot booked! We\'ll confirm by email.',
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  ru: {
    badge: 'В реальном времени',
    title: 'Наличие мест в реальном времени',
    subtitle: 'Проверьте свободные места в наших яслях',
    spots: 'мест из',
    lastSpot: 'Последнее свободное место!',
    comingSoon: 'Скоро открытие',
    bookCta: 'Записаться на визит',
    calTitle: 'Выберите время',
    calSubtitle: 'Выберите день и время для визита',
    morning: 'Утро',
    afternoon: 'День',
    confirm: 'Подтвердить',
    confirmed: 'Время забронировано! Подтвердим по email.',
    months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
  },
};

const morningSlots = ['9:00', '9:30', '10:00', '10:30', '11:00'];
const afternoonSlots = ['14:00', '14:30', '15:00', '15:30', '16:00'];

function getBarColor(occupancy: number): string {
  if (occupancy >= 85) return 'bg-destructive';
  if (occupancy >= 60) return 'bg-[hsl(35,90%,55%)]';
  return 'bg-sage';
}

function getBarBg(occupancy: number): string {
  if (occupancy >= 85) return 'bg-destructive/15';
  if (occupancy >= 60) return 'bg-[hsl(35,90%,55%)]/15';
  return 'bg-sage-light';
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Monday = 0
}

const Availability = () => {
  const { language } = useLanguage();
  const reveal = useScrollReveal();
  const t = tr[language];

  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const now = new Date();
  const [calMonth, setCalMonth] = useState(now.getMonth());
  const [calYear, setCalYear] = useState(now.getFullYear());

  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDayOfMonth(calYear, calMonth);
  const today = now.getDate();
  const isCurrentMonth = calMonth === now.getMonth() && calYear === now.getFullYear();

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); }
    else setCalMonth(calMonth - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); }
    else setCalMonth(calMonth + 1);
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTime) setConfirmed(true);
  };

  const openCalendar = () => {
    setCalendarOpen(true);
    setSelectedDate(null);
    setSelectedTime(null);
    setConfirmed(false);
  };

  return (
    <>
      <section
        id="availability"
        className="py-16 sm:py-24 px-4"
        aria-labelledby="avail-title"
      >
        <div ref={reveal.ref} style={reveal.style} className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-sage-light text-sage rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              {t.badge}
            </div>
            <h2 id="avail-title" className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              {t.title}
            </h2>
            <p className="text-muted-foreground mt-2">{t.subtitle}</p>
          </div>

          {/* Cards */}
          <div className="space-y-4">
            {establishments.map((est) => (
              <div
                key={est.slug}
                className="relative bg-card rounded-2xl border border-border p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 transition-shadow hover:shadow-[var(--shadow-premium)]"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                {/* City info */}
                <div className="flex items-center gap-3 sm:w-48 shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm sm:text-base">{est.city}</h3>
                    {est.comingSoon && (
                      <span className="text-xs text-muted-foreground">{t.comingSoon}</span>
                    )}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {est.filledSpots} {t.spots} {est.totalSpots}
                    </span>
                    <span className="text-xs font-semibold text-foreground">{est.occupancy}%</span>
                  </div>
                  <div className={`h-2.5 rounded-full ${getBarBg(est.occupancy)} overflow-hidden`}>
                    <div
                      className={`h-full rounded-full ${getBarColor(est.occupancy)} transition-all duration-1000 ease-out`}
                      style={{ width: `${est.occupancy}%` }}
                    />
                  </div>
                </div>

                {/* Last spot badge */}
                {est.lastSpot && (
                  <div className="sm:absolute sm:top-2 sm:right-2 inline-flex items-center gap-1.5 bg-destructive/10 text-destructive rounded-full px-3 py-1 text-xs font-semibold shrink-0">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive" />
                    </span>
                    {t.lastSpot}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Book CTA */}
          <div className="text-center mt-8">
            <button
              onClick={openCalendar}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm sm:text-base transition-all hover:scale-105"
              style={{ background: 'var(--gradient-sage)', color: 'white', boxShadow: 'var(--shadow-sage)' }}
            >
              <Calendar className="w-5 h-5" />
              {t.bookCta}
            </button>
          </div>
        </div>
      </section>

      {/* Calendar Modal */}
      {calendarOpen && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm animate-fade-in" onClick={() => setCalendarOpen(false)} />

          <div className="relative z-10 w-full max-w-md bg-card rounded-3xl border border-border overflow-hidden animate-scale-in" style={{ boxShadow: 'var(--shadow-premium)' }}>
            {/* Close */}
            <button
              onClick={() => setCalendarOpen(false)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-accent transition-colors"
            >
              <X className="w-4 h-4 text-foreground" />
            </button>

            <div className="p-6 sm:p-8">
              <h3 className="text-xl font-bold text-foreground mb-1">{t.calTitle}</h3>
              <p className="text-sm text-muted-foreground mb-6">{t.calSubtitle}</p>

              {!confirmed ? (
                <>
                  {/* Month navigation */}
                  <div className="flex items-center justify-between mb-4">
                    <button onClick={prevMonth} className="p-2 rounded-xl hover:bg-accent transition-colors">
                      <ChevronLeft className="w-4 h-4 text-foreground" />
                    </button>
                    <span className="font-semibold text-foreground text-sm">
                      {t.months[calMonth]} {calYear}
                    </span>
                    <button onClick={nextMonth} className="p-2 rounded-xl hover:bg-accent transition-colors">
                      <ChevronRight className="w-4 h-4 text-foreground" />
                    </button>
                  </div>

                  {/* Day headers */}
                  <div className="grid grid-cols-7 gap-1 mb-1">
                    {t.days.map((d) => (
                      <div key={d} className="text-center text-xs font-medium text-muted-foreground py-1">{d}</div>
                    ))}
                  </div>

                  {/* Calendar grid */}
                  <div className="grid grid-cols-7 gap-1 mb-6">
                    {Array.from({ length: firstDay }).map((_, i) => (
                      <div key={`e-${i}`} />
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const day = i + 1;
                      const dayOfWeek = (firstDay + i) % 7;
                      const isWeekend = dayOfWeek >= 5;
                      const isPast = isCurrentMonth && day < today;
                      const isSelected = selectedDate === day;
                      const disabled = isWeekend || isPast;

                      return (
                        <button
                          key={day}
                          disabled={disabled}
                          onClick={() => { setSelectedDate(day); setSelectedTime(null); }}
                          className={`h-9 rounded-xl text-sm font-medium transition-all ${
                            isSelected
                              ? 'bg-sage text-sage-foreground shadow-sm'
                              : disabled
                              ? 'text-muted-foreground/30 cursor-not-allowed'
                              : 'text-foreground hover:bg-sage-light'
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>

                  {/* Time slots */}
                  {selectedDate && (
                    <div className="animate-fade-in">
                      <div className="mb-3">
                        <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {t.morning}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {morningSlots.map((slot) => (
                            <button
                              key={slot}
                              onClick={() => setSelectedTime(slot)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                selectedTime === slot
                                  ? 'bg-sage text-sage-foreground'
                                  : 'bg-accent/40 text-foreground hover:bg-sage-light'
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="mb-5">
                        <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {t.afternoon}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {afternoonSlots.map((slot) => (
                            <button
                              key={slot}
                              onClick={() => setSelectedTime(slot)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                selectedTime === slot
                                  ? 'bg-sage text-sage-foreground'
                                  : 'bg-accent/40 text-foreground hover:bg-sage-light'
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Confirm */}
                      <button
                        onClick={handleConfirm}
                        disabled={!selectedTime}
                        className="w-full py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{
                          background: selectedTime ? 'var(--gradient-sage)' : undefined,
                          color: selectedTime ? 'white' : undefined,
                          boxShadow: selectedTime ? 'var(--shadow-sage)' : undefined,
                        }}
                      >
                        {t.confirm}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-6 animate-fade-in">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-sage-light mb-4">
                    <Calendar className="w-7 h-7 text-sage" />
                  </div>
                  <p className="font-semibold text-foreground mb-1">
                    {selectedDate} {t.months[calMonth]} — {selectedTime}
                  </p>
                  <p className="text-sm text-muted-foreground">{t.confirmed}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Availability;
