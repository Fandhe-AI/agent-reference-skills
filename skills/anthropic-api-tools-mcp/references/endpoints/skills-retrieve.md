<!-- source: https://platform.claude.com/docs/en/api/beta/skills/retrieve / last verified: 2026-08-07 -->

# Get Skill

Fetches a single Skill by ID.

## Signature / Usage

```http
GET /v1/skills/{skill_id}
```

```http
curl https://api.anthropic.com/v1/skills/$SKILL_ID \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: skills-2025-10-02' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `skill_id` (path) | string | Unique identifier for the skill. |
| `anthropic-beta` (header) | optional array of AnthropicBeta | Requires `skills-2025-10-02` for this endpoint. |

### Returns

| Name | Type | Description |
|------|------|-------------|
| `id` | string | Unique identifier for the skill. |
| `created_at` | string | ISO 8601 timestamp of creation. |
| `display_title` | string | Human-readable label, not included in the model prompt. |
| `latest_version` | string | Most recent version identifier for the skill. |
| `source` | string | `"custom"` or `"anthropic"`. |
| `type` | string | Object type, always `"skill"`. |
| `updated_at` | string | ISO 8601 timestamp of last update. |

## Notes

- Beta endpoint: requires the `anthropic-beta: skills-2025-10-02` header.
- This is the Claude API Skills API (management of SKILL.md packages), distinct from this repository's own skills concept and from Claude Code Skills.

## Related

- [List Skills](./skills-list.md)
- [Delete Skill](./skills-delete.md)
