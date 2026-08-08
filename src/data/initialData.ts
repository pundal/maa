import { PujaInfo, Photo, ScheduleEvent, CommitteeMember, DonationRecord, UpiConfig } from '../types';

export const initialPujaInfo: PujaInfo = {
  id: 'main',
  pujaDates: 'October 18 – October 23, 2026 (Maha Shashti to Vijayadashami)',
  historyText: `The Pundal Durga Puja Mandap proudly celebrates its landmark 50th Golden Jubilee Year (1976 - 2026), carrying a glorious 50-year heritage of devotion, culture, and community harmony in our beloved village. Founded in 1976 by village elders and visionaries, the Pundal Durga Puja stands as a shining symbol of togetherness, traditional reverence, and divine grace.

For 50 glorious years, the entire village has united to build the grandest mandap with handcrafted eco-friendly decorations, exquisite traditional Clay Protima by master idol sculptors, and reverberating Dhak beats. This Golden Jubilee 50th Year is a momentous milestone for every resident and devotee worldwide!`,
  committeeMessage: `Dear Villagers and Well-wishers,
Joi Maa Durga! On behalf of the Pundal Durga Puja Committee, we warmly invite you and your family to celebrate the holy homecoming of Maa Durga with us. Your generous contributions, active participation, and blessings make this grand festival possible every single year. Let us come together to celebrate with piety, warmth, and joy.

— Executive Committee, Pundal Village Mandap`,
  updatedAt: new Date().toISOString(),
};

export const initialUpiConfig: UpiConfig = {
  upiId: 'pundal.puja@upi',
  payeeName: 'Pundal Durga Puja Committee',
  accountNote: 'Donation for Pundal Durga Puja Mandap',
};

export const initialPhotos: Photo[] = [
  {
    id: 'photo-2024-1',
    year: '2024',
    caption: 'Maa Durga Protima Illumination & Evening Aarti at Pundal Mandap',
    imageUrl: 'https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?auto=format&fit=crop&w=1200&q=80',
    order: 1,
    createdAt: '2024-10-12T18:30:00Z',
  },
  {
    id: 'photo-2024-2',
    year: '2024',
    caption: 'Traditional Dhunuchi Naach during Sandhi Puja Night',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
    order: 2,
    createdAt: '2024-10-13T21:00:00Z',
  },
  {
    id: 'photo-2024-3',
    year: '2024',
    caption: 'Community Bhog Distribution for Villagers & Guests',
    imageUrl: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=1200&q=80',
    order: 3,
    createdAt: '2024-10-13T13:00:00Z',
  },
  {
    id: 'photo-2023-1',
    year: '2023',
    caption: 'Grand Entrance Gate Handcrafted by Local Artisans',
    imageUrl: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=1200&q=80',
    order: 1,
    createdAt: '2023-10-21T10:00:00Z',
  },
  {
    id: 'photo-2023-2',
    year: '2023',
    caption: 'Sindoor Khela & Bhasan Shobhajatra on Dashami',
    imageUrl: 'https://images.unsplash.com/photo-1514222709107-a180c68d72b4?auto=format&fit=crop&w=1200&q=80',
    order: 2,
    createdAt: '2023-10-24T16:00:00Z',
  },
  {
    id: 'photo-2022-1',
    year: '2022',
    caption: 'Evening Lighting & Cultural Music Performance at Pundal Stage',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    order: 1,
    createdAt: '2022-10-03T19:00:00Z',
  },
];

