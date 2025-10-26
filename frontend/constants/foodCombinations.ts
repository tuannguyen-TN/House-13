export interface Combination {
  ingredients: string[]
  reason: string
  alternative?: string
  severity?: 'mild' | 'moderate' | 'severe'
}

export interface Recipe {
  id: string
  name: string
  emoji: string
  type: 'toxic' | 'non-toxic'
  category: string
  description: string
  prepTime: string
  cookTime: string
  servings: number
  ingredients: string[]
  steps: string[]
  nutritionTips?: string[]
}

export interface CombinationAnalysis {
  detectedIngredients: string[]
  goodCombinations: Combination[]
  badCombinations: Combination[]
  neutralCombinations?: Combination[]
  isToxic: boolean
  overallRating: 'excellent' | 'good' | 'caution' | 'avoid'
  healthTip: string
  suggestedRecipes: Recipe[]
}

// Comprehensive mock scenarios for different food combinations
export const MOCK_SCENARIOS = [
  {
    id: 'scenario_1',
    name: 'Warming Winter Combo',
    ingredients: [
      'Lamb',
      'Ginger',
      'Black Pepper',
      'Carrots',
      'Onions',
      'Garlic',
      'Rice Wine',
    ],
    good: [
      {
        ingredients: ['Lamb', 'Ginger'],
        reason:
          'Lamb is warming and ginger enhances its therapeutic properties while aiding digestion',
        severity: 'mild',
      },
      {
        ingredients: ['Black Pepper', 'Lamb'],
        reason:
          'Black pepper helps reduce the gamey smell and adds warming properties',
        severity: 'mild',
      },
      {
        ingredients: ['Carrots', 'Lamb'],
        reason: 'Carrots balance the heavy nature of lamb and add sweetness',
        severity: 'mild',
      },
      {
        ingredients: ['Garlic', 'Ginger', 'Onions'],
        reason: 'Trinity of aromatics that boost immunity and circulation',
        severity: 'mild',
      },
    ],
    bad: [],
    neutral: [
      {
        ingredients: ['Rice Wine', 'Lamb'],
        reason:
          'Can be used in moderation for flavor, but avoid excess as both are very warming',
      },
    ],
    toxic: false,
    rating: 'excellent',
    healthTip:
      'Perfect combination for winter! These warming ingredients strengthen yang energy and boost circulation.',
  },

  {
    id: 'scenario_2',
    name: 'Summer Cooling Disaster',
    ingredients: [
      'Watermelon',
      'Ice Cream',
      'Cucumber',
      'Green Tea',
      'Raw Salad',
      'Cold Beer',
    ],
    good: [
      {
        ingredients: ['Cucumber', 'Watermelon'],
        reason: 'Both cooling foods that help with summer heat relief',
        severity: 'mild',
      },
    ],
    bad: [
      {
        ingredients: ['Ice Cream', 'Watermelon'],
        reason:
          'Too much cold can damage spleen and stomach qi, causing diarrhea',
        alternative: 'Have ice cream at least 2 hours apart from watermelon',
        severity: 'moderate',
      },
      {
        ingredients: ['Cold Beer', 'Raw Salad'],
        reason: 'Excessive cold and raw foods weaken digestive fire',
        alternative: 'Try room temperature drinks or add cooked vegetables',
        severity: 'moderate',
      },
      {
        ingredients: ['Green Tea', 'Ice Cream'],
        reason: 'Cold dairy with tea can cause indigestion and bloating',
        alternative: 'Drink tea 1 hour before or after dairy',
        severity: 'mild',
      },
    ],
    neutral: [],
    toxic: false,
    rating: 'caution',
    healthTip:
      'Warning: Too many cooling foods! This can weaken your digestive system. Add some warm ingredients like ginger or eat cooked foods.',
  },

  {
    id: 'scenario_3',
    name: 'Dangerous Seafood Combo',
    ingredients: ['Crab', 'Persimmon', 'Beer', 'Ice', 'Lemon'],
    good: [],
    bad: [
      {
        ingredients: ['Crab', 'Persimmon'],
        reason:
          'DANGEROUS: Can cause severe food poisoning, stomach pain, and diarrhea',
        alternative:
          'Never eat these together! Wait at least 4 hours between consumption',
        severity: 'severe',
      },
      {
        ingredients: ['Crab', 'Beer', 'Ice'],
        reason:
          'Triple cold combination can cause severe stomach cramps and gout',
        alternative: 'Eat crab with warm ginger tea instead',
        severity: 'moderate',
      },
      {
        ingredients: ['Crab', 'High-dose Lemon'],
        reason: 'Excessive vitamin C with shellfish may form arsenic compounds',
        alternative: 'Use small amounts of lemon for flavor only',
        severity: 'moderate',
      },
    ],
    neutral: [],
    toxic: true,
    rating: 'avoid',
    healthTip:
      'TOXIC ALERT! This combination contains dangerous pairings that can cause food poisoning. Separate these ingredients!',
  },

  {
    id: 'scenario_4',
    name: 'Balanced Nutritious Meal',
    ingredients: [
      'Chicken',
      'Broccoli',
      'Brown Rice',
      'Mushrooms',
      'Goji Berries',
      'Sesame Oil',
    ],
    good: [
      {
        ingredients: ['Chicken', 'Mushrooms'],
        reason: 'Excellent protein combination that boosts immunity',
        severity: 'mild',
      },
      {
        ingredients: ['Broccoli', 'Sesame Oil'],
        reason: 'Oil helps absorption of fat-soluble vitamins in broccoli',
        severity: 'mild',
      },
      {
        ingredients: ['Brown Rice', 'Chicken'],
        reason: 'Complete protein with sustained energy from whole grains',
        severity: 'mild',
      },
      {
        ingredients: ['Goji Berries', 'Chicken'],
        reason: 'Traditional pairing that nourishes blood and improves vision',
        severity: 'mild',
      },
    ],
    bad: [],
    neutral: [
      {
        ingredients: ['Mushrooms', 'Brown Rice'],
        reason: 'No special interaction, both are nutritious and complementary',
      },
    ],
    toxic: false,
    rating: 'excellent',
    healthTip:
      'Excellent balance! This combination provides complete nutrition and follows TCM principles perfectly.',
  },

  {
    id: 'scenario_5',
    name: 'Pregnancy Special Care',
    ingredients: ['Papaya', 'Pineapple', 'Crab', 'Aloe Vera', 'Raw Fish'],
    good: [],
    bad: [
      {
        ingredients: ['Papaya', 'Pregnancy'],
        reason: 'Unripe papaya contains latex that can trigger contractions',
        alternative:
          'Choose fully ripe papaya in small amounts or avoid entirely',
        severity: 'severe',
      },
      {
        ingredients: ['Crab', 'Pregnancy'],
        reason:
          'Very cooling nature can affect fetal development in TCM theory',
        alternative: 'Replace with warming proteins like chicken or beef',
        severity: 'moderate',
      },
      {
        ingredients: ['Raw Fish', 'Pregnancy'],
        reason: 'Risk of parasites and mercury exposure',
        alternative: 'Choose cooked fish low in mercury like salmon',
        severity: 'severe',
      },
      {
        ingredients: ['Aloe Vera', 'Pregnancy'],
        reason: 'Can stimulate uterine contractions',
        alternative: 'Use topically only, avoid internal consumption',
        severity: 'severe',
      },
    ],
    neutral: [],
    toxic: true,
    rating: 'avoid',
    healthTip:
      'PREGNANCY WARNING: These ingredients should be avoided during pregnancy. Consult your healthcare provider.',
  },

  {
    id: 'scenario_6',
    name: 'Digestive Harmony',
    ingredients: [
      'Pumpkin',
      'Millet',
      'Chinese Yam',
      'Red Dates',
      'Honey',
      'Cinnamon',
    ],
    good: [
      {
        ingredients: ['Pumpkin', 'Millet'],
        reason:
          'Both strengthen spleen and stomach, excellent for digestive health',
        severity: 'mild',
      },
      {
        ingredients: ['Chinese Yam', 'Red Dates'],
        reason: 'Classic combination that nourishes qi and blood',
        severity: 'mild',
      },
      {
        ingredients: ['Honey', 'Cinnamon'],
        reason: 'Warming combo that aids digestion and metabolism',
        severity: 'mild',
      },
      {
        ingredients: ['Pumpkin', 'Chinese Yam'],
        reason: 'Both are sweet and neutral, perfect for weak digestion',
        severity: 'mild',
      },
    ],
    bad: [],
    neutral: [],
    toxic: false,
    rating: 'excellent',
    healthTip:
      'Perfect for digestive health! This combination strengthens the spleen and stomach qi.',
  },

  {
    id: 'scenario_7',
    name: 'Iron Absorption Conflict',
    ingredients: [
      'Spinach',
      'Tofu',
      'Black Tea',
      'Beef',
      'Tomatoes',
      'Dairy Milk',
    ],
    good: [
      {
        ingredients: ['Spinach', 'Tomatoes'],
        reason: 'Vitamin C in tomatoes enhances iron absorption from spinach',
        severity: 'mild',
      },
      {
        ingredients: ['Beef', 'Tomatoes'],
        reason: 'Classic combination that aids iron absorption and adds flavor',
        severity: 'mild',
      },
    ],
    bad: [
      {
        ingredients: ['Spinach', 'Tofu'],
        reason:
          'Oxalates in spinach can bind with calcium in tofu, reducing absorption',
        alternative: 'Blanch spinach first to reduce oxalates',
        severity: 'mild',
      },
      {
        ingredients: ['Black Tea', 'Spinach'],
        reason: 'Tannins in tea significantly reduce iron absorption',
        alternative: 'Drink tea 1-2 hours after eating iron-rich foods',
        severity: 'moderate',
      },
      {
        ingredients: ['Dairy Milk', 'Spinach'],
        reason: 'Calcium competes with iron absorption',
        alternative: 'Separate dairy and iron-rich meals by 2 hours',
        severity: 'mild',
      },
    ],
    neutral: [],
    toxic: false,
    rating: 'caution',
    healthTip:
      'Mixed results: Some good combinations but watch out for iron absorption blockers.',
  },

  {
    id: 'scenario_8',
    name: 'Sweet Potato Mistakes',
    ingredients: ['Sweet Potato', 'Eggs', 'Persimmon', 'Banana', 'Sugar'],
    good: [
      {
        ingredients: ['Sweet Potato', 'Eggs'],
        reason: 'Balanced protein and complex carbs for sustained energy',
        severity: 'mild',
      },
    ],
    bad: [
      {
        ingredients: ['Sweet Potato', 'Persimmon'],
        reason: 'Can cause stomach stones due to chemical reaction',
        alternative: 'Eat these at least 4 hours apart',
        severity: 'severe',
      },
      {
        ingredients: ['Sweet Potato', 'Sugar'],
        reason: 'Too much sweetness can cause acid reflux and bloating',
        alternative: 'Sweet potato is naturally sweet, skip added sugar',
        severity: 'mild',
      },
      {
        ingredients: ['Sweet Potato', 'Banana'],
        reason: 'Both are heavy and can cause bloating when combined',
        alternative: 'Eat separately as snacks',
        severity: 'mild',
      },
    ],
    neutral: [],
    toxic: false,
    rating: 'caution',
    healthTip:
      'Be careful with sweet potato combinations - some can cause digestive issues.',
  },
]

