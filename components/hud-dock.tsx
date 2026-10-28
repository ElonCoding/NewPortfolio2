'use client';

import React, { useState } from 'react';
import { Settings, Sliders, RefreshCw, X, ShieldCheck, Monitor } from 'lucide-react';
import { useCyber } from './cyber-context';

export default function HudDock() {
  const {
    scanlinesEnabled,
    toggleScanlines,
    matrixEnabled,
    toggleMatrix,
    soundEnabled,
    toggleSound,
    personalization,
    updatePersonalization,
    resetPersonalization,
    playSound,
  } = useCyber();

  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <>
      {/* Floating HUD Pill on bottom right */}
      <div className="fixed bottom-5 right-5 z-40 font-mono">
        <button
          type="button"
          onClick={() => {
            setPanelOpen(!panelOpen);
            playSound('click');
          }}
          aria-label="Customize Portfolio & HUD Settings"
          title="Customize Name, Title, and Cyber Atmosphere"
          className="flex items-center gap-2 px-3 py-2 bg-[#090e15]/95 hover:bg-[#0f1722] text-[#00ff41] border border-[#00ff41]/50 rounded-full shadow-[0_0_20px_rgba(0,255,65,0.25)] backdrop-blur-md text-xs cursor-pointer transition-all hover:scale-105"
        >
          <Sliders className="w-3.5 h-3.5 text-[#00f3ff]" />
          <span className="hidden sm:inline font-semibold">HUD & CUSTOMIZE</span>
          <span className="sm:hidden font-semibold">HUD</span>
        </button>
      </div>

      {/* Slide-out Customization Panel */}
      {panelOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="HUD Settings & Personalization"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-end p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setPanelOpen(false)}
        >
          <div
            className="w-full sm:max-w-md bg-[#090e15] border border-[#00ff41]/50 rounded-lg shadow-2xl p-5 space-y-4 font-mono text-xs text-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#16202c] pb-3">
              <div className="flex items-center gap-2 text-[#00ff41] font-bold text-sm">
                <Settings className="w-4 h-4 text-[#00f3ff]" />
                <span>TERMINAL HUD CONFIGURATION</span>
              </div>
              <button
                type="button"
                onClick={() => setPanelOpen(false)}
                className="text-slate-400 hover:text-[#ff3344] p-1"
                aria-label="Close settings"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Atmosphere Toggles */}
            <div className="space-y-2">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                Atmosphere & FX
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={toggleMatrix}
                  className={`p-2 rounded border text-center transition-colors cursor-pointer ${
                    matrixEnabled
                      ? 'bg-[#00ff41]/15 border-[#00ff41] text-[#00ff41]'
                      : 'bg-[#0d141e] border-[#1b2838] text-slate-400'
                  }`}
                >
                  <div className="font-bold">Matrix Rain</div>
                  <div className="text-[10px]">{matrixEnabled ? 'ON' : 'OFF'}</div>
                </button>

                <button
                  type="button"
                  onClick={toggleScanlines}
                  className={`p-2 rounded border text-center transition-colors cursor-pointer ${
                    scanlinesEnabled
                      ? 'bg-[#00ff41]/15 border-[#00ff41] text-[#00ff41]'
                      : 'bg-[#0d141e] border-[#1b2838] text-slate-400'
                  }`}
                >
                  <div className="font-bold">CRT Scanlines</div>
                  <div className="text-[10px]">{scanlinesEnabled ? 'ON' : 'OFF'}</div>
                </button>

                <button
                  type="button"
                  onClick={toggleSound}
                  className={`p-2 rounded border text-center transition-colors cursor-pointer ${
                    soundEnabled
                      ? 'bg-[#00f3ff]/15 border-[#00f3ff] text-[#00f3ff]'
                      : 'bg-[#0d141e] border-[#1b2838] text-slate-400'
                  }`}
                >
                  <div className="font-bold">Cyber Sound</div>
                  <div className="text-[10px]">{soundEnabled ? 'ON' : 'OFF'}</div>
                </button>
              </div>
            </div>

            {/* Live Personalization Overrides */}
            <div className="space-y-3 pt-2 border-t border-[#16202c]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                  Personalize Live Content
                </span>
                <button
                  type="button"
                  onClick={resetPersonalization}
                  title="Reset to defaults"
                  className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-[#00ff41]"
                >
                  <RefreshCw className="w-3 h-3" /> Reset Defaults
                </button>
              </div>

              <div className="space-y-2">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Your Name</label>
                  <input
                    type="text"
                    value={personalization.name}
                    onChange={(e) => updatePersonalization({ name: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-[#05070a] border border-[#1b2838] rounded text-white focus:border-[#00ff41] outline-none"
                    placeholder="e.g. Alex Vance"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Handle / Username</label>
                  <input
                    type="text"
                    value={personalization.handle}
                    onChange={(e) => updatePersonalization({ handle: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-[#05070a] border border-[#1b2838] rounded text-white focus:border-[#00ff41] outline-none"
                    placeholder="e.g. zero_cool"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Role / Headline</label>
                  <input
                    type="text"
                    value={personalization.role}
                    onChange={(e) => updatePersonalization({ role: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-[#05070a] border border-[#1b2838] rounded text-white focus:border-[#00ff41] outline-none"
                    placeholder="e.g. Cybersecurity Engineer"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Status Badge Text</label>
                  <input
                    type="text"
                    value={personalization.statusBadge}
                    onChange={(e) => updatePersonalization({ statusBadge: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-[#05070a] border border-[#1b2838] rounded text-white focus:border-[#00ff41] outline-none"
                    placeholder="e.g. AVAILABLE FOR OPPORTUNITIES"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-slate-500 border-t border-[#16202c]">
              Modifications are saved immediately to local storage and reflect across all pages.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
