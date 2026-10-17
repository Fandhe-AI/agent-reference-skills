---
source: https://vite.dev/guide/ssr#setting-up-the-dev-server
---

# SSR Dev Server with Express (Middleware Mode)

Run Vite inside your own Express server in middleware mode and render `index.html` per request.

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

  // Use vite's connect instance as middleware.
  app.use(vite.middlewares)

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

  app.listen(5173)
}

createServer()
```

```diff
  "scripts": {
-   "dev": "vite"
+   "dev": "node server"
  }
```

## Notes

- `index.html` needs a placeholder such as `<div id="app"><!--ssr-outlet--></div>` plus `<script type="module" src="/src/entry-client.js"></script>`; any precisely replaceable placeholder works.
- `vite.middlewares` is a Connect instance and works in any connect-compatible Node.js framework. Express here is only the docs' example host; the HTTP server framework itself is covered by the fastify and hono skills, not Vite.
- Low-level custom SSR does not reload the browser when an SSR-only module changes by default; the docs show an `ssrReload()` plugin using the `hotUpdate` hook for that.
- Framework-level SSR (react-router, tanstack-start, nextjs-app) is handled by those skills.
