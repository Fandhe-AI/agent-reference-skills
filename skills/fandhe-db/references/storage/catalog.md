---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/catalog.rs
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
    // --- 0.2.0 で追加された variant（ソースの doc comment を要約）---
    /// ENUM 型 DDL が参照した型名がカタログに存在しない。
    TypeNotFound(String),
    TypeAlreadyExists(String),
    /// DROP TYPE 相当で依存列が残っているため拒否（SQL 表層では 2BP01）。
    DependentObjectsStillExist(String),
    /// DROP VIEW の対象名がカタログ・ビュー双方に存在しない。
    ViewNotFound(String),
    /// 名前は存在するが期待するオブジェクト種別と一致しない（42809）。
    WrongObjectKind(String),
    /// DROP TABLE / DROP VIEW の対象を参照するビューが残っている（2BP01）。
    DependentViewsExist(String),
    /// ビュー関連の DoS 対策上限超過（54000）。
    ViewLimitExceeded(String),
    /// 明示トランザクションの単一ライタ占有により書き込み取得がロック待ち上限を超過。
    WriteLockTimeout,
    ColumnNotFound(String),
    /// DROP COLUMN / ALTER COLUMN TYPE の対象が予約列（id / tenant_id / visibility）または VECTOR 列。
    ProtectedColumn(String),
    /// ALTER COLUMN TYPE が受理する拡大変換に含まれない。
    IncompatibleTypeChange { column: String, from: String, to: String },
    /// ADD COLUMN で MAX_COLUMN_COUNT を超える。
    TooManyColumns { count: usize },
    /// 既存行にテナント内重複があるため UNIQUE 制約追加を拒否。
    UniqueConstraintViolation,
    /// 索引名が既存の索引・テーブル・ビュー名と衝突（42P07）。
    IndexAlreadyExists(String),
    IndexNotFound(String),
    /// 索引種別と対象列の型が不整合（SQL 表層では 0A000）。
    IndexKindMismatch(String),
    IndexLimitExceeded(String),
    /// FOREIGN KEY 宣言が参照先と整合しない（42830）。
    InvalidForeignKey(String),
    ConstraintAlreadyExists(String),
    /// 主キー宣言済みテーブルへ PRIMARY KEY を重ねた（42P16）。
    MultiplePrimaryKeys(String),
    ConstraintNotFound(String),
    ConstraintLimitExceeded(String),
    /// 既存行に新 FOREIGN KEY を満たさない参照元行があるため追加を拒否。
    ForeignKeyViolation,
    /// 主キー構成列が NULL の既存行があるため主キー追加を拒否（23502）。列名のみ保持。
    NotNullConstraintViolation(String),
}

pub type Result<T> = std::result::Result<T, CatalogError>;

/// 列のデータ型（閉じた集合）。デコード時に未知の型名は既知の型へ黙殺
/// フォールバックせず CatalogError::Invalid で拒否する（TABLE-6）。
/// 0.2.0 で Copy を外した（Enum が Arc<EnumTypeDef> を保持するため。Issue #890）。
/// variant 追加時は #[non_exhaustive] もワイルドカード腕も導入しない（Issue #880 D1）。
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum ColumnType {
    Text,
    /// 固定次元の埋め込み列（VECTOR(N)、TABLE-1）。0 と MAX_VECTOR_DIM 超過は
    /// encode・decode 両側で拒否する。
    Vector(u32),
    Integer,   // INTEGER（符号付き 32 ビット）
    BigInt,    // BIGINT（符号付き 64 ビット）
    Real,      // REAL
    Double,    // DOUBLE PRECISION
    Boolean,
    Date,      // 1970-01-01 起点の日数（i32）
    Timestamp, // タイムゾーンなし、1970-01-01 00:00:00 起点のマイクロ秒（i64）
    /// 可変長の同型スカラー配列列（<スカラー型>[]）。
    Array(ArrayType),
    Bytea,
    Json,
    Jsonb,
    /// 名前付き ENUM 型を参照する列。
    Enum(Arc<EnumTypeDef>),
    /// 十進固定小数列。1 <= precision <= 38、0 <= scale <= precision。
    Numeric { precision: u8, scale: u8 },
    Uuid,
}

impl ColumnType {
    /// VECTOR 列かどうか。
    pub fn is_vector(&self) -> bool { /* ... */ }
}

