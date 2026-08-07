# Helpers

Overview of Hono's helper utilities — functions that assist application development without acting as request handlers, unlike middleware.

## Signature / Usage

```ts
import { getCookie, setCookie } from 'hono/cookie'

const app = new Hono()

app.get('/cookie', (c) => {
  const yummyCookie = getCookie(c, 'yummy_cookie')
  setCookie(c, 'delicious_cookie', 'macha')
})
```

## Options / Props

| Name | Description |
|------|-------------|
| Accepts | Content negotiation |
| Adapter | Platform/runtime integration |
| Cookie | Cookie read/write/delete |
| css | CSS-in-JS for JSX |
| Dev | Development-time route inspection |
| Factory | Typed middleware/handler creation outside route definitions |
| html | Safe HTML templating |
| JWT | JSON Web Token sign/verify/decode |
| SSG | Static site generation |
| Streaming | HTTP streaming responses |
| Testing | Type-safe RPC client for tests |
| WebSocket | WebSocket upgrade handling |

## Notes

- Helpers provide reusable functions; they do not act as request handlers the way middleware does.
- Each helper module is documented in detail in the `helpers/` reference category (`references/helpers/README.md`).

## Related

- [../helpers/README.md](../helpers/README.md)
