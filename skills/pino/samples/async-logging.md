# Async Logging

Buffer log messages and write in large chunks for minimum I/O overhead.

```js
const pino = require('pino')

// Asynchronous file destination — buffers 4 KB before writing
const logger = pino(
  pino.destination({
    dest: './app.log',
    minLength: 4096, // flush threshold in bytes
    sync: false      // async mode
  })
)

logger.info('buffered message')

// Flush remaining buffer explicitly (e.g. before graceful shutdown)
process.on('exit', () => logger.flush())
process.on('SIGINT', () => {
  logger.flush()
  process.exit(0)
})

// Stdout async (omit dest)
const stdoutLogger = pino(
  pino.destination({ minLength: 4096, sync: false })
)
```

## Notes

- `sync: false` (async mode) delivers the lowest possible logging overhead by writing in batches.
- There is no 1:1 relationship between `logger.info()` calls and disk writes — a crash before flush may lose the last buffer.
- On AWS Lambda always use `sync: true` because the runtime may freeze before an async flush completes.
- `logger.flush()` reaches the transport worker, but does not flush `pino-pretty` output because the stream `pino-pretty` returns exposes no flush primitive (`flush` / `flushSync` / pending `drain`); see references/features/asynchronous.md.
