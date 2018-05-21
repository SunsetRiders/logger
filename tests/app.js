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
  req.logger.error('Hello World!', 'wow', 'lalala');
  req.logger.error(1000);
  req.logger.error(new Error('Custom Error'));
  req.logger.error({custom: 'error'});
  req.logger.error(['aaa', 'bbb', 'ccc']);
  const filterableObject = {password: 'password', pass: 'pass'};
  const filterableObject2 = {password: 'password', banana: 'banana'};
  req.logger.error([filterableObject, filterableObject2]);
  const a = {password: 'aaa'};
  const b = {a: null, b: undefined, c: {password: 'ABC', c2: {password: 'CBA'}}, d: 'ABC', e: 1};
  const c = [a, b, b, null, undefined, [null, undefined, a, b, b]];
  req.logger.error(a);
  req.logger.error(b);
  req.logger.error(c);

  //circular object
  let circ1 = {password:"password"};
  let circ2 = {circ1: circ1};
  circ1.circ2 = circ2;
  req.logger.error(circ1);

  //frozen object
  let frozen = {a:{password:"Let It Go"}};
  Object.freeze(frozen);
  req.logger.error(frozen);
  
  res.end('ok from error');
});

app.listen(3000, () => {
  console.log('Listening on 3000');
});
