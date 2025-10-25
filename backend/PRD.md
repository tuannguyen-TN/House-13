5. **API Requirements**
   Endpoints (7 total):

```javascript
// Food Detection & Analysis
POST /api/detect-food
Body: { image: base64, type: "single" | "multiple" }
Response: { foods: [{ name, confidence }] }


POST /api/food-energy
Body: { foodName: string }
Response: { energy: "cold"|"warm"|"neutral", info, recipes }

POST /api/check-combinations
Body: { foods: string[], healthNotes: string }
Response: { compatible: [], incompatible: [], suggestions: [] }

// Seasonal Recommendations
GET /api/seasonal-foods/{season}
Response: { foods: [{ name, energy, benefits }] }
```

Quick Backend: Supabase (instant setup + built-in image storage)
Mock Strategy: Hardcoded JSON responses if API isn't ready

6. **Data Models**
   Core Entities (3):

```javascript
// Food
{
  id: "apple_001",
  name: "Apple",
  energy: "cool",
  season: ["fall"],
  benefits: ["Clears heat", "Moistens lungs"],
  image: "url"
}

// Recipe
{
  id: "recipe_001",
  foodId: "apple_001",
  name: "Warm Apple Cider",
  ingredients: ["apple", "cinnamon", "ginger"]
}

// SeasonalRecommendation
{
  season: "winter",
  foods: ["ginger", "lamb", "cinnamon"],
  description: "Warming foods for cold months"
}
```

7. Quick Deploy Strategy
   Frontend:

```
Expo Go app for live demo (no build needed)
QR code for judges to test on their phones
```

Backend:

```
Vercel Functions for API (deploy in 3 minutes)
OpenAI Vision API for food detection (quick integration)
Supabase for data storage
```

Services:

```bash
# Quick setup commands
npx create-expo-app SeasonalEats
npm install @supabase/supabase-js openai
vercel deploy
```
