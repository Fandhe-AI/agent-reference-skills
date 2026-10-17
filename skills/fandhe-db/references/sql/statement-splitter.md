---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/sql/statement_splitter.rs
---

# sql::statement_splitter

簡易クエリプロトコル 1 メッセージに含まれるセミコロン区切りの複数 SQL 文を分割する（WIRE-16・TASK-219）。通常状態の `;` だけを区切りとし、引用・コメント内の `;` は無視する。PostgreSQL と分割結果が食い違いうる構文では分割せず fail-closed に倒す。

## Signature / Usage

~~~rust,ignore
/// 1 メッセージで許容する非空文の上限（実装既定値。WIRE-16 のポインタ）。
pub const MAX_STATEMENTS_PER_QUERY: usize = 16;

pub enum SplitOutcome<'a> {
    /// 非空文が 0 個または 1 個で、既存 engine がそのまま受理する形
    /// （`;` なし、または末尾に 1 個だけの `;`）。
    Single,
    /// 非空文が 0 個（`;` のみ・空白のみ・`;;` のみ等）。EmptyQueryResponse を返す。
    Empty,
    /// 非空文が 2 個以上、または `Single` の条件を満たさない 1 個。
    Statements(Vec<&'a str>),
}

pub enum MultiStatementError {
    /// 非空文の数が [`MAX_STATEMENTS_PER_QUERY`] を超過した（`54000`）。
    TooManyStatements,
    /// 書き込み系文が最後の文以外の位置にある（`0A000`）。
    WriteNotLast,
    /// 分割実行 DML（`UPDATE`／`DELETE ... PARTITIONED`）または
    /// `CANCEL PARTITIONED DML` が 2 文以上のメッセージに含まれる（`25001`。Issue #1129）。
    PartitionedInMultiStatement,
}

pub enum StatementEffect {
    ReadOnly,
    SessionLocal,
    Write,
    Rejected,
    TransactionControl(crate::sql::transaction::TxnControl),
}

pub fn split_statements(input: &str) -> Result<SplitOutcome<'_>, MultiStatementError>
pub fn classify_statement(stmt: &str) -> StatementEffect

pub enum MultiStatementPlan {
    /// 文ごとに順次実行する（既存方式。トランザクション外の書き込みは最後の 1 文のみ）。
    Sequential,
    /// メッセージ全体を 1 つの暗黙トランザクションで実行し、最後の文の成功後に
    /// 1 回だけ commit する。途中のエラーは全体のロールバックになる。
    ImplicitTransaction,
}

pub fn plan_multi_statement(stmts: &[&str], session_in_txn: bool)
    -> Result<MultiStatementPlan, MultiStatementError>
pub fn check_write_placement(stmts: &[&str], initially_in_txn: bool)
    -> Result<(), MultiStatementError>
~~~

## Options / Props

`split_statements` が分割せず `SplitOutcome::Single`（全文を engine へ渡し lexer が `42601` で拒否）を返す入力:

| Input | Reason |
|-------|--------|
| 未終端の `'...'`・`"..."`・`/* */` | lexer が同一入力を必ず拒否する |
| 通常状態の `$`（ドル引用） | PostgreSQL と分割結果が食い違いうる |
| E 文字列接頭辞（`E'`／`e'`） | バックスラッシュエスケープの解釈が異なる |

`classify_statement` の分類（原文のコードより）: `SELECT`・`EXPLAIN`・`SHOW`・`DECLARE`・`FETCH`・`CLOSE`・`WITH` は `ReadOnly`、`SET`・`CREATE FUNCTION` は `SessionLocal`、`BEGIN`／`COMMIT`／`ROLLBACK` は `TransactionControl`、`COPY ... TO` は `ReadOnly`、それ以外の未知の先頭語（`INSERT`・`UPDATE`・`DELETE`・`TRUNCATE`・`DROP` 等）は `Write`（fail-closed）。

## Notes

- 上記フェンスは原文の公開シグネチャ・doc comment 要旨の抜粋（`split_statements` の走査本体・`classify_copy`・テストは省略）。分割規則・原子性の module doc は原文参照。
- 5 状態の走査: 通常／`'...'`（`''` エスケープ）／`"..."`（`""` エスケープ）／`--` コメント／`/* */`（入れ子を数える）。各断片は加工せず（コメントも除去せず）engine へ渡す。コメント・空白だけの断片は空文として無視（Issue #1346）。
- `plan_multi_statement`: セッションがトランザクション中、またはメッセージが `BEGIN`／`COMMIT`／`ROLLBACK` を含む場合は `Sequential`（書き込みはトランザクション外では最後の 1 文のみ）。制御文を含まず書き込みが最後以外にある場合だけ `ImplicitTransaction`（SQL-31・RECOVER-12）。暗黙トランザクションのエラーは `Failed` ではなく `Idle` へ戻る。
- Distinct from `mssql` (node-mssql, T-SQL client) / `drizzle` (TypeScript ORM) / `supabase` (Postgres): multi-statement messages are wire simple-query splitting with engine-specific atomicity rules.

## Related

- [transaction](./transaction.md)
- [copy](./copy.md)
- [lexer](./lexer.md)
- [allowlist](./allowlist.md)
