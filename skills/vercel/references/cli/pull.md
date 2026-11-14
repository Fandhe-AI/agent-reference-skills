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
| `--yes` | Skip new-project setup questions; answers use the current directory for project name and location. Does not choose a team; if you belong to more than one team, also pass `--scope` |
| `--environment` | Environment to pull from: `development` (default), `preview`, `production`, or custom environment name |
| `--git-branch` | Git branch for branch-specific environment variables |

## Notes

- Only needed if using `vercel build` or `vercel dev`; not needed otherwise
- To export env vars to a file (e.g. `.env`), use `vercel env pull` instead
- Cache location: `.vercel/.env.$target.local`
- Re-run after updating env vars on Vercel to refresh the local cache
- Source: https://vercel.com/docs/cli/pull (fetched 2026-11-14)

## Related

- [env.md](./env.md)
- [build.md](./build.md)
- [dev.md](./dev.md)
