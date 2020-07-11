import * as server from './src/server.js';
import info from './package.json';

try {
  server.start(info.version);
} catch (e) {
  console.log('Could not start the server...');
  console.error(e);
}