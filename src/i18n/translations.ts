export type Language = 'en' | 'or' | 'hi';

export interface Translations {
  // Top Banner
  shubhoSharadiya: string;
  welcomeBanner: string;

  // Navbar & Golden Jubilee
  mandap3D: string;
  scheduleNav: string;
  galleryNav: string;
  donationNav: string;
  historyNav: string;
  adminNav: string;
  donateBtn: string;
  logoutBtn: string;
  mandapTitle: string;
  committeeSub: string;
  goldenJubileeBadge: string;
  goldenJubileeSub: string;

  // 3D Canvas & Video Altar
  canvasBadge: string;
  dhakBeatsOn: string;
  playDhakBeats: string;
  mandapHeader: string;
  mandapSubtitle: string;
  lightDiyaBtn: string;
  liveVideoDarshan: string;
  view3DCanvas: string;
  playVideoBtn: string;
  pauseVideoBtn: string;
  videoPlayingBadge: string;

  // Quick Cards
  quickScheduleTitle: string;
  quickScheduleDesc: string;
  quickGalleryTitle: string;
  quickGalleryDesc: string;
  quickDonateTitle: string;
  quickDonateDesc: string;
  quickHistoryTitle: string;
  quickHistoryDesc: string;

  // Schedule
  scheduleHeader: string;
  scheduleTitle: string;
  scheduleSub: string;
  pushpanjaliReminder: string;
  pushpanjaliTime: string;
  keyRitualBadge: string;
  pushpanjaliRulesTitle: string;
  pushpanjaliRulesText: string;

  // Days
  dayShashti: string;
  daySaptami: string;
  dayAshtami: string;
  dayNavami: string;
  dayDashami: string;

  // Gallery
  galleryArchive: string;
  galleryTitle: string;
  gallerySub: string;
  addPhotoMemory: string;
  allMemories: string;
  pujaYear: string;
  captionLabel: string;
  uploadImageLabel: string;
  publishPhotoBtn: string;
  noPhotosFound: string;

  // Donation
  supportVillage: string;
  scanToPayTitle: string;
  scanToPayDesc: string;
  officialUpiQr: string;
  verifiedUpi: string;
  selectAmount: string;
  customAmount: string;
  scanInstructions: string;
  copyUpi: string;
  copiedUpi: string;
  registerContribution: string;
  registerSub: string;
  yourFullName: string;
  villageLocation: string;
  devotionalMessage: string;
  confirmDonationBtn: string;
  donorsWallTitle: string;
  totalContributions: string;

  // History & Message
  villageHeritage: string;
  historyTitle: string;
  committeeMessageTitle: string;
  committeeInvitation: string;
  committeeLeadership: string;
  devotionalWallTitle: string;
  diyasGlowing: string;
  offerPrayerTitle: string;
  devoteeNamePlaceholder: string;
  prayerPlaceholder: string;
  lightVirtualDiyaBtn: string;

  // Admin
  adminLoginTitle: string;
  adminLoginSub: string;
  enterPin: string;
  accessAdminBtn: string;
  defaultPasscodeNote: string;
  adminDashboardTitle: string;
  authenticatedSession: string;
  exitDashboard: string;
  saveGeneralInfo: string;
  saveUpiSettings: string;
  saveAllTimetables: string;
  saveMembersList: string;

  // Footer
  footerLocation: string;
  footerPhone: string;
  footerRights: string;
  footerOrganizedBy: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    shubhoSharadiya: 'Shubho Sharadiya!',
    welcomeBanner: 'Welcome to Pundal Durga Puja Mandap Official Portal',

    mandap3D: '3D Mandap',
    scheduleNav: 'Schedule & Timings',
    galleryNav: 'Photo Memories',
    donationNav: 'Scan & Pay Donation',
    historyNav: 'History & Message',
    adminNav: 'Admin Panel',
    donateBtn: 'Donate',
    logoutBtn: 'Logout Admin',
    mandapTitle: 'PUNDAL MANDAP',
    committeeSub: '50th Golden Jubilee Committee (1976-2026)',
    goldenJubileeBadge: '✨ 50TH GOLDEN JUBILEE YEAR (1976 - 2026) ✨',
    goldenJubileeSub: 'Celebrating 50 Years of Sacred Heritage, Unity & Devotion',

