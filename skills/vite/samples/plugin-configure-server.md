---
source: https://vite.dev/guide/api-plugin#configureserver
---

# Plugin: configureServer Middleware

Add custom middleware to the dev server, before or after the internal middlewares.

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

Run after internal middlewares by returning a function:

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

## Notes

- `configureServer` runs before internal middlewares are installed, so plain `server.middlewares.use` runs first.
- It is not called in production builds; other hooks that store the `server` reference must guard against its absence.
- `server.middlewares` is Vite's Connect app. It is not a hono / fastify / go-echo / fandhe-backend HTTP server; those frameworks are covered by their own skills.
