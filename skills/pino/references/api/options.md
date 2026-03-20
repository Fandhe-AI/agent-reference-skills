# Options

The `options` object is the first optional parameter to the `pino()` function. It controls all aspects of logger behavior including log levels, formatting, serialization, redaction, and more.

## Signature

```typescript
pino(options?: object, destination?) => Logger
```

## Options Reference

### `name` (String)

Default: `undefined`

The name of the logger. When set, adds a `name` field to every JSON line logged.

### `level` (String)

Default: `'info'`

The minimum level to log. Pino will not log messages with a lower level. One of `'fatal'`, `'error'`, `'warn'`, `'info'`, `'debug'`, `'trace'` or `'silent'`.

Additional levels can be added via the `customLevels` option.

### `levelComparison` ("ASC" | "DESC" | Function)

Default: `'ASC'`

Customize levels order. Pass `'DESC'` for descending order, or a function accepting `current` and `expected` values that returns a boolean indicating whether the current level should be shown.

```js
const logger = pino({
  levelComparison: 'DESC',
  customLevels: {
    foo: 20, // `foo` is more valuable than `bar`
    bar: 10
  },
})

// OR

const logger = pino({
  levelComparison: function(current, expected) {
    return current >= expected;
  }
})
```

### `customLevels` (Object)

Default: `undefined`

Define additional logging levels. Keys are the level namespace, values are the numerical value.

```js
const logger = pino({
  customLevels: {
    foo: 35
  }
})
logger.foo('hi')
```

### `useOnlyCustomLevels` (Boolean)

Default: `false`

Use only defined `customLevels` and omit Pino's built-in levels. The logger's default `level` must be changed to a value in `customLevels`.

Warning: this option may not be supported by downstream transports.

```js
const logger = pino({
  customLevels: {
    foo: 35
  },
  useOnlyCustomLevels: true,
  level: 'foo'
})
logger.foo('hi')
logger.info('hello') // Will throw an error saying info is not found in logger object
```

### `depthLimit` (Number)

Default: `5`

Limit stringification at a specific nesting depth when logging circular objects.

### `edgeLimit` (Number)

Default: `100`

Limit stringification of properties/elements when logging a specific object/array with circular references.

### `mixin` (Function)

Default: `undefined`

Called each time an active logging method is called. The function receives three parameters:
1. `mergeObject` or an empty object
2. The log level number
3. The logger or child logger instance

Must synchronously return an object whose properties will be added to the logged JSON.

```js
let n = 0
const logger = pino({
  mixin () {
    return { line: ++n }
  }
})
logger.info('hello')
// {"level":30,"time":1573664685466,"pid":78742,"hostname":"x","line":1,"msg":"hello"}
logger.info('world')
// {"level":30,"time":1573664685469,"pid":78742,"hostname":"x","line":2,"msg":"world"}
```

The result of `mixin()` is supposed to be a _new_ object. For performance reasons, the object returned by `mixin()` will be mutated by pino:

```js
const mixin = {
    appName: 'My app'
}

const logger = pino({
    mixin() {
        return mixin;
    }
})

logger.info({
    description: 'Ok'
}, 'Message 1')
// {"level":30,"time":1591195061437,"pid":16012,"hostname":"x","appName":"My app","description":"Ok","msg":"Message 1"}
logger.info('Message 2')
// {"level":30,"time":1591195061437,"pid":16012,"hostname":"x","appName":"My app","description":"Ok","msg":"Message 2"}
// Note: the second log contains "description":"Ok" text, even if it was not provided.
```

Using `mixin` with the level label:

```js
const logger = pino({
  mixin(_context, level) {
    return { 'level-label': logger.levels.labels[level] }
  }
})

logger.info({
    description: 'Ok'
}, 'Message 1')
// {"level":30,"time":1591195061437,"pid":16012,"hostname":"x","description":"Ok","level-label":"info","msg":"Message 1"}
logger.error('Message 2')
// {"level":30,"time":1591195061437,"pid":16012,"hostname":"x","level-label":"error","msg":"Message 2"}
```

If the `mixin` feature is being used merely to add static metadata, a child logger should be used instead. The `mixin` approach is useful to avoid the duplicate keys caveat when concatenating values for a specific key:

