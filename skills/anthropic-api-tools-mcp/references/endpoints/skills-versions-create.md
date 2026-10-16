<!-- source: https://platform.claude.com/docs/en/api/skills/versions/create / last verified: 2026-10-17 -->

# Create Skill Version

Creates a new version of an existing Skill from an uploaded package. GA endpoint (no beta header).

## Signature / Usage

```http
POST /v1/skills/{skill_id}/versions
```

```bash
curl https://api.anthropic.com/v1/skills/$SKILL_ID/versions \
    -H 'Content-Type: multipart/form-data' \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY" \
    -F 'files[]=@/path/to/file'
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `skill_id` (path) | string | Unique identifier for the skill |
| `files` (form-data) | array of string | Files to upload. All files must be in the same top-level directory and must include a SKILL.md file at the root of that directory |
| `anthropic-version` (header) | optional string | API version |
| `anthropic-workspace-id` (header) | optional string | Selects the Workspace; only needed for credentials that can act on more than one Workspace |

### Returns

SkillVersion object (no `directory` field):

| Name | Type | Description |
|------|------|-------------|
| `type` | string | Always `"skill_version"` |
| `id` | string | Unique identifier for this version; addresses the version in paths and pins it in references |
| `created_at` | string | ISO 8601 timestamp of creation |
| `description` | string | Description extracted from the SKILL.md file |
| `name` | string | The Skill's immutable kebab-case slug, set at creation from the first upload's SKILL.md frontmatter `name` (or its enclosing directory). Every later upload must resolve to the same value |
| `skill_id` | string | Identifier of the parent skill |

## Notes

- A new version is a complete snapshot, not a delta: upload the Skill's full file set each time. Files you omit are not carried over, and the `name` in the new version's `SKILL.md` must match the Skill's existing name.
- Under the beta header `skills-2025-10-02` the version object also has `directory` and `version` (a Unix epoch string such as `"1759178010641129"`), and files must sit inside a top-level directory matching the Skill `name`. In GA the version identifier is the `id` (`skver_...`).
- This is the Claude API Skills API (management of SKILL.md packages), distinct from this repository's own skills concept and from Claude Code Skills.

## Related

- [List Skill Versions](./skills-versions-list.md)
- [Get Skill Version](./skills-versions-retrieve.md)
- [Download Skill Version Content](./skills-versions-download.md)
