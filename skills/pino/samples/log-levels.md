# Log Levels

Configure the minimum log level at creation time and change it dynamically at runtime.

```js
const pino = require('pino')

// Set level at creation
const logger = pino({ level: 'debug' })

logger.trace('trace')   // emitted only when level <= trace
logger.debug('debug')
logger.info('info')
logger.warn('warn')
logger.error('error')
logger.fatal('fatal')

// Change level at runtime
logger.level = 'warn'
logger.debug('this is now suppressed')

// Guard expensive argument construction
if (logger.isLevelEnabled('debug')) {
  logger.debug({ computed: expensiveCall() }, 'detailed data')
}

// Custom levels
const custom = pino({
  customLevels: { audit: 35 },
  level: 'audit'
})
custom.audit('audit event recorded')
```

## Notes

- Built-in levels in ascending order: `trace` (10), `debug` (20), `info` (30), `warn` (40), `error` (50), `fatal` (60).
- Messages with a numerical level below `logger.level` are filtered before any serialization — zero JSON cost.
- `logger.level` can be reassigned at any time to change the live filter threshold.
- Use `isLevelEnabled()` to skip expensive argument construction when the level would be filtered anyway.
- `customLevels` adds new level methods; combine with `useOnlyCustomLevels: true` to drop built-in levels.
