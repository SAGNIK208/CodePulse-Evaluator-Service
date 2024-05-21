import express from 'express';
import bodyParser from 'body-parser';

import serverConfig from './config/serverConfig';
import SampleWorker from './workers/sampleWorker';
import bullBoardAdapter from './config/bullBoardConfig';
import logger from './config/loggerConfig';
import apiRouter from './routes';
import runPython from './containers/runPythonDocker';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use('/api', apiRouter);

app.use('/queues', bullBoardAdapter.getRouter());

app.listen(serverConfig.PORT, () => {
  logger.info(`Server started at port : ${serverConfig.PORT}`);

  SampleWorker('SampleQueue');

  const code = `x = input()
y = input()
print("value of x is", x)
print("value of y is", y)
`;

  const inputCase = `100
200
`;

  runPython(code, inputCase);
});