// Comprehensive recipe database
export const RECIPE_DATABASE: Recipe[] = [
  // Non-toxic, warming recipes
  {
    id: 'lamb-stew',
    name: 'Winter Warming Lamb Stew',
    emoji: '🍲',
    type: 'non-toxic',
    category: 'Warming',
    description:
      'A deeply nourishing stew perfect for cold weather and strengthening yang energy',
    prepTime: '20 mins',
    cookTime: '2 hours',
    servings: 6,
    ingredients: [
      '1kg lamb shoulder, cubed',
      '3 inches fresh ginger, sliced',
      '6 cloves garlic, minced',
      '2 onions, chunked',
      '4 carrots, chunked',
      '2 tbsp black pepper',
      '4 cups bone broth',
      'Fresh rosemary',
      'Salt to taste',
    ],
    steps: [
      'Brown lamb pieces in a heavy pot until well-seared on all sides',
      'Remove lamb and sauté ginger, garlic, and onions until fragrant',
      'Return lamb to pot with black pepper and stir for 2 minutes',
      'Add bone broth, bring to boil then reduce to simmer',
      'Add carrots and rosemary, simmer for 1.5 hours until lamb is tender',
      'Season with salt and serve hot with crusty bread',
      'Best enjoyed on cold evenings to warm the body',
    ],
    nutritionTips: [
      'Lamb strengthens kidney yang and warms the body',
      'Ginger aids digestion of the rich meat',
      'Black pepper enhances circulation',
    ],
  },

  {
    id: 'cooling-soup',
    name: 'Summer Heat Relief Soup',
    emoji: '🥣',
    type: 'non-toxic',
    category: 'Cooling',
    description: 'A refreshing soup to clear summer heat and hydrate the body',
    prepTime: '15 mins',
    cookTime: '30 mins',
    servings: 4,
    ingredients: [
      '1 winter melon (500g), cubed',
      '200g mung beans, soaked',
      '100g lotus seeds',
      '50g lily bulbs',
      '8 cups water',
      'Rock sugar to taste',
      'Fresh mint for garnish',
    ],
    steps: [
      'Soak mung beans for 2 hours, lotus seeds for 30 minutes',
      'Bring water to boil, add mung beans and cook for 15 minutes',
      'Add winter melon, lotus seeds, and lily bulbs',
      'Simmer for 20 minutes until everything is tender',
      'Add rock sugar to taste',
      'Serve chilled or at room temperature with fresh mint',
      'Perfect for hot summer days',
    ],
    nutritionTips: [
      'Winter melon clears heat and promotes urination',
      'Mung beans detoxify and cool the body',
      'Lotus seeds calm the mind',
    ],
  },

  {
    id: 'balanced-bowl',
    name: 'Five Element Balance Bowl',
    emoji: '🍱',
    type: 'non-toxic',
    category: 'Balanced',
    description: 'A perfectly balanced meal following TCM five element theory',
    prepTime: '25 mins',
    cookTime: '35 mins',
    servings: 2,
    ingredients: [
      '300g organic chicken breast',
      '1 cup quinoa',
      '2 cups mixed vegetables (broccoli, carrots, purple cabbage)',
      '1/4 cup goji berries',
      '2 tbsp sesame seeds',
      'Tamari sauce',
      'Ginger-garlic paste',
      'Sesame oil',
    ],
    steps: [
      'Cook quinoa according to package directions',
      'Marinate chicken with ginger-garlic paste and tamari',
      'Steam vegetables until tender-crisp (5-7 minutes)',
      'Pan-sear chicken until golden and cooked through',
      'Slice chicken and arrange over quinoa',
      'Top with steamed vegetables and goji berries',
      'Drizzle with sesame oil and sprinkle sesame seeds',
      'Serve warm for optimal digestion',
    ],
    nutritionTips: [
      'Contains all five elements for balance',
      'Complete protein from chicken and quinoa',
      'Goji berries nourish liver and kidneys',
    ],
  },

  {
    id: 'digestive-congee',
    name: 'Healing Digestive Congee',
    emoji: '🍚',
    type: 'non-toxic',
    category: 'Digestive',
    description:
      'Easy-to-digest rice porridge that strengthens spleen and stomach',
    prepTime: '10 mins',
    cookTime: '1.5 hours',
    servings: 4,
    ingredients: [
      '1 cup white rice',
      '8 cups water or chicken broth',
      '200g pumpkin, diced',
      '50g Chinese yam, diced',
      '6 red dates, pitted',
      '1 tbsp goji berries',
      'Fresh ginger, 2 slices',
      'Salt to taste',
    ],
    steps: [
      'Rinse rice and add to pot with water/broth',
      'Bring to boil, then reduce to lowest simmer',
      'Cook for 1 hour, stirring occasionally',
      'Add pumpkin, Chinese yam, and ginger',
      'Continue cooking for 20 minutes',
      'Add red dates and goji berries in last 10 minutes',
      'Season with salt and serve warm',
      'Eat for breakfast to strengthen digestion all day',
    ],
    nutritionTips: [
      'Rice congee is the easiest food to digest',
      'Pumpkin and yam strengthen spleen qi',
      'Red dates nourish blood',
    ],
  },

  // Toxic replacement recipes
  {
    id: 'safe-seafood',
    name: 'Ginger-Scallion Safe Seafood',
    emoji: '🦐',
    type: 'toxic',
    category: 'Seafood Safety',
    description: 'Safe way to enjoy seafood without harmful combinations',
    prepTime: '15 mins',
    cookTime: '15 mins',
    servings: 4,
    ingredients: [
      '500g fresh shrimp or white fish',
      '4 inches ginger, julienned',
      '6 scallions, cut into segments',
      'NO persimmons, NO excess vitamin C',
      '2 tbsp rice wine',
      'Light soy sauce',
      '1 tbsp cornstarch',
      'Neutral oil for cooking',
    ],
    steps: [
      'Clean seafood thoroughly and pat dry',
      'Toss with cornstarch and a pinch of salt',
      'Heat wok until smoking, add oil',
      'Stir-fry ginger and scallions until fragrant',
      'Add seafood and stir-fry quickly (2-3 minutes)',
      'Splash with rice wine and soy sauce',
      'Serve immediately with steamed rice',
      'Always pair seafood with warming ginger',
    ],
    nutritionTips: [
      'Ginger neutralizes the cold nature of seafood',
      'Scallions prevent seafood allergies',
      'Rice wine aids digestion',
    ],
  },

  {
    id: 'pregnancy-safe',
    name: 'Pregnancy Nourishing Soup',
    emoji: '🤰',
    type: 'toxic',
    category: 'Pregnancy Safe',
    description: 'Specially designed for pregnant women avoiding harmful foods',
    prepTime: '20 mins',
    cookTime: '1 hour',
    servings: 4,
    ingredients: [
      '300g lean pork or chicken',
      '1 cup black beans, soaked',
      '2 corn cobs, cut into rounds',
      '10 red dates',
      '2 slices ginger',
      'NO papaya, NO crab, NO raw foods',
      '6 cups water',
      'Salt to taste',
    ],
    steps: [
      'Blanch meat to remove impurities',
      'Add all ingredients to pot with water',
      'Bring to boil then simmer for 45 minutes',
      'Remove foam regularly for clear soup',
      'Season lightly with salt',
      'Serve warm, not hot or cold',
      'Excellent for morning sickness and energy',
    ],
    nutritionTips: [
      'Black beans strengthen kidneys for fetal development',
      'Red dates nourish blood',
      'Corn provides gentle energy',
    ],
  },

  {
    id: 'iron-boost',
    name: 'Iron Absorption Maximizer',
    emoji: '💪',
    type: 'toxic',
    category: 'Iron Rich',
    description: 'Optimized for maximum iron absorption avoiding blockers',
    prepTime: '15 mins',
    cookTime: '20 mins',
    servings: 2,
    ingredients: [
      '200g grass-fed beef, sliced',
      '2 cups spinach, blanched',
      '1 bell pepper (vitamin C)',
      '2 tomatoes',
      'NO tea, NO dairy during meal',
      'Garlic and onions',
      'Olive oil',
      'Lemon juice',
    ],
    steps: [
      'Blanch spinach quickly to reduce oxalates',
      'Sauté garlic and onions in olive oil',
      'Add beef and sear until browned',
      'Add bell peppers and tomatoes',
      'Add blanched spinach at the end',
      'Finish with fresh lemon juice',
      'Serve immediately',
      'Wait 2 hours before having tea or dairy',
    ],
    nutritionTips: [
      'Vitamin C enhances iron absorption by 300%',
      'Blanching reduces anti-nutrients',
      'Timing matters for iron absorption',
    ],
  },

  {
    id: 'anti-toxic',
    name: 'Detox Green Smoothie Bowl',
    emoji: '🥤',
    type: 'toxic',
    category: 'Detox',
    description: 'Gentle detox avoiding harsh combinations',
    prepTime: '10 mins',
    cookTime: '0 mins',
    servings: 1,
    ingredients: [
      '1 cup spinach (blanched and cooled)',
      '1/2 avocado',
      '1 green apple',
      '1 cup coconut water',
      '1 tbsp chia seeds',
      'Fresh mint',
      'NO raw spinach with dairy',
      '1 tsp spirulina (optional)',
    ],
    steps: [
      'Blanch spinach for 30 seconds, cool immediately',
      'Blend spinach, avocado, apple with coconut water',
      'Pour into bowl',
      'Top with chia seeds and mint',
      'Add spirulina if desired',
      'Consume immediately for best nutrition',
      'Best enjoyed mid-morning',
    ],
    nutritionTips: [
      'Blanched spinach is easier to digest',
      'Avocado provides healthy fats for absorption',
      'Chia seeds add fiber and omega-3',
    ],
  },
]

