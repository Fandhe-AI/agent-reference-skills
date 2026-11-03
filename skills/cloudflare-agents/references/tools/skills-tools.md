---
source: https://developers.cloudflare.com/agents/tools/skills/
---

# Agent Skills tools

Give an agent tools to discover, load, and read Agent Skills (`SKILL.md` folders) on demand. The model sees a short catalog of names and descriptions and loads a skill only when a task matches.

## Signature / Usage

AI SDK adapter:

Adapted (not in the official docs): `stopWhen: stepCountIs(5)` is added; without it the AI SDK stops after one step, so the model never sees the tool results it requested. See Notes.

```ts
import { stepCountIs, streamText } from "ai";
import { loadSkillCatalog, r2 } from "agents/skills";
import { createSkillTools } from "agents/skills/tools/ai-sdk";

const catalog = await loadSkillCatalog([
	r2(env.SKILLS_BUCKET, { prefix: "skills/" }),
]);

const result = streamText({
	model,
	system: [instructions, catalog.prompt()].filter(Boolean).join("\n\n"),
	tools: { ...tools, ...createSkillTools(catalog) },
	messages,
	stopWhen: stepCountIs(5),
});
```

Think adapter (adds tools and catalog automatically):

```ts
import { Think, skills } from "@cloudflare/think";

export class MyAgent extends Think<Env> {
	getSkills() {
		return [skills.workspace(this.workspace)];
	}
}
```

Pi Durable adapter:

```ts
import { skills } from "agents/harness/pi";
import { r2 } from "agents/skills";

// Inside the harness factory, before Harness.open():
this.registry.install(
	await skills([r2(this.env.SKILLS_BUCKET, { prefix: "skills/" })]),
);
```

Other harnesses, using the catalog directly:

```ts
import {
	formatSkillDiagnostic,
	loadSkillCatalog,
	renderSkillResource,
	workspace,
} from "agents/skills";

// `computerWorkspace` is a Workspace from @cloudflare/computer.
const catalog = await loadSkillCatalog([workspace(computerWorkspace)]);

for (const diagnostic of catalog.diagnostics) {
	console.warn(formatSkillDiagnostic(diagnostic));
}

// Register these handlers with your harness's tool interface.
function activateSkill(input: { name: string }): string {
	const activated = catalog.activate(input.name);
	// Report failures as a tool error, for example an unknown skill.
	if (!activated.ok) throw activated.error;
	return activated.value;
}

async function readSkillResource(input: {
	name?: string;
	path: string;
}): Promise<string> {
	const read = await catalog.readResource(input);
	if (!read.ok) throw read.error;
	return renderSkillResource(read.value);
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `activate_skill` | tool | — | Returns a skill's instructions, its folder when it has one, and the list of bundled files. |
| `read_skill_resource` | tool | — | Returns one bundled file by `{ name, path }` or a qualified path such as `release-notes/references/guide.md`. Binary files are returned as base64. |
| `run_skill_script` | tool | — | Runs a bundled script. Added only when the experimental script runner is set (`createSkillTools(catalog, { scriptRunner: runner({ loader: env.LOADER }) })`, `runner` from `agents/skills/runner`). |
| `catalog.prompt()` | method | — | System-prompt text listing each skill; returns `null` when there are no skills. |
| `catalog.fingerprint` | property | — | Changes whenever the catalog prompt changes; compare it to decide when to rebuild a cached system prompt. |

Catalog diagnostics (`catalog.diagnostics`):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `SkillWarning` | diagnostic | — | A skill breaks a specification rule but was loaded anyway. |
| `InvalidSkill` | diagnostic | — | A skill could not be loaded (for example no `description`); not shown to the model. |
| `SourceFailed` | diagnostic | — | A source could not be listed (for example the bucket was unavailable). |
| `DuplicateSkill` | diagnostic | — | Two sources provide the same skill name; the first source wins. |

## Notes

- Corrected from the official docs: the example omitted `stopWhen`, and AI SDK `generateText` / `streamText` stop after a single step by default, so a tool call is executed but no answer is generated from its result; `stopWhen: stepCountIs(5)` (an example limit) lets the model continue after tool results.
- Skills sources are a Computer Workspace, an R2 bucket, or code. The tools are the same for every source.
- The tools appear only when at least one skill is available; `name` is limited to skills in the catalog.
- Think relists sources before each turn. Pi reads sources once when the factory builds the extension; both Pi tools are marked `replay: "safe"`. With the AI SDK, reload the catalog and rebuild the tools to pick up changes.
- Tool failures (unknown skill, missing file) are returned to the model as tool errors. AI SDK tools throw; Pi tools return `isError: true`.
- `run_skill_script` executes bundled scripts: enable it only for skill sources you trust, and keep the runner on the sandboxed Worker Loader binding.
- Distinct from Claude Code Agent Skills (see the anthropic-claude-code-extend skill) and from this repository's skill system: this page covers the Agents SDK `agents/skills` API only. Concepts: [agent-skills.md](../concepts/agent-skills.md) ; sources and validation: overview.md (https://developers.cloudflare.com/agents/skills/) ; script execution: execution.md (https://developers.cloudflare.com/agents/skills/execution/)

## Related

- [File system](./filesystem.md)
