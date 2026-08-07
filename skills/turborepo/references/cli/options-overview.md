# Options overview

Flags, `turbo.json` configuration, and System Environment Variables for Turborepo. Three ways to manage `turbo` behavior, listed in order of precedence: CLI flags > System Environment Variables > `turbo.json` configuration. Where a flag is provided, it overrides the same setting from an environment variable or `turbo.json`.

Recommended usage: `turbo.json` for defaults, environment variables for per-environment overrides, flags for per-invocation overrides.

## Options Categories

### Caching

- `--force`
- `--remote-cache-timeout`
- `--preflight`
- `--cache`
- `--cache-dir`

### Messages

Version printing, telemetry messaging, global warnings, update notifier controls.

### Task Running & Logs

- `--ui`
- `--affected`
- `--dangerously-disable-package-manager-check`
- `--only`
- `--concurrency`
- `--log-order`
- `--cwd`
- `--log-prefix`
- `--output-logs`
- `--global-deps`
- `--color`

### Environment Variables

- `--env-mode`
- `--framework-inference`

### Debugging

- `--summarize`
- `--graph`
- `--dry`

### Authentication

- `--team`
- `--token`

### Other

- `--daemon` / `--no-daemon` (deprecated)
- binary path configuration, local Turborepo downloads

## Notes

- This page aggregates flags by purpose across all `turbo` commands; per-command flag tables live on each command's own page (e.g. `turbo run` flags are documented in `run.md`).

## Related

- [turbo run](./run.md)
- [Other commands](./other-commands.md)
