import logger from '../config/loggerConfig';
import { PYTHON_IMAGE } from '../constants';

import createContainer from './containerFactory';
import decodeDockerStream from './dockerHelper';
import pullImage from './pullImage';

async function runPython(code: string, inputTestCase: string) {
  const rawLogBuffer: Buffer[] = [];

  logger.info('Initialising a new python docker container');
  await pullImage(PYTHON_IMAGE);
  const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > test.py && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | python3 test.py`;
  logger.info(runCommand);
  // const pythonDockerContainer = await createContainer(PYTHON_IMAGE, ['python3', '-c', code, 'stty -echo']);
  const pythonDockerContainer = await createContainer(PYTHON_IMAGE, [
    '/bin/sh',
    '-c',
    runCommand,
  ]);

  await pythonDockerContainer.start();

  logger.info('Started the docker container');

  const loggerStream = await pythonDockerContainer.logs({
    stdout: true,
    stderr: true,
    timestamps: false,
    follow: true,
  });

  loggerStream.on('data', (chunk) => {
    rawLogBuffer.push(chunk);
  });

  await new Promise((res) => {
    loggerStream.on('end', () => {
      logger.info(rawLogBuffer);
      const completeBuffer = Buffer.concat(rawLogBuffer);
      const decodedStream = decodeDockerStream(completeBuffer);
      logger.info(decodedStream);
      logger.info(decodedStream.stdout);
      res(decodeDockerStream);
    });
  });

  await pythonDockerContainer.remove();
}

export default runPython;
