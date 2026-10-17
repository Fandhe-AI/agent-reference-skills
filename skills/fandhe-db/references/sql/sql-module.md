---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/sql.rs
---

# sql (エントリモジュール)

SQL 表層の入口モジュール（TASK-74・SQL-8）。受信 SQL テキスト（wire 経由の untrusted 入力）に対する許可リスト形式の構造検証（`allowlist`）から、束縛（`parser`）・評価順序（`plan`、TASK-76・SQL-7）・実行（`exec`、TASK-75・SQL-1〜4）までの責務境界を定義する。

## Signature / Usage

~~~rust,ignore
//! SQL 表層モジュールの入口（TASK-74・SQL-8 参照。docs/spec/05-tasks.md・
//! docs/spec/04-behavior/sql-surface.md）。
//!
//! 責務境界: 受信 SQL テキスト（wire プロトコル経由の untrusted 入力）に対する
//! **許可リスト形式の構造検証**（[`allowlist`]）から、束縛（[`parser`]）・評価順序
//! （[`plan`]、TASK-76・SQL-7）・実行（[`exec`]、TASK-75・SQL-1〜4）までを担う。
//! `EngineCore::execute_sql`（`core.rs`。TASK-75 で追加した固有メソッド。
//! `VectorCore` trait は不変）が本モジュールの公開 API を土台に SQL 文を実行する。
//!
//! 書き込み系 SQL 文（`INSERT`）は `EngineCore::execute_insert_sql`（TASK-80、
//! 対象ビヘイビア: SQL-10）が別エントリポイントとして扱う。文末専用句
//! `USING OPERATION_ID '<id>'`（[`using_operation_id`]）は本モジュールが構造
//! パース（省略・明示 `NULL` はいずれも `None`）のみを行い、必須化の判断
//! （省略を書き込みトランザクション開始前に `23502` で拒否するか否か）は
//! サーバー構成 [`crate::recovery::required_op_id::LedgerMode`] へ移した
//! （TASK-92・RECOVER-1。`allowlist::validate_insert` が `LedgerMode::require` へ
//! 委譲する）。
//!
//! 本モジュール配下は wire プロトコル入力と同じ untrusted 入力の扱い
//! （`.claude/rules/coding-rust.md`）に従う。
//!
//! 下位モジュール:
//! - [`lexer`][]: untrusted な SQL テキストの自作トークナイザ
//! - [`allowlist`][]: 許可リスト検証本体・`SqlSurfaceError`。`HINT ORDER(...)` の構造検証も含む（TASK-76）
//! - [`parser`][]: 許可リスト通過後の束縛（列名・型照合、ベクトルリテラル解析。TASK-75）
//! - [`plan`][]: `HINT ORDER(...)` の評価順序規則（RLS は暗黙事前フィルタ＋
//!   [`crate::rls::RlsSafetyNet`]（TASK-136）による最終安全網の二重適用を維持し、
//!   `HINT` で外せない。TASK-76・SQL-7・RLS-5）
//! - [`exec`][]: 実行計画（既定 RLS→SCALAR→DISTANCE、`HINT ORDER` 指定時は [`plan`] に従う）
//! - [`mode`][]: 取得モード（`recall`／`precision`）の優先順位解決・セッション状態
//!   （TASK-161・SQL-12）
//! - [`using_operation_id`][]: `USING OPERATION_ID '<id>'` 文末句の値型・検証（TASK-80）
//! - [`using_plan`][]: `USING PLAN('<query>')` 文末句（`ORDER BY` の代替。SQL-5）の
//!   LLM クエリ展開結果 → 既存 C4 ハイブリッド実行形への束縛（TASK-77）
//! - [`aggregate`][]: 集計関数のみを結果列とする `GROUP BY` なし単一行 SELECT の
//!   実行（TASK-166・SQL-13）。`GROUP BY` ありの複数行実行は [`group_by`] へ委譲する
//! - [`group_by`][]: `GROUP BY <TEXT 列>` 集計の複数行実行（TASK-167・SQL-14）。
//!   グループ表の有界化（`MAX_GROUPS`・`MAX_GROUP_KEY_TOTAL_BYTES`）・`HAVING`・
//!   `ORDER BY`・`LIMIT` を担う
//! - [`sparse_cache`][]: `exec` の hybrid 実行が参照する `SparseIndex`（BM25 語彙・
//!   統計）のテーブル世代整合キャッシュ（Issue #357）。フィルタなし hybrid クエリに
//!   限り、同一世代内の連続クエリで疎索引の再構築を償却する
//! - [`scan`][]: ランキング段（`ORDER BY`／`USING PLAN`）を持たない広域取得
//!   （ソートなしのフィルタ取得。`SELECT ... [WHERE ...] LIMIT n`。Issue #454）の
//!   実行。[`aggregate`] と同じく `VectorArena` を経由しない redb 直接走査で、
//!   `VECTOR` 列を持たないテーブルでも動作する
//!
//! TASK-166（対象ビヘイビア: SQL-13）: `COUNT`/`SUM`/`AVG`/`MIN`/`MAX` のみを結果列
//! とする単一テーブル SELECT（C6a）を追加した。構文は [`allowlist`]（`Statement::Aggregate`）、
//! 意味論束縛は [`parser::bind_aggregate`]、実行は [`aggregate::execute_aggregate`]
//! が担う。RLS 適用順序（デコード前のヘッダ判定 → 可視行のみ完全デコード）は
//! 既存の検索 SELECT 実行経路（[`crate::arena`]）と同一の規約に揃え、`COUNT` 等の
//! 集計値から他テナント行の存在・件数を推測できないことを維持する（RLS-7・
//! RLS-8）。オーバーフロー（`u64`/`f64`）は `SqlSurfaceError::NumericOutOfRange`
//! （ERR-2 が新設する `22003`）で fail-closed に拒否する。`GROUP BY`／`HAVING` は
//! 引き続き許可リスト外（`42601`）。
//!
//! TASK-152（対象ビヘイビア: ERR-2）: `allowlist::SqlSurfaceError` の `wire_code` 写像は
//! [`crate::error_format`]（`ErrorClass`・`ClassifiedError` trait）へ委譲する。本モジュール
//! の公開シグネチャ・返値は変更しない（詳細は `error_format.rs` モジュールドキュメント
//! 参照）。
//!
//! TASK-161（対象ビヘイビア: SQL-12）: クエリ単位の専用句 `USING MODE '<literal>'`
//! （[`allowlist`]）とセッション変数 `SET search_mode = '<literal>'`（同）を追加し、
//! 優先順位（クエリ句 > セッション変数 > 既定）の解決を [`mode::resolve_mode`] に
//! 集約した。`core.rs::EngineCore::execute_sql_in_session` が接続単位の
//! [`mode::SessionState`] を受け取って呼び出す新しい公開 API で、既存の
//! `execute_sql`（セッションなし）は空のセッションでこれへ委譲する。
//!
//! TASK-80（対象ビヘイビア: SQL-10）: `INSERT ... USING OPERATION_ID '<id>'` の
//! 許可形状を追加した。実行は [`exec::execute_insert`] が担い、行の書き込みは
//! `tenant.rs` のガード付き API（`tenant::insert_typed_row`）経由に統一する
//! （TABLE-12・RLS-9）。
//!
//! TASK-147（対象ビヘイビア: EXT-3）: `WHERE` 句に前方一致条件
//! `<col> LIKE '<prefix>%'` を追加した（[`allowlist`] が構造を、
//! `crate::declarative_filter` が意味論を検証する。`LIKE` は末尾ちょうど 1 つの
//! `%` のみを許可し、`NOT LIKE`・`ILIKE`・中間 `%`・`_`・エスケープは拒否する）。
//! 既存の等価条件 `<col> = '<literal>'`（SQL-2）と合わせ、両者は
//! `crate::declarative_filter::MetadataFilter`（汎用 API。任意の `TEXT` 列に
//! 対する宣言的フィルタ）として一本化した（**BREAKING CHANGE**: 旧
//! `sql::parser::ScalarEq`・`BoundStatement::scalar_filters` を置換。詳細は
//! `declarative_filter.rs`・`sql/parser.rs` モジュールドキュメント参照）。

