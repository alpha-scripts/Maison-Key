import React, { useState } from 'react';
import { ArrowUpRight, ShieldCheck, Sparkles, Award, Building2, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROPERTIES_DATA } from '../data/mockData';
import {
  SpectrumSegmentedControl,
  SpectrumButton,
  SpectrumSpotlightCard,
  SpectrumAnimatedNumber,
  spectrumStaggerContainer,
  spectrumStaggerItem,
} from './spectrum/SpectrumComponents';

interface HeroProps {
  onOpenAuditModal: () => void;
  onSelectProperty: (propertyId: string) => void;
  onOpenCommandSearch: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenAuditModal,
  onSelectProperty,
  onOpenCommandSearch,
}) => {
  const [activePropertyIndex, setActivePropertyIndex] = useState(0);
  const activeProperty = PROPERTIES_DATA[activePropertyIndex];

  const heroSegments = PROPERTIES_DATA.slice(0, 3).map((p, idx) => ({
    id: idx,
    label: `${p.city.split(',')[0]} ($${p.nightlyRate})`,
  }));

  return (
    <section className="relative overflow-hidden pt-8 pb-14 lg:pt-14 lg:pb-22 border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Orchestrated Load-Up Stagger Container */}
        <div>
          {/* Editorial Kicker */}
          <div className="animate-ios-fade-up flex items-center gap-2 text-xs font-semibold tracking-wider text-[#007AFF] uppercase mb-4">
            <span>Boutique Short-Term Rental Management</span>
            <span aria-hidden="true" className="text-neutral-300">/</span>
            <span className="text-neutral-500">Malibu · Paris · Aspen · New York</span>
          </div>

          {/* 2-Column Balanced Hero Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-stretch">
            
            {/* Left Column: Proposition, iOS Spotlight Search Trigger & Primary Actions (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <h1 className="animate-ios-fade-up delay-75 text-4xl sm:text-5xl lg:text-[3.4rem] font-serif font-bold tracking-[-0.025em] text-neutral-950 leading-[1.1] text-balance">
                  Turn your exceptional home into a top 1% Airbnb asset.
                </h1>

                <p className="animate-ios-fade-up delay-150 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal max-w-2xl">
                  Maison & Key delivers end-to-end management for luxury residences. 
                  We combine architectural interior curation, dynamic algorithmic pricing, 
                  and 24/7 five-star hospitality to produce <span className="font-semibold text-neutral-950">38% higher net yields</span> with zero operational friction.
                </p>

                {/* iOS Spotlight / Spectrum Command Search Trigger Bar */}
                <div className="animate-ios-fade-up delay-225">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.01, y: -1 }}
                    whileTap={{ scale: 0.985 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                    onClick={onOpenCommandSearch}
                    className="w-full max-w-xl flex items-center justify-between gap-3 px-4 py-3 bg-white hover:bg-neutral-50/90 hover:border-[#007AFF]/30 transition-colors rounded-[16px] border border-black/[0.08] shadow-[0_2px_10px_rgba(0,0,0,0.03)] text-left cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Search className="w-4 h-4 text-[#007AFF] shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="text-xs sm:text-sm text-neutral-500 group-hover:text-neutral-800 transition-colors truncate">
                        Search managed estates in Malibu, Paris, Aspen, or jump to yield tools...
                      </span>
                    </div>
                    <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono font-medium text-neutral-500 bg-[#F2F2F7] rounded-md border border-black/[0.06] shrink-0">
                      ⌘K
                    </kbd>
                  </motion.button>
                </div>

                {/* Action Row */}
                <div className="animate-ios-fade-up delay-300 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
                  <motion.a
                    href="#calculator"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 480, damping: 26 }}
                    className="group relative overflow-hidden inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] text-[15px] font-semibold text-white bg-[#007AFF] rounded-[14px] hover:bg-[#0066D6] transition-colors shadow-[0_4px_14px_rgba(0,122,255,0.28),inset_0_1px_0_rgba(255,255,255,0.2)] cursor-pointer whitespace-nowrap"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-out"
                    />
                    <span className="relative z-10">Calculate Your Rental Income</span>
                    <ArrowUpRight className="relative z-10 w-4 h-4 text-white/90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </motion.a>

                  <SpectrumButton
                    variant="secondary"
                    size="lg"
                    onClick={onOpenAuditModal}
                  >
                    Request On-Site Property Audit
                  </SpectrumButton>
                </div>
              </div>

              {/* Sub-CTA Trust Markers */}
              <div className="animate-ios-fade-up delay-375 flex flex-wrap items-center gap-y-2 gap-x-6 pt-2 text-xs text-neutral-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#34C759]" />
                  $3M AirCover & Agency Protection
                </span>
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#007AFF]" />
                  Complimentary Architectural Staging
                </span>
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-neutral-700" />
                  30-Day Rolling Agreements
                </span>
              </div>
            </div>

            {/* Right Column: iOS Glassmorphic Live Estate Widget with Spectrum Segmented Control (5 cols) */}
            <div className="animate-ios-fade-up delay-150 lg:col-span-5 flex flex-col">
              <div className="bg-white/90 backdrop-blur-2xl rounded-[28px] border border-black/[0.08] shadow-[0_12px_36px_-8px_rgba(0,0,0,0.08)] p-3.5 flex flex-col justify-between h-full space-y-3.5">
                
                {/* Top iOS Segmented Switcher */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                      Live Managed Estate Telemetry
                    </span>
                    <span className="text-[11px] font-mono text-[#007AFF] font-medium">
                      Verified 2026 Comps
                    </span>
                  </div>
                  <SpectrumSegmentedControl
                    options={heroSegments}
                    value={activePropertyIndex}
                    onChange={setActivePropertyIndex}
                    layoutId="hero-estate-segment"
                    size="sm"
                    fullWidth
                  />
                </div>

                {/* Media Frame with iOS Translucent Vibrancy Scrim */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeProperty.id}
                    initial={{ opacity: 0.7, y: 4, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0.7, y: -4, scale: 0.99 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="relative aspect-4/3 rounded-[20px] overflow-hidden bg-neutral-950 text-white flex flex-col justify-between p-5"
                  >
                    {/* Rich Architectural Gradient Backdrop */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${activeProperty.imageFallbackGradient} opacity-95`} />
                    
                    {/* Subtle Architectural Grid Overlay */}
                    <div
                      className="absolute inset-0 opacity-15"
                      style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.45) 1px, transparent 0)`,
                        backgroundSize: '22px 22px',
                      }}
                    />

                    {/* Top Frosted Glass Status Row */}
                    <div className="relative z-10 flex items-center justify-between text-xs text-white/95">
                      <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-xl px-3 py-1.5 rounded-full border border-white/20">
                        <Award className="w-3.5 h-3.5 text-amber-300" />
                        <span className="font-medium">Superhost · {activeProperty.superhostScore} ★</span>
                      </div>
                      <span className="bg-black/40 backdrop-blur-xl px-3 py-1.5 rounded-full border border-white/15 font-mono text-[11px]">
                        {activeProperty.neighborhood}
                      </span>
                    </div>

                    {/* Bottom Content & iOS Vibrancy Card */}
                    <div className="relative z-10 space-y-3 mt-auto bg-black/45 backdrop-blur-xl p-4 rounded-[16px] border border-white/15">
                      <div>
                        <h3 className="text-lg sm:text-xl font-serif font-bold text-white leading-snug">
                          {activeProperty.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-white/80 mt-0.5">
                          <span>{activeProperty.city}</span>
                          <span aria-hidden="true">·</span>
                          <span>{activeProperty.bedrooms} Bedrooms</span>
                          <span aria-hidden="true">·</span>
                          <span>{activeProperty.guests} Guests max</span>
                        </div>
                      </div>

                      {/* Financial Metrics Strip */}
                      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/15">
                        <div>
                          <div className="text-[11px] text-neutral-300 font-medium">Average Daily Rate</div>
                          <div className="text-lg font-bold font-mono text-amber-200 tabular-nums">
                            <SpectrumAnimatedNumber value={activeProperty.nightlyRate} prefix="$" />{' '}
                            <span className="text-xs text-white/70 font-sans font-normal">/ night</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-[11px] text-neutral-300 font-medium">Annual Gross Run-Rate</div>
                          <div className="text-lg font-bold font-mono text-[#34C759] tabular-nums">
                            <SpectrumAnimatedNumber value={activeProperty.annualRevenue} prefix="$" />
                          </div>
                        </div>
                      </div>

                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.015 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => onSelectProperty(activeProperty.id)}
                        className="w-full py-2.5 text-xs font-semibold text-neutral-950 bg-white hover:bg-neutral-100 rounded-[10px] transition-colors text-center cursor-pointer shadow-xs"
                      >
                        View Property Audit & Staging Case
                      </motion.button>
                    </div>
                  </motion.div>
                </AnimatePresence>

              </div>
            </div>

          </div>

          {/* Full-Width 4-Column iOS Grouped KPI Cards Below Hero Split */}
          <div className="animate-ios-fade-up delay-300 mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <SpectrumSpotlightCard className="p-5">
              <div className="text-2xl sm:text-3xl font-bold font-serif text-neutral-950 tabular-nums">
                4.97<span className="text-[#FF9500] text-xl font-sans ml-0.5">★</span>
              </div>
              <div className="text-xs text-neutral-500 font-medium mt-1">
                Average Superhost Rating across 320+ listings
              </div>
            </SpectrumSpotlightCard>

            <SpectrumSpotlightCard className="p-5">
              <div className="text-2xl sm:text-3xl font-bold font-serif text-neutral-950 tabular-nums">
                86.4<span className="text-[#007AFF] text-xl font-sans">%</span>
              </div>
              <div className="text-xs text-neutral-500 font-medium mt-1">
                Annual Average Occupancy (market avg: 62%)
              </div>
            </SpectrumSpotlightCard>

            <SpectrumSpotlightCard className="p-5">
              <div className="text-2xl sm:text-3xl font-bold font-serif text-neutral-950 tabular-nums">
                +38.2<span className="text-[#34C759] text-xl font-sans">%</span>
              </div>
              <div className="text-xs text-neutral-500 font-medium mt-1">
                Average Net Revenue Lift vs Self-Managing
              </div>
            </SpectrumSpotlightCard>

            <SpectrumSpotlightCard className="p-5">
              <div className="text-2xl sm:text-3xl font-bold font-serif text-neutral-950 tabular-nums">
                $42.8M
              </div>
              <div className="text-xs text-neutral-500 font-medium mt-1">
                Managed Portfolio Value under active stewardship
              </div>
            </SpectrumSpotlightCard>
          </div>
        </div>

      </div>
    </section>
  );
};
