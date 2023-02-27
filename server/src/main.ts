import { FastifyInstance } from 'fastify';
import createServer from './utils/createServer';
import { connectToDb, disconnectFromDb } from './utils/db';
import log from './utils/logger';

function gracefulShutdown(signal: string, app: FastifyInstance) {
  process.on(signal, async () => {
    log.info(`Received ${signal}, shutting down`);

    app.close();

    await disconnectFromDb();

    log.info('Closed out remaining connections');

    process.exit(0);
  });
}

async function main() {
  const app = createServer();

  try {
    const url = await app.listen(4000, '0.0.0.0');

    log.info(`Server is listening at ${url}`);

    await connectToDb();
  } catch (e) {
    log.error(e);
    process.exit(1);
  }

  const signals = ['SIGTERM', 'SIGINT'];

  signals.forEach((signal) => {
    gracefulShutdown(signal, app);
  });
}

main();
