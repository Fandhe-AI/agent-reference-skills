# MCP Server

Figma MCP サーバー（リモート・デスクトップ）の各 MCP クライアントへの設定コマンド。

## リモートサーバー（推奨）

サーバー URL: `https://mcp.figma.com/mcp`（HTTP/SSE トランスポート）

出典: remote-server-installation（`developers.figma.com/docs/figma-mcp-server/remote-server-installation/`）。

### Claude Code: プラグインインストール（推奨）

```sh
claude plugin install figma@claude-plugins-official
```

インストール後、Claude Code を再起動し、`/plugin` の Installed タブで `figma` を選んで Figma OAuth 認証を行う。

> **注記**: コマンドが失敗する場合、組織がプラグインのインストールをブロックしている可能性がある。管理者に確認するか、次の手動追加に切り替える。

### Claude Code: 手動追加

```sh
claude mcp add --transport http figma https://mcp.figma.com/mcp
```

```sh
# 全プロジェクトで利用可能にする（ユーザースコープ）
claude mcp add --scope user --transport http figma https://mcp.figma.com/mcp
```

手動追加では Figma の skills はインストールされない。新しいセッションで `/mcp` から figma を選び Authenticate する。

### Cursor: チャットで追加（推奨）

Cursor のエージェントチャットで以下を入力する:

```
/add-plugin figma
```

### VS Code: 設定ファイル（mcp.json）

Command Palette（`⌘ Shift P`）から `MCP: Open User Configuration` または `MCP: Open Workspace Folder Configuration` を開き、以下の JSON を貼り付けて Start をクリックしてから認証する。

```json
{
  "inputs": [],
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

Codex アプリでは Plugins から Figma をインストールするのが推奨。CLI 追加では Figma の skills は入らない。

### Xcode

Xcode 27 beta が必要。Xcode はリモートサーバーのみ対応。Figma plugin を Xcode に追加する手順:

1. Xcode の Settings → Intelligence を開く
2. エージェント（Claude Agent / Codex / Gemini など）が未導入なら導入する
3. Plug-ins → Add plug-in → Add from URL を選ぶ
4. URL に次を入力する

```
https://github.com/figma/mcp-server-guide
```

5. Figma Plug-in を選び、Sign in… から Figma アカウントへのアクセスを許可する

「One-click setup」でも同じ plugin を追加できる。

---

## デスクトップサーバー

> 公式ページは `developers.figma.com/docs/figma-mcp-server/local-server-installation/`（Set up the desktop server）に変更されている。公式はリモートサーバーを強く推奨している。

サーバー URL: `http://127.0.0.1:3845/mcp`（HTTP トランスポート、ローカルのみ）

事前に Figma デスクトップアプリを起動し、Design ファイルで Dev Mode（`Shift+D`）を開いて **Enable desktop MCP server** を有効にしておく。Dev または Full シートが必要。

### Claude Code: 手動追加

```sh
claude mcp add --transport http figma-desktop http://127.0.0.1:3845/mcp
```

追加後に Claude Code を再起動し、`/mcp` でサーバーが一覧にあることを確認する。

### Claude Code: 管理コマンド

```sh
# 全サーバーを一覧
claude mcp list

# Figma サーバーの詳細を表示
claude mcp get figma-desktop
```

> **警告**: 次のコマンドは Claude Code の MCP 設定から `figma-desktop` を削除する。

```sh
claude mcp remove figma-desktop
```

### Codex: Streamable HTTP で追加

Codex の GUI から追加する（CLI コマンドは公式に記載なし）:

1. Settings → Settings → MCP servers → Add server
2. サーバータイプを STDIO から Streamable HTTP に変更
3. Name に `figma-desktop`、URL に `http://127.0.0.1:3845/mcp` を入力して Save

Figma デスクトップアプリが起動しデスクトップサーバーが有効な間のみ利用できる。

### VS Code: サーバー追加と確認

1. Command Palette で `MCP: Add Server` を実行し HTTP を選ぶ
2. URL に `http://127.0.0.1:3845/mcp`、サーバー ID に `figma-desktop` を入力する
3. 保存先（全プロジェクト / 現在のワークスペース）を選ぶ
4. チャットを Agent モードにして、次を入力しツールが表示されることを確認する

```
#get_design_context
```

ツールが表示されない場合は Figma デスクトップアプリと VS Code を再起動する。

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

デスクトップサーバーはキャンバスへの書き込みや UI の Figma への送信をサポートしない（リモート専用ツール `create_new_file`・`generate_diagram`・`upload_assets` 等は利用不可）。Figma デスクトップアプリが起動・接続されている間のみ利用可能。

### Figma for Government

Figma for Government はデスクトップサーバーのみ対応。手順は標準の Figma デスクトップアプリの代わりに Figma for Government デスクトップアプリを使う以外、上記と同じ。リモートサーバー、`use_figma` によるキャンバス書き込み、`generate_figma_design`、Code Connect UI（CLI は可）、agent skills は利用できない。
