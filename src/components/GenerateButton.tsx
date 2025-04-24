import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface GenerateButtonProps {
  onClick: () => void;
  label: string;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick, label }) => {
  const { theme } = useTheme();
  
  return (
    <button
      onClick={onClick}
      className={`px-8 py-4 rounded-full text-xl font-semibold transform transition-all duration-300 
        hover:scale-105 focus:outline-none focus:ring-4 ${
        theme === 'light'
          ? 'bg-pink-500 text-white hover:bg-pink-600 focus:ring-pink-300'
          : 'bg-pink-400 text-purple-900 hover:bg-pink-300 focus:ring-pink-200'
      }`}
    >
      {label}
    </button>
  );
};

export default GenerateButton;