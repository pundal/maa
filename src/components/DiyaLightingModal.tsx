import React, { useState } from 'react';
import { Flame, Sparkles, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DiyaLightingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLightDiya: (devoteeName: string, message: string) => Promise<void>;
}

export const DiyaLightingModal: React.FC<DiyaLightingModalProps> = ({
  isOpen,
  onClose,
  onLightDiya,
}) => {
  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
                Offer Prayers & Light a Diya
              </h3>
              <p className="text-xs text-[#d4af37]">
                Your virtual lamp will glow on the 3D Pundal Mandap Altar
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-[#d4af37] mb-1">
              Devotee / Family Name
            </label>
            <input
              type="text"
              placeholder="e.g. Subhasish Banerjee & Family"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            <span>{isSubmitting ? 'Lighting Diya...' : 'Light Diya On 3D Altar'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
