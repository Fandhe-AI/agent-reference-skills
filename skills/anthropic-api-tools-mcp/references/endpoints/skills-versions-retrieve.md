<!-- source: https://platform.claude.com/docs/en/api/skills/versions/retrieve / last verified: 2026-10-17 -->

# Get Skill Version

Fetches a single Skill version by skill ID and version identifier. GA endpoint (no beta header).

## Signature / Usage

```http
GET /v1/skills/{skill_id}/versions/{version}
```

```bash
curl https://api.anthropic.com/v1/skills/$SKILL_ID/versions/$VERSION \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `skill_id` (path) | string | Unique identifier for the skill |
| `version` (path) | string | A version ID (`skver_...`), or the literal `latest` for the Skill's most recent version |
| `anthropic-version` (header) | optional string | API version |
| `anthropic-workspace-id` (header) | optional string | Selects the Workspace; only needed for credentials that can act on more than one Workspace |

### Returns

SkillVersion object: `type` (`"skill_version"`), `id` (addresses the version in paths and pins it in references), `created_at`, `description` (extracted from SKILL.md), `name` (the Skill's immutable kebab-case slug), `skill_id`. There is no `directory` field.

## Notes

- `GET /v1/skills/{skill_id}/versions/latest` resolves the newest version in one call.
- IDs captured under the beta with the `skill_version_` prefix are accepted as input. Requests carrying the `skills-2025-10-02` beta header address versions by their Unix epoch timestamp instead (e.g. `"1759178010641129"`).
- This is the Claude API Skills API (management of SKILL.md packages), distinct from this repository's own skills concept and from Claude Code Skills.

## Related

- [List Skill Versions](./skills-versions-list.md)
- [Download Skill Version Content](./skills-versions-download.md)
- [Delete Skill Version](./skills-versions-delete.md)
