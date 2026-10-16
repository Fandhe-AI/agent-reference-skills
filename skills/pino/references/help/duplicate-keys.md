# Duplicate Keys

Behavior when a child logger's bindings and a logged object contain the same key.

## When It Happens

Duplicate keys are possible when a logged object contains a top-level key that collides with a Pino field or a key in the child logger's bindings, or when child logger bindings collide with parent bindings (per help.md in v10.4.0).

```js
const pino = require('pino')
pino(pino.destination('./my-log'))
  .child({ a: 'property' })
  .child({ a: 'prop' })
  .info('howdy')
```

Output JSON:

```json
{"pid":95469,"hostname":"MacBook-Pro-3.home","level":30,"msg":"howdy","time":1459534114473,"a":"property","a":"prop"}
```

Two `a` keys are present. The child's property is written after the parent's.

## Resolution

`JSON.parse` keeps the last occurrence:

```sh
$ cat my-log | node -e "process.stdin.once('data', (line) => console.log(JSON.stringify(JSON.parse(line))))"
{"pid":95469,"hostname":"MacBook-Pro-3.home","level":30,"msg":"howdy","time":"2016-04-01T18:08:34.473Z","a":"prop"}
```

This matches Bunyan's child logger behavior (last value wins).

## Untrusted Data

Avoid passing externally supplied objects directly to logging methods or child logger bindings. User-controlled top-level keys can conflict with Pino fields such as `level`, `time`, or `msg`, as well as application or security fields. If untrusted data must be logged, place it under an application-controlled key, such as `logger.info({ untrusted })`, and prefer not to log untrusted data at all unless necessary.

```js
logger.info({ untrusted })
```

## Notes

- For performance, Pino builds the output string directly instead of constructing and stringifying an object, so duplicate keys are emitted.
- Other JSON parsers may handle duplicate keys differently.
- Watch for key name collisions when creating child loggers.

## Related

- [Child Loggers](../features/child-loggers.md)
- [logger.child()](../api/logger-child.md)
- [Avoid Message Conflict](./avoid-message-conflict.md)
