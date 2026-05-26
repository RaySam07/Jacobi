"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Crosshair, ArrowRight, Check, Minus, Zap, Terminal } from "lucide-react";
import MatricesCursor from "../../components/MatricesCursor";
import { useScrollReveal } from "../../components/ScrollReveal";

/* ─── Pricing data ──────────────────────────────────────────────────── */

const PLANS = [
  {
    name: "Free",
    price: 0,
    desc: "Try before you probe. See what pricing discrimination looks like.",
    probes: 3,
    features: [
      { label: "Probes per month", included: true, value: "3" },
      { label: "Discrimination analysis", included: true, value: null },
      { label: "AI verdict (DeepSeek)", included: true, value: null },
      { label: "PDF report export", included: false, value: null },
      { label: "Price history tracking", included: false, value: null },
      { label: "Priority support", included: false, value: null },
    ],
    cta: "Start probing",
    href: "/chat",
  },
  {
    name: "Pro",
    price: 19,
    desc: "For power shoppers who want every advantage.",
    probes: -1,
    featured: true,
    features: [
      { label: "Probes per month", included: true, value: "Unlimited" },
      { label: "Discrimination analysis", included: true, value: null },
      { label: "AI verdict (DeepSeek + Gemini)", included: true, value: null },
      { label: "PDF report export", included: true, value: null },
      { label: "Price history tracking", included: true, value: "90 days" },
      { label: "Priority support", included: true, value: null },
    ],
    cta: "Get Pro",
    href: "/chat",
  },
];

const COMPARISON = [
  { feature: "Monthly probes", free: "3", pro: "Unlimited" },
  { feature: "Discrimination analysis", free: "Yes", pro: "Yes" },
  { feature: "AI verdict", free: "DeepSeek", pro: "DeepSeek + Gemini" },
  { feature: "PDF export", free: "No", pro: "Yes" },
  { feature: "Price history", free: "No", pro: "90 days" },
  { feature: "Priority support", free: "No", pro: "Yes" },
  { feature: "Cancel anytime", free: "Yes", pro: "Yes" },
];

/* ─── Main Page ─────────────────────────────────────────────────────── */

