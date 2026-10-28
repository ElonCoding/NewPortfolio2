'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { PORTFOLIO_CONFIG } from '@/lib/portfolio-data';
import { cyberSound } from '@/lib/sound-effects';

export interface PersonalizationState {
  name: string;
  handle: string;
  role: string;
  location: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  statusBadge: string;
  shortBio: string;
}

interface CyberContextType {
  matrixEnabled: boolean;
  setMatrixEnabled: (val: boolean) => void;
  toggleMatrix: () => void;
  scanlinesEnabled: boolean;
  setScanlinesEnabled: (val: boolean) => void;
  toggleScanlines: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  toggleSound: () => void;
  terminalOpen: boolean;
  setTerminalOpen: (val: boolean) => void;
  toggleTerminal: () => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (val: boolean) => void;
  toggleCommandPalette: () => void;
  personalization: PersonalizationState;
  updatePersonalization: (updates: Partial<PersonalizationState>) => void;
  resetPersonalization: () => void;
  playSound: (type?: 'click' | 'beep' | 'access' | 'glitch') => void;
}

const CyberContext = createContext<CyberContextType | null>(null);

export function CyberProvider({ children }: { children: React.ReactNode }) {
  const [matrixEnabled, setMatrixEnabled] = useState<boolean>(true);
  const [scanlinesEnabled, setScanlinesEnabled] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [terminalOpen, setTerminalOpen] = useState<boolean>(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);

  const [personalization, setPersonalization] = useState<PersonalizationState>({
    name: PORTFOLIO_CONFIG.name,
    handle: PORTFOLIO_CONFIG.handle,
    role: PORTFOLIO_CONFIG.role,
    location: PORTFOLIO_CONFIG.location,
    email: PORTFOLIO_CONFIG.email,
    githubUrl: PORTFOLIO_CONFIG.githubUrl,
    linkedinUrl: PORTFOLIO_CONFIG.linkedinUrl,
    twitterUrl: PORTFOLIO_CONFIG.twitterUrl,
    statusBadge: PORTFOLIO_CONFIG.statusBadge,
    shortBio: PORTFOLIO_CONFIG.shortBio,
  });

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const storedMatrix = localStorage.getItem('neo_matrix_enabled');
      if (storedMatrix !== null) setMatrixEnabled(storedMatrix === 'true');

      const storedScanlines = localStorage.getItem('neo_scanlines_enabled');
      if (storedScanlines !== null) setScanlinesEnabled(storedScanlines === 'true');

      const storedSound = localStorage.getItem('neo_sound_enabled');
      if (storedSound !== null) {
        const isSound = storedSound === 'true';
        setSoundEnabled(isSound);
        cyberSound.enabled = isSound;
      }

      const storedPersonalization = localStorage.getItem('neo_personalization');
      if (storedPersonalization) {
        const parsed = JSON.parse(storedPersonalization);
        setPersonalization((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // LocalStorage quota or access error safe fallback
    }
  }, []);

  // Keyboard shortcut for Command Palette: Ctrl+K or Cmd+K, or Backquote ` for Terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
        setTerminalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleMatrix = () => {
    setMatrixEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('neo_matrix_enabled', String(next));
      } catch {}
      return next;
    });
    playSound('beep');
  };

  const toggleScanlines = () => {
    setScanlinesEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('neo_scanlines_enabled', String(next));
      } catch {}
      return next;
    });
    playSound('click');
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      cyberSound.enabled = next;
      try {
        localStorage.setItem('neo_sound_enabled', String(next));
      } catch {}
      if (next) {
        cyberSound.playAccessGranted();
      }
      return next;
    });
  };

  const toggleTerminal = () => {
    setTerminalOpen((prev) => {
      const next = !prev;
      playSound(next ? 'access' : 'click');
      return next;
    });
  };

  const toggleCommandPalette = () => {
    setCommandPaletteOpen((prev) => !prev);
    playSound('beep');
  };

  const playSound = (type: 'click' | 'beep' | 'access' | 'glitch' = 'click') => {
    if (!soundEnabled) return;
    if (type === 'click') cyberSound.playClick();
    else if (type === 'beep') cyberSound.playBeep();
    else if (type === 'access') cyberSound.playAccessGranted();
    else if (type === 'glitch') cyberSound.playGlitch();
  };

  const updatePersonalization = (updates: Partial<PersonalizationState>) => {
    setPersonalization((prev) => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem('neo_personalization', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const resetPersonalization = () => {
    const defaults = {
      name: PORTFOLIO_CONFIG.name,
      handle: PORTFOLIO_CONFIG.handle,
      role: PORTFOLIO_CONFIG.role,
      location: PORTFOLIO_CONFIG.location,
      email: PORTFOLIO_CONFIG.email,
      githubUrl: PORTFOLIO_CONFIG.githubUrl,
      linkedinUrl: PORTFOLIO_CONFIG.linkedinUrl,
      twitterUrl: PORTFOLIO_CONFIG.twitterUrl,
      statusBadge: PORTFOLIO_CONFIG.statusBadge,
      shortBio: PORTFOLIO_CONFIG.shortBio,
    };
    setPersonalization(defaults);
    try {
      localStorage.removeItem('neo_personalization');
    } catch {}
  };

  return (
    <CyberContext.Provider
      value={{
        matrixEnabled,
        setMatrixEnabled,
        toggleMatrix,
        scanlinesEnabled,
        setScanlinesEnabled,
        toggleScanlines,
        soundEnabled,
        setSoundEnabled,
        toggleSound,
        terminalOpen,
        setTerminalOpen,
        toggleTerminal,
        commandPaletteOpen,
        setCommandPaletteOpen,
        toggleCommandPalette,
        personalization,
        updatePersonalization,
        resetPersonalization,
        playSound,
      }}
    >
      {children}
    </CyberContext.Provider>
  );
}

export function useCyber() {
  const context = useContext(CyberContext);
  if (!context) {
    throw new Error('useCyber must be used within a CyberProvider');
  }
  return context;
}
