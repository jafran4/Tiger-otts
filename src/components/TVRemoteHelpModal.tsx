import React from "react";
import { Tv, X, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, CornerDownLeft, Undo2, Play, Volume2 } from "lucide-react";

interface TVRemoteHelpModalProps {
  onClose: () => void;
  isTVMode: boolean;
  onToggleTVMode: () => void;
}

export const TVRemoteHelpModal: React.FC<TVRemoteHelpModalProps> = ({
  onClose,
  isTVMode,
  onToggleTVMode,
}) => {
  return (
    <div
      id="tv-remote-help-modal"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#181818] border-2 border-amber-500/50 rounded-2xl p-6 sm:p-8 text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2.5 bg-[#E50914] rounded-xl shadow-lg">
            <Tv className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center space-x-2">
              <span>Tiger OTT Smart TV & Remote Navigation</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              Designed for 1080p, 4K, Android TV, Google TV, Apple TV, and Smart TV browsers
            </p>
          </div>
        </div>

        {/* Remote Guide Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 my-6">
          <div className="flex items-center space-x-3 bg-black/60 border border-white/10 rounded-xl p-3.5">
            <div className="flex items-center space-x-1 bg-neutral-800 px-2.5 py-1.5 rounded-lg border border-white/10 text-amber-400">
              <ArrowLeft className="w-4 h-4" />
              <ArrowRight className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Left / Right Arrows</div>
              <div className="text-xs text-neutral-400">Navigate cards within a row or seek ±10s in player</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-black/60 border border-white/10 rounded-xl p-3.5">
            <div className="flex items-center space-x-1 bg-neutral-800 px-2.5 py-1.5 rounded-lg border border-white/10 text-amber-400">
              <ArrowUp className="w-4 h-4" />
              <ArrowDown className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Up / Down Arrows</div>
              <div className="text-xs text-neutral-400">Move between categories, rows, and top navbar</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-black/60 border border-white/10 rounded-xl p-3.5">
            <div className="flex items-center space-x-1 bg-neutral-800 px-2.5 py-1.5 rounded-lg border border-white/10 text-emerald-400 font-mono text-xs font-bold">
              <span>OK / ENTER</span>
            </div>
            <div>
              <div className="text-sm font-bold text-white">OK / Center Button</div>
              <div className="text-xs text-neutral-400">Open movie details, play video, or select menu item</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-black/60 border border-white/10 rounded-xl p-3.5">
            <div className="flex items-center space-x-1 bg-neutral-800 px-2.5 py-1.5 rounded-lg border border-white/10 text-red-400">
              <Undo2 className="w-4 h-4" />
              <span className="font-mono text-xs">BACK</span>
            </div>
            <div>
              <div className="text-sm font-bold text-white">Back / Return / ESC</div>
              <div className="text-xs text-neutral-400">Close modal, exit player, and return to exact card</div>
            </div>
          </div>
        </div>

        {/* Mode switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-800">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-neutral-300">TV Focus Enhanced Mode:</span>
            <button
              onClick={onToggleTVMode}
              className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                isTVMode
                  ? "bg-amber-500 text-black font-extrabold shadow-[0_0_12px_rgba(245,158,11,0.6)]"
                  : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
              }`}
            >
              {isTVMode ? "🟢 TV Mode ON" : "⚪ Normal Mode"}
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#E50914] hover:bg-red-700 text-white font-bold rounded-lg text-sm transition cursor-pointer"
          >
            Got It (Press OK)
          </button>
        </div>
      </div>
    </div>
  );
};
