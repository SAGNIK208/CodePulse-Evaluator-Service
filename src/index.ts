import express from 'express';
import bodyParser from 'body-parser';

import serverConfig from './config/serverConfig';
import submissionQueueProducer from './producers/submissionQueueProducer';
import SampleWorker from './workers/sampleWorker';
import SubmissionWorker from './workers/submissionWorker';
import bullBoardAdapter from './config/bullBoardConfig';
import logger from './config/loggerConfig';
import apiRouter from './routes';
import { SAMPLE_QUEUE, SUBMISSION_QUEUE } from './constants';
// import runPython from './containers/runPythonDocker';
// import runCpp from './containers/runCppDocker';
// import runJava from './containers/runJavaDocker';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use('/api', apiRouter);

app.use('/queues', bullBoardAdapter.getRouter());

app.listen(serverConfig.PORT, () => {
  logger.info(`Server started at port : ${serverConfig.PORT}`);

  SampleWorker(SAMPLE_QUEUE);
  SubmissionWorker(SUBMISSION_QUEUE);

  const userCode = `
  
    class Solution {
      public:
      vector<int> permute() {
          vector<int> v;
          v.push_back(10);
          return v;
      }
    };
  `;

  const code = `
  #include<iostream>
  #include<vector>
  #include<stdio.h>
  using namespace std;
  
  ${userCode}

  int main() {

    Solution s;
    vector<int> result = s.permute();
    for(int x : result) {
      cout<<x<<" ";
    }
    cout<<endl;
    return 0;
  }
  `;

  const inputCase = `10
`;

  submissionQueueProducer({
    '1234': {
      language: 'CPP',
      inputCase,
      code,
    },
  });
});
