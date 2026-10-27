import test from 'node:test';
import assert from 'node:assert/strict';
import { calculatePropertyRevenue } from './calculator';

test('calculates urban 2-bedroom base revenue deterministically', () => {
  const result = calculatePropertyRevenue({
    location: 'urban',
    bedrooms: 2,
    bathrooms: 2,
    currentStatus: 'vacant',
    amenities: {},
    managementTier: 'standard',
  });

  // Base urban rate: 250 * 1.55 = 387.5 -> rounded to 390
  assert.equal(result.averageDailyRate, 390);
  assert.ok(result.occupancyRate >= 80, 'Occupancy should be at least 80%');
  assert.ok(result.annualGrossRevenue > 100000, 'Gross revenue should exceed 100k');
  assert.equal(result.agencyFeePercentage, 18);
  assert.ok(result.monthlyEstimatedNetPayout > 0, 'Net payout should be positive');
  assert.ok(result.annualEstimatedNetPayout > result.selfManagedAnnualNet, 'Agency should yield higher net payout than self-managed');
});

test('amenities like pool and designer staging boost ADR and occupancy', () => {
  const baseResult = calculatePropertyRevenue({
    location: 'coastal',
    bedrooms: 3,
    bathrooms: 3,
    currentStatus: 'self_managed',
    amenities: {},
  });

  const boostedResult = calculatePropertyRevenue({
    location: 'coastal',
    bedrooms: 3,
    bathrooms: 3,
    currentStatus: 'self_managed',
    amenities: {
      poolSpa: true,
      designerStaging: true,
      scenicView: true,
    },
  });

  assert.ok(boostedResult.averageDailyRate > baseResult.averageDailyRate, 'Amenities should raise ADR');
  assert.ok(boostedResult.occupancyRate >= baseResult.occupancyRate, 'Amenities should maintain or increase occupancy');
  assert.ok(boostedResult.annualGrossRevenue > baseResult.annualGrossRevenue, 'Amenities should increase annual gross');
});

test('premier tier applies 22% fee and deducts correctly', () => {
  const standard = calculatePropertyRevenue({
    location: 'mountain',
    bedrooms: 4,
    bathrooms: 3,
    currentStatus: 'vacant',
    amenities: { poolSpa: true },
    managementTier: 'standard',
  });

  const premier = calculatePropertyRevenue({
    location: 'mountain',
    bedrooms: 4,
    bathrooms: 3,
    currentStatus: 'vacant',
    amenities: { poolSpa: true },
    managementTier: 'premier',
  });

  assert.equal(standard.agencyFeePercentage, 18);
  assert.equal(premier.agencyFeePercentage, 22);
  assert.ok(premier.monthlyAgencyFee > standard.monthlyAgencyFee);
});
