import recipesData from '@/data/recipes_extracted.json';
import RecipePageClient from './RecipePageClient';

// Explicitly disable dynamic params - all routes must be generated at build time
export const dynamicParams = false;

// Generate static paths for all recipes at build time
export async function generateStaticParams() {
  return recipesData.recipes.map((recipe) => ({
    id: recipe.id,
  }));
}

// Export metadata for each page
export async function generateMetadata({ params }: { params: { id: string } }) {
  const recipe = recipesData.recipes.find((r) => r.id === params.id);

  return {
    title: recipe ? `${recipe.title} - Каталог рецептов` : 'Рецепт не найден',
    description: recipe?.description || 'Рецепт из каталога КЕРЦМАН',
  };
}

// Server component wrapper
export default function RecipePage({ params }: { params: { id: string } }) {
  return <RecipePageClient id={params.id} />;
}
