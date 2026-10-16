# Agent Configuration

| Name | Description | Path |
| --- | --- | --- |
| Custom Instructions with AGENTS.md | Codex reads `AGENTS.md` files before doing any work, layering global guidance with project-specific overrides so every task starts with consistent expectations. | [agents-md.md](./agents-md.md) |
| Hooks | Extensibility framework that lets you run scripts or MCP tools during the agentic loop — logging/analytics, blocking accidental secret pastes, auto-summarizing chats into persistent memories, validating a turn before it stops, or customizing prompting per directory. Hooks are enabled by default. | [hooks.md](./hooks.md) |
| Import from another agent | The import flow brings instructions, settings, skills, plugins, projects, and recent work from another agent into the ChatGPT desktop app or Codex CLI. The desktop app can import from Claude Code, Claude Cowork, or Cursor; Codex CLI can import from Claude Code or Cursor. | [import.md](./import.md) |
| Memories | Memories let ChatGPT and Codex carry useful context from earlier work into future work. ChatGPT web uses ChatGPT memory, while local Codex clients use a separate local memory store and controls. | [memories.md](./memories.md) |
| Prompting | General guidance for writing effective prompts across Chat, ChatGPT Work, and Codex, plus Codex-specific prompting workflows (explain a codebase, fix a bug, write a test, code review, delegate to cloud). | [prompting.md](./prompting.md) |
| Rules | Rules control which commands Codex can run outside the sandbox. Rules are experimental and may change. | [rules.md](./rules.md) |
| Speed | You can increase model speed in Codex in exchange for higher usage: Fast mode and Ultrafast mode. | [speed.md](./speed.md) |
| Subagents | ChatGPT Work and Codex can run subagent workflows: spawning specialized agents in parallel and collecting their results into one response, useful for highly parallel tasks like codebase exploration or multi-step feature plans. In local Codex clients you can also define custom agents with distinct model configurations and instructions. | [subagents.md](./subagents.md) |
