// constants/MarketLocations.ts

export interface MarketLocation {
  id: string
  name: string
  type: 'asian_market' | 'grocery_store' | 'farmers_market' | 'specialty_store'
  address: string
  distance: number
  rating: number
  coordinates: {
    latitude: number
    longitude: number
  }
  hours: string
  phone: string
  hasInStock: string[]
  priceRange: '$' | '$$' | '$$$'
  specialties: string[]
}

export const MOCK_MARKETS: MarketLocation[] = [
  {
    id: 'asia_food_market',
    name: 'Asia Food Market',
    type: 'asian_market',
    address: '2752 Brewerton Rd, Syracuse, NY 13211',
    distance: 2.3,
    rating: 4.7,
    coordinates: {
      latitude: 43.0962,
      longitude: -76.12,
    },
    hours: 'Mon-Sun: 10AM - 8PM',
    phone: '(315) 555-0123',
    hasInStock: [
      'chinese_yam',
      'ginger',
      'bok_choy',
      'shiitake',
      'rice_noodles',
      'tofu',
    ],
    priceRange: '$$',
    specialties: ['Asian vegetables', 'Fresh herbs', 'Rice varieties'],
  },
  {
    id: 'wegmans_dewitt',
    name: 'Wegmans DeWitt',
    type: 'grocery_store',
    address: '3325 W Genesee St, Syracuse, NY 13219',
    distance: 3.1,
    rating: 4.8,
    coordinates: {
      latitude: 43.0481,
      longitude: -76.2058,
    },
    hours: 'Mon-Sun: 6AM - 12AM',
    phone: '(315) 555-0456',
    hasInStock: [
      'ginger',
      'watermelon',
      'cucumber',
      'apple',
      'rice',
      'organic_vegetables',
    ],
    priceRange: '$$',
    specialties: ['Organic produce', 'International foods', 'Fresh bakery'],
  },
  {
    id: 'regional_market',
    name: 'Syracuse Regional Market',
    type: 'farmers_market',
    address: '2100 Park St, Syracuse, NY 13208',
    distance: 1.8,
    rating: 4.6,
    coordinates: {
      latitude: 43.0723,
      longitude: -76.1644,
    },
    hours: 'Sat-Sun: 7AM - 2PM',
    phone: '(315) 555-0789',
    hasInStock: [
      'watermelon',
      'cucumber',
      'apple',
      'tomato',
      'seasonal_vegetables',
    ],
    priceRange: '$',
    specialties: ['Local produce', 'Seasonal fruits', 'Farm-fresh items'],
  },
  {
    id: 'price_rite',
    name: 'Price Rite Marketplace',
    type: 'grocery_store',
    address: '3955 Route 31, Liverpool, NY 13090',
    distance: 4.5,
    rating: 4.2,
    coordinates: {
      latitude: 43.1156,
      longitude: -76.2167,
    },
    hours: 'Mon-Sun: 8AM - 9PM',
    phone: '(315) 555-1234',
    hasInStock: ['rice', 'ginger', 'apple', 'cucumber', 'basic_vegetables'],
    priceRange: '$',
    specialties: ['Budget-friendly', 'Bulk items', 'International aisle'],
  },
  {
    id: 'aldi_salina',
    name: 'ALDI',
    type: 'grocery_store',
    address: '103 W Seneca Turnpike, Syracuse, NY 13205',
    distance: 2.7,
    rating: 4.5,
    coordinates: {
      latitude: 43.0265,
      longitude: -76.1472,
    },
    hours: 'Mon-Sun: 9AM - 8PM',
    phone: '(315) 555-5678',
    hasInStock: ['rice', 'ginger', 'apple', 'seasonal_produce'],
    priceRange: '$',
    specialties: ['Organic options', 'Weekly deals', 'Fresh produce'],
  },
  {
    id: 'su_corner_market',
    name: 'SU Corner Market',
    type: 'specialty_store',
    address: '700 S Crouse Ave, Syracuse, NY 13210',
    distance: 0.5,
    rating: 4.3,
    coordinates: {
      latitude: 43.0395,
      longitude: -76.1347,
    },
    hours: 'Mon-Fri: 7AM - 10PM, Sat-Sun: 9AM - 8PM',
    phone: '(315) 555-9012',
    hasInStock: ['ginger', 'apple', 'cucumber', 'snacks'],
    priceRange: '$$',
    specialties: ['Campus convenience', 'Quick essentials', 'Grab & go'],
  },
]

