<!-- source: https://code.claude.com/docs/en/corporate-launcher.md / last verified: 2026-10-16 -->

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

### What the launcher covers

- The background service that `claude agents` and background sessions start on demand.
- The terminal host and the session inside every agent view row, including warm standby sessions the service keeps ready.
- Sessions the service respawns after an update or a crash.
- The relaunch Claude Code performs of itself to finish installing an update (including agent view's restart-for-update action).
- Session processes that Remote Control starts (v2.1.210+).
- Split-pane teammate sessions that agent teams start in tmux or iTerm2 (v2.1.210+).

Processes outside the launcher: a session you start yourself in a terminal (to cover these, put a script named `claude` earlier on `PATH` that runs your launcher with the real binary; don't replace the managed symlink); the first process of a `claude-cli://` deep link (prevent handler registration with the `disableDeepLinkRegistration` setting); the relaunch that `--worktree` with `--tmux` performs; the Claude in Chrome native-messaging host (started by the browser).

## Notes

- Launcher value format: whitespace separates tokens, double quotes group a token with spaces, a value starting with `[` is read as a JSON string array (e.g. `["/opt/corp/launcher", "--profile", "cc"]`); shell syntax (variable expansion, globbing, unquoted `;`, `|`, `&`, `$(`) isn't supported and is rejected as a configuration error.
- When the launcher can't run (or the value can't be used), Claude Code refuses to start the affected process instead of starting it unwrapped (except on Windows, where the variable is ignored).
- With a launcher configured, `ps` / Activity Monitor no longer show the `claude bg-pty-host` and `claude bg-spare` labels for background helpers (the launcher's `exec` rebuilds the argument list); Claude Code identifies its own processes by binary path.
- A managed settings value overrides `~/.claude/settings.json` and a shell export. Delivered through remote managed settings, `processWrapper` appears on the security approval dialog. If you previously replaced the `~/.local/bin/claude` symlink with your launcher, restore the original symlink (a replaced symlink starts the service through both launchers and puts the installation in an externally managed state). Verify with `/status` (Self-exec entry) or `claude daemon status`.
- Only settings-delivered `env`/`processWrapper` reach the background service reliably; a shell `export` isn't enough since the service outlives the shell and never re-reads profiles.
- Project and local settings (`.claude/settings.json`, `.claude/settings.local.json`) cannot configure the launcher — ignored with a debug-log warning.
- On Windows, `CLAUDE_CODE_PROCESS_WRAPPER` is ignored entirely (the contract depends on `exec`, unsupported on Windows); processes run unwrapped.
- Launcher contract: must end with `exec "$@"`, must not reorder/absorb/prepend arguments, must not depend on argument spelling (`--flag value` vs `--flag=value` can change between versions), must pass every inherited env var through (a launcher that rebuilds the environment from an allow list breaks sessions and `/status` reports a mismatch), must run `exec` from the directory it started in, must reach `exec` within ~3 seconds each time it runs (a cold background dispatch runs it twice in series), must tolerate nested self-spawn, must not write to the terminal before `exec`. A launcher that forks and exits leaves an orphaned process that agent view marks failed.
- After deploying, run `claude daemon stop --any` (or `claude daemon stop` for an installed service) to restart the background service so it picks up the launcher.
- Distinct from `CLAUDE_CODE_SHELL_PREFIX`, which wraps shell commands Claude runs (Bash tool calls, hooks) rather than Claude Code's own processes.

## Related

- [admin-setup](./admin-setup.md)
- [network-config](./network-config.md)
