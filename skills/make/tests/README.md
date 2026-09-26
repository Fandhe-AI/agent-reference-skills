# tests

`skills/make/scripts/bin/*.mjs` の回帰テスト。Node 標準の `node:test` のみを使用し、追加の
npm 依存は導入していない。

## 実行方法

```bash
node --test skills/make/tests/**/*.test.mjs
```

## 構成

| Path | 内容 |
| --- | --- |
| `helpers.mjs` | 各 CLI を子プロセスとして起動する共通ヘルパー（`runCli` / `runCliJson`）、一時ディレクトリ生成・後始末 |
| `fixtures/dummy-secrets/` | ダミーの `.env`（実際の秘密情報は含まない）。秘密情報非混入テストの固定フィクスチャ |
| `inspect-repo.test.mjs` | 引数検証、root 不在、秘密情報非混入、node_modules 等の走査除外、symlink 非追跡、入口候補検出 |
| `validate-plan.test.mjs` | 引数検証、壊れた JSON、`..`・絶対パス・**symlink 経由**の root 外逸脱検出、衝突検出、checks の shell メタ文字拒否、changes の対象重複・checks の name 重複・sample と newContentHash の形式不正の FAIL、副作用なし（実行しない）の確認 |
| `preview-sample.test.mjs` | 引数検証、サンプル不在、既定で書き込まない、競合検出、`--apply` の全件か無しか（`--force` なしの競合・書き込めない対象が 1 件でもあれば何も書き込まない、親パスがファイル・壊れた symlink の対象も事前に検出、サンプルの実行権限の引き継ぎと実行ビット欠落の競合検出、書き込み途中の失敗は作成したファイル・入れ子ディレクトリまで巻き戻す）、`--apply` の承認済み計画（`--plan`）への照合（計画外ファイル・root 不一致・sample 不一致・newContentHash 不一致・matches-hash 不一致で全件中止、プレビューの `proposedPlan` から作った計画で適用できること）、symlink 経由の root 外書き込み拒否、走査除外ディレクトリ・symlink を含むサンプルの不適用 |
| `verify-layout.test.mjs` | 引数検証、Makefile 不在時の NOT_APPLICABLE、help/target 整合性、Skill 固有パス依存検出（行の中身を転記せず行番号のみ）、未確認事項の明示 |
| `run-checks.test.mjs` | 引数検証、**既定 dry-run（--execute なしでは実行しない）**、approved:true が無い check の BLOCKED、実行成功/失敗/timeout の区別、不正な計画（root 不在）で全 checks を BLOCKED にし実行しない、checks 空の NOT_APPLICABLE、未対応 schemaVersion の不実行、コマンドの stdout / stderr と計画の command / args / cwd を結果に含めない（全経路）、壊れた JSON の断片を診断に出さない |
| `sample-plans.test.mjs` | `samples/plans/` 配下の各サンプル計画が `validate-plan.mjs` のスキーマに適合すること。root プレースホルダのままでは FAIL、root を一時ディレクトリに差し替える（modify 対象のダミーファイルも用意する）と PASS になることを確認する |
| `exec-safe.test.mjs` | Windows `.cmd`/`.bat` 専用処理（`resolveExecutionTarget`）のロジック単体テスト。cmd.exe メタ文字を含む引数の BLOCKED 化と、理由に値ではなく位置だけを書くことを含む。実 Windows 環境がないためロジック判定のみ検証し、cmd.exe の実起動そのものは未検証 |
| `sample-projects.test.mjs` | `samples/projects/*/Makefile` の recipe が `cargo clean` を `--target-dir target` なしで使わないこと（共有 `CARGO_TARGET_DIR` を消さない）、`samples/ci/github-actions.yml.example` の action が commit SHA 固定で `permissions: contents: read` と `persist-credentials: false` を持つことの静的確認 |
| `help-contract.test.mjs` | 全 CLI の `--help` が実装済みオプションと一致すること、未知フラグが exit 2 になること |
| `secrets-fixture.test.mjs` | 固定フィクスチャ経由での秘密情報非混入の回帰確認 |
| `eval-cases.json` | 下記「eval-cases.json について」を参照 |

## 終了コード契約（全 CLI 共通）

| コード | 意味 |
| --- | --- |
| 0 | 成功（status が `PASS` / `SKIPPED` / `NOT_APPLICABLE`） |
| 1 | `FAIL`（検証・実行の結果、問題が見つかった／コマンドが失敗した） |
| 2 | 引数エラー・使用方法の誤り |
| 3 | `BLOCKED`（承認・前提不足で実行できなかった） |

`SKIPPED` / `BLOCKED` は exit 0 / 3 のいずれであっても、JSON の `status` フィールドでは
`PASS` に丸めない。これは `run-checks.test.mjs` の対応するテストで検証している。

## eval-cases.json について

`eval-cases.json` は依頼書 §10 が列挙した判断ケース（変数・依存関係の質問への回答、兄弟
prerequisite の順序誤認防止、小さな Rust crate の過剰設計防止、既存 Node モノレポの全置換防止、
GPU 不足を必須検証成功にしないこと、既存 just/Task の無理な移行防止）について、想定される
「入力」と「期待される判断」のペアを記録したものである。

**これは `node:test` によるスクリプト単体テストとは別物であり、実際に Claude にこれらの入力を
与えて応答を採点するモデル評価はこのファイルの作成だけでは実施していない。** モデル評価を行う
場合は別途、追加 API 料金の発生を利用者に確認したうえで実施すること。
