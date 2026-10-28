'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Terminal,
  Shield,
  ArrowRight,
  ExternalLink,
  Github,
  Activity,
  Cpu,
  Lock,
  Wifi,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { useCyber } from '@/components/cyber-context';
import { PROJECTS_DATA, PORTFOLIO_CONFIG } from '@/lib/portfolio-data';

export default function HomePage() {
  const { personalization, toggleTerminal, playSound } = useCyber();

  // Typing effect phrases
  const typingWords = [
    'Developer',
    'Cybersecurity Enthusiast',
    'Ethical Hacker',
    'Tech Explorer',
  ];
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Animated terminal demo commands
  const [demoStep, setDemoStep] = useState(0);
  const demoCommands = [
    {
      cmd: 'whoami',
      output: `[+] OPERATOR: ${personalization.handle} (UID: 1337) // ${personalization.role}`,
    },
    {
      cmd: 'cat skills.txt',
      output: '[*] STACK: TypeScript, Python, Rust, Go, eBPF, OWASP, Docker, Next.js',
    },
    {
      cmd: './init_portfolio.sh',
      output: '[+] ALL SYSTEMS OPERATIONAL. Encryption: 4096-bit AES-GCM. ACCESS GRANTED.',
    },
  ];

  // Typing effect loop
  useEffect(() => {
    const currentWord = typingWords[currentWordIdx];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentWordIdx((prev) => (prev + 1) % typingWords.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentWordIdx]);

  // Terminal animated step switcher
  useEffect(() => {
    const interval = setInterval(() => {
      setDemoStep((prev) => (prev + 1) % demoCommands.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [demoCommands.length]);

  const featuredProjects = PROJECTS_DATA.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="space-y-16 py-8 px-4 sm:px-6 max-w-7xl mx-auto font-mono">
      {/* 1. Hero Section */}
      <section className="relative pt-6 sm:pt-12 pb-8 border-b border-[#16202c]">
        {/* Top Status Pill */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00ff41]/10 border border-[#00ff41]/40 rounded text-xs text-[#00ff41]">
            <span className="w-2 h-2 rounded-full bg-[#00ff41] animate-pulse" />
            <span>{personalization.statusBadge}</span>
          </div>
          <span className="text-slate-500 text-xs hidden sm:inline">
            // TERMINAL SESSION: 0x9AF4 · PROTOCOL: SECURE
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Headline and Intro */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="text-xs text-[#00f3ff] tracking-wider uppercase font-semibold flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[#00ff41]" />
                <span>CYBERNETIC IDENTITY // NODE ID #1337</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                ACCESS GRANTED <br />
                <span className="text-[#00ff41] neon-glow-green">
                  WELCOME TO MY WORLD
                </span>
              </h1>
            </div>

            {/* Dynamic Typing Title */}
            <div className="text-base sm:text-xl text-slate-300 flex items-center gap-2 h-8">
              <span className="text-[#00f3ff]">&gt;</span>
              <span className="font-semibold text-white">I am a</span>
              <span className="text-[#00ff41] font-bold underline decoration-[#00ff41]/50 underline-offset-4">
                {displayText}
              </span>
              <span className="w-2 h-5 bg-[#00ff41] inline-block animate-blink" />
            </div>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl">
              Hello, I am <strong className="text-white">{personalization.name}</strong>, operating online as{' '}
              <strong className="text-[#00ff41]">@{personalization.handle}</strong>. {personalization.shortBio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/projects"
                onClick={() => playSound('click')}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-black bg-[#00ff41] hover:bg-[#00cc33] rounded shadow-[0_0_20px_rgba(0,255,65,0.4)] transition-all hover:scale-[1.02] cursor-pointer"
              >
                <span>EXPLORE MY WORK</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/about"
                onClick={() => playSound('click')}
                className="inline-flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-slate-200 bg-[#0d141e] hover:bg-[#15202e] border border-[#1b2838] hover:border-[#00ff41] rounded transition-all cursor-pointer"
              >
                <span>ABOUT ME</span>
              </Link>

              <Link
                href="/contact"
                onClick={() => playSound('click')}
                className="inline-flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-[#00f3ff] bg-[#00f3ff]/10 hover:bg-[#00f3ff]/20 border border-[#00f3ff]/40 rounded transition-all cursor-pointer"
              >
                <span>CONTACT</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Live Interactive Animated Terminal Window */}
          <div className="lg:col-span-5 w-full">
            <div className="w-full bg-[#070b10] border border-[#00ff41]/40 rounded-lg overflow-hidden shadow-[0_0_25px_rgba(0,255,65,0.15)]">
              {/* Window Header */}
              <div className="flex items-center justify-between px-3 py-2 bg-[#0d141e] border-b border-[#1b2838]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    bash — {personalization.handle}@workstation
                  </span>
                </div>
                <button
                  type="button"
                  onClick={toggleTerminal}
                  className="text-[10px] text-[#00ff41] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Terminal className="w-3 h-3" />
                  <span>Interactive Shell</span>
                </button>
              </div>

              {/* Terminal Screen Body */}
              <div className="p-4 space-y-3 text-xs leading-relaxed min-h-[220px]">
                <div className="text-slate-500 text-[11px]">
                  # Automated workstation diagnostics & telemetry v2.4
                </div>

                {demoCommands.map((item, idx) => (
                  <div
                    key={item.cmd}
                    className={`space-y-1 transition-opacity duration-300 ${
                      idx <= demoStep ? 'opacity-100' : 'opacity-20'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <span className="text-[#00f3ff]">&gt;</span>
                      <span className="text-[#00ff41] font-semibold">{item.cmd}</span>
                    </div>
                    <div className="pl-3 text-slate-400 text-[11px] whitespace-pre-wrap">
                      {item.output}
                    </div>
                  </div>
                ))}

                <div className="flex items-center gap-1 text-[#00ff41] pt-2">
                  <span className="text-[#00f3ff]">&gt;</span>
                  <span className="text-slate-400">ready_for_command</span>
                  <span className="w-2 h-4 bg-[#00ff41] inline-block animate-blink" />
                </div>
              </div>

              {/* Terminal Bottom Controls */}
              <div className="px-3 py-2 bg-[#090e15] border-t border-[#16202c] flex items-center justify-between text-[10px] text-slate-500">
                <span>STDOUT: CONNECTED</span>
                <button
                  type="button"
                  onClick={toggleTerminal}
                  className="text-[#00f3ff] hover:text-[#00ff41] font-semibold cursor-pointer"
                >
                  CLICK TO TYPE COMMANDS &gt;&gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Live System Status Panel */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-xs text-slate-400 flex items-center gap-2 uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 text-[#00ff41]" />
            <span>Live System Status Panel // Node Telemetry</span>
          </div>
          <span className="text-[11px] text-slate-500">REALTIME MONITORING HUD</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-3 bg-[#0a0e14] border border-[#16202c] hover:border-[#00ff41]/50 rounded space-y-1 transition-colors">
            <div className="text-[10px] text-slate-500 uppercase">SYSTEM</div>
            <div className="text-xs sm:text-sm font-bold text-[#00ff41] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff41] animate-pulse" />
              <span>ONLINE</span>
            </div>
            <div className="text-[10px] text-slate-400">Nodes Synchronized</div>
          </div>

          <div className="p-3 bg-[#0a0e14] border border-[#16202c] hover:border-[#00ff41]/50 rounded space-y-1 transition-colors">
            <div className="text-[10px] text-slate-500 uppercase">SECURITY</div>
            <div className="text-xs sm:text-sm font-bold text-[#00ff41] flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-[#00ff41]" />
              <span>ACTIVE</span>
            </div>
            <div className="text-[10px] text-slate-400">Zero-Trust Mode</div>
          </div>

          <div className="p-3 bg-[#0a0e14] border border-[#16202c] hover:border-[#00f3ff]/50 rounded space-y-1 transition-colors">
            <div className="text-[10px] text-slate-500 uppercase">MODE</div>
            <div className="text-xs sm:text-sm font-bold text-[#00f3ff] flex items-center gap-1.5">
              <Cpu className="w-3 h-3 text-[#00f3ff]" />
              <span>CREATIVE</span>
            </div>
            <div className="text-[10px] text-slate-400">Full-Stack & Sec</div>
          </div>

          <div className="p-3 bg-[#0a0e14] border border-[#16202c] hover:border-[#00ff41]/50 rounded space-y-1 transition-colors">
            <div className="text-[10px] text-slate-500 uppercase">UPTIME</div>
            <div className="text-xs sm:text-sm font-bold text-white tabular-nums">
              {PORTFOLIO_CONFIG.systemStatus.uptime}
            </div>
            <div className="text-[10px] text-slate-400">No Interruptions</div>
          </div>

          <div className="p-3 bg-[#0a0e14] border border-[#16202c] hover:border-[#00ff41]/50 rounded space-y-1 transition-colors">
            <div className="text-[10px] text-slate-500 uppercase">LATENCY</div>
            <div className="text-xs sm:text-sm font-bold text-[#00ff41] tabular-nums">
              {PORTFOLIO_CONFIG.systemStatus.latency}
            </div>
            <div className="text-[10px] text-slate-400">Edge Acceleration</div>
          </div>

          <div className="p-3 bg-[#0a0e14] border border-[#16202c] hover:border-[#00ff41]/50 rounded space-y-1 transition-colors">
            <div className="text-[10px] text-slate-500 uppercase">FIREWALL</div>
            <div className="text-xs sm:text-sm font-bold text-[#00ff41] flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-[#00ff41]" />
              <span>HARDENED</span>
            </div>
            <div className="text-[10px] text-slate-400">eBPF Packet Filter</div>
          </div>
        </div>
      </section>

      {/* 3. Scrolling Terminal-Style Ticker */}
      <section className="border-y border-[#16202c] bg-[#070a0f] py-2 overflow-hidden select-none">
        <div className="flex items-center gap-8 whitespace-nowrap animate-marquee text-xs text-slate-400">
          <span className="flex items-center gap-2">
            <span className="text-[#00ff41] font-bold">STATUS:</span> OPERATIONAL
          </span>
          <span className="text-slate-600">///</span>
          <span className="flex items-center gap-2">
            <span className="text-[#00f3ff] font-bold">LATEST BUILD:</span> SENTINX v2.4 DEPLOYED
          </span>
          <span className="text-slate-600">///</span>
          <span className="flex items-center gap-2">
            <span className="text-[#00ff41] font-bold">VULN_SCAN:</span> 0 HIGH SEVERITY FLAWS
          </span>
          <span className="text-slate-600">///</span>
          <span className="flex items-center gap-2">
            <span className="text-[#ffaa00] font-bold">CTF LEADERBOARD:</span> TOP 3% GLOBAL
          </span>
          <span className="text-slate-600">///</span>
          <span className="flex items-center gap-2">
            <span className="text-[#00ff41] font-bold">AVAILABLE:</span> FULL-TIME & CONTRACT ROLES
          </span>
        </div>
      </section>

      {/* 4. Featured Projects Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#16202c] pb-4">
          <div>
            <div className="text-xs text-[#00f3ff] uppercase tracking-wider font-semibold">
              Selected Works
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Featured Cyber & Engineering Projects
            </h2>
          </div>
          <Link
            href="/projects"
            onClick={() => playSound('click')}
            className="text-xs text-[#00ff41] hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer font-bold"
          >
            <span>VIEW ALL PROJECTS ({PROJECTS_DATA.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-[#0a0e14] border border-[#16202c] hover:border-[#00ff41] rounded-lg p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,65,0.15)] hover:-translate-y-1"
            >
              <div className="space-y-3">
                {/* Category & Status */}
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="text-[#00f3ff] font-semibold">{project.category}</span>
                  <span className="text-slate-500 font-mono">FEATURED</span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-[#00ff41] transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[10px] bg-[#0d141e] text-slate-300 rounded border border-[#1b2838]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Mock Terminal Command Line */}
                <div className="p-2 bg-[#05070a] rounded border border-[#141b24] text-[10px] text-slate-400 flex items-center gap-1.5 overflow-x-auto">
                  <span className="text-[#00ff41]">&gt;</span>
                  <span className="text-slate-300 font-mono truncate">{project.terminalCommand}</span>
                </div>
              </div>

              {/* Links */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#16202c] text-xs">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Source Code</span>
                </a>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-[#00ff41] hover:underline transition-colors"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Terminal Quick Access Banner */}
      <section className="p-6 bg-gradient-to-r from-[#070b10] via-[#0d141e] to-[#070b10] border border-[#00ff41]/30 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-[#00ff41] font-bold">
            <Terminal className="w-4 h-4 text-[#00ff41]" />
            <span>INTERACTIVE HACKER CONSOLE READY</span>
          </div>
          <p className="text-xs text-slate-400 max-w-lg">
            Prefer keyboard interaction? Open the terminal widget to explore projects, inspect skills, query status, or discover secret CTF flags.
          </p>
        </div>

        <button
          type="button"
          onClick={toggleTerminal}
          className="px-5 py-2.5 text-xs font-bold text-black bg-[#00ff41] hover:bg-[#00cc33] rounded shadow-[0_0_15px_rgba(0,255,65,0.3)] transition-all cursor-pointer whitespace-nowrap shrink-0"
        >
          LAUNCH TERMINAL &gt;_
        </button>
      </section>
    </div>
  );
}