/// 配列列の要素型。VECTOR・ARRAY（入れ子・多次元）を型で除外する。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ArrayElemType {
    Text, Bool, Integer, BigInt, Real, Double, Date, Timestamp, Uuid,
    Numeric { precision: u8, scale: u8 },
    Bytea, Json, Jsonb, Enum,
}

/// 配列列 1 個の宣言（要素型 + 要素数上限）。構築経路は new / new_enum のみ。
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ArrayType { /* private fields */ }

/// 配列列 1 個が宣言できる要素数の実装上限。
pub const MAX_ARRAY_ELEMENTS: u32 = 1_024;

impl ArrayType {
    /// max_len が 1..=MAX_ARRAY_ELEMENTS の範囲外なら Err。ENUM 要素は new_enum を使う。
    pub fn new(elem: ArrayElemType, max_len: u32) -> Result<Self> { /* ... */ }
    pub fn new_enum(def: Arc<EnumTypeDef>, max_len: u32) -> Result<Self> { /* ... */ }
    pub fn elem(&self) -> ArrayElemType { /* ... */ }
    pub fn max_len(&self) -> u32 { /* ... */ }
    pub fn enum_def(&self) -> Option<&Arc<EnumTypeDef>> { /* ... */ }
}

/// ENUM 型 1 個のラベル数上限 / ラベル 1 個の UTF-8 バイト長上限。
pub const MAX_ENUM_LABELS: usize = 256;
pub const MAX_ENUM_LABEL_LEN: usize = 63;

/// ENUM 型の語彙違反。SQL 表層では 22P02 へ写像される。
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum EnumLabelError { NotInVocabulary }

/// 名前付き ENUM 型の定義。フィールドは private。
pub struct EnumTypeDef { /* name, labels */ }

impl EnumTypeDef {
    pub fn name(&self) -> &str { /* ... */ }
    /// 宣言順のラベル列。
    pub fn labels(&self) -> &[String] { /* ... */ }
    pub fn contains(&self, label: &str) -> bool { /* ... */ }
    /// engine・wire-server が共有する唯一の語彙検証実装。
    pub fn validate_label(&self, label: &str) -> std::result::Result<(), EnumLabelError> { /* ... */ }
}

/// 永続化済み VIEW 定義。body_sql は再パース可能な正規化 SQL。
pub struct ViewDef {
    pub base_relation: String,
    pub body_sql: String,
}

/// 索引種別。Scalar はスカラー列（1 列以上）、Hnsw は単一 VECTOR 列の ANN 索引。
/// 疎索引（BM25）は宣言の対象外。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum IndexKind { Scalar, Hnsw }

pub struct IndexDef {
    pub name: String,
    pub table: String,
    pub kind: IndexKind,
    pub columns: Vec<String>,
}

impl IndexDef {
    pub fn new(name: String, table: String, kind: IndexKind, columns: Vec<String>) -> Self { /* ... */ }
}

/// DEFAULT <literal> 句の値。型の大分類との整合のみカタログ層が検証する。
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum ColumnDefault {
    /// 文字列リテラルの原文（TEXT 値、または DATE / TIMESTAMP / UUID / ENUM 列では列型に従い解釈）。
    Text(String),
    Number(String),
    Bool(bool),
}

pub const MAX_COLUMN_DEFAULT_LEN: usize = 1024;

/// FOREIGN KEY の参照アクション（ON DELETE / ON UPDATE を独立に宣言）。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ReferentialAction { NoAction, Cascade, SetNull, SetDefault }

/// FOREIGN KEY の MATCH 句。MATCH PARTIAL は非対応（42601 で拒否）。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
#[non_exhaustive]
pub enum ForeignKeyMatch { Simple, Full }

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
#[non_exhaustive]
pub enum ForeignKeyDeferrability {
    NotDeferrable,
    DeferrableInitiallyImmediate,
    DeferrableInitiallyDeferred,
}

/// FOREIGN KEY 制約 1 件分。フィールドは private で、読み取りは各 getter 経由。
pub struct ForeignKeyDef { /* name, columns, parent_table, parent_columns, on_delete, on_update, match_type, deferrability */ }

