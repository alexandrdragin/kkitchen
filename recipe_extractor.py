#!/usr/bin/env python3
"""
Recipe Extractor for Telegram Posts
Extracts, categorizes, and normalizes recipes from Telegram channel JSON data
"""

import json
import re
from typing import Dict, List, Optional, Set
from dataclasses import dataclass, asdict
from datetime import datetime


@dataclass
class Recipe:
    """Unified recipe structure"""
    id: str
    title: str
    description: str
    ingredients: List[str]
    steps: List[str]
    categories: List[str]
    tags: List[str]
    source_post_id: int
    post_date: str
    images: List[str]
    servings: Optional[str] = None
    cooking_time: Optional[str] = None
    difficulty: Optional[str] = None
    cuisine: Optional[str] = None
    
    def to_dict(self):
        """Convert to dictionary, excluding None values"""
        return {k: v for k, v in asdict(self).items() if v is not None}


class RecipeExtractor:
    """Main class for extracting and processing recipes"""
    
    # Keywords that indicate a post contains a recipe
    RECIPE_INDICATORS = [
        # Russian cooking verbs
        r'готов\w+',  # готовить, готовил, готовка
        r'приготов\w+',  # приготовить, приготовление
        r'жар\w+',  # жарить, жарим
        r'варить',
        r'запека\w+',  # запекать, запекание
        r'туш\w+',  # тушить, тушение
        r'обжар\w+',  # обжарить, обжаривать
        r'разогре\w+',  # разогреть, разогреваем
        r'смеша\w+',  # смешать, смешиваем
        r'нарезать',
        r'добав\w+',  # добавить, добавляем
        
        # Recipe structure indicators
        r'ингредиент\w*',
        r'состав:',
        r'рецепт\w*',
        r'блюд\w+',
        
        # Cooking terms
        r'духовк\w+',
        r'сковород\w+',
        r'маринад\w*',
        r'соус\w*',
        r'тесто',
        
        # Measurements
        r'\d+\s*(г|гр|грамм|кг|мл|л|ст\.?\s*л|ч\.?\s*л|столов\w+\s+лож\w+|чайн\w+\s+лож\w+)',
        
        # Temperature
        r'\d+\s*°[CF]',
        r'\d+\s*градус',
        
        # Time
        r'\d+\s*мин\w*',
        r'\d+\s*час\w*',
    ]
    
    # Cuisine type indicators
    CUISINE_INDICATORS = {
        'Итальянская': ['паста', 'пицца', 'ризотто', 'карбонара', 'болоньезе', 'равиоли', 'тальятелле', 
                        'пармезан', 'моцарелла', 'итальян', 'тирамису', 'ньокки', 'брускетта', 'фокачча'],
        'Французская': ['кокован', 'брезе', 'рататуй', 'киш', 'круассан', 'багет', 'coq au vin', 
                        'confit', 'français', 'французск', 'bouquet garni', 'roux'],
        'Азиатская': ['рамен', 'димсам', 'гёдза', 'тайск', 'фо бо', 'китайск', 'японск', 'корейск', 
                      'соевый соус', 'кунжут', 'васаби'],
        'Средиземноморская': ['греческ', 'оливк', 'каперс', 'фета', 'хумус', 'питы', 'шакшука'],
        'Русская': ['борщ', 'щи', 'пельмени', 'блины', 'окрошка', 'пироги', 'русск'],
        'Перуанская': ['перуанск', 'севиче'],
        'Грузинская': ['аджика', 'хачапури', 'грузинск'],
        'Американская': ['бургер', 'барбекю', 'брискет', 'американск'],
    }
    
    # Dish type indicators
    DISH_TYPE_INDICATORS = {
        'Паста': ['паста', 'спагетти', 'тальятелле', 'равиоли', 'карамелле', 'пенне', 'фузилли'],
        'Мясо': ['курица', 'говядина', 'свинина', 'баранина', 'телятина', 'бекон', 'мясо', 
                 'котлеты', 'стейк', 'отбивн', 'бедр', 'крылышк', 'петух'],
        'Рыба и морепродукты': ['рыба', 'лосось', 'тунец', 'палтус', 'сибас', 'дорадо', 'креветк', 
                                'мидии', 'кальмар', 'гребешк', 'лангустин', 'краб', 'морепродукт'],
        'Салат': ['салат'],
        'Суп': ['суп', 'бульон', 'крем-суп', 'борщ', 'окрошка', 'рамен', 'фо'],
        'Гарнир': ['картофел', 'картошк', 'рис', 'киноа', 'пюре', 'гарнир'],
        'Соус': ['соус', 'маринад', 'заправка', 'песто', 'болоньезе'],
        'Завтрак': ['завтрак', 'тост', 'яйц', 'омлет', 'сырник', 'круассан', 'панкейк'],
        'Закуска': ['закуск', 'паштет', 'брускетта', 'тапас', 'антипасти'],
        'Десерт': ['десерт', 'торт', 'пирог', 'печенье', 'кекс', 'мороженое', 'джелато', 'тирамису'],
        'Выпечка': ['хлеб', 'пицца', 'пирог', 'выпечк', 'тесто', 'булочк'],
    }
    
    # Cooking method indicators
    COOKING_METHOD_INDICATORS = {
        'Запекание': ['запека', 'духовк', 'запечен', 'противень', 'форма для запекания'],
        'Жарка': ['жар', 'обжар', 'сковород', 'обжариваем', 'поджар'],
        'Варка': ['вар', 'отвар', 'сварить', 'кипяток', 'кипящ'],
        'Тушение': ['туш', 'брез', 'томить', 'томл', 'под крышкой'],
        'Гриль': ['гриль', 'барбекю', 'мангал', 'на углях'],
        'На пару': ['на пару', 'пароварк', 'пароконвектомат'],
        'Маринование': ['маринад', 'маринов', 'замаринов'],
    }
    
    # Difficulty indicators
    DIFFICULTY_INDICATORS = {
        'Легко': ['прост', 'легко', 'быстр', 'за \d+ минут', 'элементарн', 'без усилий'],
        'Средне': ['средн', 'требует времени', 'внимательн'],
        'Сложно': ['сложн', 'трудн', 'требует навыков', 'профессионал', 'многоэтапн'],
    }
    
    # Diet type indicators
    DIET_INDICATORS = {
        'Веган': ['веган'],
        'Вегетарианское': ['вегетариан', 'без мяса'],
        'Безглютеновое': ['без глютена', 'безглютен'],
        'Низкокалорийное': ['легк', 'низкокалорийн', 'диетическ'],
    }
    
    def __init__(self, json_file_path: str):
        """Initialize with path to JSON file"""
        self.json_file_path = json_file_path
        self.data = None
        self.recipes = []
        
    def load_data(self):
        """Load JSON data from file"""
        print(f"Loading data from {self.json_file_path}...")
        with open(self.json_file_path, 'r', encoding='utf-8') as f:
            self.data = json.load(f)
        print(f"Loaded {len(self.data.get('messages', []))} messages")
        
    def is_recipe(self, text: str) -> bool:
        """Determine if a post contains a recipe"""
        if not text or len(text) < 100:  # Too short to be a recipe
            return False
            
        # Count how many recipe indicators are present
        indicator_count = 0
        text_lower = text.lower()
        
        for pattern in self.RECIPE_INDICATORS:
            if re.search(pattern, text_lower):
                indicator_count += 1
                
        # Need at least 3 indicators to be considered a recipe
        return indicator_count >= 3
    
    def extract_title(self, text: str, post_id: int) -> str:
        """Extract or generate recipe title"""
        lines = text.strip().split('\n')
        
        # Check first few lines for a title
        for line in lines[:5]:
            line = line.strip()
            # Title is usually short, capitalized, and not too long
            if line and len(line) < 100 and not line.startswith('•') and not line.startswith('-'):
                # Remove emojis and clean up
                cleaned = re.sub(r'[🍝🥘🍳🥗🍲🍕🍖🥩🥙🌮🍱🍜🍛🥟🍢🥠🥡🧆🥚🥓🥞🧇🥐🍞🥖🥨🧀🥗🥙]', '', line)
                cleaned = cleaned.strip('.,!?:;')
                if cleaned:
                    return cleaned
        
        # If no clear title found, use first sentence
        first_sentence = re.split(r'[.!?]', text)[0].strip()
        if first_sentence and len(first_sentence) < 100:
            cleaned = re.sub(r'[🍝🥘🍳🥗🍲🍕🍖🥩🥙🌮🍱🍜🍛🥟🍢🥠🥡🧆🥚🥓🥞🧇🥐🍞🥖🥨🧀🥗🥙]', '', first_sentence)
            return cleaned.strip()
            
        return f"Рецепт #{post_id}"
    
    def extract_ingredients(self, text: str) -> List[str]:
        """Extract ingredients list from text"""
        ingredients = []
        text_lower = text.lower()
        
        # Look for ingredient sections
        ingredient_section_patterns = [
            r'ингредиент[ыа]?\s*:?\s*(.*?)(?=приготовление|способ|инструкц|шаг|\n\n|$)',
            r'состав\s*:?\s*(.*?)(?=приготовление|способ|инструкц|шаг|\n\n|$)',
            r'нам понадобится\s*:?\s*(.*?)(?=приготовление|способ|инструкц|шаг|\n\n|$)',
        ]
        
        ingredient_text = ""
        for pattern in ingredient_section_patterns:
            match = re.search(pattern, text_lower, re.DOTALL)
            if match:
                ingredient_text = match.group(1)
                break
        
        # If no explicit section found, extract lines with measurements
        if not ingredient_text:
            lines = text.split('\n')
            for line in lines:
                # Look for lines with measurements
                if re.search(r'\d+\s*(г|гр|грамм|кг|мл|л|ст\.?\s*л|ч\.?\s*л)', line.lower()):
                    ingredients.append(line.strip())
                # Look for bulleted lists
                elif re.match(r'^\s*[•\-*]\s*', line):
                    clean_line = re.sub(r'^\s*[•\-*]\s*', '', line).strip()
                    if clean_line and len(clean_line) < 200:
                        ingredients.append(clean_line)
        else:
            # Parse ingredient section
            for line in ingredient_text.split('\n'):
                clean_line = re.sub(r'^\s*[•\-*]\s*', '', line).strip()
                if clean_line and len(clean_line) < 200:
                    ingredients.append(clean_line)
        
        # Also extract inline ingredient mentions with measurements
        measurement_pattern = r'([а-яА-Яa-zA-Z\s]+)\s*[—–-]\s*(\d+\s*(?:г|гр|грамм|кг|мл|л|ст\.?\s*л|ч\.?\s*л))'
        for match in re.finditer(measurement_pattern, text):
            ingredient = f"{match.group(1).strip()} — {match.group(2).strip()}"
            if ingredient not in ingredients:
                ingredients.append(ingredient)
        
        return ingredients[:30]  # Limit to reasonable number
    
    def extract_steps(self, text: str) -> List[str]:
        """Extract cooking steps from text"""
        steps = []
        
        # Look for numbered steps
        numbered_pattern = r'(?:^|\n)\s*\d+[\.)]\s*(.+?)(?=\n\s*\d+[\.)]|\n\n|$)'
        numbered_matches = re.finditer(numbered_pattern, text, re.MULTILINE | re.DOTALL)
        
        for match in numbered_matches:
            step = match.group(1).strip()
            if step and len(step) > 20:  # Minimum length for a step
                steps.append(step)
        
        # If no numbered steps, look for paragraph-based instructions
        if not steps:
            # Look for instruction section
            instruction_patterns = [
                r'приготовление\s*:?\s*(.*?)$',
                r'способ приготовления\s*:?\s*(.*?)$',
                r'инструкция\s*:?\s*(.*?)$',
            ]
            
            for pattern in instruction_patterns:
                match = re.search(pattern, text.lower(), re.DOTALL)
                if match:
                    instruction_text = match.group(1)
                    # Split by periods or line breaks
                    sentences = re.split(r'[.]\s+(?=[А-ЯA-Z])', instruction_text)
                    for sentence in sentences:
                        clean_step = sentence.strip()
                        if clean_step and len(clean_step) > 30:
                            steps.append(clean_step)
                    break
        
        # If still no steps, extract sentences with cooking verbs
        if not steps:
            cooking_verbs = ['готов', 'приготов', 'жар', 'обжар', 'вар', 'запека', 
                           'туш', 'добав', 'смеша', 'нарез', 'разогре', 'выклад']
            
            sentences = re.split(r'(?<=[.!?])\s+', text)
            for sentence in sentences:
                sentence = sentence.strip()
                if len(sentence) > 40 and any(verb in sentence.lower() for verb in cooking_verbs):
                    steps.append(sentence)
        
        return steps[:20]  # Limit to reasonable number
    
    def extract_description(self, text: str, title: str) -> str:
        """Extract recipe description"""
        # Get first few sentences that don't look like ingredients or steps
        sentences = re.split(r'[.!?]\s+', text)
        
        description_parts = []
        for sentence in sentences[:5]:
            sentence = sentence.strip()
            # Skip if it looks like a title, ingredient, or step
            if (sentence and len(sentence) > 30 and len(sentence) < 500 
                and not re.match(r'^\d+[\.).]', sentence)
                and not re.search(r'\d+\s*г[р]?', sentence.lower())
                and sentence != title):
                description_parts.append(sentence)
                if len(description_parts) >= 2:
                    break
        
        return '. '.join(description_parts) if description_parts else title
    
    def categorize(self, text: str) -> Dict[str, any]:
        """Categorize recipe by cuisine, dish type, cooking method, etc."""
        text_lower = text.lower()
        
        categories = []
        tags = []
        cuisine = None
        difficulty = None
        
        # Detect cuisine
        for cuisine_name, keywords in self.CUISINE_INDICATORS.items():
            if any(keyword in text_lower for keyword in keywords):
                cuisine = cuisine_name
                tags.append(cuisine_name.lower())
                break
        
        # Detect dish type
        for dish_type, keywords in self.DISH_TYPE_INDICATORS.items():
            if any(keyword in text_lower for keyword in keywords):
                categories.append(dish_type)
                tags.append(dish_type.lower())
        
        # Detect cooking method
        for method, keywords in self.COOKING_METHOD_INDICATORS.items():
            if any(keyword in text_lower for keyword in keywords):
                tags.append(method.lower())
        
        # Detect difficulty
        for diff_level, keywords in self.DIFFICULTY_INDICATORS.items():
            if any(re.search(keyword, text_lower) for keyword in keywords):
                difficulty = diff_level
                tags.append(diff_level.lower())
                break
        
        # Detect diet type
        for diet_type, keywords in self.DIET_INDICATORS.items():
            if any(keyword in text_lower for keyword in keywords):
                tags.append(diet_type.lower())
        
        # Extract time mentions
        time_match = re.search(r'(\d+)\s*(?:минут|мин\.?|час)', text_lower)
        cooking_time = None
        if time_match:
            cooking_time = time_match.group(0)
            tags.append('быстрое приготовление' if int(time_match.group(1)) <= 30 else 'длительное приготовление')
        
        # Temperature detection for oven-baked dishes
        if re.search(r'\d+\s*°[CF]', text) or 'духовк' in text_lower:
            tags.append('запеченное')
        
        # Season detection
        season_keywords = {
            'зимнее': ['зим'],
            'летнее': ['лет'],
            'осеннее': ['осен'],
            'весеннее': ['весен'],
        }
        for season, keywords in season_keywords.items():
            if any(keyword in text_lower for keyword in keywords):
                tags.append(season)
        
        # Special occasions
        if any(word in text_lower for word in ['праздн', 'гост', 'званый ужин', 'вечеринк']):
            tags.append('для гостей')
        
        if 'домашн' in text_lower:
            tags.append('домашняя кухня')
        
        return {
            'categories': list(set(categories)) or ['Основное блюдо'],
            'tags': list(set(tags)),
            'cuisine': cuisine,
            'difficulty': difficulty,
            'cooking_time': cooking_time,
        }
    
    def extract_recipes(self):
        """Main method to extract all recipes"""
        if not self.data:
            self.load_data()
        
        messages = self.data.get('messages', [])
        recipe_count = 0
        
        print("\nAnalyzing posts for recipes...")
        for message in messages:
            text = message.get('text', '')
            
            if self.is_recipe(text):
                recipe_count += 1
                post_id = message.get('id')
                
                print(f"Processing recipe #{recipe_count} from post {post_id}...")
                
                # Extract basic info
                title = self.extract_title(text, post_id)
                description = self.extract_description(text, title)
                ingredients = self.extract_ingredients(text)
                steps = self.extract_steps(text)
                
                # Categorize
                categorization = self.categorize(text)
                
                # Create recipe object
                recipe = Recipe(
                    id=f"recipe_{post_id}",
                    title=title,
                    description=description,
                    ingredients=ingredients,
                    steps=steps if steps else ["См. полное описание рецепта"],
                    categories=categorization['categories'],
                    tags=categorization['tags'],
                    source_post_id=post_id,
                    post_date=message.get('date', ''),
                    images=[],  # Image URLs would need to be extracted separately
                    cooking_time=categorization['cooking_time'],
                    difficulty=categorization['difficulty'],
                    cuisine=categorization['cuisine'],
                )
                
                self.recipes.append(recipe)
        
        print(f"\n✓ Extracted {len(self.recipes)} recipes from {len(messages)} messages")
        return self.recipes
    
    def save_recipes(self, output_file: str):
        """Save recipes to JSON file"""
        output_data = {
            'metadata': {
                'source_channel': self.data.get('channel'),
                'source_channel_title': self.data.get('channelTitle'),
                'extraction_date': datetime.now().isoformat(),
                'total_recipes': len(self.recipes),
                'original_total_messages': self.data.get('totalMessages'),
            },
            'recipes': [recipe.to_dict() for recipe in self.recipes]
        }
        
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(output_data, f, ensure_ascii=False, indent=2)
        
        print(f"\n✓ Saved {len(self.recipes)} recipes to {output_file}")
    
    def generate_summary(self) -> Dict:
        """Generate summary statistics"""
        if not self.recipes:
            return {}
        
        # Count categories
        category_counts = {}
        for recipe in self.recipes:
            for category in recipe.categories:
                category_counts[category] = category_counts.get(category, 0) + 1
        
        # Count cuisines
        cuisine_counts = {}
        for recipe in self.recipes:
            if recipe.cuisine:
                cuisine_counts[recipe.cuisine] = cuisine_counts.get(recipe.cuisine, 0) + 1
        
        # Count tags
        tag_counts = {}
        for recipe in self.recipes:
            for tag in recipe.tags:
                tag_counts[tag] = tag_counts.get(tag, 0) + 1
        
        # Count difficulty levels
        difficulty_counts = {}
        for recipe in self.recipes:
            if recipe.difficulty:
                difficulty_counts[recipe.difficulty] = difficulty_counts.get(recipe.difficulty, 0) + 1
        
        return {
            'total_recipes': len(self.recipes),
            'categories': dict(sorted(category_counts.items(), key=lambda x: x[1], reverse=True)),
            'cuisines': dict(sorted(cuisine_counts.items(), key=lambda x: x[1], reverse=True)),
            'top_tags': dict(sorted(tag_counts.items(), key=lambda x: x[1], reverse=True)[:20]),
            'difficulty_distribution': difficulty_counts,
        }


