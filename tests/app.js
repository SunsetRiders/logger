const app = require('express')();
const Logger = require('../index');
const config = {
  logs: {
    logentriesToken: process.env.LOGENTRIES_TOKEN,
    transports: ['console', 'logentries']
  }
};

app.use(Logger.injectLogger(config.logs));
app.use(Logger.injectRequestLogger());

app.get('/', (req, res) => res.send('ok'));
app.get('/404', (req, res) => res.status(404).send('ok'));

app.get('/error', (req, res) => {
  req.logger.info('will throw');
  req.logger.log('will throw');
  req.logger.debug('will throw');
  req.logger.warn('will throw');
  req.logger.error('will throw');
  throw new Error('Test');
});

app.listen(3000);
