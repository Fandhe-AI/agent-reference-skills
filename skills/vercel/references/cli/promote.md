# vercel promote

Promote an existing deployment to be the current production deployment (assign production domains to it).

## Signature / Usage

```bash
vercel promote [deployment-id-or-url]
vercel promote https://example-app.vercel.app --timeout=5m
vercel promote status [project]
vercel promote status --timeout 30s
```

## Options / Props

| Name | Description |
|------|-------------|
| `--timeout` | Time to wait for promotion to complete (default: `3m`); `0` exits immediately after requesting; accepts ms-compatible strings |
| `--yes` | Skip confirmation when promoting a Preview deployment to production |

## Notes

- Production deployments are the typical promote target; promoting Preview deployments requires confirmation
- `vercel promote status [project]` shows status of pending promotions
- Timeout does not cancel the actual promotion; it continues on Vercel's side
- `--timeout` has no effect when promoting a Preview deployment: the command creates the new production deployment, prints a link, and exits without waiting for the build. To wait, pass that link to `vercel inspect` with `--wait`
- `vercel promote status` also accepts `--timeout`
- Source: https://vercel.com/docs/cli/promote (fetched 2026-11-14)

## Related

- [rollback.md](./rollback.md)
- [deploy.md](./deploy.md)
- [alias.md](./alias.md)
- [inspect.md](./inspect.md)