//! TASK-77（対象ビヘイビア: SQL-5）: `USING PLAN('<query>')` を `ORDER BY` の代替
//! （相互排他）として追加した。構文は [`allowlist`]（`ValidatedStatement::
//! using_plan`）、展開後クエリ → 既存 C4 ハイブリッド実行形への束縛は
//! [`using_plan::bind_expansion`] が担う。LLM 展開（`core.rs::EngineCore::
//! plan_query`、TASK-110）→ 展開後テキストの再埋め込み（`Embedder`）→
//! [`using_plan::bind_expansion`] → [`exec::execute_statement`] という一意の
//! 経路へディスパッチし、`core.rs::EngineCore::execute_sql_in_session` が
//! `ValidatedStatement::using_plan` の有無で分岐する。

pub mod aggregate;
pub mod allowlist;
pub(crate) mod arena_cache;
pub mod exec;
pub(crate) mod explain;
pub(crate) mod expr_program;
pub mod group_by;
pub(crate) mod hnsw_cache;
pub(crate) mod hnsw_hybrid;
pub mod lexer;
pub mod mode;
pub mod parser;
pub mod plan;
pub(crate) mod scalar_index;
pub(crate) mod scalar_plan;
pub mod scan;
pub(crate) mod sparse_cache;
pub mod udf_call;
pub(crate) mod visible_cache;

