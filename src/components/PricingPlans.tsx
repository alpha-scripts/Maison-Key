import React from 'react';
import { Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { PRICING_PLANS } from '../data/mockData';
import { SpectrumButton, SpectrumScrollReveal } from './spectrum/SpectrumComponents';

interface PricingPlansProps {
  onSelectPlan: (planName: string) => void;
}

export const PricingPlans: React.FC<PricingPlansProps> = ({ onSelectPlan }) => {
  return (
    <section id="pricing" className="py-20 lg:py-26 border-b border-black/[0.06] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SpectrumScrollReveal className="text-center max-w-3xl mx-auto mb-14 space-y-2.5">
          <div className="text-xs font-semibold tracking-wider text-[#007AFF] uppercase">
            Transparent Commission Models
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-950 tracking-tight text-balance">
            Zero upfront setup fees. Aligned with your success.
          </h2>
          <p className="text-base text-neutral-600 leading-relaxed font-normal">
            We only earn when you earn. No hidden onboarding surcharges, no cancellation penalties, and no markup on third-party supplies.
          </p>
        </SpectrumScrollReveal>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch mb-14">
          {PRICING_PLANS.map((plan, idx) => {
            const isHighlighted = !!plan.highlighted;

            return (
              <SpectrumScrollReveal key={plan.id} delay={idx * 0.07} className="flex">
                <motion.div
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                  className={`w-full rounded-[26px] p-7 sm:p-8 flex flex-col justify-between transition-colors duration-200 ${
                    isHighlighted
                      ? 'bg-[#1C1C1E] text-white border border-white/15 shadow-[0_24px_56px_rgba(0,0,0,0.18)] relative'
                      : 'bg-white text-neutral-900 border border-black/[0.07] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-[#007AFF]/25'
                  }`}
                >
                  <div>
                    {/* Top Header */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`text-xs font-mono font-bold tracking-wider uppercase ${
                          isHighlighted ? 'text-[#0A84FF]' : 'text-neutral-500'
                        }`}
                      >
                        {plan.name}
                      </span>
                      {plan.badge && (
                        <span className="text-[11px] font-semibold text-[#34C759] font-mono">
                          ★ {plan.badge}
                        </span>
                      )}
                    </div>

                    {/* Commission Rate */}
                    <div className="mb-4">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-5xl font-serif font-bold tabular-nums">
                          {plan.feePercentage}%
                        </span>
                        <span className={`text-xs ${isHighlighted ? 'text-neutral-300' : 'text-neutral-500'}`}>
                          of gross booking revenue
                        </span>
                      </div>
                      <div
                        className={`text-xs mt-2 leading-relaxed ${
                          isHighlighted ? 'text-neutral-300' : 'text-neutral-600'
                        }`}
                      >
                        {plan.subtitle}
                      </div>
                    </div>

                    {/* Ideal For Target Box */}
                    <div
                      className={`p-3.5 rounded-[14px] text-xs mb-6 ${
                        isHighlighted
                          ? 'bg-white/[0.08] text-neutral-200 border border-white/10'
                          : 'bg-[#F2F2F7] text-neutral-700 border border-black/[0.04]'
                      }`}
                    >
                      <span className="font-semibold">Best For: </span>
                      {plan.idealFor}
                    </div>

                    {/* Features List */}
                    <div className="space-y-3 mb-8">
                      <div
                        className={`text-xs font-semibold uppercase tracking-wider ${
                          isHighlighted ? 'text-neutral-400' : 'text-neutral-500'
                        }`}
                      >
                        What is included:
                      </div>
                      <ul className="space-y-2.5 text-xs">
                        {plan.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2.5">
                            <Check
                              className={`w-4 h-4 shrink-0 mt-0.5 ${
                                isHighlighted ? 'text-[#34C759]' : 'text-[#007AFF]'
                              }`}
                            />
                            <span className={isHighlighted ? 'text-neutral-200' : 'text-neutral-700'}>
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card CTA */}
                  <div>
                    <SpectrumButton
                      type="button"
                      variant={isHighlighted ? 'ios-blue' : 'primary'}
                      size="md"
                      onClick={() => onSelectPlan(plan.name)}
                      className="w-full"
                    >
                      <span>{plan.ctaLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </SpectrumButton>
                  </div>
                </motion.div>
              </SpectrumScrollReveal>
            );
          })}
        </div>

        {/* Feature Comparison Guarantee Banner */}
        <SpectrumScrollReveal delay={0.12} className="border border-black/[0.07] rounded-[24px] p-6 sm:p-8 bg-white shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 bg-[#34C759]/15 rounded-[12px] text-[#34C759] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-serif font-bold text-neutral-950">
                The Maison & Key 30-Day Rolling Commitment
              </h4>
              <p className="text-xs text-neutral-600 max-w-2xl leading-relaxed">
                We believe you should stay because we generate exceptional revenue and treat your home with reverence, not because you are locked into a multi-year contract. Cancel anytime with 30 days notice.
              </p>
            </div>
          </div>
          <SpectrumButton
            type="button"
            variant="secondary"
            size="md"
            onClick={() => onSelectPlan('Custom Consultation')}
          >
            Speak with an Advisor
          </SpectrumButton>
        </SpectrumScrollReveal>

      </div>
    </section>
  );
};
