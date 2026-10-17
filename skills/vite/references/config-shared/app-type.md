---
source: https://vite.dev/config/shared-options#apptype
---

# appType

Whether the app is a SPA, an MPA, or a custom application (SSR and frameworks with custom HTML handling).

## Signature / Usage

```js
import { defineConfig } from 'vite'

export default defineConfig({
  appType: 'custom',
})
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `appType` | `'spa' \| 'mpa' \| 'custom'` | `'spa'` | `'spa'`: include HTML middlewares and use SPA fallback (configures sirv with `single: true` in preview). `'mpa'`: include HTML middlewares. `'custom'`: do not include HTML middlewares. |

## Related

- [server.middlewareMode](../config-dev/server-middleware-mode.md)
- SSR dev server
- [Multi-page app](../build-deploy/multi-page-app.md)
