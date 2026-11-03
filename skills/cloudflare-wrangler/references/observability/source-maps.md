---
source: https://developers.cloudflare.com/workers/observability/source-maps/
---

# Source maps and stack traces

Source maps translate bundled, transpiled and minified code back to your original source so unhandled-exception stack traces show original file names and line numbers.

## Signature / Usage

Source maps are uploaded by default from Wrangler 4.150.0 (on `wrangler deploy`, `wrangler versions upload`, `wrangler preview`). By default Wrangler skips maps it cannot resolve (inline `data:` maps, missing `sourceMappingURL` file). To fail the upload instead, set `upload_source_maps` to `true`; on earlier Wrangler versions maps upload only when it is `true`:

```jsonc
{
	"upload_source_maps": true
}
```

```toml
upload_source_maps = true
```

Disable uploads:

```jsonc
{
	"upload_source_maps": false
}
```

```toml
upload_source_maps = false
```

You can also pass `--no-upload-source-maps` to `wrangler deploy` or `wrangler versions upload`.

Cloudflare Vite plugin before 1.64.0: enable external maps for the Worker environment (named `my_worker` here):

```ts
import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
	plugins: [cloudflare()],
	environments: {
		my_worker: {
			build: { sourcemap: true },
		},
	},
});
```

## Options / Props

| Description | Limit |
| --- | --- |
| Maximum source map size, gzipped | 15 MiB |
| Maximum source map size, encoded (uncompressed) | 60 MiB |

## Notes

- Minimum Wrangler version for source maps: 3.46.0.
- `cf deploy` also uploads source maps by default (every map in the build output). `cf build` generates them for Workers built with the Cloudflare Vite plugin 1.64.0 or later, or Wrangler 4.151.0 or later. To opt out, disable source map generation in your build.
- Frameworks and custom builds: the bundler must generate maps; Wrangler only uploads maps that exist in the build output. The Vite plugin generates external maps for the Worker environment by default from 1.64.0 (unless you set Vite's `build.sourcemap` or the Worker's `upload_source_maps`), not for the client environment. Use `ssr` when your framework assigns the Worker to that environment. The plugin adds `upload_source_maps: true` to its output configuration when map generation is enabled; explicit `upload_source_maps: false` disables uploads. For other tools, emit external map files, preserve `sourceMappingURL` references, and keep server maps out of public assets.
- With the Vite plugin you can instead set `build.sourcemap` to `false` for the Worker environment.
- Stack traces: on an uncaught exception Cloudflare fetches the source map and maps the stack trace. Visible in real-time logs, Tail Workers, and Workers Issues.
- The map is retrieved asynchronously after the invocation completes, with no CPU impact. Source maps are not accessible inside the Worker at runtime: `console.log(error.stack)` is not deobfuscated. Remapping is line-by-line; unmappable lines are left unchanged.
- Miniflare can also output source maps for local development or testing (https://miniflare.dev/developing/source-maps).

## Related

- [real-time-logs.md](./real-time-logs.md)
- [tail-workers.md](./tail-workers.md)
- [issues.md](./issues.md)
- [errors.md](./errors.md)
- [profiling-in-production.md](./profiling-in-production.md)
- [../configuration/source-maps.md](../configuration/source-maps.md)
- [../commands/workers.md](../commands/workers.md)
