import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RefreshCw, Quote } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown';
import { useLanguage } from '../LanguageContext';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function MindfulMoments() {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<'affirmation' | 'tip' | 'meditation'>('affirmation');
  const { t } = useLanguage();

  const generateContent = async (contentType: typeof type) => {
    setLoading(true);
    setType(contentType);
    try {
      const prompt = {
        affirmation: t.aiAffirmationPrompt,
        tip: t.aiTipPrompt,
        meditation: t.aiMeditationPrompt
      }[contentType];

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          systemInstruction: t.aiSystemInstruction,
        }
      });

      setContent(response.text || t.peaceJourney);
    } catch (error) {
      console.error("Gemini Error:", error);
      setContent(t.breathBridge);
    } finally {
      setLoading(false);
    }
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
