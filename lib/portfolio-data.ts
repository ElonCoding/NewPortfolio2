export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'Web Development' | 'Cybersecurity' | 'Automation' | 'Experiments';
  technologies: string[];
  liveUrl?: string;
  githubUrl: string;
  featured?: boolean;
  terminalCommand: string;
  metrics?: { label: string; value: string }[];
}

export interface Skill {
  name: string;
  category: 'Programming Languages' | 'Frontend' | 'Backend' | 'Tools' | 'Cybersecurity' | 'Other Technologies';
  proficiency: number; // 0 - 100
  level: 'Core' | 'Advanced' | 'Proficient' | 'Familiar';
  description: string;
  command: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  type: 'job' | 'internship' | 'education' | 'milestone';
  description: string[];
  skillsUsed: string[];
  badge?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  status: 'VERIFIED' | 'IN PROGRESS' | 'ACTIVE';
  verificationHash: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: 'Cybersecurity' | 'Web Development' | 'Automation' | 'Experiments' | 'CTF Write-up';
  tags: string[];
  date: string;
  readTime: string;
  author: string;
}

export const PORTFOLIO_CONFIG = {
  name: '[YOUR NAME]',
  handle: 'cyber_explorer',
  role: 'Developer & Cybersecurity Specialist',
  titleSnippet: 'Developer, Cybersecurity Enthusiast, Ethical Hacker, Tech Explorer',
  location: 'San Francisco, CA // Global Remote',
  statusBadge: 'AVAILABLE FOR OPPORTUNITIES',
  avatarUrl: '/images/avatar.jpg',
  shortBio:
    'Security-minded full-stack engineer passionate about offensive & defensive computing, hardened systems, intuitive terminal interfaces, and resilient distributed architectures.',
  fullBio:
    'I operate at the intersection of modern software engineering and security analysis. My mission is building robust, high-performance digital systems that survive adversaries, scale smoothly, and respect user privacy. From low-level vulnerability research to slick reactive interfaces, I enjoy dissecting complex systems down to the bit level.',
  email: 'contact@cyber-portfolio.internal',
  githubUrl: 'https://github.com',
  linkedinUrl: 'https://linkedin.com',
  twitterUrl: 'https://x.com',
  philosophy: [
    {
      title: 'Security by Design',
      text: 'Security is not an afterthought or a final layer of paint. Defenses must be engineered into data models, boundaries, and communication protocols from day zero.',
    },
    {
      title: 'Terminal Speed & Minimalist Craft',
      text: 'Software should feel instant, deliberate, and free of bloat. High-density information design and keyboard-first navigation make power users exponentially faster.',
    },
    {
      title: 'Relentless Exploration',
      text: 'The landscape of computing shifts continuously. Breaking down protocols, reversing binaries, and trying unconventional architectures breeds deep foundational knowledge.',
    },
  ],
  systemStatus: {
    status: 'ONLINE',
    securityLevel: 'MAXIMUM',
    firewall: 'ACTIVE',
    mode: 'CREATIVE',
    latency: '14ms',
    uptime: '99.99%',
  },
};

