<!-- source: https://platform.claude.com/docs/en/api/claude-code/routines-fire / last verified: 2026-10-17 -->

# Trigger a routine via API (/fire)

Start a Claude Code routine session on demand by sending an authenticated POST request. Experimental endpoint on the Claude Code product surface (not the general Claude Platform API); external HTTP entry point that starts a new run of an existing routine and returns the resulting session ID/URL.

## Signature / Usage

```http
POST https://api.anthropic.com/v1/claude_code/routines/{routine_id}/fire
```

```bash
curl -X POST https://api.anthropic.com/v1/claude_code/routines/$ROUTINE_ID/fire \
  -H "Authorization: Bearer $ROUTINE_TOKEN" \
  -H "anthropic-version: 2023-06-01" \
  -H "Content-Type: application/json" \
  -d '{"text": "Sentry alert SEN-4521 fired in prod. Stack trace attached."}'
```

GitHub Actions step that triggers the routine on CI failure:

```yaml
- if: failure()
  env:
    ROUTINE_FIRE_URL: ${{ secrets.ROUTINE_FIRE_URL }}
    ROUTINE_FIRE_TOKEN: ${{ secrets.ROUTINE_FIRE_TOKEN }}
  run: |
    curl -X POST "$ROUTINE_FIRE_URL" \
      -H "Authorization: Bearer $ROUTINE_FIRE_TOKEN" \
      -H "anthropic-version: 2023-06-01" \
      -H "Content-Type: application/json" \
      -d "{\"text\": \"CI failed: $GITHUB_WORKFLOW run $GITHUB_RUN_ID on $GITHUB_REF\"}"
```

Variant that JSON-encodes the values with jq (not in the official docs):

```yaml
- if: failure()
  env:
    ROUTINE_FIRE_URL: ${{ secrets.ROUTINE_FIRE_URL }}
    ROUTINE_FIRE_TOKEN: ${{ secrets.ROUTINE_FIRE_TOKEN }}
  run: |
    jq -n --arg text "CI failed: $GITHUB_WORKFLOW run $GITHUB_RUN_ID on $GITHUB_REF" '{text: $text}' | curl -X POST "$ROUTINE_FIRE_URL" \
      -H "Authorization: Bearer $ROUTINE_FIRE_TOKEN" \
      -H "anthropic-version: 2023-06-01" \
      -H "Content-Type: application/json" \
      --data-binary @-
```

Success response:

```json
{
  "type": "routine_fire",
  "claude_code_session_id": "session_01HJKLMNOPQRSTUVWXYZ",
  "claude_code_session_url": "https://claude.ai/code/session_01HJKLMNOPQRSTUVWXYZ"
}
```

## Options / Props

| Header | Required | Description |
|---|---|---|
| `Authorization` | Yes | `Bearer <token>`, per-routine token prefixed `sk-ant-oat01-` |
| `anthropic-version` | Yes | API version; `2023-06-01` is the only accepted value |
| `Content-Type` | When body present | `application/json` |

| Path parameter | Type | Description |
|---|---|---|
| `routine_id` | string | Routine identifier, prefixed `trig_` |

| Body field | Type | Required | Description |
|---|---|---|---|
| `text` | string | No | Freeform run-specific context (alert body, log line, diff). Not parsed. Max 65,536 characters. Passed alongside the routine's saved prompt |

| Response field | Type | Description |
|---|---|---|
| `type` | string | Always `routine_fire` |
| `claude_code_session_id` | string | New session ID |
| `claude_code_session_url` | string | claude.ai link to watch/review/continue the run |

| HTTP status | Error type | Cause |
|---|---|---|
| 400 | `invalid_request_error` | Missing or unsupported `anthropic-version` header, `text` > 65,536 chars, or routine paused |
| 401 | `authentication_error` | No bearer token, or token doesn't match this routine |
| 403 | `permission_error` | Account/org lacks access to this endpoint |
| 404 | `not_found_error` | Routine does not exist |
| 429 | `rate_limit_error` | Hourly fire limit for the routine or the account reached (`Retry-After` header indicates when the window resets) |
| 500 | `api_error` | Unexpected server error; retry with backoff |
| 503 | `overloaded_error` | Temporarily overloaded; retry after a short delay (the Claude Platform returns 529 for this error type; this endpoint returns 503) |

## Notes

`{routine_id}` in the endpoint URL is the literal URL path parameter (the `trig_`-prefixed routine identifier), not an unreplaced template placeholder.

This is the API endpoint for triggering a Claude Code routine from outside the product (a separate surface from the general Claude Platform API). Authentication uses a per-routine bearer token (`sk-ant-oat01-...`) rather than a workspace-level `x-api-key`; the token can only fire that one routine and grants no read access. There is no idempotency key — retrying a request creates additional sessions. The `anthropic-beta: experimental-cc-routine-2026-04-01` header is no longer required: older integrations that send it are unaffected, and the endpoint accepts requests with and without it. Rate limits: each routine accepts up to 30 fires per hour (shared across API fires, the Run now button, and one-shot re-arms), and each account up to 100 API fires per hour across all routines. Generating a new token revokes the previous one (there is no public API for token management). Unknown body fields are ignored. Not available in the Anthropic SDKs. Requires a claude.ai account (Pro/Max/Team/Enterprise) with Claude Code on the web enabled.

The official GitHub Actions example interpolates `$GITHUB_WORKFLOW` / `$GITHUB_REF` directly into a JSON string literal, so a workflow or ref name containing quotes or newlines produces invalid JSON; the jq variant above (not part of the official docs) builds the body with `jq -n --arg` to avoid this.

## Related

- [routines.md](./routines.md)
