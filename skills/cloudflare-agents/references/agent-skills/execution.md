---
source: https://developers.cloudflare.com/agents/skills/execution/
---

# Agent skills (agents SDK) execution

Run scripts bundled in Agent skills (agents SDK): with a Computer Workspace backend via `exec`, or with the experimental `skills.runner()`.

## Signature / Usage

| Where the skill lives | How scripts run |
|-----------------------|-----------------|
| Computer Workspace | The model runs the file with the Workspace `exec` tool |
| R2 or a manifest | The experimental script runner, through `run_skill_script` |

Workspace scripts export a default async function that receives the `input` the model passes to `exec`:

```js
import { readdir } from "node:fs/promises";

export default async function (input) {
	const entries = await readdir(input.root ?? "/workspace");
	return { count: entries.length };
}
```

Script runner (needs a Worker Loader binding `{ "worker_loaders": [{ "binding": "LOADER" }] }`):

```ts
import { Think, skills } from "@cloudflare/think";

export class MyAgent extends Think<Env> {
	getSkills() {
		return [skills.r2(this.env.SKILLS_BUCKET, { prefix: "skills/" })];
	}

	getSkillScriptRunner() {
		return skills.runner({ loader: this.env.LOADER });
	}
}
```

Outside Think, import from `agents/skills/runner` (separate entry point; it loads `just-bash` and Code Mode):

```ts
import { runner } from "agents/skills/runner";

const scriptRunner = runner({ loader: env.LOADER });
```

JavaScript runner scripts export a default function taking `(input, ctx)`:

```js
export default async function run(input, ctx) {
	const guide = ctx.files["references/style-guide.md"]; // bundled text resources
	const docs = await ctx.workspace.readFile("README.md"); // gated by permission
	const summary = await ctx.tools.call("summarize", { input }); // explicit tools
	await ctx.output.writeFile("notes.md", summary); // scratch artifact
	return { ok: true };
}
```

Python and Bash scripts use files: `/input.json` (input), `/context.json` (skill metadata), `/skill` (`SKILL.md` and resources); files written to `/output` are returned to the model. Python can also define `def run(input, ctx)`.

## Options / Props

Runner options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `loader` | — | Required | Worker Loader binding |
| `workspaceInstance` | — | None | A Computer Workspace scripts can access |
| `workspace` | `"none" \| "read" \| "read-write"` | `"read"` with `workspaceInstance`, else `"none"` | Workspace permission |
| `tools` | — | None | Tools scripts can call |
| `network` | — | `false` | Allow outbound network access |
| `timeout` | — | `30000` | Timeout in milliseconds |

`ctx` (`SkillRunContext`) fields:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `skill` | — | — | Skill name, description, and metadata |
| `files` | — | — | Skill text resources by relative path |
| `workspace` | — | — | Workspace reads/writes, gated by the `workspace` option |
| `tools` | — | — | Only tools passed to the runner: `tools.call(name, input)` or `tools.name(input)` |
| `output` | — | — | `writeFile(name, content)` returns scratch files without changing the Workspace |

## Notes

- The script runner is experimental; prefer storing skills in a Computer Workspace and running scripts with `exec`.
- The runner runs JavaScript, Python (a Python Dynamic Worker), and Bash (through `just-bash`) scripts under `scripts/`. There is no runtime bundler: a JavaScript script must be one self-contained module; compile TypeScript and multi-file scripts first (for example with esbuild).
- Scripts get no network and no tools unless granted; relative `ctx.workspace` paths resolve against `/workspace`. Grant `read-write` and `network` only when a skill needs them, since skill content can come from users or the agent itself.
- With the JavaScript Workspace backend, a skill's instructions can tell the model to run a script by re-exporting it: `export { default } from "./scripts/format-release-notes.js";`. Activating a skill returns its folder as `location`, for example `/workspace/.agents/skills/release-notes`.
- Distinct from Claude Code Agent Skills (SKILL.md under anthropic-claude-code-extend) and from this repository's reference skills; this is the Cloudflare Agents SDK runtime feature. Running arbitrary skill scripts happens inside a Dynamic Worker or Workspace backend, not on a host machine.
- Related products: Sandbox (container code execution) in [sandbox.md](../tools/sandbox.md) and Think tools in think-tools.md (https://developers.cloudflare.com/agents/harnesses/think/tools/).

## Related

- [Agent skills (agents SDK)](./overview.md)
- [Computer source](./source-computer.md)
- [R2 source](./source-r2.md)
- [Code source](./source-code.md)
