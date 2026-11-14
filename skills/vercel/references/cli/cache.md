# vercel cache

Manage CDN cache, Runtime cache and Data cache for a project: purge, invalidate, or dangerously delete cached content.

## Signature / Usage

```bash
vercel cache purge
vercel cache purge --type cdn
vercel cache purge --type data
vercel cache purge --project my-project
vercel cache invalidate --tag blog-posts
vercel cache dangerously-delete --tag blog-posts
vercel cache invalidate --srcimg /api/avatar/1
vercel cache dangerously-delete --srcimg /api/avatar/1 --revalidation-deadline-seconds 604800
```

## Options / Props

| Name | Description |
|------|-------------|
| `--type` | Cache type for `purge`: `cdn` or `data` (`data` purges the Runtime cache and Data cache; default: both) |
| `--tag` | Cache tag(s) to invalidate or delete (comma-separated). Cannot combine with `--srcimg` |
| `--srcimg` | Source image path; invalidates/deletes all cached transformations of that image |
| `--revalidation-deadline-seconds` | For `dangerously-delete` only: deadline in seconds before deletion; a request arriving earlier is served stale and revalidated in the background, otherwise the content is deleted |
| `--project` | Act on another project by name or ID (shorthand `-p`; global option) instead of the linked project |
| `--yes` | Skip confirmation prompt; required in non-interactive environments such as CI, where the command otherwise exits without changing the cache |

## Notes

- `purge`: immediately removes CDN cache; subsequent requests serve MISS
- `invalidate`: marks cached content as STALE; subsequent requests revalidate in background
- `dangerously-delete`: immediately removes cached content; subsequent requests block while revalidating
- `--tag` and `--srcimg` are mutually exclusive
- `--srcimg` must exactly match how the app references the source image (relative path or full URL, including query parameters); source image tags may contain commas and are at most 1013 bytes of UTF-8. `--srcimg` works with both `invalidate` and `dangerously-delete`
- On some plans projects in a team share one Runtime cache or Data cache; purging a shared cache deletes cached data of every project in the team
- Source: https://vercel.com/docs/cli/cache (fetched 2026-11-14)

## Related

- [deploy.md](./deploy.md)
