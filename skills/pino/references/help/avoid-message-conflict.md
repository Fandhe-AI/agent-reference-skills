# Avoid Message Conflict

When a log is written like `log.info({ msg: 'a message' }, 'another message')`, the final output JSON will have `"msg":"another message"` and the `'a message'` string will be lost. The `logMethod` hook can be used to overcome this.

## Using the logMethod Hook

Use the `logMethod` hook to detect and preserve conflicting `msg` properties:

```js
'use strict'

const log = require('pino')({
  level: 'debug',
  hooks: {
    logMethod (inputArgs, method) {
      if (inputArgs.length === 2 && inputArgs[0].msg) {
       inputArgs[0].originalMsg = inputArgs[0].msg
      }
      return method.apply(this, inputArgs)
    }
  }
})

log.info('no original message')
log.info({ msg: 'mapped to originalMsg' }, 'a message')

// {"level":30,"time":1596313323106,"pid":63739,"hostname":"foo","msg":"no original message"}
// {"level":30,"time":1596313323107,"pid":63739,"hostname":"foo","msg":"a message","originalMsg":"mapped to originalMsg"}
```

## Notes

- The conflict occurs because Pino uses `msg` as the default message key
- When both an object property `msg` and a string message are provided, the string message wins
- The `logMethod` hook intercepts log calls before they are processed, allowing you to rename the conflicting key
- In the example, `msg` in the object is renamed to `originalMsg` so both values are preserved

## Related

- [duplicate-keys](./duplicate-keys.md)
- [options](../api/options.md)
