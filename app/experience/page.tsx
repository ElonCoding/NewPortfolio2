'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Award,
  Terminal,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  CheckCircle,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react';
import { useCyber } from '@/components/cyber-context';
import { EXPERIENCE_DATA, CERTIFICATIONS_DATA } from '@/lib/portfolio-data';

export default function ExperiencePage() {
  const { playSound, toggleTerminal } = useCyber();
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    playSound('beep');
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div className="space-y-16 py-8 px-4 sm:px-6 max-w-7xl mx-auto font-mono">
      {/* 1. Header */}
      <div className="space-y-2 border-b border-[#16202c] pb-6">
        <div className="flex items-center gap-2 text-xs text-[#00f3ff] uppercase tracking-wider">
          <Award className="w-3.5 h-3.5 text-[#00ff41]" />
          <span>CHRONOLOGY // DIRECTORY: /EXPERIENCE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          CAREER TRAJECTORY & <span className="text-[#00ff41]">CERTIFICATIONS</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
          Historical record of professional engineering roles, security research, formal education, and cryptographically verified certifications.
        </p>
      </div>

      {/* 2. Vertical Futuristic Timeline */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#00ff41]" />
            <span>Professional & Academic Sequence</span>
          </h2>
          <span className="text-xs text-slate-500">SORT: CHRONOLOGICAL DESC</span>
        </div>

        <div className="relative pl-6 sm:pl-8 border-l-2 border-[#00ff41]/40 space-y-8 my-6">
          {EXPERIENCE_DATA.map((item) => {
            const isEducation = item.type === 'education';
            return (
              <div key={item.id} className="relative group">
                {/* Glowing Node Marker */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#050505] border-2 border-[#00ff41] group-hover:scale-125 transition-transform flex items-center justify-center shadow-[0_0_12px_#00ff41]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00ff41]" />
                </div>

                <div className="bg-[#080c12] border border-[#16202c] hover:border-[#00ff41]/70 rounded-lg p-5 sm:p-6 space-y-4 transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,255,65,0.15)]">
                  {/* Top Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#141c26] pb-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        {isEducation ? (
                          <GraduationCap className="w-4 h-4 text-[#00f3ff]" />
                        ) : (
                          <Briefcase className="w-4 h-4 text-[#00ff41]" />
                        )}
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#00ff41] transition-colors">
                          {item.role}
                        </h3>
                        {item.badge && (
                          <span className="px-2 py-0.5 bg-[#00ff41]/10 text-[#00ff41] border border-[#00ff41]/30 rounded text-[10px] font-semibold">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400">
                        <strong className="text-slate-200">{item.organization}</strong> ·{' '}
                        <span>{item.location}</span>
                      </div>
                    </div>

                    <div className="text-xs text-[#00f3ff] font-semibold self-start sm:self-auto bg-[#00f3ff]/10 px-2.5 py-1 rounded border border-[#00f3ff]/30">
                      {item.period}
                    </div>
                  </div>

                  {/* Bullet Points */}
                  <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside">
                    {item.description.map((desc, dIdx) => (
                      <li key={dIdx} className="leading-relaxed">
                        {desc}
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#141c26]">
                    {item.skillsUsed.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] bg-[#0d141e] text-slate-300 rounded border border-[#1b2838]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Verified Certifications & Credentials Grid */}
      <section className="space-y-6 border-t border-[#16202c] pt-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="text-xs text-[#00f3ff] uppercase tracking-wider font-semibold">
              Security Credentials
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#00ff41]" />
              <span>Verified Certifications</span>
            </h2>
          </div>
          <span className="text-xs text-slate-500">CRYPTOGRAPHIC SIGNATURES INTACT</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTIFICATIONS_DATA.map((cert) => (
            <div
              key={cert.id}
              className="p-5 bg-[#080c12] border border-[#16202c] hover:border-[#00ff41] rounded-lg space-y-3 transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,255,65,0.15)] group"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#00ff41] transition-colors">
                    {cert.title}
                  </h3>
                  <div className="text-xs text-slate-400">
                    Issuer: <span className="text-slate-200">{cert.issuer}</span> · Year: {cert.date}
                  </div>
                </div>

                <span className="px-2.5 py-0.5 bg-[#00ff41]/10 text-[#00ff41] border border-[#00ff41]/40 rounded text-[10px] font-bold flex items-center gap-1 shrink-0">
                  <CheckCircle className="w-3 h-3 text-[#00ff41]" />
                  <span>{cert.status}</span>
                </span>
              </div>

              <div className="text-[11px] text-slate-400">
                CREDENTIAL ID: <span className="text-slate-300 font-mono">{cert.credentialId}</span>
              </div>

              {/* Cryptographic verification hash box */}
              <div className="p-2.5 bg-[#05070a] rounded border border-[#141b24] space-y-1">
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>AUDIT CHECKSUM</span>
                  <button
                    type="button"
                    onClick={() => handleCopyHash(cert.verificationHash)}
                    className="text-slate-400 hover:text-[#00ff41] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {copiedHash === cert.verificationHash ? (
                      <>
                        <Check className="w-3 h-3 text-[#00ff41]" />
                        <span className="text-[#00ff41]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Hash</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="font-mono text-[10px] text-slate-400 truncate">
                  {cert.verificationHash}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Editable Placeholder Notice */}
      <div className="p-4 bg-[#0a0e14] border border-[#16202c] rounded text-xs text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span>
          // DATA INTEGRITY: All roles, dates, and certificate IDs are editable in <code className="text-[#00ff41]">lib/portfolio-data.ts</code>.
        </span>
        <Link
          href="/contact"
          onClick={() => playSound('click')}
          className="text-[#00f3ff] hover:underline font-bold whitespace-nowrap self-start sm:self-auto cursor-pointer"
        >
          REQUEST FULL CV / RESUME &gt;&gt;
        </Link>
      </div>
    </div>
  );
}
