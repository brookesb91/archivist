import mongoose from 'mongoose';

import {
  config
} from './config.js';

const uri = config.get('mongo.uri');

const connectDb = async () => mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

export {
  connectDb
};