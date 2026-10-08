---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/hybrid.rs
---

# hybrid

密検索・疎検索の RRF（Reciprocal Rank Fusion）融合モジュール（TASK-103、対象ビヘイビア: SEARCH-1, SEARCH-3）。`kernel.rs`/`parallel_search.rs` の密検索 provider と `sparse.rs` の疎検索を、各リストの順位を使い `weight / (k_const + rank)` を id ごとに加算する公知の RRF 手法（スコアの大小自体は使わない）で統合する純粋関数的な層。

## Signature / Usage

```rust,ignore
pub(crate) const MAX_POOL_DEPTH: usize = 10_000;
pub(crate) const MAX_FETCH_K: usize = MAX_POOL_DEPTH * 4;
pub const SOFT_BOOST_PER_MATCH: f64 = 0.0007;
pub const MAX_BOOST_RULES: usize = 16;
pub const MAX_BOOST_IDS: usize = MAX_POOL_DEPTH;

/// RRF 融合の設定。
#[derive(Debug, Clone, Copy, PartialEq)]
pub struct RrfConfig {
    k_const: f64,
    dense_weight: f64,
    sparse_weight: f64,
    pool_depth: usize,
    tie_rank: TieRank,
}
impl Default for RrfConfig {
    // k_const=60.0, dense_weight=1.0, sparse_weight=1.0, pool_depth=200, tie_rank=GroupEnd
    fn default() -> Self { ... }
}
impl RrfConfig {
    pub fn new(k_const: f64, dense_weight: f64, sparse_weight: f64, pool_depth: usize) -> Result<Self, HybridError>
    pub fn k_const(&self) -> f64
    pub fn dense_weight(&self) -> f64
    pub fn sparse_weight(&self) -> f64
    pub fn pool_depth(&self) -> usize
    pub fn tie_rank(&self) -> TieRank
    pub fn with_tie_rank(mut self, tie_rank: TieRank) -> Self
}

/// RRF 融合で同点グループへ割り当てる順位の規約。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
#[non_exhaustive]
pub enum TieRank { Positional, GroupEnd }

/// 融合後の検索結果 1 件（行 ID と RRF スコア）。
#[derive(Debug, Clone, Copy, PartialEq)]
pub struct HybridHit { pub id: u64, pub score: f64 }

/// rrf_fuse・hybrid_search が返すエラー。
#[derive(Debug, Clone, PartialEq)]
pub enum HybridError {
    Kernel(KernelError),
    Sparse(SparseError),
    InvalidConfig,
    InvalidK,
    DuplicateId,
    UnsortedInput,
    NonFiniteScore,
    ProviderResultRejected,
    TooManyCandidates { len: usize, max: usize },
    InvalidBoost,
    TooManyBoostIds { len: usize, max: usize },
    TooManyBoostRules { len: usize, max: usize },
    BoostSoftBoundExceeded { total: f64, max: f64 },
}
impl fmt::Display for HybridError { ... }
impl std::error::Error for HybridError {}
impl From<KernelError> for HybridError { ... }
impl From<SparseError> for HybridError { ... }

/// 密・疎それぞれの Top-k 結果を RRF で融合する純粋関数。
pub fn rrf_fuse(dense: &[CandidateHit], sparse: &[ScoredDoc], cfg: &RrfConfig) -> Result<Vec<HybridHit>, HybridError>

/// 密検索 provider と疎検索インデックスを RRF で統合検索する入口。
/// 密側は provider.search() を k = cfg.pool_depth で実行し（input.k は上書きされる）、
/// 疎側は sparse_index.search_within(query_text, cfg.pool_depth, &visible_ids) を実行する。
/// rrf_fuse で融合した後、先頭 k 件へ切り詰めて返す。
pub fn hybrid_search(
    provider: &dyn SearchProvider,
    input: SearchInput<'_>,
    sparse_index: &SparseIndex,
    query_text: &str,
    k: usize,
    cfg: &RrfConfig,
) -> Result<Vec<HybridHit>, HybridError>

/// hybrid_search のソフトブースト対応版（TASK-111・PLAN-1）。密・疎の検証・融合は
/// hybrid_search と全く同じ手順で行い、rrf_fuse の融合結果（truncate(k) の前、
/// 切り詰め前のプール全体）に対してのみ apply_soft_boost を適用してから先頭 k 件へ
/// 切り詰める。切り詰め前に適用するのは、k 圏外だった一致候補がブーストで Top-k 内へ
/// 浮上できるようにするため。rules が空の場合は hybrid_search と完全に同じ結果を返す。
/// hybrid_search はこの関数へ rules=&[] で委譲する薄いラッパー。
pub fn hybrid_search_boosted(
    provider: &dyn SearchProvider,
    input: SearchInput<'_>,
    sparse_index: &SparseIndex,
    query_text: &str,
    k: usize,
    cfg: &RrfConfig,
    rules: &[BoostRule<'_>],
) -> Result<Vec<HybridHit>, HybridError>

/// sparse_refetch_loop（hybrid_search_boosted の疎側再取得ループ実装そのもの）を
/// 呼び出し、実際に発火した fetch_k の列も含めて返すテスト・ベンチ向け公開フック
/// （Issue #387 PR #416）。production の挙動を変えず、呼び出し列を外部から観測
/// できるようにするためだけの薄いラッパー。戻り値は (疎ヒット, 疎側 fetch_k 上限
/// 〔最終ラウンドの fetch_k〕, 実際に呼ばれた fetch_k の列)。
#[cfg(feature = "bench-internals")]
pub fn sparse_refetch_observed(
    sparse_index: &SparseIndex,
    query_text: &str,
    visible_ids: &BTreeSet<u64>,
    cfg: &RrfConfig,
) -> Result<(Vec<ScoredDoc>, usize, Vec<usize>), HybridError>

/// ソフトブーストの 1 ルール（TASK-111・PLAN-1）。
#[derive(Debug, Clone, Copy)]
pub struct BoostRule<'a> { ids: &'a BTreeSet<u64>, amount: f64 }
impl<'a> BoostRule<'a> {
    pub fn new(ids: &'a BTreeSet<u64>, amount: f64) -> Result<Self, HybridError>
}

pub fn path_hint_matches(hint: &str, path: &str) -> bool
pub fn kind_hint_matches(hint: &str, kind: &str) -> bool

/// rrf_fuse が返した融合済みプール hits へソフトブーストを適用する。
pub fn apply_soft_boost(hits: &mut [HybridHit], rules: &[BoostRule<'_>], cfg: &RrfConfig) -> Result<(), HybridError>
```

