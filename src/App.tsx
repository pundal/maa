import React, { useEffect, useState } from 'react';
import {
  PujaInfo,
  Photo,
  ScheduleEvent,
  CommitteeMember,
  DonationRecord,
  UpiConfig,
  VirtualDiya,
} from './types';
import {
  fetchPujaInfo,
  savePujaInfo,
  fetchPhotos,
  addPhoto,
  deletePhoto,
  fetchSchedule,
  saveSchedule,
  fetchCommitteeMembers,
  saveCommitteeMembers,
  fetchDonations,
  addDonationRecord,
  deleteDonationRecord,
  fetchUpiConfig,
  saveUpiConfig,
  fetchVirtualDiyas,
  addVirtualDiya,
  deleteVirtualDiya,
  getLocalAdminSession,
  setLocalAdminSession,
} from './firebase';

import { Navbar } from './components/Navbar';
import { ThreeMandapCanvas } from './components/ThreeMandapCanvas';
import { PujaSchedule } from './components/PujaSchedule';
import { PhotoMemories } from './components/PhotoMemories';
import { DonationSection } from './components/DonationSection';
import { HistoryAndMessage } from './components/HistoryAndMessage';
import { AdminPanel } from './components/AdminPanel';
import { DiyaLightingModal } from './components/DiyaLightingModal';
import { useLanguage } from './i18n/LanguageContext';

import { Flame, Sparkles, Heart, Calendar, Image as ImageIcon, MapPin, Phone } from 'lucide-react';

