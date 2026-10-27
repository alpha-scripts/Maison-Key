import React, { useState } from 'react';
import { ArrowUpRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROPERTIES_DATA } from '../data/mockData';
import {
  SpectrumSegmentedControl,
  SpectrumSpotlightCard,
  SpectrumButton,
  SpectrumScrollReveal,
} from './spectrum/SpectrumComponents';

interface PropertyShowcaseProps {
  onSelectProperty: (propertyId: string) => void;
  onOpenAuditModal: () => void;
}

type FilterCategory = 'all' | 'coastal' | 'urban' | 'mountain' | 'countryside';

export const PropertyShowcase: React.FC<PropertyShowcaseProps> = ({
  onSelectProperty,
  onOpenAuditModal,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const filteredProperties = PROPERTIES_DATA.filter((prop) => {
    if (activeFilter === 'all') return true;
    return prop.category === activeFilter;
  });

  return (
    <section id="properties" className="py-20 lg:py-26 border-b border-black/[0.06] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Spectrum iOS Segmented Filter Control */}
        <SpectrumScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-2.5">
            <div className="text-xs font-semibold tracking-wider text-[#007AFF] uppercase">
              Curated Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-950 tracking-tight text-balance">
              Homes we proudly steward and maximize.
            </h2>
            <p className="text-base text-neutral-600 font-normal">
              Each residence under our care receives bespoke architectural staging, personalized guest hospitality, and surgical revenue optimization.
            </p>
          </div>

          <div className="overflow-x-auto shrink-0 pb-1">
            <SpectrumSegmentedControl<FilterCategory>
              layoutId="portfolio-category-tabs"
              value={activeFilter}
              onChange={setActiveFilter}
              options={[
                { id: 'all', label: 'All Estates' },
                { id: 'coastal', label: 'Coastal' },
                { id: 'urban', label: 'Urban Lofts' },
                { id: 'mountain', label: 'Mountain' },
                { id: 'countryside', label: 'Countryside' },
              ]}
            />
          </div>
        </SpectrumScrollReveal>

        {/* Properties Grid with Animated Filter Layout Transitions */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          <AnimatePresence mode="popLayout">
            {filteredProperties.map((property, idx) => (
              <motion.div
                key={property.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  type: 'spring',
                  stiffness: 320,
                  damping: 28,
                  delay: idx * 0.04,
                }}
                className="flex"
              >
                <SpectrumSpotlightCard className="group w-full">
                  <div>
                    {/* Visual Media Frame with iOS Vibrancy Overlays */}
                    <div className="relative aspect-4/3 w-full bg-neutral-950 overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${property.imageFallbackGradient} opacity-95 group-hover:scale-105 transition-transform duration-500 ease-out`}
                      />

                      <div
                        className="absolute inset-0 opacity-15"
                        style={{
                          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
                          backgroundSize: '20px 20px',
                        }}
                      />

                      {/* Top Frosted Glass Overlay Bar */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between text-xs text-white">
                        <span className="bg-black/45 backdrop-blur-xl px-3 py-1 rounded-full border border-white/15 font-medium">
                          {property.neighborhood} · {property.city.split(',')[0]}
                        </span>
                        <span className="bg-black/45 backdrop-blur-xl px-2.5 py-1 rounded-full border border-white/15 flex items-center gap-1 font-mono">
                          <Star className="w-3 h-3 text-amber-300 fill-amber-300" />
                          {property.superhostScore}
                        </span>
                      </div>

                      {/* Bottom Financial Metric Bar */}
                      <div className="absolute bottom-3.5 left-3.5 right-3.5 bg-black/55 backdrop-blur-xl p-3 rounded-[16px] border border-white/15 flex items-center justify-between text-xs text-white group-hover:border-white/30 transition-colors">
                        <div>
                          <div className="text-[10px] text-neutral-300">Average Daily Rate</div>
                          <div className="font-mono font-bold text-amber-200 tabular-nums">
                            ${property.nightlyRate}{' '}
                            <span className="font-sans text-[10px] text-neutral-300 font-normal">/ night</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] text-neutral-300">Annual Run-Rate</div>
                          <div className="font-mono font-bold text-[#34C759] tabular-nums">
                            ${property.annualRevenue.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 sm:p-6 space-y-3">
                      <h3 className="text-lg font-serif font-bold text-neutral-950 group-hover:text-[#007AFF] transition-colors line-clamp-1">
                        {property.title}
                      </h3>

                      {/* Clean unboxed metadata with typographic separators */}
                      <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
                        <span>{property.bedrooms} Beds</span>
                        <span aria-hidden="true">·</span>
                        <span>{property.bathrooms} Baths</span>
                        <span aria-hidden="true">·</span>
                        <span>Up to {property.guests} Guests</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#34C759] font-mono font-semibold">{property.occupancyRate}% Occ.</span>
                      </div>

                      <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                        {property.description}
                      </p>

                      {/* Quantified Transformation Highlight */}
                      <div className="pt-2.5 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-700">
                        <span className="text-neutral-500">Agency Result:</span>
                        <span className="font-semibold text-[#34C759]">
                          {property.transformationMetrics.revenueIncrease}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="p-5 sm:p-6 pt-0">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => onSelectProperty(property.id)}
                      className="w-full py-2.5 px-3 min-h-[42px] rounded-[12px] bg-[#F2F2F7] text-xs font-semibold text-neutral-900 hover:bg-[#007AFF] hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>View Performance Deep-Dive</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </motion.button>
                  </div>
                </SpectrumSpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Portfolio Footer Banner */}
        <SpectrumScrollReveal delay={0.1} className="mt-14 bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.07] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-serif font-bold text-neutral-950">
              Own a luxury home in a prime destination?
            </h4>
            <p className="text-xs text-neutral-600">
              We onboard a strictly limited number of new properties per quarter to preserve our 5-star service benchmark.
            </p>
          </div>
          <SpectrumButton
            type="button"
            variant="ios-blue"
            size="md"
            onClick={onOpenAuditModal}
          >
            Submit Property for Consideration
          </SpectrumButton>
        </SpectrumScrollReveal>

      </div>
    </section>
  );
};
