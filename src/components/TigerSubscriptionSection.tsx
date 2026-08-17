import React, { useState } from "react";
import {
  Crown,
  Zap,
  ShieldCheck,
  Tv,
  Smartphone,
  Laptop,
  Check,
  ChevronDown,
  ChevronUp,
  Headphones,
  Lock,
  ArrowRight
} from "lucide-react";
import { OTTPlan, OTTService } from "../types";
import { TigerLogo } from "./TigerLogo";

export interface TigerSubscriptionSectionProps {
  onSelectPlan: (plan: OTTPlan, service: OTTService) => void;
}

export const QAR_PER_USD = 3.64;

export const TIGER_OTT_SERVICE: OTTService = {
  id: "tiger-ott-master",
  name: "Tiger OTT",
  category: "Streaming",
  tagline: "High-definition streaming pass for Smart TVs, mobile, and web.",
  logo: "https://assets.nflxext.com/ffe/siteui/common/icons/nficon2016.ico",
  brandColor: "#FFE000",
  gradient: "from-neutral-900 via-neutral-900 to-black",
  rating: 4.95,
  reviewsCount: 48900,
  popular: true,
  bestValue: true,
  warranty: "Direct activation with complete term replacement support",
  stockStatus: "Instant Auto-Delivery",
  features: [
    "4K Ultra HD, HDR10 & Dolby Audio playback",
    "Multi-device support: Smart TVs, Android, iOS, Windows, macOS",
    "Private profile with dedicated PIN protection",
    "High-speed CDN routing for zero-buffering playback",
    "Automated instant credentials delivery",
    "Worldwide access with no geo-restrictions",
  ],
  plans: [
    {
      id: "tiger-3m",
      duration: "3 Months",
      price: 7.97,
      currency: "USD",
      originalPrice: 32.99,
      screens: "2 Simultaneous Screens",
      quality: "4K Ultra HD",
      savePercent: 76,
      badge: "Quarterly",
      instantDelivery: true,
    },
    {
      id: "tiger-6m",
      duration: "6 Months",
      price: 13.46,
      currency: "USD",
      originalPrice: 60.99,
      screens: "4 Simultaneous Screens",
      quality: "4K Ultra HD + Dolby Atmos",
      savePercent: 78,
      badge: "Semi-Annual",
      instantDelivery: true,
    },
    {
      id: "tiger-12m",
      duration: "1 Year",
      price: 24.45,
      currency: "USD",
      originalPrice: 115.99,
      screens: "Unlimited Devices",
      quality: "Master 4K UHD",
      savePercent: 79,
      badge: "Annual",
      instantDelivery: true,
    },
    {
      id: "tiger-15m",
      duration: "15 Months",
      price: 27.20,
      currency: "USD",
      originalPrice: 142.99,
      screens: "Unlimited Devices",
      quality: "Master 4K UHD",
      savePercent: 81,
      badge: "Extended",
      instantDelivery: true,
    },
    {
      id: "tiger-24m",
      duration: "24 Months",
      price: 43.95,
      currency: "USD",
      originalPrice: 220.00,
      screens: "Unlimited Devices",
      quality: "Master 4K UHD",
      savePercent: 80,
      badge: "2-Year",
      instantDelivery: true,
    },
    {
      id: "tiger-30m",
      duration: "30 Months",
      price: 49.45,
      currency: "USD",
      originalPrice: 275.00,
      screens: "Unlimited Devices",
      quality: "Master 4K UHD",
      savePercent: 82,
      badge: "Long-Term",
      instantDelivery: true,
    },
  ],
};

