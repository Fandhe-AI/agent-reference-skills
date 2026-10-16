# Claude Code プラグイン

Kubb 公式の Claude Code プラグイン。スラッシュコマンドと Agent を追加し、OpenAPI 仕様からコード生成を行う。コマンドは `kubb` CLI を実行するため、チャットでのビルドとターミナルでのビルドが一致する（Kubb 5.11.0 の docs 5.x ai/claude と `tools/claude/` に準拠）。

## インストール

Kubb のリポジトリは plugin marketplace も兼ねる。

```shell
/plugin marketplace add kubb-labs/kubb
/plugin install kubb@kubb
```

コマンドは `npx kubb` を実行するため、Kubb 自体もプロジェクトまたはグローバルにインストールする必要がある:

```shell
npm install -D kubb
npm install -g kubb
```

`SessionStart` フックがセッション開始時に `kubb` の有無を確認し警告するが、自動インストールは行わない。`kubb init` が選択した `@kubb/plugin-*` パッケージをインストールする。`kubb validate` を使うには `@kubb/adapter-oas` が必要（`tools/claude/README.md`）。公開前にローカルで試すには `claude --plugin-dir ./tools/claude`。

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
/kubb:init ./petStore.yaml ./src/gen plugin-ts,plugin-axios,plugin-zod,plugin-react-query
/kubb:generate
```

## Agent

`kubb-expert` Agent（tools: Read, Edit, Write, Glob, Grep, Bash）が「プロジェクトに Kubb を追加する」作業を最初から最後まで担当する。仕様の検証、プラグインの選定、設定のスキャフォールド、生成の実行を行う。

1. spec と出力先を見つけ、`kubb validate <spec>` で検証する
2. `@kubb/plugin-ts` を基盤に、データ取得用に `plugin-axios` / `plugin-fetch`、フレームワーク用 hooks、実行時検証に `plugin-zod`、テストに `plugin-faker` と `plugin-msw` を選ぶ。各プラグインの `kubb-extension.json`（`dependencies` / `optionalDependencies` / `role`）を確認する。`pluginOas` は無い（OpenAPI adapter は自動適用）
3. `kubb init --input <spec> --output <dir> --plugins <list>` でスキャフォールド。既存 config があれば手で編集する
4. `kubb generate` を実行し、出力を型チェックする

ガードレール: 生成物は毎回上書きされるため手で編集せず、spec か config を直して再生成する。診断には `kubb generate --verbose`。

## Skills

必要に応じて自動で読み込まれる 2 つの Skill（直接呼び出さない）。

| Skill | 読み込まれるとき |
|-------|----------------|
| `config` | `kubb.config.ts` の作成、`@kubb/plugin-*` の選定、生成物のデバッグ |
| `output` | 生成された型・クライアント・hooks・スキーマ・モックを import するアプリ／テストコードを書くとき |

## 会話による生成

プラグインは Kubb MCP サーバー（`kubb mcp`）も登録する。コマンドを直接入力する代わりに要望を自然言語で伝えると、Claude がサーバーの `validate` / `generate` ツールか対応する `/kubb:` コマンドを呼び、どちらも同じファイルを生成する。サーバーが `kubb.config.ts` を見つけられるよう、プロジェクトルートから Claude Code を起動する。詳細は [mcp.md](./mcp.md) を参照。

## Notes

- Kubb v5 以降と組み込み MCP サーバーが必須
- 旧版ページの `npm install -D kubb@beta` は不要（安定版 5.x は `kubb`）
- 本ページは Claude Code プラグイン（スラッシュコマンド・Agent）の説明。Claude Desktop から MCP サーバーへ接続する手順は [claude-desktop.md](./claude-desktop.md) / [mcp.md](./mcp.md) を参照
- OpenAPI 仕様から MCP サーバー自体を**生成する**プラグインは別物（[plugin-mcp.md](../plugins/plugin-mcp.md)）

## Related

- [mcp.md](./mcp.md)
- [plugin-mcp.md](../plugins/plugin-mcp.md)
- [mcp.md (helpers)](../helpers/mcp.md)
