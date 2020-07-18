import {
  Thread
} from '../models/thread.js';

import {
  paginate
} from '../utils/pagination.js';

import {
  config
} from '../config.js';

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

  const boards = await Thread.aggregate([{
    $sort: {
      board: 1
    }
  }, {
    $group: {
      _id: '$board',
      board: {
        $first: '$board'
      },
      count: {
        $sum: 1
      }
    }
  }]);

  return res.render('archive', {
    BASE_URL: `http://${config.get('host')}:${config.get('port')}`,
    page: {
      title: 'Archive'
    },
    query,
    threads,
    boards,
    pagination: paginate(page, limit, threads.total)
  });
};

export {
  archive
};