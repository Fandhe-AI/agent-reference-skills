---
source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting
---

# Deploy

Per-host build/deploy commands for TanStack Start. See `../references/deployment/README.md` for the full per-host explanation and `vite.config.ts` plugin setup.

## Cloudflare Workers (official partner)

> **警告**: `wrangler deploy` publishes the app live on Cloudflare Workers. Confirm the target environment/account before running.

```bash
pnpm add -D @cloudflare/vite-plugin wrangler
```

```bash
npx wrangler login
```

```bash
wrangler whoami
```

```bash
npm run build && wrangler deploy
```

Add a `deploy` script to `package.json` (`"deploy": "npm run build && wrangler deploy"`) and run `pnpm run deploy`. Requires `@cloudflare/vite-plugin` configured in `vite.config.ts` and a `wrangler.jsonc` config file.

```bash
wrangler types
```

Regenerates Cloudflare type bindings (wire up as a `cf-typegen` script).

## Netlify (official partner)

> **警告**: `netlify deploy` auto-configures and links a new site on first run, publishing it to Netlify. Confirm the linked site/team before running.

```bash
pnpm add --save-dev @netlify/vite-plugin-tanstack-start
```

```bash
npx netlify deploy
```

New projects are auto-configured by the Netlify CLI on first `netlify deploy`; a manual `netlify.toml` (`command = "vite build"`, `publish = "dist/client"`) is an alternative.

## Railway (official partner)

Railway deployment is zero-config: follow the Nitro setup below, push to a GitHub repository, then connect the repository on railway.com. Railway auto-detects build settings and deploys — no additional CLI commands are documented.

## Nitro / Vercel

Underlying build/deploy layer for Vercel, Railway, Node.js, and Bun targets. Vercel and Railway deploy via this same Nitro setup with no host-specific CLI documented — Vercel via its one-click deployment process (its own platform CLI is out of scope here; see the `vercel` skill), Railway via connecting the repository as above.

```bash
npm install nitro
```

Configure `nitro/vite` as a Vite plugin in `vite.config.ts`, alongside `tanstackStart()`.

## Node.js / Docker

```bash
npm run build
```

```bash
npm run start
```

Requires `"build": "vite build"` and `"start": "node .output/server/index.mjs"` in `package.json` scripts (Vite builds). For Rsbuild builds served via `srvx`:

```bash
npm install srvx
```

```bash
srvx --prod -s ../client dist/server/index.js
```

## Bun

> **警告**: Bun-specific deployment currently requires React 19+. React 18 users should follow the Node.js / Docker instructions instead.

```bash
bun install react@19 react-dom@19
```

Configure `nitro({ preset: 'bun' })` in `vite.config.ts`, then:

```bash
bun run build
```

```bash
bun run server.ts
```

## Appwrite Sites

```bash
npx @tanstack/cli@latest create
```

Scaffold or reuse an existing project, push it to a GitHub repository, then connect the repository in the Appwrite dashboard ("Create site" → "Connect a repository"). Confirmed build settings: install command `npm install`, build command `npm run build`, output directory `./dist` (`./.output` if using Nitro v2/v3).
