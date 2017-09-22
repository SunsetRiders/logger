# Logger

A module to handle winston loggers.

## Logger type

This implementation provides 5 logger types which are.

**1. LoggerDebug:** Use to log any type of data mostly used for checking the application/process cycle;

### Using LoggerDebug

```javascript
const LoggerDebug = require('logger').LoggerDebug;
const loggerDebug = new LoggerDebug().execute();
loggerDebug({
  ...
  msg: "Store some JSON object..."
  ...
});
```

**2. LoggerError:** Use to log error objects/messages;

### Using LoggerError

```javascript
const LoggerError = require('logger').LoggerError;
const loggerError = new LoggerError().execute();
loggerError({
  ...
  msg: "Store some JSON object..."
  ...
});
```

**3. LoggerInfo:** Use to log any type of data that is a regular information.

### Using LoggerInfo

```javascript
const LoggerInfo = require('logger').LoggerInfo;
const loggerInfo = new LoggerInfo().execute();
loggerInfo({
  ...
  msg: "Store some JSON object..."
  ...
});
```

**4. LoggerWarn:** Use to log any type of data that is a warning.

### Using LoggerWarn

```javascript
const LoggerWarn = require('logger').LoggerWarn;
const loggerWarn = new LoggerWarn().execute();
loggerWarn({
  ...
  msg: "Store some JSON object..."
  ...
});
```
**5. LoggerRequest:** A middleware that logs every incoming request

### Using LoggerRequest

Since it's a middleware should be added into your **app.js** file.

```javascript
const LoggerRequest = require('logger').LoggerRequest;
// Request logger
app.use(new LoggerRequest().execute();
});
```

There're 3 avalable transport ways:

**1. console:** Displays the log direct in the terminal.

**2. file:** Puts the log inside a file.

**3. logentries:** Send the log to log entries web service.

## Usage

It's pretty easy