export const PROJECTS_DATA: Project[] = [
  {
    id: 'sentinx-analyzer',
    title: 'SentinX // Packet Telemetry Engine',
    tagline: 'High-speed packet inspection & anomaly detection dashboard',
    description:
      'A real-time network traffic monitor built with eBPF hooks and WebSockets. Detects protocol anomalies, brute-force patterns, and suspicious outbound tunnels with sub-millisecond alerting.',
    category: 'Cybersecurity',
    technologies: ['TypeScript', 'Rust', 'WebSockets', 'eBPF', 'TailwindCSS'],
    liveUrl: 'https://example.com/demo/sentinx',
    githubUrl: 'https://github.com/example/sentinx',
    featured: true,
    terminalCommand: './sentinx --interface eth0 --detect-anomalies',
    metrics: [
      { label: 'Throughput', value: '10 Gbps' },
      { label: 'Alert Latency', value: '< 2ms' },
    ],
  },
  {
    id: 'cipherguard-vault',
    title: 'CipherGuard // Zero-Knowledge Vault',
    tagline: 'Client-side encrypted secrets and cryptographic identity manager',
    description:
      'End-to-end encrypted secret store utilizing Argon2id key derivation and AES-256-GCM authenticated cipher. Features offline hardware key integration and automated credential rotation.',
    category: 'Cybersecurity',
    technologies: ['TypeScript', 'Web Crypto API', 'React', 'Argon2id', 'Wasm'],
    liveUrl: 'https://example.com/demo/cipherguard',
    githubUrl: 'https://github.com/example/cipherguard',
    featured: true,
    terminalCommand: 'cipherguard unlock --keyfile ~/.vault.key',
    metrics: [
      { label: 'Security', value: 'Zero-Knowledge' },
      { label: 'Key Derivation', value: 'Argon2id' },
    ],
  },
  {
    id: 'ghostscan-recon',
    title: 'GhostScan // Automated Recon Pipeline',
    tagline: 'Concurrent port scanner, DNS enumerator, and attack-surface mapper',
    description:
      'High-concurrency reconnaissance tool that aggregates DNS records, discovers exposed subdomains, and runs synthetic TLS validation checks with detailed reporting output.',
    category: 'Automation',
    technologies: ['Go', 'Docker', 'GraphQL', 'Python', 'Redis'],
    liveUrl: 'https://example.com/demo/ghostscan',
    githubUrl: 'https://github.com/example/ghostscan',
    featured: true,
    terminalCommand: 'ghostscan target.domain.org --all-ports --json',
    metrics: [
      { label: 'Scan Rate', value: '50k pkts/sec' },
      { label: 'Export', value: 'JSON/SARIF' },
    ],
  },
  {
    id: 'termpulse-cli',
    title: 'TermPulse // Interactive System HUD',
    tagline: 'Blazing fast terminal system monitor and process profiler',
    description:
      'TUI dashboard monitoring CPU thread affinity, memory consumption, disk I/O, and socket connections with retro vector graphs and real-time process intervention commands.',
    category: 'Experiments',
    technologies: ['Rust', 'Ratatui', 'Crossbeam', 'Linux /proc'],
    liveUrl: 'https://example.com/demo/termpulse',
    githubUrl: 'https://github.com/example/termpulse',
    featured: false,
    terminalCommand: 'cargo run --release -- --refresh-rate 100ms',
    metrics: [
      { label: 'Memory Footprint', value: '4.2 MB' },
      { label: 'Framerate', value: '60 FPS' },
    ],
  },
  {
    id: 'neuromesh-iot',
    title: 'NeuroMesh // P2P Secure Node Network',
    tagline: 'Zero-trust peer-to-peer overlay network with Noise protocol encryption',
    description:
      'Overlay network protocol ensuring resilient communication between distributed edge nodes. Protects telemetry streams against man-in-the-middle tampering and network splits.',
    category: 'Web Development',
    technologies: ['Next.js', 'WebRTC', 'TypeScript', 'Noise Protocol', 'TailwindCSS'],
    liveUrl: 'https://example.com/demo/neuromesh',
    githubUrl: 'https://github.com/example/neuromesh',
    featured: true,
    terminalCommand: 'neuromesh join --peer 192.168.1.100:8000',
    metrics: [
      { label: 'Peer Mesh', value: 'Decentralized' },
      { label: 'Cipher', value: 'ChaCha20' },
    ],
  },
  {
    id: 'shadowproxy-wrapper',
    title: 'ShadowProxy // Dynamic Traffic Cloak',
    tagline: 'Multi-hop traffic routing daemon with automated egress rotation',
    description:
      'Lightweight local proxy daemon that coordinates dynamic egress nodes, obfuscates protocol signatures, and verifies connection integrity against censorship firewalls.',
    category: 'Automation',
    technologies: ['Python', 'asyncio', 'WireGuard', 'SQLite'],
    liveUrl: 'https://example.com/demo/shadowproxy',
    githubUrl: 'https://github.com/example/shadowproxy',
    featured: false,
    terminalCommand: 'python shadowproxy.py --rotate-interval 300s',
    metrics: [
      { label: 'Egress Pool', value: '18 Nodes' },
      { label: 'Protocol', value: 'WireGuard' },
    ],
  },
];

