# Destination

The `destination` parameter is the second optional argument to `pino()`. It controls where log output is written, supporting file descriptors, file paths, streams, and SonicBoom instances.

## Signature

```typescript
pino(options?, destination?: Number | String | Object | DestinationStream | SonicBoomOpts | WritableStream) => Logger
```

## Default

`pino.destination(1)` (STDOUT)

However, when something (e.g. a process manager) has monkey-patched `process.stdout.write`, `process.stdout` is used instead.

## Usage

```js
// pino.destination(1) by default
const stdoutLogger = require('pino')()

// destination param may be in first position when no options:
const fileLogger = require('pino')( pino.destination('/log/path'))

// use the stderr file handle to log to stderr:
const opts = {name: 'my-logger'}
const stderrLogger = require('pino')(opts, pino.destination(2))

// automatic wrapping in pino.destination
const fileLogger = require('pino')('/log/path')

// Asynchronous logging
const fileLogger = pino(pino.destination({ dest: '/log/path', sync: false }))
```

## Destination Types

- **File descriptor** (Number): e.g. `1` for STDOUT, `2` for STDERR
- **File path** (String): Absolute or relative path to a log file
- **Object with `dest` property**: Pointing to a file descriptor or path, plus additional SonicBoom options
- **DestinationStream**: Any object implementing the `write(msg)` method
- **SonicBoomOpts**: Options passed to SonicBoom (e.g. `{ dest, minLength, sync }`)
- **WritableStream**: Standard Node.js writable stream

For peak log writing performance, it is strongly recommended to use `pino.destination` to create the destination stream rather than an ordinary Node.js stream.

The `destination` parameter can also be the result of `pino.transport()`.

## `destination[Symbol.for('pino.metadata')]`

Default: `false`

Setting the global symbol `Symbol.for('pino.metadata')` as a key on the destination object to `true` causes the following properties to be set on the destination object after each log line is written:

- `destination.lastLevel` - the last logging level
- `destination.lastMsg` - the last logging message
- `destination.lastObj` - the last logging object
- `destination.lastTime` - the last time (partial string returned by the time function)
- `destination.lastLogger` - the last logger instance (to support child loggers)

```js
const dest = pino.destination('/dev/null')
dest[Symbol.for('pino.metadata')] = true
const logger = pino(dest)
logger.info({a: 1}, 'hi')
const { lastMsg, lastLevel, lastObj, lastTime} = dest
console.log(
  'Logged message "%s" at level %d with object %o at time %s',
  lastMsg, lastLevel, lastObj, lastTime
) // Logged message "hi" at level 30 with object { a: 1 } at time 1531590545089
```

## Notes

- If the parameter is a string integer (e.g. `'1'`), it will be coerced to a number and used as a file descriptor. To avoid this, provide a full path (e.g. `/tmp/1`).
- If the `transport` option is supplied in the options object, a separate `destination` argument must NOT be passed -- an Error will be thrown.
- The destination can be passed as the first argument when no options object is needed.

## Related

- [pino() function](./pino-function.md)
- [options](./options.md)
- [statics - pino.destination()](./statics.md)
- [interfaces and types - DestinationStream](./interfaces-and-types.md)
