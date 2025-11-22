import { Recipe, FilterState } from '@/types/recipe';

export const filterRecipes = (recipes: Recipe[], filters: FilterState): Recipe[] => {
  return recipes.filter((recipe) => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesTitle = recipe.title.toLowerCase().includes(searchLower);
      const matchesIngredients = recipe.ingredients.some(ing => 
        ing.toLowerCase().includes(searchLower)
      );
      const matchesDescription = recipe.description.toLowerCase().includes(searchLower);
      
      if (!matchesTitle && !matchesIngredients && !matchesDescription) {
        return false;
      }
    }
    
    // Category filter
    if (filters.categories.length > 0) {
      const hasCategory = filters.categories.some(cat => 
        recipe.categories.includes(cat)
      );
      if (!hasCategory) return false;
    }
    
    // Cuisine filter
    if (filters.cuisines.length > 0) {
      if (!recipe.cuisine || !filters.cuisines.includes(recipe.cuisine)) {
        return false;
      }
    }
    
    // Difficulty filter
    if (filters.difficulty) {
      if (recipe.difficulty !== filters.difficulty) {
        return false;
      }
    }
    
    // Time filter
    if (filters.maxTime !== null && recipe.cooking_time) {
      const timeMatch = recipe.cooking_time.match(/(\d+)/);
      if (timeMatch) {
        const minutes = parseInt(timeMatch[1]);
        if (minutes > filters.maxTime) {
          return false;
        }
      }
    }
    
    return true;
  });
};

export const getRecipeOfTheDay = (recipes: Recipe[]): Recipe | null => {
  if (recipes.length === 0) return null;
  
  // Use current date as seed for consistent "recipe of the day"
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  
  const index = dayOfYear % recipes.length;
  return recipes[index];
};

export const getUniqueCategories = (recipes: Recipe[]): string[] => {
  const categoriesSet = new Set<string>();
  recipes.forEach(recipe => {
    recipe.categories.forEach(cat => categoriesSet.add(cat));
  });
  return Array.from(categoriesSet).sort();
};

export const getUniqueCuisines = (recipes: Recipe[]): string[] => {
  const cuisinesSet = new Set<string>();
  recipes.forEach(recipe => {
    if (recipe.cuisine) {
      cuisinesSet.add(recipe.cuisine);
    }
  });
  return Array.from(cuisinesSet).sort();
};

export const getDifficulties = (): string[] => {
  return ['Легко', 'Средне', 'Сложно'];
};

export const extractCookingTime = (cookingTime?: string): number | null => {
  if (!cookingTime) return null;
  const match = cookingTime.match(/(\d+)/);
  return match ? parseInt(match[1]) : null;
};

export const formatCookingTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} мин`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) {
    return `${hours} ч`;
  }
  return `${hours} ч ${mins} мин`;
};

export const getPlaceholderImage = (recipe: Recipe): string => {
  // Generate placeholder based on category
  const category = recipe.categories[0] || 'Рецепт';
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', 
    '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'
  ];
  
  const colorIndex = recipe.id.charCodeAt(recipe.id.length - 1) % colors.length;
  const color = colors[colorIndex];
  
  // Return data URL with colored background and first letter
  const initial = category[0].toUpperCase();
  const svg = `
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="${color}"/>
      <text x="50%" y="50%" font-size="120" font-family="Arial" 
            fill="white" text-anchor="middle" dy=".3em">${initial}</text>
    </svg>
  `;
  
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

