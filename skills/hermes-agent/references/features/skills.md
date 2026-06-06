# Skills

Skills are on-demand knowledge documents following the agentskills.io open standard. They live in `~/.hermes/skills/` and are loaded progressively to minimise token usage.

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
# Shown only when web toolset has no API key
fallback_for_toolsets:
  - web

# Shown only when browser toolset is available
requires_toolsets:
  - browser
```

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
hermes skills reset skill-name   # Restore a bundled skill to baseline
```

## Skills Hub

| Source | Description | Trust |
|--------|-------------|-------|
| `official` | Built-in optional skills | Automatic |
| `skills-sh` | Vercel's public directory | Community |
| `well-known` | URL discovery via `/.well-known/skills/index.json` | Community |
| `github` | Direct repo installs | Community |
| `clawhub`, `lobehub`, `browse.sh` | Community marketplaces | Community |
| Direct HTTPS URL | Install from any URL | Community |

```bash
hermes skills browse              # Browse all hub skills (official first)
hermes skills browse --source official
hermes skills search kubernetes --source skills-sh
hermes skills install openai/skills/k8s
hermes skills check    # detect upstream updates
hermes skills update   # reinstall changed skills
hermes skills reset skill-name   # restore bundled version
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

## Related

- [Context Files](./context-files.md)
- [MCP](./mcp.md)
