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
npx @tanstack/intent@latest load @tanstack/table-core#table-features
```

For sorting, follow the loaded `table-features` entry point's link to `references/sorting.md`; `load` resolves relative Markdown links to the installed package, including nested dependency paths.

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

## Notes

Skills per package:

| Package | Skills | What they teach |
| --- | --- | --- |
| `@tanstack/table-core` | `core`, `table-features`, `table-state`, `custom-features`, `migrate-v8-to-v9` | Core architecture, feature registration, shared state ownership, plugin authoring, and migration. Each optional feature has an on-demand reference linked from `table-features`. |
| `@tanstack/<framework>-table` | `getting-started`, `table-state`, and migration where supported | Framework setup, rendering, and reactive state. References cover reusable app hooks, advanced reactivity, and maintained Query/Virtual integrations. |
| `@tanstack/table-devtools` and framework devtools adapters | `devtools` | Registering table instances and inspecting features, state, options, rows, and columns |
| `@tanstack/match-sorter-utils` | `fuzzy-ranking` | Fuzzy filtering, ranking metadata, and rank-aware sorting |

- Each skill lives under `node_modules/<package>/skills/<skill-name>/SKILL.md` once installed. Its `references/` directory holds guidance for specific tasks, e.g. `@tanstack/table-core/skills/table-features/references/row-selection.md`; the entry point tells the agent when to read each reference.
- Intent lists entry points and loads one requested `SKILL.md` at a time; the agent follows its prerequisite instructions and reads relevant references. A React project with core installed has eight Table entry points; devtools and other installed libraries add their own.
- Removed (9.2.6): individual feature and composition skill IDs, replaced by `references/` under the entry points (progressive-disclosure refactor). Update older mappings as follows:
  - `@tanstack/table-core#sorting`, `#row-selection`, and other optional feature skills: `@tanstack/table-core#table-features`, then the matching feature reference
  - `@tanstack/table-core#client-vs-server`: `@tanstack/table-core#table-features`, then `references/client-vs-server.md`
  - `@tanstack/table-core#typescript` or `#api-not-found`: `@tanstack/table-core#core`, then the matching reference
  - `@tanstack/<framework>-table#create-table-hook`: the adapter's `getting-started`, then `references/create-table-hook.md`
  - `@tanstack/<framework>-table#with-tanstack-query` or `#with-tanstack-virtual`: the adapter's `getting-started`, then the matching integration reference
- If `package.json#intent.skills` allows individual old skill IDs, run `npx @tanstack/intent@latest install --review` to select replacements and their prerequisites; package-level permissions include new entry points automatically. Then regenerate explicit mappings with `npx @tanstack/intent@latest install --map`. Direct file pointers to moved skills also need their new paths.
- Core state guidance is `@tanstack/table-core#table-state`; adapter state and migration skill IDs remain available.
- Supported agents: Claude Code, Cursor, GitHub Copilot, Codex, and other tools implementing the same open standard.
- `npx @tanstack/intent@latest install --map` writes explicit task-to-skill `id`/`run`/`for` entries instead of the generic skill-loading block.
- Without the CLI, an agent config can point directly at a file, e.g. `node_modules/@tanstack/react-table/skills/getting-started/SKILL.md`.
- Skills are versioned with each package and update automatically on `npm update`; no CLI rerun is needed unless using `--map` mode.
- These are TanStack's own official Agent Skills, distributed via the `@tanstack/intent` CLI into a consuming project's `node_modules`. They are distinct from Claude Code's general Agent Skills concept (`SKILL.md` authored under `.claude/skills/` or installed via `npx skills add`) and from this reference skill itself — different distribution mechanism and different authorship.

## Related

- [Overview](./overview.md)
- [Installation](./installation.md)
