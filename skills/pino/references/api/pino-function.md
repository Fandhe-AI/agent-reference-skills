# pino() Function

The exported `pino` function is the main entry point for creating a Pino logger instance. It accepts two optional parameters and returns a logger.

## Signature

```typescript
pino([options], [destination]) => Logger
```

## Parameters

- **`options`** (Object) - Optional. Configuration object controlling logger behavior such as log level, serializers, formatters, redaction, and more.
- **`destination`** (Number | String | Object | DestinationStream | SonicBoomOpts | WritableStream) - Optional. Where log lines are written. Defaults to `pino.destination(1)` (STDOUT).

## Usage

```js
const pino = require('pino')

// Basic usage with defaults (logs to STDOUT at 'info' level)
const logger = pino()

// With options only
const logger = pino({ level: 'debug', name: 'my-app' })

// With destination only (no options)
const logger = pino(pino.destination('/log/path'))

// With both options and destination
const logger = pino(
  { name: 'my-logger' },
  pino.destination(2) // stderr
)

// Shorthand: string path auto-wrapped in pino.destination
const logger = pino('/log/path')
```

## Notes

- When only a destination is needed (no options), it can be passed as the first argument.
- A string path passed as the destination is automatically wrapped with `pino.destination()`.
- If the `transport` option is supplied, a separate `destination` parameter must NOT also be passed -- an `Error` will be thrown.
- A string integer (e.g. `'1'`) passed as destination will be coerced to a number and used as a file descriptor. To avoid this, provide a full path (e.g. `/tmp/1`).

## Related

- [options](./options.md)
- [destination](./destination.md)
- [Logger Instance](./logger-instance.md)