export const SKILLS_DATA: Skill[] = [
  // Programming Languages
  { name: 'TypeScript / JavaScript', category: 'Programming Languages', proficiency: 95, level: 'Core', description: 'Modern ESNext, strong type safety, async concurrency, AST manipulation', command: 'node --eval "console.log(typeof TypeScript)"' },
  { name: 'Python', category: 'Programming Languages', proficiency: 90, level: 'Core', description: 'Scripting, packet crafting with Scapy, automation, exploits, data parsing', command: 'python3 -c "import socket, ssl; print(\'Ready\')"' },
  { name: 'Go (Golang)', category: 'Programming Languages', proficiency: 82, level: 'Advanced', description: 'High-throughput microservices, concurrent workers, network proxies', command: 'go run main.go' },
  { name: 'Rust', category: 'Programming Languages', proficiency: 75, level: 'Proficient', description: 'Memory safety, systems programming, eBPF filters, performance kernels', command: 'cargo test --release' },
  { name: 'Bash / POSIX Shell', category: 'Programming Languages', proficiency: 92, level: 'Core', description: 'Linux system orchestration, cron pipelines, automation scripts', command: 'chmod +x exploit.sh && ./exploit.sh' },
  { name: 'C / C++', category: 'Programming Languages', proficiency: 70, level: 'Proficient', description: 'Pointer arithmetic, buffer analysis, reverse engineering basics', command: 'gcc -Wall -O2 payload.c -o payload' },

  // Frontend
  { name: 'Next.js & React 19', category: 'Frontend', proficiency: 94, level: 'Core', description: 'App Router, Server Actions, suspense boundaries, streaming SSR', command: 'npx create-next-app@latest' },
  { name: 'Tailwind CSS', category: 'Frontend', proficiency: 96, level: 'Core', description: 'Utility-first UI design, custom design tokens, responsive breakpoints', command: 'npx tailwindcss -o style.css' },
  { name: 'HTML5 Canvas & WebGL', category: 'Frontend', proficiency: 85, level: 'Advanced', description: 'Matrix rain generators, interactive particle fields, retro shaders', command: 'ctx.fillRect(0, 0, width, height)' },
  { name: 'State Management & Motion', category: 'Frontend', proficiency: 88, level: 'Advanced', description: 'Framer Motion springs, micro-interactions, responsive states', command: 'motion.div initial={{ opacity: 0 }}' },

  // Backend
  { name: 'Node.js & Runtime APIs', category: 'Backend', proficiency: 92, level: 'Core', description: 'REST & WebSocket gateways, streams, clustering, cryptographic APIs', command: 'node server.js' },
  { name: 'PostgreSQL & SQL', category: 'Backend', proficiency: 85, level: 'Advanced', description: 'Relational schemas, indexing strategies, audit logging, transactions', command: 'psql -U admin -d secure_db' },
  { name: 'Redis Cache & Pub/Sub', category: 'Backend', proficiency: 84, level: 'Advanced', description: 'Rate limiting, token buckets, session management, event distribution', command: 'redis-cli ping' },
  { name: 'Docker & Containerization', category: 'Backend', proficiency: 88, level: 'Advanced', description: 'Hardened Alpine containers, non-root users, multistage builds', command: 'docker run -d --read-only secure-app' },

  // Cybersecurity
  { name: 'Network Protocol Analysis', category: 'Cybersecurity', proficiency: 90, level: 'Core', description: 'Wireshark, tcpdump, PCAP deep packet parsing, TLS inspection', command: 'tcpdump -i any -nn -s0 -v' },
  { name: 'Vulnerability Assessment & OWASP', category: 'Cybersecurity', proficiency: 88, level: 'Advanced', description: 'OWASP Top 10, XSS, CSRF, SSRF, IDOR, SQLi mitigation and audit', command: 'nmap -sV -sC -T4 10.10.10.1' },
  { name: 'Penetration Testing & CTF', category: 'Cybersecurity', proficiency: 84, level: 'Advanced', description: 'Web application exploitation, privilege escalation, CTF problem solving', command: 'gobuster dir -u http://target.local -w /wordlists/common.txt' },
  { name: 'Cryptography & PKI', category: 'Cybersecurity', proficiency: 86, level: 'Advanced', description: 'Asymmetric encryption, zero-knowledge proofs, certificates, HMAC', command: 'openssl req -x509 -newkey rsa:4096' },
  { name: 'Linux Hardening & SELinux', category: 'Cybersecurity', proficiency: 85, level: 'Advanced', description: 'IPTables, UFW, PAM rules, SSH keys, least-privilege policies', command: 'sudo ufw status verbose' },

  // Tools
  { name: 'Git & Version Control', category: 'Tools', proficiency: 94, level: 'Core', description: 'Branching strategies, cryptographic commit signing, rebasing', command: 'git log --graph --oneline --decorate' },
  { name: 'Linux / Debian & Arch', category: 'Tools', proficiency: 92, level: 'Core', description: 'System administration, daemon management, systemd, kernel parameters', command: 'uname -a && uptime' },
  { name: 'Burp Suite & ZAP', category: 'Tools', proficiency: 82, level: 'Advanced', description: 'HTTP traffic intercept, repeater, intruder fuzzing, token decoding', command: 'burpsuite &' },
  { name: 'VS Code & Neovim', category: 'Tools', proficiency: 90, level: 'Core', description: 'Keyboard-centric editor workflow, LSP configuration, debugging', command: 'nvim /etc/hosts' },

  // Other Technologies
  { name: 'WebSockets & Realtime', category: 'Other Technologies', proficiency: 90, level: 'Advanced', description: 'Bi-directional telemetry, heartbeat pings, reconnect fallbacks', command: 'wscat -c wss://stream.server' },
  { name: 'GraphQL & REST', category: 'Other Technologies', proficiency: 88, level: 'Advanced', description: 'Schema design, input validation, defensive query depth limiting', command: 'curl -X POST /api/graphql' },
  { name: 'CI/CD & GitHub Actions', category: 'Other Technologies', proficiency: 86, level: 'Advanced', description: 'Security linting, secret scanning, automated release pipelines', command: 'gh workflow run security-audit.yml' },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Security Engineer / Senior Developer',
    organization: 'Cyber Defense Lab & Tech Corp',
    location: 'San Francisco, CA',
    period: '2024 — Present',
    type: 'job',
    description: [
      'Architected end-to-end encrypted microservice communication pipelines reducing attack vectors by 65%.',
      'Developed automated vulnerability scanning harnesses integrated directly into staging CI/CD builds.',
      'Mentored engineering teams on secure coding principles and threat-modeling methodologies.',
    ],
    skillsUsed: ['TypeScript', 'Go', 'Docker', 'OWASP', 'PostgreSQL', 'Linux Hardening'],
    badge: 'ACTIVE ROLE',
  },
  {
    id: 'exp-2',
    role: 'Full-Stack Developer & Security Analyst',
    organization: 'Distributed Systems & Network Inc',
    location: 'Remote',
    period: '2022 — 2024',
    type: 'job',
    description: [
      'Built reactive frontend dashboards and terminal-style telemetry displays for cloud infrastructure.',
      'Audited external-facing REST and WebSocket APIs, identifying and patching 12 high-severity vulnerabilities.',
      'Implemented rate-limiting and zero-trust authentication layers for over 500,000 active sessions.',
    ],
    skillsUsed: ['React', 'Next.js', 'Python', 'Redis', 'WebSockets', 'Cryptography'],
  },
  {
    id: 'exp-3',
    role: 'Cybersecurity Research Intern',
    organization: 'Institute for Information Security',
    location: 'Boston, MA',
    period: '2021 — 2022',
    type: 'internship',
    description: [
      'Researched novel side-channel attacks on modern browser JavaScript engines.',
      'Authored open-source packet inspection utilities and contributed to CTF security challenges.',
      'Conducted fuzzing tests across IoT firmware protocols to map buffer vulnerability thresholds.',
    ],
    skillsUsed: ['Python', 'C', 'Wireshark', 'Burp Suite', 'Bash'],
  },
  {
    id: 'exp-4',
    role: 'B.S. in Computer Science (Cybersecurity Specialization)',
    organization: 'School of Computing & Engineering',
    location: 'Academic Campus',
    period: '2018 — 2022',
    type: 'education',
    description: [
      'Graduated with Honors. Focused on Operating Systems, Cryptography, and Distributed Systems.',
      'Led the collegiate Cyber Defense and Ethical Hacking team in intercollegiate competitions.',
      'Capstone Project: Zero-knowledge decentralized authentication with token rotation.',
    ],
    skillsUsed: ['Computer Science', 'Algorithms', 'Computer Networks', 'Cryptographic Proofs'],
    badge: 'HONORS GRADUATE',
  },
];

