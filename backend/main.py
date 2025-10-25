from fastapi import FastAPI, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import hashlib

from models import *
from mock_data import MOCK_FOODS, SEASONAL_RECOMMENDATIONS, FOOD_COMBINATIONS, MOCK_RECIPES

app = FastAPI(title="Food Energy API", version="1.0.0")

# CORS for Expo / frontend (for hackathon allow all)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- Helpers ----------

MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB


def deterministic_identify_food_from_bytes(image_bytes: bytes) -> str:
    """
    Deterministic mock: hash image bytes and pick an index from MOCK_FOODS.
    Same image => same detected food. Good for demo.
    """
    if not image_bytes:
        return list(MOCK_FOODS.keys())[0]
    h = hashlib.sha256(image_bytes).hexdigest()
    idx = int(h[:8], 16) % len(MOCK_FOODS)
    return list(MOCK_FOODS.keys())[idx]


# ---------- Endpoints ----------

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
                foods.append(
                    Food(
                        id=f"temp_{name}",
                        name=name.title(),
                        energeticType=EnergeticType.NEUTRAL,
                        benefits=f"Seasonal food for {season.value}",
                        commonUses=[],
                    )
                )

        return SeasonalFoods(season=season, foods=foods)
    except ValueError:
        raise HTTPException(status_code=404, detail=f"Season {season_id} not found")


# ---------- File-upload / Identification endpoint ----------
@app.post("/api/food/identify", response_model=FoodIdentifyResponse)
async def identify_food(file: UploadFile = File(...)):
    """
    Accept an image file upload from frontend, run a deterministic mock-identification,
    and return the energetic info.
    """
    try:
        # Basic validation
        if not file.content_type or not file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="Uploaded file is not an image")

        contents = await file.read()

        if len(contents) == 0:
            raise HTTPException(status_code=400, detail="Empty file uploaded")

        if len(contents) > MAX_FILE_SIZE:
            raise HTTPException(status_code=413, detail="File too large (max 5MB)")

        # Identify food (deterministic mock)
        identified_food = deterministic_identify_food_from_bytes(contents)

        if identified_food in MOCK_FOODS:
            food_data = MOCK_FOODS[identified_food]
            relevant_recipes = [r for r in MOCK_RECIPES if identified_food in r["ingredients"]]

            return FoodIdentifyResponse(
                foodName=food_data["name"],
                energeticType=food_data["energeticType"],
                description=f"{food_data['name']} is a {food_data['energeticType'].value} food",
                benefits=food_data["benefits"],
                recipes=relevant_recipes[:3],
            )

        # Default fallback
        return FoodIdentifyResponse(
            foodName="Unknown Food",
            energeticType=EnergeticType.NEUTRAL,
            description="Food not in database",
            benefits="Please try another image",
            recipes=[],
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")
    finally:
        await file.close()


@app.post("/api/combinations/analyze", response_model=CombinationAnalysisResponse)
async def analyze_combinations(request: CombinationAnalysisRequest):
    detected_ingredients = list(MOCK_FOODS.keys())[:3]  # pick first 3 deterministically

    good_combos = []
    bad_combos = []

    for combo in FOOD_COMBINATIONS.get("good", []):
        if combo["food1"] in detected_ingredients and combo["food2"] in detected_ingredients:
            good_combos.append(combo)

    for combo in FOOD_COMBINATIONS.get("bad", []):
        if combo["food1"] in detected_ingredients and combo["food2"] in detected_ingredients:
            bad_combos.append(combo)

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
        recommendations=recommendations,
    )


@app.get("/api/foods/search")
async def search_foods(name: str):
    results = []
    search_term = name.lower()
    for food_name, food_data in MOCK_FOODS.items():
        if search_term in food_name.lower():
            results.append(Food(**food_data))
    return {"foods": results}


@app.get("/api/foods/{food_id}", response_model=Food)
async def get_food_details(food_id: str):
    for food_data in MOCK_FOODS.values():
        if food_data["id"] == food_id:
            return Food(**food_data)
    raise HTTPException(status_code=404, detail="Food not found")


@app.get("/api/recipes/by-food/{food_id}")
async def get_recipes_by_food(food_id: str):
    food_name = None
    for name, data in MOCK_FOODS.items():
        if data["id"] == food_id:
            food_name = name
            break

    if not food_name:
        raise HTTPException(status_code=404, detail="Food not found")

    recipes = [r for r in MOCK_RECIPES if food_name in r["ingredients"]]
    return {"recipes": recipes}


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
            "High blood pressure",
        ]
    }


@app.get("/")
async def root():
    return {"message": "Food Energy API is running!", "version": "1.0.0"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)