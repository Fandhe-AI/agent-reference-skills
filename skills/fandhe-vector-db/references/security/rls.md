---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/rls.rs
---

# rls

行レベルセキュリティ（RLS）の暗黙適用フックと、可視行のみを対象にした再利用可能な検索インデックス実装（事前フィルタ方式 `PrefilterIndex` / 検索時フィルタ方式 `SearchTimeFilter`）、実行結果の第 2 層防御 `RlsSafetyNet` を提供するモジュール（TASK-133〜136）。

## Signature / Usage

```rust,ignore
/// RLS-6 / RLS-7 の暗黙適用フック（TASK-137）。
///
/// 認証済みセッションから導出済みの `PolicyContext` だけを束縛し、候補集合構築時の
/// 可視性フィルタ適用への単一注入点。呼び出し元は
/// `core.rs::EngineCore::search`/`get_row` と `sql/exec.rs::execute_statement`。
#[must_use]
pub struct ImplicitRlsHook<'c> {
    ctx: &'c PolicyContext,
}

impl<'c> ImplicitRlsHook<'c> {
    /// 認証済みセッションから導出済みの `ctx` を束縛する。
    #[inline]
    pub fn new(ctx: &'c PolicyContext) -> Self

    /// 束縛済みの `PolicyContext`（読み取り専用）。
    #[inline]
    pub fn context(&self) -> &'c PolicyContext

    /// 単点判定（`core.rs::EngineCore::get_row` 等）。
    /// `PolicyContext::is_visible` へ委譲するだけで独自比較を持たない。
    #[inline]
    pub fn is_visible(&self, row_tenant: &str, row_visibility: Visibility) -> bool

    /// 候補集合構築（`VectorArena::build_filtered` 系）へそのまま渡せる述語を返す。
    #[inline]
    pub fn predicate(&self) -> impl Fn(&str, Visibility) -> bool + 'c
}

/// [`PrefilterIndex`] のエラー型。`core.rs::CoreError` とおおむね対称の設計だが、
/// `Policy` は持たず（`PolicyContext` の構築時検証は呼び出し元の責務で本モジュールには
/// 到達しない）、[`RlsError::ContextMismatch`] は `core.rs` 側に対応がない
/// （`EngineCore::search` はクエリ毎にアリーナを再構築するため構築時 ctx と検索時 ctx の
/// 食い違いという状態自体が存在しない。本モジュール特有のインデックス再利用に伴う
/// エラー種別）。
#[derive(Debug)]
pub enum RlsError {
    Arena(ArenaError),
    Kernel(KernelError),
    /// [`crate::storage::Storage::current_generation`] の読み取り失敗（[`Self::build`]
    /// 時のみ発生。`search` 時は [`RlsError::IndexStale`] へ丸め込む）。
    Storage(crate::storage::StorageError),
    /// `k == 0` または [`MAX_SEARCH_K`] 超過。
    InvalidK { k: usize },
    /// 指定テーブルが存在しない（`core.rs::CoreError::NotFound` と同一契約: 不可視と
    /// 不存在を区別しない。`Display` へテーブル名を含めない。security.md P0）。
    NotFound,
    /// 検索時 `PolicyContext` が構築時と一致しない場合の fail-closed 拒否
    /// （`Display` はテナント ID・可視性集合を含まない。security.md P0）。
    ContextMismatch,
    /// provider 呼び出し前のアリーナ全行再検証で、構築時と現在の tenant/visibility が
    /// 一致しない行を検出した場合の fail-closed 拒否（`Display` は id・テナント ID を
    /// 含まない。呼び出し元は [`PrefilterIndex::build`] を呼び直すこと。security.md P0）。
    IndexStale,
    /// `SearchProvider` が返却した `Vec<`[`CandidateHit`]`>` が Top-k の契約に違反した
    /// （`core.rs::CoreError::ProviderResultRejected` と同一契約。判定は共有ヘルパ
    /// `provider_result_is_valid` で行う。fail-closed: 違反があれば結果を一切返さない）。
    ProviderResultRejected,
}

/// 事前フィルタ方式の再利用可能インデックス（TASK-133・RLS-1〜4）。
pub struct PrefilterIndex<'s> {
    inner: PrefilterSnapshot,
    storage: &'s Storage,
}

impl<'s> PrefilterIndex<'s> {
    /// `table` に対し `ctx` の可視性述語で可視行のみのインデックスを構築する（RLS-1）。
    /// テーブル不存在は `RlsError::NotFound` へ丸め込む（存在情報を漏らさない。
    /// security.md P0）。容量超過・次元不整合は `RlsError::Arena` へ伝播する。
    pub fn build(storage: &'s Storage, table: &str, ctx: &PolicyContext) -> Result<Self, RlsError>

    /// 保持済みインデックスに対して Top-k 検索を行う（over-fetch なし・RLS-3）。
    pub fn search(
        &self,
        ctx: &PolicyContext,
        provider: &dyn SearchProvider,
        query: &[f32],
        k: usize,
    ) -> Result<Vec<SearchHit>, RlsError>

    /// インデックスが保持する可視行数を返す。
    pub fn len(&self, ctx: &PolicyContext) -> Result<usize, RlsError>

    /// 可視行が 0 件かを返す。
    pub fn is_empty(&self, ctx: &PolicyContext) -> Result<bool, RlsError>

    /// 検索対象ベクトルの次元。
    pub fn dim(&self) -> u32

    /// 構築元のテーブル名。
    pub fn table_name(&self) -> &str
}

/// 検索時フィルタ方式の再利用可能インデックス（TASK-134・RLS-1, RLS-3）。
pub struct SearchTimeFilter<'s> {
    storage: &'s Storage,
    table_name: String,
    dim: u32,
}

impl<'s> SearchTimeFilter<'s> {
    /// `table` の存在とベクトル次元だけを検証する（行走査は行わない）。
    /// テーブル不存在は `RlsError::NotFound` へ丸め込む（[`PrefilterIndex::build`] と
    /// 同一契約）。
    pub fn build(storage: &'s Storage, table: &str) -> Result<Self, RlsError>

    /// `ctx` の可視性述語で Top-k 検索を行う（RLS-1: 不許可行の混入 0 件・RLS-3:
    /// over-fetch なしで k 件充足）。
    pub fn search(
        &self,
        ctx: &PolicyContext,
        query: &[f32],
        k: usize,
    ) -> Result<Vec<SearchHit>, RlsError>

    /// `ctx` の可視性述語で数えた可視行数を返す。
    pub fn len(&self, ctx: &PolicyContext) -> Result<usize, RlsError>

    /// 可視行が 0 件かを返す（先頭から可視行が見つかり次第打ち切るため
    /// `Self::len` より軽い）。
    pub fn is_empty(&self, ctx: &PolicyContext) -> Result<bool, RlsError>

    /// 検索対象ベクトルの次元。
    pub fn dim(&self) -> u32

    /// 構築元のテーブル名。
    pub fn table_name(&self) -> &str
}

/// RLS 実行時安全網（TASK-136・RLS-5）。`sql::exec` の DISTANCE 段（および SCALAR
/// 事後フィルタ）を通過した最終 `hits`（`(id, score)` の順序付き列）を、束縛済み
/// `PolicyContext` で再判定する第 2 層の防御。
#[must_use]
pub struct RlsSafetyNet<'c> {
    ctx: &'c PolicyContext,
}

impl<'c> RlsSafetyNet<'c> {
    /// 束縛済み `PolicyContext` を保持する安全網を構築する。
    pub fn new(ctx: &'c PolicyContext) -> Self

    /// `hits` の相対順序を保ちつつ、`is_visible` が `false` の行、および
    /// `label_of` がラベルを引けない行（データ不整合。fail-closed に除去）を除く。
    pub fn apply<'a, F>(&self, hits: Vec<(u64, f64)>, label_of: F) -> RlsVerifiedHits
    where
        F: Fn(u64) -> Option<(&'a str, Visibility)>
}

/// `RlsSafetyNet::apply` を通過した hits だけが持てる witness 型。構築経路は
/// `RlsSafetyNet::apply` のみに限定する（`Default`・`From<Vec<_>>` は実装しない）。
#[must_use]
pub struct RlsVerifiedHits {
    hits: Vec<(u64, f64)>,
    dropped: usize,
}

impl RlsVerifiedHits {
    /// 検証済み hits を借用で返す。
    pub fn hits(&self) -> &[(u64, f64)]

    /// 検証済み hits を所有権ごと取り出す。
    pub fn into_hits(self) -> Vec<(u64, f64)>

    /// 検証済み hits の件数。
    pub fn len(&self) -> usize

    /// 検証済み hits が空か。
    pub fn is_empty(&self) -> bool

    /// 安全網が除去した件数。0 でなければ事前フィルタの迂回を示す観測値だが、
    /// エラー・応答へは載せない（他テナントの存在情報を漏らさない。security.md P0）。
    /// テスト・将来の内部メトリクス用。
    pub fn dropped(&self) -> usize
}
```

