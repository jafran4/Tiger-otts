import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  X,
  Check,
  Film,
  Tv,
  Play,
  Info,
  Heart,
  Bookmark,
  Crown,
  Zap,
  Sparkles,
  Layers,
} from "lucide-react";
import { ActiveNavTab, UserProfile, NotificationItem, MediaItem } from "../types";
import { PROFILES, NOTIFICATIONS } from "../data/fallbackData";
import { TigerLogo } from "./TigerLogo";

interface NetflixNavbarProps {
  activeTab: ActiveNavTab;
  onSelectTab: (tab: ActiveNavTab) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearSearch: () => void;
  currentProfile: UserProfile;
  onSelectProfile: (profile: UserProfile) => void;
  myListCount: number;
  onOpenDetailModal?: (media: MediaItem) => void;
  onOpenTVHelp?: () => void;
  isTVMode?: boolean;
  onSelectGenre?: (genre: string) => void;
  activeGenre?: string | null;
}

const GENRES_LIST = [
  "All Genres",
  "Action",
  "Sci-Fi",
  "Comedy",
  "Drama",
  "Thriller",
  "Horror",
  "Animation",
  "Top Rated",
];

const NetflixNavbar: React.FC<NetflixNavbarProps> = ({
  activeTab,
  onSelectTab,
  searchQuery,
  onSearchChange,
  onClearSearch,
  currentProfile,
  onSelectProfile,
  myListCount,
  onOpenDetailModal,
  onOpenTVHelp,
  isTVMode = false,
  onSelectGenre,
  activeGenre,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [genresOpen, setGenresOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSearch = () => {
    if (!searchOpen) {
      setSearchOpen(true);
      setTimeout(() => searchInputRef.current?.focus(), 150);
    } else if (!searchQuery) {
      setSearchOpen(false);
    }
  };

  return (
    <header
      id="netflix-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-500 ease-in-out px-4 sm:px-8 md:px-12 lg:px-16 py-3 sm:py-4 flex items-center justify-between ${
        isScrolled
          ? "bg-[#141414]/95 backdrop-blur-md shadow-2xl border-b border-white/5"
          : "bg-gradient-to-b from-black/90 via-black/40 to-transparent"
      }`}
    >
      {/* Left section: Logo and Primary Navigation */}
      <div className="flex items-center space-x-3 sm:space-x-6 lg:space-x-8">
        {/* Brand Logo */}
        <button
          data-tv-focusable="true"
          onClick={() => {
            onSelectTab("home");
            onClearSearch();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center space-x-2 focus:outline-none group text-left focus:ring-2 focus:ring-amber-400 rounded-lg p-1"
          aria-label="Tiger OTT Home"
        >
          <TigerLogo size="sm" className="group-hover:scale-105 transition-transform duration-200" />
          {isTVMode && (
            <span className="hidden sm:inline-block px-1.5 py-0.5 bg-amber-500 text-black font-black text-[9px] rounded uppercase">
              TV MODE
            </span>
          )}
        </button>

        {/* Primary Nav Links */}
        <nav className="hidden md:flex items-center space-x-3 lg:space-x-5 text-xs lg:text-sm font-semibold">
          <button
            data-tv-focusable="true"
            onClick={() => {
              onSelectTab("home");
              if (searchQuery) onClearSearch();
            }}
            className={`transition duration-300 px-2 py-1 rounded focus:ring-2 focus:ring-amber-400 outline-none ${
              activeTab === "home" && !searchQuery
                ? "text-white font-black"
                : "text-neutral-300 hover:text-white"
            }`}
          >
            Home
          </button>
          <button
            data-tv-focusable="true"
            onClick={() => {
              onSelectTab("tv");
              if (searchQuery) onClearSearch();
            }}
            className={`transition duration-300 px-2 py-1 rounded focus:ring-2 focus:ring-amber-400 outline-none ${
              activeTab === "tv"
                ? "text-white font-black"
                : "text-neutral-300 hover:text-white"
            }`}
          >
            TV Series
          </button>
          <button
            data-tv-focusable="true"
            onClick={() => {
              onSelectTab("movies");
              if (searchQuery) onClearSearch();
            }}
            className={`transition duration-300 px-2 py-1 rounded focus:ring-2 focus:ring-amber-400 outline-none ${
              activeTab === "movies"
                ? "text-white font-black"
                : "text-neutral-300 hover:text-white"
            }`}
          >
            Movies
          </button>

          {/* Genres Dropdown */}
          <div className="relative">
            <button
              data-tv-focusable="true"
              onClick={() => setGenresOpen(!genresOpen)}
              className={`transition duration-300 px-2 py-1 rounded flex items-center space-x-1 focus:ring-2 focus:ring-amber-400 outline-none ${
                activeGenre ? "text-amber-400 font-bold" : "text-neutral-300 hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{activeGenre || "Genres"}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {genresOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-[#181818] border border-neutral-700 rounded-xl shadow-2xl p-2 z-50 animate-fadeIn divide-y divide-neutral-800">
                {GENRES_LIST.map((genre) => (
                  <button
                    key={genre}
                    data-tv-focusable="true"
                    onClick={() => {
                      if (onSelectGenre) onSelectGenre(genre === "All Genres" ? "" : genre);
                      setGenresOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-semibold rounded hover:bg-neutral-800 transition ${
                      activeGenre === genre || (!activeGenre && genre === "All Genres")
                        ? "text-[#E50914] font-black"
                        : "text-neutral-300"
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            data-tv-focusable="true"
            onClick={() => {
              onSelectTab("new");
              if (searchQuery) onClearSearch();
            }}
            className={`transition duration-300 px-2 py-1 rounded focus:ring-2 focus:ring-amber-400 outline-none ${
              activeTab === "new"
                ? "text-white font-black"
                : "text-neutral-300 hover:text-white"
            }`}
          >
            Trending
          </button>
          <button
            data-tv-focusable="true"
            onClick={() => {
              onSelectTab("mylist");
              if (searchQuery) onClearSearch();
            }}
            className={`relative transition duration-300 px-2 py-1 rounded flex items-center space-x-1 focus:ring-2 focus:ring-amber-400 outline-none ${
              activeTab === "mylist"
                ? "text-white font-black"
                : "text-neutral-300 hover:text-white"
            }`}
          >
            <span>My List</span>
            {myListCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-[#E50914] text-white text-[10px] font-bold rounded-full">
                {myListCount}
              </span>
            )}
          </button>

          {/* OTT Store Pill */}
          <button
            id="nav-ott-store-btn"
            data-tv-focusable="true"
            onClick={() => {
              onSelectTab("ott_store");
              if (searchQuery) onClearSearch();
              setTimeout(() => {
                const el = document.getElementById("tiger-ott-subscription");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }, 60);
            }}
            className={`relative transition duration-300 flex items-center space-x-1.5 px-3 py-1 rounded-full border cursor-pointer focus:ring-4 focus:ring-amber-400 outline-none ${
              activeTab === "ott_store"
                ? "bg-[#E50914] border-[#E50914] text-white font-black shadow-lg"
                : "bg-amber-500/10 border-amber-500/40 text-amber-300 hover:bg-amber-500/20 hover:text-white"
            }`}
          >
            <Crown className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-extrabold tracking-tight">OTT Store</span>
            <span className="bg-amber-400 text-black text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-tighter">
              85% OFF
            </span>
          </button>
        </nav>
      </div>

      {/* Right Section: TV Remote Guide Button, Search, Notifications */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* TV Remote Helper Button */}
        {onOpenTVHelp && (
          <button
            data-tv-focusable="true"
            onClick={onOpenTVHelp}
            className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-neutral-200 border border-white/10 text-xs font-bold transition focus:ring-4 focus:ring-amber-400 outline-none cursor-pointer"
            title="TV Remote Navigation & Shortcuts"
          >
            <Tv className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">TV Remote</span>
          </button>
        )}

        {/* Mobile Quick Store Trigger */}
        <button
          onClick={() => {
            onSelectTab("ott_store");
            if (searchQuery) onClearSearch();
            setTimeout(() => {
              const el = document.getElementById("tiger-ott-subscription");
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }, 60);
          }}
          className="md:hidden flex items-center space-x-1 bg-[#E50914] text-white px-2 py-1 rounded-full text-[10px] font-black uppercase shadow cursor-pointer"
        >
          <Crown className="w-3 h-3 fill-amber-300 text-amber-300" />
          <span>OTT Store</span>
        </button>

        {/* Search Bar Toggle */}
        <div
          className={`flex items-center border transition-all duration-300 rounded-md ${
            searchOpen || searchQuery
              ? "w-40 sm:w-64 md:w-72 bg-black/90 border-white/70 px-2 py-1"
              : "w-8 bg-transparent border-transparent p-1"
          }`}
        >
          <button
            data-tv-focusable="true"
            onClick={toggleSearch}
            className="text-white hover:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded p-0.5 cursor-pointer"
            aria-label="Search movies & TV shows"
          >
            <Search className="w-5 h-5" />
          </button>

          {(searchOpen || searchQuery) && (
            <>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search titles, actors, genres..."
                className="w-full bg-transparent text-white text-xs sm:text-sm px-2 focus:outline-none placeholder:text-neutral-500 font-normal"
              />
              {searchQuery && (
                <button
                  onClick={onClearSearch}
                  className="text-neutral-400 hover:text-white p-0.5"
                  aria-label="Clear search query"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </>
          )}
        </div>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            data-tv-focusable="true"
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative text-white hover:text-neutral-300 p-1 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded transition"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-[#E50914] rounded-full ring-2 ring-[#141414]" />
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-[#141414]/98 border border-neutral-700/80 rounded-lg shadow-2xl p-3 z-50 animate-fadeIn backdrop-blur-xl divide-y divide-neutral-800">
              <div className="flex items-center justify-between pb-2 px-1">
                <span className="text-sm font-bold text-white">Notifications</span>
                <span className="text-[11px] text-[#E50914] font-semibold cursor-pointer">Mark all read</span>
              </div>
              <div className="space-y-2 pt-2 max-h-80 overflow-y-auto">
                {NOTIFICATIONS.map((n) => (
                  <div
                    key={n.id}
                    className="flex items-start space-x-3 p-2 rounded-md hover:bg-neutral-800/60 transition cursor-pointer"
                  >
                    <img
                      src={n.image}
                      alt={n.title}
                      className="w-16 h-10 object-cover rounded-sm flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-white truncate">{n.title}</p>
                      <p className="text-[11px] text-neutral-300 line-clamp-2">{n.message}</p>
                      <span className="text-[10px] text-neutral-500">{n.timeAgo}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NetflixNavbar;
