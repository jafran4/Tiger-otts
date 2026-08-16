import React, { useState } from "react";
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Lock,
  Copy,
  Check,
  CreditCard,
  QrCode,
  Smartphone,
  ExternalLink,
  MessageCircle,
  Clock,
  Sparkles,
  Download,
  AlertCircle,
  Crown
} from "lucide-react";
import { OTTService, OTTPlan, OTTOrder } from "../types";

interface OTTCheckoutModalProps {
  service: OTTService;
  selectedPlan: OTTPlan;
  onClose: () => void;
  onOrderComplete?: (order: OTTOrder) => void;
}

const OTTCheckoutModal: React.FC<OTTCheckoutModalProps> = ({
  service,
  selectedPlan,
  onClose,
  onOrderComplete,
}) => {
  const [step, setStep] = useState<"details" | "processing" | "success">("details");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [preferredPin, setPreferredPin] = useState("8842");
  const [accountOption, setAccountOption] = useState<"new" | "upgrade_own">("new");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "crypto" | "apple_pay">("card");
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Generated Order Details after mock delivery
  const [generatedOrder, setGeneratedOrder] = useState<OTTOrder | null>(null);

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === "OTT1" || couponCode.trim().toUpperCase() === "NUMBER1" || couponCode.trim().toUpperCase() === "SAVE10") {
      setAppliedDiscount(10);
      setCouponMsg("🎉 Coupon Applied: Extra 10% OFF!");
    } else {
      setCouponMsg("Invalid coupon code. Try 'NUMBER1' for 10% off!");
    }
  };

  const currencySymbol = selectedPlan.currency === "QAR" ? "QAR" : "$";
  const formatPrice = (val: number) => {
    if (selectedPlan.currency === "QAR") {
      return `${Math.round(val)} QAR`;
    }
    return `$${val.toFixed(2)}`;
  };

  // 1 USD = 3.64 QAR
  const qarEquivalent = selectedPlan.currency === "USD"
    ? `${Math.round(selectedPlan.price * 3.64)} QAR`
    : null;

  const finalPrice = Math.max(
    1,
    Number((selectedPlan.price * (1 - appliedDiscount / 100)).toFixed(2))
  );

  const handleStartCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerEmail.trim()) return;

    setStep("processing");

    // Simulate instant auto-provisioning
    setTimeout(() => {
      const randomOrderId = `OTT-${Math.floor(100000 + Math.random() * 900000)}`;
      const randomUserPrefix = customerEmail.split("@")[0].replace(/[^a-zA-Z0-9]/g, "") || "streamer";
      const randomPass = `VIP#${Math.floor(1000 + Math.random() * 9000)}!Pass`;

      const order: OTTOrder = {
        orderId: randomOrderId,
        serviceName: service.name,
        planDuration: selectedPlan.duration,
        screens: selectedPlan.screens,
        amountPaid: finalPrice,
        customerEmail: customerEmail.trim(),
        customerPhone: customerPhone.trim() || undefined,
        paymentMethod: paymentMethod.toUpperCase(),
        accountEmail: accountOption === "upgrade_own" ? customerEmail : `vip.${randomUserPrefix}@cloud-ott.net`,
        accountPassword: randomPass,
        profilePin: preferredPin || "1234",
        purchaseDate: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        status: "Active",
      };

      setGeneratedOrder(order);
      setStep("success");
      if (onOrderComplete) onOrderComplete(order);
    }, 1800);
  };

  const copyToClipboard = (text: string, keyName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyName);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div
      id="ott-checkout-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-[#181818] border border-neutral-700/80 rounded-2xl shadow-2xl overflow-hidden text-white my-auto animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-[#121212]">
          <div className="flex items-center space-x-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white shadow-md"
              style={{ backgroundColor: service.brandColor }}
            >
              {service.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base sm:text-lg font-bold text-white leading-none">
                  {service.name}
                </h3>
                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded text-[10px] font-extrabold uppercase">
                  #1 OTT Seller
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                {selectedPlan.duration} • {selectedPlan.screens}
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

        {/* Modal Body */}
        <div className="p-6">
          {step === "details" && (
            <form onSubmit={handleStartCheckout} className="space-y-5">
              {/* Plan Summary Card */}
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    Selected Package
                  </span>
                  <p className="text-sm font-bold text-white">
                    {service.name} - {selectedPlan.duration}
                  </p>
                  <p className="text-xs text-emerald-400 font-medium mt-0.5 flex items-center space-x-1">
                    <Zap className="w-3.5 h-3.5 fill-emerald-400" />
                    <span>Instant Auto-Activation Enabled</span>
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs line-through text-neutral-500 block">
                    {formatPrice(selectedPlan.originalPrice)}
                  </span>
                  <span className="text-2xl font-black text-white">
                    {formatPrice(finalPrice)}
                  </span>
                  {qarEquivalent && (
                    <span className="block text-[11px] font-mono text-neutral-300 font-semibold">
                      ≈ {Math.round(finalPrice * 3.64)} QAR
                    </span>
                  )}
                  <span className="block text-[11px] font-bold text-amber-400">
                    Save {selectedPlan.savePercent}%
                  </span>
                </div>
              </div>

              {/* Delivery Contact Information */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center space-x-1.5">
                  <span>1. Instant Delivery Information</span>
                </h4>

                <div>
                  <label className="block text-xs text-neutral-300 mb-1">
                    Delivery Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E50914] transition"
                  />
                  <span className="text-[11px] text-neutral-500 mt-1 block">
                    Login credentials and PIN code will be sent here immediately.
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-neutral-300 mb-1">
                      WhatsApp Number (Optional for WhatsApp Delivery)
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E50914] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-300 mb-1">
                      Preferred 4-Digit Profile PIN
                    </label>
                    <input
                      type="text"
                      maxLength={4}
                      value={preferredPin}
                      onChange={(e) => setPreferredPin(e.target.value)}
                      placeholder="e.g. 8842"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E50914] transition font-mono tracking-widest"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  2. Select Payment Method
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-2.5 rounded-lg border text-xs font-semibold flex flex-col items-center justify-center space-y-1 transition ${
                      paymentMethod === "card"
                        ? "border-[#E50914] bg-[#E50914]/15 text-white"
                        : "border-neutral-700 bg-neutral-900 text-neutral-400 hover:border-neutral-500"
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Card / Debit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("upi")}
                    className={`p-2.5 rounded-lg border text-xs font-semibold flex flex-col items-center justify-center space-y-1 transition ${
                      paymentMethod === "upi"
                        ? "border-[#E50914] bg-[#E50914]/15 text-white"
                        : "border-neutral-700 bg-neutral-900 text-neutral-400 hover:border-neutral-500"
                    }`}
                  >
                    <QrCode className="w-4 h-4" />
                    <span>UPI / GPay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("apple_pay")}
                    className={`p-2.5 rounded-lg border text-xs font-semibold flex flex-col items-center justify-center space-y-1 transition ${
                      paymentMethod === "apple_pay"
                        ? "border-[#E50914] bg-[#E50914]/15 text-white"
                        : "border-neutral-700 bg-neutral-900 text-neutral-400 hover:border-neutral-500"
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Apple / Google</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("crypto")}
                    className={`p-2.5 rounded-lg border text-xs font-semibold flex flex-col items-center justify-center space-y-1 transition ${
                      paymentMethod === "crypto"
                        ? "border-[#E50914] bg-[#E50914]/15 text-white"
                        : "border-neutral-700 bg-neutral-900 text-neutral-400 hover:border-neutral-500"
                    }`}
                  >
                    <Lock className="w-4 h-4" />
                    <span>Crypto USDT</span>
                  </button>
                </div>
              </div>

              {/* Promo code field */}
              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Discount coupon (e.g. NUMBER1)"
                  className="flex-1 bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white uppercase focus:outline-none focus:border-amber-400 font-mono"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg text-xs font-bold transition"
                >
                  Apply
                </button>
              </div>
              {couponMsg && (
                <p className={`text-xs ${appliedDiscount > 0 ? "text-emerald-400" : "text-amber-400"}`}>
                  {couponMsg}
                </p>
              )}

              {/* Guarantees row */}
              <div className="bg-neutral-900/50 p-3 rounded-lg flex items-center justify-between text-[11px] text-neutral-400 border border-neutral-800">
                <div className="flex items-center space-x-1.5 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>100% Replacement Warranty</span>
                </div>
                <div className="flex items-center space-x-1.5 text-amber-400">
                  <Zap className="w-4 h-4" />
                  <span>&lt; 15s Delivery</span>
                </div>
                <div className="flex items-center space-x-1.5 text-blue-400">
                  <Lock className="w-4 h-4" />
                  <span>256-Bit SSL Encrypted</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 bg-[#E50914] hover:bg-[#b80710] text-white font-extrabold rounded-xl text-sm sm:text-base flex items-center justify-center space-x-2 shadow-xl hover:shadow-red-600/30 transition duration-200 active:scale-[0.99] cursor-pointer"
              >
                <Zap className="w-5 h-5 fill-white" />
                <span>Pay {formatPrice(finalPrice)} & Receive Credentials Instantly</span>
              </button>
            </form>
          )}

          {step === "processing" && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative w-16 h-16">
                <div className="w-16 h-16 rounded-full border-4 border-neutral-700 border-t-[#E50914] animate-spin" />
                <Crown className="w-6 h-6 text-amber-400 absolute inset-0 m-auto animate-pulse" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">
                  World's #1 Automated Engine Working...
                </h4>
                <p className="text-xs text-neutral-400 mt-1 max-w-sm">
                  Provisioning private 4K UHD profile, securing PIN lock, and generating instant credentials for{" "}
                  <strong className="text-white">{customerEmail}</strong>.
                </p>
              </div>
            </div>
          )}

          {step === "success" && generatedOrder && (
            <div className="space-y-5 animate-fadeIn">
              {/* Top celebration */}
              <div className="text-center bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-4">
                <div className="inline-flex p-2 bg-emerald-500/20 rounded-full text-emerald-400 mb-2">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-black text-white">
                  Order Successfully Delivered!
                </h4>
                <p className="text-xs text-emerald-300 mt-0.5">
                  Order ID: <span className="font-mono font-bold text-white">{generatedOrder.orderId}</span> • 100% Warranty Active
                </p>
              </div>

              {/* Live Credentials Box */}
              <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Your Instant Account Credentials</span>
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded">
                    Active & Validated
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  {/* Email row */}
                  <div className="flex items-center justify-between bg-black/60 p-2.5 rounded-lg border border-neutral-800">
                    <div>
                      <span className="text-neutral-400 text-[10px] block">LOGIN EMAIL / USERNAME</span>
                      <span className="font-mono font-bold text-white">{generatedOrder.accountEmail}</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(generatedOrder.accountEmail, "email")}
                      className="p-1.5 hover:bg-neutral-800 rounded text-neutral-300 hover:text-white transition flex items-center space-x-1"
                    >
                      {copiedKey === "email" ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Password row */}
                  <div className="flex items-center justify-between bg-black/60 p-2.5 rounded-lg border border-neutral-800">
                    <div>
                      <span className="text-neutral-400 text-[10px] block">PASSWORD</span>
                      <span className="font-mono font-bold text-white">{generatedOrder.accountPassword}</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(generatedOrder.accountPassword, "pass")}
                      className="p-1.5 hover:bg-neutral-800 rounded text-neutral-300 hover:text-white transition flex items-center space-x-1"
                    >
                      {copiedKey === "pass" ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* PIN code row */}
                  {generatedOrder.profilePin && (
                    <div className="flex items-center justify-between bg-black/60 p-2.5 rounded-lg border border-neutral-800">
                      <div>
                        <span className="text-neutral-400 text-[10px] block">PROFILE PIN CODE</span>
                        <span className="font-mono font-bold text-amber-400 text-sm tracking-widest">
                          {generatedOrder.profilePin}
                        </span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(generatedOrder.profilePin || "", "pin")}
                        className="p-1.5 hover:bg-neutral-800 rounded text-neutral-300 hover:text-white transition flex items-center space-x-1"
                      >
                        {copiedKey === "pin" ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  )}

                  {/* Expiry info */}
                  <div className="flex items-center justify-between pt-1 text-[11px] text-neutral-400">
                    <span>Valid until: <strong>{generatedOrder.expiryDate}</strong></span>
                    <span>Protected by: <strong>100% Replacement Guarantee</strong></span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <button
                  onClick={onClose}
                  className="py-2.5 px-4 bg-white hover:bg-neutral-200 text-black font-bold rounded-lg text-xs transition shadow-md flex items-center justify-center space-x-1.5"
                >
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Start Streaming Now</span>
                </button>

                <a
                  href={`https://wa.me/?text=Hello%20World's%20%231%20OTT%20Seller%2C%20I%20have%20Order%20${generatedOrder.orderId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-4 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/50 font-bold rounded-lg text-xs transition flex items-center justify-center space-x-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>24/7 WhatsApp Support</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTTCheckoutModal;
