<!-- source: https://platform.claude.com/docs/en/api/skills/versions/delete / last verified: 2026-10-17 -->

# Delete Skill Version

Deletes a specific version of a Skill. GA endpoint (no beta header).

## Signature / Usage

```http
DELETE /v1/skills/{skill_id}/versions/{version}
```

```bash
curl https://api.anthropic.com/v1/skills/$SKILL_ID/versions/$VERSION \
    -X DELETE \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `skill_id` (path) | string | Unique identifier for the skill |
| `version` (path) | string | The version ID (`skver_...`) |
| `anthropic-version` (header) | optional string | API version |
| `anthropic-workspace-id` (header) | optional string | Selects the Workspace; only needed for credentials that can act on more than one Workspace |

### Returns

| Name | Type | Description |
|------|------|-------------|
| `id` | string | Identifier of the deleted skill version |
| `type` | string | Always `"skill_version_deleted"` |

## Notes

- Behavior change from the beta: in GA, deleting a Skill's only version returns a 400 error. Upload a replacement version first, or delete the Skill. Under `skills-2025-10-02` this was allowed and left a Skill with no versions (such a Skill returns 400 on retrieve and is omitted from list responses until a version is uploaded).
- Requests carrying the `skills-2025-10-02` beta header address versions by their Unix epoch timestamp instead of the version ID.
- This is the Claude API Skills API (management of SKILL.md packages), distinct from this repository's own skills concept and from Claude Code Skills.

## Related

- [Get Skill Version](./skills-versions-retrieve.md)
- [Delete Skill](./skills-delete.md)
