<!-- source: https://code.claude.com/docs/en/agent-sdk/mcp.md / last verified: 2026-08-07 -->

# Connect to External MCP Servers

Configure an external MCP server (stdio, HTTP, or SSE) in `options.mcpServers` so the agent can call its tools without a custom implementation.

```typescript
import { query } from "@anthropic-ai/claude-agent-sdk";

for await (const message of query({
  prompt: "List files in my project",
  options: {
    mcpServers: {
      filesystem: {
        command: "npx",
        args: ["-y", "@modelcontextprotocol/server-filesystem", "/Users/me/projects"]
      }
    },
    allowedTools: ["mcp__filesystem__*"]
  }
})) {
  if (message.type === "result" && message.subtype === "success") {
    console.log(message.result);
  }
}
```

```python
import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions, ResultMessage


async def main():
    options = ClaudeAgentOptions(
        mcp_servers={
            "filesystem": {
                "command": "npx",
                "args": [
                    "-y",
                    "@modelcontextprotocol/server-filesystem",
                    "/Users/me/projects",
                ],
            }
        },
        allowed_tools=["mcp__filesystem__*"],
    )

    async for message in query(prompt="List files in my project", options=options):
        if isinstance(message, ResultMessage) and message.subtype == "success":
            print(message.result)


asyncio.run(main())
```

MCP servers can also be declared in a `.mcp.json` file at the project root, loaded when the `project` setting source is enabled.

## Notes

- `command`/`args`/`env` configures a stdio server (local process over stdin/stdout); `type: "http" | "sse"` plus `headers` configures a remote server.
- MCP tool names follow `mcp__<server-name>__<tool-name>`; wildcards such as `mcp__filesystem__*` are allowed in `allowedTools`.
- Prefer `allowedTools` over `permissionMode: "bypassPermissions"` for MCP access — `acceptEdits` does not auto-approve MCP tools, only file edits and filesystem Bash commands.
- This is Agent SDK MCP configuration for connecting the SDK application to external MCP servers. The Claude Code CLI's own MCP configuration (installation scopes, `/mcp` commands) is documented under anthropic-claude-code-extend; the Claude API's server-side MCP connector is documented under anthropic-api-tools-mcp. Building your own in-process MCP server is covered by the custom-tools sample, not here.
