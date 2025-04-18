
import { Track } from "@/data/tracks";

const FAVORITES_KEY = "music-player-favorites";
const RECENTLY_PLAYED_KEY = "music-player-recently-played";
const MAX_RECENTLY_PLAYED = 10;

// Favorites (Local Storage)
export const saveToFavorites = (track: Track): void => {
  const favorites = getFavorites();
  if (!favorites.some(t => t.id === track.id)) {
    favorites.push(track);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
};

export const removeFromFavorites = (track: Track): void => {
  const favorites = getFavorites();
  const updated = favorites.filter(t => t.id !== track.id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
};

export const getFavorites = (): Track[] => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Error getting favorites:", error);
    return [];
  }
};

// Recently Played (Session Storage)
export const addToRecentlyPlayed = (track: Track): void => {
  const recentlyPlayed = getRecentlyPlayed();
  
  // Remove track if it already exists (to move it to the beginning)
  const filtered = recentlyPlayed.filter(t => t.id !== track.id);
  
  // Add track to beginning of array
  filtered.unshift(track);
  
  // Limit to MAX_RECENTLY_PLAYED items
  const limited = filtered.slice(0, MAX_RECENTLY_PLAYED);
  
  sessionStorage.setItem(RECENTLY_PLAYED_KEY, JSON.stringify(limited));
};

export const getRecentlyPlayed = (): Track[] => {
  try {
    const recentlyPlayed = sessionStorage.getItem(RECENTLY_PLAYED_KEY);
    return recentlyPlayed ? JSON.parse(recentlyPlayed) : [];
  } catch (error) {
    console.error("Error getting recently played:", error);
    return [];
  }
};
