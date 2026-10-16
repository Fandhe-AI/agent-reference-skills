# cli

vitest CLI コマンドとフラグ一覧。

## テストの実行（watch モード）

```sh
vitest
```

開発環境では watch モード、CI 環境（`process.env.CI` が truthy）では自動的に run モードで起動する。

## テストの単一実行（CI 向け）

```sh
vitest run
```

watch モードを無効にして一度だけ実行する。

## watch モードの明示的な起動

```sh
vitest watch
```

`vitest dev` はエイリアス。

## ベンチマークテストの実行

```sh
vitest bench
```

v5 で `benchmark.compare` 設定・`--compare` フラグ・`benchmark.outputJson` 設定・`--outputJson` フラグは削除された。ベンチマーク結果の保存は次のコマンドで行う（JSON reporter の各テストケースに `benchmarks` フィールドが含まれる）。

```sh
vitest bench --reporter=json --outputFile=<path>
```

## 型チェックテストの実行

```sh
vitest typecheck
```

## マッチするテスト一覧の表示

```sh
vitest list
```

JSON 形式で出力する場合:

```sh
vitest list --json
```

ファイル一覧のみ出力する場合:

```sh
vitest list --filesOnly
```

v5 以降、`vitest list` はテストファイルを実行せず静的にパースしてテストを収集する。ファイルを実際に実行して収集する場合は `--no-static-parse` を指定する。

```sh
vitest list --no-static-parse
```

パースの並行数は既定で `os.availableParallelism()`。`--static-parse-concurrency` で変更できる。

## 環境設定の診断（doctor）

```sh
vitest doctor
```

現在の設定に応じた代替構成（`pool` / `isolate` / `maxWorkers` / `environment` など）でテストスイート全体を複数回実行し、どの構成で高速化できるかを計測して推奨設定を表示する。

> **警告**: スイート全体を複数回実行するため、通常実行の数倍の時間がかかる。現在の設定でスイートが失敗する場合は、比較基準が必要なため中断してエラーを表示する。

## 特定ファイルに関連するテストの実行

```sh
vitest related src/utils.ts
```

`--run` を組み合わせて lint-staged と連携する場合:

```sh
vitest related src/utils.ts --run
```

## ファイル名で絞り込み

```sh
vitest foobar
```

## ファイル名と行番号で絞り込み（v3 以降）

```sh
vitest basic/foo.test.ts:10
```

## テスト名パターンで絞り込み

```sh
vitest run -t "should handle errors"
```

```sh
vitest run --testNamePattern "should handle errors"
```

v5 では、パターンはスイート名とテスト名を `' > '` で連結したフルネームに対して照合される（例: `math > adds` は `-t 'math > adds'` または `-t adds` にマッチ）。

```sh
vitest run -t 'math > adds'
```

## 変更ファイルに関連するテストのみ実行

```sh
vitest run --changed
```

特定コミットやブランチからの変更を対象にする場合:

```sh
vitest run --changed HEAD~1
```

## スナップショットの更新

```sh
vitest run -u
```

```sh
vitest run --update
```

> **警告**: スナップショットが上書きされる。CI 環境ではデフォルトでスナップショット書き込みが防止される。

## カバレッジ付き実行

```sh
vitest run --coverage
```

```sh
vitest run --coverage.enabled
```

## UI を有効にして起動

```sh
vitest --ui
```

ブラウザで `http://localhost:51204/__vitest__/` にアクセスする。直接 URL がエラーになる場合は、Vitest がターミナルに表示するトークン付き URL（`http://localhost:51204/__vitest__/?token=...`）を開く。

## JSON / JUnit レポーターの出力

```sh
vitest run --reporter=json
```

```sh
vitest run --reporter=junit
```

`json` / `junit` / `html` reporter は既定でターミナルではなく `.vitest/` 配下に出力する（`.vitest/json/output.json`、`.vitest/junit/output.xml`、`.vitest/index.html`）。出力先を変える場合は `--outputFile` を指定する。

## ブラウザモードでの実行

```sh
npx vitest --browser=chromium
```

ヘッドレスモードで実行する場合:

```sh
npx vitest --browser.headless
```

## 特定プロジェクトのみ実行（workspace 構成）

```sh
npm run test -- --project e2e
```

複数プロジェクトを指定する場合:

```sh
npm run test -- --project e2e --project unit
```

## n 個の失敗で実行を停止

```sh
vitest run --bail 3
```

## テストなしでも成功終了

```sh
vitest run --passWithNoTests
```

## シャーディング（並列 CI 分散実行）

```sh
vitest run --shard 1/3
```

## シェル補完スクリプトの生成

```sh
vitest complete zsh
```

```sh
vitest complete bash
```

## ヘルプの表示

```sh
npx vitest --help
```
