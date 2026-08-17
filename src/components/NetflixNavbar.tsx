import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  X,
  Menu,
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
  Home,
  Flame,
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const handleMobileNavClick = (tab: ActiveNavTab) => {
    onSelectTab(tab);
    if (searchQuery) onClearSearch();
    setMobileMenuOpen(false);
    if (tab === "ott_store") {
      setTimeout(() => {
        const el = document.getElementById("tiger-ott-subscription");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 80);
    }
  };

  return (
    <>
      <header
        id="netflix-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-500 ease-in-out px-3.5 sm:px-8 md:px-12 lg:px-16 py-2.5 sm:py-4 flex items-center justify-between ${
          isScrolled
            ? "bg-[#141414]/95 backdrop-blur-md shadow-2xl border-b border-white/5"
            : "bg-gradient-to-b from-black/95 via-black/50 to-transparent"
        }`}
      >
        {/* Left section: Hamburger (mobile), Logo and Primary Navigation */}
        <div className="flex items-center space-x-2 sm:space-x-6 lg:space-x-8">
          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-1.5 rounded-lg text-neutral-200 hover:text-white hover:bg-white/10 transition cursor-pointer"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Brand Logo */}
          <button
            data-tv-focusable="true"
            onClick={() => {
              onSelectTab("home");
              onClearSearch();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center space-x-2 focus:outline-none group text-left focus:ring-2 focus:ring-amber-400 rounded-lg p-0.5"
            aria-label="Tiger OTT Home"
          >
            <TigerLogo size="sm" className="group-hover:scale-105 transition-transform duration-200" />
            {isTVMode && (
              <span className="hidden sm:inline-block px-1.5 py-0.5 bg-amber-500 text-black font-black text-[9px] rounded uppercase">
                TV MODE
              </span>
            )}
          </button>

          {/* Primary Nav Links (Desktop) */}
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
        <div className="flex items-center space-x-1.5 sm:space-x-3">
          {/* TV Remote Helper Button */}
          {onOpenTVHelp && (
            <button
              data-tv-focusable="true"
              onClick={onOpenTVHelp}
              className="hidden sm:flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-neutral-200 border border-white/10 text-xs font-bold transition focus:ring-4 focus:ring-amber-400 outline-none cursor-pointer"
              title="TV Remote Navigation & Shortcuts"
            >
              <Tv className="w-4 h-4 text-amber-400" />
              <span>TV Remote</span>
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
            className="md:hidden flex items-center space-x-1 bg-[#E50914] text-white px-2.5 py-1.5 rounded-full text-[11px] font-black uppercase shadow cursor-pointer active:scale-95 transition"
          >
            <Crown className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
            <span>Store</span>
          </button>

          {/* Search Bar Toggle */}
          <div
            className={`flex items-center border transition-all duration-300 rounded-md ${
              searchOpen || searchQuery
                ? "w-36 sm:w-64 md:w-72 bg-black/90 border-white/70 px-2 py-1"
                : "w-8 bg-transparent border-transparent p-1"
            }`}
          >
            <button
              data-tv-focusable="true"
              onClick={toggleSearch}
              className="text-white hover:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded p-0.5 cursor-pointer"
              aria-label="Search movies & TV shows"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {(searchOpen || searchQuery) && (
              <>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search..."
                  className="w-full bg-transparent text-white text-xs sm:text-sm px-1.5 sm:px-2 focus:outline-none placeholder:text-neutral-500 font-normal min-w-0"
                />
                {searchQuery && (
                  <button
                    onClick={onClearSearch}
                    className="text-neutral-400 hover:text-white p-0.5 flex-shrink-0"
                    aria-label="Clear search query"
                  >
                    <X className="w-3.5 h-3.5" />
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
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-[#E50914] rounded-full ring-2 ring-[#141414]" />
            </button>

            {notifOpen && (
              <div className="fixed sm:absolute inset-x-3 sm:inset-x-auto right-auto sm:right-0 top-14 sm:top-auto sm:mt-3 w-auto sm:w-96 bg-[#141414]/98 border border-neutral-700/80 rounded-xl shadow-2xl p-3 z-50 animate-fadeIn backdrop-blur-xl divide-y divide-neutral-800">
                <div className="flex items-center justify-between pb-2 px-1">
                  <span className="text-sm font-bold text-white">Notifications</span>
                  <span className="text-[11px] text-[#E50914] font-semibold cursor-pointer">Mark all read</span>
                </div>
                <div className="space-y-2 pt-2 max-h-72 overflow-y-auto">
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

      {/* Mobile Drawer Navigation Sidebar */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm md:hidden animate-fadeIn"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-4/5 max-w-xs h-full bg-[#141416] border-r border-neutral-800 p-5 flex flex-col justify-between shadow-2xl animate-slideRight"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-4">
                <TigerLogo size="sm" />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => handleMobileNavClick("home")}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-bold transition text-left ${
                    activeTab === "home" && !searchQuery
                      ? "bg-neutral-800 text-[#FFE000]"
                      : "text-neutral-300 hover:bg-neutral-800/60 hover:text-white"
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleMobileNavClick("tv")}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-bold transition text-left ${
                    activeTab === "tv"
                      ? "bg-neutral-800 text-[#FFE000]"
                      : "text-neutral-300 hover:bg-neutral-800/60 hover:text-white"
                  }`}
                >
                  <Tv className="w-4 h-4" />
                  <span>TV Series</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleMobileNavClick("movies")}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-bold transition text-left ${
                    activeTab === "movies"
                      ? "bg-neutral-800 text-[#FFE000]"
                      : "text-neutral-300 hover:bg-neutral-800/60 hover:text-white"
                  }`}
                >
                  <Film className="w-4 h-4" />
                  <span>Movies</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleMobileNavClick("new")}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-bold transition text-left ${
                    activeTab === "new"
                      ? "bg-neutral-800 text-[#FFE000]"
                      : "text-neutral-300 hover:bg-neutral-800/60 hover:text-white"
                  }`}
                >
                  <Flame className="w-4 h-4" />
                  <span>Trending</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleMobileNavClick("mylist")}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-bold transition text-left ${
                    activeTab === "mylist"
                      ? "bg-neutral-800 text-[#FFE000]"
                      : "text-neutral-300 hover:bg-neutral-800/60 hover:text-white"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Bookmark className="w-4 h-4" />
                    <span>My Watchlist</span>
                  </div>
                  {myListCount > 0 && (
                    <span className="px-2 py-0.5 bg-[#E50914] text-white text-[10px] font-black rounded-full">
                      {myListCount}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleMobileNavClick("ott_store")}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-bold transition text-left mt-2 ${
                    activeTab === "ott_store"
                      ? "bg-[#E50914] text-white"
                      : "bg-[#FFE000]/10 text-[#FFE000] hover:bg-[#FFE000]/20"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Crown className="w-4 h-4 fill-current" />
                    <span>OTT Subscriptions</span>
                  </div>
                  <span className="text-[10px] font-black bg-black/40 px-2 py-0.5 rounded text-amber-300">
                    80% OFF
                  </span>
                </button>
              </div>

              {/* Mobile Genres Quick List */}
              <div className="mt-6 pt-4 border-t border-neutral-800">
                <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2 px-1">
                  Popular Genres
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {GENRES_LIST.slice(0, 6).map((genre) => (
                    <button
                      key={genre}
                      type="button"
                      onClick={() => {
                        if (onSelectGenre) onSelectGenre(genre === "All Genres" ? "" : genre);
                        setMobileMenuOpen(false);
                      }}
                      className={`px-2.5 py-1 rounded text-xs font-semibold transition ${
                        activeGenre === genre || (!activeGenre && genre === "All Genres")
                          ? "bg-amber-400 text-black font-bold"
                          : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-neutral-800 space-y-2">
              {onOpenTVHelp && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTVHelp();
                  }}
                  className="w-full flex items-center justify-center space-x-2 py-2 px-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-xs font-semibold"
                >
                  <Tv className="w-4 h-4 text-amber-400" />
                  <span>TV Remote Help Guide</span>
                </button>
              )}
              <div className="flex items-center justify-between px-2 text-[11px] text-neutral-500">
                <span>Profile: {currentProfile.name}</span>
                <span className="text-emerald-400">● 4K UHD</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NetflixNavbar;
