export interface FoodItem {
  id: string
  name: string
  energy: 'cold' | 'warm' | 'neutral'
  benefits: string[]
  cautions: string[]
  bestSeasons: string[]
  description: string
  recipes: string[]
  image?: string
}

export const MOCK_FOODS: FoodItem[] = [
  {
    id: 'watermelon',
    name: 'Watermelon',
    energy: 'cold',
    benefits: [
      'Clears heat and relieves thirst',
      'Promotes urination',
      'Relieves summer heat',
    ],
    cautions: [
      'Avoid in excess during winter',
      'Not suitable for weak digestion',
    ],
    bestSeasons: ['summer'],
    description:
      'A cooling fruit perfect for hot summer days. Helps balance body heat.',
    recipes: ['Watermelon Juice', 'Watermelon Salad', 'Watermelon Smoothie'],
  },
  {
    id: 'ginger',
    name: 'Ginger',
    energy: 'warm',
    benefits: [
      'Warms the stomach',
      'Dispels cold',
      'Improves circulation',
      'Aids digestion',
    ],
    cautions: ['Avoid with heat symptoms', 'Use moderately in summer'],
    bestSeasons: ['winter', 'autumn'],
    description:
      'A warming root that strengthens digestive fire and circulation.',
    recipes: ['Ginger Tea', 'Ginger Chicken Soup', 'Ginger Stir-fry'],
  },
  {
    id: 'rice',
    name: 'Rice',
    energy: 'neutral',
    benefits: [
      'Provides stable energy',
      'Strengthens spleen',
      'Easy to digest',
    ],
    cautions: ['None - suitable for all constitutions'],
    bestSeasons: ['spring', 'summer', 'autumn', 'winter'],
    description:
      'A balanced grain suitable for daily consumption by all body types.',
    recipes: ['Congee', 'Fried Rice', 'Rice Porridge'],
  },
  {
    id: 'cucumber',
    name: 'Cucumber',
    energy: 'cold',
    benefits: ['Clears heat', 'Promotes hydration', 'Detoxifies'],
    cautions: ['Limit in cold weather', 'Not for weak digestion'],
    bestSeasons: ['summer'],
    description: 'A refreshing vegetable that cools the body and hydrates.',
    recipes: ['Cucumber Salad', 'Pickled Cucumber', 'Cucumber Soup'],
  },
  {
    id: 'apple',
    name: 'Apple',
    energy: 'neutral',
    benefits: ['Moistens lungs', 'Aids digestion', 'Reduces cholesterol'],
    cautions: ['Best eaten cooked in winter'],
    bestSeasons: ['autumn', 'winter'],
    description: 'A versatile fruit that nourishes and moistens the body.',
    recipes: ['Baked Apples', 'Apple Cider', 'Apple Pie'],
  },
]

// Simulated food detection based on random selection
export const detectFood = (imagePath: string): FoodItem => {
  // In real app, this would use image recognition API
  const randomIndex = Math.floor(Math.random() * MOCK_FOODS.length)
  return MOCK_FOODS[randomIndex]
}
