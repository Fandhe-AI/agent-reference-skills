# Architecture Overview

High-level structure and major subsystems of the Hermes Agent framework (v0.22.2 developer guide).

## System Overview

```text
Entry Points: CLI (cli.py)   Gateway (gateway/run.py)   ACP (acp_adapter/)
              Batch Runner   API Server                 Python Library
        |
        v
AIAgent (run_agent.py)
  Prompt Builder (prompt_builder.py)   Provider Resolution (runtime_provider.py)   Tool Dispatch (model_tools.py)
  Compression & Caching                3 API modes: chat_completions / codex_responses / anthropic_messages
                                                                                    Tool Registry (registry.py): 70+ tools, 28 toolsets
        |                                              |
        v                                              v
Session Storage (SQLite + FTS5)          Tool Backends: Terminal (7 backends), Browser (5), Web (4), MCP (dynamic), File, Vision, etc.
hermes_state.py, gateway/session.py
```

## Directory Structure

| Path | Role |
|------|------|
| `run_agent.py` | `AIAgent` facade; the loop lives in `agent/conversation_loop.py` + `agent/turn_*.py` |
| `cli.py` | `HermesCLI` facade; mixins in `hermes_cli/cli_*_mixin.py` |
| `model_tools.py` / `toolsets.py` | Tool discovery, schema collection, dispatch / tool groupings and platform presets |
| `hermes_state.py` | SQLite session/state database facade (+ `hermes_state_*.py` siblings) |
| `hermes_constants.py` | `HERMES_HOME`, profile-aware paths |
| `batch_runner.py` | Batch trajectory generation |
| `agent/` | Internals: `prompt_builder.py`, `context_engine.py` (pluggable ABC), `context_compressor.py`, `prompt_caching.py`, `auxiliary_client.py`, `model_metadata.py`, `models_dev.py`, `anthropic_adapter.py`, `display.py`, `skill_commands.py`, `memory_manager.py`, `memory_provider.py`, `trajectory.py` |
| `hermes_cli/` | CLI subcommands and setup: `main.py`, `config.py` (`DEFAULT_CONFIG`), `commands.py` (`COMMAND_REGISTRY`), `auth.py`, `runtime_provider.py`, `models.py`, `model_switch.py`, `setup.py`, `skin_engine.py`, `skills_config.py`, `skills_hub.py`, `tools_config.py`, `plugins.py` (`PluginManager`), `callbacks.py`, `gateway.py` |
| `tools/` | One file per tool: `registry.py`, `approval.py`, `terminal_tool.py`, `process_registry.py`, `file_tools.py`, `web_tools.py`, `browser_tool.py`, `code_execution_tool.py`, `delegate_tool.py`, `mcp_tool.py`, `credential_files.py`, `env_passthrough.py`, `ansi_strip.py`, `environments/` (terminal backends) |
| `gateway/` | `run.py` (`GatewayRunner` facade, + `run_*.py` siblings), `session.py`, `delivery.py`, `pairing.py`, `hooks.py`, `mirror.py`, `status.py`, `builtin_hooks/`, `platforms/` (built-in adapters: signal, weixin, bluebubbles, qqbot, whatsapp_cloud, yuanbao, webhook, api_server) |
| `plugins/platforms/` | Bundled platform plugins: telegram, discord, slack, whatsapp, matrix, mattermost, email, sms, dingtalk, feishu, wecom, irc, line, teams, google_chat, buzz, ntfy, photon, raft, simplex (Home Assistant is the `homeassistant` catalog plugin) |
| `acp_adapter/`, `cron/`, `plugins/memory/`, `plugins/context_engine/` | ACP server (VS Code / Zed / JetBrains), scheduler (`jobs.py`, `scheduler.py`), memory provider plugins, context engine plugins |
| `skills/`, `optional-skills/`, `website/`, `tests/` | Bundled skills, official optional skills, Docusaurus docs site, Pytest suite (~25,000 tests across ~1,250 files) |

## Major Subsystems

### Agent Loop

The synchronous orchestration engine (`AIAgent`): provider selection, prompt construction, tool execution, retries, fallback, callbacks, compression, persistence. Supports three API modes.

### Prompt System

- `system_prompt.py` + `prompt_builder.py` assemble ordered tiers (`stable` then `context` then `volatile`): identity/tool guidance/skills, context files, then memory/profile/timestamp blocks.
- `prompt_caching.py` applies Anthropic cache breakpoints for prefix caching.
- `context_compressor.py` summarizes middle turns when context exceeds thresholds.