export const initialSchedule: ScheduleEvent[] = [
  {
    id: 'sched-1',
    day: 'Maha Shashti',
    dateStr: 'Day 1',
    events: [
      { time: '08:00 AM', title: 'Bodhon & Amantran', bengaliTitle: 'বোধন্‌ ও আমন্ত্রণ', description: 'Welcoming Goddess Durga with sacred rituals' },
      { time: '10:30 AM', title: 'Adhivash & Kalparambha', bengaliTitle: 'অধিবাস ও কল্পারম্ভ', description: 'Mandap sanctification ceremonies' },
      { time: '07:30 PM', title: 'Shashti Sandhya Aarti & Dhak Beats', bengaliTitle: 'সন্ধ্যা আরতি', description: 'Grand inaugural lighting and Aarti', isKeyRitual: true },
    ],
  },
  {
    id: 'sched-2',
    day: 'Maha Saptami',
    dateStr: 'Day 2',
    events: [
      { time: '06:00 AM', title: 'Nabapatrika Snan (Kola Bou Prabesh)', bengaliTitle: 'নবপত্রিকা স্নান', description: 'Holy bath ritual at village river bank' },
      { time: '09:30 AM', title: 'Saptami Puja & Pushpanjali (Batch 1)', bengaliTitle: 'সপ্তমী পুষ্পাঞ্জলি', description: 'Morning offerings for all devotees', isKeyRitual: true },
      { time: '01:00 PM', title: 'Maha Bhog Distribution', bengaliTitle: 'মহাতো প্রসাদ বিতরণ', description: 'Community lunch at Mandap grounds' },
      { time: '08:00 PM', title: 'Cultural Program - Local Youth Drama', bengaliTitle: 'সাংস্কৃতিক অনুষ্ঠান', description: 'Stage performance by village youth' },
    ],
  },
  {
    id: 'sched-3',
    day: 'Maha Ashtami',
    dateStr: 'Day 3',
    events: [
      { time: '09:00 AM', title: 'Maha Ashtami Puja & Main Pushpanjali', bengaliTitle: 'অষ্টমী পুষ্পাঞ্জলি', description: 'Most sacred morning Pushpanjali', isKeyRitual: true },
      { time: '11:30 AM', title: 'Kumari Puja', bengaliTitle: 'কুমারী পূজা', description: 'Worship of the divine mother in young maiden form' },
      { time: '05:45 PM', title: 'Sandhi Puja (108 Lamps & Lotus Flowers)', bengaliTitle: 'সন্ধি পূজা', description: 'Confluence of Ashtami & Navami with 108 diyas', isKeyRitual: true },
      { time: '09:00 PM', title: 'Dhunuchi Naach Competition', bengaliTitle: 'ধুনুচি নাচ প্রতিযোগিতা', description: 'Traditional incense dance with Dhak drums', isKeyRitual: true },
    ],
  },
  {
    id: 'sched-4',
    day: 'Maha Navami',
    dateStr: 'Day 4',
    events: [
      { time: '09:30 AM', title: 'Navami Homam & Pushpanjali', bengaliTitle: 'নবমী হোম ও পুষ্পাঞ্জলি', description: 'Sacred fire ritual and final Pushpanjali', isKeyRitual: true },
      { time: '01:30 PM', title: 'Special Grand Bhog Prasadam', bengaliTitle: 'বিশেষ ভোগ প্রসাদ', description: 'Khichudi, Labra, Payesh distribution' },
      { time: '08:00 PM', title: 'Baul & Traditional Folk Music Night', bengaliTitle: 'বাউল গান ও লোকসঙ্গীত', description: 'Renowned folk artists live performance' },
    ],
  },
  {
    id: 'sched-5',
    day: 'Vijayadashami',
    dateStr: 'Day 5',
    events: [
      { time: '09:00 AM', title: 'Dashami Puja & Aparajita Puja', bengaliTitle: 'দশমী পূজা', description: 'Farewell puja rituals' },
      { time: '11:00 AM', title: 'Devi Baran & Sindoor Khela', bengaliTitle: 'সিঁদুর খেলা', description: 'Swiny women Vermilion celebration', isKeyRitual: true },
      { time: '05:00 PM', title: 'Bhasan Shobhajatra (Visarjan Procession)', bengaliTitle: 'বিসর্জন শোভাযাত্রা', description: 'Immersion procession to village pond with Dhak drums' },
      { time: '08:30 PM', title: 'Shubho Bijoya Greetings & Sweet Distribution', bengaliTitle: 'শুভ বিজয়াসম্মিলনী', description: 'Kolatoli, sweet distribution and elder blessings' },
    ],
  },
];

export const initialCommitteeMembers: CommitteeMember[] = [
  { id: 'c1', name: 'Sri Subhasish Banerjee', role: 'President', contact: '+91 98310 12345' },
  { id: 'c2', name: 'Sri Samarjit Das', role: 'General Secretary', contact: '+91 94331 67890' },
  { id: 'c3', name: 'Sri Ashoke Kumar Ghosh', role: 'Treasurer', contact: '+91 98302 54321' },
  { id: 'c4', name: 'Smt. Maitreyi Roy', role: 'Cultural Secretary', contact: '+91 98315 98765' },
  { id: 'c5', name: 'Sri Bikash Dey', role: 'Mandap & Decoration In-Charge', contact: '+91 94320 11223' },
];

export const initialDonations: DonationRecord[] = [
  { id: 'd1', donorName: 'Biswajit Sen & Family', villageName: 'Pundal East Para', amount: 2001, date: '2026-08-01', message: 'Maa Durga bless our village' },
  { id: 'd2', donorName: 'Dr. Anupam Mukherjee', villageName: 'Kolkata (Pundal Native)', amount: 5001, date: '2026-08-02', message: 'In loving memory of Late Rabindranath Mukherjee' },
  { id: 'd3', donorName: 'Sourav Ganguly & Friends', villageName: 'Pundal Market', amount: 1100, date: '2026-08-04', message: 'Best wishes for 2026 Puja!' },
  { id: 'd4', donorName: 'Kakali Mondal', villageName: 'Pundal West', amount: 501, date: '2026-08-05', message: 'Joy Maa Durga' },
];
