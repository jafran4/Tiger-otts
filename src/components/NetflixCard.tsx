import React, { useState } from "react";
import { Play, Plus, Check, ThumbsUp, ChevronDown, Sparkles } from "lucide-react";
import { MediaItem } from "../types";

interface NetflixCardProps {
  media: MediaItem;
  rank?: number;
  isTop10?: boolean;
  onPlay: (media: MediaItem) => void;
  onOpenDetail: (media: MediaItem) => void;
  isInMyList: boolean;
  onToggleMyList: (media: MediaItem) => void;
}

const NetflixCard: React.FC<NetflixCardProps> = ({
  media,
  rank,
  isTop10,
  onPlay,
  onOpenDetail,
  isInMyList,
  onToggleMyList,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageError, setImageError] = useState(false);

  const posterPath = media.poster_path && !imageError
    ? media.poster_path.startsWith("http")
      ? media.poster_path
      : `https://image.tmdb.org/t/p/w500${media.poster_path}`
    : media.backdrop_path && !imageError
    ? `https://image.tmdb.org/t/p/w500${media.backdrop_path}`
    : "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=80";

  const backdropPath = media.backdrop_path && !imageError
    ? media.backdrop_path.startsWith("http")
      ? media.backdrop_path
      : `https://image.tmdb.org/t/p/w500${media.backdrop_path}`
    : posterPath;

  const title = media.title || media.name || media.original_title || "Untitled";

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpenDetail(media);
    }
  };

  // Top 10 row rendering with metallic rank number
  if (isTop10 && typeof rank === "number") {
    return (
      <div
        id={`top10-card-${media.id}`}
        data-tv-card="true"
        data-tv-id={`top10-card-${media.id}`}
        tabIndex={0}
        role="button"
        aria-label={`Rank ${rank}: ${title}`}
        onKeyDown={handleKeyDown}
        onClick={() => onOpenDetail(media)}
        className="group relative flex-shrink-0 flex items-center cursor-pointer transition-all duration-250 select-none mx-2 sm:mx-3 py-2 outline-none focus:scale-110 focus:z-40 focus:outline-none"
      >
        {/* Giant Metallic Number 1-10 */}
        <div className="relative -mr-6 sm:-mr-8 z-10 select-none pointer-events-none">
          <span className="top10-number text-8xl sm:text-9xl md:text-[140px] font-black group-focus:scale-105 transition-transform">
            {rank}
          </span>
        </div>

        {/* Poster Card */}
        <div className="relative w-[130px] sm:w-[155px] md:w-[175px] h-[190px] sm:h-[230px] md:h-[260px] rounded-lg overflow-hidden bg-neutral-900 shadow-xl border border-white/10 group-hover:border-white/40 group-focus:border-amber-400 group-focus:ring-4 group-focus:ring-amber-400/80 group-focus:shadow-[0_0_25px_rgba(245,158,11,0.8)] transition-all">
          <img
            src={posterPath}
            alt={title}
            onError={() => setImageError(true)}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-focus:scale-105"
          />

          {/* Quick Play Overlay on Hover / Focus */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity flex items-center justify-center">
            <button
              tabIndex={-1}
              onClick={(e) => {
                e.stopPropagation();
                onPlay(media);
              }}
              className="p-3.5 bg-white rounded-full text-black shadow-2xl hover:scale-110 active:scale-95 transition"
              aria-label="Play"
            >
              <Play className="w-5 h-5 fill-black" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id={`netflix-card-${media.id}`}
      data-tv-card="true"
      data-tv-id={`netflix-card-${media.id}`}
      tabIndex={0}
      role="button"
      aria-label={`${title}, ${media.matchScore || 96}% Match`}
      onKeyDown={handleKeyDown}
      onClick={() => onOpenDetail(media)}
      className="group relative flex-shrink-0 w-[160px] sm:w-[210px] md:w-[240px] lg:w-[270px] xl:w-[290px] h-[240px] sm:h-[145px] md:h-[165px] lg:h-[185px] xl:h-[200px] rounded-lg overflow-hidden bg-neutral-900 shadow-lg cursor-pointer transition-all duration-250 select-none border border-white/5 hover:border-white/30 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/90 focus:scale-110 focus:z-40 focus:shadow-[0_0_30px_rgba(245,158,11,0.85)] outline-none"
    >
      {/* Background Poster */}
      <img
        src={backdropPath}
        alt={title}
        onError={() => setImageError(true)}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-focus:scale-105"
      />

      {/* Netflix Original Badge */}
      {media.isOriginal && (
        <div className="absolute top-2 left-2 z-10">
          <span className="text-[#E50914] text-xs font-black drop-shadow-md">N</span>
        </div>
      )}

      {/* Bottom Title Bar (Visible by default) */}
      <div className="absolute inset-x-0 bottom-0 p-2 sm:p-2.5 bg-gradient-to-t from-black via-black/80 to-transparent group-hover:opacity-0 group-focus:opacity-0 transition-opacity duration-200">
        <h4 className="text-xs sm:text-sm font-bold text-white truncate drop-shadow">
          {title}
        </h4>
        <div className="flex items-center space-x-2 text-[10px] sm:text-[11px] text-neutral-300">
          <span className="text-[#46d369] font-bold">{media.matchScore || 96}% Match</span>
          <span>{media.maturityRating || "16+"}</span>
        </div>
      </div>

      {/* Hover & Remote-Focus Details Overlay */}
      <div className="absolute inset-0 bg-[#181818]/95 p-3 flex flex-col justify-between opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 z-20">
        {/* Top: Media title & action buttons */}
        <div>
          <h4 className="text-xs sm:text-sm font-extrabold text-white line-clamp-1 mb-2">
            {title}
          </h4>

          {/* Action Icons Row */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-1.5">
              {/* Play Button */}
              <button
                tabIndex={-1}
                onClick={(e) => {
                  e.stopPropagation();
                  onPlay(media);
                }}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white hover:bg-neutral-200 flex items-center justify-center text-black transition active:scale-95 shadow"
                title="Play"
              >
                <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-black text-black ml-0.5" />
              </button>

              {/* Add to My List */}
              <button
                tabIndex={-1}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleMyList(media);
                }}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-neutral-400 hover:border-white flex items-center justify-center text-white hover:bg-white/10 transition"
                title={isInMyList ? "In My List" : "Add to My List"}
              >
                {isInMyList ? (
                  <Check className="w-3.5 h-3.5 text-[#46d369]" />
                ) : (
                  <Plus className="w-3.5 h-3.5" />
                )}
              </button>

              {/* Like / Thumbs up */}
              <button
                tabIndex={-1}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLiked(!isLiked);
                }}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center transition ${
                  isLiked
                    ? "border-[#46d369] bg-[#46d369]/20 text-[#46d369]"
                    : "border-neutral-400 hover:border-white text-white hover:bg-white/10"
                }`}
                title="I like this"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Expand Details Button */}
            <button
              tabIndex={-1}
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetail(media);
              }}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-neutral-400 hover:border-white flex items-center justify-center text-white hover:bg-white/10 transition"
              title="More info"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom: Match %, Maturity, Duration, Ultra HD & Dolby badges */}
        <div className="space-y-1 text-[10px] sm:text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-[#46d369] font-bold text-[11px] sm:text-xs">
              {media.matchScore || 96}% Match
            </span>
            <span className="px-1 py-0.2 border border-neutral-600 rounded text-[9px] text-neutral-300 font-semibold">
              {media.maturityRating || "16+"}
            </span>
            <span className="text-neutral-400 text-[10px]">{media.duration || "2h 10m"}</span>
            <span className="px-1 text-[9px] font-black border border-amber-400/80 text-amber-400 rounded">
              4K UHD
            </span>
          </div>

          <div className="text-[10px] sm:text-[11px] text-neutral-300 font-medium truncate">
            {media.genres?.slice(0, 3).join(" • ") || "Action • Sci-Fi • Drama"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetflixCard;
