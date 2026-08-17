import React from "react";
import { Sparkles, ShieldCheck, Zap, Crown, ArrowRight, MessageCircle } from "lucide-react";
import { TigerLogo } from "./TigerLogo";

interface OTTBannerProps {
  onOpenStore: () => void;
  onOpenReseller?: () => void;
}

const OTTBanner: React.FC<OTTBannerProps> = ({ onOpenStore, onOpenReseller }) => {
  return (
    <div
      id="ott-seller-announcement-banner"
      className="relative z-30 bg-gradient-to-r from-[#800000] via-[#E50914] to-[#800000] text-white py-2 px-4 sm:px-8 flex flex-wrap items-center justify-between shadow-lg text-xs sm:text-sm border-b border-red-500/30 overflow-hidden select-none"
    >
      {/* Background glowing particles */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff22_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-40" />

      <div className="flex items-center space-x-2 sm:space-x-3 z-10 flex-1 min-w-0">
        <TigerLogo size="sm" className="hidden sm:inline-flex flex-shrink-0" />
        <div className="flex items-center space-x-1.5 px-2 py-0.5 bg-black/40 rounded-full border border-amber-400/40 text-amber-300 text-[11px] font-extrabold uppercase tracking-wider flex-shrink-0">
          <Crown className="w-3.5 h-3.5 fill-amber-400 text-amber-400 animate-pulse" />
          <span>World's #1 OTT Seller</span>
        </div>

        <p className="font-medium text-neutral-100 truncate text-[11px] sm:text-xs">
          <span className="hidden md:inline">
            Get <strong>Netflix 4K UHD, Prime Video, Disney+, Max & Spotify</strong> at up to{" "}
          </span>
          <span className="font-extrabold text-amber-300">85% OFF</span>
          <span className="hidden sm:inline"> • Instant Auto-Delivery & 100% Warranty</span>
        </p>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-3 z-10 mt-1 sm:mt-0">
        <button
          onClick={onOpenStore}
          className="flex items-center space-x-1 bg-white hover:bg-neutral-100 text-black px-3 py-1 rounded font-bold text-xs transition duration-200 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          <span>Buy Subscriptions</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {onOpenReseller && (
          <button
            onClick={onOpenReseller}
            className="hidden lg:flex items-center space-x-1 bg-black/40 hover:bg-black/70 border border-white/30 text-white px-2.5 py-1 rounded font-medium text-xs transition"
          >
            <span>Reseller Wholesale (55% Off)</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default OTTBanner;
