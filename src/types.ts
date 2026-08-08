export interface PujaInfo {
  id?: string;
  pujaDates: string;
  historyText: string;
  committeeMessage: string;
  updatedAt: string;
}

export interface Photo {
  id: string;
  year: string;
  caption: string;
  imageUrl: string;
  thumbnailUrl?: string;
  order: number;
  createdAt: string;
  uploadedBy?: string;
}

export interface AdminUser {
  uid: string;
  email: string;
  role?: 'admin' | 'committee';
  createdAt: string;
}

export interface CommitteeMember {
  id: string;
  name: string;
  role: string;
  contact?: string;
  photoUrl?: string;
}

export interface ScheduleEvent {
  id: string;
  day: string; // e.g., 'Maha Shashti', 'Maha Saptami', 'Maha Ashtami', 'Maha Navami', 'Vijayadashami'
  dateStr: string;
  events: {
    time: string;
    title: string;
    bengaliTitle?: string;
    description?: string;
    isKeyRitual?: boolean; // Highlight Pushpanjali, Sandhi Puja, Dhunuchi Naach
  }[];
}

export interface DonationRecord {
  id: string;
  donorName: string;
  villageName?: string;
  amount: number;
  date: string;
  message?: string;
  transactionRef?: string;
  verified?: boolean;
}

export interface UpiConfig {
  upiId: string;
  payeeName: string;
  accountNote: string;
}

export interface VirtualDiya {
  id: string;
  devoteeName: string;
  message: string;
  timestamp: string;
  color: string;
}
