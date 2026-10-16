<!-- source: https://platform.claude.com/docs/en/api/skills/list / last verified: 2026-10-17 -->

# List Skills

Lists Skills, optionally filtered by source, with pagination. GA endpoint (no beta header).

## Signature / Usage

```http
GET /v1/skills
```

```bash
curl https://api.anthropic.com/v1/skills \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `limit` (query) | optional number | Results per page. Range 1 to 1000, default 20 |
| `page` (query) | optional string | Pagination token from a previous response's `next_page` |
| `source` (query) | optional string | `"custom"` returns only user-created skills; `"anthropic"` returns only Anthropic-created skills |
| `anthropic-version` (header) | optional string | API version |
| `anthropic-workspace-id` (header) | optional string | Selects the Workspace; only needed for credentials that can act on more than one Workspace |

### Returns

| Name | Type | Description |
|------|------|-------------|
| `data` | array of Skill | Each Skill has `type` (`"skill"`), `id`, `created_at`, `display_name`, `latest_version_id`, `source` (object with `type`: `custom` / `anthropic` / `anthropic_example` / `plugin`), `updated_at` |
| `next_page` | string or null | Token for the next page; `null` when there are no more results. Pass it as `page` |

## Notes

- There is no `has_more` field in the GA shape. With the beta header `skills-2025-10-02` the response is `{ data, has_more, next_page }` and Skills use the beta fields (`display_title`, `latest_version`, string `source`). Page cursors are not interchangeable between the two shapes.
- This is the Claude API Skills API (management of SKILL.md packages), distinct from this repository's own skills concept and from Claude Code Skills.

## Related

- [Create Skill](./skills-create.md)
- [Get Skill](./skills-retrieve.md)
