import winston from 'winston';
import { MongoDB } from 'winston-mongodb';

import ServerConfig from './serverConfig';

const allowedTransports: winston.transport[] = [];

allowedTransports.push(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      winston.format.printf(
        (log) => `${log.timestamp} [${log.level}]: ${log.message}`,
      ),
    ),
  }),
);

allowedTransports.push(
  new MongoDB({
    level: 'error',
    db: ServerConfig.LOG_DB_URL,
    collection: 'problem_evaluation_logs',
  }),
);

allowedTransports.push(
  new winston.transports.File({
    filename: `logs/app.log`,
  }),
);

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.printf(
      (log) => `${log.timestamp} [${log.level.toUpperCase()}]: ${log.message}`,
    ),
  ),
  transports: allowedTransports,
});

export default logger;
