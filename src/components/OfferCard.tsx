import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface OfferCardProps {
  id: string;
  title: string;
  description: string;
  url: string;
}

const OfferCard: React.FC<OfferCardProps> = ({ id, title, description, url }) => {
  const { theme } = useTheme();
  
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className={`rounded-xl overflow-hidden border transition-colors
        ${theme === 'light' 
          ? 'bg-gradient-to-br from-pink-50 to-white border-pink-100' 
          : 'bg-gradient-to-br from-purple-800 to-purple-900 border-purple-700'}`}
    >
      <div className="p-6">
        <h3 className={`text-xl font-bold mb-2 
          ${theme === 'light' ? 'text-pink-700' : 'text-pink-300'}`}
        >
          {title}
        </h3>
        <p className={`text-sm 
          ${theme === 'light' ? 'text-pink-600' : 'text-pink-200'}`}
        >
          {description}
        </p>
      </div>
      <div className="px-6 pb-6 flex justify-end">
        <motion.a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`inline-flex items-center px-6 py-3 rounded-xl text-sm font-medium shadow-lg
            ${theme === 'light'
              ? 'bg-pink-500 text-white hover:bg-pink-600 shadow-pink-500/20'
              : 'bg-pink-400 text-purple-900 hover:bg-pink-300 shadow-pink-400/20'}`}
        >
          Start Offer <ExternalLink className="ml-2" size={16} />
        </motion.a>
      </div>
    </motion.div>
  );
};

export default OfferCard;