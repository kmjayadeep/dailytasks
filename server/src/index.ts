import { boostrap } from './app';
import { PORT } from './config';
const debug = require('debug')('app:index');

boostrap()
  .then((app) => {
    app.listen(PORT, () => {
      debug('server running on port', PORT);
    });
  })
  .catch((err) => {
    debug('unable to boostrap app with error', err);
  });
