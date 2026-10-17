# Skills

Skills are on-demand knowledge documents following the agentskills.io open standard. They live in `~/.hermes/skills/` and are loaded progressively to minimise token usage.

## Install from the website

Each installable card on the public Skills Hub has an **Install in Hermes** button that opens Hermes Desktop with a source-qualified target (`official/...` for optional skills, `clawhub/...` for ClawHub, an explicit repository path for bundled skills). The card's CLI command uses the same target:

```text
hermes://skill/install?identifier=official%2Fsecurity%2F1password
```

Desktop shows **Install "skill-name"?** with **Source** and **Install to** rows; installation goes through the normal Skills Hub pipeline (security scan, action log), and a link cannot bypass scanning or pick a different profile. The `skill/install` route needs an updated Desktop build; otherwise copy the card's CLI command.

## Starting with a blank slate

By default every profile is seeded with the bundled catalog and each `hermes update` adds newly bundled skills. For no bundled skills: the installer has no `--no-skills` flag (its Blank Slate setup stage asks; non-interactive installs seed the catalog, so run `hermes skills opt-out` afterwards), named profiles use `hermes profile create research --no-skills`, and existing profiles use:

```bash
hermes skills opt-out            # stop future seeding; nothing on disk is touched
hermes skills opt-out --remove   # also delete UNMODIFIED bundled skills (confirms first)
hermes skills opt-in --sync      # undo: remove the marker and re-seed now
```

All paths write a `.no-bundled-skills` marker into the profile directory. `--remove` only deletes bundled skills byte-identical to the installed version; edited, hub-installed, and hand-written skills are kept.

## Using Skills

Every installed skill is a slash command (`/gif-search funny cats`; bare `/excalidraw` loads it and lets the agent ask). Up to 5 leading `/skill` tokens are loaded in one message (`/github-pr-workflow /test-driven-development fix issue #123`); parsing stops at the first token that is not an installed skill. `/plan [request]` is a built-in command that writes a markdown plan under `.hermes/plans/`.

## Learning a skill from sources (`/learn`)

`/learn` turns anything you can describe into a reusable skill: a local SDK or doc directory, a URL, the workflow just performed, pasted notes, or a book / paper stack (which becomes a knowledge-base skill: lean `SKILL.md` plus one distilled file per chapter or topic under `references/`). The live agent gathers the material with its normal tools and saves via `skill_manage`, so the write-approval gate applies. Works in the CLI, gateway, TUI, and dashboard (Skills page has a **Learn a skill** button).

```bash
/learn the REST client in ~/projects/acme-sdk, focus on auth + pagination
/learn https://docs.example.com/api/quickstart
```

## Skill output and media delivery

A bare absolute media path in a response is auto-detected, stripped from the text, and delivered natively (Telegram photo, Discord attachment). `[[audio_as_voice]]` promotes audio to native voice bubbles (Telegram, WhatsApp). `[[as_document]]` (once per response, stripped before delivery) delivers every media path as a document attachment instead of a re-compressed image.

## Secure Setup on Load

Skills can declare `required_environment_variables` (see below); a missing value is requested securely only when the skill is loaded in the local CLI (skippable). Messaging surfaces never ask for secrets in chat. Declared variables are passed through to `execute_code` and `terminal` sandboxes; for other variables use `terminal.env_passthrough`. Non-secret settings are declared under `metadata.hermes.config` (key, description, default, prompt) and stored under `skills.config`.

## Redirecting Skill Creation (`skills.create_dir`)

```yaml
skills:
  create_dir: /opt/brain/skills
```

