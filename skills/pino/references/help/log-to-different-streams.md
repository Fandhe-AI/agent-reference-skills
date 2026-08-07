# Log to Different Streams

Pino's default log destination is the singular destination of `stdout`. While not recommended for performance reasons, multiple destinations can be targeted by using `pino.multistream`.

## Usage

Route `error` and `fatal` level logs to `stderr` while all other levels (e.g. `debug`, `info`, `warn`) go to `stdout`:

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

- Multiple destinations are targeted via `pino.multistream`, but this is not recommended for performance reasons compared to the default singular `stdout` destination
- This page documents the same `pino.multistream` mechanism as [saving-to-multiple-files](./saving-to-multiple-files.md), focused on routing by log level rather than writing to multiple files

## Related

- [saving-to-multiple-files](./saving-to-multiple-files.md)
- [best-performance-stdout](./best-performance-stdout.md)
- [options](../api/options.md)
