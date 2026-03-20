# Browser API

Pino is compatible with `browserify` for browser-side usage, making it useful for isomorphic/universal JavaScript code. By default, in the browser, Pino uses corresponding Log4j `console` methods (`console.error`, `console.warn`, `console.info`, `console.debug`, `console.trace`) and uses `console.error` for any `fatal` level logs.

## Browser Options

Pino can be passed a `browser` object in the options object with the following properties.

### `asObject` (Boolean)

Creates a pino-like log object instead of passing all arguments to a console method.

```js
const pino = require('pino')({browser: {asObject: true}})

pino.info('hi') // creates and logs {msg: 'hi', level: 30, time: <ts>}
```

When `write` is set, `asObject` will always be `true`.

### `asObjectBindingsOnly` (Boolean)

Similar to `asObject` but keeps the message and arguments unformatted. This allows deferring formatting to the `console` methods, where browsers have richer formatting in their devtools.

```js
const pino = require('pino')({browser: {asObjectBindingsOnly: true}})

pino.info('hello %s', 'world') // creates and logs {level: 30, time: <ts>}, 'hello %s', 'world'
```

### `formatters` (Object)

An object containing functions for formatting the shape of the log lines. Currently supports formatting for the `level` object only.

#### `level`

Changes the shape of the log level. The default shape is `{ level: number }`. The function takes two arguments: the label of the level (e.g. `'info'`) and the numeric value (e.g. `30`).

```js
const formatters = {
  level (label, number) {
    return { level: number }
  }
}
```

### `reportCaller` (Boolean)

Attempts to capture and include the originating callsite (file:line:column) for each log call.

- When used with `asObject` (or when `formatters` are provided), the callsite is added as a `caller` string property on the emitted log object.
- In the default mode (non-object), the callsite string is appended as the last argument passed to the corresponding `console` method.

```js
// Object mode: adds `caller` to the log object
const pino = require('pino')({
  browser: {
    asObject: true,
    reportCaller: true
  }
})

pino.info('hello')
// -> { level: 30, msg: 'hello', time: <ts>, caller: '/path/to/file.js:10:15' }

// Default mode: appends the caller string as the last console argument
const pino2 = require('pino')({
  browser: {
    reportCaller: true
  }
})

pino2.info('hello')
// -> console receives: 'hello', '/path/to/file.js:10:15'
```

This is a best-effort feature that parses the JavaScript Error stack. Stack formats vary across engines. The clickable link shown by devtools for a console message is determined by where `console.*` is invoked and cannot be changed by libraries.

### `write` (Function | Object)

Instead of passing log messages to `console.log`, they can be passed to a supplied function.

If `write` is set to a single function, all logging objects are passed to this function:

```js
const pino = require('pino')({
  browser: {
    write: (o) => {
      // do something with o
    }
  }
})
```

If `write` is an object, it can have methods that correspond to the levels. When a message is logged at a given level, the corresponding method is called. If a method is not present, the logging falls back to using the `console`:

```js
const pino = require('pino')({
  browser: {
    write: {
      info: function (o) {
        //process info log object
      },
      error: function (o) {
        //process error log object
      }
    }
  }
})
```

### `serialize` (Boolean | Array)

Serializers provided to Pino are ignored by default in the browser, including the standard serializers. Since the default destination is the console, values such as `Error` objects are enhanced for inspection, which they otherwise would not be if the Error serializer was enabled.

Turn all serializers on:

```js
const pino = require('pino')({
  browser: {
    serialize: true
  }
})
```

Selectively enable via an array:

```js
const pino = require('pino')({
  serializers: {
    custom: myCustomSerializer,
    another: anotherSerializer
  },
  browser: {
    serialize: ['custom']
  }
})
// following will apply myCustomSerializer to the custom property,
// but will not apply anotherSerializer to another key
pino.info({custom: 'a', another: 'b'})
```

When `serialize` is `true`, the standard error serializer is also enabled. If `serialize` is an array, the standard error serializer is automatically enabled but can be explicitly disabled:

```js
const pino = require('pino')({
  serializers: {
    custom: myCustomSerializer,
    another: anotherSerializer
  },
  browser: {
    serialize: ['!stdSerializers.err', 'custom'] //will not serialize Errors, will serialize `custom` keys
  }
})
```

The `serialize` array also applies to any child logger serializers. Unlike server pino, the serializers apply to every object passed to the logger method. If the `asObject` option is `true`, the serializers apply to the first object (as in server pino).

### `transmit` (Object)

An object with `send` and `level` properties for remotely recording log messages.

The `transmit.level` property specifies the minimum level (inclusive) of when the `send` function should be called. If not supplied, the `send` function is called based on the main logging `level` (defaulting to `info`).

The `send` function is passed the level of the log message and a `logEvent` object:

```js
{
  ts = Number,
  messages = Array,
  bindings = Array,
  level: { label = String, value = Number}
}
```

- `ts`: Unix epoch timestamp in milliseconds, taken from the moment the logger method is called.
- `messages`: All arguments passed to the logger method (e.g. `logger.info('a', 'b', 'c')` results in `['a', 'b', 'c']`).
- `bindings`: Represents each child logger (if any) and its relevant bindings. For `logger.child({a: 1}).child({b: 2}).info({c: 3})`, the bindings array holds `[{a: 1}, {b: 2}]` and messages holds `[{c: 3}]`. Bindings are ordered by position in the child hierarchy (lowest index = top).
- `level`: Holds the label (e.g. `info`) and the corresponding numerical value (e.g. `30`).

Serializers are always applied to `messages` and `bindings` in the `logEvent` object, even when they are not applied to console output.

```js
const pino = require('pino')({
  browser: {
    transmit: {
      level: 'warn',
      send: function (level, logEvent) {
        if (level === 'warn') {
          // maybe send the logEvent to a separate endpoint
          // or maybe analyze the messages further before sending
        }
        // we could also use the `logEvent.level.value` property to determine
        // numerical value
        if (logEvent.level.value >= 50) { // covers error and fatal

          // send the logEvent somewhere
        }
      }
    }
  }
})
```

### `disabled` (Boolean)

Disables logging in the browser when set to `true`. By default it is `false`.

```js
const pino = require('pino')({browser: {disabled: true}})
```

## Notes

- By default, Pino maps to Log4j-style `console` methods in the browser.
- `asObject` is automatically `true` when `write` is set.
- Serializers are ignored by default in the browser but are always applied within `transmit` logEvent objects.
- `reportCaller` is best-effort and depends on JavaScript Error stack format, which varies across engines.
- The `transmit.send` function is the primary mechanism for remotely recording browser logs.

## Related

- [API options](../api/options.md)
- [Child loggers](./child-loggers.md)
