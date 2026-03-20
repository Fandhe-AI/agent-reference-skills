# Child Loggers

Child loggers allow adding persistent bindings (key-value pairs) to every log line produced within a particular context, such as a module, request, or component. They are created from a parent logger and inherit its configuration while adding their own properties.

## Creating a Child Logger

Use `.child()` on an existing logger to create a child with bound properties:

```js
'use strict'
// imports a pino logger instance of `require('pino')()`
const parentLogger = require('./lib/logger')
const log = parentLogger.child({module: 'foo'})

function doSomething () {
  log.info('doSomething invoked')
}

module.exports = {
  doSomething
}
```

Every log line from `log` will include `"module":"foo"` automatically.

## Cost of Child Logging

Child logger creation is fast:

```
benchBunyanCreation*10000: 564.514ms
benchBoleCreation*10000: 283.276ms
benchPinoCreation*10000: 258.745ms
benchPinoExtremeCreation*10000: 150.506ms
```

Logging through a child logger has little performance penalty:

```
benchBunyanChild*10000: 556.275ms
benchBoleChild*10000: 288.124ms
benchPinoChild*10000: 231.695ms
benchPinoExtremeChild*10000: 122.117ms
```

Logging via the child of a child logger also has negligible overhead:

```
benchBunyanChildChild*10000: 559.082ms
benchPinoChildChild*10000: 229.264ms
benchPinoExtremeChildChild*10000: 127.753ms
```

## Duplicate Keys Caveat

Naming conflicts can arise between child loggers and children of child loggers. Pino resolves the conflict by including both keys in the JSON output:

```js
const pino = require('pino')
pino(pino.destination('./my-log'))
  .child({a: 'property'})
  .child({a: 'prop'})
  .info('howdy')
```

```sh
$ cat my-log
{"pid":95469,"hostname":"MacBook-Pro-3.home","level":30,"msg":"howdy","time":1459534114473,"a":"property","a":"prop"}
```

The sub-child's properties appear after the parent child properties. When parsed with `JSON.parse`, the conflicting namespace holds the final value assigned to it:

```sh
$ cat my-log | node -e "process.stdin.once('data', (line) => console.log(JSON.stringify(JSON.parse(line))))"
{"pid":95469,"hostname":"MacBook-Pro-3.home","level":30,"msg":"howdy","time":"2016-04-01T18:08:34.473Z","a":"prop"}
```

The conflict is resolved by taking the last value, which aligns with Bunyan's child logging behavior.

## Notes

- Child loggers inherit the parent's configuration (level, serializers, etc.) and add their own bindings.
- One of Pino's performance tricks is building strings instead of building objects and stringifying them, which is why duplicate keys between parents and children appear in raw output.
- Be conscious of namespace conflicts with child loggers, especially considering your expected log processing approach.
- Some JSON parsers may handle duplicate keys differently than `JSON.parse`.

## Related

- [Transports](./transports.md)
- [Browser API](./browser.md)
- [API options](../api/options.md)
