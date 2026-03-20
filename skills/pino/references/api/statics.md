# Statics

Static methods and properties available on the exported `pino` function itself (not on logger instances).

## `pino.destination([opts]) => SonicBoom`

Create a Pino Destination instance: a stream-like object with significantly more throughput than a standard Node.js stream.

```js
const pino = require('pino')
const logger = pino(pino.destination('./my-file'))
const logger2 = pino(pino.destination())
const logger3 = pino(pino.destination({
  dest: './my-file',
  minLength: 4096, // Buffer before writing
  sync: false // Asynchronous logging, the default
}))
const logger4 = pino(pino.destination({
  dest: './my-file2',
  sync: true // Synchronous logging
}))
```

The method may be passed a file path or a numerical file descriptor. By default, `pino.destination` will use `process.stdout.fd` (1) as the file descriptor.

`pino.destination` is implemented on [`sonic-boom`](https://github.com/mcollina/sonic-boom).

A `pino.destination` instance can also be used to reopen closed files (for example, for log rotation scenarios).

## `pino.transport(options) => ThreadStream`

Create a stream that routes logs to a worker thread wrapping a Pino Transport.

### Single transport

```js
const pino = require('pino')
const transport = pino.transport({
  target: 'some-transport',
  options: { some: 'options for', the: 'transport' }
})
pino(transport)
```

### Multiple transports with levels

```js
const pino = require('pino')
const transport = pino.transport({
  targets: [{
    level: 'info',
    target: 'pino-pretty' // must be installed separately
  }, {
    level: 'trace',
    target: 'pino/file',
    options: { destination: '/path/to/store/logs' }
  }]
})
pino(transport)
```

### Pipeline

```js
const pino = require('pino')
const transport = pino.transport({
  pipeline: [{
    target: 'pino-syslog' // must be installed separately
  }, {
    target: 'pino-socket' // must be installed separately
  }]
})
pino(transport)
```

### Multiple transports including pipelines

```js
const pino = require('pino')
const transport = pino.transport({
  targets: [{
    level: 'info',
    target: 'pino-pretty' // must be installed separately
  }, {
    level: 'trace',
    target: 'pino/file',
    options: { destination: '/path/to/store/logs' }
  }, {
    pipeline: [{
      target: 'pino-syslog' // must be installed separately
    }, {
      target: 'pino-socket' // must be installed separately
    }]
  }
  ]
})
pino(transport)
```

### Framework integration

If embedding/integrating pino within a framework, make pino aware of the calling script:

```js
const pino = require('pino')
const getCaller = require('get-caller-file')

module.exports = function build () {
  const logger = pino({
    transport: {
      caller: getCaller(),
      target: 'transport',
      options: { destination: './destination' }
    }
  })
  return logger
}
```

### Options

- **`target`**: The transport to pass logs through. May be an installed module name or an absolute path.
- **`options`**: An options object which is serialized (Structured Clone Algorithm), passed to the worker thread, parsed, and then passed to the exported transport function.
- **`worker`**: Worker thread configuration options. Additionally supports `worker.autoEnd` -- if set to `false`, logs will not be flushed on process exit. The developer must then call `transport.end()` to flush logs.
- **`targets`**: May be specified instead of `target`. Must be an array of transport configurations and/or pipelines. Each includes `options`, `target`, and an optional `level` (defaults to `info`).
- **`pipeline`**: May be specified instead of `target`. Must be an array of transport configurations. All intermediate steps must be `Transform` streams, not `Writable`.
- **`dedupe`**: See `pino.multistream` options.

### Notes on level filtering

- The top-level `level` in `pino.transport({ ... })` is not used for filtering.
- With a single `target` (or a single `pipeline`), filtering is controlled by `logger.level`.
- Per-transport level filtering is applied when using `targets` (multi-destination mode).

### Thread lifecycle

If `WeakRef`, `WeakMap`, and `FinalizationRegistry` are available (v14.5.0+), the thread will be automatically terminated when the stream or logger goes out of scope. The `transport()` function adds listeners to `process.on('beforeExit')` and `process.on('exit')` to ensure the worker is flushed and data synced before the process exits.

Any `'error'` event emitted by the transport must be considered fatal and the process must be terminated. Error events are not recoverable.

## `pino.multistream(streamsArray, opts) => MultiStreamRes`

Create a stream composed of multiple destination streams. Returns an object implementing the `MultiStreamRes` interface.

```js
var fs = require('node:fs')
var pino = require('pino')
var pretty = require('pino-pretty')
var streams = [
  {stream: fs.createWriteStream('/tmp/info.stream.out')},
  {stream: pretty() },
  {level: 'debug', stream: fs.createWriteStream('/tmp/debug.stream.out')},
  {level: 'fatal', stream: fs.createWriteStream('/tmp/fatal.stream.out')}
]

var log = pino({
  level: 'debug' // this MUST be set at the lowest level of the
                 // destinations
}, pino.multistream(streams))

log.debug('this will be written to /tmp/debug.stream.out')
log.info('this will be written to /tmp/debug.stream.out and /tmp/info.stream.out')
log.fatal('this will be written to /tmp/debug.stream.out, /tmp/info.stream.out and /tmp/fatal.stream.out')
```

In order for `multistream` to work, the log level **must** be set to the lowest level used in the streams array. Default is `info`.

### Options

- **`levels`**: Pass custom log level definitions as an object.
- **`dedupe`**: Set to `true` to send logs only to the stream with the higher level. Default: `false`.

`dedupe` is useful for redirecting `error` logs to `process.stderr` and others to `process.stdout`:

```js
var pino = require('pino')
var multistream = pino.multistream
var streams = [
  {level: 'debug', stream: process.stdout},
  {level: 'error', stream: process.stderr},
]

var opts = {
    levels: {
        silent: Infinity,
        fatal: 60,
        error: 50,
        warn: 50,
        info: 30,
        debug: 20,
        trace: 10
    },
    dedupe: true,
}

var log = pino({
  level: 'debug' // this MUST be set at the lowest level of the
                // destinations
}, multistream(streams, opts))

log.debug('this will be written ONLY to process.stdout')
log.info('this will be written ONLY to process.stdout')
log.error('this will be written ONLY to process.stderr')
log.fatal('this will be written ONLY to process.stderr')
```

## `pino.stdSerializers` (Object)

Provides functions for serializing objects common to many projects. The standard serializers are directly imported from [`pino-std-serializers`](https://github.com/pinojs/pino-std-serializers).

## `pino.stdTimeFunctions` (Object)

The `timestamp` option can accept a function that determines the timestamp value in a log line.

Available functions:

- **`pino.stdTimeFunctions.epochTime`**: Milliseconds since Unix epoch (Default)
- **`pino.stdTimeFunctions.unixTime`**: Seconds since Unix epoch
- **`pino.stdTimeFunctions.nullTime`**: Clears timestamp property (Used when `timestamp: false`)
- **`pino.stdTimeFunctions.isoTime`**: ISO 8601-formatted time in UTC
- **`pino.stdTimeFunctions.isoTimeNano`**: RFC 3339-formatted time in UTC with nanosecond precision

## `pino.symbols` (Object)

For integration purposes with ecosystem and third-party libraries, `pino.symbols` exposes the symbols used to hold non-public state and methods on the logger instance.

Access to the symbols allows logger state to be adjusted, and methods to be overridden or proxied for performant integration where necessary.

The `pino.symbols` object is intended for library implementers and should not be utilized for general use.

## `pino.version` (String)

Exposes the Pino package version. Also available on the logger instance.

## Notes

- `pino.destination()` provides significantly better throughput than standard Node.js streams.
- `pino.transport()` runs transports in a worker thread for non-blocking I/O.
- When using `pino.multistream()`, the logger's level MUST be set to the lowest level among all streams.
- `pino.symbols` is for library authors; general application code should not rely on it.
- `console.log` and `process.stdout` will not produce output after `process.exit()` is called on the main thread, even if the transport worker has not finished flushing.

## Related

- [pino() function](./pino-function.md)
- [options](./options.md)
- [destination](./destination.md)
- [interfaces and types](./interfaces-and-types.md)
