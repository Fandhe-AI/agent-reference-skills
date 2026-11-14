# vercel redeploy

Rebuild and redeploy an existing deployment.

## Signature / Usage

```bash
vercel redeploy [deployment-id-or-url]
vercel redeploy https://example-app.vercel.app --no-wait
vercel redeploy https://example-app.vercel.app --environment=staging
```

## Options / Props

| Name | Description |
|------|-------------|
| `--no-wait` | Exit immediately after requesting redeploy without waiting for completion |
| `--environment` | Environment to redeploy to: `production`, `preview`, or a custom environment name. Without it, redeploys to the environment of the original deployment |

## Notes

- `stdout` is always the new deployment URL; suitable for piping
- If the original deployment was created with `vercel deploy --prebuilt`, the redeploy reuses its prebuilt output and does not rebuild from source. To build with the latest env vars and settings, run `vercel pull`, `vercel build`, and `vercel deploy --prebuilt` with the same `--environment` value
- The current official page documents `--environment` only; `--target` is not confirmed in official docs
- Check `stderr` and exit code in CI scripts for error handling
- Source: https://vercel.com/docs/cli/redeploy (fetched 2026-11-14)

## Related

- [deploy.md](./deploy.md)
- [rollback.md](./rollback.md)
- [promote.md](./promote.md)
