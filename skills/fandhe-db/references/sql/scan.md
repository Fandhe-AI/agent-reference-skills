---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/sql/scan.rs
---

# sql::scan (wide retrieval scan)

広域取得（ソートなしのフィルタ取得。`SELECT ... [WHERE ...] LIMIT n`）の実行本体（Issue #454）。本 DB の「正解を含むデータ群を広く返し、丸ごと LLM へ渡す」設計思想を SQL 表層で直接表現する経路で、ランキング段（`ORDER BY`／`USING PLAN`）・取得モード（`recall`／`precision`）のいずれも持たない。

## Signature / Usage

~~~rust,ignore
//! 広域取得（ソートなしのフィルタ取得。`SELECT ... [WHERE ...] LIMIT n`）の実行本体
//! （Issue #454）。本 DB の「正解を含むデータ群を広く返し、丸ごと LLM へ渡す」設計
//! 思想を SQL 表層で直接表現する経路で、ランキング段（`ORDER BY`／`USING PLAN`）・
//! 取得モード（`recall`／`precision`）のいずれも持たない。
//!
//! 責務境界: [`crate::sql::parser::bind_scan`] が返す [`crate::sql::parser::BoundScan`]
//! を受け取り、対象テーブルの行テーブル（`user_rows/{table}`）を可視かつ `WHERE` を
//! 満たす行が `LIMIT` 件集まった時点で走査を打ち切る早期終了付きで走査し、単一の
//! [`crate::sql::exec::QueryResult`] を組み立てる。`core.rs::EngineCore::
//! execute_sql_in_session` の `Statement::Scan` アームから呼ばれるほか、`bind_scan`・
//! `execute_scan`・`BoundScan` は TASK-186（NOSQL-3）で公開 API へ昇格しており、
//! engine クレート外からも直接呼べる（[`crate::sql`] モジュールドキュメント参照）。
//!
//! [`crate::sql::aggregate::execute_aggregate`] と同じ理由で
//! [`crate::arena::VectorArena`]（既存の検索 SELECT 実行経路）は使わない: アリーナは
//! スキーマに `VECTOR` 列が必須で可視行の embedding を全件バッファへ確保するため、
//! `VECTOR` 列を持たないテーブルの広域取得や大規模テーブルの `id`/`TEXT` 列のみの
//! 取得には過剰（メモリ）かつ非対応。行走査・デコード段階選択（`DecodeTier`）・
//! RLS 適用順序（デコード前のヘッダ判定 → TABLE-12 のキー/ヘッダ tenant 整合検査 →
//! 必要範囲のみのデコード → SCALAR 段（`WHERE`）→ 可視性の再適用）は
//! `sql::aggregate` の走査ループと同一の規約を踏襲する（security.md
//! 「テナント境界（P0）」）。
//!
//! 契約の詳細（`LIMIT` の意味・順序保証の有無・取得モードとの無関係性）は
//! `docs/design/wide-retrieval-scan.md`（spec ビヘイビア ID は SQL-15・TASK-170 として
//! 付与済み〔fandhe-db-spec#12〕。確定化は TASK-170 が担う。本モジュールは本リポの
//! 実装既定値として動作する）参照。`bound.order_by` が空の場合、順序は同一
//! スナップショット内の redb 行テーブルの物理走査順（`(tenant_id, id)` 昇順）であり、
//! `ORDER BY` 相当の意味的順序を持たない。
//!
//! **スカラー列 `ORDER BY`**（Issue #915・SQL-25・TASK-209。`docs/design/
//! scalar-order-by-scan.md` 参照）: `bound.order_by` が非空の場合は 2 経路のいずれかで
//! 決定的な順序を返す。(A) 先頭キーが疑似列 `id` かつ `ctx` が他テナントの `Public` 行を
//! 可視としない場合は、自テナントのパーティション（`(tenant, 0)..=(tenant, MAX)`）を
//! 直接範囲走査し `LIMIT` 件で打ち切る（`id` はテナント内で一意なため後続キーは
//! 無関係）。(B) それ以外は 2 パス（1 パス目で候補の並べ替えキー・`(tenant_id, id)` を
//! 容量 `limit` の `BinaryHeap` に保持し予算超過時は最悪要素を追い出す。2 パス目で
//! 勝者のみを同じスナップショットから再取得し投影する）。両経路とも RLS 適用順序
//! （デコード前のヘッダ判定 → TABLE-12 → 必要範囲のみのデコード → `WHERE` → 可視性の
//! 再適用）は順序なし経路と同一（[`with_visible_row`] に共通化）。
//!
//! `OFFSET`（Issue #916・SQL-25 (b)・TASK-209。詳細は
//! `docs/design/sql-offset-paging.md`）は「可視かつ `WHERE` 一致」の行のみを対象に
//! 読み飛ばす。RLS 判定・`WHERE` 評価が確定した後でのみ計数するため、不可視行は
//! 読み飛ばし数にも結果にも現れず、ページ境界の出方から他テナント行の存在・件数を
//! 推測できない。読み飛ばした行は投影・`cells` 確保・byte 予算計上のいずれも行わない
//! （深いページングでもメモリは O(`limit`) を保つ）。

