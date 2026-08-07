<!-- source: https://platform.claude.com/docs/en/managed-agents/skills / last verified: 2026-08-07 -->

# Skills

Reusable, filesystem-based resources that give an agent domain-specific expertise. Two types: pre-built Anthropic skills (`pptx`, `xlsx`, `docx`, `pdf`) and custom skills authored and uploaded to the workspace. Both are invoked automatically by the agent when relevant.

## Signature / Usage

```python
agent = client.beta.agents.create(
    name="Financial Analyst",
    model="claude-opus-5",
    system="You are a financial analysis agent.",
    skills=[
        {"type": "anthropic", "skill_id": "xlsx"},
        {"type": "custom", "skill_id": "skill_01AbCdEfGhIjKlMnOpQrStUv", "version": "latest"},
    ],
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `skills[].type` | string | `anthropic` (pre-built) or `custom` (workspace-authored) |
| `skills[].skill_id` | string | Short name (`xlsx`) for Anthropic skills, or `skill_*` ID (from `skills.create`) for custom skills |
| `skills[].version` | string | Pin a version or `latest` (default) |

## Notes

- A custom skill is a directory with `SKILL.md` plus supporting files, uploaded as a zip or individual files via `client.beta.skills.create(files=...)`; requires the `skills-2025-10-02` beta header when calling the Skills API directly with cURL (SDK/CLI send it automatically).
- Each session supports up to 500 skills, counted as the deduplicated set across every agent in a multiagent session. Mounting more skills increases sandbox startup time — attach only what each agent needs.
- Scope: Agent Skills as used from Managed Agents. For the Skills API itself and Skills use with the Messages API, see the anthropic-api-tools-mcp skill; for Claude Code CLI Skills, see the anthropic-claude-code-extend skill.

## Related

- [Tools](./tools.md)
- [Cloud environment setup](../environments/environments.md)
