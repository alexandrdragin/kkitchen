# Recipe Categorization & Tagging Reference Guide

## Quick Reference for Recipe App Development

---

## 📊 Category System Overview

### Visual Hierarchy

```
Recipe Categories (Multi-select allowed)
│
├── 🍲 By Course/Meal Role
│   ├── Завтрак (Breakfast) .................... 88 recipes
│   ├── Закуска (Appetizer) ................... 22 recipes
│   ├── Основное блюдо (Main Course) .......... 44 recipes
│   └── Десерт (Dessert) ...................... 25 recipes
│
├── 🥩 By Main Ingredient
│   ├── Мясо (Meat) ........................... 122 recipes
│   │   ├── Chicken (курица)
│   │   ├── Beef (говядина)
│   │   ├── Pork (свинина)
│   │   └── Lamb (баранина)
│   │
│   └── Рыба и морепродукты (Fish & Seafood) .. 85 recipes
│       ├── Fish (сибас, палтус, лосось)
│       ├── Shellfish (креветки, мидии)
│       └── Other seafood (кальмары, гребешки)
│
├── 🍝 By Dish Type
│   ├── Суп (Soup) ............................ 187 recipes ⭐ LARGEST
│   │   ├── Broths (бульоны)
│   │   ├── Cream soups (крем-супы)
│   │   └── Traditional (борщ, окрошка)
│   │
│   ├── Паста (Pasta) ......................... 63 recipes
│   │   ├── Long pasta (спагетти, тальятелле)
│   │   └── Filled pasta (равиоли, карамелле)
│   │
│   ├── Салат (Salad) ......................... 55 recipes
│   │   ├── Fresh salads
│   │   └── Cooked/warm salads
│   │
│   ├── Выпечка (Baking) ...................... 50 recipes
│   │   ├── Breads (хлеб)
│   │   ├── Pizza (пицца)
│   │   └── Pastries (пироги)
│   │
│   └── Гарнир (Side Dish) .................... 125 recipes
│       ├── Potato (картофель)
│       ├── Rice/Grains (рис, киноа)
│       └── Vegetables
│
└── 🥄 Special Categories
    └── Соус (Sauce) .......................... 164 recipes ⭐ 2nd LARGEST
        ├── Italian sauces (песто, болоньезе)
        ├── French sauces (бешамель, бер-блан)
        └── Marinades (маринады)
```

---

## 🏷️ Tag System - 7 Dimensions

### 1️⃣ Cuisine Tags (Национальная кухня)

| Tag | Count | Popular Dishes |
|-----|-------|----------------|
| `итальянская` | 111 | Pasta, risotto, pizza |
| `средиземноморская` | 79 | Fish, salads, olive oil dishes |
| `русская` | 54 | Borsch, pelmeni, blini |
| `азиатская` | 22 | Ramen, dim sum, stir-fry |
| `французская` | 17 | Coq au vin, ratatouille |
| `американская` | ~5 | Burgers, BBQ |
| `перуанская` | ~2 | Ceviche |
| `грузинская` | ~3 | Adjika-based dishes |

**Usage Example**:  
Filter: `cuisine == "итальянская"` → Shows 111 Italian recipes

---

### 2️⃣ Cooking Method Tags (Способ приготовления)

| Tag | Count | Description | Equipment |
|-----|-------|-------------|-----------|
| `жарка` | 206 | Frying, sautéing, pan-cooking | Сковорода (pan) |
| `варка` | 165 | Boiling, simmering | Кастрюля (pot) |
| `запекание` | 138 | Baking, roasting | Духовка (oven) |
| `тушение` | 68 | Braising, stewing | Сковорода/духовка |
| `маринование` | 68 | Marinating | Bowl + refrigerator |
| `на пару` | ~30 | Steaming | Пароварка (steamer) |
| `гриль` | ~10 | Grilling | Гриль/мангал |

**Query Examples**:
- "No oven recipes": Exclude `запекание`
- "Stovetop only": Filter `жарка` OR `варка`
- "Quick prep": Include `маринование` = no advanced technique

---

### 3️⃣ Difficulty Tags (Сложность)

```
Easy (Легко) ████████████████████████████ 203 (50.9%)
│ • 3-5 ingredients
│ • Simple techniques
│ • Quick prep
│
Medium (Средне) ████ 28 (7.0%)
│ • Multiple steps
│ • Some technique required
│ • Moderate time
│
Hard (Сложно) ██ 14 (3.5%)
│ • Advanced techniques
│ • Many components
│ • Time-intensive
│
Not Specified ████████████ 154 (38.6%)
```

**Filter Logic**:
```javascript
// For beginners
recipes.filter(r => r.difficulty === "Легко")

// Intermediate+
recipes.filter(r => ["Средне", "Сложно"].includes(r.difficulty))
```

---

### 4️⃣ Time Tags (Время приготовления)

| Tag | Count | Definition |
|-----|-------|------------|
| `быстрое приготовление` | 173 | ≤ 30 minutes |
| `длительное приготовление` | ~226 | > 30 minutes |

