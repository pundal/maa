import React, { useState } from 'react';
import { PujaInfo, UpiConfig, ScheduleEvent, CommitteeMember, Photo } from '../types';
import { Shield, KeyRound, Save, Plus, Trash2, CheckCircle2, Lock, Edit3, QrCode, Calendar, Info } from 'lucide-react';

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
  onDeletePhoto: (id: string) => Promise<void>;
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
  onDeletePhoto,
}) => {
  const [passcode, setPasscode] = useState<string>('');
  const [loginError, setLoginError] = useState<boolean>(false);

  // Form states
  const [editedInfo, setEditedInfo] = useState<PujaInfo>({ ...pujaInfo });
  const [editedUpi, setEditedUpi] = useState<UpiConfig>({ ...upiConfig });
  const [editedSchedule, setEditedSchedule] = useState<ScheduleEvent[]>([...schedule]);
  const [editedMembers, setEditedMembers] = useState<CommitteeMember[]>([...committeeMembers]);

  const [activeSection, setActiveSection] = useState<'info' | 'upi' | 'schedule' | 'members' | 'photos'>('info');
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
              placeholder="Enter PIN (Default: 1976)"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              required
              className="w-full bg-[#2a0808] border border-[#d4af37]/40 rounded-xl py-3 pl-11 pr-4 text-sm text-[#f5f2ed] focus:border-[#ffd700] outline-none"
            />
          </div>

          {loginError && (
            <p className="text-xs text-red-400 font-medium">
              Invalid PIN! Try default passcode: <strong className="underline">1976</strong>
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
          Default Golden Jubilee Passcode: 1976
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
          <h3 className="text-xl font-serif-cinzel font-bold text-[#ffd700]">
            Manage Published Gallery Photos ({photos.length})
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="bg-[#2a0808] rounded-xl p-3 border border-[#d4af37]/30 flex items-center gap-3">
                <img src={photo.imageUrl} alt={photo.caption} className="w-16 h-16 object-cover rounded-lg shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-[#ffd700] uppercase block">{photo.year}</span>
                  <p className="text-xs text-[#f5f2ed] truncate">{photo.caption}</p>
                </div>
                <button
                  onClick={() => onDeletePhoto(photo.id)}
                  className="p-2 text-red-400 hover:bg-red-950 rounded-lg shrink-0 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
