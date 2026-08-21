import React, { useState } from 'react';
import { PujaInfo, UpiConfig, ScheduleEvent, CommitteeMember, Photo, DonationRecord } from '../types';
import { Shield, KeyRound, Save, Plus, Trash2, CheckCircle2, Lock, Edit3, QrCode, Calendar, Info, Upload, Image as ImageIcon, Users, Heart, Sparkles } from 'lucide-react';

interface AdminPanelProps {
  isAdminLoggedIn: boolean;
  onAdminLogin: (passcode: string) => boolean;
  onAdminLogout: () => void;
  pujaInfo: PujaInfo;
  onSavePujaInfo: (info: PujaInfo) => Promise<void>;
  upiConfig: UpiConfig;
  onSaveUpiConfig: (config: UpiConfig) => Promise<void>;
  schedule: ScheduleEvent[];
  onSaveSchedule: (sched: ScheduleEvent[]) => Promise<void>;
  committeeMembers: CommitteeMember[];
  onSaveCommittee: (members: CommitteeMember[]) => Promise<void>;
  photos: Photo[];
  onAddPhoto?: (photo: Omit<Photo, 'id'>) => Promise<void>;
  onDeletePhoto: (id: string) => Promise<void>;
  donations?: DonationRecord[];
  onAddDonation?: (donorName: string, amount: number, villageName?: string, message?: string) => Promise<DonationRecord | void>;
  onDeleteDonation?: (id: string) => Promise<void>;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isAdminLoggedIn,
  onAdminLogin,
  onAdminLogout,
  pujaInfo,
  onSavePujaInfo,
  upiConfig,
  onSaveUpiConfig,
  schedule,
  onSaveSchedule,
  committeeMembers,
  onSaveCommittee,
  photos,
  onAddPhoto,
  onDeletePhoto,
  donations = [],
  onAddDonation,
  onDeleteDonation,
}) => {
  const [passcode, setPasscode] = useState<string>('');
  const [loginError, setLoginError] = useState<boolean>(false);

  // Form states
  const [editedInfo, setEditedInfo] = useState<PujaInfo>({ ...pujaInfo });
  const [editedUpi, setEditedUpi] = useState<UpiConfig>({ ...upiConfig });
  const [editedSchedule, setEditedSchedule] = useState<ScheduleEvent[]>([...schedule]);
  const [editedMembers, setEditedMembers] = useState<CommitteeMember[]>([...committeeMembers]);

  // Admin New Photo Form states
  const [newPhotoYear, setNewPhotoYear] = useState<string>('2024');
  const [newPhotoCaption, setNewPhotoCaption] = useState<string>('');
  const [newPhotoUrl, setNewPhotoUrl] = useState<string>('');
  const [isUploadingPhoto, setIsUploadingPhoto] = useState<boolean>(false);
  const [showAddPhotoForm, setShowAddPhotoForm] = useState<boolean>(false);

  // Admin New Contribution Form states
  const [donorNameInput, setDonorNameInput] = useState<string>('');
  const [donorAmountInput, setDonorAmountInput] = useState<number>(501);
  const [donorVillageInput, setDonorVillageInput] = useState<string>('Pundal');
  const [donorMsgInput, setDonorMsgInput] = useState<string>('Joy Maa Durga');
  const [isAddingDonation, setIsAddingDonation] = useState<boolean>(false);
  const [showAddDonationForm, setShowAddDonationForm] = useState<boolean>(false);
  const [donationFilter, setDonationFilter] = useState<string>('');
  const [deleteConfirmDonationId, setDeleteConfirmDonationId] = useState<string | null>(null);

  const [activeSection, setActiveSection] = useState<'info' | 'upi' | 'schedule' | 'members' | 'photos' | 'donations'>('info');
  const [savedSuccessMsg, setSavedSuccessMsg] = useState<string>('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onAdminLogin(passcode);
    if (!success) {
      setLoginError(true);
    } else {
      setLoginError(false);
      setPasscode('');
    }
  };

  const notifySaved = (msg: string) => {
    setSavedSuccessMsg(msg);
    setTimeout(() => setSavedSuccessMsg(''), 3000);
  };

  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSavePujaInfo(editedInfo);
    notifySaved('Puja Info & Message saved successfully!');
  };

  const handleUpiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSaveUpiConfig(editedUpi);
    notifySaved('UPI QR Settings updated successfully!');
  };

  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSaveSchedule(editedSchedule);
    notifySaved('Schedule & Timings updated successfully!');
  };

  const handleMembersSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSaveCommittee(editedMembers);
    notifySaved('Committee Members list updated successfully!');
  };

  // If not logged in, show Login Screen
  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-md mx-auto my-12 bg-[#1a0505] p-8 rounded-2xl gold-border gold-glow text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#2a0808] border border-[#d4af37]/40 flex items-center justify-center">
          <Shield className="w-8 h-8 text-[#ffd700]" />
        </div>

        <div>
          <h2 className="text-2xl font-serif-cinzel font-bold text-[#ffd700]">
            Committee Admin Login
          </h2>
          <p className="text-xs text-[#f5f2ed]/70 mt-1">
            Enter administrative PIN or committee key to manage Pundal Durga Puja website.
          </p>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div className="relative">
            <KeyRound className="absolute left-3.5 top-3.5 w-5 h-5 text-[#d4af37]" />
            <input
              type="password"
              placeholder="Enter Committee PIN"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              required
              className="w-full bg-[#2a0808] border border-[#d4af37]/40 rounded-xl py-3 pl-11 pr-4 text-sm text-[#f5f2ed] focus:border-[#ffd700] outline-none"
            />
          </div>

          {loginError && (
            <p className="text-xs text-red-400 font-medium">
              Invalid Committee PIN! Please enter the authorized passcode.
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#d4af37] to-[#aa820a] hover:brightness-110 text-[#1a0505] p-3.5 rounded-xl font-bold text-sm shadow-xl transition-all cursor-pointer"
          >
            Access Admin Dashboard
          </button>
        </form>

        <p className="text-[11px] text-[#d4af37]/60 italic">
          Restricted to Authorized Committee Members
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Admin Top Header */}
      <div className="bg-[#2a0808] p-6 rounded-2xl gold-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#1a0505] rounded-xl border border-[#d4af37]/40">
            <Shield className="w-6 h-6 text-[#ffd700]" />
          </div>
          <div>
            <h2 className="text-xl font-serif-cinzel font-bold text-[#ffd700]">
              Pundal Committee Dashboard
            </h2>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Authenticated Session Active
            </span>
          </div>
        </div>

        <button
          onClick={onAdminLogout}
          className="bg-red-950 hover:bg-red-900 text-red-200 text-xs font-bold px-4 py-2 rounded-xl border border-red-500/30 transition-colors cursor-pointer self-start sm:self-auto"
        >
          Exit Dashboard
        </button>
      </div>

      {savedSuccessMsg && (
        <div className="bg-emerald-950/90 text-emerald-200 border border-emerald-500/50 p-4 rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{savedSuccessMsg}</span>
        </div>
      )}

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'info', label: 'Puja Dates & Info', icon: Info },
          { id: 'upi', label: 'UPI QR Settings', icon: QrCode },
          { id: 'schedule', label: 'Schedule Timetable', icon: Calendar },
          { id: 'members', label: 'Committee Members', icon: Shield },
          { id: 'photos', label: 'Manage Photos', icon: Edit3 },
          { id: 'donations', label: 'Donations & Donor Wall', icon: Heart },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as typeof activeSection)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-[#ffd700] text-[#1a0505] shadow-lg'
                  : 'bg-[#2a0808] text-[#f5f2ed]/80 border border-[#d4af37]/20 hover:border-[#d4af37]/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION 1: PUJA DATES & INFO */}
      {activeSection === 'info' && (
        <form onSubmit={handleInfoSubmit} className="bg-[#1a0505] p-6 sm:p-8 rounded-2xl gold-border space-y-6">
          <h3 className="text-xl font-serif-cinzel font-bold text-[#ffd700]">
            Edit General Puja Dates & Message
          </h3>

          <div>
            <label className="block text-xs font-bold uppercase text-[#d4af37] mb-1">
              Puja Celebration Dates Text
            </label>
            <input
              type="text"
              value={editedInfo.pujaDates}
              onChange={(e) => setEditedInfo({ ...editedInfo, pujaDates: e.target.value })}
              className="w-full bg-[#2a0808] border border-[#d4af37]/30 rounded-xl p-3 text-sm text-[#f5f2ed] focus:border-[#ffd700] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#d4af37] mb-1">
              Pundal Mandap Village History
            </label>
            <textarea
              rows={5}
              value={editedInfo.historyText}
              onChange={(e) => setEditedInfo({ ...editedInfo, historyText: e.target.value })}
              className="w-full bg-[#2a0808] border border-[#d4af37]/30 rounded-xl p-3 text-sm text-[#f5f2ed] focus:border-[#ffd700] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#d4af37] mb-1">
              Executive Committee Message
            </label>
            <textarea
              rows={4}
              value={editedInfo.committeeMessage}
              onChange={(e) => setEditedInfo({ ...editedInfo, committeeMessage: e.target.value })}
              className="w-full bg-[#2a0808] border border-[#d4af37]/30 rounded-xl p-3 text-sm text-[#f5f2ed] focus:border-[#ffd700] outline-none"
            />
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 bg-gradient-to-r from-[#d4af37] to-[#aa820a] hover:brightness-110 text-[#1a0505] px-6 py-3 rounded-xl font-bold text-sm shadow-xl transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save General Info</span>
          </button>
        </form>
      )}

      {/* SECTION 2: UPI CONFIG */}
      {activeSection === 'upi' && (
        <form onSubmit={handleUpiSubmit} className="bg-[#1a0505] p-6 sm:p-8 rounded-2xl gold-border space-y-6">
          <h3 className="text-xl font-serif-cinzel font-bold text-[#ffd700]">
            Update Committee UPI Payment QR
          </h3>

          <div>
            <label className="block text-xs font-bold uppercase text-[#d4af37] mb-1">
              UPI VPA / ID
            </label>
            <input
              type="text"
              value={editedUpi.upiId}
              onChange={(e) => setEditedUpi({ ...editedUpi, upiId: e.target.value })}
              className="w-full bg-[#2a0808] border border-[#d4af37]/30 rounded-xl p-3 text-sm font-mono text-[#f5f2ed] focus:border-[#ffd700] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#d4af37] mb-1">
              Payee Name (Shown on Bank App)
            </label>
            <input
              type="text"
              value={editedUpi.payeeName}
              onChange={(e) => setEditedUpi({ ...editedUpi, payeeName: e.target.value })}
              className="w-full bg-[#2a0808] border border-[#d4af37]/30 rounded-xl p-3 text-sm text-[#f5f2ed] focus:border-[#ffd700] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#d4af37] mb-1">
              Default Transaction Note
            </label>
            <input
              type="text"
              value={editedUpi.accountNote}
              onChange={(e) => setEditedUpi({ ...editedUpi, accountNote: e.target.value })}
              className="w-full bg-[#2a0808] border border-[#d4af37]/30 rounded-xl p-3 text-sm text-[#f5f2ed] focus:border-[#ffd700] outline-none"
            />
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 bg-gradient-to-r from-[#d4af37] to-[#aa820a] hover:brightness-110 text-[#1a0505] px-6 py-3 rounded-xl font-bold text-sm shadow-xl transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save UPI Settings</span>
          </button>
        </form>
      )}

      {/* SECTION 3: SCHEDULE */}
      {activeSection === 'schedule' && (
        <form onSubmit={handleScheduleSubmit} className="bg-[#1a0505] p-6 sm:p-8 rounded-2xl gold-border space-y-6">
          <h3 className="text-xl font-serif-cinzel font-bold text-[#ffd700]">
            Edit Durga Puja Rituals Schedule
          </h3>

          <div className="space-y-6">
            {editedSchedule.map((dayItem, dayIdx) => (
              <div key={dayItem.id} className="bg-[#2a0808] p-5 rounded-xl border border-[#d4af37]/30 space-y-4">
                <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-2">
                  <span className="font-serif-cinzel font-bold text-[#ffd700]">
                    {dayItem.day} ({dayItem.dateStr})
                  </span>
                </div>

                <div className="space-y-3">
                  {dayItem.events.map((evt, evtIdx) => (
                    <div key={evtIdx} className="grid grid-cols-1 sm:grid-cols-12 gap-2 bg-[#1a0505] p-3 rounded-lg">
                      <input
                        type="text"
                        value={evt.time}
                        onChange={(e) => {
                          const updated = [...editedSchedule];
                          updated[dayIdx].events[evtIdx].time = e.target.value;
                          setEditedSchedule(updated);
                        }}
                        className="sm:col-span-3 bg-[#2a0808] border border-[#d4af37]/20 rounded p-2 text-xs text-[#ffd700] font-bold"
                        placeholder="Time"
                      />
                      <input
                        type="text"
                        value={evt.title}
                        onChange={(e) => {
                          const updated = [...editedSchedule];
                          updated[dayIdx].events[evtIdx].title = e.target.value;
                          setEditedSchedule(updated);
                        }}
                        className="sm:col-span-8 bg-[#2a0808] border border-[#d4af37]/20 rounded p-2 text-xs text-[#f5f2ed]"
                        placeholder="Ritual Title"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...editedSchedule];
                          updated[dayIdx].events.splice(evtIdx, 1);
                          setEditedSchedule(updated);
                        }}
                        className="sm:col-span-1 text-red-400 p-2 hover:bg-red-950 rounded flex items-center justify-center cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const updated = [...editedSchedule];
                    updated[dayIdx].events.push({
                      time: '07:00 PM',
                      title: 'New Event Ritual',
                    });
                    setEditedSchedule(updated);
                  }}
                  className="flex items-center gap-1 text-xs text-[#ffd700] font-bold bg-[#1a0505] px-3 py-1.5 rounded border border-[#d4af37]/30 hover:bg-[#3d0c0c] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Ritual to {dayItem.day}</span>
                </button>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 bg-gradient-to-r from-[#d4af37] to-[#aa820a] hover:brightness-110 text-[#1a0505] px-6 py-3 rounded-xl font-bold text-sm shadow-xl transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save All Timetables</span>
          </button>
        </form>
      )}

      {/* SECTION 4: COMMITTEE MEMBERS */}
      {activeSection === 'members' && (
        <form onSubmit={handleMembersSubmit} className="bg-[#1a0505] p-6 sm:p-8 rounded-2xl gold-border space-y-6">
          <h3 className="text-xl font-serif-cinzel font-bold text-[#ffd700]">
            Manage Executive Committee List
          </h3>

          <div className="space-y-3">
            {editedMembers.map((member, idx) => (
              <div key={member.id} className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-[#2a0808] p-4 rounded-xl border border-[#d4af37]/30">
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) => {
                    const updated = [...editedMembers];
                    updated[idx].name = e.target.value;
                    setEditedMembers(updated);
                  }}
                  placeholder="Member Name"
                  className="sm:col-span-5 bg-[#1a0505] border border-[#d4af37]/20 rounded-lg p-2.5 text-xs text-[#f5f2ed]"
                />
                <input
                  type="text"
                  value={member.role}
                  onChange={(e) => {
                    const updated = [...editedMembers];
                    updated[idx].role = e.target.value;
                    setEditedMembers(updated);
                  }}
                  placeholder="Designation Role"
                  className="sm:col-span-3 bg-[#1a0505] border border-[#d4af37]/20 rounded-lg p-2.5 text-xs text-[#ffd700]"
                />
                <input
                  type="text"
                  value={member.contact || ''}
                  onChange={(e) => {
                    const updated = [...editedMembers];
                    updated[idx].contact = e.target.value;
                    setEditedMembers(updated);
                  }}
                  placeholder="Contact Phone"
                  className="sm:col-span-3 bg-[#1a0505] border border-[#d4af37]/20 rounded-lg p-2.5 text-xs text-[#f5f2ed]"
                />
                <button
                  type="button"
                  onClick={() => {
                    const updated = editedMembers.filter((_, i) => i !== idx);
                    setEditedMembers(updated);
                  }}
                  className="sm:col-span-1 text-red-400 p-2.5 hover:bg-red-950 rounded-lg flex items-center justify-center cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => {
                setEditedMembers([
                  ...editedMembers,
                  { id: 'c-' + Date.now(), name: 'New Committee Member', role: 'Executive Member', contact: '' },
                ]);
              }}
              className="flex items-center gap-1.5 bg-[#2a0808] border border-[#d4af37]/40 text-[#ffd700] px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-[#3d0c0c] cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Committee Member</span>
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 bg-gradient-to-r from-[#d4af37] to-[#aa820a] hover:brightness-110 text-[#1a0505] px-6 py-2.5 rounded-xl font-bold text-sm shadow-xl transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Members List</span>
            </button>
          </div>
        </form>
      )}

      {/* SECTION 5: PHOTOS MANAGER */}
      {activeSection === 'photos' && (
        <div className="bg-[#1a0505] p-6 sm:p-8 rounded-2xl gold-border space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#d4af37]/20 pb-4">
            <div>
              <h3 className="text-xl font-serif-cinzel font-bold text-[#ffd700]">
                Manage Published Gallery Photos ({photos.length})
              </h3>
              <p className="text-xs text-[#f5f2ed]/70 mt-1">
                Upload new high-resolution photo memories or remove outdated photos.
              </p>
            </div>

            {onAddPhoto && (
              <button
                type="button"
                onClick={() => setShowAddPhotoForm(!showAddPhotoForm)}
                className="flex items-center gap-2 bg-gradient-to-r from-[#d4af37] to-[#aa820a] hover:brightness-110 text-[#1a0505] px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>{showAddPhotoForm ? 'Close Upload Form' : 'Upload New Photo'}</span>
              </button>
            )}
          </div>

          {/* New Photo Upload Form inside Admin */}
          {showAddPhotoForm && onAddPhoto && (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!newPhotoUrl || !newPhotoCaption) return;
                setIsUploadingPhoto(true);
                try {
                  await onAddPhoto({
                    year: newPhotoYear,
                    caption: newPhotoCaption,
                    imageUrl: newPhotoUrl,
                    order: photos.length + 1,
                    createdAt: new Date().toISOString(),
                  });
                  setNewPhotoCaption('');
                  setNewPhotoUrl('');
                  setShowAddPhotoForm(false);
                  notifySaved('New photo memory published successfully!');
                } catch (err) {
                  console.error(err);
                } finally {
                  setIsUploadingPhoto(false);
                }
              }}
              className="bg-[#2a0808] p-5 rounded-xl border border-[#d4af37]/40 space-y-4"
            >
              <h4 className="text-sm font-serif-cinzel font-bold text-[#ffd700] flex items-center gap-2">
                <Upload className="w-4 h-4 text-[#d4af37]" />
                <span>Add New Photo to Gallery</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#d4af37] mb-1">
                    Puja Year
                  </label>
                  <select
                    value={newPhotoYear}
                    onChange={(e) => setNewPhotoYear(e.target.value)}
                    className="w-full bg-[#1a0505] border border-[#d4af37]/30 rounded-xl p-2.5 text-xs text-[#f5f2ed] focus:border-[#ffd700] outline-none"
                  >
                    <option value="2026">2026 Puja</option>
                    <option value="2025">2025 Puja</option>
                    <option value="2024">2024 Puja</option>
                    <option value="2023">2023 Puja</option>
                    <option value="2022">2022 Puja</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase text-[#d4af37] mb-1">
                    Photo Caption
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Maha Navami Sandhi Puja Aarti"
                    value={newPhotoCaption}
                    onChange={(e) => setNewPhotoCaption(e.target.value)}
                    required
                    className="w-full bg-[#1a0505] border border-[#d4af37]/30 rounded-xl p-2.5 text-xs text-[#f5f2ed] focus:border-[#ffd700] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#d4af37] mb-1">
                  Upload Image File or Image URL
                </label>
                <div className="space-y-2">
                  <label className="flex items-center justify-center gap-2 p-3 bg-[#1a0505] border border-dashed border-[#d4af37]/40 rounded-xl cursor-pointer hover:border-[#ffd700]">
                    <Upload className="w-4 h-4 text-[#d4af37]" />
                    <span className="text-xs text-[#f5f2ed]">Select Image File from Device</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setNewPhotoUrl(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                    />
                  </label>

                  <input
                    type="url"
                    placeholder="Or enter direct image URL: https://..."
                    value={newPhotoUrl}
                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                    className="w-full bg-[#1a0505] border border-[#d4af37]/30 rounded-xl p-2.5 text-xs text-[#f5f2ed] focus:border-[#ffd700] outline-none"
                  />
                </div>
              </div>

              {newPhotoUrl && (
                <div className="h-32 w-48 rounded-xl overflow-hidden bg-black gold-border">
                  <img src={newPhotoUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddPhotoForm(false)}
                  className="px-4 py-2 rounded-xl text-xs text-[#f5f2ed]/70 hover:bg-[#1a0505] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploadingPhoto || !newPhotoUrl || !newPhotoCaption}
                  className="bg-gradient-to-r from-[#d4af37] to-[#aa820a] hover:brightness-110 disabled:opacity-50 text-[#1a0505] px-5 py-2 rounded-xl text-xs font-bold shadow-md cursor-pointer"
                >
                  {isUploadingPhoto ? 'Publishing...' : 'Publish Photo to Gallery'}
                </button>
              </div>
            </form>
          )}

          {/* Published Photos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="bg-[#2a0808] rounded-xl p-3 border border-[#d4af37]/30 flex items-center gap-3">
                <img src={photo.imageUrl} alt={photo.caption} className="w-16 h-16 object-cover rounded-lg shrink-0 bg-black" />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-[#ffd700] uppercase block">{photo.year}</span>
                  <p className="text-xs text-[#f5f2ed] truncate font-medium">{photo.caption}</p>
                </div>
                <button
                  onClick={async () => {
                    await onDeletePhoto(photo.id);
                    notifySaved('Photo deleted from gallery.');
                  }}
                  className="p-2 text-red-400 hover:bg-red-950 rounded-lg shrink-0 cursor-pointer transition-colors"
                  title="Delete Photo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {photos.length === 0 && (
            <div className="text-center py-8 text-xs text-[#f5f2ed]/60">
              No photo memories published yet. Click "Upload New Photo" above to add the first memory.
            </div>
          )}
        </div>
      )}

      {/* SECTION 6: MANAGE DONATIONS & DONOR WALL */}
      {activeSection === 'donations' && (
        <div className="bg-[#1a0505] p-6 sm:p-8 rounded-2xl gold-border space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#d4af37]/20 pb-4">
            <div>
              <h3 className="text-lg font-serif-cinzel font-bold text-[#ffd700] flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-400 fill-current" />
                Manage Donations & Donor Wall
              </h3>
              <p className="text-xs text-[#f5f2ed]/70 mt-0.5">
                Record new contributions, view collections, and manage donor wall visibility with deletion privileges.
              </p>
            </div>

            <button
              onClick={() => setShowAddDonationForm(!showAddDonationForm)}
              className="flex items-center gap-2 bg-[#ffd700] text-[#1a0505] font-bold px-4 py-2 rounded-xl text-xs shadow-md hover:brightness-110 transition-all cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>{showAddDonationForm ? 'Close Form' : 'Record New Contribution'}</span>
            </button>
          </div>

          {/* Key Financial Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#2a0808] p-4 rounded-xl border border-[#d4af37]/30">
              <span className="text-[11px] text-[#d4af37] uppercase font-bold block">Total Funds Recorded</span>
              <span className="text-xl font-bold text-emerald-400 mt-1 block">
                ₹{donations.reduce((sum, d) => sum + (Number(d.amount) || 0), 0).toLocaleString('en-IN')}
              </span>
            </div>
            <div className="bg-[#2a0808] p-4 rounded-xl border border-[#d4af37]/30">
              <span className="text-[11px] text-[#d4af37] uppercase font-bold block">Total Devotee Donors</span>
              <span className="text-xl font-bold text-[#ffd700] mt-1 block">
                {donations.length} Contributions
              </span>
            </div>
            <div className="bg-[#2a0808] p-4 rounded-xl border border-[#d4af37]/30">
              <span className="text-[11px] text-[#d4af37] uppercase font-bold block">Average Donation</span>
              <span className="text-xl font-bold text-[#f5f2ed] mt-1 block">
                ₹{donations.length > 0 ? Math.round(donations.reduce((sum, d) => sum + (Number(d.amount) || 0), 0) / donations.length).toLocaleString('en-IN') : 0}
              </span>
            </div>
          </div>

          {/* New Contribution Form */}
          {showAddDonationForm && (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!onAddDonation || donorAmountInput <= 0) return;
                setIsAddingDonation(true);
                try {
                  await onAddDonation(
                    donorNameInput || 'Anonymous Devotee',
                    donorAmountInput,
                    donorVillageInput,
                    donorMsgInput
                  );
                  notifySaved('Contribution registered successfully!');
                  setDonorNameInput('');
                  setDonorAmountInput(501);
                  setDonorMsgInput('Joy Maa Durga');
                  setShowAddDonationForm(false);
                } finally {
                  setIsAddingDonation(false);
                }
              }}
              className="bg-[#2a0808] p-5 rounded-xl border border-[#d4af37]/40 space-y-4"
            >
              <h4 className="text-sm font-serif-cinzel font-bold text-[#ffd700] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#ffd700]" />
                Record Devotee Contribution & Generate Receipt
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#d4af37] uppercase mb-1">Donor Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Samarjit Das"
                    value={donorNameInput}
                    onChange={(e) => setDonorNameInput(e.target.value)}
                    required
                    className="w-full bg-[#1a0505] border border-[#d4af37]/30 rounded-xl p-2.5 text-xs text-[#f5f2ed] focus:border-[#ffd700] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#d4af37] uppercase mb-1">Amount (₹)</label>
                  <input
                    type="number"
                    min="1"
                    value={donorAmountInput}
                    onChange={(e) => setDonorAmountInput(Number(e.target.value))}
                    required
                    className="w-full bg-[#1a0505] border border-[#d4af37]/30 rounded-xl p-2.5 text-xs text-[#f5f2ed] font-bold focus:border-[#ffd700] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#d4af37] uppercase mb-1">Village / City</label>
                  <input
                    type="text"
                    placeholder="e.g. Pundal East / Bhubaneswar"
                    value={donorVillageInput}
                    onChange={(e) => setDonorVillageInput(e.target.value)}
                    className="w-full bg-[#1a0505] border border-[#d4af37]/30 rounded-xl p-2.5 text-xs text-[#f5f2ed] focus:border-[#ffd700] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#d4af37] uppercase mb-1">Devotional Note / Prayer</label>
                <input
                  type="text"
                  placeholder="e.g. Maa Durga bless our family with good health"
                  value={donorMsgInput}
                  onChange={(e) => setDonorMsgInput(e.target.value)}
                  className="w-full bg-[#1a0505] border border-[#d4af37]/30 rounded-xl p-2.5 text-xs text-[#f5f2ed] focus:border-[#ffd700] outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddDonationForm(false)}
                  className="px-4 py-2 rounded-xl text-xs text-[#f5f2ed]/70 hover:bg-[#1a0505] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAddingDonation || !donorNameInput || donorAmountInput <= 0}
                  className="bg-gradient-to-r from-[#d4af37] to-[#aa820a] hover:brightness-110 disabled:opacity-50 text-[#1a0505] px-5 py-2 rounded-xl text-xs font-bold shadow-md cursor-pointer"
                >
                  {isAddingDonation ? 'Recording...' : 'Record & Publish to Donor Wall'}
                </button>
              </div>
            </form>
          )}

          {/* Search & Filter Bar */}
          <div className="flex items-center justify-between gap-4">
            <input
              type="text"
              placeholder="Search donor by name or village..."
              value={donationFilter}
              onChange={(e) => setDonationFilter(e.target.value)}
              className="bg-[#2a0808] border border-[#d4af37]/30 rounded-xl px-3.5 py-2 text-xs text-[#f5f2ed] focus:border-[#ffd700] outline-none max-w-sm w-full"
            />
            <span className="text-xs text-[#d4af37]/80 shrink-0">
              Showing {donations.filter((d) => !donationFilter || d.donorName.toLowerCase().includes(donationFilter.toLowerCase()) || (d.villageName && d.villageName.toLowerCase().includes(donationFilter.toLowerCase()))).length} entries
            </span>
          </div>

          {/* Donors List with Deletion Control */}
          <div className="space-y-3">
            {donations
              .filter(
                (d) =>
                  !donationFilter ||
                  d.donorName.toLowerCase().includes(donationFilter.toLowerCase()) ||
                  (d.villageName && d.villageName.toLowerCase().includes(donationFilter.toLowerCase()))
              )
              .map((don) => (
                <div
                  key={don.id}
                  className="bg-[#2a0808] p-4 rounded-xl border border-[#d4af37]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-[#f5f2ed]">{don.donorName}</span>
                      <span className="text-[10px] bg-[#1a0505] text-[#d4af37] px-2 py-0.5 rounded border border-[#d4af37]/20">
                        {don.villageName || 'Pundal'}
                      </span>
                      <span className="text-[11px] text-[#f5f2ed]/50">{don.date}</span>
                    </div>
                    {don.message && (
                      <p className="text-xs text-[#f5f2ed]/70 italic">"{don.message}"</p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                    <div className="bg-[#1a0505] px-3.5 py-1.5 rounded-lg border border-[#d4af37]/40 text-sm font-bold text-emerald-400">
                      ₹{don.amount}
                    </div>

                    {onDeleteDonation && (
                      <div>
                        {deleteConfirmDonationId === don.id ? (
                          <div className="flex items-center gap-1.5 bg-red-950 p-1.5 rounded-lg border border-red-500/40">
                            <button
                              onClick={async () => {
                                await onDeleteDonation(don.id);
                                setDeleteConfirmDonationId(null);
                                notifySaved('Donation record deleted.');
                              }}
                              className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-bold cursor-pointer"
                            >
                              Confirm Delete
                            </button>
                            <button
                              onClick={() => setDeleteConfirmDonationId(null)}
                              className="px-1.5 py-1 text-red-200 hover:text-white text-xs cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirmDonationId(don.id)}
                            className="p-2 text-red-400 hover:bg-red-950 rounded-lg shrink-0 cursor-pointer transition-colors"
                            title="Delete donation entry"
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
                No donation records found. Click "Record New Contribution" above to add one.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
