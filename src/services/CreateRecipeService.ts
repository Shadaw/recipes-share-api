import { getRepository } from 'typeorm';

import Recipe from '../models/Recipe';

interface Request {
  user: string;
  name: string;
  image: string;
  description: string;
  difficulty: string;
  time: number;
}

export default class CreateRecipeService {
  public async execute({
    user,
    name,
    image,
    description,
    difficulty,
    time,
  }: Request): Promise<Recipe> {
    const recipesRepository = getRepository(Recipe);

    const recipe = recipesRepository.create({
      user_id: user,
      image,
      name,
      description,
      difficulty,
      time,
    });

    await recipesRepository.save(recipe);

    return recipe;
  }
}