/// `EngineCore::sparse_index_cache_stats`（`pub`）の戻り値型を外部から
/// 名前解決可能にするための再エクスポート。`sparse_cache` モジュール自体は
/// 内部実装として `pub(crate)` のまま維持する（codex-review 指摘対応）。
pub use scalar_index::ScalarIndexCacheStats;
pub use sparse_cache::SparseIndexCacheStats;
pub mod using_operation_id;
pub(crate) mod using_plan;

/// `EngineCore::visible_bitmap_cache_stats`（`pub`）の戻り値型を外部から
/// 名前解決可能にするための再エクスポート。`visible_cache` モジュール自体は
/// 内部実装として `pub(crate)` のまま維持する（`SparseIndexCacheStats` と同方針。
/// codex-review 指摘対応）。
pub use visible_cache::VisibleBitmapCacheStats;

/// `EngineCore::execute_sql_in_session`（TASK-161）の成功応答。`SELECT` は
/// [`exec::QueryResult`] を、`SET search_mode` は解決前の設定値
/// （[`mode::SearchMode`]）そのものを返す。TASK-79（SQL-9）で `CREATE FUNCTION` の
/// 応答として `CreateFunction` を追加した（**BREAKING CHANGE**: 既存の網羅的
/// `match` はワイルドカードアームの追加が必要）。
///
/// **TASK-78（SQL-6）で追加した破壊的変更（BREAKING CHANGE）**: `Explain`
/// variant を追加した（既存の網羅的 `match` はワイルドカードアームの追加が
/// 必要）。
///
/// **TASK-82（SQL-10）で追加した破壊的変更（BREAKING CHANGE）**: `Insert`
/// variant を追加した（既存の網羅的 `match` はワイルドカードアームの追加が
/// 必要）。
#[derive(Debug, Clone, PartialEq)]
pub enum SqlOutcome {
    Query(exec::QueryResult),
    SetSearchMode(mode::SearchMode),
    /// `CREATE FUNCTION <name>(...) AS <expr>`（TASK-79・SQL-9）がセッションへの
    /// 登録に成功したことを示す応答。登録された関数名を保持する。
    CreateFunction {
        name: String,
    },
    /// `EXPLAIN SELECT ... USING PLAN(...)`（TASK-78・SQL-6）の応答。検索本体は
    /// 実行せず、LLM クエリ展開・モード解決結果を可視化する `QUERY PLAN` 単一列の
    /// [`exec::QueryResult`]（`sql::explain` モジュールが構築）を返す。
    Explain(exec::QueryResult),
    /// `INSERT INTO <table> (...) VALUES (...) USING OPERATION_ID '<id>'`
    /// （TASK-82・SQL-10）がセッション経由の実行経路
    /// （[`crate::core::EngineCore::execute_sql_in_session`]）で成功したことを
    /// 示す応答。検証・実行本体は既存の
    /// [`crate::core::EngineCore::execute_insert_sql`]（TASK-80）に委譲しており、
    /// 本 variant はその [`exec::InsertOutcome`] をそのまま運ぶ薄いラッパー。
    Insert(exec::InsertOutcome),
}
~~~

