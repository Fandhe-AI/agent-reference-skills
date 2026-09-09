---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/batch_fallback.rs
---

# batch-fallback

バッチ検索の実行バックエンド窓口（`BatchBackend` trait）と、primary バックエンド（GPU）実行時エラーから CPU-SIMD 縮退経路へ切り替える `FallbackBatchEngine`（CORE-8 ポインタ）。

## Signature / Usage

```rust
/// primary バックエンドの実行時エラー種別（CORE-8 ポインタ）。GPU デバイス
/// 初期化失敗と実行時エラー（デバイスロスト・カーネル起動失敗・転送失敗）を
/// 区別する。
#[derive(Debug, Clone, PartialEq)]
pub enum BatchBackendError {
    InitFailed(String),
    DeviceLost(String),
    KernelLaunchFailed(String),
    TransferFailed(String),
}
impl fmt::Display for BatchBackendError { /* ... */ }
impl std::error::Error for BatchBackendError { /* ... */ }

/// [`BatchBackend::batch_search`] のエラー。入力検証エラー（fail-closed で
/// そのままクライアントへ返す）とバックエンド実行エラー（縮退トリガ）を
/// 型で峻別する（TASK-129 設計の要）。
#[derive(Debug, Clone, PartialEq)]
pub enum BatchExecError {
    Input(BatchSearchError),
    Backend(BatchBackendError),
}
impl fmt::Display for BatchExecError { /* ... */ }
impl std::error::Error for BatchExecError { /* ... */ }

/// バッチ検索の実行バックエンド窓口（CORE-8 ポインタ）。object-safe
/// （`&self` メソッドのみ・ジェネリクスなし）を維持し、[`FallbackBatchEngine`]
/// が `Box<dyn BatchBackend>` として保持できることを前提にする。
pub trait BatchBackend: Send + Sync {
    fn batch_search(&self, queries: &[BatchQuery<'_>]) -> Result<Vec<BatchHit>, BatchExecError>;
}

/// 既存 `BatchEngine`（f16 パック常駐行列を走査する GPU 経路の CPU 参照実装）
/// を primary バックエンドとして適合させるラッパー。ランタイムエラーが自発的に
/// 発生することはない（CPU 上で決定的に計算するため）。
pub struct GpuReferenceBackend {
    engine: BatchEngine,
}
impl GpuReferenceBackend {
    pub fn new(matrix: ResidentMatrix) -> Self;
}
impl BatchBackend for GpuReferenceBackend {
    fn batch_search(&self, queries: &[BatchQuery<'_>]) -> Result<Vec<BatchHit>, BatchExecError>;
}

/// 縮退の要因種別（ログ可視化用。CORE-8 ポインタ）。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum FallbackReason {
    Init,
    Runtime,
}
impl fmt::Display for FallbackReason { /* ... */ }

/// 縮退イベント 1 件（CORE-8 ポインタ）。テナント ID・クエリ内容は含めない
/// （security.md「機微情報の漏えい」対応）。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct FallbackEvent {
    pub reason: FallbackReason,
    pub target: &'static str,
}
impl fmt::Display for FallbackEvent { /* ... */ }

/// 縮退発生の可視化フック（CORE-8 ポインタ:「黙って性能劣化しない」契約）。
/// engine には log/tracing 系依存が存在しないため、依存追加なしの注入型
/// オブザーバとして設計する。
pub trait FallbackObserver: Send + Sync {
    fn on_fallback(&self, event: FallbackEvent);
}

/// 既定の縮退オブザーバ。stderr へ英語 1 行を出力する。
#[derive(Debug, Default, Clone, Copy)]
pub struct StderrFallbackObserver;
impl FallbackObserver for StderrFallbackObserver {
    fn on_fallback(&self, event: FallbackEvent);
}

/// バッチ経路の新しい公開入口（CORE-8 ポインタ）。primary バックエンド
/// （通常は [`GpuReferenceBackend`]）を実行し、バックエンド実行エラー
/// （[`BatchExecError::Backend`]）の場合のみ CPU-SIMD 縮退経路
/// （`batch_search.rs::run_batch_search` を CPU 縮退用行列で呼ぶ）へ再実行する。
/// 実行時エラーは GPU デバイスの恒久故障を示すことが多いため、初回検知時に
/// `runtime_latched` をラッチし、以降の呼び出しは primary を再試行せず直接
/// CPU 経路を使う。入力検証エラー（[`BatchExecError::Input`]）は縮退させず
/// fail-closed に `Err` をそのまま返す。
pub struct FallbackBatchEngine {
    primary: PrimarySlot,
    runtime_latched: std::sync::atomic::AtomicBool,
    cpu: CpuFallbackMatrix,
    observer: Box<dyn FallbackObserver>,
}

impl FallbackBatchEngine {
    /// 元データ（可視性フィルタ済みの行集合）から primary バックエンドと
    /// CPU 縮退用の f32 常駐行列を構築する。
    pub fn build(
        ids: &[u64],
        tenant_ids: &[String],
        visibilities: &[Visibility],
        dim: usize,
        vectors: &[f32],
        backend_factory: impl FnOnce(ResidentMatrix) -> Result<Box<dyn BatchBackend>, BatchBackendError>,
        observer: Box<dyn FallbackObserver>,
    ) -> Result<Self, BatchSearchError>;

    /// [`GpuReferenceBackend`] を primary として使う既定コンストラクタ。実 GPU
    /// 未接続の段階では常に初期化成功する。
    pub fn build_with_gpu_reference(
        ids: &[u64],
        tenant_ids: &[String],
        visibilities: &[Visibility],
        dim: usize,
        vectors: &[f32],
        observer: Box<dyn FallbackObserver>,
    ) -> Result<Self, BatchSearchError>;

    /// 実 GPU（`gpu_batch.rs::GpuBatchBackend`。`wgpu`）を primary として使う
    /// コンストラクタ。GPU デバイスの初期化に失敗した場合は panic せず縮退
    /// イベントを 1 件通知して CPU 専用モードで構築が成立する。`wgpu` 依存は
    /// オーナー承認済み（2026-08-26）。
    pub fn build_with_gpu(
        ids: &[u64],
        tenant_ids: &[String],
        visibilities: &[Visibility],
        dim: usize,
        vectors: &[f32],
        observer: Box<dyn FallbackObserver>,
    ) -> Result<Self, BatchSearchError>;

    /// バッチ検索を実行する（CORE-8 ポインタ）。
    pub fn batch_search(
        &self,
        queries: &[BatchQuery<'_>],
    ) -> Result<Vec<BatchHit>, BatchSearchError>;
}
```

## Notes

- 「黙って性能劣化しない」契約（CORE-8）: GPU から CPU 縮退への切り替えは必ず `FallbackObserver::on_fallback` 経由で 1 件のイベント通知を伴う。engine crate は log/tracing への依存を持たないため、依存追加なしの注入型オブザーバとして設計されている。
- `runtime_latched` は初回のランタイムエラー検知後、以降の呼び出しで primary（GPU）を再試行せず直接 CPU 経路を使うためのラッチ。GPU デバイスの恒久故障（デバイスロスト等）を想定した設計であり、無制限の再試行コスト・stderr 出力を防ぐ。
- 入力検証エラー（`BatchExecError::Input`）とバックエンド実行エラー（`BatchExecError::Backend`）を型レベルで峻別するのは、不正入力を縮退で握りつぶさないため（fail-closed の要）。
- This crate's GPU fallback is a CPU-SIMD degrade path within the same Rust engine, not a driver/runtime-level failover as found in CUDA (`nvidia-cuda`) or ROCm/HIP (`amd-rocm`) ecosystems.

## Related

- [gpu-batch](./gpu-batch.md)
- [batch-search](./batch-search.md)
- [dispatch](./dispatch.md)
