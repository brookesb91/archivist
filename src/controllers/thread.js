import {
  Thread
} from '../models/thread.js';

const thread = async (req, res) => {
  const {
    board,
    id
  } = req.params;

  const data = await Thread.findOne({
    board,
    thread: id
  });

  return res.render('thread', {
    page: {
      title: data.posts[0].semantic_url,
      features: {
        code: ['g'].includes(data.board)
      }
    },
    thread: data
  });
};

export {
  thread
};