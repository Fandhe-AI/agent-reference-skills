---
source: https://ui.shadcn.com/docs/mcp
---

# MCP

shadcn MCP サーバーを各 MCP クライアントへ設定するコマンド集。出典は公式 mcp ページ（取得日 2026-10-16）。

## Claude Code への設定

```sh
npx shadcn@latest mcp init --client claude
```

実行後に Claude Code を再起動する。Claude Code 内の `/mcp` コマンドでデバッグできる。

## Cursor への設定

```sh
npx shadcn@latest mcp init --client cursor
```

実行後に Cursor Settings で shadcn の MCP サーバーを有効化する。

## VS Code への設定

```sh
npx shadcn@latest mcp init --client vscode
```

実行後に `.vscode/mcp.json` を開き、shadcn サーバーの **Start** を押す。

## Codex への設定

```sh
npx shadcn@latest mcp init --client codex
```

`shadcn` CLI は `~/.codex/config.toml` を自動更新できない。公式の手順に従い、次の設定を手動で追加して Codex を再起動する。

```toml
[mcp_servers.shadcn]
command = "npx"
args = ["shadcn@latest", "mcp"]
```

## OpenCode への設定

```sh
npx shadcn@latest mcp init --client opencode
```

実行後に OpenCode を再起動する。

## MCP サーバー起動コマンド（手動設定用）

```sh
npx shadcn@latest mcp
```

各クライアントの設定ファイルでは `command` を `npx`、`args` を `["shadcn@latest", "mcp"]` とする（`.mcp.json` / `.cursor/mcp.json` / `.vscode/mcp.json` の例は公式 mcp ページ記載）。

## 「No tools or prompts」の対処

```sh
npx clear-npx-cache
```

その後、MCP クライアントで shadcn サーバーを再度有効化する。
