<!-- source: https://platform.claude.com/docs/en/api/beta/skills/versions/retrieve / last verified: 2026-08-07 -->

# Get Skill Version

Fetches a single Skill version by skill ID and version identifier.

## Signature / Usage

```http
GET /v1/skills/{skill_id}/versions/{version}
```

```http
curl https://api.anthropic.com/v1/skills/$SKILL_ID/versions/$VERSION \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: skills-2025-10-02' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `skill_id` (path) | string | Unique identifier for the skill. |
| `version` (path) | string | Version identifier, a Unix epoch timestamp (e.g. `"1759178010641129"`). |
| `anthropic-beta` (header) | optional array of AnthropicBeta | Requires `skills-2025-10-02` for this endpoint. |

### Returns

| Name | Type | Description |
|------|------|-------------|
| `id` | string | Unique identifier for the skill version. |
| `created_at` | string | ISO 8601 timestamp of creation. |
| `description` | string | Description extracted from the SKILL.md file. |
| `directory` | string | Top-level directory name extracted from the uploaded files. |
| `name` | string | Human-readable name extracted from the SKILL.md file. |
| `skill_id` | string | Identifier of the parent skill. |
| `type` | string | Object type, always `"skill_version"`. |
| `version` | string | Version identifier. |

## Notes

- Beta endpoint: requires the `anthropic-beta: skills-2025-10-02` header.
- This is the Claude API Skills API (management of SKILL.md packages), distinct from this repository's own skills concept and from Claude Code Skills.

## Related

- [List Skill Versions](./skills-versions-list.md)
- [Download Skill Version Content](./skills-versions-download.md)
- [Delete Skill Version](./skills-versions-delete.md)
