<!-- source: https://platform.claude.com/docs/en/api/beta/skills/versions/list / last verified: 2026-08-07 -->

# List Skill Versions

Lists the versions of a Skill, with pagination.

## Signature / Usage

```http
GET /v1/skills/{skill_id}/versions
```

```http
curl https://api.anthropic.com/v1/skills/$SKILL_ID/versions \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: skills-2025-10-02' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `skill_id` (path) | string | Unique identifier for the skill. |
| `limit` (query) | optional number | Items per page. Default 20, range 1-1000. |
| `page` (query) | optional string | `next_page` token from a previous response. |
| `anthropic-beta` (header) | optional array of AnthropicBeta | Requires `skills-2025-10-02` for this endpoint. |

### Returns

| Name | Type | Description |
|------|------|-------------|
| `data` | array of SkillVersion | List of skill versions (`id`, `created_at`, `description`, `directory`, `name`, `skill_id`, `type`, `version`). |
| `has_more` | boolean | Whether more results are available in the requested page direction. |
| `next_page` | string | Token to pass as `page` in the next request. |

## Notes

- Beta endpoint: requires the `anthropic-beta: skills-2025-10-02` header.
- This is the Claude API Skills API (management of SKILL.md packages), distinct from this repository's own skills concept and from Claude Code Skills.

## Related

- [Create Skill Version](./skills-versions-create.md)
- [Get Skill Version](./skills-versions-retrieve.md)
