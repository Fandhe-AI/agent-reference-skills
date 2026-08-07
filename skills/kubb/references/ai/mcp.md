# MCP サーバーのセットアップ

Kubb が同梱する MCP（Model Context Protocol）サーバー。任意の MCP 対応クライアントにコード生成ツールを公開する。接続後はエディタや Agent がチャットから Kubb の生成・スキーマ検証・設定のスキャフォールドを実行できる。

## Signature / Usage

```shell
kubb mcp
```

stdio トランスポートでサーバーが起動する。

## クライアント設定

### Claude Desktop

`claude_desktop_config.json` に追加する（macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`）:

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

### Cursor

`Settings → MCP` で新しいサーバーエントリーを追加する。設定内容は Claude Desktop と同じ。

### VS Code (GitHub Copilot)

ワークスペースの `.vscode/mcp.json` に追加する（グローバル設定はコマンドパレットの `MCP: Open User Configuration`）:

```json
{
  "servers": {
    "kubb": {
      "command": "npx",
      "args": ["kubb", "mcp"]
    }
  }
}
```

## Notes

- 組み込み MCP サーバーには Kubb v5 以降が必要
- 本ページはエディタ / Agent から Kubb ツールを MCP 経由で利用する手順。OpenAPI 仕様から MCP サーバーを**生成する**場合は `@kubb/plugin-mcp` を使う（[plugin-mcp.md](../plugins/plugin-mcp.md)）
- 既存の `helpers/mcp.md`（`@kubb/mcp` パッケージ）とは別物。本ページは Kubb v5 組み込みの `kubb mcp` コマンド

## Related

- [claude.md](./claude.md)
- [plugin-mcp.md](../plugins/plugin-mcp.md)
- [mcp.md (helpers)](../helpers/mcp.md)