**Time Breakdown**:
- 0-15 min: ~50 recipes
- 15-30 min: ~123 recipes
- 30-60 min: ~150 recipes
- 1-2 hours: ~50 recipes
- 2+ hours: ~26 recipes

**Use Cases**:
- "Quick weeknight dinner" → `быстрое приготовление`
- "Weekend cooking project" → `длительное приготовление`

---

### 5️⃣ Dietary Tags (Диета и питание)

| Tag | Count | Description |
|-----|-------|-------------|
| `низкокалорийное` | 89 | Low-calorie, light dishes |
| `веган` | ~10 | No animal products |
| `вегетарианское` | ~25 | No meat/fish |
| `безглютеновое` | ~5 | No gluten |

**Note**: Most dietary tags are under-represented because:
1. Channel focuses on traditional cooking (meat, dairy)
2. No explicit dietary labels in original posts
3. Future improvement: Add more dietary classification

**Expansion Opportunity**:
- Add `высокобелковое` (high-protein)
- Add `кето` (keto-friendly)
- Add `палео` (paleo)
- Add allergen tags (dairy, nuts, shellfish)

---

### 6️⃣ Season Tags (Сезонность)

| Tag | Count | Typical Ingredients |
|-----|-------|---------------------|
| `летнее` | 86 | Tomatoes, cucumbers, herbs |
| `зимнее` | ~30 | Root vegetables, hearty soups |
| `осеннее` | ~15 | Pumpkin, mushrooms |
| `весеннее` | ~10 | Asparagus, young greens |

**Seasonal Filtering Logic**:
```python
# Show recipes for current season
current_season = "летнее"  # summer
recipes = filter(lambda r: current_season in r['tags'], all_recipes)
```

**Smart Feature Idea**:
Auto-suggest seasonal recipes based on current date:
- Dec-Feb → `зимнее`
- Mar-May → `весеннее`
- Jun-Aug → `летнее`
- Sep-Nov → `осеннее`

---

### 7️⃣ Context Tags (Контекст и повод)

| Tag | Count | When to Use |
|-----|-------|-------------|
| `домашняя кухня` | ~120 | Everyday cooking, family meals |
| `для гостей` | ~40 | Dinner parties, special occasions |
| `запеченное` | 115 | Oven-baked dishes (often hands-off) |

**Additional Context Tags** (potential):
- `праздничное` (holiday/celebration)
- `детское` (kid-friendly)
- `романтический ужин` (romantic dinner)
- `быстрый завтрак` (quick breakfast)
- `пикник` (picnic/outdoor)

---

## 🎯 Advanced Filtering Examples

### Example 1: "Easy Italian Dinner for Guests"
```json
{
  "categories": ["Паста", "Мясо", "Рыба и морепродукты"],
  "cuisine": "итальянская",
  "difficulty": "Легко",
  "tags": ["для гостей"]
}
```
**Result**: ~15-20 recipes

---

### Example 2: "Quick Weeknight Vegetarian"
```json
{
  "cooking_time": "≤30 min",
  "tags": ["быстрое приготовление", "вегетарианское"],
  "exclude_tags": ["сложно"]
}
```
**Result**: ~10-15 recipes

---

### Example 3: "Summer Salads (No Cooking)"
```json
{
  "categories": ["Салат"],
  "tags": ["летнее"],
  "exclude_tags": ["варка", "жарка", "запекание", "тушение"]
}
```
**Result**: ~20-25 recipes

---

### Example 4: "Beginner-Friendly Soups"
```json
{
  "categories": ["Суп"],
  "difficulty": "Легко",
  "cooking_time": "≤60 min"
}
```
**Result**: ~50-60 recipes

---

## 📱 UI Filter Design Recommendations

### Mobile Filter Panel

```
┌─────────────────────────────┐
│   Фильтры (Filters)     [X] │
├─────────────────────────────┤
│                             │
│ 🍽️ Категория (Multi-select) │
│   ☑ Мясо (122)              │
│   ☐ Рыба (85)               │
│   ☐ Паста (63)              │
│   ▼ Показать ещё...         │
│                             │
│ 🌍 Кухня                    │
│   ○ Любая                   │
│   ● Итальянская (111)       │
│   ○ Средиземноморская (79)  │
│   ○ Русская (54)            │
│                             │
│ ⭐ Сложность                │
│   [Легко] [Средне] [Сложно] │
│                             │
│ ⏱️ Время приготовления      │
│   ◄─────●─────► 60 мин      │
│                             │
│ 🥗 Диета                    │
│   ☐ Вегетарианское          │
│   ☐ Низкокалорийное         │
│                             │
│ [Применить] [Сбросить]      │
└─────────────────────────────┘
```

---

### Desktop Filter Sidebar

```
┌────────────────┐
│  КАТЕГОРИИ     │
├────────────────┤
│ ☐ Мясо (122)   │
│ ☐ Рыба (85)    │
│ ☐ Паста (63)   │
│ ☐ Салат (55)   │
│ ... see all    │
├────────────────┤
│  КУХНЯ         │
├────────────────┤
│ ☐ Итальянская  │
│ ☐ Средиземн.   │
│ ☐ Русская      │
├────────────────┤
│  СЛОЖНОСТЬ     │
├────────────────┤
│ ◯ Любая        │
│ ◉ Легко        │
│ ◯ Средне       │
│ ◯ Сложно       │
├────────────────┤
│  ВРЕМЯ         │
├────────────────┤
│ До 30 мин (173)│
│ 30-60 мин      │
│ 60+ мин        │
└────────────────┘
```

