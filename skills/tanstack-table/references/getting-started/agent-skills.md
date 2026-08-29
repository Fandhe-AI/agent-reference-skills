---
source: https://tanstack.com/table/latest/docs/agent-skills
---

# Agent Skills (TanStack Intent)

Agent Skills are markdown documents (`SKILL.md`) that ship inside npm packages and tell AI coding agents how to use a library correctly — which functions to use, which patterns to avoid, and when to reach for a particular feature. TanStack Table publishes skills inside its packages so the guidance travels with `npm update` instead of being pinned in a model's training data.

## Signature / Usage

```bash
# 1. install the adapter for your framework
pnpm add @tanstack/react-table

# 2. run the installer from the project root
npx @tanstack/intent@latest install

# 3. inspect and load skills yourself
npx @tanstack/intent@latest list
npx @tanstack/intent@latest load @tanstack/react-table#getting-started
npx @tanstack/intent@latest load @tanstack/table-core#sorting
```

Generated config block (appended to `AGENTS.md`, `CLAUDE.md`, `.cursorrules`, or `.github/copilot-instructions.md`):

```markdown
<!-- intent-skills:start -->

## Skill Loading

Before editing files for a substantial task:

- Run `npx @tanstack/intent@latest list` from the workspace root to see available local skills.
- If a listed skill matches the task, run `npx @tanstack/intent@latest load <package>#<skill>` before changing files.
- Use the loaded `SKILL.md` guidance while making the change.
- Monorepos: when working across packages, run the skill check from the workspace root and prefer the local skill for the package being changed.
- Multiple matches: prefer the most specific local skill for the package or concern you are changing; load additional skills only when the task spans multiple packages or concerns.

<!-- intent-skills:end -->
```

## Options / Props

| Package | Skills | What they teach |
| --- | --- | --- |
| `@tanstack/table-core` | `core`, `table-features`, focused feature skills | Headless table architecture, explicit feature registration, TypeScript, client/server boundaries, migration, sorting/filtering/grouping/pagination/pinning/sizing/selection/aggregation |
| `@tanstack/<framework>-table` | Framework-specific setup and state skills | Creating, rendering, and controlling a table with the framework adapter; supported adapters also include migration and TanStack Query/Virtual composition skills |
| `@tanstack/table-devtools` and framework devtools adapters | `devtools` | Registering table instances and inspecting features, state, options, rows, and columns |
| `@tanstack/match-sorter-utils` | `fuzzy-ranking` | Fuzzy filtering, ranking metadata, and rank-aware sorting |

## Notes

- Each skill lives under `node_modules/<package>/skills/<skill-name>/SKILL.md` once installed; skills can declare prerequisites so the agent loads core guidance before a framework- or feature-specific skill.
- Supported agents: Claude Code, Cursor, GitHub Copilot, Codex, and other tools implementing the same open standard.
- `npx @tanstack/intent@latest install --map` writes explicit task-to-skill `id`/`run`/`for` entries instead of the generic skill-loading block.
- Without the CLI, an agent config can point directly at a file, e.g. `node_modules/@tanstack/react-table/skills/getting-started/SKILL.md`.
- Skills are versioned with each package and update automatically on `npm update`; no CLI rerun is needed unless using `--map` mode.
- These are TanStack's own official Agent Skills, distributed via the `@tanstack/intent` CLI into a consuming project's `node_modules`. They are distinct from Claude Code's general Agent Skills concept (`SKILL.md` authored under `.claude/skills/` or installed via `npx skills add`) and from this reference skill itself — different distribution mechanism and different authorship.

## Related

- [Overview](./overview.md)
- [Installation](./installation.md)
