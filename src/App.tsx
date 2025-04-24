import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import StartScene from './components/StartScene';
import GeneratingOverlay from './components/GeneratingOverlay';
import OffersOverlay from './components/OffersOverlay';
import EndScene from './components/EndScene';
import NightModeToggle from './components/NightModeToggle';
import ImageModeSelect from './components/ImageModeSelect';
import { checkOfferCompletion } from './utils/api';

function App() {
  const [showGenerating, setShowGenerating] = useState(false);
  const [showOffers, setShowOffers] = useState(false);
  const [showEndScene, setShowEndScene] = useState(false);
  const [offerCompleted, setOfferCompleted] = useState(false);
  const [imageMode, setImageMode] = useState<'single' | 'double' | null>(null);
  const [startImage, setStartImage] = useState<string | null>(null);
  const [endImage, setEndImage] = useState<string | null>(null);

  // Check if an offer was previously completed
  useEffect(() => {
    const completed = localStorage.getItem('offer_completed') === 'true';
    if (completed) {
      setOfferCompleted(true);
      setShowEndScene(true);
    }
  }, []);

  const handleGenerateClick = () => {
    if (!startImage || (imageMode === 'double' && !endImage)) {
      alert('Please upload required images first');
      return;
    }

    if (offerCompleted) {
      setShowEndScene(true);
    } else {
      setShowGenerating(true);
      
      setTimeout(() => {
        setShowGenerating(false);
        setShowOffers(true);
      }, 20000);
    }
  };

  const handleOfferComplete = () => {
    localStorage.setItem('offer_completed', 'true');
    setOfferCompleted(true);
    setShowOffers(false);
    setShowEndScene(true);
  };

  // Poll for completed offers
  useEffect(() => {
    if (showOffers && !offerCompleted) {
      const interval = setInterval(() => {
        checkOfferCompletion().then(completed => {
          if (completed) {
            handleOfferComplete();
          }
        });
      }, 15000);
      
      return () => clearInterval(interval);
    }
  }, [showOffers, offerCompleted]);

  if (!imageMode) {
    return (
      <ThemeProvider>
        <ImageModeSelect onSelect={setImageMode} />
        <NightModeToggle />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="relative w-full min-h-screen overflow-hidden">
        <StartScene 
          onGenerateClick={handleGenerateClick} 
          offerCompleted={offerCompleted}
          imageMode={imageMode}
          onStartImageUpload={setStartImage}
          onEndImageUpload={setEndImage}
          startImage={startImage}
          endImage={endImage}
        />
        
        {showGenerating && <GeneratingOverlay />}
        
        {showOffers && !offerCompleted && (
          <OffersOverlay 
            onOfferComplete={handleOfferComplete} 
            onGenerateClick={handleGenerateClick}
          />
        )}
        
        {showEndScene && imageMode === 'single' && startImage && (
          <EndScene singleImage={startImage} />
        )}
        
        {showEndScene && imageMode === 'double' && endImage && (
          <EndScene singleImage={null} />
        )}
        
        <NightModeToggle />
      </div>
    </ThemeProvider>
  );
}

export default App;