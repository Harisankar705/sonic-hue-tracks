
import React, { useEffect, useRef, useState } from "react";
import { PlayIcon, PauseIcon, SkipBackIcon, SkipForwardIcon, VolumeIcon, Volume1Icon, Volume2Icon, MoreHorizontalIcon } from "lucide-react";
import { useMusic } from "@/context/MusicContext";
import { useColorExtractor } from "@/hooks/useColorExtractor";

const MusicPlayer: React.FC = () => {
  const { 
    currentTrack, 
    isPlaying, 
    togglePlay, 
    nextTrack, 
    prevTrack, 
    volume, 
    setVolume, 
    progress, 
    duration, 
    seekTo,
    toggleFavorite,
    isFavorite,
    setBgColor
  } = useMusic();
  
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isProgressDragging, setIsProgressDragging] = useState(false);
  
  const { gradient } = useColorExtractor(currentTrack?.thumbnail);
  
  useEffect(() => {
    if (gradient) {
      setBgColor(gradient);
    }
  }, [gradient, setBgColor]);
  
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !duration) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    seekTo(pos * duration);
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };
  
  if (!currentTrack) {
    return null;
  }
  
  // Determine which volume icon to show
  const VolumeIconComponent = volume === 0 
    ? VolumeIcon
    : volume < 0.5
      ? Volume1Icon
      : Volume2Icon;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-music-darker bg-opacity-95 backdrop-blur-sm border-t border-border p-3 transition-all z-10">
      <div className="max-w-screen-xl mx-auto flex items-center">
        {/* Track info */}
        <div className="flex items-center min-w-0 w-1/4">
          <div className="w-12 h-12 mr-3 overflow-hidden rounded-md">
            <img 
              src={currentTrack.thumbnail} 
              alt={currentTrack.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{currentTrack.title}</p>
            <p className="text-xs text-muted-foreground truncate">{currentTrack.artist}</p>
          </div>
          <button 
            className="ml-3 text-muted-foreground hover:text-white transition-colors"
            onClick={() => toggleFavorite(currentTrack)}
          >
            <MoreHorizontalIcon size={20} />
          </button>
        </div>
        
        {/* Player controls */}
        <div className="flex-1 flex flex-col items-center max-w-md mx-auto px-4">
          <div className="flex items-center mb-2 space-x-4">
            <button 
              className="text-white p-1 hover:text-accent transition-colors"
              onClick={prevTrack}
            >
              <SkipBackIcon size={20} />
            </button>
            
            <button 
              className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200 transition-colors"
              onClick={togglePlay}
            >
              {isPlaying ? <PauseIcon size={18} /> : <PlayIcon size={18} />}
            </button>
            
            <button 
              className="text-white p-1 hover:text-accent transition-colors"
              onClick={nextTrack}
            >
              <SkipForwardIcon size={20} />
            </button>
          </div>
          
          <div className="w-full flex items-center space-x-2">
            <span className="text-xs text-muted-foreground w-8 text-right">
              {formatTime(progress)}
            </span>
            
            <div 
              ref={progressBarRef}
              className="progress-bar flex-1"
              onClick={handleProgressClick}
              onMouseDown={() => setIsProgressDragging(true)}
              onMouseUp={() => setIsProgressDragging(false)}
              onMouseLeave={() => isProgressDragging && setIsProgressDragging(false)}
            >
              <div 
                className="progress" 
                style={{ width: `${duration ? (progress / duration) * 100 : 0}%` }}
              ></div>
            </div>
            
            <span className="text-xs text-muted-foreground w-8">
              {formatTime(duration)}
            </span>
          </div>
        </div>
        
        {/* Volume control */}
        <div className="w-1/4 flex justify-end items-center">
          <div className="flex items-center space-x-2">
            <VolumeIconComponent size={18} className="text-muted-foreground" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 rounded-full appearance-none bg-muted cursor-pointer"
              style={{
                backgroundImage: `linear-gradient(to right, white ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%)`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
