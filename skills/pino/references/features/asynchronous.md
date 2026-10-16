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

Asynchronous logging in AWS Lambda functions will tend to cause delayed or lost log messages, as logs may not be written to the destination before the runtime is frozen.

For Lambda deployments, it is recommended to always use a destination with `sync: true`.

## Caveats

- There is not a one-to-one relationship between calls to logging methods (e.g. `logger.info`) and writes to a log file.
- There is a possibility of the most recently buffered log messages being lost in case of a system failure (e.g. a power cut).

## Flush Limitations with `pino-pretty`

`logger.flush()` does not flush the output of `pino-pretty` because:

1. **Transport Architecture**: `pino-pretty` runs in a separate worker thread via the transport mechanism.
2. **Cross-Thread Flush**: `logger.flush(cb)` does reach the worker. Since thread-stream#198 the worker waits for the shared buffer to be drained, then looks for a flush primitive on the destination the transport returned: `flush`, `flushSync`, or a pending `drain`.
3. **No Flush Primitive**: The stream `pino-pretty` returns exposes none of those. Its buffered `SonicBoom` is reachable only through the internal `pump`, so the worker has nothing to call and acknowledges the flush right away.

This means that even with `logger.flush()`, formatted logs may not appear immediately. The flush only guarantees that the main thread buffer was written and that the worker drained the shared buffer, not that `pino-pretty` has written its formatted output.

## Notes

- Asynchronous logging provides the best performance by buffering writes.
- Use `sync: false` in `pino.destination()` to enable async mode.
- `minLength` controls the buffer size before flushing to disk.
- On AWS Lambda, always use a destination with `sync: true` (asynchronous logging tends to delay or lose logs before the runtime is frozen).
- The most recent buffered messages may be lost on unexpected system failure.
- `logger.flush()` does not flush `pino-pretty` output: the flush reaches the worker, but `pino-pretty` exposes no flush primitive.

## Related

- [Transports](./transports.md)
- [Pretty printing](./pretty-printing.md)
- [API options](../api/options.md)
