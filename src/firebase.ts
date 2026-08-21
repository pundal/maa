import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, collection, getDocs, addDoc, deleteDoc, updateDoc, Firestore } from 'firebase/firestore';
import { getAuth, Auth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { PujaInfo, Photo, ScheduleEvent, CommitteeMember, DonationRecord, UpiConfig, VirtualDiya } from './types';
import { initialPujaInfo, initialPhotos, initialSchedule, initialCommitteeMembers, initialDonations, initialUpiConfig } from './data/initialData';

// Helper to check if valid firebase config exists
const getFirebaseConfig = () => {
  const apiKey = import.meta.env?.VITE_FIREBASE_API_KEY;
  const projectId = import.meta.env?.VITE_FIREBASE_PROJECT_ID;

  if (!apiKey || apiKey === 'YOUR_API_KEY' || !projectId) {
    return null;
  }

  return {
    apiKey,
    authDomain: import.meta.env?.VITE_FIREBASE_AUTH_DOMAIN || `${projectId}.firebaseapp.com`,
    projectId,
    storageBucket: import.meta.env?.VITE_FIREBASE_STORAGE_BUCKET || `${projectId}.appspot.com`,
    messagingSenderId: import.meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: import.meta.env?.VITE_FIREBASE_APP_ID || '',
  };
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;

const config = getFirebaseConfig();
if (config) {
  try {
    app = getApps().length === 0 ? initializeApp(config) : getApp();
    db = getFirestore(app);
    auth = getAuth(app);
  } catch (err) {
    console.warn('Firebase initialization skipped or failed, using local fallback:', err);
  }
}

export { app, db, auth };

// LOCAL STORAGE PERSISTENCE HELPERS
const LOCAL_STORAGE_KEYS = {
  PUJA_INFO: 'pundal_puja_info_v1',
  PHOTOS: 'pundal_photos_v1',
  SCHEDULE: 'pundal_schedule_v1',
  COMMITTEE: 'pundal_committee_v1',
  DONATIONS: 'pundal_donations_v1',
  UPI_CONFIG: 'pundal_upi_config_v1',
  DIYAS: 'pundal_diyas_v1',
  ADMIN_LOGGED_IN: 'pundal_admin_logged_in_v1',
};

// 1. PUJA INFO
export async function fetchPujaInfo(): Promise<PujaInfo> {
  if (db) {
    try {
      const docRef = doc(db, 'puja_info', 'main');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as PujaInfo;
      }
    } catch (e) {
      console.warn('Firestore fetch failed, falling back to local storage:', e);
    }
  }

  const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.PUJA_INFO);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {}
  }
  return initialPujaInfo;
}

export async function savePujaInfo(info: PujaInfo): Promise<void> {
  info.updatedAt = new Date().toISOString();
  localStorage.setItem(LOCAL_STORAGE_KEYS.PUJA_INFO, JSON.stringify(info));

  if (db) {
    try {
      const docRef = doc(db, 'puja_info', 'main');
      await setDoc(docRef, info, { merge: true });
    } catch (e) {
      console.warn('Failed to update firestore puja_info:', e);
    }
  }
}

// 2. PHOTOS
export async function fetchPhotos(): Promise<Photo[]> {
  if (db) {
    try {
      const querySnapshot = await getDocs(collection(db, 'photos'));
      const list: Photo[] = [];
      querySnapshot.forEach((d) => {
        list.push({ id: d.id, ...d.data() } as Photo);
      });
      if (list.length > 0) {
        return list.sort((a, b) => a.order - b.order);
      }
    } catch (e) {
      console.warn('Firestore fetch photos failed:', e);
    }
  }

  const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.PHOTOS);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {}
  }
  return initialPhotos;
}

export async function addPhoto(photoData: Omit<Photo, 'id'>): Promise<Photo> {
  const newPhoto: Photo = {
    ...photoData,
    id: 'photo-' + Date.now(),
    createdAt: new Date().toISOString(),
  };

  if (db) {
    try {
      const docRef = await addDoc(collection(db, 'photos'), {
        year: photoData.year,
        caption: photoData.caption,
        imageUrl: photoData.imageUrl,
        order: photoData.order,
        createdAt: newPhoto.createdAt,
      });
      newPhoto.id = docRef.id;
    } catch (e) {
      console.warn('Firestore add photo failed, saved locally:', e);
    }
  }

  const current = await fetchPhotos();
  const updated = [newPhoto, ...current];
  localStorage.setItem(LOCAL_STORAGE_KEYS.PHOTOS, JSON.stringify(updated));
  return newPhoto;
}

export async function deletePhoto(id: string): Promise<void> {
  const current = await fetchPhotos();
  const updated = current.filter((p) => p.id !== id);
  localStorage.setItem(LOCAL_STORAGE_KEYS.PHOTOS, JSON.stringify(updated));

  if (db) {
    try {
      await deleteDoc(doc(db, 'photos', id));
    } catch (e) {
      console.warn('Firestore delete photo failed:', e);
    }
  }
}

// 3. SCHEDULE
export async function fetchSchedule(): Promise<ScheduleEvent[]> {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.SCHEDULE);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {}
  }
  return initialSchedule;
}

