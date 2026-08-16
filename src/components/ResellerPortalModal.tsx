import React, { useState } from "react";
import {
  X,
  Crown,
  Zap,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Key,
  Users,
  Copy,
  Check,
  MessageCircle,
  Briefcase
} from "lucide-react";
import { RESELLER_TIERS } from "../data/ottData";

interface ResellerPortalModalProps {
  onClose: () => void;
}

const ResellerPortalModal: React.FC<ResellerPortalModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<"tiers" | "calculator" | "api">("tiers");
  const [sellingVolume, setSellingVolume] = useState(50);
  const [apiKeyCopied, setApiKeyCopied] = useState(false);

  // Profit calculation
  const averageRetailPrice = 12; // $12 per month sold to customer
  const wholesaleCost = 3.5; // $3.50 reseller cost
  const monthlyRevenue = sellingVolume * averageRetailPrice;
  const monthlyCost = sellingVolume * wholesaleCost;
  const netMonthlyProfit = monthlyRevenue - monthlyCost;

  const mockApiKey = "ott_reseller_live_7942fe89b1c900e3a19";

  return (
    <div
      id="reseller-portal-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#181818] border border-neutral-700/80 rounded-2xl shadow-2xl overflow-hidden text-white my-auto animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-[#121212]">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white leading-none">
                World's #1 OTT Reseller & Wholesaler Network
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Bulk provisioning, automated Telegram Bot, 55% profit margins
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center border-b border-neutral-800 px-6 bg-neutral-900/50 text-xs">
          <button
            onClick={() => setActiveTab("tiers")}
            className={`py-3 px-4 font-bold border-b-2 transition ${
              activeTab === "tiers"
                ? "border-[#E50914] text-white"
                : "border-transparent text-neutral-400 hover:text-neutral-200"
            }`}
          >
            Wholesale Tiers
          </button>
          <button
            onClick={() => setActiveTab("calculator")}
            className={`py-3 px-4 font-bold border-b-2 transition ${
              activeTab === "calculator"
                ? "border-[#E50914] text-white"
                : "border-transparent text-neutral-400 hover:text-neutral-200"
            }`}
          >
            Profit Calculator
          </button>
          <button
            onClick={() => setActiveTab("api")}
            className={`py-3 px-4 font-bold border-b-2 transition ${
              activeTab === "api"
                ? "border-[#E50914] text-white"
                : "border-transparent text-neutral-400 hover:text-neutral-200"
            }`}
          >
            Automated API & Telegram Bot
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6">
          {activeTab === "tiers" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {RESELLER_TIERS.map((tier, idx) => (
                  <div
                    key={idx}
                    className={`bg-neutral-900 border rounded-xl p-4 flex flex-col justify-between space-y-3 ${
                      tier.popular
                        ? "border-amber-400/80 ring-1 ring-amber-400/40 bg-neutral-900/90"
                        : "border-neutral-800"
                    }`}
                  >
                    <div>
                      {tier.popular && (
                        <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full uppercase mb-2 inline-block">
                          Most Popular
                        </span>
                      )}
                      <h4 className="font-bold text-sm text-white">{tier.tier}</h4>
                      <p className="text-xs text-neutral-400 mt-0.5">Min Top-up: {tier.minOrder}</p>
                      <div className="text-base font-black text-emerald-400 mt-2">
                        {tier.discount}
                      </div>
                    </div>

                    <div className="space-y-1 text-[11px] text-neutral-300 pt-2 border-t border-neutral-800">
                      {tier.perks.map((p, i) => (
                        <div key={i} className="flex items-center space-x-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                          <span className="truncate">{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-neutral-300">
                  <span className="font-bold text-white block">Ready to start reselling?</span>
                  Contact our WhatsApp wholesale supervisor for instant dealer onboarding and automated portal access.
                </div>
                <a
                  href="https://wa.me/?text=Hello%20Manager%2C%20I%20want%20to%20deposit%20funds%20and%20become%20an%20OTT%20Reseller"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#25D366] hover:bg-[#20ba5a] text-black font-bold text-xs rounded-lg transition flex items-center space-x-1.5 flex-shrink-0"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Reseller Desk</span>
                </a>
              </div>
            </div>
          )}

          {activeTab === "calculator" && (
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-300 flex justify-between">
                  <span>How many accounts do you sell per month?</span>
                  <span className="text-[#E50914] font-black">{sellingVolume} Subscriptions/mo</span>
                </label>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={sellingVolume}
                  onChange={(e) => setSellingVolume(Number(e.target.value))}
                  className="w-full accent-[#E50914] cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3.5 text-center">
                  <span className="text-[11px] text-neutral-400 block">Total Revenue</span>
                  <span className="text-base sm:text-xl font-bold text-white">
                    ${monthlyRevenue.toLocaleString()}
                  </span>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3.5 text-center">
                  <span className="text-[11px] text-neutral-400 block">Wholesale Cost</span>
                  <span className="text-base sm:text-xl font-bold text-neutral-400">
                    ${monthlyCost.toLocaleString()}
                  </span>
                </div>
                <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-3.5 text-center">
                  <span className="text-[11px] text-emerald-300 block">Net Estimated Profit</span>
                  <span className="text-base sm:text-xl font-black text-emerald-400">
                    +${netMonthlyProfit.toLocaleString()} / mo
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "api" && (
            <div className="space-y-4">
              <p className="text-xs text-neutral-300">
                Integrate our high-speed automated provisioning API directly into your Telegram Bot, WHMCS store, or custom website.
              </p>

              <div className="bg-black/70 border border-neutral-800 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span className="font-mono">LIVE PRODUCTION API KEY</span>
                  <span className="text-emerald-400 text-[10px]">Ready</span>
                </div>
                <div className="flex items-center justify-between bg-neutral-900 px-3 py-2 rounded border border-neutral-700">
                  <span className="font-mono text-xs text-amber-300 truncate">{mockApiKey}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(mockApiKey);
                      setApiKeyCopied(true);
                      setTimeout(() => setApiKeyCopied(false), 2000);
                    }}
                    className="p-1 hover:text-white text-neutral-400"
                  >
                    {apiKeyCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-3 font-mono text-[11px] text-neutral-300 overflow-x-auto">
                <p className="text-neutral-500">// POST https://api.cloud-ott.net/v1/subscriptions/provision</p>
                <p>&#123;</p>
                <p className="pl-4">"service": "netflix_4k_uhd",</p>
                <p className="pl-4">"duration_months": 12,</p>
                <p className="pl-4">"delivery_email": "customer@gmail.com"</p>
                <p>&#125;</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResellerPortalModal;
