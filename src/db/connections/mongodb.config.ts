import { registerAs } from '@nestjs/config';

export default registerAs('mongo_db', () => ({
  uri: process.env.MONGODB_URL,
}));
