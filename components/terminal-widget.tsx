'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft, Sparkles } from 'lucide-react';
import { useCyber } from './cyber-context';
import { executeTerminalCommand, CommandResult } from '@/lib/terminal-commands';

interface HistoryItem {
  id: string;
  command: string;
  result: CommandResult;
}

export default function TerminalWidget() {
  const {
    terminalOpen,
    setTerminalOpen,
    personalization,
    toggleMatrix,
    toggleSound,
    toggleScanlines,
    playSound,
  } = useCyber();

  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: 'init-1',
      command: './init_portfolio.sh',
      result: {
        output: [
          '[*] Initializing Cyber-Shell Core Environment...',
          '[*] Verifying integrity of cryptographic keys... [PASSED]',
          '[*] Network telemetry nodes connected. Port 443 active.',
          '[+] ACCESS GRANTED // WELCOME TO MY WORLD',
          'Type "help" to view available terminal commands, or try "cat flag.txt".',
        ],
        type: 'success',
      },
    },
  ]);

  const [commandHistory, setCommandHistory] = useState<string[]>(['./init_portfolio.sh']);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const terminalBodyRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto-scroll on new output
  useEffect(() => {
    if (terminalOpen && terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
    if (terminalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [history, terminalOpen]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    playSound('click');

    const result = executeTerminalCommand(cmd);

    if (result.action === 'clear') {
      setHistory([]);
    } else {
      if (result.action === 'toggle-matrix') toggleMatrix();
      if (result.action === 'toggle-sound') toggleSound();
      if (result.action === 'toggle-scanlines') toggleScanlines();

      if (result.type === 'glitch') playSound('glitch');
      else if (result.type === 'success') playSound('access');
      else playSound('beep');

      setHistory((prev) => [
        ...prev,
        {
          id: `${Date.now()}-${Math.random()}`,
          command: cmd,
          result,
        },
      ]);
    }

    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInput(commandHistory[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(nextIdx);
        setInput(commandHistory[nextIdx]);
      }
    }
  };

  if (!terminalOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Interactive Hacker Terminal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm transition-all"
    >
      <div
        className={`w-full bg-[#070b10] border border-[#00ff41]/50 rounded-lg shadow-[0_0_35px_rgba(0,255,65,0.2)] flex flex-col overflow-hidden transition-all duration-200 ${
          isExpanded ? 'max-w-6xl h-[90vh]' : 'max-w-3xl h-[600px] max-h-[85vh]'
        }`}
      >
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0d141e] border-b border-[#1b2838] select-none">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 mr-2">
              <span className="w-3 h-3 rounded-full bg-[#ff3344]/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#ffaa00]/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#00ff41]/80 inline-block" />
            </div>
            <TerminalIcon className="w-4 h-4 text-[#00ff41]" />
            <span className="font-mono text-xs text-slate-300">
              {personalization.handle}@workstation: ~ (sh)
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-label={isExpanded ? 'Restore window size' : 'Maximize terminal window'}
              className="p-1.5 text-slate-400 hover:text-[#00ff41] rounded hover:bg-[#16202c]"
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              type="button"
              onClick={() => {
                setTerminalOpen(false);
                playSound('click');
              }}
              aria-label="Close terminal"
              className="p-1.5 text-slate-400 hover:text-[#ff3344] rounded hover:bg-[#16202c]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-[#090e15] border-b border-[#16202c] flex items-center gap-2 overflow-x-auto text-[11px] font-mono text-slate-400">
          <span className="text-[#00f3ff] shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Quick:
          </span>
          {['help', 'whoami', 'skills', 'projects', 'cat flag.txt', 'matrix', 'status', 'clear'].map(
            (shortcut) => (
              <button
                key={shortcut}
                type="button"
                onClick={() => {
                  setInput(shortcut);
                  if (inputRef.current) inputRef.current.focus();
                }}
                className="px-2 py-0.5 bg-[#0e1622] hover:bg-[#182638] text-slate-300 hover:text-[#00ff41] rounded border border-[#1b2838] transition-colors shrink-0 cursor-pointer"
              >
                {shortcut}
              </button>
            )
          )}
        </div>

        {/* Terminal Content / Logs */}
        <div
          ref={terminalBodyRef}
          onClick={() => inputRef.current?.focus()}
          className="flex-1 p-4 overflow-y-auto font-mono text-xs sm:text-sm text-slate-200 space-y-3 cursor-text bg-[#05070a]"
        >
          {history.map((item) => (
            <div key={item.id} className="space-y-1">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-[#00f3ff] font-bold">&gt;</span>
                <span className="text-[#00ff41]">{personalization.handle}@workstation:~$</span>
                <span className="text-white font-semibold">{item.command}</span>
              </div>
              <div
                className={`pl-4 leading-relaxed ${
                  item.result.type === 'success'
                    ? 'text-[#00ff41]'
                    : item.result.type === 'error'
                    ? 'text-[#ff3344]'
                    : item.result.type === 'warning'
                    ? 'text-[#ffaa00]'
                    : item.result.type === 'cyan'
                    ? 'text-[#00f3ff]'
                    : item.result.type === 'glitch'
                    ? 'text-[#00ff41] font-bold glitch-hover'
                    : 'text-slate-300'
                }`}
              >
                {item.result.output.map((line, lIdx) => (
                  <p key={lIdx} className="whitespace-pre-wrap">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}

          {/* Active Command Input Line */}
          <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 pt-1">
            <span className="text-[#00f3ff] font-bold">&gt;</span>
            <span className="text-[#00ff41] font-mono shrink-0">
              {personalization.handle}@workstation:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Terminal input"
              autoFocus
              className="flex-1 bg-transparent text-white font-mono text-xs sm:text-sm outline-none border-none placeholder-slate-600 focus:ring-0"
              placeholder="type a command (e.g. 'help', 'whoami', 'cat flag.txt')..."
            />
            <button
              type="submit"
              aria-label="Execute command"
              className="text-slate-500 hover:text-[#00ff41] transition-colors"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Terminal Status Footer */}
        <div className="px-4 py-2 bg-[#090e15] border-t border-[#16202c] flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>PORT: 443 // ENCRYPTION: TLS 1.3 // SAFE EXECUTION SANDBOX</span>
          <span className="text-[#00ff41]">ACTIVE SESSION</span>
        </div>
      </div>
    </div>
  );
}
