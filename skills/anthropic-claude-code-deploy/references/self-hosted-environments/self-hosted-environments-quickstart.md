<!-- source: https://code.claude.com/docs/en/self-hosted-environments-quickstart.md / last verified: 2026-11-14 -->

# Self-hosted environments quickstart

Sets up the smallest working self-hosted environment: one runner on a single host running one test session, then sends a follow-up message from the CLI.

## Signature / Usage

```bash
# Confirm the host is ready (Claude Code v2.1.224+)
claude self-hosted-runner --help

# Guided setup (interactive; sign in with `claude auth login` as an Owner)
claude self-hosted-runner setup

# Manual: start a runner after creating an environment in the admin UI
mkdir -p /etc/claude
(umask 077 && cat > /etc/claude/environment-secret)   # paste secret, Enter, Ctrl-D
claude self-hosted-runner --environment-secret-file '/etc/claude/environment-secret' --base-dir '<writable-dir>'

# Send a follow-up to a running session from any logged-in machine
claude -p "your message" --cloud <session-id>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `claude self-hosted-runner setup` | guided setup | Interactive session walking through environment creation in the admin UI, starting a local runner with the secret file you save, confirming registration; writes `./runner-setup/CHEAT-SHEET.md`. Needs `claude auth login` with an Owner account; with only an API key or third-party provider the session starts but its organization checks fail |
| `--environment-secret-file <path>` | runner flag | Path to the file holding the environment secret (shown once at environment creation on the Cloud environments admin page) |
| `--base-dir <path>` | runner flag | Writable directory for checkouts and per-session directories; the runner creates it at startup; defaults to `/workspace` (works only if it exists and is writable, or the runner is root) |
| `claude -p "<msg>" --cloud <session-id>` | CLI | Posts a follow-up to a running session; accepts bare `session_...` / `cse_...` IDs or the session's claude.ai/code URL; prints `Sent to cloud session.` on success |

## Notes

- Prerequisites: an Owner turns on **Allow self-hosted environments** (the **New** button doesn't appear until then); GitHub connector turned on by an Owner plus each developer's own GitHub connection; Linux or macOS host or container (Windows unsupported as a runner host — use a Linux container) with outbound HTTPS to `api.anthropic.com`, `claude.ai` and its download hosts (install step), and your git host; a test repository that is public or cloneable by HTTPS URL without credentials prompts (an SSH key alone isn't enough; see Rewrite git URLs for private networks on the deploy page); a clock synchronized to real time (for example NTP).
- Software: Claude Code v2.1.224 or later (earlier versions print general `claude --help` for `self-hosted-runner`); a runner that serves Claude Tag sessions needs v2.1.229 or later and `python3` on `PATH`. Git 2.24 or newer.
- The guided setup doesn't start a test session itself (start one at claude.ai/code); its last step stops the runner it started, so restart it with the command in `./runner-setup/CHEAT-SHEET.md`. Use the manual steps on hosts without an interactive session, or when an Owner created the environment and handed you its secret.
- The environment secret is shown once (**Copy environment key** on the wizard's second step) and expires 365 days after creation; the `ccpool_...` ID stays visible in the environment's detail dialog (needed for the `aud` check and CI dispatch). To rotate: create a new secret on the environment's **Configuration** tab, roll it out, then revoke the old one (runners holding a revoked secret log `poll auth failed`, exit, and your orchestrator restarts them). For a suspected leak follow the deploy page's compromise steps instead.
- If the runner can't read the secret file (for example it runs as another user than the one that created it) it exits with `error: Failed to read environment secret file <path> (EACCES: ...)`; create the file as the runner's user in a directory it can write.
- Use a directory dedicated to the runner as `--base-dir`, not your home or existing clones: the runner treats `<writable-dir>/<repo-owner>/<repo>` as its own clone and can reset it and overwrite or delete files.
- The runner logs `Registered: runner_id=<runner-id>` then polls; it logs `Picked up session <session-id>` when it takes a session. Environment status flips from "No runners deployed" to "Healthy" within seconds (see **Activity** for the runner).
- Started this way the runner exits by design once its active sessions finish (not after each turn): `[runner:exit] account workload drained — exiting`. A `[runner:fatal]` with `runner record gone server-side` or `poll auth failed` means lost contact. A finished turn doesn't end the session, so a follow-up works without restarting. Production deployments run it under an orchestrator that restarts it.
- A git error containing `could not read Username for` means no HTTPS credentials for that host (supply credentials, or clone over SSH via `--git-ssh-rewrite`); after fixing, restart the runner and watch the failed session, or archive/delete it before starting a new one so the runner doesn't pick the failed one up.
- Source: https://code.claude.com/docs/en/self-hosted-environments-quickstart.md, fetched 2026-11-14

## Related

- [Self-hosted environments](./self-hosted-environments.md)
- [Deploy self-hosted environments to production](./self-hosted-environments-deploy.md)
- [Customize sessions in self-hosted environments](./self-hosted-environments-configuration.md)
