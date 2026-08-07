<!-- source: https://code.claude.com/docs/en/remote-control / last verified: 2026-08-07 -->
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
| `-c`, `--continue` | flag | Resume the most recent Remote Control session from this directory (server mode only) |
| `--session-id <id>` | flag | Resume a specific Remote Control session by ID (server mode only) |
| `--spawn <mode>` | flag | `same-dir` (default), `worktree` (each session gets its own git worktree), or `session` (single-session mode) |
| `--capacity <N>` | flag | Max concurrent sessions in server mode, default 32 |
| `--[no-]create-session-in-dir` | flag | Pre-create one session in the current directory at server start (on by default) |
| `--sandbox` / `--no-sandbox` | flag | Enable/disable sandboxing for filesystem and network isolation |

## Notes

- Requirements: Pro/Max/Team/Enterprise (no API keys), sign-in via `/login`, `api.anthropic.com` as the endpoint (not Bedrock/Google Cloud's Agent Platform/Microsoft Foundry, and not a custom `ANTHROPIC_BASE_URL`), feature-flag evaluation enabled (`DISABLE_TELEMETRY`/`DO_NOT_TRACK`/etc. must be unset), and workspace trust already accepted for the project directory.
- All traffic is outbound HTTPS only — Claude Code never opens inbound ports. Session transcripts are stored on Anthropic servers while connected, to keep devices in sync and support reconnection.
- **Trusted Devices** (beta, Team/Enterprise): requires an enrolled device plus a sign-in no more than 18 hours old (Face ID/Touch ID/Windows Hello/passkey step-up) before a device can view or steer a Remote Control session.
- Enable auto-connect for every session with `/config` → **Enable Remote Control for all sessions**, or the `remoteControlAtStartup` setting.
- Mobile push notifications require the Claude mobile app signed in with the same account, plus `/config` → **Push when Claude decides** / **Push when actions required**.
- Some commands are local-terminal-only (`/plugin`, `/resume`); text-output commands (`/compact`, `/clear`, `/context`, `/usage`, `/recap`, `/reload-plugins`) and `/model`, `/effort`, `/fast`, `/color`, `/rename`, `/mcp`, `/config`, `/autocompact` work from mobile/web with adapted argument-passing.
- Compare with Claude Code on the web (cloud infra, no local filesystem), Dispatch (message a task to spawn a Desktop session), and Channels (push external events into a session).

## Related

- [Channels](./channels.md): push events into a running session instead of steering it remotely
- [Manage sessions](./sessions.md): naming, resuming, and the session picker
