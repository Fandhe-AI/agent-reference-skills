---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/sql/transaction.rs
---

# sql::transaction

明示トランザクション `BEGIN`／`COMMIT`／`ROLLBACK`（SQL-31・TASK-221）の構文受理と、セッション単位の状態機械 `SessionTransaction`。`Idle` の間は autocommit 経路と同一に振る舞い、`Active` の間だけ共有 `redb::WriteTransaction` を保持して複数の書き込み文を 1 回の commit にまとめる。

## Signature / Usage

~~~rust,ignore
//! 明示トランザクション `BEGIN`/`COMMIT`/`ROLLBACK`（SQL-31・TASK-221）の構文
//! 受理と、セッション単位の状態機械 [`SessionTransaction`] を提供する。
//!
//! `Idle`（トランザクション外）の間は既存の autocommit 経路
//! （[`crate::core::EngineCore::execute_sql_in_session`]）とビット同一に振る舞い、
//! `Active` の間だけ共有 `redb::WriteTransaction`
//! （[`crate::storage::Storage::begin_explicit_write_txn`]）を保持して複数の
//! 書き込み文を 1 回の commit にまとめる。
//!
//! commit 成功境界（`RECOVER-5`・`RECOVER-6`）: point of no return は `COMMIT`
//! 文が呼ぶ [`crate::recovery::commit_boundary::commit`] の 1 回のみ。台帳
//! （`RECOVER-12`）は行書き込みと同一の共有 `write_txn` 内に記録されるため、
//! `ROLLBACK`・接続断（`SessionTransaction` の drop）で行・台帳とも一括して
//! 消える。

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum TxnControl { Begin, Commit, Rollback }

/// SQL テキストの先頭トークンが `ROLLBACK`（大小無視）かどうか。明示トランザクションが
/// `Failed` の間に受理してよい文かを parse 前に判定するために使う。
/// 字句解析に失敗した入力は `false`（fail-closed）。
pub fn is_rollback_statement(sql: &str) -> bool

pub enum TransactionStatus { Idle, InTransaction, Failed }

/// トランザクションの持続時間・文数の上限（実装既定値。spec 由来の数値ではない）。
#[derive(Debug, Clone, Copy)]
pub struct TransactionLimits {
    pub max_duration: Duration,
    pub max_statements: u32,
}

impl Default for TransactionLimits {
    fn default() -> Self {
        Self {
            max_duration: Duration::from_secs(20),
            max_statements: 1_000,
        }
    }
}

/// 接続（セッション）ごとに 1 つ保持する明示トランザクションの状態機械。
pub struct SessionTransaction<'e> { /* state, limits, generation */ }

impl<'e> SessionTransaction<'e> {
    pub fn new(limits: TransactionLimits) -> Self
    pub fn status(&self) -> TransactionStatus
    pub fn is_active(&self) -> bool
    pub fn active_generation(&self) -> Option<u64>
    /// `BEGIN`。`Idle` から `Active` へ遷移する。単一ライタの permit を取得したまま保持する
    /// （待機上限超過は `55P03`）。
    pub fn begin(&mut self, storage: &'e crate::storage::Storage, session: &SessionState)
        -> Result<(), SqlSurfaceError>
    pub fn begin_implicit(...)
    pub fn commit_implicit(&mut self, session: &mut SessionState) -> Result<(), SqlSurfaceError>
    pub fn abort_implicit(&mut self)
    pub fn is_implicit_active(&self) -> bool
    pub fn commit(&mut self, session: &mut SessionState) -> Result<(), SqlSurfaceError>
    pub fn rollback(&mut self, session: &mut SessionState) -> Result<(), SqlSurfaceError>
    pub fn cursor_id(&self, name: &str) -> Option<u64>
    pub fn fail(&mut self)
    pub fn release_if_expired(&mut self) -> bool
    pub fn take_failed_error(&mut self) -> SqlSurfaceError
    pub fn remaining_duration(&self) -> Option<Duration>
}
~~~

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `max_duration` | `Duration` | 20 秒 | トランザクションの持続時間上限 |
| `max_statements` | `u32` | 1,000 | 1 トランザクションあたりの文数上限 |

上限超過のエラー文言は `transaction exceeded duration or statement limit`（`54000`）。

## Notes

- 上記フェンスは原文の module doc 抜粋と公開シグネチャ（本体・`ActiveTxn`・`pub(crate)` メソッドは省略）。`begin_implicit` のシグネチャは原文の複数行引数のため `...` で省略。
- 受理する構文は `BEGIN`／`COMMIT`／`ROLLBACK` に任意の `WORK`／`TRANSACTION` を付けた規範形のみ。分離レベル指定・`READ ONLY`・`AND CHAIN`・`$n` 等は `42601`。
- 暗黙トランザクション（Issue #1175・WIRE-16）: `BEGIN` を含まない複数文メッセージで書き込みが最後以外にある形は wire 層が `begin_implicit` で包んで原子実行する。起源が `Implicit` の `Active` はエラー・上限超過で `Failed` ではなく `Idle` へ戻る（[statement-splitter](./statement-splitter.md)）。
- 読み取り（Issue #1179）: 自トランザクションが未 commit の変更を持たない間は BEGIN 時点の確定済みスナップショットで読む。変更を持つ間は共有書き込みトランザクションを読み取り源にして未 commit の変更を反映する。
- 単一ライタ制約: `BEGIN` の時点で書き込みトランザクションを取得するため、読み取り専用のトランザクションでも単一ライタを占有する（設計 ADR `explicit-transaction.md` が既知のトレードオフとして記録）。ライタ待ちは writer gate の待機上限で打ち切られ `55P03`。
- カーソルの寿命はトランザクションに一致する（[cursor](./cursor.md)）。`ROLLBACK`・接続断で行・台帳とも消える。
- Distinct from `mssql` (node-mssql, T-SQL client) / `drizzle` (TypeScript ORM) / `supabase` (Postgres): the `BEGIN` here holds the engine's single writer for the transaction, with a fixed limited syntax subset.

## Related

- [cursor](./cursor.md)
- [statement-splitter](./statement-splitter.md)
- [copy](./copy.md)
- [sql-module](./sql-module.md)
