import { PORTFOLIO_CONFIG, PROJECTS_DATA, SKILLS_DATA } from './portfolio-data';

export interface CommandResult {
  output: string[];
  type?: 'text' | 'success' | 'warning' | 'error' | 'cyan' | 'glitch';
  action?: 'clear' | 'toggle-matrix' | 'toggle-sound' | 'toggle-scanlines' | 'navigate';
  targetUrl?: string;
}

export function executeTerminalCommand(input: string): CommandResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { output: [''] };
  }

  const parts = trimmed.split(/\s+/);
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);

  switch (command) {
    case 'help':
      return {
        output: [
          'AVAILABLE TERMINAL COMMANDS:',
          '  help            - Display this manual',
          '  whoami          - Print current user identity & role',
          '  about           - Display operator profile and philosophy',
          '  projects        - List featured cyber security & engineering projects',
          '  skills          - Inspect top technical capabilities',
          '  status          - Query real-time system and security telemetry',
          '  cat <file>      - Read virtual file (try: cat skills.txt, cat flag.txt)',
          '  ls              - List contents of virtual workspace directory',
          '  matrix          - Toggle Matrix rain background overlay',
          '  sound           - Toggle cyber audio feedback synthesis',
          '  scanlines       - Toggle CRT scanline overlay effect',
          '  contact         - Reveal secure transmission channels',
          '  clear           - Wipe the terminal display buffer',
          '  echo <text>     - Print arguments to terminal stdout',
          '  uname           - Print kernel and architecture version',
          '  date            - Show current workstation timestamp',
          '  sudo            - Execute command with elevated superuser privileges',
        ],
        type: 'text',
      };

    case 'whoami':
      return {
        output: [
          `USER: ${PORTFOLIO_CONFIG.handle} (UID: 1337, GID: 1337)`,
          `NAME: ${PORTFOLIO_CONFIG.name}`,
          `TITLE: ${PORTFOLIO_CONFIG.role}`,
          `LOCATION: ${PORTFOLIO_CONFIG.location}`,
          `STATUS: ${PORTFOLIO_CONFIG.statusBadge}`,
        ],
        type: 'success',
      };

    case 'about':
      return {
        output: [
          `// IDENTITY: ${PORTFOLIO_CONFIG.name} (@${PORTFOLIO_CONFIG.handle})`,
          `// ROLE: ${PORTFOLIO_CONFIG.role}`,
          '',
          PORTFOLIO_CONFIG.shortBio,
          '',
          `Type "cat about.txt" to view the full philosophy dossier.`,
        ],
        type: 'cyan',
      };

    case 'projects':
      return {
        output: [
          'ACTIVE DIRECTORY PROJECTS [TOP PICKS]:',
          ...PROJECTS_DATA.map(
            (p, idx) => `  [0${idx + 1}] ${p.title} (${p.category}) -> ${p.technologies.slice(0, 3).join(', ')}`
          ),
          '',
          'Tip: Visit /projects for full interactive cards and live demos.',
        ],
        type: 'text',
      };

    case 'skills':
      return {
        output: [
          'SECURITY & ENGINEERING ARSENAL:',
          ...SKILLS_DATA.slice(0, 8).map(
            (s) => `  * ${s.name.padEnd(28)} [${s.proficiency}% - ${s.level}]`
          ),
          '',
          'Type "cat skills.txt" for full breakdown or visit /skills.',
        ],
        type: 'text',
      };

    case 'status':
      return {
        output: [
          'SYSTEM TELEMETRY:',
          `  KERNEL STATUS:  ${PORTFOLIO_CONFIG.systemStatus.status}`,
          `  SECURITY LEVEL: ${PORTFOLIO_CONFIG.systemStatus.securityLevel}`,
          `  FIREWALL MESH:  ${PORTFOLIO_CONFIG.systemStatus.firewall}`,
          `  LATENCY:        ${PORTFOLIO_CONFIG.systemStatus.latency}`,
          `  UPTIME:         ${PORTFOLIO_CONFIG.systemStatus.uptime}`,
          `  MODE:           ${PORTFOLIO_CONFIG.systemStatus.mode}`,
        ],
        type: 'cyan',
      };

    case 'ls':
      return {
        output: [
          'drwxr-xr-x  2 root root  4096 Oct 27 22:00 .',
          'drwxr-xr-x 10 root root  4096 Oct 27 22:00 ..',
          '-rw-r--r--  1 root root  1024 Oct 27 22:00 about.txt',
          '-rw-r--r--  1 root root  2048 Oct 27 22:00 skills.txt',
          '-rw-r--r--  1 root root  3072 Oct 27 22:00 projects.json',
          '-r--------  1 root root   128 Oct 27 22:00 flag.txt',
          '-rwxr-xr-x  1 root root   512 Oct 27 22:00 init_portfolio.sh',
        ],
        type: 'text',
      };

    case 'cat':
      if (args.length === 0) {
        return {
          output: ['cat: missing operand. Usage: cat <filename> (e.g. cat flag.txt, cat skills.txt)'],
          type: 'error',
        };
      }
      const filename = args[0].toLowerCase();
      if (filename === 'flag.txt') {
        return {
          output: [
            'CTF{n30_h4ck3r_p0rtf0l10_2026_4cc3ss_gr4nt3d}',
            'Congratulations! You discovered the secret easter egg flag.',
            'Drop this in the contact message box for priority review!',
          ],
          type: 'glitch',
        };
      }
      if (filename === 'skills.txt') {
        return {
          output: [
            '=== CORE SKILLS MANIFEST ===',
            'LANGUAGES: TypeScript, Python, Go, Rust, Bash, C/C++',
            'FRONTEND:  Next.js 15, React 19, Tailwind CSS, Canvas, Motion',
            'SECURITY:  OWASP Top 10, Network Forensics, eBPF, Cryptography, CTF',
            'TOOLS:     Wireshark, Burp Suite, Docker, Linux, Neovim',
          ],
          type: 'success',
        };
      }
      if (filename === 'about.txt') {
        return {
          output: [
            '=== OPERATOR DOSSIER ===',
            PORTFOLIO_CONFIG.fullBio,
            '',
            'PHILOSOPHY: Security by Design, Terminal Speed, Relentless Exploration.',
          ],
          type: 'text',
        };
      }
      if (filename === 'init_portfolio.sh') {
        return {
          output: [
            '#!/usr/bin/env bash',
            'echo "[*] Initializing Neo-Shell Environment..."',
            'echo "[*] Mounting secure encrypted volumes..."',
            'echo "[+] Firewall rules loaded. Port 443 active."',
            'echo "[+] ACCESS GRANTED. Welcome to my portfolio."',
          ],
          type: 'cyan',
        };
      }
      return {
        output: [`cat: ${args[0]}: No such file or permission denied`],
        type: 'error',
      };

    case './init_portfolio.sh':
      return {
        output: [
          '[*] Executing ./init_portfolio.sh...',
          '[*] Verifying integrity of digital workspace... [OK]',
          '[*] Syncing terminal protocols... [OK]',
          '[*] Neon green matrix stream initialized.',
          '[+] ACCESS GRANTED. Ready for operator input.',
        ],
        type: 'success',
      };

    case 'matrix':
      return {
        output: ['Toggling Matrix rain background canvas...'],
        type: 'cyan',
        action: 'toggle-matrix',
      };

    case 'sound':
      return {
        output: ['Toggling cyber audio synthesizer...'],
        type: 'cyan',
        action: 'toggle-sound',
      };

    case 'scanlines':
      return {
        output: ['Toggling CRT scanlines overlay...'],
        type: 'cyan',
        action: 'toggle-scanlines',
      };

    case 'clear':
      return {
        output: [],
        action: 'clear',
      };

    case 'contact':
      return {
        output: [
          `SECURE COMMUNICATION CHANNELS:`,
          `  EMAIL:    ${PORTFOLIO_CONFIG.email}`,
          `  GITHUB:   ${PORTFOLIO_CONFIG.githubUrl}`,
          `  LINKEDIN: ${PORTFOLIO_CONFIG.linkedinUrl}`,
          '',
          `Navigate to /contact for encrypted direct transmission form.`,
        ],
        type: 'success',
      };

    case 'echo':
      return {
        output: [args.join(' ')],
        type: 'text',
      };

    case 'date':
      return {
        output: [new Date().toUTCString()],
        type: 'text',
      };

    case 'uname':
      return {
        output: ['Linux cyber-station 6.12.0-cyber-x86_64 #1 SMP PREEMPT GNU/Linux'],
        type: 'text',
      };

    case 'sudo':
      return {
        output: [
          `[!] NICE TRY: '${PORTFOLIO_CONFIG.handle}' is not in the sudoers file.`,
          'This incident will be reported to Santa Claus and the SOC team. ;)',
        ],
        type: 'warning',
      };

    case 'hack':
    case 'matrix-code':
      return {
        output: [
          'ACCESSING MAINFRAME...',
          'BYPASSING FIREWALL... [BYPASSED]',
          'OVERRIDING MEMORY SEGMENTS... [DONE]',
          'ALL YOUR BASE ARE BELONG TO US.',
          'Easter egg unlocked! Enter "cat flag.txt" to claim your bounty.',
        ],
        type: 'glitch',
      };

    default:
      return {
        output: [
          `bash: command not found: ${command}.`,
          `Type "help" for a list of valid terminal commands.`,
        ],
        type: 'error',
      };
  }
}
