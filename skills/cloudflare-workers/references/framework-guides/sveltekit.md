---
source: https://developers.cloudflare.com/workers/framework-guides/web-apps/sveltekit/
---

# SvelteKit

Deploy SvelteKit to Workers with `@sveltejs/adapter-cloudflare`.

## Signature / Usage

```sh
npm create cloudflare@latest -- my-svelte-app --framework=svelte
```

```sh
npm run dev
npm run deploy
```

Autoconfig for an existing project generates `main` `.svelte-kit/cloudflare/_worker.js`, `assets.directory` `.svelte-kit/cloudflare`, `nodejs_compat`, observability, and the adapter in `svelte.config.js`.

First deploy of an existing project can fail with `Types file not found`:

```txt
✘ [ERROR] Types file not found at worker-configuration.d.ts.
```

Fix once:

```sh
npx wrangler types
npx wrangler deploy
```

## Notes

- Cause: `sv add` adds `wrangler types --check` to the `build` script before the types file exists.
- Bindings: configuration and access in hooks and endpoints are documented in the SvelteKit adapter-cloudflare docs (Runtime APIs).

## Related

- [automatic-configuration.md](./automatic-configuration.md)
- [overview.md](./overview.md)
