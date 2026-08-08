import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Image as ImageIcon, Heart, BookOpen, Shield, Flame, Home, Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdminLoggedIn: boolean;
  onAdminLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isAdminLoggedIn,
  onAdminLogout,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: { code: Language; name: string; nativeName: string; flag: string }[] = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
    { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  ];

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'home', label: t.mandap3D, icon: Home },
    { id: 'schedule', label: t.scheduleNav, icon: Calendar },
    { id: 'gallery', label: t.galleryNav, icon: ImageIcon },
    { id: 'donation', label: t.donationNav, icon: Heart },
    { id: 'history', label: t.historyNav, icon: BookOpen },
    { id: 'admin', label: t.adminNav, icon: Shield, isSpecial: true },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#120303]/95 backdrop-blur-md border-b border-[#d4af37]/20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Title */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#d4af37] via-[#f5f2ed] to-[#800000] p-[2px] shadow-lg group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#1a0505] rounded-full flex items-center justify-center">
                <Flame className="w-6 h-6 text-[#ffd700] fill-current animate-pulse" />
              </div>
            </div>
            <div>
              <span className="block font-serif-cinzel text-lg sm:text-xl font-black text-[#ffd700] tracking-wider leading-none">
                {t.mandapTitle}
              </span>
              <span className="block text-[10px] sm:text-xs font-medium text-[#d4af37]/80 tracking-widest uppercase mt-1">
                {t.committeeSub}
              </span>
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#1a0505]/90 p-1.5 rounded-2xl gold-border">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-[#1a0505] shadow-lg scale-[1.02]'
                      : 'text-[#f5f2ed]/80 hover:text-[#ffd700] hover:bg-[#2a0808]'
                  } ${item.isSpecial && isAdminLoggedIn ? 'border border-amber-400/50' : ''}`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#1a0505]' : 'text-[#d4af37]'}`} />
                  <span>{item.label}</span>
                  {item.id === 'admin' && isAdminLoggedIn && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar: Language Switcher + Donate / Logout */}
          <div className="flex items-center gap-3">
            
            {/* Language Switcher Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 bg-[#2a0808] hover:bg-[#3d0c0c] text-[#ffd700] border border-[#d4af37]/40 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer hover:border-[#ffd700]"
                title="Change Language / ଭାଷା ବଦଳାନ୍ତୁ / भाषा बदलें"
                aria-label="Select Language"
              >
                <Globe className="w-4 h-4 text-[#ffd700] animate-spin-slow" />
                <span className="font-semibold">{currentLang.nativeName}</span>
                <span className="text-[10px] text-[#d4af37]/70 uppercase hidden sm:inline">({currentLang.code})</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#d4af37] transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#1a0505] border border-[#d4af37]/50 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="p-2 border-b border-[#d4af37]/20 bg-[#2a0808]/50">
                    <p className="text-[11px] font-bold text-[#d4af37] tracking-wider uppercase px-2">
                      Select Language
                    </p>
                  </div>
                  <div className="p-1 space-y-1">
                    {languages.map((lang) => {
                      const isSelected = language === lang.code;
                      return (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setIsLangOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-[#d4af37] text-[#1a0505] font-bold'
                              : 'text-[#f5f2ed] hover:bg-[#2a0808] hover:text-[#ffd700]'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span>{lang.flag}</span>
                            <span>{lang.nativeName}</span>
                            <span className="text-[10px] opacity-70">({lang.name})</span>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-[#1a0505]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Logout / Donate Action Button */}
            {isAdminLoggedIn ? (
              <button
                onClick={onAdminLogout}
                className="text-xs bg-red-950/80 hover:bg-red-900 text-red-200 px-3 py-2 rounded-xl border border-red-500/30 transition-colors font-medium cursor-pointer"
              >
                {t.logoutBtn}
              </button>
            ) : (
              <button
                onClick={() => setActiveTab('donation')}
                className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-[#d4af37] to-[#800000] text-[#f5f2ed] hover:brightness-110 px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-transform active:scale-95 cursor-pointer shadow-md"
              >
                <Heart className="w-3.5 h-3.5 text-amber-200 fill-current" />
                <span>{t.donateBtn}</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Horizontal Navigation Scrollbar */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto py-2 border-t border-[#d4af37]/10 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-[#d4af37] text-[#1a0505] font-bold'
                    : 'text-[#f5f2ed]/70 bg-[#2a0808]/60 border border-[#d4af37]/20'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
