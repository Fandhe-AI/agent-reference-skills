<!-- source: https://platform.claude.com/docs/en/api/beta/skills/list / last verified: 2026-08-07 -->

# List Skills

Lists Skills, optionally filtered by source, with pagination.

## Signature / Usage

```http
GET /v1/skills
```

```http
curl https://api.anthropic.com/v1/skills \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: skills-2025-10-02' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `limit` (query) | optional number | Results per page. Max 100, default 20. |
| `page` (query) | optional string | Pagination token from a previous response's `next_page` field. |
| `source` (query) | optional string | Filter by `"custom"` or `"anthropic"`. |
| `anthropic-beta` (header) | optional array of AnthropicBeta | Requires `skills-2025-10-02` for this endpoint. |

### Returns

| Name | Type | Description |
|------|------|-------------|
| `data` | array of Skill | List of skills (`id`, `created_at`, `display_title`, `latest_version`, `source`, `type`, `updated_at`). |
| `has_more` | boolean | Whether more results are available. |
| `next_page` | string | Token to fetch the next page, `null` if none. |

## Notes

- Beta endpoint: requires the `anthropic-beta: skills-2025-10-02` header.
- This is the Claude API Skills API (management of SKILL.md packages), distinct from this repository's own skills concept and from Claude Code Skills.

## Related

- [Create Skill](./skills-create.md)
- [Get Skill](./skills-retrieve.md)
