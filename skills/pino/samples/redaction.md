# Redaction

Mask or remove sensitive fields such as passwords and tokens before they are written to log output.

```js
const pino = require('pino')

// Array form — replaces values with "[Redacted]"
const logger = pino({
  redact: ['password', 'req.headers.authorization', 'users[*].token']
})

logger.info({
  username: 'alice',
  password: 'secret123',
  users: [
    { name: 'bob', token: 'tok_abc' },
    { name: 'carol', token: 'tok_xyz' }
  ]
})
// password → "[Redacted]", users[*].token → "[Redacted]"

// Object form — custom censor string
const loggerCustom = pino({
  redact: {
    paths: ['apiKey', 'req.headers["x-api-key"]'],
    censor: '***'
  }
})

// Object form — remove keys entirely from output
const loggerRemove = pino({
  redact: {
    paths: ['secret'],
    remove: true
  }
})
```

## Notes

- Path syntax: dot notation (`a.b.c`), bracket notation for hyphenated keys (`a["x-y"]`), and wildcard (`a[*].b`).
- Default censor is `"[Redacted]"` when using the array form.
- Wildcard paths add roughly 50% overhead compared to explicit paths; use explicit paths for hot log sites.
- Path strings must never originate from user input — they are syntax-checked via a VM context internally.
