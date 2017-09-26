const app = require('express')();
const Logger = require('../index');
const ExpressXRequestId = require('express-x-request-id');

const config = {
  logs: {
    // logentriesToken: process.env.LOGENTRIES_TOKEN,
    transports: ['file'],
    level: 'verbose'
  }
};

// Set request middleware express
app.use(ExpressXRequestId.requestMiddleware);

// Set response middleware express
app.use(ExpressXRequestId.responseMiddleware);

app.use(Logger.injectLogger(config.logs));
// app.use(Logger.injectRequestLogger());

app.get('/', (req, res) => res.send('ok'));
app.get('/404', (req, res) => res.status(404).send('ok'));

app.get('/error', (req, res) => {
 /* req.logger.info('will throw');
  req.logger.log('will throw');*/
  req.logger.verbose('will throw');
 /* req.logger.warn('will throw');
  req.logger.error('will throw');
  req.logger.verbose('will throw');*/
  res.end('ok from error');
});

app.listen(3000);
