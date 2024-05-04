import express from 'express';

import serverConfig from './config/serverConfig';
import SampleWorker from './workers/sampleWorker';

const app = express();

app.listen(serverConfig.PORT, () => {
  console.log(`Server started at port : ${serverConfig.PORT}`);

  SampleWorker('SampleQueue');
});
