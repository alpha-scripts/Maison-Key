import React from 'react';
import { X, Check, ArrowRight, Star, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Property } from '../types';
import { SpectrumButton } from './spectrum/SpectrumComponents';

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
  onOpenAuditModal: (propertyTitle: string) => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({
  property,
  onClose,
  onOpenAuditModal,
}) => {
  return (
    <AnimatePresence>
      {property && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            className="bg-[#F2F2F7] rounded-[28px] max-w-3xl w-full border border-black/[0.08] shadow-[0_24px_64px_rgba(0,0,0,0.28)] overflow-hidden my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* iOS Sheet Grabber Handle */}
            <div className="bg-neutral-950 pt-2.5 flex justify-center">
              <div className="w-10 h-1.5 rounded-full bg-white/30" />
            </div>

            {/* Modal Header Media Banner */}
            <div className="relative aspect-16/9 sm:aspect-21/9 bg-neutral-950 overflow-hidden flex flex-col justify-between p-6 pt-3">
              <div className={`absolute inset-0 bg-gradient-to-br ${property.imageFallbackGradient} opacity-95`} />

              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
                  backgroundSize: '20px 20px',
                }}
              />

              {/* Top Bar with Close Button */}
              <div className="relative z-10 flex items-center justify-between text-xs text-white">
                <span className="bg-black/50 backdrop-blur-xl px-3 py-1 rounded-full border border-white/15 font-medium">
                  {property.neighborhood} · {property.city}
                </span>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/15 backdrop-blur-xl text-white hover:bg-white/25 transition-colors cursor-pointer"
                  aria-label="Close property details"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Title & Key Stats on Scrim */}
              <div className="relative z-10 space-y-2 mt-auto">
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  {property.title}
                </h3>

                <div className="flex flex-wrap items-center gap-3 text-xs text-white/90">
                  <span className="flex items-center gap-1 font-mono text-amber-300">
                    <Star className="w-3.5 h-3.5 fill-amber-300" />
                    {property.superhostScore} ({property.reviewCount} verified guest reviews)
                  </span>
                  <span aria-hidden="true" className="text-white/40">·</span>
                  <span>{property.bedrooms} Bedrooms</span>
                  <span aria-hidden="true" className="text-white/40">·</span>
                  <span>{property.bathrooms} Bathrooms</span>
                  <span aria-hidden="true" className="text-white/40">·</span>
                  <span>{property.guests} Max Guests</span>
                </div>
              </div>
            </div>

            {/* iOS Inset Grouped Modal Content */}
            <div className="p-5 sm:p-7 space-y-5 max-h-[70vh] overflow-y-auto">
              
              {/* Performance Transformation Showcase */}
              <div className="bg-white rounded-[20px] p-5 border border-black/[0.06] shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-neutral-900 uppercase tracking-wider">
                    Agency Transformation Impact
                  </span>
                  <span className="text-xs font-mono font-bold text-[#34C759]">
                    {property.transformationMetrics.revenueIncrease}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="bg-[#F2F2F7] p-3.5 rounded-[14px] border border-black/[0.04]">
                    <div className="text-[11px] text-neutral-500">Average Daily Rate</div>
                    <div className="text-base font-bold font-mono text-neutral-950 mt-0.5">
                      {property.transformationMetrics.adrGrowth}
                    </div>
                  </div>

                  <div className="bg-[#F2F2F7] p-3.5 rounded-[14px] border border-black/[0.04]">
                    <div className="text-[11px] text-neutral-500">Occupancy Shift</div>
                    <div className="text-base font-bold font-mono text-neutral-950 mt-0.5">
                      {property.transformationMetrics.occupancyBeforeAfter}
                    </div>
                  </div>

                  <div className="bg-[#F2F2F7] p-3.5 rounded-[14px] border border-black/[0.04]">
                    <div className="text-[11px] text-neutral-500">Annual Gross Run-Rate</div>
                    <div className="text-base font-bold font-mono text-[#34C759] mt-0.5">
                      ${property.annualRevenue.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description & Amenities Grouped Card */}
              <div className="bg-white rounded-[20px] p-5 border border-black/[0.06] shadow-2xs space-y-5">
                <div className="space-y-1.5">
                  <h4 className="text-sm font-semibold text-neutral-950">About the Residence</h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {property.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100 space-y-3">
                  <h4 className="text-sm font-semibold text-neutral-950">Key Features & Managed Amenities</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-neutral-700">
                    {property.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#007AFF] shrink-0" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Agency Stewardship Guarantee */}
              <div className="p-4 rounded-[18px] bg-white border border-black/[0.06] flex items-start gap-3 shadow-2xs">
                <ShieldCheck className="w-5 h-5 text-[#34C759] shrink-0 mt-0.5" />
                <div className="text-xs text-neutral-600 space-y-0.5">
                  <span className="font-semibold text-neutral-950">Maison & Key Operational Guarantee:</span>
                  <p>
                    Every reservation includes $3,000,000 damage coverage, decibel monitoring sensors to prevent parties, and physical post-stay inspections before owner or guest arrival.
                  </p>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-neutral-500 text-center sm:text-left">
                  Interested in similar returns for your home?
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 sm:flex-none py-2.5 px-4 text-xs font-semibold text-neutral-700 bg-white hover:bg-neutral-100 rounded-[12px] border border-black/[0.08] transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <SpectrumButton
                    type="button"
                    variant="ios-blue"
                    size="sm"
                    onClick={() => {
                      onClose();
                      onOpenAuditModal(property.title);
                    }}
                    className="flex-1 sm:flex-none"
                  >
                    <span>Request Audit for Similar Property</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </SpectrumButton>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
