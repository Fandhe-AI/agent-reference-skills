# MCP

MCP（Model Context Protocol）サーバーの設定・接続・管理。

## MCP サポートの追加（初回のみ）

```bash
cd ~/.hermes/hermes-agent && python -c "import pm; pm.sync_venv(['mcp'], explicit=True)"
```

## MCP サーバーとして Hermes を起動（mcp-serve プラグイン）

```bash
hermes plugins install mcp-serve
hermes mcp-serve
```

v0.23 で `hermes mcp serve` はコアから公式 `mcp-serve` プラグインへ移動した（`hermes mcp serve` は新しい綴りとインストール手順を表示する）。MCP クライアント側設定の `"args": ["mcp", "serve"]` は `["mcp-serve"]` に変える。`-v` 等のオプションはプラグインの README を参照する（v0.23.1 のドキュメントには記載がない）。

## MCP サーバーの登録（stdio）

```bash
hermes mcp add <name> --command <cmd> --args <args>
```

## MCP サーバーの登録（HTTP）

```bash
hermes mcp add <name> --url <url>
```

## MCP サーバーの登録（OAuth 認証）

```bash
hermes mcp add <name> --url <url> --auth oauth
```

## 登録済み MCP サーバーの一覧

```bash
hermes mcp list
hermes mcp ls
```

## MCP サーバーの接続テスト

```bash
hermes mcp test <name>
```

## MCP サーバーのツール選択設定

```bash
hermes mcp configure <name>
hermes mcp config <name>
```

## MCP サーバーの削除

```bash
hermes mcp remove <name>
hermes mcp rm <name>
```

## セッション中に MCP サーバーをリロード（スラッシュコマンド）

```
/reload-mcp
```

## ローカルプロジェクト向け MCP 設定例

```yaml
# ~/.hermes/config.yaml
mcp_servers:
  project_fs:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-filesystem", "/home/user/my-project"]
  git:
    command: "uvx"
    args: ["mcp-server-git", "--repository", "/home/user/project"]
```

## GitHub MCP サーバーの設定例（ホワイトリスト）

```yaml
mcp_servers:
  github:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-github"]
    env:
      GITHUB_PERSONAL_ACCESS_TOKEN: "ghp_..."
    tools:
      include: [list_issues, create_issue, search_code]
```

トークンは実値を設定ファイルへ直書きせず、環境変数や secret 管理経由で渡す。

## ACP サポートの追加（初回のみ）

```bash
cd ~/.hermes/hermes-agent && python -c "import pm; pm.sync_venv(['acp'], explicit=True)"
```

標準の `[all]` に含まれるため、通常は不要。

## 代替エントリポイント（ACP サーバー）

```bash
hermes acp
hermes-acp
python -m acp_adapter
```

## 注記

v0.23 の変更: `hermes mcp serve` は `mcp-serve` プラグインへ移動。`hermes mcp` の残りのサブコマンド（`add` / `list` / `test` / `configure` / `remove` 等）は変更なし。`hermes acp` は gateway デーモンのビューアになり、`config.yaml` の MCP サーバーを自分では起動しない（`HERMES_ACP_SKIP_CONFIGURED_MCP` は廃止）。サーバーエントリには `events` / `tool_costs` / `spend_limit` / `cost_unit` が追加された（`reference/mcp-config-reference` 参照）。

- Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/mcp (pinned to v0.23.1)
- Source: https://hermes-agent.nousresearch.com/docs/reference/cli-commands (pinned to v0.23.1)
