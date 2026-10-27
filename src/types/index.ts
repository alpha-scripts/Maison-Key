export interface Property {
  id: string;
  title: string;
  neighborhood: string;
  city: string;
  category: 'coastal' | 'urban' | 'mountain' | 'countryside';
  bedrooms: number;
  bathrooms: number;
  guests: number;
  nightlyRate: number; // ADR
  occupancyRate: number; // e.g. 88
  annualRevenue: number;
  superhostScore: number; // e.g. 4.98
  reviewCount: number;
  imageFallbackGradient: string;
  accentColor: string;
  description: string;
  transformationMetrics: {
    revenueIncrease: string;
    adrGrowth: string;
    occupancyBeforeAfter: string;
  };
  amenities: string[];
}

export interface CaseStudy {
  id: string;
  propertyTitle: string;
  location: string;
  ownerName: string;
  timeframe: string;
  headline: string;
  summary: string;
  beforeStats: {
    monthlyRevenue: string;
    occupancy: string;
    adr: string;
  };
  afterStats: {
    monthlyRevenue: string;
    occupancy: string;
    adr: string;
  };
  percentageUplift: string;
  keyStrategies: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  feePercentage: number;
  badge?: string;
  subtitle: string;
  idealFor: string;
  features: string[];
  ctaLabel: string;
  highlighted?: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  propertiesManaged: number;
  annualEarnings: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface AuditFormData {
  fullName: string;
  email: string;
  phone: string;
  propertyAddress: string;
  city: string;
  propertyType: string;
  bedrooms: number;
  currentStatus: 'vacant' | 'self_managed' | 'long_term';
  notes?: string;
}
