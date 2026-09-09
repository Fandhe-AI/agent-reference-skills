---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/sql/hnsw_cache.rs
---

# sql::hnsw_cache

`sql::exec::execute_statement_with_cache` の DISTANCE 段（`Ranking::Distance`）が参照する `crate::hnsw::HnswIndex` のテーブル世代整合キャッシュ（Issue #408）。

## Signature / Usage

```rust,ignore
//! `sql::arena_cache::SqlArenaCache`（Issue #363）・`sql::sparse_cache::
//! SparseIndexCache`（Issue #357）と同じ「`(table, ctx)` × テーブル単位世代」の
//! キャッシュ設計を踏襲するが、失効時に丸ごと破棄せず未索引分（新規行・内容が
//! 変わった行・削除/不可視化された行）を brute-force で補う点が異なる（Lance／
//! qdrant の `indexing_threshold` 方式）。索引済みノードの探索は
//! `crate::hnsw::HnswIndex::search` を使い、未索引分は呼び出し元から渡される
//! `&dyn SearchProvider`（`HnswSearchProvider` は常に
//! `crate::parallel_search::ParallelSearchProvider` へ委譲する）で補う。
//!
//! 適用条件（呼び出し元 `sql::exec::execute_statement_with_cache` が判定する）:
//! `Ranking::Distance` のクエリに限る。`bound.metadata_filters`・`bound.expr_filters`
//! がともに空の場合はアリーナが「RLS 可視行の全集合」になり、同一 `(table, ctx)`
//! の同一テーブル世代内であればスロット割当まで含めて再現される。SCALAR 事前
//! フィルタが付く場合は `search_subset_or_fallback` が担う `Subset` 形状
//! （Issue #409。per-query 写像でキャッシュには登録しない）として扱う。hybrid の
//! 密側（`Ranking::Hybrid`）は本モジュールの `search_or_fallback`／
//! `search_subset_or_fallback` からは呼ばれず、`sql::hnsw_hybrid::HnswDenseProvider`
//! （Issue #410）が `prepare_full_visible`／`prepare_subset`・`search_prepared` を
//! 直接呼ぶ別経路として結線される。加えて `bound.mode`（`sql::mode::SearchMode::
//! Precision`）が `precision` のクエリも対象外（TASK-162・SEARCH-9。
//! `precision::apply_gate` の確信度ゲートは DISTANCE 段の Top-2 マージンを厳密順位
//! に基づいて評価する必要があり、ANN の近似近傍では真の最近傍の取りこぼしにより
//! マージンを過大評価しうるため、常に厳密 brute-force 経路を使う）。
//!
//! 上記適用条件の判定本体は `classify_ann_plan`（Issue #411）に集約する。
//! `sql::exec` の 4 boolean はいずれもこの関数の戻り値から導出し、`sql::explain`
//! （`EXPLAIN` の `ann_plan:` 行）も同じ関数を呼ぶ。
//!
//! fail-closed 契約（`HnswIndexCache::lookup`／`record_base`／`record_overlay_for`／
//! `record_build_failed` で非対称。`sql::arena_cache`・`sql::sparse_cache` と同型）:
//! - `lookup` は世代不一致・ロック毒化・世代読み取り失敗のいずれも「見つからな
//!   かった」として扱う。
//! - `record_*` はいずれも、常駐反映の直前に `storage` から新規 read トランザクション
//!   で世代を再照合し、対象世代と不一致・ロック毒化時はキャッシュへ反映しない。
//!
//! 索引済みノードの探索結果は必ず `kernel::dot` で再計算する（写像先が範囲外・
//! キー不一致の場合は当該クエリのみ全件 brute-force へ縮退し、エントリは破棄しない）。

