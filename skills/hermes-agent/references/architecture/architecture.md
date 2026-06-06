# Architecture Overview

High-level structure and major subsystems of the Hermes Agent framework.

## High-Level Structure

| Directory / Module | Role |
|--------------------|------|
| `run_agent.py` | `AIAgent` orchestration engine (core loop) |
| `cli.py` | Interactive terminal interface |
| `tools/registry.py` | Central tool registry (70+ tools, ~28 toolsets) |
| `model_tools.py` / `toolsets.py` | Tool discovery and grouping |
| `hermes_state.py` | SQLite-backed session persistence |
| Subsystem modules | Gateway, cron, memory plugins, skill management |
| Plugin system | User/project-level plugins; register tools, hooks, CLI commands |

## Major Subsystems

### Agent Loop

The synchronous orchestration engine. Responsibilities:

- Provider / API-mode selection
- Prompt construction
- Tool execution
- Retries and fallback
- Callbacks
- Context compression
- Session persistence

### Prompt System

Distributed across three modules:

- Prompt-building logic
- Context compression
- Prompt caching

Design goal: stability and token efficiency across long sessions.

### Provider Runtime

A shared runtime resolver maps `(provider, model)` pairs to credentials and API configurations across 18+ providers, handling OAuth flows and alias resolution. All entry points (CLI, gateway, cron, ACP) share the same resolver.

### Tooling Runtime

Centralized in `tools/registry.py`:

- 70+ registered tools across ~28 toolsets
- Tools self-register at import time
- Terminal backends: local, Docker, SSH, Daytona, Modal, Singularity (6 backends)
- Process manager and dispatch rules
- Schema collection and environment orchestration

Provides a unified tool-execution surface for all subsystems.

### Session Persistence

SQLite with FTS5 full-text search stores historical session state with:

- Lineage tracking across compression splits
- Per-platform isolation
- Atomic writes with contention handling

Long-running sessions remain coherent across compression boundaries.

### Messaging Gateway

A long-running service with 20 platform adapters:

- Unified session routing and authorization (allowlists + DM pairing)
- Slash command dispatch and hook system
- Cron ticking and background maintenance
- Circuit breakers that pause adapters during sustained platform outages

### Plugin Architecture

Three discovery sources:

- `~/.hermes/plugins/` (user-level)
- `.hermes/plugins/` (project-level)
- pip entry points

Plugins register tools, hooks, and CLI commands through a context API. Specialized plugins handle memory providers and context engines as single-select modules.

### ACP Integration

Exposes the agent as an editor-native agent over stdio / JSON-RPC, enabling IDE integration via the Agent Communication Protocol.

### RL & Environments

Full environment framework supporting:

- Agent evaluation
- Reinforcement learning integration
- SFT (supervised fine-tuning) data generation

## Data Flow

- **CLI**: User input → `HermesCLI.process_input()` → `AIAgent.run_conversation()` → API call → tool loop → response
- **Gateway**: Platform event → Adapter → authorize → session resolve → `AIAgent` → deliver back
- **Cron**: Scheduler tick → fresh agent → inject skills → run → deliver to platform

## Design Principles

- **Prompt stability** — prompt-building logic (`prompt_builder.py`) is isolated; stable → context → volatile ordering with Anthropic prefix caching.
- **Observable and interruptible tool execution** — tool dispatch is traceable and can be interrupted.
- **Persistent sessions** — SQLite-backed state supports long-running operations across compression boundaries.
- **Shared agent core across frontends** — CLI, gateway, ACP, and cron all drive the same `AIAgent` engine.
- **Loose coupling for optional subsystems** — gateway, cron, plugin, and RL layers are independent and additive.
- **Profile isolation** — per-platform session isolation prevents context leakage across messaging channels.

## Related

- [README](./README.md)
