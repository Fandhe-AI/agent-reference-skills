---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/dispatch.rs
---

# dispatch

CPU-SIMD 経路と GPU 経路のどちらで検索を実行するかを決める、副作用なしの決定表（TASK-155・対象ビヘイビア: CORE-6, 7, 8, 11, 12）。

## Signature / Usage

```rust
pub use crate::isa::DetectedIsa;

pub fn detect_current_isa() -> DetectedIsa;

/// GPU バックエンドが実際に利用可能であることを証明する sealed capability トークン
/// （CORE-12: 未検証の GPU capability を外部から構築させない）。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct GpuCapability(());

impl GpuCapability {
    /// 呼び出し元が実際に構築成功した GPU backend（`&dyn`
    /// [`crate::batch_fallback::BatchBackend`]）を提示した場合にのみ呼べる。
    /// `pub(crate)` だが、検証済み backend への参照を渡せない限り値を作れない
    /// ため、未検証の capability を経路選択へ持ち込む経路は構造的にない
    /// （CORE-12。codex-review P1 指摘対応・PR #158）。`_verified_backend` は
    /// 値そのものを使わない（存在の証明としてのみ使う witness 引数）。
    pub(crate) fn proven(_verified_backend: &dyn crate::batch_fallback::BatchBackend) -> Self;
}

pub enum QueryDtype {
    F32,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum SimdWidth {
    Scalar,
    W128,
    W256,
    W512,
}

/// 決定表が確定させる実行経路。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ExecutionPath {
    /// CPU-SIMD 経路。`width` は [`DetectedIsa`] に対応する実行幅。
    CpuSimd { width: SimdWidth },
    /// GPU 経路（`batch_search.rs::BatchEngine` の f16 パック常駐行列参照実装、
    /// または `batch_fallback.rs::BatchBackend` を実装する GPU バックエンド）。
    Gpu,
}

/// [`DispatchInput`] の `dim` 検証に使う上限の文脈（単発クエリ経路とバッチ経路で異なる）。
pub const SINGLE_QUERY_MAX_DIM: usize = crate::storage::MAX_EMBEDDING_DIM as usize;

/// [`select_execution_path`] への入力。すべて値渡しで、参照透過性
/// （同一入力→同一出力）を保つ（グローバル状態・環境変数・ファイル・時刻を
/// 一切参照しない。CORE-12）。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct DispatchInput {
    gpu: Option<GpuCapability>,
    isa: DetectedIsa,
    dim: usize,
    dim_limit: DimLimit,
    batch_size: usize,
    dtype: QueryDtype,
    pending_after_pop: bool,
}

impl DispatchInput {
    pub fn for_single_query(dim: usize, pending_after_pop: bool) -> Result<Self, DispatchError>;
    pub fn for_batch(
        gpu: Option<GpuCapability>,
        dim: usize,
        batch_size: usize,
    ) -> Result<Self, DispatchError>;
}

/// [`DispatchInput`] のコンストラクタが返すエラー。fail-closed。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum DispatchError {
    /// `dim` が 0、または文脈上限（単発: `storage::MAX_EMBEDDING_DIM`、
    /// バッチ: `batch_search::MAX_BATCH_DIM`）を超過。
    InvalidDim { dim: usize, max: usize },
    /// `batch_size` が 0、または `batch_search::MAX_BATCH_QUERIES` を超過。
    InvalidBatchSize { batch_size: usize, max: usize },
}

/// 実行経路選択の決定表本体（TASK-155・対象ビヘイビア: CORE-6, 7, 8, 11, 12）。
/// 副作用なしの純関数（同一 `input` に対し常に同一の `Result` を返す）。
pub fn select_execution_path(input: DispatchInput) -> Result<ExecutionPath, DispatchError>;
```

## Notes

- `GpuCapability` は sealed トークンで、コンストラクタは非公開（`isa.md` のトークン型と同じ設計パターン）。検証済み GPU backend の参照を提示できることを型で要求し、未検証の capability を経路選択へ持ち込めないようにする（CORE-12。codex-review P1 指摘・PR #158 対応）。
- `select_execution_path` は環境変数・グローバル状態・時刻を一切参照しない純関数として設計されている（テスト容易性・決定性のため）。
- `DispatchInput::for_single_query` と `for_batch` で `dim` の上限文脈が異なる（旧実装は両経路とも `batch_search::MAX_BATCH_DIM` へ固定していたための不一致を、コンストラクタ分離で解消）。

## Related

- [kernel](./kernel.md)
- [isa](./isa.md)
- [gpu-batch](./gpu-batch.md)
