import React, { useState } from 'react';
import { ScheduleEvent } from '../types';
import { Clock, Calendar, Sparkles, Bell, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface PujaScheduleProps {
  schedule: ScheduleEvent[];
  pujaDates: string;
}

export const PujaSchedule: React.FC<PujaScheduleProps> = ({ schedule, pujaDates }) => {
  const { t } = useLanguage();
  const [selectedDayId, setSelectedDayId] = useState<string>(schedule[0]?.id || 'sched-1');

  const selectedSchedule = schedule.find((s) => s.id === selectedDayId) || schedule[0];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-[#2a0808] p-6 sm:p-8 rounded-2xl gold-border gold-glow relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#d4af37]/20 border border-[#d4af37]/40 px-3 py-1 rounded-full text-xs font-semibold text-[#ffd700] mb-3">
              <Calendar className="w-3.5 h-3.5" />
              <span>{t.scheduleHeader}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif-cinzel font-bold text-[#ffd700]">
              {t.scheduleTitle}
            </h2>
            <p className="text-sm text-[#f5f2ed]/80 mt-2 max-w-2xl">
              {pujaDates || t.scheduleSub}
            </p>
          </div>

          <div className="bg-[#1a0505]/80 p-4 rounded-xl gold-border flex items-center gap-4">
            <Bell className="w-8 h-8 text-[#ffd700] animate-bounce" />
            <div>
              <span className="block text-xs text-[#d4af37]/80 uppercase tracking-wider">{t.pushpanjaliReminder}</span>
              <span className="block text-sm font-bold text-[#f5f2ed]">
                {t.pushpanjaliTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Day Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {schedule.map((item) => {
          const isSelected = item.id === selectedDayId;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedDayId(item.id)}
              className={`flex-1 min-w-[140px] p-4 rounded-xl text-left border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-br from-[#d4af37] to-[#aa820a] text-[#1a0505] border-[#ffd700] shadow-xl scale-[1.02]'
                  : 'bg-[#2a0808]/70 border-[#d4af37]/20 text-[#f5f2ed] hover:border-[#d4af37]/50'
              }`}
            >
              <span className={`block text-xs font-bold uppercase tracking-wider ${isSelected ? 'text-[#1a0505]/80' : 'text-[#d4af37]'}`}>
                {item.dateStr}
              </span>
              <span className="block text-base font-serif-cinzel font-bold mt-1">
                {item.day}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Day Events Timeline */}
      {selectedSchedule && (
        <div className="bg-[#1a0505] p-6 sm:p-8 rounded-2xl gold-border space-y-6">
          <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-serif-cinzel font-bold text-[#ffd700]">
                {selectedSchedule.day} Program
              </h3>
              <p className="text-xs text-[#d4af37]/70 mt-1">
                All timings are in Indian Standard Time (IST) at Pundal Village Mandap
              </p>
            </div>
            <Sparkles className="w-6 h-6 text-[#ffd700]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedSchedule.events.map((evt, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-xl border transition-all ${
                  evt.isKeyRitual
                    ? 'bg-gradient-to-r from-[#3d0c0c] to-[#2a0808] border-[#d4af37] shadow-lg gold-glow'
                    : 'bg-[#2a0808]/50 border-[#d4af37]/20 hover:border-[#d4af37]/40'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 bg-[#1a0505] px-3 py-1 rounded-lg border border-[#d4af37]/30 text-xs font-bold text-[#ffd700]">
                    <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>{evt.time}</span>
                  </div>

                  {evt.isKeyRitual && (
                    <span className="bg-[#d4af37] text-[#1a0505] text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                      Key Ritual
                    </span>
                  )}
                </div>

                <h4 className="text-lg font-serif-cinzel font-bold text-[#f5f2ed] mt-3">
                  {evt.title}
                </h4>

                {evt.bengaliTitle && (
                  <span className="block text-xs font-medium text-[#d4af37] mt-0.5">
                    {evt.bengaliTitle}
                  </span>
                )}

                {evt.description && (
                  <p className="text-xs text-[#f5f2ed]/70 mt-2 leading-relaxed">
                    {evt.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Guidelines Card */}
      <div className="bg-[#2a0808]/60 p-6 rounded-xl gold-border flex items-start gap-4">
        <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs text-[#f5f2ed]/80 space-y-1">
          <p className="font-bold text-[#ffd700]">{t.pushpanjaliRulesTitle}</p>
          <p>{t.pushpanjaliRulesText}</p>
        </div>
      </div>
    </div>
  );
};
