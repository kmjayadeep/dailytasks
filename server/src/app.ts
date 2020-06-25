import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { ENV, MONGO_URL } from './config';
import { addProject, getProjects } from './modules/project/project.controller';
import { addTask } from './modules/project/task.controller';

const debug = require('debug')('app:app');

export async function boostrap() {
  debug('initializing application in %o environment', ENV);

  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
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

  // CRUD projects
  app.get('/api/project', getProjects);
  app.post('/api/project', addProject);
  // app.delete('/api/project/:projectId', addProject);

  // CRUD tasks in project
  app.post('/api/project/:projectId/task', addTask);
  // app.put('/api/project/:projectId/task', addProject);
  // app.delete('/api/project/:projectId/task', addProject);

  return app;
}

export async function shutdown() {
  debug('shutting down app server');
  await mongoose.disconnect();
  debug('shut down complete');
}
