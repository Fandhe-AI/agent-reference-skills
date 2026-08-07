<!-- source: https://code.claude.com/docs/en/self-hosted-environments-configuration.md / last verified: 2026-08-07 -->

# Customize sessions in self-hosted environments

Extension points on the runner host: wrapper scripts for per-session credentials, lifecycle hooks that replace pipeline stages, on-demand runner spawning, MCP server delivery, and permission/tool-approval config.

## Signature / Usage

```bash
# Point the runner at a wrapper that execs into the pinned binary
claude self-hosted-runner --environment-secret-file /etc/claude/environment-secret \
  --exec-path /etc/claude/session-wrapper.sh
```

```bash
#!/bin/bash
# wrapper: exec into the runner's own binary so signals/exit codes propagate
exec "$CLAUDE_RUNNER_CLAUDE_BIN" "$@"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `--exec-path <path>` / `SELF_HOSTED_RUNNER_EXEC_PATH` | runner flag | Wrapper script run in place of the Claude Code binary, once per session; takes precedence over the `command` hook |
| `--hooks-dir <path>` / `SELF_HOSTED_RUNNER_HOOKS_DIR` | runner flag | Directory of well-known executable lifecycle hooks (`checkout`, `post-session`, `command`); any absent hook falls through to built-in behavior |
| `CLAUDE_CODE_SESSION_ACCESS_TOKEN` | wrapper env var | Session JWT (`sk-ant-cc-` prefix); `act` claim identifies the session creator |
| `CLAUDE_RUNNER_CLAUDE_BIN` | wrapper env var | Absolute path to the runner's own binary; `exec` into it, don't hardcode an install path |
| `CLAUDE_CODE_OAUTH_TOKEN` | wrapper env var | ~30-min inference-scoped OAuth token; re-minted before expiry and delivered over the child's stdin |
| `self-hosted-runner orchestrator --hooks-dir <dir>` | subcommand | Stateless autoscaler; polls for spawn requests and runs your `spawn-runner` hook per request |
| `--permission-mode auto` | appended flag | Pins auto mode from a wrapper/`command` hook; a classifier reviews actions before they run instead of prompting |

## Notes

- Keep stdin and fd 3 attached: the child's stdin is the runner's control channel (token rotation, session-end signals) and fd 3 carries activity signals for idle/startup timeouts. A bare `&` background severs stdin — every API call fails with `401` once the ~30-min OAuth token expires. If backgrounding is required, save stdin on fd 4+ and re-attach explicitly.
- `checkout` hook replaces the built-in clone/fetch (mirrors, per-session git auth); must leave a git working tree at `CLAUDE_RUNNER_CHECKOUT_PATH` (set `CLAUDE_RUNNER_SKIP_GIT_VERIFY=1` for non-git sources). `post-session` hook is the only chance to save uncommitted work — fires on every session end except abrupt runner termination; exit status never affects session outcome. `command` hook replaces child spawn (same env as a wrapper); ignored if `--exec-path` is also set.
- On-demand runners keep the environment secret only on the orchestrator (never runs user code); each spawned runner gets a single-use work-order JWT instead. `spawn-runner` hook contract: idempotent on `CLAUDE_RUNNER_ORDER_ID`, don't retry the workload yourself, exit 0=submitted / 1=retryable / ≥2=non-retryable (session blocked until an Owner/admin retries from the Activity tab), set `--expected-spawn-seconds` to your p99 boot time.
- MCP servers: add at image build time with `claude mcp add --scope user ...` (user scope required — local scope isn't seeded); the runner snapshots the host's `.claude.json` `mcpServers` key once at startup. Enterprise managed-mcp.json and `<repo>/.mcp.json` also work. Connector delivery (GitHub/Slack/Linear) is server-driven through `api.anthropic.com`, not available to CLI-dispatched sessions.
- Repository-committed `permissions.allow` must not contain a bare `"Edit"`/`"Write"`/`"NotebookEdit"` rule (grants writes anywhere on the host, not just the workspace) — the repo-settings guard flags or refuses it depending on `--confine-repo-settings`. Cloud sessions pre-approve file edits regardless of permission mode, so most repos need no file-tool rule at all.
- A reference Stop-hook nudges Claude to commit/push uncommitted or unpushed work before a session ends (Anthropic-hosted sessions have this built in; self-hosted doesn't).

## Related

- [Self-hosted environments](./self-hosted-environments.md)
- [Deploy self-hosted environments to production](./self-hosted-environments-deploy.md)
- [Self-hosted environments reference](./self-hosted-environments-reference.md)
- [Verify session identity in self-hosted environments](./self-hosted-environments-identity.md)
