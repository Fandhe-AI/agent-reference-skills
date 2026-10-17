---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/sql/join/mod.rs
---

# sql::join

`[INNER|LEFT|RIGHT|FULL [OUTER]] JOIN`（等価結合の left-deep 連鎖。2 テーブル以上・結合での集計形・スカラー `ORDER BY`・`OR`／`IN`／列同士の比較）の束縛・実行本体（SQL-28・RLS-10・TASK-212、Issue #925・#926・#1190）。`mod.rs` と配下の `plan` / `exec` / `residual` / `aggregate` / `values` を 1 ページに統合。

## Signature / Usage

```rust,ignore
//! 各 relation（テーブル参照）は既存の広域取得経路
//! （[`crate::sql::scan::execute_scan_with_budget`]）でそれぞれ独立に評価する。
//! これにより RLS 暗黙適用・fail-closed のエラー契約を第 2 の実行器を作らずに
//! 継承する（呼び出したセッション自身の [`crate::policy::PolicyContext`] で
//! 全 relation を独立に評価するため、他テナント行が中間結果・結合キー・カーディナ
//! リティ判定・NULL 補完・集計値のいずれにも現れない。3 方向以上・自己結合でも
//! 参照ごとに独立に評価する）。
//! 文全体で 1 つの累計バイト予算（[`JoinBudget`]）を共有する。
//!
//! モジュール構成（責務ごとに分割）:
//! - `plan`: 束縛（列解決・型検証・外部結合の簡約・WHERE のプッシュダウン／残余の
//!   分離・側スキャン投影の確定・集計／並べ替えの束縛）。Describe も同じ計画を使う。
//! - `exec`: N 方向ハッシュ結合（段ごとのカーディナリティ上限・決定的順序）。
//! - `residual`: WHERE 残余の行単位評価とスカラー `ORDER BY`。
//! - `aggregate`: 集計形（既存の `Accumulator` を再利用）。
//! - `values`: 型クラス・キー正準化・比較・`Cell` → `ScalarRef` アダプタ。
//!
//! スコープ外: `CROSS`／`NATURAL` JOIN・`JOIN ... USING (...)`・ベクトル順位付け
//! （`ORDER BY ... <=>` 等）との併用・FROM でのビュー参照・`RelationSnapshotCache`
//! （TASK-212 基盤）による結合入力のキャッシュ。

pub(crate) const MAX_JOIN_INPUT_ROWS: usize = 100_000;
pub(crate) const MAX_JOIN_OUTPUT_ROWS: usize = 100_000;

pub(crate) struct JoinLimits {
    pub(crate) max_input_rows: usize,
    pub(crate) max_output_rows: usize,
    pub(crate) budget_cap: usize,
    /// 集計形のグループ数上限（既定は `sql::group_by::MAX_GROUPS`。超過は `54000`）。
    pub(crate) max_groups: usize,
}

pub(crate) fn collect_join_tables(validated: &ValidatedJoin) -> Vec<String>;

pub(crate) fn execute(
    read_txn: &impl crate::storage::read_source::ReadSource,
    ctx: &PolicyContext,
    schemas: &HashMap<String, TableSchema>,
    validated: &ValidatedJoin,
    udfs: &UdfRegistry,
) -> Result<QueryResult, SqlSurfaceError>;

pub(crate) fn execute_with_limits(
    read_txn: &impl crate::storage::read_source::ReadSource,
    ctx: &PolicyContext,
    schemas: &HashMap<String, TableSchema>,
    validated: &ValidatedJoin,
    udfs: &UdfRegistry,
    limits: &JoinLimits,
) -> Result<QueryResult, SqlSurfaceError>;

pub(crate) fn describe_columns(
    schemas: &HashMap<String, TableSchema>,
    validated: &ValidatedJoin,
    udfs: &UdfRegistry,
) -> Result<Vec<ColumnMeta>, SqlSurfaceError>;
```

## Options / Props

| Name | Default | Description |
|------|---------|-------------|
| `MAX_JOIN_INPUT_ROWS` | 100_000 | JOIN 1 辺（可視かつ WHERE に一致する行）の行数上限。超過検出のため走査は `MAX_JOIN_INPUT_ROWS + 1` まで行い、超えたら `54000` |
| `MAX_JOIN_OUTPUT_ROWS` | 100_000 | `LIMIT` 適用前の結合カーディナリティ（一致ペア数）の上限。`LIMIT`／`OFFSET` によらず結合の各段で判定。超過は `54000` |
| `JoinLimits::budget_cap` | `crate::arena::MAX_ARENA_TOTAL_BYTES` | 文全体で共有する累計バイト予算。超過は `54000`（`JOIN exceeds the shared result byte budget`） |
| `JoinLimits::max_groups` | `sql::group_by::MAX_GROUPS` | 集計形のグループ数上限 |

## Notes

- 出典は `fandhe-db-engine` 0.2.0（git SHA `dc888f6ea146d3078153d64a6848f5c8cf044431`）の `src/sql/join/mod.rs`（全1155行、テスト除く先頭 376 行）。同ディレクトリの `plan.rs`（1134行）・`exec.rs`・`residual.rs`・`aggregate.rs`・`values.rs` は責務を上記 doc comment の範囲で要約し、内部 API は掲載していない
- `execute_with_limits` は全 relation の束縛を完了させてから `LIMIT`／`OFFSET` の範囲検証（`22000`）を行う（束縛エラー優先）。`describe_columns` も同じ順序で、走査を行わず結果列メタデータだけを導出する。JOIN は `$n` パラメータを受理しない
- `values` モジュールは `pub(crate)` で、`sql::view_buffered` が評価済みセルの比較・述語評価に再利用する
- 関連 ADR（commit `dc888f6`、`docs/design/`）: `inner-join.md`・`outer-join.md`・`multi-way-join.md`
- distinct from `mssql` / `drizzle` / `supabase`: fandhe-db 内部の JOIN 実行器であり、各 SQL ダイアレクトの JOIN 構文リファレンスではない

## Related

- [set-op](./set-op.md)
- [view-buffered](./view-buffered.md)
- [exec](./exec.md)
