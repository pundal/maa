import React, { useState } from 'react';
import { Photo } from '../types';
import { Image as ImageIcon, Plus, Trash2, X, ZoomIn, Calendar, Upload, Sparkles, Lock, Shield, CheckCircle2, KeyRound } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface PhotoMemoriesProps {
  photos: Photo[];
  onAddPhoto: (photo: Omit<Photo, 'id'>) => Promise<void>;
  onDeletePhoto: (id: string) => Promise<void>;
  isAdminLoggedIn: boolean;
  onAdminLogin?: (passcode: string) => boolean;
  onNavigateToAdmin?: () => void;
}

export const PhotoMemories: React.FC<PhotoMemoriesProps> = ({
  photos,
  onAddPhoto,
  onDeletePhoto,
  isAdminLoggedIn,
  onAdminLogin,
  onNavigateToAdmin,
}) => {
  const { t } = useLanguage();
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [activePhotoModal, setActivePhotoModal] = useState<Photo | null>(null);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [showAdminAuthModal, setShowAdminAuthModal] = useState<boolean>(false);
  const [adminPinInput, setAdminPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<boolean>(false);

  // New photo form states
  const [newYear, setNewYear] = useState<string>('2024');
  const [newCaption, setNewCaption] = useState<string>('');
  const [newImageUrl, setNewImageUrl] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const years = ['All', ...Array.from(new Set(photos.map((p) => p.year))).sort().reverse()];

  const filteredPhotos =
    selectedYear === 'All' ? photos : photos.filter((p) => p.year === selectedYear);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddClick = () => {
    if (isAdminLoggedIn) {
      setShowUploadModal(true);
    } else {
      setPinError(false);
      setAdminPinInput('');
      setShowAdminAuthModal(true);
    }
  };

  const handleAdminAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAdminLogin) {
      const success = onAdminLogin(adminPinInput);
      if (success) {
        setPinError(false);
        setShowAdminAuthModal(false);
        setAdminPinInput('');
        setShowUploadModal(true);
      } else {
        setPinError(true);
      }
    } else if (adminPinInput === '1976' || adminPinInput === 'admin') {
      setPinError(false);
      setShowAdminAuthModal(false);
      setAdminPinInput('');
      setShowUploadModal(true);
    } else {
      setPinError(true);
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdminLoggedIn) {
      setShowUploadModal(false);
      setShowAdminAuthModal(true);
      return;
    }
    if (!newImageUrl || !newCaption) return;

    setIsSubmitting(true);
    try {
      await onAddPhoto({
        year: newYear,
        caption: newCaption,
        imageUrl: newImageUrl,
        order: photos.length + 1,
        createdAt: new Date().toISOString(),
      });
      setNewCaption('');
      setNewImageUrl('');
      setShowUploadModal(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#2a0808] p-6 sm:p-8 rounded-2xl gold-border">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#d4af37]/20 border border-[#d4af37]/40 px-3 py-1 rounded-full text-xs font-semibold text-[#ffd700] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.galleryArchive}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif-cinzel font-bold text-[#ffd700]">
            {t.galleryTitle}
          </h2>
          <p className="text-xs sm:text-sm text-[#f5f2ed]/80 mt-1">
            {t.gallerySub}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
          {isAdminLoggedIn ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.adminVerifiedBadge}</span>
              </span>
              <button
                onClick={() => setShowUploadModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-[#d4af37] to-[#aa820a] hover:brightness-110 text-[#1a0505] px-5 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-xl transition-transform active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{t.addPhotoMemory}</span>
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddClick}
              className="flex items-center gap-2 bg-[#1a0505] hover:bg-[#3d0c0c] text-[#ffd700] border border-[#d4af37]/50 hover:border-[#ffd700] px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
              title="Admin Authorization Required"
            >
              <Lock className="w-4 h-4 text-[#d4af37]" />
              <span>{t.adminLoginToAddPhotos}</span>
            </button>
          )}
        </div>
      </div>

      {/* Admin Authorization Notice Bar (For normal users) */}
      {!isAdminLoggedIn && (
        <div className="bg-[#1a0505]/90 border border-[#d4af37]/30 rounded-xl px-4 py-3 flex items-center justify-between gap-3 text-xs text-[#f5f2ed]/80">
          <div className="flex items-center gap-2.5">
            <Shield className="w-4 h-4 text-[#d4af37] shrink-0" />
            <span>{t.adminPhotoNotice}</span>
          </div>
          {onNavigateToAdmin && (
            <button
              onClick={onNavigateToAdmin}
              className="text-[#ffd700] hover:underline font-bold text-xs whitespace-nowrap cursor-pointer"
            >
              Admin Panel →
            </button>
          )}
        </div>
      )}

      {/* Year Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              selectedYear === year
                ? 'bg-[#ffd700] text-[#1a0505] font-bold shadow-lg'
                : 'bg-[#2a0808]/80 text-[#f5f2ed]/70 border border-[#d4af37]/20 hover:border-[#d4af37]/50'
            }`}
          >
            {year === 'All' ? 'All Memories' : `${year} Puja`}
          </button>
        ))}
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            className="group relative bg-[#2a0808] rounded-2xl overflow-hidden gold-border gold-glow transition-all duration-300 hover:-translate-y-1.5"
          >
            <div className="relative h-64 overflow-hidden bg-[#1a0505]">
              <img
                src={photo.imageUrl}
                alt={photo.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a0505] via-transparent to-transparent opacity-80" />

              {/* Year Badge */}
              <div className="absolute top-3 left-3 bg-[#1a0505]/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#d4af37]/40 text-[11px] font-bold text-[#ffd700] flex items-center gap-1.5">
                <Calendar className="w-3 h-3 text-[#d4af37]" />
                <span>{photo.year}</span>
              </div>

              {/* Zoom Trigger */}
              <button
                onClick={() => setActivePhotoModal(photo)}
                className="absolute top-3 right-3 p-2 bg-[#1a0505]/80 backdrop-blur-md rounded-full border border-[#d4af37]/40 text-[#ffd700] hover:bg-[#d4af37] hover:text-[#1a0505] transition-colors cursor-pointer"
                title="View Fullscreen"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              {/* Admin Delete Button */}
              {isAdminLoggedIn && (
                <button
                  onClick={() => onDeletePhoto(photo.id)}
                  className="absolute bottom-3 right-3 p-2 bg-red-900/90 text-red-200 rounded-full border border-red-500/40 hover:bg-red-700 transition-colors cursor-pointer"
                  title="Delete Photo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="p-4">
              <p className="text-sm font-medium text-[#f5f2ed] line-clamp-2">
                {photo.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredPhotos.length === 0 && (
        <div className="text-center py-16 bg-[#2a0808]/40 rounded-2xl gold-border">
          <ImageIcon className="w-12 h-12 text-[#d4af37]/40 mx-auto mb-3" />
          <p className="text-sm text-[#f5f2ed]/60">No photos found for {selectedYear}</p>
        </div>
      )}

      {/* Photo Lightbox Modal */}
      {activePhotoModal && (
        <div className="fixed inset-0 z-50 bg-[#120303]/90 backdrop-blur-lg flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-[#1a0505] rounded-2xl gold-border overflow-hidden shadow-2xl">
            <button
              onClick={() => setActivePhotoModal(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-[#1a0505]/80 rounded-full text-[#ffd700] border border-[#d4af37]/40 hover:bg-[#d4af37] hover:text-[#1a0505] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[75vh] bg-black flex items-center justify-center">
              <img
                src={activePhotoModal.imageUrl}
                alt={activePhotoModal.caption}
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>

            <div className="p-6 bg-[#2a0808]">
              <div className="flex items-center gap-2 text-xs font-bold text-[#ffd700] mb-2">
                <Calendar className="w-4 h-4" />
                <span>Pundal Durga Puja {activePhotoModal.year}</span>
              </div>
              <h3 className="text-lg font-serif-cinzel font-bold text-[#f5f2ed]">
                {activePhotoModal.caption}
              </h3>
            </div>
          </div>
        </div>
      )}

      {/* Admin Authorization Prompt Modal */}
      {showAdminAuthModal && (
        <div className="fixed inset-0 z-50 bg-[#120303]/90 backdrop-blur-lg flex items-center justify-center p-4">
          <div className="relative max-w-md w-full bg-[#1a0505] p-6 sm:p-8 rounded-2xl gold-border shadow-2xl space-y-6">
            <button
              onClick={() => setShowAdminAuthModal(false)}
              className="absolute top-4 right-4 p-1 text-[#f5f2ed]/60 hover:text-[#ffd700] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#2a0808] border border-[#d4af37]/40 flex items-center justify-center">
                <Shield className="w-7 h-7 text-[#ffd700]" />
              </div>
              <h3 className="text-xl font-serif-cinzel font-bold text-[#ffd700]">
                {t.adminAuthRequiredTitle}
              </h3>
              <p className="text-xs text-[#f5f2ed]/70">
                {t.adminAuthRequiredSub}
              </p>
            </div>

            <form onSubmit={handleAdminAuthSubmit} className="space-y-4">
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-3.5 w-5 h-5 text-[#d4af37]" />
                <input
                  type="password"
                  placeholder="Enter Committee PIN"
                  value={adminPinInput}
                  onChange={(e) => setAdminPinInput(e.target.value)}
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
                className="w-full bg-gradient-to-r from-[#d4af37] to-[#aa820a] hover:brightness-110 text-[#1a0505] p-3.5 rounded-xl font-bold text-sm shadow-xl transition-all cursor-pointer"
              >
                Verify & Unlock Photo Upload
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Upload New Memory Modal (Admin Only) */}
      {showUploadModal && isAdminLoggedIn && (
        <div className="fixed inset-0 z-50 bg-[#120303]/90 backdrop-blur-lg flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full bg-[#1a0505] p-6 sm:p-8 rounded-2xl gold-border shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#ffd700]" />
                <h3 className="text-xl font-serif-cinzel font-bold text-[#ffd700]">
                  {t.addPhotoMemory}
                </h3>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-1 text-[#f5f2ed]/60 hover:text-[#ffd700] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#d4af37] mb-1">
                  Puja Year
                </label>
                <select
                  value={newYear}
                  onChange={(e) => setNewYear(e.target.value)}
                  className="w-full bg-[#2a0808] border border-[#d4af37]/30 rounded-xl p-3 text-sm text-[#f5f2ed] focus:border-[#ffd700] outline-none"
                >
                  <option value="2026">2026 Puja</option>
                  <option value="2025">2025 Puja</option>
                  <option value="2024">2024 Puja</option>
                  <option value="2023">2023 Puja</option>
                  <option value="2022">2022 Puja</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#d4af37] mb-1">
                  Caption / Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. Evening Aarti & Dhunuchi Naach at Mandap"
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  required
                  className="w-full bg-[#2a0808] border border-[#d4af37]/30 rounded-xl p-3 text-sm text-[#f5f2ed] focus:border-[#ffd700] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#d4af37] mb-1">
                  Upload Photo or Direct Image URL
                </label>
                <div className="space-y-3">
                  <label className="flex items-center justify-center gap-2 p-4 bg-[#2a0808] border-2 border-dashed border-[#d4af37]/40 rounded-xl cursor-pointer hover:border-[#ffd700]">
                    <Upload className="w-5 h-5 text-[#d4af37]" />
                    <span className="text-xs text-[#f5f2ed]">Select Image File</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  <div className="text-center text-[10px] text-[#f5f2ed]/50">OR</div>

                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="w-full bg-[#2a0808] border border-[#d4af37]/30 rounded-xl p-3 text-xs text-[#f5f2ed] focus:border-[#ffd700] outline-none"
                  />
                </div>
              </div>

              {newImageUrl && (
                <div className="mt-2 h-32 rounded-xl overflow-hidden bg-black gold-border">
                  <img src={newImageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !newImageUrl || !newCaption}
                className="w-full bg-gradient-to-r from-[#d4af37] to-[#aa820a] hover:brightness-110 disabled:opacity-50 text-[#1a0505] p-3 rounded-xl font-bold text-sm shadow-xl transition-all cursor-pointer"
              >
                {isSubmitting ? 'Saving Memory...' : t.publishPhotoBtn}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

