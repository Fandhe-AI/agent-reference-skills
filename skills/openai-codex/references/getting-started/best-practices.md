> OpenAI Codex (learn.chatgpt.com) のドキュメント.

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
