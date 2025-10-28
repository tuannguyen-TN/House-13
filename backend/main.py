from fastapi import FastAPI, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from google.cloud import vision
import hashlib

from models import *
from mock_data import MOCK_FOODS, SEASONAL_RECOMMENDATIONS, FOOD_COMBINATIONS, MOCK_RECIPES

app = FastAPI(title="Food Energy API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB

@app.post("/api/food/identify", response_model=FoodIdentifyResponse)
async def identify_food(file: UploadFile = File(...)):
    try:
        if not file.content_type or not file.content_type.startswith("image/"):
            raise HTTPException(400, "Uploaded file is not an image")

        contents = await file.read()
        if not contents:
            raise HTTPException(400, "Empty file uploaded")
        if len(contents) > MAX_FILE_SIZE:
            raise HTTPException(413, "File too large (max 5MB)")

        client = vision.ImageAnnotatorClient()
        image = vision.Image(content=contents)
        response = client.label_detection(image=image)
        labels = response.label_annotations

        food_names = set(MOCK_FOODS.keys())
        identified_food = None

        # Try to match Vision labels with known foods
        for label in labels:
            desc = label.description.lower()
            if desc in food_names:
                identified_food = desc
                break

        # If no match, pick top label or none
        if not identified_food:
            identified_food = labels[0].description.lower() if labels else None

        if identified_food and identified_food in MOCK_FOODS:
            food_data = MOCK_FOODS[identified_food]
            relevant_recipes = [r for r in MOCK_RECIPES if identified_food in r["ingredients"]]

            return FoodIdentifyResponse(
                foodName=food_data["name"],
                energeticType=food_data["energeticType"],
                description=f"{food_data['name']} is a {food_data['energeticType'].value} food",
                benefits=food_data["benefits"],
                recipes=relevant_recipes[:3],
            )

        # Fallback if unknown
        return FoodIdentifyResponse(
            foodName=identified_food or "Unknown Food",
            energeticType=EnergeticType.NEUTRAL,
            description="Food not in database",
            benefits="Please try another image",
            recipes=[],
        )

    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(500, detail=f"Error processing image: {str(e)}")
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
    return {"message": "Food Energy API running", "version": "1.0.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)