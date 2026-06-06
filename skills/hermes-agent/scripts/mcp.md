# MCP

MCP（Model Context Protocol）サーバーの設定・接続・管理。

## MCP サーバーとして Hermes を起動

```bash
hermes mcp serve
hermes mcp serve -v
```

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

## 代替エントリポイント（ACP サーバー）

```bash
hermes acp
hermes-acp
python -m acp_adapter
```
