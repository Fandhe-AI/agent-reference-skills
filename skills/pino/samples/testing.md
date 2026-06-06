# Testing

Capture and assert on pino log output in test suites using pino-test.

```js
// npm install --save-dev pino-test
const test = require('node:test')
const pino = require('pino')
const pinoTest = require('pino-test')

// Assert a single log entry
test('logs an info message', async () => {
  const stream = pinoTest.sink()
  const logger = pino(stream)

  logger.info('hello world')

  await pinoTest.once(stream, { msg: 'hello world', level: 30 })
})

// Assert multiple consecutive entries
test('logs two messages in order', async () => {
  const stream = pinoTest.sink()
  const logger = pino(stream)

  logger.info('first')
  logger.warn('second')

  await pinoTest.consecutive(stream, [
    { msg: 'first', level: 30 },
    { msg: 'second', level: 40 }
  ])
})
```

## Notes

- `pinoTest.sink()` returns a writable stream; pass it directly to `pino()` as the destination.
- `pinoTest.once()` resolves when the next emitted log entry contains all the specified key-value pairs (subset match).
- `pinoTest.consecutive()` asserts entries in order; it rejects if any entry does not match the corresponding expectation.
- Both `once()` and `consecutive()` accept a custom assertion function as the last argument for specialized validation.
