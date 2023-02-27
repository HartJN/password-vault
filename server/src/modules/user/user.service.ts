import crypto from 'crypto';
import { UserModel } from './user.model';

export function generateSalt() {
  return crypto.randomBytes(64).toString('hex');
}

export async function createUser(input: {
  hashedPassword: string;
  email: string;
}) {
  return UserModel.create({
    email: input.email,
    password: input.hashedPassword,
  });
}
