<!-- source: https://code.claude.com/docs/en/cloud-environments.md / last verified: 2026-08-07 -->

# Configure cloud environments

Per-environment configuration for Claude Code cloud sessions (Claude Code on the web, `claude --cloud`, Claude Tag, routines, mobile, Desktop): network access levels, environment variables, setup scripts, and environment caching.

## Signature / Usage

```text
# Environment variables (.env format, one KEY=value per line)
NODE_ENV=development
LOG_LEVEL=debug
DATABASE_URL=postgres://localhost:5432/myapp
```

```bash
#!/bin/bash
# Setup script: runs as root on Ubuntu 24.04, before Claude Code launches
apt update && apt install -y gh
```

```json
// SessionStart hook restricted to cloud sessions, in .claude/settings.json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "startup|resume",
        "hooks": [{ "type": "command", "command": "bash \"$CLAUDE_PROJECT_DIR\"/scripts/install_pkgs.sh" }]
      }
    ]
  }
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Network access level | `None` \| `Trusted` \| `Full` \| `Custom` | `Trusted` (default) allows only an allowlist of package registries/GitHub/cloud SDKs; `Custom` takes your own domain list, optionally including the Trusted defaults |
| `/remote-env` | CLI command | Picks the default cloud environment for CLI-initiated sessions; writes `remote.defaultEnvironmentId` to user settings |
| `--environment <environment-id>` | CLI flag | Overrides `/remote-env` and the org default for one scripted dispatch; requires Claude Code v2.1.224+ |
| `CLAUDE_CODE_REMOTE` | env (session) | `true` inside a cloud session; use to scope a SessionStart hook to cloud-only |
| `CLAUDE_CODE_REMOTE_SESSION_ID` | env (session) | Session's own ID, prefixed `cse_`; convert to `session_` for the transcript URL |
| Resource limits | fixed | ~4 vCPUs, 16 GB RAM, 30 GB disk per session VM |

## Notes

- Setup scripts must exit 0 (append `|| true` to non-critical steps) and finish within ~5 minutes; the filesystem is snapshotted afterward and reused (environment caching) until the script or allowed hosts change, or ~7 days pass.
- Environments have no dedicated secrets store; anyone who uses the environment can read its variables — don't put API keys/credentials there directly. Unquoted `.env` values ending in `#` get truncated (comment); quote values that contain `#` or span multiple lines.
- User-level `~/.claude/CLAUDE.md`, `~/.claude/skills|agents|commands`, and local/user-scope MCP servers do **not** carry into cloud sessions; commit equivalents to the repo's `.claude/` or `.mcp.json` (project scope) instead. Server-managed settings still reach the session; in a self-hosted environment, sessions read the runner image's managed settings file only when server-managed settings deliver no keys, and also run SessionStart hooks the operator seeded from the runner host's `~/.claude/`.
- All GitHub operations in Anthropic-hosted environments route through a dedicated proxy that keeps real GitHub credentials out of the session VM (`git push` only works against the session's current working branch); if neither `GH_TOKEN` nor `GITHUB_TOKEN` is set, both read as the placeholder `proxy-injected` and the proxy substitutes real credentials on outbound requests. Sessions in a self-hosted environment instead authenticate git operations with credentials the deployment provides.
- Environments can be archived but not deleted; archiving only blocks new sessions (running ones continue), and a CLI default that gets archived falls back to your first available cloud environment.
- Claude Tag channel sessions can't run in self-hosted environments yet; other surfaces (web, CLI, routines, mobile, Desktop) can route to any environment, including self-hosted, for workloads beyond the fixed resource limits.
- Commits/PRs Claude creates in a cloud session (v2.1.179+) include a `Claude-Session: <url>` trailer/link; disable with `attribution.sessionUrl: false` (v2.1.182+).

## Related

- [headless.md](./headless.md)
- [devcontainer.md](./devcontainer.md)
