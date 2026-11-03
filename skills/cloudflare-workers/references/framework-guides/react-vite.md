---
source: https://developers.cloudflare.com/workers/framework-guides/web-apps/react/
---

# React + Vite

Deploy a React + Vite SPA, optionally with an API Worker, using the Cloudflare Vite plugin.

## Signature / Usage

```sh
npm create cloudflare@latest -- my-react-app --framework=react
```

Adapt an existing project:

```sh
npm i -D @cloudflare/vite-plugin wrangler
```

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
	plugins: [react(), cloudflare({ viteEnvironment: { name: "worker" } })],
	environments: {
		worker: { build: { sourcemap: true } },
	},
});
```

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "my-app",
  // Set this to today's date
  "compatibility_date": "2026-11-03",
  "assets": {
    "not_found_handling": "single-page-application"
  }
}
```

```txt
.wrangler
.dev.vars*
```

```sh
npm run build
npm run preview
npx wrangler deploy
```

Add an API Worker (`main` and `run_worker_first` for explicit routing):

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "cloudflare-vite-tutorial",
  // Set this to today's date
  "compatibility_date": "2026-11-03",
  "main": "./worker/index.ts",
  "upload_source_maps": true,
  "assets": {
    "not_found_handling": "single-page-application",
    "run_worker_first": [
      "/api/*"
    ]
  }
}
```

```ts
export default {
	fetch(request) {
		const url = new URL(request.url);

		if (url.pathname.startsWith("/api/")) {
			return Response.json({
				name: "Cloudflare",
			});
		}

		return new Response(null, { status: 404 });
	},
} satisfies ExportedHandler;
```

Worker TypeScript config (`tsconfig.worker.json`):

```jsonc
{
	"extends": "./tsconfig.node.json",
	"compilerOptions": {
		"tsBuildInfoFile": "./node_modules/.tmp/tsconfig.worker.tsbuildinfo",
		"types": ["@cloudflare/workers-types/2023-07-01", "vite/client"],
	},
	"include": ["worker"],
}
```

## Notes

- `not_found_handling = "single-page-application"` is required for React Router and other client-side routing.
- The `assets.directory` field is not used with the Vite plugin; it points at the client build output automatically.
- `vite build` writes an output `wrangler.json` snapshot into `dist`; `wrangler deploy` uses it automatically.
- Implicit routing: top-level navigation requests (`Sec-Fetch-Mode: navigate`) that match no asset trigger `not_found_handling` rather than the Worker. `run_worker_first` with an array of route patterns opts out of this.
- The React app cannot access bindings directly; call the Worker with `fetch()` and use bindings there.
- Docs inconsistency: the Vue page writes `not_found_handling = "single_page_application"` (underscores) in prose; the valid value is `single-page-application`.
- React APIs: see the react skill. Vite config: see the vite skill; the Cloudflare Vite plugin is covered by cloudflare-wrangler.

## Related

- [react-router.md](./react-router.md)
- [hono.md](./hono.md)
- [overview.md](./overview.md)
