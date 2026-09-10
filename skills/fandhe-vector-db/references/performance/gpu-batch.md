---
source: https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/crates/engine/src/gpu_batch.rs
---

# gpu-batch

バッチ検索の実 GPU バックエンド（TASK-128〜130・対象ビヘイビア: CORE-6, 8, 16。ポインタ: Issue #178）。`batch_fallback.rs::BatchBackend` の公開差し替え点へ差し込む実装で、`wgpu`（`=30.0.1`）を通じて Vulkan/Metal/DX12 の compute パイプラインを扱う。`batch_search.rs::ResidentMatrix`（f16 2 要素/u32 パック常駐行列）が保持する `packed()` バッファを GPU の STORAGE バッファへアップロードし、行 × クエリの内積計算だけを GPU 側で行う。子モジュール `gpu_batch/packed_i8.rs`（i8 パック常駐・GPU i8 バックエンド）を含む。

## Signature / Usage

```rust
//! バッチ検索の実 GPU バックエンド（TASK-128〜130・対象ビヘイビア: CORE-6, 8,
//! 16。ポインタ: Issue #178）。
//!
//! `batch_fallback.rs::BatchBackend` の公開差し替え点へ差し込む実装で、
//! `wgpu`（=30.0.1・依存追加はオーナー承認済み〔2026-08-26〕。`crates/engine/Cargo.toml`
//! コメント参照）を通じて Vulkan/Metal/DX12 の compute パイプラインを扱う。
//! `batch_search.rs::ResidentMatrix`（f16 2 要素/u32 パック常駐行列）が保持する
//! `packed()` バッファを GPU の STORAGE バッファへアップロードし、行 × クエリの
//! 内積計算だけを GPU 側で行う。

pub mod packed_i8;

/// dispatch する S0（内積）シェーダの種別（Issue #539）。`Unpack` は既存の
/// `unpack2x16float` 経由 f32 積和、`F16Arith` は `SHADER_F16` 対応アダプタ
/// でのみ選ばれる f16 パック常駐版（行・クエリとも読み出した `vec2<f16>` を
/// 直後に `vec2<f32>` へ拡張してから積和するため算術自体は `Unpack` と
/// 同じく f32 で行う。常駐・転送表現のみが f16 パックの点が異なる）。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum GpuDotShaderKind {
    Unpack,
    F16Arith,
}

/// [`GpuBatchStats`] の外部公開スナップショット（`stats()` の戻り値）。
#[derive(Debug, Clone, Copy, Default, PartialEq, Eq)]
pub struct GpuBatchStatsSnapshot {
    pub partial_topk_dispatches: u64,
    pub full_readback_dispatches: u64,
    pub full_readback_fallbacks: u64,
    pub readback_bytes: u64,
    pub f16_arith_dispatches: u64,
    pub f16_arith_guard_fallbacks: u64,
}

/// 実 GPU バックエンド（TASK-128〜130。CORE-6, 8, 16 ポインタ）。
/// [`crate::batch_fallback::BatchBackend`] の実装として
/// [`crate::batch_fallback::FallbackBatchEngine::build_with_gpu`] から
/// primary として差し込まれる。
pub struct GpuBatchBackend { /* private fields: matrix, row_buffer, device_lost,
    uncaptured_error, stats, row_max_abs */ }

impl GpuBatchBackend {
    /// 常駐行列から GPU バックエンドを構築する。GPU デバイスの初期化は
    /// プロセス内で 1 回だけ行われ、以降の呼び出しはキャッシュされた結果
    /// （成功・失敗いずれも）を使う。シグネチャは
    /// `batch_fallback.rs::FallbackBatchEngine::build` の `backend_factory`
    /// 引数（`FnOnce(ResidentMatrix) -> Result<Box<dyn BatchBackend>,
    /// BatchBackendError>`）にそのまま渡せる形にする。
    pub fn try_new(matrix: crate::batch_search::ResidentMatrix) -> Result<Self, BatchBackendError>;

    /// `SHADER_F16` 対応アダプタでこのプロセスの GPU 経路が f16 算術版
    /// シェーダを使えるかどうか（Issue #539）。テナント・行数などの情報は
    /// 含まない、GPU 初期化結果のみに依存する情報提供専用の問い合わせ。
    pub fn f16_arith_available(&self) -> bool;

    /// readback 方式別の dispatch 回数・バイト数のスナップショット
    /// （Issue #536。#537 の前後比較・非 vacuous 判定が読む）。
    pub fn stats(&self) -> GpuBatchStatsSnapshot;

    /// **テスト・ベンチ専用**。任意のスコアバッファ予算を注入し、既定
    /// （32MiB）では通常のデバイス上で発生しない行チャンク分割を実 GPU
    /// dispatch 経由で強制的に発生させる（Issue #532 codex-review P2 指摘
    /// 対応）。非既定 feature `bench-internals` でのみ公開する。既定ビルド・
    /// `wire-server` からは到達不能で、テナント境界・RLS 迂回 API は一切
    /// 露出しない。
    #[cfg(feature = "bench-internals")]
    pub fn batch_search_with_row_budget_for_tests(
        &self,
        queries: &[BatchQuery<'_>],
        budget_bytes: usize,
    ) -> Result<Vec<BatchHit>, BatchExecError>;

    /// **テスト・ベンチ専用**（Issue #536）。[`GpuSearchTestOptions`] 経由で
    /// 「常に全量 readback 経路を使う」強制フラグを注入し、既定経路
    /// （workgroup 内部分 Top-k）と全量 readback 経路の結果が実 GPU dispatch
    /// 経由でビット同一であることを結合テストから検証できるようにする。
    #[cfg(feature = "bench-internals")]
    pub fn batch_search_with_options_for_tests(
        &self,
        queries: &[BatchQuery<'_>],
        options: GpuSearchTestOptions,
    ) -> Result<Vec<BatchHit>, BatchExecError>;
}

impl BatchBackend for GpuBatchBackend {
    fn batch_search(&self, queries: &[BatchQuery<'_>]) -> Result<Vec<BatchHit>, BatchExecError>;
}

/// [`GpuBatchBackend::batch_search_with_options_for_tests`] へ渡すオプション
/// （`bench-internals` feature 限定。Issue #536・#539）。
#[cfg(feature = "bench-internals")]
#[derive(Debug, Clone, Copy)]
pub struct GpuSearchTestOptions {
    pub budget_bytes: usize,
    pub force_full_readback: bool,
    /// S0 シェーダ選択の強制オーバーライド（Issue #539）。`None` は既定の
    /// 自動選択。`Some(Unpack)` は常に unpack 版を強制する。`Some(F16Arith)`
    /// は f16 算術版が利用不能、またはオーバーフローガード不成立の場合
    /// `Err(KernelLaunchFailed)` を返し、黙って unpack 版へ縮退しない
    /// （fail-closed 分岐の検証用）。
    pub dot_shader: Option<GpuDotShaderKind>,
}

/// CORE-16（GPU 常駐コピーの f16 パック vs f32 常駐の A/B 対照経路と受け入れ
/// 判定。Issue #234）の**対照（bench/テスト専用）**バックエンド。
/// [`GpuBatchBackend`] が保持する f16 2 要素/u32 パック常駐に対し、本
/// バックエンドは元の f32 ベクトル列をそのまま GPU の STORAGE バッファへ
/// 常駐させ、`unpack2x16float` を経由しない f32 精度の内積を計算する。
/// `FallbackBatchEngine::build_with_gpu` の primary backend 選択には
/// 接続しない（CORE-12「経路を外部から上書きする機構を設けない」と整合）。
pub struct GpuF32ContrastBackend { /* private fields */ }

impl GpuF32ContrastBackend {
    /// 元データから f32 常駐対照バックエンドを構築する。GPU バッファへは
    /// 引数で渡された元の f32 ベクトル列をそのままアップロードする。
    pub fn try_new(
        ids: &[u64],
        tenant_ids: &[String],
        visibilities: &[crate::storage::Visibility],
        dim: usize,
        vectors: &[f32],
    ) -> Result<Self, BatchBackendError>;

    /// [`GpuBatchBackend::stats`] と同じ役割（Issue #536）。
    pub fn stats(&self) -> GpuBatchStatsSnapshot;

    #[cfg(feature = "bench-internals")]
    pub fn batch_search_with_options_for_tests(
        &self,
        queries: &[BatchQuery<'_>],
        options: GpuSearchTestOptions,
    ) -> Result<Vec<BatchHit>, BatchExecError>;
}

impl BatchBackend for GpuF32ContrastBackend {
    fn batch_search(&self, queries: &[BatchQuery<'_>]) -> Result<Vec<BatchHit>, BatchExecError>;
}

// --- gpu_batch/packed_i8.rs（i8 パック常駐・GPU i8 バックエンド） ---
pub const DEFAULT_I8_OVERSAMPLE: usize = 4;
pub const MAX_I8_OVERSAMPLE: usize = 32;

#[derive(Debug, Clone, PartialEq)]
pub enum I8EncodeError {
    InvalidShape,
    NonFinite,
    AllocationFailed,
}
impl std::fmt::Display for I8EncodeError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result;
}

#[derive(Debug, Clone)]
pub struct Sq8RowScales {
    scales: Vec<f32>,
}
impl Sq8RowScales {
    pub fn row_count(&self) -> usize;
    pub fn scale(&self, row: usize) -> Option<f32>;
}

pub fn encode_rows(
    dim: usize,
    row_count: usize,
    vectors: &[f32],
) -> Result<(Sq8RowScales, Vec<u32>), I8EncodeError>;

pub fn quantize_query(query: &[f32]) -> Result<(f32, Vec<u32>), I8EncodeError>;

pub fn dot_i8_packed_ref(row: &[u32], query: &[u32]) -> i32;

#[derive(Debug, Clone, Copy)]
pub struct GpuI8Options {
    pub oversample: usize,
}
impl Default for GpuI8Options {
    fn default() -> Self;
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Dot4I8Impl {
    Native,
    Polyfill,
    Undetermined,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct GpuI8Meta {
    pub backend: wgpu::Backend,
    pub dot4_impl: Dot4I8Impl,
}

#[derive(Debug, Clone, Copy, Default, PartialEq, Eq)]
pub struct GpuI8BatchStatsSnapshot {
    pub dispatches: u64,
    pub readback_bytes: u64,
    pub rescored_candidates: u64,
}

pub struct GpuI8BatchBackend;

impl GpuI8BatchBackend {
    /// i8 パック常駐・`dot4I8Packed` シェーダによる opt-in 候補生成
    /// バックエンド（Issue #542・親 #541・Phase 5 親 #460）。本番 primary
    /// （`GpuBatchBackend`・`FallbackBatchEngine::build_with_gpu`）へは
    /// 接続せず、`GpuI8BatchBackend::try_new` からのみ明示構築する。
    pub fn try_new(
        matrix: ResidentMatrix,
        options: GpuI8Options,
    ) -> Result<Self, BatchBackendError>;
    pub fn stats(&self) -> GpuI8BatchStatsSnapshot;
    pub fn meta(&self) -> GpuI8Meta;
    #[cfg(feature = "bench-internals")]
    pub fn batch_search_raw_i32_for_tests(
        &self,
        queries: &[BatchQuery<'_>],
    ) -> Result<Vec<Vec<(u32, i32)>>, BatchExecError>;
}

impl BatchBackend for GpuI8BatchBackend {
    fn batch_search(&self, queries: &[BatchQuery<'_>]) -> Result<Vec<BatchHit>, BatchExecError>;
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `GpuSearchTestOptions.budget_bytes` | `usize` | テスト専用: スコアバッファ readback 予算のオーバーライド（`bench-internals` feature 限定） |
| `GpuSearchTestOptions.force_full_readback` | `bool` | テスト専用: 常に全量 readback 経路を強制するか |
| `GpuSearchTestOptions.dot_shader` | `Option<GpuDotShaderKind>` | テスト専用: S0 シェーダ選択の強制オーバーライド |
| `GpuI8Options.oversample` | `usize` | i8 候補生成時のオーバーサンプル係数（既定 `DEFAULT_I8_OVERSAMPLE = 4`、上限 `MAX_I8_OVERSAMPLE = 32`） |

## Notes

- `gpu-batch-wgpu-enablement`（ADR）: `wgpu` 採用理由は「Vulkan/Metal/DX12 の compute を単一 API で扱うため。各 GPU API を自作 FFI で叩くと依存最小方針に反して肥大化する」。
- `gpu-batch-topk`（ADR）: 全スコア読み戻しから、共有メモリ＋`workgroupBarrier` のみの bitonic 部分ソートによる部分 Top-k 選出への転換を決定。SUBGROUP 非対応時は全量読み戻しへ段階的に縮退させ、決定性・fail-closed・DoS 上限を維持する。本実装は ADR の「候補 B」（subgroup shuffle 併用）ではなく共有メモリのみの「候補 A」に統一している（naga 30.0.1 がバリア・subgroup builtin の一様性を検証しないための安全策。ソース内コメントに明記）。
- `gpu-batch-f16-arith`（ADR）: f16 対応 GPU アダプタで `vec2<f16>` 常駐・転送しつつ積和を f32 で実行するシェーダを選択可能にする。`select_dot_shader` が振幅上限・非有限・サブノーマルアンダーフロー・往復精度損失のいずれかを検知した場合は fail-closed に unpack 版へ縮退し、`PolicyContext` グループ単位で選択してテナント境界を維持する。
- `gpu-batch-i8-packed`（ADR）: 行単位対称 SQ8 量子化による i8 4 要素パック常駐（`dot4I8Packed` 整数内積）。テナント境界侵害を避けるため行スケールを独立に導出し、opt-in 専用バックエンド（`GpuI8BatchBackend`）で候補生成のみに限定し、最終スコアは f32 で再計算する。
- `gpu_batch::packed_i8` の `encode_rows` / `quantize_query` / `dot_i8_packed_ref`（`pub fn`、crate 外にも公開）は [sq8](./sq8.md)（`sq8.rs`、全アイテム `pub(crate)`）を呼び出すラッパーではない。`gpu_batch/packed_i8.rs` のモジュール冒頭コメントに明記の通り、共有 SQ8 モジュール化を狙った Issue #521 が実装当時 OPEN だったため、本サブモジュールは行単位対称量子化・4 要素/u32 パックを行う自前のエンコーダを独立実装している（`sq8.rs` は次元ごとスケールの CPU 内積経路、こちらは行単位スケールの GPU パック経路で量子化の粒度自体が異なる）。#521 が `sq8.rs` へ統合された場合はそちらへ委譲する計画（同ソースコメント）。
- `GpuBatchBackend` は本番 primary（`FallbackBatchEngine::build_with_gpu` から接続）、`GpuF32ContrastBackend` は CORE-16 の f16 vs f32 A/B 対照専用（本番経路には接続しない）、`GpuI8BatchBackend` は opt-in 専用の別経路（3 者とも本番 primary へ同時に接続することはない）。
- GPU 未接続・初期化失敗時の縮退経路は `batch-fallback.md` の `FallbackBatchEngine` が担う（本モジュールは primary バックエンドの実装のみを提供する）。
- This module uses `wgpu` (Vulkan/Metal/DX12 unified compute API) for GPU dispatch, which is unrelated to CUDA C++/PTX/CUTLASS (`nvidia-cuda`), Metal Shading Language/MPS/MLX native APIs (`apple-silicon`), or HIP (`amd-rocm`). No API overlap with `fandhe-ai`'s CUDA/Metal backends (same org, separate library).

## Related

- [batch-fallback](./batch-fallback.md)
- [batch-search](./batch-search.md)
- [dispatch](./dispatch.md)
- [sq8](./sq8.md)
