<!-- source: https://platform.claude.com/docs/en/api/beta/skills/versions/download / last verified: 2026-11-14 -->

# Download Skill Version Content

Downloads a skill version's content as a zip archive.

## Signature / Usage

```http
GET /v1/skills/{skill_id}/versions/{version}/content
```

Adapted (not in the official docs): the official example sends `-H "Authorization: Bearer $ANTHROPIC_API_KEY"`; this page keeps `X-Api-Key`.

```bash
curl https://api.anthropic.com/v1/skills/$SKILL_ID/versions/$VERSION/content \
    -H 'anthropic-version: 2026-10-21' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `skill_id` (path) | string | Unique identifier for the skill. |
| `version` (path) | string | Version ID (`skver_...`). Requests carrying `skills-2025-10-02` address versions by Unix epoch timestamp instead (e.g. `"1759178010641129"`) |
| `anthropic-version` (header) | optional string | API version |
| `anthropic-workspace-id` (header) | optional string | Selects the Workspace; only needed for credentials that can act on more than one Workspace |
| `anthropic-beta` (header) | optional array of AnthropicBeta | Not required; `skills-2025-10-02` is deprecated (sending it selects the beta shapes) |

## Notes

- The official example no longer sends `anthropic-beta: skills-2025-10-02`: that header is deprecated (sending it selects the beta response shapes and epoch-timestamp version addressing). The page is still published under the beta API reference path (`/api/beta/skills/versions/download`), but the other Skills endpoints are GA.
- The version `name` is also the base name of the downloaded archive and the top-level directory of the Skill's mounted files.
- Not supported on Microsoft Foundry (per the Agent Skills overview).
- Response body is a zip archive rather than a JSON object; no `## Options / Props` returns table applies.
- Adapted from the official docs: the example authenticates with `X-Api-Key: $ANTHROPIC_API_KEY` instead of the official `Authorization: Bearer $ANTHROPIC_API_KEY` header.
- Source: https://platform.claude.com/docs/en/api/beta/skills/versions/download (fetched 2026-11-14)
- This is the Claude API Skills API (management of SKILL.md packages), distinct from this repository's own skills concept and from Claude Code Skills.

## Related

- [Get Skill Version](./skills-versions-retrieve.md)
- [Create Skill Version](./skills-versions-create.md)
