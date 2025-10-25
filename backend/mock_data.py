from models import EnergeticType, Season

MOCK_FOODS = {
    "ginger": {
        "id": "1",
        "name": "Ginger",
        "energeticType": EnergeticType.WARM,
        "season": Season.WINTER,
        "benefits": "Warms the body, aids digestion, reduces nausea",
        "warnings": "Avoid with heat conditions",
        "imageUrl": "https://images.unsplash.com/photo-1615485500704-8e990f9900f7",
        "commonUses": ["tea", "stir-fry", "soup"]
    },
    "watermelon": {
        "id": "2",
        "name": "Watermelon",
        "energeticType": EnergeticType.COLD,
        "season": Season.SUMMER,
        "benefits": "Cools body heat, hydrates, clears summer heat",
        "warnings": "Avoid if having cold constitution",
        "imageUrl": "https://images.unsplash.com/photo-1587049352846-4a222e784bde",
        "commonUses": ["fresh fruit", "juice", "smoothie"]
    },
    "rice": {
        "id": "3",
        "name": "White Rice",
        "energeticType": EnergeticType.NEUTRAL,
        "season": None,
        "benefits": "Provides energy, easy to digest, tonifies spleen",
        "warnings": None,
        "imageUrl": "https://images.unsplash.com/photo-1586201375761-83865001e31c",
        "commonUses": ["staple food", "congee", "rice balls"]
    },
    "cucumber": {
        "id": "4",
        "name": "Cucumber",
        "energeticType": EnergeticType.COLD,
        "season": Season.SUMMER,
        "benefits": "Clears heat, promotes urination, hydrates skin",
        "warnings": "Avoid in cold weather or with weak digestion",
        "commonUses": ["salad", "pickle", "juice"]
    },
    "cinnamon": {
        "id": "5",
        "name": "Cinnamon",
        "energeticType": EnergeticType.WARM,
        "season": Season.FALL,
        "benefits": "Warms kidneys, improves circulation, regulates blood sugar",
        "warnings": "Avoid with heat symptoms",
        "commonUses": ["spice", "tea", "desserts"]
    },
    "spinach": {
        "id": "6",
        "name": "Spinach",
        "energeticType": EnergeticType.COLD,
        "season": Season.SPRING,
        "benefits": "Nourishes blood, moistens dryness, promotes bowel movement",
        "warnings": "Avoid with kidney stones or weak digestion",
        "imageUrl": "https://images.unsplash.com/photo-1576045057995-568f588f82fb",
        "commonUses": ["salad", "stir-fry", "smoothie"]
    },
    "bamboo_shoots": {
        "id": "7",
        "name": "Bamboo Shoots",
        "energeticType": EnergeticType.COLD,
        "season": Season.SPRING,
        "benefits": "Clears heat, resolves phlegm, aids weight loss",
        "warnings": "Avoid with cold constitution",
        "imageUrl": "https://images.unsplash.com/photo-1582736546654-8af5f7f5f494",
        "commonUses": ["stir-fry", "soup", "curry"]
    },
    "strawberry": {
        "id": "8",
        "name": "Strawberry",
        "energeticType": EnergeticType.COLD,
        "season": Season.SPRING,
        "benefits": "Moistens lungs, promotes fluid production, aids digestion",
        "warnings": "Avoid if prone to diarrhea",
        "imageUrl": "https://images.unsplash.com/photo-1464965911861-746a04b4bca6",
        "commonUses": ["fresh fruit", "smoothie", "dessert"]
    },
    "green_tea": {
        "id": "9",
        "name": "Green Tea",
        "energeticType": EnergeticType.COLD,
        "season": Season.SPRING,
        "benefits": "Clears heat, aids digestion, antioxidant properties",
        "warnings": "Avoid on empty stomach or with anemia",
        "imageUrl": "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
        "commonUses": ["beverage", "matcha", "cooking"]
    },
    "mint": {
        "id": "10",
        "name": "Mint",
        "energeticType": EnergeticType.COLD,
        "season": Season.SUMMER,
        "benefits": "Disperses wind-heat, soothes throat, aids digestion",
        "warnings": "Avoid with cold constitution",
        "imageUrl": "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1",
        "commonUses": ["tea", "garnish", "sauce"]
    },
    "mung_bean": {
        "id": "11",
        "name": "Mung Bean",
        "energeticType": EnergeticType.COLD,
        "season": Season.SUMMER,
        "benefits": "Clears summer heat, detoxifies, reduces swelling",
        "warnings": "Avoid with weak spleen/stomach",
        "imageUrl": "https://images.unsplash.com/photo-1481070414801-51fd732d7184",
        "commonUses": ["soup", "sprouts", "dessert"]
    },
    "pear": {
        "id": "12",
        "name": "Pear",
        "energeticType": EnergeticType.COLD,
        "season": Season.FALL,
        "benefits": "Moistens lungs, relieves cough, clears heat",
        "warnings": "Avoid with cold cough or diarrhea",
        "imageUrl": "https://images.unsplash.com/photo-1615484477201-9f4953340fab",
        "commonUses": ["fresh fruit", "poached", "juice"]
    },
    "apple": {
        "id": "13",
        "name": "Apple",
        "energeticType": EnergeticType.NEUTRAL,
        "season": Season.FALL,
        "benefits": "Strengthens heart, moistens lungs, aids digestion",
        "warnings": None,
        "imageUrl": "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2",
        "commonUses": ["fresh fruit", "baked", "juice"]
    },
    "sweet_potato": {
        "id": "14",
        "name": "Sweet Potato",
        "energeticType": EnergeticType.NEUTRAL,
        "season": Season.FALL,
        "benefits": "Tonifies spleen and stomach, provides energy",
        "warnings": "May cause bloating if eaten in excess",
        "imageUrl": "https://images.unsplash.com/photo-1596097635121-14b63a8f89c4",
        "commonUses": ["roasted", "mashed", "soup"]
    },
    "honey": {
        "id": "15",
        "name": "Honey",
        "energeticType": EnergeticType.NEUTRAL,
        "season": Season.FALL,
        "benefits": "Moistens lungs and intestines, boosts energy",
        "warnings": "Avoid giving to infants under 1 year",
        "imageUrl": "https://images.unsplash.com/photo-1587049352846-4a222e784bde",
        "commonUses": ["sweetener", "tea", "medicine"]
    },
    "lamb": {
        "id": "16",
        "name": "Lamb",
        "energeticType": EnergeticType.WARM,
        "season": Season.WINTER,
        "benefits": "Warms kidney yang, strengthens body, nourishes blood",
        "warnings": "Avoid with heat conditions or high blood pressure",
        "imageUrl": "https://images.unsplash.com/photo-1612871689353-cccf581d667b",
        "commonUses": ["stew", "roast", "hot pot"]
    },
    "walnut": {
        "id": "17",
        "name": "Walnut",
        "energeticType": EnergeticType.WARM,
        "season": Season.WINTER,
        "benefits": "Tonifies kidneys, strengthens brain, relieves cough",
        "warnings": "High in calories, eat in moderation",
        "imageUrl": "https://images.unsplash.com/photo-1569605803663-e9337d901ff9",
        "commonUses": ["snack", "baking", "oil"]
    },
    "black_sesame": {
        "id": "18",
        "name": "Black Sesame",
        "energeticType": EnergeticType.NEUTRAL,
        "season": Season.WINTER,
        "benefits": "Nourishes liver and kidneys, moistens intestines, darkens hair",
        "warnings": "May cause loose stools if consumed in excess",
        "imageUrl": "https://images.unsplash.com/photo-1601493700631-ac2d2e397a20",
        "commonUses": ["dessert", "paste", "topping"]
    },
}

