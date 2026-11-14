# Vercel CLI Global Options

Options available across all Vercel CLI commands.

## Options / Props

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--cwd` | | Set working directory (relative or absolute path) |
| `--debug` | `-d` | Verbose output |
| `--global-config` | `-Q` | Path to global configuration directory |
| `--help` | `-h` | Display help for a command |
| `--local-config` | `-A` | Path to local `vercel.json` file |
| `--scope` | `-S` | Execute from a non-active team scope (slug) |
| `--project` | | Project name or ID; overrides `VERCEL_PROJECT_ID` and `.vercel/project.json` |
| `--token` | `-t` | Auth token; overrides `VERCEL_TOKEN` env var |
| `--no-color` | | Disable color/emoji output (also: `NO_COLOR=1`) |
| `--team` | `-T` | Team slug or ID for the command |
| `--version` | `-v` | Print CLI version |
| `--non-interactive` | | Skip all interactive prompts (default in agent environments) |

## Notes

- `--project` precedence: `--project` flag > `VERCEL_PROJECT_ID` env var > `.vercel/project.json`
- `--token` precedence: `--token` flag > `VERCEL_TOKEN` env var
- Use `VERCEL_TOKEN` in CI/CD to avoid exposing tokens in process lists

### Exit codes

| Code | Meaning |
|------|---------|
| `0` | Success or help (`vercel --help`, bare command group such as `vercel env`) |
| `1` | Operational failure (failed API request, failed deployment build) |
| `2` | Usage error (unknown option or subcommand, missing argument or value, invalid flag value; help for a nonexistent command path) |

- `vercel env run` exits with the exit code of the command it runs; `vercel inspect --wait` exits `1` when the wait times out while the deployment is still in progress
- Set both `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` in CI to skip linking; setting only one without `--project` makes commands that need a project (e.g. `vercel deploy`) exit with an error
- `--scope` runs a command against a team without switching the current team (`vercel login` is the exception: it saves that team as current)
- When running under an agent, non-interactive mode is the default
- Source: https://vercel.com/docs/cli/global-options (fetched 2026-11-14)

## Related

- [overview.md](./overview.md)
