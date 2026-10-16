# debug

テスト失敗の調査・デバッグに使用するコマンドと環境変数。

## Playwright Inspector によるデバッグ

```sh
# 全テストをデバッグモードで実行（Inspector が自動起動）
npx playwright test --debug

# 特定ファイルの特定行をデバッグ
npx playwright test example.spec.ts:10 --debug

# 特定ブラウザでデバッグ
npx playwright test --project=chromium --debug

# ファイル・行・ブラウザを組み合わせてデバッグ
npx playwright test example.spec.ts:10 --project=webkit --debug
```

`--debug` フラグはブラウザをヘッドモードで起動し、タイムアウトを 0（無制限）に設定する。

## CLI デバッガーでのデバッグ（コーディングエージェント向け）

```sh
# attach 用のセッション名が出力される
npx playwright test --debug=cli

# 出力されたセッションにアタッチ（例: tw-87b59e）
playwright-cli attach tw-87b59e

# セッションを指定してステップ実行
playwright-cli --session tw-87b59e step-over
```

`--debug [mode]` の mode は "inspector"（既定）または "cli"。"cli" は CLI 経由でのアタッチとデバッグを可能にする（test-cli-js.md）。`playwright-cli attach` の流れはリリースノート v1.59（release-notes-js.md「CLI debugger for agents」）にのみ記載。`playwright-cli` のインストールは `mcp-cli.md` を参照。

## UI モードでのデバッグ

```sh
npx playwright test --ui
```

タイムライン・スナップショット・ネットワークログを対話的に確認できる。

## ブラウザ DevTools コンソールでの操作

```sh
PWDEBUG=console npx playwright test
```

ブラウザの DevTools コンソールで `playwright` オブジェクトが使用可能になる。事前にテストコードへ `await page.pause()` を挿入して実行すること。

## API 詳細ログの出力

```sh
DEBUG=pw:api npx playwright test
```

すべての Playwright API 呼び出しを標準出力に出力する。タイミング・順序の問題の診断に有効。

## ブラウザレベルのデバッグログ

```sh
DEBUG=pw:browser npx playwright test
```

## トレースの記録（CLI から有効化）

```sh
# 全テストでトレースを記録
npx playwright test --trace on

# 最初のリトライ時のみトレースを記録（CI 推奨）
npx playwright test --trace on-first-retry

# 全リトライ時にトレースを記録
npx playwright test --trace on-all-retries

# 失敗したテストのトレースのみ保持
npx playwright test --trace retain-on-failure

# 失敗とリトライのトレースを保持
npx playwright test --trace retain-on-failure-and-retries
```

## トレースファイルの表示

```sh
# ローカルのトレースファイルを Trace Viewer で開く
npx playwright show-trace trace.zip

# リモートのトレースファイルを表示
npx playwright show-trace https://example.com/trace.zip

# ブラウザとホスト・ポートを指定して表示
npx playwright show-trace --browser chromium trace.zip
npx playwright show-trace --host 0.0.0.0 --port 8080 trace.zip
```

## CLI でのトレース分析（コーディングエージェント向け）

```sh
# トレースを開く
npx playwright trace open test-results/example-has-title-chromium/trace.zip

# アクション一覧（フィルター例）
npx playwright trace actions --grep="expect"

# アクションの詳細（番号指定）
npx playwright trace action 9

# アクションのスナップショット（before / after）
npx playwright trace snapshot 9 --name after

# トレースを閉じる
npx playwright trace close
```

`npx playwright trace` はリリースノート v1.59（release-notes-js.md「CLI trace analysis for agents」）にのみ記載されており、専用のコマンドリファレンスページは原本に無い。

## HTML レポートの表示

```sh
npx playwright show-report
```

レポート内のテストをクリックすると、Trace Viewer でトレースを確認できる。
