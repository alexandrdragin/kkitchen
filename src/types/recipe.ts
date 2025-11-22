export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  categories: string[];
  tags: string[];
  source_post_id: number;
  post_date: string;
  images: string[];
  servings?: string;
  cooking_time?: string;
  difficulty?: string;
  cuisine?: string;
}

export interface RecipeData {
  metadata: {
    source_channel: string;
    source_channel_title: string;
    extraction_date: string;
    total_recipes: number;
    original_total_messages: number;
  };
  recipes: Recipe[];
}

export interface FilterState {
  search: string;
  categories: string[];
  cuisines: string[];
  difficulty: string | null;
  maxTime: number | null;
}

