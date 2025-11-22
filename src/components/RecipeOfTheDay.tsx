'use client';

import Link from 'next/link';
import { Recipe } from '@/types/recipe';
import { getPlaceholderImage } from '@/lib/recipeHelpers';
import { hapticFeedback } from '@/lib/telegram';

interface RecipeOfTheDayProps {
  recipe: Recipe;
}

export default function RecipeOfTheDay({ recipe }: RecipeOfTheDayProps) {
  const imageUrl = recipe.images && recipe.images.length > 0 
    ? recipe.images[0] 
    : getPlaceholderImage(recipe);
  
  const handleClick = () => {
    hapticFeedback('medium');
  };
  
  return (
    <Link href={`/recipe/${recipe.id}`} onClick={handleClick}>
      <div className="relative overflow-hidden rounded-2xl cursor-pointer group">
        {/* Background image */}
        <div className="relative h-48">
          <img
            src={imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>
        
        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">⭐</span>
            <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
              Рецепт дня
            </span>
          </div>
          
          <h2 className="text-xl font-bold mb-1 line-clamp-2">
            {recipe.title}
          </h2>
          
          {recipe.description && (
            <p className="text-sm text-white/90 line-clamp-2">
              {recipe.description}
            </p>
          )}
          
          <div className="flex flex-wrap gap-2 mt-3 text-xs">
            {recipe.cuisine && (
              <span className="bg-white/20 px-2 py-1 rounded backdrop-blur-sm">
                🌍 {recipe.cuisine}
              </span>
            )}
            {recipe.difficulty && (
              <span className="bg-white/20 px-2 py-1 rounded backdrop-blur-sm">
                {recipe.difficulty}
              </span>
            )}
            {recipe.cooking_time && (
              <span className="bg-white/20 px-2 py-1 rounded backdrop-blur-sm">
                ⏱️ {recipe.cooking_time}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

