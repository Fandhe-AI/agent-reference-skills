# Getting Started

| Name | Description | Path |
|------|-------------|------|
| How the agent loop works | The message lifecycle, tool execution, context window, and architecture that power SDK agents: Claude evaluates the prompt, calls tools, receives results, and repeats until the task is complete. | [agent-loop.md](./agent-loop.md) |
| Use Claude Code features in the SDK | Load project instructions (CLAUDE.md and rules), skills, and hooks into SDK agents through `settingSources`, the same filesystem-based features Claude Code CLI uses. | [claude-code-features.md](./claude-code-features.md) |
| Migrate to Claude Agent SDK | Guide for migrating the Claude Code TypeScript and Python SDKs, renamed to the Claude Agent SDK, reflecting broader agent-building capabilities beyond coding tasks. | [migration-guide.md](./migration-guide.md) |
| Agent SDK overview | The Agent SDK gives you the same tools, agent loop, and context management that power Claude Code, programmable in Python and TypeScript. An agent plans its own steps and calls tools that read files, run commands, or edit code. | [overview.md](./overview.md) |
| Quickstart | Install the Agent SDK, set an API key, and build a first agent that reads code, finds bugs, and fixes them autonomously. | [quickstart.md](./quickstart.md) |
