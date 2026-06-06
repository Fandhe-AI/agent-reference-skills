# MCP Server

Figma MCP サーバー（リモート・デスクトップ）の各 MCP クライアントへの設定コマンド。

## リモートサーバー（推奨）

サーバー URL: `https://mcp.figma.com/mcp`（HTTP/SSE トランスポート）

### Claude Code: プラグインインストール（推奨）

```sh
claude plugin install figma@claude-plugins-official
```

インストール後、`/mcp` コマンドで Figma OAuth 認証を行う。

### Claude Code: 手動追加

```sh
claude mcp add --transport http figma https://mcp.figma.com/mcp
```

```sh
# 全プロジェクトで利用可能にする（ユーザースコープ）
claude mcp add --transport http --scope user figma https://mcp.figma.com/mcp
```

### Cursor: チャットで追加（推奨）

Cursor のエージェントチャットで以下を入力する:

```
/add-plugin figma
```

### VS Code: 設定ファイル（mcp.json）

Command Palette（`⌘ Shift P`）から MCP 設定（ユーザーまたはワークスペース）を開き、以下の JSON を貼り付けて Start をクリックしてから認証する。

```json
{
  "servers": {
    "figma": {
      "url": "https://mcp.figma.com/mcp",
      "type": "http"
    }
  }
}
```

### Codex: CLI で追加

```sh
codex mcp add figma --url https://mcp.figma.com/mcp
```

---

## デスクトップサーバー

サーバー URL: `http://127.0.0.1:3845/mcp`（HTTP トランスポート、ローカルのみ）

事前に Figma デスクトップアプリを起動し、Design ファイルで Dev Mode（`Shift+D`）を開いて **Enable desktop MCP server** を有効にしておく。

### Claude Code: 手動追加

```sh
claude mcp add --transport http figma-desktop http://127.0.0.1:3845/mcp
```

### 汎用 JSON 設定（任意の MCP クライアント）

```json
{
  "mcpServers": {
    "figma-desktop": {
      "url": "http://127.0.0.1:3845/mcp"
    }
  }
}
```

デスクトップサーバーはリモート専用ツール（`create_new_file`・`generate_diagram`・`upload_assets` 等）をサポートしない。Figma デスクトップアプリが起動・接続されている間のみ利用可能。
