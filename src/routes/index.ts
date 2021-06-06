import { Router } from 'express';

import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import recipesRouter from './recipes.routes';
import commentsRouter from './comments.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/recipes', recipesRouter);
routes.use('/comments', commentsRouter);

export default routes;
