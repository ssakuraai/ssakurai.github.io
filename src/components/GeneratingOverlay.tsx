import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Loader } from 'lucide-react';
import { motion } from 'framer-motion';

const GeneratingOverlay: React.FC = () => {
  const { theme } = useTheme();
  const [timeLeft, setTimeLeft] = useState(20);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-20 backdrop-blur-md bg-black/50">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`max-w-md w-full mx-4 rounded-2xl shadow-2xl overflow-hidden 
          ${theme === 'light' ? 'bg-white' : 'bg-purple-900'}`}
      >
        <div className="relative aspect-video w-full overflow-hidden">
          {/* Enhanced Video Player Animation */}
          <div className="absolute inset-0 backdrop-blur-xl">
            <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-pink-200/30 to-purple-300/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            
            {/* Animated Lines */}
            <motion.div 
              className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-pink-300/50 to-transparent"
              animate={{ 
                y: ['0%', '100%'],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear'
              }}
            />

            {/* Floating Particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1 h-1 rounded-full ${
                  theme === 'light' ? 'bg-pink-300/30' : 'bg-pink-200/30'
                }`}
                initial={{ 
                  x: Math.random() * 100 + '%',
                  y: '100%',
                  scale: Math.random() * 0.5 + 0.5
                }}
                animate={{ 
                  y: '0%',
                  x: `${Math.random() * 20 - 10 + parseInt(String(Math.random() * 100))}%`
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: Math.random() * 2
                }}
              />
            ))}

            {/* Processing Lines */}
            <div className="absolute inset-0 flex flex-col justify-between py-4 opacity-30">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`h-px ${theme === 'light' ? 'bg-pink-300' : 'bg-pink-200'}`}
                  initial={{ scaleX: 0, originX: Math.random() > 0.5 ? 0 : 1 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: Math.random() * 2 + 1,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Loader 
                className={`animate-spin mb-4 ${theme === 'light' ? 'text-pink-500' : 'text-pink-300'}`} 
                size={48} 
              />
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`text-xl font-semibold mb-2 
                  ${theme === 'light' ? 'text-pink-600' : 'text-pink-200'}`}
              >
                Generating Your Animation...
              </motion.div>
              <motion.div 
                className={`text-3xl font-bold
                  ${theme === 'light' ? 'text-pink-700' : 'text-pink-300'}`}
              >
                {timeLeft}s
              </motion.div>
            </div>
          </div>
        </div>
        
        <div className={`p-6 text-center
          ${theme === 'light' ? 'text-pink-700' : 'text-pink-200'}`}
        >
          <p className="text-lg">Processing your images with AI...</p>
          <p className="text-sm mt-2 opacity-75">Please wait while we create your animation</p>
        </div>
      </motion.div>
    </div>
  );
};

export default GeneratingOverlay;