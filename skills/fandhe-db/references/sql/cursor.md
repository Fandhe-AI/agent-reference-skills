---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/sql/cursor.rs
---

# sql::cursor

カーソル（`DECLARE`／`FETCH`／`CLOSE`。WIRE-15・TASK-218）の構文受理とセッション内保持状態。内側 SELECT は集計 SELECT（SQL-13・SQL-14）・広域取得 SELECT（SQL-15）に限り、`DECLARE` 実行時に 1 回だけ実行した確定行集合（INSENSITIVE）を `FETCH` が先頭から払い出す。

## Signature / Usage

~~~rust,ignore
//! カーソル（`DECLARE`/`FETCH`/`CLOSE`。WIRE-15・TASK-218）の構文受理と
//! セッション内保持状態を提供する。
//!
//! カーソルの実体は `DECLARE` 実行時点で内側 SELECT を 1 回だけ実行して
//! 確定させた行集合であり（INSENSITIVE。以降の自トランザクションの書き込みで
//! 内容が変わらない）、`FETCH` は先頭からの払い出し位置を進めるだけで
//! 検索本体を再実行しない。カーソルの寿命はトランザクションの寿命に一致し、
//! [`crate::sql::transaction::ActiveTxn`] に埋め込まれるため、`COMMIT`／
//! `ROLLBACK`／`fail`／期限切れ／接続断のいずれでも自動的に消える（`Drop`
//! に委ねる。漏れる経路を持たない）。詳細な判断記録は
//! `docs/design/sql-cursor.md` 参照。

/// 接続（セッション）が同時に開けるカーソル数の上限（実装既定値。
/// 内側 SELECT を実行する**前**に判定する）。
pub const MAX_CURSORS_PER_SESSION: usize = 16;

/// セッション内でカーソルが保持する確定済み行の合計バイト数上限（実装既定値）。
pub const MAX_CURSOR_BYTES_PER_SESSION: usize = 16 * 1024 * 1024;

#[derive(Debug, Clone, PartialEq)]
pub enum CursorStatement {
    Declare {
        name: String,
        /// `FOR` より後ろの内側 SELECT のトークン列
        query: Vec<Token>,
    },
    Fetch {
        name: String,
        /// `1..=`[`crate::core::MAX_SEARCH_K`] の範囲検証済み
        count: usize,
    },
    Close {
        name: String,
    },
}

/// `DECLARE <name> CURSOR FOR <SELECT>`（規範形のみ。`SCROLL`／`NO SCROLL`／
/// `BINARY`／`INSENSITIVE`／`ASENSITIVE`／`WITH HOLD`／`WITHOUT HOLD` はいずれも
/// 未対応構文として `42601` へ落ちる）。
/// 受理する内側 SELECT は集計 `SELECT`（SQL-13・SQL-14）・広域取得 `SELECT`
/// （SQL-15）のみ（WIRE-15 の確定範囲）。ベクトル順位付けの検索 `SELECT`
/// （`Statement::Select`）・`EXPLAIN`・`SET`／`CREATE FUNCTION` は許可形状に
/// 一致しないものとして `42601` で拒否する。
pub(crate) fn validate_declare_tokens(tokens: &[Token], lookup: &impl TableLookup)
    -> Result<CursorStatement, SqlSurfaceError>

/// `FETCH [FORWARD] <n> FROM <name>`（規範形のみ。`IN`／`ALL`／`NEXT`／
/// `BACKWARD`／`ABSOLUTE` はいずれも `n` の位置に `Token::Number` を要求する
/// 構造上、自然に `42601` へ落ちる）。`$n` ... は本バージョンのスコープ外
pub(crate) fn validate_fetch_tokens(tokens: &[Token]) -> Result<CursorStatement, SqlSurfaceError>

/// `CLOSE <name>`（規範形のみ）。
pub(crate) fn validate_close_tokens(tokens: &[Token]) -> Result<CursorStatement, SqlSurfaceError>

pub(crate) struct CursorRegistry { /* cursors, total_bytes, next_id */ }

impl CursorRegistry {
    /// 重複名（`22000`）・同時カーソル数の上限超過（`54000`）を、内側 SELECT の
    /// 実行コストをかける前に検出する。
    pub(crate) fn ensure_capacity_for_declare(&self, name: &str) -> Result<(), SqlSurfaceError>
    pub(crate) fn remaining_bytes(&self) -> usize
    pub(crate) fn declare(&mut self, name: String, result: QueryResult) -> Result<(), SqlSurfaceError>
    /// `name` のカーソルから未取得の先頭行を最大 `count` 件払い出す（末尾に
    /// 達していれば 0 行）。`name` が存在しない場合は `34000`。
    pub(crate) fn fetch(&mut self, name: &str, count: usize) -> Result<QueryResult, SqlSurfaceError>
    pub(crate) fn close(&mut self, name: &str) -> Result<(), SqlSurfaceError>
}
~~~

## Notes

- 上記フェンスは原文 module doc・定数・公開／準公開シグネチャの抜粋（本体・サイズ見積り関数・テストは省略）。`CursorRegistry` 等は `pub(crate)` で、クレート外から使える公開型は `CursorStatement` と 2 つの定数。
- `CLOSE ALL`／`FETCH ALL` は未対応（`ALL` という名前は明示的に拒否）。カーソル名はテーブル名・列名と同じ識別子検証。
- 構文解析段（`validate_declare_tokens_structure_only`）は実カタログを参照しない。テーブル存在確認・ビュー展開は `Active` なトランザクション内での実行時に行う。トランザクション外の `DECLARE` は常に `25P01`。
- カーソルは明示トランザクション内でのみ使え、`$n` パラメータは cursor 文では一律拒否される（[params](./params.md)）。
- Distinct from `mssql` (node-mssql, T-SQL client) / `drizzle` (TypeScript ORM) / `supabase` (Postgres): the cursor is a materialized snapshot (INSENSITIVE, forward only), not a server-side scrollable PostgreSQL cursor.

## Related

- [transaction](./transaction.md)
- [params](./params.md)
- [scan](./scan.md)
- [allowlist](./allowlist.md)
