'use client';

import Link from 'next/link';
import { Recipe } from '@/types/recipe';
import { getPlaceholderImage } from '@/lib/recipeHelpers';
import { hapticFeedback } from '@/lib/telegram';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const imageUrl = recipe.images && recipe.images.length > 0 
    ? recipe.images[0] 
    : getPlaceholderImage(recipe);
  
  const handleClick = () => {
    hapticFeedback('light');
  };
  
  return (
    <Link href={`/recipe/${recipe.id}`} onClick={handleClick}>
      <div className="recipe-card group cursor-pointer">
        {/* Image */}
        <div className="relative h-40 overflow-hidden bg-tg-secondary-bg">
          <img
            src={imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Difficulty badge */}
          {recipe.difficulty && (
            <div className={`absolute top-2 right-2 badge ${
              recipe.difficulty === 'Легко' ? 'badge-easy' :
              recipe.difficulty === 'Средне' ? 'badge-medium' :
              'badge-hard'
            }`}>
              {recipe.difficulty}
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-3">
          <h3 className="font-semibold text-tg-text line-clamp-2 mb-2">
            {recipe.title}
          </h3>
          
          {/* Meta info */}
          <div className="flex flex-wrap gap-2 text-xs text-tg-hint mb-2">
            {recipe.cuisine && (
              <span className="flex items-center gap-1">
                🌍 {recipe.cuisine}
              </span>
            )}
            {recipe.cooking_time && (
              <span className="flex items-center gap-1">
                ⏱️ {recipe.cooking_time}
              </span>
            )}
          </div>
          
          {/* Category badge */}
          {recipe.categories && recipe.categories.length > 0 && (
            <span className="inline-block text-xs px-2 py-1 rounded bg-tg-bg text-tg-hint">
              {recipe.categories[0]}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

