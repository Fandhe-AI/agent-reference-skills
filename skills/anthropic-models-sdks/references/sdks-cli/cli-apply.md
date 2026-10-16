<!-- source: https://platform.claude.com/docs/en/cli-sdks-libraries/cli/apply / last verified: 2026-10-17 -->

# Manage resources as code with ant apply

`ant apply` creates and updates Claude API resources (agents, environments, skills, memory stores, deployments, vaults) from files in your repository, shows a plan for approval, and records created IDs in `claude-lock.json`.

## Signature / Usage

```bash
# Apply a single file (kind inferred from path, here agents/)
ant apply agents/summarizer.md

# Apply a whole project directory
ant apply .

# Print the detailed plan only
ant apply --dry-run .

# CI: apply without confirmation
ant apply --yes .
```

```markdown
---
name: Summarizer
model: claude-opus-5-5
tools:
  - type: agent_toolset_20260401
---

You are a helpful assistant that writes concise summaries.
```

## Options / Props

| Flag | Effect |
|------|--------|
| `--dry-run` | Print the plan and exit without applying or writing the lockfile. Exits 0 even when the plan is blocked. |
| `--yes` | Apply without asking for confirmation. Required when there's no terminal. |
| `--force` | Apply even where a resource was changed, archived, or deleted outside these files. |
| `--prune` | Remove resources that are in the lockfile but no longer declared in a file. |
| `--upgrade` | Re-resolve skills referenced by GitHub URL, which otherwise stay pinned to the commit recorded in the lockfile. |
| `--lock-file <path>` | Use this lockfile instead of searching upward from the current directory. Keep one for each organization or workspace: `ant apply` refuses a lockfile whose organization or workspace doesn't match your credentials. |
| `--verbose`, `-v` | Show unchanged resources and full field values in the plan. |

## Notes

- Requires CLI version 1.30.0 or later; vault files need 1.34.0 or later.
- Run from the repository root: the first apply writes `claude-lock.json` in the current directory. Commit it; it records each resource's ID, `version`, `hash` and `remote_hash`, plus the `origin` (`base_url`, `organization_id`, `workspace_id`).
- File layout by kind: environment = YAML in `environments/`; memory store = YAML in `memory_stores/`; deployment = Markdown in `deployments/` (frontmatter is the request body, prose is the first message of each session); skill = directory with `SKILL.md` at its root (conventionally under `skills/`); vault = YAML in `vaults/` with only `display_name` and optional `metadata`.
- Any resource except a skill can be YAML, JSON, or Markdown. In Markdown the frontmatter is the body and the prose fills the kind's text field (agent `system`, environment / memory store `description`, deployment first message). A vault Markdown file with prose is refused.
- Resources refer to each other by relative path wherever the API expects an ID (e.g. `../skills/pr-summary`, `./reviewer.md`); `ant apply` creates them in dependency order and pins agent and skill references to the version just applied. To point at an unmanaged resource, write its ID (`agent_...`, `skill_...`). A skill reference can also be `https://github.com/<owner>/<repo>/tree/<branch>/<dir>` (set `GITHUB_TOKEN` for private repositories).
- Kind inference order: (1) top-level `type` field, (2) the directory the file is directly in (`agents/`, `environments/`, `memory_stores/`, `deployments/`, `vaults/`), (3) a file name starting with the kind (not for vaults; keep vault files in `vaults/` or set `type: vault`). Unmatched files are skipped unless named on the command line; a named unmatched Markdown file is treated as an agent, a named unmatched YAML/JSON file is an error.
- `ant apply` with no arguments reconciles every file the lockfile tracks. Deleting a field clears it if the API allows. If a resource was edited, archived, or deleted outside these files, the plan ends with `This plan cannot be applied:` and exits with `refusing to apply`; use `--force`.
- Deleting a file leaves its resource in place with a warning; `--prune` removes it (archive, or delete for a skill). Renaming a file declares a new resource.
- It cannot adopt resources created in the Console or with `ant beta:agents create`; applying a file for an existing agent creates a second one. Console **Export as code** downloads include their own `claude-lock.json`.
- CI: without a terminal it stops with `cannot ask for confirmation without a terminal; re-run with --yes to apply, or --dry-run to see the plan only`. Run `ant apply --yes .` on the default branch (a bare `ant apply --yes` skips newly added files), `ant apply --dry-run .` on pull requests, commit the updated `claude-lock.json` even after a partial failure, run one apply at a time (nothing locks the lockfile), and authenticate with Workload Identity Federation as an identity that reaches the organization and workspace in the lockfile.
- This is the CLI for the Claude API (platform.claude.com), distinct from the Claude Code CLI (see anthropic-claude-code). The "skill" resource here is a Managed Agents skill bundle, not a Claude Code Agent Skill.

## Related

- [CLI quickstart](./cli-quickstart.md)
- [CLI scripting and automation](./cli-scripting.md)
- [Connect to a Managed Agents session](./cli-sessions-connect.md)
