
import React from "react";
import { MoreHorizontalIcon, PlayIcon } from "lucide-react";
import { Track } from "@/data/tracks";
import { useMusic } from "@/context/MusicContext";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@/components/DropdownMenu";

interface TrackListProps {
  title: string;
  tracks: Track[];
}

const TrackList: React.FC<TrackListProps> = ({ title, tracks }) => {
  const { currentTrack, isPlaying, playTrack, toggleFavorite, isFavorite } = useMusic();

  return (
    <div className="mb-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      
      {tracks.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          <p>No tracks found</p>
        </div>
      ) : (
        <div className="space-y-1">
          {tracks.map((track, index) => {
            const isActive = currentTrack?.id === track.id;
            
            return (
              <div 
                key={`${track.id}-${index}`}
                className={`track-item ${isActive ? 'active' : ''} animate-slide-up`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-10 h-10 mr-3 relative overflow-hidden rounded-md">
                  <img 
                    src={track.thumbnail} 
                    alt={track.title}
                    className="w-full h-full object-cover"
                  />
                  {isActive && isPlaying && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse-soft"></div>
                    </div>
                  )}
                </div>
                
                <div 
                  className="flex-1 min-w-0 cursor-pointer" 
                  onClick={() => playTrack(track)}
                >
                  <div className="flex items-center">
                    <div className="flex-1 truncate">
                      <p className="text-sm font-medium truncate">{track.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
                    </div>
                    <span className="text-xs text-muted-foreground ml-3">{track.duration}</span>
                  </div>
                </div>
                
                <div className="ml-3">
                  <Dropdown>
                    <DropdownTrigger>
                      <button className="p-1 rounded-full hover:bg-accent/10">
                        <MoreHorizontalIcon size={18} className="text-muted-foreground" />
                      </button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem onClick={() => toggleFavorite(track)}>
                        {isFavorite(track) ? "Remove from Favorites" : "Add to Favorites"}
                      </DropdownItem>
                      <DropdownItem onClick={() => playTrack(track)}>
                        Play Now
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TrackList;
