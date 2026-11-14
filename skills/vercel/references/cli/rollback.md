# vercel rollback

Roll back production deployments to a previous deployment.

## Signature / Usage

```bash
vercel rollback
vercel rollback [deployment-id-or-url]
vercel rollback status [project]
vercel rollback status --timeout 30s
vercel rollback https://example-app-6vd6bhoqt.vercel.app --timeout 5m
```

## Options / Props

| Name | Description |
|------|-------------|
| `--timeout` | Time to wait for rollback to complete (default: `3m`); `0` exits immediately; accepts ms-compatible strings |

## Notes

- Hobby plan: can only roll back to the immediately previous production deployment; passing an earlier deployment fails with `To rollback further than the previous production deployment, upgrade to pro.`
- To undo a rollback, use `vercel promote [deployment-id-or-url]`; this promotes the deployment to production and re-enables auto-assignment of production domains
- `vercel rollback status [project]` shows status of pending rollbacks
- Timeout does not cancel the actual rollback
- Source: https://vercel.com/docs/cli/rollback (fetched 2026-11-14)

## Related

- [promote.md](./promote.md)
- [deploy.md](./deploy.md)
