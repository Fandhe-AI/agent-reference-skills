# Pino with debug

The popular `debug` module is used in many modules across the ecosystem. The `pino-debug` module can capture calls to `debug` loggers and run them through Pino instead, resulting in a 10x (20x in asynchronous mode) performance improvement.

## Quick Setup

Install `pino-debug` and preload it with the `-r` flag, enabling any `debug` logs with the `DEBUG` environment variable:

```sh
$ npm i pino-debug
$ DEBUG=* node -r pino-debug app.js
```

## Fine-Grain Control

`pino-debug` offers fine-grain control to map specific `debug` namespaces to Pino log levels. See the [pino-debug documentation](https://github.com/pinojs/pino-debug) for more details.

## Notes

- `pino-debug` wraps `debug` output in JSON via Pino, adding structure and improving performance
- The `-r` (require) flag preloads `pino-debug` before the application starts
- `DEBUG=*` enables all debug namespaces; narrow this to specific namespaces as needed
- Performance gains come from Pino's optimized serialization even though additional data is logged

## Related

- [ecosystem](../integrations/ecosystem.md)
- [log-filtering](./log-filtering.md)
- [options](../api/options.md)
