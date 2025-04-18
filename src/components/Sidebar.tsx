
import React from "react";
import { Music2Icon, StarIcon, HistoryIcon, ListMusicIcon } from "lucide-react";
import { useMusic } from "@/context/MusicContext";

const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab } = useMusic();
  
  const navItems = [
    { id: "tracks", name: "Top Tracks", icon: <ListMusicIcon size={18} /> },
    { id: "favourites", name: "Favourites", icon: <StarIcon size={18} /> },
    { id: "recently", name: "Recently Played", icon: <HistoryIcon size={18} /> },
  ];
  
  return (
    <div className="bg-sidebar fixed top-0 left-0 h-full w-[220px] p-5 flex flex-col overflow-hidden transition-all duration-300 ease-in-out">
      <div className="mb-8 flex items-center space-x-2 animate-fade-in">
        <Music2Icon size={24} className="text-white" />
        <span className="text-white text-xl font-bold">Sonic Hue</span>
      </div>
      
      <div className="flex-1">
        <div className="mb-5">
          <h3 className="text-sidebar-foreground text-sm font-semibold mb-3">For You</h3>
          <ul className="space-y-2">
            {navItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 p-2.5 rounded-md text-left transition-colors ${
                    activeTab === item.id
                      ? "bg-sidebar-accent text-white"
                      : "text-sidebar-foreground hover:text-white hover:bg-sidebar-accent/50"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