`skill_manage` create writes there (and the agent's instructions render that path); skills under it appear in the index, `skills_list`, `skill_view`, and slash commands. Existing skills are modified in place; bundled sync, the hub, and the curator keep operating on the local dir. `~` and `${VAR}` are expanded; relative paths resolve against the Hermes home.

## Project-Local Skills

Repos can carry skills in `<project-root>/.hermes/skills/` or `<project-root>/.agents/skills/` (root = nearest ancestor with `.git`). They are not auto-loaded from arbitrary repos: the banner shows a notice and you run:

```bash
hermes skills trust             # trust the current repo (or: hermes skills trust ~/myproject)
hermes skills untrust           # revoke
```

Trusted roots are stored in `skills.trusted_project_dirs`; `skills.project_discovery: false` disables the feature. Precedence: `project → local (~/.hermes/skills/) → skills.create_dir → external_dirs`. Project skills are tagged `[project]`, never modified by the curator, and every one is scanned like hub installs; a `dangerous` verdict quarantines it. Cron and other non-interactive surfaces inherit the interactive trust decision. Duplicate names across directories resolve by precedence; two different skills with one name in one directory are listed by relative path and loading the bare name fails with an "Ambiguous skill name" error.

## Bundled skill updates (`hermes skills reset`)

On install and every `hermes update`, bundled skills sync into `~/.hermes/skills/` with a manifest `~/.hermes/skills/.bundled_manifest` of origin hashes. Unchanged skills update; changed ones are treated as user-modified and skipped. To abandon edits:

```bash
hermes skills reset google-workspace              # clear manifest entry; keeps your copy, re-baselines
hermes skills reset google-workspace --restore    # also replace your copy with the bundled version
hermes skills reset google-workspace --restore --yes
```

Also available in chat as `/skills reset <name> [--restore]`. Each profile has its own manifest.

## Progressive Disclosure Architecture

| Level | Call | Returns | ~Tokens |
|-------|------|---------|---------|
| 0 | `skills_list()` | Names + metadata for all skills | ~3k |
| 1 | `skill_view(name)` | Full SKILL.md content | varies |
| 2 | `skill_view(name, path)` | Single reference file | varies |

The agent only loads deeper levels when the skill is genuinely needed.

## SKILL.md Format

Skills use YAML frontmatter followed by structured markdown sections.

**Frontmatter fields:**

| Field | Description |
|-------|-------------|
| `name` | Unique skill identifier |
| `description` | One-line summary |
| `version` | Semantic version |
| `platforms` | `macos` / `linux` / `windows` (omit for all) |
| `tags` | Discovery tags |
| `category` | Grouping category |
| `fallback_for_toolsets` / `fallback_for_tools` | Show only when listed tools are absent |
| `requires_toolsets` / `requires_tools` | Show only when listed tools are present |
| `required_environment_variables` | Credentials the skill needs |

**Content sections:** When to Use, Procedure, Pitfalls, Verification.

## Conditional Activation

```yaml
metadata:
  hermes:
    fallback_for_toolsets: [web]      # Show ONLY when these toolsets are unavailable
    requires_toolsets: [terminal]     # Show ONLY when these toolsets are available
    fallback_for_tools: [web_search]  # Show ONLY when these specific tools are unavailable
    requires_tools: [terminal]        # Show ONLY when these specific tools are available
```

In the v0.22.2 docs these fields are nested under `metadata.hermes`. Skills without conditional fields are always shown.

## External Skill Directories

```yaml
# ~/.hermes/config.yaml
skills:
  external_dirs:
    - ~/.agents/skills
    - /home/shared/team-skills
    - ${SKILLS_REPO}/skills
```

External directories are read-only. Local skills take precedence over external versions. Non-existent paths are silently ignored.

## Agent-Managed Skills

Agents autonomously create and update skills via the `skill_manage` tool when:
- Completing complex workflows (5+ tool calls)
- Discovering non-trivial solutions after encountering errors
- Receiving corrections from the user

Available actions: `create`, `patch` (preferred), `edit`, `delete`, `write_file`, `remove_file`.

## Skill Bundles

Group multiple skills under a single slash command for recurring task combinations.

```bash
# Create a bundle
hermes bundles create backend-dev \
  --skill github-code-review \
  --skill test-driven-development
```

Bundles are stored in `~/.hermes/skill-bundles/<slug>.yaml`. The filename stem becomes the slash command (`/backend-dev`).

## Bundled Skills (Opt-In/Out)

Hermes ships with bundled skills seeded on install and every `hermes update`.

```bash
hermes skills opt-out            # Stop future seeding
hermes skills opt-out --remove   # Delete unmodified bundled skills
hermes skills reset skill-name --restore   # Restore a bundled skill to baseline
```

## Skills Hub

| Source | Description | Trust |
|--------|-------------|-------|
| `official` | Built-in optional skills | Automatic |
| `skills-sh` | Vercel's public directory | Community |
| `well-known` | URL discovery via `/.well-known/skills/index.json` | Community |
| `github` | Direct repo installs | Community |
| `clawhub`, `lobehub`, `browse-sh` | Community marketplaces | Community |
| Direct HTTPS URL (`url`) | `SKILL.md` plus explicitly referenced support files; name resolved from frontmatter, URL slug, prompt, or `--name` | Community |

Identifiers are source-qualified (e.g. `official/security/1password`, `clawhub/...`). Unfiltered searches use a cached centralized index and fall back to a live query of skills.sh, ClawHub, LobeHub, and well-known endpoints (max 8 seconds) when it has no match.

```bash
hermes skills browse              # Browse all hub skills (official first)
hermes skills browse --source official
hermes skills search kubernetes --source skills-sh
hermes skills install openai/skills/k8s
hermes skills check    # detect upstream updates
hermes skills update   # reinstall changed skills
hermes skills reset skill-name --restore   # restore bundled version
```

## Security & Trust Levels

All hub skills are scanned for exfiltration, injection, destructive commands, and supply-chain threats.

| Level | Applies To |
|-------|-----------|
| `builtin` | Ships with Hermes |
| `official` | Optional bundled skills |
| `trusted` | Known repos (e.g. openai/skills, anthropics/skills) |
| `community` | Everything else |

The `--force` flag overrides non-dangerous policy blocks but cannot bypass `dangerous` verdicts.

## Environment Variable Declaration

```yaml
required_environment_variables:
  - name: TENOR_API_KEY
    prompt: Tenor API key
    help: https://developers.google.com/tenor
    required_for: full functionality
```

Declared variables are automatically passed to `execute_code` and `terminal` sandboxes.

## Directory Layout

```
~/.hermes/skills/
├── category/skill-name/
│   ├── SKILL.md          (required)
│   ├── references/
│   ├── templates/
│   ├── scripts/
│   └── assets/
├── .hub/                 (registry state, audit logs)
└── .bundled_manifest
```

Skills surface as slash commands (`/skill-name`) and respond to natural language queries.

## Notes

- `hermes sync` (Skill Sync) was removed in v0.22.0.
- Bundled-skill opt-out: `hermes skills opt-out --remove` deletes only unmodified bundled skills; `opt-in --sync` re-seeds immediately.
- Skill Bundles are managed with `hermes bundles` (`list`, `show`, `create`, `delete`).

## Related

- [Context Files](./context-files.md)
- [MCP](./mcp.md)