def main():
    """Main execution function"""
    print("=" * 70)
    print("RECIPE EXTRACTOR FOR TELEGRAM POSTS")
    print("=" * 70)
    
    # File paths
    input_file = '/Users/adragin/Downloads/cursor/kkitchen/kerzmaneat_1763203806174.json'
    output_file = '/Users/adragin/Downloads/cursor/kkitchen/recipes_extracted.json'
    summary_file = '/Users/adragin/Downloads/cursor/kkitchen/extraction_summary.json'
    
    # Create extractor
    extractor = RecipeExtractor(input_file)
    
    # Extract recipes
    recipes = extractor.extract_recipes()
    
    # Save recipes
    extractor.save_recipes(output_file)
    
    # Generate and save summary
    summary = extractor.generate_summary()
    with open(summary_file, 'w', encoding='utf-8') as f:
        json.dump(summary, f, ensure_ascii=False, indent=2)
    
    print(f"\n✓ Saved extraction summary to {summary_file}")
    
    # Print summary
    print("\n" + "=" * 70)
    print("EXTRACTION SUMMARY")
    print("=" * 70)
    print(f"\nTotal recipes extracted: {summary['total_recipes']}")
    
    print("\n📊 Categories Distribution:")
    for category, count in list(summary['categories'].items())[:10]:
        print(f"  • {category}: {count}")
    
    print("\n🌍 Cuisine Types:")
    for cuisine, count in summary['cuisines'].items():
        print(f"  • {cuisine}: {count}")
    
    print("\n🏷  Top Tags:")
    for tag, count in list(summary['top_tags'].items())[:15]:
        print(f"  • {tag}: {count}")
    
    if summary['difficulty_distribution']:
        print("\n⭐ Difficulty Distribution:")
        for difficulty, count in summary['difficulty_distribution'].items():
            print(f"  • {difficulty}: {count}")
    
    print("\n" + "=" * 70)
    print("PROCESS COMPLETE!")
    print("=" * 70)


if __name__ == "__main__":
    main()

