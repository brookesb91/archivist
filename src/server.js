import http from 'http';

import {
  app
} from './app.js';
import {
  config
} from './config.js';
import {
  connectDb
} from './database.js';

const port = config.get('port');
const host = config.get('host');

const server = new http.Server(app);

const start = () => server.listen(port, host, async () => {
  await connectDb();
  console.log(`Archivist server listening on ${host}:${port}`);
});

export {
  start
};