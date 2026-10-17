<!-- source: https://platform.claude.com/docs/en/manage-claude/compliance-errors / last verified: 2026-10-16 -->

# Handle Compliance API errors

Every Compliance API error response, organized by HTTP status code, with cause and fix. Errors follow the standard Anthropic error format: non-2xx status, `request-id` header, JSON body with `error.type` and `error.message`. Match on `error.type`, not the message string.

## Signature / Usage

```json
{
  "error": {
    "type": "permission_error",
    "message": "Missing required scopes. Got: ['read:compliance_activities'] Needed: ['read:compliance_user_data']"
  }
}
```

## Options / Props

| Status | Retry? | When |
| --- | --- | --- |
| 400 Bad Request | No | Fix the request and resend |
| 401 Unauthorized | No | Fix or rotate the key |
| 403 Forbidden | No | Add the missing scope or use the right key type |
| 404 Not Found | Usually no | Resource deleted or never existed; exception: `pending` remote session |
| 409 Conflict | No | Resolve the conflict (e.g. detach chats) then retry |
| 429 Too Many Requests | Yes, after `retry-after` | Do not advance cursor |
| 500 Internal Server Error | Depends on `x-should-retry` header | |
| 502/503/504/529 | Yes, with backoff | Transient |

## Notes

- 400: invalid timestamp (must be RFC 3339), invalid `limit`, or invalid pagination cursor (treat cursors as opaque; never construct from object IDs).
- 401: missing/invalid/revoked `x-api-key`.
- 403: scope mismatch — message lists `Got:` vs `Needed:`. Common causes: Compliance Access Key created without the needed scope, or an Admin API key (fixed `read:compliance_activities` only) used against a content/org/delete endpoint. Scopes are immutable; create a new key.
- 404: chat/file/project/project-document/remote-session/organization/role/group not found, or organization settings not yet enabled for the parent. Remote session messages 404 transiently while `status` is `pending`.
- 400 (sessions): the local session list (`GET /v1/compliance/apps/sessions/local`) returns 400 `invalid_request_error` when a lower bound (`created_at.gte` / `created_at.gt`) and an upper bound (`created_at.lt` / `created_at.lte`) are both supplied and the upper bound is not after the lower one (equal bounds allowed only for `created_at.gte` with `created_at.lte`). The transcript endpoints (local and remote `.../messages`) accept `tool_use_input_max_bytes` and `tool_result_max_bytes` as a positive byte count or `-1` (server maximum); `0` returns 400. "Transcript page too large": a page of a very large session can return 400 from the local session messages endpoint only even when every parameter is valid; identify it by error code, do not retry; if `order=desc`, re-read oldest first (omit `order` and `page`, follow `next_page`, dedupe on message `id`).
- 404 (sessions): local session endpoints return `Local sessions are not available.` while they are unavailable to your parent organization (can be temporary); `Local session not found.` / `Remote session not found.` otherwise. A remote session that no longer appears in the list was deleted.
- 409: project delete blocked while chats remain attached.
- 429: shared budget of 600 req/min per parent organization across all keys and endpoints; remote session endpoints carry an additional budget. Honor `retry-after`; do not advance cursor on 429 (failed request returned no data).
- 429 (sessions): on a very large session the local session messages endpoint can return "Server busy reading large transcripts" (not a rate limit; retry after the `retry-after` seconds).
- 500: check `x-should-retry` header before retrying; a value of `false` means the failure is deterministic.
- 503 (local sessions, `overloaded_error`): three bodies are told apart by message text. `The local-sessions index is temporarily unavailable. Try again shortly.` (transient); `Captured content is temporarily unavailable. Try again shortly.` (usually transient; with a customer-managed encryption key that cannot decrypt, it recurs on the messages endpoint for as long as the key is unusable); `The local-sessions index cannot currently evaluate retention overrides for this page. Try again later.` (non-transient, depends on the organization's data and settings; "for this session" on retrieve/messages). Retry the two "Try again shortly" bodies with backoff without advancing `page`; for "Try again later" do not hold a walk open: restart the list without `page` later, narrow the `created_at` window, or skip that session ID and retry on a later run. Messages page cursors expire 24 hours after the walk's first page.

## Related

- [compliance-api-access.md](./compliance-api-access.md)
- [compliance-activity-feed.md](./compliance-activity-feed.md)
- [compliance-faq.md](./compliance-faq.md)
