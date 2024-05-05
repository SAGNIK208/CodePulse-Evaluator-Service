import express from 'express';
import bodyParser from 'body-parser';

import serverConfig from './config/serverConfig';
import SampleWorker from './workers/sampleWorker';
import bullBoardAdapter from './config/bullBoardConfig';
import logger from './config/loggerConfig';
import apiRouter from './routes';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use('/api', apiRouter);

app.use('/queues', bullBoardAdapter.getRouter());

app.listen(serverConfig.PORT, () => {
  logger.info(`Server started at port : ${serverConfig.PORT}`);

  SampleWorker('SampleQueue');
});