```js
const logger = pino({
  mixin (obj, num, logger) {
    return {
      tags: logger.tags
    }
  }
})
logger.tags = {}

logger.addTag = function (key, value) {
  logger.tags[key] = value
}

function createChild (parent, ...context) {
  const newChild = logger.child(...context)
  newChild.tags = { ...logger.tags }
  newChild.addTag = function (key, value) {
    newChild.tags[key] = value
  }
  return newChild
}

logger.addTag('foo', 1)
const child = createChild(logger, {})
child.addTag('bar', 2)
logger.info('this will only have `foo: 1`')
child.info('this will have both `foo: 1` and `bar: 2`')
logger.info('this will still only have `foo: 1`')
```

As of pino 7.x, when `mixin` is used with the `nestedKey` option, the object returned from `mixin()` will also be nested (prior versions mixed into the root):

```js
const logger = pino({
    nestedKey: 'payload',
    mixin() {
        return { requestId: requestId.currentId() }
    }
})

logger.info({
    description: 'Ok'
}, 'Message 1')
// {"level":30,"time":1591195061437,"pid":16012,"hostname":"x","payload":{"requestId":"dfe9a9014b","description":"Ok"},"msg":"Message 1"}
```

### `mixinMergeStrategy` (Function)

Default: `undefined`

Called each time an active logging method is called. Receives two parameters:
1. `mergeObject` or empty object
2. The result from `mixin()` or empty object

Must synchronously return an object.

```js
// Default strategy, `mergeObject` has priority
const logger = pino({
    mixin() {
        return { tag: 'docker' }
    },
    // mixinMergeStrategy(mergeObject, mixinObject) {
    //     return Object.assign(mixinMeta, mergeObject)
    // }
})

logger.info({
  tag: 'local'
}, 'Message')
// {"level":30,"time":1591195061437,"pid":16012,"hostname":"x","tag":"local","msg":"Message"}
```

```js
// Custom mutable strategy, `mixin` has priority
const logger = pino({
    mixin() {
        return { tag: 'k8s' }
    },
    mixinMergeStrategy(mergeObject, mixinObject) {
        return Object.assign(mergeObject, mixinObject)
    }
})

logger.info({
    tag: 'local'
}, 'Message')
// {"level":30,"time":1591195061437,"pid":16012,"hostname":"x","tag":"k8s","msg":"Message"}
```

```js
// Custom immutable strategy, `mixin` has priority
const logger = pino({
    mixin() {
        return { tag: 'k8s' }
    },
    mixinMergeStrategy(mergeObject, mixinObject) {
        return Object.assign({}, mergeObject, mixinObject)
    }
})

logger.info({
    tag: 'local'
}, 'Message')
// {"level":30,"time":1591195061437,"pid":16012,"hostname":"x","tag":"k8s","msg":"Message"}
```

### `redact` (Array | Object)

Default: `undefined`

As an array, specifies paths that should have their values redacted from any log output. Each path must be a string using JavaScript dot and bracket notation.

If an object is supplied, three options can be specified:

- **`paths`** (Array): Required. An array of paths.
- **`censor`** (String | Function | undefined): Optional. When a String, overwrites redacted keys. When `undefined`, the key is removed entirely. Can also be a mapping function with signature `(value, path) => redactedValue`. Default: `'[Redacted]'`
- **`remove`** (Boolean): Optional. Instead of censoring, remove both the key and the value. Default: `false`

**WARNING**: Never allow user input to define redacted paths.

### `hooks` (Object)

An object mapping to hook functions. Hook functions must be synchronous.

#### `logMethod`

Allows manipulating the parameters passed to logger methods. Signature: `logMethod(args, method, level)`.

This hook must invoke `method` using apply: `method.apply(this, newArgumentsArray)`.

```js
const hooks = {
  logMethod (inputArgs, method, level) {
    if (inputArgs.length >= 2) {
      const arg1 = inputArgs.shift()
      const arg2 = inputArgs.shift()
      return method.apply(this, [arg2, arg1, ...inputArgs])
    }
    return method.apply(this, inputArgs)
  }
}
```

#### `streamWrite`

Allows manipulating the stringified JSON log data just before writing to transports. Receives the stringified JSON and must return valid stringified JSON.

```js
const hooks = {
  streamWrite (s) {
    return s.replaceAll('sensitive-api-key', 'XXX')
  }
}
```

### `formatters` (Object)

An object containing functions for formatting the shape of log lines. These functions should return a JSONifiable object and should never throw.

#### `level`

Changes the shape of the log level. Default shape is `{ level: number }`. Takes two arguments: the label (e.g. `'info'`) and the numeric value (e.g. `30`).

