import * as bcrypt from 'bcryptjs';

export const getSalt = async (): Promise<string> => {
  return await bcrypt.genSalt();
}

export const getHashPassword = async (password: string, salt: string): Promise<string> => {
  return await bcrypt.hash(password, salt);
}

export const checkPassword = async (plainPassword: string, password: string): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, password);
}
