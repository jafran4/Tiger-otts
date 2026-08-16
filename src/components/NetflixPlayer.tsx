import React, { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Settings,
  MessageSquare,
  FastForward,
  Tv,
} from "lucide-react";
import { MediaItem } from "../types";
import { fetchTrailerKey } from "../services/tmdb";

interface NetflixPlayerProps {
  media: MediaItem;
  onClose: () => void;
}

const NetflixPlayer: React.FC<NetflixPlayerProps> = ({ media, onClose }) => {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    try {
      const pref = localStorage.getItem("netflix_sound_preference");
      return pref === "muted"; // Default is unmuted (Always Sound ON)
    } catch {
      return false;
    }
  });
  const [volume, setVolume] = useState<number>(100);
  const [progress, setProgress] = useState(15); // Percentage
  const [currentTime, setCurrentTime] = useState(120); // Seconds
  const [totalDuration, setTotalDuration] = useState(7200); // 2 hours
  const [showControls, setShowControls] = useState(true);
  const [showSkipIntro, setShowSkipIntro] = useState(true);
  const [speed, setSpeed] = useState<number>(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showAudioMenu, setShowAudioMenu] = useState(false);
  const [audioLang, setAudioLang] = useState("English [Original] (Dolby Atmos 5.1)");
  const [subtitles, setSubtitles] = useState("English [CC]");
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<any>(null);
  const playBtnRef = useRef<HTMLButtonElement>(null);
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

  const toggleMute = () => {
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
      sendIframeCommand("setVolume", [volume]);
    }
  };

  const togglePlay = () => {
    const nextPlay = !isPlaying;
    setIsPlaying(nextPlay);
    if (nextPlay) {
      sendIframeCommand("playVideo");
      if (!isMuted) {
        sendIframeCommand("unMute");
        sendIframeCommand("setVolume", [volume]);
      }
    } else {
      sendIframeCommand("pauseVideo");
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
        sendIframeCommand("setVolume", [volume]);
      }
    };
    window.addEventListener("netflix_sound_change", handleSoundPref);
    return () => window.removeEventListener("netflix_sound_change", handleSoundPref);
  }, [volume]);

  useEffect(() => {
    // Fetch trailer key
    const loadTrailer = async () => {
      if (media.trailerKey) {
        setTrailerKey(media.trailerKey);
      } else {
        const key = await fetchTrailerKey(media.id, media.media_type || "movie");
        setTrailerKey(key || "Way9Dexny3w"); // Dune 2 trailer fallback
      }
    };
    loadTrailer();

    // Auto focus primary control
    setTimeout(() => {
      playBtnRef.current?.focus();
    }, 200);

    // Keydown listeners for TV Remote & Keyboard Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // TV Remote Back Keys: Escape, Backspace, or TV vendor codes (10009 Tizen, 461 webOS)
      if (
        e.key === "Escape" ||
        e.key === "Backspace" ||
        e.key === "BrowserBack" ||
        e.keyCode === 10009 ||
        e.keyCode === 461 ||
        e.keyCode === 27
      ) {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === " " || e.key === "Enter" || e.keyCode === 13) {
        // Toggle play/pause if no submenu is open
        if (!showSpeedMenu && !showAudioMenu) {
          togglePlay();
          wakeControls();
        }
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        setCurrentTime((t) => {
          const next = Math.min(totalDuration, t + 10);
          setProgress((next / totalDuration) * 100);
          return next;
        });
        sendIframeCommand("seekTo", [Math.min(totalDuration, currentTime + 10), true]);
        wakeControls();
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setCurrentTime((t) => {
          const next = Math.max(0, t - 10);
          setProgress((next / totalDuration) * 100);
          return next;
        });
        sendIframeCommand("seekTo", [Math.max(0, currentTime - 10), true]);
        wakeControls();
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setVolume((v) => {
          const next = Math.min(100, v + 10);
          sendIframeCommand("setVolume", [next]);
          if (isMuted) toggleMute();
          return next;
        });
        wakeControls();
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setVolume((v) => {
          const next = Math.max(0, v - 10);
          sendIframeCommand("setVolume", [next]);
          return next;
        });
        wakeControls();
      }

      if (e.key.toLowerCase() === "m") {
        toggleMute();
        wakeControls();
      }

      if (e.key.toLowerCase() === "f") {
        toggleFullscreen();
        wakeControls();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Hide intro button after 45 seconds
    const introTimer = setTimeout(() => setShowSkipIntro(false), 45000);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(introTimer);
    };
  }, [media, onClose, totalDuration, showSpeedMenu, showAudioMenu, isPlaying, isMuted, volume, currentTime]);

  const handleIframeLoad = () => {
    if (!isMuted) {
      setTimeout(() => {
        sendIframeCommand("unMute");
        sendIframeCommand("setVolume", [volume]);
        sendIframeCommand("playVideo");
      }, 400);
    }
  };

  // Handle auto-hide controls on TV idle
  const wakeControls = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
      setShowSpeedMenu(false);
      setShowAudioMenu(false);
    }, 4500);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = Math.floor(secs % 60);
    if (hours > 0) {
      return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newProgress = Math.max(0, Math.min(100, pos * 100));
    setProgress(newProgress);
    setCurrentTime(Math.round((newProgress / 100) * totalDuration));
  };

  const title = media.title || media.name || media.original_title || "Now Playing";

  return (
    <div
      ref={containerRef}
      id="netflix-full-video-player"
      onMouseMove={wakeControls}
      onClick={wakeControls}
      className="fixed inset-0 z-50 bg-black text-white flex flex-col justify-between overflow-hidden cursor-default select-none animate-fadeIn"
    >
      {/* Video Stream Iframe (YouTube cinema embed) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {trailerKey && (
          <iframe
            ref={iframeRef}
            src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1&mute=${
              isMuted ? 1 : 0
            }&playsinline=1&controls=0&rel=0&modestbranding=1&enablejsapi=1&iv_load_policy=3&disablekb=1&origin=${
              typeof window !== "undefined" ? encodeURIComponent(window.location.origin) : ""
            }`}
            title="Video Player"
            className="w-full h-full object-cover scale-105"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            onLoad={handleIframeLoad}
          />
        )}
      </div>

      {/* Top Bar with TV Remote Back Button & Title */}
      <div
        className={`relative z-30 flex items-center justify-between p-4 sm:p-8 bg-gradient-to-b from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center space-x-4">
          <button
            onClick={onClose}
            className="p-3 rounded-full hover:bg-white/20 text-white transition focus:ring-4 focus:ring-amber-400 outline-none cursor-pointer"
            aria-label="Back to details (Remote BACK key)"
            title="Return (Press Back)"
          >
            <ArrowLeft className="w-7 h-7 sm:w-8 sm:h-8" />
          </button>
          <div>
            <h1 className="text-xl sm:text-3xl font-extrabold text-white drop-shadow-md">
              {title}
            </h1>
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-neutral-300">
              <span className="text-[#46d369] font-bold">4K Ultra HD</span>
              <span>•</span>
              <span>Dolby Atmos 5.1</span>
              <span>•</span>
              <span>{media.maturityRating || "16+"}</span>
              <span>•</span>
              <span className="text-emerald-400 font-bold hidden sm:inline-block">
                {!isMuted ? "🔊 Sound Active" : "🔇 Muted"}
              </span>
            </div>
          </div>
        </div>

        {/* TV Remote Tip indicator */}
        <div className="hidden md:flex items-center space-x-2 bg-black/60 border border-white/20 px-3 py-1.5 rounded-xl text-xs text-neutral-300">
          <Tv className="w-4 h-4 text-amber-400" />
          <span>Remote: ⬅️ ➡️ Seek • ⬆️ ⬇️ Volume • OK Play/Pause • BACK Exit</span>
        </div>
      </div>

      {/* Center Skip Intro Button */}
      {showSkipIntro && showControls && (
        <div className="relative z-30 self-end mr-6 sm:mr-12 mb-8 animate-fadeIn">
          <button
            onClick={() => {
              setCurrentTime((t) => Math.min(totalDuration, t + 85));
              setProgress(((currentTime + 85) / totalDuration) * 100);
              setShowSkipIntro(false);
            }}
            className="px-6 py-2.5 bg-black/70 hover:bg-white/20 text-white font-bold border-2 border-white/70 hover:border-white rounded text-sm sm:text-base backdrop-blur-sm transition focus:ring-4 focus:ring-amber-400 outline-none cursor-pointer"
          >
            Skip Intro
          </button>
        </div>
      )}

      {/* Bottom Controls Bar */}
      <div
        className={`relative z-30 p-4 sm:p-8 bg-gradient-to-t from-black/95 via-black/70 to-transparent transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Progress Bar (Scrubber) */}
        <div
          onClick={handleSeek}
          className="relative w-full h-2 sm:h-2.5 bg-neutral-700/80 hover:h-3 rounded-full cursor-pointer transition-all mb-4 group"
        >
          {/* Filled Red Progress */}
          <div
            className="h-full bg-[#E50914] rounded-full relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#E50914] border-2 border-white rounded-full scale-0 group-hover:scale-100 transition-transform shadow" />
          </div>
        </div>

        {/* Player Controls Row */}
        <div className="flex items-center justify-between">
          {/* Left Controls: Play, Rewind 10s, Forward 10s, Volume, Time */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Play / Pause Toggle */}
            <button
              ref={playBtnRef}
              onClick={togglePlay}
              className="p-2 sm:p-2.5 rounded-full hover:bg-white/20 text-white transition focus:ring-4 focus:ring-amber-400 outline-none cursor-pointer"
              title={isPlaying ? "Pause (Space/OK)" : "Play (Space/OK)"}
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 sm:w-8 sm:h-8 fill-white" />
              ) : (
                <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white" />
              )}
            </button>

            {/* Rewind 10s */}
            <button
              onClick={() => {
                setCurrentTime((t) => Math.max(0, t - 10));
                setProgress(((currentTime - 10) / totalDuration) * 100);
                sendIframeCommand("seekTo", [Math.max(0, currentTime - 10), true]);
              }}
              className="p-2 rounded-full hover:bg-white/20 text-white transition focus:ring-4 focus:ring-amber-400 outline-none cursor-pointer"
              title="Rewind 10 seconds (Left Arrow)"
            >
              <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Forward 10s */}
            <button
              onClick={() => {
                setCurrentTime((t) => Math.min(totalDuration, t + 10));
                setProgress(((currentTime + 10) / totalDuration) * 100);
                sendIframeCommand("seekTo", [Math.min(totalDuration, currentTime + 10), true]);
              }}
              className="p-2 rounded-full hover:bg-white/20 text-white transition focus:ring-4 focus:ring-amber-400 outline-none cursor-pointer"
              title="Forward 10 seconds (Right Arrow)"
            >
              <RotateCw className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Sound & Volume Control Group */}
            <div className="flex items-center space-x-2 group/volume relative">
              <button
                onClick={toggleMute}
                className="p-2 rounded-full hover:bg-white/20 text-white transition focus:ring-4 focus:ring-amber-400 outline-none cursor-pointer"
                title={isMuted ? "Click to Turn Sound ON (M)" : `Sound ON ${volume}% (Click to Mute)`}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
                ) : (
                  <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                )}
              </button>

              {/* Volume Slider */}
              <div className="hidden sm:flex items-center space-x-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    const newVol = Number(e.target.value);
                    setVolume(newVol);
                    if (isMuted && newVol > 0) setIsMuted(false);
                    sendIframeCommand("setVolume", [newVol]);
                    if (newVol > 0) sendIframeCommand("unMute");
                  }}
                  className="w-16 sm:w-20 md:w-24 h-1.5 bg-neutral-600 rounded-lg appearance-none cursor-pointer accent-[#E50914]"
                  title={`Volume: ${isMuted ? 0 : volume}%`}
                />
                <span className="text-[11px] font-mono text-neutral-300 min-w-[28px]">
                  {isMuted ? "0%" : `${volume}%`}
                </span>
              </div>
            </div>

            {/* Time Stamp Display */}
            <div className="text-xs sm:text-sm font-semibold text-neutral-300 hidden sm:block">
              <span>{formatTime(currentTime)}</span>
              <span className="mx-1 text-neutral-500">/</span>
              <span>{formatTime(totalDuration)}</span>
            </div>
          </div>

          {/* Right Controls: Audio/Subtitles, Speed, Fullscreen */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Audio & Subtitles */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowAudioMenu(!showAudioMenu);
                  setShowSpeedMenu(false);
                }}
                className={`p-2 rounded-full transition focus:ring-4 focus:ring-amber-400 outline-none cursor-pointer ${
                  showAudioMenu ? "bg-white text-black" : "hover:bg-white/20 text-white"
                }`}
                title="Audio and Subtitles"
              >
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {showAudioMenu && (
                <div className="absolute right-0 bottom-12 w-64 bg-[#181818] border border-white/20 rounded-xl p-4 shadow-2xl text-xs space-y-3 z-40 animate-fadeIn">
                  <div>
                    <h4 className="font-bold text-neutral-400 uppercase text-[10px] mb-1.5">
                      Audio
                    </h4>
                    {["English [Original] (Dolby 5.1)", "Arabic [Dolby 5.1]", "Hindi [Stereo]", "Spanish [Original]"].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setAudioLang(lang);
                          setShowAudioMenu(false);
                        }}
                        className={`w-full text-left py-1 px-2 rounded font-medium ${
                          audioLang === lang ? "bg-neutral-700 text-white font-bold" : "text-neutral-300 hover:bg-neutral-800"
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>

                  <div className="border-t border-neutral-700 pt-2">
                    <h4 className="font-bold text-neutral-400 uppercase text-[10px] mb-1.5">
                      Subtitles
                    </h4>
                    {["Off", "English [CC]", "Arabic", "Hindi", "Spanish"].map((sub) => (
                      <button
                        key={sub}
                        onClick={() => {
                          setSubtitles(sub);
                          setShowAudioMenu(false);
                        }}
                        className={`w-full text-left py-1 px-2 rounded font-medium ${
                          subtitles === sub ? "bg-neutral-700 text-white font-bold" : "text-neutral-300 hover:bg-neutral-800"
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Playback Speed */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowSpeedMenu(!showSpeedMenu);
                  setShowAudioMenu(false);
                }}
                className={`p-2 rounded-full transition focus:ring-4 focus:ring-amber-400 outline-none cursor-pointer text-xs font-bold ${
                  showSpeedMenu ? "bg-white text-black" : "hover:bg-white/20 text-white"
                }`}
                title="Playback Speed"
              >
                <span>{speed}x</span>
              </button>

              {showSpeedMenu && (
                <div className="absolute right-0 bottom-12 w-32 bg-[#181818] border border-white/20 rounded-xl p-2 shadow-2xl text-xs space-y-1 z-40 animate-fadeIn">
                  {[0.75, 1, 1.25, 1.5, 2].map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setSpeed(s);
                        setShowSpeedMenu(false);
                      }}
                      className={`w-full text-left py-1.5 px-3 rounded font-bold ${
                        speed === s ? "bg-[#E50914] text-white" : "text-neutral-300 hover:bg-neutral-800"
                      }`}
                    >
                      {s}x {s === 1 && "(Normal)"}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-full hover:bg-white/20 text-white transition focus:ring-4 focus:ring-amber-400 outline-none cursor-pointer"
              title="Fullscreen (F)"
            >
              <Maximize className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetflixPlayer;
