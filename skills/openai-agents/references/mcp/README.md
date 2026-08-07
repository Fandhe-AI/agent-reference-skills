# MCP (Model Context Protocol)

This category covers the consuming side of MCP (connecting to MCP servers from the Agents SDK); publishing an MCP server as a ChatGPT app (window.openai, registerAppTool) is covered by the openai-apps-sdk skill.

OpenAI API / Agents SDK からの MCP 利用（remote MCP servers への接続・認証・approval 制御、connectors、Realtime 統合）を扱う。Codex の MCP 設定（`config.toml`）は openai-codex スキル、ChatGPT Apps SDK 向け MCP サーバー構築は対象外。

| Name | Description | Path |
|------|-------------|------|
| MCP and Connectors | Responses API における remote MCP servers / OpenAI-maintained connectors の接続・認証・approval・allowed_tools 設定 | [mcp-and-connectors.md](./mcp-and-connectors.md) |
| Agents SDK MCP Integration | Agents SDK での hosted MCP tool と local MCP server（stdio）の接続方法、トレーシング連携 | [agents-sdk-integration.md](./agents-sdk-integration.md) |
| MCP Tools and Connectors in Realtime Sessions | Realtime API セッションでの MCP tool / connector 設定とライフサイクルイベント | [realtime-sessions.md](./realtime-sessions.md) |
| Secure MCP Tunnel | private/on-prem MCP server を公開せずに接続する outbound-only tunnel の設定手順 | [secure-mcp-tunnel.md](./secure-mcp-tunnel.md) |
