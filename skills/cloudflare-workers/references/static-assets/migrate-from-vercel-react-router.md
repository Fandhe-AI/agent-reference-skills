---
source: https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/react-router/
---

# Migrate React Router and Remix from Vercel

Move a Remix v2 or React Router v7 application from Vercel to Cloudflare Workers. React Router v7 framework mode is the successor to Remix, and Cloudflare supports Remix applications through React Router and the Cloudflare Vite plugin. If your application uses Remix v2, upgrade to React Router v7 first and ship that upgrade on Vercel before switching hosting.

## Signature / Usage

Upgrade Remix v2 to React Router v7 (skip if already on v7):

```sh
npx codemod remix/2/react-router/upgrade
```

Remove whichever of these Vercel packages your project uses, then install the Cloudflare Vite plugin:

```sh
npm uninstall @vercel/react-router @vercel/remix @vercel/analytics @vercel/speed-insights
npm i -D @cloudflare/vite-plugin wrangler vite@^7
```

Add the Cloudflare plugin to `vite.config.ts`, before `reactRouter()`:

```ts
import { cloudflare } from "@cloudflare/vite-plugin";
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [cloudflare({ viteEnvironment: { name: "ssr" } }), reactRouter()],
});
```

Turn on the Vite Environment API in `react-router.config.ts`:

```ts
import type { Config } from "@react-router/dev/config";

export default {
	ssr: true,
	future: {
		v8_viteEnvironmentApi: true,
	},
} satisfies Config;
```

Create the Worker entry file `workers/app.ts`:

```ts
import { createRequestHandler } from "react-router";

declare module "react-router" {
	export interface AppLoadContext {
		cloudflare: { env: Env; ctx: ExecutionContext };
	}
}

const requestHandler = createRequestHandler(
	() => import("virtual:react-router/server-build"),
	import.meta.env.MODE,
);

export default {
	fetch(request, env, ctx) {
		return requestHandler(request, { cloudflare: { env, ctx } });
	},
} satisfies ExportedHandler<Env>;
```

Create a Wrangler configuration file:

```jsonc
{
	"$schema": "node_modules/wrangler/config-schema.json",
	"name": "<YOUR_PROJECT_NAME>",
	"main": "./workers/app.ts",
	// Set this to today's date
	"compatibility_date": "2026-11-14",
	"observability": {
		"enabled": true,
	},
	"upload_source_maps": true,
}
```

Add a `public/_headers` file so hashed assets keep a one-year cache:

```txt
/assets/*
  Cache-Control: public, max-age=31536000, immutable
```

Read bindings in loaders and actions from `context.cloudflare.env`:

```ts
export function loader({ context }: Route.LoaderArgs) {
	return { value: context.cloudflare.env.MY_VAR };
}
```

Generate types, build, preview, and deploy:

```sh
npx wrangler types
npm run build
npx vite preview
npx wrangler deploy
```

## Notes

- SPA mode (`ssr: false`) is not supported with the Cloudflare Vite plugin. Prerendering requires React Router 7.13.1 or later with the `future.unstable_previewServerPrerendering` flag. Check `react-router.config.ts` before you start.
- Do not use automatic project configuration on a Remix v2 application: it detects the application as a static site. This guide uses React Router v7, so install `@react-router/*` packages with `@^7`, because unpinned installs can resolve a newer major version. The framework guide ([../framework-guides/react-router.md](../framework-guides/react-router.md)) targets React Router v8; the two official pages use different majors.
- Codemod follow-up steps: replace `@vercel/remix` with `@vercel/react-router` so you can ship the upgrade on Vercel first, set `isbot` to `^5`, remove `installGlobals()`, create `app/routes.ts` with `flatRoutes()` and install `@react-router/fs-routes@^7`, rewrite every `@remix-run/*` and `@vercel/remix` import to `react-router`, delete `node_modules` and your lockfile, then reinstall, build, test, and deploy the upgrade on Vercel.
- Remove `vercelPreset()`, `vercel.json`, `<Analytics />`, `<SpeedInsights />`, and any route `export const config`. If `vercelPreset()` generated `app/entry.server.jsx`, delete that file too.
- Create `app/entry.server.tsx` with an entry that uses `renderToReadableStream` (replace your existing `entry.server` file if it uses Node.js streams). Without it every SSR route returns `500` with `renderToPipeableStream is not a function`, because the React Router default entry uses `renderToPipeableStream`; see the React Router starter template in the Cloudflare templates repository.
- Troubleshooting: `Could not load virtual:react-router/server-manifest` means the `v8_viteEnvironmentApi` future flag is missing or `vercelPreset()` is still configured; React Router 7.10 or later rejects `unstable_viteEnvironmentApi` (renamed to `v8_viteEnvironmentApi`); install failures with `ERESOLVE` come from `@vercel/remix` pinning Remix 2 (remove it, upgrade Vite, reinstall from a clean lockfile); Remix `?_data` requests stop working because React Router v7 uses `/<route>.data` endpoints.
- For Remix 3 use [../framework-guides/remix.md](../framework-guides/remix.md). Shared steps: [migrate-from-vercel.md](./migrate-from-vercel.md).
- Source: https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/react-router/ (cloudflare-docs production 34d908a, fetched 2026-11-14)

## Related

- [migrate-from-vercel.md](./migrate-from-vercel.md)
- [../framework-guides/react-router.md](../framework-guides/react-router.md)
