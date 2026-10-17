---
source: https://vite.dev/config/server-options#server-forwardconsole
---

# server.forwardConsole

Forward browser runtime events to the Vite server console during development.

## Signature / Usage

```js
export default defineConfig({
  server: {
    forwardConsole: {
      unhandledErrors: true,
      logLevels: ['warn', 'error'],
    },
  },
})
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `server.forwardConsole` | `boolean \| { unhandledErrors?: boolean, logLevels?: ('error' \| 'warn' \| 'info' \| 'log' \| 'debug')[] }` | auto (`true` when an AI coding agent is detected based on `@vercel/detect-agent`, otherwise `false`) | `true` enables forwarding unhandled errors and `console.error` / `console.warn` logs |
| `unhandledErrors` | boolean | — | Forward uncaught exceptions and unhandled promise rejections |
| `logLevels` | array | — | Which `console.*` calls are forwarded |

## Notes

- Forwarded unhandled errors are logged in the server terminal with enhanced formatting, e.g. `1:18:38 AM [vite] (client) [Unhandled error] Error: this is test error` followed by a source frame.

## Related

- [server-hmr-ws.md](./server-hmr-ws.md)
