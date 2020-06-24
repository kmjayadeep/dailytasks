import app from './app';
import { PORT } from './config';
const debug = require('debug')('app:index');

app.listen(PORT, () => {
  debug('server running on port', PORT);
});