    canvasBadge: 'Interactive 3D Mandap Altar',
    dhakBeatsOn: 'Dhak Beats: ON',
    playDhakBeats: 'Play Dhak Beats',
    mandapHeader: 'Pundal Durga Puja Mandap',
    mandapSubtitle: '50th Golden Jubilee Celebration (1976 - 2026) • Offer your prayers & light a virtual diya on the sacred altar',
    lightDiyaBtn: 'Light a Diya',
    liveVideoDarshan: 'Live Video Darshan',
    view3DCanvas: 'Switch to 3D Canvas',
    playVideoBtn: 'Play Video',
    pauseVideoBtn: 'Pause Video',
    videoPlayingBadge: 'Maa Durga Live Video Altar',

    quickScheduleTitle: 'Puja Schedule',
    quickScheduleDesc: 'Daily Anjali, Sandhi Puja & Dhunuchi Naach timings',
    quickGalleryTitle: 'Photo Memories',
    quickGalleryDesc: 'Year-wise photo gallery & village celebrations archive',
    quickDonateTitle: 'Scan to Pay',
    quickDonateDesc: 'Offer Chanda & donations via instant UPI QR Code',
    quickHistoryTitle: 'Village History',
    quickHistoryDesc: '50-Year Golden Jubilee heritage story & President message',

    scheduleHeader: 'Official 2026 Timetable',
    scheduleTitle: 'Durga Puja Schedule & Rituals',
    scheduleSub: 'October 18 – October 23, 2026 (Maha Shashti to Vijayadashami)',
    pushpanjaliReminder: 'Pushpanjali Reminder',
    pushpanjaliTime: 'Morning Anjali starts sharp at 09:30 AM',
    keyRitualBadge: 'Key Ritual',
    pushpanjaliRulesTitle: 'Pushpanjali Rules for Devotees:',
    pushpanjaliRulesText: 'Please arrive 15 minutes before scheduled Pushpanjali timings in traditional attire. Fresh Bel leaves and Lotus flowers will be distributed by the Puja committee.',

    dayShashti: 'Maha Shashti',
    daySaptami: 'Maha Saptami',
    dayAshtami: 'Maha Ashtami',
    dayNavami: 'Maha Navami',
    dayDashami: 'Vijayadashami',

    galleryArchive: 'Pundal Memories Archive',
    galleryTitle: 'Pundal Puja Photo Memories',
    gallerySub: 'Glimpses of devotion, dhak rhythms, and village celebrations across the years.',
    addPhotoMemory: 'Add Photo Memory',
    allMemories: 'All Memories',
    pujaYear: 'Puja Year',
    captionLabel: 'Caption / Description',
    uploadImageLabel: 'Upload Photo or Direct Image URL',
    publishPhotoBtn: 'Publish Photo Memory',
    noPhotosFound: 'No photos found',

    supportVillage: 'Support Pundal Village Mandap',
    scanToPayTitle: 'Scan to Pay & Offer Donation',
    scanToPayDesc: 'Your voluntary Chanda and donations help us organize the landmark 50th Golden Jubilee Durga Puja (1976-2026), illuminate the mandap, conduct daily Bhog distribution, and support village artisans.',
    officialUpiQr: 'Official UPI QR Code',
    verifiedUpi: 'Verified Committee UPI',
    selectAmount: 'Select Donation Amount (₹)',
    customAmount: 'Custom Amount (₹)',
    scanInstructions: 'Scan with GPay, PhonePe, Paytm, BHIM or any UPI App',
    copyUpi: 'Copy',
    copiedUpi: 'Copied',
    registerContribution: 'Register Your Contribution',
    registerSub: 'After transferring via UPI, enter your details below so the committee can record your contribution on the Pundal Donors Wall.',
    yourFullName: 'Your Full Name',
    villageLocation: 'Village / Location',
    devotionalMessage: 'Devotional Message or Prayer',
    confirmDonationBtn: 'Confirm & Record Donation',
    donorsWallTitle: 'Pundal Donors Wall',
    totalContributions: 'Total Contributions',

