---
source: https://vite.dev/guide/api-environment-frameworks#runnabledevenvironment
---

# RunnableDevEnvironment

A `DevEnvironment` that can communicate arbitrary JavaScript values with application code: importing a module returns its real, live exports, so frameworks can run server entries directly.

## Signature / Usage

```ts
export class RunnableDevEnvironment extends DevEnvironment {
  public readonly runner: ModuleRunner
}

class ModuleRunner {
  /**
   * URL to execute.
   * Accepts file path, server path, or id relative to the root.
   * Returns an instantiated module (same as in ssrLoadModule)
   */
  public async import(url: string): Promise<Record<string, any>>
  /**
   * Other ModuleRunner methods...
   */
}

if (isRunnableDevEnvironment(server.environments.ssr)) {
  await server.environments.ssr.runner.import('/entry-point.js')
}
```

SSR middleware using the environment API (environment named `server`, error handling omitted):

```js
import fs from 'node:fs'
import path from 'node:path'
import { createServer } from 'vite'

const viteServer = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  environments: {
    server: {
      // by default, modules are run in the same process as the vite server
    },
  },
})

// You might need to cast this to RunnableDevEnvironment in TypeScript or
// use isRunnableDevEnvironment to guard the access to the runner
const serverEnvironment = viteServer.environments.server

app.use('*', async (req, res, next) => {
  const url = req.originalUrl

  // 1. Read index.html
  const indexHtmlPath = path.resolve(import.meta.dirname, 'index.html')
  let template = fs.readFileSync(indexHtmlPath, 'utf-8')

  // 2. Apply Vite HTML transforms. This injects the Vite HMR client,
  //    and also applies HTML transforms from Vite plugins, e.g. global
  //    preambles from @vitejs/plugin-react
  template = await viteServer.transformIndexHtml(url, template)

  // 3. Load the server entry. import(url) automatically transforms
  //    ESM source code to be usable in Node.js! There is no bundling
  //    required, and provides full HMR support.
  const { render } = await serverEnvironment.runner.import(
    '/src/entry-server.js',
  )

  // 4. render the app HTML. This assumes entry-server.js's exported
  //     `render` function calls appropriate framework SSR APIs,
  //    e.g. ReactDOMServer.renderToString()
  const appHtml = await render(url)

  // 5. Inject the app-rendered HTML into the template.
  const html = template.replace(`<!--ssr-outlet-->`, appHtml)

  // 6. Send the rendered HTML back.
  res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
})
```

For HMR-capable environments, accept updates in the server entry:

```js
// src/entry-server.js
export function render(...) { ... }

if (import.meta.hot) {
  import.meta.hot.accept()
}
```

## Notes

- The implicit `ssr` environment and other non-client environments use a `RunnableDevEnvironment` by default during dev. Guard access with `isRunnableDevEnvironment`.
- `runner.import(url)` fetches, transforms, and evaluates a module from the Vite module graph and returns the instantiated module with full HMR support. It is the modern replacement for `server.ssrLoadModule`.
- Modules are evaluated in the same runtime as the Vite server, so values cross the boundary in-process instead of being serialized. This requires the runner's runtime to be the same as the one the Vite server runs in; contrast `FetchableDevEnvironment`, which only communicates through serialized `Request` / `Response` objects.
- The `runner` is evaluated lazily on first access. Vite enables source map support when the `runner` is created, by calling `process.setSourceMapsEnabled` or overriding `Error.prepareStackTrace` if not available.
- Without `import.meta.hot.accept()` in the server entry, server file changes invalidate the entire server module graph.
- Express-style `app.use` here is only the example host server; HTTP server frameworks are covered by the fastify, hono, go-echo, fandhe-backend skills.
- Release Candidate: the Environment API is generally in the release candidate phase.

## Related

- [FetchableDevEnvironment](./fetchable-dev-environment.md)
- [raw DevEnvironment](./raw-dev-environment.md)
- [ModuleRunner](./module-runner.md)
- Setting Up the SSR Dev Server