## Notes

- rustdoc は抄録（一部段落を省略）。全文は `source:` の docs.rs source view を参照。
- `PrefilterIndex` / `SearchTimeFilter` の `build` はテーブル不存在を `RlsError::NotFound` に丸め込み、テーブル名の存在情報を漏らさない（security.md P0）。
- `PrefilterIndex::search` は構築時 `PolicyContext` と検索時 `PolicyContext` の完全一致を fail-closed に照合する（`RlsError::ContextMismatch`。`PolicyContext` の `PartialEq`/`Eq` を参照。`policy.md` 参照）。
- HNSW 索引との結線（`PrefilterSnapshot::search_with_hnsw`、Issue #409）は候補マスクによる可視カーディナリティ切替を伴う。判定式・分断検査・多層防御の詳細は ADR [`hnsw-rls-cardinality-switch`](https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/docs/design/hnsw-rls-cardinality-switch.md) を参照（本ページには転記しない。private spec 側 SSOT が正のため）。
- RLS の暗黙適用契約が MVP クエリカタログ（C1〜C4）以外の読み取り経路（`EngineCore::execute_sql` / `execute_sql_in_session` / `VectorCore::search` / `VectorCore::get_row` / `tenant::visible_rows` / `tenant::verify_hits`）へも一般化されて働くことは ADR [`rls-generalized-read-paths`](https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/docs/design/rls-generalized-read-paths.md)（対応: TASK-138、対象ビヘイビア: RLS-8）で棚卸しされている。生 `Storage` API（`get`/`scan`/`scan_page` 等）はクライアントから構造的に到達不能なため対象外。
- LLM クエリプランニングのソフトブースト機構（`hybrid.rs`）と RLS 事前フィルタ（`tenant::visible_rows` → `hybrid::hybrid_search_boosted`）の合流点の読み取り検証は ADR [`plan-rls-boost-interaction`](https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/docs/design/plan-rls-boost-interaction.md)（対応: TASK-139、Status: Accepted）を参照。**この ADR は執筆時点（`USING PLAN` の SQL 実行器 TASK-77 が未実装で許可リストが `42601` で拒否していた時点）の状態を記録したものであり**、検証を SQL 表層ではなく engine API 層（`tenant::visible_rows` → `hybrid::path_hint_matches`/`kind_hint_matches` → `hybrid::BoostRule::new` → `hybrid::hybrid_search_boosted`）に限定していた。0.1.0 時点では TASK-77 は実装済みで、`USING PLAN` は許可リストで拒否されず `sql::using_plan::bind_expansion` が既存 C4 ハイブリッド実行形（`Ranking::Hybrid`）へディスパッチする（`sql/using-plan.md` 参照）。ただし ADR 自身が挙げる「TASK-77 実装後の残課題」（`sql/exec.rs` が RLS 事前フィルタ済み可視行から `path`/`kind` ヒントを構築し `hybrid::hybrid_search_boosted` へ実結線する経路の production 検証）が完了したことを示す公開ソースはなく、ソフトブースト機構（TASK-111）自体の `sql/exec.rs` 結線も別 ADR で明示的にスコープ外とされたまま。したがって「RLS 事前フィルタとソフトブーストの合流点が SQL 表層（`USING PLAN` 経由）で検証済み」とは言えない。
- `USING PLAN` は明示 `USING MODE` 未指定時にプランナー推定の `mode_hint`（`precision`/`recall`、PLAN-11）を暗黙採用する。ADR [`using-plan-precision-empty-result`](https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/docs/design/using-plan-precision-empty-result.md)（Issue #315、Status: Accepted〔決定的フィクスチャでの再現・切り分け手順確定の範囲〕）は、`mode_hint: precision` 採用時に確信度ゲート（SEARCH-9）が RLS 可視集合の有無とは独立に 0 行の正常応答（SQL エラーなし）を返しうることを決定的フィクスチャで再現している（実 Ollama 環境での確定ではなく最有力仮説の位置づけ）。RLS 事前フィルタの可視性判定自体（`tenant::visible_rows`・`ImplicitRlsHook`）とは独立した経路であり、本ページが扱う RLS 契約を変更するものではない。
- spec 参照 ID（TABLE-9・TABLE-11・TABLE-12・RLS-1〜9 等）が指す判定条件の詳細本文は private spec（`vector-db-spec`）側が SSOT であり非公開のため、本ページには転記しない。
- (English) This crate's RLS is an internal row-visibility filter integrated into the engine's search paths (HNSW / plain scan), distinct from `supabase`'s Postgres `CREATE POLICY`-based RLS and `drizzle`'s `pgPolicy` / rls reference pages.

## Related

- [policy](./policy.md)
- [tenant](./tenant.md)
- [../storage/storage.md](../storage/storage.md)
- [../sql/using-plan.md](../sql/using-plan.md)
