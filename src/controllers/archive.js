import {
  Thread
} from '../models/thread.js';

import {
  paginate
} from '../utils/pagination.js';

const archive = async (req, res) => {
  const page = req.query.page ? parseInt(req.query.page, 10) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 20;

  const offset = limit * (page - 1);

  const query = {};

  if (typeof req.query.board !== 'undefined') {
    query.board = req.query.board;
  }

  const order = {
    createdAt: -1
  };

  const projection = {
    board: 1,
    thread: 1,
    posts: {
      $slice: 1
    }
  };

  const threads = {
    items: await Thread
      .find(query, projection)
      .sort(order)
      .skip(offset)
      .limit(limit),
    total: await Thread.countDocuments(query)
  };

  const boards = await Thread.distinct('board');

  return res.render('archive', {
    page: {
      title: 'Archive'
    },
    query,
    threads,
    boards: boards.sort(),
    pagination: paginate(page, limit, threads.total)
  });
};

export {
  archive
};