export default function App() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [isDiyaModalOpen, setIsDiyaModalOpen] = useState<boolean>(false);

  // App Data States
  const [pujaInfo, setPujaInfo] = useState<PujaInfo>({
    pujaDates: 'October 18 – October 23, 2026',
    historyText: '',
    committeeMessage: '',
    updatedAt: '',
  });
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [schedule, setSchedule] = useState<ScheduleEvent[]>([]);
  const [committeeMembers, setCommitteeMembers] = useState<CommitteeMember[]>([]);
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [upiConfig, setUpiConfig] = useState<UpiConfig>({
    upiId: 'pundal.puja@upi',
    payeeName: 'Pundal Durga Puja Committee',
    accountNote: 'Donation for Pundal Durga Puja Mandap',
  });
  const [diyas, setDiyas] = useState<VirtualDiya[]>([]);

  // Load initial data
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const [infoRes, photosRes, schedRes, commRes, donRes, upiRes, diyasRes] =
          await Promise.all([
            fetchPujaInfo(),
            fetchPhotos(),
            fetchSchedule(),
            fetchCommitteeMembers(),
            fetchDonations(),
            fetchUpiConfig(),
            fetchVirtualDiyas(),
          ]);

        setPujaInfo(infoRes);
        setPhotos(photosRes);
        setSchedule(schedRes);
        setCommitteeMembers(commRes);
        setDonations(donRes);
        setUpiConfig(upiRes);
        setDiyas(diyasRes);
        setIsAdminLoggedIn(getLocalAdminSession());
      } catch (err) {
        console.error('Error loading initial applet data:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  // Handlers
  const handleAdminLogin = (passcode: string): boolean => {
    if (passcode === '1976' || passcode === '1978' || passcode === 'admin' || passcode === '123456') {
      setLocalAdminSession(true);
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setLocalAdminSession(false);
    setIsAdminLoggedIn(false);
  };

  const handleSavePujaInfo = async (newInfo: PujaInfo) => {
    await savePujaInfo(newInfo);
    setPujaInfo(newInfo);
  };

  const handleAddPhoto = async (photoData: Omit<Photo, 'id'>) => {
    const created = await addPhoto(photoData);
    setPhotos((prev) => [created, ...prev]);
  };

  const handleDeletePhoto = async (id: string) => {
    await deletePhoto(id);
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSaveSchedule = async (newSched: ScheduleEvent[]) => {
    await saveSchedule(newSched);
    setSchedule(newSched);
  };

  const handleSaveCommittee = async (members: CommitteeMember[]) => {
    await saveCommitteeMembers(members);
    setCommitteeMembers(members);
  };

  const handleAddDonation = async (
    donorName: string,
    amount: number,
    villageName?: string,
    message?: string
  ): Promise<DonationRecord> => {
    const newDon = await addDonationRecord(donorName, amount, villageName, message);
    setDonations((prev) => [newDon, ...prev]);
    return newDon;
  };

  const handleDeleteDonation = async (id: string) => {
    await deleteDonationRecord(id);
    setDonations((prev) => prev.filter((d) => d.id !== id));
  };

  const handleSaveUpiConfig = async (newUpi: UpiConfig) => {
    await saveUpiConfig(newUpi);
    setUpiConfig(newUpi);
  };

  const handleAddDiya = async (devoteeName: string, message: string) => {
    const newDiya = await addVirtualDiya(devoteeName, message);
    setDiyas((prev) => [newDiya, ...prev]);
  };

  const handleDeleteDiya = async (id: string) => {
    await deleteVirtualDiya(id);
    setDiyas((prev) => prev.filter((d) => d.id !== id));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1a0505] flex flex-col items-center justify-center p-4 text-[#f5f2ed]">
        <div className="w-16 h-16 rounded-full border-4 border-[#d4af37]/30 border-t-[#ffd700] animate-spin mb-4" />
        <h2 className="text-xl font-serif-cinzel font-bold text-[#ffd700]">
          Loading Pundal Durga Puja Mandap...
        </h2>
        <p className="text-xs text-[#d4af37]/70 mt-1">Initializing 3D Mandap & Village Records</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a0505] text-[#f5f2ed] flex flex-col selection:bg-[#d4af37] selection:text-[#1a0505]">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#3d0c0c] via-[#800000] to-[#3d0c0c] py-2 px-4 border-b border-[#d4af37]/30 text-center text-xs font-bold text-[#ffd700] flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        <span>{t.goldenJubileeBadge} • {t.shubhoSharadiya}</span>
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
      </div>

      {/* Main Sticky Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAdminLoggedIn={isAdminLoggedIn}
        onAdminLogout={handleAdminLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* TAB 1: HOME & 3D MANDAP */}
        {activeTab === 'home' && (
          <div className="space-y-12">
            {/* 3D Mandap Hero Scene */}
            <ThreeMandapCanvas
              diyas={diyas}
              onLightDiyaClick={() => setIsDiyaModalOpen(true)}
              isAdminLoggedIn={isAdminLoggedIn}
            />

            {/* Quick Access Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div
                onClick={() => setActiveTab('schedule')}
                className="bg-[#2a0808] p-6 rounded-2xl gold-border gold-glow hover:-translate-y-1 transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1a0505] border border-[#d4af37]/40 flex items-center justify-center mb-4 group-hover:bg-[#d4af37] transition-colors">
                  <Calendar className="w-6 h-6 text-[#ffd700] group-hover:text-[#1a0505]" />
                </div>
                <h3 className="text-lg font-serif-cinzel font-bold text-[#ffd700]">
                  {t.quickScheduleTitle}
                </h3>
                <p className="text-xs text-[#f5f2ed]/70 mt-1">
                  {t.quickScheduleDesc}
                </p>
              </div>

              <div
                onClick={() => setActiveTab('gallery')}
                className="bg-[#2a0808] p-6 rounded-2xl gold-border gold-glow hover:-translate-y-1 transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1a0505] border border-[#d4af37]/40 flex items-center justify-center mb-4 group-hover:bg-[#d4af37] transition-colors">
                  <ImageIcon className="w-6 h-6 text-[#ffd700] group-hover:text-[#1a0505]" />
                </div>
                <h3 className="text-lg font-serif-cinzel font-bold text-[#ffd700]">
                  {t.quickGalleryTitle}
                </h3>
                <p className="text-xs text-[#f5f2ed]/70 mt-1">
                  {t.quickGalleryDesc}
                </p>
              </div>

              <div
                onClick={() => setActiveTab('donation')}
                className="bg-[#2a0808] p-6 rounded-2xl gold-border gold-glow hover:-translate-y-1 transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1a0505] border border-[#d4af37]/40 flex items-center justify-center mb-4 group-hover:bg-[#d4af37] transition-colors">
                  <Heart className="w-6 h-6 text-red-400 group-hover:text-[#1a0505] fill-current" />
                </div>
                <h3 className="text-lg font-serif-cinzel font-bold text-[#ffd700]">
                  {t.quickDonateTitle}
                </h3>
                <p className="text-xs text-[#f5f2ed]/70 mt-1">
                  {t.quickDonateDesc}
                </p>
              </div>

              <div
                onClick={() => setActiveTab('history')}
                className="bg-[#2a0808] p-6 rounded-2xl gold-border gold-glow hover:-translate-y-1 transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1a0505] border border-[#d4af37]/40 flex items-center justify-center mb-4 group-hover:bg-[#d4af37] transition-colors">
                  <Flame className="w-6 h-6 text-[#ffd700] group-hover:text-[#1a0505]" />
                </div>
                <h3 className="text-lg font-serif-cinzel font-bold text-[#ffd700]">
                  {t.quickHistoryTitle}
                </h3>
                <p className="text-xs text-[#f5f2ed]/70 mt-1">
                  {t.quickHistoryDesc}
                </p>
              </div>
            </div>

            {/* Embedded Puja Schedule preview */}
            <PujaSchedule schedule={schedule} pujaDates={pujaInfo.pujaDates} />
          </div>
        )}

        {/* TAB 2: SCHEDULE */}
        {activeTab === 'schedule' && (
          <PujaSchedule schedule={schedule} pujaDates={pujaInfo.pujaDates} />
        )}

        {/* TAB 3: GALLERY */}
        {activeTab === 'gallery' && (
          <PhotoMemories
            photos={photos}
            onAddPhoto={handleAddPhoto}
            onDeletePhoto={handleDeletePhoto}
            isAdminLoggedIn={isAdminLoggedIn}
            onAdminLogin={handleAdminLogin}
            onNavigateToAdmin={() => setActiveTab('admin')}
          />
        )}

        {/* TAB 4: DONATION */}
        {activeTab === 'donation' && (
          <DonationSection
            upiConfig={upiConfig}
            donations={donations}
            onAddDonation={handleAddDonation}
            onDeleteDonation={handleDeleteDonation}
            isAdminLoggedIn={isAdminLoggedIn}
            onAdminLogin={handleAdminLogin}
            onNavigateToAdmin={() => setActiveTab('admin')}
          />
        )}

        {/* TAB 5: HISTORY */}
        {activeTab === 'history' && (
          <HistoryAndMessage
            pujaInfo={pujaInfo}
            committeeMembers={committeeMembers}
            diyas={diyas}
            onAddDiya={handleAddDiya}
            onDeleteDiya={handleDeleteDiya}
            isAdminLoggedIn={isAdminLoggedIn}
            onAdminLogin={handleAdminLogin}
            onNavigateToAdmin={() => setActiveTab('admin')}
          />
        )}

        {/* TAB 6: ADMIN PANEL */}
        {activeTab === 'admin' && (
          <AdminPanel
            isAdminLoggedIn={isAdminLoggedIn}
            onAdminLogin={handleAdminLogin}
            onAdminLogout={handleAdminLogout}
            pujaInfo={pujaInfo}
            onSavePujaInfo={handleSavePujaInfo}
            upiConfig={upiConfig}
            onSaveUpiConfig={handleSaveUpiConfig}
            schedule={schedule}
            onSaveSchedule={handleSaveSchedule}
            committeeMembers={committeeMembers}
            onSaveCommittee={handleSaveCommittee}
            photos={photos}
            onAddPhoto={handleAddPhoto}
            onDeletePhoto={handleDeletePhoto}
            donations={donations}
            onAddDonation={handleAddDonation}
            onDeleteDonation={handleDeleteDonation}
          />
        )}
      </main>

      {/* Diya Lighting Modal */}
      <DiyaLightingModal
        isOpen={isDiyaModalOpen}
        onClose={() => setIsDiyaModalOpen(false)}
        onLightDiya={handleAddDiya}
        isAdminLoggedIn={isAdminLoggedIn}
        onAdminLogin={handleAdminLogin}
      />

      {/* Global Footer */}
      <footer className="bg-[#120303] border-t border-[#d4af37]/20 py-10 mt-12 text-[#f5f2ed]/70 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Flame className="w-6 h-6 text-[#ffd700] fill-current" />
            <div>
              <span className="block font-serif-cinzel font-bold text-sm text-[#ffd700]">
                {t.mandapTitle}
              </span>
              <span className="block text-[11px] text-[#d4af37]/80">
                {t.committeeSub} • Golden Jubilee (1976 - 2026)
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[#d4af37]/90">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#ffd700]" />
              {t.footerLocation}
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-[#ffd700]" />
              {t.footerPhone}
            </span>
          </div>

          <div className="text-center md:text-right">
            <p>{t.footerRights}</p>
            <p className="text-[10px] text-[#d4af37]/50 mt-1">
              {t.footerOrganizedBy}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
