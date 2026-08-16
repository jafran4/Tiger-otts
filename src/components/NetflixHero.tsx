import React, { useState, useEffect, useRef } from "react";
import { Info, Plus, Check, Crown, Play, Sparkles, Volume2, VolumeX } from "lucide-react";
import { MediaItem } from "../types";
import { fetchTrailerKey } from "../services/tmdb";

interface NetflixHeroProps {
  media: MediaItem | null;
  onPlay: (media: MediaItem) => void;
  onOpenDetail: (media: MediaItem) => void;
  isInMyList: boolean;
  onToggleMyList: (media: MediaItem) => void;
  onOpenStore?: () => void;
}

const NetflixHero: React.FC<NetflixHeroProps> = ({
  media,
  onPlay,
  onOpenDetail,
  isInMyList,
  onToggleMyList,
  onOpenStore,
}) => {
  const [trailerKey, setTrailerKey] = useState<string | null>(media?.trailerKey || "Way9Dexny3w");
  const [showVideo, setShowVideo] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    try {
      const pref = localStorage.getItem("netflix_sound_preference");
      return pref === "muted"; // Default is unmuted (Sound Always ON)
    } catch {
      return false;
    }
  });
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const sendIframeCommand = (func: string, args: any = "") => {
    try {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: "command", func, args }),
          "*"
        );
      }
    } catch {}
  };

  const handleToggleSound = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    try {
      localStorage.setItem("netflix_sound_preference", nextMuted ? "muted" : "unmuted");
      window.dispatchEvent(
        new CustomEvent("netflix_sound_change", { detail: { isMuted: nextMuted } })
      );
    } catch {}

    if (nextMuted) {
      sendIframeCommand("mute");
    } else {
      sendIframeCommand("unMute");
      sendIframeCommand("setVolume", [100]);
    }
  };

  useEffect(() => {
    const handleSoundPref = (e: any) => {
      const muted =
        e.detail?.isMuted ?? (localStorage.getItem("netflix_sound_preference") === "muted");
      setIsMuted(muted);
      if (muted) {
        sendIframeCommand("mute");
      } else {
        sendIframeCommand("unMute");
        sendIframeCommand("setVolume", [100]);
      }
    };
    window.addEventListener("netflix_sound_change", handleSoundPref);
    return () => window.removeEventListener("netflix_sound_change", handleSoundPref);
  }, []);

  useEffect(() => {
    if (!media) return;
    setShowVideo(true);
    setVideoLoaded(false);

    // Fetch trailer key if available
    const loadTrailer = async () => {
      if (media.trailerKey) {
        setTrailerKey(media.trailerKey);
      } else {
        try {
          const key = await fetchTrailerKey(media.id, media.media_type || "movie");
          setTrailerKey(key || media.trailerKey || "Way9Dexny3w");
        } catch {
          setTrailerKey(media.trailerKey || "Way9Dexny3w");
        }
      }
    };
    loadTrailer();
  }, [media]);

  const handleIframeLoad = () => {
    setVideoLoaded(true);
    if (!isMuted) {
      setTimeout(() => {
        sendIframeCommand("unMute");
        sendIframeCommand("setVolume", [100]);
      }, 500);
    }
  };

  if (!media) return null;

  const backdropUrl = media.backdrop_path
    ? media.backdrop_path.startsWith("http")
      ? media.backdrop_path
      : `https://image.tmdb.org/t/p/original${media.backdrop_path}`
    : "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&auto=format&fit=crop&q=80";

  const releaseYear = media.release_date
    ? new Date(media.release_date).getFullYear()
    : media.first_air_date
    ? new Date(media.first_air_date).getFullYear()
    : 2024;

  return (
    <section
      id="netflix-billboard-hero"
      className="relative w-full h-[70vh] sm:h-[80vh] md:h-[88vh] lg:h-[94vh] bg-[#141414] overflow-hidden select-none"
    >
      {/* Background Image / Video Player */}
      <div className="absolute inset-0 w-full h-full">
        {/* Base Backdrop Image */}
        <img
          src={backdropUrl}
          alt={media.title}
          className="w-full h-full object-cover object-center filter brightness-75 animate-fadeIn"
        />

        {/* Video Trailer preview positioned on right side */}
        {showVideo && trailerKey && (
          <div className="absolute right-0 top-0 bottom-0 w-full md:w-[62%] lg:w-[58%] h-full overflow-hidden pointer-events-none z-[5] animate-fadeIn select-none">
            <div className="relative w-full h-full scale-[1.3] sm:scale-125 md:scale-125 lg:scale-115 flex items-center justify-center pointer-events-none">
              <iframe
                ref={iframeRef}
                src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1&mute=${
                  isMuted ? 1 : 0
                }&playsinline=1&controls=0&loop=1&playlist=${trailerKey}&showinfo=0&rel=0&modestbranding=1&enablejsapi=1&iv_load_policy=3&disablekb=1&widget_referrer=${
                  typeof window !== "undefined" ? encodeURIComponent(window.location.href) : ""
                }&origin=${
                  typeof window !== "undefined" ? encodeURIComponent(window.location.origin) : ""
                }`}
                title="Billboard trailer preview"
                className={`w-full h-full object-cover pointer-events-none select-none transition-opacity duration-700 ${
                  videoLoaded ? "opacity-100" : "opacity-95"
                }`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                referrerPolicy="strict-origin-when-cross-origin"
                loading="eager"
                onLoad={handleIframeLoad}
              />
            </div>
            {/* Left blend gradient */}
            <div className="absolute inset-y-0 left-0 w-24 sm:w-36 md:w-52 bg-gradient-to-r from-[#141414] via-[#141414]/75 to-transparent pointer-events-none z-10" />
            {/* Top and Bottom feathering */}
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#141414] via-[#141414]/85 to-transparent pointer-events-none z-10" />
          </div>
        )}

        {/* Left darkening gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/90 to-transparent w-full md:w-[65%] lg:w-[54%] z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-44 sm:h-64 bg-gradient-to-t from-[#141414] via-[#141414]/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/70 to-transparent z-10 pointer-events-none" />
      </div>

      {/* Hero Content Container with TV Overscan Safe Area */}
      <div className="relative z-20 h-full flex flex-col justify-end pb-16 sm:pb-24 md:pb-32 px-4 sm:px-8 md:px-12 lg:px-16 max-w-4xl">
        {/* Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight mb-3 sm:mb-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
          {media.title || media.name}
        </h1>

        {/* Badges: Top 10, Match, Year, Maturity, 4K UHD, Audio */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3.5 text-xs sm:text-sm">
          <div className="flex items-center space-x-1.5 bg-[#E50914] text-white px-2.5 py-0.5 rounded font-black text-[11px] uppercase tracking-wider shadow-md">
            <span>TOP 10</span>
          </div>
          <span className="font-extrabold text-white text-xs sm:text-sm">
            #1 in {media.media_type === "tv" ? "TV Series" : "Movies"} Today
          </span>
          <span className="text-[#46d369] font-bold text-xs sm:text-sm">
            {media.matchScore || 98}% Match
          </span>
          <span className="text-neutral-300 font-semibold">{releaseYear}</span>
          <span className="px-1.5 py-0.5 border border-neutral-500 rounded text-[10px] sm:text-xs text-neutral-200 font-bold">
            {media.maturityRating || "PG-13"}
          </span>
          <span className="px-1.5 py-0.5 border border-amber-400/80 text-amber-400 rounded text-[10px] sm:text-xs font-black">
            4K ULTRA HD
          </span>
          <span className="px-1.5 py-0.5 border border-neutral-600 rounded text-[10px] text-neutral-300 font-bold hidden sm:inline-block">
            5.1 ATMOS
          </span>

          {onOpenStore && (
            <button
              data-tv-focusable="true"
              onClick={onOpenStore}
              className="flex items-center space-x-1.5 px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-bold transition duration-200 cursor-pointer focus:ring-4 focus:ring-amber-400 focus:scale-105 outline-none"
            >
              <Crown className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Get 4K Account ($2.99)</span>
            </button>
          )}
        </div>

        {/* Synopsis / Description */}
        <p className="text-xs sm:text-sm md:text-base text-neutral-200 line-clamp-3 leading-relaxed mb-6 drop-shadow-md max-w-2xl">
          {media.overview}
        </p>

        {/* Primary Action Buttons (TV D-Pad Focusable) */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Watch Now / Play Button */}
          <button
            id="hero-play-btn"
            data-tv-focusable="true"
            tabIndex={0}
            onClick={() => onPlay(media)}
            className="flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 bg-white hover:bg-neutral-200 text-black font-extrabold text-sm sm:text-base rounded-lg transition-all duration-200 active:scale-95 cursor-pointer shadow-xl focus:ring-4 focus:ring-amber-400 focus:scale-110 focus:shadow-[0_0_25px_rgba(245,158,11,0.9)] outline-none"
          >
            <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-black text-black" />
            <span>Watch Now</span>
          </button>

          {/* More Info Button */}
          <button
            id="hero-info-btn"
            data-tv-focusable="true"
            tabIndex={0}
            onClick={() => onOpenDetail(media)}
            className="flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 bg-neutral-800/80 hover:bg-neutral-700 text-white font-bold text-sm sm:text-base rounded-lg backdrop-blur-sm transition-all duration-200 active:scale-95 cursor-pointer shadow-lg border border-white/20 focus:ring-4 focus:ring-amber-400 focus:scale-110 outline-none"
          >
            <Info className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>More Info</span>
          </button>

          {/* Add to My List */}
          <button
            data-tv-focusable="true"
            tabIndex={0}
            onClick={() => onToggleMyList(media)}
            className="flex items-center justify-center p-3 rounded-full border border-white/40 hover:border-white text-white hover:bg-white/10 transition backdrop-blur-sm cursor-pointer focus:ring-4 focus:ring-amber-400 focus:scale-110 outline-none"
            title={isInMyList ? "Remove from My List" : "Add to My List"}
            aria-label={isInMyList ? "Remove from My List" : "Add to My List"}
          >
            {isInMyList ? <Check className="w-5 h-5 text-[#46d369]" /> : <Plus className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Right Controls: Sound Always-On Toggle & Maturity Rating Tag */}
      <div className="absolute right-0 bottom-24 sm:bottom-32 md:bottom-40 z-20 flex items-center space-x-2 sm:space-x-3 pr-4 sm:pr-8 md:pr-12">
        <button
          id="hero-sound-toggle-btn"
          data-tv-focusable="true"
          tabIndex={0}
          onClick={handleToggleSound}
          className={`p-2.5 sm:p-3 rounded-full border-2 transition-all duration-200 cursor-pointer focus:ring-4 focus:ring-amber-400 focus:scale-110 outline-none flex items-center justify-center backdrop-blur-md shadow-lg ${
            !isMuted
              ? "border-emerald-400/80 bg-black/75 text-emerald-400 hover:border-emerald-300"
              : "border-white/40 bg-black/60 text-white/80 hover:border-white hover:text-white"
          }`}
          title={isMuted ? "Turn Sound ON" : "Mute Sound"}
          aria-label={isMuted ? "Turn Sound ON" : "Mute Sound"}
        >
          {!isMuted ? (
            <Volume2 className="w-5 h-5 text-[#46d369]" />
          ) : (
            <VolumeX className="w-5 h-5 text-neutral-300" />
          )}
        </button>

        <div className="bg-black/60 border-l-4 border-[#E50914] py-1.5 px-3.5 sm:px-4 text-xs sm:text-sm font-black text-neutral-200 backdrop-blur-xs">
          {media.maturityRating || "16+"}
        </div>
      </div>
    </section>
  );
};

export default NetflixHero;
