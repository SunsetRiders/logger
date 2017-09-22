# Logger

A module to handle winston loggers.

## Project dependencies

One important point to be mentioned is that as you scale you architecture to micro services it's very important to sign your request with an unique identifier. So every requested service will contain the ID making it trackable.

To do that you **MUST PROPERLY** install this **REQUIRED** module:

**express-x-request-id**

https://github.com/SunsetRiders/express-x-request-id

## Logger types

This implementation provides 4 logger types which are.

**1. debug:** Use to log any type of data mostly used for checking the application/process cycle;

**2. error:** Use to log error objects/messages;

**3. info:** Use to log any type of data that is a regular information.

**4. warn:** Use to log any type of data that is a warning.

**5. request:** A middleware that logs every incoming request

### Using LoggerRequest

Since it's a middleware should be added into your **app.js** file.

```javascript
const ExpressXRequestId = require('express-x-request-id');
const LoggerRequest = require('logger').LoggerRequest;
...
// DON'T FORGET TO ADD THE EXPRESS-X-REQUEST-ID
// MODULE BEFORE THE LOGGER REQUEST
// Set middleware express X-Request-Id
app.use(ExpressXRequestId.middleware);

// Request logger
//  Since it's a middleware there's no need to pass the req and res objects
//
app.use(new LoggerRequest().execute());
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

## Options

You can pass options to the loggers at the moment of instantiation.

```javascript
const LoggerDebug = require('logger').LoggerDebug;
const LoggerDebug = new LoggerDebug(req, res, {/*options object goes here*/}).execute();
```

| Option   | Description  |   Value   | Default |
| ---------|--------------|-----------|---------|
| color | Display color when transport way is console | boolean | false |



Example: 

## Usage

It's pretty easy



