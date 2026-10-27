import React from 'react';
import { Check, KeyRound, Palette, LineChart, Headphones, FileText } from 'lucide-react';
import { SpectrumSpotlightCard, SpectrumScrollReveal } from './spectrum/SpectrumComponents';

export const ServicesBento: React.FC = () => {
  return (
    <section id="services" className="py-20 lg:py-26 border-b border-black/[0.06] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SpectrumScrollReveal className="max-w-3xl mb-14 space-y-2.5">
          <div className="text-xs font-semibold tracking-wider text-[#007AFF] uppercase">
            End-to-End Asset Stewardship
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-950 tracking-tight text-balance">
            Every operational layer managed with uncompromising standards.
          </h2>
          <p className="text-base text-neutral-600 leading-relaxed font-normal">
            We handle the complexities of high-end hospitality so you receive steady passive cash flow while your property remains in immaculate, showroom condition.
          </p>
        </SpectrumScrollReveal>

        {/* Asymmetric Spectrum Spotlight Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          
          {/* Bento Card 1: 01. Complete Operational Autonomy (7 cols) */}
          <SpectrumScrollReveal delay={0.04} className="lg:col-span-7 flex">
            <SpectrumSpotlightCard className="w-full p-7 sm:p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-[9px] bg-[#007AFF] text-white flex items-center justify-center shadow-[0_2px_6px_rgba(0,122,255,0.25)]">
                      <KeyRound className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono font-bold text-neutral-400">01. OPERATIONS</span>
                  </div>
                  <span className="text-xs font-medium text-neutral-500">Full Autonomy</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-neutral-950">
                  Turnkey Operations & White-Glove Turnover
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  We eliminate every operational burden. From installing commercial-grade smart access systems to managing dedicated cleaning teams with hotel inspection checklists, your property runs effortlessly.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-neutral-700">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#007AFF] shrink-0 mt-0.5" />
                    <span>Keyless enterprise smart locks with unique guest access codes</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#007AFF] shrink-0 mt-0.5" />
                    <span>Hotel-standard 600-thread Egyptian cotton linen laundry</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#007AFF] shrink-0 mt-0.5" />
                    <span>Restocking luxury Aesop toiletries & organic pantry staples</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#007AFF] shrink-0 mt-0.5" />
                    <span>NoiseAware decibel monitoring for silent party prevention</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                <span>Standard turnover turnaround: 4 hours</span>
                <span className="font-semibold text-neutral-950">100% On-Time Check-In Rate</span>
              </div>
            </SpectrumSpotlightCard>
          </SpectrumScrollReveal>

          {/* Bento Card 2: 02. Architectural Interior Design & Staging (5 cols) */}
          <SpectrumScrollReveal delay={0.09} className="lg:col-span-5 flex">
            <SpectrumSpotlightCard className="w-full p-7 sm:p-8" spotlightColor="rgba(255, 149, 0, 0.08)">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-[9px] bg-[#FF9500] text-white flex items-center justify-center shadow-[0_2px_6px_rgba(255,149,0,0.25)]">
                      <Palette className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono font-bold text-neutral-400">02. DESIGN & STAGING</span>
                  </div>
                  <span className="text-xs font-medium text-[#FF9500]">Visual Impact</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-neutral-950">
                  Architectural Staging & Editorial Media
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  High-paying guests book based on emotional resonance. Our interior design team curates textiles, lighting, and ceramics to create an editorial visual presence that stands out on Airbnb Luxe and Architectural Digest.
                </p>

                <ul className="space-y-2 text-xs text-neutral-700 pt-1">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#FF9500] shrink-0 mt-0.5" />
                    <span>Bespoke furniture sourcing & accent styling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#FF9500] shrink-0 mt-0.5" />
                    <span>High-resolution twilight architectural photography & drone video</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#FF9500] shrink-0 mt-0.5" />
                    <span>Copywriting crafted to attract discreet, high-net-worth guests</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 text-xs text-neutral-500">
                Average search click-through rate boost:{' '}
                <span className="font-semibold text-neutral-950">+44%</span>
              </div>
            </SpectrumSpotlightCard>
          </SpectrumScrollReveal>

          {/* Bento Card 3: 03. Algorithmic Yield Optimization (5 cols) */}
          <SpectrumScrollReveal delay={0.12} className="lg:col-span-5 flex">
            <SpectrumSpotlightCard className="w-full p-7 sm:p-8" spotlightColor="rgba(52, 199, 89, 0.08)">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-[9px] bg-[#34C759] text-white flex items-center justify-center shadow-[0_2px_6px_rgba(52,199,89,0.25)]">
                      <LineChart className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono font-bold text-neutral-400">03. REVENUE ENGINE</span>
                  </div>
                  <span className="text-xs font-medium text-[#34C759]">Dynamic Pricing</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-neutral-950">
                  Multi-Channel Algorithmic Yield
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Static pricing loses thousands each month. Our revenue algorithms calculate price adjustments multiple times daily based on hyper-local airline flight volumes, conference calendars, hotel compression, and micro-seasonality.
                </p>

                <div className="space-y-2 text-xs text-neutral-700 pt-1">
                  <div className="flex items-center justify-between py-1 border-b border-neutral-100">
                    <span className="text-neutral-600">Distribution Channels:</span>
                    <span className="font-medium text-neutral-950">Airbnb Luxe, Vrbo, Marriott, Direct</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-neutral-100">
                    <span className="text-neutral-600">Min. Stay Optimization:</span>
                    <span className="font-medium text-neutral-950">Zero orphaned 1-night gaps</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-neutral-600">Average ADR Growth:</span>
                    <span className="font-mono font-bold text-[#34C759]">+34% vs fixed pricing</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 text-xs text-neutral-500">
                Direct booking engine saves owners 3% platform commission on repeat stays.
              </div>
            </SpectrumSpotlightCard>
          </SpectrumScrollReveal>

          {/* Bento Card 4: 04. 24/7 Guest Concierge (4 cols) */}
          <SpectrumScrollReveal delay={0.16} className="lg:col-span-4 flex">
            <SpectrumSpotlightCard className="w-full p-7 sm:p-8" spotlightColor="rgba(88, 86, 214, 0.08)">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-[9px] bg-[#5856D6] text-white flex items-center justify-center shadow-[0_2px_6px_rgba(88,86,214,0.25)]">
                      <Headphones className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono font-bold text-neutral-400">04. HOSPITALITY</span>
                  </div>
                  <span className="text-xs font-medium text-neutral-500">24/7 Presence</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-neutral-950">
                  Five-Star Multilingual Concierge
                </h3>
                <p className="text-neutral-600 text-xs leading-relaxed">
                  Discerning guests expect rapid, courteous communication. Our dedicated concierge team responds in under 4 minutes across all time zones.
                </p>

                <ul className="space-y-2 text-xs text-neutral-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#5856D6] shrink-0 mt-0.5" />
                    <span>Sub-5 minute average message response time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#5856D6] shrink-0 mt-0.5" />
                    <span>Digital neighborhood guides with curated dining</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#5856D6] shrink-0 mt-0.5" />
                    <span>Immediate dispatch of on-call maintenance technicians</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 text-xs text-neutral-500">
                Maintained 4.97★ average review score across all seasons.
              </div>
            </SpectrumSpotlightCard>
          </SpectrumScrollReveal>

          {/* Bento Card 5: 05. Transparent Accounting & Owner Stays (3 cols) */}
          <SpectrumScrollReveal delay={0.2} className="lg:col-span-3 flex">
            <SpectrumSpotlightCard className="w-full p-7 sm:p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-[9px] bg-neutral-900 text-white flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono font-bold text-neutral-400">05. FINANCIALS</span>
                  </div>
                </div>
                <h3 className="text-xl font-serif font-bold text-neutral-950">
                  Transparent Accounting
                </h3>
                <p className="text-neutral-600 text-xs leading-relaxed">
                  No hidden fees or opaque markups. Every penny is accounted for with real-time financial reporting.
                </p>

                <ul className="space-y-2 text-xs text-neutral-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#007AFF] shrink-0 mt-0.5" />
                    <span>Itemized monthly PDF and CSV statements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#007AFF] shrink-0 mt-0.5" />
                    <span>Direct ACH payout by 5th business day</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#007AFF] shrink-0 mt-0.5" />
                    <span>Unlimited zero-penalty owner personal stays</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 text-xs text-neutral-500">
                Tax-ready 1099 and local occupancy reports provided annually.
              </div>
            </SpectrumSpotlightCard>
          </SpectrumScrollReveal>

        </div>

      </div>
    </section>
  );
};
