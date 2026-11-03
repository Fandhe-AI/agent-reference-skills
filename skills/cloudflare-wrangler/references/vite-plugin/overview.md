---
source: https://developers.cloudflare.com/workers/vite-plugin/
---

# Vite plugin overview

The Cloudflare Vite plugin (`@cloudflare/vite-plugin`) integrates Vite with the Workers runtime. Worker code runs inside a local `workerd` process that closely matches the runtime APIs and behavior of deployed Workers.

## Signature / Usage

```ts
import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
	plugins: [cloudflare()],
});
```

## Notes

- Features: uses the Vite Environment API; direct access to Workers runtime APIs and bindings; builds front-end assets for deployment (static sites, SPAs, full-stack apps); produces standard Build Output for `cf build` and `cf deploy`; official support for TanStack Start and React Router v8 with SSR; Vite HMR; `vite preview` runs the build output in the Workers runtime.
- Use cases: TanStack Start, React Router v8, static sites / SPAs with or without a backend API, standalone Workers, multi-Worker applications.
- Miniflare is not a hardened sandbox. Do not use it to run untrusted or potentially malicious Worker code directly on your machine; run the whole development process inside a secure sandbox such as a virtual machine. The warning applies to `wrangler dev`, `vite dev`, `vite preview`, direct Miniflare use, and Miniflare-based testing tools. `remote: true` on a binding changes which resource is accessed but Worker code still executes locally; legacy `wrangler dev --remote` executes Worker code on Cloudflare.
- Vite itself (config, Environment API, build): see the vite skill. This plugin only adds the Cloudflare Workers runtime integration.
- Starting points: framework guides (TanStack Start, React Router, React, Vue) for templates; Get started for a standalone Worker; Tutorial for adapting an existing Vite project.

## Related

- [get-started.md](./get-started.md)
- [tutorial.md](./tutorial.md)
- [api.md](./api.md)
