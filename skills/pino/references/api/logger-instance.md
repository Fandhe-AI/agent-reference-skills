# Logger Instance

The logger instance is the object returned by the main exported `pino()` function. Its primary purpose is to provide logging methods.

## Overview

The default logging methods are `trace`, `debug`, `info`, `warn`, `error`, and `fatal`. Each logging method has the following signature:

```typescript
logger.<level>([mergingObject], [message], [...interpolationValues])
```

## Log Methods

### `logger.trace([mergingObject], [message], [...interpolationValues])`

Write a `'trace'` level log, if the configured level allows for it.

### `logger.debug([mergingObject], [message], [...interpolationValues])`

Write a `'debug'` level log, if the configured level allows for it.

### `logger.info([mergingObject], [message], [...interpolationValues])`

Write an `'info'` level log, if the configured level allows for it.

### `logger.warn([mergingObject], [message], [...interpolationValues])`

Write a `'warn'` level log, if the configured level allows for it.

### `logger.error([mergingObject], [message], [...interpolationValues])`

Write an `'error'` level log, if the configured level allows for it.

### `logger.fatal([mergingObject], [message], [...interpolationValues])`

Write a `'fatal'` level log, if the configured level allows for it.

Since `'fatal'` level messages are intended to be logged just before the process exits, the `fatal` method will always sync flush the destination. It is important not to misuse `fatal` since it will cause performance overhead if used for any other purpose than writing final log messages before the process crashes or exits.

### `logger.silent()`

Noop function.

## Usage

```js
const pino = require('pino')
const logger = pino()

logger.info('hello world')
// {"level":30,"time":1531257112193,"msg":"hello world","pid":55956,"hostname":"x"}

logger.info({MIX: {IN: true}})
// {"level":30,"time":1531254555820,"pid":55956,"hostname":"x","MIX":{"IN":true}}

logger.error(new Error('something broke'))
// {"level":50,"time":...,"msg":"something broke","stack":"...","type":"Error",...}

logger.fatal('process crashing')
// always sync flushes before exiting
```

## Level Values

| Level  | trace | debug | info | warn | error | fatal | silent   |
|--------|-------|-------|------|------|-------|-------|----------|
| Value  | 10    | 20    | 30   | 40   | 50    | 60    | Infinity |

## Notes

- The logging level is a minimum level. If `logger.level` is `info` (30), then `info`, `warn`, `error`, and `fatal` methods are enabled, but `trace` and `debug` are not.
- The `silent` level disables all logging; its method is a noop.
- `fatal` always sync flushes the destination -- do not use it for general-purpose logging.
- All log methods share the same parameter signature: `([mergingObject], [message], [...interpolationValues])`.

## Related

- [logging method parameters](./logging-method-parameters.md)
- [logger child](./logger-child.md)
- [logger methods](./logger-methods.md)
- [options](./options.md)
