# Logger

A module to handle winston loggers.

## Project dependencies

One important point to be mentioned is that as you scale you architecture to micro services it's very important to sign your request with an unique identifier. So every requested service will contain the ID making it trackable.

To do that you **MUST PROPERLY** install this **REQUIRED** module:

**express-x-request-id**

https://github.com/SunsetRiders/express-x-request-id

## Adding the module to the project

Add this into your **package.json** file.

**IMPORTANT: This is not a npm module but will work the same way, you must add manualy because the base code is here in GitHub.**

```javascript
"dependencies": {
  ...
  "logger": "git@github.com:SunsetRiders/logger.git"
}
 ```
 
 If you use **npm install** will be installed like a npm module direct to the **node_modules** folder.

You can also install with terminal.

```
$ npm i --save git+https://github.com/SunsetRiders/logger.git
```
## Logger types

This implementation provides 5 loggers types and 1 request middleware.

**1. debug:** Use to log any type of data mostly used for checking the application/process cycle;

**2. error:** Use to log error objects/messages;

**3. info:** Use to log any type of data that is a regular information.

**4. warn:** Use to log any type of data that is a warning.

**5. verbose:** Use to log records bigger than the usual logging mode. (Verbose means "using more words than necessary".) Verbose logging options are usually enabled specifically for troubleshooting because they create large log files and can slow down performance.

**6. request:** A middleware that logs every incoming request

### Middleware to bind logger to req object

```javascript
const ExpressXRequestId = require('express-x-request-id');
const Logger            = require('logger');

...
// DON'T FORGET TO ADD THE EXPRESS-X-REQUEST-ID
// MODULE BEFORE THE LOGGER MIDDLEWARES
// Set request middleware express
app.use(ExpressXRequestId.requestMiddleware);

// Set response middleware express
app.use(ExpressXRequestId.responseMiddleware);

// Bind logger to req object
app.use(Logger.injectLogger(config.logs));
...
```

### Using request middleware

Since it's a middleware should be added into your **app.js** file.

```javascript
const ExpressXRequestId = require('express-x-request-id');
const Logger            = require('logger');

...
// DON'T FORGET TO ADD THE EXPRESS-X-REQUEST-ID
// MODULE BEFORE THE LOGGER MIDDLEWARES
// Set request middleware express
app.use(ExpressXRequestId.requestMiddleware);

// Set response middleware express
app.use(ExpressXRequestId.responseMiddleware);

// Request logger
app.use(Logger.injectRequestLogger());
...
```

## Transport ways

The transport is basically ways to show/save the logs.

There're 3 available transport ways:

**1. console** 

Displays the log direct in the terminal.

**2. file**

Puts the log inside a file.

**3. logentries**

Send the log to log entries web service.

## Usage

Since the middleware binds logger to req object it can be executed by calling:

```javascript
req.logger[type](data); // This will automatically insert/show the log
```
Example:

```javascript
app.use('/', (req, res) => {
  req.logger.error({
    age: 18,
    name: 'Adam'
  }); 
);

```

**1. type** REQUIRED

Use one of the 4 loggers types. **(String)**

**2. data** REQUIRED

The data you want to store in log. **(Object or String)**

**IMPORTANT: If you want to log any logger type you must always use it from the req object described above** 

## Configurations

You must pass configuration to the logger at the moment of instantiation.


| Option   | Description  |   Value   | Default |
| ---------|--------------|-----------|---------|
| filename | Default log file name | string | 'application' |
| level | Default level | string | 'info' |
| logentriesToken | Log entries token to access the web service. | string | '' |
| logPath | Log path to save the log files. | string | './log' |
| transports | Transport ways to insert/show the logs. ['console', 'file', 'logentries'] | array | ['console'] |