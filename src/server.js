import http from 'http';

import { app } from './app.js';
import { config } from './config.js';
import { connectDb } from './database.js';

const port = config.get('port');
const host = config.get('host');

const server = new http.Server(app);

const start = (version) =>
  server.listen(port, host, async () => {
    config.set('version', version);

    await connectDb();

    console.log(`
    =========================================
    Archivist server running
    =========================================
    Version: ${version}
    Address: http://${host}:${port}
    =========================================
  `);
  });

export { start };
