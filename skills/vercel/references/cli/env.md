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
| `--type config\|secret` | Store the variable as Config or Secret |
| `--sensitive` | Maps to `--type secret` |
| `--no-sensitive` | Maps to `--type config` |
| `--visibility` | Deprecated alias of `--type` |
| `--force` | Overwrite existing env var without prompting |
| `--yes` | Skip confirmation for `pull` overwrite, `rm`, and `update` |
| `--environment` / `-e` | (for `run`) Environment to pull from: `development`, `preview`, `production` (default: `development`) |
| `--git-branch` | (for `run`) Git branch for branch-specific env vars |

## Notes

- Breaking change (docs `vercel env` last_updated 2026-08-24 per changelog "Environment variables now use Config and Secret types"): each variable is stored as Config or Secret, replacing the Sensitive toggle. Success output includes a `Type` line (`Config` or `Secret`)
- Default type per target:

| Target | Default type | Override |
| --- | --- | --- |
| Production | `secret` | `--no-sensitive` or `--type config` |
| Preview | `secret` | `--no-sensitive` or `--type config` |
| Development | `config` | `--sensitive` or `--type secret` (Secrets are now allowed in Development) |
| Custom environments | `secret` | `--no-sensitive` or `--type config` |

- Using `--sensitive` / `--no-sensitive` with a conflicting `--type` returns an error
- In an interactive terminal the CLI asks `Environment Variable type?` unless you pass a type flag, `--yes`, `--value`, or stdin. Variables with a public framework prefix such as `NEXT_PUBLIC_` are stored as Config
- Example: `vercel env add API_KEY production --value "sk_live_..." --sensitive --yes` (Secret); `vercel env add API_URL production --type config --yes` (Config)
- `vercel env pull` exports to a file (default: `.env.local`); `vercel env run` injects without writing to disk
- For `vercel build` / `vercel dev`, use `vercel pull` instead
- The team policy "Enforce Sensitive Environment Variables" is deprecated and the CLI no longer enforces it locally; the replacement policy is "Separate Production Secret Values"
- When the pull target file exists, `vercel env pull` merges into it: local-only variables are kept, `VERCEL_OIDC_TOKEN` is always refreshed, and for Secrets whose values cannot be read the CLI keeps the real local value or writes a placeholder
- The `--` separator is required for `vercel env run -- <command>`

## Related

- [pull.md](./pull.md)
- [dev.md](./dev.md)
- [build.md](./build.md)
