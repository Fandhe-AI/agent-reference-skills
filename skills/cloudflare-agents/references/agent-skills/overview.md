---
source: https://developers.cloudflare.com/agents/skills/
---

# Agent skills (agents SDK)

Give a Cloudflare agent on-demand instructions, references, and scripts as Agent Skills (directories with a `SKILL.md`), loaded from a Computer Workspace, R2, or code.

## Signature / Usage

A skill is a directory named after the skill:

```text
release-notes/
  SKILL.md
  references/style-guide.md
  scripts/format-release-notes.js
  assets/logo.png
```

`SKILL.md` has YAML frontmatter followed by Markdown instructions:

```md
---
name: release-notes
description: Turn a list of changes into release notes. Use when the user asks for release notes or a changelog entry.
metadata:
  author: my-team
---

1. Read `references/style-guide.md`.
2. Group the changes under Features, Fixes, and Other.
```

Return sources from `getSkills()` in a Think agent:

```ts
import { Think, skills } from "@cloudflare/think";

export class MyAgent extends Think<Env> {
	getSkills() {
		return [
			skills.workspace(this.workspace),
			skills.r2(this.env.SKILLS_BUCKET, { prefix: "skills/" }),
		];
	}
}
```

| Source | Reads skills from |
|--------|-------------------|
| `skills.workspace()` | Files in a `@cloudflare/computer` Workspace ([source-computer.md](./source-computer.md)) |
| `skills.r2()` | Objects in an R2 bucket ([source-r2.md](./source-r2.md)) |
| `skills.manifest()` | Skills defined in code ([source-code.md](./source-code.md)) |

### Skill tools

| Tool | Purpose |
|------|---------|
| `activate_skill` | Load a skill's instructions and its list of resources |
| `read_skill_resource` | Read a resource by `{ name, path }` or a qualified path such as `name/path` |
| `run_skill_script` | Run a bundled script, when a script runner is set ([execution.md](./execution.md)) |

### Validation with parseSkill

```ts
import { parseSkill } from "agents/skills";

const parsed = parseSkill(markdown, { directory: "release-notes" });
if (!parsed.ok) {
	console.log(parsed.error.message); // the skill cannot be used
} else {
	for (const warning of parsed.warnings) {
		console.log(warning.code, warning.message); // for example, "name-mismatch"
	}
}
```

(`markdown` is the skill file text; this is a fragment.)

### Use without Think

`loadSkillCatalog()` merges sources; `createSkillTools()` from `agents/skills/tools/ai-sdk` builds AI SDK tools. `model`, `messages`, and `computerWorkspace` below are placeholders you supply.

Adapted (not in the official docs): `stopWhen: stepCountIs(5)` is added; without it the AI SDK stops after one step, so the model never sees the tool results it requested. See Notes.

```ts
import { stepCountIs, streamText } from "ai";
import { loadSkillCatalog, workspace } from "agents/skills";
import { createSkillTools } from "agents/skills/tools/ai-sdk";

// `computerWorkspace` is a Workspace from @cloudflare/computer.
const catalog = await loadSkillCatalog([workspace(computerWorkspace)]);

const result = streamText({
	model,
	system: catalog.prompt() ?? undefined,
	tools: createSkillTools(catalog),
	messages,
	stopWhen: stepCountIs(5),
});
```

## Options / Props

`SKILL.md` frontmatter validation (Agent Skills specification):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `name` | string | directory name if missing | 1 to 64 lowercase letters, digits, hyphens; no leading/trailing hyphen or `--`; must match the directory name |
| `description` | string | required | At most 1,024 characters |
| `compatibility` | string | — | 1 to 500 characters when present |
| `metadata` | map of string to string | — | String keys to string values |
| `allowed-tools` | string | — | Space-separated string |

Load behaviour:

| Problem | What happens |
|---------|--------------|
| `name` breaks format, too long, or mismatches directory | Loads, with a warning |
| `name` missing | Loads with the directory name, with a warning |
| `description` or `compatibility` too long | Loads, with a warning |
| `license`, `metadata`, or `allowed-tools` invalid | Loads without that field, with a warning |
| Unquoted `:` makes YAML invalid | Loads after quoting the value, with a warning |
| `description` missing | Skipped and logged |
| `name` contains `/`, `\`, control characters, or is `.` / `..` | Skipped and logged |
| Frontmatter missing or still not YAML | Skipped and logged |

## Notes

- Corrected from the official docs: the example omitted `stopWhen`, and AI SDK `generateText` / `streamText` stop after a single step by default, so a tool call is executed but no answer is generated from its result; `stopWhen: stepCountIs(5)` (an example limit) lets the model continue after tool results.
- Experimental: the API may change. These pages describe an Agents SDK release line with Think support (see SKILL.md for versions).
- Sources apply in order; the first source to provide a skill name wins and later duplicates are skipped with a logged warning. Think re-lists every source before each turn, so new, edited, and deleted skills take effect next turn. The catalog sits in the system prompt below `getSystemPrompt()`; mid-conversation changes arrive as a reminder to keep the provider prompt cache warm. Use `getSystemPrompt()` or `configureContext()` for per-turn instructions; use skills for procedures only some tasks need.
- Unknown frontmatter keys are kept in `skill.extraFields`; `disable-model-invocation: true` hides a skill from the model. The Pi harness takes the same sources through `skills(sources)` from `agents/harness/pi`.
- Distinct from Claude Code Agent Skills: these are the Cloudflare Agents SDK's own runtime feature for agents running on Workers. They use the same agentskills.io `SKILL.md` format, but are loaded by `getSkills()` and exposed as agent tools, not by Claude Code; Claude Code Agent Skills (SKILL.md in `.claude/skills/`) are covered by anthropic-claude-code-extend. They are also unrelated to the reference skills in this repository.
- Distance lines for MCP: MCP servers on Workers are the mcp category; the protocol spec is mcp-spec.

## Related

- [Execution](./execution.md)
- [Code source](./source-code.md)
- [Computer source](./source-computer.md)
- [R2 source](./source-r2.md)
