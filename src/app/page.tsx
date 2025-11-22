'use client';

import { useState, useMemo, useEffect } from 'react';
import recipesData from '@/data/recipes_extracted.json';
import { Recipe, FilterState } from '@/types/recipe';
import SearchBar from '@/components/SearchBar';
import FilterPanel from '@/components/FilterPanel';
import RecipeCard from '@/components/RecipeCard';
import RecipeOfTheDay from '@/components/RecipeOfTheDay';
import { filterRecipes, getRecipeOfTheDay } from '@/lib/recipeHelpers';
import { hideBackButton } from '@/lib/telegram';

export default function Home() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    categories: [],
    cuisines: [],
    difficulty: null,
    maxTime: null,
  });
  
  const [showFilters, setShowFilters] = useState(false);
  
  const recipes: Recipe[] = recipesData.recipes;
  const recipeOfTheDay = useMemo(() => getRecipeOfTheDay(recipes), [recipes]);
  
  const filteredRecipes = useMemo(() => {
    return filterRecipes(recipes, filters);
  }, [recipes, filters]);
  
  useEffect(() => {
    // Hide back button on main page
    hideBackButton();
  }, []);
  
  const hasActiveFilters = 
    filters.categories.length > 0 ||
    filters.cuisines.length > 0 ||
    filters.difficulty !== null ||
    filters.maxTime !== null;
  
  return (
    <div className="min-h-screen pb-6">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-tg-bg border-b border-tg-hint/20">
        <div className="px-4 py-3">
          <h1 className="text-2xl font-bold text-tg-text mb-3">
            🍳 Каталог рецептов
          </h1>
          
          <SearchBar 
            value={filters.search}
            onChange={(value) => setFilters({ ...filters, search: value })}
          />
          
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                showFilters || hasActiveFilters
                  ? 'bg-tg-button text-tg-button-text'
                  : 'bg-tg-secondary-bg text-tg-text'
              }`}
            >
              {hasActiveFilters ? '✓ ' : ''}Фильтры
            </button>
            
            {hasActiveFilters && (
              <button
                onClick={() => setFilters({
                  search: filters.search,
                  categories: [],
                  cuisines: [],
                  difficulty: null,
                  maxTime: null,
                })}
                className="px-4 py-2 rounded-lg bg-tg-secondary-bg text-tg-text font-medium"
              >
                Сбросить
              </button>
            )}
          </div>
        </div>
        
        {showFilters && (
          <FilterPanel
            filters={filters}
            onChange={setFilters}
            recipes={recipes}
          />
        )}
      </div>
      
      {/* Content */}
      <div className="px-4 mt-4 space-y-6">
        {/* Recipe of the Day */}
        {!filters.search && !hasActiveFilters && recipeOfTheDay && (
          <RecipeOfTheDay recipe={recipeOfTheDay} />
        )}
        
        {/* Results count */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-tg-text">
            {filters.search || hasActiveFilters ? 'Результаты' : 'Все рецепты'}
          </h2>
          <span className="text-sm text-tg-hint">
            {filteredRecipes.length} {filteredRecipes.length === 1 ? 'рецепт' : 'рецептов'}
          </span>
        </div>
        
        {/* Recipe grid */}
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-tg-hint text-lg">
              😕 Рецепты не найдены
            </p>
            <p className="text-tg-hint text-sm mt-2">
              Попробуйте изменить фильтры или поисковый запрос
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

