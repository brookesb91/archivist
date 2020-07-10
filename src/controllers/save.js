import {
  ChanService
} from '../services/chan.service.js';
import {
  Thread
} from '../models/thread.js';

const save = async (req, res) => {
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
};

export {
  save
};