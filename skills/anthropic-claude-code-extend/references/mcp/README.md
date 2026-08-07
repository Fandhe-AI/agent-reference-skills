# mcp

Claude Code CLI から MCP サーバーへ接続する設定。Agent SDK の MCP は anthropic-agent-sdk、Claude API の MCP connector / tunnels は anthropic-api-tools-mcp を参照。

| Name | Description | Path |
| --- | --- | --- |
| Control MCP server access for your organization | organization が MCP server access を制御 (allowlist / denylist / managed config) | [managed-mcp.md](./managed-mcp.md) |
| Connect Claude Code to tools via MCP | Claude Code から MCP server へ接続する client-side 設定 (http / stdio / ws) | [mcp.md](./mcp.md) |
| Connect to MCP servers | MCP server add / verify / use / remove のステップバイステップ walkthrough | [mcp-quickstart.md](./mcp-quickstart.md) |
