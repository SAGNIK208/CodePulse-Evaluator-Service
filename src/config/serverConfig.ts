import dotenv from 'dotenv';

import { LOG_DB_NAME } from '../constants';

dotenv.config();

export default {
  PORT: process.env.PORT || 3000,
  REDIS_HOST: process.env.REDIS_HOST || '127.0.0.1',
  REDIS_PORT: parseInt(process.env.REDIS_PORT || '6379', 10),
  LOG_DB_URL: process.env.LOG_DB_URL + LOG_DB_NAME,
};
