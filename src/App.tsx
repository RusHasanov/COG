import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wind, Music, Sparkles, BookOpen, Home, Settings, User, Languages, Download } from 'lucide-react';
import BreathingExercise from './components/BreathingExercise';
import SoundscapePlayer from './components/SoundscapePlayer';
import MindfulMoments from './components/MindfulMoments';
import TechniqueLibrary from './components/TechniqueLibrary';
import { NavItem } from './types';
import { useLanguage } from './LanguageContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [activeTab, setActiveTab] = useState<NavItem>('home');
  const { language, setLanguage, t } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeHero onStart={() => setActiveTab('breathe')} />;
      case 'breathe':
        return <BreathingExercise />;
      case 'sounds':
        return <SoundscapePlayer />;
      case 'mindful':
        return <MindfulMoments />;
      case 'library':
        return <TechniqueLibrary />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Background Glows */}
      <div className="aura-glow top-0 left-0 w-[500px] h-[500px] bg-aura-sage/20 -translate-x-1/2 -translate-y-1/2 rounded-full" />
      <div className="aura-glow bottom-0 right-0 w-[600px] h-[600px] bg-aura-amber/10 translate-x-1/3 translate-y-1/3 rounded-full" />
      
      {/* Header */}
      <header className="px-8 py-10 flex justify-between items-center relative z-20">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-white animate-pulse" />
          </div>
          <h1 className="text-2xl tracking-widest uppercase font-sans font-light">{t.appName}</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLanguage(language === 'en' ? 'ru' : 'en')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full glass hover:bg-white/10 transition-colors text-sm font-medium"
          >
            <Languages size={16} />
            <span>{language === 'en' ? 'RU' : 'EN'}</span>
          </button>
          <button className="p-2 text-white/40 hover:text-white transition-colors">
            <User size={20} />
          </button>
          <button className="p-2 text-white/40 hover:text-white transition-colors">
            <Settings size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="h-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* PWA Install Prompt */}
      <AnimatePresence>
        {showInstallPrompt && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-28 left-6 right-6 z-[60] glass p-4 rounded-2xl flex items-center justify-between shadow-2xl border border-white/10"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                <Download size={20} className="text-aura-bg" />
              </div>
              <div>
                <p className="text-sm font-medium">Установить приложение</p>
                <p className="text-xs text-white/40">Для быстрого доступа к Ауре</p>
              </div>
            </div>
            <button 
              onClick={handleInstallClick}
              className="px-4 py-2 bg-white text-aura-bg rounded-lg text-sm font-medium"
            >
              Установить
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div className="glass px-4 py-3 rounded-full flex items-center gap-2 shadow-2xl">
          <NavButton 
            active={activeTab === 'home'} 
            onClick={() => setActiveTab('home')} 
            icon={<Home size={20} />} 
            label={t.home} 
          />
          <NavButton 
            active={activeTab === 'breathe'} 
            onClick={() => setActiveTab('breathe')} 
            icon={<Wind size={20} />} 
            label={t.breathe} 
          />
          <NavButton 
            active={activeTab === 'sounds'} 
            onClick={() => setActiveTab('sounds')} 
            icon={<Music size={20} />} 
            label={t.sounds} 
          />
          <NavButton 
            active={activeTab === 'mindful'} 
            onClick={() => setActiveTab('mindful')} 
            icon={<Sparkles size={20} />} 
            label={t.mindful} 
          />
          <NavButton 
            active={activeTab === 'library'} 
            onClick={() => setActiveTab('library')} 
            icon={<BookOpen size={20} />} 
            label={t.libraryTab} 
          />
        </div>
      </nav>

      {/* Bottom Padding for Nav */}
      <div className="h-32" />
    </div>
  );
}

function HomeHero({ onStart }: { onStart: () => void }) {
  const { t } = useLanguage();
  const quote = t.breathBridge;

  return (
    <div className="px-6 py-12 flex flex-col items-center justify-center min-h-[70vh] text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="mb-12 relative"
      >
        <div className="w-64 h-64 rounded-full border border-white/5 flex items-center justify-center relative">
          <div className="w-48 h-48 rounded-full border border-white/10 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-white/5 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/10 animate-pulse" />
            </div>
          </div>
          {/* Orbital elements */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-aura-sage shadow-[0_0_15px_rgba(180,190,177,0.8)]" />
          </motion.div>
        </div>
      </motion.div>

      <h2 className="text-6xl md:text-8xl mb-6 font-serif font-light tracking-tight">
        {t.findStillness.split(' ').map((word, i) => (
          <span key={i} className={cn(word === 'stillness' || word === 'покой.' ? "italic" : "")}>
            {word}{' '}
          </span>
        ))}
      </h2>
      
      <AnimatePresence mode="wait">
        {quote && (
          <motion.p 
            key={quote}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-lg text-aura-sage/80 font-serif italic mb-12 max-w-lg mx-auto"
          >
            "{quote}"
          </motion.p>
        )}
      </AnimatePresence>

      <p className="text-xl text-white/50 max-w-xl mx-auto mb-12 leading-relaxed">
        {t.journeyDesc}
      </p>

      <button 
        onClick={onStart}
        className="px-10 py-4 rounded-full bg-white text-aura-bg font-medium text-lg hover:scale-105 transition-transform shadow-2xl shadow-white/10"
      >
        {t.beginJourney}
      </button>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 group",
        active ? "bg-white text-aura-bg" : "text-white/40 hover:text-white hover:bg-white/5"
      )}
    >
      <span className={cn("transition-transform duration-300", active ? "scale-110" : "group-hover:scale-110")}>
        {icon}
      </span>
      {active && (
        <motion.span 
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 'auto', opacity: 1 }}
          className="text-sm font-medium overflow-hidden whitespace-nowrap"
        >
          {label}
        </motion.span>
      )}
    </button>
  );
}