---

## 🔍 Search Query Examples

### Natural Language → Filter Translation

| User Query | Filter Applied |
|------------|----------------|
| "паста карбонара" | Text: "карбонара", Category: "Паста" |
| "quick chicken dinner" | Time: ≤30min, Category: "Мясо", Tag: "курица" |
| "легкий салат" | Difficulty: "Легко", Category: "Салат" |
| "итальянский ужин" | Cuisine: "итальянская", Meal: "ужин" |

---

## 📊 Tag Co-occurrence Analysis

### Most Common Tag Combinations

1. **`легко` + `быстрое приготовление` + `жарка`** (120 recipes)
   - Easy, quick, pan-fried dishes
   - Perfect for weeknight dinners

2. **`итальянская` + `паста` + `соус`** (50 recipes)
   - Italian pasta with sauce
   - Core channel content

3. **`запекание` + `мясо` + `запеченное`** (60 recipes)
   - Oven-baked meat dishes
   - Great for meal prep

4. **`суп` + `варка` + `легко`** (90 recipes)
   - Easy boiled soups
   - Comfort food category

5. **`средиземноморская` + `рыба` + `низкокалорийное`** (30 recipes)
   - Healthy Mediterranean fish
   - Diet-conscious options

---

## 🎨 Color Coding Suggestions

### For UI Design

| Category | Suggested Color | Hex |
|----------|----------------|-----|
| Мясо | Red-orange | `#E74C3C` |
| Рыба | Blue | `#3498DB` |
| Паста | Yellow | `#F39C12` |
| Салат | Green | `#27AE60` |
| Суп | Orange | `#E67E22` |
| Завтрак | Light orange | `#F9A825` |
| Десерт | Pink | `#EC407A` |

### Difficulty Badges

- 🟢 **Легко** (Green) - Beginner-friendly
- 🟡 **Средне** (Yellow) - Some experience needed
- 🔴 **Сложно** (Red) - Advanced techniques

---

## 🚀 Implementation Priority

### Phase 1: Essential Filters
1. ✅ Category (multi-select)
2. ✅ Cuisine (single-select)
3. ✅ Difficulty (single-select)
4. ✅ Time (range slider)

### Phase 2: Enhanced Filters
5. ⬜ Cooking method (multi-select)
6. ⬜ Dietary restrictions (multi-select)
7. ⬜ Season (auto-detect or manual)

### Phase 3: Advanced Features
8. ⬜ Ingredient search ("recipes with chicken")
9. ⬜ Exclude ingredients ("no mushrooms")
10. ⬜ Equipment filter ("only stovetop")
11. ⬜ Cost estimate ("budget-friendly")

---

## 💡 Smart Features Ideas

### 1. "What Can I Cook?"
User inputs available ingredients → App suggests recipes

**Logic**:
```python
user_ingredients = ["chicken", "pasta", "tomatoes"]
matches = []
for recipe in recipes:
    overlap = len(set(recipe.ingredients) & set(user_ingredients))
    if overlap >= 3:  # At least 3 matching ingredients
        matches.append((recipe, overlap))
matches.sort(key=lambda x: x[1], reverse=True)
```

### 2. "Meal Plan Generator"
Auto-generate weekly menu based on:
- Dietary preferences
- Time constraints
- Ingredient reuse (minimize waste)

### 3. "Seasonal Suggestions"
Homepage banner: "🌞 Летние рецепты" (auto-updates by season)

### 4. "Complete the Meal"
User picks main dish → App suggests sides and desserts

### 5. "Trending Now"
Most viewed/saved recipes this week

---

## 📈 Analytics Tracking

### Recommended Events

```javascript
// Filter usage
track('filter_applied', {
  filter_type: 'cuisine',
  filter_value: 'итальянская'
});

// Recipe views
track('recipe_viewed', {
  recipe_id: 'recipe_4420',
  category: ['Мясо'],
  cuisine: 'Французская'
});

// User actions
track('recipe_saved', { recipe_id: 'recipe_4420' });
track('recipe_shared', { recipe_id: 'recipe_4420', platform: 'whatsapp' });
```

### Insights to Extract
- **Most popular categories** → Prioritize content
- **Filter combinations** → Optimize UI
- **Drop-off points** → Improve UX
- **Search queries** → Add missing tags

---

## 🔗 Related Documentation

- **Complete technical docs**: `RECIPE_SYSTEM_DOCUMENTATION.md`
- **Executive summary**: `PROJECT_SUMMARY.md`
- **Raw data**: `recipes_extracted.json`
- **Statistics**: `extraction_summary.json`

---

**Last Updated**: November 19, 2025  
**Total Recipes**: 399  
**Total Categories**: 12  
**Total Unique Tags**: 20+

