'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FolderGit2,
  Terminal,
  Search,
  ExternalLink,
  Github,
  Copy,
  Check,
  Filter,
  Sparkles,
} from 'lucide-react';
import { useCyber } from '@/components/cyber-context';
import { PROJECTS_DATA, Project } from '@/lib/portfolio-data';
import { filterProjects } from '@/lib/portfolio-utils';

export default function ProjectsPage() {
  const { playSound, toggleTerminal } = useCyber();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const categories = ['All', 'Cybersecurity', 'Web Development', 'Automation', 'Experiments'];

  const filteredProjects = filterProjects(PROJECTS_DATA, selectedCategory, searchQuery);

  const handleCopyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    playSound('beep');
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="space-y-12 py-8 px-4 sm:px-6 max-w-7xl mx-auto font-mono">
      {/* 1. Header */}
      <div className="space-y-2 border-b border-[#16202c] pb-6">
        <div className="flex items-center gap-2 text-xs text-[#00f3ff] uppercase tracking-wider">
          <FolderGit2 className="w-3.5 h-3.5 text-[#00ff41]" />
          <span>ARSENAL // DIRECTORY: /PROJECTS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          CYBER & SOFTWARE <span className="text-[#00ff41]">PROJECTS</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
          Curated collection of security telemetry harnesses, zero-knowledge encryption vaults, automated reconnaissance pipelines, and distributed web tools.
        </p>
      </div>

      {/* 2. Controls: Category Tabs & Search Bar */}
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

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by name, tech..."
            aria-label="Search projects"
            className="w-full pl-9 pr-3 py-1.5 bg-[#05070a] border border-[#1b2838] focus:border-[#00ff41] rounded text-xs text-white placeholder-slate-500 outline-none"
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          DISPLAYING {filteredProjects.length} OF {PROJECTS_DATA.length} REPOSITORIES
        </span>
        <button
          type="button"
          onClick={toggleTerminal}
          className="text-[#00f3ff] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Run 'projects' in terminal</span>
        </button>
      </div>

      {/* 3. Responsive Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 text-center bg-[#070b10] border border-[#16202c] rounded-lg space-y-3">
          <Terminal className="w-8 h-8 text-slate-600 mx-auto" />
          <div className="text-sm text-slate-400 font-semibold">
            No projects matched query "{searchQuery}" in category "{selectedCategory}".
          </div>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="px-3 py-1.5 bg-[#0d141e] hover:bg-[#15202e] text-[#00ff41] border border-[#1b2838] rounded text-xs cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-[#080c12] border border-[#16202c] hover:border-[#00ff41] rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,255,65,0.2)] hover:-translate-y-1"
            >
              {/* Fake Terminal Titlebar on Card */}
              <div className="px-3 py-2 bg-[#0d141e] border-b border-[#16202c] flex items-center justify-between text-[11px] text-slate-400 select-none">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500/80" />
                  <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                  <span className="w-2 h-2 rounded-full bg-green-500/80" />
                  <span className="ml-1 text-[10px] text-slate-400 truncate max-w-[140px]">
                    {project.id}.sh
                  </span>
                </div>
                <span className="text-[10px] text-[#00f3ff] uppercase">{project.category}</span>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3 flex-1">
                <h3 className="text-base font-bold text-white group-hover:text-[#00ff41] transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {project.description}
                </p>

                {/* Metrics if available */}
                {project.metrics && (
                  <div className="grid grid-cols-2 gap-2 p-2 bg-[#05070a] rounded border border-[#141b24] text-[11px]">
                    {project.metrics.map((m, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <div className="text-[10px] text-slate-500 uppercase">{m.label}</div>
                        <div className="font-bold text-[#00ff41]">{m.value}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[10px] bg-[#0d141e] text-slate-300 rounded border border-[#1b2838]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Command snippet with copy button */}
                <div className="p-2 bg-[#05070a] rounded border border-[#141b24] flex items-center justify-between gap-2 text-[10px]">
                  <div className="flex items-center gap-1 text-slate-400 truncate font-mono">
                    <span className="text-[#00ff41]">&gt;</span>
                    <span className="truncate">{project.terminalCommand}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyCommand(project.terminalCommand)}
                    title="Copy command to clipboard"
                    className="p-1 text-slate-400 hover:text-[#00ff41] transition-colors shrink-0 cursor-pointer"
                  >
                    {copiedCmd === project.terminalCommand ? (
                      <Check className="w-3 h-3 text-[#00ff41]" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-5 py-3 border-t border-[#16202c] bg-[#090d14] flex items-center justify-between text-xs">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Source</span>
                </a>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-[#00ff41] hover:underline transition-colors font-semibold"
                  >
                    <span>Launch Demo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