### 0.2.0 の差分（`src/sql.rs` の `mod` 宣言・`pub use`・`SqlOutcome` の verbatim 要約）

上のフェンスは 0.1.0 時点のモジュール doc comment と `SqlOutcome` の転記。0.2.0 では次のとおり変わった。

~~~rust,ignore
pub mod aggregate;
pub mod allowlist;
pub(crate) mod arena_cache;
pub(crate) mod check_constraint;
pub mod copy;
pub(crate) mod cte;
pub mod cursor;
pub(crate) mod datetime_fn;
pub mod ddl;
pub(crate) mod ddl_column_type;
pub mod declarative_predicate;   // NoSQL filter 語彙拡張（範囲比較・IN・OR。Issue #945・NOSQL-14）の束縛入口
pub(crate) mod describe;
pub(crate) mod distinct;         // SELECT DISTINCT・COUNT(DISTINCT <expr>) の正準キー化・予算管理
pub mod exec;
pub mod explain;                 // 0.1.0 では pub(crate)
pub(crate) mod expr_program;
pub mod generation_key;          // 複数テーブルの (table, generation) 集合 + PolicyContext を鍵とする世代整合キャッシュ
pub mod group_by;
pub(crate) mod hnsw_cache;
pub(crate) mod hnsw_hybrid;
pub(crate) mod join;             // [INNER|LEFT|RIGHT|FULL] JOIN の束縛・実行本体（SQL-28・RLS-10）
pub mod lexer;
pub mod mode;
pub(crate) mod numeric_fn;
pub(crate) mod order_value;
pub mod params;
pub mod parser;
pub mod partitioned;
pub mod plan;
pub mod relation;                // 複数テーブル参照スコープの束縛（修飾・非修飾列の解決、42702）
pub mod relation_snapshot;       // テーブル単位の RLS 可視スナップショット
pub mod returning;
pub(crate) mod scalar_index;
pub(crate) mod scalar_plan;
pub mod scan;
pub(crate) mod set_op;
pub(crate) mod sparse_cache;
pub mod statement_splitter;      // 簡易クエリ 1 メッセージ内のセミコロン区切り複数文の分割・分類（WIRE-16）
pub(crate) mod string_fn;
pub(crate) mod subquery;
pub mod transaction;
pub mod udf_call;
pub(crate) mod view;
pub(crate) mod view_buffered;
pub(crate) mod visible_cache;
pub(crate) mod where_negation;
pub(crate) mod where_tree;
pub(crate) mod window;

pub use where_tree::BoundOrGroup;
pub use scalar_index::ScalarIndexCacheStats;
pub use sparse_cache::SparseIndexCacheStats;
pub use hnsw_cache::{classify_ann_plan, AnnPlan, AnnShapeInput};
pub use scalar_plan::{classify_scalar_plan, ScalarPlan, ScalarShapeInput};
pub mod using_operation_id;
pub use ddl_column_type::SqlColumnTypeName;
pub(crate) mod using_plan;
pub use visible_cache::VisibleBitmapCacheStats;

