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

**Note:** `logger.flush()` does not flush the output of `pino-pretty`. See "Flush Limitations with `pino-pretty`" in [Asynchronous logging](./asynchronous.md).

## Notes

- `pino-pretty` is intended for development environments, not production.
- Install it as a separate dependency (`npm install pino-pretty`).
- Use `options.colorize` to enable/disable colored output.
- `logger.flush()` reaches the worker, but `pino-pretty` has no flush primitive, so its output is not flushed (see Asynchronous logging).

## Related

- [Transports](./transports.md)
- [Asynchronous logging](./asynchronous.md)
- [API options](../api/options.md)