const TigerSubscriptionSection: React.FC<TigerSubscriptionSectionProps> = ({
  onSelectPlan,
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>("tiger-12m");
  const [billingCurrency, setBillingCurrency] = useState<"USD" | "QAR">("USD");
  const [showExtendedTiers, setShowExtendedTiers] = useState<boolean>(false);

  const plans = [
    {
      id: "tiger-3m",
      name: "Quarterly Pass",
      period: "3 Months Access",
      duration: "3 Months",
      usdPrice: 7.97,
      qarPrice: 29,
      originalUsd: 32.99,
      originalQar: 120,
      monthlyUsd: "$2.66 / mo",
      monthlyQar: "9.6 QAR / mo",
      discount: "76% Off",
      recommended: false,
      tierBadge: "Standard",
      features: [
        "4K Ultra HD resolution",
        "2 concurrent streams",
        "Standard high-speed CDN",
        "Standard replacement warranty",
      ],
      planData: TIGER_OTT_SERVICE.plans[0],
    },
    {
      id: "tiger-6m",
      name: "Semi-Annual Pass",
      period: "6 Months Access",
      duration: "6 Months",
      usdPrice: 13.46,
      qarPrice: 49,
      originalUsd: 60.99,
      originalQar: 220,
      monthlyUsd: "$2.24 / mo",
      monthlyQar: "8.1 QAR / mo",
      discount: "78% Off",
      recommended: false,
      tierBadge: "Popular",
      features: [
        "4K Ultra HD & Dolby Atmos",
        "4 concurrent streams",
        "Priority CDN routing",
        "Standard replacement warranty",
      ],
      planData: TIGER_OTT_SERVICE.plans[1],
    },
    {
      id: "tiger-12m",
      name: "Annual Membership",
      period: "12 Months Access",
      duration: "1 Year",
      usdPrice: 24.45,
      qarPrice: 89,
      originalUsd: 115.99,
      originalQar: 420,
      monthlyUsd: "$2.04 / mo",
      monthlyQar: "7.4 QAR / mo",
      discount: "79% Off",
      recommended: true,
      tierBadge: "Most Recommended",
      features: [
        "Master 4K UHD & HDR10+",
        "Multi-device streaming",
        "Private profile with PIN lock",
        "Full 365-day replacement warranty",
      ],
      planData: TIGER_OTT_SERVICE.plans[2],
    },
    {
      id: "tiger-15m",
      name: "Extended 15M",
      period: "15 Months Access",
      duration: "15 Months",
      usdPrice: 27.20,
      qarPrice: 99,
      originalUsd: 142.99,
      originalQar: 520,
      monthlyUsd: "$1.81 / mo",
      monthlyQar: "6.6 QAR / mo",
      discount: "81% Off",
      recommended: false,
      tierBadge: "Value Tier",
      features: [
        "Master 4K UHD playback",
        "Multi-device streaming",
        "Offline playback compatible",
        "Full 15-month replacement support",
      ],
      planData: TIGER_OTT_SERVICE.plans[3],
    },
    {
      id: "tiger-24m",
      name: "2-Year Plan",
      period: "24 Months Access",
      duration: "24 Months",
      usdPrice: 43.95,
      qarPrice: 160,
      originalUsd: 220.00,
      originalQar: 800,
      monthlyUsd: "$1.83 / mo",
      monthlyQar: "6.6 QAR / mo",
      discount: "80% Off",
      recommended: false,
      tierBadge: "Multi-Year",
      features: [
        "High-bitrate 4K streams",
        "Unlimited home devices",
        "Priority customer support",
        "2-year warranty coverage",
      ],
      planData: TIGER_OTT_SERVICE.plans[4],
    },
    {
      id: "tiger-30m",
      name: "30-Month Membership",
      period: "30 Months Access",
      duration: "30 Months",
      usdPrice: 49.45,
      qarPrice: 180,
      originalUsd: 275.00,
      originalQar: 1000,
      monthlyUsd: "$1.65 / mo",
      monthlyQar: "6.0 QAR / mo",
      discount: "82% Off",
      recommended: false,
      tierBadge: "Maximum Term",
      features: [
        "Master 4K UHD VIP routing",
        "Lowest effective monthly rate",
        "Private profile security",
        "Full 30-month term protection",
      ],
      planData: TIGER_OTT_SERVICE.plans[5],
    },
  ];

  const visiblePlans = showExtendedTiers ? plans : plans.slice(0, 3);

  return (
    <section
      id="tiger-ott-subscription"
      className="w-full my-6 sm:my-10"
      aria-label="Subscription Plans"
    >
      <div className="w-full bg-[#111113] py-10 sm:py-14 lg:py-16 px-4 sm:px-8 md:px-12 lg:px-16 shadow-2xl">
        <div className="w-full max-w-7xl mx-auto">
          {/* Header Block */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <div className="mb-4">
              <TigerLogo size="lg" glow={false} />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-2.5">
              Select Your Subscription Plan
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-xl">
              Direct account activations in 4K Ultra HD. Choose a duration to proceed to instant checkout.
            </p>

            {/* Currency Selector */}
            <div className="mt-6 flex items-center bg-[#1a1a1e] p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setBillingCurrency("USD")}
                className={`px-4 sm:px-5 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  billingCurrency === "USD"
                    ? "bg-[#27272c] text-white"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                USD ($)
              </button>
              <button
                type="button"
                onClick={() => setBillingCurrency("QAR")}
                className={`px-4 sm:px-5 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  billingCurrency === "QAR"
                    ? "bg-[#27272c] text-white"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                QAR (1 USD = 3.64 QAR)
              </button>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
            {visiblePlans.map((plan) => {
              const isSelected = selectedPlanId === plan.id;
              const price =
                billingCurrency === "USD"
                  ? `$${plan.usdPrice.toFixed(2)}`
                  : `${plan.qarPrice} QAR`;
              const originalPrice =
                billingCurrency === "USD"
                  ? `$${plan.originalUsd.toFixed(2)}`
                  : `${plan.originalQar} QAR`;
              const monthlyRate =
                billingCurrency === "USD" ? plan.monthlyUsd : plan.monthlyQar;

              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-colors cursor-pointer ${
                    plan.recommended
                      ? "bg-[#18181c]"
                      : "bg-[#141416] hover:bg-[#18181c]"
                  }`}
                >
                  <div>
                    {/* Top Meta */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                        {plan.tierBadge}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded">
                        {plan.discount}
                      </span>
                    </div>

                    {/* Plan Name & Period */}
                    <h3 className="text-xl font-bold text-white mb-0.5">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-neutral-400 mb-4">{plan.period}</p>

                    {/* Pricing */}
                    <div className="mb-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                          {price}
                        </span>
                        <span className="text-xs text-neutral-500 line-through">
                          {originalPrice}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-neutral-400 mt-0.5">
                        {monthlyRate}
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-neutral-800/80 my-4" />

                    {/* Features List */}
                    <ul className="space-y-2.5 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action CTA */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectPlan(plan.planData, TIGER_OTT_SERVICE);
                    }}
                    className={`w-full py-3 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                      plan.recommended
                        ? "bg-[#FFE000] text-black hover:bg-[#ebd000]"
                        : "bg-[#25252a] text-white hover:bg-[#303036]"
                    }`}
                  >
                    <span>Select {plan.duration}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* View All Tiers Toggle */}
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowExtendedTiers((prev) => !prev)}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>
                {showExtendedTiers ? "Show Fewer Tiers" : "View All Subscription Tiers"}
              </span>
              {showExtendedTiers ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Technical Specifications & Guarantees */}
          <div className="mt-10 pt-6 border-t border-neutral-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-neutral-400">
            <div className="flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-neutral-300 flex-shrink-0" />
              <span>Instant credentials dispatch post-confirmation</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-neutral-300 flex-shrink-0" />
              <span>Full-term replacement warranty & support</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Tv className="w-4 h-4 text-neutral-300 flex-shrink-0" />
              <span>Compatible with Smart TVs, Mobile, and Web</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TigerSubscriptionSection;
