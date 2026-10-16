<!-- source: https://platform.claude.com/docs/en/api/skills/versions/list / last verified: 2026-10-17 -->

# List Skill Versions

Lists the versions of a Skill, with pagination. GA endpoint (no beta header).

## Signature / Usage

```http
GET /v1/skills/{skill_id}/versions
```

```bash
curl https://api.anthropic.com/v1/skills/$SKILL_ID/versions \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `skill_id` (path) | string | Unique identifier for the skill |
| `limit` (query) | optional number | Items per page. Range 1 to 1000, default 20 |
| `page` (query) | optional string | `next_page` token from the previous response |
| `anthropic-version` (header) | optional string | API version |
| `anthropic-workspace-id` (header) | optional string | Selects the Workspace; only needed for credentials that can act on more than one Workspace |

### Returns

| Name | Type | Description |
|------|------|-------------|
| `data` | array of SkillVersion | Each has `type` (`"skill_version"`), `id`, `created_at`, `description`, `name`, `skill_id` |
| `next_page` | string or null | Token to pass as `page` in the next request; `null` when there are no more results |

## Notes

- Versions are listed newest first (default `limit` 20). Under the beta header `skills-2025-10-02` the list is oldest first, the response is `{ data, has_more, next_page }`, and versions have `directory` and an epoch `version`. Page cursors from one shape are not valid on the other.
- This is the Claude API Skills API (management of SKILL.md packages), distinct from this repository's own skills concept and from Claude Code Skills.

## Related

- [Create Skill Version](./skills-versions-create.md)
- [Get Skill Version](./skills-versions-retrieve.md)