pub struct HnswIndexCacheStats {
    /// 索引済みノードを実際に探索できた回数（`Ready` 到達かつ縮退なし）。
    pub hits: u64,
    /// 索引が存在しない・世代が離れすぎている等でミスした回数。
    pub misses: u64,
    /// `IndexedBase::build`（新規構築・再構築の両方）を呼んだ回数。
    pub builds: u64,
    /// 構築失敗（`HnswError`）でこの世代は brute-force へ縮退した回数。
    pub build_failures: u64,
    /// 差分比率が閾値を超えて再構築した回数（`builds` の内数）。
    pub rebuilds: u64,
    /// 未索引分（`Overlay::delta_slots`）を brute-force で補った呼び出し回数。
    pub delta_searches: u64,
    /// 索引を使わず全件 brute-force へ縮退した回数（`plain_scans`・`masked_short`
    /// もこの内数）。
    pub fallbacks: u64,
    /// 可視カーディナリティ比が `full_scan_ratio` 未満で plain scan を選んだ回数
    /// （Issue #409。`fallbacks` の内数）。
    pub plain_scans: u64,
    /// マスク付き探索の結果件数が `min(k, visible_in_index)` に満たず plain scan
    /// へ縮退した回数（Issue #409。`fallbacks` の内数）。
    pub masked_short: u64,
    /// マスクの受理ノードが複数の連結成分に分かれ plain scan へ縮退した回数
    /// （PR #435。`fallbacks` の内数）。
    pub mask_splits_graph: u64,
    /// `Subset` 形状でマスク付き探索が縮退なしで完走した回数（`hits` とは独立）。
    pub subset_searches: u64,
    /// `k > MAX_EF` で直ちに plain scan へ縮退した回数（Issue #410。`fallbacks` の内数）。
    pub ef_cap_fallbacks: u64,
    /// hybrid 密側の再取得ラウンドとして本キャッシュへ探索を委ねた回数（Issue #410）。
    pub hybrid_dense_searches: u64,
    /// hybrid 密側アダプタが `prepare_*` を実行したクエリ数（Issue #410）。
    pub hybrid_queries: u64,
    /// 1 クエリ内で観測された hybrid 密側再取得ラウンド数の最大値（Issue #410）。
    pub hybrid_rounds_max: u64,
    /// `IndexedBase::build` が `ResidentPrecision::F16` を要求されたにもかかわらず
    /// f16 の有限範囲（`|x| <= 65504.0`）を超える成分により `F32` へ自動縮退した
    /// 回数（Issue #514・D6。`builds` の内数）。
    pub f16_residency_fallbacks: u64,
    /// `IndexedBase::build` が `ResidentPrecision::I8` を要求されたにもかかわらず
    /// `sq8::fit_dim_params`／`sq8::encode_rows` の失敗により `F32` へ自動縮退した
    /// 回数（Issue #521。`builds` の内数。`f16_residency_fallbacks` とは互いに排他）。
    pub i8_residency_fallbacks: u64,
    /// マスク付き探索が縮退なしで完走した際、可視候補数が `sparse_visited_max`
    /// 未満で `VisitedSparse`（`HashSet<u32>`）を選んだ回数（Issue #497。診断用）。
    pub sparse_visited_searches: u64,
    /// `TraversalRegime::TwoHop`（ACORN-1・Issue #501）レジームで縮退なしに完走
    /// したマスク付き探索回数（診断用）。
    pub acorn_searches: u64,
    /// `bridge_expand`（Issue #501）が受理・候補化した 2-hop ノード数の累計（診断用）。
    pub acorn_expansions: u64,
    /// `greedy_descend_masked` の TwoHop 限定ブリッジ降下（Issue #680）が受理・
    /// 比較した 2-hop ノード数の累計（`acorn_expansions` とは別カウンタ）。
    pub acorn_descent_bridges: u64,
    /// TwoHop（ACORN-1）探索完走直後、橋渡し展開件数が可視ノード数に対する
    /// `acorn_max_expansion_ratio` を超えたため ANN 結果を捨てて plain scan へ
    /// 縮退した回数（Issue #681。`fallbacks` の内数）。
    pub acorn_guard_fallbacks: u64,
    /// hybrid 密側再取得ループが破棄候補ヒープ保持の再開型探索（Issue #505・
    /// `ResumableMaskedSearch`）で完走したラウンド数の累計（診断用）。
    pub hybrid_resumed_rounds: u64,
    /// `Subset` 形状が plain scan へ縮退した際、`VectorArena` を複製せずキャッシュ
    /// 済みスナップショットを借用したまま候補 id マスク経路へ委譲できた回数
    /// （Issue #676）。
    pub subset_mask_scans: u64,
    /// `Subset` 形状が ANN 探索へ進んだ結果、`VectorArena::
    /// build_from_cached_rls_rows_subset` による複製が発生した回数（Issue #676。
    /// `subset_mask_scans` と排他）。
    pub subset_arena_copies: u64,
    /// 現在キャッシュが保持しているエントリ数。
    pub entries: usize,
}
/// 世代 `built_table_generation` の可視行全体から構築した索引済みベース。
pub(crate) struct IndexedBase {
    index: Arc<HnswIndex>,
    /// `index` のノード番号 → 構築時点のキー（`(tenant_id, id)`）。
    node_keys: Vec<RowKey>,
    /// `node_keys` の逆引き（`Overlay::compute` が行単位で索引済みか判定するために使う）。
    key_to_node: HashMap<RowKey, u32>,
    built_ctx: PolicyContext,
    built_table_generation: u64,
}

