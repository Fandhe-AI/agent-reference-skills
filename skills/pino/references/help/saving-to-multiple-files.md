# Saving to Multiple Files

Pino supports writing logs to multiple destinations using `pino.multistream`.

## Usage

See the `pino.multistream` API for details on directing log output to multiple files or streams simultaneously.

For example, you can direct different log levels to different streams:

```js
const pino = require('pino')
var streams = [
  {level: 'debug', stream: process.stdout},
  {level: 'error', stream: process.stderr},
  {level: 'fatal', stream: process.stderr}
]

const logger = pino({
  name: 'my-app',
  level: 'debug', // must be the lowest level of all streams
}, pino.multistream(streams))
```

## Notes

- Use `pino.multistream` to send logs to multiple destination streams
- The `level` option on the logger must be set to the lowest level among all streams
- Writing to multiple streams has a performance cost compared to single-destination logging
- Pino's default log destination is singular `stdout` for best performance

## Related

- [log-rotation](./log-rotation.md)
- [reopening-log-files](./reopening-log-files.md)
- [best-performance-stdout](./best-performance-stdout.md)
- [options](../api/options.md)
