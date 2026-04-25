import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RefreshCw, Quote } from 'lucide-react';
import Markdown from 'react-markdown';
import { useLanguage } from '../LanguageContext';

export default function MindfulMoments() {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<'affirmation' | 'tip' | 'meditation'>('affirmation');
  const { t, language } = useLanguage();

  const getStaticContent = (contentType: typeof type) => {
    const collections = {
      ru: {
        affirmation: [
          "Я спокоен, центрирован и нахожусь в мире с самим собой.",
          "Сегодня я выбираю покой вместо хаоса и осознанность вместо спешки.",
          "Моё дыхание глубокое, мой ум чист, моё сердце открыто.",
          "Я доверяю процессу жизни и отпускаю то, что не могу контролировать."
        ],
        tip: [
          "Попробуйте правило 5-4-3-2-1: назовите 5 предметов, которые видите, 4 звука, которые слышите, и так далее.",
          "Сделайте паузу и почувствуйте вес своих стоп на полу в течение 30 секунд.",
          "Выключите уведомления на телефоне на ближайшие 15 минут.",
          "Слегка опустите плечи и расслабьте челюсть прямо сейчас."
        ],
        meditation: [
          "Представьте себя на берегу тихого озера. Вода зеркально гладкая. С каждым вдохом вы чувствуете свежесть, с каждым выдохом — как рябь ваших мыслей затихает.",
          "Представьте теплый золотистый свет, начинающийся в ваших стопах и медленно поднимающийся вверх, расслабляющий каждую мышцу вашего тела.",
          "Визуализируйте облако. Поместите в него вашу главную заботу сегодня и смотрите, как ветер мягко уносит его за горизонт."
        ]
      },
      en: {
        affirmation: [
          "I am calm, centered, and at peace with myself.",
          "Today I choose peace over chaos and mindfulness over hurry.",
          "My breath is deep, my mind is clear, my heart is open.",
          "I trust the process of life and let go of what I cannot control."
        ],
        tip: [
          "Try the 5-4-3-2-1 rule: name 5 things you can see, 4 sounds you can hear, and so on.",
          "Pause and feel the weight of your feet on the floor for 30 seconds.",
          "Turn off phone notifications for the next 15 minutes.",
          "Gently drop your shoulders and relax your jaw right now."
        ],
        meditation: [
          "Imagine yourself by a still lake. The water is mirror-smooth. With each breath, feel the freshness; with each exhale, see the ripples of your thoughts settle.",
          "Imagine a warm golden light starting at your feet and slowly moving up, relaxing every muscle in your body.",
          "Visualize a cloud. Place your main worry today inside it and watch as the wind gently carries it over the horizon."
        ]
      }
    };

    const currentLang = language as 'ru' | 'en';
    const list = collections[currentLang][contentType];
    return list[Math.floor(Math.random() * list.length)];
  };

  const generateContent = async (contentType: typeof type) => {
    setLoading(true);
    setType(contentType);
    
    // Simulate a brief loading state for better UX
    setTimeout(() => {
      setContent(getStaticContent(contentType));
      setLoading(false);
    }, 600);
  };

  return (
    <div className="px-6 py-12 max-w-2xl mx-auto min-h-[70vh] flex flex-col">
      <div className="mb-12 text-center">
        <h2 className="text-4xl mb-2">{t.mindfulMoments}</h2>
        <p className="text-white/60">{t.mindfulDesc}</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {content ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass p-10 rounded-[2.5rem] relative w-full"
            >
              <Quote className="absolute -top-4 -left-4 text-aura-sage opacity-50" size={48} />
              <div className="prose prose-invert max-w-none font-serif text-2xl leading-relaxed italic text-white/90 text-center">
                <Markdown>{content}</Markdown>
              </div>
              <div className="mt-10 flex justify-center">
                <button 
                  onClick={() => setContent(null)}
                  className="text-sm uppercase tracking-widest text-white/40 hover:text-white transition-colors flex items-center gap-2"
                >
                  <RefreshCw size={14} /> {t.newMoment}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="options"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 gap-4 w-full"
            >
              <OptionButton 
                title={t.dailyAffirmation} 
                desc={t.affirmationDesc}
                onClick={() => generateContent('affirmation')}
                loading={loading && type === 'affirmation'}
              />
              <OptionButton 
                title={t.relaxationTip} 
                desc={t.tipDesc}
                onClick={() => generateContent('tip')}
                loading={loading && type === 'tip'}
              />
              <OptionButton 
                title={t.guidedVisualization} 
                desc={t.visualizationDesc}
                onClick={() => generateContent('meditation')}
                loading={loading && type === 'meditation'}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function OptionButton({ title, desc, onClick, loading }: { title: string, desc: string, onClick: () => void, loading: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="p-8 rounded-3xl glass hover:bg-white/5 transition-all text-left group flex items-center justify-between"
    >
      <div>
        <h3 className="text-2xl mb-1 group-hover:text-aura-sage transition-colors">{title}</h3>
        <p className="text-white/40">{desc}</p>
      </div>
      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-aura-bg transition-all">
        {loading ? <RefreshCw size={20} className="animate-spin" /> : <Sparkles size={20} />}
      </div>
    </button>
  );
}
