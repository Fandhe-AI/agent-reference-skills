# cli

Kubb CLI の全コマンドとオプション一覧（kubb 5.11.0 基準）。

## バージョン確認

```sh
kubb --version
```

## ヘルプ表示

```sh
kubb --help
kubb add --help
```

引数なしの `kubb` は `kubb generate` と同じ動作。

## `kubb init`: プロジェクトの初期化

```sh
npx kubb init
```

インタラクティブウィザードで OpenAPI 仕様のパス・出力ディレクトリ・プラグインを選び、`kubb.config.ts` を生成する。

```sh
npx kubb init --yes
npx kubb init --input ./openapi.yaml --output ./src/gen --plugins plugin-ts,plugin-zod
```

| オプション | 短縮形 | デフォルト | 説明 |
| --- | --- | --- | --- |
| `--yes` | `-y` | `false` | 全プロンプトをスキップして既定値を使う |
| `--input` | `-i` | — | OpenAPI 仕様のパス（ローカルまたは URL） |
| `--output` | `-o` | — | 生成ファイルの出力ディレクトリ |
| `--plugins` | — | — | 追加するプラグインの registry id（カンマ区切り。例: `plugin-ts,plugin-zod`） |
| `--dry-run` | — | `false` | パッケージのインストールと `kubb.config.ts` の書き込みなしでプレビュー |

## `kubb generate`: コード生成

```sh
kubb generate
kubb generate ./petStore.yaml
```

`[input]` に OpenAPI ファイルのパスまたは URL を渡すと config の `input` を上書きする。詳細は `generate.md` を参照。

## `kubb validate`: OpenAPI ファイルの検証

```sh
kubb validate ./petStore.yaml
```

`<input>`（必須）にパスまたは URL を渡す。仕様が不正な場合は非ゼロ終了コードを返す。

## `kubb add`: レジストリからの拡張追加

```sh
kubb add
kubb add plugin-zod
kubb add acme/plugin-graphql --yes
kubb add plugin-zod --no-install
```

Kubb registry の plugin / adapter / parser を pin されたバージョンで dev dependency としてインストールする。plugin は `kubb.config.ts` の `plugins` 配列にも追記する。id なしの場合は選択プロンプトが開く。

| オプション | 短縮形 | デフォルト | 説明 |
| --- | --- | --- | --- |
| `--config=<path>` | `-c` | — | 編集する Kubb config のパス（plugin のみ） |
| `--yes` | `-y` | `false` | 確認をスキップ（id が必要）。スクリプト・CI 向け |
| `--no-install` | — | — | パッケージをインストールしない（plugin の config 追記は行う） |

環境変数 `KUBB_REGISTRY` で registry の Base URL を変更できる（既定 `https://kubb.dev/registry`）。

## `kubb update`: 拡張の更新

```sh
kubb update
kubb update --check
kubb update plugin-zod plugin-ts --yes
```

インストール済み拡張を registry が pin するバージョンに更新する。`kubb.config.ts` は変更しない。

| オプション | 短縮形 | デフォルト | 説明 |
| --- | --- | --- | --- |
| `--check` | — | `false` | 更新を一覧するのみでインストールしない |
| `--yes` | `-y` | `false` | 確認なしで全更新をインストール |

## `kubb list`: インストール済み拡張の一覧

```sh
kubb list
```

引数・オプションなし。registry id・パッケージ名・インストール済み版・registry の pin 版・更新有無を表示する。

## `kubb studio`: Kubb Studio への接続

```sh
kubb studio
```

初回はペアリングコードを Studio で承認する。位置引数でアクションを選ぶ（既定 `connect`）。

```sh
kubb studio start
kubb studio status
kubb studio stop
kubb studio login
kubb studio logout
kubb studio snapshot
```

| アクション | 説明 |
| --- | --- |
| `connect` | フォアグラウンドでセッションを開き、要求に応じて生成 |
| `start` | ペアリングと権限を解決し、バックグラウンドで接続 |
| `stop` | バックグラウンド worker を停止（ペアリングは保持） |
| `login` | 生成セッションを開かずに再ペアリング（保存済み権限はリセット） |
| `logout` | worker を停止し、このプロジェクトのトークンを破棄 |
| `status` | worker 状態・ログパス・ペアリング・保存済み権限を表示 |
| `snapshot` | ローカルで生成・パックしてアップロードし終了（CI 向け） |

| オプション | 短縮形 | デフォルト | 説明 |
| --- | --- | --- | --- |
| `--config=<path>` | `-c` | — | config ファイルのパス |
| `--url=<url>` | — | `https://kubb.studio` | Kubb Studio の URL（`http://` は localhost / 127.0.0.1 / [::1] のみ） |
| `--allow-read` | — | `false` | 生成ファイル内容の読み取りを Studio に許可 |
| `--allow-read-ast` | — | `false` | パース済み仕様（Kubb AST）の読み取りを許可 |
| `--allow-write` | — | `false` | 生成ファイルをディスクへ書き込む |
| `--allow-config-edit` | — | `false` | Studio による `kubb.config.ts` のプラグインオプション変更を許可 |
| `--allow-exec` | — | `false` | formatter・linter・`output.postGenerate` の実行を許可 |
| `--no-open` | — | — | 承認ページをブラウザで開かない |
| `--log-level=<silent\|info\|verbose>` | `-l` | `info` | ログレベル |

> **警告**: `--allow-write` / `--allow-config-edit` / `--allow-exec` は Studio にローカルのファイル書き込み・設定変更・コマンド実行を許可する。信頼できるプロジェクトでのみ付与すること。

`snapshot` 専用のオプション（`--allow-*` は取らない）:

| オプション | 説明 |
| --- | --- |
| `--token=<key>` | 組織の CI API キー。既定は `KUBB_TOKEN` |
| `--id=<id>` | CI agent の固定 ID。GitHub Actions / GitLab CI / Bitbucket Pipelines / CircleCI では自動検出 |
| `--base-id=<id>` | 比較対象にする別 CI agent の `--id`（ベースブランチ等）。GitHub PR / GitLab MR では自動検出 |
| `--name=<name>` | tarball のパッケージ名。既定は直近の `package.json` の name |
| `--package-version=<version>` | tarball のパッケージ版。既定は直近の `package.json` の version |
| `--json` | 結果を 1 つの JSON オブジェクトで出力 |

```sh
kubb studio snapshot --json
```

環境変数: `KUBB_HOME`（Studio 状態の保存先、既定 `~/.kubb`）、`KUBB_TOKEN`（snapshot 用 CI API キー）。`KUBB_AGENT_MAX_GENERATIONS` 等の上限設定は公式の `kubb studio` リファレンスを参照。

## `kubb mcp`: MCP サーバーの起動

```sh
npx kubb mcp
```

AI クライアント向けの MCP（Model Context Protocol）サーバーを stdio で起動する。詳細は `mcp.md` を参照。

> 旧版にあった `kubb start` / `kubb agent start` は 5.11.0 のコマンド一覧（`init` / `generate` / `validate` / `mcp` / `studio` / `add` / `update` / `list`）に存在しないため収録しない。Studio 連携は `kubb studio start` を使う。
