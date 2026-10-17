---
source: https://vite.dev/guide/api-javascript#preview
---

# preview / PreviewServer

Starts a server that serves the production build output locally, and returns a `PreviewServer`.

## Signature / Usage

```ts
async function preview(inlineConfig?: InlineConfig): Promise<PreviewServer>
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

```ts
interface PreviewServer {
  /**
   * The resolved vite config object
   */
  config: ResolvedConfig
  /**
   * A connect app instance.
   * - Can be used to attach custom middlewares to the preview server.
   * - Can also be used as the handler function of a custom http server
   *   or as a middleware in any connect-style Node.js frameworks
   *
   * https://github.com/senchalabs/connect#use-middleware
   */
  middlewares: Connect.Server
  /**
   * native Node http server instance
   */
  httpServer: http.Server
  /**
   * The resolved urls Vite prints on the CLI (URL-encoded). Returns `null`
   * if the server is not listening on any port.
   */
  resolvedUrls: ResolvedServerUrls | null
  /**
   * Print server urls
   */
  printUrls(): void
  /**
   * Bind CLI shortcuts
   */
  bindCLIShortcuts(options?: BindCLIShortcutsOptions<PreviewServer>): void
}
```

## Related

- [Preview options](../config-dev/preview-options.md)
- [vite preview CLI](../getting-started/cli-optimize-preview.md)
- [createServer](./create-server.md)
