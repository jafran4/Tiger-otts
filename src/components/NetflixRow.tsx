import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MediaItem } from "../types";
import NetflixCard from "./NetflixCard";

interface NetflixRowProps {
  title: string;
  items: MediaItem[];
  isTop10?: boolean;
  onPlay: (media: MediaItem) => void;
  onOpenDetail: (media: MediaItem) => void;
  myListIds: Set<number>;
  onToggleMyList: (media: MediaItem) => void;
  rowId?: string;
}

const NetflixRow: React.FC<NetflixRowProps> = ({
  title,
  items,
  isTop10 = false,
  onPlay,
  onOpenDetail,
  myListIds,
  onToggleMyList,
  rowId,
}) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (!rowRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
    setShowLeftArrow(scrollLeft > 20);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
  };

  const scroll = (direction: "left" | "right") => {
    if (!rowRef.current) return;
    const { clientWidth } = rowRef.current;
    const scrollAmount = direction === "left" ? -clientWidth * 0.75 : clientWidth * 0.75;
    rowRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  if (!items || items.length === 0) return null;

  return (
    <div
      id={rowId || `netflix-row-${title.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
      className="relative group/row my-4 sm:my-6 md:my-8 px-4 sm:px-8 md:px-12 lg:px-16"
    >
      {/* Row Title & Explore All indicator */}
      <div className="flex items-baseline justify-between mb-2 sm:mb-3">
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-white tracking-tight group-hover/row:text-[#E50914] transition-colors duration-200 cursor-pointer flex items-center space-x-2">
          <span>{title}</span>
          <span className="text-xs text-neutral-400 opacity-0 group-hover/row:opacity-100 transition-opacity font-semibold">
            Explore All &gt;
          </span>
        </h3>
      </div>

      {/* Row Carousel Wrapper */}
      <div className="relative">
        {/* Left Scroll Button */}
        {showLeftArrow && (
          <button
            tabIndex={-1}
            onClick={() => scroll("left")}
            className="absolute left-0 top-0 bottom-0 z-30 w-10 sm:w-12 md:w-14 bg-black/70 hover:bg-black/95 text-white flex items-center justify-center transition-all opacity-0 group-hover/row:opacity-100 rounded-r-md cursor-pointer backdrop-blur-xs shadow-xl"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 hover:scale-125 transition-transform" />
          </button>
        )}

        {/* Horizontal Scrollable Container with focus preservation */}
        <div
          ref={rowRef}
          onScroll={handleScroll}
          className="flex items-center space-x-3 sm:space-x-4 overflow-x-auto no-scrollbar scroll-smooth py-4 px-2"
        >
          {items.map((item, idx) => (
            <NetflixCard
              key={`${item.id}-${idx}`}
              media={item}
              rank={isTop10 ? idx + 1 : undefined}
              isTop10={isTop10}
              onPlay={onPlay}
              onOpenDetail={onOpenDetail}
              isInMyList={myListIds.has(item.id)}
              onToggleMyList={onToggleMyList}
            />
          ))}
        </div>

        {/* Right Scroll Button */}
        {showRightArrow && (
          <button
            tabIndex={-1}
            onClick={() => scroll("right")}
            className="absolute right-0 top-0 bottom-0 z-30 w-10 sm:w-12 md:w-14 bg-black/70 hover:bg-black/95 text-white flex items-center justify-center transition-all opacity-0 group-hover/row:opacity-100 rounded-l-md cursor-pointer backdrop-blur-xs shadow-xl"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 hover:scale-125 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
};

export default NetflixRow;
