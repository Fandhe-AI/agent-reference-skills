---
source: https://developers.cloudflare.com/workers/vite-plugin/tutorial/
---

# Vite React SPA with an API Worker

Adapt a Vite React project to the Cloudflare Vite plugin, add an API Worker, then build, preview, and deploy.

Scaffold:

```sh
npm create vite@latest -- cloudflare-vite-tutorial --template react-ts
```

Install (from inside the new project directory):

Adapted (not in the official docs): added `cd` so the install runs in the scaffolded project; see Notes.

```sh
cd cloudflare-vite-tutorial
npm i -D @cloudflare/vite-plugin wrangler
```

`vite.config.ts`:

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

`wrangler.jsonc`:

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

`.gitignore`:

```txt
.wrangler
.dev.vars*
```

Dev server:

```sh
npm run dev
```

Build:

```sh
npm run build
```

Preview:

```sh
npm run preview
```

Deploy:

```sh
npx wrangler deploy
```

## Notes

- Place `cloudflare()` after the framework plugin. The plugin reads `wrangler.jsonc`, `wrangler.json`, or `wrangler.toml` from the project root; `assets.directory` is not used with Vite.
- `vite build` writes an output `wrangler.json` into `dist`; `wrangler deploy` uses it automatically.
- To control which routes invoke the Worker explicitly, add `"run_worker_first": ["/api/*"]` under `assets` (opts out of the `Sec-Fetch-Mode: navigate` implicit routing).
- Vite and Vite plugin APIs themselves belong to the `vite` skill; this sample covers only the Cloudflare plugin wiring.
- Adapted from the official docs: the tutorial says only "open the `cloudflare-vite-tutorial` directory"; the `cd` line makes the install and later commands run inside the scaffolded project. The Wrangler `name` (`my-app`) differs from the directory name as in the tutorial.
- The `ExportedHandler` type in `worker/index.ts` comes from `@cloudflare/workers-types` or `wrangler types` output; the tutorial installs the former in a later step (not needed for `vite build`).
- Docs inconsistency: the tutorial's client step says "Edit `api/index.ts`" although the Worker lives in `worker/index.ts`.
- See [../references/vite-plugin/README.md](../references/vite-plugin/README.md).
