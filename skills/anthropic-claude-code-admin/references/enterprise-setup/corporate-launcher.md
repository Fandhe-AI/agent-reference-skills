<!-- source: https://code.claude.com/docs/en/corporate-launcher.md / last verified: 2026-08-07 -->

# Run Claude Code behind a corporate launcher

Route the processes Claude Code starts from its own binary, including the background service and every agent view session, through a required launcher with `CLAUDE_CODE_PROCESS_WRAPPER` or the `processWrapper` setting.

## Signature / Usage

```bash
#!/bin/sh
# /opt/corp/launcher
# Your organization's setup: enter the sandbox, apply
# network controls, or inject credentials.
exec "$@"
```

```json
{
  "env": {
    "CLAUDE_CODE_PROCESS_WRAPPER": "/opt/corp/launcher"
  }
}
```

```json
{
  "processWrapper": "/opt/corp/launcher"
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `CLAUDE_CODE_PROCESS_WRAPPER` | env var | Absolute path to launcher; takes precedence over `processWrapper` setting. Requires v2.1.208+ |
| `processWrapper` | setting | Same value as a named top-level setting. Requires v2.1.210+ |

## Notes

- Only settings-delivered `env`/`processWrapper` reach the background service reliably; a shell `export` isn't enough since the service outlives the shell and never re-reads profiles.
- Project and local settings (`.claude/settings.json`, `.claude/settings.local.json`) cannot configure the launcher — ignored with a debug-log warning.
- On Windows, `CLAUDE_CODE_PROCESS_WRAPPER` is ignored entirely (the contract depends on `exec`, unsupported on Windows); processes run unwrapped.
- Launcher contract: must end with `exec "$@"`, must not reorder/absorb/prepend arguments, must pass every inherited env var through, must reach `exec` within ~3 seconds, must tolerate nested self-spawn, must not write to the terminal before `exec`.
- After deploying, run `claude daemon stop --any` (or `claude daemon stop` for an installed service) to restart the background service so it picks up the launcher.
- Distinct from `CLAUDE_CODE_SHELL_PREFIX`, which wraps shell commands Claude runs (Bash tool calls, hooks) rather than Claude Code's own processes.

## Related

- [admin-setup](./admin-setup.md)
- [network-config](./network-config.md)
