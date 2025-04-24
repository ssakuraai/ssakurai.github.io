import React, { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import SakuraPetals from './SakuraPetals';
import { Play } from 'lucide-react';

interface EndSceneProps {
  singleImage: string | null;
}

const EndScene: React.FC<EndSceneProps> = ({ singleImage }) => {
  const { theme } = useTheme();
  const [showContent, setShowContent] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div 
      className={`fixed inset-0 flex flex-col items-center justify-center z-50 
        ${theme === 'light' 
          ? 'bg-gradient-to-b from-pink-50 to-pink-100' 
          : 'bg-gradient-to-b from-purple-900 to-purple-800'}`}
    >
      <SakuraPetals />
      
      <div 
        className={`text-center max-w-lg mx-auto px-4 transform transition-all duration-1000 ${
          showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <h2 
          className={`brush-font text-4xl sm:text-5xl mb-8 ${
            theme === 'light' ? 'text-pink-700' : 'text-pink-300'
          }`}
        >
          Your Sakura Animation Awaits!
        </h2>
        
        <p 
          className={`text-xl mb-12 ${
            theme === 'light' ? 'text-pink-800' : 'text-pink-200'
          }`}
        >
          Congratulations! Your personalized Sakura animation has been successfully generated.
        </p>
        
        <a
          href="#play-video"
          className={`inline-flex items-center px-8 py-4 rounded-full text-xl font-semibold 
            transform transition-all duration-500 
            hover:scale-105 focus:outline-none focus:ring-4
            animate-pulse ${
              theme === 'light'
                ? 'bg-pink-500 text-white hover:bg-pink-600 focus:ring-pink-300'
                : 'bg-pink-400 text-purple-900 hover:bg-pink-300 focus:ring-pink-200'
            }`}
        >
          <Play className="mr-2" /> Play Video
        </a>
      </div>
    </div>
  );
};

export default EndScene;