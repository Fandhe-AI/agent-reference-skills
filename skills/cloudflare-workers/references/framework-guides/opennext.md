---
source: https://developers.cloudflare.com/workers/framework-guides/web-apps/opennext/
---

# OpenNext adapter

Maintain an existing Next.js app on Workers with `@opennextjs/cloudflare`. Cloudflare recommends vinext for new apps.

## Signature / Usage

```sh
npm i @opennextjs/cloudflare@latest
npm i -D wrangler@latest
```

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "my-app",
  "main": ".open-next/worker.js",
  "upload_source_maps": true,
  // Set this to today's date
  "compatibility_date": "2026-11-03",
  "compatibility_flags": [
    "nodejs_compat"
  ],
  "assets": {
    "directory": ".open-next/assets",
    "binding": "ASSETS"
  },
  "observability": {
    "enabled": true
  }
}
```

```ts
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig();
```

```json
{
  "scripts": {
    "preview": "opennextjs-cloudflare build && opennextjs-cloudflare preview",
    "deploy": "opennextjs-cloudflare build && opennextjs-cloudflare deploy",
    "cf-typegen": "wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts"
  }
}
```

## Notes

- Requires the `nodejs_compat` flag and a compatibility date of `2024-09-23` or later.
- Supported: App Router, Pages Router, Route Handlers, RSC, SSG, SSR, ISR, Server Actions, streaming, `next/after`, Middleware, image optimization (via Cloudflare Images), PPR (experimental), `"use cache"` (experimental). Not yet supported: Node.js in Middleware (Next.js 15.2+).
- Wrangler autoconfig uses vinext for Next.js, so OpenNext must be configured manually.
- Workers Builds: configure environment variables under Build variables and secrets so the Next.js build sees `NEXT_PUBLIC_` and non-public variables.
- Next.js APIs: see the nextjs-app skill.

## Related

- [nextjs-vinext.md](./nextjs-vinext.md)
- [automatic-configuration.md](./automatic-configuration.md)
