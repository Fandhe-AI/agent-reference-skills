---
source: https://raw.githubusercontent.com/Fandhe-AI/rust-ai-library/main/crates/guardrail/src/cli.rs, https://raw.githubusercontent.com/Fandhe-AI/rust-ai-library/main/docs/guardrail-self-repair-cli.md
---

# guardrail CLI

AI が生成した変更セット（changeset）を自動適用・エスカレーション・却下の 3 分岐で判定する CI 用 CLI。`guardrail check` は本番経路の単発判定、`guardrail eval` はラベル付きデータセットに対する判定エンジンの品質評価（バッチ）。

## Signature / Usage

```bash
guardrail check --repo . --preset default --format json --output report.json
guardrail eval --dataset crates/guardrail/tests/fixtures/labeled-changes --preset default
```

## Options / Props

### `guardrail check`

| Name | Type / Default | Description |
| --- | --- | --- |
| `--baseline <git-ref>` | `baseline` | 比較対象の baseline git ref |
| `--change-id <id>` | 省略可 | 変更セット識別子（結果ファイル名に使用） |
| `--config <guardrail.toml>` | 省略可 | しきい値設定ファイル。未指定時はリポジトリルートを探索 |
| `--preset <name>` | `"default"` | しきい値プリセット名。実装は未検証の `String` として保持し固定選択肢の検証はしない（`strict` / `default` / `loose` は設計ドキュメント上の想定名） |
| `--repo <path>` | `.` | リポジトリルートパス |
| `--signals <path>` | 省略可（`GUARDRAIL_ALLOW_INJECTED_SIGNALS=1` 必須） | 事前計算済みシグナル JSON（CI 契約検証用）。環境変数 `GUARDRAIL_ALLOW_INJECTED_SIGNALS=1` が未設定のまま渡すと拒否され exit code `2` |
| `--format <text\|json>` | `text` | 出力フォーマット |
| `--output <path>` | 省略可 | 判定レポート JSON の書き込み先 |

### `guardrail eval`

| Name | Type / Default | Description |
| --- | --- | --- |
| `--dataset <dir>` | `crates/guardrail/tests/fixtures/labeled-changes` | ラベル付き変更セットのディレクトリ |
| `--config <guardrail.toml>` | 省略可 | しきい値のみ反映（合否基準はコード側で固定） |
| `--preset <name>` | `"default"` | しきい値プリセット名。実装は未検証の `String` として保持し固定選択肢の検証はしない（`strict` / `default` / `loose` は設計ドキュメント上の想定名） |
| `--repo <path>` | `.` | 設定探索用のリポジトリルート |
| `--format <text\|json>` | `text` | 出力フォーマット |
| `--output <path>` | 省略可 | 集計レポート JSON の書き込み先 |

### Exit code

`guardrail check`:

| Exit Code | 意味 |
| --- | --- |
| `0` | auto_apply（自動適用） |
| `10` | escalate（人手承認待ちのエスカレーション） |
| `20` | reject（却下） |
| `1` | 内部エラー（シグナル欠落・JSON パース失敗など） |
| `2` | 引数エラー（usage error） |

`guardrail eval`:

| Exit Code | 意味 |
| --- | --- |
| `0` | pass（false negative rate 0% かつ false positive rate ≤30%） |
| `30` | fail（miss 検出、または false positive rate が 30% 超） |
| `1` | 内部エラー（データセット不正・fixture パース失敗） |
| `2` | 引数エラー（usage error） |

## Notes

- ここでの guardrail は **CI changeset 判定 CLI** であり、`openai-agents` / `anthropic-prompt-eval` にある LLM 出力に対する guardrail（生成コンテンツの安全性フィルタ）とは別物。判定対象は AI が生成した Git 変更セット（diff）であり、LLM の出力トークンやレスポンスではない
- `guardrail eval` は**ラベル付きデータセットに対する判定器（判定ロジック）自体の評価**であり、`openai-evals-tuning` が扱う LLM モデル評価（graders / SFT・DPO・RFT）とは別物。評価対象は guardrail の判定ロジックの精度（false negative / false positive rate）であり、LLM の応答品質ではない
- 引数パーサは clap ではなく自前実装（依存ポリシー上の承認カテゴリ外のため）。`--signals` は環境変数 `GUARDRAIL_ALLOW_INJECTED_SIGNALS=1` がない限りパーサが拒否するバイパス防止ガード。レポート JSON の `signal_source` フィールドは `"injected"` / `"measured"` を記録し、回帰テストは `"measured"` のみを使用する
- `guardrail.toml` / `policy-exclusion.toml` は `deny_unknown_fields` を適用し、除外ルール ID の typo を早期に型エラーとして検出する。しきい値・除外ルールの変更は committed config の編集のみで行い、CLI 引数単体では変更できない
- `guardrail eval` は REQ-5 のポリシー除外リストを適用しない（`guardrail check` のみ適用）。エンジン自体の精度を測るため
- 現行実装では `bench_measurements_pct` / `bench_median_pct` は空配列 / `0.0` を返す（bench workload 統合は別 issue で対応中）

## Related

- [self-repair](./self-repair.md)
- [config](./config.md)