export async function saveSchedule(schedule: ScheduleEvent[]): Promise<void> {
  localStorage.setItem(LOCAL_STORAGE_KEYS.SCHEDULE, JSON.stringify(schedule));
}

// 4. COMMITTEE MEMBERS
export async function fetchCommitteeMembers(): Promise<CommitteeMember[]> {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.COMMITTEE);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {}
  }
  return initialCommitteeMembers;
}

export async function saveCommitteeMembers(members: CommitteeMember[]): Promise<void> {
  localStorage.setItem(LOCAL_STORAGE_KEYS.COMMITTEE, JSON.stringify(members));
}

// 5. DONATIONS
export async function fetchDonations(): Promise<DonationRecord[]> {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.DONATIONS);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {}
  }
  return initialDonations;
}

export async function addDonationRecord(donorName: string, amount: number, villageName?: string, message?: string): Promise<DonationRecord> {
  const newDonation: DonationRecord = {
    id: 'don-' + Date.now(),
    donorName: donorName.trim() || 'Anonymous Devotee',
    villageName: villageName || 'Pundal',
    amount,
    date: new Date().toISOString().split('T')[0],
    message: message || 'Joy Maa Durga',
  };

  const current = await fetchDonations();
  const updated = [newDonation, ...current];
  localStorage.setItem(LOCAL_STORAGE_KEYS.DONATIONS, JSON.stringify(updated));
  return newDonation;
}

export async function deleteDonationRecord(id: string): Promise<void> {
  const current = await fetchDonations();
  const updated = current.filter((d) => d.id !== id);
  localStorage.setItem(LOCAL_STORAGE_KEYS.DONATIONS, JSON.stringify(updated));

  if (db) {
    try {
      await deleteDoc(doc(db, 'donations', id));
    } catch (e) {
      console.warn('Firestore delete donation failed:', e);
    }
  }
}

// 6. UPI CONFIG
export async function fetchUpiConfig(): Promise<UpiConfig> {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.UPI_CONFIG);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {}
  }
  return initialUpiConfig;
}

export async function saveUpiConfig(config: UpiConfig): Promise<void> {
  localStorage.setItem(LOCAL_STORAGE_KEYS.UPI_CONFIG, JSON.stringify(config));
}

// 7. VIRTUAL DIYAS
const EXCLUDED_DIYA_NAMES = ['subhasish', 'sumit ganguly', 'ananya roy'];

export async function fetchVirtualDiyas(): Promise<VirtualDiya[]> {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.DIYAS);
  if (saved) {
    try {
      const parsed: VirtualDiya[] = JSON.parse(saved);
      // Filter out excluded names
      const filtered = parsed.filter(
        (d) =>
          !EXCLUDED_DIYA_NAMES.some((excluded) =>
            d.devoteeName.toLowerCase().includes(excluded)
          )
      );
      if (filtered.length !== parsed.length) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.DIYAS, JSON.stringify(filtered));
      }
      return filtered;
    } catch {}
  }

  const defaultDiyas: VirtualDiya[] = [
    {
      id: 'diya-init-1',
      devoteeName: 'Pundal Puja Committee',
      message: 'May Maa Durga bless all devotees and villagers with happiness & health',
      timestamp: 'Today',
      color: '#FFD700',
    },
    {
      id: 'diya-init-2',
      devoteeName: 'Pundal Devotees',
      message: 'Joy Maa Durga! Warm Golden Jubilee Greetings to everyone',
      timestamp: 'Today',
      color: '#FF8C00',
    },
  ];

  localStorage.setItem(LOCAL_STORAGE_KEYS.DIYAS, JSON.stringify(defaultDiyas));
  return defaultDiyas;
}

export async function addVirtualDiya(devoteeName: string, message: string): Promise<VirtualDiya> {
  const colors = ['#FFD700', '#FF4500', '#FF8C00', '#FF6347', '#DAA520'];
  const newDiya: VirtualDiya = {
    id: 'diya-' + Date.now(),
    devoteeName: devoteeName.trim() || 'Pundal Villager',
    message: message.trim() || 'Joy Maa Durga',
    timestamp: 'Just now',
    color: colors[Math.floor(Math.random() * colors.length)],
  };

  const current = await fetchVirtualDiyas();
  const updated = [newDiya, ...current.slice(0, 19)];
  localStorage.setItem(LOCAL_STORAGE_KEYS.DIYAS, JSON.stringify(updated));
  return newDiya;
}

export async function deleteVirtualDiya(id: string): Promise<void> {
  const current = await fetchVirtualDiyas();
  const updated = current.filter((d) => d.id !== id);
  localStorage.setItem(LOCAL_STORAGE_KEYS.DIYAS, JSON.stringify(updated));
}

// 8. ADMIN LOGIN HANDLERS (Passcode or Firebase Auth)
export function getLocalAdminSession(): boolean {
  return localStorage.getItem(LOCAL_STORAGE_KEYS.ADMIN_LOGGED_IN) === 'true';
}

export function setLocalAdminSession(loggedIn: boolean) {
  if (loggedIn) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ADMIN_LOGGED_IN, 'true');
  } else {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ADMIN_LOGGED_IN);
  }
}
