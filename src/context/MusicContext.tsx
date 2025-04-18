
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { Track, tracks } from "@/data/tracks";
import { saveToFavorites, removeFromFavorites, getFavorites, addToRecentlyPlayed, getRecentlyPlayed } from "@/utils/storage";

interface MusicContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  duration: number;
  tracks: Track[];
  filteredTracks: Track[];
  favorites: Track[];
  recentlyPlayed: Track[];
  activeTab: string;
  bgColor: string;
  setSearch: (search: string) => void;
  setActiveTab: (tab: string) => void;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setVolume: (volume: number) => void;
  seekTo: (progress: number) => void;
  toggleFavorite: (track: Track) => void;
  isFavorite: (track: Track) => boolean;
  setBgColor: (color: string) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeTab, setActiveTab] = useState("tracks");
  const [filteredTracks, setFilteredTracks] = useState<Track[]>(tracks);
  const [favorites, setFavorites] = useState<Track[]>([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState<Track[]>([]);
  const [search, setSearch] = useState("");
  const [bgColor, setBgColor] = useState("rgb(18, 18, 18)");
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;
    
    // Load favorites and recently played from storage
    setFavorites(getFavorites());
    setRecentlyPlayed(getRecentlyPlayed());
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  // Handle track changes
  useEffect(() => {
    if (!currentTrack || !audioRef.current) return;
    
    audioRef.current.src = currentTrack.musicUrl;
    
    if (isPlaying) {
      audioRef.current.play().catch(error => {
        console.error("Error playing audio:", error);
      });
    }
    
    // Add to recently played
    addToRecentlyPlayed(currentTrack);
    setRecentlyPlayed(getRecentlyPlayed());
    
  }, [currentTrack]);
  
  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.play().catch(error => {
        console.error("Error playing audio:", error);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);
  
  // Handle volume changes
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);
  
  // Setup audio event listeners
  useEffect(() => {
    if (!audioRef.current) return;
    
    const audio = audioRef.current;
    
    const updateProgress = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };
    
    const handleEnded = () => {
      nextTrack();
    };
    
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);
  
  // Filter tracks based on search
  useEffect(() => {
    if (!search.trim()) {
      setFilteredTracks(tracks);
      return;
    }
    
    const filtered = tracks.filter(track => 
      track.title.toLowerCase().includes(search.toLowerCase())
    );
    
    setFilteredTracks(filtered);
  }, [search]);
  
  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };
  
  const togglePlay = () => {
    if (!currentTrack) {
      if (tracks.length > 0) {
        playTrack(tracks[0]);
      }
      return;
    }
    setIsPlaying(!isPlaying);
  };
  
  const nextTrack = () => {
    if (!currentTrack) return;
    
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % tracks.length;
    playTrack(tracks[nextIndex]);
  };
  
  const prevTrack = () => {
    if (!currentTrack) return;
    
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    playTrack(tracks[prevIndex]);
  };
  
  const seekTo = (value: number) => {
    if (!audioRef.current) return;
    
    audioRef.current.currentTime = value;
    setProgress(value);
  };
  
  const toggleFavorite = (track: Track) => {
    if (isFavorite(track)) {
      removeFromFavorites(track);
    } else {
      saveToFavorites(track);
    }
    setFavorites(getFavorites());
  };
  
  const isFavorite = (track: Track) => {
    return favorites.some(t => t.id === track.id);
  };
  
  return (
    <MusicContext.Provider
      value={{
        currentTrack,
        isPlaying,
        volume,
        progress,
        duration,
        tracks,
        filteredTracks,
        favorites,
        recentlyPlayed,
        activeTab,
        bgColor,
        setSearch,
        setActiveTab,
        playTrack,
        togglePlay,
        nextTrack,
        prevTrack,
        setVolume,
        seekTo,
        toggleFavorite,
        isFavorite,
        setBgColor,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
};
