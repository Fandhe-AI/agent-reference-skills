<!-- source: https://platform.claude.com/docs/en/manage-claude/compliance-sessions / last verified: 2026-10-17 -->

# Retrieve session transcripts

List the sessions users run in Claude apps and agents (Cowork, Claude Code, Claude Science, Claude for Microsoft 365, Claude in Chrome, Google Docs/Sheets/Slides add-ins) and retrieve their transcripts through the Compliance API. Claude Enterprise organizations only. Required scope: `read:compliance_user_data` on the Compliance Access Key (same key as the chat/file/project endpoints); Admin API keys (`sk-ant-admin01-...`) get 403.

## Signature / Usage

```bash
# List local sessions created since a date
curl --fail-with-body -sS -G \
  "https://api.anthropic.com/v1/compliance/apps/sessions/local" \
  --header "x-api-key: $ANTHROPIC_COMPLIANCE_ACCESS_KEY" \
  --header "anthropic-version: 2023-06-01" \
  --data-urlencode "created_at.gte=2026-07-01T00:00:00Z" \
  --data-urlencode "limit=100"

# Get a local session transcript
curl --fail-with-body -sS \
  "https://api.anthropic.com/v1/compliance/apps/sessions/local/$session_id/messages" \
  --header "x-api-key: $ANTHROPIC_COMPLIANCE_ACCESS_KEY" \
  --header "anthropic-version: 2023-06-01"
```

## Options / Props

Endpoints:

