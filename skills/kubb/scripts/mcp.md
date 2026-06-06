# mcp

AI アシスタント連携用の MCP（Model Context Protocol）サーバー操作コマンド。

## MCP パッケージのインストール

```sh
npm install --save-dev @kubb/mcp @kubb/cli
```

## MCP サーバーの起動（インストール不要）

```sh
npx kubb mcp
```

stdio 経由で通信する MCP サーバーが起動し、AI クライアントのリクエストを待機する。

## MCP サーバーの直接実行

```sh
npx @kubb/mcp
```

## Claude Desktop への MCP サーバー登録

以下の設定を `claude_desktop_config.json` に追加する:

- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`
- Linux: `~/.config/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "kubb": {
      "command": "npx",
      "args": ["kubb", "mcp"]
    }
  }
}
```

設定追加後、Claude Desktop を再起動する。

## Agent サーバーの起動（Kubb Studio 連携）

```sh
kubb agent start
```

Kubb Studio との WebSocket 連携用サーバーを起動する。

```sh
kubb agent start --host 0.0.0.0 --port 8080
```

ホストとポートを指定して起動する。

## Agent サーバーの環境変数

| 変数 | 説明 |
|------|------|
| `PORT` | サーバーポート |
| `KUBB_ROOT` | プロジェクトルート |
| `KUBB_CONFIG` | 設定ファイルのパス |
| `KUBB_AGENT_TOKEN` | 認証トークン（Kubb Studio で作成） |
| `KUBB_STUDIO_URL` | Studio エンドポイント |
| `KUBB_ALLOW_WRITE` | 書き込み許可 |
| `KUBB_ALLOW_ALL` | 全権限 |

## Agent サーバーのヘルスチェック

```sh
curl http://localhost:3000/api/health
```
