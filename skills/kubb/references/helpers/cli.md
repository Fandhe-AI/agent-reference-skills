# kubb（CLI）

OpenAPI 仕様からコードを生成する Kubb の CLI ツール。v5 で CLI パッケージ名が `@kubb/cli` から `kubb` に変わった（2026-08 時点 `kubb@beta` として配布）。

## インストール

```bash
npm install --save-dev kubb@beta
pnpm add -D kubb@beta
bun add -d kubb@beta
yarn add -D kubb@beta
```

`npx kubb@beta init` で直接ウィザードを起動することもできる。

## コマンド一覧（v5）

v5 では CLI コマンドが `init` / `generate` / `validate` / `mcp` の4つに整理された。`kubb start`（SSE ストリーミングサーバー）と `kubb agent`（Kubb Studio 連携）は公式ドキュメントの現行コマンド一覧に記載がない（v5 で削除されたと判断）。

### `kubb init`

新規プロジェクトのインタラクティブセットアップウィザード。

```bash
npx kubb init
```

**オプション**:

| オプション | デフォルト | 説明 |
|-----------|----------|------|
| `-y, --yes` | `false` | 全プロンプトをスキップしデフォルト値を使用 |
| `-i, --input` | — | OpenAPI 仕様のパス（ローカルファイル/URL）。spec パス入力プロンプトをバイパス |
| `-o, --output` | — | 生成先ディレクトリ。出力ディレクトリ入力プロンプトをバイパス |
| `--plugins` | — | インストールするプラグインのカンマ区切りリスト。プラグイン選択プロンプトをバイパス。指定可能な値: `plugin-ts`, `plugin-axios`, `plugin-fetch`, `plugin-react-query`, `plugin-vue-query`, `plugin-zod`, `plugin-faker`, `plugin-msw`, `plugin-cypress`, `plugin-mcp`, `plugin-redoc` |

### `kubb generate`（または `kubb`）

`kubb.config.ts` に基づいてコード生成パイプラインを実行する。引数なしで `kubb` を実行した場合のデフォルトコマンド。

```bash
kubb generate [OPTIONS]
kubb petStore.yaml
```

**引数**:

| 引数 | 説明 |
|------|------|
| `[input]` | Swagger/OpenAPI ドキュメントへのパスまたは URL（任意）。設定の `input` を上書きする |

**オプション**:

| オプション | デフォルト | 説明 |
|-----------|----------|------|
| `-c, --config <path>` | — | 設定ファイルのパス（例: `./kubb.staging.ts`） |
| `-l, --logLevel <silent\|info\|verbose>` | `info` | ログの詳細度。プラグインのタイミングを見るには `verbose` |
| `-s, --silent` | `false` | `logLevel` を `silent` に強制し出力を抑制 |
| `--verbose` | `false` | `logLevel` を `verbose` に強制し遅いプラグインを表示 |
| `--reporter <cli\|json\|file>` | `cli` | 実行するレポーターをカンマ区切りで指定 |
| `-w, --watch` | `false` | 入力仕様の変更を監視し都度パイプラインを再実行 |

### `kubb validate`

パイプラインを実行せずに Swagger/OpenAPI ドキュメントが有効かをチェックする。

```bash
kubb validate <input>
```

**引数**:

| 引数 | 必須 | 説明 |
|------|------|------|
| `<input>` | 必須 | 検証対象の Swagger/OpenAPI ドキュメントへのパスまたは URL |

検証に失敗すると非ゼロの終了ステータスを返すため CI に組み込める。

### `kubb mcp`

AI アシスタント用の MCP（Model Context Protocol）サーバーを起動する。開発中の機能につき、破壊的変更が発生しうる。

```bash
kubb mcp
```

提供されるツール:

| ツール | 説明 |
|--------|------|
| `generate` | 解決済み `kubb.config.ts` に対して Kubb パイプラインを実行し、ログをクライアントへストリーミング |
| `validate` | パスまたは URL の OpenAPI/Swagger ドキュメントを検証（`@kubb/adapter-oas` が必要） |
| `init` | プロンプトなしでカレントディレクトリに `kubb.config.ts` を生成（パッケージのインストールは行わない） |

Claude Desktop、Cursor、VS Code 等の MCP 対応クライアントから登録できる:

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

## テレメトリ

CLI はデフォルトで匿名使用統計を収集する（`generate` / `validate` / `mcp` コマンド実行後）。OpenAPI 仕様の内容、ファイルパス、シークレット・API キー・トークン、生成コード、IP アドレスやユーザー識別子は収集されない。データは OpenTelemetry OTLP 形式で `https://otlp.kubb.dev/v1/traces` に送信される（5秒でタイムアウトし、失敗時は無視）。

**無効化**:
```bash
DO_NOT_TRACK=1 kubb generate           # 標準的な無効化（推奨）
KUBB_DISABLE_TELEMETRY=1 kubb generate # Kubb 固有の無効化
```
