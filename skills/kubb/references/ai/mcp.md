# MCP サーバーのセットアップ

Kubb が同梱する MCP（Model Context Protocol）サーバー。任意の MCP 対応クライアントにコード生成ツール（`generate` / `validate` / `init`）を公開する。接続後はエディタや Agent がチャットから Kubb の生成・スキーマ検証・設定のスキャフォールドを実行できる（Kubb 5.11.0 / docs 5.x ai/mcp に準拠）。

## Signature / Usage

```shell
kubb mcp
```

各クライアントは `npx kubb mcp` を stdio で起動する。各ツールのパラメーターは [../helpers/mcp.md](../helpers/mcp.md) を参照。

## クライアント設定

### Claude Code

サーバーが `kubb.config.ts` の隣で起動するよう、プロジェクトルートで実行する:

```shell
claude mcp add kubb -- npx kubb mcp
```

`--scope project` を付けると `.mcp.json` にエントリーが書かれ、チームで共有できる。Kubb の Claude Code プラグイン（[claude.md](./claude.md)）は同じサーバーを自動登録する。

### Claude Desktop と Cursor

`claude_desktop_config.json`（macOS は `~/Library/Application Support/Claude/`、Windows は `%APPDATA%\Claude\`）、または Cursor の `Settings → MCP` のサーバー一覧に追加する。Claude Desktop 経由で自分の API を呼ぶ手順は [claude-desktop.md](./claude-desktop.md) を参照。

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

### VS Code (GitHub Copilot)

VS Code は `servers` キーを使う。ワークスペースの `.vscode/mcp.json` に追加する（グローバル設定はコマンドパレットの `MCP: Open User Configuration`）:

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

## 作業ディレクトリ

サーバーはクライアントが起動したフォルダー、続いて親フォルダーで `kubb.config.*` または `.kubbrc.*` を探し、そのフォルダー外を指す `config` パスを拒否する。Claude Code は `claude` を実行したフォルダーで起動する。`generate` が `No config file found` を返す場合は別フォルダーで起動されている。Claude Code などは `cwd` キーを無視するため、コマンド内でプロジェクトへ移動する（macOS / Linux）:

```json
{
  "mcpServers": {
    "kubb": {
      "command": "sh",
      "args": ["-c", "cd '/path/to/your/project' && npx kubb mcp"]
    }
  }
}
```

## Notes

- 組み込み MCP サーバーには Kubb v5 以降が必要
- 本ページはエディタ / Agent から Kubb ツールを MCP 経由で利用する手順。OpenAPI 仕様から MCP サーバーを**生成する**場合は `@kubb/plugin-mcp` を使う（[plugin-mcp.md](../plugins/plugin-mcp.md)）
- 既存の `helpers/mcp.md`（`@kubb/mcp` パッケージ）とは別物ではなく、同じ `kubb mcp` サーバーの単体パッケージ版。ここは docs 5.x のクライアント設定手順

## Related

- [claude.md](./claude.md)
- [claude-desktop.md](./claude-desktop.md)
- [plugin-mcp.md](../plugins/plugin-mcp.md)
- [mcp.md (helpers)](../helpers/mcp.md)
