<!-- source: https://platform.claude.com/docs/en/manage-claude/compliance-activity-feed / last verified: 2026-08-07 -->

# Query the Activity Feed

Retrieve, filter, and paginate your organization's Compliance API Activity Feed. Records every authentication, chat, file, project, administrative, and platform action, in reverse chronological order. Queryable within 1 minute of occurring; retained for 6 years. Required scope: `read:compliance_activities`.

## Signature / Usage

```bash
curl --fail-with-body -sS -G \
  "https://api.anthropic.com/v1/compliance/activities" \
  --data-urlencode "activity_types[]=claude_file_uploaded" \
  --data-urlencode "activity_types[]=claude_chat_created" \
  --data-urlencode "created_at.gte=2026-04-01T00:00:00Z" \
  --header "x-api-key: $ANTHROPIC_COMPLIANCE_ACCESS_KEY"
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `activity_types[]` | string (repeatable) | Filter by activity type; hundreds of distinct values (see API reference) |
| `actor_ids[]` | string (repeatable) | Filter by actor (user) ID |
| `organization_ids[]` | string (repeatable) | Filter by organization |
| `created_at.gte` / `.gt` / `.lte` / `.lt` | RFC 3339 timestamp | Time window bounds |
| `limit` | integer | Default 100, max 5,000 |
| `after_id` / `before_id` | string (opaque cursor) | Cursor pagination; only one may be set per request |

## Notes

- Newest first, ties broken by activity ID. Two pagination schemes exist across the Compliance API: Activities and chats use cursor (`after_id`/`before_id`); organizations/users/roles/groups/projects/sessions use page token (`page`/`next_page`).
- Pass `last_id` as `after_id` to advance to older entries; pass `first_id` as `before_id` to return to newer entries. Stop when `has_more` is `false`.
- Cursors are safe to reuse on retry: a failed request (5xx/timeout) does not advance your position.
- The `actor` field is a discriminated union (`user_actor`, `api_actor`, `admin_api_key_actor`, `unauthenticated_user_actor`, `anthropic_actor`, `scim_directory_sync_actor`); build forward-compatible handlers that pass through unrecognized `type`/`actor.type` values.

## Related

- [compliance-api.md](./compliance-api.md)
- [compliance-content-data.md](./compliance-content-data.md)
- [compliance-integration-patterns.md](./compliance-integration-patterns.md)
- [compliance-errors.md](./compliance-errors.md)
