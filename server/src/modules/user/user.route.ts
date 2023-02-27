import { FastifyError, FastifyInstance, FastifyPluginOptions } from 'fastify';
import { loginUserHandler, registerUserHandler } from './user.controller';

function userRoutes(
  app: FastifyInstance,
  _: FastifyPluginOptions,
  done: (err?: FastifyError) => void
) {
  app.post('/', registerUserHandler);

  app.post('/login', loginUserHandler);

  done();
}

export default userRoutes;