use crate::catalog::{self, ColumnType, TableSchema};
use crate::declarative_filter;
use crate::policy::PolicyContext;
use crate::row_codec;
use crate::sql::allowlist::SqlSurfaceError;
use crate::sql::exec::{Cell, ColumnMeta, QueryResult, ResultRow};
use crate::sql::expr_program::{ExprProgram, StackValue};
use crate::sql::parser::{BoundScan, ProjectedColumn};
use crate::sql::udf_call::{self, ExprValue};
use crate::storage::{self, StorageError};
use redb::ReadableTable;

/// 結果セット全体（テキスト・ベクトル各セルの複製バイト量の合計）の累計上限。
/// `bound.limit`（`1..=core::MAX_SEARCH_K`）で行数は既に有界だが、1 行あたりの
/// テキスト・ベクトルサイズは任意に大きくなりうるため、`sql::exec` の
/// `MAX_CANDIDATE_SCALAR_BYTES` と同じ定数（`crate::arena::MAX_ARENA_TOTAL_BYTES`）を
/// 流用し確保前に検証する（security.md「不安全な設計｜無制限リソース確保（DoS）」
/// 対応）。
const MAX_SCAN_RESULT_BYTES: usize = crate::arena::MAX_ARENA_TOTAL_BYTES;

/// [`BoundScan`] を実行する（Issue #454・TASK-186・NOSQL-3 の公開 API）。
/// `core.rs::EngineCore::execute_sql_in_session` の `Statement::Scan` アームから
/// 呼ばれるほか、[`BoundScan`] が公開型へ昇格したため engine クレート外から
/// SQL テキストを経由せず直接呼び出すこともできる（TASK-186・NOSQL-3）。
///
/// 既定の結果バイト予算（[`MAX_SCAN_RESULT_BYTES`]）で
/// [`execute_scan_with_budget`] へ委譲する薄いラッパー。
pub fn execute_scan(
    read_txn: &impl crate::storage::read_source::ReadSource,
    ctx: &PolicyContext,
    schema: &TableSchema,
    bound: &BoundScan,
) -> Result<QueryResult, SqlSurfaceError>

/// [`execute_scan`] の本体。`max_result_bytes` は行生成中の累積バイト予算の上限。
/// `sql::cursor::CursorStatement::Declare` の内側 SELECT 実行専用の入口として
/// `core.rs::EngineCore` から直接呼ばれる（`pub(crate)`）。
pub(crate) fn execute_scan_with_budget(/* ..., max_result_bytes: usize */)
~~~

## Notes

