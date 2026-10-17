---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/sql/ddl_column_type.rs
---

# sql::ddl_column_type

SQL 型名の許可リスト構造解析（TASK-202・SQL-23・Issue #900）。`ALTER TABLE ADD COLUMN`・`ALTER COLUMN TYPE`（Issue #1167）が呼び出し元。トークンスライスと読み取り位置だけを引数に取る独立実装で、構文木 `SqlColumnTypeName` を返すところまでを責務とする。

## Signature / Usage

~~~rust,ignore
//! SQL 型名の許可リスト構造解析（TASK-202・SQL-23。Issue #900。
//! `ALTER TABLE ADD COLUMN`・`ALTER COLUMN TYPE`（Issue #1167）が呼び出し元）。
//!
//! `catalog::ColumnType` へは変換しない。ENUM 型名（未知の識別子）の存在確認・
//! 語彙解決は実行段（`sql::ddl::execute_alter_table_add_column`）が
//! `Storage::get_enum_type` で行う契約とし、本モジュールは構文木
//! （[`SqlColumnTypeName`]）を返すところまでに責務を限定する。
//!
//! `NUMERIC`/`DECIMAL` の精度・位取りの範囲検証（`1 <= precision <= 38`・
//! `scale <= precision`）はここでは行わない——`catalog::alter_table_add_column`
//! が内部で呼ぶ `validate_column` に一本化されており、ここでは構文上の形
//! （`u8` として妥当な非負整数か）だけを検証する。範囲外の値は実行段で
//! `CatalogError::Invalid`（`sql::ddl` が `42601` へ写像）として拒否される。

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum SqlColumnTypeName {
    Text,
    Integer,
    BigInt,
    Real,
    /// `DOUBLE PRECISION`（2 語）。
    Double,
    Boolean,
    Date,
    Timestamp,
    Bytea,
    Json,
    Jsonb,
    Uuid,
    /// `VECTOR(N)`。次元は構文上の非負整数のみ検証する。
    Vector(u32),
    /// `NUMERIC(precision, scale)`／`DECIMAL(precision, scale)`。
    Numeric { precision: u8, scale: u8 },
    /// 上記いずれの予約型名にも一致しなかった識別子。ENUM 型名の候補として
    /// 実行段が `Storage::get_enum_type` で存在確認・語彙解決する。
    Enum(String),
    /// `<型>[]`／`<型>[N]`（Issue #1348）。`max_len` が `None` は `[]`。
    Array { elem: Box<SqlColumnTypeName>, max_len: Option<u32> },
}

pub(crate) fn parse_column_type_name(tokens: &[Token], pos: &mut usize)
    -> Result<SqlColumnTypeName, SqlSurfaceError>
pub(crate) fn to_static_column_type(ty: &SqlColumnTypeName)
    -> Result<StaticColumnType, SqlSurfaceError>
~~~

## Notes

- 上記フェンスは原文 module doc の抜粋と公開型・関数シグネチャ（`parse_base_type_name` 等の本体、`StaticColumnType` の変換表、テストは省略）。クレート外から使える公開型は `SqlColumnTypeName` のみ。
- `VECTOR(N)` は構文としては受理するが、`ALTER TABLE ADD COLUMN` の実行段は常に `0A000` で拒否する（既存行が埋め込みバイトを持たないテーブルへの追加は安全性未検証）。`CREATE TABLE` は従来どおり受理する。
- 配列型（TABLE-14・Issue #1348）: 多次元（`<型>[][]`）は構文段で `42601`。`[N]` の `N` は書き込み時の要素数上限で、PostgreSQL と異なりサイズ指定は無視されず超過書き込みが `54000`。`[]` は `MAX_ARRAY_ELEMENTS`。要素が `VECTOR`・配列は `42601`。NUMERIC・BYTEA・JSON・JSONB・ENUM 要素は受理（Issue #1357）。
- `to_static_column_type` はカタログ非参照の純関数。ENUM 候補は `StaticColumnType::EnumCandidate`／`ArrayOfEnumCandidate` として未解決のまま運ばれ、実行段が語彙を解決する。
- Distinct from `mssql` (node-mssql, T-SQL client) / `drizzle` (TypeScript ORM) / `supabase` (Postgres): the type-name set is this engine's closed allowlist; unknown identifiers are treated as ENUM type candidates, not arbitrary PostgreSQL types.

## Related

- [allowlist](./allowlist.md)
- [lexer](./lexer.md)
- [parser](./parser.md)
