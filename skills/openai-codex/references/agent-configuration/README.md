# Agent Configuration

| Name | Description | Path |
|------|-------------|------|
| Custom Instructions with AGENTS.md | Codex reads `AGENTS.md` files before doing any work, layering global guidance with project-specific overrides so every task starts with consistent expectations. | [agents-md.md](./agents-md.md) |
| Hooks | Extensibility framework that lets you inject your own scripts into the agentic loop — logging/analytics, blocking accidental secret pastes, auto-summarizing chats, validating a turn before it stops, or customizing prompting per directory. Hooks are enabled by default. | [hooks.md](./hooks.md) |
| Prompting | General guidance for writing effective prompts across Chat, ChatGPT Work, and Codex, plus Codex-specific prompting workflows (explain a codebase, fix a bug, write a test, code review, delegate to cloud). | [prompting.md](./prompting.md) |
| Rules | Rules control which commands Codex can run outside the sandbox. Rules are experimental and may change. | [rules.md](./rules.md) |
| Speed | Fast mode and Codex-Spark increase Codex's effective throughput, trading credit consumption for lower latency. | [speed.md](./speed.md) |
| Subagents | ChatGPT Work and Codex can run subagent workflows: spawning specialized agents in parallel and collecting their results into one response, useful for highly parallel tasks like codebase exploration or multi-step feature plans. In local Codex clients you can also define custom agents with distinct models and instructions. | [subagents.md](./subagents.md) |
