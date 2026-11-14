# kubb（CLI）

OpenAPI 仕様からコードを生成する Kubb の CLI ツール（Kubb 5.20.0 / docs 5.x reference/commands と `packages/cli/README.md`）。CLI のパッケージ名は `kubb`（v4 の `@kubb/cli` は不要）。`kubb` パッケージに CLI・コアランタイム・OpenAPI adapter・TypeScript/TSX/Markdown パーサーが同梱される。

## インストール

```bash
npm install --save-dev kubb
pnpm add -D kubb
bun add -d kubb
yarn add -D kubb
```

`npx kubb init` で直接ウィザードを起動することもできる。各コマンドの詳細は commands カテゴリ（[init](../commands/init.md) / [generate](../commands/generate.md) / [validate](../commands/validate.md) / [mcp](../commands/mcp.md) / [studio](../commands/studio.md) / [add](../commands/add.md) / [update](../commands/update.md) / [list](../commands/list.md) / [remove](../commands/remove.md)）を参照。

## コマンド一覧（v5）

```text
USAGE:
  kubb [COMMANDS] <OPTIONS> [<input>]
```

| コマンド | 説明 |
|---------|------|
| `kubb init` | 設定の作成・プラグインのインストール・最初の生成まで行う対話ウィザード。`--input` / `--output` / `--plugins` でプロンプトをスキップ |
| `kubb generate`（または `kubb`） | `kubb.config.ts` に基づきコード生成パイプラインを実行。コマンドなしで `kubb` を実行すると `kubb generate` が走る |
| `kubb validate` | 生成せず、設定済みアダプターで spec を検証 |
| `kubb mcp` | AI アシスタント向けの MCP サーバーを起動 |
| `kubb studio` | プロジェクトを Kubb Studio に接続、またはペアリングとスナップショットを管理 |
| `kubb add` | Kubb レジストリから plugin / adapter / parser をレビュー済みバージョンでインストール。plugin / parser は `kubb.config.ts` に追加、adapter は追加すべきコードを表示 |
| `kubb update` | インストール済み拡張をレジストリが pin するバージョンへ更新し、再生成してファイル変更を要約。id を渡すとその拡張のみ、`--dry-run` でインストールせず更新を一覧 |
| `kubb list` | インストール済み拡張の registry id・パッケージ・インストール済みバージョン・レジストリの pin 版・更新有無を一覧 |
| `kubb remove` | plugin / parser を `kubb.config.ts` から削除し、そのパッケージをアンインストール |

各コマンドは `--help` で詳細を表示する（`kubb --help`、`kubb add --help` など）。

### `kubb init`

```bash
npx kubb init
```

| オプション | デフォルト | 説明 |
|-----------|----------|------|
| `-y, --yes` | `false` | 全プロンプトをスキップしデフォルト値を使用 |
| `-i, --input <path>` | `./openapi.yaml` | OpenAPI 仕様のパス |
| `-o, --output <path>` | `./src/gen` | 生成先ディレクトリ |
| `--plugins <list>` | — | インストールするプラグインのカンマ区切りリスト。指定可能: `plugin-ts`, `plugin-axios`, `plugin-fetch`, `plugin-react-query`, `plugin-vue-query`, `plugin-zod`, `plugin-faker`, `plugin-msw`, `plugin-cypress`, `plugin-mcp`, `plugin-redoc` |

### `kubb generate`

```bash
kubb generate [OPTIONS] [input]
npx kubb generate ./openapi.yaml
```

| オプション | デフォルト | 説明 |
|-----------|----------|------|
| `[input]` | — | OpenAPI ファイルパス・URL・git 入力（`git+<repo>#<ref>:<path>`）。config の `input` を上書き |
| `-c, --config <path>` | — | 設定ファイルのパス |
| `-l, --log-level <level>` | `info` | `silent` / `info` / `verbose` |
| `-w, --watch` | `false` | ローカルの入力ファイル変更時に再生成（URL / git 入力は 1 回のみ） |
| `-v, --verbose` | `false` | ログレベルを `verbose` に上書き |
| `-s, --silent` | `false` | ログレベルを `silent` に上書き |
| `--reporter <names>` | `cli` | 実行をレンダリングするレポーターをカンマ区切りで指定（`cli` / `json` / `file` / `html`）。`config.reporters` を上書き |