- 束縛型 `BoundScan`（parser.rs 定義、[parser.md](./parser.md) 参照）はこのモジュールが実行時に受け取る入力。構文検証型 `ValidatedScan`（allowlist.rs 定義、[allowlist.md](./allowlist.md) 参照）から `sql::parser::bind_scan` を経て構築される。
- 上記フェンス内 module doc（12〜13 行目付近）が言及する `crate::sql::aggregate::execute_aggregate` は 0.1.0 ソースの doc comment に残る旧名の verbatim 引用。`Grep 'fn execute_aggregate\b'`（`src/engine/src/sql/aggregate.rs`）で該当なしを確認済みで、現行の実体は `sql::aggregate::execute_aggregate_with_cache`（関数名変更後もコメントが追従していないソース側の記述漏れ。本ページの転記誤りではない）。
- Migration (0.1.0 → 0.2.0): `execute_scan` は `pub(crate)` から `pub` になり、第 1 引数の型が `&redb::ReadTransaction` から `&impl crate::storage::read_source::ReadSource` に変わった。`BoundScan` も公開型に昇格している（`parser.md` 参照）。`bound.order_by` が非空のスカラー列 `ORDER BY`（Issue #915・SQL-25）と `OFFSET`（Issue #916・SQL-25 (b)）に対応した（上のモジュール doc）。「ソートなし」「順序保証なし」は `order_by` が空の場合に限る。
- `VectorArena`（既存の検索 SELECT 実行経路）は意図的に使わない。理由: アリーナはスキーマに `VECTOR` 列が必須で可視行の embedding を全件バッファへ確保するため、`VECTOR` 列を持たないテーブルの広域取得や大規模テーブルの `id`/`TEXT` 列のみの取得には過剰（メモリ）かつ非対応。
- RLS 適用順序は「デコード前のヘッダ判定 → TABLE-12 のキー/ヘッダ tenant 整合検査 → 必要範囲のみのデコード → SCALAR 段（`WHERE`）→ 可視性の再適用」で、`sql::aggregate` の走査ループ（sql-execution scope）と同一の規約を踏襲する。
- `PolicyContext` / `QueryResult` / `Cell` / `ColumnMeta` / `ResultRow` / `ExprProgram` / `StackValue` / `ExprValue` / `StorageError` の実体は本 scope 外（security / sql-execution / storage scope）の管轄のため参照のみ記載する。
- ADR `docs/design/wide-retrieval-scan.md`（pin SHA `dc888f6ea146d3078153d64a6848f5c8cf044431`）を 0.1.0 の pin（`7022d112e79760dca916480599553fcac256b5fb`）時点で verbatim 確認したところ、以下の記述がある（0.2.0 の ADR 全文は未再確認）:
  - トリガー構文（原文 verbatim）:
    ~~~text
    SELECT <投影（既存許可形: *, 列名列, 式項目〔UDF 含む〕）> FROM <table>
      [WHERE <既存許可述語（等価・LIKE 前方一致・visible()・式述語）>]
      LIMIT <n>
    ~~~
  - `LIMIT` の範囲（原文 verbatim）: `1..=core::MAX_SEARCH_K`（10,000）
  - `ORDER BY`・`USING PLAN` は従来の検索 SELECT 経路を使用し、広域取得とは別系統。
  - 順序保証なし。決定的だが tenant_id と id の昇順のみ保証（本ページのソースコード module doc も「同一スナップショット内の redb 行テーブルの物理走査順（`(tenant_id, id)` 昇順）」と一致する記述）。
- Distinct from `mssql` (node-mssql, T-SQL client) / `drizzle` (TypeScript ORM) / `supabase` (Postgres): wide retrieval scan is a ranking-free bulk-fetch path unique to this engine's "return broadly, let the LLM sift" design, not a generic unordered `SELECT`.

## Related

- [allowlist](./allowlist.md)
- [parser](./parser.md)
- [plan](./plan.md)