export interface Ingredient {
  id: string
  name: string
  chineseName: string
  category: 'vegetable' | 'fruit' | 'grain' | 'protein' | 'herb' | 'spice'
  icon: string
  commonMarkets: string[]
}

export const INGREDIENTS: Ingredient[] = [
  {
    id: 'chinese_yam',
    name: 'Chinese Yam',
    chineseName: '山药 (Shān Yào)',
    category: 'vegetable',
    icon: '🥔',
    commonMarkets: ['asia_food_market'],
  },
  {
    id: 'ginger',
    name: 'Ginger',
    chineseName: '姜 (Jiāng)',
    category: 'spice',
    icon: '🫚',
    commonMarkets: [
      'asia_food_market',
      'wegmans_dewitt',
      'price_rite',
      'aldi_salina',
      'su_corner_market',
    ],
  },
  {
    id: 'bok_choy',
    name: 'Bok Choy',
    chineseName: '白菜 (Bái Cài)',
    category: 'vegetable',
    icon: '🥬',
    commonMarkets: ['asia_food_market'],
  },
  {
    id: 'shiitake',
    name: 'Shiitake Mushroom',
    chineseName: '香菇 (Xiāng Gū)',
    category: 'vegetable',
    icon: '🍄',
    commonMarkets: ['asia_food_market', 'wegmans_dewitt'],
  },
  {
    id: 'rice',
    name: 'Rice',
    chineseName: '米 (Mǐ)',
    category: 'grain',
    icon: '🍚',
    commonMarkets: [
      'asia_food_market',
      'wegmans_dewitt',
      'price_rite',
      'aldi_salina',
    ],
  },
  {
    id: 'watermelon',
    name: 'Watermelon',
    chineseName: '西瓜 (Xī Guā)',
    category: 'fruit',
    icon: '🍉',
    commonMarkets: ['wegmans_dewitt', 'regional_market'],
  },
  {
    id: 'cucumber',
    name: 'Cucumber',
    chineseName: '黄瓜 (Huáng Guā)',
    category: 'vegetable',
    icon: '🥒',
    commonMarkets: [
      'wegmans_dewitt',
      'regional_market',
      'price_rite',
      'su_corner_market',
    ],
  },
  {
    id: 'apple',
    name: 'Apple',
    chineseName: '苹果 (Píng Guǒ)',
    category: 'fruit',
    icon: '🍎',
    commonMarkets: [
      'wegmans_dewitt',
      'regional_market',
      'price_rite',
      'aldi_salina',
      'su_corner_market',
    ],
  },
  {
    id: 'tofu',
    name: 'Tofu',
    chineseName: '豆腐 (Dòu Fu)',
    category: 'protein',
    icon: '🧈',
    commonMarkets: ['asia_food_market', 'wegmans_dewitt'],
  },
  {
    id: 'rice_noodles',
    name: 'Rice Noodles',
    chineseName: '米粉 (Mǐ Fěn)',
    category: 'grain',
    icon: '🍜',
    commonMarkets: ['asia_food_market'],
  },
]

export const findMarketsByIngredient = (
  ingredientId: string,
  zipCode?: string
): MarketLocation[] => {
  const marketsWithIngredient = MOCK_MARKETS.filter((market) =>
    market.hasInStock.includes(ingredientId)
  )
  return marketsWithIngredient.sort((a, b) => a.distance - b.distance)
}

export const searchIngredients = (query: string): Ingredient[] => {
  const lowerQuery = query.toLowerCase()
  return INGREDIENTS.filter(
    (ingredient) =>
      ingredient.name.toLowerCase().includes(lowerQuery) ||
      ingredient.chineseName.includes(query)
  )
}

export const getIngredientById = (id: string): Ingredient | undefined => {
  return INGREDIENTS.find((ing) => ing.id === id)
}

export const getMarketTypeColor = (type: MarketLocation['type']): string => {
  switch (type) {
    case 'asian_market':
      return '#fa709a'
    case 'grocery_store':
      return '#4facfe'
    case 'farmers_market':
      return '#43e97b'
    case 'specialty_store':
      return '#fee140'
    default:
      return '#999'
  }
}

export const getMarketTypeLabel = (type: MarketLocation['type']): string => {
  switch (type) {
    case 'asian_market':
      return 'Asian Market'
    case 'grocery_store':
      return 'Grocery Store'
    case 'farmers_market':
      return "Farmer's Market"
    case 'specialty_store':
      return 'Specialty Store'
    default:
      return 'Store'
  }
}
