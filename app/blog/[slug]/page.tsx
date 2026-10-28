'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Copy,
  Check,
  Tag,
  Terminal,
  Shield,
  FileCode,
} from 'lucide-react';
import { useCyber } from '@/components/cyber-context';
import { BLOG_POSTS_DATA } from '@/lib/portfolio-data';

export default function BlogPostDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { playSound, personalization } = useCyber();
  const [copiedLink, setCopiedLink] = useState(false);

  const post = BLOG_POSTS_DATA.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      playSound('beep');
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="space-y-10 py-8 px-4 sm:px-6 max-w-4xl mx-auto font-mono">
      {/* Top Navigation */}
      <div className="flex items-center justify-between border-b border-[#16202c] pb-4">
        <Link
          href="/blog"
          onClick={() => playSound('click')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-[#00ff41] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>&lt; RETURN TO /BLOG INDEX</span>
        </Link>

        <button
          type="button"
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0d141e] hover:bg-[#15202e] border border-[#1b2838] hover:border-[#00ff41] text-xs text-slate-300 rounded transition-colors cursor-pointer"
        >
          {copiedLink ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#00ff41]" />
              <span className="text-[#00ff41]">Link Copied</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Link</span>
            </>
          )}
        </button>
      </div>

      {/* Article Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-2 text-xs text-[#00f3ff] uppercase font-bold">
          <Terminal className="w-3.5 h-3.5 text-[#00ff41]" />
          <span>CATEGORY: {post.category}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-t border-[#16202c]">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#00ff41]" />
            <span className="text-slate-300">{personalization.name}</span>
          </div>
          <span aria-hidden="true">·</span>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>{post.date}</span>
          </div>
          <span aria-hidden="true">·</span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[11px] bg-[#0d141e] text-[#00f3ff] rounded border border-[#1b2838]"
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      {/* Article Abstract Banner */}
      <div className="p-4 bg-[#0a0e14] border-l-4 border-[#00ff41] rounded-r text-xs sm:text-sm text-slate-300 leading-relaxed">
        <span className="text-[#00ff41] font-bold block mb-1">
          // EXECUTIVE SUMMARY:
        </span>
        {post.summary}
      </div>

      {/* Article Main Body (Formatted Markdown/Prose with Cyber Code Panels) */}
      <article className="prose prose-invert max-w-none text-slate-300 text-xs sm:text-sm leading-relaxed space-y-6">
        {post.content.split('\n\n').map((block, idx) => {
          const trimmed = block.trim();
          if (!trimmed) return null;

          if (trimmed.startsWith('## ')) {
            return (
              <h2
                key={idx}
                className="text-lg sm:text-xl font-bold text-white pt-4 pb-1 border-b border-[#16202c] text-[#00ff41] flex items-center gap-2"
              >
                <span>&gt;</span>
                <span>{trimmed.replace('## ', '')}</span>
              </h2>
            );
          }

          if (trimmed.startsWith('```')) {
            const lines = trimmed.split('\n');
            const lang = lines[0].replace('```', '') || 'code';
            const codeBody = lines.slice(1, -1).join('\n');

            return (
              <div
                key={idx}
                className="my-4 rounded-lg bg-[#05070a] border border-[#1b2838] overflow-hidden"
              >
                <div className="px-4 py-2 bg-[#0c121a] border-b border-[#1b2838] flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-3.5 h-3.5 text-[#00f3ff]" />
                    <span className="font-mono uppercase text-[11px] text-[#00f3ff]">{lang}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(codeBody);
                      playSound('click');
                    }}
                    className="text-[10px] text-slate-400 hover:text-[#00ff41] flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" /> Copy Snippet
                  </button>
                </div>
                <pre className="p-4 overflow-x-auto text-xs text-slate-200 font-mono leading-relaxed bg-[#05070a]">
                  <code>{codeBody}</code>
                </pre>
              </div>
            );
          }

          if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
            const listItems = trimmed.split('\n').filter((l) => l.trim().length > 0);
            return (
              <ul key={idx} className="space-y-2 list-none pl-2">
                {listItems.map((item, lIdx) => (
                  <li key={lIdx} className="flex items-start gap-2">
                    <span className="text-[#00ff41] font-bold">&gt;</span>
                    <span>{item.replace(/^[\*\-]\s+/, '')}</span>
                  </li>
                ))}
              </ul>
            );
          }

          return (
            <p key={idx} className="leading-relaxed">
              {trimmed}
            </p>
          );
        })}
      </article>

      {/* Article Footer & Return Link */}
      <div className="pt-8 border-t border-[#16202c] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/blog"
          onClick={() => playSound('click')}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#00ff41] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO ALL WRITE-UPS</span>
        </Link>

        <Link
          href="/contact"
          onClick={() => playSound('click')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#00ff41] text-black font-bold rounded text-xs hover:bg-[#00cc33] transition-colors"
        >
          DISCUSS THIS RESEARCH
        </Link>
      </div>
    </div>
  );
}
