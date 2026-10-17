# Work with Skills

Find, install, use, configure, and create skills: on-demand knowledge documents that teach Hermes specific workflows.

## Signature / Usage

```bash
/skills                      # in chat
hermes skills list           # CLI
/skills search docker
/skills browse               # official optional skills hub

/ascii-art Make a banner that says "HELLO WORLD"   # every installed skill is a slash command

hermes skills install official/research/arxiv
/skills install official/creative/songwriting-and-ai-music
hermes skills install https://sharethis.chat/SKILL.md
/skills install https://example.com/SKILL.md --name my-skill

hermes skills config gif-search
hermes config get skills.config --json
hermes skills                # interactive TUI: enable/disable per platform
```

Create a skill under `~/.hermes/skills/<category>/<name>/SKILL.md`:

```markdown
---
name: my-skill
description: Brief description of what this skill does
version: 1.0.0
metadata:
  hermes:
    tags: [my-tag, automation]
    category: my-category
---

# My Skill

## When to Use
(when the skill applies)

## Procedure
(step-by-step instructions)

## Pitfalls
(known failure modes)

## Verification
(how to confirm it worked)
```

Skill config declared in frontmatter:

```yaml
metadata:
  hermes:
    config:
      - key: tenor.api_key
        description: "Tenor API key for GIF search"
        prompt: "Enter your Tenor API key"
        url: "https://developers.google.com/tenor/guides/quickstart"
```

Optional supporting files: `references/`, `templates/`, `scripts/`; load with `skill_view("my-skill", "references/api-docs.md")`.

## Options / Props

Progressive disclosure:

| Name | Type | Description |
|------|------|-------------|
| `skills_list()` | tool | Compact list of all skills (~3k tokens), loaded at session start |
| `skill_view(name)` | tool | Full SKILL.md for one skill, loaded on demand |
| `skill_view(name, file_path)` | tool | A specific reference file within the skill |

Skills vs memory:

| | Skills | Memory |
|---|---|---|
| What | Procedural knowledge | Factual knowledge |
| When | Loaded on demand | Injected every session |
| Size | Can be large | Compact |
| Cost | Zero tokens until loaded | Small constant cost |

## Notes

- Installed skills take effect in new sessions; use `/reset`, or `--now` to invalidate the prompt cache immediately (more tokens next turn).
- Install copies the skill directory to `~/.hermes/skills/`.
- Plugin-provided skills use namespaced names (`plugin:skill`, e.g. `skill_view("superpowers:writing-plans")`); they are not listed in `skills_list` and are opt-in.
- Skill config values are prompted on first load and stored in `config.yaml` under `skills.config.*`.
- A dropped-in skill needs no registration. The agent can create/update skills itself via `skill_manage`.
- Keep skills focused; organize with category subdirectories; update stale skills.
- Source: https://hermes-agent.nousresearch.com/docs/guides/work-with-skills (pinned to v0.22.2)

## Related

- [tips](./tips.md)
- [automate-with-cron](./automate-with-cron.md)