| Endpoint | Description |
| --- | --- |
| `GET /v1/compliance/apps/sessions/local` | List local session metadata (sessions on users' machines) |
| `GET /v1/compliance/apps/sessions/local/{session_id}` | One local session's metadata (no envelope, no transcript) |
| `GET /v1/compliance/apps/sessions/local/{session_id}/messages` | One local session's transcript |
| `GET /v1/compliance/apps/sessions/remote` | List remote (cloud) session metadata |
| `GET /v1/compliance/apps/sessions/remote/{session_id}/messages` | One remote session's transcript |

Product to endpoint family:

| Product | Family | `product_surface` |
| --- | --- | --- |
| Cowork in Claude Desktop | local | `cowork` |
| Claude Code (terminal, Desktop, IDE extension) | local | `claude_code` |
| Claude Science desktop app | local | `claude_science` |
| Claude for Microsoft 365 | local | `office_agents/excel`, `office_agents/powerpoint`, `office_agents/word`, `office_agents/outlook` |
| Claude in Chrome | local | `claude_in_chrome` |
| Claude add-ins for Google Docs / Sheets / Slides | local | `office_agents/google_docs`, `office_agents/google_sheets`, `office_agents/google_slides` |
| Cowork started on claude.ai web or mobile (cloud) | remote | `cowork_remote` |

Query parameters:

| Name | Applies to | Description |
| --- | --- | --- |
| `created_at.gte` / `.gt` / `.lt` / `.lte` | local list, remote list | RFC 3339 timestamp (local requires a UTC offset); upper bound must be after the lower bound |
| `updated_at.gte` | local list only | Sessions whose last inference call is at or after the time; remote has no `updated_at` filter |
| `organization_ids[]` | remote list | Up to 500 values; omit for every readable organization |
| `user_ids[]` | remote list | 1-10 user IDs; excludes agent-owned sessions |
| `limit` | lists | Default 100, max 500 |
| `limit` | messages | Default 100, max 1,000 |
| `page` | all | Pass the previous response's `next_page`; stop when `next_page` is `null` |
| `order` | messages | `desc` reverses the default oldest-first order |
| `tool_use_input_max_bytes`, `tool_result_max_bytes` | messages | Default 10,000 bytes; `-1` = server max (about 1 MiB); `0` returns 400 |

## Notes

- Local and remote families are read-only; sessions cannot be deleted through the Compliance API. Both use the same key and scope; no new setting or client update is needed.
- Local sessions are recorded server-side as requests reach the Claude API (ID prefix `clls_`); nothing is installed on the device. Transcripts show what Claude was asked and returned, not device activity. Remote sessions use ID prefix `cse_`.
- Not returned: Claude Code sessions authenticated with a Console API key or run via Bedrock / Google Cloud / Microsoft Foundry; Claude Code cloud sessions (including cloud routines; remote endpoints return Cowork sessions only); local sessions of non-Cowork/Claude Code products when HIPAA readiness is enabled; local sessions under zero data retention (excluded from lists, 404 on retrieve/messages).
- Retention: local 6 years by default, or the organization's finite custom conversation retention period (shortest applies if several); 30 days (or a shorter custom period) with HIPAA readiness. Remote 6 years unless the user deletes the session sooner. A retention setting change stops endpoints returning older activity immediately, but lengthening it does not restore expired content.
- Local list is newest-first by `created_at`, forward-only pagination, no `has_more` field; complete a list walk within 24 hours (cursors are re-evaluated against the retention boundary). `created_at` can advance as old calls age out, so deduplicate on `id`.
- To poll for new activity, set `updated_at.gte` a few minutes before the previous run's start (overlapping windows), deduplicate sessions on `id` and messages on `id`. An exact previous-time bound can permanently drop a session whose final call was still indexing.
- New sessions and messages appear after a short processing delay (typically minutes).
- `product_surface` may be `null`, or `office_agents` alone (app not recorded; do not assume Microsoft 365). The Google values have been recorded since October 5, 2026; older Google add-in sessions can show `office_agents` until used again. Pass through unrecognized `product_surface` / `status` values and ignore unexpected fields.
- Local session objects have `updated_at` but no `status` or `deleted_at` (deleting a conversation in an Office/Google add-in happens client-side only). `user.email_address` is `null` if the account was deleted or the user left; on the messages endpoint it is always `null` (join `user.id` against the list/retrieve endpoint).
- Local transcript content: thinking blocks never included; system prompt replaced by a `[system prompt content not shown]` marker; tool definitions and MCP configuration not included; images/PDFs/binary appear as `[<block type> content not shown]` with `truncated: true`; citation metadata omitted. Nothing masks URLs, credentials, or personal data, so treat transcripts as sensitive. `tool_use.input` is a JSON-encoded string; a truncated input is no longer valid JSON.
- `provenance` is `null` for verified content; otherwise `content_unavailable` (reasons `not_captured`, `client_aborted`, `cmek_key_revoked` (reserved, not currently returned), `retention_elapsed`, `oversize`), `client_asserted`, or `synthetic_marker`. Tolerate unrecognized types and reasons. Preserve returned message order; do not re-sort by `created_at`.
- With customer-managed encryption keys, an unusable key makes the messages endpoint return 503 for affected pages (never reported as `not_captured`); listing and metadata are unaffected.
- A very large session can return 400 (page too large; do not retry, read oldest first with a client timeout of at least 5 minutes) or 429 with `error.details.error_code` of `transcript_read_server_busy` (retry unchanged after `retry-after`). See the errors page.
- Local endpoints count only against the shared Compliance API rate limit; remote endpoints also have a second request budget. Local endpoints return 404 `Local sessions are not available.` if unavailable to the parent organization.
- Claude Science calls connectors from code in a `repl` tool call, so match on the `input` code (use `tool_use_input_max_bytes=-1`), unlike Cowork / Claude Code which use `mcp__<server>__<tool>` names.
- Remote sessions: owned by a user or an agent (`agent_id` prefix `cagt_`, `started_by_user` identifies the human for agent-owned runs); `status` is `pending`, `active`, `paused`, `archived`, or `failed`; messages endpoint returns 404 for `pending` sessions. On the remote messages envelope, `user.email_address`, `started_by_user`, and `claude_project_id` are always `null`. To retrieve a unified-experience chat, use the chat endpoints instead.
- Alternative to pull-based retrieval: OpenTelemetry logging (Cowork, Claude Code), which is push-based, includes host/device metadata and token usage but you run the collector.

## Related

- [compliance-content-data.md](./compliance-content-data.md)
- [compliance-api-access.md](./compliance-api-access.md)
- [compliance-org-data.md](./compliance-org-data.md)
- [compliance-activity-feed.md](./compliance-activity-feed.md)
- [compliance-errors.md](./compliance-errors.md)
- [compliance-faq.md](./compliance-faq.md)
- [api-and-data-retention.md](./api-and-data-retention.md)
- [cmek.md](./cmek.md)
