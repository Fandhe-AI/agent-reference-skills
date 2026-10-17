# Build skills

Agent skills package instructions, resources, and optional scripts so ChatGPT or Codex can follow a workflow reliably. Built on the open agent skills standard (agentskills.io).

## Signature / Usage

```md
---
name: skill-name
description: Explain exactly when this skill should and should not trigger.
---

Skill instructions for ChatGPT or Codex to follow.
```

Directory layout:

```text
my-skill/
  SKILL.md          Required: instructions + metadata
  scripts/          Optional: executable code
  references/       Optional: documentation
  assets/           Optional: templates, resources
  agents/
    openai.yaml     Optional: appearance and dependencies
```

Create with the built-in creator: `$skill-creator` in Codex, `@skill-creator` in ChatGPT Work.

### Optional metadata (`agents/openai.yaml`)

```yaml
interface:
  display_name: "Optional user-facing name"
  short_description: "Optional user-facing description"
  icon_small: "./assets/small-logo.svg"
  icon_large: "./assets/large-logo.png"
  brand_color: "#3B82F6"
  default_prompt: "Optional surrounding prompt to use the skill with"

policy:
  allow_implicit_invocation: false

dependencies:
  tools:
    - type: "mcp"
      value: "openaiDeveloperDocs"
      description: "OpenAI Docs MCP server"
      transport: "streamable_http"
      url: "https://developers.openai.com/mcp"
```

`allow_implicit_invocation` (default `true`): when `false`, Codex does not implicitly invoke the skill; explicit `$skill` invocation still works.

### Enable or disable local skills

```toml
[[skills.config]]
path = "/path/to/skill/SKILL.md"
enabled = false
```

Restart Codex after changing `~/.codex/config.toml`.

### Install curated skills

Send this in the Codex composer (it is a skill invocation, not a shell command):

```text
$skill-installer linear
```

## Options / Props

### Where Codex loads local skills

| Scope | Location | Use |
|-------|----------|-----|
| REPO | `$CWD/.agents/skills` | Skills relevant to a working folder |
| REPO | `$CWD/../.agents/skills` | Skills for a shared parent folder |
| REPO | `$REPO_ROOT/.agents/skills` | Root skills for everyone in the repo |
| USER | `$HOME/.agents/skills` | Personal skills for any repo |
| ADMIN | `/etc/codex/skills` | Machine/container-wide default skills |
| SYSTEM | Bundled with Codex | skill-creator, plan skills, etc. |

## Notes

- `SKILL.md` must include `name` and `description`.
- Progressive disclosure: only name and description (plus file path in Codex) are listed initially; the full `SKILL.md` loads when the skill is selected. The initial list uses at most 2% of the model's context window, or 8,000 characters when unknown; Codex shortens descriptions first and may omit skills with a warning. Set `skills.max_context_tokens` (up to 10,000 tokens) to change the budget.
- Activation: explicit (`@` in ChatGPT; `/skills` or `$` in Codex CLI / IDE extension) or implicit by matching `description`. Front-load the key use case and trigger words.
- Codex detects skill changes automatically; restart if an update does not appear. Symlinked skill folders are followed. Same-name skills are not merged.
- Standalone skills: ChatGPT desktop app, Codex CLI, IDE extension. Skills bundled in plugins also work in Chat and Work on web, desktop, and mobile.
- To distribute skills, bundle two or more, or ship with a connector, package them as a plugin (developers.openai.com/plugins/build/plugins).
- Best practices: one job per skill; prefer instructions over scripts unless determinism or external tooling is needed; imperative steps with explicit inputs/outputs; test prompts against the description.
- These are Codex / ChatGPT skills (`.agents/skills`), distinct from Claude Code Skills (`.claude/skills`, SKILL.md of this repository).
- Source: https://learn.chatgpt.com/docs/build-skills (retrieved 2026-10).

## Related

- [Plugins](./plugins.md)
- [Record & Replay](./record-and-replay.md)
- [Scheduled tasks](./automations.md)
