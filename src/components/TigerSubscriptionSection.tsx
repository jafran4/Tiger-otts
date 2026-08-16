import React, { useState } from "react";
import {
  Crown,
  Check,
  Zap,
  ShieldCheck,
  Tv,
  Smartphone,
  Laptop,
  Flame,
  Star,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  Lock,
  Headphones
} from "lucide-react";
import { OTTPlan, OTTService } from "../types";

export interface TigerSubscriptionSectionProps {
  onSelectPlan: (plan: OTTPlan, service: OTTService) => void;
}

export const QAR_PER_USD = 3.64;

export const TIGER_OTT_SERVICE: OTTService = {
  id: "tiger-ott-master",
  name: "Tiger OTT VIP",
  category: "Streaming",
  tagline: "World's #1 OTT Streaming Service • 4K UHD, All Devices, No Screen Lock",
  logo: "https://assets.nflxext.com/ffe/siteui/common/icons/nficon2016.ico",
  brandColor: "#E50914",
  gradient: "from-red-950/80 via-neutral-900 to-black",
  rating: 4.99,
  reviewsCount: 48900,
  popular: true,
  bestValue: true,
  warranty: "Full Term 100% Replacement Guarantee",
  stockStatus: "Instant Auto-Delivery",
  features: [
    "4K Ultra HD + HDR10 + Dolby Vision Support",
    "Works on Smart TVs, Android/iOS, Firestick, PC & Consoles",
    "Private PIN-Protected Screen & Profile",
    "Zero Buffering VIP Dedicated High-Speed CDN",
    "Instant Auto-Delivery via Email & Screen Notification",
    "100% Ban-Proof Worldwide Coverage (No VPN Needed)",
  ],
  plans: [
    {
      id: "tiger-3m",
      duration: "3 Months",
      price: 7.97, // 29 QAR
      currency: "USD",
      originalPrice: 32.99,
      screens: "2 Devices Simultaneous Watching",
      quality: "4K Ultra HD + HDR10",
      savePercent: 76,
      badge: "Starter",
      instantDelivery: true,
    },
    {
      id: "tiger-6m",
      duration: "6 Months",
      price: 13.46, // 49 QAR
      currency: "USD",
      originalPrice: 60.99,
      screens: "4 Devices Simultaneous (Family Share)",
      quality: "4K Ultra HD + Dolby Atmos",
      savePercent: 78,
      badge: "Most Popular",
      instantDelivery: true,
    },
    {
      id: "tiger-12m",
      duration: "1 Year",
      price: 24.45, // 89 QAR
      currency: "USD",
      originalPrice: 115.99,
      screens: "Unlimited Devices & VIP Server",
      quality: "Master 4K Dolby Vision + 8K Ready",
      savePercent: 79,
      badge: "Best Value • 1 Year",
      instantDelivery: true,
    },
    {
      id: "tiger-15m",
      duration: "15 Months",
      price: 27.20, // 99 QAR
      currency: "USD",
      originalPrice: 142.99,
      screens: "Unlimited Devices + Private PIN",
      quality: "Master 4K Dolby Vision + 8K Ready",
      savePercent: 81,
      badge: "Super Saver",
      instantDelivery: true,
    },
    {
      id: "tiger-24m",
      duration: "24 Months",
      price: 43.95, // 160 QAR
      currency: "USD",
      originalPrice: 220.00,
      screens: "Unlimited Multi-Screen Family Pack",
      quality: "Master 4K Dolby Vision + 8K Ready",
      savePercent: 80,
      badge: "2 Years Ultra",
      instantDelivery: true,
    },
    {
      id: "tiger-30m",
      duration: "30 Months",
      price: 49.45, // 180 QAR
      currency: "USD",
      originalPrice: 275.00,
      screens: "VIP Lifetime Dedicated Cluster",
      quality: "Master 4K Dolby Vision + 8K Ready",
      savePercent: 82,
      badge: "👑 Max Savings • 2.5 Yrs",
      instantDelivery: true,
    },
  ],
};

