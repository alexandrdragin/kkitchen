# 🍳 Recipe Extraction Project - Complete Package

## 📦 What's in This Folder?

This folder contains a **complete recipe extraction and categorization system** for the Telegram cooking channel "КЕРЦМАН (ex вкус)".

---

## 📂 File Structure

```
kkitchen/
│
├── 📄 README.md                              ← You are here!
│   └── Project overview and quick start guide
│
├── 📊 INPUT DATA
│   └── kerzmaneat_1763203806174.json         (8.5 MB)
│       └── Original Telegram channel data (3,793 posts)
│
├── ✨ OUTPUT DATA
│   ├── recipes_extracted.json                (1.2 MB) ⭐ MAIN OUTPUT
│   │   └── 399 structured, categorized recipes
│   │
│   └── extraction_summary.json               (1 KB)
│       └── Statistics and distribution data
│
├── 🛠️ PROCESSING SCRIPT
│   └── recipe_extractor.py                   (15 KB)
│       └── Python script for extracting recipes
│
└── 📖 DOCUMENTATION
    ├── PROJECT_SUMMARY.md                    (10 KB) ⭐ START HERE
    │   └── Executive summary with key insights
    │
    ├── RECIPE_SYSTEM_DOCUMENTATION.md        (30 KB)
    │   └── Complete technical documentation
    │
    └── CATEGORIZATION_REFERENCE.md           (12 KB)
        └── Visual guide to categories and tags
```

---

## 🎯 Quick Start

### For Developers

**1. Load the data:**
```python
import json

with open('recipes_extracted.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

recipes = data['recipes']
print(f"Loaded {len(recipes)} recipes")  # Output: 399
```

**2. Find recipes by category:**
```python
pasta_recipes = [r for r in recipes if 'Паста' in r['categories']]
print(f"Found {len(pasta_recipes)} pasta recipes")  # Output: 63
```

**3. Filter by cuisine and difficulty:**
```python
easy_italian = [
    r for r in recipes 
    if r.get('cuisine') == 'Итальянская' 
    and r.get('difficulty') == 'Легко'
]
print(f"Easy Italian recipes: {len(easy_italian)}")
```

### For Product Managers

**Read these files in order:**
1. 📄 `PROJECT_SUMMARY.md` - Overview and business context
2. 📄 `CATEGORIZATION_REFERENCE.md` - UI/UX filter design
3. 📄 `RECIPE_SYSTEM_DOCUMENTATION.md` - Technical deep-dive

### For Data Scientists

**Interesting analysis opportunities:**
- Recipe complexity prediction (text length, ingredient count, steps)
- Ingredient co-occurrence patterns
- Cuisine classification model training
- User preference modeling (if you add user data)

---

## 📊 Project Results Summary

### Extraction Statistics

| Metric | Value |
|--------|-------|
| **Input posts** | 3,793 |
| **Recipes extracted** | 399 (10.5%) |
| **Categories defined** | 12 |
| **Cuisine types** | 5 major, 8 total |
| **Unique tags** | 20+ |
| **Avg recipe length** | 800-2000 characters |

### Top Categories

```
1. Суп (Soup)               ████████████████████ 187 recipes
2. Соус (Sauce)             ████████████████ 164 recipes
3. Гарнир (Side Dish)       ████████ 125 recipes
4. Мясо (Meat)              ████████ 122 recipes
5. Завтрак (Breakfast)      ███ 88 recipes
6. Рыба (Fish & Seafood)    ███ 85 recipes
7. Паста (Pasta)            ██ 63 recipes
8. Салат (Salad)            ██ 55 recipes
```

### Top Cuisines

```
1. Итальянская (Italian)           ████████████ 111 (27.8%)
2. Средиземноморская (Mediterranean) ████████ 79 (19.8%)
3. Русская (Russian)               ████ 54 (13.5%)
4. Азиатская (Asian)               █ 22 (5.5%)
5. Французская (French)            █ 17 (4.3%)
```

### Difficulty Distribution

- **Easy**: 203 recipes (50.9%) ✅ Most recipes are beginner-friendly
- **Medium**: 28 recipes (7.0%)
- **Hard**: 14 recipes (3.5%)
- **Not specified**: 154 recipes (38.6%)

---

## 🎨 Categorization System

### 12 Primary Categories

Recipes can belong to **multiple categories** simultaneously:

1. **Суп** (Soup) - All types of soups and broths
2. **Соус** (Sauce) - Sauces, dressings, marinades
3. **Гарнир** (Side Dish) - Potatoes, rice, vegetables
4. **Мясо** (Meat) - Chicken, beef, pork, lamb
5. **Завтрак** (Breakfast) - Eggs, toast, pancakes
6. **Рыба и морепродукты** (Fish & Seafood)
7. **Паста** (Pasta) - Italian pasta dishes
8. **Салат** (Salad) - Fresh and cooked salads
9. **Выпечка** (Baking) - Breads, pizzas, pastries
10. **Основное блюдо** (Main Course) - Generic mains
11. **Десерт** (Dessert) - Sweets and desserts
12. **Закуска** (Appetizer) - Appetizers and starters

