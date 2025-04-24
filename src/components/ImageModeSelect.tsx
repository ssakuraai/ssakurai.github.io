import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Image, Images } from 'lucide-react';

interface ImageModeSelectProps {
  onSelect: (mode: 'single' | 'double') => void;
}

const ImageModeSelect: React.FC<ImageModeSelectProps> = ({ onSelect }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`fixed inset-0 flex items-center justify-center
      ${theme === 'light' ? 'bg-gradient-to-b from-pink-100 to-pink-200' : 'bg-gradient-to-b from-purple-900 to-purple-800'}`}>
      <div className="text-center px-4">
        <h2 className={`brush-font text-4xl sm:text-5xl mb-8
          ${theme === 'light' ? 'text-pink-700' : 'text-pink-300'}`}>
          Choose Animation Mode
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            onClick={() => onSelect('single')}
            className={`p-8 rounded-lg transition-all transform hover:scale-105
              ${theme === 'light' 
                ? 'bg-white hover:bg-pink-50 shadow-lg' 
                : 'bg-purple-800 hover:bg-purple-700 shadow-purple-900/50'}`}
          >
            <Image 
              size={48} 
              className={`mx-auto mb-4 ${theme === 'light' ? 'text-pink-500' : 'text-pink-300'}`}
            />
            <h3 className={`text-xl font-semibold mb-2
              ${theme === 'light' ? 'text-pink-700' : 'text-pink-300'}`}>
              Single Image
            </h3>
            <p className={`text-sm
              ${theme === 'light' ? 'text-pink-600' : 'text-pink-200'}`}>
              Upload one image and let AI create the animation
            </p>
          </button>

          <button
            onClick={() => onSelect('double')}
            className={`p-8 rounded-lg transition-all transform hover:scale-105
              ${theme === 'light' 
                ? 'bg-white hover:bg-pink-50 shadow-lg' 
                : 'bg-purple-800 hover:bg-purple-700 shadow-purple-900/50'}`}
          >
            <Images 
              size={48} 
              className={`mx-auto mb-4 ${theme === 'light' ? 'text-pink-500' : 'text-pink-300'}`}
            />
            <h3 className={`text-xl font-semibold mb-2
              ${theme === 'light' ? 'text-pink-700' : 'text-pink-300'}`}>
              Two Images
            </h3>
            <p className={`text-sm
              ${theme === 'light' ? 'text-pink-600' : 'text-pink-200'}`}>
              Upload start and end images for precise control
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageModeSelect;