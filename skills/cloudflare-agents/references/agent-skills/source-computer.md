---
source: https://developers.cloudflare.com/agents/skills/sources/computer/
---

# Agent skills (agents SDK) Computer source

`skills.workspace()` reads Agent skills (agents SDK) from files in a `@cloudflare/computer` Workspace. Writing, editing, or deleting a `SKILL.md` changes the agent's skills on its next turn with no deploy.

## Signature / Usage

By default every `/workspace/.agents/skills/<name>/SKILL.md` is a skill and sibling files are its resources:

```text
/workspace/.agents/skills/
  release-notes/
    SKILL.md
    references/style-guide.md
    scripts/format-release-notes.js
  pirate-voice/
    SKILL.md
```

```ts
import { Think, skills } from "@cloudflare/think";

export class MyAgent extends Think<Env> {
	getSkills() {
		return [skills.workspace(this.workspace)];
	}
}
```

Another directory (absolute path):

```ts
skills.workspace(this.workspace, { root: "/workspace/skills" });
```

Seed starter skills on first start:

Adapted (not in the official docs): a starter file is written only when it does not exist yet, so a restart does not overwrite a skill the user edited. See Notes.

```ts
import { Think, skills } from "@cloudflare/think";

const ROOT = "/workspace/.agents/skills";

const STARTER_SKILLS: Record<string, string> = {
	"pirate-voice/SKILL.md": `---
name: pirate-voice
description: Answer in a pirate voice. Use when the user asks for a pirate tone.
---

Answer accurately, then rewrite the answer in a light pirate voice.
`,
};

export class MyAgent extends Think<Env> {
	getSkills() {
		return [skills.workspace(this.workspace)];
	}

	async onStart() {
		for (const [path, content] of Object.entries(STARTER_SKILLS)) {
			const file = `${ROOT}/${path}`;
			try {
				await this.workspace.fs.readFile(file, "utf8");
				continue; // already seeded (possibly edited by the user)
			} catch (error) {
				// A missing file means this skill has not been seeded yet.
				if ((error as { code?: string }).code !== "ENOENT") throw error;
			}
			await this.workspace.fs.mkdir(file.slice(0, file.lastIndexOf("/")), {
				recursive: true,
			});
			await this.workspace.fs.writeFile(file, content);
		}
	}
}
```

Run skill scripts by giving the Workspace a backend; the model then uses the `exec` tool:

```ts
import { Workspace } from "@cloudflare/computer";
import { WorkerJavaScriptBackend } from "@cloudflare/computer/backends/worker-javascript";
import { Think, skills } from "@cloudflare/think";

export class MyAgent extends Think<Env> {
	workspace = new Workspace({
		storage: this.ctx.storage,
		backends: [
			new WorkerJavaScriptBackend({
				id: "js",
				loader: this.env.LOADER,
				access: "read-write",
			}),
		],
	});

	getSkills() {
		return [skills.workspace(this.workspace)];
	}
}
```

```jsonc
{
	"worker_loaders": [{ "binding": "LOADER" }],
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `root` | absolute path string | `/workspace/.agents/skills` | Directory scanned for skills; a missing root lists no skills |

## Notes

- Corrected from the official docs: the source says it writes the starter skills "the first time the agent starts", but `onStart()` runs once per in-memory lifetime (after every eviction or restart) and the source writes each file unconditionally, overwriting edits the user or agent made. The fence skips files that already exist (the `readFile` / `ENOENT` check used on the official Workspace filesystem page). A starter skill the user deleted is recreated on the next start; record a seeded flag in storage if deletions must stick.
- `.git`, `node_modules`, and `.DS_Store` inside a skill directory are ignored.
- Each skill is checked against the specification when listed: a `name` that does not match its folder still loads with a warning; a skill with no `description` is skipped and logged. `skills.parseSkill()` checks a skill before you write it.
- Anything that writes to the Workspace can add skills (the agent's `write` tool, a user upload, your code), so treat skill content as untrusted and be deliberate about granting `read-write` access to a script backend.
- Script execution details are in [Execution](./execution.md). The upstream `computer-skills` example (https://github.com/cloudflare/agents/tree/main/examples/computer-skills) shows UI add/delete.
- Distinct from Claude Code Agent Skills (SKILL.md, anthropic-claude-code-extend) and from this repository's reference skills: this is the Cloudflare Agents SDK runtime feature.

## Related

- [Agent skills (agents SDK)](./overview.md)
- [Execution](./execution.md)
- [R2 source](./source-r2.md)
- [Code source](./source-code.md)
