import React from 'react';
import { ArrowUpRight, CheckCircle, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { CASE_STUDIES_DATA, TESTIMONIALS_DATA } from '../data/mockData';
import { SpectrumSpotlightCard, SpectrumScrollReveal } from './spectrum/SpectrumComponents';

interface CaseStudiesProps {
  onOpenAuditModal: () => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onOpenAuditModal }) => {
  return (
    <section id="case-studies" className="py-20 lg:py-26 border-b border-black/[0.06] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SpectrumScrollReveal className="max-w-3xl mb-14 space-y-2.5">
          <div className="text-xs font-semibold tracking-wider text-[#007AFF] uppercase">
            Empirical Results & Proven Impact
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-950 tracking-tight text-balance">
            Real transformations. Verified financial lift.
          </h2>
          <p className="text-base text-neutral-600 leading-relaxed font-normal">
            See how strategic interior repositioning and dynamic rate management unlock tens of thousands in incremental net cash flow.
          </p>
        </SpectrumScrollReveal>

        {/* Case Studies Cards */}
        <div className="space-y-6 mb-20">
          {CASE_STUDIES_DATA.map((study, idx) => (
            <SpectrumScrollReveal key={study.id} delay={idx * 0.06}>
              <SpectrumSpotlightCard className="p-6 sm:p-8" tilt={false}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left: Story & Strategies (7 cols) */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 font-medium">
                      <span className="text-[#007AFF] font-semibold">{study.location}</span>
                      <span aria-hidden="true">·</span>
                      <span>Owner: {study.ownerName}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-neutral-400">{study.timeframe}</span>
                    </div>

                    <h3 className="text-2xl font-serif font-bold text-neutral-950 leading-snug">
                      {study.headline}
                    </h3>

                    <p className="text-neutral-600 text-sm leading-relaxed">
                      {study.summary}
                    </p>

                    <div className="pt-2">
                      <div className="text-xs font-semibold text-neutral-900 uppercase tracking-wider mb-2">
                        Key Strategies Deployed:
                      </div>
                      <ul className="space-y-1.5 text-xs text-neutral-700">
                        {study.keyStrategies.map((strat, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-3.5 h-3.5 text-[#34C759] shrink-0 mt-0.5" />
                            <span>{strat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right: Quantified Before vs After iOS Scoreboard (5 cols) */}
                  <div className="lg:col-span-5 bg-[#F2F2F7] rounded-[20px] p-5 sm:p-6 border border-black/[0.05] space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-200/80">
                      <span className="text-xs font-semibold text-neutral-700 uppercase tracking-wide">
                        Performance Scoreboard
                      </span>
                      <span className="text-xs font-mono font-bold text-[#34C759]">
                        {study.percentageUplift} Net Uplift
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                      {/* Before */}
                      <div className="space-y-3 bg-white p-3.5 rounded-[14px] border border-black/[0.05] shadow-2xs">
                        <div className="text-xs font-medium text-neutral-400">Previous Self/Lease</div>

                        <div>
                          <div className="text-[10px] text-neutral-400">Monthly Gross</div>
                          <div className="text-lg font-mono font-bold text-neutral-500 tabular-nums">
                            {study.beforeStats.monthlyRevenue}
                          </div>
                        </div>

                        <div>
                          <div className="text-[10px] text-neutral-400">Average Rate / Occ.</div>
                          <div className="text-xs font-mono text-neutral-600">
                            {study.beforeStats.adr} · {study.beforeStats.occupancy}
                          </div>
                        </div>
                      </div>

                      {/* After */}
                      <div className="space-y-3 bg-[#1C1C1E] text-white p-3.5 rounded-[14px] border border-white/10 shadow-sm">
                        <div className="text-xs font-medium text-[#0A84FF]">Maison & Key</div>

                        <div>
                          <div className="text-[10px] text-neutral-300">Monthly Gross</div>
                          <div className="text-lg font-mono font-bold text-[#34C759] tabular-nums">
                            {study.afterStats.monthlyRevenue}
                          </div>
                        </div>

                        <div>
                          <div className="text-[10px] text-neutral-300">Average Rate / Occ.</div>
                          <div className="text-xs font-mono text-amber-200">
                            {study.afterStats.adr} · {study.afterStats.occupancy}
                          </div>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={onOpenAuditModal}
                      className="w-full py-2.5 px-3 min-h-[42px] rounded-[12px] bg-white hover:bg-[#007AFF] hover:text-white text-neutral-900 font-semibold text-xs border border-black/[0.06] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <span>Request Strategy for Similar Property</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>

                </div>
              </SpectrumSpotlightCard>
            </SpectrumScrollReveal>
          ))}
        </div>

        {/* Attributable Host Testimonials */}
        <div className="pt-12 border-t border-black/[0.06]">
          <SpectrumScrollReveal className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h3 className="text-2xl font-serif font-bold text-neutral-950">
              Trusted by discerning homeowners worldwide
            </h3>
            <p className="text-xs text-neutral-500">
              Direct feedback from property owners who transitioned from self-managing to our full-service stewardship.
            </p>
          </SpectrumScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS_DATA.map((item, idx) => (
              <SpectrumScrollReveal key={item.id} delay={idx * 0.07} className="flex">
                <SpectrumSpotlightCard className="p-6 w-full">
                  <div className="space-y-3">
                    <Quote className="w-6 h-6 text-[#007AFF]/70" />
                    <p className="text-xs text-neutral-700 leading-relaxed italic">
                      "{item.quote}"
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-neutral-100 space-y-1">
                    <div className="font-semibold text-xs text-neutral-950">{item.author}</div>
                    <div className="text-[11px] text-neutral-500">
                      {item.role} · {item.location}
                    </div>
                    <div className="text-[11px] font-mono text-[#34C759] font-semibold">
                      {item.annualEarnings} net return
                    </div>
                  </div>
                </SpectrumSpotlightCard>
              </SpectrumScrollReveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
