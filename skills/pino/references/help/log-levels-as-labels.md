# Log Levels as Labels Instead of Numbers

Pino's default mode is to print the numeric level value instead of the string name, since log lines are meant to be parsable. However, you can configure Pino to output level labels using the `formatters` option.

## Using the formatters Option

Use the `formatters` option with a `level` function to print the string name instead of the level value:

```js
const pino = require('pino')

const log = pino({
  formatters: {
    level: (label) => {
      return {
        level: label
      }
    }
  }
})

log.info('message')

// {"level":"info","time":1661632832200,"pid":18188,"hostname":"foo","msg":"message"}
```

## Alternative Approaches

Although the `formatters` approach works, these alternatives are recommended if possible:

1. **Transport-based**: Use a transport like [`pino-text-level-transport`](https://npm.im/pino-text-level-transport) if the only change desired is the level name.
2. **Prettifier**: Use a prettifier like [`pino-pretty`](https://npm.im/pino-pretty) to make the logs human-friendly.

## Notes

- By default, Pino uses numeric levels (trace=10, debug=20, info=30, warn=40, error=50, fatal=60)
- The `formatters.level` function receives the label string and can return any object shape
- Transports or prettifiers are preferred over in-process formatting for better separation of concerns

## Related

- [log-filtering](./log-filtering.md)
- [options](../api/options.md)
- [ecosystem](../integrations/ecosystem.md)
