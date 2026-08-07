<!-- source: https://platform.claude.com/docs/en/api/beta/skills/delete / last verified: 2026-08-07 -->

# Delete Skill

Deletes a Skill.

## Signature / Usage

```http
DELETE /v1/skills/{skill_id}
```

```http
curl https://api.anthropic.com/v1/skills/$SKILL_ID \
    -X DELETE \
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
| `id` | string | Unique identifier for the deleted skill. |
| `type` | string | Deleted object type, always `"skill_deleted"`. |

## Notes

- Beta endpoint: requires the `anthropic-beta: skills-2025-10-02` header.
- This is the Claude API Skills API (management of SKILL.md packages), distinct from this repository's own skills concept and from Claude Code Skills.

## Related

- [Get Skill](./skills-retrieve.md)
- [Delete Skill Version](./skills-versions-delete.md)