/// マスク付き探索の走査レジーム（Issue #501）。
/// - `PlainScan`: アリーナ全体の brute-force。
/// - `OneHop`: 既存契約のマスク付き ANN 探索（`acorn_max_visible_ratio` が
///   `None`、または比が `acorn_max_visible_ratio` を超える）。
/// - `TwoHop`: `full_scan_ratio <= r <= acorn_max_visible_ratio` の区間
///   （`acorn_max_visible_ratio` が `Some` のときのみ到達しうる）。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) enum TraversalRegime {
    PlainScan,
    OneHop,
    TwoHop,
}

/// 世代 `generation` の `arena` に対する `base` の差分オーバーレイ。
pub(crate) struct Overlay {
    generation: u64,
    arena_len: usize,
    /// `base.index` のノード番号 → 現世代でのスロット番号。存在しない場合は `STALE_SLOT`。
    slot_of_node: Vec<u32>,
    stale_nodes: usize,
    /// 未索引の行（新規・内容変更）のスロット番号。
    delta_slots: Vec<u64>,
    /// `delta_slots` と 1 対 1 対応する embedding（row-major）。
    delta_vectors: Vec<f32>,
    /// `slot_of_node[node] != STALE_SLOT` を表す候補マスク（Issue #409）。
    /// `crate::hnsw::HnswIndex::search_masked` へそのまま渡し、失効ノードが探索
    /// 結果へ混入することを構造的に防ぐ。
    visible_mask: crate::hnsw::NodeMask,
    /// 索引ノードのうち現アリーナのスロットへ写像できたノード数
    /// （`base.index.len() - stale_nodes` と一致）。
    visible_in_index: usize,
    /// `visible_mask` の受理ノード全体が、単一 entry point からの誘導部分グラフ
    /// （層 0）から到達可能かどうか（`false` = 到達可能・分断なし。`true` なら
    /// `search_with_overlay` は `search_masked` を呼ばず直接 plain scan へ縮退する）。
    mask_splits_graph: bool,
    /// 本世代の可視カーディナリティ比から導出した `TraversalRegime`（Issue #501）。
    regime: TraversalRegime,
}

pub(crate) struct HnswIndexCache { /* ... */ }

/// `sql::exec::execute_statement_with_cache` へ渡すキャッシュアクセス束
/// （Issue #408）。`storage`・`cache` に加え、`effective_ef`／構築パラメータへ
/// アクセスするための `provider`（`Copy`）を束ねる。
pub(crate) struct HnswCacheAccess<'a> {
    pub(crate) storage: &'a Storage,
    pub(crate) cache: &'a HnswIndexCache,
    pub(crate) provider: HnswSearchProvider,
}

/// `search_or_fallback`／`search_subset_or_fallback` の「索引・オーバーレイの解決」
/// 段と「Top-k 探索」段を分離するための中間表現（Issue #410）。
pub(crate) enum PreparedHnswSearch {
    /// 索引済みベース＋現世代のオーバーレイが揃っている。
    Indexed {
        base: Arc<IndexedBase>,
        overlay: Arc<Overlay>,
        success_stat: OverlaySuccessStat,
    },
    /// 索引を使わず全件 brute-force とする（`MIN_INDEXED_ROWS` 未満・構築/再構築
    /// 失敗・写像不整合のいずれか）。
    FullScan,
    /// `Subset` 形状（Issue #409）専用の早期打ち切り（Issue #488）。`arena.len()`
    /// の時点で既に `full_scan_ratio` 未満と判明しているため、`Overlay::compute`
    /// を丸ごと省略して `FullScan` と同じ全件 brute-force を選ぶ。`FullScan` と
    /// 分けて持つのは `plain_scans` 統計を独立して観測するため。
    PlainScanBelowRatio,
}

