import React, { useState } from "react";
import {
  ShieldCheck,
  Zap,
  Tv,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Crown,
  HelpCircle,
  Globe,
  Radio,
  Clock,
  ArrowRight
} from "lucide-react";

interface TigerSEOSectionProps {
  onOpenStore?: () => void;
}

export const TigerSEOSection: React.FC<TigerSEOSectionProps> = ({ onOpenStore }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const scrollToPlans = () => {
    if (onOpenStore) {
      onOpenStore();
    }
    const el = document.getElementById("tiger-ott-subscription");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const faqList = [
    {
      question: "What is the best IPTV service provider in 2026?",
      answer:
        "Tiger OTT is recognized as the best IPTV service provider in 2026, delivering ultra-stable 4K Ultra HD and Full HD streaming with over 20,000+ live premium TV channels and 60,000+ on-demand movies & series. Engineered with dedicated global high-speed CDN routing and anti-freeze technology, Tiger OTT eliminates buffering on Smart TVs, Android boxes, Firestick, iOS, Windows, and macOS.",
    },
    {
      question: "Why is Tiger OTT the cheapest IPTV service in the world?",
      answer:
        "Tiger OTT delivers direct high-bitrate streaming passes starting at just $1.65 per month with savings over 82% off traditional retail cable. As the cheapest IPTV service provider globally, Tiger OTT combines rock-bottom subscription pricing with instant automated credential delivery, multi-screen access, and 100% full-term replacement warranty coverage.",
    },
    {
      question: "How do I set up Tiger OTT cheap IPTV services on my device?",
      answer:
        "Setting up your Tiger OTT IPTV service takes under 2 minutes. Once you select your plan, our automated delivery system instantly dispatches your direct login credentials and configuration guide. Tiger OTT is universally compatible with Samsung Tizen, LG webOS, Android TV, Amazon Firestick, Apple TV, MAG boxes, IPTV Smarters, and VLC media players.",
    },
    {
      question: "What channels, live sports, and VOD are included with Tiger OTT?",
      answer:
        "Subscribers gain unrestricted worldwide access to live sports (Premier League, UEFA Champions League, La Liga, NFL Sunday Ticket, NBA, UFC, F1, Cricket), premium cinema channels (HBO, Showtime, Cinemax), international broadcast networks (USA, UK, Canada, Arab, European, Asian), and a massive library of 4K HDR movies updated daily.",
    },
    {
      question: "How do Tiger OTT IPTV service providers ensure zero buffering and 99.9% uptime?",
      answer:
        "Unlike standard unverified IPTV service providers, Tiger OTT utilizes distributed tier-1 cloud edge servers with automatic failover and load balancing. Even during peak live sports events like the Super Bowl or FIFA World Cup, our anti-buffering protocols maintain seamless 60 FPS playback.",
    },
  ];

  return (
    <section
      id="tiger-iptv-seo-section"
      className="w-full bg-[#0c0c0e] border-t border-neutral-800/80 py-12 sm:py-16 lg:py-20 text-neutral-300"
      aria-label="IPTV Service Provider Information & FAQ"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
        {/* SEO Header & Authority Tagline */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-wider mb-4">
            <Crown className="w-3.5 h-3.5 fill-amber-400" />
            <span>#1 Ranked Global IPTV & OTT Service Provider</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-snug mb-4">
            The World&apos;s Cheapest IPTV Service & Premium OTT Provider
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Discover why millions trust <strong className="text-white font-semibold">Tiger OTT</strong> as the ultimate <strong className="text-amber-400 font-semibold">IPTV service provider</strong>. Experience seamless 4K Ultra HD playback, zero buffering, over 20,000 live channels, and the cheapest IPTV service plans available online.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-14 sm:mb-18">
          <div className="bg-[#141417] p-5 sm:p-6 rounded-xl border border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                Cheapest IPTV Service
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Save up to 82% compared to cable. Direct 4K IPTV service plans starting as low as $1.65/month with instant activation.
              </p>
            </div>
          </div>

          <div className="bg-[#141417] p-5 sm:p-6 rounded-xl border border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                <Radio className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                20,000+ Live Channels
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Stream live sports, international TV networks, news, and 60,000+ VOD blockbuster movies in true 4K & FHD.
              </p>
            </div>
          </div>

          <div className="bg-[#141417] p-5 sm:p-6 rounded-xl border border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                Anti-Freeze CDN Tech
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Dedicated high-speed CDN routing ensures 99.9% uptime and zero buffering during high-traffic live events.
              </p>
            </div>
          </div>

          <div className="bg-[#141417] p-5 sm:p-6 rounded-xl border border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
                <Tv className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                Universal Multi-Device
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Compatible with Smart TV, Firestick, Android, iOS, Windows, macOS, and popular IPTV player apps.
              </p>
            </div>
          </div>
        </div>

        {/* Comparison Table Section */}
        <div className="bg-[#121215] rounded-2xl p-6 sm:p-8 lg:p-10 border border-neutral-800/90 mb-14 sm:mb-18">
          <div className="max-w-2xl mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
              Why Tiger OTT Leads All IPTV Service Providers
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400">
              See how our cheap IPTV services compare to traditional cable and other IPTV service providers.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400">
                  <th className="pb-3 font-semibold">Feature / Quality</th>
                  <th className="pb-3 font-bold text-amber-400">Tiger OTT (Cheapest)</th>
                  <th className="pb-3 font-semibold text-neutral-400">Other IPTV Providers</th>
                  <th className="pb-3 font-semibold text-neutral-400">Traditional Cable TV</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                <tr>
                  <td className="py-3.5 font-medium text-white">Monthly Effective Cost</td>
                  <td className="py-3.5 text-emerald-400 font-bold">From $1.65 / mo</td>
                  <td className="py-3.5 text-neutral-400">$10.00 – $18.00 / mo</td>
                  <td className="py-3.5 text-red-400 font-semibold">$75.00 – $140.00 / mo</td>
                </tr>
                <tr>
                  <td className="py-3.5 font-medium text-white">4K UHD & 60FPS Sports</td>
                  <td className="py-3.5 text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Included (All Tiers)</span>
                  </td>
                  <td className="py-3.5 text-neutral-400">Extra fee or 720p only</td>
                  <td className="py-3.5 text-neutral-400">Expensive HD tier</td>
                </tr>
                <tr>
                  <td className="py-3.5 font-medium text-white">Instant Automated Delivery</td>
                  <td className="py-3.5 text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Instant Digital Dispatch</span>
                  </td>
                  <td className="py-3.5 text-neutral-400">1 – 24 hour delay</td>
                  <td className="py-3.5 text-neutral-400">Technician visit required</td>
                </tr>
                <tr>
                  <td className="py-3.5 font-medium text-white">Replacement Warranty</td>
                  <td className="py-3.5 text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>100% Full-Term Warranty</span>
                  </td>
                  <td className="py-3.5 text-neutral-400">Limited or No support</td>
                  <td className="py-3.5 text-neutral-400">Expensive contracts</td>
                </tr>
                <tr>
                  <td className="py-3.5 font-medium text-white">Multi-Device Compatibility</td>
                  <td className="py-3.5 text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Smart TV, Mobile, Web</span>
                  </td>
                  <td className="py-3.5 text-neutral-400">Device restricted</td>
                  <td className="py-3.5 text-neutral-400">Proprietary TV box only</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-neutral-800">
            <span className="text-xs text-neutral-400 text-center sm:text-left">
              Ready to start? Select your duration plan and get your credentials in seconds.
            </span>
            <button
              type="button"
              onClick={scrollToPlans}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#FFE000] hover:bg-[#ebd000] text-black font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Explore Cheap IPTV Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* SEO FAQ Section with Accordion */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2 flex items-center justify-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-400" />
              <span>Frequently Asked Questions About IPTV Service</span>
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400">
              Everything you need to know about choosing what is the best IPTV service and getting started with Tiger OTT.
            </p>
          </div>

          <div className="space-y-3">
            {faqList.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-[#141417] border border-neutral-800/90 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-xs sm:text-sm font-bold text-white hover:text-amber-400 transition cursor-pointer gap-4"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 text-xs sm:text-sm text-neutral-400 leading-relaxed border-t border-neutral-800/50">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
