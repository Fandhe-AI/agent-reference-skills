<!-- source: https://platform.claude.com/docs/en/build-with-claude/skills-guide / last verified: 2026-10-17 -->

# Using Agent Skills with the API

Use Anthropic-managed and custom Agent Skills through the Messages API `container` parameter (requires the code execution tool), and manage custom Skills with the Skills API. The Skills API is out of beta and needs no beta header.

## Signature / Usage

```bash
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{
    "model": "claude-opus-5-5",
    "max_tokens": 4096,
    "container": {
      "skills": [
        {
          "type": "anthropic",
          "skill_id": "pptx",
          "version": "latest"
        }
      ]
    },
    "messages": [{
      "role": "user",
      "content": "Create a presentation about renewable energy"
    }],
    "tools": [{
      "type": "code_execution_20250825",
      "name": "code_execution"
    }]
  }'
```

Upload a custom Skill (directory with top-level `SKILL.md`):

```bash
curl -X POST "https://api.anthropic.com/v1/skills" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -F "files[]=@financial_skill/SKILL.md;filename=financial_skill/SKILL.md" \
  -F "files[]=@financial_skill/analyze.py;filename=financial_skill/analyze.py"
```

## Options / Props

Skill sources (both use the same `container.skills[]` shape: `type`, `skill_id`, optional `version`):

| Aspect | Anthropic Skills | Custom Skills |
| --- | --- | --- |
| Type value | `anthropic` | `custom` |
| Skill IDs | Short names: `pptx`, `xlsx`, `docx`, `pdf` | Generated: `skill_01AbCdEfGhIjKlMnOpQrStUv` |
| Version format | Date-based: `20251013` or `latest` | Version ID: `skver_01AbCdEfGhIjKlMnOpQrStUv` or `latest` |
| Management | Pre-built and maintained by Anthropic | Upload and manage through the Skills API |
| Availability | Available to all users | Private to your workspace |

Limits:

| Limit | Value |
| --- | --- |
| Skills per request | 20 |
| Skill upload size | 30 MB (all files combined, uncompressed) |
| `name` | Max 64 chars, lowercase letters/numbers/hyphens only, no XML tags, no reserved words ("anthropic", "claude") |
| `description` | Max 1024 chars, non-empty, no XML tags |

## Notes

- Prerequisites: a Claude API key and the code execution tool enabled in the request. Skills run in the code execution container: no network access, no runtime package installation, and a fresh container unless an existing container ID is given.
- Skill files are copied into the container at `/skills/{skill-name}/`; the directory is the Skill's name (`pptx`, or the `SKILL.md` `name` for a custom Skill), not its `skill_01...` ID. Claude sees name/description metadata and loads full instructions only when needed.
- Generated files (Excel, PowerPoint, PDF, Word) are returned as `file_id` values inside `bash_code_execution_tool_result` blocks; download them with the Files API (`GET /v1/files/{file_id}/content`). Provide input files by uploading with the Files API and referencing a container upload block.
- Multi-turn: the response `container` carries `id` and `expires_at`; pass `container.id` (together with `skills`) in the next request to reuse the container.
- Long-running work: handle the `pause_turn` stop reason by appending the prior response `content` as the assistant turn and re-sending in the same container until `stop_reason` is no longer `pause_turn`.
- Custom Skills are workspace-scoped, not scoped to an end user, conversation, or session: any API key with workspace access can read, invoke, and delete every custom Skill in it. For multi-tenant platforms use one workspace per tenant.
- A new Skill version is a complete snapshot, not a delta: upload the full file set each time; omitted files are not carried over, and the `name` in `SKILL.md` must match the existing Skill name. `POST /v1/skills/{skill_id}/versions` creates a version.
- Agent Skills are not covered by ZDR arrangements. With the Compliance API enabled, its Activity Feed records Skill and Skill version creation and deletion.
- Distinct from Claude Code's SKILL.md skills (`anthropic-claude-code-extend`); this page covers the Skills API on the Claude API only.
- Migration (`skills-2025-10-02` beta -> GA): migrating is optional. Requests still sending `anthropic-beta: skills-2025-10-02` keep working and keep returning the beta response shapes; removing the header switches to the GA shapes below.

| | With `skills-2025-10-02` | Without the header |
| --- | --- | --- |
| Skill label | `display_title` (up to 64 chars, unique per workspace) | `display_name` (up to 255 chars, not unique); derived from `SKILL.md` `name` when omitted |
| Newest version pointer | `latest_version`, epoch-microsecond string | `latest_version_id`, a `skver_...` ID; `GET /v1/skills/{skill_id}/versions/latest` resolves it |
| Version identifier in URLs | Epoch-microsecond string | Version ID (`skver_...`); beta `skill_version_`-prefixed IDs accepted as input |
| Version object | Includes `directory` | No `directory` field |
| `source` | String, `"custom"` or `"anthropic"` | Object, e.g. `{"type": "custom"}`; example catalog value `"anthropic_example"` |
| List responses | `{ data, has_more, next_page }` | `{ data, next_page }`; `limit` 1 to 1,000 (default 20) |
| Versions list order | Oldest first | Newest first, default `limit` 20; page cursors are not interchangeable |
| Deleting a Skill | 400 error while any version exists | Deletes the Skill and all its versions |
| Deleting a Skill's only version | Allowed | 400 error; upload a replacement first, or delete the Skill |
| Upload layout | Files inside a top-level directory matching Skill `name` | `SKILL.md` may sit at upload root |
| Response types | `CreateSkillResponse`, `GetSkillResponse`, one type per operation | `Skill`, `SkillVersion`, `DeletedSkill`, `DeletedSkillVersion` |

- Migration steps: (1) drop the beta header and call `client.skills` instead of `client.beta.skills`; (2) rename `display_title` -> `display_name`, `latest_version` -> `latest_version_id`, read `source.type`; (3) store version `id` (or use `latest`) instead of epoch-microsecond versions; (4) review delete calls, since `DELETE /v1/skills/{skill_id}` now removes every version with the Skill.
- SDK beta namespace: from Python SDK 1.2.0, TypeScript SDK 0.122.0, Go SDK 1.68.0, Java SDK 2.59.0, Ruby SDK 1.67.0, and C# SDK 12.44.0, `client.beta.skills` no longer sends `skills-2025-10-02` and returns the same shapes as `client.skills` with `Beta`-prefixed type names (`BetaSkill`, `BetaSkillVersion`, `BetaDeletedSkill`, `BetaDeletedSkillVersion`); the beta Messages container Skill reference type is renamed `BetaSkill` -> `BetaContainerSkill`. Earlier releases send the header from `client.beta.skills`.
- A Skill whose versions were all deleted under the beta has no current version: `GET /v1/skills/{skill_id}` returns 400 and the Skill is omitted from list responses until a version is uploaded; it can still be deleted.

## Related

- [overview](./overview.md)
- [quickstart](./quickstart.md)
- [best-practices](./best-practices.md)
- [enterprise](./enterprise.md)
