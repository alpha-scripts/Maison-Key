import React, { useState } from 'react';
import { FAQ_DATA } from '../data/mockData';
import { SpectrumAccordionItem, SpectrumScrollReveal } from './spectrum/SpectrumComponents';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 lg:py-26 border-b border-black/[0.06] scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SpectrumScrollReveal className="text-center mb-14 space-y-2.5">
          <div className="text-xs font-semibold tracking-wider text-[#007AFF] uppercase">
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-950 tracking-tight text-balance">
            Everything you need to know about partnering with us.
          </h2>
          <p className="text-base text-neutral-600 font-normal">
            Clear, transparent answers on property care, owner calendar control, and financial operations.
          </p>
        </SpectrumScrollReveal>

        {/* iOS Inset Grouped Accordion List */}
        <SpectrumScrollReveal delay={0.08}>
          <div className="rounded-[24px] overflow-hidden border border-black/[0.07] shadow-[0_2px_16px_rgba(0,0,0,0.04)] bg-white">
            {FAQ_DATA.map((item, idx) => (
              <SpectrumAccordionItem
                key={item.id}
                question={item.question}
                answer={item.answer}
                isOpen={openId === item.id}
                onToggle={() => toggleItem(item.id)}
                isLast={idx === FAQ_DATA.length - 1}
              />
            ))}
          </div>
        </SpectrumScrollReveal>

      </div>
    </section>
  );
};
