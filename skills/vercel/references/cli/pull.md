# vercel pull

Sync environment variables and project settings to a local cache under `.vercel/` for use by `vercel build` and `vercel dev`.

## Signature / Usage

```bash
vercel pull
vercel pull --environment=preview
vercel pull --environment=preview --git-branch=feature-branch
vercel pull --environment=production
vercel pull --environment=staging
```

## Options / Props

| Name | Description |
|------|-------------|
| `--yes` | Skip new-project setup questions; use defaults |
| `--environment` | Environment to pull from: `development` (default), `preview`, `production`, or custom environment name |
| `--git-branch` | Git branch for branch-specific environment variables |

## Notes

- Only needed if using `vercel build` or `vercel dev`; not needed otherwise
- To export env vars to a file (e.g. `.env`), use `vercel env pull` instead
- Re-run after updating env vars on Vercel to refresh the local cache

## Related

- [env.md](./env.md)
- [build.md](./build.md)
- [dev.md](./dev.md)
