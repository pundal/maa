import React, { useState } from 'react';
import { PujaInfo, CommitteeMember, VirtualDiya } from '../types';
import { BookOpen, Users, Flame, Sparkles, MessageSquare, Lock, Shield, CheckCircle2, KeyRound, Trash2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface HistoryAndMessageProps {
  pujaInfo: PujaInfo;
  committeeMembers: CommitteeMember[];
  diyas: VirtualDiya[];
  onAddDiya: (devoteeName: string, message: string) => Promise<void>;
  onDeleteDiya?: (id: string) => Promise<void>;
  isAdminLoggedIn: boolean;
  onAdminLogin?: (passcode: string) => boolean;
  onNavigateToAdmin?: () => void;
}

export const HistoryAndMessage: React.FC<HistoryAndMessageProps> = ({
  pujaInfo,
  committeeMembers,
  diyas,
  onAddDiya,
  onDeleteDiya,
  isAdminLoggedIn,
  onAdminLogin,
  onNavigateToAdmin,
}) => {
  const { t } = useLanguage();
  const [devoteeName, setDevoteeName] = useState<string>('');
  const [diyaMessage, setDiyaMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [adminPinInput, setAdminPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<boolean>(false);
  const [showAuthBox, setShowAuthBox] = useState<boolean>(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleAdminAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAdminLogin) {
      const success = onAdminLogin(adminPinInput);
      if (success) {
        setPinError(false);
        setAdminPinInput('');
        setShowAuthBox(false);
      } else {
        setPinError(true);
      }
    } else if (adminPinInput === '1976' || adminPinInput === 'admin') {
      setPinError(false);
      setAdminPinInput('');
      setShowAuthBox(false);
    } else {
      setPinError(true);
    }
  };

  const handleDiyaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdminLoggedIn) {
      setShowAuthBox(true);
      return;
    }
    if (!diyaMessage) return;

    setIsSubmitting(true);
    try {
      await onAddDiya(devoteeName || 'Pundal Devotee', diyaMessage);
      setDevoteeName('');
      setDiyaMessage('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Village History Hero */}
      <div className="bg-[#2a0808] p-6 sm:p-10 rounded-2xl gold-border gold-glow space-y-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#ffd700] uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-[#d4af37]" />
          <span>{t.villageHeritage}</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-serif-cinzel font-bold text-[#ffd700]">
          {t.historyTitle}
        </h2>

        <div className="text-sm sm:text-base text-[#f5f2ed]/90 leading-relaxed whitespace-pre-line border-l-2 border-[#d4af37]/40 pl-4 sm:pl-6">
          {pujaInfo.historyText}
        </div>
      </div>

      {/* Committee Message & Members Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Message */}
        <div className="lg:col-span-7 bg-[#1a0505] p-6 sm:p-8 rounded-2xl gold-border space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#ffd700] uppercase tracking-wider">
            <MessageSquare className="w-4 h-4 text-[#d4af37]" />
            <span>{t.committeeMessageTitle}</span>
          </div>

          <h3 className="text-xl font-serif-cinzel font-bold text-[#ffd700]">
            {t.committeeInvitation}
          </h3>

          <div className="bg-[#2a0808]/70 p-6 rounded-xl border border-[#d4af37]/20 text-sm text-[#f5f2ed]/80 italic leading-relaxed whitespace-pre-line">
            "{pujaInfo.committeeMessage}"
          </div>
        </div>

        {/* Right: Key Committee Contacts */}
        <div className="lg:col-span-5 bg-[#1a0505] p-6 sm:p-8 rounded-2xl gold-border space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#ffd700] uppercase tracking-wider">
            <Users className="w-4 h-4 text-[#d4af37]" />
            <span>Key Members</span>
          </div>

          <h3 className="text-xl font-serif-cinzel font-bold text-[#ffd700]">
            {t.committeeLeadership}
          </h3>

          <div className="space-y-3">
            {committeeMembers.map((member) => (
              <div
                key={member.id}
                className="bg-[#2a0808]/60 p-4 rounded-xl border border-[#d4af37]/20 flex items-center justify-between gap-3"
              >
                <div>
                  <span className="block text-sm font-bold text-[#f5f2ed]">{member.name}</span>
                  <span className="block text-xs text-[#d4af37] font-medium">{member.role}</span>
                </div>
                {member.contact && (
                  <span className="text-xs font-mono text-[#f5f2ed]/70 bg-[#1a0505] px-2.5 py-1 rounded border border-[#d4af37]/30">
                    {member.contact}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Devotees Prayer & Virtual Diya Wall */}
      <div className="bg-[#1a0505] p-6 sm:p-8 rounded-2xl gold-border space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#d4af37]/20 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#ffd700] uppercase tracking-wider mb-1">
              <Flame className="w-4 h-4 text-[#ffd700] fill-current animate-pulse" />
              <span>Devotional Wall</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif-cinzel font-bold text-[#ffd700]">
              {t.devotionalWallTitle}
            </h3>
          </div>

          <span className="text-xs text-[#d4af37] font-semibold">
            {diyas.length} {t.diyasGlowing}
          </span>
        </div>

        {/* Diya Form (Admin Privilege Enforced) */}
        {isAdminLoggedIn ? (
          <form onSubmit={handleDiyaSubmit} className="bg-[#2a0808] p-5 rounded-xl gold-border space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-serif-cinzel font-bold text-[#ffd700] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#ffd700]" />
                {t.offerPrayerTitle}
              </h4>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 text-[11px] font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.adminVerifiedBadge}</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder={t.devoteeNamePlaceholder}
                value={devoteeName}
                onChange={(e) => setDevoteeName(e.target.value)}
                className="bg-[#1a0505] border border-[#d4af37]/30 rounded-xl p-3 text-xs text-[#f5f2ed] focus:border-[#ffd700] outline-none"
              />
              <input
                type="text"
                placeholder={t.prayerPlaceholder}
                value={diyaMessage}
                onChange={(e) => setDiyaMessage(e.target.value)}
                required
                className="sm:col-span-2 bg-[#1a0505] border border-[#d4af37]/30 rounded-xl p-3 text-xs text-[#f5f2ed] focus:border-[#ffd700] outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !diyaMessage}
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#d4af37] to-[#aa820a] hover:brightness-110 disabled:opacity-50 text-[#1a0505] p-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
            >
              <Flame className="w-4 h-4 fill-current text-[#b30000]" />
              <span>{isSubmitting ? 'Lighting Diya on Altar...' : t.lightVirtualDiyaBtn}</span>
            </button>
          </form>
        ) : (
          <div className="bg-[#2a0808]/90 border border-[#d4af37]/40 p-5 rounded-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#1a0505] rounded-xl border border-[#d4af37]/30">
                  <Lock className="w-5 h-5 text-[#ffd700]" />
                </div>
                <div>
                  <h4 className="text-sm font-serif-cinzel font-bold text-[#ffd700]">
                    {t.adminLoginToLightDiya}
                  </h4>
                  <p className="text-xs text-[#f5f2ed]/70 mt-0.5">
                    {t.adminDiyaNotice}
                  </p>
                </div>
              </div>

              {!showAuthBox && (
                <button
                  type="button"
                  onClick={() => setShowAuthBox(true)}
                  className="flex items-center gap-2 bg-[#1a0505] hover:bg-[#3d0c0c] text-[#ffd700] border border-[#d4af37]/50 px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer self-start sm:self-auto"
                >
                  <KeyRound className="w-4 h-4 text-[#d4af37]" />
                  <span>Enter PIN to Unlock</span>
                </button>
              )}
            </div>

            {showAuthBox && (
              <form onSubmit={handleAdminAuthSubmit} className="pt-2 border-t border-[#d4af37]/20 space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <KeyRound className="absolute left-3 top-3 w-4 h-4 text-[#d4af37]" />
                    <input
                      type="password"
                      placeholder="Enter Committee PIN"
                      value={adminPinInput}
                      onChange={(e) => {
                        setAdminPinInput(e.target.value);
                        if (pinError) setPinError(false);
                      }}
                      autoFocus
                      required
                      className="w-full bg-[#1a0505] border border-[#d4af37]/40 rounded-xl py-2.5 pl-9 pr-3 text-xs text-[#f5f2ed] focus:border-[#ffd700] outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-[#d4af37] to-[#aa820a] hover:brightness-110 text-[#1a0505] px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer whitespace-nowrap"
                  >
                    Verify & Unlock
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAuthBox(false)}
                    className="px-3 py-2 text-xs text-[#f5f2ed]/60 hover:text-[#ffd700] cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
                {pinError && (
                  <p className="text-xs text-red-400 font-medium">
                    Invalid Committee PIN. Please try again.
                  </p>
                )}
              </form>
            )}
          </div>
        )}

        {/* Diyas Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {diyas.map((d) => (
            <div
              key={d.id}
              className="bg-[#2a0808]/80 p-4 rounded-xl border border-[#d4af37]/20 flex items-start justify-between gap-3 hover:border-[#d4af37]/40 transition-all"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-md mt-0.5"
                  style={{ backgroundColor: `${d.color}25`, borderColor: d.color, borderWidth: 1 }}
                >
                  <Flame className="w-4 h-4 fill-current" style={{ color: d.color }} />
                </div>

                <div className="min-w-0">
                  <span className="block text-xs font-bold text-[#ffd700] truncate">{d.devoteeName}</span>
                  <p className="text-xs text-[#f5f2ed]/80 italic mt-0.5">"{d.message}"</p>
                  <span className="block text-[10px] text-[#d4af37]/60 mt-1">{d.timestamp}</span>
                </div>
              </div>

              {isAdminLoggedIn && onDeleteDiya && (
                <div className="shrink-0">
                  {deleteConfirmId === d.id ? (
                    <div className="flex items-center gap-1 bg-red-950 p-1 rounded-lg border border-red-500/40">
                      <button
                        onClick={async () => {
                          await onDeleteDiya(d.id);
                          setDeleteConfirmId(null);
                        }}
                        className="px-2 py-0.5 bg-red-600 hover:bg-red-700 text-white rounded text-[10px] font-bold cursor-pointer"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="px-1 py-0.5 text-red-200 hover:text-white text-[10px] cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirmId(d.id)}
                      className="p-1.5 text-red-400/80 hover:text-red-300 hover:bg-red-950/60 rounded-lg cursor-pointer transition-colors"
                      title="Delete diya entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}

          {diyas.length === 0 && (
            <div className="col-span-full text-center py-8 text-xs text-[#f5f2ed]/60">
              No virtual lamps currently active. Authorized committee members can light a sacred diya above.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
