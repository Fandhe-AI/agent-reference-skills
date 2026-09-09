---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/search_engine.rs
---

# search_engine

検索エンジンの選択・構築レイヤ（TASK-131・CORE-9）。`core.rs::EngineCore::open` から呼ばれ、`Box<dyn SearchProvider>`（`kernel.rs::SearchProvider`、CORE-13）を構築して返す。「総当たり実装を差し替え可能なインターフェース越しに呼び出す」という差し替え点は、独立の trait 階層を新設せず CORE-13 の provider 注入機構（`SearchProvider` trait）へ一本化している。エンジンの選択はコード上の明示指定（`SearchEngineKind` の値）のみで決まり、環境変数・設定ファイルによる実行時の経路上書き機構は設けない（CORE-12）。

ANN（HNSW）は Issue #407・ADR `docs/design/ann-index-adoption.md`（B 案）で opt-in 結線された。`SearchEngineKind::Hnsw` は `core.rs::EngineCore::open_with_engine`／`from_storage_with_engine` を明示的に呼んだ場合のみ選択され、既定エンジン（`default_kind`／`default_engine`、`ParallelBruteForce`）には影響しない。

## Signature / Usage

```rust,ignore
#[non_exhaustive]
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum SearchEngineKind {
    /// 単一スレッド・スカラー演算の参照実装（`crate::kernel::CpuScalarProvider`）。
    /// 他 provider の正解値検証用途が主で、既定エンジンではない。
    CpuScalarBruteForce,
    /// マルチスレッド並列の総当たり Top-k（`crate::parallel_search::ParallelSearchProvider`）。
    /// 既定エンジン。
    ParallelBruteForce,
    /// HNSW 近似最近傍探索（`hnsw.rs::HnswIndex`）。opt-in。保持する
    /// `crate::hnsw::ValidatedHnswParams` は型として検証済みであることが保証されている。
    Hnsw(ValidatedHnswParams),
}

/// 未検証 `HnswParams` から `SearchEngineKind`／`SearchProvider` を構築しようとして失敗した理由。
#[non_exhaustive]
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum SearchEngineError {
    /// `HnswParams::validate` が拒否した。
    InvalidHnswParams(crate::hnsw::HnswError),
}

impl fmt::Display for SearchEngineError { fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result }
impl std::error::Error for SearchEngineError {
    fn source(&self) -> Option<&(dyn std::error::Error + 'static)>
}
impl fmt::Display for SearchEngineKind { fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result }

/// 未検証の `HnswParams` から検証済み `SearchEngineKind::Hnsw` を構築する唯一の入口。
pub fn hnsw_kind(params: HnswParams) -> Result<SearchEngineKind, SearchEngineError>

/// `kind` に対応する `SearchProvider` 実装を構築する（infallible）。
pub fn build(kind: SearchEngineKind) -> Box<dyn SearchProvider>

/// 既定の検索エンジン種別（`ParallelBruteForce`）。
pub fn default_kind() -> SearchEngineKind

/// 既定の検索エンジンを構築する（`EngineCore::open` から呼ばれる既定経路）。
pub fn default_engine() -> Box<dyn SearchProvider>
```

## Notes

- CPU-SIMD／GPU の実行経路自体を決める決定表は `dispatch.rs::select_execution_path`（TASK-155）が担う。本モジュールが構築する provider はいずれも CPU 実装のため、`EngineCore::search` は provider 実行前に `select_execution_path` を呼び、`ExecutionPath::CpuSimd` の場合のみ本モジュールの provider を実行する。
- `SearchEngineError::InvalidHnswParams` は TASK-152・ERR-2 の分類リストへの新規登録・`wire_code()` の公開を行わない（wire／SQL 表層への露出を持たないため。`docs/design/hnsw-search-engine-wiring.md` 参照）。
- `hnsw_kind` を経由して構築された `SearchEngineKind::Hnsw` は、保持する `ValidatedHnswParams` が型で検証済みであることが保証されているため、`build` は常に成功する infallible な関数になる（codex-review P1 是正・Issue #407）。
- ADR: `docs/design/ann-index-adoption.md`（Accepted・B 案＝条件付き opt-in 採用・自作 HNSW・依存追加なし）。判断根拠は依存最小方針との整合、および `feature_bench` 実測で総当たりが規模線形に残存することの確認。

## Related

- [hnsw.md](./hnsw.md)
- SearchProvider trait は kernel.rs（`../performance/kernel.md`）参照
