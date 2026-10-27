import React, { useState, useMemo } from 'react';
import {
  ArrowRight,
  Sparkles,
  Waves,
  Building,
  Mountain,
  Trees,
  Eye,
  Laptop,
  Zap,
  Droplets,
} from 'lucide-react';
import { motion } from 'motion/react';
import { calculatePropertyRevenue, LocationType, AmenitySelections } from '../utils/calculator';
import {
  SpectrumSegmentedControl,
  SpectrumIOSSwitchRow,
  SpectrumButton,
  SpectrumAnimatedNumber,
  SpectrumScrollReveal,
} from './spectrum/SpectrumComponents';

interface RevenueCalculatorProps {
  onOpenAuditModalWithData: (data: {
    location: string;
    bedrooms: number;
    currentStatus: 'vacant' | 'self_managed' | 'long_term';
    estimatedAnnualNet: number;
  }) => void;
}

export const RevenueCalculator: React.FC<RevenueCalculatorProps> = ({ onOpenAuditModalWithData }) => {
  const [location, setLocation] = useState<LocationType>('coastal');
  const [bedrooms, setBedrooms] = useState<number>(3);
  const [bathrooms] = useState<number>(2);
  const [currentStatus, setCurrentStatus] = useState<'vacant' | 'self_managed' | 'long_term'>('vacant');
  const [managementTier, setManagementTier] = useState<'standard' | 'premier'>('standard');
  const [amenities, setAmenities] = useState<AmenitySelections>({
    poolSpa: true,
    scenicView: true,
    designerStaging: true,
    dedicatedWorkspace: false,
    evCharger: false,
  });

  const toggleAmenity = (key: keyof AmenitySelections) => {
    setAmenities((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const calculation = useMemo(() => {
    return calculatePropertyRevenue({
      location,
      bedrooms,
      bathrooms,
      currentStatus,
      amenities,
      managementTier,
    });
  }, [location, bedrooms, bathrooms, currentStatus, amenities, managementTier]);

  const handleClaimEstimate = () => {
    onOpenAuditModalWithData({
      location,
      bedrooms,
      currentStatus,
      estimatedAnnualNet: calculation.annualEstimatedNetPayout,
    });
  };

  return (
    <section id="calculator" className="py-20 lg:py-26 border-b border-black/[0.06] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll Reveal */}
        <SpectrumScrollReveal className="text-center max-w-3xl mx-auto mb-12 space-y-2.5">
          <div className="text-xs font-semibold tracking-wider text-[#007AFF] uppercase">
            Algorithmic Yield Forecasting
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-950 tracking-tight text-balance">
            Estimate your property's short-term rental earning potential.
          </h2>
          <p className="text-base text-neutral-600 leading-relaxed font-normal">
            Based on empirical historical performance data from over 320 managed high-end listings and live market comp analysis.
          </p>
        </SpectrumScrollReveal>

        {/* Main Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: iOS Inset Grouped Settings Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Group 1: Market Category & Configuration */}
            <SpectrumScrollReveal delay={0.05}>
              <div className="bg-white rounded-[24px] border border-black/[0.07] p-5 sm:p-6 space-y-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                
                {/* 01. Market Category */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      01. Market Category
                    </span>
                    <span className="text-xs text-neutral-400">Select property environment</span>
                  </div>
                  <div className="overflow-x-auto pb-1">
                    <SpectrumSegmentedControl<LocationType>
                      layoutId="calc-market-category"
                      value={location}
                      onChange={setLocation}
                      fullWidth
                      options={[
                        { id: 'coastal', label: 'Coastal / Beach', icon: Waves },
                        { id: 'urban', label: 'Urban Center', icon: Building },
                        { id: 'mountain', label: 'Mountain / Ski', icon: Mountain },
                        { id: 'countryside', label: 'Countryside', icon: Trees },
                      ]}
                    />
                  </div>
                </div>

                {/* 02. Bedrooms & 03. Current Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-neutral-100">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between px-1">
                      <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                        02. Bedrooms
                      </label>
                      <span className="text-xs font-mono font-bold text-[#007AFF]">
                        {bedrooms === 5 ? '5+ Beds' : `${bedrooms} ${bedrooms === 1 ? 'Bed' : 'Beds'}`}
                      </span>
                    </div>
                    <SpectrumSegmentedControl<number>
                      layoutId="calc-bedrooms"
                      value={bedrooms}
                      onChange={setBedrooms}
                      fullWidth
                      options={[
                        { id: 1, label: '1' },
                        { id: 2, label: '2' },
                        { id: 3, label: '3' },
                        { id: 4, label: '4' },
                        { id: 5, label: '5+' },
                      ]}
                    />
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between px-1">
                      <label htmlFor="current-status" className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                        03. Current Status
                      </label>
                    </div>
                    <select
                      id="current-status"
                      value={currentStatus}
                      onChange={(e) => setCurrentStatus(e.target.value as any)}
                      className="w-full min-h-[46px] px-3.5 bg-[#F2F2F7] border border-black/[0.06] rounded-[14px] text-xs sm:text-[13px] font-semibold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#007AFF] cursor-pointer transition-shadow"
                    >
                      <option value="vacant">Vacant / Under Purchase</option>
                      <option value="self_managed">Currently Self-Managing on Airbnb</option>
                      <option value="long_term">Long-Term Tenant in Place</option>
                    </select>
                  </div>
                </div>

              </div>
            </SpectrumScrollReveal>

            {/* Group 2: iOS Inset Grouped Amenities Table View with Native UISwitch Controls */}
            <SpectrumScrollReveal delay={0.1} className="space-y-2">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  04. Key Amenities & Features
                </span>
                <span className="text-xs text-neutral-400">Tap to toggle ADR value drivers</span>
              </div>

              <div className="rounded-[22px] overflow-hidden border border-black/[0.07] shadow-[0_2px_12px_rgba(0,0,0,0.03)] bg-white">
                <SpectrumIOSSwitchRow
                  checked={!!amenities.poolSpa}
                  onChange={() => toggleAmenity('poolSpa')}
                  label="Private Pool or Hot Tub"
                  description="High-intent filter for luxury vacation travelers"
                  badgeText="+18% ADR"
                  icon={Droplets}
                />
                <SpectrumIOSSwitchRow
                  checked={!!amenities.scenicView}
                  onChange={() => toggleAmenity('scenicView')}
                  label="Scenic View (Ocean, Skyline, Mountain)"
                  description="Commands top-decile nightly pricing"
                  badgeText="+14% ADR"
                  icon={Eye}
                />
                <SpectrumIOSSwitchRow
                  checked={!!amenities.designerStaging}
                  onChange={() => toggleAmenity('designerStaging')}
                  label="Bespoke Designer Staging"
                  description="Editorial architectural styling & lighting"
                  badgeText="+16% ADR"
                  icon={Sparkles}
                />
                <SpectrumIOSSwitchRow
                  checked={!!amenities.dedicatedWorkspace}
                  onChange={() => toggleAmenity('dedicatedWorkspace')}
                  label="High-End Dedicated Workspace"
                  description="Captures extended executive & remote stays"
                  badgeText="+5% ADR"
                  icon={Laptop}
                />
                <SpectrumIOSSwitchRow
                  checked={!!amenities.evCharger}
                  onChange={() => toggleAmenity('evCharger')}
                  label="Level-2 EV Vehicle Charger"
                  description="Preferred amenity for coastal & ski drive markets"
                  badgeText="+4% ADR"
                  icon={Zap}
                  isLast
                />
              </div>
            </SpectrumScrollReveal>

            {/* Group 3: Management Tier Segmented Control */}
            <SpectrumScrollReveal delay={0.14}>
              <div className="bg-white rounded-[22px] border border-black/[0.07] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-2.5">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    05. Management Tier
                  </span>
                  <span className="text-xs font-mono text-[#007AFF] font-semibold">
                    {managementTier === 'premier' ? '22% all-inclusive' : '18% standard turnkey'}
                  </span>
                </div>
                <SpectrumSegmentedControl<'standard' | 'premier'>
                  layoutId="calc-management-tier"
                  value={managementTier}
                  onChange={setManagementTier}
                  fullWidth
                  options={[
                    { id: 'standard', label: 'Turnkey Hospitality (18%)' },
                    { id: 'premier', label: 'Premier + Interior Staging (22%)' },
                  ]}
                />
              </div>
            </SpectrumScrollReveal>

          </div>

          {/* Right Column: Apple Wallet-Style Dark Titanium Payout Summary Widget (5 cols) */}
          <SpectrumScrollReveal delay={0.12} className="lg:col-span-5 space-y-4">
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ type: 'spring', stiffness: 360, damping: 28 }}
              className="bg-[#1C1C1E] text-white rounded-[28px] p-6 sm:p-7 space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.16)] border border-white/10"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <div className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">
                    Estimated Net Owner Payout
                  </div>
                  <div className="text-xs text-[#34C759] font-medium mt-0.5">
                    Direct monthly ACH deposit
                  </div>
                </div>
                <span className="font-mono text-xs px-3 py-1 bg-white/10 rounded-full text-neutral-200 border border-white/10">
                  {calculation.agencyFeePercentage}% Fee Model
                </span>
              </div>

              {/* Animated Big Headline Figures */}
              <div className="space-y-1">
                <div className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight tabular-nums">
                  <SpectrumAnimatedNumber
                    value={calculation.annualEstimatedNetPayout}
                    prefix="$"
                  />
                  <span className="text-lg font-sans font-normal text-neutral-400"> / year</span>
                </div>
                <div className="text-neutral-300 text-sm font-medium">
                  Approx.{' '}
                  <span className="text-[#0A84FF] font-mono font-bold tabular-nums">
                    <SpectrumAnimatedNumber
                      value={calculation.monthlyEstimatedNetPayout}
                      prefix="$"
                    />
                  </span>{' '}
                  / month net
                </div>
              </div>

              {/* Underlying Performance Indicators */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-white/[0.06] rounded-[16px] p-3.5 border border-white/[0.08]">
                  <div className="text-[11px] text-neutral-400">Average Daily Rate (ADR)</div>
                  <div className="text-xl font-bold font-mono text-white tabular-nums mt-0.5">
                    <SpectrumAnimatedNumber value={calculation.averageDailyRate} prefix="$" />
                  </div>
                </div>
                <div className="bg-white/[0.06] rounded-[16px] p-3.5 border border-white/[0.08]">
                  <div className="text-[11px] text-neutral-400">Projected Occupancy</div>
                  <div className="text-xl font-bold font-mono text-[#34C759] tabular-nums mt-0.5">
                    <SpectrumAnimatedNumber value={calculation.occupancyRate} suffix="%" />
                  </div>
                </div>
              </div>

              {/* Itemized Deductions & Transparency Card */}
              <div className="bg-black/45 rounded-[18px] p-4 space-y-2.5 text-xs border border-white/10">
                <div className="font-semibold text-neutral-200 text-xs">
                  Estimated Monthly Financial Breakdown:
                </div>

                <div className="flex justify-between text-neutral-400">
                  <span>Gross Guest Bookings</span>
                  <span className="font-mono text-white tabular-nums">
                    <SpectrumAnimatedNumber value={calculation.monthlyGrossRevenue} prefix="$" />
                  </span>
                </div>

                <div className="flex justify-between text-neutral-400">
                  <span>Maison & Key Fee ({calculation.agencyFeePercentage}%)</span>
                  <span className="font-mono text-[#FF9F0A] tabular-nums">
                    -<SpectrumAnimatedNumber value={calculation.monthlyAgencyFee} prefix="$" />
                  </span>
                </div>

                <div className="flex justify-between text-neutral-400">
                  <span>Airbnb / Platform Host Split (3%)</span>
                  <span className="font-mono text-neutral-400 tabular-nums">
                    -<SpectrumAnimatedNumber value={calculation.monthlyHostPlatformFee} prefix="$" />
                  </span>
                </div>

                <div className="flex justify-between text-neutral-400">
                  <span>Professional Linen & Cleaning</span>
                  <span className="font-mono text-[#34C759]">$0 (Guest-Paid)</span>
                </div>

                <div className="pt-2.5 border-t border-white/10 flex justify-between font-bold text-white text-sm">
                  <span>Net Owner Payout</span>
                  <span className="font-mono text-[#0A84FF] tabular-nums">
                    <SpectrumAnimatedNumber value={calculation.monthlyEstimatedNetPayout} prefix="$" />
                  </span>
                </div>
              </div>

              {/* Comparison Advantage Box */}
              <div className="space-y-2 pt-1 text-xs text-neutral-300">
                <div className="flex items-center justify-between py-1 border-b border-white/10">
                  <span>Vs. Self-Managed Airbnb:</span>
                  <span className="font-bold text-[#34C759] font-mono tabular-nums">
                    +<SpectrumAnimatedNumber value={calculation.revenueUpliftVsSelfManaged} suffix="% Net Uplift" />
                  </span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span>Vs. Traditional Long-Term Lease:</span>
                  <span className="font-bold text-[#34C759] font-mono tabular-nums">
                    +<SpectrumAnimatedNumber value={calculation.revenueUpliftVsLongTerm} suffix="% More Revenue" />
                  </span>
                </div>
              </div>

              {/* Primary CTA Button */}
              <SpectrumButton
                type="button"
                variant="ios-blue"
                size="lg"
                onClick={handleClaimEstimate}
                className="w-full"
              >
                <span>Lock In Valuation & Book Audit</span>
                <ArrowRight className="w-4 h-4" />
              </SpectrumButton>
            </motion.div>

            {/* Note & Context */}
            <div className="bg-white rounded-[18px] border border-black/[0.06] p-4 text-xs text-neutral-500 space-y-1 shadow-xs">
              <div className="font-semibold text-neutral-900">Deterministic Methodology:</div>
              <p>
                Calculations reflect seasonality indexing, dynamic algorithmic surge rates, and 2026 local luxury booking comps. Actual results may vary based on exact interior finishes and personal block dates.
              </p>
            </div>
          </SpectrumScrollReveal>

        </div>

      </div>
    </section>
  );
};
