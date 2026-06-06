# MCP

Chakra UI MCP サーバー（`@chakra-ui/react-mcp`）の設定コマンド。AI エディタと連携してコンポーネント情報・デザイントークン・マイグレーションガイドを提供する。

## Claude Code への MCP サーバー追加

```sh
claude mcp add chakra-ui -- npx -y @chakra-ui/react-mcp
```

## Chakra UI Pro API キーを含めた Claude Code への追加

```sh
claude mcp add chakra-ui --env CHAKRA_PRO_API_KEY=your_api_key_here -- npx -y @chakra-ui/react-mcp
```

## MCP サーバーの起動確認（Claude Code）

```sh
claude
```

`claude mcp add` 後、新しいセッションを開始すると MCP サーバーが自動的に起動する。

## VS Code 用設定ファイル（.vscode/mcp.json）

```json
{
  "servers": {
    "chakra-ui": {
      "command": "npx",
      "args": ["-y", "@chakra-ui/react-mcp"]
    }
  }
}
```

## Cursor 用設定ファイル（.cursor/mcp.json）

```json
{
  "mcpServers": {
    "chakra-ui": {
      "command": "npx",
      "args": ["-y", "@chakra-ui/react-mcp"]
    }
  }
}
```

## Chakra UI Pro API キー付きの設定（VS Code / Cursor / Windsurf / Zed）

```json
{
  "servers": {
    "chakra-ui": {
      "command": "npx",
      "args": ["-y", "@chakra-ui/react-mcp"],
      "env": {
        "CHAKRA_PRO_API_KEY": "your_api_key_here"
      }
    }
  }
}
```
