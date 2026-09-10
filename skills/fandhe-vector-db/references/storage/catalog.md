---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/catalog.rs
---

# catalog

スキーマカタログ層（TASK-85、対象ビヘイビア: TABLE-1・TABLE-4・TABLE-5・TABLE-6）。`VECTOR(N)` 列型を含むテーブル定義（`TableSchema`）の DDL（`CREATE TABLE`・`ALTER TABLE ADD COLUMN`・`DROP TABLE` 相当の `Storage::drop_table`）と、その永続化（`storage.rs` の `redb::Database` を共有する専用テーブル `CATALOG_TABLE`）を担う。行データそのもの（`ROWS_TABLE`）には一切アクセスしない設計上の境界（TABLE-4/TABLE-5）。テーブルスコープ行 API（TASK-146、対象ビヘイビア: EXT-1・EXT-2）はテーブルごとに動的な redb テーブル（`user_rows/{table_name}`）へ行を分離し、挿入時に `TableSchema::validate_embedding_dim` で宣言次元との完全一致を検証する。

## Signature / Usage

```rust,ignore
/// カタログ層の公開エラー型。redb 操作由来のエラーは Backend に一本化し、
/// それ以外はすべて fail-closed な明示的な拒否理由を持つ。StorageError とは
/// 独立した型（coherence 制約により blanket From を共有できないため）。
#[derive(Debug)]
pub enum CatalogError {
    Backend(redb::Error),
    /// 識別子・型・次元数のフォーマットが不正（TABLE-6）。
    Invalid(String),
    /// 格納済みカタログ値のデコード失敗。ストレージ側の破損・想定外の格納状態を示す。
    /// wire クライアントへは detail を渡さず汎用メッセージへ丸める（security.md 対応）。
    CorruptSchema(String),
    /// 指定したテーブルがカタログに存在しない。
    TableNotFound(String),
    /// CREATE TABLE で同名テーブルが既に存在する（上書きしない。TABLE-4 前提）。
    TableAlreadyExists(String),
    /// ALTER TABLE ADD COLUMN で追加しようとした列名が既存列と重複する。
    ColumnAlreadyExists(String),
    /// テーブルスコープ行 API（TASK-146）で、指定した行 ID がそのテーブル内に存在しない。
    RowNotFound(u64),
    /// 既存 DB の行テーブルが旧フォーマット（物理キーが id のみ）で、現行の
    /// (tenant_id, id) 複合キー（TABLE-12）と互換でない。マイグレーションは提供せず
    /// fail-closed に拒否する。エラー文言にテーブル名・テナント ID を含めない。
    IncompatibleRowKeyFormat,
    /// テーブル単位の世代カウンタが u64 の上限に達した。
    TableGenerationCounterOverflow,
}

pub type Result<T> = std::result::Result<T, CatalogError>;

/// 列のデータ型（閉じた集合）。デコード時に未知の型名は既知の型へ黙殺
/// フォールバックせず CatalogError::Invalid で拒否する（TABLE-6）。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ColumnType {
    Text,
    /// 固定次元の埋め込み列（VECTOR(N)、TABLE-1）。0 と MAX_VECTOR_DIM 超過は
    /// encode・decode 両側で拒否する。
    Vector(u32),
}

/// テーブル定義中の 1 列。
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ColumnDef {
    pub name: String,
    pub ty: ColumnType,
    /// ALTER TABLE ADD COLUMN で追加された列は暗黙 nullable とする（TABLE-5）。
    pub nullable: bool,
}

impl ColumnDef {
    pub fn new(name: impl Into<String>, ty: ColumnType, nullable: bool) -> Self { /* ... */ }
}

/// テーブル定義。列の宣言順を保持する（ALTER TABLE ADD COLUMN は末尾追記のみ許可。TABLE-5）。
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct TableSchema {
    pub name: String,
    pub columns: Vec<ColumnDef>,
}

impl TableSchema {
    pub fn new(name: impl Into<String>, columns: Vec<ColumnDef>) -> Self { /* ... */ }

    /// 宣言済みの埋め込み次元（VECTOR(N) 列のうち最初に見つかったもの、TABLE-1）。
    pub fn vector_dim(&self) -> Option<u32> { /* ... */ }

    /// 挿入経路が、宣言済み次元と一致しない埋め込みを拒否するための検証ヘルパ
    /// （TABLE-1）。VECTOR 列を持たないテーブルへの呼び出しも fail-closed に拒否する。
    pub fn validate_embedding_dim(&self, dim: usize) -> Result<()> { /* ... */ }
}

/// Storage::scan_table_page のページングカーソル（行ストアの物理キーと同形の
/// (tenant_id, id)。TABLE-12）。storage.rs::RowCursor の re-export（生成点は
/// storage.rs に一元化。Issue #206）。
pub use crate::storage::RowCursor;

/// Storage::scan_table_page の戻り値（1 ページ分の行と、続きがある場合の RowCursor）。
pub type RowPage = (Vec<StorageRow>, Option<RowCursor>);
```

