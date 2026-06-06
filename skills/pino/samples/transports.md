# Transports

Route log output to different destinations using pino.transport() — runs in a separate Worker Thread.

```js
const pino = require('pino')

// Pretty-print to stdout (development)
const devLogger = pino(
  pino.transport({ target: 'pino-pretty' })
)

// Write to a file via the built-in pino/file transport
const fileLogger = pino(
  pino.transport({
    target: 'pino/file',
    options: { destination: '/var/log/app.log', mkdir: true }
  })
)

// Multiple targets with per-target level filtering
const logger = pino({
  level: 'debug',
  transport: {
    targets: [
      { target: 'pino-pretty', level: 'debug' },           // human-readable on stdout
      { target: 'pino/file', level: 'error',               // errors only to file
        options: { destination: '/var/log/errors.log' } }
    ]
  }
})

logger.debug('debug line → pretty only')
logger.error('error line → both targets')
```

## Notes

- `pino.transport()` spawns a Worker Thread; the main thread is never blocked by I/O.
- When using multiple `targets`, `logger.level` is the first gate and each target's `level` is the second — set `logger.level` low enough to reach targets that need lower levels.
- `pino/file` and `pino-pretty` are built-in; install `pino-pretty` separately (`npm i -D pino-pretty`).
- Do not pass a separate `destination` argument when using the `transport` option — an error is thrown.
