---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/sql/ddl.rs
---

# sql::ddl

DDL（`CREATE TABLE`・`DROP TABLE`・`ALTER TABLE ADD COLUMN`・`CREATE INDEX` 等）の実行権限ゲートと実行本体。全 DDL 文が通る単一の権限判定点（`require_ddl_permission`）と、`catalog::Storage` の DDL 操作を SQL 表層の `SqlSurfaceError` 契約へ写像する `execute_*` 群を提供する。

## Signature / Usage

```rust,ignore
//! **判定順序（fail-closed。決定的）**: 構文検証
//! （`sql::allowlist::validate_create_table_tokens`／
//! `validate_drop_table_tokens`／`validate_alter_table_tokens`。いずれも
//! カタログ照会を一切行わない）→
//! [`require_ddl_permission`]（`42501`。カタログ照会なし・書き込み
//! トランザクション未開始）→ 実行本体（[`execute_create_table`]／
//! [`execute_drop_table`]／[`execute_alter_table_add_column`]。書き込み
//! トランザクション内で対象テーブル・列の存在・重複を判定。`42P07`／`42P01`／
//! `42701`）。権限を持たない主体には対象
//! テーブルの有無を問わず常に `42501` を返し、DDL 権限をテーブル存在の
//! オラクルにしない。

/// DDL 実行権限の唯一の判定点。`session.ddl_allowed()` が `false`（既定）の
/// 場合、カタログ照会・書き込みトランザクション開始のいずれよりも前に
/// [`SqlSurfaceError::InsufficientPrivilege`]（`42501`）へ fail-closed に落とす。
pub(crate) fn require_ddl_permission(session: &SessionState) -> Result<(), SqlSurfaceError>;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Default)]
pub struct CreateTableOutcome {}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct DropTableOutcome {}

pub(crate) fn execute_create_table(
    storage: &Storage,
    validated: &ValidatedCreateTable,
) -> Result<CreateTableOutcome, SqlSurfaceError>;

pub(crate) fn execute_drop_table(
    storage: &Storage,
    validated: &ValidatedDropTable,
) -> Result<DropTableOutcome, SqlSurfaceError>;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct AlterTableOutcome {
    pub table_name: String,
    pub action: AlterTableAction,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum AlterTableAction {
    /// `ADD COLUMN`（TASK-202、Issue #900）。
    AddColumn { column_name: String },
    /// `ADD [CONSTRAINT <name>] UNIQUE (...)`・`ADD [CONSTRAINT <name>] CHECK (<述語>)`
    /// のいずれの成功も本 variant を共有する。
    AddConstraint { constraint_name: String },
    // DropConstraint / DropColumn / AlterColumnType ... （ソース 326〜331 行付近）
}

pub(crate) fn execute_alter_table(
    storage: &Storage,
    validated: &crate::sql::allowlist::ValidatedAlterTable,
) -> Result<AlterTableOutcome, SqlSurfaceError>;
```

## Options / Props

`execute_*` 入口（いずれも `pub(crate)`、権限ゲート通過後に呼ばれる）。

| Name | Output | Description |
|------|--------|-------------|
| `execute_create_table` | `CreateTableOutcome` | `Storage::create_table` へ委譲。`TableAlreadyExists` → `42P07`。ENUM 列は登録済み型定義へ解決（未登録は `42601`） |
| `execute_drop_table` | `DropTableOutcome` | `Storage::drop_table`（カタログ・全テナント行・`operation_id` 台帳を単一 write txn で削除）。VIEW / FOREIGN KEY からの参照は `2BP01` |
| `execute_alter_table_add_column` | `AlterTableOutcome` | `Storage::alter_table_add_column`（O(1) 列追加）。列数上限超過は `54000`、列名重複は `42701` |
| `execute_alter_table_add_unique` | `AlterTableOutcome` | `alter_table_add_named_unique_constraint` |
| `execute_alter_table_add_primary_key` | `AlterTableOutcome` | `alter_table_add_named_primary_key`。省略時の制約名は `<table>_pkey` |
| `execute_alter_table_add_check` | `AlterTableOutcome` | CHECK 制約追加。名前衝突は `42710` |
| `execute_alter_table_add_foreign_key` | `AlterTableOutcome` | FOREIGN KEY 追加 |
| `execute_alter_table_drop_constraint` | `AlterTableOutcome` | 未検出は `42704`、FK 依存は `2BP01` |
| `execute_alter_table_drop_column` | `AlterTableOutcome` | 墓標方式の O(1) 削除 |
| `execute_alter_table_alter_column_type` | `AlterTableOutcome` | 型互換性不一致は `42804`、拡大変換は全テナント既存行を再エンコード |
| `execute_create_view` / `execute_drop_view` | `CreateViewOutcome` / `DropViewOutcome` | `Storage::create_view` / `drop_view` |
| `execute_create_index` / `execute_drop_index` | `CreateIndexOutcome` / `DropIndexOutcome` | `Storage::create_index`（HNSW / Scalar を判別）/ `drop_index` |
| `execute_create_type` / `execute_drop_type` | `CreateTypeOutcome` / `DropTypeOutcome` | `Storage::create_enum_type` / `drop_enum_type`（依存列があれば拒否） |

## Notes

- 出典はクレート `fandhe-db-engine` 0.2.0（git SHA `dc888f6ea146d3078153d64a6848f5c8cf044431`）の `src/sql/ddl.rs`（全1630行、テスト除く先頭 1332 行）。上記フェンスは公開型と `pub(crate)` 入口のシグネチャ・主要 doc comment の抜粋で、関数本体と private のエラー写像ヘルパー（`map_*_error` / `ensure_table_exists` / `undefined_table_or_view` 等）は掲載していない
- DDL 権限は `SessionState::ddl_allowed`（接続単位）で持ち、wire-server の handshake が認証成功後に 1 回だけ付与する。`PolicyContext` はテナント ID と可視性のみを運び、テナント境界とは別軸の権限（テーブル・カタログは全テナント共有）
- `AlterTableOutcome` は `table_name` と `action: AlterTableAction` を持つ。`DropColumn` / `AlterColumnType` variant 追加は原文 doc comment で **BREAKING CHANGE**（Issue #1167）と明記されている
- Issue #1195: 制約名衝突は UNIQUE・DROP 経路で `42P07`、CHECK・FK 経路で `42710`
- 書き込みゲートの待機上限超過は全 DDL 入口で `55P03`（`XX000` ではない）。`CREATE INDEX` の索引件数上限は `54000`
- 関連 ADR（commit `dc888f6`、`docs/design/`）: `sql-create-table.md`・`drop-table.md`・`truncate-table.md`・`sql-alter-table-add-column.md`・`index-ddl-declaration.md`・`enum-type-ddl.md`
- distinct from `mssql` / `drizzle` / `supabase`: fandhe-db 内部の DDL 実行層であり、drizzle-kit のマイグレーションや Supabase のスキーマ管理ではない

## Related

- [exec](./exec.md)
- [scalar-index](./scalar-index.md)
- [view](./view.md)
