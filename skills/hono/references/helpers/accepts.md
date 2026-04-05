# Accepts Helper

HTTP content negotiation — matches client `Accept-*` headers against server-supported values.

## Signature / Usage

```ts
import { accepts } from 'hono/accepts'

app.get('/', (c) => {
  const lang = accepts(c, {
    header: 'Accept-Language',
    supports: ['en', 'ja', 'zh'],
    default: 'en',
  })
  return c.text(`Language: ${lang}`)
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `header` | `AcceptHeader` | Target header to inspect (see below) |
| `supports` | `string[]` | Values the server can provide |
| `default` | `string` | Fallback when no match is found |
| `match` | `(accepts: Accept[], config: acceptsConfig) => string` (optional) | Custom matching function |

### AcceptHeader values

`Accept`, `Accept-Charset`, `Accept-Encoding`, `Accept-Language`, `Accept-Patch`, `Accept-Post`, `Accept-Ranges`

## Notes

- Returns the best-matching value from `supports` based on client quality factors (`q=`)
- Falls back to `default` when no supported value matches the client preference

## Related

- [Adapter Helper](./adapter.md)
