import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { ENV } from './config';
const debug = require('debug')('app:app');

debug('initializing application in %o environment', ENV);

// Create Express server
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

export default app;
