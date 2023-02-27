import { FastifyReply } from 'fastify';
import { FastifyRequest } from 'fastify';
import { COOKIE_DOMAIN } from '../../utils/constants';
import log from '../../utils/logger';
import { createVault } from '../vault/vault.service';
import {
  createUser,
  findUserByEmailAndPassword,
  findVaultByUser,
  generateSalt,
} from './user.service';

export async function registerUserHandler(
  request: FastifyRequest<{
    Body: Parameters<typeof createUser>[number];
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    console.log('hit before create user');
    const user = await createUser(body);

    const salt = generateSalt();

    const vault = await createVault({ user: user._id, salt });

    const accessToken = await reply.jwtSign({
      _id: user._id,
      email: user.email,
    });

    reply.setCookie('token', accessToken, {
      domain: COOKIE_DOMAIN,
      path: '/',
      secure: process.env.NODE_ENV === 'production' ? true : false,
      httpOnly: true,
      sameSite: false,
    });

    return reply.code(201).send({ accessToken, vault: vault.data, salt });
  } catch (e) {
    log.error(e, 'error creating user');
    return reply.code(500).send(e);
  }
}

export async function loginUserHandler(
  request: FastifyRequest<{
    Body: Parameters<typeof createUser>[number];
  }>,
  reply: FastifyReply
) {
  const user = await findUserByEmailAndPassword(request.body);

  if (!user) {
    return reply.code(401).send('Invalid credentials');
  }

  const vault = await findVaultByUser(user._id);

  const accessToken = await reply.jwtSign({
    _id: user._id,
    email: user.email,
  });

  reply.setCookie('token', accessToken, {
    domain: COOKIE_DOMAIN,
    path: '/',
    secure: process.env.NODE_ENV === 'production' ? true : false,
    httpOnly: true,
    sameSite: false,
  });

  return reply
    .code(200)
    .send({ accessToken, vault: vault?.data, salt: vault?.salt });
}
