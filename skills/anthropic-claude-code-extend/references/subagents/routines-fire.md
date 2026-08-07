<!-- source: https://platform.claude.com/docs/en/api/claude-code/routines-fire / last verified: 2026-08-07 -->

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
  -H "anthropic-beta: experimental-cc-routine-2026-04-01" \
  -H "Content-Type: application/json" \
  -d '{"text": "Sentry alert SEN-4521 fired in prod. Stack trace attached."}'
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
| `anthropic-beta` | Yes | Must include `experimental-cc-routine-2026-04-01` |
| `anthropic-version` | Yes | API version, e.g. `2023-06-01` |
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
| 400 | `invalid_request_error` | Missing/invalid `anthropic-beta`, `text` > 65,536 chars, or routine paused |
| 401 | `authentication_error` | No bearer token, or token doesn't match this routine |
| 403 | `permission_error` | Account/org lacks access to this endpoint |
| 404 | `not_found_error` | Routine does not exist |
| 429 | `rate_limit_error` | Daily routine run limit or usage limit reached (`Retry-After` header) |
| 500 | `api_error` | Unexpected server error; retry with backoff |
| 503 | `overloaded_error` | Temporarily overloaded; retry after a short delay |

## Notes

This is the API endpoint for triggering a Claude Code routine from outside the product (a separate surface from the general Claude Platform API). Authentication uses a per-routine bearer token (`sk-ant-oat01-...`) rather than a workspace-level `x-api-key`; the token can only fire that one routine and grants no read access. There is no idempotency key — retrying a request creates additional sessions. Not available in the Anthropic SDKs. Requires a claude.ai account (Pro/Max/Team/Enterprise) with Claude Code on the web enabled.

## Related

- [routines.md](./routines.md)
