import React from "react";
import { Search } from "lucide-react";
import styles from "./Header.module.css";

interface SearchShortcutProps {
  onOpenSearch: () => void;
}

export const DesktopSearchShortcut: React.FC<SearchShortcutProps> = ({ onOpenSearch }) => {
  return (
    <button
      className={`search-shortcut hidden! md:flex! ${styles.searchShortcut}`}
      onClick={onOpenSearch}
      style={{ marginRight: "4px" }}
    >
      <Search size={14} />
      <span className={`shortcut-text ${styles.shortcutText}`} style={{ flex: 1, textAlign: "left" }}>
        Search…
      </span>
      <kbd className={`shortcut-kbd ${styles.shortcutKbd}`}>
        ⌘K
      </kbd>
    </button>
  );
};

export const MobileSearchBar: React.FC<SearchShortcutProps> = ({ onOpenSearch }) => {
  return (
    <div className="max-w-4xl mx-auto mb-3 px-4 md:hidden">
      <button
        className={`search-shortcut w-full ${styles.searchShortcut}`}
        onClick={onOpenSearch}
        style={{ marginRight: "4px" }}
      >
        <Search size={14} />
        <span className="text-gray-400" style={{ flex: 1, textAlign: "left" }}>
          Search ...
        </span>
      </button>
    </div>
  );
};
