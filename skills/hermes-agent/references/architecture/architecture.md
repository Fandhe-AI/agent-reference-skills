# Architecture Overview

High-level structure and major subsystems of the Hermes Agent framework.

## High-Level Structure

| Directory / Module | Role |
|--------------------|------|
| `run_agent.py` | `AIAgent` orchestration engine (core loop) |
| `cli.py` | Interactive terminal interface |
| `model_tools.py` / `toolsets.py` | Tool discovery and grouping |
| `hermes_state.py` | SQLite-backed session persistence |
| Subsystem modules | Gateway, cron, memory plugins, skill management |

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

A shared resolver handles model provider selection for all entry points (CLI, gateway, cron, ACP), ensuring consistent API routing regardless of how the agent is invoked.

### Tooling Runtime

Coordinates:

- Tool registry
- Toolsets
- Terminal backends
- Process manager
- Dispatch rules

Provides a unified tool-execution surface for all subsystems.

### Session Persistence

SQLite stores historical session state. Key property: lineage is preserved across compression splits, so long-running sessions remain coherent.

### Messaging Gateway

A long-running layer that manages:

- Platform adapters
- Session routing and pairing
- Message delivery
- Cron ticking

### ACP Integration

Exposes the agent as an editor-native agent over stdio / JSON-RPC, enabling IDE integration via the Agent Communication Protocol.

### RL & Environments

Full environment framework supporting:

- Agent evaluation
- Reinforcement learning integration
- SFT (supervised fine-tuning) data generation

## Design Principles

- **Prompt stability** — prompt-building logic is isolated to prevent regressions.
- **Observable and interruptible tool execution** — tool dispatch is traceable and can be interrupted.
- **Persistent sessions** — SQLite-backed state supports long-running operations across compression boundaries.
- **Shared agent core across frontends** — CLI, gateway, ACP, and cron all drive the same `AIAgent` engine.
- **Loose coupling for optional subsystems** — gateway, cron, and RL layers are independent and additive.

## Related

- [README](./README.md)