## Notes

- `hybrid_search` は `hybrid_search_boosted(..., &[])` への薄いラッパー。`sparse_refetch_observed` は非既定 feature `bench-internals` 限定の診断専用フックで、既定ビルド・`wire-server` からは到達不能。
- 決定性契約は ADR `docs/design/rrf-tie-break-determinism.md`（TASK-84・現状維持判断）が定める: スコア比較は必ず `total_cmp`＋非有限値は事前拒否、同点タイブレークは常に id 昇順、スコア順に並べる箇所は必ず安定ソート（`sort_by`）、RRF 累積は決定的走査順序を持つ構造（`BTreeMap` または Issue #549 の id ソート済み位置索引）を使う。`scripts/check_sort_determinism.sh` が `sort_unstable_by`/`sort_unstable_by_key`/`select_nth_unstable_by(_key)` の再混入を機械検知する。
- `RrfConfig::tie_rank`（既定 `TieRank::GroupEnd`）は同点グループへ割り当てる RRF **順位**の規約であり、最終出力の並び順（安定ソート＋id 昇順）とは別の契約。`pool_depth` 境界で同点グループを分断しない（Issue #310、詳細は `docs/design/hybrid-recall-regression.md`）。
- Recall 回帰は ADR `docs/design/hybrid-recall-regression.md`（TASK-104）が 2 層構成（層 A: 固定値回帰・PR 常時実行、層 B: spec 由来閾値ゲート・`make recall-regression`）で検証する。
- ソフトブーストと RLS 事前フィルタの相互作用は ADR `docs/design/plan-rls-boost-interaction.md`（TASK-139・Accepted）が合流点（`tenant::visible_rows` → `hybrid::path_hint_matches`/`kind_hint_matches` → `BoostRule::new` → `hybrid_search_boosted`）を検証している。`sql/exec.rs` への実結線自体は TASK-111 のスコープ外。
- RRF fusion here is this crate's own in-process algorithm over `SearchProvider`/`SparseIndex`, distinct from `@upstash/vector`'s managed hybrid index API (JS client over a hosted service). See `upstash` skill for the managed SaaS equivalent.

## Related

- [sparse.md](./sparse.md)
- [scoring-boost.md](./scoring-boost.md)
- [rerank.md](./rerank.md)
