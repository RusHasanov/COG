export type Language = 'en' | 'ru';

export const translations = {
  en: {
    appName: 'Aura',
    home: 'Home',
    breathe: 'Breathe',
    sounds: 'Sounds',
    mindful: 'Mindful',
    libraryTab: 'Library',
    findStillness: 'Find your stillness.',
    journeyDesc: 'Aura is your sanctuary for mental clarity. Reconnect with your breath, curate your environment, and cultivate presence.',
    beginJourney: 'Begin Journey',
    ready: 'Ready?',
    inhale: 'Inhale',
    hold: 'Hold',
    exhale: 'Exhale',
    cycles: 'Cycles',
    soundscapes: 'Soundscapes',
    soundscapesDesc: 'Layer ambient sounds to create your perfect environment.',
    soundTip: 'Tip: Try mixing "Deep Forest" with "Gentle Rain" for a cozy woodland atmosphere.',
    mindfulMoments: 'Mindful Moments',
    mindfulDesc: 'AI-powered reflections to center your mind.',
    newMoment: 'New Moment',
    dailyAffirmation: 'Daily Affirmation',
    affirmationDesc: 'A seed of positivity for your day.',
    relaxationTip: 'Relaxation Tip',
    tipDesc: 'Quick habits for a calmer life.',
    guidedVisualization: 'Guided Visualization',
    visualizationDesc: 'A short mental journey.',
    knowledgeBase: 'Knowledge Base',
    knowledgeDesc: "Understand the 'why' behind the relaxation.",
    readArticle: 'Read Article',
    weeklyChallenge: 'Weekly Mindfulness Challenge',
    challengeDesc: 'This week, try to spend 5 minutes every morning without any digital devices. Just observe your surroundings and your breath.',
    joinChallenge: 'Join Challenge',
    reset: 'Reset',
    peaceJourney: 'Peace is a journey, not a destination.',
    breathBridge: 'The breath is the bridge between mind and body.',
    aiSystemInstruction: "You are a wise, gentle mindfulness coach. Your tone is poetic, calming, and minimalist. Use Markdown for formatting if needed. Respond in English.",
    aiQuoteInstruction: "You are a zen master. Your quotes are short, profound, and peaceful. Respond in English.",
    aiAffirmationPrompt: "Generate a short, powerful, and poetic daily affirmation for someone seeking inner peace. Keep it under 30 words.",
    aiTipPrompt: "Provide a unique, practical relaxation tip or mindfulness micro-habit that can be done in under 2 minutes.",
    aiMeditationPrompt: "Write a 3-step guided visualization script for a quick mental escape to a serene place.",
    aiQuotePrompt: "Generate a one-sentence, deeply calming mindfulness quote.",
    techniques: {
      box: {
        name: 'Box Breathing',
        desc: 'Used by Navy SEALs to stay calm and focused under pressure.'
      },
      '478': {
        name: '4-7-8 Technique',
        desc: 'A natural tranquilizer for the nervous system, great for sleep.'
      },
      equal: {
        name: 'Equal Breathing',
        desc: 'Simple and effective for balancing energy and reducing stress.'
      }
    },
    soundNames: {
      rain: 'Gentle Rain',
      forest: 'Deep Forest',
      ocean: 'Ocean Waves',
      fire: 'Crackling Fire'
    },
    library: {
      breathing: {
        title: 'The Science of Breathing',
        desc: 'How controlled breathing affects your vagus nerve and lowers cortisol levels instantly.'
      },
      muscle: {
        title: 'Progressive Muscle Relaxation',
        desc: 'A technique of tensing and releasing muscle groups to achieve deep physical calm.'
      },
      detox: {
        title: 'Digital Detox Habits',
        desc: 'Small changes to your relationship with technology that can reduce chronic anxiety.'
      },
      sleep: {
        title: 'Sleep Hygiene',
        desc: 'Creating the perfect environment and routine for restorative, deep sleep.'
      }
    }
  },
  ru: {
    appName: 'Когнитивная пауза',
    home: 'Главная',
    breathe: 'Дыхание',
    sounds: 'Звуки',
    mindful: 'Осознанность',
    libraryTab: 'Библиотека',
    findStillness: 'Найдите свой покой.',
    journeyDesc: 'Аура — это ваше убежище для ментальной ясности. Воссоединитесь со своим дыханием, создайте свое окружение и развивайте присутствие.',
    beginJourney: 'Начать путь',
    ready: 'Готовы?',
    inhale: 'Вдох',
    hold: 'Задержка',
    exhale: 'Выдох',
    cycles: 'Циклы',
    soundscapes: 'Звуковые ландшафты',
    soundscapesDesc: 'Смешивайте окружающие звуки, чтобы создать идеальную атмосферу.',
    soundTip: 'Совет: Попробуйте смешать "Глубокий лес" с "Нежным дождем" для создания уютной лесной атмосферы.',
    mindfulMoments: 'Моменты осознанности',
    mindfulDesc: 'Размышления на базе ИИ, которые помогут вам сосредоточиться.',
    newMoment: 'Новый момент',
    dailyAffirmation: 'Ежедневная аффирмация',
    affirmationDesc: 'Зерно позитива для вашего дня.',
    relaxationTip: 'Совет по релаксации',
    tipDesc: 'Быстрые привычки для более спокойной жизни.',
    guidedVisualization: 'Управляемая визуализация',
    visualizationDesc: 'Короткое ментальное путешествие.',
    knowledgeBase: 'База знаний',
    knowledgeDesc: 'Поймите «почему» стоит за расслаблением.',
    readArticle: 'Читать статью',
    weeklyChallenge: 'Еженедельный челлендж осознанности',
    challengeDesc: 'На этой неделе старайтесь каждое утро проводить 5 минут без цифровых устройств. Просто наблюдайте за окружающим миром и своим дыханием.',
    joinChallenge: 'Присоединиться к челленджу',
    reset: 'Сброс',
    peaceJourney: 'Мир — это путь, а не пункт назначения.',
    breathBridge: 'Дыхание — это мост между умом и телом.',
    aiSystemInstruction: "Вы — мудрый и мягкий коуч по осознанности. Ваш тон поэтичен, успокаивающ и минималистичен. Используйте Markdown для форматирования, если это необходимо. Отвечайте на РУССКОМ языке.",
    aiQuoteInstruction: "Вы — мастер дзен. Ваши цитаты коротки, глубоки и мирны. Отвечайте на РУССКОМ языке.",
    aiAffirmationPrompt: "Сгенерируйте короткую, мощную и поэтичную ежедневную аффирмацию для того, кто ищет внутреннего мира. Не более 30 слов.",
    aiTipPrompt: "Дайте уникальный практический совет по расслаблению или микропривычку осознанности, которую можно выполнить менее чем за 2 минуты.",
    aiMeditationPrompt: "Напишите сценарий управляемой визуализации из 3 шагов для быстрого ментального побега в безмятежное место.",
    aiQuotePrompt: "Сгенерируйте одну глубоко успокаивающую цитату об осознанности из одного предложения.",
    techniques: {
      box: {
        name: 'Квадратное дыхание',
        desc: 'Используется спецназом для сохранения спокойствия и концентрации под давлением.'
      },
      '478': {
        name: 'Техника 4-7-8',
        desc: 'Естественный транквилизатор для нервной системы, отлично подходит для сна.'
      },
      equal: {
        name: 'Равное дыхание',
        desc: 'Просто и эффективно для балансировки энергии и снижения стресса.'
      }
    },
    soundNames: {
      rain: 'Нежный дождь',
      forest: 'Глубокий лес',
      ocean: 'Океанские волны',
      fire: 'Потрескивающий огонь'
    },
    library: {
      breathing: {
        title: 'Наука дыхания',
        desc: 'Как контролируемое дыхание влияет на блуждающий нерв и мгновенно снижает уровень кортизола.'
      },
      muscle: {
        title: 'Прогрессивная мышечная релаксация',
        desc: 'Техника напряжения и расслабления групп мышц для достижения глубокого физического спокойствия.'
      },
      detox: {
        title: 'Привычки цифрового детокса',
        desc: 'Небольшие изменения в ваших отношениях с технологиями, которые могут уменьшить хроническую тревогу.'
      },
      sleep: {
        title: 'Гигиена сна',
        desc: 'Создание идеальной среды и распорядка для восстановительного глубокого сна.'
      }
    }
  }
};