/// `classify_ann_plan` の分類結果。
pub(crate) enum AnnPlan {
    /// エンジンが `SearchEngineKind::Hnsw` でない（`hnsw_cache` が `None`）ため
    /// 常に全件 brute-force。
    PlainScanEngine,
    /// HNSW だが `precision` モード（TASK-162・SEARCH-9）のため厳密 brute-force。
    PlainScanPrecision,
    /// 索引経路・`FullVisible` 形状（フィルタなし、または DISTANCE 先行で SCALAR
    /// 条件を事後判定する形）。
    HnswFullVisible,
    /// 索引経路・`Subset` 形状（SCALAR 事前フィルタ付き。per-query 写像・
    /// キャッシュ非登録）。
    HnswSubset,
    /// `EngineCore::search_engine_kind()` が `None`（カスタム `SearchProvider` を
    /// 直接注入した構築経路）のため、実際に ANN か brute-force かを判別できない。
    UnknownCustomProvider,
}

pub(crate) fn prepare_full_visible(/* シグネチャ未転記 */);
pub(crate) fn prepare_subset(/* シグネチャ未転記 */);
pub(crate) fn search_prepared(/* シグネチャ未転記 */);
pub(crate) fn search_or_fallback(/* シグネチャ未転記 */);
pub(crate) fn search_subset_or_fallback(/* シグネチャ未転記 */);

/// `sql::exec` の DISTANCE 段適用条件判定（`Ranking::Distance` の `FullVisible`／
/// `Subset` 判定、hybrid 密側の対称条件）を集約する純粋関数。`sql::explain` の
/// `EXPLAIN` の `ann_plan:` 行も同じ関数を呼ぶ（モジュールドキュメント参照）。
/// `sql::exec` の現行 4 式と同値であることはテストで固定する。
pub(crate) struct AnnShapeInput {
    /// `hnsw_cache.is_some()`（`SearchEngineKind::Hnsw` opt-in 構築時のみ `true`）。
    pub(crate) hnsw_enabled: bool,
    /// カスタム provider を直接注入した構築経路かどうか。
    pub(crate) engine_kind_unknown: bool,
    /// `Ranking::Hybrid` かどうか。
    pub(crate) is_hybrid: bool,
    /// `bound.mode` が `precision` か。
    pub(crate) is_precision: bool,
    /// `bound.metadata_filters` と `bound.expr_filters` がともに空か。
    pub(crate) filters_empty: bool,
    /// SCALAR 段が DISTANCE 段より先に評価されるか。
    pub(crate) scalar_prefilter: bool,
}

pub(crate) fn classify_ann_plan(input: AnnShapeInput) -> AnnPlan;
```

## Notes

- ファイルサイズが大きい（約212KB、この scope で最大のファイル）。`HnswIndexCacheStats` / `IndexedBase` / `TraversalRegime` / `Overlay` / `HnswCacheAccess` / `PreparedHnswSearch` / `AnnPlan` / `AnnShapeInput` の全フィールド・全バリアント、および `classify_ann_plan` のシグネチャは main が保存したソースから Read で verbatim 転記した。`HnswIndexCache` のフィールド・`prepare_full_visible` / `prepare_subset` / `search_prepared` / `search_or_fallback` / `search_subset_or_fallback` の詳細シグネチャは転記範囲を絞った（未転記。取得不能ではない）
- 関連 ADR: [`hnsw-generation-cache`](https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/docs/design/hnsw-generation-cache.md)（Issue #408・実装済み。HNSW 索引のテーブル世代整合キャッシュと未索引分 brute-force 併用 = 本モジュールそのものの設計 ADR。親 #402・前提 #404〜#407）、[`scalar-index-mask-search`](https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/docs/design/scalar-index-mask-search.md)（Issue #654・実装済み。候補集合を id マスクで直接探索し arena 複製を回避する設計 = `subset_mask_scans`/`subset_arena_copies` 統計の設計背景）
- spec ポインタ（CORE-9, CORE-10, TASK-132）は本文非公開のため未記載
- Distinct from `nvidia-cuda` / `apple-silicon` / `amd-rocm`: not a GPU kernel/language layer, but a query-scoped table-generation-consistent cache for the HNSW index.
- Distinct from `upstash`: not the @upstash/vector ANN search SaaS client API, but the engine's internal HNSW cache implementation.

## Related

- [exec](./exec.md)
- [hnsw-hybrid](./hnsw-hybrid.md)
- [arena-cache](./arena-cache.md)
