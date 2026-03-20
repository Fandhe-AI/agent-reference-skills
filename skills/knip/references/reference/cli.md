# CLI Arguments

Source: https://knip.dev/reference/cli

## General

| Flag | Description |
|------|-------------|
| `--help` / `-h` | ヘルプ表示 |
| `--version` / `-V` | バージョン表示 |
| `--no-progress` / `-n` | プログレス非表示（CI では自動） |
| `--config [file]` / `-c` | 設定ファイルパス指定 |
| `--use-tsconfig-files` | `tsconfig.json` で project files を定義 |
| `--tsConfig [file]` / `-t` | 代替 tsconfig ファイル指定 |
| `knip-bun` | Bun ランタイムで実行 |
| `NO_COLOR` | カラー出力無効化（環境変数） |

## Mode

| Flag | Description |
|------|-------------|
| `--cache` | 連続実行を 10-40% 高速化 |
| `--cache-location` | キャッシュ保存先（default: `./node_modules/.cache/knip`） |
| `--include-entry-exports` | エントリーファイルの未使用 exports をレポート |
| `--no-gitignore` | `.gitignore` を無視 |
| `--production` | 本番ソースのみ lint |
| `--strict` | ワークスペース分離、production を暗黙的に含む |
| `--watch` | ファイル変更を監視 |

## Scope

| Flag | Description |
|------|-------------|
| `--workspace [filter]` / `-W` | ワークスペース選択 |
| `--directory [dir]` | 実行ディレクトリ変更 |
| `--exclude` | issue タイプを除外 |
| `--include` | issue タイプを含める |
| `--dependencies` | 依存関係 issue のショートカット |
| `--exports` | エクスポート issue のショートカット |
| `--files` | ファイル issue のショートカット |
| `--tags` | JSDoc/TSDoc タグでフィルタ（`+`/`-` 記法） |

Issue types: `files`, `dependencies`, `unlisted`, `unresolved`, `exports`, `nsExports`, `types`, `nsTypes`, `enumMembers`, `namespaceMembers`, `duplicates`, `catalog`

## Fix

| Flag | Description |
|------|-------------|
| `--fix` | 自動修正 |
| `--fix-type` | 修正対象を限定（comma-separated） |
| `--allow-remove-files` | ファイル削除を許可 |
| `--format` | 修正後にフォーマッター実行 |

## Output

| Flag | Description |
|------|-------------|
| `--preprocessor [file]` | プリプロセッサ指定（繰り返し可） |
| `--preprocessor-options [json]` | プリプロセッサに JSON オプション |
| `--reporter [reporter]` | 出力形式（繰り返し可） |
| `--reporter-options [json]` | レポーターに JSON オプション |
| `--no-config-hints` | 設定ヒント非表示 |
| `--treat-config-hints-as-errors` | 設定ヒントをエラーに |
| `--max-issues` | 最大 issue 数（超過で exit 1） |
| `--max-show-issues` | 表示 issue 数の制限 |
| `--no-exit-code` | 常に exit 0 |

Exit codes: `0` (no issues), `1` (issues found), `2` (error/exception)

## Troubleshooting

| Flag | Description |
|------|-------------|
| `--debug` / `-d` | 詳細デバッグ出力 |
| `--memory` | メモリ使用量表示 |
| `--memory-realtime` | リアルタイムメモリログ |
| `--performance` | 実行時間統計 |
| `--performance-fn` | 単一関数のプロファイル |
| `--trace` | エクスポートの import 箇所表示 |
| `--trace-dependency [name]` | パッケージ/バイナリ参照をトレース |
| `--trace-export [name]` | エクスポート名をトレース |
| `--trace-file [path]` | ファイルのエクスポートをトレース |