### Provider Resolution

A shared runtime resolver used by CLI, gateway, cron, ACP, and auxiliary calls maps `(provider, model)` to `(api_mode, api_key, base_url)`. Handles 18+ providers, OAuth flows, credential pools, and alias resolution.

### Tool System

Central registry (`tools/registry.py`) with 70+ registered tools across ~28 toolsets; each tool file self-registers at import time. The registry handles schema collection, dispatch, availability checking, and error wrapping. Terminal tools support 7 backends (local, Docker, SSH, Daytona, Modal, Singularity, Vercel Sandbox).

### Session Persistence

SQLite with FTS5 full-text search; lineage tracking (parent/child across compressions), per-platform isolation, atomic writes with contention handling.

### Messaging Gateway

Long-running process with 25+ platform adapters (built-in + bundled plugins), unified session routing, authorization (allowlists + DM pairing), slash command dispatch, hook system, cron ticking, background maintenance.

### Plugin System

Three discovery sources: `~/.hermes/plugins/` (user), `.hermes/plugins/` (project), pip entry points. Plugins register tools, hooks, and CLI commands through a context API. Memory providers (`plugins/memory/`) and context engines (`plugins/context_engine/`) are single-select, configured via `hermes plugins` or `config.yaml`.

### Cron, ACP, Trajectories

Cron: first-class agent tasks stored in JSON, with skills/scripts and delivery to any platform. ACP: editor-native agent over stdio/JSON-RPC. Trajectories: ShareGPT-format training data from sessions.

## Data Flow

```text
CLI:     User input -> HermesCLI.process_input() -> AIAgent.run_conversation()
           -> prompt_builder.build_system_prompt() -> runtime_provider.resolve_runtime_provider()
           -> API call -> tool_calls? -> model_tools.handle_function_call() -> loop -> display -> SessionDB
Gateway: Platform event -> Adapter.on_message() -> MessageEvent -> GatewayRunner._handle_message()
           -> authorize user -> resolve session key -> AIAgent (with history) -> deliver via adapter
Cron:    Scheduler tick -> load due jobs from jobs.json -> fresh AIAgent (no history)
           -> inject attached skills -> run job prompt -> deliver -> update job state and next_run
```

## Recommended Reading Order

1. This page
2. Agent Loop Internals
3. Prompt Assembly
4. Provider Runtime Resolution
5. Adding Providers
6. Tools Runtime
7. Session Storage
8. Gateway Internals
9. Context Compression & Prompt Caching
10. ACP Internals

## File Dependency Chain

```text
tools/registry.py  (no deps; imported by all tool files)
       ^
tools/*.py  (each calls registry.register() at import time)
       ^
model_tools.py  (imports tools/registry + triggers tool discovery)
       ^
run_agent.py, cli.py, batch_runner.py, environments/
```

Tool registration happens at import time, before any agent instance exists; any `tools/*.py` file with a top-level `registry.register()` call is auto-discovered.

## Design Principles

| Principle | Meaning |
|-----------|---------|
| Prompt stability | System prompt does not change mid-conversation; no cache-breaking mutations except explicit user actions (`/model`) |
| Observable execution | Every tool call is visible via callbacks (spinner in CLI, chat messages in gateway) |
| Interruptible | API calls and tool execution can be cancelled by user input or signals |
| Platform-agnostic core | One `AIAgent` class serves CLI, gateway, ACP, batch, and API server |
| Loose coupling | Optional subsystems use registry patterns and `check_fn` gating |
| Profile isolation | Each profile (`hermes -p <name>`) has its own `HERMES_HOME`, config, memory, sessions, and gateway PID; multiple profiles run concurrently |

## Notes

- Source: https://hermes-agent.nousresearch.com/docs/developer-guide/architecture (pinned to v0.22.2)
- Release notes: https://github.com/NousResearch/hermes-agent/releases/tag/v0.22.0
- v0.22.0 simplified the codebase with no behavior change (source about 1.06M to 698K lines; `gateway/run.py` 34,847 to 5,512 lines, per the v0.22.0 release notes linked above), which is why `run_agent.py`, `cli.py`, `gateway/run.py`, `hermes_state.py`, and tool modules are now facades with sibling modules.
- Counts such as "70+ tools across ~28 toolsets" are as printed on this page; the Built-in Tools Reference lists ~100 tools.
- Messaging platform adapters mostly live as bundled plugins under `plugins/platforms/` rather than `gateway/platforms/`.

## Related

- [README](./README.md)
