---
source: https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-kit-site/
---

# SvelteKit

Use `@sveltejs/adapter-cloudflare` (installed automatically by C3); the build directory is `.svelte-kit/cloudflare`, and bindings arrive on `platform.env`.

## Signature / Usage

```
npm create cloudflare@latest -- my-svelte-app --framework=svelte --platform=pages
```

Manual adapter setup: run `npm i --save-dev @sveltejs/adapter-cloudflare`, then change `svelte.config.js`:

```diff
- import adapter from '@sveltejs/adapter-auto';
+ import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    // ... truncated ...
  }
};

export default config;
```

TypeScript: declare `env`, `context` and `caches` on `App.Platform`:

```diff
declare namespace App {
    interface Locals {}

+   interface Platform {
+       env: {
+           COUNTER: DurableObjectNamespace;
+       };
+       context: {
+           waitUntil(promise: Promise<any>): void;
+       };
+       caches: CacheStorage & { default: Cache }
+   }

    interface Session {}

    interface Stuff {}
}
```

Access a binding in an endpoint:

Adapted (not in the official docs): the page uses the pre-1.0 `post(context)` endpoint name; SvelteKit endpoints are uppercase HTTP-method exports that must return a `Response` (see Notes).

```js
export async function POST({ platform }) {
	const counter = platform.env.COUNTER.idFromName("A");
	return new Response(counter.toString());
}
```

Pages Functions-equivalent request handler (SvelteKit endpoint behaving like `onRequestGet`):

```ts
import type { RequestHandler } from "./$types";

export const GET = (({ url }) => {
	return new Response(String(Math.random()));
}) satisfies RequestHandler;
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Framework preset | — | — | *SvelteKit* |
| Production branch | — | — | `main` |
| Build command | — | — | `npm run build` |
| Build directory | — | — | `.svelte-kit/cloudflare` |
| Build directory with `@sveltejs/adapter-static` | — | — | `build` (configure the Pages application's build directory accordingly) |

### Other adapters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `@sveltejs/adapter-auto` | — | SvelteKit default | Chooses the adapter for the current environment. For local builds provide `CF_PAGES=1` so it can detect Pages, for example `CF_PAGES=1 vite build` |
| `@sveltejs/adapter-static` | — | — | Client-side static assets only (no SSR); compatible with Pages |

## Notes

- For new projects Cloudflare recommends Workers; see cloudflare-workers framework-guides.
- Corrected from the official docs: the page's binding example is `export async function post(context)` using `context.platform.env`, which is not a valid SvelteKit endpoint (handlers are uppercase method names receiving a request event and returning a `Response`); the snippet above uses `POST({ platform })` and returns a `Response`.
- The page's `App` declaration still lists `Session` and `Stuff`; these are verbatim from the official page and are not used by current SvelteKit versions.
- SvelteKit compiles to a single `_worker.js`; files in the project's `/functions` directory are not included in the deployment. Write standard SvelteKit request handlers instead (https://kit.svelte.dev/docs/routing#server).
- If you use any adapter other than the default one, commit and push the adapter change before deploying.
- C3 installs the Wrangler CLI and the adapter and offers to deploy immediately.
- SvelteKit APIs themselves are out of scope for this skill.

## Related

- [overview.md](./overview.md)
- [astro.md](./astro.md)
