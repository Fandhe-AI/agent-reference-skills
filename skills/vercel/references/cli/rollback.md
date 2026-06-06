# vercel rollback

Roll back production deployments to a previous deployment.

## Signature / Usage

```bash
vercel rollback
vercel rollback [deployment-id-or-url]
vercel rollback status [project]
vercel rollback status --timeout 30s
```

## Options / Props

| Name | Description |
|------|-------------|
| `--timeout` | Time to wait for rollback to complete; `0` exits immediately; accepts ms-compatible strings |

## Notes

- Hobby plan: can only roll back to the immediately previous production deployment
- To undo a rollback, use `vercel promote [deployment-id-or-url]`
- `vercel rollback status [project]` shows status of pending rollbacks
- Timeout does not cancel the actual rollback

## Related

- [promote.md](./promote.md)
- [deploy.md](./deploy.md)
