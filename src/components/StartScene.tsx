import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import SakuraPetals from './SakuraPetals';
import GenerateButton from './GenerateButton';
import ImageUpload from './ImageUpload';

interface StartSceneProps {
  onGenerateClick: () => void;
  offerCompleted: boolean;
  imageMode: 'single' | 'double';
  onStartImageUpload: (imageUrl: string) => void;
  onEndImageUpload: (imageUrl: string) => void;
  startImage: string | null;
  endImage: string | null;
}

const StartScene: React.FC<StartSceneProps> = ({ 
  onGenerateClick, 
  offerCompleted,
  imageMode,
  onStartImageUpload,
  onEndImageUpload,
  startImage,
  endImage
}) => {
  const { theme } = useTheme();
  
  const handleStartImageUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    onStartImageUpload(imageUrl);
    localStorage.setItem('start_image', imageUrl);
  };

  const handleEndImageUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    onEndImageUpload(imageUrl);
    localStorage.setItem('end_image', imageUrl);
  };
  
  return (
    <div className={`fixed inset-0 flex flex-col items-center justify-center z-0 
      ${theme === 'light' ? 'bg-gradient-to-b from-pink-100 to-pink-200' : 'bg-gradient-to-b from-purple-900 to-purple-800'}`}>
      
      <SakuraPetals />
      
      <div className="container mx-auto max-w-3xl px-4 text-center">
        <h1 className={`brush-font text-5xl sm:text-6xl md:text-7xl mb-8 
          ${theme === 'light' ? 'text-pink-700' : 'text-pink-300'}`}>
          桜<span className="mx-2">Sakura Manga Animator</span>桜
        </h1>
        
        <p className={`text-xl mb-12 font-light 
          ${theme === 'light' ? 'text-pink-800' : 'text-pink-200'}`}>
          Animate your manga like After Effects—no installs.
        </p>

        <ImageUpload
          onImageUpload={handleStartImageUpload}
          label={imageMode === 'single' ? "Upload your manga image" : "Upload your start scene image"}
          currentImage={startImage || undefined}
        />
        
        {imageMode === 'double' && (
          <ImageUpload
            onImageUpload={handleEndImageUpload}
            label="Upload your end scene image"
            currentImage={endImage || undefined}
          />
        )}
        
        <GenerateButton 
          onClick={onGenerateClick} 
          label={offerCompleted ? "Play Your Animation" : "Generate Your Animation"} 
        />
      </div>
    </div>
  );
};

export default StartScene;