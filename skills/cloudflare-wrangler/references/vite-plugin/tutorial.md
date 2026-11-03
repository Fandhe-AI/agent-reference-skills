---
source: https://developers.cloudflare.com/workers/vite-plugin/tutorial/
---

# Tutorial - React SPA with an API

Adapt a Vite React project to the Cloudflare Vite plugin: SPA served as static assets, plus an API Worker, then build, preview and deploy. Much applies to other Vite projects and frameworks.

## Signature / Usage

Scaffold and install (run the following commands from the new project directory):

Adapted (not in the official docs): `cd cloudflare-vite-tutorial` added so `npm i -D` runs inside the scaffolded project; see Notes.

```
npm create vite@latest -- cloudflare-vite-tutorial --template react-ts
cd cloudflare-vite-tutorial
npm i -D @cloudflare/vite-plugin wrangler
```

`vite.config.ts` (add the plugin after the framework plugin):

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

`wrangler.jsonc` (SPA only):

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

`.gitignore` additions:

```txt
.wrangler
.dev.vars*
```

Workers types and `tsconfig.worker.json`:

```
npm i -D @cloudflare/workers-types
```

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

Root `tsconfig.json` reference:

```jsonc
{
	"files": [],
	"references": [
		{ "path": "./tsconfig.app.json" },
		{ "path": "./tsconfig.node.json" },
		{ "path": "./tsconfig.worker.json" },
	],
}
```

Config with the Worker entrypoint:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "my-app",
  // Set this to today's date
  "compatibility_date": "2026-11-03",
  "main": "./worker/index.ts",
  "upload_source_maps": true,
  "assets": {
    "not_found_handling": "single-page-application"
  }
}
```

`worker/index.ts`:

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

Explicit routes with `run_worker_first`:

Adapted (not in the official docs): `name` kept as `my-app` (the official page switches it to `cloudflare-vite-tutorial` here); see Notes.

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "my-app",
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

Client call from `src/App.tsx` (the button handler):

```tsx
<button
	onClick={() => {
		fetch("/api/")
			.then((res) => res.json() as Promise<{ name: string }>)
			.then((data) => setName(data.name));
	}}
	aria-label="get name"
>
	Name from API is: {name}
</button>
```

Build, preview, deploy:

```
npm run build
npm run preview
npx wrangler deploy
```

## Notes

- Adapted from the official docs: the official page only says to open the `cloudflare-vite-tutorial` directory in your editor before `npm i -D ...`; an explicit `cd cloudflare-vite-tutorial` was added so the install and all later commands (`npm run build`, `npx wrangler deploy`) run in the project directory. `npm i -D` also installs the template's existing dependencies, so no separate `npm install` is needed.
- Corrected from the official docs: the official page uses `"name": "my-app"` in the first two configs but `"name": "cloudflare-vite-tutorial"` in the `run_worker_first` config; deploying would then create a different Worker. `my-app` is used throughout (the project directory is still `cloudflare-vite-tutorial`).
- Equivalent `wrangler.toml` forms exist for each config shown (e.g. `[assets]` with `not_found_handling = "single-page-application"` and `run_worker_first = ["/api/*"]`).
- `not_found_handling: "single-page-application"` serves `index.html` for all not-found requests (needed for React Router and other client-side routing). With the plugin, `assets` routing config replaces Vite's default behavior so dev matches production.
- The `directory` field is not used when configuring assets with Vite; the output config points to the client build output automatically.
- The Worker config you provide is the input; `vite build` creates a separate output `wrangler.json` (snapshot referencing build artifacts) used for preview and deployment. `wrangler deploy` uses it automatically.
- The Worker is invoked for any non-navigation request that does not match a static asset. For top-level navigation requests the browser sends `Sec-Fetch-Mode: navigate`; if present and the URL matches no static asset, `not_found_handling` runs instead of the Worker. Providing `run_worker_first` route patterns opts out of this header interpretation.
- Build output: client in `dist/client`; Worker code alongside the output `wrangler.json` in `dist`.
- `vite preview` runs the build output locally in the Workers runtime.
- Editing client and Worker code in dev preserves UI state (HMR).
- The tutorial text refers to `api/index.ts` in places while the Worker file created is `worker/index.ts`; docs inconsistency.
- Next steps suggested: add bindings (KV, D1), more routes, a library such as Hono or tRPC in the API Worker.
- Vite itself (config, Environment API, build): see the vite skill. This plugin only adds the Cloudflare Workers runtime integration.

## Related

- [get-started.md](./get-started.md)
- [static-assets.md](./static-assets.md)
- [api.md](./api.md)
