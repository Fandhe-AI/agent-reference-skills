---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/batch_search.rs
---

# batch-search

バッチクエリ・一括インデクシング専用の検索エンジン（TASK-128 ポインタ: CORE-6, CORE-7, CORE-16）。`kernel.rs::SearchProvider`（単発クエリの窓口）は実装せず、単発経路（`core.rs::EngineCore::search`）から本モジュールへは構造的に接続できない。f16 パック常駐行列を走査する CPU 参照実装（`BatchEngine`）を提供する。

## Signature / Usage

```rust
pub const MAX_BATCH_QUERIES: usize = 4_096;
/// 一括インデクシング対象の行数上限（防御的上限）。
pub const MAX_BATCH_ROWS: usize = 1_000_000;
/// クエリ・格納ベクトルの次元数上限（防御的上限）。
pub const MAX_BATCH_DIM: usize = 8_192;
/// [`ResidentMatrix::build`] が確保してよい総バイト量の上限。
pub const MAX_BATCH_TOTAL_BYTES: usize = 1024 * 1024 * 1024;
/// `BatchQuery::k` の許容上限（防御的上限）。
pub const MAX_BATCH_K: usize = 10_000;
/// バッチ全体で許容する `sum(k)`（各クエリの `k` の総和）の上限。
pub const MAX_BATCH_TOTAL_K: usize = MAX_BATCH_ROWS;
/// [`DynamicWindowAggregator`] が確保してよい総バイト量の上限。
pub const MAX_BATCH_AGGREGATOR_TOTAL_BYTES: usize = 1024 * 1024 * 1024;
/// `BatchEngine::batch_search` 1 回の走査で許容する総積和演算数の上限。
pub const MAX_BATCH_WORK: usize = 10_000_000_000;

/// バッチ検索エンジンのエラー（fail-closed）。
#[derive(Debug, Clone, PartialEq)]
pub enum BatchSearchError {
    TooManyQueries { count: usize, max: usize },
    TooManyRows { count: usize, max: usize },
    InvalidDim { dim: usize, max: usize },
    /// 行数・次元数はそれぞれ上限内でも、組み合わせた総確保バイト量が上限を超過。
    CapacityExceeded { total_bytes: usize, max: usize },
    DimMismatch { expected: usize, found: usize },
    NonFiniteQuery { query_index: usize },
    /// 常駐行列構築時、`ids`/`vectors`/可視性マスクの長さ不整合。
    ArenaLengthMismatch,
    /// 常駐行列構築時、**同一テナント内**で `id` に重複があった。
    DuplicateRowId,
    TenantIdTooLong { len: usize, max: usize },
    InvalidK { k: usize, max: usize },
    TotalKExceeded { total_k: usize, max: usize },
    WindowDimMismatch { expected: usize, found: usize },
    WorkBudgetExceeded { work: usize, max: usize },
    AllocationFailed(String),
    /// 結果がテナント別可視集合と食い違った。
    TenantMaskViolation,
    /// primary バックエンド出力が構造契約を満たさなかった。
    PrimaryResultRejected,
}
impl fmt::Display for BatchSearchError { fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result; }
impl std::error::Error for BatchSearchError {}

/// 2 要素の f32 を 1 個の u32 へ f16 パックする。
pub fn pack_f16x2(a: f32, b: f32) -> u32;
/// [`pack_f16x2`] の逆変換。
pub fn unpack_f16x2(packed: u32) -> (f32, f32);

/// 一括インデクシングで構築する常駐ベース行列。
#[derive(Debug)]
pub struct ResidentMatrix { /* ... */ }

impl ResidentMatrix {
    /// 可視性フィルタ済みの行集合から常駐行列を構築する。
    pub fn build(
        ids: &[u64],
        tenant_ids: &[String],
        visibilities: &[Visibility],
        dim: usize,
        vectors: &[f32],
    ) -> Result<Self, BatchSearchError>;

    pub fn row_count(&self) -> usize;
    pub fn dim(&self) -> usize;
}

/// 集約するか否かの判定。
pub fn should_aggregate_into_batch(pending_after_pop: bool) -> bool;

/// 動的窓での集約バッファ。
#[derive(Debug, Default)]
pub struct DynamicWindowAggregator { /* ... */ }

impl DynamicWindowAggregator {
    pub fn new() -> Self;
    /// クエリ 1 件を窓へ追加する。
    pub fn push(&mut self, query: Vec<f32>) -> Result<(), BatchSearchError>;
    pub fn len(&self) -> usize;
    pub fn is_empty(&self) -> bool;
    pub fn drain(&mut self) -> Vec<Vec<f32>>;
}

/// クエリ 1 件分のバッチ入力。
pub struct BatchQuery<'a> {
    pub vector: &'a [f32],
    pub k: usize,
    pub ctx: &'a PolicyContext,
}

/// `BatchEngine::batch_search` の 1 クエリ分の結果。
#[derive(Debug)]
pub struct BatchHit {
    pub hits: Vec<SearchHit>,
}

/// バッチクエリ・一括インデクシング専用のエンジン。
pub struct BatchEngine { /* ... */ }

impl BatchEngine {
    /// 常駐行列から構築する。
    pub fn new(matrix: ResidentMatrix) -> Self;
    /// バッチ検索を実行する。
    pub fn batch_search(
        &self,
        queries: &[BatchQuery<'_>],
    ) -> Result<Vec<BatchHit>, BatchSearchError>;
}
```

## Notes

- `BatchEngine` は `kernel.rs::SearchProvider` を実装せず、単発クエリ経路（`core.rs::EngineCore::search`）から構造的に切り離されている（バッチ専用の別経路）。
- `ResidentMatrix` は f16 パック（`pack_f16x2` / `unpack_f16x2`）された常駐行列で、`batch-fallback.md` の `GpuReferenceBackend`（`batch_fallback.rs` 定義）が `BatchEngine` を CPU 参照実装として再利用する。
- 全上限定数（`MAX_BATCH_*`）は fail-closed な防御的上限であり、私有 spec の判断値の転記ではなく本ソースの `pub const` をそのまま引用している。
- `BatchSearchError::TenantMaskViolation` / `PrimaryResultRejected` は GPU バックエンドの出力検証（`batch-fallback.md` 参照）で使われるエラー種別。

## Related

- [batch-fallback](./batch-fallback.md)
- [gpu-batch](./gpu-batch.md)
- [batch-limits](./batch-limits.md)