impl ForeignKeyDef {
    pub fn name(&self) -> &str { /* ... */ }
    pub fn columns(&self) -> &[String] { /* ... */ }
    pub fn parent_table(&self) -> &str { /* ... */ }
    pub fn parent_columns(&self) -> &[String] { /* ... */ }
    pub fn on_delete(&self) -> ReferentialAction { /* ... */ }
    pub fn on_update(&self) -> ReferentialAction { /* ... */ }
    pub fn match_type(&self) -> ForeignKeyMatch { /* ... */ }
    pub fn deferrability(&self) -> ForeignKeyDeferrability { /* ... */ }
}

/// UNIQUE 制約 1 件分。フィールドは private。
pub struct UniqueConstraint { /* name, columns */ }

impl UniqueConstraint {
    pub fn name(&self) -> &str { /* ... */ }
    pub fn columns(&self) -> &[String] { /* ... */ }
}

/// ALTER TABLE DROP COLUMN で削除された列の墓標（物理ペイロード位置を保つため）。
pub struct DroppedSlot { /* ... */ }

/// テーブル定義中の 1 列。
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ColumnDef {
    pub name: String,
    pub ty: ColumnType,
    /// NOT NULL / DEFAULT なしで ADD COLUMN された列は nullable（TABLE-5）。
    pub nullable: bool,
    /// DEFAULT <literal> 句。明示的な NULL には適用されない。
    pub default: Option<ColumnDefault>,
}

impl ColumnDef {
    pub fn new(name: impl Into<String>, ty: ColumnType, nullable: bool) -> Self { /* ... */ }
    pub fn with_default(mut self, default: ColumnDefault) -> Self { /* ... */ }
}

/// テーブル定義。columns は論理列（生存列のみ）の宣言順。削除済み列・主キー・UNIQUE /
/// CHECK / FOREIGN KEY 制約は非公開フィールドで持つ。
/// 破壊的変更（Issue #901）: 非公開フィールド dropped の追加により、外部クレートからの
/// `TableSchema { name, columns }` 構造体リテラル構築はコンパイル不能。TableSchema::new を使う。
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct TableSchema {
    pub name: String,
    pub columns: Vec<ColumnDef>,
    // 非公開: dropped / primary_key / primary_key_name / unique_constraints / checks / foreign_keys ほか
}

/// 主キー制約の導出名（<table>_pkey）。
pub fn primary_key_constraint_name(table: &str) -> String { /* ... */ }

impl TableSchema {
    pub fn foreign_keys(&self) -> &[ForeignKeyDef] { /* ... */ }
    pub fn primary_key(&self) -> Option<&[String]> { /* ... */ }
    pub fn with_primary_key(mut self, columns: Vec<String>) -> Self { /* ... */ }
    pub fn primary_key_constraint_name_effective(&self) -> Option<String> { /* ... */ }
    pub fn unique_constraints(&self) -> &[UniqueConstraint] { /* ... */ }
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
    /// 不可逆に削除する。（0.1.0 の doc comment にあった「DROP TABLE 文自体は許可リスト外で 42601（未配線）」は 0.2.0 には当てはまらない。下の Notes 参照）
    pub fn drop_table(&self, table_name: &str) -> Result<()> { /* ... */ }

    /// 既存テーブルへ列を末尾追記する（TABLE-5）。追加列は暗黙 nullable として
    /// 保持され、既存行のバイト列には一切触れない。column.nullable == false は
    /// fail-closed に拒否する。
    pub fn alter_table_add_column(&self, table_name: &str, mut column: ColumnDef) -> Result<()> { /* ... */ }

