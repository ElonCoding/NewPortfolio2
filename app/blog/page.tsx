'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Terminal,
  Search,
  Calendar,
  Clock,
  ArrowRight,
  Tag,
  FileCode,
} from 'lucide-react';
import { useCyber } from '@/components/cyber-context';
import { BLOG_POSTS_DATA, BlogPost } from '@/lib/portfolio-data';
import { filterBlogPosts } from '@/lib/portfolio-utils';

export default function BlogListPage() {
  const { playSound } = useCyber();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);

  const categories = [
    'All',
    'Cybersecurity',
    'Web Development',
    'Automation',
    'CTF Write-up',
  ];

  const allTags = Array.from(
    new Set(BLOG_POSTS_DATA.flatMap((post) => post.tags))
  );

  const filteredPosts = filterBlogPosts(
    BLOG_POSTS_DATA,
    selectedCategory,
    searchQuery,
    selectedTag
  );

  return (
    <div className="space-y-12 py-8 px-4 sm:px-6 max-w-7xl mx-auto font-mono">
      {/* 1. Header */}
      <div className="space-y-2 border-b border-[#16202c] pb-6">
        <div className="flex items-center gap-2 text-xs text-[#00f3ff] uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5 text-[#00ff41]" />
          <span>DISPATCHES & WRITE-UPS // DIRECTORY: /BLOG</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          TECHNICAL RESEARCH & <span className="text-[#00ff41]">CTF WRITE-UPS</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
          Deep-dives into binary exploitation, vulnerability teardowns, zero-trust network designs, and automated threat-hunting pipelines.
        </p>
      </div>

      {/* 2. Filter Bar & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0a0e14] p-4 border border-[#16202c] rounded-lg">
        {/* Categories */}
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

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search write-ups, tags, ctf..."
            aria-label="Search blog posts"
            className="w-full pl-9 pr-3 py-1.5 bg-[#05070a] border border-[#1b2838] focus:border-[#00ff41] rounded text-xs text-white placeholder-slate-500 outline-none"
          />
        </div>
      </div>

      {/* Tag selector filter strip */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-500 text-[11px] uppercase flex items-center gap-1">
          <Tag className="w-3 h-3 text-[#00f3ff]" /> Filter Tag:
        </span>
        {allTags.map((tag) => {
          const isSelected = selectedTag === tag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => {
                setSelectedTag(isSelected ? undefined : tag);
                playSound('click');
              }}
              className={`px-2.5 py-0.5 rounded text-[11px] border transition-colors cursor-pointer ${
                isSelected
                  ? 'bg-[#00f3ff]/20 text-[#00f3ff] border-[#00f3ff]'
                  : 'bg-[#0d141e] text-slate-400 border-[#1b2838] hover:text-white'
              }`}
            >
              #{tag}
            </button>
          );
        })}
        {selectedTag && (
          <button
            type="button"
            onClick={() => setSelectedTag(undefined)}
            className="text-[11px] text-[#ff3344] hover:underline cursor-pointer"
          >
            Clear tag
          </button>
        )}
      </div>

      {/* 3. Articles List */}
      {filteredPosts.length === 0 ? (
        <div className="p-12 text-center bg-[#070b10] border border-[#16202c] rounded-lg space-y-3">
          <BookOpen className="w-8 h-8 text-slate-600 mx-auto" />
          <div className="text-sm text-slate-400 font-semibold">
            No technical write-ups matched your active search filters.
          </div>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
              setSelectedTag(undefined);
            }}
            className="px-3 py-1.5 bg-[#0d141e] hover:bg-[#15202e] text-[#00ff41] border border-[#1b2838] rounded text-xs cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="p-6 bg-[#080c12] border border-[#16202c] hover:border-[#00ff41] rounded-lg space-y-4 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,65,0.15)] group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#141c26] pb-3 text-xs text-slate-500">
                <div className="flex items-center gap-3">
                  <span className="text-[#00f3ff] font-bold uppercase">{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Calendar className="w-3 h-3 text-[#00ff41]" />
                    <span>{post.date}</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{post.readTime}</span>
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-500">
                  FILE: {post.slug}.md
                </span>
              </div>

              <div className="space-y-2">
                <Link
                  href={`/blog/${post.slug}`}
                  onClick={() => playSound('click')}
                  className="block text-lg sm:text-xl font-bold text-white group-hover:text-[#00ff41] transition-colors"
                >
                  {post.title}
                </Link>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {post.summary}
                </p>
              </div>

              {/* Tags & Read Article link */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#141c26]">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-[10px] bg-[#0d141e] text-slate-400 rounded border border-[#1b2838]"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  onClick={() => playSound('click')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00ff41] hover:underline self-start sm:self-auto cursor-pointer"
                >
                  <span>READ DISPATCH &gt;&gt;</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
