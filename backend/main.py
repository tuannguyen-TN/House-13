from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import random
from models import *
from mock_data import MOCK_FOODS, SEASONAL_RECOMMENDATIONS, FOOD_COMBINATIONS, MOCK_RECIPES

app = FastAPI(title="Food Energy API", version="1.0.0")

# CORS for Expo
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your Expo URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Helper function to simulate image recognition
def mock_identify_food(image_base64: str) -> str:
    """Simulate food recognition - randomly return a food for demo"""
    foods = list(MOCK_FOODS.keys())
    return random.choice(foods)

# 1. Seasonal Recommendations
@app.get("/api/seasons/{season_id}/foods", response_model=SeasonalFoods)
async def get_seasonal_foods(season_id: str):
    try:
        season = Season(season_id.lower())
        food_names = SEASONAL_RECOMMENDATIONS.get(season, [])

        foods = []
        for name in food_names:
            if name in MOCK_FOODS:
                foods.append(Food(**MOCK_FOODS[name]))
            else:
                # Create simple entry for foods not in mock data
                foods.append(Food(
                    id=f"temp_{name}",
                    name=name.title(),
                    energeticType=EnergeticType.NEUTRAL,
                    benefits=f"Seasonal food for {season.value}",
                    commonUses=[]
                ))

        return SeasonalFoods(season=season, foods=foods)
    except ValueError:
        raise HTTPException(status_code=404, detail=f"Season {season_id} not found")

# 2. Food Identification
@app.post("/api/food/identify", response_model=FoodIdentifyResponse)
async def identify_food(request: FoodIdentifyRequest):
    # For hackathon: Mock the image recognition
    identified_food = mock_identify_food(request.imageBase64)

    if identified_food in MOCK_FOODS:
        food_data = MOCK_FOODS[identified_food]

        # Get relevant recipes
        relevant_recipes = [r for r in MOCK_RECIPES
                            if identified_food in r["ingredients"]]

        return FoodIdentifyResponse(
            foodName=food_data["name"],
            energeticType=food_data["energeticType"],
            description=f"{food_data['name']} is a {food_data['energeticType'].value} food",
            benefits=food_data["benefits"],
            recipes=relevant_recipes[:3]  # Return up to 3 recipes
        )

    # Default response if food not in database
    return FoodIdentifyResponse(
        foodName="Unknown Food",
        energeticType=EnergeticType.NEUTRAL,
        description="Food not in database",
        benefits="Please try another image",
        recipes=[]
    )

# 3. Combination Analysis
@app.post("/api/combinations/analyze", response_model=CombinationAnalysisResponse)
async def analyze_combinations(request: CombinationAnalysisRequest):
    # Mock: Identify multiple foods from image
    # In real implementation, use AI service to detect multiple ingredients
    detected_ingredients = random.sample(list(MOCK_FOODS.keys()), 3)

    good_combos = []
    bad_combos = []

    # Check combinations
    for combo in FOOD_COMBINATIONS["good"]:
        if combo["food1"] in detected_ingredients and combo["food2"] in detected_ingredients:
            good_combos.append(combo)

    for combo in FOOD_COMBINATIONS["bad"]:
        if combo["food1"] in detected_ingredients and combo["food2"] in detected_ingredients:
            bad_combos.append(combo)

    # Generate recommendations based on health notes
    recommendations = []
    if "cold" in request.healthNotes.lower():
        recommendations.append("Add warming foods like ginger or cinnamon")
    if "digest" in request.healthNotes.lower():
        recommendations.append("Consider adding digestive aids like ginger or fennel")
    if not recommendations:
        recommendations.append("Balance your meal with neutral foods like rice")

    return CombinationAnalysisResponse(
        ingredients=[i.title() for i in detected_ingredients],
        goodCombinations=good_combos,
        badCombinations=bad_combos,
        recommendations=recommendations
    )

# 4. Search Foods
@app.get("/api/foods/search")
async def search_foods(name: str):
    results = []
    search_term = name.lower()

    for food_name, food_data in MOCK_FOODS.items():
        if search_term in food_name.lower():
            results.append(Food(**food_data))

    return {"foods": results}

# 5. Get Food Details
@app.get("/api/foods/{food_id}", response_model=Food)
async def get_food_details(food_id: str):
    for food_data in MOCK_FOODS.values():
        if food_data["id"] == food_id:
            return Food(**food_data)

    raise HTTPException(status_code=404, detail="Food not found")

# 6. Get Recipes by Food
@app.get("/api/recipes/by-food/{food_id}")
async def get_recipes_by_food(food_id: str):
    # Find food name by ID
    food_name = None
    for name, data in MOCK_FOODS.items():
        if data["id"] == food_id:
            food_name = name
            break

    if not food_name:
        raise HTTPException(status_code=404, detail="Food not found")

    # Find recipes containing this food
    recipes = [r for r in MOCK_RECIPES if food_name in r["ingredients"]]

    return {"recipes": recipes}

# 7. Health Conditions
@app.get("/api/health-conditions")
async def get_health_conditions():
    return {
        "conditions": [
            "Cold constitution",
            "Heat constitution",
            "Digestive issues",
            "Poor circulation",
            "Insomnia",
            "Fatigue",
            "Allergies",
            "High blood pressure"
        ]
    }

# Health check
@app.get("/")
async def root():
    return {"message": "Food Energy API is running!", "version": "1.0.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)