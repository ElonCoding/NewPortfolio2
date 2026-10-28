'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail, Terminal, Shield, Sparkles } from 'lucide-react';
import { useCyber } from './cyber-context';

export default function Footer() {
  const { personalization, toggleTerminal, playSound } = useCyber();
  const [easterEggActive, setEasterEggActive] = useState(false);

  const handleEasterEgg = () => {
    playSound('glitch');
    setEasterEggActive(true);
    setTimeout(() => setEasterEggActive(false), 5000);
  };

  return (
    <footer className="relative z-10 w-full bg-[#05070a] border-t border-[#16202c] font-mono text-xs text-slate-400 mt-20">
      {/* Easter Egg Banner if triggered */}
      {easterEggActive && (
        <div className="bg-[#00ff41]/20 border-b border-[#00ff41] px-4 py-2 text-center text-[#00ff41] font-bold text-xs tracking-wider animate-pulse">
          ⚡ [EASTER EGG UNLOCKED] You bypassed the security perimeter! "There is no spoon." — Neo ⚡
        </div>
      )}

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Identity & Status */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2 text-sm text-[#00ff41] font-bold">
              <Shield className="w-4 h-4 text-[#00f3ff]" />
              <span>[{personalization.handle}] // COMMAND CENTER</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              {personalization.shortBio}
            </p>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#00ff41]/10 border border-[#00ff41]/30 rounded text-[11px] text-[#00ff41]">
              <span className="w-2 h-2 rounded-full bg-[#00ff41] animate-pulse" />
              <span>{personalization.statusBadge}</span>
            </div>
          </div>

          {/* Col 2: Navigation Map */}
          <div className="space-y-2">
            <h4 className="text-slate-200 font-semibold text-xs uppercase tracking-wider">
              Directory Map
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <Link href="/" className="hover:text-[#00ff41] transition-colors">
                  &gt; /home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#00ff41] transition-colors">
                  &gt; /about
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#00ff41] transition-colors">
                  &gt; /projects
                </Link>
              </li>
              <li>
                <Link href="/skills" className="hover:text-[#00ff41] transition-colors">
                  &gt; /skills
                </Link>
              </li>
              <li>
                <Link href="/experience" className="hover:text-[#00ff41] transition-colors">
                  &gt; /experience
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#00ff41] transition-colors">
                  &gt; /blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Secure Uplinks & Console */}
          <div className="space-y-3">
            <h4 className="text-slate-200 font-semibold text-xs uppercase tracking-wider">
              Secure Uplinks
            </h4>
            <div className="flex flex-col space-y-2">
              <a
                href={personalization.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-[#00ff41] transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Repos</span>
              </a>
              <a
                href={personalization.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-[#00ff41] transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn Network</span>
              </a>
              <Link
                href="/contact"
                className="flex items-center gap-2 hover:text-[#00ff41] transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Encrypted Contact</span>
              </Link>
              <button
                type="button"
                onClick={toggleTerminal}
                className="flex items-center gap-2 hover:text-[#00ff41] text-left transition-colors cursor-pointer"
              >
                <Terminal className="w-3.5 h-3.5 text-[#00f3ff]" />
                <span>Interactive CLI Shell</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Telemetry and Easter Egg */}
        <div className="pt-6 border-t border-[#141c26] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>SYS: ONLINE</span>
            <span aria-hidden="true">·</span>
            <span>ENCRYPTION: 4096-BIT</span>
            <span aria-hidden="true">·</span>
            <span>SEC_LEVEL: MAX</span>
            <span aria-hidden="true">·</span>
            <span>LOC: {personalization.location}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleEasterEgg}
              title="Click to probe secret debug portal"
              className="px-2 py-0.5 bg-[#0e1622] hover:bg-[#182638] text-slate-400 hover:text-[#00ff41] rounded border border-[#1b2838] transition-colors text-[10px] cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-2.5 h-2.5 text-[#00f3ff]" />
              <span>[EASTER_EGG]</span>
            </button>
            <span>© 2026 {personalization.name}. ALL RIGHTS RESERVED.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
