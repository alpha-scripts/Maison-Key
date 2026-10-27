import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowUpRight, Calculator, Building2, Sparkles, HelpCircle } from 'lucide-react';
import { PROPERTIES_DATA } from '../../data/mockData';

interface SpectrumCommandSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProperty: (propertyId: string) => void;
  onOpenAuditModal: () => void;
}

export const SpectrumCommandSearch: React.FC<SpectrumCommandSearchProps> = ({
  isOpen,
  onClose,
  onSelectProperty,
  onOpenAuditModal,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredProperties = PROPERTIES_DATA.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.city.toLowerCase().includes(query.toLowerCase()) ||
      p.neighborhood.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/40 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ type: 'spring', stiffness: 450, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Spotlight Property & Action Search"
            className="w-full max-w-xl bg-white/95 backdrop-blur-2xl rounded-[24px] border border-black/[0.08] shadow-[0_24px_60px_rgba(0,0,0,0.22)] overflow-hidden"
          >
            {/* iOS Spotlight Search Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-neutral-200/80">
              <Search className="w-5 h-5 text-[#007AFF] shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search managed estates (Malibu, Paris, Aspen) or actions..."
                aria-label="Search estates or actions"
                className="w-full bg-transparent text-[15px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search query"
                  className="p-1 rounded-full bg-neutral-200/80 text-neutral-600 hover:bg-neutral-300 text-xs cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="px-2.5 py-1 text-xs font-medium text-[#007AFF] hover:bg-[#007AFF]/10 rounded-lg transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
              {/* Estates Section */}
              <div>
                <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                  Managed Portfolio ({filteredProperties.length})
                </div>
                {filteredProperties.length === 0 ? (
                  <div className="px-3 py-6 text-center text-xs text-neutral-500">
                    No properties matching "{query}". Try Malibu, Paris, Aspen, or New York.
                  </div>
                ) : (
                  <div className="mt-1 divide-y divide-neutral-100 rounded-2xl bg-[#F2F2F7]/60 overflow-hidden border border-black/[0.04]">
                    {filteredProperties.map((prop) => (
                      <button
                        key={prop.id}
                        type="button"
                        onClick={() => {
                          onClose();
                          onSelectProperty(prop.id);
                        }}
                        className="w-full px-4 py-3 text-left flex items-center justify-between gap-3 hover:bg-white transition-colors cursor-pointer"
                      >
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-neutral-900 truncate">{prop.title}</div>
                          <div className="text-xs text-neutral-500">
                            {prop.neighborhood} · {prop.city} · {prop.bedrooms} Beds
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-xs font-mono font-bold text-[#007AFF] tabular-nums">
                            ${prop.nightlyRate}/night
                          </div>
                          <div className="text-[11px] font-mono text-emerald-600 tabular-nums">
                            {prop.occupancyRate}% Occ.
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div>
                <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                  Quick Navigation & Actions
                </div>
                <div className="mt-1 divide-y divide-neutral-100 rounded-2xl bg-[#F2F2F7]/60 overflow-hidden border border-black/[0.04]">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenAuditModal();
                    }}
                    className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-white transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-[9px] bg-[#007AFF] text-white flex items-center justify-center">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-neutral-900">Request Free Revenue Audit</div>
                        <div className="text-xs text-neutral-500">24-hour custom ADR & occupancy valuation</div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-neutral-400" />
                  </button>

                  <a
                    href="#calculator"
                    onClick={onClose}
                    className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-white transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-[9px] bg-[#34C759] text-white flex items-center justify-center">
                        <Calculator className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-neutral-900">Interactive Yield Calculator</div>
                        <div className="text-xs text-neutral-500">Simulate net payout by bedrooms & amenities</div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-neutral-400" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
