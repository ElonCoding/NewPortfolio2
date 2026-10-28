'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Terminal, Volume2, VolumeX, Binary, Search, Menu, X } from 'lucide-react';
import { useCyber } from './cyber-context';

export default function Navbar() {
  const pathname = usePathname();
  const {
    matrixEnabled,
    toggleMatrix,
    soundEnabled,
    toggleSound,
    toggleTerminal,
    toggleCommandPalette,
    personalization,
    playSound,
  } = useCyber();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Skills', href: '/skills' },
    { label: 'Experience', href: '/experience' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#050505]/90 backdrop-blur-md border-b border-[#16202c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <Link
          href="/"
          onClick={() => playSound('click')}
          className="flex items-center gap-2 font-mono text-sm sm:text-base tracking-wider text-[#00ff41] hover:opacity-90 transition-opacity whitespace-nowrap shrink-0 group"
        >
          <span className="text-[#00f3ff]">&gt;</span>
          <span className="font-bold text-[#00ff41] neon-glow-green group-hover:text-white transition-colors">
            [{personalization.handle}]
          </span>
          <span className="inline-block w-2 h-4 bg-[#00ff41] animate-blink" aria-hidden="true" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-mono text-slate-300">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => playSound('click')}
                className={`relative py-1 whitespace-nowrap transition-colors ${
                  isActive
                    ? 'text-[#00ff41] font-semibold'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00ff41] shadow-[0_0_8px_#00ff41]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right HUD Controls */}
        <div className="flex items-center gap-2 shrink-0 font-mono">
          {/* Command Palette Trigger */}
          <button
            type="button"
            onClick={toggleCommandPalette}
            aria-label="Open Command Palette"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-slate-300 bg-[#0d141e] border border-[#1b2838] hover:border-[#00ff41] rounded hover:text-[#00ff41] transition-all cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-[#00f3ff]" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline px-1 text-[10px] bg-black border border-slate-700 rounded text-slate-400">
              ⌘K
            </kbd>
          </button>

          {/* Matrix Rain Toggle (Tablet & Desktop) */}
          <button
            type="button"
            onClick={toggleMatrix}
            aria-label="Toggle Matrix Falling Code"
            title={matrixEnabled ? 'Disable Matrix Rain' : 'Enable Matrix Rain'}
            className={`hidden sm:flex p-2 text-xs rounded border transition-colors cursor-pointer ${
              matrixEnabled
                ? 'bg-[#00ff41]/10 border-[#00ff41]/50 text-[#00ff41]'
                : 'bg-[#0d141e] border-[#1b2838] text-slate-400 hover:text-slate-200'
            }`}
          >
            <Binary className="w-4 h-4" />
          </button>

          {/* Audio Feedback Toggle (Tablet & Desktop) */}
          <button
            type="button"
            onClick={toggleSound}
            aria-label="Toggle Cyber Sound Effects"
            title={soundEnabled ? 'Mute Cyber Audio' : 'Enable Cyber Audio (Oscillator Synthesis)'}
            className={`hidden sm:flex p-2 text-xs rounded border transition-colors cursor-pointer ${
              soundEnabled
                ? 'bg-[#00f3ff]/10 border-[#00f3ff]/50 text-[#00f3ff]'
                : 'bg-[#0d141e] border-[#1b2838] text-slate-400 hover:text-slate-200'
            }`}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Quick Terminal Launcher */}
          <button
            type="button"
            onClick={toggleTerminal}
            aria-label="Toggle Interactive Terminal Console"
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-black bg-[#00ff41] hover:bg-[#00cc33] rounded shadow-[0_0_12px_rgba(0,255,65,0.4)] transition-all cursor-pointer whitespace-nowrap"
          >
            <Terminal className="w-3.5 h-3.5 text-black" />
            <span className="hidden sm:inline">TERMINAL</span>
            <span className="sm:hidden">&gt;_</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              playSound('click');
            }}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-1.5 text-slate-300 hover:text-[#00ff41] border border-[#1b2838] rounded bg-[#0d141e]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#1b2838] bg-[#070b10] px-4 py-4 space-y-2 font-mono">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  setMobileMenuOpen(false);
                  playSound('click');
                }}
                className={`block px-3 py-2 text-sm rounded transition-colors ${
                  isActive
                    ? 'bg-[#00ff41]/10 text-[#00ff41] font-semibold border-l-2 border-[#00ff41]'
                    : 'text-slate-300 hover:bg-[#0d141e] hover:text-white'
                }`}
              >
                &gt; {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
