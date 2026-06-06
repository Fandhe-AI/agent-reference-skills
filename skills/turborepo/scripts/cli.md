# CLI

`turbo` CLI の主要コマンドリファレンス。

## タスク実行（turbo run）

```sh
turbo run <task> [options]
turbo <task>        # run は省略可能
```

複数タスクを同時実行する場合:

```sh
turbo run build test lint check-types
```

## turbo run のフィルタリング

```sh
# パッケージ名でフィルター
turbo run build --filter=web
turbo run build --filter=@acme/ui

# ディレクトリでフィルター
turbo run lint --filter="./packages/utilities/*"

# 依存元（上流）を含む
turbo run build --filter=...@acme/ui

# 依存先（下流）を含む
turbo run dev --filter=web...

# 変更のあったパッケージのみ
turbo run build --affected

# Git 差分ベース
turbo run build --filter=[HEAD^1]
turbo run build --filter=[origin/main]

# 特定タスクのショートハンド（v2.2.4+）
turbo run web#build docs#lint

# 除外
turbo run build --filter=./apps/* --filter=!./apps/admin
```

## turbo run の主要オプション

| オプション | 説明 |
|---|---|
| `--filter <pattern>` / `-F` | 実行対象パッケージを絞り込む |
| `--affected` | 変更があったパッケージのみ実行 |
| `--only` | 依存タスクを実行せず指定タスクのみ |
| `--force` | キャッシュを無視して再実行 |
| `--cache` | キャッシュの読み書きモード設定 |
| `--cache-dir <path>` | キャッシュディレクトリを指定 |
| `--concurrency <n>` | 最大同時実行数（デフォルト: `10`） |
| `--continue <mode>` | エラー時の動作（`never`/`dependencies-successful`/`always`） |
| `--env-mode` | 環境変数のアクセス制御（`strict`/`loose`） |
| `--dry` / `--dry-run` | 実行せずにタスク計画を表示 |
| `--dry=json` | タスク計画を JSON 形式で出力 |
| `--graph` | タスクグラフを可視化（`svg`/`html`/`mermaid`/`dot`） |
| `--output-logs` | ログ出力レベル設定 |
| `--summarize` | 実行メタデータを JSON で出力 |
| `--profile <file>` | パフォーマンストレースを生成 |
| `--json` | NDJSON 形式で出力 |
| `--log-file <file>` | 構造化ログをファイルに書き込む |
| `--team <slug>` | リモートキャッシュのチームスラグ |
| `--token <token>` | リモートキャッシュの Bearer トークン |
| `--verbosity` | ログレベル指定（`-v`, `-vv`, `-vvv`） |

## よく使う turbo run の組み合わせ

```sh
turbo run build --affected                      # 変更パッケージのみビルド
turbo run build --dry=json                      # ドライラン（JSON 出力）
turbo run test --continue=always                # エラーでも続行
turbo run build --cache=local:r,remote:rw       # ローカル読み込みのみ
turbo run build --force                         # キャッシュを無視して再実行
turbo run build --graph=graph.svg               # タスクグラフを SVG で出力
turbo run build --summarize                     # 実行サマリーを生成
turbo run build --concurrency=50%               # CPU 数の 50% を使用
```

## ウォッチモード（turbo watch）

```sh
turbo watch [tasks]
turbo watch dev lint
```

コードの変更をもとにタスクを再実行する。`"persistent": true` のタスクは無視される。

実験的なキャッシュ書き込み:

```sh
turbo watch your-tasks --experimental-write-cache
```

## パッケージ一覧（turbo ls）

```sh
turbo ls                                    # 全パッケージ一覧
turbo ls web @repo/ui                       # 特定パッケージの詳細
turbo ls --affected                         # 変更パッケージのみ
turbo ls --affected --filter=web            # affected と filter の積集合
turbo ls --output=json                      # JSON 形式で出力
```

## 依存関係違反チェック（turbo boundaries）

```sh
turbo boundaries
```

パッケージディレクトリ外のインポートおよび `package.json` に未宣言のパッケージのインポートを検出する（実験的機能）。

## GraphQL クエリ（turbo query）

```sh
turbo query                                              # GraphiQL インタラクティブモード
turbo query "query { packages { items { name } } }"      # 直接実行
turbo query query.gql                                    # ファイルから実行
turbo query --schema                                     # GraphQL スキーマを出力
```

変更影響分析:

```sh
turbo query affected
turbo query affected --tasks build test
turbo query affected --base=main --head=HEAD
```

## デバッグ情報（turbo info）

```sh
turbo info
```

バージョン、パス、デーモン状態、パッケージマネージャー、プラットフォーム情報を表示する。

## パッケージグラフの可視化（turbo devtools）

```sh
turbo devtools
turbo devtools --port=9876
turbo devtools --no-open
```

ブラウザでパッケージグラフを可視化する。

## テレメトリー管理

```sh
turbo telemetry status    # テレメトリーの現在の状態を確認
turbo telemetry enable    # テレメトリーを有効化
turbo telemetry disable   # テレメトリーを無効化
```

## グローバルフラグ

| フラグ | 説明 |
|---|---|
| `--color` | カラー出力を強制 |
| `--no-color` | カラー出力を無効化 |
| `--no-update-notifier` | バージョン更新通知を無効化 |
| `--cwd <path>` | 作業ディレクトリを指定 |
