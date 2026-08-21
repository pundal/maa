import React, { useState } from 'react';
import { Flame, Sparkles, X, Shield, Lock, KeyRound, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../i18n/LanguageContext';

interface DiyaLightingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLightDiya: (devoteeName: string, message: string) => Promise<void>;
  isAdminLoggedIn: boolean;
  onAdminLogin?: (passcode: string) => boolean;
}

export const DiyaLightingModal: React.FC<DiyaLightingModalProps> = ({
  isOpen,
  onClose,
  onLightDiya,
  isAdminLoggedIn,
  onAdminLogin,
}) => {
  const { t } = useLanguage();
  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [adminPinInput, setAdminPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleAdminAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAdminLogin) {
      const success = onAdminLogin(adminPinInput);
      if (success) {
        setPinError(false);
        setAdminPinInput('');
      } else {
        setPinError(true);
      }
    } else if (adminPinInput === '1976' || adminPinInput === 'admin') {
      setPinError(false);
      setAdminPinInput('');
    } else {
      setPinError(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdminLoggedIn) return;
    setIsSubmitting(true);
    try {
      await onLightDiya(name || 'Pundal Devotee', message || 'Joy Maa Durga');
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#ffd700', '#ff4500'],
      });
      setName('');
      setMessage('');
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#120303]/90 backdrop-blur-lg flex items-center justify-center p-4">
      <div className="relative max-w-lg w-full bg-[#1a0505] p-6 sm:p-8 rounded-2xl gold-border shadow-2xl space-y-6 gold-glow">
        <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#2a0808] rounded-xl border border-[#d4af37]/40">
              <Flame className="w-6 h-6 text-[#ffd700] fill-current animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-serif-cinzel font-bold text-[#ffd700]">
                {isAdminLoggedIn ? 'Offer Prayers & Light a Diya' : t.adminDiyaAuthTitle}
              </h3>
              <p className="text-xs text-[#d4af37]">
                {isAdminLoggedIn
                  ? 'Your virtual lamp will glow on the 3D Pundal Mandap Altar'
                  : t.adminDiyaNotice}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#f5f2ed]/60 hover:text-[#ffd700] rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View 1: If not admin logged in, show Authorization PIN step */}
        {!isAdminLoggedIn ? (
          <div className="space-y-5">
            <div className="text-center space-y-2 bg-[#2a0808] p-4 rounded-xl border border-[#d4af37]/30">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#1a0505] border border-[#d4af37]/40 flex items-center justify-center mb-2">
                <Lock className="w-6 h-6 text-[#ffd700]" />
              </div>
              <h4 className="text-sm font-serif-cinzel font-bold text-[#ffd700]">
                Admin Privilege Required
              </h4>
              <p className="text-xs text-[#f5f2ed]/70 leading-relaxed">
                {t.adminDiyaAuthSub}
              </p>
            </div>

            <form onSubmit={handleAdminAuthSubmit} className="space-y-4">
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-3.5 w-5 h-5 text-[#d4af37]" />
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
                  className="w-full bg-[#2a0808] border border-[#d4af37]/40 rounded-xl py-3 pl-11 pr-4 text-sm text-[#f5f2ed] focus:border-[#ffd700] outline-none"
                />
              </div>

              {pinError && (
                <p className="text-xs text-red-400 font-medium text-center">
                  Invalid Committee PIN. Please try again.
                </p>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#d4af37] to-[#aa820a] hover:brightness-110 text-[#1a0505] p-3.5 rounded-xl font-bold text-sm shadow-xl transition-all cursor-pointer"
              >
                <Shield className="w-4 h-4" />
                <span>Verify & Unlock Diya Form</span>
              </button>
            </form>
          </div>
        ) : (
          /* View 2: Authorized Form to light Diya */
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-between bg-emerald-950/70 border border-emerald-500/40 px-3.5 py-2 rounded-xl text-xs text-emerald-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold">{t.adminVerifiedBadge} - Diya Form Unlocked</span>
              </div>
              <span className="text-[10px] bg-emerald-900/80 px-2 py-0.5 rounded border border-emerald-500/30">
                Committee Altar
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#d4af37] mb-1">
                Devotee / Family Name
              </label>
              <input
                type="text"
                placeholder="e.g. Subhasish Banerjee & Family"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                className="w-full bg-[#2a0808] border border-[#d4af37]/30 rounded-xl p-3 text-sm text-[#f5f2ed] focus:border-[#ffd700] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#d4af37] mb-1">
                Devotional Message / Wish
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Joy Maa Durga! Bless our Pundal village with health and harmony."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full bg-[#2a0808] border border-[#d4af37]/30 rounded-xl p-3 text-sm text-[#f5f2ed] focus:border-[#ffd700] outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !message}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#d4af37] via-[#f5f2ed] to-[#aa820a] hover:brightness-110 disabled:opacity-50 text-[#1a0505] p-3.5 rounded-xl font-bold text-sm shadow-xl transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#b30000]" />
              <span>{isSubmitting ? 'Lighting Diya on Altar...' : 'Light Diya On 3D Altar'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

