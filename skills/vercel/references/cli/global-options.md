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

## Related

- [overview.md](./overview.md)
