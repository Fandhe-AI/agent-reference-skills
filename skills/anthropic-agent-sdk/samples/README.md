# samples

| Name | Description | Path |
| --- | --- | --- |
| minimal-agent | query() での最小エージェント実行とメッセージストリーム処理 | [minimal-agent.md](./minimal-agent.md) |
| custom-tools | tool() / createSdkMcpServer による in-process MCP カスタムツール定義 | [custom-tools.md](./custom-tools.md) |
| mcp-servers | 外部 MCP サーバー（stdio / HTTP / SSE）への接続設定 | [mcp-servers.md](./mcp-servers.md) |
| hooks | PreToolUse フックによるツール呼び出しの拒否制御 | [hooks.md](./hooks.md) |
| permissions | permissionMode と allowedTools/disallowedTools の組み合わせ制御 | [permissions.md](./permissions.md) |
| subagents | agents オプションによるサブエージェント定義と Agent ツール呼び出し | [subagents.md](./subagents.md) |
| sessions | continue / resume / fork によるセッションの継続と分岐 | [sessions.md](./sessions.md) |
| streaming | includePartialMessages による部分メッセージのストリーミング処理 | [streaming.md](./streaming.md) |
| structured-outputs | outputFormat / JSON Schema (Zod, Pydantic) による構造化出力の強制 | [structured-outputs.md](./structured-outputs.md) |
| system-prompts | claude_code プリセットと append によるシステムプロンプトのカスタマイズ | [system-prompts.md](./system-prompts.md) |
