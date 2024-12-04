// src/data/relationships/marketRelationships.js
export const marketHierarchy = {
  AU: {
    baseUrl: 'https://www.fisherpaykel.com/au',
    availableProducts: ['Cooling', 'Cooking', 'Dishwashing', 'Laundry', 'Outdoor'],
    currencies: 'AUD',
    defaultLanguage: 'en-AU',
    regions: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'NT', 'ACT']
  },
  NZ: {
    baseUrl: 'https://www.fisherpaykel.com/nz',
    availableProducts: ['Cooling', 'Cooking', 'Dishwashing', 'Laundry'],
    currencies: 'NZD',
    defaultLanguage: 'en-NZ',
    regions: ['Auckland', 'Wellington', 'Christchurch', 'Other']
  },
  UK: {
    baseUrl: 'https://www.fisherpaykel.com/uk',
    availableProducts: ['Cooling', 'Cooking', 'Dishwashing'],
    currencies: 'GBP',
    defaultLanguage: 'en-GB',
    regions: ['England', 'Scotland', 'Wales', 'Northern Ireland']
  },
  // Add other markets as needed
};

// src/data/relationships/productRelationships.js
export const productHierarchy = {
  Cooling: {
    subcategories: {
      Refrigeration: [
        'French Door Refrigerators',
        'Bottom Mount Refrigerators',
        'Top Mount Refrigerators',
        'Integrated Refrigerators'
      ],
      'Wine Storage': [
        'Wine Cabinets',
        'Integrated Wine Columns'
      ],
      'Freezers': [
        'Chest Freezers',
        'Vertical Freezers',
        'Integrated Freezers'
      ]
    },
    defaultBrands: ['Fisher & Paykel'],
    commonFeatures: ['ActiveSmart™', 'Variable Temperature Zone', 'Ice & Water'],
    validMarkets: ['AU', 'NZ', 'UK', 'US']
  },
  Cooking: {
    subcategories: {
      Ovens: [
        'Built-in Ovens',
        'Steam Ovens',
        'Combination Ovens'
      ],
      Cooktops: [
        'Induction Cooktops',
        'Gas Cooktops',
        'Electric Cooktops'
      ],
      Ranges: [
        'Dual Fuel Ranges',
        'Gas Ranges',
        'Electric Ranges'
      ]
    },
    defaultBrands: ['Fisher & Paykel', 'DCS'],
    commonFeatures: ['Pyrolytic Self-clean', 'Food Probe', 'Steam Function'],
    validMarkets: ['AU', 'NZ', 'UK', 'US']
  },
  // Add other product categories
};

// src/data/relationships/channelRelationships.js
export const channelHierarchy = {
  Meta: {
    types: [
      'Feed',
      'Stories',
      'Reels',
      'Carousel',
      'Collection'
    ],
    objectives: {
      Awareness: {
        metrics: ['Reach', 'Impressions', 'Brand Lift'],
        recommendedBuyTypes: ['CPM']
      },
      Consideration: {
        metrics: ['Engagement Rate', 'Video Views', 'Landing Page Views'],
        recommendedBuyTypes: ['CPE', 'CPV']
      },
      Conversion: {
        metrics: ['ROAS', 'CPA', 'Sales'],
        recommendedBuyTypes: ['CPC', 'CPA']
      }
    },
    buyTypes: ['CPM', 'CPC', 'CPV', 'CPA'],
    placements: ['Facebook', 'Instagram', 'Audience Network'],
    defaultUtmMedium: 'social',
    contentGuidelines: {
      image: {
        aspectRatio: '1:1, 4:5, 16:9',
        maxFileSize: '30MB'
      },
      video: {
        maxDuration: '120 seconds',
        recommended: '15-30 seconds'
      }
    }
  },
  LinkedIn: {
    types: [
      'Single Image Ad',
      'Carousel Ad',
      'Video Ad',
      'Message Ad',
      'Conversation Ad'
    ],
    objectives: {
      Awareness: {
        metrics: ['Impressions', 'Brand Awareness'],
        recommendedBuyTypes: ['CPM']
      },
      Consideration: {
        metrics: ['Engagement Rate', 'Landing Page Views'],
        recommendedBuyTypes: ['CPC']
      },
      'Lead Generation': {
        metrics: ['Lead Form Completion Rate', 'Cost per Lead'],
        recommendedBuyTypes: ['CPL']
      }
    },
    buyTypes: ['CPM', 'CPC', 'CPL'],
    defaultUtmMedium: 'social',
    contentGuidelines: {
      image: {
        aspectRatio: '1.91:1',
        maxFileSize: '20MB'
      },
      video: {
        maxDuration: '30 minutes',
        recommended: '15-30 seconds'
      }
    }
  },
  'Display & Video 360': {
    types: [
      'Display',
      'Native',
      'Video',
      'Connected TV'
    ],
    objectives: {
      Awareness: {
        metrics: ['Reach', 'Viewability', 'Brand Lift'],
        recommendedBuyTypes: ['CPM', 'vCPM']
      },
      Consideration: {
        metrics: ['Video Completion Rate', 'Active View Time'],
        recommendedBuyTypes: ['CPV', 'CPCV']
      },
      Action: {
        metrics: ['Conversion Rate', 'ROAS'],
        recommendedBuyTypes: ['CPA', 'CPC']
      }
    },
    buyTypes: ['CPM', 'vCPM', 'CPV', 'CPCV', 'CPC', 'CPA'],
    defaultUtmMedium: 'display',
    contentGuidelines: {
      display: {
        sizes: ['300x250', '728x90', '160x600'],
        maxFileSize: '150KB'
      },
      video: {
        maxDuration: '30 seconds',
        formats: ['MP4', 'WEBM']
      }
    }
  }
  // Add other channels
};

// src/data/relationships/index.js
export * from './marketRelationships';
export * from './productRelationships';
export * from './channelRelationships';

// Helper functions for working with relationships
export const getAvailableSubcategories = (category, market) => {
  if (!category || !market) return [];
  
  const productData = productHierarchy[category];
  if (!productData || !productData.validMarkets.includes(market)) {
    return [];
  }
  
  return Object.keys(productData.subcategories);
};

export const getChannelTypes = (channel, objective) => {
  if (!channel) return [];
  
  const channelData = channelHierarchy[channel];
  if (!channelData) return [];
  
  if (objective) {
    // Filter types based on objective if needed
    return channelData.types.filter(type => {
      const objectiveData = channelData.objectives[objective];
      return objectiveData?.recommendedTypes?.includes(type) || true;
    });
  }
  
  return channelData.types;
};

export const getBuyTypes = (channel, objective) => {
  if (!channel || !objective) return [];
  
  const channelData = channelHierarchy[channel];
  if (!channelData?.objectives[objective]) return [];
  
  return channelData.objectives[objective].recommendedBuyTypes;
};
