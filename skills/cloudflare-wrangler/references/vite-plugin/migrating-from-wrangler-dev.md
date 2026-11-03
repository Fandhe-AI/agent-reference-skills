---
source: https://developers.cloudflare.com/workers/vite-plugin/reference/migrating-from-wrangler-dev/
---

# Migrating from wrangler dev

Key differences when moving from `wrangler dev` to the Cloudflare Vite plugin; otherwise follow Get started.

## Signature / Usage

Deploying a specific Cloudflare environment (replaces `wrangler deploy --env some-env`):

```sh
CLOUDFLARE_ENV=some-env vite build
```

## Options / Props

Wrangler options replaced by Vite equivalents:

| Wrangler option | Vite equivalent |
| --- | --- |
| `define` | `define` (https://vite.dev/config/shared-options.html#define) |
| `alias` | `resolve.alias` (https://vite.dev/config/shared-options.html#resolve-alias) |
| `minify` | `build.minify` (https://vite.dev/config/build-options.html#build-minify) |
| Local dev settings (`ip`, `port`, `local_protocol`, etc.) | Server options (https://vite.dev/config/server-options.html) |

## Notes

- Input vs output config: the Worker config file (e.g. `wrangler.jsonc`) is the input; the build creates a separate output config, a snapshot modified to reference build artifacts. It is used for preview and deployment. After `vite build`, `wrangler deploy` and `vite preview` locate it automatically.
- Cloudflare Environments are applied at dev and build time, so `wrangler deploy --env some-env` is not applicable.
- Ignored options produce console warnings with suggestions.
- Not applicable (handled by Vite): `tsconfig`, `rules`, `build`, `no_bundle`, `find_additional_modules`, `base_dir`, `preserve_file_names`.
- Not supported: `site` (use Workers Assets instead).
- Inferred: if `build.sourcemap` is enabled for a Worker environment in the Vite config, `"upload_source_maps": true` is added to the output Wrangler config. Enable map generation for every JavaScript or TypeScript Worker environment so captured exception stacks point to original source. Setting `upload_source_maps` alone does not generate maps in a Vite build. Set `upload_source_maps` explicitly in the input config to override.
- Vite itself (config, Environment API, build): see the vite skill. This plugin only adds the Cloudflare Workers runtime integration.

## Related

- [cloudflare-environments.md](./cloudflare-environments.md)
- [vite-environments.md](./vite-environments.md)
- [get-started.md](./get-started.md)
