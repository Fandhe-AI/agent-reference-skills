---
source: https://developers.cloudflare.com/agents/skills/sources/r2/
---

# Agent skills (agents SDK) R2 source

`skills.r2()` reads Agent skills (agents SDK) from an R2 bucket, to share one set across many agents or manage skills outside Worker code.

## Signature / Usage

Every `<prefix><name>/SKILL.md` object is a skill; objects beside it are resources:

```text
skills/release-notes/SKILL.md
skills/release-notes/references/style-guide.md
skills/release-notes/scripts/format-release-notes.js
skills/pirate-voice/SKILL.md
```

Upload with any R2 interface, for example Wrangler (`--remote` targets the real bucket; without it the object goes to local storage):

```sh
npx wrangler r2 object put my-agent-skills/skills/pirate-voice/SKILL.md --file ./pirate-voice/SKILL.md --remote
```

Bind the bucket:

```jsonc
{
	"r2_buckets": [{ "binding": "SKILLS_BUCKET", "bucket_name": "my-agent-skills" }],
}
```

```ts
import { Think, skills } from "@cloudflare/think";

export class MyAgent extends Think<Env> {
	getSkills() {
		return [skills.r2(this.env.SKILLS_BUCKET, { prefix: "skills/" })];
	}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `prefix` | — | `""` | Key prefix that holds the skill directories |
| `skills` | — | all skills | Only serve these skill names |
| `refreshIntervalMs` | — | `60000` | How long to reuse a bucket listing; `0` lists on every call |
| `id` | — | `r2:<prefix>` | Source id used in diagnostics |

## Notes

- Each `SKILL.md` is checked against the specification when the bucket is listed; rule-breaking skills load with a warning, skills with no `description` are skipped and logged.
- R2 stores files but cannot run them. To run scripts from R2 skills set the experimental script runner (`run_skill_script`, see [Execution](./execution.md)); to store and run skills as files use a Computer Workspace instead.
- Anyone who can write to the bucket controls what the agent is told to do; restrict write access to the bucket and prefix.
- The upstream `r2-skills` example (https://github.com/cloudflare/agents/tree/main/examples/r2-skills) loads skills, runs a script, and uploads/deletes from the UI. R2 itself is covered by cloudflare-storage.
- Distinct from Claude Code Agent Skills (SKILL.md, anthropic-claude-code-extend) and from this repository's reference skills: this is the Cloudflare Agents SDK runtime feature.

## Related

- [Agent skills (agents SDK)](./overview.md)
- [Execution](./execution.md)
- [Computer source](./source-computer.md)
- [Code source](./source-code.md)