    villageHeritage: 'Village Heritage',
    historyTitle: 'Pundal Durga Puja Mandap History',
    committeeMessageTitle: 'Committee Message',
    committeeInvitation: 'Warm Invitation From Executive Committee',
    committeeLeadership: 'Committee Leadership',
    devotionalWallTitle: 'Virtual Diyas & Prayers Offered By Devotees',
    diyasGlowing: 'Virtual Diyas Glowing',
    offerPrayerTitle: 'Offer a Prayer / Light a Diya Now',
    devoteeNamePlaceholder: 'Your Name / Family Name',
    prayerPlaceholder: 'Your Prayer or Blessing Message (e.g. Joy Maa Durga)',
    lightVirtualDiyaBtn: 'Light Virtual Diya',

    adminLoginTitle: 'Committee Admin Login',
    adminLoginSub: 'Enter administrative PIN or committee key to manage Pundal Durga Puja website.',
    enterPin: 'Enter PIN (Default: 1976)',
    accessAdminBtn: 'Access Admin Dashboard',
    defaultPasscodeNote: 'Default Committee Passcode: 1976',
    adminDashboardTitle: 'Pundal Committee Dashboard',
    authenticatedSession: 'Authenticated Session Active',
    exitDashboard: 'Exit Dashboard',
    saveGeneralInfo: 'Save General Info',
    saveUpiSettings: 'Save UPI Settings',
    saveAllTimetables: 'Save All Timetables',
    saveMembersList: 'Save Members List',

