# Best practices

Getting started with Codex and proven practices for better results, across the CLI, IDE extension, and ChatGPT desktop app — prompting, planning, validation, MCP, skills, and scheduled tasks.

## Signature / Usage

A good default prompt includes four things:

- **Goal** — what are you trying to change or build?
- **Context** — which files, folders, docs, examples, or errors matter (you can `@` mention files)?
- **Constraints** — what standards, architecture, safety requirements, or conventions should Codex follow?
- **Done when** — what should be true when the task is complete (tests passing, behavior changed, bug no longer reproducing)?

## Options / Props

| Reasoning level | When to use |
|------|-------------|
| Low | Faster, well-scoped tasks |
| Medium / High | More complex changes or debugging |
| Extra High | Long, agentic, reasoning-heavy tasks |

## Notes

- Source: https://learn.chatgpt.com/guides/best-practices (retrieved 2026-10; the `.md` twin returns 404, so content follows the "Best practices" section of the learn.chatgpt.com llms-full extract).
- Reasoning: use GPT-6.1 Sol when available to your account and client, starting with the default reasoning effort in your client; start with **High** for GPT-6 Luna or **Light** for GPT-6 Astra (`low` in configuration), then adjust (see models.md).
- `AGENTS.md`: encode repo layout and important directories, how to run the project, build/test/lint commands, engineering conventions and PR expectations, constraints and do-not rules, and what done means and how to verify. `/init` in the CLI scaffolds a starter `AGENTS.md`; use a global `AGENTS.md` in `~/.codex` (or `$CODEX_HOME`) for personal defaults, a repo-level file for shared standards, and subdirectory files for local rules (the closer file wins). Keep it short and accurate; reference task-specific markdown files when it grows; when Codex makes the same mistake twice, ask for a retrospective and update it. A `code_review.md` referenced from `AGENTS.md` can guide review behavior.
- Configure for consistency: personal defaults in `~/.codex/config.toml` (**Settings > Configuration > Open config.toml** in the desktop app), repo-specific behavior in `.codex/config.toml`, command-line overrides only for one-offs; profile overrides in `$CODEX_HOME/profile-name.config.toml`. Start with default permissions (approval mode and sandbox mode are the two knobs) and loosen only for trusted repos or specific workflows. The CLI, IDE extension, and desktop app share the same configuration layers. Many quality issues are setup issues (wrong working directory, missing write access, wrong model defaults, missing tools).
- Review: toggle the diff panel in the desktop app to review changes locally and give row-level feedback as context for the next turn. `/review` offers review against a base branch (PR-style), uncommitted changes, a commit, or custom instructions. With GitHub Cloud, Codex can review PRs automatically or when you @Codex.
- MCP: use it when needed context lives outside the repo, changes frequently, you want a tool instead of pasted instructions, or you need a repeatable integration; Codex supports STDIO and Streamable HTTP servers with OAuth. In the desktop app use **Settings > MCP servers**; in the CLI `codex mcp add`.
- Skills: personal skills live in `$HOME/.agents/skills`; shared team skills can be checked into `.agents/skills` in a repository. The `$skill-creator` skill scaffolds a first version; keep it local while iterating, then package it as a plugin to share. The description should say what the skill does and when to use it, with realistic trigger phrases.
- Scheduled tasks: create from the **Scheduled** page by choosing the project, prompt, cadence, and a dedicated Git worktree or your local environment; the prompt can invoke skills. Use them for reflection and maintenance too (review recent chats, summarize repeated friction).
- Organize long-running chats: pin chats and create worktrees in the desktop app; in the CLI use `/experimental`, `/resume`, `/fork` (new chat preserving the original transcript), `/compact` (Codex also compacts automatically), `/subagents`, `/theme`, `/apps`, `/status`. Keep one chat per coherent unit of work; fork only when work truly branches; use subagents to offload bounded work (exploration, tests, triage).
- Common mistakes: overloading the prompt with durable rules instead of `AGENTS.md` or a skill; not letting the agent see its work (no build/test commands); skipping planning on complex tasks; giving full permission before understanding the workflow; running live tasks on the same files without Git worktrees; scheduling a recurring task before it's reliable manually; watching step by step instead of working in parallel; using one chat for an entire project.
- Codex is useful even with an imperfect prompt, but clear prompting makes results more reliable, especially in large or higher-stakes codebases. Speech dictation in the desktop app is one way to provide context faster.
- **Plan first for difficult tasks**: for complex or ambiguous work, ask Codex to plan before coding. Plan mode (`/plan` or Shift+Tab) lets Codex gather context, ask clarifying questions, and build a stronger plan before implementation; alternatives are asking Codex to interview you first, or using a `PLANS.md` template for multi-step work.
- **Testing and review**: ask Codex to create/modify tests, run the test suite, run lint/type-checking, and validate behavior — don't just generate code. The `/review` slash command runs a GitHub-style review against a base branch, uncommitted changes, or a specific commit.
- **MCP**: connect Codex to external tools/systems when needed context lives outside the repo or changes frequently, instead of copy-pasting live information into prompts; start with one or two tools that remove a real manual step rather than connecting everything at once.
- **Skills**: once a workflow becomes repeatable, package it as a `SKILL.md` file, scoped to one job with clear inputs/outputs; start with 2-3 concrete use cases and iterate rather than covering every edge case up front.
- **Scheduled tasks**: automate stable, recurring workflows (e.g. commit summaries, release notes) through the desktop app's Scheduled page once a skill is proven; skills define the method, scheduled tasks define the cadence.
- Durable per-repo/per-user guidance (`AGENTS.md`, `config.toml` layering, MCP server setup) is documented in detail on separate reference pages outside this category (agent-configuration / config scopes).

## Related

- [cli.md](./cli.md)
- [ide.md](./ide.md)
- [cloud.md](./cloud.md)
- [models.md](./models.md)
