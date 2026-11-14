<!-- source: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview / last verified: 2026-11-14 -->

# Agent Skills overview

Agent Skills are modular capabilities that extend Claude's functionality on the Claude API. Each Skill packages instructions, metadata, and optional resources (scripts, templates) that Claude uses automatically when relevant, via progressive disclosure.

## Signature / Usage

```yaml
---
name: pdf-processing
description: Extract text and tables from PDF files, fill forms, merge documents. Use when working with PDF files or when the user mentions PDFs, forms, or document extraction.
---
```

## Options / Props

| Level | When loaded | Token cost | Content |
| --- | --- | --- | --- |
| Level 1: Metadata | Always (at startup) | ~100 tokens per Skill | `name` and `description` from YAML frontmatter |
| Level 2: Instructions | When Skill is triggered | Under 5k tokens | SKILL.md body |
| Level 3+: Resources | As needed | None until accessed | Bundled files, scripts run through bash |

| `name` field | Requirement |
| --- | --- |
| Length | Max 64 characters |
| Characters | Lowercase letters, numbers, hyphens only |
| Reserved words | Cannot contain "anthropic", "claude" |

| `description` field | Requirement |
| --- | --- |
| Content | Non-empty, max 1024 characters, no XML tags |

## Notes

- Pre-built Agent Skills (`pptx`, `xlsx`, `docx`, `pdf`) are available on the Claude API, Claude Platform on AWS, Microsoft Foundry, and claude.ai (Messages API availability is stable on Claude Models on Google Cloud (Anthropic managed) too; Skills work on every model); custom Skills can be uploaded via the Skills API, Claude Code, or claude.ai Settings.
- On the Claude API, Skills run via the `container.skills` parameter alongside the code execution tool. The Skills API is out of beta and needs no beta header; requests that still send `skills-2025-10-02` keep working and keep returning the beta response shapes (see the Skills API migration notes on the endpoints/skills-* pages).
- Custom Skills uploaded through the API are shared workspace-wide: all workspace members can access them.
- Claude Platform on AWS and Microsoft Foundry follow the same Skills behavior and limitations as the Claude API; on Microsoft Foundry the Skill version download endpoint (`GET /v1/skills/{skill_id}/versions/{version}/content`) is not supported.
- Managed Agents: attach skills in the agent's `skills` array, or load them from a GitHub repository mounted on the session. In the Messages API, include the code execution tool and attach skills through the `container` parameter. The official overview page words this as listing `skill_ids` in `container`, while the quickstart and skills-in-the-api pages show the request shape `container.skills` (objects with `type`, `skill_id`, `version`); use the `container.skills` form (see skills-in-the-api.md).
- Not covered by zero data retention and not HIPAA-eligible; skill definitions and execution data follow the standard retention policy. Endpoints: `/v1/skills`, `/v1/messages` with `skills`.
- Claude Enterprise organizations can turn on Skill content scanning for custom Skills uploaded in claude.ai and Claude Cowork; it does not cover Skills uploaded through the Skills API or the Claude Console. Prefer Skills only from trusted sources (own or Anthropic).
- Custom Skills do not sync across surfaces: claude.ai, Claude API, and Claude Code each require separate uploads.
- API sandbox has no network access and no runtime package installation; Claude Code Skills have full network access.
- Source: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview (fetched 2026-11-14)
- This is the Claude API (Messages API) side of Agent Skills. Claude Code's Skills (SKILL.md discovered from `.claude/skills/`) are a distinct topic — see the `anthropic-claude-code-extend` skill. Consuming Skills from the Agent SDK is covered by `anthropic-agent-sdk`.

## Related

- [quickstart](./quickstart.md)
- [best-practices](./best-practices.md)
- [claude-api-skill](./claude-api-skill.md)
- [enterprise](./enterprise.md)
