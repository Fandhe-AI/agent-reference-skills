# vercel blob

Interact with Vercel Blob storage: upload, download, list, delete, copy files, and manage stores.

## Signature / Usage

```bash
vercel blob list
vercel blob put image.jpg --access public
vercel blob get https://... --output ./local.jpg
vercel blob del https://...
vercel blob copy [from-url] [to-pathname] --access public
vercel blob create-store my-store --access public
vercel blob list-stores
```

## Options / Props

| Name | Description |
|------|-------------|
| `--rw-token` | Blob read-write token (also read from `BLOB_READ_WRITE_TOKEN` env) |
| `--access` | **Required** for `put`, `copy`, `get`, `create-store`: `public` or `private` |
| `--limit` | Max results per page for `list` (default: 10, max: 1000) |
| `--cursor` | Pagination cursor for `list` |
| `--prefix` | Filter blobs by pathname prefix for `list` |
| `--mode` | List mode: `expanded` (default) or `folded` |
| `--pathname` | Destination pathname for `put` (default: filename) |
| `--content-type` | Override inferred content-type for `put` / `copy` |
| `--cache-control-max-age` | `max-age` in seconds for `put` / `copy` (default: 2592000 = 30 days) |
| `--add-random-suffix` | Add random suffix to filename on `put` / `copy` |
| `--allow-overwrite` | Overwrite existing blob on `put` (default: false) |
| `--multipart` | Upload in chunks for `put` (default: true) |
| `--output` | Save `get` content to file instead of stdout |
| `--if-match` | ETag conditional for `put`, `del`, `copy` |
| `--if-none-match` | ETag conditional for `get`; returns 304 if unchanged |
| `--region` | Storage region for `create-store` (default: `iad1`) |
| `--yes` | Skip confirmation for `delete-store`, `empty-store` |
| `--environment` | Environments to connect for `create-store` (repeatable) |
| `--all` | List all team stores regardless of project for `list-stores` |

## Notes

- Subcommands: `list` / `ls`, `put`, `del`, `copy` / `cp`, `get`, `create-store`, `delete-store`, `get-store`, `list-stores` / `ls-stores`, `empty-store`

## Related

- [env.md](./env.md)
