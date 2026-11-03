---
source: https://developers.cloudflare.com/workers/framework-guides/web-apps/vike/
---

# Vike

Deploy Vike (SSR / SPA / SSG) to Workers with the `vike-photon` extension and `@photonjs/cloudflare`.

## Signature / Usage

```sh
npm i wrangler vike-photon @photonjs/cloudflare
```

```diff
 import type { Config } from 'vike/types'
+ import vikePhoton from 'vike-photon/config'

  export default {
+   extends: [vikePhoton]
  } satisfies Config
```

```diff
 {
    "scripts": {
      "dev": "vike dev",
+     "preview": "vike build && vike preview",
+     "deploy": "vike build && wrangler deploy"
    }
  }
```

```diff
+ {
+   "$schema": "node_modules/wrangler/config-schema.json",
+   "compatibility_date": "2025-08-06",
+   "name": "my-vike-cloudflare-app",
+   "main": "virtual:photon:cloudflare:server-entry",
+   // Only required if your app depends a Node.js API
+   "compatibility_flags": ["nodejs_compat"]
+ }
```

Bindings:

```ts
import { env } from 'cloudflare:workers'
// Key-value store
env.KV.get('my-key')
// Environment variable
env.LOG_LEVEL
// ...
```

TypeScript: run `npx wrangler types`, then include the generated file:

```diff
 {
    "compilerOptions": {
+     "types": ["./worker-configuration.d.ts"]
   }
  }
```

## Notes

- New app: scaffold at vike.dev/new. `npm create vike@latest -- --react --hono --drizzle --cloudflare` creates an app with Cloudflare D1.
- Add `.wrangler/` to `.gitignore`.
- Photon's built-in server supports basic features such as SSR; create your own server for file uploads or API routes.
- Autoconfig output: `main` `dist/server/index.js`, assets `dist/client`.
- Docs example pins `compatibility_date` to `2025-08-06`; use the current date for new projects.

## Related

- [overview.md](./overview.md)
- [automatic-configuration.md](./automatic-configuration.md)
