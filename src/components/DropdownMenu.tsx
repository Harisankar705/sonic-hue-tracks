
import React, { useState, useRef, useEffect } from "react";

interface DropdownProps {
  children: React.ReactNode;
}

interface DropdownTriggerProps {
  children: React.ReactNode;
}

interface DropdownMenuProps {
  children: React.ReactNode;
}

interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const Dropdown: React.FC<DropdownProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === DropdownTrigger) {
          return React.cloneElement(child as React.ReactElement, {
            onClick: () => setIsOpen(!isOpen),
          });
        } else if (React.isValidElement(child) && child.type === DropdownMenu) {
          return isOpen ? child : null;
        }
        return child;
      })}
    </div>
  );
};

export const DropdownTrigger: React.FC<DropdownTriggerProps> = ({ children, ...props }) => {
  return React.cloneElement(children as React.ReactElement, props);
};

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => {
  return (
    <div className="absolute right-0 mt-1 w-56 bg-secondary rounded-md shadow-lg py-1 z-10 animate-fade-in">
      {children}
    </div>
  );
};

export const DropdownItem: React.FC<DropdownItemProps> = ({ children, onClick }) => {
  return (
    <button
      className="w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors duration-150"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
