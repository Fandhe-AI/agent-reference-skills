# Redaction

Pino supports redacting sensitive information from log output using the `redact` option. Paths to keys containing sensitive data are specified, and their values are replaced with a censor string, removed entirely, or handled with a custom censor function.

## Basic Usage

Supply paths to keys that hold sensitive data using the `redact` option as an array:

```js
const logger = require('pino')({
  redact: ['key', 'path.to.key', 'stuff.thats[*].secret', 'path["with-hyphen"]']
})

logger.info({
  key: 'will be redacted',
  path: {
    to: {key: 'sensitive', another: 'thing'}
  },
  stuff: {
    thats: [
      {secret: 'will be redacted', logme: 'will be logged'},
      {secret: 'as will this', logme: 'as will this'}
    ]
  }
})
```

Output:

```json
{"level":30,"time":1527777350011,"pid":3186,"hostname":"Davids-MacBook-Pro-3.local","key":"[Redacted]","path":{"to":{"key":"[Redacted]","another":"thing"}},"stuff":{"thats":[{"secret":"[Redacted]","logme":"will be logged"},{"secret":"[Redacted]","logme":"as will this"}]}}
```

## Object Form with Custom Censor

The `redact` option can also take an object with `paths`, `censor`, and `remove` properties for finer control:

```js
const logger = require('pino')({
  redact: {
    paths: ['key', 'path.to.key', 'stuff.thats[*].secret'],
    censor: '**GDPR COMPLIANT**'
  }
})

logger.info({
  key: 'will be redacted',
  path: {
    to: {key: 'sensitive', another: 'thing'}
  },
  stuff: {
    thats: [
      {secret: 'will be redacted', logme: 'will be logged'},
      {secret: 'as will this', logme: 'as will this'}
    ]
  }
})
```

Output:

```json
{"level":30,"time":1527778563934,"pid":3847,"hostname":"Davids-MacBook-Pro-3.local","key":"**GDPR COMPLIANT**","path":{"to":{"key":"**GDPR COMPLIANT**","another":"thing"}},"stuff":{"thats":[{"secret":"**GDPR COMPLIANT**","logme":"will be logged"},{"secret":"**GDPR COMPLIANT**","logme":"as will this"}]}}
```

## Removing Keys Entirely

The `redact.remove` option removes the key and value from output entirely:

```js
const logger = require('pino')({
  redact: {
    paths: ['key', 'path.to.key', 'stuff.thats[*].secret'],
    remove: true
  }
})

logger.info({
  key: 'will be redacted',
  path: {
    to: {key: 'sensitive', another: 'thing'}
  },
  stuff: {
    thats: [
      {secret: 'will be redacted', logme: 'will be logged'},
      {secret: 'as will this', logme: 'as will this'}
    ]
  }
})
```

Output:

```json
{"level":30,"time":1527782356751,"pid":5758,"hostname":"Davids-MacBook-Pro-3.local","path":{"to":{"another":"thing"}},"stuff":{"thats":[{"logme":"will be logged"},{"logme":"as will this"}]}}
```

## Path Syntax

The syntax for paths conforms to standard ECMAScript path lookups with two additions:

- Paths may start with bracket notation
- Paths may contain the asterisk `*` to denote a wildcard
- Paths are **case sensitive**

Valid path examples:

| Path | Description |
|------|-------------|
| `a.b.c` | Dot notation |
| `a["b-c"].d` | Bracket notation for hyphenated keys |
| `["a-b"].c` | Path starting with bracket notation |
| `a.b.*` | Wildcard matching all keys under `a.b` |
| `a[*].b` | Wildcard matching all array elements |

## Overhead

Pino's redaction is built on top of [`fast-redact`](https://github.com/davidmarkclements/fast-redact):

- Paths without wildcards add about 2% overhead to `JSON.stringify`.
- With a single redacted path in pino, overhead is within noise (not a measurable bottleneck).
- Wildcard redaction carries non-trivial cost relative to explicit keys (approximately 50% in a case where four keys are redacted across two objects).

## Safety

The `redact` option is intended as an initialization-time configuration option. Path strings must not originate from user input. The `fast-redact` module uses a VM context to syntax-check the paths, so user input should never be combined with this approach.

## Notes

- Default censor value is `[Redacted]` when using the array form.
- Use the object form (`paths`, `censor`, `remove`) for custom censor strings or key removal.
- Wildcard paths (`*`) are powerful but carry higher overhead than explicit paths.
- Path strings must never come from user input for security reasons.

## Related

- [API options](../api/options.md)
- [Child loggers](./child-loggers.md)
