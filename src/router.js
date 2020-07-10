import express from 'express';

import {
  archive
} from './controllers/archive.js';
import {
  home
} from './controllers/home.js';
import {
  save
} from './controllers/save.js';
import {
  thread
} from './controllers/thread.js';

const router = express.Router();

router.get('/', home);
router.get('/archive', archive);
router.get('/archive/:board/:id', thread);
router.post('/save', save);

export {
  router
};