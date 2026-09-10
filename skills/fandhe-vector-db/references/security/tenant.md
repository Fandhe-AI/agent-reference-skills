---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/tenant.rs
---

# tenant

行ストア統合層の参照実装。テナント境界・可視性でフィルタした行の列挙（`visible_rows`）と検索結果の独立再検証（`verify_hits`）、および `PolicyContext` を通じた書き込み系操作（`insert_row` / `update_row` / `delete_row` 等、TASK-95・対象ビヘイビア: RECOVER-4）を提供する。

## Signature / Usage

```rust,ignore
/// `visible_rows` が保持してよい可視行数の上限。無制限 `Vec` 確保を避ける
/// （coding-rust.md「長さフィールドは上限検証してからアロケーションに使う」対応）。
const MAX_VISIBLE_ROWS: usize = 100_000;

/// `visible_rows` が 1 回の呼び出しで走査してよい総行数（可視・不可視を問わない）の上限。
const MAX_SCANNED_ROWS: usize = 1_000_000;

/// `visible_rows`・`verify_hits` のエラー型。
pub enum TenantError {
    /// [`crate::catalog`] 側のエラー（テーブル不存在・行破損・redb バックエンドエラー等）。
    Catalog(CatalogError),
    /// 可視行数が [`MAX_VISIBLE_ROWS`] を超えたため、走査を打ち切って fail-closed に
    /// 拒否した（部分的な結果を黙って返さない）。
    TooManyVisibleRows { max: usize },
    /// 総走査行数（可視・不可視を問わない）が [`MAX_SCANNED_ROWS`] を超えたため、
    /// 走査を打ち切って fail-closed に拒否した。大量の不可視行を持つテーブルに対する
    /// 計算量 DoS（出力は増えないまま全ページのデコード・ポリシー評価を強制される
    /// 経路）を防ぐ（security.md テナント境界 P0。codex-review 指摘・PR #153）。
    TooManyRowsScanned { max: usize },
    /// [`verify_hits`] に渡された id が、走査対象テーブルの可視行集合に含まれない
    /// （不可視行・捏造 id のいずれも区別せず本 variant に統一する。他テナントの
    /// 存在情報を漏らさないため。security.md P0）。
    HitOutsideVisibleSet,
}

/// `table` の全行を上限付きページング（`Storage::scan_table_page`）で走査し、`ctx`
/// （[`PolicyContext::is_visible`]）が可視と判定する行だけを列挙する（TABLE-9・
/// TABLE-11 の参照実装）。
///
/// 可視行数が [`MAX_VISIBLE_ROWS`] を超える場合は部分結果を返さず
/// [`TenantError::TooManyVisibleRows`] で拒否する。総走査行数（可視・不可視を
/// 問わない）が [`MAX_SCANNED_ROWS`] を超える場合も同様に部分結果を返さず
/// [`TenantError::TooManyRowsScanned`] で拒否する（他テナントの不可視行を大量に
/// 格納したテーブルに対する計算量 DoS を防ぐ。security.md テナント境界 P0）。
/// テーブル不存在は [`CatalogError::TableNotFound`] のまま [`TenantError::Catalog`]
/// へ伝播する（存在情報の扱いは呼び出し元の責務）。
pub fn visible_rows(
    storage: &Storage,
    table: &str,
    ctx: &PolicyContext,
) -> Result<Vec<Row>, TenantError>

/// 検索結果 `hits` が、`table` に対する `ctx` の可視集合へすべて収まって
/// いることを **`(tenant_id, id)` の完全な行キー**で fail-closed に検証する
/// （TABLE-11: `EngineCore::search`/`PrefilterIndex::search` の内部実装と
/// 独立した経路で裏付けるためのヘルパ）。
///
/// 1 件でも可視集合外の id があれば、走査を打ち切り即座に
/// [`TenantError::HitOutsideVisibleSet`] を返す。
pub fn verify_hits(
    storage: &Storage,
    table: &str,
    ctx: &PolicyContext,
    hits: &[SearchHit],
) -> Result<(), TenantError>

/// `insert_row`・`update_row`・`delete_row` のエラー型。
pub enum TenantWriteError {
    /// 呼び出し元が入力した `RowInput::tenant_id` が `ctx` のテナントと不一致
    /// （クライアント自身の入力に起因するため存在情報を含まない）。他テナント名義の
    /// 新規行の書き込み・自テナント行の他テナントへの付け替え試行の両方がここに入る。
    Forbidden,
    /// UPDATE/DELETE 対象行が不存在、または `ctx` が所有しない行（区別しない。
    /// 存在情報を漏らさないため fail-closed に統一する。security.md P0）。
    NotFound,
    /// INSERT 先 id に既存行がある（所有者を問わず同一 variant。上書きによる他テナント
    /// 行の破壊を遮断しつつ、所有テナントの存在情報を漏らさない）。
    IdConflict,
    /// `operation_id` の省略（句の欠落・明示 `NULL` を含む）。台帳あり構成
    /// （`recovery::required_op_id::LedgerMode::Ledgered`、既定）では書き込み系操作に
    /// `operation_id` の指定を必須とする（TASK-92・対象ビヘイビア: RECOVER-1。
    /// 実際に返る時点で書き込みトランザクションは未開始。`wire_code` は `23502`）。
    MissingOperationId,
    /// [`crate::catalog`] 側のエラー（テーブル不存在・行破損・redb バックエンドエラー等）。
    Catalog(CatalogError),
    /// [`crate::storage`] 側のエンコード/デコードエラー（`RowInput` の入力検証失敗等）。
    Storage(StorageError),
    /// `operation_id` 台帳（`crate::recovery::ledger`）テーブルの読み書きで検出した
    /// 内部エラー。`Storage(StorageError::Codec)` と型を分ける（台帳の破損はクライアントが
    /// 送った行データとは無関係のサーバー内部事象であり、「行データ不正（`22000`）」へ
    /// 丸めると誤情報になるため）。`wire_code` は常に `XX000`（内部事象）に固定する
    /// （fail-closed）。
    LedgerCorrupted(StorageError),
    /// 台帳（TASK-93）に記録済みの `operation_id` へ、**内容が一致する**書き込みが
    /// 再送された（TASK-101・対象ビヘイビア: RECOVER-10。TASK-94・RECOVER-3 の
    /// 重複拒否契約を包含する）。commit 済み確定の根拠として扱ってよく、`23505`
    /// （`UniqueViolation` と同じ分類）へ写像する。行キー衝突（[`IdConflict`]）とは
    /// 別 variant にすることで、クライアントが「先行実行が commit 済み」の判定を
    /// 行キー衝突と取り違えない固定文言を返せるようにする。
    DuplicateOperationId,
    /// 台帳に記録済みの `operation_id` へ、**内容が異なる**書き込みが再送された、
    /// または内容一致を証明できない旧フォーマット（v1）エントリへ再送された
    /// （TASK-101・RECOVER-10）。commit 済み確定の根拠にしない fail-closed 判定
    /// （`22023`）。行内容・テナント・他テナントの存在情報は含まない。
    OperationIdContentMismatch,
}

impl TenantWriteError {
    /// SQLSTATE 風 `wire_code`。内部実装は [`crate::error_format::ClassifiedError`] の
    /// 分類器へ委譲する（本モジュールに variant ごとの match 表は無い）。
    pub fn wire_code(&self) -> &'static str {
        crate::error_format::ClassifiedError::wire_code(self)
    }
}

/// `table` へ新規行を 1 件挿入する（TASK-95・対象ビヘイビア: RECOVER-4）。
///
/// `row.tenant_id` が `ctx` のテナントと不一致なら [`TenantWriteError::Forbidden`]
/// （他テナント名義での新規行書き込み・テナント付け替えの試行を遮断。判定は
/// [`PolicyContext::is_owner`] の単一照合パス経由）。
///
/// 重複検出のスコープ（対象ビヘイビア: TABLE-12・RLS-9）: 行ストアの物理キーは
/// `(tenant_id, id)` で名前空間化されており、既存行の照会は**サーバー側導出テナント
/// （`ctx.tenant_id()`）の名前空間内だけ**を対象とする（クライアント自己申告の
/// `row.tenant_id` はキー構築に用いない）。したがって同一テナント内の重複のみ
/// [`TenantWriteError::IdConflict`]（`23505`）となり、他テナントが同じ `id` を
/// 保持していても本経路は通常どおり成功する。他テナント行の有無で分岐する処理を
/// 一切持たないため、応答（成否・`wire_code`・文言）からも実行経路の分岐からも
/// 他テナントの存在情報を観測できない（fail-closed）。
///
/// スキーマ取得・次元検証・所有権判定・書き込みを単一の write トランザクション内で
/// 行い、失敗時は commit せずトランザクションを破棄する（TOCTOU を作らない）。
///
/// `operation_id` を必須引数として要求し、`LedgerMode::Ledgered` で内部ガードして
/// から `insert_row_unchecked` へ委譲する（TASK-92・対象ビヘイビア: RECOVER-1）。
pub fn insert_row(
    storage: &Storage,
    table: &str,
    ctx: &PolicyContext,
    id: u64,
    row: &RowInput<'_>,
    operation_id: &OperationId,
) -> Result<(), TenantWriteError>

/// `table` へ複数行をまとめて挿入する（[`insert_row`] のバッチ版。TASK-95・
/// 対象ビヘイビア: RECOVER-4, TABLE-12, RLS-9）。
///
/// 認可・重複検出の契約は [`insert_row`] と同一で、バッチ全体を単一の write
/// トランザクションで処理する（1 件でも拒否されれば commit せず全体が未反映になる）。
///
/// - `row.tenant_id` が `ctx` と不一致な行が 1 件でもあれば [`TenantWriteError::Forbidden`]
///   （ストレージへ触れる前に全件を検査する）
/// - 物理キーは `(ctx.tenant_id(), id)`（TABLE-12）。既存行との衝突、および
///   **同一バッチ内の id 重複**はいずれも [`TenantWriteError::IdConflict`]。後者を
///   検出しないと、バッチ内の後勝ちで先行行が黙って上書きされ、[`insert_row`] が
///   守っている「既存行を上書きしない」契約をバッチ経由で迂回できてしまう
/// - 他テナントが同じ `id` を保持していても成功する（別キーのため。RLS-9）
///
/// 空バッチはテーブル存在確認のみを行い、世代を進めずに成功する。
///
/// `operation_id` を必須引数として要求し、`LedgerMode::Ledgered` で内部ガードして
/// から `insert_rows_unchecked` へ委譲する（[`insert_row`] と同じ設計。TASK-92・
/// RECOVER-1）。
pub fn insert_rows(
    storage: &Storage,
    table: &str,
    ctx: &PolicyContext,
    rows: &[(u64, RowInput<'_>)],
    operation_id: &OperationId,
) -> Result<(), TenantWriteError>

/// スキーマ列順の型付き値列から 1 行挿入する。
pub fn insert_typed_row(
    storage: &Storage,
    table: &str,
    ctx: &PolicyContext,
    id: u64,
    visibility: crate::storage::Visibility,
    values: &[crate::row_codec::Value],
    operation_id: &OperationId,
) -> Result<(), TenantWriteError>

/// `table` の既存行を 1 件更新する（TASK-95・対象ビヘイビア: RECOVER-4）。
pub fn update_row(
    storage: &Storage,
    table: &str,
    ctx: &PolicyContext,
    id: u64,
    row: &RowInput<'_>,
    operation_id: &OperationId,
) -> Result<(), TenantWriteError>

/// `table` の既存行を 1 件削除する（TASK-95・対象ビヘイビア: RECOVER-4）。
pub fn delete_row(
    storage: &Storage,
    table: &str,
    ctx: &PolicyContext,
    id: u64,
    operation_id: &OperationId,
) -> Result<(), TenantWriteError>

/// [`replace_typed_rows_by_text_key`] の成功応答。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct ReplaceOutcome {
    pub removed: usize,
    pub inserted: usize,
    pub first_id: Option<u64>,
}

/// テキスト列 `key_column` の値が `key_value` に一致するテナント内の既存行を
/// すべて削除し、代わりに `rows` を新規挿入する（`pub(crate)`。crate 非公開 API）。
pub(crate) struct ReplaceByTextKey<'a> {
    pub table: &'a str,
    pub key_column: &'a str,
    pub key_value: &'a str,
    pub visibility: crate::storage::Visibility,
    pub rows: &'a [Vec<crate::row_codec::Value>],
    pub content_hash_path: &'a str,
    pub content_hash_body: &'a str,
    pub content_hash_template_values: &'a [crate::row_codec::Value],
    pub ledger_write: LedgerWrite<'a>,
}

pub(crate) fn replace_typed_rows_by_text_key(
    storage: &Storage,
    ctx: &PolicyContext,
    req: ReplaceByTextKey<'_>,
) -> Result<ReplaceOutcome, TenantWriteError>
```

