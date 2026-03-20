# Transports

Pino transports are used for both transmitting and transforming log output. Pino's log generation approach reduces logging impact on applications to the absolute minimum and gives greater flexibility in how logs are processed and stored. It is recommended that any log transformation or transmission is performed in a separate thread or process.

## v7+ Transports

From Pino v7 and upwards, transports operate inside a Worker Thread and can be configured via the options object passed to `pino` on initialization. They always operate asynchronously (unless `options.sync` is set to `true`) and logs are flushed as quickly as possible.

A transport is a module that exports a default function returning a writable stream:

```js
import { createWriteStream } from 'node:fs'

export default (options) => {
  return createWriteStream(options.destination)
}
```

### Setting Up a Transport

Use `pino.transport` to create a transport stream and pass it to `pino`:

```js
const pino = require('pino')
const transport = pino.transport({
  target: '/absolute/path/to/my-transport.mjs'
})
pino(transport)
```

The transport code executes in a separate worker thread. ESM files are supported even if the project is written in CJS.

### Async Transport Functions

The exported function can be async, allowing early errors if the transport could not be opened:

```js
import fs from 'node:fs'
import { once } from 'events'
export default async (options) => {
  const stream = fs.createWriteStream(options.destination)
  await once(stream, 'open')
  return stream
}
```

### Passing Options to Transports

Options are serialized and injected into the transport worker thread. This means the options object can only contain types supported by the Structured Clone Algorithm.

```js
const pino = require('pino')
const transport = pino.transport({
  target: 'some-file-transport',
  options: { destination: '/dev/null' }
})
pino(transport)
```

### Multiple Transports

Send logs to multiple destinations with per-target level filtering:

```js
const pino = require('pino')
const transport = pino.transport({
  targets: [
    { target: '/absolute/path/to/my-transport.mjs', level: 'error' },
    { target: 'some-file-transport', options: { destination: '/dev/null' } }
  ]
})
pino(transport)
```

### How Level Filtering Works

#### Single `target` (or single `pipeline`)

```text
Main thread                                   Worker thread
────────────────────────────────────────────  ─────────────────────────────────
logger.debug()/info()/...                     transport target (stream)
        │                                              ▲
        ▼                                              │
logger.level gate (enabled methods) ──ThreadStream─────┘
```

Only `logger.level` decides what is emitted. `transport.level` is not used.

#### Multiple `targets`

```text
Main thread                                   Worker thread
────────────────────────────────────────────  ─────────────────────────────────
logger.debug()/info()/...                     pino.multistream
        │                                      (per-target level filter)
        ▼                                              │
logger.level gate (enabled methods) ──ThreadStream────┼──> target #1 (level: ...)
                                                       ├──> target #2 (level: ...)
                                                       └──> target #N (default: info)
```

- `logger.level` is the first gate.
- Each `targets[i].level` is the second gate.
- Missing `targets[i].level` defaults to `info`.

If you need `debug` (or lower) logs to reach targets, set `logger.level` low enough AND set `level` on each target that should receive those messages.

### Custom Levels with Multiple Transports

Pass custom levels when using more than one transport:

```js
const pino = require('pino')
const transport = pino.transport({
  targets: [
    { target: '/absolute/path/to/my-transport.mjs', level: 'error' },
    { target: 'some-file-transport', options: { destination: '/dev/null' } }
  ],
  levels: { foo: 35 }
})
pino(transport)
```

### Deduplication

Use the `dedupe` option to send logs only to the stream with the higher level:

```js
const pino = require('pino')
const transport = pino.transport({
  targets: [
    { target: '/absolute/path/to/my-transport.mjs', level: 'error' },
    { target: 'some-file-transport', options: { destination: '/dev/null' } }
  ],
  dedupe: true
})
pino(transport)
```

### Synchronous Transport

Pass `sync: true` to transport options for synchronous logging:

```js
const pino = require('pino')
const transport = pino.transport({
  targets: [
    { target: '/absolute/path/to/my-transport.mjs', level: 'error' },
  ],
  dedupe: true,
  sync: true,
})
pino(transport)
```

### Using Transports with `--import` or `--require` Preloads

Pino transports work correctly when loaded via Node.js preload flags. Pino automatically detects the preload phase and filters out preload flags from the transport worker's `execArgv` to prevent infinite worker spawning.

```js
// preload.mjs
import pino from 'pino'

export const logger = pino({
  transport: {
    target: 'pino-pretty'
  }
})
```

```bash
node --import=./preload.mjs app.js
```

## Writing a Transport

The module `pino-abstract-transport` provides a simple utility to parse each line. Its usage is highly recommended.

### Using Async Iterators (ESM)