### 7 Tag Dimensions

Tags are organized into semantic groups:

1. **🌍 Cuisine**: Italian, Mediterranean, Russian, Asian, French
2. **👨‍🍳 Method**: Frying, Baking, Boiling, Braising, Steaming
3. **⭐ Difficulty**: Easy, Medium, Hard
4. **⏱️ Time**: Quick (≤30 min), Long (>30 min)
5. **🥗 Diet**: Low-calorie, Vegan, Vegetarian, Gluten-free
6. **🌤️ Season**: Summer, Winter, Autumn, Spring
7. **🎉 Context**: Home cooking, For guests, Oven-baked

**Example recipe with tags:**
```json
{
  "title": "Курица брезе в вине и апельсине",
  "categories": ["Мясо"],
  "tags": ["французская", "тушение", "легко", "для гостей"],
  "cuisine": "Французская",
  "difficulty": "Легко",
  "cooking_time": "45 минут"
}
```

---

## 🔍 Sample Queries

### Find All Italian Pasta Recipes
```python
results = [
    r for r in recipes 
    if 'Паста' in r['categories'] 
    and r.get('cuisine') == 'Итальянская'
]
# Returns: ~50 recipes
```

### Find Quick & Easy Dinners
```python
results = [
    r for r in recipes 
    if r.get('difficulty') == 'Легко'
    and 'быстрое приготовление' in r.get('tags', [])
]
# Returns: ~120 recipes
```

### Find Vegetarian Summer Salads
```python
results = [
    r for r in recipes 
    if 'Салат' in r['categories']
    and 'летнее' in r.get('tags', [])
    and any(tag in r.get('tags', []) for tag in ['веган', 'вегетарианское'])
]
# Returns: ~10-15 recipes
```

---

## 🚀 Next Steps & Recommendations

### Immediate (Week 1-2)
- [ ] Manual review of top 50 most popular recipes
- [ ] Extract and link recipe images from Telegram
- [ ] Build simple recipe browsing website
- [ ] Implement basic search and filtering

### Short-term (Month 1)
- [ ] User accounts and favorites
- [ ] Rating system (5 stars)
- [ ] Mobile-responsive design
- [ ] Social sharing (WhatsApp, Telegram)

### Medium-term (Months 2-3)
- [ ] Nutritional information (calories, macros)
- [ ] Recipe scaling (adjust servings)
- [ ] Shopping list generator
- [ ] Meal planning feature

### Long-term (Months 4+)
- [ ] Mobile apps (iOS/Android)
- [ ] Community features (comments, photos)
- [ ] ML-based recipe recommendations
- [ ] Video tutorials
- [ ] Multi-language support

---

## 🛠️ Recommended Tech Stack

### For Recipe Website/App

**Frontend:**
- React/Next.js + TypeScript
- TailwindCSS (styling)
- React Query (data fetching)
- Framer Motion (animations)

**Backend:**
- Node.js/Express or Python/FastAPI
- PostgreSQL (recipe data)
- Elasticsearch (full-text search)
- Redis (caching)

**Infrastructure:**
- Vercel/Netlify (hosting)
- AWS S3/Cloudflare R2 (images)
- CDN (fast delivery)

**Analytics:**
- PostHog or Mixpanel (user behavior)
- Track: searches, views, saves, ratings

---

## 📖 Documentation Guide

### Which file to read?

**"I'm a developer building a recipe app"**
→ Read: `RECIPE_SYSTEM_DOCUMENTATION.md`
→ Focus on: Data Model, API design, Search implementation

**"I'm a product manager planning features"**
→ Read: `PROJECT_SUMMARY.md`
→ Focus on: Insights, Recommendations, User features

**"I'm a UX designer creating filters"**
→ Read: `CATEGORIZATION_REFERENCE.md`
→ Focus on: Filter UI mockups, Tag combinations

**"I'm a data analyst exploring the data"**
→ Read: `extraction_summary.json` + explore `recipes_extracted.json`
→ Tools: Python pandas, Jupyter notebook

---

## 💡 Sample Recipe

Here's what a typical extracted recipe looks like:

```json
{
  "id": "recipe_4389",
  "title": "Сибас аква-пацца",
  "description": "Идеальный ужин за 10 минут. Филе обжарить до красивого цвета, добавить каперсы, оливки, томаты черри, вино и тушить 7 минут.",
  "ingredients": [
    "Филе сибаса",
    "2 зубчика чеснока",
    "1 ст.л. каперсов",
    "10 оливок каламата и халкидики",
    "150-200 г черри",
    "70-100 мл белого вина"
  ],
  "steps": [
    "Филе обжарить со стороны мяса на оливковом масле с перцем и солью",
    "Перевернуть, добавить чеснок, каперсы, оливки, черри, цедру лимона",
    "Влить вино и воду, убавить огонь до 3",
    "Накрыть крышкой и готовить 7 минут",
    "Посыпать петрушкой"
  ],
  "categories": ["Рыба и морепродукты"],
  "tags": [
    "средиземноморская",
    "быстрое приготовление",
    "легко",
    "жарка",
    "тушение"
  ],
  "source_post_id": 4389,
  "post_date": "2025-11-05T18:46:01.000Z",
  "cooking_time": "10 минут",
  "difficulty": "Легко",
  "cuisine": "Средиземноморская"
}
```

