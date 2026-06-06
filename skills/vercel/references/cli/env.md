# vercel env

Manage environment variables in Vercel Projects: list, add, update, remove, pull to file, and run commands with env vars.

## Signature / Usage

```bash
vercel env ls [environment] [gitbranch]
vercel env add [name] [environment] [gitbranch]
vercel env update [name] [environment]
vercel env rm [name] [environment]
vercel env pull [file]
vercel env pull --environment=preview --git-branch=feature-branch
vercel env run -- next dev
vercel env run -e production -- next build
```

## Options / Props

| Name | Description |
|------|-------------|
| `--sensitive` | Mark env var as sensitive (encrypted at rest, not viewable; default for production/preview) |
| `--no-sensitive` | Opt out of sensitive storage for production/preview vars |
| `--force` | Overwrite existing env var without prompting |
| `--yes` | Skip confirmation for `pull` overwrite, `rm`, and `update` |
| `--environment` / `-e` | (for `run`) Environment to pull from: `development`, `preview`, `production` (default: `development`) |
| `--git-branch` | (for `run`) Git branch for branch-specific env vars |

## Notes

- **Sensitive** env vars (default for production/preview) are not viewable after creation; development env vars cannot be sensitive
- `vercel env pull` exports to a file (default: `.env.local`); `vercel env run` injects without writing to disk
- For `vercel build` / `vercel dev`, use `vercel pull` instead
- Team policy "Enforce Sensitive Environment Variables" overrides `--no-sensitive`
- The `--` separator is required for `vercel env run -- <command>`

## Related

- [pull.md](./pull.md)
- [dev.md](./dev.md)
- [build.md](./build.md)
