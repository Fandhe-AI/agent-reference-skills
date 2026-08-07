<!-- source: https://platform.claude.com/docs/en/api/beta/skills/versions/download / last verified: 2026-08-07 -->

# Download Skill Version Content

Downloads a skill version's content as a zip archive.

## Signature / Usage

```http
GET /v1/skills/{skill_id}/versions/{version}/content
```

```http
curl https://api.anthropic.com/v1/skills/$SKILL_ID/versions/$VERSION/content \
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

## Notes

- Beta endpoint: requires the `anthropic-beta: skills-2025-10-02` header.
- Response body is a zip archive rather than a JSON object; no `## Options / Props` returns table applies.
- This is the Claude API Skills API (management of SKILL.md packages), distinct from this repository's own skills concept and from Claude Code Skills.

## Related

- [Get Skill Version](./skills-versions-retrieve.md)
- [Create Skill Version](./skills-versions-create.md)
