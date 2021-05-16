import { Router } from 'express';
import { getRepository } from 'typeorm';

import Recipe from '../models/Recipe';

import recipesView from '../views/recipes_view';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateRecipeService from '../services/CreateRecipeService';

const recipesRouter = Router();

recipesRouter.get('/', async (request, response) => {
  const recipesRepository = getRepository(Recipe);

  const recipes = await recipesRepository.find({
    relations: ['user'],
  });

  return response.json(recipesView.renderMany(recipes));
});

recipesRouter.use(ensureAuthenticated);

recipesRouter.post('/', async (request, response) => {
  try {
    const { id } = request.user;
    const { name, description, difficulty, time } = request.body;

    const createRecipe = new CreateRecipeService();

    const recipe = await createRecipe.execute({
      user: id,
      name,
      description,
      difficulty,
      time,
    });

    return response.json(recipe);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

recipesRouter.delete('/:id', async (request, response) => {
  try {
    const { id: user_id } = request.user;
    const { id } = request.params;

    const recipesRepository = getRepository(Recipe);

    await recipesRepository.delete({ id, user_id });

    return response.status(204).json();
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default recipesRouter;
