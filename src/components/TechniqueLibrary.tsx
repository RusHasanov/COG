import React from 'react';
import { BookOpen, Heart, Shield, Zap, Wind, Moon, Sun } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function TechniqueLibrary() {
  const { t, language } = useLanguage();

  const TECHNIQUES = [
    {
      title: t.library.breathing.title,
      desc: t.library.breathing.desc,
      icon: Wind,
      color: "text-blue-400"
    },
    {
      title: t.library.muscle.title,
      desc: t.library.muscle.desc,
      icon: Zap,
      color: "text-amber-400"
    },
    {
      title: t.library.detox.title,
      desc: t.library.detox.desc,
      icon: Shield,
      color: "text-emerald-400"
    },
    {
      title: t.library.sleep.title,
      desc: t.library.sleep.desc,
      icon: Moon,
      color: "text-purple-400"
    }
  ];

  return (
    <div className="px-6 py-12 max-w-5xl mx-auto">
      <div className="mb-12 text-center">
        <h2 className="text-4xl mb-2">{t.knowledgeBase}</h2>
        <p className="text-white/60">{t.knowledgeDesc}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {TECHNIQUES.map((item, i) => (
          <div key={i} className="glass p-8 rounded-[2rem] hover:bg-white/5 transition-all group cursor-pointer">
            <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 ${item.color}`}>
              <item.icon size={28} />
            </div>
            <h3 className="text-2xl mb-3 group-hover:text-aura-sage transition-colors">{item.title}</h3>
            <p className="text-white/50 leading-relaxed">{item.desc}</p>
            <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-widest text-white/30 group-hover:text-white/60 transition-colors">
              <span>{t.readArticle}</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 p-12 rounded-[3rem] glass relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-aura-sage/10 blur-3xl -mr-32 -mt-32 rounded-full" />
        <div className="relative z-10">
          <h2 className="text-3xl mb-4">{t.weeklyChallenge}</h2>
          <p className="text-white/60 mb-8 max-w-xl">
            {t.challengeDesc}
          </p>
          <button className="px-8 py-3 rounded-full bg-white text-aura-bg font-medium hover:scale-105 transition-transform">
            {t.joinChallenge}
          </button>
        </div>
      </div>
    </div>
  );
}