/// SqlOutcome の 0.2.0 での variant 追加（いずれも「既存の網羅的 match は追随が必要」な BREAKING CHANGE）。
/// 0.1.0 の Query / SetSearchMode / CreateFunction / Explain / Insert に加え:
pub enum SqlOutcome {
    // ...
    Truncate(exec::TruncateOutcome),          // TASK-193・SQL-22
    Delete(exec::DeleteOutcome),              // SQL-18・TASK-191・#867
    Returning(exec::ReturningOutcome),        // RETURNING 句付き INSERT（UPSERT 含む）/ DELETE / UPDATE（Issue #873・#1182・SQL-21）
    Update(exec::UpdateOutcome),              // 単一行 id 指定形（SQL-17）と述語形（SQL-19）
    Begin,                                    // BEGIN [WORK|TRANSACTION]（SQL-31・TASK-221。Issue #942）
    Commit,
    Rollback,
    CreateTable(ddl::CreateTableOutcome),     // Issue #899
    DropTable(ddl::DropTableOutcome),         // Issue #902
    DeclareCursor,                            // DECLARE <name> CURSOR FOR <SELECT>（WIRE-15・TASK-218）
    Fetch(exec::QueryResult),                 // FETCH [FORWARD] <n> FROM <name>
    CloseCursor,                              // CLOSE <name>
    AlterTable(ddl::AlterTableOutcome),       // Issue #900
    CreateView(ddl::CreateViewOutcome),       // Issue #909
    DropView(ddl::DropViewOutcome),
    CreateIndex(ddl::CreateIndexOutcome),     // Issue #908
    DropIndex(ddl::DropIndexOutcome),
    CreateType(ddl::CreateTypeOutcome),       // Issue #1194
    DropType(ddl::DropTypeOutcome),
}
~~~

0.2.0 のモジュール doc comment で更新された下位モジュールの説明:

- `exec`: `exec::execute_insert` は Issue #730 で公開 API へ昇格しており engine クレート外からも呼べる（ファイル形 `exec::execute_file_insert` は `pub(crate)` のまま）
- `explain`: `EXPLAIN` 応答の構築。Issue #922・SQL-27 で対象を通常検索・集計・広域取得へ拡大した（`allowlist::ExplainTarget`）。`build_explain_result`・`ExplainEngine`・`AnnPlan`・`ScalarPlan`・`classify_ann_plan`・`classify_scalar_plan` は TASK-186（NOSQL-10）の前提として公開 API へ昇格。`ExplainIndexNames`・`build_explain_result_with_indexes`（Issue #1066・TASK-206・INDEX-7）は `ann_plan:`／`scalar_plan:` 行への使用索引名注記用に追加された公開 API
- `ddl`: `CREATE TABLE`／`DROP TABLE`／`ALTER TABLE ADD COLUMN` の DDL 実行権限ゲート（`require_ddl_permission`。DDL 全般が通る単一の判定点）と実行本体
- `aggregate`: `bind_aggregate`／`execute_aggregate`／`BoundAggregate` は TASK-186（NOSQL-4・NOSQL-5）で公開 API へ昇格
- `group_by`: `GROUP BY <列>`（Issue #1185 で `TEXT` 限定を外した）
- `scan`: `bind_scan`／`execute_scan`／`BoundScan` は TASK-186（NOSQL-3）で公開 API へ昇格
- Issue #869（SQL-19・TASK-192）: 述語つき `UPDATE ... WHERE` は `allowlist::validate_update_form`（`ValidatedUpdateForm`）と `parser::bind_update_form` で実装。1 文あたりの影響行数上限は `parser::check_dml_affected_rows_with_limit`。Issue #997 のオーナー判断（2026-09-27）により**既定では上限を持たない**（`parser::DmlLimits` の `None`。`wire-server` の `--max-dml-affected-rows` で明示指定した場合のみ有効）

