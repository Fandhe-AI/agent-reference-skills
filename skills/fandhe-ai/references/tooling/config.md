---
source: https://raw.githubusercontent.com/Fandhe-AI/fandhe-ai/v0.14.0/docs/guardrail-self-repair-cli.md, https://raw.githubusercontent.com/Fandhe-AI/fandhe-ai/v0.14.0/crates/guardrail/src/cli.rs
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

`--preset` は `strict` / `default` / `loose` の 3 段階（既定値 `"default"`）。`PresetName::parse` がこれ以外の値を usage エラー（exit code `2`）で拒否する。`guardrail.toml` はテーブル `[preset.<name>]` に `lines_max` / `bench_median_max_pct` / `bench_runs_min` の 3 キーだけを書け（未知キーは拒否）、該当プリセットのテーブルが無ければ組み込み既定値を使う。設定ファイルの解決順は `--config` → `--repo` 直下の `guardrail.toml` → 組み込み既定値。

### 組み込みプリセット

| Preset | `lines_max` | `bench_median_max_pct` | `bench_runs_min` |
| --- | --- | --- | --- |
| `strict` | `100` | `2.5` | `5` |
| `default` | `200` | `5.0` | `5` |
| `loose` | `400` | `10.0` | `5` |

`bench_runs_min` が 5 未満、`lines_max` が 0、`bench_median_max_pct` が負または非有限の設定は値域検証で拒否される。

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

- Corrected from the previous version of this page: `--preset` is validated (strict / default / loose only) by `PresetName::parse` in `crates/guardrail/src/config.rs`; the built-in preset values above are from `Thresholds::builtin` (v0.14.0; the crate is unchanged from v0.11.0)
- Source: https://raw.githubusercontent.com/Fandhe-AI/fandhe-ai/v0.14.0/crates/guardrail/src/config.rs（v0.14.0, 取得日 2026-11-14）

## Related

- [guardrail](./guardrail.md)
- [self-repair](./self-repair.md)