export const CERTIFICATIONS_DATA: Certification[] = [
  {
    id: 'cert-1',
    title: 'CompTIA Security+ (SY0-701)',
    issuer: 'CompTIA',
    date: '2023',
    credentialId: 'COMP-SEC-998471',
    status: 'ACTIVE',
    verificationHash: 'SHA256: 7f8a91b2c3d4e5f60718293a4b5c6d7e8f901234',
  },
  {
    id: 'cert-2',
    title: 'Offensive Security Certified Professional (OSCP)',
    issuer: 'OffSec',
    date: '2024',
    credentialId: 'OS-102948-CP',
    status: 'VERIFIED',
    verificationHash: 'SHA256: 3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f901a2b3c',
  },
  {
    id: 'cert-3',
    title: 'AWS Certified Security — Specialty',
    issuer: 'Amazon Web Services',
    date: '2024',
    credentialId: 'AWS-SEC-SPEC-4819',
    status: 'ACTIVE',
    verificationHash: 'SHA256: 9b8a7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b',
  },
  {
    id: 'cert-4',
    title: 'Certified Information Systems Security Professional (Associate)',
    issuer: '(ISC)²',
    date: '2025',
    credentialId: 'ISC2-ASSOC-71629',
    status: 'VERIFIED',
    verificationHash: 'SHA256: 5e6f7a8b9c0d1e2f3a4b5c6d7e8f901a2b3c4d5e',
  },
];

