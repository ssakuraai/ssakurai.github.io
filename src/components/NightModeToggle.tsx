import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const NightModeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      className={`fixed bottom-4 right-4 p-3 rounded-full shadow-lg z-50 transition-colors duration-300 ${
        theme === 'light'
          ? 'bg-white text-pink-700 hover:bg-pink-50'
          : 'bg-purple-800 text-pink-200 hover:bg-purple-700'
      }`}
    >
      {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
    </button>
  );
};

export default NightModeToggle;