import mongoose from 'mongoose';
import { DB_CONNECTION_STRING } from './constants';
import log from './logger';

export async function connectToDb() {
  try {
    await mongoose.connect(DB_CONNECTION_STRING);
  } catch (error) {
    log.error(error, 'Failed to connect to database');
    process.exit(1);
  }
}

export async function disconnectFromDb() {
  try {
    await mongoose.connection.close();
    log.info('Disconnected from database');
  } catch (error) {
    log.error(error, 'Failed to disconnect from database');
    process.exit(1);
  }
}
