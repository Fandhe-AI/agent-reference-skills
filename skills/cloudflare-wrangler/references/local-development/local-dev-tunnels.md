---
source: https://developers.cloudflare.com/workers/local-development/local-dev-tunnels/
---

# Share a local dev server

Expose a local Wrangler or Vite dev server over a Cloudflare Tunnel: a random `*.trycloudflare.com` hostname (Quick Tunnel) or a stable hostname (named tunnel).

## Signature / Usage

Wrangler: run `wrangler dev`, then press `[t]` to start or close the tunnel. Named tunnel:

```sh
npx wrangler dev --tunnel-name=my-tunnel
```

Open automatically at startup:

```sh
npx wrangler dev --tunnel
```

Vite plugin: run `vite dev`, then press `t + Enter` to start or close the tunnel. Named tunnel:

```ts
import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
	plugins: [
		cloudflare({
			tunnel: { name: "my-tunnel" },
		}),
	],
});
```

Set `tunnel.autoStart` to `true` to open the tunnel automatically when Vite starts.

With `vite preview`, Vite's preview host validation applies — add the hostnames to `preview.allowedHosts`:

```ts
import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
	preview: {
		allowedHosts: [
			// For Quick tunnels:
			".trycloudflare.com",
			// For named tunnels:
			".my-domain.com"
		],
	},
	plugins: [
		cloudflare({
			tunnel: { name: "my-tunnel" },
		}),
	],
});
```

## Notes

- The local development security considerations apply with or without a tunnel. A tunnel makes the dev server remotely reachable but adds no isolation around the local `workerd` process.
- Unless protected by access controls, anyone with the URL can reach the dev server. Watch ungated preview/admin endpoints, endpoints that execute user-supplied code, connected remote bindings, and code that proxies to private/internal services.
- With `vite dev`, HMR and module serving may expose source files, paths, or project structure; prefer `vite preview` to share a built preview.
- Local dev routes such as `/cdn-cgi/*` remain restricted and are not exposed over the tunnel.
- For a stable hostname or stricter access control, use a named tunnel protected by Cloudflare Access (restricts who can reach it, does not harden the runtime).

## Related

- [Local development](./overview.md)
- [Wrangler commands](../commands/README.md)
- [Cloudflare Vite plugin](../vite-plugin/README.md)
