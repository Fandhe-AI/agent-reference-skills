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

## HTML レポートの表示

```sh
npx playwright show-report
```

レポート内のテストをクリックすると、Trace Viewer でトレースを確認できる。
