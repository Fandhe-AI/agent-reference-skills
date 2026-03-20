# Logging Method Parameters

Each logging method (`trace`, `debug`, `info`, `warn`, `error`, `fatal`) shares the same signature and parameter behavior. This reference describes the parameters common to all logging methods.

## Signature

```typescript
logger.<level>([mergingObject], [message], [...interpolationValues])
```

## Parameters

### `mergingObject` (Object)

An object can optionally be supplied as the first parameter. Each enumerable key and value of the `mergingObject` is copied into the JSON log line.

```js
logger.info({MIX: {IN: true}})
// {"level":30,"time":1531254555820,"pid":55956,"hostname":"x","MIX":{"IN":true}}
```

If the object is of type `Error`, it is wrapped in an object containing a property `err` (`{ err: mergingObject }`), allowing for a unified error handling flow.

Options `serializers` and `errorKey` can be used at instantiation time to change the namespace from `err` to another string.

### `message` (String)

A message string can optionally be supplied as the first parameter, or as the second parameter after supplying a `mergingObject`.

By default, the contents of the `message` parameter will be merged into the JSON log line under the `msg` key:

```js
logger.info('hello world')
// {"level":30,"time":1531257112193,"msg":"hello world","pid":55956,"hostname":"x"}
```

The `message` parameter takes precedence over the `mergingObject`. If a `mergingObject` contains a `msg` property and a `message` parameter is also supplied, the `msg` property in the output will be the value of the `message` parameter.

If no `message` parameter is provided and the `mergingObject` is of type `Error` or has a property named `err`, the `message` parameter is set to the `message` value of the error. See option `errorKey` to change the namespace.

The `messageKey` option can change the namespace from `msg` to another string.

The `message` string may contain printf-style placeholders:

- `%s` - string placeholder, non-string values will have `.toString()` called
- `%d` - digit placeholder
- `%O`, `%o`, `%j` - object placeholder

### `...interpolationValues` (Any)

All arguments supplied after `message` are serialized and interpolated according to any supplied printf-style placeholders (`%s`, `%d`, `%o`|`%O`|`%j`) to form the final output `msg` value.

```js
logger.info('%o hello %s', {worldly: 1}, 'world')
// {"level":30,"time":1531257826880,"msg":"{\"worldly\":1} hello world","pid":55956,"hostname":"x"}
```

Since pino v6, consecutive parameters are NOT automatically concatenated:

```js
logger.info('hello', 'world')
// {"level":30,"time":1531257618044,"msg":"hello","pid":55956,"hostname":"x"}
// world is missing
```

A hook can be injected to modify this behavior:

```js
const pinoOptions = {
  hooks: { logMethod }
}

function logMethod (args, method) {
  if (args.length === 2) {
    args[0] = `${args[0]} %j`
  }
  method.apply(this, args)
}

const logger = pino(pinoOptions)
```

## Errors

Errors can be supplied as either the first parameter or as the `err` property on the `mergingObject`.

Options `serializers` and `errorKey` can be used at instantiation time to change the namespace from `err` to another string.

> **Note**: This section describes the default configuration. The error serializer can be mapped to a different key using the `serializers` option.

```js
logger.info(new Error("test"))
// {"level":30,"time":1531257618044,"msg":"test","stack":"...","type":"Error","pid":55956,"hostname":"x"}

logger.info({ err: new Error("test"), otherkey: 123 }, "some text")
// {"level":30,"time":1531257618044,"err":{"msg": "test", "stack":"...","type":"Error"},"msg":"some text","pid":55956,"hostname":"x","otherkey":123}
```

## Notes

- The `mergingObject` parameter is always optional and positional (first argument).
- Printf-style interpolation only works when explicit placeholders are present in the message string.
- Since pino v6, extra string arguments without placeholders are silently dropped, not concatenated.
- The `logMethod` hook can be used to restore pre-v6 concatenation behavior.

## Related

- [options](./options.md)
- [logger instance](./logger-instance.md)
- [logger child](./logger-child.md)
