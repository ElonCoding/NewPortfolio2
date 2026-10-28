'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  Send,
  Terminal,
  Shield,
  Copy,
  Check,
  Github,
  Linkedin,
  Twitter,
  AlertCircle,
  CheckCircle2,
  Lock,
  ExternalLink,
} from 'lucide-react';
import { useCyber } from '@/components/cyber-context';
import { validateContactForm, ContactFormInput } from '@/lib/validators';

export default function ContactPage() {
  const { personalization, playSound } = useCyber();

  const [form, setForm] = useState<ContactFormInput>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormInput, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [connectionStage, setConnectionStage] = useState<string | null>(null);
  const [responsePayload, setResponsePayload] = useState<{
    success: boolean;
    simulated?: boolean;
    transmissionId?: string;
    message?: string;
    mailtoUrl?: string;
  } | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalization.email);
    setCopiedEmail(true);
    playSound('beep');
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setResponsePayload(null);

    const validation = validateContactForm(form);
    if (!validation.isValid) {
      setErrors(validation.errors);
      playSound('glitch');
      return;
    }

    setSubmitting(true);
    playSound('click');

    // Simulated connection progression stages
    setConnectionStage('> Establishing secure connection on port 443...');
    await new Promise((r) => setTimeout(r, 400));
    setConnectionStage('> Handshaking TLS 1.3 session with operator node...');
    await new Promise((r) => setTimeout(r, 400));
    setConnectionStage('> Encrypting payload with 4096-bit public key...');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setSubmitting(false);
      setConnectionStage(null);

      if (res.ok && data.success) {
        setResponsePayload(data);
        playSound('access');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setErrors(data.details || { message: data.error || 'Transmission refused.' });
        playSound('glitch');
      }
    } catch {
      setSubmitting(false);
      setConnectionStage(null);
      setErrors({ message: 'Network link failure: Unable to reach dispatch gateway.' });
      playSound('glitch');
    }
  };

  return (
    <div className="space-y-12 py-8 px-4 sm:px-6 max-w-7xl mx-auto font-mono">
      {/* 1. Header */}
      <div className="space-y-2 border-b border-[#16202c] pb-6">
        <div className="flex items-center gap-2 text-xs text-[#00f3ff] uppercase tracking-wider">
          <Mail className="w-3.5 h-3.5 text-[#00ff41]" />
          <span>TRANSMISSION GATEWAY // DIRECTORY: /CONTACT</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          SECURE UPLINK // <span className="text-[#00ff41]">INITIATE DISPATCH</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
          Transmit encrypted inquiries, project proposals, security vulnerability reports, or contract invitations directly to my workstation inbox.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: Terminal Contact Form */}
        <div className="lg:col-span-7 bg-[#070b10] border border-[#00ff41]/40 rounded-lg overflow-hidden shadow-[0_0_25px_rgba(0,255,65,0.15)]">
          {/* Form Header */}
          <div className="px-4 py-3 bg-[#0d141e] border-b border-[#1b2838] flex items-center justify-between text-xs select-none">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
              <span className="text-slate-300 font-bold ml-1">
                dispatch_daemon.sh — port:443
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-[#00ff41]">
              <Lock className="w-3 h-3" />
              <span>AES-256 ENCRYPTED</span>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Live Progress Stage Feedback */}
            {connectionStage && (
              <div className="p-3 bg-[#00ff41]/10 border border-[#00ff41]/40 rounded text-xs text-[#00ff41] animate-pulse">
                {connectionStage}
              </div>
            )}

            {/* Submission Result / Transparent Status */}
            {responsePayload && (
              <div className="p-4 bg-[#0a1610] border border-[#00ff41] rounded space-y-3">
                <div className="flex items-center gap-2 text-[#00ff41] font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-[#00ff41]" />
                  <span>TRANSMISSION REGISTERED [{responsePayload.transmissionId}]</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {responsePayload.message}
                </p>
                {responsePayload.mailtoUrl && (
                  <div className="pt-2 border-t border-[#142e1f] flex flex-wrap gap-2 items-center">
                    <a
                      href={responsePayload.mailtoUrl}
                      className="px-3 py-1.5 bg-[#00ff41] text-black font-bold rounded text-xs hover:bg-[#00cc33] transition-colors inline-flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Open Mail Client Direct Uplink</span>
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="space-y-1">
                <label className="block text-xs text-slate-300">
                  <span className="text-[#00ff41]">&gt;</span> OPERATOR_NAME / SENDER HANDLE:
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Elena Rostova / Security Lead"
                  className={`w-full px-3 py-2 bg-[#05070a] border rounded text-xs text-white placeholder-slate-600 outline-none transition-colors ${
                    errors.name ? 'border-[#ff3344]' : 'border-[#1b2838] focus:border-[#00ff41]'
                  }`}
                />
                {errors.name && (
                  <div className="text-[11px] text-[#ff3344] flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.name}</span>
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="block text-xs text-slate-300">
                  <span className="text-[#00ff41]">&gt;</span> RETURN_FREQUENCY / EMAIL:
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="e.g. operator@domain.com"
                  className={`w-full px-3 py-2 bg-[#05070a] border rounded text-xs text-white placeholder-slate-600 outline-none transition-colors ${
                    errors.email ? 'border-[#ff3344]' : 'border-[#1b2838] focus:border-[#00ff41]'
                  }`}
                />
                {errors.email && (
                  <div className="text-[11px] text-[#ff3344] flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              {/* Subject */}
              <div className="space-y-1">
                <label className="block text-xs text-slate-300">
                  <span className="text-[#00ff41]">&gt;</span> HEADER / PACKET_SUBJECT:
                </label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="e.g. Zero-Trust Architecture Review / Contract Opportunity"
                  className={`w-full px-3 py-2 bg-[#05070a] border rounded text-xs text-white placeholder-slate-600 outline-none transition-colors ${
                    errors.subject ? 'border-[#ff3344]' : 'border-[#1b2838] focus:border-[#00ff41]'
                  }`}
                />
                {errors.subject && (
                  <div className="text-[11px] text-[#ff3344] flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.subject}</span>
                  </div>
                )}
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="block text-xs text-slate-300">
                  <span className="text-[#00ff41]">&gt;</span> ENCRYPTED_PAYLOAD / MESSAGE_BODY:
                </label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Enter your transmission payload here (min 10 characters)..."
                  className={`w-full px-3 py-2 bg-[#05070a] border rounded text-xs text-white placeholder-slate-600 outline-none transition-colors ${
                    errors.message ? 'border-[#ff3344]' : 'border-[#1b2838] focus:border-[#00ff41]'
                  }`}
                />
                {errors.message && (
                  <div className="text-[11px] text-[#ff3344] flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.message}</span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-[#00ff41] hover:bg-[#00cc33] text-black font-extrabold text-xs sm:text-sm rounded transition-all shadow-[0_0_20px_rgba(0,255,65,0.3)] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <span>TRANSMITTING PACKETS...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>TRANSMIT DISPATCH PACKET</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Form Footer */}
          <div className="px-4 py-2 bg-[#05070a] border-t border-[#16202c] text-[10px] text-slate-500 flex items-center justify-between">
            <span>PACKET PROTOCOL: HTTPS / JSON RPC</span>
            <span className="text-[#00ff41]">INPUT SANITIZATION: ACTIVE</span>
          </div>
        </div>

        {/* Right Col: Direct Channels & Social Uplinks */}
        <div className="lg:col-span-5 space-y-6">
          {/* Direct Email Card with Copy Button */}
          <div className="p-6 bg-[#0a0e14] border border-[#16202c] hover:border-[#00ff41]/50 rounded-lg space-y-4 transition-colors">
            <div className="flex items-center gap-2 text-xs text-[#00ff41] font-bold">
              <Mail className="w-4 h-4 text-[#00ff41]" />
              <span>DIRECT INBOX UPLINK</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Prefer reaching out through your standard mail client? Click below to copy the operator address or trigger a mailto link.
            </p>

            <div className="p-3 bg-[#05070a] border border-[#1b2838] rounded flex items-center justify-between gap-2 text-xs">
              <span className="font-mono text-[#00f3ff] truncate">{personalization.email}</span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-2.5 py-1 bg-[#0d141e] hover:bg-[#15202e] text-slate-300 hover:text-[#00ff41] border border-[#1b2838] rounded text-[11px] flex items-center gap-1 cursor-pointer transition-colors shrink-0"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3 h-3 text-[#00ff41]" />
                    <span className="text-[#00ff41]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Social Uplinks Grid */}
          <div className="p-6 bg-[#0a0e14] border border-[#16202c] rounded-lg space-y-4">
            <div className="flex items-center gap-2 text-xs text-[#00f3ff] font-bold">
              <Shield className="w-4 h-4 text-[#00f3ff]" />
              <span>EXTERNAL RECON & NETWORKS</span>
            </div>

            <div className="space-y-2">
              <a
                href={personalization.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 bg-[#080c12] hover:bg-[#0f1722] border border-[#1b2838] hover:border-[#00ff41] rounded text-xs text-slate-300 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Github className="w-4 h-4 text-white group-hover:text-[#00ff41]" />
                  <div>
                    <div className="font-bold text-white group-hover:text-[#00ff41]">GitHub Repositories</div>
                    <div className="text-[10px] text-slate-500">Open source tools and CTF payloads</div>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#00ff41]" />
              </a>

              <a
                href={personalization.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 bg-[#080c12] hover:bg-[#0f1722] border border-[#1b2838] hover:border-[#00ff41] rounded text-xs text-slate-300 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Linkedin className="w-4 h-4 text-white group-hover:text-[#00ff41]" />
                  <div>
                    <div className="font-bold text-white group-hover:text-[#00ff41]">LinkedIn Network</div>
                    <div className="text-[10px] text-slate-500">Professional credentials & career updates</div>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#00ff41]" />
              </a>

              <a
                href={personalization.twitterUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 bg-[#080c12] hover:bg-[#0f1722] border border-[#1b2838] hover:border-[#00ff41] rounded text-xs text-slate-300 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Twitter className="w-4 h-4 text-white group-hover:text-[#00ff41]" />
                  <div>
                    <div className="font-bold text-white group-hover:text-[#00ff41]">Twitter / X</div>
                    <div className="text-[10px] text-slate-500">Security hot takes & tech exploration</div>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#00ff41]" />
              </a>
            </div>
          </div>

          {/* Response Latency SLA */}
          <div className="p-4 bg-[#05070a] border border-[#16202c] rounded text-xs text-slate-400 space-y-1">
            <div className="text-[#00ff41] font-bold text-[11px]">DISPATCH SLA GUARANTEE:</div>
            <p className="text-[11px] leading-relaxed">
              Standard inbound transmissions receive review within 24-48 hours. For high-urgency vulnerability disclosures or incident triage, include "[URGENT]" in the subject line.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
