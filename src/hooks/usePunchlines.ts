import { useState, useCallback } from 'react';
import { CollectionId, CANONS } from '../data/canons';

const STORAGE_KEYS: Record<CollectionId, string> = {
  bible: 'app_bible_punchline',
  aristotle: 'app_aristotle_punchline'
};

export interface PunchlineManager {
  biblePunchline: string;
  aristotlePunchline: string;
  getPunchline: (id: CollectionId) => string;
  setPunchline: (id: CollectionId, text: string) => void;
  resetToDefaults: () => void;
}

export function usePunchlines(): PunchlineManager {
  const [biblePunchline, setBiblePunchline] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.bible) || CANONS.bible.defaultPunchline;
    } catch {
      return CANONS.bible.defaultPunchline;
    }
  });

  const [aristotlePunchline, setAristotlePunchline] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.aristotle) || CANONS.aristotle.defaultPunchline;
    } catch {
      return CANONS.aristotle.defaultPunchline;
    }
  });

  const getPunchline = useCallback((id: CollectionId) => {
    return id === 'bible' ? biblePunchline : aristotlePunchline;
  }, [biblePunchline, aristotlePunchline]);

  const setPunchline = useCallback((id: CollectionId, text: string) => {
    const trimmed = text.trim();
    if (id === 'bible') {
      const val = trimmed || CANONS.bible.defaultPunchline;
      setBiblePunchline(val);
      try { localStorage.setItem(STORAGE_KEYS.bible, val); } catch {}
    } else {
      const val = trimmed || CANONS.aristotle.defaultPunchline;
      setAristotlePunchline(val);
      try { localStorage.setItem(STORAGE_KEYS.aristotle, val); } catch {}
    }
  }, []);

  const resetToDefaults = useCallback(() => {
    setBiblePunchline(CANONS.bible.defaultPunchline);
    setAristotlePunchline(CANONS.aristotle.defaultPunchline);
    try {
      localStorage.removeItem(STORAGE_KEYS.bible);
      localStorage.removeItem(STORAGE_KEYS.aristotle);
    } catch {}
  }, []);

  return {
    biblePunchline,
    aristotlePunchline,
    getPunchline,
    setPunchline,
    resetToDefaults
  };
}
