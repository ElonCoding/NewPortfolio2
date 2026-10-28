'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  User,
  Shield,
  MapPin,
  Briefcase,
  Terminal,
  Target,
  Sparkles,
  Award,
  BookOpen,
  ArrowRight,
  Code2,
} from 'lucide-react';
import { useCyber } from '@/components/cyber-context';
import { PORTFOLIO_CONFIG, EXPERIENCE_DATA } from '@/lib/portfolio-data';

export default function AboutPage() {
  const { personalization, playSound } = useCyber();

  return (
    <div className="space-y-16 py-8 px-4 sm:px-6 max-w-7xl mx-auto font-mono">
      {/* 1. Header & Breadcrumb */}
      <div className="space-y-2 border-b border-[#16202c] pb-6">
        <div className="flex items-center gap-2 text-xs text-[#00f3ff] uppercase tracking-wider">
          <Terminal className="w-3.5 h-3.5 text-[#00ff41]" />
          <span>DIRECTORY: /SYS/USER/ABOUT.MD // DOSSIER</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          OPERATOR DOSSIER // <span className="text-[#00ff41]">ABOUT ME</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
          Deep-dive into my professional background, cybersecurity interests, core philosophy, and mission parameters.
        </p>
      </div>

      {/* 2. Avatar & Terminal Profile Card Split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Avatar Showcase */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-[#0a0e14] border border-[#16202c] rounded-lg space-y-4">
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-lg overflow-hidden border-2 border-[#00ff41]/50 shadow-[0_0_30px_rgba(0,255,65,0.2)]">
            <Image
              src="/images/avatar.jpg"
              alt={`${personalization.name} Avatar`}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
              priority
            />
            {/* Visual HUD overlay over avatar */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
              <div className="text-[10px] text-[#00ff41] bg-black/70 px-2 py-0.5 rounded border border-[#00ff41]/30">
                SUBJECT: #{personalization.handle} [VERIFIED]
              </div>
            </div>
          </div>

          <div className="text-center space-y-1">
            <h2 className="text-lg font-bold text-white">{personalization.name}</h2>
            <div className="text-xs text-[#00ff41]">@{personalization.handle}</div>
            <p className="text-xs text-slate-400 max-w-xs pt-1">{personalization.role}</p>
          </div>

          <div className="w-full pt-2 border-t border-[#16202c] flex items-center justify-around text-xs text-slate-400">
            <div className="text-center">
              <div className="text-[#00f3ff] font-bold">CLEARANCE</div>
              <div className="text-[11px]">LEVEL 4</div>
            </div>
            <div className="text-center">
              <div className="text-[#00ff41] font-bold">STATUS</div>
              <div className="text-[11px]">ACTIVE</div>
            </div>
            <div className="text-center">
              <div className="text-white font-bold">LOCATION</div>
              <div className="text-[11px] truncate max-w-[100px]">{personalization.location.split('//')[0]}</div>
            </div>
          </div>
        </div>

        {/* Right: Terminal-Style Profile Card */}
        <div className="lg:col-span-7 bg-[#070a0f] border border-[#00ff41]/40 rounded-lg p-6 flex flex-col justify-between shadow-[0_0_20px_rgba(0,255,65,0.1)]">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#16202c] pb-3 text-xs text-slate-400">
              <span className="text-[#00ff41] font-bold">OPERATOR_PROFILE.SPEC</span>
              <span>READ_ONLY // CONFIDENTIAL</span>
            </div>

            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
                <span className="text-slate-500">OPERATOR NAME:</span>
                <span className="sm:col-span-2 text-white font-semibold">{personalization.name}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
                <span className="text-slate-500">SYSTEM ROLE:</span>
                <span className="sm:col-span-2 text-[#00ff41] font-semibold">{personalization.role}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
                <span className="text-slate-500">COORDINATES:</span>
                <span className="sm:col-span-2 text-slate-300">{personalization.location}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
                <span className="text-slate-500">CORE INTERESTS:</span>
                <span className="sm:col-span-2 text-slate-300">
                  Offensive Security, Cryptographic Protocols, High-Concurrency Distributed Backends, Kernel Internals, Terminal UX
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
                <span className="text-slate-500">CURRENT MISSION:</span>
                <span className="sm:col-span-2 text-[#00f3ff]">
                  Designing resilient, intrusion-tolerant architectures that protect digital sovereignty and privacy.
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#16202c] space-y-2">
              <div className="text-slate-400 text-xs font-semibold">PROFESSIONAL JOURNEY:</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {PORTFOLIO_CONFIG.fullBio}
              </p>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-[#16202c] flex flex-wrap gap-3">
            <Link
              href="/projects"
              onClick={() => playSound('click')}
              className="px-4 py-2 text-xs font-bold text-black bg-[#00ff41] hover:bg-[#00cc33] rounded transition-colors"
            >
              INSPECT ARSENAL
            </Link>
            <Link
              href="/contact"
              onClick={() => playSound('click')}
              className="px-4 py-2 text-xs font-semibold text-slate-200 bg-[#0d141e] hover:bg-[#15202e] border border-[#1b2838] rounded transition-colors"
            >
              ESTABLISH UPLINK
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Background, Interests, Goals, and Achievements Grid */}
      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#00ff41]" />
          <span>Core Strategic Pillars</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-[#0a0e14] border border-[#16202c] hover:border-[#00ff41]/60 rounded-lg space-y-3 transition-colors">
            <div className="flex items-center gap-2 text-xs text-[#00ff41] font-bold">
              <Briefcase className="w-4 h-4 text-[#00ff41]" />
              <span>BACKGROUND</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Started in systems programming and network dissection. Transitioned to building full-scale web platforms while maintaining a relentless focus on attack surfaces and defensive cryptography.
            </p>
          </div>

          <div className="p-5 bg-[#0a0e14] border border-[#16202c] hover:border-[#00f3ff]/60 rounded-lg space-y-3 transition-colors">
            <div className="flex items-center gap-2 text-xs text-[#00f3ff] font-bold">
              <Code2 className="w-4 h-4 text-[#00f3ff]" />
              <span>INTERESTS</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Kernel telemetry via eBPF, binary exploitation mitigation, zero-trust protocols, hardware security tokens, minimal high-performance CLIs, and retro cyberpunk terminal interfaces.
            </p>
          </div>

          <div className="p-5 bg-[#0a0e14] border border-[#16202c] hover:border-[#00ff41]/60 rounded-lg space-y-3 transition-colors">
            <div className="flex items-center gap-2 text-xs text-[#00ff41] font-bold">
              <Target className="w-4 h-4 text-[#00ff41]" />
              <span>CURRENT GOALS</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Collaborating with innovative teams on mission-critical security platforms, open-source penetration testing utilities, and next-generation privacy-preserving web infrastructure.
            </p>
          </div>

          <div className="p-5 bg-[#0a0e14] border border-[#16202c] hover:border-[#00f3ff]/60 rounded-lg space-y-3 transition-colors">
            <div className="flex items-center gap-2 text-xs text-[#00f3ff] font-bold">
              <Award className="w-4 h-4 text-[#00f3ff]" />
              <span>ACHIEVEMENTS</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Consistently placed in top 3% in global Capture The Flag competitions, published 4 in-depth security write-ups, and engineered zero-knowledge cryptography modules with zero leaks.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Animated Timeline for Education and Experience */}
      <section className="space-y-6">
        <div className="space-y-1">
          <div className="text-xs text-[#00f3ff] uppercase tracking-wider font-semibold">
            Chronological Sequence
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Experience & Educational Milestones
          </h2>
        </div>

        <div className="relative pl-6 sm:pl-8 border-l-2 border-[#00ff41]/40 space-y-8 my-6">
          {EXPERIENCE_DATA.map((item) => (
            <div key={item.id} className="relative group">
              {/* Neon Green Timeline Node Marker */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#050505] border-2 border-[#00ff41] group-hover:scale-125 transition-transform flex items-center justify-center shadow-[0_0_10px_#00ff41]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00ff41]" />
              </div>

              <div className="bg-[#0a0e14] border border-[#16202c] hover:border-[#00ff41]/60 rounded-lg p-5 space-y-3 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <div className="text-white font-bold text-sm sm:text-base flex items-center gap-2">
                    <span>{item.role}</span>
                    {item.badge && (
                      <span className="px-2 py-0.5 bg-[#00ff41]/10 text-[#00ff41] border border-[#00ff41]/30 rounded text-[10px]">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[#00f3ff] font-semibold">{item.period}</span>
                </div>

                <div className="text-xs text-slate-400 font-semibold flex items-center gap-2">
                  <span>{item.organization}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-500">{item.location}</span>
                </div>

                <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                  {item.description.map((desc, dIdx) => (
                    <li key={dIdx} className="leading-relaxed">
                      {desc}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#16202c]">
                  {item.skillsUsed.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 text-[10px] bg-[#0d141e] text-slate-400 rounded border border-[#1b2838]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Personal Philosophy Section */}
      <section className="space-y-6 border-t border-[#16202c] pt-10">
        <div className="space-y-1">
          <div className="text-xs text-[#00f3ff] uppercase tracking-wider font-semibold">
            Guiding Tenets
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Engineering & Security Philosophy
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTFOLIO_CONFIG.philosophy.map((item, idx) => (
            <div
              key={idx}
              className="p-5 bg-[#080c12] border border-[#16202c] rounded-lg space-y-2 hover:border-[#00ff41]/50 transition-colors"
            >
              <div className="text-xs font-bold text-[#00ff41]">
                // 0{idx + 1}. {item.title}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
