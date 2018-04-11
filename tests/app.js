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
  const a = {
    password: 'aaa',
    a: {
      b: {
        c: {
          password: 'aaa',
          d: [{
            password: 'aaa'
          }],
          e: {
            password: 'aaa',
            f: [null, undefined, {}, [], {
              password: 'aaa',
              g: 'lol'
            }]
          }
        }
      },
      password: 'aaa'
    }
  };
  let b = {};
  b.a = a;
  a.bb = b;
  req.logger.error(a);
  res.end('Done');
});

app.listen(3000, () => {
  console.log('Listening on 3000');
});