    footerLocation: 'Pundal Village Mandap Grounds',
    footerPhone: '+91 98310 12345',
    footerRights: '© 2026 Pundal Durga Puja Committee. All rights reserved.',
    footerOrganizedBy: 'Organized with devotion by Pundal villagers',
  },

  or: {
    shubhoSharadiya: 'ଶୁଭ ଶାରଦୀୟା!',
    welcomeBanner: 'ପୁଣ୍ଡାଲ ଦୁର୍ଗା ପୂଜା ମଣ୍ଡପ ଅଫିସିଆଲ୍ ପୋର୍ଟାଲକୁ ସ୍ୱାଗତ',

    mandap3D: '୩D ମଣ୍ଡପ',
    scheduleNav: 'ପୂଜା ସମୟସୂଚୀ',
    galleryNav: 'ଫୋଟୋ ସ୍ମୃତି',
    donationNav: 'ସ୍କାନ୍ ଏବଂ ଦାନ',
    historyNav: 'ଇତିହାସ ଏବଂ ସନ୍ଦେଶ',
    adminNav: 'କମିଟି ଆଡମିନ୍',
    donateBtn: 'ଦାନ କରନ୍ତୁ',
    logoutBtn: 'ଲଗଆଉଟ୍ ଆଡମିନ୍',
    mandapTitle: 'ପୁଣ୍ଡାଲ ମଣ୍ଡପ',
    committeeSub: '୫୦ତମ ସୁବର୍ଣ୍ଣ ଜୟନ୍ତୀ କମିଟି (୧୯୭୬-୨୦୨୬)',
    goldenJubileeBadge: '✨ ୫୦ତମ ସୁବର୍ଣ୍ଣ ଜୟନ୍ତୀ ବର୍ଷ (୧୯୭୬ - ୨୦୨୬) ✨',
    goldenJubileeSub: '୫୦ ବର୍ଷର ପବିତ୍ର ଐତିହ୍ୟ, ଏକତା ଏବଂ ଭକ୍ତିର ମହାଉତ୍ସବ',

    canvasBadge: 'ଇଣ୍ଟରାକ୍ଟିଭ୍ ୩D ମଣ୍ଡପ ଅଲଟାର୍',
    dhakBeatsOn: 'ଢାକ୍ ଶବ୍ଦ: ଚାଲୁ',
    playDhakBeats: 'ଢାକ୍ ଶବ୍ଦ ବଜାନ୍ତୁ',
    mandapHeader: 'ପୁଣ୍ଡାଲ ଦୁର୍ଗା ପୂଜା ମଣ୍ଡପ',
    mandapSubtitle: '୫୦ତମ ସୁବର୍ଣ୍ଣ ଜୟନ୍ତୀ ଉତ୍ସବ (୧୯୭୬ - ୨୦୨୬) • ପବିତ୍ର ମଣ୍ଡପରେ ପ୍ରାର୍ଥନା କରନ୍ତୁ ଏବଂ ଦୀପ ଜାଳନ୍ତୁ',
    lightDiyaBtn: 'ଦୀପ ଜାଳନ୍ତୁ',
    liveVideoDarshan: 'ଲାଇଭ୍ ଭିଡିଓ ଦର୍ଶନ',
    view3DCanvas: '୩D କାନଭାସକୁ ଯାଆନ୍ତୁ',
    playVideoBtn: 'ଭିଡିଓ ଚଲାନ୍ତୁ',
    pauseVideoBtn: 'ଭିଡିଓ ରଖନ୍ତୁ',
    videoPlayingBadge: 'ମା’ ଦୁର୍ଗା ଲାଇଭ୍ ଭିଡିଓ ମଣ୍ଡପ',

    quickScheduleTitle: 'ପୂଜା ସମୟସୂଚୀ',
    quickScheduleDesc: 'ଦୈନିକ ଅଞ୍ଜଳି, ସନ୍ଧି ପୂଜା ଏବଂ ଧୁନୁଚି ନୃତ୍ୟ ସମୟ',
    quickGalleryTitle: 'ଫୋଟୋ ସ୍ମୃତି',
    quickGalleryDesc: 'ବର୍ଷୱାରୀ ଫୋଟୋ ଗ୍ୟାଲେରୀ ଏବଂ ଗ୍ରାମୀଣ ଉତ୍ସବ',
    quickDonateTitle: 'ସ୍କାନ୍ ଏବଂ ଦାନ',
    quickDonateDesc: 'ତତ୍କାଳ UPI QR କୋଡ୍ ମାଧ୍ୟମରେ ଦାନ କରନ୍ତୁ',
    quickHistoryTitle: 'ଗ୍ରାମ ଇତିହାସ',
    quickHistoryDesc: '୫୦ ବର୍ଷର ସୁବର୍ଣ୍ଣ ଜୟନ୍ତୀ ଗୌରବମୟ ଐତିହ୍ୟ',

    scheduleHeader: 'ଅଫିସିଆଲ୍ ୨୦୨୬ ସମୟସୂଚୀ',
    scheduleTitle: 'ଦୁର୍ଗା ପୂଜା ସମୟସୂଚୀ ଏବଂ ନୀତିକାନ୍ତି',
    scheduleSub: 'ଅକ୍ଟୋବର ୧୮ – ଅକ୍ଟୋବର ୨୩, ୨୦୨୬ (ମହା ଷଷ୍ଠୀ ରୁ ବିଜୟାଦଶମୀ)',
    pushpanjaliReminder: 'ପୁଷ୍ପାଞ୍ଜଳି ସୂଚନା',
    pushpanjaliTime: 'ସକାଳ ଅଞ୍ଜଳି ଠିକ୍ ୦୯:୩୦ ରେ ଆରମ୍ଭ ହୁଏ',
    keyRitualBadge: 'ମୁଖ୍ୟ ନୀତି',
    pushpanjaliRulesTitle: 'ଭକ୍ତମାନଙ୍କ ପାଇଁ ପୁଷ୍ପାଞ୍ଜଳି ନିୟମ:',
    pushpanjaliRulesText: 'ଦୟାକରି ପାରମ୍ପରିକ ପୋଷାକ ପିନ୍ଧି ସମୟର ୧୫ ମିନିଟ୍ ପୂର୍ବରୁ ଆସନ୍ତୁ। ବେଲ ପତ୍ର ଏବଂ ପଦ୍ମ ଫୁଲ କମିଟି ଦ୍ୱାରା ବଣ୍ଟନ କରାଯିବ।',

    dayShashti: 'ମହା ଷଷ୍ଠୀ',
    daySaptami: 'ମହା ସପ୍ତମୀ',
    dayAshtami: 'ମହା ଅଷ୍ଟମୀ',
    dayNavami: 'ମହା ନବମୀ',
    dayDashami: 'ବିଜୟାଦଶମୀ',

    galleryArchive: 'ପୁଣ୍ଡାଲ ସ୍ମୃତି ଗ୍ୟାଲେରୀ',
    galleryTitle: 'ପୁଣ୍ଡାଲ ପୂଜା ଫୋଟୋ ସ୍ମୃତି',
    gallerySub: 'ବର୍ଷ ବର୍ଷ ଧରି ଭକ୍ତି, ଢାକ୍ ତାଳ ଏବଂ ଗ୍ରାମୀଣ ଉତ୍ସବର କିଛି ସୁନ୍ଦର ମୁହୂର୍ତ୍ତ।',
    addPhotoMemory: 'ଫୋଟୋ ସ୍ମୃତି ଯୋଡନ୍ତୁ',
    allMemories: 'ସମସ୍ତ ସ୍ମୃତି',
    pujaYear: 'ପୂଜା ବର୍ଷ',
    captionLabel: 'ଫୋଟୋ ବର୍ଣ୍ଣନା',
    uploadImageLabel: 'ଫୋଟୋ ଅପଲୋଡ୍ କରନ୍ତୁ କିମ୍ବା ଲିଙ୍କ୍ ଦିଅନ୍ତୁ',
    publishPhotoBtn: 'ଫୋଟୋ ସ୍ମୃତି ପ୍ରକାଶ କରନ୍ତୁ',
    noPhotosFound: 'କୌଣସି ଫୋଟୋ ମିଳିଲା ନାହିଁ',

    supportVillage: 'ପୁଣ୍ଡାଲ ଗ୍ରାମ ମଣ୍ଡପକୁ ସହଯୋଗ କରନ୍ତୁ',
    scanToPayTitle: 'ସ୍କାନ୍ କରି ଦାନ କରନ୍ତୁ',
    scanToPayDesc: 'ଆପଣଙ୍କର ସ୍ୱେଚ୍ଛାକୃତ ଦାନ ୫୦ତମ ସୁବର୍ଣ୍ଣ ଜୟନ୍ତୀ ଦୁର୍ଗା ପୂଜା (୧୯୭୬-୨୦୨୬), ମଣ୍ଡପ ଆଲୋକୀକରଣ, ଦୈନିକ ଭୋଗ ବଣ୍ଟନ ଏବଂ କାରିଗରମାନଙ୍କୁ ସାହାଯ୍ୟ କରେ।',
    officialUpiQr: 'ଅଫିସିଆଲ୍ UPI QR କୋଡ୍',
    verifiedUpi: 'ସ୍ୱୀକୃତ କମିଟି UPI',
    selectAmount: 'ଦାନ ପରିମାଣ ବାଛନ୍ତୁ (₹)',
    customAmount: 'ଅନ୍ୟ ପରିମାଣ (₹)',
    scanInstructions: 'GPay, PhonePe, Paytm, BHIM କିମ୍ବା ଯେକୌଣସି UPI ଆପ୍ ମାଧ୍ୟମରେ ସ୍କାନ୍ କରନ୍ତୁ',
    copyUpi: 'କପି',
    copiedUpi: 'କପି ହୋଇଗଲା',
    registerContribution: 'ଆପଣଙ୍କ ଦାନ ନବୀକରଣ କରନ୍ତୁ',
    registerSub: 'UPI ସ୍ଥାନାନ୍ତର ପରେ, ତଳେ ଆପଣଙ୍କ ବିବରଣୀ ପ୍ରଦାନ କରନ୍ତୁ ଯାହାଫଳରେ ଆପଣଙ୍କ ନାମ ଦାତା ତାଲିକାରେ ଅନ୍ତର୍ଭୁକ୍ତ ହେବ।',
    yourFullName: 'ଆପଣଙ୍କ ସମ୍ପୂର୍ଣ୍ଣ ନାମ',
    villageLocation: 'ଗ୍ରାମ / ସ୍ଥାନ',
    devotionalMessage: 'ଭକ୍ତିପୂତ ସନ୍ଦେଶ କିମ୍ବା ପ୍ରାର୍ଥନା',
    confirmDonationBtn: 'ଦାନ ନିଶ୍ଚିତ କରନ୍ତୁ',
    donorsWallTitle: 'ପୁଣ୍ଡାଲ ଦାତାମାନଙ୍କ ତାଲିକା',
    totalContributions: 'ମୋଟ ସହଯୋଗ',

    villageHeritage: 'ଗ୍ରାମୀଣ ଐତିହ୍ୟ',
    historyTitle: 'ପୁଣ୍ଡାଲ ଦୁର୍ଗା ପୂଜା ମଣ୍ଡପର ଇତିହାସ',
    committeeMessageTitle: 'କମିଟି ସନ୍ଦେଶ',
    committeeInvitation: 'କାର୍ଯ୍ୟକାରୀ କମିଟି ତରଫରୁ ହାର୍ଦ୍ଦିକ ନିମନ୍ତ୍ରଣ',
    committeeLeadership: 'କମିଟି ନେତୃତ୍ୱ',
    devotionalWallTitle: 'ଭକ୍ତମାନଙ୍କ ଦ୍ୱାରା ଦୀପଦାନ ଏବଂ ପ୍ରାର୍ଥନା',
    diyasGlowing: 'ଟି ଦୀପ ଜଳୁଅଛି',
    offerPrayerTitle: 'ପ୍ରାର୍ଥନା କରନ୍ତୁ / ଦୀପ ପ୍ରଜ୍ୱଳନ କରନ୍ତୁ',
    devoteeNamePlaceholder: 'ଆପଣଙ୍କ ନାମ / ପରିବାର',
    prayerPlaceholder: 'ଆପଣଙ୍କ ପ୍ରାର୍ଥନା (ଯେପରି: ଜୟ ମା’ ଦୁର୍ଗା)',
    lightVirtualDiyaBtn: 'ଦୀପ ପ୍ରଜ୍ୱଳନ କରନ୍ତୁ',

    adminLoginTitle: 'କମିଟି ଆଡମିନ୍ ଲଗଇନ୍',
    adminLoginSub: 'ପୁଣ୍ଡାଲ ଦୁର୍ଗା ପୂଜା ୱେବସାଇଟ୍ ପରିଚାଳନା ପାଇଁ PIN ପ୍ରବେଶ କରନ୍ତୁ।',
    enterPin: 'PIN ପ୍ରବେଶ କରନ୍ତୁ (ଡିଫଲ୍ଟ: 1976)',
    accessAdminBtn: 'ଆଡମିନ୍ ଡ୍ୟାସବୋର୍ଡ ଖୋଲନ୍ତୁ',
    defaultPasscodeNote: 'ଡିଫଲ୍ଟ କମିଟି PIN: 1976',
    adminDashboardTitle: 'ପୁଣ୍ଡାଲ କମିଟି ଡ୍ୟାସବୋର୍ଡ',
    authenticatedSession: 'ପ୍ରମାଣିତ ସେସନ୍ ସକ୍ରିୟ',
    exitDashboard: 'ଡ୍ୟାସବୋର୍ଡ ବନ୍ଦ କରନ୍ତୁ',
    saveGeneralInfo: 'ସୂଚନା ସଂରକ୍ଷଣ କରନ୍ତୁ',
    saveUpiSettings: 'UPI ସେଟିଂସ ସଂରକ୍ଷଣ କରନ୍ତୁ',
    saveAllTimetables: 'ସମୟସୂଚୀ ସଂରକ୍ଷଣ କରନ୍ତୁ',
    saveMembersList: 'ସଦସ୍ୟ ତାଲିକା ସଂରକ୍ଷଣ କରନ୍ତୁ',

    footerLocation: 'ପୁଣ୍ଡାଲ ଗ୍ରାମ ମଣ୍ଡପ ପ୍ରାଙ୍ଗଣ',
    footerPhone: '+91 98310 12345',
    footerRights: '© ୨୦୨୬ ପୁଣ୍ଡାଲ ଦୁର୍ଗା ପୂଜା କମିଟି। ସମସ୍ତ ଅଧିକାର ସଂରକ୍ଷିତ।',
    footerOrganizedBy: 'ପୁଣ୍ଡାଲ ଗ୍ରାମବାସୀଙ୍କ ଦ୍ୱାରା ଭକ୍ତିର ସହ ଆୟୋଜିତ',
  },

  hi: {
    shubhoSharadiya: 'शुभ शारदीय!',
    welcomeBanner: 'पुंडाल दुर्गा पूजा मंडप आधिकारिक पोर्टल में आपका स्वागत है',

    mandap3D: '3D मंडप',
    scheduleNav: 'पूजा समय-सारणी',
    galleryNav: 'फोटो यादें',
    donationNav: 'स्कैन एवं दान',
    historyNav: 'इतिहास एवं संदेश',
    adminNav: 'कमेटी एडमिन',
    donateBtn: 'दान करें',
    logoutBtn: 'लॉगआउट एडमिन',
    mandapTitle: 'पुंडाल मंडप',
    committeeSub: '50वीं स्वर्ण जयंती समिति (1976-2026)',
    goldenJubileeBadge: '✨ 50वीं स्वर्ण जयंती वर्ष (1976 - 2026) ✨',
    goldenJubileeSub: '50 वर्षों की पावन धरोहर, एकता एवं भक्ति का महाउत्सव',

    canvasBadge: 'इंटरएक्टिव 3D मंडप वेदी',
    dhakBeatsOn: 'ढाक ताल: चालू',
    playDhakBeats: 'ढाक ताल बजाएं',
    mandapHeader: 'पुंडाल दुर्गा पूजा मंडप',
    mandapSubtitle: '50वीं स्वर्ण जयंती उत्सव (1976 - 2026) • पवित्र मंडप में प्रार्थना करें और दीया जलाएं',
    lightDiyaBtn: 'दीया जलाएं',
    liveVideoDarshan: 'लाइव वीडियो दर्शन',
    view3DCanvas: '3D कैनवास पर जाएं',
    playVideoBtn: 'वीडियो चलाएं',
    pauseVideoBtn: 'वीडियो रोकें',
    videoPlayingBadge: 'मां दुर्गा लाइव वीडियो मंडप',

    quickScheduleTitle: 'पूजा समय-सारणी',
    quickScheduleDesc: 'दैनिक अंजलि, संधि पूजा एवं धुनुची नृत्य का समय',
    quickGalleryTitle: 'फोटो यादें',
    quickGalleryDesc: 'वर्षवार फोटो गैलरी एवं ग्रामीण उत्सव संग्रह',
    quickDonateTitle: 'स्कैन एवं दान',
    quickDonateDesc: 'त्वरित UPI QR कोड के माध्यम से चंदा एवं दान करें',
    quickHistoryTitle: 'गांव का इतिहास',
    quickHistoryDesc: '50 वर्षों की गौरवमयी स्वर्ण जयंती धरोहर',

    scheduleHeader: 'आधिकारिक 2026 समय-सारणी',
    scheduleTitle: 'दुर्गा पूजा समय-सारणी एवं अनुष्ठान',
    scheduleSub: '18 अक्टूबर – 23 अक्टूबर, 2026 (महा षष्ठी से विजयादशमी)',
    pushpanjaliReminder: 'पुष्पांजलि स्मरण',
    pushpanjaliTime: 'प्रातः पुष्पांजलि ठीक 09:30 बजे प्रारंभ होती है',
    keyRitualBadge: 'मुख्य अनुष्ठान',
    pushpanjaliRulesTitle: 'श्रद्धालुओं के लिए पुष्पांजलि नियम:',
    pushpanjaliRulesText: 'कृपया निर्धारित समय से 15 मिनट पूर्व पारंपरिक परिधान में पधारें। बेलपत्र एवं कमल के फूल पूजा समिति द्वारा वितरित किए जाएंगे।',

    dayShashti: 'महा षष्ठी',
    daySaptami: 'महा सप्तमी',
    dayAshtami: 'महा अष्टमी',
    dayNavami: 'महा नवमी',
    dayDashami: 'विजयादशमी',

    galleryArchive: 'पुंडाल स्मृति संग्रह',
    galleryTitle: 'पुंडाल पूजा फोटो यादें',
    gallerySub: 'वर्षों से चली आ रही भक्ति, ढाक की ताल और ग्रामीण उत्सवों की सुंदर झलकियां।',
    addPhotoMemory: 'फोटो जोड़ें',
    allMemories: 'सभी यादें',
    pujaYear: 'पूजा वर्ष',
    captionLabel: 'फोटो विवरण',
    uploadImageLabel: 'फोटो अपलोड करें या लिंक दर्ज करें',
    publishPhotoBtn: 'फोटो प्रकाशित करें',
    noPhotosFound: 'कोई फोटो नहीं मिली',

    supportVillage: 'पुंडाल ग्राम मंडप का सहयोग करें',
    scanToPayTitle: 'स्कैन करें और दान दें',
    scanToPayDesc: 'आपका स्वेच्छा से दिया गया दान 50वीं स्वर्ण जयंती दुर्गा पूजा (1976-2026), मंडप रोशनी, दैनिक भोग वितरण और कारीगरों की सहायता में योगदान देता है।',
    officialUpiQr: 'आधिकारिक UPI QR कोड',
    verifiedUpi: 'सत्यापित समिति UPI',
    selectAmount: 'दान राशि चुनें (₹)',
    customAmount: 'अन्य राशि (₹)',
    scanInstructions: 'GPay, PhonePe, Paytm, BHIM या किसी भी UPI ऐप से स्कैन करें',
    copyUpi: 'कॉपी',
    copiedUpi: 'कॉपी हो गया',
    registerContribution: 'अपना योगदान दर्ज करें',
    registerSub: 'UPI से भुगतान के पश्चात नीचे अपना विवरण दर्ज करें ताकि आपका नाम दानदाता सूची में जोड़ा जा सके।',
    yourFullName: 'आपका पूरा नाम',
    villageLocation: 'गांव / स्थान',
    devotionalMessage: 'भक्ति संदेश या प्रार्थना',
    confirmDonationBtn: 'दान दर्ज करें',
    donorsWallTitle: 'पुंडाल दानदाता सूची',
    totalContributions: 'कुल योगदान',

    villageHeritage: 'ग्रामीण धरोहर',
    historyTitle: 'पुंडाल दुर्गा पूजा मंडप का इतिहास',
    committeeMessageTitle: 'समिति संदेश',
    committeeInvitation: 'कार्यकारिणी समिति की ओर से हार्दिक निमंत्रण',
    committeeLeadership: 'समिति नेतृत्व',
    devotionalWallTitle: 'श्रद्धालुओं द्वारा प्रज्वलित दीप एवं प्रार्थनाएं',
    diyasGlowing: 'दीये जगमगा रहे हैं',
    offerPrayerTitle: 'प्रार्थना करें / दीया प्रज्वलित करें',
    devoteeNamePlaceholder: 'आपका नाम / परिवार',
    prayerPlaceholder: 'आपकी प्रार्थना (जैसे: जय मां दुर्गा)',
    lightVirtualDiyaBtn: 'दीया प्रज्वलित करें',

    adminLoginTitle: 'समिति एडमिन लॉगिन',
    adminLoginSub: 'पुंडाल दुर्गा पूजा वेबसाइट प्रबंधन हेतु एडमिन PIN दर्ज करें।',
    enterPin: 'PIN दर्ज करें (डिफ़ॉल्ट: 1976)',
    accessAdminBtn: 'एडमिन डैशबोर्ड खोलें',
    defaultPasscodeNote: 'डिफ़ॉल्ट समिति PIN: 1976',
    adminDashboardTitle: 'पुंडाल समिति डैशबोर्ड',
    authenticatedSession: 'सत्यापित सत्र सक्रिय',
    exitDashboard: 'डैशबोर्ड से बाहर निकलें',
    saveGeneralInfo: 'सामान्य जानकारी सहेजें',
    saveUpiSettings: 'UPI सेटिंग्स सहेजें',
    saveAllTimetables: 'समय-सारणी सहेजें',
    saveMembersList: 'सदस्य सूची सहेजें',

    footerLocation: 'पुंडाल ग्राम मंडप प्रांगण',
    footerPhone: '+91 98310 12345',
    footerRights: '© 2026 पुंडाल दुर्गा पूजा समिति। सर्वाधिकार सुरक्षित।',
    footerOrganizedBy: 'पुंडाल ग्रामवासियों द्वारा श्रद्धापूर्वक आयोजित',
  },
};