```js
import build from 'pino-abstract-transport'
import SonicBoom from 'sonic-boom'
import { once } from 'events'

export default async function (opts) {
  const destination = new SonicBoom({ dest: opts.destination || 1, sync: false })
  await once(destination, 'ready')

  return build(async function (source) {
    for await (let obj of source) {
      const toDrain = !destination.write(obj.msg.toUpperCase() + '\n')
      if (toDrain) {
        await once(destination, 'drain')
      }
    }
  }, {
    async close (err) {
      destination.end()
      await once(destination, 'close')
    }
  })
}
```

### Using Node.js Streams (CommonJS)

```js
'use strict'

const build = require('pino-abstract-transport')
const SonicBoom = require('sonic-boom')

module.exports = function (opts) {
  const destination = new SonicBoom({ dest: opts.destination || 1, sync: false })
  return build(function (source) {
    source.pipe(destination)
  }, {
    close (err, cb) {
      destination.end()
      destination.on('close', cb.bind(null, err))
    }
  })
}
```

The `close()` function is needed to ensure the stream is closed and flushed when its callback is called or the returned promise resolves. Otherwise, log lines will be lost.

For consuming async iterators in batches, consider using the [hwp](https://github.com/mcollina/hwp) library.

### Writing to a Custom Transport and stdout

Use `pino/file` transport with `destination: 1` to output to STDOUT alongside a custom transport:

```js
const transports = [
  {
    target: 'pino/file',
    options: { destination: 1 } // this writes to STDOUT
  },
  {
    target: 'my-custom-transport',
    options: { someParameter: true }
  }
]

const logger = pino(pino.transport({ targets: transports }))
```

## Creating a Transport Pipeline

A transport can return a `Transform` stream for use in a pipeline:

```js
import build from 'pino-abstract-transport'
import { pipeline, Transform } from 'node:stream'
export default async function (options) {
  return build(function (source) {
    const myTransportStream = new Transform({
      autoDestroy: true,
      objectMode: true,
      transform (chunk, enc, cb) {
        chunk.service = 'pino'
        this.push(`${JSON.stringify(chunk)}\n`)
        cb()
      }
    })
    pipeline(source, myTransportStream, () => {})
    return myTransportStream
  }, {
    enablePipelining: true
  })
}
```

Then pipeline them:

```js
import pino from 'pino'

const logger = pino({
  transport: {
    pipeline: [{
      target: './my-transform.js'
    }, {
      target: 'pino/file',
      options: { destination: 1 }
    }]
  }
})

logger.info('hello world')
```

There is no "default" destination for a pipeline -- a terminating target (a `Writable` stream) is required.

## TypeScript Compatibility

### Node.js 22+ with Type Stripping

Starting with Node.js 22.6.0, you can use TypeScript transports directly with native type stripping:

```ts
// my-transport.mts
import { createWriteStream } from 'node:fs'

export default (options: { destination: string }) => {
  return createWriteStream(options.destination)
}
```

```js
// app.js
const pino = require('pino')
const transport = pino.transport({
  target: './my-transport.mts',
  options: { destination: '/path/to/file' }
})
pino(transport)
```

- **Node.js 22.6.0 - 22.17.x**: Use the `--experimental-strip-types` flag.
- **Node.js 22.18.0+ and 24.0.0+**: Type stripping is enabled by default.
- Use the `.mts` extension for TypeScript ESM modules to ensure proper module resolution.

### Using TS-Node (Legacy)

For older Node.js versions, TS-Node can execute TypeScript without explicit transpilation, but with caveats:

- ES imports are not fully supported for "pure" TypeScript code.
- Only TS-Node is supported (not other loaders like TSM).
- May be problematic on Windows systems.

### Transpiled TypeScript (Recommended for Production)

For maximum compatibility and production use, transpile TypeScript transports to JavaScript before deployment.

## Notable Built-in Transports

### `pino/file`

Routes logs to a file or file descriptor:

```js
const pino = require('pino')
const transport = pino.transport({
  target: 'pino/file',
  options: { destination: '/path/to/file' }
})
pino(transport)
```

Options:

- `destination`: File path or file descriptor number. Defaults to `1` (STDOUT). Use `2` for STDERR.
- `mkdir`: Set to `true` to create the directory if it does not exist.
- `append`: Set to `false` to truncate the file on open (default is `true`, appending).

The difference between `pino/file` and `pino.destination` is that `pino/file` sets up `pino.destination` in a worker thread.

### `pino-pretty`

Prettifies logs for development:

```js
const pino = require('pino')
const transport = pino.transport({
  target: 'pino-pretty',
  options: { destination: 1 } // use 2 for stderr
})
pino(transport)
```

## Known Transports

### Pino v7+ Compatible

| Transport | Description |
|-----------|-------------|
| `@axiomhq/pino` | Official Axiom transport using axiom-js |
| `@logtail/pino` | Forwards logs to Logtail by Better Stack |
| `@macfja/pino-fingers-crossed` | Holds logs until a threshold level is reached |
| `@openobserve/pino-openobserve` | Sends logs to OpenObserve |
| `datadog-logger-integrations` | Forwards log events to Datadog |
| `pino-airbrake-transport` | Forwards log events to Airbrake |
| `pino-axiom` | Forwards logs to Axiom |
| `pino-discord-webhook` | Forwards log events to Discord webhook |
| `pino-elasticsearch` | Uploads log lines in bulk to Elasticsearch |
| `pino-hana` | Saves logs to SAP HANA database |
| `pino-logflare` | Sends logs to Logflare |
| `pino-logfmt` | Formats logs into logfmt format |
| `pino-loki` | Forwards logs to Grafana Loki |
| `pino-opentelemetry-transport` | Forwards logs to OpenTelemetry collector |
| `pino-pretty` | Prettifies log output for development |
| `pino-roll` | Automatically rolls log files by size or time |
| `pino-seq-transport` | Forwards log events to Seq |
| `pino-sentry-transport` | Forwards log events to Sentry |
| `pino-slack-webhook` | Forwards log events to Slack webhook |
| `pino-telegram-webhook` | Sends messages to Telegram |
| `pino-yc-transport` | Writes to Yandex Cloud Logging |

### Sentry Native SDK Integration

As an alternative to `pino-sentry-transport`, Sentry's Node.js SDK (v10.18.0+) provides a native `pinoIntegration`:

```js
const Sentry = require('@sentry/node')
const pino = require('pino')

Sentry.init({
  dsn: 'https://******@sentry.io/12345',
  enableLogs: true,
  integrations: [Sentry.pinoIntegration()],
})

const logger = pino()
logger.info('This log will be captured by Sentry')
```

### Legacy Transports

Legacy transports (pre-v7) operate in a separate process and consume Pino logs from stdin:

| Transport | Description |
|-----------|-------------|
| `pino-applicationinsights` | Forwards logs to Azure Application Insights |
| `pino-azuretable` | Forwards logs to Azure Table Storage |
| `pino-cloudwatch` | Buffers and forwards logs to Amazon CloudWatch |
| `pino-couch` | Uploads each log line as a CouchDB document |
| `pino-datadog` | Forwards logs to DataDog via API |
| `pino-gelf` | Transforms logs to GELF format for Graylog |
| `pino-http-send` | Batches logs and sends to a specified URL |
| `pino-kafka` | Sends logs to Apache Kafka |
| `pino-logdna` | Sends logs to LogDNA |
| `pino-mq` | Sends logs over a message bus |
| `pino-mysql` | Loads logs into MySQL/MariaDB |
| `pino-papertrail` | Forwards logs to Papertrail via UDP |
| `pino-pg` | Stores logs into PostgreSQL |
| `pino-redis` | Loads logs into Redis |
| `pino-sentry` | Loads logs into Sentry |
| `pino-seq` | Forwards logs to Seq |
| `pino-socket` | Forwards logs to IPv4 UDP or TCP socket |
| `pino-stackdriver` | Forwards logs to Google Stackdriver |
| `pino-syslog` | Converts logs to RFC3164 syslog format |
| `pino-websocket` | Forwards log lines to a websocket server |

Legacy transports are used with shell piping:

```sh
node my-app.js | node my-transport-process.js
```

## Asynchronous Startup

Transports boot asynchronously. Calling `process.exit()` before the transport starts will cause logs to not be delivered. Use the `ready` event:

```js
const pino = require('pino')
const transport = pino.transport({
  targets: [
    { target: '/absolute/path/to/my-transport.mjs', level: 'error' },
    { target: 'some-file-transport', options: { destination: '/dev/null' } }
  ]
})
const logger = pino(transport)

logger.info('hello')

transport.on('ready', function () {
  process.exit(0)
})
```

## Communication between Pino and Transports

Pino uses `thread-stream` to create a stream for transports. When a stream is created with `thread-stream`, it spawns a worker (an independent JavaScript execution thread).

### Error Messages

When a transport worker emits an error event, the worker's `error` and `unhandledRejection` listeners send the error message to the main thread. Pino then re-emits the error, which can be caught with a listener:

```js
const transport = pino.transport({
  target: './transport.js'
})

transport.on('error', err => {
  console.error('error caught', err)
})

const log = pino(transport)
```

## Notes

- v7+ transports run in a Worker Thread, while legacy transports run in separate processes.
- Transport options must be serializable via the Structured Clone Algorithm.
- Always include a `close()` function in custom transports to prevent lost log lines.
- Use `pino-abstract-transport` when writing custom transports for reliable line parsing.
- Pipeline transports require a terminating `Writable` stream target.

## Related

- [Pretty printing](./pretty-printing.md)
- [Asynchronous logging](./asynchronous.md)
- [API options](../api/options.md)
