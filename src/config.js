import convict from 'convict';
import dotenv from 'dotenv';

// Use dotenv first to init env variables.
dotenv.config();

const config = convict({
  env: {
    doc: 'Node Environment.',
    format: ['development', 'test', 'production'],
    default: 'development',
    env: 'NODE_ENV'
  },
  host: {
    doc: 'Host address to bind.',
    // Convict 6.0 Bug?
    // format: 'ipaddress',
    format: String,
    default: '0.0.0.0',
    env: 'HOST'
  },
  port: {
    doc: 'Port to bind the server listener.',
    format: 'port',
    default: 3000,
    env: 'PORT'
  },
  mongo: {
    uri: {
      doc: 'Mongo Database URI',
      format: String,
      default: 'mongodb://localhost/archivist',
      emv: 'MONGODB_URI'
    }
  }
});

config.validate({
  allowed: 'strict'
});

export {
  config
};