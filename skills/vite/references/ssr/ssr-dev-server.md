---
source: https://vite.dev/guide/ssr#setting-up-the-dev-server
---

# Setting Up the SSR Dev Server

Run Vite in middleware mode inside your own main server (example with express), then serve transformed HTML and server-rendered markup.

## Signature / Usage

```js
// server.js
import fs from 'node:fs'
import path from 'node:path'
import express from 'express'
import { createServer as createViteServer } from 'vite'

async function createServer() {
  const app = express()

  // Create Vite server in middleware mode and configure the app type as
  // 'custom', disabling Vite's own HTML serving logic so parent server
  // can take control
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })

  // Use vite's connect instance as middleware. If you use your own
  // express router (express.Router()), you should use router.use
  // When the server restarts (for example after the user modifies
  // vite.config.js), `vite.middlewares` is still going to be the same
  // reference (with a new internal stack of Vite and plugin-injected
  // middlewares). The following is valid even after restarts.
  app.use(vite.middlewares)

  app.use('*all', async (req, res) => {
    // serve index.html - we will tackle this next
  })

  app.listen(5173)
}

createServer()
```

The `*all` handler that serves server-rendered HTML:

```js
app.use('*all', async (req, res, next) => {
  const url = req.originalUrl

  try {
    // 1. Read index.html
    let template = fs.readFileSync(
      path.resolve(import.meta.dirname, 'index.html'),
      'utf-8',
    )

    // 2. Apply Vite HTML transforms. This injects the Vite HMR client,
    //    and also applies HTML transforms from Vite plugins, e.g. global
    //    preambles from @vitejs/plugin-react
    template = await vite.transformIndexHtml(url, template)

    // 3. Load the server entry. ssrLoadModule automatically transforms
    //    ESM source code to be usable in Node.js! There is no bundling
    //    required, and provides efficient invalidation similar to HMR.
    const { render } = await vite.ssrLoadModule('/src/entry-server.js')

    // 4. render the app HTML. This assumes entry-server.js's exported
    //     `render` function calls appropriate framework SSR APIs,
    //    e.g. ReactDOMServer.renderToString()
    const appHtml = await render(url)

    // 5. Inject the app-rendered HTML into the template.
    const html = template.replace(`<!--ssr-outlet-->`, () => appHtml)

    // 6. Send the rendered HTML back.
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  } catch (e) {
    // If an error is caught, let Vite fix the stack trace so it maps back
    // to your actual source code.
    vite.ssrFixStacktrace(e)
    next(e)
  }
})
```

Change the `dev` script to use the server script:

```diff
  "scripts": {
-   "dev": "vite"
+   "dev": "node server"
  }
```

Optional plugin that reloads the browser when an SSR-only module changes (add `ssrReload()` to the `plugins` array passed to `createViteServer`):

```ts
import type { EnvironmentModuleNode, Plugin } from 'vite'

export function ssrReload(): Plugin {
  return {
    name: 'ssr-reload',
    enforce: 'post',
    hotUpdate: {
      order: 'post',
      handler({ modules, server, timestamp }) {
        if (this.environment.name !== 'ssr') return

        const invalidatedModules = new Set<EnvironmentModuleNode>()
        let hasSsrOnlyModules = false

        for (const mod of modules) {
          if (mod.file == null) continue
          const clientModules =
            server.environments.client.moduleGraph.getModulesByFile(mod.file)
          if (clientModules != null) continue

          this.environment.moduleGraph.invalidateModule(
            mod,
            invalidatedModules,
            timestamp,
            true,
          )
          hasSsrOnlyModules = true
        }

        if (hasSsrOnlyModules) {
          server.environments.client.hot.send({ type: 'full-reload' })
          return []
        }
      },
    },
  }
}
```

## Notes

- Middleware mode is recommended so the main server stays under your control and Vite is decoupled from the production environment.
- `vite` is a ViteDevServer instance; `vite.middlewares` is a Connect instance usable in any connect-compatible Node.js framework. This is Vite's Connect middleware only; the HTTP server framework itself (express here) is separate. See the fastify, hono, go-echo, fandhe-backend skills for HTTP server frameworks.
- By default, updating a module imported only by the SSR environment does not reload the browser page. Framework integrations usually handle this; the plugin above is for low-level custom SSR setups.

## Related

- [server.middlewareMode](../config-dev/server-middleware-mode.md)
- [ViteDevServer](../javascript-api/vite-dev-server.md)
- [SSR Overview](./ssr-overview.md)
