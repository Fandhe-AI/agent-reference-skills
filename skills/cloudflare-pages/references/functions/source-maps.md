---
source: https://developers.cloudflare.com/pages/functions/source-maps/
---

# Source maps and stack traces

Upload source maps so uncaught-exception stack traces in real-time logs map back to original source.

## Signature / Usage

Enable with the Wrangler configuration file (Pages build environment) or the `--upload-source-maps` flag on `wrangler pages deploy`:

```jsonc
{
	"upload_source_maps": true
}
```

```toml
upload_source_maps = true
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `upload_source_maps` | boolean | — | Wrangler generates and uploads source map files on `wrangler pages deploy`. |
| `--upload-source-maps` | flag | — | Same behavior as a deploy flag. |
| Max source map size, gzipped | limit | 15 MiB | — |
| Max source map size, encoded (uncompressed) | limit | 60 MiB | — |

## Notes

- Cloudflare recommends Workers (with static assets) for new projects — see the cloudflare-workers skill (static-assets, including migrate-from-pages).
- Open beta; minimum Wrangler version 3.60.0.
- The map is fetched after the invocation completes (asynchronous, no CPU impact). Source maps are not available at runtime, so `console.log(error.stack)` is not deobfuscated.
- View traces while streaming real-time logs.

## Related

- [debugging-and-logging.md](./debugging-and-logging.md)
- [wrangler-configuration-keys.md](./wrangler-configuration-keys.md)
