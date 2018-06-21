### @ydv/logger

// my-file.js
```js
const log = require('@ydv/logger')('my-file')

log.info('Hello') // => '[info] my-file: Hello' to stdout
```

Available log levels: silly, debug, info, warn, error

`process.env.LOG_LEVEL` defaults to silly, set it to disable logs. If LOG_LEVEL is set to info, silly/warn will be hidden.
