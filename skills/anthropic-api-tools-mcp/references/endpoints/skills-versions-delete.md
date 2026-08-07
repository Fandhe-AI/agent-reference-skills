<!-- source: https://platform.claude.com/docs/en/api/beta/skills/versions/delete / last verified: 2026-08-07 -->

# Delete Skill Version

Deletes a specific version of a Skill.

## Signature / Usage

```http
DELETE /v1/skills/{skill_id}/versions/{version}
```

```http
curl https://api.anthropic.com/v1/skills/$SKILL_ID/versions/$VERSION \
    -X DELETE \
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
| `id` | string | Version identifier of the deleted skill version. |
| `type` | string | Deleted object type, always `"skill_version_deleted"`. |

## Notes

- Beta endpoint: requires the `anthropic-beta: skills-2025-10-02` header.
- This is the Claude API Skills API (management of SKILL.md packages), distinct from this repository's own skills concept and from Claude Code Skills.

## Related

- [Get Skill Version](./skills-versions-retrieve.md)
- [Delete Skill](./skills-delete.md)
