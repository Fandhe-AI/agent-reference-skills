# samples

| Name | Description | Path |
| --- | --- | --- |
| Configure an Agent Session | Compose the `options` object (`model` / `allowedTools` / … | [configure-agent.md](./configure-agent.md) |
| Custom Tools with In-Process MCP | Define a tool with `tool()`/`@tool`, wrap it in `createSdk…` | [custom-tools.md](./custom-tools.md) |
| PreToolUse Hook to Block a Tool Call | Register a `PreToolUse` hook that inspects a tool's i… | [hooks.md](./hooks.md) |
| Connect to External MCP Servers | Configure an external MCP server (stdio, HTTP, or SSE) in… | [mcp-servers.md](./mcp-servers.md) |
| Minimal Agent | Run a single autonomous task through `query()` with pre-ap… | [minimal-agent.md](./minimal-agent.md) |
| Permission Modes, Tool Allowlists, and canUseTool | Pair `allowedTools` with a `permissionMode` for a locked-d… | [permissions.md](./permissions.md) |
| Continue, Resume, and Fork a Session | Use `ClaudeSDKClient` (Python) or `continue`/`resume`/`fo… | [sessions.md](./sessions.md) |
| Stream Partial Messages | Enable `include_partial_messages`/`includePartialMessage… | [streaming.md](./streaming.md) |
| Enforce a JSON Schema on Agent Output | Pass a JSON Schema (from a raw object, Zod, or Pydantic)… | [structured-outputs.md](./structured-outputs.md) |
| Define and Invoke a Subagent | Declare a specialized subagent programmatically via `opti… | [subagents.md](./subagents.md) |
| Use the claude_code Preset with an Appended Instruction | Select the built-in `claude_code` system prompt preset an… | [system-prompts.md](./system-prompts.md) |
