import {
  Thread
} from '../models/thread.js';

const archive = async (req, res) => {
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
};

export {
  archive
};