# vercel env

Manage environment variables in Vercel Projects: list, add, update, remove, pull to file, and run commands with env vars.

## Signature / Usage

```bash
vercel env list --environment [environment]
vercel env list --environment preview --git-branch [gitbranch]
vercel env add [name] --environment [environment]
vercel env add [name] --environment production,preview
vercel env add [name] --environment preview --git-branch [gitbranch]
vercel env update [name] --environment [environment]
vercel env update [name] --environment preview --git-branch [gitbranch]
vercel env remove [name] --environment [environment]
vercel env pull [file]
vercel env pull --environment=preview --git-branch=feature-branch
vercel env run -- next dev
vercel env run -e production -- next build
vercel env run -e preview --git-branch feature-x -- next dev
```

## Options / Props

| Name | Description |
|------|-------------|
| `--environment` | `add`, `list`, `remove`, `update`, `pull`: target environment (`development`, `preview`, `production`, or a custom environment); `add` accepts a comma-separated list. Needs Vercel CLI 64.6.0 or later for `add`, `list`, `remove`, `update` |
| `-e, --environment` | `run`: environment to pull variables from, default `development`; accepts `development`, `preview`, `production`, or a custom environment name |
| `--git-branch` | Git branch for branch-specific variables. Only Preview variables can target a branch. Needs Vercel CLI 64.6.0 or later for `add`, `list`, `remove`, `update` |
| `--type config\|secret` | Store the variable as Config or Secret |
| `--sensitive` | Maps to `--type secret` |
| `--no-sensitive` | Maps to `--type config` (`add` only) |
| `--visibility` | Deprecated alias of `--type` |
| `--value` | Value to store (used in the official `add` examples) |
| `--force` | `add`: overwrite existing env var of the same target without prompting |
| `--yes` | Skip confirmation for `pull` overwrite, `remove`, and `update` |

## Notes

- Breaking change (docs `vercel env` last_updated 2026-08-24 per changelog "Environment variables now use Config and Secret types"): each variable is stored as Config or Secret, replacing the Sensitive toggle. Success output includes a `Type` line (`Config` or `Secret`)
- Default type per target:

| Target | Default type | Override |
|--------|--------------|----------|
| Production | `secret` | `--no-sensitive` or `--type config` |
| Preview | `secret` | `--no-sensitive` or `--type config` |
| Development | `config` | `--sensitive` or `--type secret` (Secrets are allowed in Development) |
| Custom environments | `secret` | `--no-sensitive` or `--type config` |

- `vercel env update` keeps the variable's current type by default; `--type secret` changes Config to Secret. To change Secret to Config, remove the variable and add it again with `--type config`
- Using `--sensitive` / `--no-sensitive` with a conflicting `--type` returns an error
- In an interactive terminal the CLI asks `Environment Variable type?` unless you pass a type flag, `--yes`, `--value`, or stdin. Variables with a public framework prefix such as `NEXT_PUBLIC_` are stored as Config
- Official examples: `vercel env add API_KEY --environment production --value "sk_live_..." --sensitive --yes` (Secret); `vercel env add API_URL --environment production --type config --yes` (Config); `vercel env add API_URL --environment production --value "https://api.example.com" --no-sensitive --yes` (Config)
- Values can come from stdin: `vercel env add [name] --environment [environment] < [file]`, or `cat ~/.npmrc | vercel env update NPM_RC --environment preview --yes` (`--yes` skips the update confirmation, which piped input cannot answer). Piping with `echo` saves the value in shell history, so it is not recommended for secrets
- `vercel env pull` exports to a file (default: `.env.local`, Development variables unless `--environment`); `vercel env run` injects without writing to disk
- For `vercel build` / `vercel dev`, use `vercel pull` instead
- The team policy "Enforce Sensitive Environment Variables" is deprecated and the CLI no longer enforces it locally; the replacement policy is "Separate Production Secret Values"
- When the pull target file exists, `vercel env pull` merges into it: local-only variables are kept (CLI logs `Kept <KEYS> ...`), `VERCEL_OIDC_TOKEN` and the Vercel-managed analytics variables (`VERCEL_ANALYTICS_ID`, `VERCEL_SPEED_INSIGHTS_ID`, `VERCEL_WEB_ANALYTICS_ID`) are never preserved from the local file, and for Secrets whose values cannot be read the CLI keeps the real local value or writes a placeholder
- The `--` separator is required for `vercel env run -- <command>`; flags after `--` are passed to your command
- Not confirmed in the current official page: the earlier positional forms (`env ls [environment] [gitbranch]`, `env add [name] [environment] [gitbranch]`, `env rm [name] [environment]`) and the `ls` / `rm` aliases; the official examples use `list` / `remove` with `--environment` and `--git-branch`
- Source: https://vercel.com/docs/cli/env (fetched 2026-11-14)

## Related

- [pull.md](./pull.md)
- [dev.md](./dev.md)
- [build.md](./build.md)
