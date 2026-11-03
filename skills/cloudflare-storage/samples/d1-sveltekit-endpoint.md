---
source: https://developers.cloudflare.com/d1/examples/d1-and-sveltekit/
---

# Query D1 from SvelteKit

Query D1 from a SvelteKit server endpoint via `platform.env.DB`, with app types and the Cloudflare adapter configured.

Adapted (not in the official docs): the handler is typed with the imported `RequestHandler` (the official `GET` parameters are implicitly `any` and the import is unused) and `platform` is checked for `undefined`; see Notes.

```ts
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ platform }) => {
	try {
		if (!platform) {
			throw new Error("Cloudflare platform bindings are not available");
		}
		let result = await platform.env.DB.prepare(
			"SELECT * FROM users LIMIT 5",
		).run();
		return new Response(JSON.stringify(result), {
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		return Response.json({ error: "Failed to fetch users" }, {
			status: 500
		});
	}
};
```

```ts
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		interface Platform {
			env: {
				DB: D1Database;
			};
			context: {
				waitUntil(promise: Promise<any>): void;
			};
			caches: CacheStorage & { default: Cache };
		}
	}
}

export {};
```

```js
import adapter from "@sveltejs/adapter-cloudflare";

export default {
	kit: {
		adapter: adapter({
			// See below for an explanation of these options
			routes: {
				include: ["/*"],
				exclude: ["<all>"],
			},
		}),
	},
};
```

## Notes

- The endpoint lives at `src/routes/api/users/+server.ts` (served at `/api/users`); the types go in `src/app.d.ts`; the adapter config in `svelte.config.js`. Install with `npm i -D @sveltejs/adapter-cloudflare`.
- Adapted from the official docs: `export async function GET({ request, platform })` became a typed `RequestHandler` that checks `platform` (typed `App.Platform | undefined` by SvelteKit) before using `platform.env.DB`; the unused `request` parameter was dropped. The query and JSON responses are unchanged.
- SvelteKit on Pages: see the cloudflare-pages skill (https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-kit-site/).
- Related: [D1 README](../references/d1/README.md), [prepared-statements](../references/d1/prepared-statements.md).
