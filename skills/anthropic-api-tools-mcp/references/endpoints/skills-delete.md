<!-- source: https://platform.claude.com/docs/en/api/skills/delete / last verified: 2026-10-17 -->

# Delete Skill

Deletes a Skill together with all of its versions. GA endpoint (no beta header).

## Signature / Usage

```http
DELETE /v1/skills/{skill_id}
```

```bash
curl https://api.anthropic.com/v1/skills/$SKILL_ID \
    -X DELETE \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `skill_id` (path) | string | Unique identifier for the skill |
| `anthropic-version` (header) | optional string | API version |
| `anthropic-workspace-id` (header) | optional string | Selects the Workspace; only needed for credentials that can act on more than one Workspace |

### Returns

| Name | Type | Description |
|------|------|-------------|
| `id` | string | Unique identifier for the deleted skill |
| `type` | string | Always `"skill_deleted"` |

## Notes

- Behavior change from the beta: in GA, `DELETE /v1/skills/{skill_id}` removes every version along with the Skill. Under `skills-2025-10-02` it returned a 400 error while any version existed. If you relied on that refusal as a safeguard, add your own check. After migrating, `client.skills.delete(skill_id)` and `client.beta.skills.delete(skill_id)` both delete the Skill and all its versions in one call.
- This is the Claude API Skills API (management of SKILL.md packages), distinct from this repository's own skills concept and from Claude Code Skills.

## Related

- [Get Skill](./skills-retrieve.md)
- [Delete Skill Version](./skills-versions-delete.md)
