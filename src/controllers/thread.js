import {
  Thread
} from '../models/thread.js';
import {
  features
} from '../models/features.js';

import {
  config
} from '../config.js';

const thread = async (req, res) => {
  const {
    board,
    id
  } = req.params;

  const data = await Thread.findOne({
    board,
    thread: id,
  });

  return res.render('thread', {
    BASE_URL: `http://${config.get('url')}`,
    page: {
      title: data.posts[0].semantic_url,
      features: features(data.board),
    },
    thread: data,
  });
};

export {
  thread
};