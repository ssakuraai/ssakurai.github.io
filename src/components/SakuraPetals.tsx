import React, { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const SakuraPetals: React.FC = () => {
  const { theme } = useTheme();
  const [petals, setPetals] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    // Generate 15 petal elements with random properties
    const generatePetals = () => {
      const newPetals = [];
      for (let i = 0; i < 15; i++) {
        const left = `${Math.random() * 100}%`;
        const animationDuration = `${Math.random() * 10 + 10}s`;
        const animationDelay = `${Math.random() * 10}s`;
        const size = `${Math.random() * 20 + 10}px`;
        const opacity = Math.random() * 0.4 + 0.3;
        
        const petalColor = theme === 'light' ? 'bg-pink-200' : 'bg-pink-100';
        
        newPetals.push(
          <div
            key={i}
            className={`absolute ${petalColor} rounded-full petal`}
            style={{
              left,
              width: size,
              height: size,
              opacity,
              animationDuration,
              animationDelay,
              boxShadow: theme === 'light' 
                ? '0 0 10px rgba(219, 112, 147, 0.3)' 
                : '0 0 15px rgba(255, 255, 255, 0.6)'
            }}
          />
        );
      }
      return newPetals;
    };

    setPetals(generatePetals());
  }, [theme]);

  return <div className="petal-container fixed inset-0 overflow-hidden pointer-events-none">{petals}</div>;
};

export default SakuraPetals;