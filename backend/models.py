from pydantic import BaseModel
from typing import List, Optional
from enum import Enum

class EnergeticType(str, Enum):
    WARM = "warm"
    COLD = "cold"
    NEUTRAL = "neutral"

class Season(str, Enum):
    SPRING = "spring"
    SUMMER = "summer"
    FALL = "fall"
    WINTER = "winter"

class Compatibility(str, Enum):
    GOOD = "good"
    BAD = "bad"
    NEUTRAL = "neutral"

# Request/Response Models
class Food(BaseModel):
    id: str
    name: str
    energeticType: EnergeticType
    season: Optional[Season] = None
    benefits: str
    warnings: Optional[str] = None
    imageUrl: Optional[str] = None
    commonUses: List[str] = []

class SeasonalFoods(BaseModel):
    season: Season
    foods: List[Food]

class FoodIdentifyRequest(BaseModel):
    imageBase64: str

class FoodIdentifyResponse(BaseModel):
    foodName: str
    energeticType: EnergeticType
    description: str
    benefits: str
    recipes: List[dict]

class CombinationAnalysisRequest(BaseModel):
    imageBase64: str
    healthNotes: str

class CombinationAnalysisResponse(BaseModel):
    ingredients: List[str]
    goodCombinations: List[dict]
    badCombinations: List[dict]
    recommendations: List[str]

class Recipe(BaseModel):
    id: str
    name: str
    ingredients: List[str]
    instructions: str
    prepTime: int
    energeticBalance: EnergeticType