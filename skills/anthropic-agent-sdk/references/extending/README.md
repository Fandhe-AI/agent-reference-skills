# Extending

Claude Agent SDK（ライブラリ組み込み）側の Skills / MCP / subagents / hooks / slash commands。Claude Code CLI 本体の同名機能は anthropic-claude-code-extend、Claude API 側は anthropic-api-tools-mcp を参照。

| Name | Description | Path |
|------|-------------|------|
| Custom Tools | Define custom tools with the Agent SDK's in-process MCP server so Claude can call your functions, hit your APIs, and perform domain-specific operations. | [custom-tools.md](./custom-tools.md) |
| Intercept and Control Agent Behavior with Hooks | Callback functions that run your code in response to agent events (tool calls, session lifecycle, subagent activity) to block, log, transform, or approve operations. | [hooks.md](./hooks.md) |
| Connect to External Tools with MCP | Configure MCP (Model Context Protocol) servers to extend the Agent SDK with external tools: databases, APIs like Slack and GitHub, or other services, without writing custom tool implementations. | [mcp.md](./mcp.md) |
| Plugins in the SDK | Load custom plugins from local directories to add skills, agents, hooks, and MCP servers to an Agent SDK session. | [plugins.md](./plugins.md) |
| Agent Skills in the SDK | Extend Claude with specialized, model-invoked capabilities packaged as `SKILL.md` files, loaded from the filesystem into an Agent SDK session. | [skills.md](./skills.md) |
| Slash Commands in the SDK | Control Claude Code sessions through the SDK with `/`-prefixed commands, including built-ins like `/compact` and `/clear`, plus custom commands defined as markdown files. | [slash-commands.md](./slash-commands.md) |
| Subagents in the SDK | Separate agent instances the main agent can spawn to isolate context, run tasks in parallel, and apply specialized instructions, defined programmatically via the `agents` option. | [subagents.md](./subagents.md) |
| Scale to Many Tools with Tool Search | Enables the agent to work with hundreds/thousands of tools by discovering and loading only what's needed on demand, instead of loading all tool definitions upfront. | [tool-search.md](./tool-search.md) |
