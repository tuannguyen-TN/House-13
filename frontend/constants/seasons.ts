import { ImageSourcePropType } from 'react-native'

export interface Season {
  id: string
  name: string
  subtitle: string
  description: string
  colors: {
    primary: string
    secondary: string
    accent: string
  }
  emoji: string
  months: string
  image: ImageSourcePropType
  foods: string[]
}

export const SEASONS: Season[] = [
  {
    id: 'spring',
    name: 'Spring',
    subtitle: 'Renewal & Growth',
    description: 'Time for fresh greens and liver cleansing foods',
    colors: {
      primary: '#52c41a',
      secondary: '#95de64',
      accent: '#237804',
    },
    emoji: '🌸',
    months: 'March - May',
    image: require('../assets/images/spring.png'), // You'll need to add these
    foods: ['Spinach', 'Asparagus', 'Peas', 'Artichokes', 'Green Tea', 'Mint'],
  },
  {
    id: 'summer',
    name: 'Summer',
    subtitle: 'Energy & Vitality',
    description: 'Cooling foods to balance the heat',
    colors: {
      primary: '#fa8c16',
      secondary: '#ffc53d',
      accent: '#d46b08',
    },
    emoji: '☀️',
    months: 'June - August',
    image: require('../assets/images/summer.png'),
    foods: ['Watermelon', 'Cucumber', 'Tomatoes', 'Peaches', 'Mint', 'Coconut'],
  },
  {
    id: 'autumn',
    name: 'Autumn',
    subtitle: 'Harvest & Balance',
    description: 'Nourishing foods to prepare for winter',
    colors: {
      primary: '#d4380d',
      secondary: '#ff7a45',
      accent: '#871400',
    },
    emoji: '🍂',
    months: 'September - November',
    image: require('../assets/images/autumn.png'),
    foods: [
      'Pumpkin',
      'Sweet Potato',
      'Apples',
      'Pears',
      'Mushrooms',
      'Ginger',
    ],
  },
  {
    id: 'winter',
    name: 'Winter',
    subtitle: 'Rest & Restoration',
    description: 'Warming foods to maintain inner heat',
    colors: {
      primary: '#1890ff',
      secondary: '#69c0ff',
      accent: '#0050b3',
    },
    emoji: '❄️',
    months: 'December - February',
    image: require('../assets/images/winter.png'),
    foods: [
      'Root Vegetables',
      'Bone Broth',
      'Black Beans',
      'Walnuts',
      'Cinnamon',
      'Garlic',
    ],
  },
]
