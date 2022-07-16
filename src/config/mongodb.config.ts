import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  mongo_uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/test',
  secret:  process.env.APP_SECRET
}));
