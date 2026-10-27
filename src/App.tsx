/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { RevenueCalculator } from './components/RevenueCalculator';
import { ServicesBento } from './components/ServicesBento';
import { PropertyShowcase } from './components/PropertyShowcase';
import { CaseStudies } from './components/CaseStudies';
import { PricingPlans } from './components/PricingPlans';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { PropertyModal } from './components/PropertyModal';
import { LeadModal } from './components/LeadModal';
import { SpectrumCommandSearch } from './components/spectrum/SpectrumCommandSearch';
import { PROPERTIES_DATA } from './data/mockData';

export default function App() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isCommandSearchOpen, setIsCommandSearchOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [auditModalInitialData, setAuditModalInitialData] = useState<{
    location?: string;
    bedrooms?: number;
    currentStatus?: 'vacant' | 'self_managed' | 'long_term';
    estimatedAnnualNet?: number;
    propertyTitle?: string;
    selectedPlan?: string;
  }>({});

  // Global Cmd+K / Ctrl+K shortcut for Spectrum Command Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenAuditModal = (prefillData?: typeof auditModalInitialData) => {
    setAuditModalInitialData(prefillData || {});
    setIsAuditModalOpen(true);
  };

  const handleSelectProperty = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
  };

  const handleSelectPlan = (planName: string) => {
    handleOpenAuditModal({
      selectedPlan: planName,
    });
  };

  const selectedProperty = PROPERTIES_DATA.find((p) => p.id === selectedPropertyId) || null;

  return (
    <div className="min-h-screen flex flex-col bg-[#F2F2F7] text-[#1D1D1F] selection:bg-[#007AFF]/15 selection:text-[#007AFF]">
      {/* Top Bar strictly obeying Top Bar Contract with iOS translucent vibrancy */}
      <Header onOpenAuditModal={() => handleOpenAuditModal()} />

      <main className="flex-1">
        {/* Hero with proposition, iOS Spotlight Search bar, proof metrics, and live estate widget */}
        <Hero
          onOpenAuditModal={() => handleOpenAuditModal()}
          onSelectProperty={handleSelectProperty}
          onOpenCommandSearch={() => setIsCommandSearchOpen(true)}
        />

        {/* Interactive Instant Revenue Calculator Engine with iOS Segmented Controls & Native UISwitch rows */}
        <RevenueCalculator
          onOpenAuditModalWithData={(calcData) => handleOpenAuditModal(calcData)}
        />

        {/* Core Capabilities & Hospitality Services (Spectrum Spotlight Bento Grid) */}
        <ServicesBento />

        {/* Curated Portfolio Showcase */}
        <PropertyShowcase
          onSelectProperty={handleSelectProperty}
          onOpenAuditModal={() => handleOpenAuditModal()}
        />

        {/* Quantified Before & After Case Studies + Host Testimonials */}
        <CaseStudies onOpenAuditModal={() => handleOpenAuditModal()} />

        {/* Transparent Commission Tiers (18% Turnkey, 22% Premier, 15% Portfolio) */}
        <PricingPlans onSelectPlan={handleSelectPlan} />

        {/* Host FAQ with iOS Inset-Grouped Animated Accordion */}
        <FAQ />
      </main>

      {/* Quiet Luxury Footer */}
      <Footer onOpenAuditModal={() => handleOpenAuditModal()} />

      {/* Spectrum Command Search / iOS Spotlight Dialog */}
      <SpectrumCommandSearch
        isOpen={isCommandSearchOpen}
        onClose={() => setIsCommandSearchOpen(false)}
        onSelectProperty={handleSelectProperty}
        onOpenAuditModal={() => handleOpenAuditModal()}
      />

      {/* Deep-Dive Property Case Modal Sheet */}
      <PropertyModal
        property={selectedProperty}
        onClose={() => setSelectedPropertyId(null)}
        onOpenAuditModal={(propertyTitle) => handleOpenAuditModal({ propertyTitle })}
      />

      {/* Property Revenue Audit Lead Capture Modal Sheet */}
      <LeadModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        initialData={auditModalInitialData}
      />
    </div>
  );
}
