import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Phone, Mail, User, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SpectrumSegmentedControl, SpectrumButton } from './spectrum/SpectrumComponents';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    location?: string;
    bedrooms?: number;
    currentStatus?: 'vacant' | 'self_managed' | 'long_term';
    estimatedAnnualNet?: number;
    propertyTitle?: string;
    selectedPlan?: string;
  };
}

export const LeadModal: React.FC<LeadModalProps> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [propertyAddress, setPropertyAddress] = useState('');
  const [bedrooms, setBedrooms] = useState(initialData?.bedrooms || 3);
  const [currentStatus, setCurrentStatus] = useState<'vacant' | 'self_managed' | 'long_term'>(
    initialData?.currentStatus || 'vacant'
  );
  const [notes, setNotes] = useState(
    initialData?.propertyTitle
      ? `Inquiry regarding similar property: ${initialData.propertyTitle}`
      : initialData?.selectedPlan
      ? `Interested in ${initialData.selectedPlan} plan`
      : ''
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = 'Please enter your full name';

    if (!email.trim()) {
      newErrors.email = 'Please provide an email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please provide a valid email format';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Please provide a contact phone number';
    } else if (phone.replace(/\D/g, '').length < 7) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!propertyAddress.trim()) {
      newErrors.propertyAddress = 'Please enter the street address or neighborhood';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 500);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md overflow-y-auto"
          onClick={handleResetAndClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            className="bg-[#F2F2F7] rounded-[28px] max-w-xl w-full border border-black/[0.08] shadow-[0_24px_64px_rgba(0,0,0,0.28)] overflow-hidden my-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* iOS Sheet Grabber Handle & Dark Frosted Header */}
            <div className="bg-[#1C1C1E] text-white p-6 sm:p-7 pt-3 relative">
              <div className="w-10 h-1.5 rounded-full bg-white/25 mx-auto mb-4" />

              <button
                onClick={handleResetAndClose}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-neutral-300 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-xs font-semibold tracking-wider text-[#0A84FF] uppercase mb-1">
                Complimentary Asset Evaluation
              </div>
              <h3 className="text-2xl font-serif font-bold text-white">
                Request Your Property Revenue Audit
              </h3>
              <p className="text-xs text-neutral-300 mt-1 max-w-md">
                Our Senior Portfolio Director will analyze your home's earning potential, comp ADRs, and projected net yields within 24 hours.
              </p>

              {initialData?.estimatedAnnualNet && (
                <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs">
                  <span className="text-neutral-300">Calculator Estimate Reference:</span>
                  <span className="font-mono font-bold text-[#34C759] tabular-nums">
                    ${initialData.estimatedAnnualNet.toLocaleString()} / year net
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5 sm:p-7">
              {isSubmitted ? (
                <div className="bg-white rounded-[22px] p-6 border border-black/[0.06] text-center space-y-4">
                  <div className="w-14 h-14 bg-[#34C759]/15 text-[#34C759] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h4 className="text-2xl font-serif font-bold text-neutral-950">
                    Audit Request Received
                  </h4>

                  <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-neutral-950">{fullName}</span>. 
                    Our team has initiated your custom revenue comp model for{' '}
                    <span className="font-semibold text-neutral-950">{propertyAddress}</span>. 
                    A Senior Portfolio Director will reach out at{' '}
                    <span className="font-semibold text-neutral-950">{email}</span> within 24 hours.
                  </p>

                  <div className="p-4 bg-[#F2F2F7] rounded-[16px] text-xs text-neutral-600 text-left space-y-2 mt-4">
                    <div className="font-semibold text-neutral-950">Next Steps:</div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[#007AFF] font-bold">1.</span>
                      <span>Comparative market analysis against top 5% local listings</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[#007AFF] font-bold">2.</span>
                      <span>Personalized 12-month itemized revenue & occupancy forecast</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[#007AFF] font-bold">3.</span>
                      <span>Optional in-person walkthrough & interior design consultation</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <SpectrumButton
                      type="button"
                      variant="ios-blue"
                      size="lg"
                      onClick={handleResetAndClose}
                      className="w-full"
                    >
                      Return to Website
                    </SpectrumButton>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* iOS Grouped Card for Contact & Property Fields */}
                  <div className="bg-white rounded-[20px] p-4 sm:p-5 border border-black/[0.06] shadow-2xs space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-800 mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
                          }}
                          placeholder="e.g. Alexandra Sterling"
                          className={`w-full py-2.5 px-3 pl-9 rounded-[12px] border text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#007AFF] transition-colors ${
                            errors.fullName ? 'border-red-400 bg-red-50/30' : 'border-neutral-200 bg-[#F2F2F7]/60'
                          }`}
                        />
                        <User className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                      </div>
                      {errors.fullName && (
                        <div className="text-[11px] text-red-600 mt-1">{errors.fullName}</div>
                      )}
                    </div>

                    {/* Email & Phone Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-800 mb-1">
                          Email Address *
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                            }}
                            placeholder="alexandra@example.com"
                            className={`w-full py-2.5 px-3 pl-9 rounded-[12px] border text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#007AFF] transition-colors ${
                              errors.email ? 'border-red-400 bg-red-50/30' : 'border-neutral-200 bg-[#F2F2F7]/60'
                            }`}
                          />
                          <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                        </div>
                        {errors.email && (
                          <div className="text-[11px] text-red-600 mt-1">{errors.email}</div>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-800 mb-1">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => {
                              setPhone(e.target.value);
                              if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                            }}
                            placeholder="+1 (310) 555-0199"
                            className={`w-full py-2.5 px-3 pl-9 rounded-[12px] border text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#007AFF] transition-colors ${
                              errors.phone ? 'border-red-400 bg-red-50/30' : 'border-neutral-200 bg-[#F2F2F7]/60'
                            }`}
                          />
                          <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                        </div>
                        {errors.phone && (
                          <div className="text-[11px] text-red-600 mt-1">{errors.phone}</div>
                        )}
                      </div>
                    </div>

                    {/* Property Address & Bedrooms */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-neutral-800 mb-1">
                          Property Address or Street *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={propertyAddress}
                            onChange={(e) => {
                              setPropertyAddress(e.target.value);
                              if (errors.propertyAddress)
                                setErrors((prev) => ({ ...prev, propertyAddress: '' }));
                            }}
                            placeholder="e.g. 21450 Pacific Coast Hwy"
                            className={`w-full py-2.5 px-3 pl-9 rounded-[12px] border text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#007AFF] transition-colors ${
                              errors.propertyAddress
                                ? 'border-red-400 bg-red-50/30'
                                : 'border-neutral-200 bg-[#F2F2F7]/60'
                            }`}
                          />
                          <MapPin className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                        </div>
                        {errors.propertyAddress && (
                          <div className="text-[11px] text-red-600 mt-1">
                            {errors.propertyAddress}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-800 mb-1">
                          Bedrooms
                        </label>
                        <select
                          value={bedrooms}
                          onChange={(e) => setBedrooms(Number(e.target.value))}
                          className="w-full py-2.5 px-3 rounded-[12px] border border-neutral-200 bg-[#F2F2F7]/60 text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                        >
                          <option value={1}>1 Bedroom</option>
                          <option value={2}>2 Bedrooms</option>
                          <option value={3}>3 Bedrooms</option>
                          <option value={4}>4 Bedrooms</option>
                          <option value={5}>5+ Bedrooms</option>
                        </select>
                      </div>
                    </div>

                    {/* Current Status Segmented Control */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
                        Current Property Status
                      </label>
                      <SpectrumSegmentedControl<'vacant' | 'self_managed' | 'long_term'>
                        layoutId="lead-modal-status"
                        value={currentStatus}
                        onChange={setCurrentStatus}
                        size="sm"
                        fullWidth
                        options={[
                          { id: 'vacant', label: 'Vacant / New' },
                          { id: 'self_managed', label: 'Self-Managing' },
                          { id: 'long_term', label: 'Long-Term Lease' },
                        ]}
                      />
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-800 mb-1">
                        Specific Requirements or Questions (Optional)
                      </label>
                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Tell us about special amenities, target launch date, or current performance..."
                        className="w-full py-2 px-3 rounded-[12px] border border-neutral-200 bg-[#F2F2F7]/60 text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                      />
                    </div>
                  </div>

                  {/* Privacy Trust note */}
                  <div className="flex items-start gap-2 px-1 text-[11px] text-neutral-500">
                    <ShieldCheck className="w-4 h-4 text-[#34C759] shrink-0 mt-0.5" />
                    <span>
                      We respect your privacy. We never spam or share property details with third parties.
                    </span>
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-1">
                    <SpectrumButton
                      type="submit"
                      variant="ios-blue"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <span>Preparing Custom Valuation Model...</span>
                      ) : (
                        <>
                          <span>Submit Property for Valuation Audit</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </SpectrumButton>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
