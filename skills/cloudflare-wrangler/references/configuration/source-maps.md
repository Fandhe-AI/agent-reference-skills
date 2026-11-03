---
source: https://developers.cloudflare.com/workers/wrangler/configuration/#source-maps
---

# Source Maps (`upload_source_maps`)

Source maps translate compiled and minified code back to the original code and are combined with the runtime stack trace.

## Signature / Usage

```jsonc
{
	"upload_source_maps": false,
}
```

```toml
upload_source_maps = false
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `upload_source_maps` | `boolean` optional | Controls whether Wrangler generates and uploads source map files on `wrangler deploy`, `wrangler versions upload`, or `wrangler preview`. |

Behavior by value:

| Value | Behavior |
|-------|----------|
| unset | Uploads source maps and skips any it cannot resolve. Default from Wrangler 4.150.0; earlier versions only upload when `true`. |
| `true` | Fails the upload if a source map cannot be resolved. |
| `false` | Does not upload source maps. |

## Notes

- Source maps are uploaded by default for JavaScript and TypeScript Workers. Frameworks and custom builds must also generate maps.

## Related

- [top-level-keys.md](./top-level-keys.md)
- [custom-builds.md](./custom-builds.md)
