# Telemetry

Kubb CLI が収集する匿名使用データについての説明（Kubb 5.20.0 / docs 5.x reference/telemetry。旧パスから `/docs/5.x/reference/telemetry` へ移動）。

Telemetry is enabled by default. Disable it any time with the `DO_NOT_TRACK` or `KUBB_DISABLE_TELEMETRY` environment variable.

## 収集される情報

| Field | Description | Example |
|------|------|------|
| `command` | CLI command that was run | `"generate"`, `"validate"`, `"mcp"`, `"studio"` |
| `kubbVersion` | Kubb CLI version | `"5.0.0"` |
| `nodeVersion` | Node.js major version | `"22"` |
| `runtime` | JavaScript runtime name | `"node"`, `"bun"`, `"deno"` |
| `runtimeVersion` | Runtime major version | `"22"` |
| `platform` | Operating system | `"linux"`, `"darwin"`, `"win32"` |
| `ci` | Whether running in CI | `true` |
| `tty` | Whether a terminal is attached to stdin, which usually means a person typed the command | `true` |
| `agent` | Name of the AI coding agent that ran the command, if any | `"claude"` |
| `mcpClient` | Name the MCP client reports when it connects (only for `mcp`) | `"claude-code"`, `"cursor-vscode"` |
| `plugins` | Plugin names and the options passed to each plugin (only for `generate`) | `[{ "name": "plugin-ts", "options": { "output": { "path": "types" } } }]` |
| `duration` | Command execution time in milliseconds | `1432` |
| `filesCreated` | Number of files generated (only for `generate`) | `47` |
| `status` | Whether the command succeeded or failed | `"success"` |

Plugin options are sent as the JSON form of what the config passes to each plugin. Values such as `output.path`, `importPath`, `baseURL`, and a string `banner` are included. Functions are dropped.

### 送信されるコマンド

| Command | Description |
|------|------|
| `kubb generate` | Sent after code generation completes or fails |
| `kubb validate` | Sent after OpenAPI validation completes or fails |
| `kubb mcp` | Sent when an MCP client connects, or when the server fails to start |
| `kubb studio` | Sent after a Studio command completes or fails |

## 収集されない情報

- OpenAPI specification contents
- The input path, the project root, or the names of generated files
- Source code or generated code
- User identifiers

Kubb does not read environment variables or credential files for telemetry. A secret reaches the payload only when a plugin option in `kubb.config.ts` holds it as a literal value.

## テレメトリーの無効化

`DO_NOT_TRACK` または `KUBB_DISABLE_TELEMETRY` を `1` または `true` に設定する。`DO_NOT_TRACK` は cross-tool convention に従う。

```bash
DO_NOT_TRACK=1 kubb generate
```

## データの送信方法

- **フォーマット:** OpenTelemetry OTLP traces
- **送信先:** `https://otlp.kubb.dev/v1/traces`（各コマンド終了時）
- **タイムアウト:** 1 秒
- **フォールバック:** 失敗時はサイレントに無視（オフラインやブロックされたホストでも実行は中断されない）
- **通知:** テレメトリーが無効でない限り、コマンド開始時に stderr へ通知を表示する。`--help` / `--version` / `--json` では表示しない

## Notes

- Source: https://kubb.dev/docs/5.x/reference/telemetry （kubb@5.20.0 の docs/5.x/reference/telemetry.md、取得日 2026-11-14）
- Migration (5.11 → 5.20): the 5.20.0 docs changed what is not collected (file paths and IP addresses are no longer listed; the input path, project root and generated file names are) and shortened the request timeout from 5 seconds to 1 second. The changelog excerpt checked here does not record these telemetry changes.
- 旧版ページにあった `agent` コマンド・「データの活用目的」節は 5.x の telemetry ページに記載がない。`agent` は現在はコマンドではなく、実行した AI エージェント名のフィールド

## Related

- [introduction.md](./introduction.md)
- [troubleshooting.md](./troubleshooting.md)
