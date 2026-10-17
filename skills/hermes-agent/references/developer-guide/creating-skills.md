# Creating Skills

How to create skills for Hermes Agent: SKILL.md format, frontmatter fields, guidelines, blueprints and publishing. Skills are the preferred way to add capabilities (no agent code changes).

## Signature / Usage

```text
skills/
├── research/
│   └── arxiv/
│       ├── SKILL.md              # Required: main instructions
│       └── scripts/              # Optional: helper scripts
│           └── search_arxiv.py
```

```markdown
---
name: my-skill
description: Brief description (shown in skill search results)
version: 1.0.0
author: Your Name
license: MIT
platforms: [macos, linux]          # Optional; valid: macos, linux, windows
metadata:
  hermes:
    tags: [Category, Subcategory, Keywords]
    related_skills: [other-skill-name]
    requires_toolsets: [web]
    requires_tools: [web_search]
    fallback_for_toolsets: [browser]
    fallback_for_tools: [browser_navigate]
    config:
      - key: my.setting
        description: "What this setting controls"
        default: "sensible-default"
        prompt: "Display prompt for setup"
    blueprint:
      schedule: "0 9 * * *"
      deliver: origin
      prompt: "Task instruction for each run"
      no_agent: false
required_environment_variables:
  - name: MY_API_KEY
    prompt: "Enter your API key"
    help: "Get one at https://example.com"
    required_for: "API access"
---

# Skill Title

## When to Use
(when the skill applies)

## Quick Reference
(common commands / patterns)

## Procedure
(step-by-step instructions)

## Pitfalls
(known failure modes)

## Verification
(how to confirm it worked)
```

Publish and test:

```bash
hermes skills publish skills/my-skill --to github --repo owner/repo
hermes skills tap add owner/repo
hermes chat --toolsets skills -q "Use the X skill to do Y"
```

## Options / Props

Conditional activation:

| Field | Behavior |
|-------|----------|
| `requires_toolsets` | Hidden when ANY listed toolset is not available |
| `requires_tools` | Hidden when ANY listed tool is not available |
| `fallback_for_toolsets` | Hidden when ANY listed toolset is available |
| `fallback_for_tools` | Hidden when ANY listed tool is available |

Frontmatter entries:

| Field | Entry keys |
|-------|-----------|
| `required_environment_variables` | `name` (required), `prompt`, `help`, `required_for` |
| `metadata.hermes.config` | `key` (required dotpath), `description` (required), `default`, `prompt` |
| `required_credential_files` | `path` (relative to `~/.hermes/`, required), `description` |
| `metadata.hermes.blueprint` | `schedule` (cron expr / `every 2h` / ISO timestamp; presence marks it runnable), `deliver` (default `origin`), `prompt`, `no_agent` |

Template tokens substituted in the SKILL.md body:

| Token | Replaced with |
|-------|---------------|
| `${HERMES_SKILL_DIR}` | Absolute path to the skill's directory |
| `${HERMES_SESSION_ID}` | Active session id (left in place if none) |

Trust levels: `builtin`, `official` (`optional-skills/`), `trusted` (openai/skills, anthropics/skills, huggingface/skills), `community` (non-dangerous findings overridable with `--force`; `dangerous` stays blocked).

## Notes

- Make it a skill when it is instructions + shell commands + existing tools; make it a tool when it needs API-key/auth integration, exact custom logic, binary data or streaming.
- Missing `required_environment_variables` do not hide the skill; Hermes prompts securely on load in the local CLI and never exposes the raw value to the model. Set variables pass through to `execute_code` / `terminal` sandboxes (including Docker and Modal). `prerequisites.env_vars` is a legacy alias. Extra passthrough via `terminal.env_passthrough` in `config.yaml`.
- Config settings are stored in `config.yaml` under `skills.config.<key>` (`hermes config set skills.config.myplugin.path ~/my-data`), discovered by `hermes config migrate`, and injected into the skill message at load. Use env vars for secrets, `config` for non-sensitive settings, `required_credential_files` for file credentials (mounted read-only into Docker, synced into Modal).
- Guidelines: prefer stdlib Python, curl and existing tools; put the common workflow first; ship helper scripts in `scripts/`.
- Emit the literal `[[as_document]]` in a response to deliver extracted media as file attachments instead of inline images.
- Inline shell snippets (`` !`cmd` ``) are off by default; enable with `skills.inline_shell: true` and `skills.inline_shell_timeout`. Output is capped at 4000 characters, snippets run without approval, and community hub installs never auto-execute them. Disable token substitution with `skills.template_vars: false`.
- Placement: `skills/` for broadly useful, `optional-skills/` for official but niche, Skills Hub / tap for community.
- Installing a skill with a `blueprint:` block registers a suggested cron job (opt-in) reviewed via `/suggestions` (`accept N`, `dismiss N`, `catalog`). Sources: `catalog`, `blueprint`, `usage`, `integration`. Accepting calls `cron.jobs.create_job`; suggestions never auto-create jobs.
- The hub scanner checks data exfiltration, prompt injection, destructive commands and shell injection. External sources: GitHub identifiers, `skills.sh` identifiers, `/.well-known/skills/index.json` endpoints.
- Source: https://hermes-agent.nousresearch.com/docs/developer-guide/creating-skills (pinned to v0.22.2)

## Related

- [Adding Tools](./adding-tools.md)
- [Build a Hermes Plugin](./plugins.md)
