import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import mongoose from 'mongoose';
import path from 'path';

import {
  Thread
} from './models/thread.js';
import {
  ChanService
} from './services/chan.service.js';

const {
  PORT = 3000,
    HOST = '0.0.0.0',
    MONGODB_URI = 'mongodb://localhost/archivist'
} = process.env;

const app = express();

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(process.cwd(), 'public')));

app.get('/', (req, res) => res.render('index'));

app.get('/archive', async (req, res) => {

  const page = req.query.page ? parseInt(req.query.page, 10) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 20;

  const offset = limit * (page - 1);

  const query = {};

  const projection = {
    board: 1,
    thread: 1,
    posts: {
      $slice: 1
    }
  };

  const threads = {
    items: await Thread.find(query, projection).skip(offset).limit(limit),
    total: await Thread.countDocuments(query)
  };


  const totalPages = threads.total / limit;

  const pages = Array.from(new Array(Math.ceil(totalPages)), (val, index) => index + 1);

  const pagination = {
    limit,
    pages,
    current: page,
    total: totalPages
  };

  return res.render('archive', {
    threads,
    pagination
  });
});

app.post('/save', async (req, res) => {
  const url = new URL(req.body.url);
  const path = url.pathname; // --> /:board/thread/:id
  const parts = path.split('/');
  const board = parts[1];
  const id = parts[3];

  const data = await ChanService.getThread(board, id);

  await Thread.updateOne({
    board,
    thread: id
  }, {
    ...data,
    board,
    thread: id
  }, {
    upsert: true
  });

  return res.redirect(`/archive/${board}/${id}`);
});

app.get('/archive/:board/:id', async (req, res) => {
  const {
    board,
    id
  } = req.params;

  const thread = await Thread.findOne({
    board,
    thread: id
  });

  return res.render('thread', {
    thread
  });
});

const server = new http.Server(app);

const connectDb = async () => mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

server.listen(PORT, HOST, async () => {

  await connectDb();

  console.log(`App running on ${HOST}:${PORT}`);
});