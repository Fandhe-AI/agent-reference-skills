---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/kernel.rs
---

# kernel

engine crate の検索カーネル境界（`SearchProvider` trait）と、CPU 参照実装 `CpuScalarProvider` を定義するモジュール（CORE-13）。`SearchProvider` は object-safe（ジェネリクスなし・`&self` メソッドのみ）を維持し、`core.rs` から `Box<dyn SearchProvider>` として保持される。

## Signature / Usage

```rust
/// **候補**検索結果 1 件（候補識別子とスコア）。[`SearchProvider`] の戻り値型。
#[derive(Debug, Clone, Copy, PartialEq)]
pub struct CandidateHit {
    pub id: u64,
    pub score: f32,
}

/// 検索結果 1 件（**行を一意に解決できる**テナント修飾済みのヒット）。
/// 対象ビヘイビア: TABLE-12・RLS-9。
#[derive(Debug, Clone, PartialEq)]
pub struct SearchHit {
    /// ヒットした行が属するテナント（サーバー側で保持している行の帰属）。
    pub tenant_id: String,
    /// ヒットした行の `id`（テナント内で一意。TABLE-12）。
    pub id: u64,
    /// 内積スコア。値が大きいほど上位。
    pub score: f32,
}

impl SearchHit {
    /// テナント修飾済みヒットを構築する。
    pub fn new(tenant_id: impl Into<String>, id: u64, score: f32) -> Self;
}

/// [`SearchProvider::search`] が返すエラー。
#[derive(Debug, Clone, PartialEq)]
pub enum KernelError {
    /// クエリベクトルの次元がアリーナの次元と一致しない。
    DimMismatch { expected: u32, found: usize },
    /// クエリベクトルの要素に非有限値（NaN・Inf）が含まれる（fail-closed）。
    NonFiniteQuery,
    /// `parallel_search.rs::ParallelSearchProvider` の並列ワーカースレッドが panic した。
    WorkerPanicked,
}

pub struct SearchInput<'a> {
    /// 呼び出し元が定義する識別子（行 `id` とは限らない）。
    pub ids: &'a [u64],
    /// `ids.len() * dim` 要素のフラット化済みベクトル。
    pub vectors: &'a [f32],
    pub dim: u32,
    pub query: &'a [f32],
    pub k: usize,
}

/// [`SearchProvider::search_subset`] の入力ビュー（Issue #654）。
pub struct SubsetSearchInput<'a> {
    /// `vectors` の行番号（`0..rows`）。呼び出し元契約として狭義昇順・重複なし。
    pub slots: &'a [u32],
    /// `rows * dim` 要素のフラット行列（可視行のみを含む）。
    pub vectors: &'a [f32],
    pub dim: u32,
    pub query: &'a [f32],
    pub k: usize,
}

/// コアが依存する検索バックエンドの窓口（CORE-13）。
pub trait SearchProvider: Send + Sync {
    fn search(&self, input: SearchInput<'_>) -> Result<Vec<CandidateHit>, KernelError>;

    /// 既定実装は `slots` の行を一時バッファへ gather してから `search` へ委譲する。
    fn search_subset(
        &self,
        input: SubsetSearchInput<'_>,
    ) -> Result<Vec<CandidateHit>, KernelError> { /* ... */ }
}

/// 既定の CPU-only 参照実装。内積スコアでの総当たり Top-k（`O(n log k)`、
/// `BinaryHeap` による部分ソート）を単一スレッドで行う。
#[derive(Debug, Default, Clone, Copy)]
pub struct CpuScalarProvider;

impl SearchProvider for CpuScalarProvider {
    fn search(&self, input: SearchInput<'_>) -> Result<Vec<CandidateHit>, KernelError>;
    fn search_subset(
        &self,
        input: SubsetSearchInput<'_>,
    ) -> Result<Vec<CandidateHit>, KernelError>;
}

/// 内積（dot product）。実体は `isa.rs::current().dot`（TASK-156・CORE-14）へ委譲する。
pub(crate) fn dot(a: &[f32], b: &[f32]) -> f32;

/// 4 行 × 1 クエリの内積（`dot` の行ブロック版。Issue #510・TASK-156・CORE-14）。
pub(crate) fn dot_block4(rows: [&[f32]; 4], query: &[f32]) -> [f32; 4];
```

## Notes

- `dot` / `dot_block4` は `pub(crate)`（crate 外には非公開）。`parallel_search.rs` / `batch_search.rs` / `rls.rs` からも共有され、加算順序を分岐させないことで `ParallelSearchProvider` 等との Top-k 集合・順序の丸め誤差食い違いを構造的に防ぐ（Issue #34 レビュー指摘対応）。
- `SearchHit::tenant_id` は「そのヒットの行が属するテナント」であり、検索した `PolicyContext` のテナントとは限らない（他テナントの `Public` 行が可視な場合がある）。
- `SearchInput::ids` / `SubsetSearchInput::slots` の意味付け（行 `id` かスロット番号か）は呼び出し元（`core.rs::EngineCore::search` は行 `id`、`sql::exec` は候補アリーナのスロット番号）に依存する。
- This crate implements its own CPU-SIMD dispatch (`isa.rs`) and wgpu-based GPU compute (`gpu_batch.rs`); it is unrelated to CUDA C++/PTX/CUTLASS (`nvidia-cuda`), MSL/MPS/MLX (`apple-silicon`), or HIP (`amd-rocm`). No API overlap with `fandhe-ai` (same org, separate Rust AI/ML library).

## Related

- [isa](./isa.md)
- [parallel-search](./parallel-search.md)
- [dispatch](./dispatch.md)
