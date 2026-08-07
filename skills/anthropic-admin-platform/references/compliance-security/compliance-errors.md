<!-- source: https://platform.claude.com/docs/en/manage-claude/compliance-errors / last verified: 2026-08-07 -->

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
- 409: project delete blocked while chats remain attached.
- 429: shared budget of 600 req/min per parent organization across all keys and endpoints; remote session endpoints carry an additional budget. Honor `retry-after`; do not advance cursor on 429 (failed request returned no data).
- 500: check `x-should-retry` header before retrying; a value of `false` means the failure is deterministic.

## Related

- [compliance-api-access.md](./compliance-api-access.md)
- [compliance-activity-feed.md](./compliance-activity-feed.md)
- [compliance-faq.md](./compliance-faq.md)