### `kubb validate`

```bash
kubb validate <input>
```

`<input>`（必須）は検証対象 spec のパス・URL・git 入力（`git+<repo>#<ref>:<path>`）。config のアダプターで検証し（config が無ければ `@kubb/adapter-oas`）、`--config` / `-c` で config を指定できる。検証に失敗すると非ゼロの終了ステータスを返すため CI に組み込める。

### `kubb mcp`

stdio の MCP サーバーを起動する。`generate` / `validate` / `init` の 3 ツールを提供する。サーバーはクライアントが起動したフォルダーの `kubb.config.*` を探す。

```bash
npx kubb mcp
```

Claude Code では次のコマンドで登録する。

```bash
claude mcp add kubb -- npx kubb mcp
```

その他のクライアントの設定:

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

### `kubb studio`

プロジェクトを Kubb Studio に接続してブラウザーから生成する。`[action]` は `connect`（既定）/ `start` / `stop` / `login` / `logout` / `status` / `permissions` / `snapshot`。接続は既定で read-only で、初回接続時に権限を 1 つのリストで確認する（`--allow-write` / `--allow-config-edit` / `--allow-install` / `--allow-update` / `--allow-remove` / `--allow-save-input` / `--allow-exec` などで質問を省略、`--url` で Studio の URL、`--no-open` で承認ページを開かない）。詳細は [studio](../commands/studio.md)。

## 環境変数

| 変数 | 型 | 使用コマンド | 説明 |
|------|-----|-------------|------|
| `KUBB_DISABLE_TELEMETRY` | `boolean` | all | 匿名使用テレメトリを無効化（`1` または `true`） |
| `DO_NOT_TRACK` | `boolean` | all | 標準的なオプトアウト慣習（`1` または `true`） |
| `KUBB_DEBUG` | `boolean` | all | ソースマップを有効にしスタックトレースを元のソースに対応させる（`1` または `true`）。起動が遅くなるため既定は無効 |
| `KUBB_HOME` | `string` | `generate`, `studio` | CLI が Studio の状態と更新チェックを保存するディレクトリ。既定 `~/.kubb` |
| `KUBB_TOKEN` | `string` | `studio snapshot` | 組織の CI API キー。`--token` と同じ |
| `KUBB_REGISTRY` | `string` | `init`, `add`, `update`, `list`, `remove` | 拡張レジストリのベース URL。既定 `https://kubb.dev/registry` |

## Notes

- v5 でコマンドは 9 つ（init / generate / validate / mcp / studio / add / update / list / remove）。旧 `kubb start`（SSE ストリーミングサーバー）と `kubb agent` は現行のコマンド一覧に無い
- `kubb generate --debug` は v5 で削除され `--reporter file` に置き換わった（migration-guide.md）
- テレメトリは `generate` / `validate` / `mcp` 実行後に送信される（詳細は [telemetry.md](../getting-started/telemetry.md)）
- Migration (5.11 → 5.20): `kubb remove` was added in 5.13.1 (@kubb/cli, #4431); `kubb update --check` was replaced by `--dry-run` (5.11.5, #4355); `kubb generate --watch` follows a local input file only and `git+<repo>#<ref>:<path>` inputs were added (5.12.0, #4375).
- Source: https://kubb.dev/docs/5.x/reference/commands/ （kubb@5.20.0 の docs/5.x/reference/commands/index.md、取得日 2026-11-14）
- `packages/cli/README.md` のパッケージ見出しは `@kubb/cli` だが、docs 5.x のインストール手順は `kubb` を使う

## Related

- [mcp.md](./mcp.md)
- [telemetry.md](../getting-started/telemetry.md)
- [installation.md](../getting-started/installation.md)
