# cli

`npx playwright` CLI のコマンドリファレンス。テスト実行・レポート・ブラウザ管理・バージョン確認など。

## ヘルプの表示

```sh
# 全コマンドのヘルプ
npx playwright --help

# 特定コマンドのヘルプ
npx playwright test --help
npx playwright codegen --help
npx playwright install --help
```

## テストの実行（基本）

```sh
# 全テストを実行
npx playwright test

# 特定ファイルのテストを実行
npx playwright test landing-page.spec.ts

# 複数ファイルを指定
npx playwright test tests/todo-page/ tests/landing-page/

# キーワードでファイルをフィルター
npx playwright test landing login

# ファイルと行番号で特定のテストを実行
npx playwright test example.spec.ts:10
```

## テストのフィルター

```sh
# テストタイトルの正規表現フィルター
npx playwright test --grep "login"
npx playwright test -g "add a todo item"

# 正規表現に一致しないテストのみ実行
npx playwright test --grep-invert "slow"

# 特定プロジェクト（ブラウザ）のみ実行
npx playwright test --project chromium
npx playwright test --project webkit --project firefox

# 直前の失敗テストのみ再実行
npx playwright test --last-failed

# Git 差分に基づいて変更されたテストのみ実行
npx playwright test --only-changed
npx playwright test --only-changed main

# テスト一覧ファイルからテストを実行
npx playwright test --test-list tests-to-run.txt

# テスト一覧ファイルに含まれるテストをスキップ
npx playwright test --test-list-invert tests-to-skip.txt
```

## 実行モード

```sh
# ヘッドモード（ブラウザを表示して実行）
npx playwright test --headed

# デバッグモード（Playwright Inspector を起動）
npx playwright test --debug

# インタラクティブ UI モード
npx playwright test --ui
```

## 並列実行

```sh
# ワーカー数を指定
npx playwright test --workers 4
npx playwright test --workers 50%

# 全テストを完全並列で実行
npx playwright test --fully-parallel

# シリアル実行（ワーカー数 1）
npx playwright test --workers 1
```

## リトライと失敗制御

```sh
# 失敗したテストを N 回リトライ
npx playwright test --retries 3

# N 回失敗したら停止
npx playwright test --max-failures 5

# 最初の失敗で停止（--max-failures 1 の短縮形）
npx playwright test -x

# フレーキーテストを失敗扱いにする
npx playwright test --fail-on-flaky-tests

# test.only() が存在する場合に失敗させる（CI 向け）
npx playwright test --forbid-only

# テストが見つからなくても成功とする
npx playwright test --pass-with-no-tests
```

## タイムアウト

```sh
# テストごとのタイムアウトをミリ秒で設定（0 = 無制限）
npx playwright test --timeout 60000

# スイート全体のタイムアウトを設定
npx playwright test --global-timeout 600000
```

## レポーター指定

```sh
npx playwright test --reporter list
npx playwright test --reporter dot
npx playwright test --reporter line
npx playwright test --reporter json
npx playwright test --reporter junit
npx playwright test --reporter html
npx playwright test --reporter blob
```

## スナップショット更新

```sh
# すべてのスナップショットを更新
npx playwright test --update-snapshots all
npx playwright test -u all

# 変更されたスナップショットのみ更新
npx playwright test -u changed

# 欠損しているスナップショットのみ追加
npx playwright test -u missing

# スナップショット検証をスキップ
npx playwright test --ignore-snapshots
```

## トレース設定

```sh
npx playwright test --trace on
npx playwright test --trace off
npx playwright test --trace on-first-retry
npx playwright test --trace on-all-retries
npx playwright test --trace retain-on-failure
npx playwright test --trace retain-on-first-failure
```

## シャーディング

```sh
# テストを N 分割して実行（1-based インデックス）
npx playwright test --shard 1/3
npx playwright test --shard 2/3
npx playwright test --shard 3/3
```

## テスト一覧の表示

```sh
# テストを実行せずに一覧を表示
npx playwright test --list
```

## その他のオプション

```sh
# 設定ファイルを指定
npx playwright test --config playwright.ci.config.ts
npx playwright test -c playwright.ci.config.ts

# TypeScript 設定ファイルを指定
npx playwright test --tsconfig tsconfig.test.json

# 成果物の出力先ディレクトリを指定（デフォルト: test-results）
npx playwright test --output test-results

# 各テストを N 回繰り返し実行
npx playwright test --repeat-each 3

# プロジェクト依存関係をスキップ
npx playwright test --no-deps

# 標準出力を抑制
npx playwright test --quiet
```

## レポートの表示

```sh
# デフォルトの HTML レポートをブラウザで開く
npx playwright show-report

# 特定ディレクトリのレポートを開く
npx playwright show-report playwright-report

# ホストとポートを指定して開く
npx playwright show-report --host 0.0.0.0 --port 9323
```

## シャードレポートのマージ

```sh
# blob レポートを HTML レポートにマージ
npx playwright merge-reports blob-report

# レポーターを指定してマージ
npx playwright merge-reports --reporter html blob-report
npx playwright merge-reports --reporter json blob-report
npx playwright merge-reports --reporter junit blob-report

# 設定ファイルを使用してマージ
npx playwright merge-reports --config merge.config.ts blob-report
```
