# Claude Desktop

生成した Kubb MCP サーバーを Claude Desktop に登録し、そのツールから API を呼び出す手順。

## 前提

- [Claude Desktop](https://claude.ai/download) をインストール済み
- API 仕様から MCP サーバーを生成済み。生成設定・実行時依存のインストール・生成された `startServer` 関数を呼ぶ `server.ts` エントリポイントの作成は plugin-mcp の「Run an MCP server」ガイドに従う

## サーバーの登録

Claude Desktop の `Settings → Developer → Edit Config` を開く。`claude_desktop_config.json` が開き、Kubb MCP サーバーと同じファイルを使う。`src/gen/mcp/.mcp.json` に生成されたエントリを `mcpServers` オブジェクトへ追加する。既存のサーバーエントリは残す。コマンド引数は `server.ts` への絶対パスに書き換える。

```json
{
  "mcpServers": {
    "petstore": {
      "command": "npx",
      "args": ["--yes", "tsx", "/absolute/path/to/project/server.ts"]
    }
  }
}
```

## 生成ツールの利用

Claude Desktop を完全に終了して再起動する。`Manage connectors` を開いて対象サーバーを選択し、ツールが仕様の operation と一致することを確認する。Claude に operation の実行を依頼し、API 呼び出しを承認する前にリクエスト内容を確認する。

## Notes

- 例のパスは自分のプロジェクトのパスに置き換える。Windows の JSON パスではバックスラッシュを `\\` とエスケープする
- 本ページは**生成した** MCP サーバー（plugin-mcp の出力）の接続手順。Kubb 自体の組み込み MCP サーバー（`kubb mcp`）の設定は [mcp.md](./mcp.md) の Client configuration を参照
- 出典: https://kubb.dev/docs/5.x/ai/claude-desktop

## Related

- [mcp.md](./mcp.md)
- [claude.md](./claude.md)
- [plugin-mcp.md](../plugins/plugin-mcp.md)
