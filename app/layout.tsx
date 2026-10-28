import type { Metadata } from 'next';
import './globals.css';
import CyberShell from '@/components/cyber-shell';

export const metadata: Metadata = {
  title: 'NEO-SHELL // Futuristic Cyber Portfolio & Terminal Console',
  description:
    'Futuristic hacker-themed personal portfolio website, terminal console, and cybersecurity developer showcase.',
  openGraph: {
    title: 'NEO-SHELL // Futuristic Cyber Portfolio',
    description:
      'Futuristic hacker-themed personal portfolio website, terminal console, and cybersecurity developer showcase.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEO-SHELL // Futuristic Cyber Portfolio',
    description:
      'Futuristic hacker-themed personal portfolio website, terminal console, and cybersecurity developer showcase.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className="bg-[#050505] text-[#e6edf3] antialiased">
        <CyberShell>{children}</CyberShell>
      </body>
    </html>
  );
}
