# logger.child()

The `logger.child` method creates stateful child loggers where key-value pairs are pinned to the logger and output on every log line. Child loggers share the parent's output stream and inherit the parent's current log level at spawn time.

## Signature

```typescript
logger.child(bindings: object, options?: object) => Logger
```

## Parameters

### `bindings` (Object)

An object of key-value pairs to include in every log line output via the returned child logger.

```js
const child = logger.child({ MIX: {IN: 'always'} })
child.info('hello')
// {"level":30,"time":1531258616689,"msg":"hello","pid":64849,"hostname":"x","MIX":{"IN":"always"}}
child.info('child!')
// {"level":30,"time":1531258617401,"msg":"child!","pid":64849,"hostname":"x","MIX":{"IN":"always"}}
```

The `bindings` object may contain any key except for reserved configuration keys `level` and `serializers`.

> **`bindings.serializers` (Object) - DEPRECATED**: Use `options.serializers` instead.

### `options` (Object)

Options for the child logger. These options override the parent logger options.

#### `options.level` (String)

Overrides the log level of the child logger. By default, the parent log level is inherited. After creation, also accessible via `logger.level`.

```js
const logger = pino()
logger.debug('nope') // will not log, since default level is info
const child = logger.child({foo: 'bar'}, {level: 'debug'})
child.debug('debug!') // will log as the `level` property set the level to debug
```

#### `options.msgPrefix` (String)

Default: `undefined`

A prefix for every message of the child logger. By default, the parent prefix is inherited. If the parent already has a prefix, the parent's prefix appears first, then the child's.

```js
const logger = pino({
  msgPrefix: '[HTTP] '
})
logger.info('got new request!')
// >  [HTTP] got new request!

const child = logger.child({avengers: 'assemble'}, {msgPrefix: '[Proxy] '})
child.info('message proxied!')
// >  [HTTP] [Proxy] message proxied!
```

#### `options.redact` (Array | Object)

Setting `options.redact` to an array or object overrides the parent `redact` options. To remove `redact` options inherited from the parent, set this value to an empty array (`[]`).

```js
const logger = require('pino')({ redact: ['hello'] })
logger.info({ hello: 'world' })
// {"level":30,"time":1625794363403,"pid":67930,"hostname":"x","hello":"[Redacted]"}
const child = logger.child({ foo: 'bar' }, { redact: ['foo'] })
logger.info({ hello: 'world' })
// {"level":30,"time":1625794553558,"pid":67930,"hostname":"x","hello":"world", "foo": "[Redacted]" }
```

#### `options.serializers` (Object)

Child loggers inherit serializers from the parent logger. Setting `serializers` in the options object overrides any configured parent serializers.

```js
const logger = require('pino')()
logger.info({test: 'will appear'})
// {"level":30,"time":1531259759482,"pid":67930,"hostname":"x","test":"will appear"}
const child = logger.child({}, {serializers: {test: () => `child-only serializer`}})
child.info({test: 'will be overwritten'})
// {"level":30,"time":1531259784008,"pid":67930,"hostname":"x","test":"child-only serializer"}
```

## Notes

- Child loggers use the same output stream as the parent.
- The log level of a child is mutable and can be set independently of the parent.
- Child loggers inherit the parent's current log level at spawn time.
- The `bindings` object may not contain the reserved keys `level` or `serializers`.
- Setting `options.redact` to `[]` removes all redaction inherited from the parent.

## Related

- [logger instance](./logger-instance.md)
- [logger methods](./logger-methods.md)
- [options - redact](./options.md)
- [options - serializers](./options.md)
