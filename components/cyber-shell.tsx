'use client';

import React from 'react';
import { CyberProvider, useCyber } from './cyber-context';
import MatrixRain from './matrix-rain';
import Navbar from './navbar';
import Footer from './footer';
import TerminalWidget from './terminal-widget';
import CommandPalette from './command-palette';
import HudDock from './hud-dock';

function InnerShell({ children }: { children: React.ReactNode }) {
  const { scanlinesEnabled } = useCyber();

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#e6edf3] selection:bg-[#00ff41] selection:text-black">
      {/* Background Matrix Rain */}
      <MatrixRain />

      {/* Cyber Grid background */}
      <div className="fixed inset-0 cyber-grid pointer-events-none z-0 opacity-40" aria-hidden="true" />

      {/* CRT Scanline Overlay if enabled */}
      {scanlinesEnabled && (
        <div className="fixed inset-0 scanlines-overlay pointer-events-none z-30" aria-hidden="true" />
      )}

      {/* Primary Fixed Navbar */}
      <Navbar />

      {/* Page Main Content */}
      <main className="relative z-10 min-h-[calc(100vh-16rem)]">
        {children}
      </main>

      {/* Terminal and Command Palette Modals */}
      <TerminalWidget />
      <CommandPalette />

      {/* Floating HUD controls */}
      <HudDock />

      {/* Futuristic Cyber Footer */}
      <Footer />
    </div>
  );
}

export default function CyberShell({ children }: { children: React.ReactNode }) {
  return (
    <CyberProvider>
      <InnerShell>{children}</InnerShell>
    </CyberProvider>
  );
}