### カタログ DDL API（`impl Storage`）

`Storage`（`storage.rs`）の拡張として実装し、`Storage::db()` を経由して `ROWS_TABLE` とは別のテーブル（`CATALOG_TABLE`）のみを読み書きする。

```rust,ignore
impl Storage {
    /// 新規テーブルを定義する（TABLE-4）。同名テーブルが既に存在する場合は
    /// 上書きせず Err を返す。
    pub fn create_table(&self, schema: &TableSchema) -> Result<()> { /* ... */ }

    /// テーブル定義（CATALOG_TABLE エントリ）と、対応する行ストア
    /// （user_rows/{table_name}）を同一 write txn で削除する DROP TABLE 相当の DDL
    /// （Issue #179）。drop 前に構築された PrefilterSnapshot / PrefilterCache は
    /// 世代照合で stale になる（drop 専用の失効機構は追加しない）。全テナントの行を
    /// 不可逆に削除する。DROP TABLE 文自体は許可リスト外で 42601（未配線）。
    pub fn drop_table(&self, table_name: &str) -> Result<()> { /* ... */ }

    /// 既存テーブルへ列を末尾追記する（TABLE-5）。追加列は暗黙 nullable として
    /// 保持され、既存行のバイト列には一切触れない。column.nullable == false は
    /// fail-closed に拒否する。
    pub fn alter_table_add_column(&self, table_name: &str, column: ColumnDef) -> Result<()> { /* ... */ }

    /// テーブル定義を読み出す（スナップショット読み取り）。存在しない場合は
    /// Err(CatalogError::TableNotFound)。
    pub fn get_table_schema(&self, table_name: &str) -> Result<TableSchema> { /* ... */ }

    /// 定義済みテーブル名の一覧をスナップショット読み取りで返す。件数上限
    /// （MAX_LIST_TABLES = 10_000）を超える場合は Err（無制限 Vec 確保を防ぐ）。
    pub fn list_tables(&self) -> Result<Vec<String>> { /* ... */ }

    /// テーブルスコープで、指定テナントの名前空間から 1 行取得する（スナップショット
    /// 読み取り。TASK-146、EXT-1・EXT-2。物理キーは (tenant_id, id)）。本メソッド自体は
    /// 認可を行わない生の取得経路（可視性判定は呼び出し元 core.rs::EngineCore::get_row
    /// が行う）。
    pub fn get_row_from_table(
        &self,
        table_name: &str,
        tenant_id: &str,
        id: u64,
    ) -> Result<StorageRow> { /* ... */ }

    /// テーブルスコープで物理キー昇順 (tenant_id, id) に最大 limit 件を走査する
    /// 上限付きページング API（TASK-146、EXT-1・EXT-2）。storage.rs::Storage::scan_page
    /// と同じ行数上限（MAX_SCAN_PAGE_LIMIT）・バイト量上限（MAX_SCAN_PAGE_BYTES）を
    /// 適用。走査範囲はテーブル全行（テナントで絞らない。可視性判定は呼び出し元へ委譲）。
    pub fn scan_table_page(
        &self,
        table_name: &str,
        after: Option<(&str, u64)>,
        limit: u32,
    ) -> Result<RowPage> { /* ... */ }
}
```

## Notes

- `validate_identifier` / `user_rows_table_name` / `UserRowsTableDef` / `user_rows_table_def` / `map_row_table_error` / `require_table_schema_write` / `bump_table_generation_in_txn` / `table_generation_in_txn` / `table_lookup_error` / `get_table_schema_in_txn` / `insert_row_into_table` / `insert_rows_into_table` / `insert_typed_row` / `table_generation` はすべて `pub(crate)` のためクレート外非公開（`tenant.rs`・`rls.rs`・`arena.rs` が同一クレート内から利用する）。
- テーブル単位の世代カウンタ（`TABLE_GENERATION_TABLE`）はストレージ全体の `GENERATION_TABLE`（`storage.rs`）とは別テーブル。粒度がテーブル単位・全テナント共通であることの設計判断は Issue #285 で現状維持として確定した。根拠・移行トリガーは ADR `table-generation-rejection-granularity`（`https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/docs/design/table-generation-rejection-granularity.md`）を参照。
- `impl TableLookup for Storage` が `sql::allowlist::validate_statement`（TASK-74・SQL-8）から FROM テーブルのカタログ存在確認に使われる橋渡し実装。
- `DROP TABLE` 文自体は SQL 許可リスト外（`42601`）で、`Storage::drop_table` への配線は本ページ時点で行われていない（ソース中のコメントで明示）。
- 本ページの記述は公開ソース（scratchpad の pin SHA verbatim ソースと突合済み）から検証済み。

## Related

- [storage](./storage.md)
- [row-codec](./row-codec.md)
- [txn](./txn.md)
