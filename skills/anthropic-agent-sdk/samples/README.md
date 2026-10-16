# samples

| Name | Description | Path |
| --- | --- | --- |
| Configure an Agent Session | Compose the `options` object (`model` / `allowedTools` / `maxTurns` / `cwd`) and switch model and permission mode mid-session. | [configure-agent.md](./configure-agent.md) |
| Custom Tools with In-Process MCP | Define a tool with `tool()`/`@tool`, wrap it in `createSdkMcpServer`/`create_sdk_mcp_server`, and expose it to the agent via `mcpServers`. | [custom-tools.md](./custom-tools.md) |
| PreToolUse Hook to Block a Tool Call | Register a `PreToolUse` hook that inspects a tool's input and denies the call before it runs. | [hooks.md](./hooks.md) |
| Connect to External MCP Servers | Configure an external MCP server (stdio, HTTP, or SSE) in `options.mcpServers` so the agent can call its tools without a custom implementation. | [mcp-servers.md](./mcp-servers.md) |
| Minimal Agent | Run a single autonomous task through `query()` with pre-approved tools and stream the resulting messages. | [minimal-agent.md](./minimal-agent.md) |
| Permission Modes, Tool Allowlists, and canUseTool | Pair `allowedTools` with a `permissionMode` for a locked-down agent, and use the `canUseTool` callback to handle approval requests that no static rule resolves. | [permissions.md](./permissions.md) |
| Continue, Resume, and Fork a Session | Use `ClaudeSDKClient` (Python) or `continue`/`resume`/`forkSession` options (TypeScript) to keep multi-turn state across `query()` calls or process restarts. | [sessions.md](./sessions.md) |
| Stream Partial Messages | Enable `include_partial_messages`/`includePartialMessages` to receive incremental `StreamEvent`/`SDKPartialAssistantMessage` wrappers around raw Claude API deltas, instead of waiting for each complete `AssistantMessage`. | [streaming.md](./streaming.md) |
| Enforce a JSON Schema on Agent Output | Pass a JSON Schema (from a raw object, Zod, or Pydantic) via `outputFormat`/`output_format`; the SDK validates the agent's output and re-prompts on mismatch. | [structured-outputs.md](./structured-outputs.md) |
| Define and Invoke a Subagent | Declare a specialized subagent programmatically via `options.agents` and let the main agent spawn it through the `Agent` tool. | [subagents.md](./subagents.md) |
| Use the claude_code Preset with an Appended Instruction | Select the built-in `claude_code` system prompt preset and layer a custom instruction on top with `append`, instead of writing a fully custom prompt. | [system-prompts.md](./system-prompts.md) |
