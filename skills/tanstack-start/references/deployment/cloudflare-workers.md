---
source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting#cloudflare-workers--official-partner
---

# Cloudflare Workers

Official Hosting Partner. Deploys a TanStack Start app to Cloudflare Workers using `@cloudflare/vite-plugin` and `wrangler`.

## Signature / Usage

```bash
pnpm add -D @cloudflare/vite-plugin wrangler
```

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tanstackStart(),
    viteReact(),
  ],
})
```

```json
// wrangler.jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "tanstack-start-app",
  "compatibility_date": "2025-09-02",
  "compatibility_flags": ["nodejs_compat"],
  "main": "@tanstack/react-start/server-entry"
}
```

```json
// package.json (scripts)
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build && tsc --noEmit",
    "preview": "vite preview",
    "deploy": "npm run build && wrangler deploy",
    "cf-typegen": "wrangler types"
  }
}
```

## Notes

- Authenticate first with `npx wrangler login` (or `pnpm dlx wrangler login`); check the logged-in user with `wrangler whoami`.
- Remove the plain `"start": "node .output/server/index.mjs"` script when switching to Workers.
- Deploy with `pnpm run deploy`.
- A full example is available at `TanStack/router` `examples/react/start-basic-cloudflare`.
- Source: https://github.com/TanStack/router/blob/release-2026-11-08-0104/docs/start/framework/react/guide/hosting.md (tag `release-2026-11-08-0104`, `@tanstack/react-start` 1.169.5, fetched 2026-11-14) (section: Cloudflare Workers)
- Adapted from the official docs: e2e fixture links in the troubleshooting text point to tag `release-2026-11-08-0104` instead of `main`, so they match the pinned snapshot.

### Deployment fails even though the Vite build succeeds

If Wrangler reports a missing server entry or unresolved Start virtual modules, check whether your deployment command passes `--config wrangler.jsonc`. With the Cloudflare Vite plugin, that file is the build input. The plugin generates a deployment config with the built server entry and client assets, then writes `.wrangler/deploy/config.json` so Wrangler can find it. Forcing Wrangler to read the source config bypasses that redirect.

Run these commands from the application directory to validate the generated deployment without publishing:

```sh
pnpm run build
pnpm exec wrangler deploy --dry-run
```

Check that Wrangler reports the generated config under `dist`, rather than just the source `wrangler.jsonc`. Keep the source `main` set to `@tanstack/react-start/server-entry` or your custom server entry, and let the Vite plugin generate the deployment entry. Marking unresolved Start modules as external does not fix the missing build transformation.

If your build and deployment run in separate jobs, preserve the build output and `.wrangler/deploy/config.json` with their relative paths, or explicitly pass the generated deployment config. Do not edit generated files to repair the source configuration. See Cloudflare's [generated configuration documentation](https://developers.cloudflare.com/workers/wrangler/configuration/#generated-configuration) for how Wrangler finds that output.

For a named Cloudflare environment, select it when building. For example, if `env.staging` is defined in your source config:

```sh
CLOUDFLARE_ENV=staging pnpm run build
pnpm exec wrangler deploy --dry-run
```

The plugin resolves the environment into the generated config. A later `wrangler deploy --env staging` does not select a different built environment. See [Cloudflare environments](https://developers.cloudflare.com/workers/vite-plugin/reference/cloudflare-environments/).

The [Cloudflare fixture tests](https://github.com/TanStack/router/blob/release-2026-11-08-0104/e2e/react-start/basic-cloudflare/tests/app.spec.ts) exercise a generated-config dry run and preview the built app locally. A dry run validates packaging, it does not verify account permissions, a live domain, or deployed bindings.

## Related

- [Nitro](./nitro.md)
