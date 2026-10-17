<!-- source: https://platform.claude.com/docs/en/managed-agents/skills / last verified: 2026-10-17 -->

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

## Create a custom skill with the CLI

`ant apply skills/pr-summary` uploads the `skills/pr-summary` directory (containing `SKILL.md` with `name` and `description` frontmatter), prints the new skill's ID, and records it in `claude-lock.json`. Commit `claude-lock.json` so the next `ant apply` uploads your edits as a new version instead of creating a second skill. An explicit `display_name` can be up to 255 characters and need not be unique in the workspace; otherwise it is derived from the `name` in `SKILL.md`.

## Load skills from a GitHub repository

When a session mounts a repository through a `github_repository` resource, the repository's root `.claude/skills` directory is scanned at session start, and each skill found becomes available to the agent. No upload and no entry in the agent's `skills` array are required. The agent sees each discovered skill's name, description, and path, and reads its `SKILL.md` when a task matches. Discovery relies on the agent's `read` tool (enabled by default); an agent with `read` disabled doesn't load repository skills.

```json
{
  "agent": "agent_...",
  "environment_id": "env_...",
  "resources": [
    {"type": "github_repository", "url": "https://github.com/org/repo", "mount_path": "/workspace/repo", "authorization_token": "$GITHUB_TOKEN"}
  ]
}
```

- Discovery finds skills at exactly `.claude/skills/<skill-name>/SKILL.md`, one directory level deep at the repository root. Not discovered at session start: `.claude/skills/SKILL.md` (no skill directory), `.claude/skills/tools/code-review/SKILL.md` (nested deeper), and `skills/code-review/SKILL.md` (outside `.claude`). A `.claude/skills` directory elsewhere (such as a package subdirectory) isn't announced at session start, though its skills can surface when the agent reads files under that subtree.
- Repository skills use the same `SKILL.md` format as uploaded custom skills.
- Repository skills are agent instructions, so a mounted repository is part of the agent's trust boundary: anyone who can commit to it can add or change a skill, the platform loads it without a review step, and tools such as `bash` and `web_fetch` give those instructions real reach. Mount only trusted repositories and review `.claude/skills` first.
- Repository skill discovery runs in cloud sandboxes; self-hosted sandboxes don't support GitHub repository resources.

## Notes

- A custom skill is a directory with `SKILL.md` plus supporting files, uploaded as a zip or individual files via `client.beta.skills.create(files=...)`; requires the `skills-2025-10-02` beta header when calling the Skills API directly with cURL (SDK/CLI send it automatically).
- Each session supports up to 500 skills, counted as the deduplicated set across every agent in a multiagent session. Mounting more skills increases sandbox startup time — attach only what each agent needs.
- Scope: Agent Skills as used from Managed Agents. For the Skills API itself and Skills use with the Messages API, see the anthropic-api-tools-mcp skill; for Claude Code CLI Skills, see the anthropic-claude-code-extend skill.

## Related

- [Tools](./tools.md)
- [Cloud environment setup](../environments/environments.md)
