import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { SpectrumButton } from './spectrum/SpectrumComponents';

interface HeaderProps {
  onOpenAuditModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAuditModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <header className="animate-ios-header sticky top-0 z-40 bg-white/75 backdrop-blur-2xl backdrop-saturate-180 border-b border-black/[0.06] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16 sm:h-[68px]">
          
          {/* Zone 1: Brand Wordmark (Single text element, no badges or subtitles) */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-neutral-950 whitespace-nowrap shrink-0 transition-opacity"
          >
            Maison & Key
          </motion.a>

          {/* Zone 2: 5 Clean Single-Line Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium text-neutral-600">
            {[
              { href: '#properties', label: 'Properties' },
              { href: '#services', label: 'Services' },
              { href: '#calculator', label: 'Revenue Calculator' },
              { href: '#case-studies', label: 'Case Studies' },
              { href: '#faq', label: 'FAQ' },
            ].map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="relative group hover:text-[#007AFF] transition-colors whitespace-nowrap shrink-0 py-1"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#007AFF] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out" />
              </motion.a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="hidden sm:flex items-center shrink-0">
            <SpectrumButton
              variant="primary"
              size="sm"
              onClick={onOpenAuditModal}
              className="rounded-full px-4 py-2 text-xs"
            >
              Free Revenue Audit
            </SpectrumButton>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={onOpenAuditModal}
              className="px-3.5 py-2 min-h-[38px] text-xs font-semibold text-white bg-[#007AFF] rounded-full transition-transform whitespace-nowrap"
            >
              Free Audit
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-11 h-11 flex items-center justify-center text-neutral-800 hover:bg-black/5 rounded-full focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>

        </div>
      </div>

      {/* Smooth iOS Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="h-[2px] bg-gradient-to-r from-[#007AFF] via-[#34C759] to-[#007AFF] origin-left"
      />

      {/* iOS Translucent Sheet Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-b border-black/[0.08] bg-[#F2F2F7]/95 backdrop-blur-2xl px-4 pt-3 pb-6"
          >
            <nav className="bg-white rounded-2xl border border-black/[0.05] divide-y divide-neutral-200/70 overflow-hidden shadow-xs text-[15px] font-medium text-neutral-900">
              {[
                { href: '#properties', label: 'Curated Properties' },
                { href: '#services', label: 'Agency Services' },
                { href: '#calculator', label: 'Revenue Calculator' },
                { href: '#case-studies', label: 'Case Studies & Proof' },
                { href: '#pricing', label: 'Management Plans' },
                { href: '#faq', label: 'Host FAQs' },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3.5 active:bg-neutral-100 transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="text-neutral-400 text-xs">›</span>
                </a>
              ))}
            </nav>

            <div className="pt-3">
              <SpectrumButton
                variant="ios-blue"
                size="lg"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuditModal();
                }}
                className="w-full"
              >
                Schedule Free Revenue Audit
              </SpectrumButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
