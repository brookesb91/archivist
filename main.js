import * as server from './src/server.js';

try {
  server.start();
} catch (e) {
  console.log('Could not start the server...');
  console.error(e);
}