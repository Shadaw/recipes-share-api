import { getRepository } from 'typeorm';

import Recipe from '../models/Recipe';

interface Request {
  id: string;
  name: string;
  image: string;
  description: string;
  difficulty: string;
  time: number;
}

export default class UpdateRecipeService {
  public async execute({
    id,
    name,
    image,
    description,
    difficulty,
    time,
  }: Request): Promise<Recipe> {
    const recipesRepository = getRepository(Recipe);

    const recipe = await recipesRepository.findOne(id);

    if (!recipe) {
      throw new Error();
    }

    recipe.image = image;
    recipe.name = name;
    recipe.description = description;
    recipe.difficulty = difficulty;
    recipe.time = time;

    await recipesRepository.save(recipe);

    return recipe;
  }
}
