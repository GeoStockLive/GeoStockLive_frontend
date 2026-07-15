"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Zap, Building2, Rocket, Crown } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    icon: Zap,
    price: { monthly: 0, annually: 0 },
    description: 'Perfect for retail traders exploring quantitative signals.',
    badge: null,
    color: 'from-gray-500 to-gray-600',
    features: [
      { text: 'Real-time global news feed', included: true },
      { text: 'Basic sentiment analysis', included: true },
      { text: 'Daily risk index updates', included: true },
      { text: 'Standard email support', included: true },
      { text: 'Live signal generation', included: false },
      { text: 'API access', included: false },
      { text: 'Custom integrations', included: false },
      { text: 'Priority support', included: false },
    ],
    cta: 'Get Started Free',
    ctaStyle: 'border border-white/10 hover:bg-white/5 text-white',
  },
  {
    name: 'Professional',
    icon: Building2,
    price: { monthly: 499, annually: 399 },
    description: 'For active traders needing low-latency signals and alerts.',
    badge: 'Most Popular',
    color: 'from-gold-primary to-gold-bright',
    features: [
      { text: 'Sub-200ms latency feeds', included: true },
      { text: 'Advanced sentiment & risk models', included: true },
      { text: 'Live signal generation (BUY/SELL)', included: true },
      { text: 'Priority email & chat support', included: true },
      { text: 'Advanced analytics dashboard', included: true },
      { text: 'REST API access', included: true },
      { text: 'Custom risk weightings', included: false },
      { text: 'Dedicated Account Manager', included: false },
    ],
    cta: 'Start 14-Day Free Trial',
    ctaStyle: 'bg-gold-primary text-background-primary hover:bg-gold-bright hover:shadow-[0_0_20px_rgba(197,168,128,0.4)]',
  },
  {
    name: 'Institutional',
    icon: Rocket,
    price: { monthly: 999, annually: 799 },
    description: 'For hedge funds and institutions needing programmatic access.',
    badge: 'Best Value',
    color: 'from-blue-400 to-cyan-500',
    features: [
      { text: 'Direct WebSocket Firehose', included: true },
      { text: 'Everything in Professional', included: true },
      { text: 'Custom risk weightings', included: true },
      { text: '24/7 priority phone support', included: true },
      { text: 'Custom report builder', included: true },
      { text: 'Full API + Webhooks', included: true },
      { text: 'Historical data export', included: true },
      { text: 'Dedicated Account Manager', included: false },
    ],
    cta: 'Start Free Trial',
    ctaStyle: 'border border-white/20 bg-white/[0.05] text-white hover:bg-white/[0.1]',
  },
  {
    name: 'Enterprise',
    icon: Crown,
    price: { monthly: null, annually: null },
    description: 'For large organizations with custom compliance and deployment needs.',
    badge: null,
    color: 'from-gray-300 to-white',
    features: [
      { text: 'Unlimited programmatic access', included: true },
      { text: 'Everything in Institutional', included: true },
      { text: 'On-premise / private cloud deploy', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'White-label branding', included: true },
      { text: 'Custom SLA & uptime guarantees', included: true },
      { text: 'Advanced security (SOC2, GDPR)', included: true },
      { text: 'Custom AI model training', included: true },
    ],
    cta: 'Contact Sales',
    ctaStyle: 'border border-white/30 hover:bg-white/10 text-white',
  },
];

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  // Load Razorpay Script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleCtaClick = (plan: any) => {
    if (plan.name === 'Starter' || plan.name === 'Enterprise') {
      alert(`Selected ${plan.name} plan`);
      return;
    }

    const amount = isAnnual ? plan.price.annually * 12 : plan.price.monthly;
    const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

    // @ts-ignore
    if (!window.Razorpay) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: razorpayKey,
      amount: amount * 100, // Amount in paise
      currency: "INR",
      name: "GeoStockLive",
      description: `${plan.name} Plan Subscription`,
      handler: function (response: any) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999"
      },
      theme: {
        color: "#C5A880"
      }
    };

    // @ts-ignore
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <section id="pricing" className="py-24 relative z-10 bg-background-primary border-t border-white/5">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-primary/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12 relative z-10">
        <div className="text-center mb-16">
          <div className="section-label mb-4 text-gold-primary">Pricing</div>
          <h2 className="section-headline mb-4">
            PLANS THAT SCALE WITH YOU
          </h2>
          <p className="body-copy mx-auto">
            Start free, upgrade as your intelligence needs grow. No hidden fees.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm font-medium transition-colors ${!isAnnual ? "text-white" : "text-white/50"}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-7 bg-white/10 rounded-full p-1 border border-white/10 transition-colors hover:bg-white/15"
            >
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className={`w-5 h-5 rounded-full shadow-md ${isAnnual ? "bg-gold-primary ml-auto" : "bg-white/40"}`}
              />
            </button>
            <span className={`text-sm font-medium transition-colors ${isAnnual ? "text-white" : "text-white/50"}`}>
              Annually
            </span>
            {isAnnual && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xs font-mono font-bold text-signal-buy bg-signal-buy/10 px-3 py-1 rounded-full border border-signal-buy/20 ml-2"
              >
                SAVE 20%
              </motion.span>
            )}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            const price = isAnnual ? plan.price.annually : plan.price.monthly;
            const isPopular = plan.badge === 'Most Popular';

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`relative flex flex-col premium-panel p-6 rounded-[2px] transition-all duration-300 ${
                  isPopular ? "border-gold-primary/40 bg-white/[0.04] shadow-[0_0_30px_rgba(197,168,128,0.1)] scale-[1.02]" : ""
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold px-4 py-1 rounded-full bg-gold-primary text-background-primary uppercase tracking-widest">
                    {plan.badge}
                  </div>
                )}

                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-[2px] bg-gradient-to-br flex items-center justify-center ${plan.color}`}>
                    <Icon size={20} className={isPopular ? "text-background-primary" : "text-white"} />
                  </div>
                  <h3 className="text-xl font-display font-medium text-white tracking-tight">{plan.name}</h3>
                </div>

                {/* Price */}
                <div className="mb-4">
                  {price !== null ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-display font-medium text-white tracking-tight">₹{price}</span>
                      <span className="text-white/50 text-sm font-mono uppercase">/mo</span>
                    </div>
                  ) : (
                    <div className="text-3xl font-display font-medium text-white tracking-tight">Custom</div>
                  )}
                </div>

                <p className="text-sm text-white/50 mb-6 leading-relaxed font-sans">{plan.description}</p>

                {/* Features */}
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm font-sans">
                      {f.included ? (
                        <Check size={16} className="text-signal-buy mt-0.5 shrink-0" />
                      ) : (
                        <X size={16} className="text-white/20 mt-0.5 shrink-0" />
                      )}
                      <span className={f.included ? "text-white/80" : "text-white/30"}>{f.text}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button 
                  onClick={() => handleCtaClick(plan)}
                  className={`w-full h-12 rounded-[2px] text-xs font-mono font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center ${plan.ctaStyle}`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
