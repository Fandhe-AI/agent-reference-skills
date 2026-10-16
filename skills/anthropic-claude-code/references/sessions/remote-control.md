<!-- source: https://code.claude.com/docs/en/remote-control.md / last verified: 2026-10-16 -->
# Remote Control

Connects claude.ai/code or the Claude mobile app to a Claude Code session running on your machine, so you can start a task at your desk and continue it from your phone or another browser. Claude keeps running locally the entire time — code execution and filesystem access never leave your machine. Research preview, available on all plans (off by default for Team/Enterprise until an Owner enables it).

## Signature / Usage

```bash
claude remote-control                       # server mode: waits for remote connections
claude --remote-control                      # interactive session, also controllable remotely
claude --remote-control "My Project"         # same, with a custom session title
/remote-control                              # promote an existing session to Remote Control
/remote-control My Project                   # same, with a custom title
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `--name "My Project"` | flag | Custom session title shown at claude.ai/code |
| `-c`, `--continue` | flag | Resume the most recent Remote Control session from this directory (server mode only); can't be combined with `--session-id`, `--spawn`, `--capacity`, or `--create-session-in-dir`; v2.1.200+ |
| `--session-id <id>` | flag | Resume a specific Remote Control session by ID (server mode only); same exclusions; v2.1.200+ |
| `--spawn <mode>` | flag | `same-dir` (default), `worktree` (each session gets its own git worktree), or `session` (single-session mode) |
| `--capacity <N>` | flag | Max concurrent sessions in server mode, default 32 |
| `--[no-]create-session-in-dir` | flag | Pre-create one session in the current directory at server start (on by default) |
| `--remote-control-session-name-prefix <prefix>` | flag | Prefix for auto-generated session names when no explicit name is set (default: hostname, e.g. `myhost-graceful-unicorn`); `CLAUDE_REMOTE_CONTROL_SESSION_NAME_PREFIX` has the same effect |
| `--permission-mode <mode>` | flag | Starting permission mode for the server's sessions; accepts `manual` as an alias for `default`; an unrecognized mode stops the server at startup |
| `--chrome` / `--no-chrome` | flag | Turn Chrome integration on or off in the sessions the server creates. Without either flag, the pre-created session and sessions you start from claude.ai/code or the Claude app begin with Chrome off. Requires v2.1.273+ |
| `-d`, `--debug[=<filter>]` | flag | Debug logging for the server, optionally filtered by category; pass a filter only in the `=` form, such as `--debug=api,hooks`. Requires v2.1.282+ |
| `--debug-file <path>` | flag | Write debug logs to the given file |
| `--verbose` | flag | Show detailed connection and session logs |
| `--sandbox` / `--no-sandbox` | flag | Removed in v2.1.300: passing either flag makes the server exit with an error instead of starting |

## Notes

- Requirements: Pro/Max/Team/Enterprise (no API keys), sign-in via `/login`, `api.anthropic.com` as the endpoint (not Bedrock/Google Cloud's Agent Platform/Microsoft Foundry, and not a custom `ANTHROPIC_BASE_URL`), feature-flag evaluation enabled (`CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` or `DISABLE_GROWTHBOOK` must be unset), and workspace trust already accepted for the project directory. If you set only `DISABLE_TELEMETRY` or `DO_NOT_TRACK`, Remote Control stays available unless your organization requires Trusted Devices (then unset the variable); using Remote Control with either variable set requires v2.1.283 or later (from v2.1.154 through v2.1.282 either variable produced the unavailable message).
- Organizations with Zero Data Retention, or with the HIPAA configuration applied, can't enable Remote Control (HIPAA turns it off; the grayed-out **Remote Control** toggle can't be turned on by an Owner). Before v2.1.267 this case showed "Remote Control isn't available for your organization due to its compliance policy".
- A policy-block message "Remote Control is disabled by your organization's policy" was also shown, before v2.1.281, when Claude Code hadn't loaded your organization's policy (for example after starting offline); later versions report that state as `Couldn't verify your organization's policy for remote control`.
- All traffic is outbound HTTPS only — Claude Code never opens inbound ports. Session transcripts are stored on Anthropic servers while connected, to keep devices in sync and support reconnection.
- **Trusted Devices** (beta, Team/Enterprise): requires an enrolled device plus a sign-in no more than 18 hours old (Face ID/Touch ID/Windows Hello/passkey step-up) before a device can view or steer a Remote Control session.
- Enable auto-connect for every session with `/config` → **Enable Remote Control for all sessions**, or the `remoteControlAtStartup` setting.
- Mobile push notifications require the Claude mobile app signed in with the same account, plus `/config` → **Push when Claude decides** / **Push when actions required**.
- **Model and effort from a connected device**: when you pick a model from a connected device, Claude Code runs the session on that model (requires v2.1.238 or later); a model picked from the device's model control applies to the current session only, while `/model <name>` sent from the device to an interactive session also sets your default for new sessions. A level picked from the device's effort control applies to the current session only (v2.1.234+).
- **Crashed sessions in server mode**: if a session served by `claude remote-control` crashes, send it a message from a connected device and Claude Code serves it again; you don't have to restart the server (v2.1.238+).
- **Commands that take arguments from the remote client**: `/advisor` (from v2.1.260; pass a model, e.g. `/advisor opus`, or `off`; applies to the current session only; with no argument it prints the current advisor as text), `/output-style` (from v2.1.269; pass the style name or run with no argument to list; from mobile and web only built-in styles can be listed and selected), `/focus` (from v2.1.281; `on` or `off`, or no argument to toggle; current session only).
- Some commands are local-terminal-only (`/plugin`, `/resume`); text-output commands (`/compact`, `/clear`, `/context`, `/usage`, `/recap`, `/reload-plugins`) and `/model`, `/effort`, `/fast`, `/color`, `/rename`, `/mcp`, `/config`, `/autocompact` work from mobile/web with adapted argument-passing.
- Compare with Claude Code on the web (cloud infra, no local filesystem), Dispatch (message a task to spawn a Desktop session), and Channels (push external events into a session).

## Related

- [Channels](./channels.md): push events into a running session instead of steering it remotely
- [Manage sessions](./sessions.md): naming, resuming, and the session picker
