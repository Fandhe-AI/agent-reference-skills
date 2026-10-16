<!-- source: https://platform.claude.com/docs/en/api/skills/retrieve / last verified: 2026-10-17 -->

# Get Skill

Fetches a single Skill by ID. GA endpoint (no beta header).

## Signature / Usage

```http
GET /v1/skills/{skill_id}
```

```bash
curl https://api.anthropic.com/v1/skills/$SKILL_ID \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `skill_id` (path) | string | Unique identifier for the skill; format and length may change over time |
| `anthropic-version` (header) | optional string | API version |
| `anthropic-workspace-id` (header) | optional string | Selects the Workspace; only needed for credentials that can act on more than one Workspace |

### Returns

| Name | Type | Description |
|------|------|-------------|
| `type` | string | Always `"skill"` |
| `id` | string | Unique identifier for the skill |
| `created_at` | string | ISO 8601 timestamp of creation |
| `display_name` | string | Human-readable label, maximum 255 characters, not unique |
| `latest_version_id` | string | ID of the newest Skill Version (what `latest` resolves to) |
| `source` | object | `{ "type": "custom" \| "anthropic" \| "anthropic_example" \| "plugin" }` |
| `updated_at` | string | ISO 8601 timestamp of last update |

## Notes

- A Skill whose versions were all deleted under the beta has no current version to return: this call returns a 400 error and the Skill is omitted from list responses until a version is uploaded. It can still be deleted.
- With the beta header `skills-2025-10-02` the response keeps the beta shape (`display_title`, `latest_version`, string `source`).
- This is the Claude API Skills API (management of SKILL.md packages), distinct from this repository's own skills concept and from Claude Code Skills.

## Related

- [List Skills](./skills-list.md)
- [Delete Skill](./skills-delete.md)
