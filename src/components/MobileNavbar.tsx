
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useMusic } from "@/context/MusicContext";

const MobileNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { activeTab, setActiveTab } = useMusic();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  const navItems = [
    { id: "tracks", name: "Top Tracks" },
    { id: "favourites", name: "Favourites" },
    { id: "recently", name: "Recently Played" },
  ];
  
  return (
    <>
      <div className="md:hidden flex justify-between items-center py-4 px-5">
        <h1 className="text-xl font-bold">Sonic Hue</h1>
        <button onClick={toggleMenu} className="p-2">
          <Menu size={24} />
        </button>
      </div>
      
      {/* Mobile menu */}
      <div className={`fixed inset-0 bg-black bg-opacity-80 z-50 md:hidden transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}>
        <div className="flex flex-col h-full p-5">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-xl font-bold">Sonic Hue</h1>
            <button onClick={toggleMenu} className="p-2">
              <X size={24} />
            </button>
          </div>
          
          <div className="space-y-4">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left py-4 px-3 text-lg rounded-md ${
                  activeTab === item.id
                    ? "bg-secondary"
                    : "hover:bg-secondary/50"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavbar;
