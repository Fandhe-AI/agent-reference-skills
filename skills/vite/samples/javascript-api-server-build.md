---
source: https://vite.dev/guide/api-javascript#createserver
---

# JavaScript API: createServer, build, preview

Start the dev server, run a build, or start the preview server programmatically.

```ts
import { createServer } from 'vite'

const server = await createServer({
  // any valid user config options, plus `mode` and `configFile`
  configFile: false,
  root: import.meta.dirname,
  server: {
    port: 1337,
  },
})
await server.listen()

server.printUrls()
server.bindCLIShortcuts({ print: true })
```

```ts
import path from 'node:path'
import { build } from 'vite'

await build({
  root: path.resolve(import.meta.dirname, './project'),
  base: '/foo/',
  build: {
    rolldownOptions: {
      // ...
    },
  },
})
```

```ts
import { preview } from 'vite'

const previewServer = await preview({
  // any valid user config options, plus `mode` and `configFile`
  preview: {
    port: 8080,
    open: true,
  },
})

previewServer.printUrls()
previewServer.bindCLIShortcuts({ print: true })
```

## Notes

- `configFile: false` disables automatic config file resolution; `InlineConfig` extends `UserConfig` with `configFile`.
- When `createServer` and `build` run in one Node.js process, both depend on `process.env.NODE_ENV` (and `mode`); set both to `development` or run them in separate child processes.
- `build` returns `RolldownOutput | RolldownOutput[] | RolldownWatcher`.
