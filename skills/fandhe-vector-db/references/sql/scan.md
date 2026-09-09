---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/sql/scan.rs
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
//! execute_sql_in_session` の `Statement::Scan` アームから呼ばれる（[`crate::sql`]
//! モジュールドキュメント参照）。
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
//! 付与済み〔vector-db-spec#12〕。確定化は TASK-170 が担う。本モジュールは本リポの
//! 実装既定値として動作する）参照。順序は同一スナップショット内の redb
//! 行テーブルの物理走査順（`(tenant_id, id)` 昇順）であり、`ORDER BY` 相当の意味的
//! 順序を持たない。

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

/// `BoundScan` を実行する（Issue #454 の公開 API。`core.rs::EngineCore::
/// execute_sql_in_session` の `Statement::Scan` アームからのみ呼ばれる想定）。
pub(crate) fn execute_scan(
    read_txn: &redb::ReadTransaction,
    ctx: &PolicyContext,
    schema: &TableSchema,
    bound: &BoundScan,
) -> Result<QueryResult, SqlSurfaceError>
~~~

## Notes

- 束縛型 `BoundScan`（parser.rs 定義、[parser.md](./parser.md) 参照）はこのモジュールが実行時に受け取る入力。構文検証型 `ValidatedScan`（allowlist.rs 定義、[allowlist.md](./allowlist.md) 参照）から `sql::parser::bind_scan` を経て構築される。
- `VectorArena`（既存の検索 SELECT 実行経路）は意図的に使わない。理由: アリーナはスキーマに `VECTOR` 列が必須で可視行の embedding を全件バッファへ確保するため、`VECTOR` 列を持たないテーブルの広域取得や大規模テーブルの `id`/`TEXT` 列のみの取得には過剰（メモリ）かつ非対応。
- RLS 適用順序は「デコード前のヘッダ判定 → TABLE-12 のキー/ヘッダ tenant 整合検査 → 必要範囲のみのデコード → SCALAR 段（`WHERE`）→ 可視性の再適用」で、`sql::aggregate` の走査ループ（sql-execution scope）と同一の規約を踏襲する。
- `PolicyContext` / `QueryResult` / `Cell` / `ColumnMeta` / `ResultRow` / `ExprProgram` / `StackValue` / `ExprValue` / `StorageError` の実体は本 scope 外（security / sql-execution / storage scope）の管轄のため参照のみ記載する。
- ADR `docs/design/wide-retrieval-scan.md`（pin SHA `7022d112e79760dca916480599553fcac256b5fb`）を verbatim 再確認したところ、以下の記述がある:
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