Note: The log level cannot be customized when using multiple transports.

```js
const formatters = {
  level (label, number) {
    return { level: number }
  }
}
```

#### `bindings`

Changes the shape of the bindings. Default shape is `{ pid, hostname }`. Takes a single argument: the bindings object. Called once when creating logger.

```js
const formatters = {
  bindings (bindings) {
    return { pid: bindings.pid, hostname: bindings.hostname }
  }
}
```

#### `log`

Changes the shape of the log object. Called every time a log method is invoked. All arguments passed to the log method except the message are passed to this function. By default does not change the shape.

```js
const formatters = {
  log (object) {
    return object
  }
}
```

### `serializers` (Object)

Default: `{err: pino.stdSerializers.err}`

An object containing functions for custom serialization of objects. These functions should return a JSONifiable object and should never throw. When logging an object, each top-level property matching the exact key of a serializer will be serialized using the defined serializer.

The `err` serializer is also applied when the object is an instance of `Error` (e.g. `logger.info(new Error('kaboom'))`). See `errorKey` option to change the `err` namespace.

### `msgPrefix` (String)

Default: `undefined`

A prefix for every message of the logger and its children.

```js
const logger = pino({
  msgPrefix: '[HTTP] '
})
logger.info('got new request!')
// >  [HTTP] got new request!

const child = logger.child({})
child.info('User authenticated!')
// >  [HTTP] User authenticated!
```

### `base` (Object)

Default: `{pid: process.pid, hostname: os.hostname()}`

Key-value object added as child logger to each log line. Set to `undefined` to avoid adding `pid` and `hostname` properties.

### `enabled` (Boolean)

Default: `true`

Set to `false` to disable logging.

### `crlf` (Boolean)

Default: `false`

Set to `true` to log newline delimited JSON with `\r\n` instead of `\n`.

### `timestamp` (Boolean | Function)

Default: `true`

Enables or disables the inclusion of a timestamp. If a function is supplied, it must synchronously return a partial JSON string representation of the time, e.g. `,"time":1493426328206` (the default).

If set to `false`, no timestamp will be included.

```js
timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`
// which is equivalent to:
// timestamp: stdTimeFunctions.isoTime
```

**Caution**: attempting to format time in-process will significantly impact logging performance.

### `messageKey` (String)

Default: `'msg'`

The string key for the 'message' in the JSON object.

### `errorKey` (String)

Default: `'err'`

The string key for the 'error' in the JSON object.

### `nestedKey` (String)

Default: `null`

If there's a chance that objects being logged have properties that conflict with pino's own (`level`, `timestamp`, `pid`, etc), pino can be configured with `nestedKey` to place logged objects under a specific key.

```js
const logger = require('pino')({
  nestedKey: 'payload'
})

const thing = { level: 'hi', time: 'never', foo: 'bar'} // has pino-conflicting properties!
logger.info(thing)

// logs the following:
// {"level":30,"time":1578357790020,"pid":91736,"hostname":"x","payload":{"level":"hi","time":"never","foo":"bar"}}
```

### `browser` (Object)

Browser only. May have `asObject` and `write` keys. Separately documented in the Browser API documentation.

### `transport` (Object)

Shorthand for the `pino.transport()` function. Supports the same input options:

```js
require('pino')({
  transport: {
    target: '/absolute/path/to/my-transport.mjs'
  }
})

// or multiple transports
require('pino')({
  transport: {
    targets: [
      { target: '/absolute/path/to/my-transport.mjs', level: 'error' },
      { target: 'some-file-transport', options: { destination: '/dev/null' }
    ]
  }
})
```

If the `transport` option is supplied, a `destination` parameter may NOT also be passed as a separate argument:

```js
pino({ transport: {}}, '/path/to/somewhere') // THIS WILL NOT WORK, DO NOT DO THIS
pino({ transport: {}}, process.stderr) // THIS WILL NOT WORK, DO NOT DO THIS
```

### `onChild` (Function)

A synchronous callback called on each creation of a new child, receiving the child instance as its first argument. Any error thrown inside the callback will be uncaught and should be handled inside the callback.

```js
const parent = require('pino')({ onChild: (instance) => {
  // Execute call back code for each newly created child.
}})
// `onChild` will now be executed with the new child.
parent.child(bindings)
```

## Related

- [pino() function](./pino-function.md)
- [destination](./destination.md)
- [statics](./statics.md)
- [logger child](./logger-child.md)
