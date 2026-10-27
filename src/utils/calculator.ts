/**
 * Pure revenue calculation engine for luxury short-term rental properties.
 */

export type LocationType = 'coastal' | 'urban' | 'mountain' | 'countryside';

export interface AmenitySelections {
  poolSpa?: boolean;
  scenicView?: boolean;
  designerStaging?: boolean;
  dedicatedWorkspace?: boolean;
  evCharger?: boolean;
}

export interface PropertyEstimationInput {
  location: LocationType;
  bedrooms: number; // 1 to 5+
  bathrooms: number;
  currentStatus: 'vacant' | 'self_managed' | 'long_term';
  amenities: AmenitySelections;
  managementTier?: 'standard' | 'premier'; // standard is 18%, premier is 22%
}

export interface EstimationResult {
  averageDailyRate: number; // ADR in USD
  occupancyRate: number; // percentage (e.g., 82 for 82%)
  bookedNightsPerYear: number;
  annualGrossRevenue: number;
  monthlyGrossRevenue: number;
  agencyFeePercentage: number;
  monthlyAgencyFee: number;
  monthlyHostPlatformFee: number; // ~3% Airbnb host fee
  monthlyEstimatedNetPayout: number;
  annualEstimatedNetPayout: number;
  
  // Comparison vs other options
  selfManagedAnnualNet: number;
  longTermLeaseAnnualNet: number;
  revenueUpliftVsSelfManaged: number; // percentage uplift
  revenueUpliftVsLongTerm: number; // percentage uplift
}

const BASE_RATES: Record<LocationType, { baseAdr: number; baseOccupancy: number }> = {
  coastal: { baseAdr: 360, baseOccupancy: 76 },
  urban: { baseAdr: 250, baseOccupancy: 81 },
  mountain: { baseAdr: 310, baseOccupancy: 72 },
  countryside: { baseAdr: 210, baseOccupancy: 70 },
};

const BEDROOM_FACTORS: Record<number, number> = {
  1: 1.0,
  2: 1.55,
  3: 2.15,
  4: 2.85,
  5: 3.65,
};

export function calculatePropertyRevenue(input: PropertyEstimationInput): EstimationResult {
  const { location, bedrooms, amenities, managementTier = 'standard' } = input;
  const clampedBedrooms = Math.min(Math.max(1, bedrooms), 5);
  
  const base = BASE_RATES[location] || BASE_RATES.urban;
  const bedroomMultiplier = BEDROOM_FACTORS[clampedBedrooms] || 1.0;
  
  // Calculate ADR Multiplier
  let adrMultiplier = 1.0;
  let occupancyBonus = 8; // Maison & Key Superhost + dynamic pricing boost

  if (amenities.poolSpa) {
    adrMultiplier += 0.18;
    occupancyBonus += 3;
  }
  if (amenities.scenicView) {
    adrMultiplier += 0.14;
    occupancyBonus += 2;
  }
  if (amenities.designerStaging) {
    adrMultiplier += 0.16;
    occupancyBonus += 4;
  }
  if (amenities.dedicatedWorkspace) {
    adrMultiplier += 0.05;
    occupancyBonus += 2;
  }
  if (amenities.evCharger) {
    adrMultiplier += 0.04;
  }

  // Calculate ADR and Occupancy
  const rawAdr = Math.round(base.baseAdr * bedroomMultiplier * adrMultiplier);
  const averageDailyRate = Math.round(rawAdr / 5) * 5; // round to nearest $5

  const rawOccupancy = base.baseOccupancy + occupancyBonus;
  const occupancyRate = Math.min(92, Math.max(65, rawOccupancy));

  const bookedNightsPerYear = Math.round((occupancyRate / 100) * 365);
  const annualGrossRevenue = Math.round(averageDailyRate * bookedNightsPerYear);
  const monthlyGrossRevenue = Math.round(annualGrossRevenue / 12);

  // Agency & Host fees
  const agencyFeePercentage = managementTier === 'premier' ? 22 : 18;
  const monthlyAgencyFee = Math.round((monthlyGrossRevenue * agencyFeePercentage) / 100);
  const monthlyHostPlatformFee = Math.round((monthlyGrossRevenue * 3) / 100); // 3% Airbnb direct host split
  
  const monthlyEstimatedNetPayout = monthlyGrossRevenue - monthlyAgencyFee - monthlyHostPlatformFee;
  const annualEstimatedNetPayout = monthlyEstimatedNetPayout * 12;

  // Comparison Models:
  // Self-managed hosts typically make 26% less gross revenue due to static pricing and lower search rank
  const selfManagedGrossAnnual = Math.round(annualGrossRevenue * 0.74);
  const selfManagedPlatformFee = Math.round(selfManagedGrossAnnual * 0.03);
  const selfManagedSelfCleaningGap = Math.round(selfManagedGrossAnnual * 0.04); // self hosts absorb more operational friction
  const selfManagedAnnualNet = selfManagedGrossAnnual - selfManagedPlatformFee - selfManagedSelfCleaningGap;

  // Long term lease comparison: typically 40-50% of short-term gross
  const longTermMonthlyRent = Math.round(clampedBedrooms * 1400 * (location === 'urban' || location === 'coastal' ? 1.3 : 1.0));
  const longTermAnnualNet = longTermMonthlyRent * 12 * 0.92; // factoring in 8% vacancy/turnover

  const revenueUpliftVsSelfManaged = Math.round(
    ((annualEstimatedNetPayout - selfManagedAnnualNet) / selfManagedAnnualNet) * 100
  );
  const revenueUpliftVsLongTerm = Math.round(
    ((annualEstimatedNetPayout - longTermAnnualNet) / longTermAnnualNet) * 100
  );

  return {
    averageDailyRate,
    occupancyRate,
    bookedNightsPerYear,
    annualGrossRevenue,
    monthlyGrossRevenue,
    agencyFeePercentage,
    monthlyAgencyFee,
    monthlyHostPlatformFee,
    monthlyEstimatedNetPayout,
    annualEstimatedNetPayout,
    selfManagedAnnualNet,
    longTermLeaseAnnualNet: longTermAnnualNet,
    revenueUpliftVsSelfManaged: Math.max(12, revenueUpliftVsSelfManaged),
    revenueUpliftVsLongTerm: Math.max(25, revenueUpliftVsLongTerm),
  };
}
