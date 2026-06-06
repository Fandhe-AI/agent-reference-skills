# Basic Logging

Create a logger and emit structured JSON log messages at various levels.

```js
const pino = require('pino')

const logger = pino({ name: 'my-app', level: 'info' })

logger.info('hello world')
// {"level":30,"time":1531257112193,"msg":"hello world","name":"my-app","pid":55956,"hostname":"x"}

// Log with a structured object merged into the JSON output
logger.info({ userId: 123 }, 'User logged in')

// printf-style placeholders
logger.info('Value: %d', 42)

logger.warn('something looks off')
logger.error(new Error('oops'), 'request failed')
logger.debug('not emitted at info level')
```

## Notes

- The first optional argument to a log method is a plain object (mergingObject) whose keys are merged into the JSON line.
- `level` defaults to `'info'`; messages below the configured level are dropped with zero overhead.
- `name` adds a `name` field to every line.
- Pass an `Error` as the first argument to serialize it into the `err` field automatically.
