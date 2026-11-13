---
source: https://opencode.ai/docs/skills/
---

# Agent Skill

Give an agent reusable task instructions with a `SKILL.md` and restrict loading by permission.

```markdown title=".opencode/skills/git-release/SKILL.md"
---
name: Git Release
description: Prepare release notes, version bumps, and GitHub releases
---

## Workflow

1. Read `references/release-policy.md`.
2. Summarize merged changes since the previous tag.
3. Propose the version bump before changing files.
4. Run `scripts/changelog.ts` only after the user approves the version.
```

```jsonc title="opencode.jsonc"
{
  "permissions": [
    { "action": "skill", "resource": "*", "effect": "allow" },
    { "action": "skill", "resource": "internal-*", "effect": "deny" },
    { "action": "skill", "resource": "experimental-*", "effect": "ask" },
  ],
}
```

## Notes

- The skill ID comes from the file path (`git-release`), not the frontmatter `name`; IDs are case-sensitive.
- Skills without a `description` are not advertised to the model. Load one yourself with `@skill-id`.
- Extra directories or HTTP catalogs go in the `skills` array of `opencode.jsonc`.
- OpenCode skills are distinct from Claude Code Agent Skills (anthropic-claude-code-extend) and Codex skills (openai-codex).
