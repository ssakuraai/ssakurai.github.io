import { jsonp } from './jsonp';

interface OfferResponse {
  offers: Array<{
    id: string;
    anchor: string;
    description: string;
    url: string;
    conversion: string;
  }>;
}

interface LeadCheckResponse {
  leads: Array<{
    offer_id: string;
    status: string;
    points: number;
  }>;
}

// Cache to store the offers we've displayed
let displayedOffers: string[] = [];

export const fetchOffers = async (): Promise<OfferResponse> => {
  const url = 'https://drqp033qnd79l.cloudfront.net/public/offers/feed.php';
  const params = {
    user_id: '538458',
    api_key: '16388e91cdf3368db3bfd08d2dfe4ff0',
    callback: 'callback' // Required for JSONP
  };
  
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
    
  try {
    const response = await jsonp(`${url}?${queryString}`);
    if (response) {
      // Handle both response formats: direct array or object with offers property
      const offers = Array.isArray(response) ? response : response.offers;
      
      if (Array.isArray(offers)) {
        // Store the offered IDs so we can check completion
        displayedOffers = offers.map(offer => offer.id);
        return { offers };
      }
    }
    throw new Error('Invalid response format');
  } catch (error) {
    console.error('Error fetching offers:', error);
    throw error;
  }
};

export const checkOfferCompletion = async (): Promise<boolean> => {
  const url = 'https://drqp033qnd79l.cloudfront.net/public/external/check2.php';
  const params = {
    testing: '0', // Set to '1' for test leads
    callback: 'callback' // Required for JSONP
  };
  
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
  
  try {
    const response = await jsonp(`${url}?${queryString}`) as LeadCheckResponse;
    
    if (!response.leads) return false;
    
    // Check if any of our displayed offers match completed leads
    return response.leads.some(lead => {
      const isCompleted = displayedOffers.includes(lead.offer_id) && 
                         lead.status === 'completed';
      
      if (isCompleted) {
        console.log(`Lead completed for offer ${lead.offer_id} with ${lead.points} points`);
      }
      
      return isCompleted;
    });
  } catch (error) {
    console.error('Error checking offer completion:', error);
    return false;
  }
};