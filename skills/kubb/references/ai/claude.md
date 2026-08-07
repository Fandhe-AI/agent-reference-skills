# Claude Code プラグイン

Kubb 公式の Claude Code プラグイン。スラッシュコマンドと Agent を追加し、OpenAPI 仕様からコード生成を行う。コマンドは `kubb` CLI を実行するため、チャットでのビルドとターミナルでのビルドが一致する。

## インストール

```shell
/plugin marketplace add kubb-labs/kubb
/plugin install kubb@kubb
```

コマンドは `npx kubb` を実行するため、Kubb 自体もプロジェクトまたはグローバルにインストールする必要がある:

```shell
npm install -D kubb@beta
```

`SessionStart` フックがセッション開始時に `kubb` コマンドの有無を確認し警告するが、自動インストールは行わない。`kubb init` が選択した `@kubb/plugin-*` パッケージをインストールする。

## コマンド

Kubb CLI のコマンドを `kubb:` 名前空間でミラーする。

| コマンド | 内容 |
|---------|------|
| `/kubb:init [input] [output] [plugins]` | `kubb init` で `kubb.config.ts` を生成しプラグインをインストール |
| `/kubb:generate [input]` | `kubb generate` を実行し変更内容を報告 |
| `/kubb:validate <spec>` | `kubb validate` で OpenAPI/Swagger 仕様を検証 |

典型的な初回実行:

```text
/kubb:validate ./petStore.yaml
/kubb:init ./petStore.yaml ./src/gen plugin-ts,plugin-zod,plugin-react-query
/kubb:generate
```

## Agent

`kubb-expert` Agent が「プロジェクトに Kubb を追加する」作業を最初から最後まで担当する。仕様の検証、プラグインの選定、設定のスキャフォールド、生成の実行を行う。

## 会話による生成

プラグインは Kubb MCP サーバー（`kubb mcp`）も内部で利用する。コマンドを直接入力する代わりに要望を自然言語で伝えると、Claude がサーバーを直接呼び出す。詳細は [mcp.md](./mcp.md) を参照。

## Notes

- Kubb v5 以降と組み込み MCP サーバーが必須
- 本ページは Claude Code プラグイン（スラッシュコマンド・Agent）の説明。Claude Desktop から MCP サーバーへ接続する手順は [mcp.md](./mcp.md) を参照
- OpenAPI 仕様から MCP サーバー自体を**生成する**プラグインは別物（[plugin-mcp.md](../plugins/plugin-mcp.md)）

## Related

- [mcp.md](./mcp.md)
- [plugin-mcp.md](../plugins/plugin-mcp.md)
- [mcp.md (helpers)](../helpers/mcp.md)
