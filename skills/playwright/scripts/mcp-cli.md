# mcp-cli

コーディングエージェント向けの `playwright-cli` と Playwright MCP サーバーのセットアップ・起動コマンド。

`@playwright/cli` と `@playwright/mcp` は `@playwright/test` とは別の npm パッケージで、`@latest` を使う（v1.64.1 には固定されない）。どちらも Node.js 20 以上が前提（出典は末尾 `## Notes` の getting-started-cli / getting-started-mcp の Source 行）。

## playwright-cli のインストール（グローバル）

```sh
npm install -g @playwright/cli@latest
playwright-cli --help
```

## playwright-cli のインストール（ローカル依存）

```sh
npm install -D @playwright/cli@latest
npx playwright cli --help
```

## スキルのインストール

```sh
playwright-cli install --skills

# ホームディレクトリへ全プロジェクト共通でインストール
playwright-cli install --skills -g
```

`-g` は `~/.claude/skills`（`--skills=agents` では `~/.agents/skills`）へインストールする。

## ブラウザの起動と基本操作

```sh
playwright-cli open https://demo.playwright.dev/todomvc/ --headed
playwright-cli type "Buy groceries"
playwright-cli press Enter
playwright-cli snapshot
playwright-cli screenshot
```

各コマンドの後に現在のページ状態のスナップショットが出力される。要素は `snapshot` で得た ref（例: `e15`）で指定する。

## WebMCP ツールの一覧と呼び出し

```sh
playwright-cli webmcp-list
playwright-cli webmcp-call search_catalog --params '{"query":"cats"}'
```

ページが実験的な WebMCP API 経由で登録したツールを一覧・呼び出す。ツール名・説明・スキーマ・結果はページが提供するため信頼できない入力として扱う。

## セッション管理

```sh
# 名前付きセッションで複数のブラウザを起動
playwright-cli open https://playwright.dev
playwright-cli -s=example open https://example.com --persistent

# セッション一覧
playwright-cli list

# 全ブラウザを閉じる
playwright-cli close-all

# 全ブラウザプロセスを強制終了
playwright-cli kill-all

# エージェントが使うセッションを環境変数で指定
PLAYWRIGHT_CLI_SESSION=todo-app claude .
```

> **警告**: `playwright-cli -s=<name> delete-data` は名前付きセッションのユーザーデータを削除する。`kill-all` はブラウザプロセスを強制終了する。

セッションの状態確認用ダッシュボードは `playwright-cli show`。既存ブラウザのタブへ接続するには `playwright-cli attach --extension`（Playwright Extension が必要）。

## Playwright MCP サーバーの追加（Claude Code）

```sh
claude mcp add playwright npx @playwright/mcp@latest
```

## Playwright MCP サーバーの追加（VS Code）

```sh
code --add-mcp '{"name":"playwright","command":"npx","args":["@playwright/mcp@latest"]}'
```

## 設定ファイルを指定した MCP サーバーの起動

```sh
npx @playwright/mcp@latest --config path/to/config.json
```

設定ファイルのスキーマは Playwright MCP リポジトリの `config.d.ts` を参照（出典は末尾 `## Notes` の getting-started-mcp の Source 行）。

## スタンドアロン MCP サーバー（HTTP）

```sh
npx @playwright/mcp@latest --port 8931
```

ディスプレイの無い環境や IDE ワーカープロセスからヘッドモードのブラウザを使う場合に HTTP トランスポートで起動する。クライアント側の接続先は `http://localhost:8931/mcp`。HTTP セッションのハートビートタイムアウトは 5 秒で、延長は環境変数 `PLAYWRIGHT_MCP_PING_TIMEOUT_MS`（ミリ秒、`0` で無効）で指定する。

## WebMCP の無効化

```sh
npx @playwright/mcp@latest --no-webmcp
```

Playwright MCP は v1.64 から WebMCP を既定でサポートし、ページ定義のツールを `webmcp_<tool>` としてエージェントへ提供する。`--no-webmcp` はこれを無効にするオプションで、リリースノート v1.64（出典は末尾 `## Notes` の release-notes の Source 行）にのみ記載されている。

## Notes

- Source: https://playwright.dev/docs/getting-started-cli (microsoft/playwright v1.64.1 `docs/src/getting-started-cli.md`)
- Source: https://playwright.dev/docs/getting-started-mcp (microsoft/playwright v1.64.1 `docs/src/getting-started-mcp.md`)
- Source: https://playwright.dev/docs/release-notes (microsoft/playwright v1.64.1 `docs/src/release-notes-js.md`, v1.64 section, for --no-webmcp)
