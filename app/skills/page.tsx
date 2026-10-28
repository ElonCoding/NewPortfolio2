'use client';

import React, { useState } from 'react';
import {
  Cpu,
  Terminal,
  Search,
  Filter,
  CheckCircle2,
  Sliders,
  Sparkles,
  Layers,
  Code,
} from 'lucide-react';
import { useCyber } from '@/components/cyber-context';
import { SKILLS_DATA, Skill } from '@/lib/portfolio-data';
import { filterSkills } from '@/lib/portfolio-utils';

export default function SkillsPage() {
  const { playSound, toggleTerminal } = useCyber();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [cliInput, setCliInput] = useState<string>('');
  const [cliFeedback, setCliFeedback] = useState<string | null>(null);

  const categories = [
    'All',
    'Programming Languages',
    'Cybersecurity',
    'Frontend',
    'Backend',
    'Tools',
    'Other Technologies',
  ];

  const filteredSkills = filterSkills(SKILLS_DATA, selectedCategory, searchQuery);

  const handleCliSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = cliInput.trim().toLowerCase();
    if (!query) return;

    playSound('click');

    if (query === 'help') {
      setCliFeedback('Usage: find <name>, cat <category>, sort, reset');
    } else if (query.startsWith('find ')) {
      const term = query.replace('find ', '').trim();
      setSearchQuery(term);
      setCliFeedback(`[+] Querying matrix for "${term}"...`);
    } else if (query.startsWith('cat ')) {
      const cat = query.replace('cat ', '').trim();
      const match = categories.find((c) => c.toLowerCase().includes(cat));
      if (match) {
        setSelectedCategory(match);
        setCliFeedback(`[+] Category filter locked to "${match}".`);
      } else {
        setCliFeedback(`[-] Category "${cat}" not found.`);
      }
    } else if (query === 'reset') {
      setSelectedCategory('All');
      setSearchQuery('');
      setCliFeedback('[+] Skills explorer parameters restored.');
    } else {
      setSearchQuery(query);
      setCliFeedback(`[+] Searching index for "${query}"...`);
    }
    setCliInput('');
  };

  return (
    <div className="space-y-12 py-8 px-4 sm:px-6 max-w-7xl mx-auto font-mono">
      {/* 1. Header */}
      <div className="space-y-2 border-b border-[#16202c] pb-6">
        <div className="flex items-center gap-2 text-xs text-[#00f3ff] uppercase tracking-wider">
          <Cpu className="w-3.5 h-3.5 text-[#00ff41]" />
          <span>CAPABILITIES MATRIX // DIRECTORY: /SKILLS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          TECHNICAL <span className="text-[#00ff41]">ARSENAL & PROFICIENCY</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
          Granular proficiency metrics across secure systems programming, penetration testing, modern web frameworks, and containerized architectures.
        </p>
      </div>

      {/* 2. Interactive CLI Skills Explorer Bar */}
      <div className="p-4 bg-[#070b10] border border-[#00ff41]/50 rounded-lg shadow-[0_0_20px_rgba(0,255,65,0.1)] space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-[#00ff41]" />
            <span className="font-bold text-white">CLI SKILLS PROBE</span>
          </div>
          <span className="text-[11px] text-slate-500">TYPE 'find python' OR 'cat cyber'</span>
        </div>

        <form onSubmit={handleCliSubmit} className="flex items-center gap-2">
          <span className="text-[#00ff41] font-bold text-sm">&gt;</span>
          <input
            type="text"
            value={cliInput}
            onChange={(e) => setCliInput(e.target.value)}
            placeholder="skills probe: try 'find rust', 'cat frontend', 'reset'..."
            aria-label="CLI skills search"
            className="flex-1 bg-[#05070a] px-3 py-2 border border-[#1b2838] focus:border-[#00ff41] rounded text-xs text-white placeholder-slate-600 outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#00ff41] hover:bg-[#00cc33] text-black font-bold text-xs rounded transition-colors cursor-pointer"
          >
            EXECUTE
          </button>
        </form>

        {cliFeedback && (
          <div className="text-xs text-[#00f3ff] pl-4 font-mono">
            {cliFeedback}
          </div>
        )}
      </div>

      {/* 3. Category Filter Tabs & View Mode */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0a0e14] p-4 border border-[#16202c] rounded-lg">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  playSound('click');
                }}
                className={`px-3 py-1.5 text-xs rounded transition-colors whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-[#00ff41] text-black font-bold shadow-[0_0_10px_rgba(0,255,65,0.4)]'
                    : 'bg-[#0d141e] text-slate-300 hover:text-white hover:bg-[#15202e] border border-[#1b2838]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* View Switcher: Cards vs Telemetry Table */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              setViewMode('cards');
              playSound('click');
            }}
            className={`px-3 py-1 text-xs rounded border transition-colors cursor-pointer ${
              viewMode === 'cards'
                ? 'bg-[#00ff41]/15 border-[#00ff41] text-[#00ff41] font-semibold'
                : 'bg-[#0d141e] border-[#1b2838] text-slate-400'
            }`}
          >
            Card Grid
          </button>
          <button
            type="button"
            onClick={() => {
              setViewMode('table');
              playSound('click');
            }}
            className={`px-3 py-1 text-xs rounded border transition-colors cursor-pointer ${
              viewMode === 'table'
                ? 'bg-[#00f3ff]/15 border-[#00f3ff] text-[#00f3ff] font-semibold'
                : 'bg-[#0d141e] border-[#1b2838] text-slate-400'
            }`}
          >
            Telemetry Table
          </button>
        </div>
      </div>

      {/* 4. Display Content based on View Mode */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="p-5 bg-[#080c12] border border-[#16202c] hover:border-[#00ff41]/70 rounded-lg space-y-3 transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,255,65,0.15)] group"
            >
              <div className="flex items-center justify-between">
                <span className="text-white font-bold text-sm group-hover:text-[#00ff41] transition-colors">
                  {skill.name}
                </span>
                <span className="text-xs text-[#00f3ff] font-bold tabular-nums">
                  {skill.proficiency}%
                </span>
              </div>

              {/* Animated Progress Bar */}
              <div className="w-full h-2 bg-[#05070a] rounded-full overflow-hidden border border-[#1b2838]">
                <div
                  className="h-full bg-gradient-to-r from-[#00cc33] to-[#00ff41] transition-all duration-700 shadow-[0_0_8px_#00ff41]"
                  style={{ width: `${skill.proficiency}%` }}
                />
              </div>

              <p className="text-xs text-slate-400 leading-relaxed min-h-[36px]">
                {skill.description}
              </p>

              {/* Terminal command snippet */}
              <div className="p-2 bg-[#05070a] rounded border border-[#141b24] text-[10px] text-slate-400 flex items-center gap-1.5 overflow-x-auto">
                <span className="text-[#00ff41]">&gt;</span>
                <span className="truncate">{skill.command}</span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-[#16202c]">
                <span>CATEGORY: {skill.category}</span>
                <span className="text-[#00ff41] font-semibold">{skill.level}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Telemetry Table View */
        <div className="overflow-x-auto border border-[#16202c] rounded-lg bg-[#080c12]">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#0d141e] text-slate-400 border-b border-[#16202c]">
              <tr>
                <th className="px-4 py-3">CAPABILITY / STACK</th>
                <th className="px-4 py-3">CATEGORY</th>
                <th className="px-4 py-3">RATING</th>
                <th className="px-4 py-3">TIER</th>
                <th className="px-4 py-3">DIAGNOSTIC COMMAND</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#141b24] text-slate-300">
              {filteredSkills.map((skill) => (
                <tr key={skill.name} className="hover:bg-[#0e1622] transition-colors">
                  <td className="px-4 py-3 font-semibold text-white">
                    {skill.name}
                  </td>
                  <td className="px-4 py-3 text-[#00f3ff]">
                    {skill.category}
                  </td>
                  <td className="px-4 py-3 text-[#00ff41] font-bold tabular-nums">
                    {skill.proficiency}%
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 bg-[#00ff41]/10 text-[#00ff41] border border-[#00ff41]/30 rounded text-[10px]">
                      {skill.level}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400 text-[11px] font-mono">
                    {skill.command}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 5. Customization Notice */}
      <div className="p-4 bg-[#0a0e14] border border-[#16202c] rounded text-xs text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span>
          // NOTE: All proficiency thresholds and command syntaxes are fully configurable in <code className="text-[#00ff41]">lib/portfolio-data.ts</code>.
        </span>
        <button
          type="button"
          onClick={toggleTerminal}
          className="text-[#00ff41] hover:underline font-bold whitespace-nowrap self-start sm:self-auto cursor-pointer"
        >
          VIEW SKILLS IN CLI &gt;_
        </button>
      </div>
    </div>
  );
}
