---
source: https://raw.githubusercontent.com/Fandhe-AI/rust-ai-library/main/docs/guardrail-self-repair-cli.md, https://raw.githubusercontent.com/Fandhe-AI/rust-ai-library/main/crates/guardrail/src/cli.rs
---

# guardrail / self-repair 設定ファイル

`guardrail check` / `guardrail eval` / `self-repair run` が共有する設定ファイル形式。しきい値は `guardrail.toml`、判定の除外ルールは `policy-exclusion.toml` に記述する。CLI の `--preset` / `--config` はリポジトリにコミットされた設定を選択するのみで、値そのものの変更は committed config の編集を通じて行う。

## Signature / Usage

```bash
guardrail check --config guardrail.toml --preset strict
```

## Options / Props

| Name | Content | Default |
| --- | --- | --- |
| `guardrail.toml` | 判定しきい値 | 変更行数 ≤200 行、bench 中央値劣化 ≤5%、全ゲート pass、public API 破壊なし、gaming 疑いなし |
| `policy-exclusion.toml` | REQ-5 除外ルール | `arch-hyperparameter-change`, `test-tolerance-loosening`, dependency-change カテゴリ |

`--preset` は実装上は未検証の `String`（既定値 `"default"`）で固定選択肢の検証は行われない。設計ドキュメントは `strict` / `default` / `loose` の 3 段階を想定しているが、これはプリセット設定側の命名規約であり CLI パーサ自体が強制するものではない。

### Judgment Report JSON（`guardrail check --output`）

| Name | Type | Description |
| --- | --- | --- |
| `schema_version` | string | スキーマバージョン（例: `"1"`） |
| `signal_source` | `"measured"` \| `"injected"` | シグナルの由来 |
| `change_id` | string \| null | `--change-id` の値 |
| `lines_changed` | u64 | 変更行数 |
| `public_api_broken` | bool | public API シグネチャ破壊の検出有無 |
| `gaming_suspected` | bool | 本番コードとテストの同時変更疑い |
| `build_result` | `"pass"` \| `"fail"` | `cargo build` の結果 |
| `test_result` | `"pass"` \| `"fail"` | `cargo test --release` の結果 |
| `clippy_result` | `"pass"` \| `"fail"` | `cargo clippy --all-targets -- -D warnings` の結果 |
| `bench_measurements_pct` | number[] | bench 劣化計測値（5 点以上、中央値の元データ） |
| `bench_median_pct` | number | 上記の中央値（判定に使用） |
| `applied_exclusion_rule_ids` | string[] | マッチした REQ-5 除外ルール ID |
| `verdict` | `"auto_apply"` \| `"escalate"` \| `"reject"` | 除外適用後の最終判定 |
| `reason` | string | 判定理由（人間可読） |
| `reason_conditions` | string[] | 違反条件 ID（例: `"lines_max_exceeded"`, `"gate_build_failed"`）。auto_apply 時は空 |

### Eval Report JSON（`guardrail eval --output`）

| Name | Type | Description |
| --- | --- | --- |
| `change_id` | string | 変更セット識別子 |
| `expected_verdict` | `"auto_apply"` \| `"escalate"` \| `"reject"` | 期待される判定（REQ-4） |
| `actual_verdict` | `"auto_apply"` \| `"escalate"` \| `"reject"` | 実際の判定 |
| `correct` | bool | `expected == actual` |
| `known_blind_spot` | bool | 既知の限界（モデルアーキテクチャ変更・許容誤差緩和など） |
| `total_count` | u64 | 評価件数（集計） |
| `miss_rate_pct` | number | false negative rate（集計） |
| `false_positive_rate_pct` | number | false positive rate（集計） |
| `miss_rate_ok` | bool | 0% 達成（集計） |
| `false_positive_rate_ok` | bool | ≤30% 達成（集計） |

## Notes

- `guardrail.toml` / `policy-exclusion.toml` は `deny_unknown_fields` を適用（ユーザー承認済み設定のため、除外ルール ID の typo を早期に型エラー化）。`--signals` / `--dataset`（一時的な入力データ）は必須フィールドのみ検証し前方互換を許容する
- しきい値・除外ルールの変更は committed config の編集のみで行い、CLI 引数単体では変更できない
- 出力 JSON はシェル展開や文字列連結を避け `serde_json` でエスケープする（インジェクション対策）

## Related

- [guardrail](./guardrail.md)
- [self-repair](./self-repair.md)
