# Claude Desktop

生成した Kubb MCP サーバーを Claude Desktop に登録し、そのツールから API を呼び出す手順。

## 前提

- [Claude Desktop](https://claude.ai/download) をインストール済み
- API 仕様から MCP サーバーを生成済み。生成設定と実行時依存のインストールは plugin-mcp の「Run an MCP server」ガイドに従う。生成は `start.ts` エントリポイントとそのための `.mcp.json` エントリを書き出す

## サーバーの登録

Claude Desktop の `Settings → Developer → Edit Config` を開く。`claude_desktop_config.json` が開き、Kubb MCP サーバーと同じファイルを使う。`src/gen/mcp/.mcp.json` に生成されたエントリを `mcpServers` オブジェクトへ追加する。既存のサーバーエントリは残す。`args` 内のパスを、生成された `start.ts` への絶対パスに書き換える。

```json
{
  "mcpServers": {
    "Swagger PetStore - OpenAPI 3.0": {
      "type": "stdio",
      "command": "npx",
      "args": ["tsx", "/absolute/path/to/project/src/gen/mcp/start.ts"]
    }
  }
}
```

## 生成ツールの利用

Claude Desktop を完全に終了して再起動する。`Manage connectors` を開いて対象サーバーを選択し、ツールが仕様の operation と一致することを確認する。Claude に operation の実行を依頼し、API 呼び出しを承認する前にリクエスト内容を確認する。

## Notes

- 例のパスは自分のプロジェクトのパスに置き換える。Windows の JSON パスではバックスラッシュを `\\` とエスケープする
- 本ページは**生成した** MCP サーバー（plugin-mcp の出力）の接続手順。Kubb 自体の組み込み MCP サーバー（`kubb mcp`）の設定は [mcp.md](./mcp.md) の Client configuration を参照
- Migration (5.11 → 5.20): the entry point is the generated `start.ts` under `src/gen/mcp/` (the 5.11.0 docs had a hand-written `server.ts` calling `startServer`). The changelog excerpt checked here does not record when plugin-mcp began generating `start.ts`.
- Source: https://kubb.dev/docs/5.x/ai/claude-desktop （kubb@5.20.0 の docs/5.x/ai/claude-desktop.md、取得日 2026-11-14）

## Related

- [mcp.md](./mcp.md)
- [claude.md](./claude.md)
- [plugin-mcp.md](../plugins/plugin-mcp.md)
