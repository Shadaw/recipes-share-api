import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';
import uploadConfig from '../config/upload';

import Recipe from '../models/Recipe';

import recipesView from '../views/recipes_view';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateRecipeService from '../services/CreateRecipeService';

const upload = multer(uploadConfig);

const recipesRouter = Router();

recipesRouter.get('/', async (request, response) => {
  const recipesRepository = getRepository(Recipe);

  const recipes = await recipesRepository.find({
    relations: ['user'],
  });

  return response.json(recipesView.renderMany(recipes));
});

recipesRouter.use(ensureAuthenticated);

recipesRouter.post('/', upload.single('image'), async (request, response) => {
  try {
    const { id } = request.user;
    const { filename } = request.file;
    const { name, description, difficulty, time } = JSON.parse(
      request.body.body,
    );

    const createRecipe = new CreateRecipeService();

    const recipe = await createRecipe.execute({
      user: id,
      image: filename,
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
