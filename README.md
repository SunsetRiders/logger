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

## Logger types

This implementation provides 4 loggers types and 1 request middleware.

**1. debug:** Use to log any type of data mostly used for checking the application/process cycle;

**2. error:** Use to log error objects/messages;

**3. info:** Use to log any type of data that is a regular information.

**4. warn:** Use to log any type of data that is a warning.

**5. request:** A middleware that logs every incoming request

### Middleware to bind logger to req object

```javascript
const ExpressXRequestId = require('express-x-request-id');
const Logger            = require('logger');

...
// DON'T FORGET TO ADD THE EXPRESS-X-REQUEST-ID
// MODULE BEFORE THE LOGGER REQUEST
// Set middleware express X-Request-Id
app.use(ExpressXRequestId.middleware);

// Bind logger to req object
app.use((req, res, next) => {
  Logger.middleware(req, res, next, {/*Config object*/});
});
...
```

### Using request middleware

Since it's a middleware should be added into your **app.js** file.

```javascript
const ExpressXRequestId = require('express-x-request-id');
const Logger            = require('logger');

...
// DON'T FORGET TO ADD THE EXPRESS-X-REQUEST-ID
// MODULE BEFORE THE LOGGER REQUEST
// Set middleware express X-Request-Id
app.use(ExpressXRequestId.middleware);

// Request logger
// Since it's a middleware that don't require the req and res objects
app.use(Logger.requestMiddleware({/*Config object*/}));
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
req.logger(type, data, altconfig); // This will automatically insert/show the log
```
Example:

```javascript
req.logger('error', 
{
  age: 18,
  name: 'Adam'
}, 
{
 tranports: ['file', 'console'],
 logPath: './files/log'
}); 
```

**1. type** REQUIRED

Use one of the 4 loggers types. **(String)**

**2. data** REQUIRED

The data you want to store in log. **(Object or String)**

**3. altconfig** NOT REQUIRED

Alternative configuration object. **(Object)**

**IMPORTANT: If you want to log any logger type you must always use it from the req object described above** 

## Configurations

You can pass configuration to the logger at the moment of instantiation or whetever you call the method **req.logger(type, data, {/*Config object*/});** passing as third parameter.

**IMPORTANT: If you pass the object in the req.logger the alternative configuration will work only for that call, if you do not pass then the method will use the instantiation configuration** 

| Option   | Description  |   Value   | Default |
| ---------|--------------|-----------|---------|
| color | Display color when transport way is console. | boolean | false |
| logentriesToken | Log entries token to access the web service. | string | '' |
| logPath | Log path to save the log files. | string | './log' |
| transports | Transport ways to insert/show the logs. ['console', 'file', 'logentries'] | array | ['console'] |
