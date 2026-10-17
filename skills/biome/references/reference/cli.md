# CLI

対象は Biome 2.5.15。コマンド: `version` / `upgrade` / `rage` / `start` / `stop` / `check` / `lint` / `format` / `ci` / `init` / `lsp-proxy` / `migrate`（`prettier` / `eslint`）/ `search` / `explain` / `clean`。使い方は `biome --help` または `biome <command> --help` で確認する。

## Signature / Usage

```bash
biome <command> [options] [paths...]
biome check --write          # 安全な修正を適用
biome ci .                   # CI 向け（ファイルを変更しない）
```

## 主要コマンド

### biome version
Biome CLI のバージョンを表示し、接続中であればデーモンサーバーの情報も表示して終了する。

### biome upgrade
Biome を最新の安定版へ更新する。動作はインストール方法に依存する。
- **Standalone**: バイナリをその場で更新
- **Homebrew**: `brew upgrade biome` を実行
- `BIOME_DISTRIBUTION`（`npm` / `homebrew` / `standalone`）で自動検出を上書きできる
- npm でインストールした Biome はこの方法では更新できない（パッケージマネージャーで `@biomejs/biome` を更新する）

### biome check - 統合チェック
フォーマッター、リンター、アシストアクションを実行する。

```bash
biome check --write         # 安全な修正を適用
biome check --write --unsafe  # 危険な修正も適用
```

オプション:
- `--write`, `--fix` / `--unsafe`
- `--formatter-enabled=<true|false>` / `--linter-enabled=<true|false>` / `--assist-enabled=<true|false>`
- `--enforce-assist=<true|false>`: 未適用のアシストアクションがあると失敗する（既定 `true`）
- `--format-with-errors=<true|false>`
- `--stdin-file-path=<PATH>`: stdin 入力に使うパス（拡張子で入力の種類が決まる）
- `--staged`: ステージ済みファイルのみ（ローカル用）
- `--changed`: コミットで変更されたファイルのみ（`vcs.defaultBranch` または `--since` からの相対。CI 用）
- `--since=REF`: `--changed` の基準 ref（`--changed` が必須）
- `--profile-rules`: ルールごとの実行時間を報告（セマンティックモデル構築などのセットアップ時間は除く）
- `--only=<GROUP|RULE|DOMAIN|ACTION|PLUGIN>` / `--skip=<GROUP|RULE|DOMAIN|ACTION|PLUGIN>`
- `--watch`: 初回実行後、指定パスを監視して変更ファイルを再処理する（2.5.0）

### biome lint - リンター
```bash
biome lint --write          # 安全な修正
biome lint --write --unsafe  # 危険な修正も適用
```

オプション:
- `--suppress`: ルールを修正する代わりに抑制コメントを書き込む
- `--reason=<STRING>`: 抑制の理由（`--suppress` が必須）
- `--only=<GROUP|RULE|DOMAIN|PLUGIN>` / `--skip=<GROUP|RULE|DOMAIN|PLUGIN>`
- `--stdin-file-path`, `--staged`, `--changed`, `--since=REF`, `--profile-rules`, `--watch`

`--only` / `--skip` の例（`plugin` グループはアナライザープラグインのみが対象）:

```bash
biome lint --only=correctness/noUnusedVariables --only=suspicious --only=test --only=plugin
biome lint --skip=correctness/noUnusedVariables --skip=suspicious --skip=project --skip=plugin
```

`--only` で選んだルールの重大度が `off` の場合、推奨ルールは `error`、それ以外は `warn` になる。`--skip` は `--only` より優先され、対象ルールを `off` にする。

### biome format - フォーマッター
```bash
biome format --write
```

オプション:
- `--write`, `--fix`
- `--stdin-file-path=<PATH>`: stdin 入力のパス（仮想パスは `files.includes` と VCS の ignore を回避する）
- `--staged`, `--changed`, `--since=REF`, `--watch`

### biome ci - CI 環境向け
ファイルを変更せずにフォーマット、リント、アシストを検査する。`--write` / `--fix` は無い。

```bash
biome ci .
```

オプション: `--formatter-enabled` / `--linter-enabled` / `--assist-enabled` / `--enforce-assist` / `--changed` / `--since=REF` / `--only` / `--skip` / `--threads=<NUMBER>`（環境変数 `BIOME_THREADS`）

### biome init - 初期化
```bash
biome init
biome init --jsonc   # biome.jsonc を作成
```

### biome lsp-proxy - エディタ統合
デーモンサーバーが起動していることを保証し、デーモンと stdin/stdout の間で LSP メッセージを中継する。

### biome migrate - 設定の移行
既定では変更の提案のみ。`--write` で適用する。

```bash
biome migrate --write           # v2 設定へ移行
biome migrate eslint --write    # ESLint から移行（--include-inspired / --include-nursery）
biome migrate prettier --write  # Prettier から移行
```

