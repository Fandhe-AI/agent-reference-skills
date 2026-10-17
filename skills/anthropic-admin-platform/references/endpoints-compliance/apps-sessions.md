<!-- source: https://platform.claude.com/docs/en/api/compliance/apps/sessions / last verified: 2026-10-17 -->

# Apps Sessions Compliance API

Compliance Access Key endpoints for session transcripts of Claude apps: local sessions (run on the user's machine, e.g. Cowork in Claude Desktop, Claude Code) and remote sessions (Cowork sessions in Anthropic-managed cloud environments). 5 endpoints.

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/compliance/apps/sessions/local` | List local sessions across the organizations the key may read (`created_at` descending, forward-only pagination) |
| GET | `/v1/compliance/apps/sessions/local/{local_session_id}` | Retrieve one local session (404 when every inference call has aged out of retention) |
| GET | `/v1/compliance/apps/sessions/local/{local_session_id}/messages` | Retrieve a local session transcript (oldest-first by default) |
| GET | `/v1/compliance/apps/sessions/remote` | List remote sessions (metadata only, newest first) |
| GET | `/v1/compliance/apps/sessions/remote/{claude_remote_session_id}/messages` | Retrieve a remote session transcript (oldest-first by default) |

```bash
curl https://api.anthropic.com/v1/compliance/apps/sessions/local \
    -H 'anthropic-version: 2023-06-01' \
    -H "Authorization: Bearer $ANTHROPIC_COMPLIANCE_API_KEY"
```

```json
{
  "data": [
    {
      "type": "compliance_local_session",
      "id": "clls_eyJ2IjoxLCJvIjoiOWEx…",
      "organization_uuid": "9a1e0000-0000-0000-0000-000000000000",
      "workspace_id": "wrkspc_01SvYKoWVRVHoEbwESNvzYdR",
      "user": { "id": "user_01GpKpLmNoPqRsTuVwXyZaBc", "email_address": "engineer@example.com" },
      "product_surface": "cowork",
      "created_at": "2026-07-09T14:02:11Z",
      "updated_at": "2026-07-09T15:47:33Z"
    }
  ]
}
```

## Options / Props

### Query parameters

| Name | Endpoint | Type | Description |
|------|----------|------|-------------|
| `created_at.gt/gte/lt/lte` | local list | string (RFC 3339, UTC offset required) | Filter on the session's first inference call |
| `updated_at.gte` | local list | string (RFC 3339, UTC offset required) | Sessions whose last inference call is at or after this time; combines with `created_at` filters, does not change ordering or pagination. For polling sessions active since a previous pass |
| `created_at.gt/gte/lt/lte` | remote list | string (RFC 3339) | Filter by creation time. There is no `updated_at` filter |
| `organization_ids[]` | remote list | array<string>, max 500 | Narrow to child organizations; omit to span every readable organization |
| `user_ids[]` | remote list | array<string>, max 10 | Sessions owned by specific users; agent-owned sessions are excluded when set |
| `limit` | lists | number | Default 100, max 500 |
| `limit` | messages | number | Default 100, max 1000 |
| `order` | messages | `"asc"` \| `"desc"` | Default `asc` (oldest-first). `desc` on very large sessions more often returns 400 |
| `page` | all list/messages | string | Opaque token from the previous `next_page` |
| `tool_result_max_bytes` | messages | number | Truncate each text item in a tool result; default 10000; `-1` = server maximum; `0` invalid |
| `tool_use_input_max_bytes` | messages | number | Truncate each tool-use input; default 10000; `-1` = server maximum; `0` invalid |

Path parameters: `local_session_id` (prefix `clls_`), `claude_remote_session_id` (`cse_...`). Headers: `anthropic-version`, `x-api-key` (both optional in the reference).

### Local session object (`type: "compliance_local_session"`)

| Name | Type | Description |
|------|------|-------------|
| `id` | string | Prefixed `clls_`, opaque, unique within the parent organization |
| `organization_uuid` | string | Child organization UUID |
| `workspace_id` | string \| null | Prefixed `wrkspc_`; null when not attributed to a workspace |
| `user` | object | `id` (prefixed `user_`, always set) and `email_address` (null when the account is deleted or the user left the readable organizations; always null on the messages endpoint) |
| `product_surface` | string \| null | `cowork`, `claude_code`, `claude_science`, `claude_in_chrome`, `office_agents/{excel,powerpoint,word,outlook,google_docs,google_sheets,google_slides}`, or `office_agents`; new values appear over time, treat unknown as opaque; null when not recorded |
| `created_at` | string | First retained inference call (RFC 3339, UTC); strictly after the retention boundary when a session straddles it |
| `updated_at` | string | Last retained inference call; a lower bound on the list endpoint |
| `truncated` | boolean | True when the session has more than 100,000 inference calls; messages then returns only the earliest calls |

### Local message object (`type: "compliance_local_session_message"`)

| Name | Type | Description |
|------|------|-------------|
| `id` | string | Prefixed `clsm_`; stable while the turn is retained |
| `role` | `"assistant"` \| `"user"` | Sender |
| `created_at` | string | When the message was recorded (RFC 3339, UTC) |
| `model` | string \| null | Model that served the assistant turn; null on user messages and when `provenance` is set |
| `content` | array | `text` (`text`, `truncated`), `tool_use` (`id`, `name`, `input` as JSON string, `truncated`), `tool_result` (`name`, `tool_use_id`, `is_error`, `content[]` of text items, `truncated`). Empty when `provenance.type` is `content_unavailable` |
| `provenance` | object \| null | Null = verified content. `content_unavailable` (`reason`: `not_captured`, `client_aborted`, `cmek_key_revoked`, `retention_elapsed`, `oversize`), `client_asserted`, or `synthetic_marker`; tolerate unknown values |

Messages response also carries `next_page` and `session` (the session object; `user.email_address` always null).

### Remote session object

| Name | Type | Description |
|------|------|-------------|
| `id` | string | Remote session ID (`cse_...`) |
| `organization_uuid` | string | Owning organization UUID |
| `user` | object \| null | Owner `{ id, email_address }`; null for agent-owned sessions |
| `agent_id` | string \| null | Owning automated agent; at most one of `user` / `agent_id` is set |
| `started_by_user` | object \| null | Human initiator of an agent-owned session (e.g. Slack mention, scheduled trigger) |
| `status` | string | `active`, `paused`, `archived`, `failed`, plus transient `pending` (listed, but messages returns 404 for it); treat unknown as unknown state |
| `product_surface` | string \| null | Currently `cowork_remote` (Cowork on claude.ai web or mobile) |
| `claude_project_id` | string \| null | Bound project ID |
| `created_at` / `updated_at` | string | RFC 3339, UTC |

### Remote message object

| Name | Type | Description |
|------|------|-------------|
| `id` | string | e.g. `csev_abc123` |
| `role` | `"assistant"` \| `"user"` | Sender |
| `content` | array | `text` / `tool_use` / `tool_result` blocks (same shapes as local) |
| `content_unavailable` | boolean | True when content could not be decrypted or exceeded the per-event size bound; `content` is empty |
| `sent_by_user_id` | string \| null | Human who sent the turn on an agent-owned session; null on user-owned sessions |
| `created_at` | string | Commit timestamp; may tie or invert under concurrent writes, do not re-sort by it |

## Notes

- Pagination is forward-only: pass `next_page` back as `page` until it is null. Treat the token as opaque.
- Local messages: retention is enforced read-side. A session straddling the child organization's retention boundary carries one leading `content_unavailable` placeholder (`reason: "retention_elapsed"`). The boundary is pinned on the first page and honored for 24 hours; an older cursor returns 400, so restart the walk.
- Local messages on a very large session: some pages are too large and return 400 (retrying does not help). If `order=desc` was used, re-read oldest-first from the first page (omit `order` and `page`). If an oldest-first page still returns 400, contact Anthropic support with the `request-id` response header.
- Never included in local transcripts: extended-thinking content, the request `system` field (a presence-only marker is emitted), and `tools[]` definitions. Project-level instructions such as CLAUDE.md appear as a user-role context block.
- Remote transcripts exclude thinking blocks and images. On the remote messages endpoint `session.user.email_address`, `session.started_by_user`, and `session.claude_project_id` are always null; read them from the list endpoint.
- Remote messages return 404 for `pending`, deleted, or out-of-scope sessions; a malformed session ID returns 400.
- Session transcripts here are distinct from Claude Code analytics and Managed Agents sessions covered by other anthropic-* skills; this page is the Compliance API view only.

## Related

- [apps-chats.md](./apps-chats.md) — claude.ai chats and files
- [apps-projects.md](./apps-projects.md) — projects
- [code.md](./code.md) — Claude Code compliance endpoints
