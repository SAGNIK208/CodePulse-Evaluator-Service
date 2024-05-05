import express from 'express';

import serverConfig from './config/serverConfig';
import SampleWorker from './workers/sampleWorker';
import bullBoardAdapter from './config/bullBoardConfig';
import logger from './config/loggerConfig';

const app = express();

app.use('/queues', bullBoardAdapter.getRouter());

app.listen(serverConfig.PORT, () => {
  logger.info(`Server started at port : ${serverConfig.PORT}`);

  SampleWorker('SampleQueue');
});
