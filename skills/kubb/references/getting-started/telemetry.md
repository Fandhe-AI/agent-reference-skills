# Telemetry

Kubb CLI が収集する匿名使用データについての説明（Kubb 5.11.0 / docs 5.x reference/telemetry。旧パスから `/docs/5.x/reference/telemetry` へ移動）。

Telemetry is enabled by default. Disable it any time with the `DO_NOT_TRACK` or `KUBB_DISABLE_TELEMETRY` environment variable.

## 収集される情報

| Field | Description | Example |
|------|------|------|
| `command` | CLI command that was run | `"generate"`, `"validate"`, `"mcp"` |
| `kubbVersion` | Kubb CLI version | `"5.0.0"` |
| `nodeVersion` | Node.js major version | `"22"` |
| `runtime` | JavaScript runtime name | `"node"`, `"bun"`, `"deno"` |
| `runtimeVersion` | Runtime major version | `"22"` |
| `platform` | Operating system | `"linux"`, `"darwin"`, `"win32"` |
| `ci` | Whether running in CI | `true` |
| `tty` | Whether a terminal is attached to stdin, which usually means a person typed the command | `true` |
| `agent` | Name of the AI coding agent that ran the command, if any | `"claude"` |
| `mcpClient` | Name the MCP client reports when it connects (only for `mcp`) | `"claude-code"`, `"cursor-vscode"` |
| `plugins` | Plugin names and their options (only for `generate`) | `[{ "name": "@kubb/plugin-ts", "options": { "output": { "path": "types" } } }]` |
| `duration` | Command execution time in milliseconds | `1432` |
| `filesCreated` | Number of files generated (only for `generate`) | `47` |
| `status` | Whether the command succeeded or failed | `"success"` |

### 送信されるコマンド

| Command | Description |
|------|------|
| `kubb generate` | Sent after code generation completes or fails |
| `kubb validate` | Sent after OpenAPI validation completes or fails |
| `kubb mcp` | Sent when an MCP client connects, or when the server fails to start |

## 収集されない情報

- OpenAPI specification contents
- File paths or directory structures
- Secrets, API keys, or tokens
- Source code or generated code
- IP addresses or user identifiers

## テレメトリーの無効化

`DO_NOT_TRACK` または `KUBB_DISABLE_TELEMETRY` を `1` または `true` に設定する。`DO_NOT_TRACK` は cross-tool convention に従う。

```bash
DO_NOT_TRACK=1 kubb generate
```

## データの送信方法

- **フォーマット:** OpenTelemetry OTLP traces
- **送信先:** `https://otlp.kubb.dev/v1/traces`（各コマンド終了時）
- **タイムアウト:** 5 秒
- **フォールバック:** 失敗時はサイレントに無視
- **前提:** オンラインのときのみ送信

## Notes

- 旧版ページにあった `agent` コマンド・「データの活用目的」節は 5.x の telemetry ページに記載がない。`agent` は現在はコマンドではなく、実行した AI エージェント名のフィールド

## Related

- [introduction.md](./introduction.md)
- [troubleshooting.md](./troubleshooting.md)
