import fastifyCookie from '@fastify/cookie';
import fastifyCors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import fastify from 'fastify';
import { FastifyReply } from 'fastify';
import { FastifyRequest } from 'fastify';
import fs from 'fs';
import path from 'path';
import userRoutes from '../modules/user/user.route';
import vaultRoutes from '../modules/vault/vault.route';
import { CORS_ORIGIN } from './constants';

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate: any;
  }
}

function createServer() {
  const app = fastify();

  app.register(fastifyCors, {
    origin: CORS_ORIGIN,
    credentials: true,
  });

  app.register(fastifyJwt, {
    secret: {
      private: fs.readFileSync(
        `${(path.join(process.cwd()), 'certs')}/private.key`
      ),
      public: fs.readFileSync(
        `${(path.join(process.cwd()), 'certs')}/public.key`
      ),
    },
    sign: {
      algorithm: 'RS256',
    },
    cookie: {
      cookieName: 'token',
      signed: false,
    },
  });

  app.register(fastifyCookie);

  app.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const user = await request.jwtVerify<{
          _id: string;
        }>();
        request.user = user;
      } catch (error) {
        return reply.send(error);
      }
    }
  );

  app.register(userRoutes, { prefix: 'api/users' });
  app.register(vaultRoutes, { prefix: 'api/vault' });

  return app;
}

export default createServer;
