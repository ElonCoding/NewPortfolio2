'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Home,
  User,
  FolderGit2,
  Cpu,
  Award,
  BookOpen,
  Mail,
  Binary,
  Volume2,
  Terminal,
  Copy,
  Check,
} from 'lucide-react';
import { useCyber } from './cyber-context';

export default function CommandPalette() {
  const router = useRouter();
  const {
    commandPaletteOpen,
    setCommandPaletteOpen,
    toggleMatrix,
    toggleSound,
    toggleTerminal,
    personalization,
    playSound,
  } = useCyber();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (commandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [commandPaletteOpen]);

  const items = [
    {
      id: 'nav-home',
      category: 'Navigation',
      label: 'Home // Command Center',
      hint: 'Jump to landing terminal overview',
      icon: Home,
      action: () => router.push('/'),
    },
    {
      id: 'nav-about',
      category: 'Navigation',
      label: 'About // Operator Dossier',
      hint: 'Background, journey & philosophy',
      icon: User,
      action: () => router.push('/about'),
    },
    {
      id: 'nav-projects',
      category: 'Navigation',
      label: 'Projects // Arsenal & Repos',
      hint: 'Interactive engineering & cyber portfolio',
      icon: FolderGit2,
      action: () => router.push('/projects'),
    },
    {
      id: 'nav-skills',
      category: 'Navigation',
      label: 'Skills // Capabilities Matrix',
      hint: 'Languages, protocols, and security stack',
      icon: Cpu,
      action: () => router.push('/skills'),
    },
    {
      id: 'nav-experience',
      category: 'Navigation',
      label: 'Experience // Milestones & Certs',
      hint: 'Work history, education, verified badges',
      icon: Award,
      action: () => router.push('/experience'),
    },
    {
      id: 'nav-blog',
      category: 'Navigation',
      label: 'Blog // CTF Write-ups & Notes',
      hint: 'Vulnerability teardowns and articles',
      icon: BookOpen,
      action: () => router.push('/blog'),
    },
    {
      id: 'nav-contact',
      category: 'Navigation',
      label: 'Contact // Encrypted Dispatch',
      hint: 'Send a message or establish link',
      icon: Mail,
      action: () => router.push('/contact'),
    },
    {
      id: 'act-terminal',
      category: 'Hacker HUD',
      label: 'Launch Interactive CLI Terminal',
      hint: 'Open virtual shell with built-in commands',
      icon: Terminal,
      action: () => toggleTerminal(),
    },
    {
      id: 'act-matrix',
      category: 'Hacker HUD',
      label: 'Toggle Matrix Rain Canvas',
      hint: 'Enable or disable falling code stream',
      icon: Binary,
      action: () => toggleMatrix(),
    },
    {
      id: 'act-sound',
      category: 'Hacker HUD',
      label: 'Toggle Cyber Synthesizer Audio',
      hint: 'Mechanical clicks and synthesizer beeps',
      icon: Volume2,
      action: () => toggleSound(),
    },
    {
      id: 'act-email',
      category: 'Actions',
      label: 'Copy Operator Email',
      hint: personalization.email,
      icon: copiedEmail ? Check : Copy,
      action: () => {
        navigator.clipboard.writeText(personalization.email);
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      },
    },
  ];

  const filteredItems = items.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.hint.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (idx: number) => {
    const item = filteredItems[idx];
    if (!item) return;
    playSound('click');
    item.action();
    setCommandPaletteOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSelect(selectedIndex);
    }
  };

  if (!commandPaletteOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md"
      onClick={() => setCommandPaletteOpen(false)}
    >
      <div
        className="w-full max-w-xl bg-[#090e15] border border-[#00ff41]/60 rounded-lg shadow-[0_0_35px_rgba(0,255,65,0.25)] overflow-hidden font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3 bg-[#0d141e] border-b border-[#1b2838]">
          <Search className="w-4 h-4 text-[#00ff41]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or jump to page (e.g. 'projects', 'matrix', 'about')..."
            aria-label="Search command palette"
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none border-none focus:ring-0"
          />
          <kbd className="px-2 py-0.5 text-[10px] text-slate-400 bg-black/60 border border-slate-700 rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-500">
              No matching system commands or directories found.
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(idx)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-left rounded text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#00ff41]/15 text-[#00ff41] border border-[#00ff41]/40'
                      : 'text-slate-300 hover:bg-[#0e1622] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#00ff41]' : 'text-slate-400'}`} />
                    <div className="truncate">
                      <div className="font-semibold">{item.label}</div>
                      <div className="text-[11px] text-slate-500 truncate">{item.hint}</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-600 uppercase shrink-0 ml-2">
                    {item.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-[#060a0f] border-t border-[#16202c] flex items-center justify-between text-[10px] text-slate-500">
          <span>Navigate with ↑ / ↓</span>
          <span>Select with ↵ Enter</span>
        </div>
      </div>
    </div>
  );
}
