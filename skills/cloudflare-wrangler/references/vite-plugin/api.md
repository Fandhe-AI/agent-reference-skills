---
source: https://developers.cloudflare.com/workers/vite-plugin/reference/api/
---

# API

`cloudflare()` is the plugin factory; it accepts an optional `PluginConfig`. Auxiliary Workers use `AuxiliaryWorkerConfig`.

## Signature / Usage

```ts
import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
	plugins: [cloudflare()],
});
```

## Options / Props

`interface PluginConfig`

| Name | Type | Description |
|------|------|-------------|
| `configPath` | `string` (optional) | Path to the entry Worker config file. Resolution order for the entry Worker: `configPath`, then `CLOUDFLARE_VITE_WRANGLER_CONFIG_PATH` (typically set by a framework or other external tool), then `wrangler.jsonc` / `wrangler.json` / `wrangler.toml` in the application root. Applies in `vite dev` and `vite build`. |
| `config` | `WorkerConfigCustomizer<true>` (optional) | Customize or override Worker configuration programmatically. Accepts a partial configuration object or a function that receives the current config. Applied after any config file loads. Use it to override values, modify the existing config, or define Workers entirely in code. |
| `viteEnvironment` | `{ name?: string; childEnvironments?: string[] }` (optional) | Vite environment options. By default the environment name is the Worker name with `-` replaced with `_`; setting the name here overrides this. Typical use: `viteEnvironment: { name: "ssr" }` to apply the Worker to the SSR environment. `childEnvironments` supports React Server Components via `@vitejs/plugin-rsc` and frameworks built on it, embedding additional environments with separate module graphs inside a single Worker. |
| `persistState` | `boolean \| { path: string }` (optional) | Override state persistence. Default persists to `.wrangler/state`. Provide a custom `path`, or `false` to disable persistence. |
| `inspectorPort` | `number \| false` (optional) | Override debugging. Default: inspector enabled on port `9229`. Provide a custom port, or `false` to disable. |
| `tunnel` | `boolean \| { name?: string; autoStart?: boolean }` (optional) | Expose the local dev server over a Cloudflare Tunnel. Provide an object to configure a named tunnel or control auto start. Press `t + Enter` to start or close the tunnel. Set `tunnel.autoStart` to `true` to open the tunnel when Vite starts. |
| `auxiliaryWorkers` | `Array<AuxiliaryWorkerConfig>` (optional) | Additional Workers used as part of the application, callable from the entry Worker through service bindings. All requests are routed through the entry Worker. During the build, each Worker is output to a separate subdirectory of `dist`. |
| `remoteBindings` | `boolean` (optional) | Whether remote bindings are enabled. Defaults to `true`. |

`interface AuxiliaryWorkerConfig`

| Name | Type | Description |
|------|------|-------------|
| `configPath` | `string` (optional) | Path to the Worker config file. Required unless `config` is provided. |
| `config` | `WorkerConfigCustomizer<false>` (optional) | Customize or override Worker configuration programmatically. Without `configPath`, defines auxiliary Workers entirely in code. |
| `viteEnvironment` | `{ name?: string; childEnvironments?: string[] }` (optional) | Same semantics as in `PluginConfig`: default name is the Worker name with `-` replaced by `_`; `childEnvironments` supports React Server Components. |

Tunnel example:

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

## Notes

- Auxiliary Workers require a `configPath`, a `config` option, or both. `CLOUDFLARE_VITE_WRANGLER_CONFIG_PATH` only applies to the entry Worker; set `configPath` explicitly for an auxiliary Worker that uses a config file.
- `wrangler deploy` deploys only the entry Worker. Each auxiliary Worker must be deployed individually: inspect `dist`, then run `wrangler deploy -c dist/<auxiliary-worker>/wrangler.json` for each.
- Vite itself (config, Environment API, build): see the vite skill. This plugin only adds the Cloudflare Workers runtime integration.

## Related

- [programmatic-configuration.md](./programmatic-configuration.md)
- [vite-environments.md](./vite-environments.md)
- [debugging.md](./debugging.md)
