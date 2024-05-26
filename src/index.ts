import express from 'express';
import bodyParser from 'body-parser';

import serverConfig from './config/serverConfig';
import SampleWorker from './workers/sampleWorker';
import bullBoardAdapter from './config/bullBoardConfig';
import logger from './config/loggerConfig';
import apiRouter from './routes';
// import runPython from './containers/runPythonDocker';
// import runCpp from './containers/runCppDocker';
import runJava from './containers/runJavaDocker';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use('/api', apiRouter);

app.use('/queues', bullBoardAdapter.getRouter());

app.listen(serverConfig.PORT, () => {
  logger.info(`Server started at port : ${serverConfig.PORT}`);

  SampleWorker('SampleQueue');

  const code = `
  import java.util.Scanner;
  class Main{
    public static void main(String xyz[]){
      Scanner sc = new Scanner(System.in);
      System.out.println("Enter a no");
      int a = sc.nextInt();
      for(int i = 0; i < a; i++){
        System.out.println(i);
      }
    }
  }
  `;

  const inputCase = `10
`;

  runJava(code, inputCase);
});
