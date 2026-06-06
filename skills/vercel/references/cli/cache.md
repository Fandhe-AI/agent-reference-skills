# vercel cache

Manage CDN cache and Data cache for a project: purge, invalidate, or dangerously delete cached content.

## Signature / Usage

```bash
vercel cache purge
vercel cache purge --type cdn
vercel cache invalidate --tag blog-posts
vercel cache dangerously-delete --tag blog-posts
vercel cache invalidate --srcimg /api/avatar/1
```

## Options / Props

| Name | Description |
|------|-------------|
| `--type` | Cache type for `purge`: `cdn` or `data` (default: both) |
| `--tag` | Cache tag(s) to invalidate or delete (comma-separated). Cannot combine with `--srcimg` |
| `--srcimg` | Source image path; invalidates/deletes all cached transformations of that image |
| `--revalidation-deadline-seconds` | For `dangerously-delete`: only delete if not accessed within N seconds |
| `--yes` | Skip confirmation prompt |

## Notes

- `purge`: immediately removes CDN cache; subsequent requests serve MISS
- `invalidate`: marks cached content as STALE; subsequent requests revalidate in background
- `dangerously-delete`: immediately removes cached content; subsequent requests block while revalidating
- `--tag` and `--srcimg` are mutually exclusive

## Related

- [deploy.md](./deploy.md)
