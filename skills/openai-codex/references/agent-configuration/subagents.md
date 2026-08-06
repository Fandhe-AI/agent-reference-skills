# Subagents

ChatGPT Work and Codex can run subagent workflows: spawning specialized agents in parallel and collecting their results into one response, useful for highly parallel tasks like codebase exploration or multi-step feature plans. In local Codex clients you can also define custom agents with distinct models and instructions.

## Signature / Usage

```text
Review this branch with parallel subagents. Spawn one subagent for security
risks, one for test gaps, and one for maintainability. Wait for all three,
then summarize the findings by category with file references.
```

```toml
# .codex/agents/reviewer.toml
name = "reviewer"
description = "PR reviewer focused on correctness, security, and missing tests."
model = "gpt-5.6-terra"
model_reasoning_effort = "high"
sandbox_mode = "read-only"
developer_instructions = """
Review code like an owner.
Prioritize correctness, security, behavior regressions, and missing test coverage.
"""
```

## Options / Props

Custom agent file (required fields): `name`, `description`, `developer_instructions`. Optional: any supported `config.toml` key, e.g. `model`, `model_reasoning_effort`, `sandbox_mode`, `mcp_servers`, `skills.config`.

| Field | Type | Required | Purpose |
|-------|------|----------|---------|
| `agents.enabled` | boolean | No | Enable or disable multi-agent tools (default `true`). |
| `agents.max_concurrent_threads_per_session` | number | No | Cap concurrently open spawned-agent threads, excluding the primary (legacy alias: `agents.max_threads`). |
| `agents.default_subagent_model` | string | No | Default model for spawned agents. |
| `agents.default_subagent_reasoning_effort` | string | No | Default reasoning effort for spawned agents. |
| `agents.interrupt_message` | boolean | No | Record a model-visible message when an agent turn is interrupted (default `true`). |
| `name` (agent file) | string | Yes | Agent name used when spawning or referring to this agent. |
| `description` (agent file) | string | Yes | Human-facing guidance for when Codex should use this agent. |
| `developer_instructions` (agent file) | string | Yes | Core instructions defining the agent's behavior. |

## Notes

- Built-in agents: `default` (general-purpose fallback), `worker` (execution-focused implementation/fixes), `explorer` (read-heavy codebase exploration). Custom agents are defined as standalone TOML files under `~/.codex/agents/` (personal) or `.codex/agents/` (project-scoped); a custom agent name matching a built-in name takes precedence.
- Setting resolution: an explicit spawn value wins, then the corresponding `[agents]` default, then the parent's value; other session settings (`sandbox_mode`, `mcp_servers`, `skills.config`) inherit from the parent when the custom agent file omits them.
- Model guidance: `gpt-5.6` for demanding, ambiguous multi-step work; `gpt-5.6-terra` for read-heavy/parallel workers returning distilled results; `gpt-5.6-luna` for fast, narrowly scoped, high-volume work. Reasoning effort ranges `low` → `medium` → `high` → `xhigh`/`max` → `ultra`.
- Trigger subagents with direct instructions ("spawn two agents", "delegate this work in parallel"); local Codex clients (app/CLI/IDE) also delegate when applicable `AGENTS.md` or skill instructions request it. In the CLI, use `/agent` to inspect and switch between agent threads.
- Subagents inherit the current sandbox policy / permission mode of the parent turn (app/CLI/IDE); ChatGPT Work runs subagents in its hosted environment without a local sandbox control. Override the sandbox per custom agent (e.g. `sandbox_mode = "read-only"`).
- Subagent workflows consume more tokens than comparable single-agent runs because each subagent does its own model and tool work. Favor parallel agents for read-heavy tasks (exploration, tests, triage, summarization); be careful with parallel write-heavy workflows due to edit conflicts.
- This is OpenAI Codex's own agent-configuration mechanism (`~/.codex/agents/`, `.codex/agents/*.toml`, `AGENTS.md`) and is unrelated to Claude Code's `.claude/` directory structure (subagent definitions, skills, rules) — the two are not interchangeable, despite similar terminology ("subagent", "agent").

## Related

- [Custom Instructions with AGENTS.md](./agents-md.md)
- [Rules](./rules.md)
- [Speed](./speed.md)
