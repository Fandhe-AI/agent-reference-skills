---
source: https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/
---

# Astro

Deploy an Astro SSR site on Pages Functions with the `@astrojs/cloudflare` adapter; bindings are reached through `locals.runtime.env`.

## Signature / Usage

```
npm create cloudflare@latest -- my-astro-app --framework=astro --platform=pages
```

C3 installs dependencies, including the Wrangler CLI and the `@astrojs/cloudflare` adapter. To add the adapter to an existing project:

```sh
npm run astro add cloudflare
```

Local runtime support is configured via the `platformProxy` option:

```js
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
	adapter: cloudflare({
		platformProxy: {
			enabled: true,
		},
	}),
});
```

Type the runtime in `env.d.ts` (generate runtime types with `wrangler types` first):

```typescript
/// <reference types="astro/client" />

type ENV = {
	// replace `MY_KV` with your KV namespace
	MY_KV: KVNamespace;
};

// use a default runtime configuration (advanced mode).
type Runtime = import("@astrojs/cloudflare").Runtime<ENV>;
declare namespace App {
	interface Locals extends Runtime {}
}
```

Access the KV namespace from an API endpoint:

Adapted (not in the official docs): the page uses a lowercase `get` that returns a plain object and never reads the binding; Astro endpoints are uppercase method exports returning a `Response` (see Notes).

```typescript
import type { APIContext } from "astro";

export async function GET({ locals }: APIContext) {
	const { MY_KV } = locals.runtime.env;
	const value = await MY_KV.get("key");

	return new Response(value);
}
```

Access the binding directly from an Astro component:

```typescript
---
const myKV = Astro.locals.runtime.env.MY_KV;
const value = await myKV.get("key");
---
<div>{value}</div>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Production branch | — | — | `main` |
| Build command | — | — | `npm run build` |
| Build directory | — | — | `dist` |
| `platformProxy.enabled` | — | — | Enables local runtime emulation through the adapter |

## Notes

- For new projects Cloudflare recommends Workers; see cloudflare-workers framework-guides.
- Corrected from the official docs: the endpoint example was `export async function get({ locals })` returning `{ // ... }`. The snippet uses `GET` and returns a `Response` after reading the binding.
- Legacy API: `locals.runtime.env`, `platformProxy` and the `Runtime` type are the adapter API shown on the official page (older `@astrojs/cloudflare` releases); newer releases expose the Cloudflare runtime differently and this snippet may not work with them, so check the Astro adapter documentation (https://docs.astro.build/en/guides/integrations-guide/cloudflare/#access-to-the-cloudflare-runtime) for the version you install.
- SSR sites render on Pages Functions. If Git is initialised by Astro's prompt, adjust the Git steps accordingly.
- Astro APIs themselves are out of scope for this skill.

## Related

- [overview.md](./overview.md)
- [sveltekit.md](./sveltekit.md)
