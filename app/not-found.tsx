'use client';

import React from 'react';
import Link from 'next/link';
import { AlertTriangle, Terminal, Home, ArrowLeft, RefreshCw } from 'lucide-react';
import { useCyber } from '@/components/cyber-context';

export default function NotFound() {
  const { toggleTerminal, playSound } = useCyber();

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4 sm:p-6 font-mono">
      <div className="w-full max-w-2xl bg-[#070a0f] border-2 border-[#ff3344] rounded-lg shadow-[0_0_35px_rgba(255,51,68,0.25)] overflow-hidden">
        {/* Terminal Header */}
        <div className="px-4 py-3 bg-[#160809] border-b border-[#ff3344]/50 flex items-center justify-between text-xs text-[#ff3344]">
          <div className="flex items-center gap-2 font-bold">
            <AlertTriangle className="w-4 h-4 animate-pulse" />
            <span>KERNEL PANIC // SEGMENTATION FAULT</span>
          </div>
          <span className="text-[10px] text-slate-500">EXIT CODE: 0x00000194</span>
        </div>

        {/* Terminal Screen Body */}
        <div className="p-6 space-y-5 text-xs text-slate-300 leading-relaxed bg-[#050608]">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#ff3344] tracking-wider glitch-hover">
              ERROR 404: PAGE NOT FOUND
            </h1>
            <p className="text-slate-400 text-xs">
              The requested memory address or directory could not be located in the current virtual file system.
            </p>
          </div>

          {/* Diagnostic Crash Dump Box */}
          <div className="p-4 bg-[#0a0506] border border-[#ff3344]/40 rounded text-[11px] font-mono text-slate-400 space-y-1 overflow-x-auto">
            <div className="text-[#ff3344] font-semibold">&gt; STACK TRACE DIAGNOSTICS:</div>
            <div>[0.004123] CPU: 0 PID: 404 Comm: route_resolver Tainted: G S</div>
            <div>[0.004124] RIP: 0010:locate_virtual_node+0x42/0x120</div>
            <div>[0.004125] RSP: 0018:ffffa84c01257c98 EFLAGS: 00010286 ORIG_RAX: 0000000000000194</div>
            <div>[0.004126] CR2: 00007fffa8003180 status: ADDR_NOT_MAPPED_TO_PAGE</div>
            <div>[0.004127] KERNEL ADVISORY: Return to root command center or execute 'help'.</div>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <span className="text-[#00ff41]">&gt;</span>
            <span>Suggested recovery protocol:</span>
          </div>

          {/* Recovery Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/"
              onClick={() => playSound('access')}
              className="px-4 py-2.5 bg-[#00ff41] hover:bg-[#00cc33] text-black font-extrabold text-xs rounded transition-all shadow-[0_0_15px_rgba(0,255,65,0.3)] inline-flex items-center gap-2 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>RETURN TO ROOT (/)</span>
            </Link>

            <button
              type="button"
              onClick={toggleTerminal}
              className="px-4 py-2.5 bg-[#0d141e] hover:bg-[#15202e] border border-[#1b2838] hover:border-[#00ff41] text-[#00ff41] font-semibold text-xs rounded transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <Terminal className="w-4 h-4" />
              <span>OPEN CLI TERMINAL</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-[#0d0708] border-t border-[#ff3344]/30 text-[10px] text-slate-500 flex items-center justify-between">
          <span>SAFE MODE: ENABLED</span>
          <span className="text-[#ff3344]">INTEGRITY CHECK COMPLETED</span>
        </div>
      </div>
    </div>
  );
}
