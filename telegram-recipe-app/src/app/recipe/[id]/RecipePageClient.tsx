'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import recipesData from '@/data/recipes_extracted.json';
import { Recipe } from '@/types/recipe';
import { getPlaceholderImage } from '@/lib/recipeHelpers';
import { showBackButton, hideBackButton, hapticFeedback } from '@/lib/telegram';

interface RecipePageClientProps {
    id: string;
}

export default function RecipePageClient({ id }: RecipePageClientProps) {
    const router = useRouter();

    const recipe: Recipe | undefined = recipesData.recipes.find(
        (r) => r.id === id
    );

    useEffect(() => {
        // Show back button
        showBackButton(() => {
            hapticFeedback('light');
            router.push('/');
        });

        return () => {
            hideBackButton();
        };
    }, [router]);

    if (!recipe) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="text-center">
                    <p className="text-2xl mb-2">😕</p>
                    <p className="text-tg-text text-lg font-semibold">Рецепт не найден</p>
                    <button
                        onClick={() => router.push('/')}
                        className="mt-4 tg-button"
                    >
                        На главную
                    </button>
                </div>
            </div>
        );
    }

    const imageUrl = recipe.images && recipe.images.length > 0
        ? recipe.images[0]
        : getPlaceholderImage(recipe);

    return (
        <div className="min-h-screen pb-6">
            {/* Header Image */}
            <div className="relative w-full h-64 bg-tg-secondary-bg">
                <img
                    src={imageUrl}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="px-4 -mt-6 relative">
                {/* Title Card */}
                <div className="bg-tg-bg rounded-2xl p-4 shadow-lg mb-4">
                    <h1 className="text-2xl font-bold text-tg-text mb-3">
                        {recipe.title}
                    </h1>

                    {/* Meta info */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        {recipe.difficulty && (
                            <span className={`badge ${recipe.difficulty === 'Легко' ? 'badge-easy' :
                                    recipe.difficulty === 'Средне' ? 'badge-medium' :
                                        'badge-hard'
                                }`}>
                                {recipe.difficulty}
                            </span>
                        )}

                        {recipe.cooking_time && (
                            <span className="badge">
                                ⏱️ {recipe.cooking_time}
                            </span>
                        )}

                        {recipe.cuisine && (
                            <span className="badge">
                                🌍 {recipe.cuisine}
                            </span>
                        )}
                    </div>

                    {/* Categories */}
                    <div className="flex flex-wrap gap-2">
                        {recipe.categories.map((cat, idx) => (
                            <span
                                key={idx}
                                className="text-xs px-3 py-1 rounded-full bg-tg-secondary-bg text-tg-text"
                            >
                                {cat}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Description */}
                {recipe.description && (
                    <div className="bg-tg-secondary-bg rounded-xl p-4 mb-4">
                        <p className="text-tg-text leading-relaxed">
                            {recipe.description}
                        </p>
                    </div>
                )}

                {/* Ingredients */}
                {recipe.ingredients && recipe.ingredients.length > 0 && (
                    <div className="bg-tg-bg rounded-xl p-4 mb-4 border border-tg-hint/20">
                        <h2 className="text-xl font-bold text-tg-text mb-3 flex items-center gap-2">
                            🛒 Ингредиенты
                        </h2>
                        <ul className="space-y-2">
                            {recipe.ingredients.map((ingredient, idx) => (
                                <li
                                    key={idx}
                                    className="flex items-start gap-2 text-tg-text"
                                >
                                    <span className="text-tg-button mt-1">•</span>
                                    <span>{ingredient}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Steps */}
                {recipe.steps && recipe.steps.length > 0 && (
                    <div className="bg-tg-bg rounded-xl p-4 mb-4 border border-tg-hint/20">
                        <h2 className="text-xl font-bold text-tg-text mb-3 flex items-center gap-2">
                            📝 Приготовление
                        </h2>
                        <ol className="space-y-4">
                            {recipe.steps.map((step, idx) => (
                                <li
                                    key={idx}
                                    className="flex gap-3"
                                >
                                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-tg-button text-tg-button-text flex items-center justify-center font-bold text-sm">
                                        {idx + 1}
                                    </span>
                                    <p className="text-tg-text leading-relaxed flex-1 pt-1">
                                        {step}
                                    </p>
                                </li>
                            ))}
                        </ol>
                    </div>
                )}

                {/* Tags */}
                {recipe.tags && recipe.tags.length > 0 && (
                    <div className="bg-tg-secondary-bg rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-tg-hint mb-2">
                            Теги:
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {recipe.tags.slice(0, 10).map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="text-xs px-2 py-1 rounded bg-tg-bg text-tg-hint"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
