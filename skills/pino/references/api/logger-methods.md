# Logger Methods and Properties

Additional methods and properties available on the logger instance beyond the core logging methods.

## `logger.bindings()`

Returns an object containing all the current bindings, cloned from the ones passed in via `logger.child()`.

```js
const child = logger.child({ foo: 'bar' })
console.log(child.bindings())
// { foo: 'bar' }
const anotherChild = child.child({ MIX: { IN: 'always' } })
console.log(anotherChild.bindings())
// { foo: 'bar', MIX: { IN: 'always' } }
```

## `logger.setBindings(bindings)`

Adds to the bindings of this logger instance.

**Note:** Does not overwrite bindings. Can potentially result in duplicate keys in log lines.

## `logger.flush([cb])`

Flushes the content of the buffer when using `pino.destination({ sync: false })`.

This is an asynchronous, best used as fire-and-forget, operation. If there is a need to wait for the logs to be flushed, a callback should be used.

The use case is primarily for asynchronous logging, which may buffer log lines while others are being written. `logger.flush` can be used to flush on a long interval (e.g. ten seconds) for an optimum balance between efficient logging at high demand and safer logging at low demand.

**Note:** `flush()` does not work when using `pino-pretty`.

## `logger.level` (String) [Getter/Setter]

Set this property to the desired logging level.

The core levels and their values:

| Level  | trace | debug | info | warn | error | fatal | silent   |
|--------|-------|-------|------|------|-------|-------|----------|
| Value  | 10    | 20    | 30   | 40   | 50    | 60    | Infinity |

The logging level is a _minimum_ level based on the associated value. For instance if `logger.level` is `info` (30), then `info` (30), `warn` (40), `error` (50), and `fatal` (60) methods will be enabled but `trace` (10) and `debug` (20) will not.

The `silent` logging level disables all logging; the `silent` log method is a noop function.

## `logger.isLevelEnabled(level)`

A utility method for determining if a given log level will write to the destination.

### Parameters

- **`level`** (String): The level to check against.

```js
if (logger.isLevelEnabled('debug')) logger.debug('conditional log')
```

### Additional level-related parameters

- **`levelLabel`** (String): Defines the method name of the new level.
- **`levelValue`** (Number): Defines the associated minimum threshold value for the level, determining its priority among other levels.

## `logger.levelVal` (Number)

Supplies the integer value for the current logging level.

```js
if (logger.levelVal === 30) {
  console.log('logger level is `info`')
}
```

## `logger.levels` (Object)

Holds the mappings between levels and values, and vice versa.

```js
$ node -p "require('pino')().levels"
```

```js
{ labels:
   { '10': 'trace',
     '20': 'debug',
     '30': 'info',
     '40': 'warn',
     '50': 'error',
     '60': 'fatal' },
  values:
   { fatal: 60, error: 50, warn: 40, info: 30, debug: 20, trace: 10 } }
```

## `logger[Symbol.for('pino.serializers')]`

Returns the serializers as applied to the current logger instance. If a child logger did not register its own serializer upon instantiation, the serializers of the parent will be returned.

## Event: 'level-change'

The logger instance is also an `EventEmitter`. A listener function can be attached via the `level-change` event.

The listener is passed five arguments:

1. `levelLabel` - the new level string, e.g. `trace`
2. `levelValue` - the new level number, e.g. `10`
3. `previousLevelLabel` - the prior level string, e.g. `info`
4. `previousLevelValue` - the prior level number, e.g. `30`
5. `logger` - the logger instance from which the event originated

```js
const logger = require('pino')()
logger.on('level-change', (lvl, val, prevLvl, prevVal) => {
  console.log('%s (%d) was changed to %s (%d)', prevLvl, prevVal, lvl, val)
})
logger.level = 'trace' // trigger event
```

Due to a known bug, every `logger.child()` call will fire a `level-change` event. These events can be ignored:

```js
const logger = require('pino')()
logger.on('level-change', function (lvl, val, prevLvl, prevVal, instance) {
  if (logger !== instance) {
    return
  }
  console.log('%s (%d) was changed to %s (%d)', prevLvl, prevVal, lvl, val)
})
logger.child({}); // trigger an event by creating a child instance, notice no console.log
logger.level = 'trace' // trigger event using actual value change, notice console.log
```

## `logger.version` (String)

Exposes the Pino package version. Also available on the exported `pino` function.

## `logger.msgPrefix` (String | Undefined)

Exposes the cumulative `msgPrefix` of the logger.

## Notes

- `setBindings()` adds to existing bindings rather than replacing them, which can lead to duplicate keys.
- `flush()` is primarily useful for asynchronous logging with `pino.destination({ sync: false })`.
- `flush()` does not work with `pino-pretty`.
- The `level-change` event fires on child creation as well as actual level changes.
- The `levels` object contains both `labels` (number-to-string) and `values` (string-to-number) mappings.

## Related

- [logger instance](./logger-instance.md)
- [logger child](./logger-child.md)
- [options](./options.md)
- [statics](./statics.md)
