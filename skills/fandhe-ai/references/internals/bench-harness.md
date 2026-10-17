---
source: https://raw.githubusercontent.com/Fandhe-AI/fandhe-ai/v0.11.0/crates/bench-harness/src/lib.rs
---

# bench-harness

CPU/CUDA/Metal 各バックエンドの性能計測・回帰検出を担うベンチマーク基盤。未公開クレート（crates.io 未リリース。0.11.0 時点でも未公開のまま）。

- crate 名: `bench-harness`（`crates/bench-harness`。GitHub `Fandhe-AI/fandhe-ai` の `v0.11.0` タグのソースから直接読む）
- 実機（DGX Spark GB10・Metal 実機）依存のベンチは `#[ignore]` で分離。ベンチ本体は `criterion`（`dev-dependencies` 限定）

## Signature / Usage

```rust
// lib.rs の公開モジュール（抜粋）
pub mod ab;
pub mod alloc_tracker;
pub mod env_guard;
pub mod peak_memory;
pub mod rng;
pub mod startup;
pub mod sync;
pub mod transformer_workload;

pub use protocol::{Measurement, MeasurementConfig, run};
pub use report::{BenchReport, SCHEMA_VERSION};
pub use rounding::{RoundingError, floor_lower_bound};
pub use stats::{
    BenchError, Quartiles, iqr_over_median, mad2_over_median, median_q1_q3, relative_spread,
    trimmed_relative_spread,
};
pub use threshold::{
    BackendDtype, FloorJudgment, FloorSpec, Stage, THRESHOLD_SCHEMA_VERSION, Verdict, floor_spec,
    judge,
};
```

## Options / Props

| Module | Description |
| --- | --- |
| `protocol` | 計測プロトコル。warmup 20 回以上・計測 20 回以上・中央値採用・Q1/Q3 記録（`MeasurementConfig::MIN_ITERATIONS = 20`） |
| `stats` | 分位点計算などの純粋関数（`median_q1_q3`, `relative_spread`。0.11.0 で補助 spread 統計量 `trimmed_relative_spread` / `iqr_over_median` / `mad2_over_median` が追加。判定には使わずレポート項目として併記する） |
| `env_guard` | ベンチ実行環境の前提条件ガード。不成立時に待機して再判定するバックオフ再試行（`RetryConfig` / `run_guard_with_retry`。上限到達時は `BenchError::EnvGuardExhausted` で fail-closed に中断）と、`env_info.txt` 準拠のテキストブロック生成（`format_env_info_text`、I/O なしの純粋関数）。0.3.0 には無かった |
| `rng` | 決定的シードの自作 PRNG（xorshift64*）。ベンチ入力・回帰テストの再現性を担保 |
| `sync` | バックエンド間で統一する同期方式の契約と 3 バックエンド実装（ホスト転送を伴わない完了待ちへの統一） |
| `report` | `Measurement` を JSON へ構造化出力する `BenchReport`（`serde` 対応） |
| `threshold` | REQ-8 段階的下限表（バックエンド×dtype×段階）のデータ化と自動合否判定（`judge`） |
| `rounding` | 性能下限の丸め規則（実測比率 10% 以上は 5% 刻み、10% 未満は 1% 刻み）を提供する純粋関数 `floor_lower_bound` |
| `startup` | プロセス起動〜初回カーネル完了までのコストをコールド/ウォーム双方で計測するハーネス（`run_phase`） |
| `peak_memory` | `tensor-core::memory_stats` を用いた GEMM（M=N=K=4096, f32）のピークメモリ計測ハーネス（`run_peak_memory`） |
| `transformer_workload` | Transformer 複合ワークロードの形状・決定的シードを単一真実源化（`TransformerWorkloadSpec`, `baseline_spec()`） |

## Notes

- 公式が非サポートと明言する内部 crate。アプリケーションからは `fandhe-ai` 公開 API を使う
- 未公開クレート（crates.io に未リリース）のため、docs.rs ではなく GitHub raw ソース（`v0.11.0` タグの `crates/bench-harness/src/lib.rs`）を出典とする
- ソースコード内コメントには既知の不一致が明記されている: リポジトリ内の別ルールファイルは「ベンチは 5 回計測の中央値」と記載するが、正本仕様は warmup/計測とも 20 回以上を定めており、本クレートは正本の 20/20 に従う
- `guardrail` / `self-repair` クレートは本クレートの `BenchReport`（serde 対応の公開型・JSON 入出力）を参照する想定だが、実際の配線は別イシューのスコープで本クレート自体には変更がない（依存方向: `guardrail` → `bench-harness`）
- `threshold` の判定対象は GEMM 単体の REQ-8 下限表のみで、`transformer_workload` の値は判定対象に含まれない

## Related

- [onnx-interop](./onnx-interop.md)
