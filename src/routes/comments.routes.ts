import { Router } from 'express';
import { getRepository } from 'typeorm';

import Comment from '../models/Comment';

import commentsView from '../views/comments_view';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateCommentService from '../services/CreateCommentService';

const commentsRouter = Router();

commentsRouter.get('/:recipe_id', async (request, response) => {
  const { recipe_id } = request.params;
  const commentsRepository = getRepository(Comment);

  const comments = await commentsRepository.find({
    relations: ['user'],
    where: { recipe_id },
  });

  return response.json(commentsView.renderMany(comments));
});

commentsRouter.use(ensureAuthenticated);

commentsRouter.post('/', async (request, response) => {
  try {
    const { id } = request.user;
    const { message, recipe_id } = request.body;

    const createComment = new CreateCommentService();

    const comment = await createComment.execute({
      message,
      recipe_id,
      user_id: id,
    });

    return response.json(comment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default commentsRouter;
