<!-- source: https://platform.claude.com/docs/en/api/skills/create / last verified: 2026-10-17 -->

# Create Skill

Creates a new Skill from an uploaded SKILL.md package. GA endpoint (no beta header).

## Signature / Usage

```http
POST /v1/skills
```

```bash
curl https://api.anthropic.com/v1/skills \
    -H 'Content-Type: multipart/form-data' \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY" \
    -F 'files[]=@/path/to/file'
```

## Options / Props

Headers:

| Name | Type | Description |
|------|------|-------------|
| `anthropic-version` | optional string | API version to use |
| `anthropic-workspace-id` | optional string | Selects the Workspace for this request (a Workspace ID such as `wrkspc_...`). Only needed for credentials that can act on more than one Workspace; if sent, it must match the credential's Workspace |

Body parameters (form-data):

| Name | Type | Description |
|------|------|-------------|
| `files` | array of string | Files to upload. All files must be in the same top-level directory and must include a SKILL.md file at the root of that directory |
| `display_name` | optional string or null | Human-readable, single-line label, maximum 255 characters. Not unique. Derived from the SKILL.md frontmatter `name` when omitted |

### Returns

Skill object:

| Name | Type | Description |
|------|------|-------------|
| `type` | string | Always `"skill"` |
| `id` | string | Unique identifier for the skill; format and length may change over time |
| `created_at` | string | ISO 8601 timestamp of creation |
| `display_name` | string | Human-readable label (always set) |
| `latest_version_id` | string | ID of the newest Skill Version, what `latest` references resolve to. A Skill holds at least one version |
| `source` | object | `{ "type": ... }` where `type` is `custom` (authored by the platform user, private to their workspace), `anthropic` (published by Anthropic, shared and read-only), `anthropic_example` (Anthropic-published sample Skill), or `plugin` (resolved from an installed plugin) |
| `updated_at` | string | ISO 8601 timestamp of last update |

## Notes

- Sending the beta header `skills-2025-10-02` keeps the old beta shape (`display_title`, `latest_version`, string `source`, files inside a top-level directory matching the Skill `name`). Migration from the beta shape: see [skills-in-the-api.md](../agent-skills/skills-in-the-api.md) (migration notes and steps).
- This is the Claude API Skills API (management of SKILL.md packages), distinct from this repository's own skills concept and from Claude Code Skills.

## Related

- [List Skills](./skills-list.md)
- [Get Skill](./skills-retrieve.md)
- [Delete Skill](./skills-delete.md)
- [Create Skill Version](./skills-versions-create.md)
- [Using Agent Skills with the API](../agent-skills/skills-in-the-api.md)
