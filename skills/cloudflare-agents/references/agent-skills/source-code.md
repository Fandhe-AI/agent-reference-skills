---
source: https://developers.cloudflare.com/agents/skills/sources/code/
---

# Agent skills (agents SDK) code source

Define Agent skills (agents SDK) in code with `skills.manifest()`, for tests and small fixed sets that ship with the Worker.

## Signature / Usage

```ts
import { Think, skills } from "@cloudflare/think";

const handbook = skills.manifest({
	id: "handbook",
	skills: [
		{
			name: "release-notes",
			description: "Turn a list of changes into release notes.",
			body: "Read `references/style-guide.md`, then write one line per change.",
			metadata: { author: "my-team" },
			resources: [
				{
					path: "references/style-guide.md",
					content: "Start each line with a past-tense verb.",
				},
			],
		},
	],
});

export class MyAgent extends Think<Env> {
	getSkills() {
		return [handbook];
	}
}
```

Combine with other sources; the first source to provide a name wins, so list the one you want to win first:

```ts
export class MyAgent extends Think<Env> {
	getSkills() {
		return [skills.workspace(this.workspace), handbook];
	}
}
```

Here a Workspace skill named `release-notes` replaces the manifest's version.

## Options / Props

Manifest entry fields:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `name` | — | Required | Skill name; must follow the naming rules |
| `description` | — | Required | What the skill does and when to use it |
| `body` | — | Required | Markdown instructions |
| `license` | — | Optional | License name or bundled license file |
| `compatibility` | — | Optional | Environment requirements |
| `metadata` | — | Optional | String key-value metadata |
| `allowedTools` | — | Optional | Space-separated list of pre-approved tools |
| `resources` | — | Optional | Files as `{ path, content }`; use `encoding: "base64"` for binary |

## Notes

- Entries pass the same checks as `SKILL.md` files: a rule-breaking entry loads with a warning; one with no `description` is skipped and logged.
- `skills.fromManifest()` is a deprecated alias of `skills.manifest()`.
- Distinct from Claude Code Agent Skills (SKILL.md, anthropic-claude-code-extend) and from this repository's reference skills: this is the Cloudflare Agents SDK runtime feature.

## Related

- [Agent skills (agents SDK)](./overview.md)
- [Computer source](./source-computer.md)
- [R2 source](./source-r2.md)
