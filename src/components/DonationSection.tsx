import React, { useState } from 'react';
import { DonationRecord, UpiConfig } from '../types';
import { Heart, QrCode, Copy, Check, Sparkles, ShieldCheck, Download, Users, Lock, Shield, KeyRound, CheckCircle2, Trash2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../i18n/LanguageContext';

interface DonationSectionProps {
  upiConfig: UpiConfig;
  donations: DonationRecord[];
  onAddDonation: (donorName: string, amount: number, villageName?: string, message?: string) => Promise<DonationRecord | void>;
  onDeleteDonation?: (id: string) => Promise<void>;
  isAdminLoggedIn: boolean;
  onAdminLogin?: (passcode: string) => boolean;
  onNavigateToAdmin?: () => void;
}

export const DonationSection: React.FC<DonationSectionProps> = ({
  upiConfig,
  donations,
  onAddDonation,
  onDeleteDonation,
  isAdminLoggedIn,
  onAdminLogin,
  onNavigateToAdmin,
}) => {
  const { t } = useLanguage();
  const [amount, setAmount] = useState<number>(501);
  const [donorName, setDonorName] = useState<string>('');
  const [villageName, setVillageName] = useState<string>('Pundal');
  const [message, setMessage] = useState<string>('Joy Maa Durga');
  const [copied, setCopied] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedReceipt, setSubmittedReceipt] = useState<DonationRecord | null>(null);

  // Admin auth states
  const [adminPinInput, setAdminPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<boolean>(false);
  const [showAuthBox, setShowAuthBox] = useState<boolean>(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [actionNotification, setActionNotification] = useState<string>('');

  const presetAmounts = [251, 501, 1008, 2100, 5001];

  const totalDonationSum = donations.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);

  // Standard UPI URL string
  const upiUrl = `upi://pay?pa=${encodeURIComponent(upiConfig.upiId)}&pn=${encodeURIComponent(
    upiConfig.payeeName
  )}&am=${amount}&cu=INR&tn=${encodeURIComponent(upiConfig.accountNote)}`;

  // Google Chart API / QR Code generator URL for the UPI link
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    upiUrl
  )}`;

  const notifyAction = (msg: string) => {
    setActionNotification(msg);
    setTimeout(() => setActionNotification(''), 3500);
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiConfig.upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAdminAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAdminLogin) {
      const success = onAdminLogin(adminPinInput);
      if (success) {
        setPinError(false);
        setAdminPinInput('');
        setShowAuthBox(false);
        notifyAction('Admin privileges verified! You can now register contributions and manage the donor wall.');
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

  const handleDonationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdminLoggedIn) {
      setShowAuthBox(true);
      return;
    }
    if (amount <= 0) return;

    setIsSubmitting(true);
    try {
      const newRecord = await onAddDonation(
        donorName || 'Anonymous Devotee',
        amount,
        villageName,
        message
      );
      if (newRecord) {
        setSubmittedReceipt(newRecord);
      } else {
        setSubmittedReceipt({
          id: 'don-' + Date.now(),
          donorName: donorName || 'Anonymous Devotee',
          villageName,
          amount,
          date: new Date().toISOString().split('T')[0],
          message,
        });
      }

      setDonorName('');
      setMessage('Joy Maa Durga');

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

  const handleDeleteRecord = async (id: string) => {
    if (onDeleteDonation) {
      await onDeleteDonation(id);
      setDeleteConfirmId(null);
      notifyAction('Contribution record deleted from donor wall.');
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

      {actionNotification && (
        <div className="bg-emerald-950/90 text-emerald-200 border border-emerald-500/50 p-4 rounded-xl text-xs font-bold flex items-center justify-between gap-2 max-w-3xl mx-auto shadow-xl">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{actionNotification}</span>
          </div>
          <button
            onClick={() => setActionNotification('')}
            className="text-emerald-400 hover:text-white text-xs cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

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
          {/* Register Form (Enforced by Admin Privilege) */}
          <div className="bg-[#1a0505] p-6 sm:p-8 rounded-2xl gold-border space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#d4af37]/20 pb-4">
              <div>
                <h3 className="text-xl font-serif-cinzel font-bold text-[#ffd700]">
                  {t.registerContribution}
                </h3>
                <p className="text-xs text-[#f5f2ed]/70 mt-0.5">
                  {t.registerSub}
                </p>
              </div>

              {isAdminLoggedIn ? (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 text-[11px] font-semibold self-start sm:self-auto">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t.adminVerifiedBadge}</span>
                </span>
              ) : null}
            </div>

            {isAdminLoggedIn ? (
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
                  className="w-full bg-gradient-to-r from-[#d4af37] via-[#f5f2ed] to-[#aa820a] hover:brightness-110 text-[#1a0505] p-3.5 rounded-xl font-bold text-sm shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#b30000]" />
                  <span>{isSubmitting ? 'Recording Official Donation...' : `${t.confirmDonationBtn} (₹${amount})`}</span>
                </button>
              </form>
            ) : (
              /* If not logged in as Admin, show Authorization Required View */
              <div className="bg-[#2a0808]/90 border border-[#d4af37]/40 p-5 rounded-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-[#1a0505] rounded-xl border border-[#d4af37]/30">
                      <Lock className="w-5 h-5 text-[#ffd700]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-serif-cinzel font-bold text-[#ffd700]">
                        {t.adminLoginToRegisterContribution}
                      </h4>
                      <p className="text-xs text-[#f5f2ed]/70 mt-0.5">
                        {t.adminDonationNotice}
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
                    <p className="text-xs text-[#f5f2ed]/80">
                      {t.adminDonationAuthSub}
                    </p>
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
                        Verify & Unlock Form
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
          </div>

          {/* Donors Wall of Appreciation (with Admin Deletion functionality) */}
          <div className="bg-[#1a0505] p-6 sm:p-8 rounded-2xl gold-border space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#d4af37]/20 pb-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#ffd700]" />
                <h3 className="text-lg font-serif-cinzel font-bold text-[#ffd700]">
                  {t.donorsWallTitle}
                </h3>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#d4af37]">
                <span>
                  {t.totalContributions}: <strong className="text-[#ffd700]">{donations.length}</strong>
                </span>
                <span>•</span>
                <span>
                  Total: <strong className="text-emerald-400 font-bold">₹{totalDonationSum.toLocaleString('en-IN')}</strong>
                </span>
              </div>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
              {donations.map((don) => (
                <div
                  key={don.id}
                  className="bg-[#2a0808]/70 p-4 rounded-xl border border-[#d4af37]/20 flex items-center justify-between gap-4 transition-all hover:border-[#d4af37]/40"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-[#f5f2ed]">{don.donorName}</span>
                      <span className="text-[10px] bg-[#1a0505] text-[#d4af37] px-2 py-0.5 rounded border border-[#d4af37]/30">
                        {don.villageName || 'Pundal'}
                      </span>
                    </div>
                    <span className="block text-[11px] text-[#f5f2ed]/50 mt-0.5">{don.date}</span>
                    {don.message && (
                      <p className="text-xs text-[#f5f2ed]/75 italic mt-1.5 bg-[#1a0505]/40 p-2 rounded-lg border border-[#d4af37]/10">
                        "{don.message}"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="bg-[#1a0505] px-3.5 py-1.5 rounded-lg border border-[#d4af37]/40 text-sm font-bold text-[#ffd700] whitespace-nowrap shadow-sm">
                      ₹{don.amount}
                    </div>

                    {/* Admin Deletion Action Button */}
                    {isAdminLoggedIn && onDeleteDonation && (
                      <div>
                        {deleteConfirmId === don.id ? (
                          <div className="flex items-center gap-1.5 bg-red-950 p-1.5 rounded-lg border border-red-500/40">
                            <button
                              onClick={() => handleDeleteRecord(don.id)}
                              className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-[10px] font-bold cursor-pointer"
                              title="Confirm Delete"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(null)}
                              className="px-1.5 py-1 text-red-200 hover:text-white text-[10px] cursor-pointer"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirmId(don.id)}
                            className="p-2 text-red-400 hover:text-red-200 hover:bg-red-950/80 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-red-500/30"
                            title={t.deleteContributionBtn}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {donations.length === 0 && (
                <div className="text-center py-8 text-xs text-[#f5f2ed]/60">
                  No donation records yet. Authorized committee members can record the first contribution above.
                </div>
              )}
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
