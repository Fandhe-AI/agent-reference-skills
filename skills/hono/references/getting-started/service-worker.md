# Service Worker

Run Hono inside a browser Service Worker using the `hono/service-worker` adapter.

## Signature / Usage

```ts
// sw.ts
import { Hono } from 'hono'
import { handle } from 'hono/service-worker'

const app = new Hono().basePath('/sw')
app.get('/', (c) => c.text('Hello World'))

self.addEventListener('fetch', handle(app))
```

**Alternative — `fire()` shorthand:**

```ts
import { fire } from 'hono/service-worker'
fire(app)
```

**Service Worker registration (`main.ts`):**

```ts
navigator.serviceWorker.register('/sw.ts', { scope: '/sw', type: 'module' })
```

## Notes

- `tsconfig.json` must include `"lib": ["ES2020", "DOM", "WebWorker"]`
- Service Workers run in the background of the browser; they intercept `fetch` events within their registered scope
- The `basePath` of the Hono app must match the Service Worker's `scope`
- Build with Vite; dev server default port: `5173`
- Access the app at `http://localhost:5173/`, then navigate to `/sw` for Hono responses

## Related

- [Basic](./basic.md)
