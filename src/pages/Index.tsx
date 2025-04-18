
import React from "react";
import { MusicProvider } from "@/context/MusicContext";
import Sidebar from "@/components/Sidebar";
import MusicPlayer from "@/components/MusicPlayer";
import TrackList from "@/components/TrackList";
import SearchBar from "@/components/SearchBar";
import MobileNavbar from "@/components/MobileNavbar";
import { useMusic } from "@/context/MusicContext";

// Main content component to prevent context error
const MainContent = () => {
  const { filteredTracks, activeTab, favorites, recentlyPlayed, bgColor, currentTrack } = useMusic();
  
  return (
    <div 
      className="min-h-screen transition-background duration-1000"
      style={{ 
        backgroundImage: bgColor,
      }}
    >
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
      {/* Mobile Navbar */}
      <MobileNavbar />
      
      {/* Main Content */}
      <div className="md:pl-[220px] pt-4 pb-32">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold md:mb-0">For You</h1>
            </div>
            <SearchBar />
          </div>
          
          {/* Now Playing */}
          {currentTrack && (
            <div className="mb-10 animate-fade-in">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="w-48 h-48 overflow-hidden rounded-md shadow-lg">
                  <img
                    src={currentTrack.thumbnail}
                    alt={currentTrack.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h2 className="text-2xl md:text-3xl font-bold mb-1">{currentTrack.title}</h2>
                  <p className="text-lg text-muted-foreground mb-4">{currentTrack.artist}</p>
                  {currentTrack.album && (
                    <p className="text-sm text-muted-foreground">Album: {currentTrack.album}</p>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Track Lists */}
          {activeTab === "tracks" && <TrackList title="Top Tracks" tracks={filteredTracks} />}
          {activeTab === "favourites" && <TrackList title="Favourites" tracks={favorites} />}
          {activeTab === "recently" && <TrackList title="Recently Played" tracks={recentlyPlayed} />}
        </div>
      </div>
      
      {/* Music Player */}
      <MusicPlayer />
    </div>
  );
};

const Index = () => {
  return (
    <MusicProvider>
      <MainContent />
    </MusicProvider>
  );
};

export default Index;