### biome search - パターン検索（実験的）
GritQL パターンでコードを検索する（読み取り専用。rewrite クエリは非対応）。`-l`, `--language=<css|javascript|json>`（既定 `javascript`）。

```bash
biome search '`console.log($message)`' ./src
```

### biome explain - ドキュメント表示
リントルール名または `daemon-logs` のドキュメントを表示する。

### biome clean - ログ削除
デーモンのログを削除する。

### biome rage - デバッグ情報
CLI、プラットフォーム、環境、設定、ワークスペース、デーモンを含むトラブルシューティングレポートを出力する。追加フラグ:
- `--daemon-logs`: 最新のデーモンログを含める（未接続の場合は起動中のデーモンを探す）
- `--formatter`: フォーマッター設定を含める
- `--linter`: リンター設定と有効なルールを含める

### biome start / stop - デーモン制御
デーモンサーバーを起動 / 停止する。

## グローバルフラグ

| フラグ | 説明 |
|-----------|------|
| `-h`, `--help` / `-V`, `--version` | ヘルプ / バージョン |
| `--colors=<off\|force>` | ANSI スタイルの制御 |
| `--use-server` | 起動中のデーモンサーバーに接続 |
| `--verbose` | 詳細出力（処理・変更したファイルを列挙） |
| `--config-path=<PATH>` | 設定ファイルまたは探索ディレクトリ（環境変数 `BIOME_CONFIG_PATH`） |
| `--max-diagnostics=<none\|NUMBER>` | 表示する診断の最大数（`none` は無制限、既定 20） |
| `--skip-parse-errors` | 構文エラーのあるファイルをスキップ |
| `--no-errors-on-unmatched` | 処理対象ファイルが無くても失敗しない |
| `--error-on-warnings` | 警告でも非ゼロで終了 |
| `--diagnostic-level=<info\|warn\|error>` | 表示する最小の重大度（既定 info） |
| `--reporter=<FORMAT>` | 出力形式（下表参照。既定 `default`） |
| `--reporter-file=<PATH>` | レポートの出力先ファイル（複数出力は `--reporter` を繰り返す） |

### reporter

| 値 | 出力 |
|----|------|
| `default` | 完全な診断とサマリー（ターミナル向け） |
| `concise` | 診断 1 件につき 1 行。フォーマッター診断はグループ化される（2.5.0） |
| `summary` | カテゴリ・ルール別。フォーマッター診断はファイル別 |
| `json` / `json-pretty` | JSON（実験的。パッチリリースで変更される可能性あり） |
| `github` | GitHub ワークフローコマンド（アノテーション） |
| `gitlab` | GitLab Code Quality レポート |
| `junit` | JUnit XML |
| `checkstyle` | Checkstyle XML |
| `rdjson` | Reviewdog 診断 JSON |
| `sarif` | SARIF |

```bash
biome ci --reporter=default --reporter=rdjson --reporter-file=report.json
```

## 共有フラグ

複数のコマンドで受け付けられる。設定フラグは `biome.json` の同等の設定を上書きする。

- **デーモンウォッチャー**: `--watcher-kind=<polling|recommended|none>`（`BIOME_WATCHER_KIND`、既定 `recommended`）、`--watcher-polling-interval=<NUMBER>`（ms、`BIOME_WATCHER_POLLING_INTERVAL`、既定 2000）
- **JSON パーサー**: `--json-parse-allow-comments` / `--json-parse-allow-trailing-commas`
- **設定**: `--vcs-enabled` / `--vcs-client-kind=<git>` / `--vcs-use-ignore-file` / `--vcs-root` / `--vcs-default-branch` / `--files-max-size`（既定 1 MiB）/ `--files-ignore-unknown` / `--format-with-errors`
- **フォーマッター設定**: `--indent-style` / `--indent-width` / `--line-ending` / `--line-width` / `--attribute-position` / `--bracket-same-line` / `--bracket-spacing` / `--delimiter-spacing`（既定 false）/ `--expand=<auto|always|never>` / `--trailing-newline` / `--use-editorconfig`
- **言語別**: `--javascript-formatter-*` / `--javascript-linter-enabled` / `--javascript-assist-enabled`、および同系統の `--json-*` / `--css-*` / `--graphql-*` / `--grit-*` / `--html-*`（例: `--html-formatter-whitespace-sensitivity=<css|strict|ignore>`、`--css-parse-tailwind-directives`）
- **ログ**: `--log-file`（`BIOME_LOG_FILE`）、`--log-prefix-name`（`BIOME_LOG_PREFIX_NAME`、既定 `server.log`）、`--log-path`（`BIOME_LOG_PATH`）、`--log-level=<none|tracing|debug|info|warn|error>`（`BIOME_LOG_LEVEL`、既定 none）、`--log-kind=<pretty|compact|json>`（`BIOME_LOG_KIND`、既定 pretty）

## Related

- [configuration.md](./configuration.md)
- [environment-variables.md](./environment-variables.md)
- [reporters.md](./reporters.md)
- [daemon.md](./daemon.md)
