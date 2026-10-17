---
source: https://modelcontextprotocol.io/docs/2026-07-28/tools/debugging
---

# Debugging Logs

Claude Desktop 上の MCP サーバーのログ確認と DevTools 有効化のコマンド。

## ログの確認（macOS）

```bash
tail -n 20 -F ~/Library/Logs/Claude/mcp*.log
```

ログの出力先は macOS が `~/Library/Logs/Claude`、Windows が `%APPDATA%\Claude\logs`。接続イベント・設定問題・ランタイムエラー・メッセージ交換が記録される。

## ログの確認（Windows）

```powershell
type "$env:AppData\Claude\logs\mcp*.log"
```

## Chrome DevTools の有効化（macOS）

> **警告**: `developer_settings.json` を上書きする（`>` リダイレクト）。既存の設定がある場合は消えるため、事前に内容を確認する。

```bash
echo '{"allowDevTools": true}' > ~/Library/Application\ Support/Claude/developer_settings.json
```

DevTools は `Command-Option-I`（macOS）で開く。

## Chrome DevTools の有効化（Windows）

> **警告**: `developer_settings.json` を上書きする。既存の設定がある場合は事前に確認する。

```powershell
'{"allowDevTools": true}' | Set-Content "$env:AppData\Claude\developer_settings.json"
```

DevTools は `Ctrl+Alt+I`（Windows）で開く。

## Notes

- Source: tag `2026-07-28` raw（`docs/docs/2026-07-28/tools/debugging.mdx`）、取得日 2026-10-16。
- Streamable HTTP transport のサーバーでは stderr がクライアントに捕捉されない。原文は curl やブラウザ DevTools の Network パネルで確認するよう記載しているが、具体的なコマンドは原文にない。
- stdio サーバーは stdout にログを出さない（プロトコル動作を妨げるため）。stderr に出す。
- `notifications/message` によるプロトコル上のログは 2026-07-28 で Deprecated。
