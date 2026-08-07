<!-- source: https://platform.claude.com/docs/en/api/beta/skills/create / last verified: 2026-08-07 -->

# Create Skill

Creates a new Skill from an uploaded SKILL.md package.

## Signature / Usage

```http
POST /v1/skills
```

```http
curl https://api.anthropic.com/v1/skills \
    -H 'Content-Type: multipart/form-data' \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: skills-2025-10-02' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY" \
    -F files='["Example data"]'
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `anthropic-beta` (header) | optional array of AnthropicBeta | Beta version(s) to enable. Requires `skills-2025-10-02` for this endpoint. |

### Returns

| Name | Type | Description |
|------|------|-------------|
| `id` | string | Unique identifier for the skill. Format/length may change over time. |
| `created_at` | string | ISO 8601 timestamp of creation. |
| `display_title` | string | Human-readable label, not included in the model prompt. |
| `latest_version` | string | Most recent version identifier for the skill. |
| `source` | string | `"custom"` (user-created) or `"anthropic"` (Anthropic-created). |
| `type` | string | Object type, always `"skill"`. |
| `updated_at` | string | ISO 8601 timestamp of last update. |

## Notes

- Beta endpoint: requires the `anthropic-beta: skills-2025-10-02` header.
- This is the Claude API Skills API (management of SKILL.md packages), distinct from this repository's own skills concept and from Claude Code Skills.

## Related

- [List Skills](./skills-list.md)
- [Get Skill](./skills-retrieve.md)
- [Delete Skill](./skills-delete.md)
- [Create Skill Version](./skills-versions-create.md)
