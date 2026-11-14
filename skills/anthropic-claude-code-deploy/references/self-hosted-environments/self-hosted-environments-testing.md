<!-- source: https://code.claude.com/docs/en/self-hosted-environments-testing.md / last verified: 2026-11-14 -->

# Test self-hosted environments end to end

CI smoke-test recipe: dispatch a session with the CLI, read Claude's replies back through a Stop hook, and script the full create → reply → follow-up → reply loop to verify a runner image before promoting it.

## Signature / Usage

```bash
# 1. Create a session on the test environment (from a git checkout)
create_json=$(claude -p "<prompt>" --environment "$CLAUDE_TEST_ENVIRONMENT_ID" \
  --ref "$TEST_REPO_REF" --output-format json)
SESSION_ID=$(jq -er '.session_id' <<<"$create_json")

# 2. Wait for $E2E_REPLY_DIR/$SESSION_ID.txt (written by the Stop hook)

# 3. Send a follow-up
claude -p "<message>" --cloud "$SESSION_ID" --output-format json
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `claude -p "<prompt>" --environment <id> [--ref <branch>] --output-format json` | CLI dispatch | Creates a session on the given `ccpool_...` environment; prints `session_id` and exits without waiting for the reply. Requires Claude Code v2.1.224+ |
| `claude -p "<msg>" --cloud <session-id> --output-format json` | CLI follow-up | Posts a follow-up to an existing session |
| Stop hook + `E2E_REPLY_DIR` | capture pattern | Writes `last_assistant_message` from each turn's Stop-hook payload to `$E2E_REPLY_DIR/<session_id>.txt` so the driver reads replies without further API calls |
| `POST /v1/code/runners/self-hosted/pools` | admin API | Creates a dedicated test environment; needs `anthropic-beta: ccr-byoc-2025-07-29` header and an Owner/admin OAuth token; returns `pool_id` and a long-lived `pool_secret` |
| `DELETE /v1/code/runners/self-hosted/pools/<id>` | admin API | Deletes the test environment after the CI run |

## Notes

- Install the Stop hook (`~/.claude/settings.json` + `~/.claude/hooks/e2e-stop-hook-capture.sh`) on the **test** runner host before starting the runner — the runner snapshots `~/.claude/` once at startup, so a hook added later needs a restart. Export `E2E_REPLY_DIR` to the runner process; the hook is a no-op without it.
- For test runners on separate infrastructure with no shared filesystem, swap the file write for a `curl -X POST` to an endpoint your driver controls (`E2E_REPLY_URL`).
- Both `--environment` and `--cloud` dispatch authenticate with a claude.ai OAuth token — API keys aren't accepted. Long-lived CI host: `claude auth login` once, refresh-token grant capped at 30 days (re-login every 30 days). Ephemeral runners: no long-lived CI token exists today for the `user:sessions:claude_code` scope (also 30-day cap); provision via `CLAUDE_CODE_OAUTH_REFRESH_TOKEN`/`CLAUDE_CODE_OAUTH_SCOPES`, or contact Anthropic for a machine-identity path.
- Creating an environment before the org enables **Allow self-hosted environments** fails with `403 permission_error` (`self-hosted runners are disabled by your organization's policy`). Keep `pool_secret` out of logs — mask it as a CI secret and print only the environment ID.

### Dispatch output and flag rules

- Session created: one JSON line such as `{"ok":true,"session_id":"session_...","title":"...","url":"...","pool_id":"..."}`. Creation failed: `{"ok":false,"error":"..."}` with exit status 1. Some earlier errors (cloud sessions unavailable for the org, missing prompt) print on stderr with no JSON line and exit 1.
- `--environment` takes precedence over the `remote.defaultEnvironmentId` setting; doesn't support `--output-format stream-json`; can't be combined with `--resume`, `--continue`, `--teleport`, `--session-id`, or `--init-only`. `--cloud` is rejected with a session ID or URL, and in non-interactive runs when it carries a description; a bare `--cloud` is treated as absent. `--ref <branch>` bases the checkout on a named ref instead of local HEAD; run from a git checkout so the repo is auto-detected from `origin`.
- The Stop hook reads `last_assistant_message` from its stdin JSON and appends to `$E2E_REPLY_DIR/<session_id>.txt`; `CLAUDE_CODE_REMOTE_SESSION_ID` is `cse_...` while the CLI prints `session_...` (same ID, different prefix). Install it only on test runners, never in a production image. The reference script uses a 90 s reply timeout and accepts the legacy `CLAUDE_TEST_POOL_ID` spelling for `CLAUDE_TEST_ENVIRONMENT_ID`.
- Authentication: the credential store is the OS keychain on macOS (falling back to `~/.claude/.credentials.json` when the Keychain can't be written, such as a locked login Keychain over SSH), `~/.claude/.credentials.json` on Linux and Windows. The scope `user:sessions:claude_code` is capped server-side at 30 days, so `claude setup-token` (one-year, inference-only) and the environment secret (registers runners only) don't work. `$ADMIN_TOKEN` for the create/delete calls is an Owner account's OAuth access token — read it fresh each run and pass it via stdin (`-H @-` needs curl 7.55+).
- Source: https://code.claude.com/docs/en/self-hosted-environments-testing.md, fetched 2026-11-14

## Related

- [Self-hosted environments](./self-hosted-environments.md)
- [Self-hosted environments quickstart](./self-hosted-environments-quickstart.md)
- [Customize sessions in self-hosted environments](./self-hosted-environments-configuration.md)
