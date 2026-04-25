import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { BREATHING_TECHNIQUES } from '../constants';
import { BreathingTechnique } from '../types';
import { useLanguage } from '../LanguageContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function BreathingExercise() {
  const [selectedId, setSelectedId] = useState(BREATHING_TECHNIQUES[0].id);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold1' | 'exhale' | 'hold2'>('inhale');
  const [timeLeft, setTimeLeft] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const { t } = useLanguage();

  const technique = BREATHING_TECHNIQUES.find(t => t.id === selectedId)!;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive) {
      if (timeLeft > 0) {
        timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      } else {
        // Switch phase
        switch (phase) {
          case 'inhale':
            if (technique.hold1 > 0) {
              setPhase('hold1');
              setTimeLeft(technique.hold1);
            } else {
              setPhase('exhale');
              setTimeLeft(technique.exhale);
            }
            break;
          case 'hold1':
            setPhase('exhale');
            setTimeLeft(technique.exhale);
            break;
          case 'exhale':
            if (technique.hold2 > 0) {
              setPhase('hold2');
              setTimeLeft(technique.hold2);
            } else {
              setPhase('inhale');
              setTimeLeft(technique.inhale);
              setCycleCount(c => c + 1);
            }
            break;
          case 'hold2':
            setPhase('inhale');
            setTimeLeft(technique.inhale);
            setCycleCount(c => c + 1);
            break;
        }
      }
    }
    return () => clearTimeout(timer);
  }, [isActive, timeLeft, phase, technique]);

  const toggleStart = () => {
    if (!isActive) {
      setPhase('inhale');
      setTimeLeft(technique.inhale);
    }
    setIsActive(!isActive);
  };

  const reset = () => {
    setIsActive(false);
    setPhase('inhale');
    setTimeLeft(0);
    setCycleCount(0);
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale': return t.inhale;
      case 'hold1': return t.hold;
      case 'exhale': return t.exhale;
      case 'hold2': return t.hold;
    }
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale': return 'text-aura-sage';
      case 'hold1': return 'text-aura-amber';
      case 'exhale': return 'text-aura-accent';
      case 'hold2': return 'text-aura-amber';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
      <div className="mb-12 text-center">
        <h2 className="text-4xl mb-2">{(t.techniques as any)[technique.id]?.name || technique.name}</h2>
        <p className="text-white/60 max-w-md mx-auto">{(t.techniques as any)[technique.id]?.desc || technique.description}</p>
      </div>

      <div className="relative flex items-center justify-center w-64 h-64 mb-16">
        {/* Background Glows */}
        <div className={cn(
          "absolute inset-0 rounded-full blur-3xl transition-all duration-1000 opacity-20",
          phase === 'inhale' && "bg-aura-sage scale-150",
          phase === 'hold1' && "bg-aura-amber scale-110",
          phase === 'exhale' && "bg-aura-accent scale-90",
          phase === 'hold2' && "bg-aura-amber scale-110"
        )} />

        {/* The Breathing Circle */}
        <motion.div
          animate={{
            scale: phase === 'inhale' ? 1.5 : phase === 'exhale' ? 1 : 1.25,
            opacity: isActive ? 1 : 0.5
          }}
          transition={{ duration: timeLeft || 1, ease: "easeInOut" }}
          className={cn(
            "w-48 h-48 rounded-full border-2 flex flex-col items-center justify-center transition-colors duration-1000",
            phase === 'inhale' ? "border-aura-sage" : 
            phase === 'exhale' ? "border-aura-accent" : "border-aura-amber"
          )}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center"
            >
              <span className={cn("text-2xl font-serif italic block mb-1", getPhaseColor())}>
                {isActive ? getPhaseText() : t.ready}
              </span>
              {isActive && (
                <span className="text-4xl font-light">{timeLeft}</span>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="flex items-center gap-8">
        <button 
          onClick={reset}
          className="p-4 rounded-full glass hover:bg-white/10 transition-colors"
          title={t.reset}
        >
          <RotateCcw size={24} />
        </button>

        <button 
          onClick={toggleStart}
          className="w-20 h-20 rounded-full bg-white text-aura-bg flex items-center justify-center hover:scale-105 transition-transform shadow-2xl"
        >
          {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} className="ml-1" fill="currentColor" />}
        </button>

        <div className="flex flex-col items-center">
          <span className="text-xs uppercase tracking-widest text-white/40 mb-1">{t.cycles}</span>
          <span className="text-xl font-serif">{cycleCount}</span>
        </div>
      </div>

      <div className="mt-16 flex gap-4 overflow-x-auto pb-4 max-w-full no-scrollbar">
        {BREATHING_TECHNIQUES.map(tech => (
          <button
            key={tech.id}
            onClick={() => {
              setSelectedId(tech.id);
              reset();
            }}
            className={cn(
              "px-6 py-3 rounded-full whitespace-nowrap transition-all border",
              selectedId === tech.id 
                ? "bg-white text-aura-bg border-white" 
                : "glass border-white/10 hover:border-white/30"
            )}
          >
            {(t.techniques as any)[tech.id]?.name || tech.name}
          </button>
        ))}
      </div>
    </div>
  );
}
