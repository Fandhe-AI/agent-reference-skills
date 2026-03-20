# Pretty Printing

By default, Pino log lines are newline-delimited JSON (NDJSON), which is ideal for production usage and long-term storage but not for development environments. Pino logs can be prettified using the `pino-pretty` module.

## Setup

1. Install `pino-pretty` as a separate dependency:

```sh
npm install pino-pretty
```

2. Instantiate the logger with the `transport.target` option set to `'pino-pretty'`:

```js
const pino = require('pino')
const logger = pino({
  transport: {
    target: 'pino-pretty'
  },
})

logger.info('hi')
```

3. The transport option can also include a `pino-pretty` options object:

```js
const pino = require('pino')
const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  }
})

logger.info('hi')
```

## Flush Limitations

The `logger.flush()` method does not work when using `pino-pretty` because:

1. `pino-pretty` runs in a separate worker thread via the transport mechanism.
2. When `logger.flush()` is called, it flushes the SonicBoom destination in the main thread, but logs remain queued in the thread-stream worker.
3. The flush operation never propagates through to the worker thread where the pretty printer processes output.

This means formatted logs may not appear immediately even with `logger.flush()`.

## Notes

- `pino-pretty` is intended for development environments, not production.
- Install it as a separate dependency (`npm install pino-pretty`).
- Use `options.colorize` to enable/disable colored output.
- `logger.flush()` only ensures the main thread buffer is written, not the formatted output.

## Related

- [Transports](./transports.md)
- [Asynchronous logging](./asynchronous.md)
- [API options](../api/options.md)
