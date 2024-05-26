import { JAVA_IMAGE } from '../constants';

import createContainer from './containerFactory';
import decodeDockerStream from './dockerHelper';
import pullImage from './pullImage';

async function runJava(code: string, inputTestCase: string) {
  const rawLogBuffer: Buffer[] = [];

  console.log('Initialising a new cpp docker container');
  await pullImage(JAVA_IMAGE);
  const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > Main.java && javac Main.java && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | java Main`;
  console.log(runCommand);
  const cppDockerContainer = await createContainer(JAVA_IMAGE, [
    '/bin/sh',
    '-c',
    runCommand,
  ]);

  // starting / booting the corresponding docker container
  await cppDockerContainer.start();

  console.log('Started the docker container');

  const loggerStream = await cppDockerContainer.logs({
    stdout: true,
    stderr: true,
    timestamps: false,
    follow: true, // whether the logs are streamed or returned as a string
  });

  // Attach events on the stream objects to start and stop reading
  loggerStream.on('data', (chunk) => {
    rawLogBuffer.push(chunk);
  });

  const response = await new Promise((res) => {
    loggerStream.on('end', () => {
      console.log(rawLogBuffer);
      const completeBuffer = Buffer.concat(rawLogBuffer);
      const decodedStream = decodeDockerStream(completeBuffer);
      console.log(decodedStream);
      console.log(decodedStream.stdout);
      res(decodedStream);
    });
  });

  // remove the container when done with it
  await cppDockerContainer.remove();
  return response;
}

export default runJava;
