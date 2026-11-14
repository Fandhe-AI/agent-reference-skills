# vercel blob

Interact with Vercel Blob storage: upload, download, list, delete, copy files, and manage stores.

## Signature / Usage

```bash
vercel blob list
vercel blob put image.jpg --access public
vercel blob get https://... --output ./local.jpg
vercel blob delete [url-or-pathname] [--yes]
vercel blob copy [from-url] [to-pathname] --access public
vercel blob create-store my-store --access public
vercel blob list-stores
vercel blob put-image https://example.com/hero.png --pathname images/hero.webp --width 512 --quality 60 --format webp --access public
vercel blob get-store [store-id]
vercel blob delete-store [store-id]
vercel blob empty-store [--yes]
vercel blob list --next [cursor-value]
vercel blob put image.jpg --access private --force
vercel blob put image.jpg --access private --no-multipart
```

## Options / Props

| Name | Description |
|------|-------------|
| `--rw-token` | Blob read-write token (also read from `BLOB_READ_WRITE_TOKEN` env); fallback when OIDC is not available |
| `--oidc-token` / `--store` | OIDC credentials for `put-image`: Blob store ID via `--store` (or set `VERCEL_OIDC_TOKEN` and `BLOB_STORE_ID`); read-write tokens are not accepted for `put-image` |
| `--access` | **Required** for `put`, `put-image`, `copy`, `get`, `create-store`: `public` or `private` |
| `--width` | `put-image` (required): optimized width in pixels, 1-8192, aspect ratio preserved |
| `--quality` | `put-image`: 1-100 (default: 75) |
| `--format` | `put-image`: convert to `jpeg`, `png`, `webp`, or `avif` (source format kept when omitted) |
| `--json` | Print result as JSON for `list`, `put-image`, `signed-token`, `presign`, `list-stores`; with `put-image` prints the stored blob (`url`, `downloadUrl`, `pathname`, `contentType`) instead of only the URL |
| `--limit` | Max results per page for `list` (default: 10, max: 1000) |
| `--next` | Next page for `list`; pass the cursor the previous page printed |
| `--prefix` | Filter blobs by pathname prefix for `list` |
| `--mode` | List mode: `expanded` (default) or `folded` |
| `--pathname` | Destination pathname for `put` (default: filename); required for `put-image` |
| `--content-type` | Override inferred content-type for `put` / `copy` (not available for `put-image`) |
| `--cache-control-max-age` | `max-age` in seconds for `put` / `put-image` / `copy` (default: 2592000 = 30 days) |
| `--add-random-suffix` | Add random suffix to filename on `put` / `put-image` / `copy` |
| `--force` | Overwrite an existing blob on `put` / `put-image` (default: false) |
| `--no-multipart` | `put` uploads in multiple chunks by default (no `--multipart` flag needed); pass this to upload in a single request |
| `--output` | Save `get` content to file instead of stdout |
| `--if-match` | ETag conditional for `put`, `delete`, `copy`; with `put` the upload replaces the blob only if its ETag matches |
| `--if-none-match` | ETag conditional for `get`; returns 304 if unchanged |
| `--region` | Storage region for `create-store` (default: `iad1`) |
| `--yes` | Skip confirmation for `delete`, `empty-store`, and `create-store` (auto-connect to the linked project, all environments by default) |
| `--environment` | Environments to connect for `create-store` (repeatable) |
| `--all` | List all team stores regardless of project for `list-stores` |

## Notes

- Subcommands: `list` / `ls`, `put`, `put-image`, `delete` (shown as `del` in the previous page revision), `copy` / `cp`, `get`, `create-store`, `delete-store`, `get-store`, `list-stores` / `ls-stores`, `empty-store`, `signed-token` (issue a short-lived signed token), `presign` (generate a presigned URL); see Vercel Signed URLs in the Vercel Blob docs for the last two
- Authentication: in a linked project with a connected Blob store, OIDC is the default (Vercel auto-populates `VERCEL_OIDC_TOKEN`, paired with `BLOB_STORE_ID`). If OIDC is unavailable (unlinked project, outside Vercel, local development) the CLI falls back to `BLOB_READ_WRITE_TOKEN` from your env file or `--rw-token`
- `put-image` runs the source (local file or public http(s) URL) through Image Optimization and stores only the optimized output; prints the blob URL to stdout. Billed as one image transformation plus a regular blob upload. If the transformed image would be larger than the source, the source is stored unchanged with a warning. `--multipart` is not available for it
- `delete`, `delete-store` and `empty-store` are permanent. `delete` asks to confirm in a terminal (`--yes` skips it, needed in scripts/CI). `delete-store` always asks for confirmation, so it must run in an interactive terminal. `empty-store` empties the store your Blob credentials point to and accepts no store ID argument; `--yes` skips its prompt in CI
- `put-image` also needs `--pathname`, and `--content-type` is unavailable because the stored content type comes from the optimizer; if `--format` is set but the image is not converted a warning is printed
- `list-stores` in a linked project directory shows only stores connected to that project; `--all` lists all team stores

- Source: https://vercel.com/docs/cli/blob (fetched 2026-11-14)

## Related

- [env.md](./env.md)
