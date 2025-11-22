'use client';

import { Recipe, FilterState } from '@/types/recipe';
import { getUniqueCategories, getUniqueCuisines, getDifficulties } from '@/lib/recipeHelpers';

interface FilterPanelProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  recipes: Recipe[];
}

export default function FilterPanel({ filters, onChange, recipes }: FilterPanelProps) {
  const categories = getUniqueCategories(recipes);
  const cuisines = getUniqueCuisines(recipes);
  const difficulties = getDifficulties();
  
  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    onChange({ ...filters, categories: newCategories });
  };
  
  const toggleCuisine = (cuisine: string) => {
    const newCuisines = filters.cuisines.includes(cuisine)
      ? filters.cuisines.filter(c => c !== cuisine)
      : [...filters.cuisines, cuisine];
    onChange({ ...filters, cuisines: newCuisines });
  };
  
  return (
    <div className="px-4 py-3 bg-tg-secondary-bg border-t border-tg-hint/20 animate-fade-in">
      {/* Categories */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-tg-text mb-2">Категория</h3>
        <div className="flex flex-wrap gap-2">
          {categories.slice(0, 8).map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filters.categories.includes(category)
                  ? 'bg-tg-button text-tg-button-text'
                  : 'bg-tg-bg text-tg-text'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Cuisines */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-tg-text mb-2">Кухня</h3>
        <div className="flex flex-wrap gap-2">
          {cuisines.map((cuisine) => (
            <button
              key={cuisine}
              onClick={() => toggleCuisine(cuisine)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filters.cuisines.includes(cuisine)
                  ? 'bg-tg-button text-tg-button-text'
                  : 'bg-tg-bg text-tg-text'
              }`}
            >
              {cuisine}
            </button>
          ))}
        </div>
      </div>
      
      {/* Difficulty */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-tg-text mb-2">Сложность</h3>
        <div className="flex gap-2">
          {difficulties.map((difficulty) => (
            <button
              key={difficulty}
              onClick={() => onChange({ 
                ...filters, 
                difficulty: filters.difficulty === difficulty ? null : difficulty 
              })}
              className={`flex-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filters.difficulty === difficulty
                  ? difficulty === 'Легко' ? 'bg-green-500 text-white' :
                    difficulty === 'Средне' ? 'bg-orange-500 text-white' :
                    'bg-red-500 text-white'
                  : 'bg-tg-bg text-tg-text'
              }`}
            >
              {difficulty}
            </button>
          ))}
        </div>
      </div>
      
      {/* Cooking Time */}
      <div>
        <h3 className="text-sm font-semibold text-tg-text mb-2">
          Время приготовления {filters.maxTime ? `(до ${filters.maxTime} мин)` : ''}
        </h3>
        <div className="flex gap-2">
          {[30, 60, 120].map((time) => (
            <button
              key={time}
              onClick={() => onChange({ 
                ...filters, 
                maxTime: filters.maxTime === time ? null : time 
              })}
              className={`flex-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filters.maxTime === time
                  ? 'bg-tg-button text-tg-button-text'
                  : 'bg-tg-bg text-tg-text'
              }`}
            >
              {time} мин
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

