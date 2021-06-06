import { getRepository } from 'typeorm';

import Comment from '../models/Comment';

interface Request {
  message: string;
  recipe_id: string;
  user_id: string;
}

export default class CreateCommentService {
  public async execute({
    message,
    recipe_id,
    user_id,
  }: Request): Promise<Comment> {
    const commentsRepository = getRepository(Comment);

    const comment = commentsRepository.create({
      message,
      recipe_id,
      user_id,
    });

    await commentsRepository.save(comment);

    return comment;
  }
}
