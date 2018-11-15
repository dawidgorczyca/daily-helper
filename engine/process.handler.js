
// Usage:
// processHandler.methods.createProcess('npm', ['run', 'dev'], 'test pipe');
const { spawn } = require('child_process');

function handleProcessEvents(child, pipe) {
  child.stdout.on('data', (data) => {
    process.stdout.write(`child stdout:\n${data}`);
  });

  child.stderr.on('data', (data) => {
    process.stdout.write(`child stderr:\n${data}`);
  });

  child.on('exit', (code, signal) => {
    console.log('child process exited with ' +
                `code ${code} and signal ${signal}`);
  });
}

const processHandler = {
  'methods': {
    'createProcess': (cmd, cmdArgs, pipe) => {
      const child = spawn(cmd, cmdArgs, pipe)

      handleProcessEvents(child)
    }
  }
}

module.exports = processHandler;
