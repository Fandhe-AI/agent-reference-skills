---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/parallel_search.rs
---

# parallel-search

マルチスレッド並列の総当たり Top-k `SearchProvider` 実装（TASK-126）。行範囲分割による並列化のみを行い、ベクトル化（SIMD）演算は `kernel.rs::dot` を共有して行う。

## Signature / Usage

```rust
/// クエリ 1 件あたりのスレッド数上限（CORE-3 の並列度の趣旨に対応）。
pub(crate) const MAX_THREADS_PER_QUERY: usize = 16;

/// [`GLOBAL_WORKER_BUDGET`] から `desired` 件までの追加ワーカー枠を確保し、
/// 確保できた件数を返す `RAII` ガード。`Drop` で必ず解放するため、途中の
/// アーリーリターン・ワーカー panic でも予算がリークしない。
pub(crate) struct WorkerBudgetGuard(usize);

impl WorkerBudgetGuard {
    pub(crate) fn acquire(desired: usize) -> Self;
    pub(crate) fn granted(&self) -> usize;
}

/// マルチスレッド並列の総当たり Top-k provider（TASK-126）。総当たり
/// （exhaustive）である点は [`crate::kernel::CpuScalarProvider`] と同じで、
/// 近似検索ではない。内積計算は `kernel.rs::dot` を共有するため、選出される
/// Top-k 集合・順序（同点タイブレーク含む）はスコア値も含めてスカラー参照
/// 実装と bit 単位で一致する。
#[derive(Debug, Default, Clone, Copy)]
pub struct ParallelSearchProvider;

impl SearchProvider for ParallelSearchProvider {
    fn search(&self, input: SearchInput<'_>) -> Result<Vec<CandidateHit>, KernelError>;
    fn search_subset(
        &self,
        input: SubsetSearchInput<'_>,
    ) -> Result<Vec<CandidateHit>, KernelError>;
}

/// 利用可能な並列度を [`MAX_THREADS_PER_QUERY`] でクランプし、担当行数が
/// `MIN_ROWS_PER_THREAD` を割り込まない範囲に収める。
pub(crate) fn thread_count_for(row_count: usize) -> usize;

/// [`ParallelSearchProvider::search`] が `row_count` 件のテーブルに対して
/// 実際に起動しようとするワーカースレッド数（[`WorkerBudgetGuard`] による
/// 同時実行クエリ間の縮退は考慮しない上限値）を呼び出し元へ公開する。
pub fn expected_thread_count(row_count: usize) -> usize;
```

## Notes

- `ParallelSearchProvider` は `kernel.rs::CpuScalarProvider` と bit 単位で同じ結果を返す（テスト `crates/engine/tests/parallel_search.rs` で検証）。並列化は行範囲分割のみで SIMD ベクトル化は行わず、内積カーネル自体は `isa.rs` の実行時検出結果（`kernel.rs::dot`）に委譲する。
- `WorkerBudgetGuard` は RAII で解放を保証し、プロセス全体でワーカースレッド予算をカウンタ管理する（同時実行クエリ間の調停）。
- `KernelError::WorkerPanicked`（`kernel.md` 参照）は本モジュールのワーカースレッド panic 時に返され、部分結果を欠いたまま `Ok` を返す fail-open を避けるための設計（Issue #34 レビュー指摘対応）。

## Related

- [kernel](./kernel.md)
- [isa](./isa.md)