export default function PricingPage() {
  const [mounted, setMounted] = useState(false);
  const [annual, setAnnual] = useState(false);
  const faqReveal = useScrollReveal({ direction: "up", distance: 20 });

  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both; }
        @media (prefers-reduced-motion: reduce) { .fade-up { animation: none; opacity: 1; transform: none; } }
      `}</style>

      <div className="min-h-screen bg-[#07080c] text-[#d4d4d4] font-mono overflow-x-hidden selection:bg-emerald-400/20 selection:text-white">
        <MatricesCursor />

        {/* ═══════════════ HERO ═══════════════ */}
        <section className="relative min-h-[60vh] flex items-center px-6 lg:px-12 pt-24 pb-16 overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[5%] left-[15%] w-[400px] h-[400px] rounded-full bg-emerald-400/2 blur-[100px]" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto w-full" style={{ animation: mounted ? "fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) both" : "none" }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-emerald-400/20 bg-emerald-400/4 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-emerald-400/70 tracking-widest uppercase">Pricing</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.95] text-white mb-5">
              Pay for what you use.
              <br />
              <span className="text-emerald-400">Nothing more.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#888] leading-relaxed max-w-lg mb-8">
              Every probe reveals hidden pricing discrimination. Start with 3 free probes and upgrade when you need more.
            </p>

            {/* Billing toggle */}
            <div className="flex items-center gap-3 text-xs">
              <span className={`transition-colors ${!annual ? "text-white" : "text-[#555]"}`}>Monthly</span>
              <button
                onClick={() => setAnnual(!annual)}
                className={`relative w-10 h-5 rounded-full border transition-colors ${
                  annual ? "bg-emerald-400/20 border-emerald-400/30" : "bg-white/[0.04] border-white/[0.08]"
                }`}
              >
                <div className={`w-3.5 h-3.5 rounded-full bg-white/60 absolute top-[2px] transition-transform ${
                  annual ? "translate-x-[22px]" : "translate-x-[2px]"
                }`} />
              </button>
              <span className={`transition-colors ${annual ? "text-white" : "text-[#555]"}`}>
                Annual
                <span className="text-emerald-400 ml-1 text-[10px]">Save 20%</span>
              </span>
            </div>
          </div>
        </section>

        {/* ═══════════════ PLANS ═══════════════ */}
        <section className="px-6 lg:px-12 pb-20">
          <div className="max-w-4xl mx-auto">
            {/* Pro plan — featured, asymmetrical */}
            <div
              className="relative border border-emerald-400/20 bg-emerald-400/[0.015] p-8 lg:p-10 mb-6"
              style={{ animation: mounted ? "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both" : "none", animationDelay: "0.15s" }}
            >
              <div className="absolute top-0 right-0 px-4 py-1.5 bg-emerald-400/10 border-b border-l border-emerald-400/20 text-[10px] text-emerald-400 tracking-widest uppercase">
                Most used
              </div>

              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg font-bold text-white">{PLANS[1].name}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                      ${annual ? Math.round(PLANS[1].price * 12 * 0.8 / 12) : PLANS[1].price}
                    </span>
                    <span className="text-xs text-[#555]">/ month</span>
                  </div>
                  <p className="text-xs text-[#777] mt-2 max-w-xs">{PLANS[1].desc}</p>
                </div>

                <Link
                  href={PLANS[1].href}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-emerald-400 text-[#07080c] font-bold text-xs hover:bg-emerald-300 transition-all duration-300 active:scale-[0.97] shrink-0"
                >
                  <Zap className="w-3.5 h-3.5" />
                  {PLANS[1].cta}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-3">
                {PLANS[1].features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs">
                    {f.included ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <Minus className="w-3.5 h-3.5 text-[#444] shrink-0" />
                    )}
                    <span className={f.included ? "text-[#999]" : "text-[#555]"}>
                      {f.label}{f.value ? <span className="text-white ml-1">{f.value}</span> : null}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Free plan — secondary */}
            <div
              className="border border-white/[0.04] bg-white/[0.005] p-8 lg:p-10"
              style={{ animation: mounted ? "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both" : "none", animationDelay: "0.3s" }}
            >
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
                <div>
                  <div className="text-lg font-bold text-white mb-2">{PLANS[0].name}</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-bold text-white tracking-tight">$0</span>
                  </div>
                  <p className="text-xs text-[#777] mt-2 max-w-xs">{PLANS[0].desc}</p>
                </div>

                <Link
                  href={PLANS[0].href}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-sm border border-white/10 text-[#999] text-xs hover:text-white hover:border-white/30 transition-all duration-300 active:scale-[0.97] shrink-0"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  {PLANS[0].cta}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-3">
                {PLANS[0].features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs">
                    {f.included ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <Minus className="w-3.5 h-3.5 text-[#444] shrink-0" />
                    )}
                    <span className={f.included ? "text-[#999]" : "text-[#555]"}>
                      {f.label}{f.value ? <span className="text-white ml-1">{f.value}</span> : null}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ COMPARISON TABLE ═══════════════ */}
        <section className="border-t border-white/[0.04] px-6 lg:px-12 py-20 lg:py-28">
          <div className="max-w-3xl mx-auto">
            <span className="text-[10px] text-[#555] tracking-[0.2em] uppercase mb-4 block">Full comparison</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
              Everything included, nothing hidden.
            </h2>

            <div className="border border-white/[0.04] divide-y divide-white/[0.04]">
              {/* Header */}
              <div className="grid grid-cols-3 gap-4 px-5 py-3 text-[10px] tracking-wider uppercase text-[#555]">
                <div>Feature</div>
                <div className="text-center">Free</div>
                <div className="text-center text-emerald-400">Pro</div>
              </div>
              {COMPARISON.map((row, i) => (
                <div key={i}
                  className="grid grid-cols-3 gap-4 px-5 py-3 text-xs text-[#999] hover:bg-white/[0.01] transition-colors"
                  style={{ animation: mounted ? `fadeUp 0.5s both` : "none", animationDelay: `${i * 0.05}s` }}
                >
                  <div>{row.feature}</div>
                  <div className="text-center">{row.free}</div>
                  <div className="text-center text-white">{row.pro}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ FAQ ═══════════════ */}
        <section className="border-t border-white/[0.04] px-6 lg:px-12 py-20 lg:py-28" ref={faqReveal.ref} style={faqReveal.style}>
          <div className="max-w-3xl mx-auto">
            <span className="text-[10px] text-[#555] tracking-[0.2em] uppercase mb-4 block">FAQ</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
              Questions? Answered.
            </h2>

            <div className="space-y-6">
              {[
                { q: "What is a probe?", a: "A probe is a single URL scan. Jacobi deploys 24 adversarial agents against that URL to detect pricing discrimination across location, device, cookies, and referrer dimensions." },
                { q: "Can I cancel anytime?", a: "Yes. There are no contracts or commitments. You keep your remaining probes for the billing period." },
                { q: "What sites does it work on?", a: "Any site with dynamic pricing — airlines, hotels, e-commerce, subscription platforms. If the price changes based on who you are, Jacobi will find it." },
                { q: "Is my data private?", a: "Yes. URLs you probe are not stored permanently. Analysis results are encrypted. We never sell or share your browsing data." },
              ].map((item, i) => (
                <div key={i} className="border border-white/[0.04] bg-white/[0.005] p-5">
                  <div className="text-sm font-semibold text-white mb-1.5">{item.q}</div>
                  <div className="text-xs text-[#777] leading-relaxed">{item.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ CTA ═══════════════ */}
        <section className="border-t border-white/[0.04] px-6 lg:px-12 py-20 lg:py-28 text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Start with 3 free probes.
            </h2>
            <p className="text-xs text-[#777] mb-8 max-w-xs mx-auto">
              No credit card. No commitment. Just the truth about what you are being charged.
            </p>
            <Link
              href="/chat"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-sm bg-emerald-400 text-[#07080c] font-bold text-xs hover:bg-emerald-300 transition-all duration-300 active:scale-[0.97]"
            >
              <Crosshair className="w-4 h-4" />
              Start probing
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ═══════════════ FOOTER ═══════════════ */}
        <footer className="border-t border-white/[0.04] px-6 lg:px-12 py-10">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Link href="/" className="text-sm font-semibold text-white">JACOBI</Link>
              <span className="text-[9px] text-[#555]">pricing transparency</span>
            </div>
            <div className="flex items-center gap-6 text-[11px]">
              <Link href="/chat" className="text-[#666] hover:text-white transition-colors">Probe</Link>
              <Link href="/history" className="text-[#666] hover:text-white transition-colors">History</Link>
            </div>
            <div className="text-[9px] text-[#444]">BrightData x MIT Hackathon</div>
          </div>
        </footer>
      </div>
    </>
  );
}
