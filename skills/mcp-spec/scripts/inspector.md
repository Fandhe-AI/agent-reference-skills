---
source: https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector
---

# Inspector

MCP Inspector を `npx` で起動して MCP サーバーを対話的にテスト・デバッグするコマンド。

## 基本形

```bash
npx @modelcontextprotocol/inspector <command>
```

```bash
npx @modelcontextprotocol/inspector <command> <arg1> <arg2>
```

インストール不要で `npx` から直接実行できる。

## npm パッケージのサーバーを検査

```bash
npx -y @modelcontextprotocol/inspector npx <package-name> <args>
# For example
npx -y @modelcontextprotocol/inspector npx @modelcontextprotocol/server-filesystem /Users/username/Desktop
```

## PyPI パッケージのサーバーを検査

```bash
npx @modelcontextprotocol/inspector uvx <package-name> <args>
# For example
npx @modelcontextprotocol/inspector uvx mcp-server-git --repository ~/code/mcp/servers.git
```

## ローカル開発中の TypeScript サーバーを検査

```bash
npx @modelcontextprotocol/inspector node path/to/server/index.js args...
```

## ローカル開発中の Python サーバーを検査

```bash
npx @modelcontextprotocol/inspector \
  uv \
  --directory path/to/server \
  run \
  package-name \
  args...
```

## Notes

- Source: tag `2026-07-28` raw（`docs/docs/2026-07-28/tools/inspector.mdx`）、取得日 2026-10-16。
- 検査対象サーバーの README に記載された手順が最も正確（原文）。
- タグ後に追加された Inspector の CLI / TUI / mcpdo 等のサブページは本タグに存在しないため未収録。
- `npx` は npm レジストリからパッケージを取得して実行する。信頼できないパッケージ名を渡さない。