    // --- 0.2.0 で追加（シグネチャのみ。ソースの doc comment 全文は未転記）---
    pub fn alter_table_drop_column(&self, table_name: &str, column_name: &str) -> Result<()> { /* ... */ }
    pub fn alter_table_add_unique_constraint(&self, table_name: &str, columns: &[&str]) -> Result<()> { /* ... */ }
    pub fn alter_table_add_named_unique_constraint(
        &self,
        table_name: &str,
        name: Option<&str>,
        columns: &[&str],
    ) -> Result<String> { /* ... */ }
    pub fn alter_table_add_primary_key(&self, table_name: &str, columns: &[&str]) -> Result<String> { /* ... */ }
    pub fn alter_table_add_named_primary_key(
        &self,
        table_name: &str,
        name: Option<&str>,
        columns: &[&str],
    ) -> Result<String> { /* ... */ }
    pub fn alter_table_drop_constraint(&self, table_name: &str, name: &str) -> Result<()> { /* ... */ }
    pub fn alter_table_widen_numeric_precision(
        &self,
        table_name: &str,
        column_name: &str,
        new_precision: u8,
    ) -> Result<()> { /* ... */ }
    pub fn create_enum_type(&self, name: &str, labels: Vec<String>) -> Result<Arc<EnumTypeDef>> { /* ... */ }
    pub fn get_enum_type(&self, name: &str) -> Result<Arc<EnumTypeDef>> { /* ... */ }
    pub fn alter_enum_type_add_value(&self, name: &str, label: String) -> Result<Arc<EnumTypeDef>> { /* ... */ }
    pub fn drop_enum_type(&self, name: &str) -> Result<()> { /* ... */ }
    pub fn create_view(&self, name: &str, base_relation: &str, body_sql: &str) -> Result<()> { /* ... */ }
    pub fn drop_view(&self, name: &str) -> Result<()> { /* ... */ }
    pub fn create_index(&self, def: &IndexDef) -> Result<()> { /* ... */ }
    pub fn drop_index(&self, name: &str) -> Result<()> { /* ... */ }
    pub fn list_indexes(&self) -> Result<Vec<IndexDef>> { /* ... */ }
    pub fn view_definition(&self, name: &str) -> Result<Option<ViewDef>> { /* ... */ }

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
- テーブル単位の世代カウンタ（`TABLE_GENERATION_TABLE`）はストレージ全体の `GENERATION_TABLE`（`storage.rs`）とは別テーブル。粒度がテーブル単位・全テナント共通であることの設計判断は Issue #285 で現状維持として確定した。根拠・移行トリガーは ADR `table-generation-rejection-granularity`（`https://raw.githubusercontent.com/Fandhe-AI/fandhe-db/dc888f6ea146d3078153d64a6848f5c8cf044431/docs/design/table-generation-rejection-granularity.md`）を参照。
- `impl TableLookup for Storage` が `sql::allowlist::validate_statement`（TASK-74・SQL-8）から FROM テーブルのカタログ存在確認に使われる橋渡し実装。
- Migration (0.1.0 → 0.2.0): `ColumnType` は `Copy` でなくなった（`Enum(Arc<EnumTypeDef>)` を保持するため。Issue #890）。呼び出し側は `column.ty.clone()` または `&column.ty` を使う。`TableSchema` は非公開フィールドが加わり、外部クレートからの構造体リテラル構築は不可（`TableSchema::new` を使う）。`ColumnDef` に `pub default: Option<ColumnDefault>` が加わった（`ColumnDef::new` は `default: None`）。`CatalogError` に多数の variant が加わり、網羅 `match` は追随が必要（`NotNullConstraintViolation` はソース doc で BREAKING CHANGE と明記）。
- 0.2.0 では SQL 表層の `DROP TABLE` が実装されている（`sql/allowlist.rs` に `ValidatedDropTable`、`sql/ddl.rs` に `execute_drop_table` が存在する）。0.2.0 の `drop_table` の doc comment によれば、SQL 表層の `DROP TABLE` は DDL 実行権限ゲート（`sql::ddl::require_ddl_permission`、既定拒否・`42501`）を通過したセッションに限り `execute_drop_table` 経由で `Storage::drop_table` へ到達する。0.1.0 時点の「`DROP TABLE` 文自体は許可リスト外（`42601`）」という記述は 0.2.0 には当てはまらない。詳細は `sql-execution/ddl.md` を参照。
- pub 項目のうち `IndexCatalogGateCacheStats`（pub struct）は索引カタログ照会のキャッシュ統計用で、本ページでは詳細未転記。
- 本ページの記述は `fandhe-db-engine` 0.2.0 の `src/catalog.rs`（crates.io `.crate` を展開したソース、git SHA `dc888f6ea146d3078153d64a6848f5c8cf044431`）の pub 項目一覧と doc comment から更新した。カタログのバイト列エンコード（v2〜v13）の詳細は未転記。

## Related

- [storage](./storage.md)
- [row-codec](./row-codec.md)
- [txn](./txn.md)
