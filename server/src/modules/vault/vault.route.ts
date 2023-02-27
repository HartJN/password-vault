import { FastifyInstance, FastifyPluginOptions, FastifyError } from 'fastify';

function vaultRoutes(
  app: FastifyInstance,
  _: FastifyPluginOptions,
  done: (err?: FastifyError) => void
) {
  done();
}

export default vaultRoutes;