## Notes

- rustdoc は抄録（一部段落を省略）。全文は `source:` の docs.rs source view を参照。
- `insert_row` / `insert_rows` / `insert_typed_row` / `update_row` / `delete_row` はいずれも `ctx: &PolicyContext` を受け取り、書き込み認可は `PolicyContext::is_owner`（テナント一致のみ、可視性ラベルは考慮しない）で判定される（`policy.md` 参照）。読み取り可視性の拡張が書き込み権限の拡張を意味しない。
- `visible_rows` は `MAX_VISIBLE_ROWS`（100,000）・`MAX_SCANNED_ROWS`（1,000,000）の上限を持ち、超過時は `TenantError::TooManyVisibleRows` / `TooManyRowsScanned` を返す（無制限 `Vec` 確保を避ける fail-closed 設計）。
- `verify_hits` は検索結果 `hits` の `(tenant_id, id)` 完全一致を独立に再検証する検査器であり、`rls.rs::RlsSafetyNet` とは別経路の防御層。ADR [`plan-rls-boost-interaction`](https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/docs/design/plan-rls-boost-interaction.md) はこの `verify_hits`（C5）を、`tenant::visible_rows`（C1）→ `hybrid::hybrid_search_boosted`（C4）の合流点検証における独立検査器として扱う（一部テストに限定）。
- `operation_id`（`OperationId`）の冪等性契約は `TenantWriteError` の variant docstring（上記）で追跡できる範囲を記載した: `MissingOperationId`（台帳あり構成で必須、`wire_code` `23502`）・`DuplicateOperationId`（内容一致の再送、commit 済み確定として `23505`）・`OperationIdContentMismatch`（内容不一致または旧フォーマットへの再送、`22023`）。台帳の実装詳細（`crate::recovery::ledger`）自体は本 scope（security）の対象外。
- `ReplaceOutcome` は `pub`（公開応答型）。`ReplaceByTextKey` / `replace_typed_rows_by_text_key` は `pub(crate)`（crate 非公開 API）。
- `TenantWriteError::IdConflict` の doc「所有者を問わず同一 variant」は、既存行との衝突を他テナントとの衝突とみなす意味ではない。物理キーは `(tenant_id, id)` でテナント毎に名前空間化されており、既存行の照会は**サーバー側導出テナント（`ctx.tenant_id()`）の名前空間内だけ**を対象とするため（`insert_row` の doc「重複検出のスコープ」参照）、`IdConflict` は**同一テナント内の重複のみ**で発生する。「所有者を問わず」は、同一テナント名前空間内で既存行が誰の書き込みで作られたか（先行する同一/別セッションの呼び出し）を区別せず同じ variant に丸めるという意味であり、他テナントが同じ `id` を保持していても衝突しない（本経路は通常どおり成功する）。
- (English) This crate's tenant isolation (`PolicyContext`-scoped `visible_rows` / `verify_hits` / write ownership checks) is an internal row-visibility mechanism integrated into the engine, distinct from `supabase`'s Postgres `CREATE POLICY`-based RLS and `drizzle`'s `pgPolicy` / rls reference pages.

## Related

- [policy](./policy.md)
- [rls](./rls.md)
- [../storage/storage.md](../storage/storage.md)
