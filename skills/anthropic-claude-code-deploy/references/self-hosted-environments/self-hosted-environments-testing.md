<!-- source: https://code.claude.com/docs/en/self-hosted-environments-testing.md / last verified: 2026-08-07 -->

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
- Creating an environment before the org enables **Allow self-hosted environments** fails with `403 permission_error`. Keep `pool_secret` out of logs — mask it as a CI secret and print only the environment ID.

## Related

- [Self-hosted environments](./self-hosted-environments.md)
- [Self-hosted environments quickstart](./self-hosted-environments-quickstart.md)
- [Customize sessions in self-hosted environments](./self-hosted-environments-configuration.md)
