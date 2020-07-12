import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import { router } from './router.js';

const app = express();

app.set('view engine', 'pug');

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(process.cwd(), 'web')));

app.use(router);

export { app };
