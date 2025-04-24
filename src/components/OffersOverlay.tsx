import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { fetchOffers } from '../utils/api';
import OfferCard from './OfferCard';
import { motion } from 'framer-motion';
import { Loader, RefreshCw, Gift } from 'lucide-react';

interface OfferType {
  id: string;
  anchor: string;
  description: string;
  url: string;
  conversion: string;
}

interface OffersOverlayProps {
  onOfferComplete: () => void;
  onGenerateClick: () => void;
}

const OffersOverlay: React.FC<OffersOverlayProps> = ({ onOfferComplete, onGenerateClick }) => {
  const { theme } = useTheme();
  const [offers, setOffers] = useState<OfferType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showOffers, setShowOffers] = useState(false);

  const loadOffers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchOffers();
      if (data && Array.isArray(data.offers)) {
        if (data.offers.length > 0) {
          setOffers(data.offers.slice(0, 3));
        } else {
          setError('No offers available at the moment');
        }
      } else {
        setError('No offers available at the moment');
      }
    } catch (err) {
      setError('Failed to load offers. Please try again.');
      console.error('Error fetching offers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOffers();
  }, []);

  if (!showOffers) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 flex items-center justify-center z-30 p-4 bg-black/80"
      >
        <motion.div 
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className={`w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden 
            ${theme === 'light' ? 'bg-white' : 'bg-purple-900'}`}
        >
          <div className={`p-8 text-center
            ${theme === 'light' 
              ? 'bg-gradient-to-b from-pink-50 to-white' 
              : 'bg-gradient-to-b from-purple-800 to-purple-900'}`}
          >
            <Gift 
              className={`mx-auto mb-6 ${theme === 'light' ? 'text-pink-500' : 'text-pink-300'}`}
              size={48}
            />
            <h2 className={`text-3xl font-bold mb-4
              ${theme === 'light' ? 'text-pink-600' : 'text-pink-300'}`}>
              Keep Sakura Dreams Free!
            </h2>
            <p className={`text-lg mb-6
              ${theme === 'light' ? 'text-pink-500' : 'text-pink-200'}`}>
              Complete one quick offer to help us maintain this tool free for everyone.
            </p>
            <button
              onClick={() => setShowOffers(true)}
              className={`px-8 py-4 rounded-full text-xl font-semibold transform transition-all duration-300 
                hover:scale-105 focus:outline-none focus:ring-4 ${
                theme === 'light'
                  ? 'bg-pink-500 text-white hover:bg-pink-600 focus:ring-pink-300'
                  : 'bg-pink-400 text-purple-900 hover:bg-pink-300 focus:ring-pink-200'
              }`}
            >
              Show Available Offers
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 flex items-center justify-center z-30 p-4 bg-black/80"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className={`w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden 
          ${theme === 'light' ? 'bg-white' : 'bg-purple-900'}`}
      >
        <div className={`p-8 text-center border-b 
          ${theme === 'light' 
            ? 'border-pink-100 bg-gradient-to-b from-pink-50 to-white' 
            : 'border-purple-700 bg-gradient-to-b from-purple-800 to-purple-900'}`}
        >
          <h2 className={`text-3xl font-bold mb-3
            ${theme === 'light' ? 'text-pink-600' : 'text-pink-300'}`}>
            Choose Your Offer
          </h2>
          <p className={`text-lg
            ${theme === 'light' ? 'text-pink-500' : 'text-pink-200'}`}>
            Complete any ONE offer below to unlock your FREE Sakura animation
          </p>
        </div>
        
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {loading ? (
            <div className="py-12 text-center">
              <Loader className={`animate-spin mx-auto mb-4 
                ${theme === 'light' ? 'text-pink-500' : 'text-pink-300'}`} 
                size={40} 
              />
              <p className={theme === 'light' ? 'text-pink-600' : 'text-pink-200'}>
                Loading offers...
              </p>
            </div>
          ) : error ? (
            <div className="py-12 text-center">
              <p className={`text-lg mb-4 ${theme === 'light' ? 'text-pink-600' : 'text-pink-300'}`}>
                {error}
              </p>
              <button
                onClick={loadOffers}
                className={`inline-flex items-center px-6 py-3 rounded-xl text-sm font-medium
                  ${theme === 'light' 
                    ? 'bg-pink-100 text-pink-700 hover:bg-pink-200' 
                    : 'bg-purple-800 text-pink-200 hover:bg-purple-700'}`}
              >
                <RefreshCw size={16} className="mr-2" />
                Refresh Offers
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {offers.map((offer, index) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <OfferCard 
                    id={offer.id}
                    title={offer.anchor}
                    description={offer.description}
                    url={offer.url}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
        
        <div className="p-6 bg-gradient-to-t from-black/5 to-transparent">
          <button
            onClick={onGenerateClick}
            className={`w-full px-6 py-3 rounded-xl font-medium transition-all
              ${theme === 'light'
                ? 'bg-pink-100 text-pink-700 hover:bg-pink-200'
                : 'bg-purple-800 text-pink-200 hover:bg-purple-700'}`}
          >
            Go Back
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OffersOverlay;