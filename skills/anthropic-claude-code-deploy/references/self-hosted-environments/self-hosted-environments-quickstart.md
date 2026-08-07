<!-- source: https://code.claude.com/docs/en/self-hosted-environments-quickstart.md / last verified: 2026-08-07 -->

# Self-hosted environments quickstart

Sets up the smallest working self-hosted environment: one runner on a single host running one test session, then sends a follow-up message from the CLI.

## Signature / Usage

```bash
# Confirm the host is ready (Claude Code v2.1.224+)
claude self-hosted-runner --help

# Guided setup (interactive claude.ai login with Owner/admin role)
claude self-hosted-runner setup

# Manual: start a runner after creating an environment in the admin UI
mkdir -p /etc/claude
(umask 077 && cat > /etc/claude/environment-secret)   # paste secret, Enter, Ctrl-D
mkdir -p '<writable-dir>'
claude self-hosted-runner --environment-secret-file '/etc/claude/environment-secret' --base-dir '<writable-dir>'

# Send a follow-up to a running session from any logged-in machine
claude -p "your message" --cloud <session-id>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `claude self-hosted-runner setup` | guided setup | Interactive session walking through environment creation, runner start, and registration confirmation; writes `./runner-setup/CHEAT-SHEET.md`. Requires `claude auth login` with Owner/admin role; not available with API keys |
| `--environment-secret-file <path>` | runner flag | Path to the file holding the environment secret (shown once at environment creation on the Cloud environments admin page) |
| `--base-dir <path>` | runner flag | Writable directory for checkouts and per-session directories; defaults to `/workspace` |
| `claude -p "<msg>" --cloud <session-id>` | CLI | Posts a follow-up to a running session; accepts `session_...`/`cse_...` IDs or the session's claude.ai/code URL |

## Notes

- Prerequisites: Owner/admin turns on **Allow self-hosted environments**; a GitHub connection for the org; Linux/macOS runner host (Windows unsupported — run in a Linux container) with outbound HTTPS to `api.anthropic.com`, `claude.ai`, and the git host; clock synced via NTP (>5 min skew fails auth); Claude Code v2.1.224+ and git 2.24+.
- The environment secret is shown once and expires 365 days after creation; rotate from the environment's Configuration tab, roll out, then revoke the old one (runners with a revoked secret log `poll auth failed` and exit).
- The runner exits by design once its active sessions finish (see runner lifecycle in the overview page); production deployments run it under an orchestrator that restarts it — see Deploy to production.
- Environment status on the admin page flips from "No runners deployed" to "Healthy" within seconds of a runner starting.

## Related

- [Self-hosted environments](./self-hosted-environments.md)
- [Deploy self-hosted environments to production](./self-hosted-environments-deploy.md)
- [Customize sessions in self-hosted environments](./self-hosted-environments-configuration.md)
