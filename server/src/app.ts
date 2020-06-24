import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { ENV } from './config';

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

app.get('/', (_, res) => {
  res.send('backend v1.0.0');
});

export default app;
