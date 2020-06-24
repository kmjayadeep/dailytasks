import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { ENV, MONGO_URL } from './config';
import { addProject } from './controllers/project.controller';

const debug = require('debug')('app:app');

export async function boostrap() {
  debug('initializing application in %o environment', ENV);

  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  debug('connected to mongodb', MONGO_URL);

  const app = express();

  // Express configuration
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  if (ENV !== 'production') {
    app.use(morgan('dev'));
  } else {
    app.use(morgan('combined'));
  }

  app.get('/', (_req: Request, res: Response) => {
    res.send('backend v1.0.0');
  });

  app.post('/api/project', addProject);

  return app;
}
