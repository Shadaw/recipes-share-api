import { Router } from 'express';
import { getRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import Recipe from '../models/Recipe';
import Comment from '../models/Comment';

import CreateUsersService from '../services/CreateUsersService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUsersService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.use(ensureAuthenticated);

usersRouter.get('/', async (request, response) => {
  try {
    const { id } = request.user;

    const recipesRepository = getRepository(Recipe);
    const commentsRepository = getRepository(Comment);

    const recipes = await recipesRepository.find({
      select: ['id'],
      where: { user_id: id },
    });

    const recipesId = recipes.map(recipe => recipe.id);

    const comments = await commentsRepository.find();

    return response.json({
      recipes: recipesId.length,
      comments: comments.filter(comment =>
        recipesId.toString().includes(comment.recipe_id),
      ).length,
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
