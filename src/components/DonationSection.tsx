import React, { useState } from 'react';
import { DonationRecord, UpiConfig } from '../types';
import { Heart, QrCode, Copy, Check, Sparkles, ShieldCheck, Download, Users } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../i18n/LanguageContext';

interface DonationSectionProps {
  upiConfig: UpiConfig;
  donations: DonationRecord[];
  onAddDonation: (donorName: string, amount: number, villageName?: string, message?: string) => Promise<void>;
}

export const DonationSection: React.FC<DonationSectionProps> = ({
  upiConfig,
  donations,
  onAddDonation,
}) => {
  const { t } = useLanguage();
  const [amount, setAmount] = useState<number>(501);
  const [donorName, setDonorName] = useState<string>('');
  const [villageName, setVillageName] = useState<string>('Pundal');
  const [message, setMessage] = useState<string>('Joy Maa Durga');
  const [copied, setCopied] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedReceipt, setSubmittedReceipt] = useState<DonationRecord | null>(null);

  const presetAmounts = [251, 501, 1008, 2100, 5001];

  // Standard UPI URL string
  const upiUrl = `upi://pay?pa=${encodeURIComponent(upiConfig.upiId)}&pn=${encodeURIComponent(
    upiConfig.payeeName
  )}&am=${amount}&cu=INR&tn=${encodeURIComponent(upiConfig.accountNote)}`;

  // Google Chart API / QR Code generator URL for the UPI link
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    upiUrl
  )}`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiConfig.upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDonationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) return;

    setIsSubmitting(true);
    try {
      const newRecord = await onAddDonation(
        donorName || 'Anonymous Devotee',
        amount,
        villageName,
        message
      );
      setSubmittedReceipt(newRecord);

      // Trigger festive confetti celebration!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffd700', '#ff4500', '#ffffff'],
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="bg-[#2a0808] p-6 sm:p-8 rounded-2xl gold-border gold-glow text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#d4af37]/20 border border-[#d4af37]/40 px-4 py-1.5 rounded-full text-xs font-semibold text-[#ffd700] mb-3">
          <Heart className="w-4 h-4 text-red-400 fill-current" />
          <span>{t.supportVillage}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif-cinzel font-bold text-[#ffd700]">
          {t.scanToPayTitle}
        </h2>
        <p className="text-xs sm:text-sm text-[#f5f2ed]/80 mt-2 leading-relaxed">
          {t.scanToPayDesc}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: UPI QR & Presets */}
        <div className="lg:col-span-5 bg-[#1a0505] p-6 sm:p-8 rounded-2xl gold-border space-y-6">
          <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-4">
            <h3 className="text-lg font-serif-cinzel font-bold text-[#ffd700]">
              {t.officialUpiQr}
            </h3>
            <span className="text-[11px] bg-emerald-950 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              {t.verifiedUpi}
            </span>
          </div>

          {/* Amount Presets */}
          <div>
            <label className="block text-xs font-bold uppercase text-[#d4af37] mb-2">
              {t.selectAmount}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {presetAmounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setAmount(amt)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    amount === amt
                      ? 'bg-[#ffd700] text-[#1a0505] border-[#ffd700] shadow-md scale-105'
                      : 'bg-[#2a0808] text-[#f5f2ed] border-[#d4af37]/30 hover:border-[#ffd700]'
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="mt-3">
              <input
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder={t.customAmount}
                className="w-full bg-[#2a0808] border border-[#d4af37]/30 rounded-xl p-3 text-sm text-[#f5f2ed] font-bold focus:border-[#ffd700] outline-none"
              />
            </div>
          </div>

          {/* QR Code Canvas Frame */}
          <div className="flex flex-col items-center justify-center bg-[#2a0808] p-6 rounded-2xl gold-border text-center">
            <div className="p-3 bg-white rounded-xl shadow-2xl gold-border">
              <img
                src={qrCodeUrl}
                alt="Pundal Puja UPI QR Code"
                className="w-52 h-52 object-contain"
              />
            </div>
            <span className="text-xs text-[#ffd700] font-bold mt-4">
              {t.scanInstructions}
            </span>
            <span className="text-[11px] text-[#f5f2ed]/60 mt-0.5">
              Amount set: <strong className="text-emerald-400">₹{amount}</strong>
            </span>
          </div>

          {/* Copy UPI ID */}
          <div className="bg-[#2a0808] p-4 rounded-xl border border-[#d4af37]/30 flex items-center justify-between gap-3">
            <div>
              <span className="block text-[10px] text-[#d4af37] font-bold uppercase">Committee UPI ID</span>
              <span className="text-sm font-mono font-bold text-[#f5f2ed]">{upiConfig.upiId}</span>
            </div>
            <button
              onClick={handleCopyUpi}
              className="flex items-center gap-1.5 bg-[#1a0505] hover:bg-[#3d0c0c] text-[#ffd700] px-3 py-2 rounded-lg border border-[#d4af37]/40 text-xs font-semibold transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? t.copiedUpi : t.copyUpi}</span>
            </button>
          </div>
        </div>

        {/* Right Col: Register Donation & Wall of Devotees */}
        <div className="lg:col-span-7 space-y-6">
          {/* Register Form */}
          <div className="bg-[#1a0505] p-6 sm:p-8 rounded-2xl gold-border">
            <h3 className="text-xl font-serif-cinzel font-bold text-[#ffd700] mb-2">
              {t.registerContribution}
            </h3>
            <p className="text-xs text-[#f5f2ed]/70 mb-6">
              {t.registerSub}
            </p>

            <form onSubmit={handleDonationSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#d4af37] mb-1">
                    {t.yourFullName}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Samarjit Das"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    required
                    className="w-full bg-[#2a0808] border border-[#d4af37]/30 rounded-xl p-3 text-sm text-[#f5f2ed] focus:border-[#ffd700] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#d4af37] mb-1">
                    {t.villageLocation}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Pundal East / Kolkata"
                    value={villageName}
                    onChange={(e) => setVillageName(e.target.value)}
                    className="w-full bg-[#2a0808] border border-[#d4af37]/30 rounded-xl p-3 text-sm text-[#f5f2ed] focus:border-[#ffd700] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#d4af37] mb-1">
                  {t.devotionalMessage}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Maa Durga bless Pundal village with joy and health"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#2a0808] border border-[#d4af37]/30 rounded-xl p-3 text-sm text-[#f5f2ed] focus:border-[#ffd700] outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#d4af37] via-[#f5f2ed] to-[#aa820a] hover:brightness-110 text-[#1a0505] p-3.5 rounded-xl font-bold text-sm shadow-xl transition-all cursor-pointer"
              >
                {isSubmitting ? 'Recording Donation...' : `${t.confirmDonationBtn} (₹${amount})`}
              </button>
            </form>
          </div>

          {/* Donors Wall of Appreciation */}
          <div className="bg-[#1a0505] p-6 sm:p-8 rounded-2xl gold-border space-y-4">
            <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#ffd700]" />
                <h3 className="text-lg font-serif-cinzel font-bold text-[#ffd700]">
                  {t.donorsWallTitle}
                </h3>
              </div>
              <span className="text-xs text-[#d4af37]">
                {t.totalContributions}: {donations.length}
              </span>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
              {donations.map((don) => (
                <div
                  key={don.id}
                  className="bg-[#2a0808]/70 p-4 rounded-xl border border-[#d4af37]/20 flex items-center justify-between gap-4"
                >
                  <div>
                    <span className="block text-sm font-bold text-[#f5f2ed]">{don.donorName}</span>
                    <span className="block text-[11px] text-[#d4af37]">{don.villageName} • {don.date}</span>
                    {don.message && (
                      <p className="text-xs text-[#f5f2ed]/70 italic mt-1">"{don.message}"</p>
                    )}
                  </div>

                  <div className="bg-[#1a0505] px-3 py-1.5 rounded-lg border border-[#d4af37]/40 text-sm font-bold text-[#ffd700] whitespace-nowrap">
                    ₹{don.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Instant Virtual Receipt Modal */}
      {submittedReceipt && (
        <div className="fixed inset-0 z-50 bg-[#120303]/90 backdrop-blur-lg flex items-center justify-center p-4">
          <div className="relative max-w-md w-full bg-[#1a0505] p-8 rounded-2xl gold-border text-center space-y-6 gold-glow">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-[#d4af37] to-[#800000] p-1 flex items-center justify-center shadow-xl">
              <Sparkles className="w-8 h-8 text-[#ffd700]" />
            </div>

            <div>
              <span className="text-xs uppercase font-bold text-[#d4af37] tracking-widest">
                Official Digital Receipt
              </span>
              <h3 className="text-2xl font-serif-cinzel font-bold text-[#ffd700] mt-1">
                Thank You For Your Donation!
              </h3>
              <p className="text-xs text-[#f5f2ed]/70 mt-1">
                Pundal Durga Puja Committee acknowledges your heartfelt contribution.
              </p>
            </div>

            <div className="bg-[#2a0808] p-4 rounded-xl gold-border text-left space-y-2 text-xs text-[#f5f2ed]">
              <div className="flex justify-between border-b border-[#d4af37]/20 pb-1">
                <span className="text-[#d4af37]">Donor:</span>
                <span className="font-bold">{submittedReceipt.donorName}</span>
              </div>
              <div className="flex justify-between border-b border-[#d4af37]/20 pb-1">
                <span className="text-[#d4af37]">Amount:</span>
                <span className="font-bold text-emerald-400">₹{submittedReceipt.amount}</span>
              </div>
              <div className="flex justify-between border-b border-[#d4af37]/20 pb-1">
                <span className="text-[#d4af37]">Date:</span>
                <span>{submittedReceipt.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#d4af37]">Receipt ID:</span>
                <span className="font-mono text-[10px]">{submittedReceipt.id}</span>
              </div>
            </div>

            <button
              onClick={() => setSubmittedReceipt(null)}
              className="w-full bg-[#ffd700] text-[#1a0505] font-bold p-3 rounded-xl hover:brightness-110 cursor-pointer"
            >
              Close & Return
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