## Notes

- 本ページ Signature/Usage 中の TASK-166（対象ビヘイビア: SQL-13）段落末尾「`GROUP BY`／`HAVING` は引き続き許可リスト外（`42601`）」は **TASK-166 時点（`group_by` モジュール新設前）の記述をそのまま verbatim 転記したもの**で、0.1.0 時点では旧時点の記述。現行（0.1.0）は同じモジュール doc の直後の下位モジュール一覧（47〜50 行目、TASK-167・SQL-14）が示すとおり `GROUP BY <TEXT 列>` 集計・`HAVING`・`ORDER BY`・`LIMIT` に対応済み（対応範囲: `sql::allowlist::GroupByClause`/`HavingPredicate`/`AggregateOrderBy` による構文受理、`sql::parser::bind_aggregate`/`BoundGroupBy` による束縛、`sql::group_by::execute_grouped_aggregate` による複数行実行——実行本体の詳細は sql-execution scope の `group-by.md` 参照）。ソースの `//!` doc comment は TASK 単位の変更履歴を時系列に積み上げる書き方をしており、後続 TASK が前段の記述を上書き・削除していないため、この矛盾はソース自体に存在する（本ページの転記誤りではない）。
- 同じ Signature/Usage フェンス内 61 行目「実行は `aggregate::execute_aggregate` が担う」は 0.1.0 ソースの doc comment に残る旧名の verbatim 引用。`Grep 'fn execute_aggregate\b'`（`src/engine/src/sql/aggregate.rs`）で該当なしを確認済みで、現行の実体は `sql::aggregate::execute_aggregate_with_cache`（関数名変更後もコメントが追従していないソース側の記述漏れ。本ページの転記誤りではない）。
- `pub mod` として公開される下位モジュール（0.2.0）は `aggregate` / `allowlist` / `copy` / `cursor` / `ddl` / `declarative_predicate` / `exec` / `explain` / `generation_key` / `group_by` / `lexer` / `mode` / `params` / `parser` / `partitioned` / `plan` / `relation` / `relation_snapshot` / `returning` / `scan` / `statement_splitter` / `transaction` / `udf_call` / `using_operation_id`。`arena_cache` / `check_constraint` / `cte` / `datetime_fn` / `ddl_column_type` / `describe` / `distinct` / `expr_program` / `hnsw_cache` / `hnsw_hybrid` / `join` / `numeric_fn` / `order_value` / `scalar_index` / `scalar_plan` / `set_op` / `sparse_cache` / `string_fn` / `subquery` / `view` / `view_buffered` / `visible_cache` / `where_negation` / `where_tree` / `window` / `using_plan` は `pub(crate)` — クレート外非公開。0.1.0 では `explain` も `pub(crate)` だったが 0.2.0 で `pub` になった。
- Migration (0.1.0 → 0.2.0): `SqlOutcome` に多数の variant が加わった（上記）。クレート外で `SqlOutcome` を網羅的に `match` するコードは追随が必要。
- `aggregate` / `group_by` / `exec` / `arena_cache` / `hnsw_cache` / `hnsw_hybrid` / `scalar_index` / `scalar_plan` / `sparse_cache` / `visible_cache` / `udf_call` / `expr_program` の実装内容は sql-execution scope の管轄。本ページはモジュール一覧・`SqlOutcome` 型・re-export のみを扱う。
- Distinct from `mssql` (node-mssql, T-SQL client) / `drizzle` (TypeScript ORM) / `supabase` (Postgres): this is a subset SQL surface over a PostgreSQL wire-compatible engine, explicitly MVP-scoped per the project README.

## Related

- [lexer](./lexer.md)
- [parser](./parser.md)
- [allowlist](./allowlist.md)
- [plan](./plan.md)