const TigerSubscriptionSection: React.FC<TigerSubscriptionSectionProps> = ({
  onSelectPlan,
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>("tiger-6m");
  const [currencyMode, setCurrencyMode] = useState<"USD" | "QAR">("USD");

  const plans = [
    {
      id: "tiger-3m",
      title: "3 Months",
      durationLabel: "3 Months",
      usdPrice: 7.97,
      qarPrice: 29,
      originalUsd: 32.99,
      originalQar: 120,
      monthlyUsd: "$2.66 / mo",
      monthlyQar: "9.6 QAR / mo",
      saveBadge: "SAVE 76%",
      popular: false,
      isBestValue: false,
      tag: "Starter Pack",
      features: [
        "4K Ultra HD & HDR10 Streaming",
        "2 Screens Simultaneous Playback",
        "Zero-Buffering High-Speed CDN",
        "100% Replacement Warranty",
      ],
      planData: TIGER_OTT_SERVICE.plans[0],
    },
    {
      id: "tiger-6m",
      title: "6 Months",
      durationLabel: "6 Months",
      usdPrice: 13.46,
      qarPrice: 49,
      originalUsd: 60.99,
      originalQar: 220,
      monthlyUsd: "$2.24 / mo",
      monthlyQar: "8.1 QAR / mo",
      saveBadge: "SAVE 78%",
      popular: true,
      isBestValue: false,
      tag: "⭐ Most Popular",
      features: [
        "4K Ultra HD + Dolby Atmos Sound",
        "4 Screens Simultaneous (Family)",
        "Zero-Buffering VIP CDN Server",
        "Full Replacement Warranty",
      ],
      planData: TIGER_OTT_SERVICE.plans[1],
    },
    {
      id: "tiger-12m",
      title: "1 Year (12 Mo)",
      durationLabel: "1 Year",
      usdPrice: 24.45,
      qarPrice: 89,
      originalUsd: 115.99,
      originalQar: 420,
      monthlyUsd: "$2.04 / mo",
      monthlyQar: "7.4 QAR / mo",
      saveBadge: "SAVE 79%",
      popular: false,
      isBestValue: true,
      tag: "👑 Best Value",
      features: [
        "Master 4K Dolby Vision + 8K Ready",
        "Unlimited Connected Devices",
        "Private Profile + Lock PIN",
        "Full 365-Day 100% Guarantee",
      ],
      planData: TIGER_OTT_SERVICE.plans[2],
    },
    {
      id: "tiger-15m",
      title: "15 Months",
      durationLabel: "15 Months",
      usdPrice: 27.20,
      qarPrice: 99,
      originalUsd: 142.99,
      originalQar: 520,
      monthlyUsd: "$1.81 / mo",
      monthlyQar: "6.6 QAR / mo",
      saveBadge: "SAVE 81%",
      popular: false,
      isBestValue: false,
      isHotDeal: true,
      tag: "🔥 Super Saver",
      features: [
        "Master 4K Dolby Vision Streaming",
        "Unlimited Devices + Offline Downloads",
        "All Live PPV, Sports & Premieres",
        "15 Months Guarantee Protected",
      ],
      planData: TIGER_OTT_SERVICE.plans[3],
    },
    {
      id: "tiger-24m",
      title: "24 Months (2 Yrs)",
      durationLabel: "24 Months",
      usdPrice: 43.95,
      qarPrice: 160,
      originalUsd: 220.00,
      originalQar: 800,
      monthlyUsd: "$1.83 / mo",
      monthlyQar: "6.6 QAR / mo",
      saveBadge: "SAVE 80%",
      popular: false,
      isBestValue: false,
      tag: "💎 Multi-Year Ultra",
      features: [
        "Master 4K HDR & High-Speed Bitrate",
        "Unlimited Family Devices Everywhere",
        "VIP Concierge Support & Priority",
        "2 Full Years Replacement Shield",
      ],
      planData: TIGER_OTT_SERVICE.plans[4],
    },
    {
      id: "tiger-30m",
      title: "30 Months (2.5 Yrs)",
      durationLabel: "30 Months",
      usdPrice: 49.45,
      qarPrice: 180,
      originalUsd: 275.00,
      originalQar: 1000,
      monthlyUsd: "$1.65 / mo",
      monthlyQar: "6.0 QAR / mo",
      saveBadge: "SAVE 82%",
      popular: false,
      isBestValue: false,
      isUltimate: true,
      tag: "🏆 Maximum Savings",
      features: [
        "Master 4K Dolby Vision VIP Line",
        "Lowest Monthly Rate ($1.65 / mo)",
        "Unlimited Devices + Dedicated PIN",
        "30 Months 100% Uninterrupted Term",
      ],
      planData: TIGER_OTT_SERVICE.plans[5],
    },
  ];

  return (
    <section
      id="tiger-ott-subscription"
      className="relative z-20 w-full max-w-6xl mx-auto px-3 sm:px-6 md:px-8 my-4 sm:my-6 md:my-8"
    >
      {/* Background Container */}
      <div className="relative rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#180a0b]/95 via-[#121212] to-[#0f0f0f] border border-red-900/30 p-4 sm:p-6 md:p-8 shadow-[0_10px_35px_rgba(229,9,20,0.12)] overflow-hidden">
        {/* Background ambient light */}
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 text-center max-w-2xl mx-auto mb-5 sm:mb-7">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-red-950/60 border border-amber-500/40 text-amber-300 text-[11px] sm:text-xs font-bold tracking-wide uppercase shadow-sm mb-2.5">
            <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>World's #1 OTT Service</span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug mb-2">
            We Provide the <span className="text-[#E50914]">No. #1 OTT Service</span> in the World
          </h2>

          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto">
            Select your preferred subscription duration below for instant 4K Ultra HD streaming on all devices.
          </p>

          {/* Currency Toggle Switch (USD as Main Currency) */}
          <div className="mt-3.5 inline-flex items-center p-1 rounded-full bg-neutral-900/90 border border-neutral-700/80 shadow-inner">
            <button
              onClick={() => setCurrencyMode("USD")}
              className={`px-3 sm:px-4 py-1 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                currencyMode === "USD"
                  ? "bg-[#E50914] text-white shadow-md"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              🇺🇸 USD ($) <span className="text-[10px] font-normal opacity-80">(Main Currency)</span>
            </button>
            <button
              onClick={() => setCurrencyMode("QAR")}
              className={`px-3 sm:px-4 py-1 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                currencyMode === "QAR"
                  ? "bg-amber-500 text-black font-extrabold shadow-md"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              🇶🇦 QAR (1 $ = 3.64 QAR)
            </button>
          </div>

          {/* Quick trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-3 text-[11px] sm:text-xs text-neutral-300">
            <div className="flex items-center space-x-1 bg-black/50 px-2.5 py-1 rounded-full border border-neutral-800">
              <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span>Instant 30s Delivery</span>
            </div>
            <div className="flex items-center space-x-1 bg-black/50 px-2.5 py-1 rounded-full border border-neutral-800">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>100% Replacement Warranty</span>
            </div>
            <div className="flex items-center space-x-1 bg-black/50 px-2.5 py-1 rounded-full border border-neutral-800">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span>4.99/5 Rating (50k+ Users)</span>
            </div>
          </div>
        </div>

        {/* 6 Subscription Cards Grid (2 per row on mobile, 3 per row on tablet/desktop) */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-4.5 items-stretch">
          {plans.map((plan) => {
            const isSelected = selectedPlanId === plan.id;
            const primaryPriceDisplay =
              currencyMode === "USD" ? `$${plan.usdPrice.toFixed(2)}` : `${plan.qarPrice} QAR`;
            const primaryOriginalDisplay =
              currencyMode === "USD" ? `$${plan.originalUsd.toFixed(2)}` : `${plan.originalQar} QAR`;
            const secondaryEquivalent =
              currencyMode === "USD"
                ? `≈ ${plan.qarPrice} QAR`
                : `≈ $${plan.usdPrice.toFixed(2)}`;
            const monthlyDisplay =
              currencyMode === "USD" ? plan.monthlyUsd : plan.monthlyQar;

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`relative rounded-lg sm:rounded-xl flex flex-col justify-between p-2.5 sm:p-3.5 md:p-4.5 transition-all duration-200 cursor-pointer ${
                  plan.popular
                    ? "bg-gradient-to-b from-[#240c0e] via-[#160d0f] to-[#101010] border-2 border-red-500/90 shadow-[0_0_20px_rgba(229,9,20,0.25)] md:-translate-y-0.5"
                    : plan.isBestValue
                    ? "bg-gradient-to-b from-[#1f1407] via-[#14100c] to-[#101010] border-2 border-amber-500/70 shadow-[0_0_18px_rgba(245,158,11,0.18)]"
                    : plan.isUltimate
                    ? "bg-gradient-to-b from-[#1a1205] via-[#120f0a] to-[#101010] border-2 border-amber-400/60 shadow-[0_0_18px_rgba(251,191,36,0.15)]"
                    : plan.isHotDeal
                    ? "bg-gradient-to-b from-[#1c0e18] via-[#130d12] to-[#101010] border border-fuchsia-600/50 hover:border-fuchsia-500"
                    : "bg-[#161616]/90 border border-neutral-800 hover:border-neutral-700"
                }`}
              >
                {/* Top Badge */}
                {plan.popular ? (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-600 to-[#E50914] text-white text-[8px] sm:text-[10px] font-black uppercase tracking-wider px-2 sm:px-3 py-0.5 rounded-full shadow-md flex items-center space-x-1 whitespace-nowrap">
                    <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-white" />
                    <span>Most Popular</span>
                  </div>
                ) : plan.isBestValue ? (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-600 text-black text-[8px] sm:text-[10px] font-black uppercase tracking-wider px-2 sm:px-3 py-0.5 rounded-full shadow-md flex items-center space-x-1 whitespace-nowrap">
                    <Crown className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-black" />
                    <span>Best Value</span>
                  </div>
                ) : plan.isUltimate ? (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-black text-[8px] sm:text-[10px] font-black uppercase tracking-wider px-2 sm:px-3 py-0.5 rounded-full shadow-md flex items-center space-x-1 whitespace-nowrap">
                    <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-black" />
                    <span>Lowest Rate</span>
                  </div>
                ) : null}

                <div>
                  <div className="flex items-center justify-between mb-1 pt-0.5">
                    <span className="text-[9px] sm:text-[11px] font-semibold text-neutral-400 truncate max-w-[55%]">
                      {plan.tag}
                    </span>
                    <span className="px-1.5 sm:px-2 py-0.5 rounded-full text-[8px] sm:text-[10px] font-black bg-red-950/70 text-red-400 border border-red-800/40 whitespace-nowrap">
                      {plan.saveBadge}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-1 truncate">
                    {plan.title}
                  </h3>

                  {/* Main Price (USD by default) */}
                  <div className="flex items-baseline space-x-1.5 mb-0.5">
                    <span className="text-lg sm:text-2xl md:text-3xl font-black text-white tracking-tight">
                      {primaryPriceDisplay}
                    </span>
                    <span className="text-[10px] sm:text-xs text-neutral-500 line-through">
                      {primaryOriginalDisplay}
                    </span>
                  </div>

                  {/* Dual Currency Conversion Sub-label (1 USD = 3.64 QAR) */}
                  <div className="flex flex-wrap items-center justify-between gap-1 text-[9px] sm:text-[11px] mb-1.5">
                    <span className="text-amber-400 font-medium whitespace-nowrap">
                      {monthlyDisplay}
                    </span>
                    <span className="text-neutral-300 font-mono text-[8px] sm:text-[10px] bg-white/5 px-1 py-0.5 rounded border border-white/10 whitespace-nowrap">
                      {secondaryEquivalent}
                    </span>
                  </div>

                  <div className="w-full h-px bg-neutral-800/80 my-1.5" />

                  {/* Feature Checklist */}
                  <ul className="space-y-1 sm:space-y-1.5 text-[10px] sm:text-xs text-neutral-300 mb-2.5 sm:mb-3.5">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-1 sm:space-x-1.5">
                        <CheckCircle2
                          className={`w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0 mt-0.5 ${
                            plan.popular
                              ? "text-red-400"
                              : plan.isBestValue || plan.isUltimate
                              ? "text-amber-400"
                              : "text-emerald-400"
                          }`}
                        />
                        <span className="leading-tight text-[10px] sm:text-xs line-clamp-2">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Subscribe Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPlan(plan.planData, TIGER_OTT_SERVICE);
                  }}
                  className={`w-full py-2 sm:py-2.5 px-2 sm:px-3 rounded-lg font-bold text-[11px] sm:text-xs tracking-wide transition-all duration-200 flex items-center justify-center space-x-1 cursor-pointer shadow-md min-h-[36px] sm:min-h-[42px] ${
                    plan.popular
                      ? "bg-[#E50914] hover:bg-red-700 text-white shadow-red-950/50"
                      : plan.isBestValue || plan.isUltimate
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-black font-extrabold"
                      : "bg-white hover:bg-neutral-200 text-black"
                  }`}
                >
                  <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                  <span className="truncate">Get {plan.durationLabel}</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 hidden sm:inline-block" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer info bar */}
        <div className="relative z-10 mt-4 sm:mt-5 pt-3 border-t border-neutral-800/60 flex flex-wrap items-center justify-between gap-2 text-[11px] text-neutral-400">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <span className="text-neutral-400">Supported:</span>
            <div className="flex items-center space-x-2 text-neutral-300">
              <span className="flex items-center space-x-0.5">
                <Tv className="w-3.5 h-3.5 text-neutral-400" />
                <span>Smart TVs</span>
              </span>
              <span className="flex items-center space-x-0.5">
                <Smartphone className="w-3.5 h-3.5 text-neutral-400" />
                <span>Mobile</span>
              </span>
              <span className="flex items-center space-x-0.5">
                <Laptop className="w-3.5 h-3.5 text-neutral-400" />
                <span>PC/Mac</span>
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-1 text-neutral-400">
            <Lock className="w-3 h-3 text-emerald-400" />
            <span>256-Bit SSL Instant Delivery</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TigerSubscriptionSection;
