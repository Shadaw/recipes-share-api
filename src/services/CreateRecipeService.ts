import { getRepository } from 'typeorm';

import Recipe from '../models/Recipe';

interface Request {
  user: string;
  name: string;
  description: string;
  difficulty: string;
  time: number;
}

export default class CreateRecipeService {
  public async execute({
    user,
    name,
    description,
    difficulty,
    time,
  }: Request): Promise<Recipe> {
    const recipesRepository = getRepository(Recipe);

    const recipe = recipesRepository.create({
      user_id: user,
      name,
      description,
      difficulty,
      time,
    });

    await recipesRepository.save(recipe);

    return recipe;
  }
}
