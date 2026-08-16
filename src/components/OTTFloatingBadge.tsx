import React, { useState, useEffect } from "react";
import { Crown, Sparkles, Zap, X } from "lucide-react";

interface OTTFloatingBadgeProps {
  onOpenStore: () => void;
}

const LIVE_SALES = [
  { name: "Marcus V.", location: "United States 🇺🇸", item: "Netflix 4K UHD (12M)", time: "Just now" },
  { name: "Sophie D.", location: "United Kingdom 🇬🇧", item: "VIP All-In-One Mega Pass", time: "1 min ago" },
  { name: "Rahul S.", location: "India 🇮🇳", item: "YouTube Premium (12M)", time: "2 mins ago" },
  { name: "Liam O.", location: "Australia 🇦🇺", item: "Live 4K IPTV (15K Channels)", time: "3 mins ago" },
  { name: "Elena R.", location: "Germany 🇩🇪", item: "Max HBO Ultimate 4K", time: "4 mins ago" },
  { name: "Carlos M.", location: "Brazil 🇧🇷", item: "Disney+ 4K UHD", time: "5 mins ago" },
];

const OTTFloatingBadge: React.FC<OTTFloatingBadgeProps> = ({ onOpenStore }) => {
  const [currentSaleIndex, setCurrentSaleIndex] = useState(0);
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSaleIndex((prev) => (prev + 1) % LIVE_SALES.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const currentSale = LIVE_SALES[currentSaleIndex];

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end space-y-2 pointer-events-auto select-none">
      {/* Live Sales Notification Bubble */}
      {showNotification && (
        <div className="bg-[#181818]/95 border border-amber-500/40 backdrop-blur-md rounded-xl p-2.5 shadow-2xl flex items-center space-x-3 text-white text-xs max-w-xs animate-fadeIn ring-1 ring-amber-400/30">
          <div className="w-8 h-8 rounded-lg bg-red-600/20 text-[#E50914] flex items-center justify-center flex-shrink-0">
            <Zap className="w-4 h-4 fill-[#E50914]" />
          </div>
          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white truncate text-[11px]">{currentSale.name}</span>
              <span className="text-[10px] text-neutral-400">{currentSale.time}</span>
            </div>
            <p className="text-[11px] text-amber-300 font-semibold truncate">
              Bought {currentSale.item}
            </p>
            <span className="text-[10px] text-neutral-400">{currentSale.location}</span>
          </div>
          <button
            onClick={() => setShowNotification(false)}
            className="text-neutral-400 hover:text-white p-0.5"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating CTA Button */}
      <button
        onClick={onOpenStore}
        className="group relative flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border border-white/20"
      >
        <Crown className="w-4 h-4 text-amber-300 fill-amber-300 animate-pulse" />
        <span className="text-xs font-black uppercase tracking-wider">
          #1 OTT Store <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] ml-1">85% OFF</span>
        </span>
      </button>
    </div>
  );
};

export default OTTFloatingBadge;
