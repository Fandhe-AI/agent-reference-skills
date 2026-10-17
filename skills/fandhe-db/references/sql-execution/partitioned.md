---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/sql/partitioned.rs
---

# sql::partitioned

分割実行 DML の SQL 表層（Issue #1129、SQL-19）。述語形 `UPDATE`／`DELETE ... USING OPERATION_ID '<id>' PARTITIONED [CHUNK <n>]` を、チャンク単位で commit する非原子実行（`crate::tenant::partitioned_dml`）へ結線する型と処理を集約する。

## Signature / Usage

```rust,ignore
//! - 構文木: [`PartitionedClause`]（`PARTITIONED [CHUNK n]`）、[`PartitionedControl`]
//!   （`SHOW`／`CANCEL PARTITIONED DML`・`EXPLAIN`）。`sql::allowlist` が構築し、
//!   `core.rs::EngineCore` が実行する（`ParsedSql::Partitioned`）。
//! - 失敗写像: [`map_partitioned_failure`]（実行器の停止原因 → `VD001`／`VD002`／原因コード）。
//! - 進捗照会・取り消し: [`execute_show`]・[`execute_cancel`]。**ユーザーテーブルのカタログを
//!   一切引かず**、ジョブ表とプロセス内登録簿だけを `(tenant, table, operation_id)` で引く。
//!   「ジョブなし」「他テナント」「テーブルなし」「見えないテーブル」は同じ応答（同じ 2 列・
//!   0 行）にそろえ、存在オラクルにしない（RLS-9）。
//! - `EXPLAIN`: [`explain_result`]。実行せず、サーバー設定値と文の形状だけを返す。

/// 述語形 `UPDATE`／`DELETE` の `PARTITIONED [CHUNK n]` 修飾（SQL-19）。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct PartitionedClause {
    pub(crate) chunk_rows: Option<NonZeroUsize>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct PartitionedJobRef {
    pub(crate) table: String,
    pub(crate) operation_id: OperationId,
}

#[derive(Debug, Clone, PartialEq)]
#[non_exhaustive]
pub enum PartitionedControl {
    /// `SHOW PARTITIONED DML '<id>' ON <table>`（進捗照会。読み取りのみ）。
    Show(PartitionedJobRef),
    /// `CANCEL PARTITIONED DML '<id>' ON <table>`（取り消し。autocommit 専用）。
    Cancel(PartitionedJobRef),
    /// `EXPLAIN DELETE ... PARTITIONED`（実行しない）。
    ExplainDelete(ValidatedPredicateDelete),
    /// `EXPLAIN UPDATE ... PARTITIONED`（実行しない）。
    ExplainUpdate(ValidatedPredicateUpdate),
}

pub(crate) fn tokens_have_partitioned_clause(tokens: &[crate::sql::lexer::Token]) -> bool;
pub(crate) fn tokens_are_partitioned_cancel(tokens: &[crate::sql::lexer::Token]) -> bool;

pub(crate) fn apply_chunk_override(
    clause: &PartitionedClause,
    server: &PartitionedDmlLimits,
) -> Result<PartitionedDmlLimits, SqlSurfaceError>;

pub(crate) fn map_partitioned_failure<E>(
    failure: PartitionedDmlFailure<E>,
    operation_id: &str,
    op: &'static str,
    map_predicate: impl FnOnce(E) -> SqlSurfaceError,
) -> SqlSurfaceError;

pub(crate) fn status_result(status: &str, rows: u64) -> QueryResult;

pub(crate) fn execute_show(
    storage: &Storage,
    ctx: &PolicyContext,
    job: &PartitionedJobRef,
) -> Result<QueryResult, SqlSurfaceError>;

pub(crate) fn execute_cancel(
    storage: &Storage,
    ctx: &PolicyContext,
    job: &PartitionedJobRef,
) -> Result<QueryResult, SqlSurfaceError>;

pub(crate) fn explain_result(
    statement: &str,
    limits: &PartitionedDmlLimits,
    effective_chunk_rows: usize,
) -> QueryResult;
```

## Options / Props

| Name | Description |
|------|-------------|
| `PartitionedClause::chunk_rows` | `CHUNK n` の指定値（正の整数）。省略時は `None`＝サーバー設定のチャンク幅。サーバー設定より小さい方向にしか変えられない |
| `apply_chunk_override` | サーバー設定を超える `CHUNK` は `22000`。走査予算・保持時間・同時実行数は文からは変えられない。パース時と実行時の 2 回呼ぶ多層防御 |
| `map_partitioned_failure` | 1 件も commit していない失敗は原因のコードのまま。1 チャンク以上 commit 後の失敗は `VD001`（`PARTIAL_COMPLETION`）。取り消しは件数入りの `VD002`。実行中の重複・同時実行数上限は `55P03`、中断記録数上限は `54000`、台帳なし構成は `0A000` |
| `execute_cancel` | 実行中なら次のチャンク境界で止める要求（`cancelling`）。commit 済みのチャンクは戻さない。`try_register` は使わない |
| `explain_result` | 応答列名は `QUERY PLAN`。サーバー設定値と文の形状のみで、行数などテナントの存在情報は含めない |

## Notes

- 出典は `fandhe-db-engine` 0.2.0（git SHA `dc888f6ea146d3078153d64a6848f5c8cf044431`）の `src/sql/partitioned.rs`（全668行、テスト除く先頭 401 行）。型と `pub(crate)` 入口のシグネチャ・主要 doc comment の抜粋で、private ヘルパー（`status_columns` / `empty_status_result` / `lookup_record` 等）は掲載していない。`DELETE`／`UPDATE` の完全な構文はこのモジュールの外（`sql::allowlist`）にある
- 応答メッセージには自テナントで commit 済みの件数・原因コード・クライアント自身の `operation_id` 以外を載せない（内側のエラー文言・テナント名・テーブル名・行内容は載せない）
- `SHOW` は writer を使わずユーザーテーブルのカタログも引かない。該当なしは同じ 2 列（`status`・`rows`）・0 行の共通応答
- `PartitionedControl::writes` は `Cancel` のみ真で、明示・暗黙トランザクション内では拒否される
- 関連 ADR（commit `dc888f6`、`docs/design/partitioned-dml.md`）
- distinct from `mssql` / `drizzle` / `supabase`: fandhe-db 独自の分割実行 DML 構文であり、各 SQL ダイアレクトの標準構文ではない

## Related

- [exec](./exec.md)
- [returning](./returning.md)
