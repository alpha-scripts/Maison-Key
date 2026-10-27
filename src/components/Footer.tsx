import React from 'react';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenAuditModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAuditModal }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 py-16 lg:py-20 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-stone-800">
          
          {/* Brand Col (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="#"
              className="text-2xl font-serif font-bold text-white tracking-tight hover:text-stone-200 transition-colors inline-block"
            >
              Maison & Key
            </a>
            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              Full-service luxury short-term rental management and hospitality co-hosting. We maximize net yield for exceptional homes through interior design curation, dynamic algorithmic pricing, and five-star guest hospitality.
            </p>
            
            <div className="pt-2 text-xs text-stone-400 space-y-1">
              <div>Inquiries: <span className="text-white font-mono">estates@maisonandkey.com</span></div>
              <div>Direct: <span className="text-white font-mono">+1 (310) 892-4410</span></div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Navigation
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#properties" className="hover:text-white transition-colors">Managed Estates</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Hospitality Services</a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-white transition-colors">Yield Calculator</a>
              </li>
              <li>
                <a href="#case-studies" className="hover:text-white transition-colors">Case Studies & ROI</a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">Management Tiers</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">Host FAQs</a>
              </li>
            </ul>
          </div>

          {/* Regional Hubs */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Active Hubs
            </div>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>Malibu & Los Angeles, CA</li>
              <li>Manhattan & Hamptons, NY</li>
              <li>Aspen & Vail, CO</li>
              <li>Paris (1er & Marais), France</li>
              <li>London (Kensington & Chelsea), UK</li>
            </ul>
          </div>

          {/* Direct Action */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Partner With Us
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Accepting 6 select properties for Q2 2026 onboarding.
            </p>
            <button
              onClick={onOpenAuditModal}
              className="w-full py-2.5 px-3 bg-white text-stone-900 rounded-lg text-xs font-semibold hover:bg-stone-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Schedule Property Audit</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Bottom Legal / Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} Maison & Key Hospitality Group LLC. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-stone-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-stone-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-stone-400 cursor-pointer">AirCover Disclosure</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
