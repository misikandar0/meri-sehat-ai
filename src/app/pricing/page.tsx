'use client';

import React, { useState } from 'react';
import { PRICING_PLANS } from '@/lib/payment/paymentService';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { CheckCircle2, ShieldCheck, HelpCircle, ArrowRight, Zap, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  const { language } = useLanguage();
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'annual'>('monthly');
  const [processingPlan, setProcessingPlan] = useState<string | null>(null);

  const handleCheckout = async (planId: string) => {
    if (planId === 'free') {
      window.location.href = '/analyzer';
      return;
    }

    setProcessingPlan(planId);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId,
          billingInterval,
          customerEmail: 'patient@example.com',
          customerName: 'Valued Patient',
        }),
      });

      const data = await res.json();
      if (data.success && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        alert(data.message || 'Payment simulation initialized.');
      }
    } catch {
      alert('Error initiating checkout simulation.');
    } finally {
      setProcessingPlan(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold border border-teal-200">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>Transparent & Accessible Healthcare Information</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950">
          Simple, Transparent Plans for Every Patient
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Critical safety advisories, emergency alerts, and introductory report analyses are always free. Upgrade for longitudinal tracking, prescription explainer, and clinic features.
        </p>

        {/* Monthly vs Annual Toggle */}
        <div className="pt-4 flex items-center justify-center gap-3 text-xs font-semibold">
          <button
            onClick={() => setBillingInterval('monthly')}
            className={`px-4 py-2 rounded-xl transition-all ${
              billingInterval === 'monthly'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingInterval('annual')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              billingInterval === 'annual'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>Annual Billing</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500 text-white font-bold">
              Save ~17%
            </span>
          </button>
        </div>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PRICING_PLANS.map((plan) => {
          const price =
            billingInterval === 'annual'
              ? plan.annualPkr
              : plan.monthlyPkr;

          return (
            <div
              key={plan.id}
              className={`bg-white rounded-3xl p-8 border flex flex-col justify-between transition-all relative ${
                plan.recommended
                  ? 'border-teal-500 ring-2 ring-teal-500/20 shadow-xl'
                  : 'border-slate-200 shadow-sm hover:shadow-md'
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-teal-700 text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
                  Recommended for Individuals & Families
                </div>
              )}

              <div>
                <h3 className="font-bold text-xl text-slate-900">{plan.name}</h3>
                <div className="mt-4 mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-950">
                      {price === 0 ? 'Free' : `PKR ${price}`}
                    </span>
                    {price > 0 && (
                      <span className="text-xs text-slate-500 font-medium">
                        / {billingInterval === 'annual' ? 'year' : 'month'}
                      </span>
                    )}
                  </div>
                  {price > 0 && (
                    <p className="text-[11px] text-slate-400 mt-1">
                      Approx. ${plan.monthlyUsd} USD / month
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-3">
                    What&rsquo;s included:
                  </span>
                  <ul className="space-y-3 text-xs text-slate-600">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <button
                  type="button"
                  disabled={processingPlan === plan.id}
                  onClick={() => handleCheckout(plan.id)}
                  className={`w-full py-3.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 ${
                    plan.recommended
                      ? 'bg-teal-700 hover:bg-teal-800 text-white shadow-teal-700/20'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  {processingPlan === plan.id ? (
                    <span>Opening Safe Checkout...</span>
                  ) : plan.id === 'free' ? (
                    <>
                      <span>Get Started Free</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <span>Select {plan.name}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Safety & Ethical Guarantee */}
      <div className="p-6 rounded-3xl bg-slate-100/90 border border-slate-200 text-xs text-slate-600 space-y-2 max-w-3xl mx-auto">
        <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          Our Ethical Commitment to Patient Welfare
        </h4>
        <p className="leading-relaxed">
          Critical emergency indicators and urgent clinical guidance are guaranteed to remain unmetered and free for all users regardless of subscription status. We believe health document transparency is a fundamental right. Payment integration supports safe sandbox testing before any merchant activation.
        </p>
      </div>
    </div>
  );
}