SEASONAL_RECOMMENDATIONS = {
    Season.SPRING: ["spinach", "bamboo shoots", "strawberry", "green tea"],
    Season.SUMMER: ["watermelon", "cucumber", "mint", "mung bean"],
    Season.FALL: ["pear", "apple", "sweet potato", "honey"],
    Season.WINTER: ["ginger", "lamb", "walnut", "black sesame"]
}

FOOD_COMBINATIONS = {
    "good": [
        {"food1": "ginger", "food2": "honey", "reason": "Enhances warming effect"},
        {"food1": "cucumber", "food2": "mint", "reason": "Double cooling for summer"},
        {"food1": "rice", "food2": "ginger", "reason": "Aids digestion"}
    ],
    "bad": [
        {"food1": "watermelon", "food2": "lamb", "reason": "Cold and hot conflict"},
        {"food1": "cucumber", "food2": "ginger", "reason": "Opposing energies"},
        {"food1": "crab", "food2": "persimmon", "reason": "Traditional incompatibility"}
    ]
}

MOCK_RECIPES = [
    {
        "id": "r1",
        "name": "Warming Ginger Tea",
        "ingredients": ["ginger", "honey", "lemon"],
        "instructions": "Slice ginger, boil for 10 mins, add honey and lemon",
        "prepTime": 15,
        "energeticBalance": EnergeticType.WARM
    },
    {
        "id": "r2",
        "name": "Cooling Cucumber Salad",
        "ingredients": ["cucumber", "mint", "yogurt"],
        "instructions": "Slice cucumber, mix with mint and yogurt, chill",
        "prepTime": 10,
        "energeticBalance": EnergeticType.COLD
    }
]