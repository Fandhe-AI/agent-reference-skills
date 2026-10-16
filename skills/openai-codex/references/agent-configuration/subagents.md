# Subagents

ChatGPT Work and Codex can run subagent workflows: spawning specialized agents in parallel and collecting their results into one response, useful for highly parallel tasks like codebase exploration or multi-step feature plans. In local Codex clients you can also define custom agents with distinct model configurations and instructions.

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
model = "gpt-6.1-sol"
model_reasoning_effort = "medium"
developer_instructions = """
Review code like an owner.
Do not edit files.
Prioritize correctness, security, behavior regressions, and missing test coverage.
Lead with concrete findings, include reproduction steps when possible, and avoid style-only comments unless they hide a real bug.
"""
```

```toml
# .codex/config.toml (project)
[agents]
max_concurrent_threads_per_session = 8

[mcp_servers.chrome_devtools]
url = "http://localhost:3000/mcp"
startup_timeout_sec = 20
```

```toml
# Disable an individual skill for one custom agent
[[skills.config]]
path = "/Users/me/.agents/skills/docs-editor/SKILL.md"
enabled = false
```

## Options / Props

Global settings live under `[agents]` in `config.toml`.

| Field | Type | Required | Purpose |
|-------|------|----------|---------|
| `agents.enabled` | boolean | No | Enable or disable multi-agent tools (default `true`). |
| `agents.max_concurrent_threads_per_session` | number | No | Cap concurrently open spawned-agent threads, excluding the primary (legacy alias: `agents.max_threads`). Unset: Codex chooses the default. |
| `agents.default_subagent_model` | string | No | Default model for spawned agents. |
| `agents.default_subagent_reasoning_effort` | string | No | Default reasoning effort for spawned agents. |
| `agents.interrupt_message` | boolean | No | Record a model-visible message when an agent turn is interrupted (default `true`). |

Custom agent file schema (`~/.codex/agents/*.toml` or `.codex/agents/*.toml`):

| Field | Type | Required | Purpose |
|-------|------|----------|---------|
| `name` | string | Yes | Agent name Codex uses when spawning or referring to this agent. The `name` field is the source of truth (matching the filename is a convention). |
| `description` | string | Yes | Human-facing guidance for when Codex should use this agent. |
| `developer_instructions` | string | Yes | Core instructions that define the agent's behavior. |
| `model`, `model_reasoning_effort`, `model_reasoning_summary`, `model_verbosity` | string | No | Customize model behavior (accepted values: see config-reference.md). |
| `features.shell_tool`, `features.apps`, `features.plugins`, `features.memories`, `features.request_permissions_tool` | boolean | No | Set to `false` to reduce the agent's capabilities. |
| `skills.config`, `skills.bundled.enabled`, `skills.include_instructions` | table / boolean | No | Disable individual skills (`skills.config`), bundled skills (`skills.bundled.enabled = false`), or omit the automatic skills instructions block (`skills.include_instructions = false`). Managed requirements still apply. |

## Notes

- Availability: current Codex releases enable subagent workflows by default; activity appears in the ChatGPT desktop app, Codex CLI, and IDE extension. ChatGPT Work exposes subagent workflows and activity to eligible accounts and runs them in its hosted environment.
- Subagent workflows consume more tokens than comparable single-agent runs because each subagent does its own model and tool work. Use parallel agents for read-heavy tasks (exploration, tests, triage, summarization); be more careful with parallel write-heavy workflows because concurrent edits conflict.
- Core terms: subagent workflow (Codex runs parallel agents and combines results), subagent (a delegated agent for a specific task), agent thread (the thread where a subagent works; supported clients let you open it).
- Triggering: use direct instructions ("spawn two agents", "delegate this work in parallel", "use one agent per point"). Local Codex releases also delegate when applicable `AGENTS.md` or skill instructions request it. In ChatGPT Work, Ultra lets ChatGPT delegate proactively; at other intelligence levels ask explicitly.
- Model resolution: if you configure no subagent model or `model_reasoning_effort`, the subagent inherits the parent's. Codex resolves each setting from an explicit spawn value, then the `[agents]` default, then the parent's value. If a spawn request or `[agents]` default selects a model with no effort, the model's default effort is used. A value set in the custom agent file takes precedence. A file that sets only `model` preserves the previously resolved effort; set `model_reasoning_effort` too if the model doesn't support that effort.
- Model choice: `gpt-6.1-sol` for demanding agents (ambiguous, multi-step work); `gpt-6-luna` for fast, narrowly scoped, clear, repeatable, or high-volume work. For explicit settings, start with `high` for GPT-6 Luna or `low` for GPT-6 Astra. Effort levels: `ultra`, `max`, `xhigh` (when the model supports them), `high`, `medium`, `low`.
- Orchestration: Codex handles spawning, routing follow-up instructions, waiting for results, and closing agent threads. When many agents run, Codex waits until all requested results are available, then returns a consolidated response.
- Managing: CLI `/subagents` inspects and switches between agent threads. Desktop app: open a subagent thread from the activity in the main thread. IDE: expand the background-agent panel to inspect status, stop active subagents, or open a thread. Web: read-only **Active** / **Done** lists with no stop/steer control. In all clients you can ask Codex directly to steer, stop, or close subagent threads.
- Approvals and sandbox: subagents inherit the parent turn's sandbox policy and permission mode (including changes made with `/permissions` or `--yolo`); a custom agent file can't replace them. Set sandbox and approval controls on the parent session. Custom agent instructions can ask an agent to avoid edits but don't create a separate read-only sandbox. In the CLI, approval requests can surface from inactive agent threads; the overlay shows the source thread label and `o` opens that thread. In non-interactive flows, an action needing new approval fails and the error surfaces to the parent workflow.
- Built-in agents: `default` (general-purpose fallback), `worker` (execution-focused implementation/fixes), `explorer` (read-heavy codebase exploration). A custom agent whose name matches a built-in (e.g. `explorer`) takes precedence.
- Custom agents inherit the parent's permissions, provider, and MCP servers. `sandbox_mode`, `approval_policy`, `model_provider`, and `mcp_servers` placed in a custom agent file don't override the parent configuration; the service tier also follows the root session. Configure MCP servers in the parent session (e.g. `[mcp_servers.openaiDeveloperDocs]` with `url = "https://developers.openai.com/mcp"` in `.codex/config.toml`).
- The official examples pair `pr_explorer` / `docs_researcher` / `code_mapper` / `ui_fixer` (`gpt-6-luna`, effort `high`) with `reviewer` / `browser_debugger` (`gpt-6.1-sol`, effort `medium`).
- This is OpenAI Codex's own agent-configuration mechanism (`~/.codex/agents/`, `.codex/agents/*.toml`, `AGENTS.md`) and is unrelated to Claude Code's `.claude/` directory structure (subagent definitions, skills, rules) — the two are not interchangeable, despite similar terminology ("subagent", "agent").

## Related

- [Custom Instructions with AGENTS.md](./agents-md.md)
- [Rules](./rules.md)
- [Speed](./speed.md)
