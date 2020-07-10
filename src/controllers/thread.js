import {
  Thread
} from '../models/thread.js';

const thread = async (req, res) => {
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
};

export {
  thread
};