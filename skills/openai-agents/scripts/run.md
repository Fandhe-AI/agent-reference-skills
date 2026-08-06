# Run

サンプルエージェントの実行、および MCP サーバー起動コマンド。

## Python エージェントスクリプトの実行

```sh
python file.py
```

Quickstart のサンプルコードをファイルに保存した後、通常の Python スクリプトとして実行する。

## TypeScript/JavaScript エージェントスクリプトの実行

```sh
node index.js
```

Quickstart のサンプルコードを `index.js` に保存した後、Node.js スクリプトとして実行する（公式ガイドは "Place this into your `index.js` file and run it" とのみ記載しており、実行コマンド自体は通常の Node.js 実行方法に従う）。

## ローカル filesystem MCP サーバーの起動

```sh
npx -y @modelcontextprotocol/server-filesystem fixtures/sample_files
```

Agents SDK から MCP (Model Context Protocol) 経由でツールを統合するためのローカルサーバーを起動する。`fixtures/sample_files` は公開対象ディレクトリのパスに置き換える。