// Main analysis function
export const analyzeFoodCombinations = (
  imagePath: string,
  healthNotes: string = ''
): CombinationAnalysis => {
  // For demo purposes, randomly select a scenario
  const scenarioIndex = Math.floor(Math.random() * MOCK_SCENARIOS.length)
  const scenario = MOCK_SCENARIOS[scenarioIndex]

  // Build the analysis object
  let analysis: CombinationAnalysis = {
    detectedIngredients: scenario.ingredients,
    goodCombinations: (scenario.good as Combination[]) || [],
    badCombinations: (scenario.bad as Combination[]) || [],
    neutralCombinations: (scenario.neutral as Combination[]) || [],
    isToxic: scenario.toxic,
    overallRating: scenario.rating as any,
    healthTip: scenario.healthTip,
    suggestedRecipes: [],
  }

  // Adjust based on health notes
  if (healthNotes.toLowerCase()) {
    const notes = healthNotes.toLowerCase()

    // Check for specific conditions
    if (notes.includes('pregnant') || notes.includes('pregnancy')) {
      // Add pregnancy warnings
      analysis.healthTip = '⚠️ PREGNANCY DETECTED: ' + analysis.healthTip
      analysis.suggestedRecipes = RECIPE_DATABASE.filter(
        (r) => r.id === 'pregnancy-safe'
      )
    } else if (
      notes.includes('cold') ||
      notes.includes('weak') ||
      notes.includes('tired')
    ) {
      // Recommend warming foods
      if (scenario.id === 'scenario_2') {
        analysis.healthTip =
          '❄️ WARNING: These cooling foods are not suitable for your cold constitution!'
      }
      analysis.suggestedRecipes = RECIPE_DATABASE.filter(
        (r) => r.category === 'Warming' || r.id === 'digestive-congee'
      )
    } else if (
      notes.includes('hot') ||
      notes.includes('heat') ||
      notes.includes('inflammation')
    ) {
      // Recommend cooling foods
      analysis.suggestedRecipes = RECIPE_DATABASE.filter(
        (r) => r.category === 'Cooling' || r.category === 'Balanced'
      )
    } else if (
      notes.includes('digest') ||
      notes.includes('stomach') ||
      notes.includes('bloat')
    ) {
      // Recommend digestive aids
      analysis.suggestedRecipes = RECIPE_DATABASE.filter(
        (r) => r.category === 'Digestive' || r.id === 'digestive-congee'
      )
    } else if (
      notes.includes('anemia') ||
      notes.includes('iron') ||
      notes.includes('tired')
    ) {
      // Recommend iron-rich combinations
      analysis.suggestedRecipes = RECIPE_DATABASE.filter(
        (r) => r.id === 'iron-boost' || r.category === 'Balanced'
      )
    }
  }

  // If no specific recipes selected, choose based on scenario
  if (analysis.suggestedRecipes.length === 0) {
    if (scenario.toxic) {
      // For toxic combinations, suggest safe alternatives
      analysis.suggestedRecipes = RECIPE_DATABASE.filter(
        (r) => r.type === 'toxic'
      ).slice(0, 3)
    } else if (scenario.rating === 'excellent') {
      // For excellent combinations, suggest complementary recipes
      analysis.suggestedRecipes = RECIPE_DATABASE.filter(
        (r) => r.type === 'non-toxic' && r.category !== 'Cooling'
      ).slice(0, 3)
    } else {
      // For mixed results, suggest balanced recipes
      analysis.suggestedRecipes = RECIPE_DATABASE.filter(
        (r) => r.category === 'Balanced' || r.category === 'Digestive'
      ).slice(0, 3)
    }
  }

  return analysis
}

