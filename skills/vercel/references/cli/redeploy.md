# vercel redeploy

Rebuild and redeploy an existing deployment.

## Signature / Usage

```bash
vercel redeploy [deployment-id-or-url]
vercel redeploy https://example-app.vercel.app --no-wait
vercel redeploy https://example-app.vercel.app --target=staging
```

## Options / Props

| Name | Description |
|------|-------------|
| `--no-wait` | Exit immediately after requesting redeploy without waiting for completion |
| `--target` | Target environment: `production`, `preview`, or custom environment name |

## Notes

- `stdout` is always the new deployment URL; suitable for piping
- Check `stderr` and exit code in CI scripts for error handling

## Related

- [deploy.md](./deploy.md)
- [rollback.md](./rollback.md)
- [promote.md](./promote.md)
