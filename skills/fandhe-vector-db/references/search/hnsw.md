---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/hnsw.rs
---

# hnsw

HNSW（Hierarchical Navigable Small World）グラフの構築・ef-探索 top-k 検索・並列構築を提供するモジュール（TASK-132・CORE-9・CORE-10）。範囲は「グラフ構築＋ef-探索 top-k 検索＋並列構築＋`search_engine.rs` への `SearchEngineKind::Hnsw` 結線（`provider` サブモジュール）」で、世代整合キャッシュ・RLS 統合・永続化は別タスク（`sql::hnsw_cache` 等）の担当。距離カーネルは `kernel::dot`（内積、大きいほど近い）を使う。同点タイブレークは「スコア `total_cmp` 降順・同点は id 昇順」で安定ソートのみを使う。レベル割当は本モジュール専用の非暗号 xorshift64* PRNG（`seed` で決定的）。

`HnswIndex::build` は入力ベクトルを `Arc<[f32]>` として 1 回コピーし自身で所有する（`search` は呼び出し元からベクトルを受け取らず常にこの内部スナップショットのみを参照するため、バッファ差し替え事故のクラス自体が存在しない設計。codex-review PR #430 P1 是正）。

## Signature / Usage

```rust,ignore
pub const MAX_M: usize = 128;
pub const MAX_EF: usize = 10_000;
pub const MAX_HNSW_NODES: usize = 1_000_000;
pub const MAX_LEVEL: usize = 32;
pub const SEQUENTIAL_PREFIX_NODES: usize = 256;
pub const MAX_BUILD_THREADS: usize = 16;
pub const PRECISE_REPAIR_CAP: usize = 64;

/// HNSW 構築パラメータ。既定値（M=16／ef_construction=100／ef_search=64）は
/// ADR 起票 Issue #403 の本リポ採用値（非規範的な実装既定値）。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct HnswParams {
    pub m: usize,
    pub ef_construction: usize,
    pub ef_search: usize,
}
impl HnswParams {
    pub fn validate(&self) -> Result<(), HnswError>
    pub fn with_m(mut self, m: usize) -> Self
    pub fn with_ef_construction(mut self, ef_construction: usize) -> Self
    pub fn with_ef_search(mut self, ef_search: usize) -> Self
}

/// `HnswParams::validate` を通過済みであることを型で保証するラッパー
/// （フィールドは private、`Self::new` 以外の経路では構築不能）。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct ValidatedHnswParams { /* private fields */ }
impl ValidatedHnswParams {
    pub fn new(params: HnswParams) -> Result<Self, HnswError>
    pub fn get(&self) -> HnswParams
    pub fn sparse_visited_max(&self) -> usize
    pub fn with_sparse_visited_max(mut self, max: usize) -> Self
    pub fn resident_precision(&self) -> ResidentPrecision
    pub fn with_resident_precision(mut self, precision: ResidentPrecision) -> Self
    pub fn full_scan_ratio(&self) -> Ratio
    pub fn with_full_scan_ratio(mut self, ratio: Ratio) -> Result<Self, HnswError>
    pub fn acorn_max_visible_ratio(&self) -> Option<Ratio>
    pub fn with_acorn_max_visible_ratio(mut self, ratio: Ratio) -> Result<Self, HnswError>
    pub fn acorn_max_expansion_ratio(&self) -> Option<Ratio>
    pub fn with_acorn_max_expansion_ratio(mut self, ratio: Ratio) -> Result<Self, HnswError>
}

/// HNSW 索引ノードの常駐ベクトル表現（Issue #514）。既定は F32。
#[derive(Debug, Clone, Copy, PartialEq, Eq, Default)]
pub enum ResidentPrecision {
    #[default]
    F32,
    /// f16（IEEE 754 binary16）常駐。1 成分でも `|x| > 65504.0` なら凍結時に F32 へ自動縮退。
    F16,
    /// 対称スカラー量子化（SQ8）による i8 常駐（Issue #521）。fit/encode 失敗時は F32 へ自動縮退。
    I8,
}

/// 整数比（u32/u32）。可視カーディナリティ切替の閾値比等に使う。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Ratio { pub numerator: u32, pub denominator: u32 }

/// `HnswIndex::build` の失敗要因。
#[non_exhaustive]
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum HnswError {
    InvalidParams { reason: &'static str },
    DimMismatch { dim: u32, len: usize },
    TooManyNodes { nodes: usize },
    NonFiniteVector { node: usize },
    NonFiniteScore { node: u32 },
    CapacityOverflow,
    QueryDimMismatch { expected: u32, found: usize },
    NonFiniteQuery,
    /// 並列構築（Issue #406）のワーカーが panic した、またはロックが poison した。
    WorkerPanicked,
}

/// 構築済み HNSW グラフ本体。
#[derive(Debug)]
pub struct HnswIndex { /* private fields */ }
impl HnswIndex {
    pub fn build(params: HnswParams, dim: u32, vectors: &[f32], seed: u64) -> Result<Self, HnswError>
    pub fn build_with_precision(params: HnswParams, precision: ResidentPrecision, dim: u32, vectors: &[f32], seed: u64) -> Result<Self, HnswError>
    pub fn build_with_threads(params: HnswParams, dim: u32, vectors: &[f32], seed: u64, threads: usize) -> Result<Self, HnswError>
    pub fn build_with_threads_observed(params: HnswParams, dim: u32, vectors: &[f32], seed: u64, threads: usize) -> Result<(Self, HnswBuildProfile), HnswError>
    pub fn build_parallel(params: HnswParams, dim: u32, vectors: &[f32], seed: u64) -> Result<Self, HnswError>
    pub fn build_parallel_with_precision(params: HnswParams, precision: ResidentPrecision, dim: u32, vectors: &[f32], seed: u64) -> Result<Self, HnswError>

    /// ef-探索 top-k 検索（Malkov & Yashunin 2016 Algorithm 5 相当）。
    pub fn search(&self, query: &[f32], k: usize, ef: usize, scratch: &mut HnswSearchScratch) -> Result<Vec<crate::kernel::CandidateHit>, HnswError>
    /// マスク付き版（Issue #409）。`mask` が受理しないノードは一切スコア計算しない。
    pub fn search_masked(&self, query: &[f32], k: usize, ef: usize, mask: Option<&NodeMask>, scratch: &mut HnswSearchScratch) -> Result<Vec<crate::kernel::CandidateHit>, HnswError>
    /// visited 集合切替版（Issue #497）。
    pub fn search_masked_with(&self, query: &[f32], k: usize, ef: usize, mask: Option<&NodeMask>, sparse_visited_max: usize, scratch: &mut HnswSearchScratch) -> Result<Vec<crate::kernel::CandidateHit>, HnswError>

    pub fn params(&self) -> &HnswParams
    pub fn dim(&self) -> u32
    pub fn len(&self) -> usize
    pub fn is_empty(&self) -> bool
    pub fn vector(&self, node: u32) -> Option<&[f32]>
    pub fn vector_f16(&self, node: u32) -> Option<&[u16]>
    pub fn vector_i8(&self, node: u32) -> Option<&[i8]>
    pub fn resident_precision(&self) -> ResidentPrecision
    pub fn approx_heap_bytes(&self) -> usize
    pub fn max_level(&self) -> Option<usize>
    pub fn entry_point(&self) -> Option<u32>
    pub fn level_of(&self, node: u32) -> Option<usize>
    pub fn neighbors(&self, level: usize, node: u32) -> Option<&[u32]>
    pub fn max_degree(&self, level: usize) -> usize
}

/// 検索クエリをまたいで再利用する探索スクラッチ（visited 集合等）。
#[derive(Debug, Default)]
pub struct HnswSearchScratch { /* private fields */ }

/// 探索候補マスク（受理ノード集合）。
#[derive(Debug, Clone)]
pub struct NodeMask { /* private fields */ }
impl NodeMask {
    pub fn new(len: usize) -> Self
    pub fn set(&mut self, node: u32)
    pub fn get(&self, node: u32) -> bool
    pub fn len(&self) -> usize
    pub fn is_empty(&self) -> bool
    pub fn count_ones(&self) -> usize
}

/// 並列構築の段別プロファイル統計（Issue #406）。
#[derive(Debug, Clone, Default)]
pub struct HnswBuildProfile {
    pub level_assign: std::time::Duration,
    pub sequential_prefix: std::time::Duration,
    pub parallel_phase: std::time::Duration,
    pub freeze: std::time::Duration,
    pub repair_reachability: std::time::Duration,
    pub flatten: std::time::Duration,
    pub total: std::time::Duration,
    pub workers: Vec<HnswWorkerStats>,
    pub repair: HnswRepairStats,
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| m | usize | 挿入後の隣接数目安（層 0 は `2*m` まで） |
| ef_construction | usize | 挿入時の貪欲探索の候補幅 |
| ef_search | usize | 探索時の候補幅 |
| full_scan_ratio (`ValidatedHnswParams`) | Ratio | 可視カーディナリティ切替の閾値比（既定 1/10、Issue #409） |
| resident_precision (`ValidatedHnswParams`) | ResidentPrecision | 索引ノードの常駐精度（既定 F32、Issue #514） |
| sparse_visited_max (`ValidatedHnswParams`) | usize | visited 集合切替の閾値（既定 0＝常に dense、Issue #497） |
| acorn_max_visible_ratio (`ValidatedHnswParams`) | Option\<Ratio\> | ACORN-1 の 2-hop 展開を有効化する可視比率上限（既定 None、Issue #501） |

## Notes

- サブモジュール `hnsw/csr.rs`（`CsrGraph`）: 凍結済みグラフの CSR（Compressed Sparse Row）表現。`HnswIndex` は構築完了後、可変長ビルダー表現（`GraphBuilder`）を 1 回だけ CSR へ平坦化する（Issue #494）。ノード昇順→レベル昇順で連結し、要素順は並べ替えない。
- サブモジュール `hnsw/i8_query.rs`（`PreparedI8Source`）: `NodeVectors::I8` 専用の per-search `NodeSource` 実装（Issue #522）。探索冒頭で 1 回だけクエリを二重量子化し、失敗時は復号 dot（`sq8::dot_i8_f32`）へ fail-closed に縮退する。
- サブモジュール `hnsw/parallel_build.rs`: HNSW 構築の並列化本体（Issue #406）。`BuildGraph`・`plan_links`・`publish_links`・`insert_node_locked`・`build_parallel_graph`・`build_parallel_graph_observed` はすべて非公開（呼び出し元は `HnswIndex::build_with_threads`／`build_parallel` のみ）。
- サブモジュール `hnsw/prefetch.rs`（`PrefetchPolicy`／`PipelinePrefetch`）: `search_layer` の隣接ノード探索ループへ挿入するソフトウェアパイプライン先読み（Issue #490）。stable Rust の制約上、真の prefetch 命令ではなく早期の demand load。
- サブモジュール `hnsw/provider.rs`（`HnswSearchProvider`）: `SearchEngineKind::Hnsw` が構築する `SearchProvider` アダプタ。本 crate 0.1.0 時点では索引を保持せず、`SearchProvider::search`／`search_subset` は常に `ParallelSearchProvider`（全件 brute-force）へ委譲する。世代整合キャッシュ・索引探索・Top-k マージは provider の**外側**（`sql::hnsw_cache::HnswIndexCache`）として接続済みだが、この接続先モジュールは `sql-execution` scope の管轄。
- `NodeSource` trait・`VisitedSet` trait・`NodeVectors` enum・`GraphBuilder` struct は `pub(crate)`（crate 内限定）のため公開 API 面には現れない。
- ADR `docs/design/ann-index-adoption.md`（Accepted・B 案）: 既定エンジンは `ParallelBruteForce` のまま不変とし ANN は opt-in。自作 HNSW を選んだ理由は依存最小方針との整合（`usearch` は production 非採用、pure Rust ANN クレートの個別評価は 2026-09-05 に撤去済み・未実施）。RLS との組み合わせは「事前フィルタ」方式を採用し「事後フィルタ」は不採用（不可視行の存在情報漏えいを避けるため）。
- ADR `docs/design/hnsw-generation-cache.md`（Issue #408）: `sql::hnsw_cache::HnswIndexCache` が `(table, ctx)` × テーブル世代単位で構築済み索引を保持し、フィルタなし `Ranking::Distance` クエリのみを ANN 経路へ載せる。索引済み集合との差分（未索引行・失効ノード）は brute-force で補う。
- ADR `docs/design/hnsw-rls-cardinality-switch.md`（Issue #409）: 「可視候補数 ÷ 索引ノード数」の比が `full_scan_ratio` 未満なら plain scan、以上ならマスク付き ANN 探索へ切り替える。`NodeMask` は「テナント境界」ではなく「クエリ時点の候補集合と索引ノードの差」を表す装置であり、テナント境界は索引構築入力（ctx 可視アリーナのみ）・スロット写像・`RlsSafetyNet` の多層防御で別途維持される。
- HNSW is this crate's own from-scratch Rust implementation of the graph index algorithm (Malkov & Yashunin), distinct from `@upstash/vector`'s managed ANN index API (JS client over a hosted service). See `upstash` skill for the managed SaaS equivalent.

## Related

- [search-engine.md](./search-engine.md)
- [hybrid.md](./hybrid.md)
