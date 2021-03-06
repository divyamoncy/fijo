const errorHandler = require('errorhandler');
import app from './app';

if (process.env.NODE_ENV !== 'production') {
  /**
   * Error Handler. Provides full stack - remove for production
   */
  app.use(errorHandler());
}

/**
 * Start Express server.
 */
const server = app.listen(app.get('port'), () => {
  console.log('  App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});
server.timeout = app.get('timeout');

export default server;