// Get full recipe details
export const getRecipeDetails = (recipeId: string): Recipe | null => {
  return RECIPE_DATABASE.find((r) => r.id === recipeId) || null
}

// Helper function to check if combination exists
export const checkSpecificCombination = (
  ingredient1: string,
  ingredient2: string
): { safe: boolean; reason: string } => {
  // Check known dangerous combinations
  const dangerousPairs = [
    { pair: ['crab', 'persimmon'], reason: 'Can cause severe food poisoning' },
    { pair: ['shrimp', 'vitamin c'], reason: 'May form toxic compounds' },
    { pair: ['sweet potato', 'persimmon'], reason: 'Can form stomach stones' },
    {
      pair: ['honey', 'onion'],
      reason: 'Can damage eyesight according to TCM',
    },
    {
      pair: ['rabbit', 'celery'],
      reason: 'Can cause hair loss according to TCM',
    },
    { pair: ['beef', 'chestnut'], reason: 'Can cause vomiting' },
    { pair: ['goose', 'pear'], reason: 'Can damage kidneys' },
  ]

  const ing1 = ingredient1.toLowerCase()
  const ing2 = ingredient2.toLowerCase()

  for (const danger of dangerousPairs) {
    if (
      (danger.pair.includes(ing1) && danger.pair.includes(ing2)) ||
      (danger.pair.includes(ing2) && danger.pair.includes(ing1))
    ) {
      return { safe: false, reason: danger.reason }
    }
  }

  return { safe: true, reason: 'This combination is generally safe' }
}

// Export all scenarios for testing different combinations
export const getAllScenarios = (): typeof MOCK_SCENARIOS => {
  return MOCK_SCENARIOS
}

// Get a specific scenario by ID for demo purposes
export const getScenarioById = (
  id: string
): (typeof MOCK_SCENARIOS)[0] | null => {
  return MOCK_SCENARIOS.find((s) => s.id === id) || null
}

// Demo function to cycle through scenarios
export const getDemoScenario = (index: number): CombinationAnalysis => {
  const scenario = MOCK_SCENARIOS[index % MOCK_SCENARIOS.length]
  return analyzeFoodCombinations('demo-image', '')
}
