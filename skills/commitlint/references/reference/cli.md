# CLI Reference

> Source: https://commitlint.js.org/reference/cli

commitlint の CLI オプション全一覧。

## 基本使用法

```bash
# stdin から読み取り
echo "feat: add feature" | commitlint

# 最後のコミットを検証
commitlint --last

# コミット範囲を検証
commitlint --from HEAD~3 --to HEAD

# 設定を表示
commitlint --print-config
```

## Input

| オプション | 説明 |
|-----------|------|
| `[input]` | `--edit`, `--env`, `--from`, `--to` が省略された場合、stdin から読み取る |

## Output / Display

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `-c, --color` | boolean | `true` | カラー出力の切り替え |
| `-q, --quiet` | boolean | `false` | コンソール出力の切り替え |
| `-V, --verbose` | boolean | - | 問題のないレポートでも詳細出力を有効にする |
| `-o, --format` | string | - | 結果の出力フォーマット |
| `--print-config` | choices | `""`, `"text"`, `"json"` | 解決済み設定を表示 |

## Configuration

| オプション | 型 | 説明 |
|-----------|-----|------|
| `-g, --config` | string | 設定ファイルへのパス。設定が見つからない場合はリザルトコード 9 |
| `-x, --extends` | array | 拡張する共有設定の配列 |
| `-p, --parser-preset` | string | conventional-commits-parser 用の設定プリセット |
| `--options` | string | CLI オプションを含む JSON ファイルまたは CommonJS モジュールへのパス |

## Commit Range / Analysis

| オプション | 型 | 説明 |
|-----------|-----|------|
| `-e, --edit` | string | 指定ファイルから最後のコミットメッセージを読み取る。フォールバックは `./.git/COMMIT_EDITMSG` |
| `-E, --env` | string | 環境変数の値で指定されたパスのファイル内のメッセージをチェック |
| `-f, --from` | string | lint するコミット範囲の下限 |
| `-t, --to` | string | lint するコミット範囲の上限 |
| `-l, --last` | boolean | 最後のコミットのみを解析 |
| `--from-last-tag` | boolean | 最後のタグを lint するコミット範囲の下限として使用 |
| `--git-log-args` | string | スペース区切りの追加 git log 引数 |

## Other Options

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `-d, --cwd` | string | 作業ディレクトリ | 実行ディレクトリ |
| `-H, --help-url` | string | - | エラーメッセージ内のヘルプ URL |
| `-s, --strict` | boolean | - | strict モードを有効にする。warning はリザルトコード 2、error はリザルトコード 3 |
| `-v, --version` | boolean | - | バージョン情報を表示 |
| `-h, --help` | boolean | - | ヘルプを表示 |

## 使用例

```bash
# 特定の設定ファイルを使用
commitlint --config commitlint.config.js

# 共有設定を拡張
commitlint --extends @commitlint/config-conventional

# コミットメッセージ編集時にフックから使用
commitlint --edit

# 環境変数からファイルパスを取得
commitlint --env COMMIT_MSG_FILE

# 最後のタグからのコミットを検証
commitlint --from-last-tag --to HEAD

# strict モードで実行
commitlint --strict

# JSON 形式で設定を表示
commitlint --print-config json

# 追加の git log 引数を指定
commitlint --from HEAD~5 --to HEAD --git-log-args "--first-parent"
```