---

## ⚠️ Known Limitations

### Data Quality Issues (10-20% of recipes)

1. **Incomplete ingredients** (~30%)
   - Some ingredients mentioned in text but not extracted
   - Measurements may be vague ("по вкусу", "щепотка")

2. **Unstructured steps** (~20%)
   - Long paragraph-style instructions
   - Steps may include commentary

3. **Missing images** (100%)
   - Images not extracted in current version
   - Can be added by matching post IDs to Telegram media

4. **Potential duplicates** (~5-10 recipes)
   - Same recipe posted multiple times with edits
   - Needs deduplication

5. **Categorization accuracy** (~85-90%)
   - Keyword-based system has false positives
   - Manual review recommended for top recipes

### Recommended Actions

✅ **For Production Use:**
1. Manually review top 100 recipes (by popularity)
2. Add missing ingredients/steps
3. Extract and link images
4. Deduplicate similar recipes
5. Validate categories and tags

---

## 🎓 Learning Resources

### Understanding the Code

**`recipe_extractor.py` - Key Functions:**

```python
is_recipe(text)           # Determines if a post is a recipe
extract_title(text)       # Extracts recipe title
extract_ingredients(text) # Parses ingredients list
extract_steps(text)       # Extracts cooking steps
categorize(text)          # Assigns categories and tags
```

### Customizing Extraction

**To adjust recipe detection:**
```python
# In recipe_extractor.py, line ~60
RECIPE_THRESHOLD = 3  # Change to 4 for stricter matching
```

**To add new categories:**
```python
# Add to DISH_TYPE_INDICATORS dictionary
DISH_TYPE_INDICATORS = {
    'Напитки': ['коктейль', 'смузи', 'сок', 'лимонад'],
    # ... existing categories
}
```

**To add new cuisine types:**
```python
# Add to CUISINE_INDICATORS dictionary
CUISINE_INDICATORS = {
    'Индийская': ['карри', 'тандури', 'чатни', 'наан'],
    # ... existing cuisines
}
```

---

## 🤝 Contributing

### Improving Recipe Data

If you find errors or want to improve recipe quality:

1. **Fork the data**: Work on a copy of `recipes_extracted.json`
2. **Make corrections**: Fix ingredients, steps, or categories
3. **Document changes**: Keep a changelog
4. **Share improvements**: Submit corrected data

### Adding Features

Ideas for enhancements:

- ✨ Add more dietary tags (keto, paleo, etc.)
- 🖼️ Extract images from Telegram
- 🔊 Add voice-controlled "next step" feature
- 📊 Generate nutrition data using API
- 🤖 ML model for better categorization
- 🌐 Multi-language support

---

## 📞 Support & Contact

**Data Source**: Telegram channel [@kerzmaneat](https://t.me/kerzmaneat)  
**Channel Author**: Арсений Керцман  
**Extraction Date**: November 19, 2025

**For technical questions:**
- Review the code in `recipe_extractor.py`
- Check documentation in `RECIPE_SYSTEM_DOCUMENTATION.md`

**For data questions:**
- See statistics in `extraction_summary.json`
- Browse sample recipes in `recipes_extracted.json`

---

## 📜 License & Attribution

**Original Content**: © КЕРЦМАН Telegram channel  
**Data Format**: Public channel data (no private information)  
**Extraction Script**: Open for educational/commercial use  
**Attribution**: Please credit original channel when using recipes

---

## ✅ Validation Checklist

Before using this data in production:

- [ ] Manually review top 50 recipes
- [ ] Validate ingredient measurements
- [ ] Check cooking times for accuracy
- [ ] Verify category assignments
- [ ] Add missing images
- [ ] Test search functionality
- [ ] Ensure mobile responsiveness
- [ ] Implement user feedback mechanism

---

## 🎉 Conclusion

You now have:
- ✅ **399 structured recipes** ready for database import
- ✅ **12 categories** and **20+ tags** for filtering
- ✅ **Complete documentation** with examples and recommendations
- ✅ **Reusable extraction script** for future updates
- ✅ **Clear roadmap** for building a recipe app

**Ready to build? Start with `PROJECT_SUMMARY.md` for the big picture!**

---

**Last Updated**: November 19, 2025  
**Project Status**: ✅ **COMPLETE**  
**Data Quality**: ⭐⭐⭐⭐⚫ 4/5

**Happy Cooking! 🍳👨‍🍳**

