# Child Loggers

Add persistent key-value bindings to every log line within a specific module or request scope.

```js
const pino = require('pino')

const logger = pino({ name: 'my-app' })

// Create a child that always includes module: 'auth'
const authLog = logger.child({ module: 'auth' })

authLog.info('user logged in')
// {"level":30,...,"name":"my-app","module":"auth","msg":"user logged in"}

// Nest children for per-request context
function handleRequest(requestId) {
  const reqLog = logger.child({ requestId })
  reqLog.info('request received')
  reqLog.info('processing done')
}

handleRequest('abc-123')
```

## Notes

- `.child(bindings)` returns a new logger that inherits the parent's level, serializers, and transport configuration.
- Bindings are prepended to every JSON line; no per-call overhead after creation.
- If parent and child share a key, both appear in raw output; `JSON.parse` resolves to the child's value (last-wins).
- Child creation is cheap — prefer one child per module or request rather than passing context manually to every call.