export const BLOG_POSTS_DATA: BlogPost[] = [
  {
    slug: 'demystifying-memory-corruption',
    title: 'Demystifying Memory Corruption: Stack Overflows & Modern Mitigations',
    summary:
      'A deep dive into stack frames, return address overwrites, and how ASLR, DEP/NX, and stack canaries work under the hood in modern x86_64 architectures.',
    category: 'Cybersecurity',
    tags: ['C', 'Assembly', 'Exploitation', 'Security'],
    date: '2026-03-15',
    readTime: '8 min read',
    author: '[YOUR NAME]',
    content: `
## Introduction

Understanding how memory corruption works is the cornerstone of systems security. Despite decades of compilers warning us about dangerous functions like \`strcpy\` and \`gets\`, stack-based buffer overflows continue to emerge in legacy firmware, network daemons, and IoT embedded controllers.

In this write-up, we walk through the exact architecture of a stack frame on x86_64, observe an overwrite in real time, and inspect how modern compiler mitigations protect execution flow.

\`\`\`c
#include <stdio.h>
#include <string.h>

void vulnerable_function(char *str) {
    char buffer[64];
    // Dangerous: bounds are not checked!
    strcpy(buffer, str);
}

int main(int argc, char **argv) {
    if (argc > 1) {
        vulnerable_function(argv[1]);
    }
    return 0;
}
\`\`\`

## The Anatomy of the Stack Frame

When a function call is executed:
1. Arguments are placed in registers (\`rdi\`, \`rsi\`, \`rdx\`, \`rcx\`, \`r8\`, \`r9\`).
2. The \`call\` instruction pushes the return address onto the stack.
3. The function prologue executes:
   \`push rbp\`
   \`mov rbp, rsp\`
4. Stack pointer is decremented to reserve space for local variables.

If the input string exceeds 64 bytes, it spills past the allocated buffer, into the saved frame pointer (\`rbp\`), and directly into the return address.

## Modern Defense Mechanisms

Today, operating systems and compilers make raw exploitation significantly harder:

* **Stack Canaries (\`-fstack-protector-all\`)**: A randomized sentinel value placed between local variables and the saved return pointer. Before returning, the function compares the value against the master canary in the thread local storage (\`fs:0x28\`). If mismatched, execution halts immediately with \`__stack_chk_fail()\`.
* **NX / DEP (No-Execute)**: Marks stack pages as non-executable. Injected shellcode cannot be jumped to directly, necessitating Return-Oriented Programming (ROP) chains.
* **ASLR (Address Space Layout Randomization)**: Randomizes the base addresses of the stack, heap, and libraries on every execution.

## Conclusion & Defensive Takeaways

Memory safety is fundamentally an architectural choice. While defensive mitigations create friction for attackers, rewriting mission-critical parsing boundaries in memory-safe languages like Rust or Go remains the most definitive long-term solution.
    `,
  },
  {
    slug: 'zero-trust-web-architectures',
    title: 'Zero-Trust Architecture: Practical Enforcement in Distributed Web Services',
    summary:
      'Moving beyond perimeter security: mutual TLS, ephemeral JWT identities, token rotation, and least-privilege service-to-service contracts.',
    category: 'Web Development',
    tags: ['Architecture', 'Zero-Trust', 'Microservices', 'mTLS'],
    date: '2026-02-28',
    readTime: '6 min read',
    author: '[YOUR NAME]',
    content: `
## The Death of the Trusted Perimeter

Traditional enterprise networks operated like medieval castles: tough exterior walls (firewalls, VPNs) and absolute trust once you entered inside. If an attacker breached a single workstation or vulnerable ingress gateway, they could traverse laterally without hindrance.

Zero Trust replaces this model with a simple maxim: **Never Trust, Always Verify**.

## The Four Pillars of Zero Trust in Web Apps

1. **Explicit Identity Verification**: Every request—whether originating from an end-user or an internal background service—must carry signed, cryptographically verifiable claims.
2. **Mutual TLS (mTLS)**: Both the client and server validate each other's certificates. Man-in-the-middle attacks on the internal network are neutralized.
3. **Ephemeral Credentials & Automated Rotation**: Long-lived API keys are an immense liability. We utilize short-lived JWTs (5-15 minute lifespan) combined with rotating refresh tokens backed by Redis blocklists.
4. **Least-Privilege Authorization Boundaries**: Fine-grained access control (RBAC + ABAC) verified at every boundary.

\`\`\`typescript
// Verify JWT with algorithm pinning and expiration check
import { jwtVerify } from 'jose';

export async function verifyServiceToken(token: string, secretKey: Uint8Array) {
  try {
    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: ['HS256'],
      issuer: 'auth.mesh.internal',
      audience: 'api.mesh.internal',
    });
    return { valid: true, payload };
  } catch (err) {
    return { valid: false, error: 'Token invalid or expired' };
  }
}
\`\`\`

## Micro-Segmentation in Practice

By isolating sensitive datastores behind strict gateway proxies and enforcing cryptographic mutual authentication, a compromised node cannot pivot to adjacent databases or administrative consoles.
    `,
  },
  {
    slug: 'automating-threat-intelligence',
    title: 'Building an Automated Threat Intelligence & IP Reputation Pipeline',
    summary:
      'How to aggregate, normalize, and score malicious IP indicators from public feeds and honeypots using asynchronous Python and Redis.',
    category: 'Automation',
    tags: ['Python', 'ThreatIntel', 'Automation', 'Redis'],
    date: '2026-01-20',
    readTime: '7 min read',
    author: '[YOUR NAME]',
    content: `
## Why Threat Intelligence Feeds Get Noisy

Threat intelligence feeds are everywhere, but consuming raw CSVs and RSS dumps results in massive false-positive rates and alert fatigue. An effective threat pipeline must ingest multiple disparate sources, deduplicate entities, assign confidence scores, and push actionable blocklists to edge proxies.

## The Architecture

Our automated pipeline runs in three discrete stages:
* **Ingestion Layer**: Pulls IP reputation feeds from AbuseIPDB, AlienVault OTX, and honeypot sensor endpoints via \`aiohttp\`.
* **Normalization & Scoring Engine**: Evaluates subnet density, recency, and report frequency to calculate an aggregate risk coefficient from 0 to 100.
* **Distribution Gateway**: Automatically generates CIDR blocklists and pushes IP sets directly to Linux \`ipset\` or cloud firewall ACLs.

\`\`\`python
import asyncio
import aiohttp

async def fetch_feed(session, url):
    async with session.get(url, timeout=10) as response:
        if response.status == 200:
            return await response.text()
        return ""

async def aggregate_threats():
    sources = [
        "https://reputation.internal/feed-a",
        "https://reputation.internal/feed-b",
    ]
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_feed(session, url) for url in sources]
        results = await asyncio.gather(*tasks)
        print(f"Processed {len(results)} threat streams concurrently.")
\`\`\`

## Real-World Impact

By filtering out stale indicators older than 72 hours, we cut firewall rule sizes by 80% while retaining 99.4% precision against active botnet scanners.
    `,
  },
  {
    slug: 'ctf-writeup-crypto-oracle',
    title: 'CTF Write-up: Padding Oracle Attacks on CBC Mode',
    summary:
      'Step-by-step walkthrough of decrypting ciphertext byte-by-byte without the private key by exploiting server error response discrepancies in PKCS#7 padding.',
    category: 'CTF Write-up',
    tags: ['Cryptography', 'CTF', 'Python', 'Exploit'],
    date: '2025-12-10',
    readTime: '9 min read',
    author: '[YOUR NAME]',
    content: `
## Challenge Overview

During an international CTF competition, the "Cryptic Citadel" web challenge presented an authentication token encrypted with AES-128 in CBC mode. When tampering with the ciphertext, the server returned distinct responses:
* \`200 OK\`: Valid authentication
* \`500 Internal Error (Invalid Padding)\`: PKCS#7 padding validation failed
* \`403 Forbidden\`: Valid padding, but signature/payload mismatch

This discrepancy formed an ideal **Padding Oracle**.

## The Mechanics of CBC Decryption

In Cipher Block Chaining (CBC) mode:
$$P_i = D_K(C_i) \oplus C_{i-1}$$

The plaintext of block $i$ is calculated by decrypting ciphertext block $C_i$ with the key, then XORing the result with the previous ciphertext block $C_{i-1}$ (or the IV for the first block).

Because we control $C_{i-1}$, we can manipulate individual bytes. When the server tells us whether the resulting plaintext has valid PKCS#7 padding (e.g. \`0x01\`), we can mathematically solve for the intermediate state byte:
$$\\text{Intermediate} = C'_{i-1} \\oplus 0x01$$
$$P_i = \\text{Intermediate} \\oplus C_{i-1}$$

## The Automated Solver Script

With a multithreaded Python script sending forged $C_{i-1}$ blocks, we recovered the 16-byte flag in under 3 minutes with an average of 128 requests per byte.

## Mitigation

Always use authenticated encryption schemes like **AES-GCM** or **ChaCha20-Poly1305**, which verify ciphertext authenticity prior to decryption!
    `,
  },
];
