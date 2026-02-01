import { useState, useEffect } from 'react';

interface Analytics {
  visitors: number;
  likes: number;
  saves: number;
  contactClicks: number;
  whatsappClicks: number;
  telegramClicks: number;
}

const STORAGE_KEY = 'cpe-tech-analytics';
const VISITOR_KEY = 'cpe-tech-visited';

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<Analytics>({
    visitors: 0,
    likes: 0,
    saves: 0,
    contactClicks: 0,
    whatsappClicks: 0,
    telegramClicks: 0,
  });

  // Load analytics from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setAnalytics(JSON.parse(stored));
    }

    // Track unique visitor
    const hasVisited = localStorage.getItem(VISITOR_KEY);
    if (!hasVisited) {
      incrementVisitors();
      localStorage.setItem(VISITOR_KEY, 'true');
    }
  }, []);

  // Save analytics to localStorage
  const saveAnalytics = (newAnalytics: Analytics) => {
    setAnalytics(newAnalytics);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newAnalytics));
  };

  const incrementVisitors = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const current = stored ? JSON.parse(stored) : analytics;
    saveAnalytics({ ...current, visitors: current.visitors + 1 });
  };

  const incrementLikes = () => {
    saveAnalytics({ ...analytics, likes: analytics.likes + 1 });
  };

  const decrementLikes = () => {
    saveAnalytics({ ...analytics, likes: Math.max(0, analytics.likes - 1) });
  };

  const incrementSaves = () => {
    saveAnalytics({ ...analytics, saves: analytics.saves + 1 });
  };

  const decrementSaves = () => {
    saveAnalytics({ ...analytics, saves: Math.max(0, analytics.saves - 1) });
  };

  const incrementContactClicks = () => {
    saveAnalytics({ ...analytics, contactClicks: analytics.contactClicks + 1 });
  };

  const incrementWhatsappClicks = () => {
    saveAnalytics({ ...analytics, whatsappClicks: analytics.whatsappClicks + 1 });
  };

  const incrementTelegramClicks = () => {
    saveAnalytics({ ...analytics, telegramClicks: analytics.telegramClicks + 1 });
  };

  const resetAnalytics = () => {
    const newAnalytics = {
      visitors: 0,
      likes: 0,
      saves: 0,
      contactClicks: 0,
      whatsappClicks: 0,
      telegramClicks: 0,
    };
    saveAnalytics(newAnalytics);
    localStorage.removeItem(VISITOR_KEY);
  };

  return {
    analytics,
    incrementLikes,
    decrementLikes,
    incrementSaves,
    decrementSaves,
    incrementContactClicks,
    incrementWhatsappClicks,
    incrementTelegramClicks,
    resetAnalytics,
  };
}
