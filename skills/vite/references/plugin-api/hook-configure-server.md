---
source: https://vite.dev/guide/api-plugin#configureserver
---

# configureServer / configurePreviewServer

Hooks for configuring the dev server (`configureServer`) and the preview server (`configurePreviewServer`), most commonly to add custom middlewares to the internal connect app.

## Signature / Usage

```ts
// configureServer
(server: ViteDevServer) => (() => void) | void | Promise<(() => void) | void>

// configurePreviewServer
(server: PreviewServer) => (() => void) | void | Promise<(() => void) | void>
```

```js
const myPlugin = () => ({
  name: 'configure-server',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      // custom handle request...
    })
  },
})
```

Injecting post middleware (returned function runs after internal middlewares are installed):

```js
const myPlugin = () => ({
  name: 'configure-server',
  configureServer(server) {
    // return a post hook that is called after internal middlewares are
    // installed
    return () => {
      server.middlewares.use((req, res, next) => {
        // custom handle request...
      })
    }
  },
})
```

Storing server access:

```js
const myPlugin = () => {
  let server
  return {
    name: 'configure-server',
    configureServer(_server) {
      server = _server
    },
    transform(code, id) {
      if (server) {
        // use server...
      }
    },
  }
}
```

Preview server post middleware:

```js
const myPlugin = () => ({
  name: 'configure-preview-server',
  configurePreviewServer(server) {
    // return a post hook that is called after other middlewares are
    // installed
    return () => {
      server.middlewares.use((req, res, next) => {
        // custom handle request...
      })
    }
  },
})
```

## Options / Props

| Hook | Kind | Scope | See also |
|------|------|-------|----------|
| `configureServer` | `async`, `sequential` | Global | ViteDevServer |
| `configurePreviewServer` | `async`, `sequential` | Global | PreviewServer |

## Notes

- The hook is called before internal middlewares are installed, so custom middlewares run before internal ones by default.
- `configureServer` is not called during the production build; other hooks must guard against the stored server being absent.
- `configurePreviewServer` is called before other middlewares are installed, like `configureServer`.
- The middlewares here are Vite's internal connect app; HTTP server frameworks themselves are covered by the fastify, hono, go-echo, and fandhe-backend skills.

## Related

- [closeServer / closePreviewServer](./hook-close-server.md)
- [Client-server Communication](./client-server-communication.md)
- [config / configResolved](./hook-config.md)
