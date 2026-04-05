# Logger Middleware

Logs incoming requests and outgoing responses to the console, including method, path, status code, and response time.

## Signature / Usage

```ts
import { logger } from 'hono/logger'

app.use(logger())
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `fn` | `(str: string, ...rest: string[]) => void` | Custom print function (default: `console.log`) |

## Notes

- Status codes are color-coded by default in environments that support ANSI colors.
- Set the `NO_COLOR` environment variable to disable color output.
- On Cloudflare Workers (no `process.env`), output defaults to plaintext.
- Response time is logged in a human-readable format (ms or s).
