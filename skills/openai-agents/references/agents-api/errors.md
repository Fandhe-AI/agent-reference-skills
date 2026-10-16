# Errors and Recovery

Where to look for Agents API failures (HTTP request, turn, session, environment), the error codes, and how to recover.

## Signature / Usage

Files API rate-limit error body:

```json
{
  "error": {
    "type": "rate_limit_error",
    "code": "files_api_rate_limit_exceeded",
    "message": "The Files API rate limit for your user has been exceeded. Reduce the rate of requests that access files, then try again.",
    "param": null
  }
}
```

Failed turn error:

```json
{
  "code": "server_overloaded",
  "message": "The model is temporarily overloaded. Please retry your request after a brief delay."
}
```

## Options / Props

Where to look:

| Failure | Where to look |
|---------|---------------|
| API request | HTTP status and the response `error` object |
| Turn | On `agent.session.turn.failed`, retrieve the turn; inspect `status` and `error` |
| Session | On `agent.session.failed`, retrieve the session; inspect `status` and `error` |
| Environment | `environment.error` in `agent.session.environment.failed` |

API request errors:

| Code | Cause / solution |
|------|------------------|
| 400 `invalid_request_error` | Invalid or too large value; correct the field in `error.param` / `error.message` |
| 400 `invalid_beta` | Invalid `OpenAI-Beta` header value |
| 400 `agent_not_persisted` | `agent_id` belongs to a session-local agent; create a saved agent |
| 400 `invalid_otlp_endpoint`, `invalid_otlp_header` | Invalid tracing endpoint or headers |
| 401 `unauthorized`; 403 `forbidden` | Authentication failed or no access |
| 404 `not_found_error`, `model_not_found` | Resource or model unavailable; check ID, model, project, deletion |
| 409 `conflict_error` | State conflict; retrieve current state before retrying |
| 409 `executor_version_incompatible` | Unsupported executor version; upgrade and retry |
| 424 `mcp_server_startup_failed` | MCP server failed to start; check configuration and credentials |
| 429 `files_api_rate_limit_exceeded` | Files API limit exceeded; reduce concurrent file requests, retry with exponential backoff and an attempt limit |
| 500 `internal_error` | Unexpected error; check saved work before retrying |
| 503 `service_unavailable_error`, `server_is_overloaded` | Temporarily unavailable or overloaded; check saved work before retrying |

Turn errors (failed turn has `status: "failed"` and `error` with `code` and `message`; no HTTP status of their own):

| Code | Cause / solution |
|------|------------------|
| `invalid_request` | Invalid input or configuration |
| `context_length_exceeded` | Input exceeds context window; reduce input or start a new session with a shorter summary |
| `session_budget_exceeded` | Session reached usage budget; start a new session |
| `credit_balance_exhausted`, `project_spend_limit_exceeded`, `organization_spend_limit_exceeded`, `organization_usage_limit_exceeded`, `usage_limit_exceeded` | Billing or usage limits |
| `rate_limit_exceeded` | Rate limit; retry steps |
| `server_overloaded` | Model overloaded; retry after a delay or change the model for later turns |
| `flex_unavailable` | Flex processing unavailable; retry later or change service tier to `default` for later turns |
| `connection_failed`, `request_timeout`, `server_error`, `internal_error` | Check saved work, then retry with a limit |
| `authentication_error` | Model access failed (credentials or permissions) |
| `resource_not_found` | Model or resource unavailable |
| `sandbox_error` | Environment couldn't complete an operation |
| `executor_version_incompatible` | Upgrade the executor, retry on the same session if it hasn't failed |
| `active_turn_not_steerable` | Active turn can't accept more input; wait for it to finish |
| `cyber_policy`, `misalignment_policy_violation` | Safety systems blocked the request |

Session and environment errors: `environment_connection_failed`, `environment_connection_timeout` (check executor startup and network), `sandbox_error` (inspect setup commands, packages, input files), `executor_version_incompatible` (upgrade before a new session), `idle_timeout` (hosted environment expired from inactivity; create a new session and supply inputs again), `internal_error` (retry setup after a delay; contact support if persistent).

## Notes

- Use `error.code` in application logic and `error.message` to explain; `error.param` can identify the field. Handle unknown codes and a missing `param` gracefully.
- In the beta API (`OpenAI-Beta: agents=v1`), a session's `error` is a message string or `null`; read the accompanying SSE `error` event for the session failure code.
- A failed turn does not always mean the session failed; retrieve the session. If `status` is `requires_action`, handle required actions. If failed, fix the cause and create a new session with the inputs you still need.
- Retry transient failures: (1) check the outcome (session, turn, saved items), (2) check completed actions (a failed turn may already have changed files or called external tools), (3) wait and limit retries, honoring `Retry-After`, (4) retry the request or, for a failed turn, wait until the session is `idle` and send a follow-up asking it to continue only unfinished work. Fix invalid input, credentials, and billing limits before retrying those.
- Size errors: reduce the input and output schema, tool result, or agent configuration (new session with smaller instructions and tool definitions). See Files and Artifacts for upload errors.
- An `error` event or disconnected stream does not confirm the turn's final state; recover from saved work. For persistent errors include request ID, session ID, and turn ID with a support request.
- Source: https://developers.openai.com/api/docs/guides/agents-api/errors (fetched 2026-10).

## Related

- [Events and Items](./session-events.md)
- [Run and Continue Sessions](./sessions.md)
- [Files and Artifacts](./files-and-artifacts.md)
- [MCP Connections](./mcp-connections.md)
