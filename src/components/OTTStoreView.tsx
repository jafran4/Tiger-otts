import React, { useState } from "react";
import {
  Crown,
  Zap,
  ShieldCheck,
  Star,
  Check,
  ArrowRight,
  Sparkles,
  Users,
  Flame,
  Globe2,
  Clock,
  MessageCircle,
  HelpCircle,
  TrendingUp,
  Tag,
  Gift
} from "lucide-react";
import {
  OTT_SERVICES,
  CUSTOMER_REVIEWS,
  TRUST_STATS,
  SELLER_GUARANTEES,
} from "../data/ottData";
import { OTTService, OTTPlan } from "../types";
import { TigerLogo } from "./TigerLogo";

interface OTTStoreViewProps {
  onSelectPlanForCheckout: (service: OTTService, plan: OTTPlan) => void;
  onOpenResellerPortal: () => void;
}

const OTTStoreView: React.FC<OTTStoreViewProps> = ({
  onSelectPlanForCheckout,
  onOpenResellerPortal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedPlanMap, setSelectedPlanMap] = useState<Record<string, number>>({});

  const categories = ["All", "Streaming", "Bundle", "Music", "Anime", "Live TV"];

  const filteredServices = OTT_SERVICES.filter((svc) => {
    if (selectedCategory === "All") return true;
    return svc.category === selectedCategory;
  });

  const getActivePlanIndex = (serviceId: string) => {
    return selectedPlanMap[serviceId] || 0;
  };

  const setPlanIndex = (serviceId: string, index: number) => {
    setSelectedPlanMap((prev) => ({ ...prev, [serviceId]: index }));
  };

  return (
    <div id="ott-store-main-view" className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 pt-24 pb-20 animate-fadeIn">
      {/* 👑 Hero Title & Trust Header */}
      <div className="relative text-center mb-12 sm:mb-16 space-y-4">
        <div className="flex justify-center mb-2">
          <TigerLogo size="xl" glow className="hover:scale-105 transition-transform duration-300" />
        </div>

        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-gradient-to-r from-red-600/20 via-amber-500/20 to-red-600/20 border border-amber-400/40 rounded-full text-amber-300 text-xs sm:text-sm font-black uppercase tracking-widest shadow-lg">
          <Crown className="w-4 h-4 text-amber-400 fill-amber-400 animate-bounce" />
          <span>Official Store of World's Number #1 OTT Seller</span>
          <Crown className="w-4 h-4 text-amber-400 fill-amber-400 animate-bounce" />
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
          Premium OTT Subscriptions at{" "}
          <span className="bg-gradient-to-r from-[#E50914] via-amber-400 to-[#E50914] bg-clip-text text-transparent">
            Up to 90% Discount
          </span>
        </h1>

        <p className="text-neutral-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto font-normal leading-relaxed">
          Over <strong>250,000+ happy customers worldwide</strong> trust us for instant 4K Ultra HD Netflix, Amazon Prime Video, Disney+, Max, Spotify, YouTube Premium and Live IPTV accounts with <strong>100% Replacement Warranty</strong>.
        </p>

        {/* Live Trust Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-4">
          {TRUST_STATS.map((stat, idx) => (
            <div
              key={idx}
              className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-3 sm:p-4 text-center backdrop-blur-sm"
            >
              <div className="text-lg sm:text-2xl font-extrabold text-white">
                {stat.value}
              </div>
              <div className="text-[11px] sm:text-xs text-neutral-400 font-medium mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Pills & Filters */}
      <div className="flex items-center justify-center space-x-2 sm:space-x-3 overflow-x-auto pb-4 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition duration-200 cursor-pointer whitespace-nowrap ${
              selectedCategory === cat
                ? "bg-[#E50914] text-white shadow-lg shadow-red-600/30 scale-105"
                : "bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800"
            }`}
          >
            {cat === "All" && "🌟 All Subscriptions"}
            {cat === "Streaming" && "🎬 Video Streaming"}
            {cat === "Bundle" && "👑 Mega VIP Bundles (Save 91%)"}
            {cat === "Music" && "🎵 Music Streaming"}
            {cat === "Anime" && "⛩️ Anime Uncut"}
            {cat === "Live TV" && "📡 Live 4K IPTV"}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredServices.map((service) => {
          const activeIndex = getActivePlanIndex(service.id);
          const activePlan = service.plans[activeIndex] || service.plans[0];

          return (
            <div
              key={service.id}
              className={`relative bg-[#181818] border rounded-2xl overflow-hidden flex flex-col justify-between transition duration-300 hover:border-neutral-500 hover:shadow-2xl ${
                service.popular
                  ? "border-[#E50914]/80 shadow-red-950/30 ring-1 ring-[#E50914]/40"
                  : "border-neutral-800"
              }`}
            >
              {/* Card Header with Brand Colors */}
              <div className={`p-5 bg-gradient-to-br ${service.gradient} border-b border-white/5`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-lg text-white shadow-lg border border-white/20"
                      style={{ backgroundColor: service.brandColor }}
                    >
                      {service.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-white leading-tight">
                        {service.name}
                      </h3>
                      <div className="flex items-center space-x-1.5 text-xs text-amber-400 font-bold mt-0.5">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{service.rating}</span>
                        <span className="text-neutral-400 font-normal">
                          ({service.reviewsCount.toLocaleString()} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  {service.popular && (
                    <span className="px-2.5 py-1 bg-[#E50914] text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-md">
                      Hot Seller
                    </span>
                  )}
                </div>

                <p className="text-xs text-neutral-300 mt-3 line-clamp-2 leading-relaxed">
                  {service.tagline}
                </p>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-5">
                {/* Duration Selectors */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 flex items-center justify-between">
                    <span>Select Duration & Plan:</span>
                    <span className="text-emerald-400 text-[10px]">
                      {service.stockStatus}
                    </span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                    {service.plans.map((p, idx) => (
                      <button
                        key={p.id}
                        onClick={() => setPlanIndex(service.id, idx)}
                        className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition ${
                          idx === activeIndex
                            ? "bg-[#E50914] border-[#E50914] text-white font-bold shadow-md"
                            : "bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-600"
                        }`}
                      >
                        <div>{p.duration}</div>
                        <div className="text-[10px] opacity-90">${p.price}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Display */}
                <div className="bg-neutral-900/90 border border-neutral-800/80 rounded-xl p-3.5 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-neutral-400 block">
                      {activePlan.screens}
                    </span>
                    <span className="text-xs font-semibold text-neutral-200">
                      {activePlan.quality}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-neutral-500 line-through block">
                      ${activePlan.originalPrice.toFixed(2)}
                    </span>
                    <div className="text-2xl font-black text-white leading-none">
                      ${activePlan.price}
                    </div>
                    <span className="text-[10px] font-bold text-amber-400">
                      Save {activePlan.savePercent}%
                    </span>
                  </div>
                </div>

                {/* Feature Checklist */}
                <div className="space-y-1.5 text-xs text-neutral-300">
                  {service.features.map((feat, i) => (
                    <div key={i} className="flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Warranty & Buy CTA */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center space-x-1.5 text-[11px] text-neutral-400 justify-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{service.warranty}</span>
                  </div>

                  <button
                    onClick={() => onSelectPlanForCheckout(service, activePlan)}
                    className="w-full py-3 bg-[#E50914] hover:bg-[#b80710] text-white font-extrabold rounded-xl text-sm transition-all duration-200 shadow-xl hover:shadow-red-600/30 flex items-center justify-center space-x-2 group cursor-pointer"
                  >
                    <Zap className="w-4 h-4 fill-white" />
                    <span>Instant Buy for ${activePlan.price}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 🛡️ Why We Are World's #1 OTT Seller */}
      <section className="mt-20 pt-12 border-t border-neutral-800">
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#E50914]">
            Trust & Security Guarantees
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Why We Are The World's #1 OTT Seller
          </h2>
          <p className="text-neutral-400 text-sm max-w-2xl mx-auto">
            We operate automated server clusters to deliver genuine, ban-proof streaming profiles in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SELLER_GUARANTEES.map((item, idx) => (
            <div
              key={idx}
              className="bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-5 space-y-3 hover:border-neutral-700 transition"
            >
              <div className="w-10 h-10 rounded-xl bg-red-600/20 text-[#E50914] flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">{item.title}</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 💬 Verified Buyer Testimonials */}
      <section className="mt-20 pt-12 border-t border-neutral-800">
        <div className="text-center mb-10 space-y-2">
          <div className="flex items-center justify-center space-x-1 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400" />
            ))}
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Loved by 250,000+ Streamers Worldwide
          </h2>
          <p className="text-neutral-400 text-sm">
            Read real feedback from verified customers around the globe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CUSTOMER_REVIEWS.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-1 text-amber-400">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-neutral-300 italic leading-relaxed">
                  "{review.comment}"
                </p>
              </div>

              <div className="flex items-center space-x-3 pt-3 border-t border-neutral-800/80">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-9 h-9 rounded-full object-cover border border-neutral-700"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs font-bold text-white truncate">
                      {review.name}
                    </span>
                    <span>{review.countryFlag}</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold block truncate">
                    ✓ Verified: {review.servicePurchased}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 💼 Wholesaler & Reseller CTA Banner */}
      <section className="mt-20 bg-gradient-to-r from-neutral-900 via-red-950/60 to-neutral-900 border border-red-500/30 rounded-3xl p-8 sm:p-12 text-center space-y-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-black uppercase">
          <span>💼 Bulk Resellers & Wholesale Dealers</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white max-w-2xl mx-auto">
          Start Your Own OTT Subscription Business Today
        </h2>
        <p className="text-neutral-300 text-sm max-w-xl mx-auto">
          Get wholesale pricing up to <strong>55% extra discount</strong>, automated Telegram Bot API provisioning, white-label portals, and 24/7 dedicated distributor support.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onOpenResellerPortal}
            className="px-8 py-3.5 bg-white hover:bg-neutral-200 text-black font-extrabold text-sm rounded-xl transition shadow-xl hover:scale-105 cursor-pointer"
          >
            Open Reseller Wholesale Panel
          </button>
          <a
            href="https://wa.me/?text=Hello%2C%20I%20want%20to%20become%20an%20OTT%20Reseller"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/40 font-bold text-sm rounded-xl transition flex items-center space-x-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat with Reseller Manager</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default OTTStoreView;
