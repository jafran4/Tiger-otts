import React, { useState, useEffect, useRef } from "react";
import { Search, Delete, CornerDownLeft, Sparkles, X } from "lucide-react";

interface TVVirtualKeyboardProps {
  value: string;
  onChange: (val: string) => void;
  onSearch: (val: string) => void;
  onClose?: () => void;
}

const KEYBOARD_ROWS = [
  ["A", "B", "C", "D", "E", "F", "1", "2", "3"],
  ["G", "H", "I", "J", "K", "L", "4", "5", "6"],
  ["M", "N", "O", "P", "Q", "R", "7", "8", "9"],
  ["S", "T", "U", "V", "W", "X", "0", "-", "."],
  ["Y", "Z", "SPACE", "BACKSPACE", "CLEAR", "SEARCH"],
];

const SEARCH_SUGGESTIONS = [
  "Stranger Things",
  "Avengers",
  "Breaking Bad",
  "Dune",
  "The Batman",
  "Spider-Man",
  "John Wick",
  "Interstellar",
];

export const TVVirtualKeyboard: React.FC<TVVirtualKeyboardProps> = ({
  value,
  onChange,
  onSearch,
  onClose,
}) => {
  const [selectedRow, setSelectedRow] = useState(0);
  const [selectedCol, setSelectedCol] = useState(0);
  const [activeArea, setActiveArea] = useState<"keyboard" | "suggestions">("keyboard");
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);

  const handleKeyPress = (key: string) => {
    if (key === "SPACE") {
      onChange(value + " ");
    } else if (key === "BACKSPACE") {
      onChange(value.slice(0, -1));
    } else if (key === "CLEAR") {
      onChange("");
    } else if (key === "SEARCH") {
      onSearch(value);
    } else {
      onChange(value + key);
    }
  };

  // Keyboard navigation listener specifically for TV Remote D-Pad
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if an actual input element has focused
      if (document.activeElement?.tagName === "INPUT") return;

      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (activeArea === "suggestions") {
          setSelectedSuggestion((prev) => Math.max(0, prev - 1));
        } else {
          if (selectedRow > 0) {
            setSelectedRow((r) => r - 1);
            setSelectedCol((c) => Math.min(c, KEYBOARD_ROWS[selectedRow - 1].length - 1));
          }
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (activeArea === "suggestions") {
          setSelectedSuggestion((prev) => Math.min(SEARCH_SUGGESTIONS.length - 1, prev + 1));
        } else {
          if (selectedRow < KEYBOARD_ROWS.length - 1) {
            setSelectedRow((r) => r + 1);
            setSelectedCol((c) => Math.min(c, KEYBOARD_ROWS[selectedRow + 1].length - 1));
          }
        }
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (activeArea === "suggestions") {
          setActiveArea("keyboard");
        } else {
          setSelectedCol((c) => Math.max(0, c - 1));
        }
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (activeArea === "keyboard") {
          if (selectedCol < KEYBOARD_ROWS[selectedRow].length - 1) {
            setSelectedCol((c) => c + 1);
          } else {
            setActiveArea("suggestions");
          }
        }
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (activeArea === "suggestions") {
          const chosen = SEARCH_SUGGESTIONS[selectedSuggestion];
          onChange(chosen);
          onSearch(chosen);
        } else {
          const key = KEYBOARD_ROWS[selectedRow][selectedCol];
          handleKeyPress(key);
        }
      } else if (e.key === "Backspace") {
        e.preventDefault();
        onChange(value.slice(0, -1));
      } else if (e.key === "Escape") {
        e.preventDefault();
        if (onClose) onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedRow, selectedCol, activeArea, selectedSuggestion, value]);

  return (
    <div className="w-full bg-[#181818]/95 border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-md">
      {/* TV Search Bar Display */}
      <div className="flex items-center justify-between bg-black/80 border-2 border-white/20 focus-within:border-[#E50914] rounded-xl px-4 py-3 mb-6 shadow-inner">
        <div className="flex items-center space-x-3 flex-1">
          <Search className="w-6 h-6 text-neutral-400" />
          <div className="text-lg sm:text-xl font-bold text-white tracking-wide min-h-[28px] flex items-center">
            {value ? (
              <span>{value}</span>
            ) : (
              <span className="text-neutral-500 font-normal">Use Remote D-Pad to Search Movies & Shows...</span>
            )}
            <span className="inline-block w-2.5 h-6 bg-[#E50914] ml-1.5 animate-pulse" />
          </div>
        </div>
        {value && (
          <button
            onClick={() => onChange("")}
            className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white cursor-pointer"
            aria-label="Clear text"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Virtual Keyboard Grid (2 cols wide on LG) */}
        <div className="lg:col-span-2 space-y-2">
          {KEYBOARD_ROWS.map((row, rIdx) => (
            <div key={rIdx} className="flex gap-2 justify-start">
              {row.map((key, cIdx) => {
                const isSelected =
                  activeArea === "keyboard" && selectedRow === rIdx && selectedCol === cIdx;
                const isSpecial = ["SPACE", "BACKSPACE", "CLEAR", "SEARCH"].includes(key);

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setSelectedRow(rIdx);
                      setSelectedCol(cIdx);
                      setActiveArea("keyboard");
                      handleKeyPress(key);
                    }}
                    className={`h-11 sm:h-12 rounded-lg font-bold text-sm sm:text-base flex items-center justify-center transition-all duration-150 cursor-pointer ${
                      key === "SPACE"
                        ? "flex-[2] text-xs uppercase"
                        : key === "SEARCH"
                        ? "flex-[1.8] bg-[#E50914] text-white hover:bg-red-700 font-extrabold"
                        : isSpecial
                        ? "flex-[1.3] text-xs bg-neutral-800 text-neutral-200"
                        : "w-11 sm:w-12 bg-neutral-900 text-white"
                    } ${
                      isSelected
                        ? "ring-4 ring-amber-400 bg-white text-black scale-105 shadow-[0_0_15px_rgba(251,191,36,0.8)] z-10"
                        : "hover:bg-neutral-700"
                    }`}
                  >
                    {key === "BACKSPACE" ? (
                      <Delete className="w-5 h-5" />
                    ) : key === "SPACE" ? (
                      "SPACE"
                    ) : key === "CLEAR" ? (
                      "CLEAR"
                    ) : key === "SEARCH" ? (
                      <span className="flex items-center space-x-1">
                        <Search className="w-4 h-4" />
                        <span>FIND</span>
                      </span>
                    ) : (
                      key
                    )}
                  </button>
                );
              })}
            </div>
          ))}
          <p className="text-xs text-neutral-400 pt-2 flex items-center space-x-2">
            <span>🎮 <strong>Remote Tips:</strong> Use Arrow Keys to navigate, OK / Enter to select a letter, Backspace to delete.</span>
          </p>
        </div>

        {/* Quick Search Suggestions Panel */}
        <div className="bg-black/60 border border-white/10 rounded-xl p-4">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
            <Sparkles className="w-4 h-4" />
            <span>Popular TV Searches</span>
          </div>
          <div className="space-y-1.5">
            {SEARCH_SUGGESTIONS.map((item, idx) => {
              const isSelected = activeArea === "suggestions" && selectedSuggestion === idx;
              return (
                <button
                  key={item}
                  onClick={() => {
                    setActiveArea("suggestions");
                    setSelectedSuggestion(idx);
                    onChange(item);
                    onSearch(item);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "bg-[#E50914] text-white font-bold ring-2 ring-white shadow-md translate-x-1"
                      : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                  }`}
                >
                  <span>{item}</span>
                  <CornerDownLeft className="w-3.5 h-3.5 opacity-60" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
