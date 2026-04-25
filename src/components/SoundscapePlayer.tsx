import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, Play, Pause, CloudRain, Trees, Waves, Flame } from 'lucide-react';
import { SOUNDSCAPES } from '../constants';
import { useLanguage } from '../LanguageContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const IconMap: Record<string, any> = {
  CloudRain,
  Trees,
  Waves,
  Flame,
};

export default function SoundscapePlayer() {
  const [activeSounds, setActiveSounds] = useState<Record<string, boolean>>({});
  const [volumes, setVolumes] = useState<Record<string, number>>({});
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});
  const { t, language } = useLanguage();

  const toggleSound = (id: string) => {
    const isActive = !activeSounds[id];
    setActiveSounds(prev => ({ ...prev, [id]: isActive }));
    
    if (audioRefs.current[id]) {
      if (isActive) {
        audioRefs.current[id].play().catch(console.error);
      } else {
        audioRefs.current[id].pause();
      }
    }
  };

  const handleVolumeChange = (id: string, value: number) => {
    setVolumes(prev => ({ ...prev, [id]: value }));
    if (audioRefs.current[id]) {
      audioRefs.current[id].volume = value;
    }
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      Object.values(audioRefs.current).forEach(audio => {
        audio.pause();
        audio.src = '';
      });
    };
  }, []);

  const getSoundName = (sound: typeof SOUNDSCAPES[0]) => {
    return (t.soundNames as any)[sound.id] || sound.name;
  };

  return (
    <div className="px-6 py-12 max-w-4xl mx-auto">
      <div className="mb-12 text-center">
        <h2 className="text-4xl mb-2">{t.soundscapes}</h2>
        <p className="text-white/60">{t.soundscapesDesc}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SOUNDSCAPES.map(sound => {
          const Icon = IconMap[sound.icon];
          const isActive = activeSounds[sound.id];
          const volume = volumes[sound.id] ?? 0.5;

          return (
            <div 
              key={sound.id}
              className={cn(
                "p-6 rounded-3xl transition-all duration-500 glass flex items-center gap-6",
                isActive && "ring-1 ring-white/20 bg-white/5"
              )}
            >
              <button
                onClick={() => toggleSound(sound.id)}
                className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center transition-all",
                  isActive ? "bg-white text-aura-bg" : "bg-white/5 text-white/40 hover:bg-white/10"
                )}
              >
                <Icon size={32} />
              </button>

              <div className="flex-1">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-serif text-xl">{getSoundName(sound)}</span>
                  {isActive && (
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="w-2 h-2 rounded-full bg-aura-sage shadow-[0_0_10px_rgba(180,190,177,0.5)]"
                    />
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <VolumeX size={14} className="text-white/30" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => handleVolumeChange(sound.id, parseFloat(e.target.value))}
                    className="flex-1 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                  />
                  <Volume2 size={14} className="text-white/30" />
                </div>
              </div>

              <audio
                ref={el => { if (el) audioRefs.current[sound.id] = el; }}
                src={sound.url}
                loop
              />
            </div>
          );
        })}
      </div>

      <div className="mt-16 p-8 rounded-3xl glass border-dashed border-white/10 text-center">
        <p className="text-white/40 text-sm italic">
          {t.soundTip}
        </p>
      </div>
    </div>
  );
}
