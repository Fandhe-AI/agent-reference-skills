---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/sql/check_constraint.rs
---

# sql::check_constraint

`CREATE TABLE` / `ALTER TABLE ADD CHECK` の `CHECK` 制約（TABLE-16・TASK-204、Issue #906）の意味論検証・正規化レンダリング・書き込み時コンパイル/評価。

## Signature / Usage

```rust,ignore
//! 責務境界: 構文段（`sql::allowlist::Parser::parse_check_clause`）が組み立てた
//! [`ParsedCheck`] を受け取り、`sql::parser::bind_check_predicates`（`sql::parser::
//! bind_where_predicates` と束縛経路を共有する CHECK 専用の薄いラッパー）へそのまま
//! 委譲して意味論検証する（第 2 の評価器を作らない）。CHECK 固有の追加検証は
//! 「参照可能な要素の絞り込み」（`visible()`・セッション UDF・WASM UDF・未知関数の拒否）と
//! 「正規化レンダリングの往復一致」のみ。
//!
//! `CompiledChecks` は書き込み時の単一検査点 `constraint::enforce_row_constraints_in_txn`
//! が呼ぶ実行時コンパイル・評価本体で、`row_codec::scan_scalar_columns_masked`
//! （宣言的フィルタ側）・`sql::expr_program::ExprProgram`（式フィルタ側）で評価する。
//!
//! `CHECK` の式比較（`WherePredicate::Expression`）で参照できるのは疑似列
//! `id`・`VECTOR` 列（`vec_norm`/`vec_sum`/`vec_div` 経由）・INTEGER/BIGINT/
//! REAL/DOUBLE 列。TEXT/BOOLEAN/DATE/NUMERIC 等の他の列型は引き続き拒否される。

pub(crate) fn render_predicates(predicates: &[WherePredicate]) -> String;

pub(crate) fn recompute_referenced_columns(
    schema: &TableSchema,
    check: &CheckConstraint,
) -> Result<Vec<String>, SqlSurfaceError>;

pub(crate) fn validate_and_build(
    schema: &TableSchema,
    parsed: &[ParsedCheck],
) -> Result<Vec<CheckConstraint>, SqlSurfaceError>;

pub(crate) fn build_check_constraint(
    schema: &TableSchema,
    check: &ParsedCheck,
    name: String,
) -> Result<CheckConstraint, SqlSurfaceError>;

pub(crate) fn default_alter_table_check_name(table: &str, used: &[String]) -> String;

pub(crate) struct CompiledChecks { /* checks, column_mask */ }

impl CompiledChecks {
    pub(crate) fn compile(
        schema: &TableSchema,
    ) -> Result<Option<CompiledChecks>, TenantWriteError>;

    pub(crate) fn enforce(
        &self,
        schema: &TableSchema,
        id: u64,
        embedding: &[f32],
        metadata: &[u8],
    ) -> Result<(), TenantWriteError>;
}
```

## Options / Props

| Name | Description |
|------|-------------|
| `render_predicates` | 述語を `AND` 連結の正規化 SQL テキストへレンダリング。`parse_check_predicate_text` で往復再パース可能 |
| `validate_and_build` | `CREATE TABLE` の `ParsedCheck` 一覧を検証し `CheckConstraint` 一覧へ変換。手順: 禁止要素検出（`42601`）→ `bind_where_predicates` 相当の束縛 → 参照列抽出 → 制約名確定 → 往復一致検証（`42601`） |
| `build_check_constraint` | 1 件分の検証・組み立て。`validate_and_build` と `ALTER TABLE ADD CHECK`（Issue #1068）が共有 |
| `default_alter_table_check_name` | 名前省略時の既定名 `<table>_check`。`used` は UNIQUE 実名と既存 CHECK 実名の和集合を渡す |
| `CompiledChecks::compile` | `schema.checks()` が空なら `None`（オーバーヘッドゼロ）。再束縛失敗は `XX000`（fail-closed） |
| `CompiledChecks::enforce` | 書き込んだ行を読み戻して全 CHECK を検査 |

## Notes

- 出典は `fandhe-db-engine` 0.2.0（git SHA `dc888f6ea146d3078153d64a6848f5c8cf044431`）の `src/sql/check_constraint.rs`（全1522行、テスト除く先頭 829 行）。公開・`pub(crate)` アイテムのシグネチャと主要 doc comment の抜粋で、private ヘルパー（`render_expr` / `reject_forbidden_elements` / `referenced_column_names` 等）と本体は掲載していない
- 訂正: 上記 Signature 引用のモジュールコメント「TEXT/BOOLEAN/DATE/NUMERIC 等の他の列型は引き続き拒否される」は 0.2.0 の実装と一致しない（原文に残った古い記述）。`bind_check_predicates` は WHERE と共通の `bind_where_predicates_recursive` → `udf_call::bind_expr_in` を通り、式内で参照できるのは疑似列 `id`・`VECTOR` 列・INTEGER/BIGINT/REAL/DOUBLE・TEXT・DATE・TIMESTAMP 列。BOOLEAN・NUMERIC・UUID・ENUM・ARRAY・BYTEA・JSON/JSONB 列は `22000` で拒否される（`src/sql/udf_call.rs` の `bind_expr_in`、Issue #1183 で CHECK 専用 opt-in を撤廃）
- 三値論理（SQL 標準）: 連言の参照列・参照ベクトルが NULL なら UNKNOWN としてスキップし、非 NULL で不一致のときのみ違反。AND 連結のため「いずれかの連言が FALSE なら違反」
- `enforce` は台帳照合・行の書き込みの後、テーブル世代 bump・commit の前に呼ばれ、違反時は `write_txn` を commit しない
- `visible()`・セッション UDF・WASM UDF・未知関数・組み込み以外の関数呼び出しは `42601` で拒否。他の CHECK を参照する CHECK も不可
- NULL・非有限値・精度の評価規則は原文が `docs/design/sql-check-constraint.md` を参照（本タスクでは当該 ADR 未収録のため詳細は未記載）
- distinct from `mssql` / `drizzle` / `supabase`: fandhe-db 内部の CHECK 制約実装であり、各 SQL ダイアレクトの CHECK 構文リファレンスではない

## Related

- [ddl](./ddl.md)
- [expr-program](./expr-program.md)
