# Asynchronous Logging

Asynchronous logging enables the minimum overhead of Pino by buffering log messages and writing them in larger chunks rather than performing blocking writes for each log line.

## Basic Usage

```js
const pino = require('pino')
const logger = pino(pino.destination({
  dest: './my-file', // omit for stdout
  minLength: 4096, // Buffer before writing
  sync: false // Asynchronous logging
}))
```

Synchronous logging can be turned on by passing `sync: true`. In synchronous mode, log messages are directly written to the output stream as they are generated with a blocking operation.

## Implementation

- `pino.destination` is implemented on top of [`sonic-boom`](https://github.com/mcollina/sonic-boom).
- `pino.destination` runs in the main thread (as opposed to `pino/file` transport which runs in a worker thread).

## AWS Lambda

Asynchronous logging is disabled by default on AWS Lambda or any other environment that modifies `process.stdout`. If forcefully turned on, call `dest.flushSync()` at the end of each function execution to avoid losing data.

## Caveats

- There is not a one-to-one relationship between calls to logging methods (e.g. `logger.info`) and writes to a log file.
- There is a possibility of the most recently buffered log messages being lost in case of a system failure (e.g. a power cut).

## Flush Limitations with `pino-pretty`

The `logger.flush()` method does not work when using `pino-pretty` because:

1. **Transport Architecture**: `pino-pretty` runs in a separate worker thread via the transport mechanism.
2. **Buffer Flow**: When you call `logger.flush()`, it flushes the SonicBoom destination in the main thread, but the logs remain queued in the thread-stream worker waiting to be processed by `pino-pretty`.
3. **No Cross-Thread Flush**: The flush operation never propagates through to the worker thread where the pretty printer is processing the output.

Even with `logger.flush()`, formatted logs may not appear immediately. The flush only ensures the main thread buffer is written, not the formatted output.

## Notes

- Asynchronous logging provides the best performance by buffering writes.
- Use `sync: false` in `pino.destination()` to enable async mode.
- `minLength` controls the buffer size before flushing to disk.
- Always call `dest.flushSync()` on AWS Lambda before the function returns.
- The most recent buffered messages may be lost on unexpected system failure.
- `logger.flush()` does not work across worker thread boundaries (e.g. with `pino-pretty`).

## Related

- [Transports](./transports.md)
- [Pretty printing](./pretty-printing.md)
- [API options](../api/options.md)
