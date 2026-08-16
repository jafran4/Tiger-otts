import React, { useState, useEffect, useRef } from "react";
import { X, Play, Plus, Check, ThumbsUp, Volume2, VolumeX, Crown, Zap, ShieldCheck, Film, Sparkles } from "lucide-react";
import { MediaItem } from "../types";
import { fetchTrailerKey, fetchMediaCredits, fetchSimilarMedia } from "../services/tmdb";

interface NetflixDetailModalProps {
  media: MediaItem | null;
  onClose: () => void;
  onPlay: (media: MediaItem) => void;
  isInMyList: boolean;
  onToggleMyList: (media: MediaItem) => void;
  onSelectSimilar: (media: MediaItem) => void;
  onOpenStore?: () => void;
}

const NetflixDetailModal: React.FC<NetflixDetailModalProps> = ({
  media,
  onClose,
  onPlay,
  isInMyList,
  onToggleMyList,
  onSelectSimilar,
  onOpenStore,
}) => {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    try {
      const pref = localStorage.getItem("netflix_sound_preference");
      return pref === "muted"; // Default is unmuted (Sound Always ON)
    } catch {
      return false;
    }
  });
  const [credits, setCredits] = useState<{ cast: string[]; director?: string }>({ cast: [] });
  const [similar, setSimilar] = useState<MediaItem[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const watchBtnRef = useRef<HTMLButtonElement>(null);
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

  const handleToggleSound = () => {
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

    // Lock body scrolling
    document.body.style.overflow = "hidden";

    // Auto focus the primary Watch Now button on mount for TV remote ease
    setTimeout(() => {
      watchBtnRef.current?.focus();
    }, 150);

    // Load trailer, credits, and similar titles
    const loadDetails = async () => {
      if (media.trailerKey) {
        setTrailerKey(media.trailerKey);
      } else {
        const key = await fetchTrailerKey(media.id, media.media_type || "movie");
        setTrailerKey(key || "Way9Dexny3w");
      }

      const creds = await fetchMediaCredits(media.id, media.media_type || "movie");
      setCredits(creds);

      const sim = await fetchSimilarMedia(media.id, media.media_type || "movie");
      setSimilar(sim);
    };

    loadDetails();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Backspace" || e.keyCode === 10009 || e.keyCode === 461) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [media, onClose]);

  if (!media) return null;

  const backdropUrl = media.backdrop_path
    ? media.backdrop_path.startsWith("http")
      ? media.backdrop_path
      : `https://image.tmdb.org/t/p/original${media.backdrop_path}`
    : media.poster_path
    ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
    : "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&auto=format&fit=crop&q=80";

  const title = media.title || media.name || media.original_title || "Untitled";
  const releaseYear = media.release_date
    ? new Date(media.release_date).getFullYear()
    : media.first_air_date
    ? new Date(media.first_air_date).getFullYear()
    : 2024;

  return (
    <div
      id="netflix-detail-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex justify-center p-0 sm:p-4 md:p-8 animate-fadeIn select-none"
      onClick={onClose}
    >
      <div
        id="netflix-detail-modal-container"
        className="relative w-full max-w-5xl bg-[#181818] text-white rounded-none sm:rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)] my-auto border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button (TV Remote & Mouse) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-[#181818]/90 hover:bg-neutral-800 text-white border border-white/20 transition cursor-pointer focus:ring-4 focus:ring-amber-400 outline-none"
          aria-label="Close modal (Press Back on Remote)"
          title="Press Back or Escape to close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Hero Video Banner / Backdrop Header */}
        <div className="relative w-full aspect-video sm:h-[420px] md:h-[480px] bg-black overflow-hidden">
          {trailerKey ? (
            <iframe
              ref={iframeRef}
              src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1&mute=${
                isMuted ? 1 : 0
              }&controls=0&loop=1&playlist=${trailerKey}&showinfo=0&rel=0&modestbranding=1&enablejsapi=1&iv_load_policy=3&disablekb=1&origin=${
                typeof window !== "undefined" ? encodeURIComponent(window.location.origin) : ""
              }`}
              title="Movie preview"
              className="w-full h-full object-cover scale-110 pointer-events-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
              onLoad={() => {
                if (!isMuted) {
                  setTimeout(() => {
                    sendIframeCommand("unMute");
                    sendIframeCommand("setVolume", [100]);
                  }, 500);
                }
              }}
            />
          ) : (
            <img
              src={backdropUrl}
              alt={title}
              className="w-full h-full object-cover brightness-90"
            />
          )}

          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#181818]/90 via-transparent to-transparent w-3/5" />

          {/* Floating Actions on Hero Banner */}
          <div className="absolute left-6 sm:left-10 bottom-8 sm:bottom-12 z-20 max-w-lg">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
              {title}
            </h2>

            <div className="flex flex-wrap items-center gap-3">
              {/* Watch Now Button (Auto-focused for TV remote) */}
              <button
                ref={watchBtnRef}
                data-tv-focusable="true"
                tabIndex={0}
                onClick={() => {
                  onClose();
                  onPlay(media);
                }}
                className="flex items-center space-x-2 px-7 py-3 bg-white hover:bg-neutral-200 text-black font-extrabold rounded-lg text-base transition active:scale-95 shadow-xl focus:ring-4 focus:ring-amber-400 focus:scale-110 focus:shadow-[0_0_25px_rgba(245,158,11,0.9)] outline-none cursor-pointer"
              >
                <Play className="w-5 h-5 fill-black text-black" />
                <span>Watch Now</span>
              </button>

              {/* Add to List */}
              <button
                data-tv-focusable="true"
                tabIndex={0}
                onClick={() => onToggleMyList(media)}
                className="p-3 rounded-full border-2 border-neutral-400 hover:border-white text-white hover:bg-white/10 transition cursor-pointer focus:ring-4 focus:ring-amber-400 focus:scale-110 outline-none"
                title={isInMyList ? "In My List" : "Add to My List"}
              >
                {isInMyList ? <Check className="w-5 h-5 text-[#46d369]" /> : <Plus className="w-5 h-5" />}
              </button>

              {/* Like Button */}
              <button
                data-tv-focusable="true"
                tabIndex={0}
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 rounded-full border-2 transition cursor-pointer focus:ring-4 focus:ring-amber-400 focus:scale-110 outline-none ${
                  isLiked
                    ? "border-[#46d369] bg-[#46d369]/20 text-[#46d369]"
                    : "border-neutral-400 hover:border-white text-white hover:bg-white/10"
                }`}
              >
                <ThumbsUp className="w-5 h-5" />
              </button>

              {/* Mute/Unmute Sound Always ON toggle */}
              <button
                data-tv-focusable="true"
                tabIndex={0}
                onClick={handleToggleSound}
                className={`flex items-center space-x-1.5 px-3.5 py-2.5 rounded-full border-2 transition cursor-pointer focus:ring-4 focus:ring-amber-400 focus:scale-110 outline-none backdrop-blur-sm ${
                  !isMuted
                    ? "border-[#46d369] bg-[#46d369]/20 text-[#46d369]"
                    : "border-neutral-400 hover:border-white text-white hover:bg-white/10"
                }`}
                title={isMuted ? "Turn Sound ON (Always Sound)" : "Sound is ON (Click to Mute)"}
              >
                {!isMuted ? (
                  <Volume2 className="w-5 h-5 animate-pulse" />
                ) : (
                  <VolumeX className="w-5 h-5 text-red-400" />
                )}
                <span className="text-xs font-black">{!isMuted ? "Sound: ON 🔊" : "Unmute"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Body: Metadata & Information */}
        <div className="p-6 sm:p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left 2 Cols: Synopsis, Match %, Resolution Badges */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-sm font-semibold">
                <span className="text-[#46d369] font-black text-base">
                  {media.matchScore || 98}% Match
                </span>
                <span className="text-neutral-300 font-bold">{releaseYear}</span>
                <span className="px-2 py-0.5 border border-neutral-500 rounded text-xs text-neutral-200 font-bold">
                  {media.maturityRating || "16+"}
                </span>
                <span className="text-neutral-300">{media.duration || "2h 15m"}</span>
                <span className="px-2 py-0.5 border border-amber-400 text-amber-400 rounded text-xs font-black">
                  4K ULTRA HD
                </span>
                <span className="px-2 py-0.5 border border-neutral-500 rounded text-xs text-neutral-300 font-bold">
                  DOLBY ATMOS
                </span>
              </div>

              <p className="text-sm sm:text-base text-neutral-200 leading-relaxed">
                {media.overview}
              </p>

              {/* Premium OTT Subscription Banner */}
              {onOpenStore && (
                <div className="p-4 bg-gradient-to-r from-amber-950/40 via-red-950/40 to-neutral-900 border border-amber-500/30 rounded-xl flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-amber-400 font-extrabold text-sm">
                      <Crown className="w-4 h-4" />
                      <span>Stream Unlimited on Smart TV, Android & iOS</span>
                    </div>
                    <p className="text-xs text-neutral-300">
                      Private PIN-locked screen with 4K UHD guarantee. Instant delivery.
                    </p>
                  </div>
                  <button
                    data-tv-focusable="true"
                    tabIndex={0}
                    onClick={() => {
                      onClose();
                      onOpenStore();
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-extrabold text-xs sm:text-sm rounded-lg transition shadow-lg cursor-pointer focus:ring-4 focus:ring-amber-400 outline-none"
                  >
                    View Plans ($2.99)
                  </button>
                </div>
              )}
            </div>

            {/* Right Col: Cast, Director, Genres */}
            <div className="space-y-4 text-xs sm:text-sm text-neutral-400">
              {credits.cast && credits.cast.length > 0 && (
                <div>
                  <span className="text-neutral-500 block mb-1 font-bold">Cast:</span>
                  <p className="text-neutral-200 line-clamp-3 leading-relaxed">
                    {credits.cast.slice(0, 6).join(", ")}
                  </p>
                </div>
              )}

              {credits.director && (
                <div>
                  <span className="text-neutral-500 block mb-1 font-bold">Director:</span>
                  <p className="text-neutral-200">{credits.director}</p>
                </div>
              )}

              <div>
                <span className="text-neutral-500 block mb-1 font-bold">Genres:</span>
                <p className="text-neutral-200">
                  {media.genres?.join(", ") || "Action, Sci-Fi, Drama"}
                </p>
              </div>

              <div>
                <span className="text-neutral-500 block mb-1 font-bold">Audio & Subtitles:</span>
                <p className="text-neutral-200">
                  English [Original], Arabic, Hindi, Spanish (Dolby 5.1)
                </p>
              </div>
            </div>
          </div>

          {/* Similar Recommendations Section */}
          {similar && similar.length > 0 && (
            <div className="pt-6 border-t border-neutral-800">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
                More Like This
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                {similar.slice(0, 8).map((item) => (
                  <div
                    key={item.id}
                    data-tv-card="true"
                    tabIndex={0}
                    onClick={() => onSelectSimilar(item)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onSelectSimilar(item);
                      }
                    }}
                    className="bg-[#202020] rounded-lg overflow-hidden border border-white/5 hover:border-white/30 focus:border-amber-400 focus:ring-4 focus:ring-amber-400 focus:scale-105 transition cursor-pointer outline-none"
                  >
                    <div className="relative aspect-video">
                      <img
                        src={
                          item.backdrop_path
                            ? `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
                            : `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        }
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/70 rounded text-[10px] font-bold text-white">
                        {item.maturityRating || "16+"}
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="text-xs sm:text-sm font-bold text-white truncate mb-1">
                        {item.title || item.name}
                      </h4>
                      <p className="text-[11px] text-neutral-400 line-clamp-2">
                        {item.overview}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NetflixDetailModal;
