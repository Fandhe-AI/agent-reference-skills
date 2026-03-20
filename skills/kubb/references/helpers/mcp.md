# @kubb/mcp

Kubb のコード生成機能を AI アシスタント（Claude、Cursor 等）に公開する MCP（Model Context Protocol）サーバー。

## インストール

```bash
npm install --save-dev @kubb/mcp @kubb/cli
```

両パッケージが必要。インストールせずに直接実行も可能:

```bash
npx @kubb/mcp
```

## クイックスタート

### 1. サーバーの起動

```bash
npx kubb mcp
```

stdio 経由で通信する MCP サーバーが起動し、クライアントリクエストを待機する。

### 2. Claude Desktop の設定

設定ファイルに MCP サーバーを追加:

**ファイルの場所**:
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`
- Linux: `~/.config/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "kubb": {
      "command": "npx",
      "args": ["kubb", "mcp"]
    }
  }
}
```

### 3. 設定ファイルの作成

プロジェクトに `kubb.config.ts` が存在し、プラグインと入出力パスが定義されていることを確認する。

### 4. AI との対話

AI アシスタントに自然言語でコード生成をリクエストする。

## 利用可能なツール

### `generate` ツール

OpenAPI/Swagger 仕様からコードを生成する。

**パラメータ**:

| パラメータ | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `config` | `string` | `kubb.config.ts` | 設定ファイルのパス |
| `input` | `string` | — | OpenAPI 仕様ファイルのパス（設定を上書き） |
| `output` | `string` | — | 出力ディレクトリ（設定を上書き） |
| `logLevel` | `enum` | `info` | `silent` \| `error` \| `warn` \| `info` \| `verbose` \| `debug` |

## ユースケース

- **初回コード生成**: 新規プロジェクトで OpenAPI 仕様から TypeScript 型を生成
- **仕様更新時の再生成**: API 仕様変更後にクライアントコードを再生成
- **トラブルシューティング**: verbose ログで生成問題を診断

## トラブルシューティング

| 問題 | 解決策 |
|------|--------|
| コマンドが見つからない | `@kubb/cli` をインストール: `npm install --save-dev @kubb/cli` |
| AI が接続できない | 設定ファイルの場所を確認、Claude Desktop を再起動、サーバーがエラーなく起動することを確認 |
| 生成が失敗する | `kubb.config.ts` の妥当性を確認、OpenAPI 仕様のパスを確認、`logLevel: debug` を使用 |
| 進捗が表示されない | MCP クライアントのバッファリングに依存、生成はバックグラウンドで継続 |
