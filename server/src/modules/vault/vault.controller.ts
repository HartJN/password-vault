import { FastifyReply, FastifyRequest } from 'fastify';
import { get } from 'lodash';
import log from '../../utils/logger';
import { updateVault } from './vault.service';

export async function updateVaultHandler(
  request: FastifyRequest<{
    Body: {
      encryptedVault: string;
    };
  }>,
  reply: FastifyReply
) {
  const userId = get(request, 'user._id');
  console.log('🚀 ~ userId:', userId);

  if (!userId) {
    return reply.code(401).send('Unauthorized');
  }

  try {
    await updateVault({
      data: request.body.encryptedVault,
      userId,
    });

    return reply.code(200).send('Vault updated successfully');
  } catch (error: any) {
    log.error('Error updating vault vault', error.message);
    return reply.code(500).send(`Error updating vault: ${error.message}`);
  }
}
