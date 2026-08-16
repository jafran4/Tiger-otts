import { MediaItem, CategoryKey } from "../types";
import { GENRE_MAP, FALLBACK_HERO, FALLBACK_TRENDING } from "../data/fallbackData";

const API_KEY = "183928bab7fc630ed0449e4f66ec21bd";
const BASE_URL = "https://api.themoviedb.org/3";

export const TMDB_ENDPOINTS: Record<CategoryKey, { title: string; url: string; isTop10?: boolean }> = {
  trending: {
    title: "Trending Now",
    url: `${BASE_URL}/trending/all/week?api_key=${API_KEY}`,
  },
  top10: {
    title: "Top 10 Movies & Shows in US Today",
    url: `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`,
    isTop10: true,
  },
  popular: {
    title: "Popular on Netflix",
    url: `${BASE_URL}/movie/popular?api_key=${API_KEY}`,
  },
  tv: {
    title: "Binge-Worthy TV Dramas & Series",
    url: `${BASE_URL}/tv/popular?api_key=${API_KEY}`,
  },
  action: {
    title: "Adrenaline & Action Blockbusters",
    url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28&sort_by=popularity.desc`,
  },
  scifi: {
    title: "Sci-Fi & Cyberpunk Hits",
    url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=878&sort_by=vote_count.desc`,
  },
  topRated: {
    title: "Critically Acclaimed & Top Rated",
    url: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`,
  },
  upcoming: {
    title: "New Releases & Coming Soon",
    url: `${BASE_URL}/movie/upcoming?api_key=${API_KEY}`,
  },
  comedy: {
    title: "Feel-Good Comedies",
    url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35&sort_by=popularity.desc`,
  },
  horror: {
    title: "Nightmare Thrillers & Horror",
    url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27&sort_by=popularity.desc`,
  },
};

// Transform raw TMDb result into clean MediaItem
export function formatMediaItem(item: any, index?: number, isTop10Row?: boolean): MediaItem {
  const isTV = !!item.first_air_date || item.media_type === "tv" || !item.title;
  const rawTitle = item.title || item.name || item.original_title || item.original_name || "Untitled";
  const rating = item.vote_average || 7.5;
  const matchScore = Math.min(99, Math.max(82, Math.round(rating * 10 + (item.id % 7))));
  
  // Assign maturity ratings
  const ratings = ["TV-MA", "16+", "PG-13", "18+", "TV-14", "PG"];
  const maturityRating = item.adult ? "18+" : ratings[item.id % ratings.length];

  // Derive genres
  const genreIds: number[] = item.genre_ids || [];
  const genres = genreIds.map((id) => GENRE_MAP[id] || "Drama").filter(Boolean);
  if (genres.length === 0) genres.push(isTV ? "Series" : "Movie");

  // Duration
  const duration = isTV 
    ? `${(item.id % 4) + 1} Season${(item.id % 4) > 0 ? "s" : ""}` 
    : `${1 + (item.id % 2)}h ${20 + (item.id % 38)}m`;

  return {
    id: item.id,
    title: rawTitle,
    name: item.name,
    original_title: item.original_title || item.original_name,
    overview: item.overview || "An exciting cinematic story awaits.",
    poster_path: item.poster_path,
    backdrop_path: item.backdrop_path || item.poster_path,
    release_date: item.release_date || item.first_air_date,
    first_air_date: item.first_air_date,
    vote_average: Number(rating.toFixed(1)),
    vote_count: item.vote_count || 500,
    popularity: item.popularity || 100,
    genre_ids: genreIds,
    genres,
    media_type: isTV ? "tv" : "movie",
    matchScore,
    maturityRating,
    duration,
    isOriginal: item.id % 3 === 0,
    top10Rank: isTop10Row && typeof index === "number" ? index + 1 : undefined,
  };
}

// Fetch helper with fallback
export async function fetchCategoryMedia(categoryKey: CategoryKey): Promise<MediaItem[]> {
  try {
    const config = TMDB_ENDPOINTS[categoryKey];
    if (!config) return FALLBACK_TRENDING;

    const response = await fetch(config.url);
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    const data = await response.json();
    
    const results = (data.results || []).slice(0, 18);
    if (results.length === 0) return FALLBACK_TRENDING;

    return results.map((item: any, idx: number) => 
      formatMediaItem(item, idx, config.isTop10)
    );
  } catch (err) {
    console.warn(`Failed to fetch TMDb category ${categoryKey}, using fallback.`, err);
    return FALLBACK_TRENDING;
  }
}

// Fetch trailer key for a movie or TV show
export async function fetchTrailerKey(mediaId: number, mediaType: 'movie' | 'tv' = 'movie'): Promise<string | null> {
  try {
    const endpoint = mediaType === 'tv'
      ? `${BASE_URL}/tv/${mediaId}/videos?api_key=${API_KEY}`
      : `${BASE_URL}/movie/${mediaId}/videos?api_key=${API_KEY}`;
    
    const res = await fetch(endpoint);
    if (!res.ok) return null;
    const data = await res.json();
    
    if (data.results && data.results.length > 0) {
      const trailer = data.results.find(
        (v: any) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
      ) || data.results.find((v: any) => v.site === "YouTube");
      
      if (trailer && trailer.key) return trailer.key;
    }
    return null;
  } catch {
    return null;
  }
}

// Fetch detailed credits (cast & crew)
export async function fetchMediaCredits(mediaId: number, mediaType: 'movie' | 'tv' = 'movie'): Promise<{ cast: string[]; director?: string }> {
  try {
    const endpoint = mediaType === 'tv'
      ? `${BASE_URL}/tv/${mediaId}/credits?api_key=${API_KEY}`
      : `${BASE_URL}/movie/${mediaId}/credits?api_key=${API_KEY}`;
    
    const res = await fetch(endpoint);
    if (!res.ok) return { cast: [] };
    const data = await res.json();
    
    const cast = (data.cast || []).slice(0, 5).map((c: any) => c.name);
    const director = (data.crew || []).find((c: any) => c.job === "Director" || c.job === "Executive Producer")?.name;

    return { cast, director };
  } catch {
    return { cast: [] };
  }
}

// Fetch similar / more like this
export async function fetchSimilarMedia(mediaId: number, mediaType: 'movie' | 'tv' = 'movie'): Promise<MediaItem[]> {
  try {
    const endpoint = mediaType === 'tv'
      ? `${BASE_URL}/tv/${mediaId}/similar?api_key=${API_KEY}`
      : `${BASE_URL}/movie/${mediaId}/similar?api_key=${API_KEY}`;
    
    const res = await fetch(endpoint);
    if (!res.ok) return [];
    const data = await res.json();
    
    return (data.results || []).slice(0, 9).map((item: any) => formatMediaItem(item));
  } catch {
    return [];
  }
}

// Search movies and TV shows
export async function searchTMDb(query: string): Promise<MediaItem[]> {
  try {
    const url = `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}&include_adult=false`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    
    return (data.results || [])
      .filter((item: any) => item.poster_path || item.backdrop_path)
      .map((item: any) => formatMediaItem(item));
  } catch {
    return [];
  }
}
