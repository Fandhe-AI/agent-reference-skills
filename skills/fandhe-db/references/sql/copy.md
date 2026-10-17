---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/sql/copy.rs
---

# sql::copy

COPY プロトコル（`COPY ... FROM STDIN`／`COPY (...) TO STDOUT`）の SQL 表層側実装（Issue #939・WIRE-17・TASK-220）。wire-server はメッセージ層のみを担い、レコード分割・フィールドデコード・束縛・INDEX-4 上限判定・commit はここへ集約する。`FROM STDIN` は CopyDone より前に INDEX-4 の 4 上限を逐次判定する。`TO STDOUT` は広域取得（SQL-15）と同じ実行本体を使う。

## Signature / Usage

~~~rust,ignore
//! COPY プロトコル（`COPY ... FROM STDIN`／`COPY (...) TO STDOUT`）の SQL 表層
//! 側実装（Issue #939・WIRE-17・TASK-220）。
//!
//! 責務境界: wire-server（`crates/wire-server/src/copy.rs`）は CopyIn／CopyOut
//! サブプロトコルのメッセージ層（フレーミング・状態遷移）のみを担い、行の
//! レコード分割・フィールドデコード・束縛・INDEX-4 上限判定・commit はすべて
//! ここへ集約する（第 2 の書き込み経路を作らない設計。TASK-190（SQL-16。
//! [`crate::core::EngineCore::execute_bound_insert_in_session`]）と同一の
//! commit 経路を [`crate::core::EngineCore::commit_copy_in`] 経由で共有する）。
//!
//! `FROM STDIN` は全 CopyData を受信し終える前（CopyDone より前）に INDEX-4 の
//! 4 上限を逐次判定する（[`crate::batch_limits`] の逐次判定ヘルパーを使う。
//! ...）。`TO STDOUT` は広域取得（SQL-15・Issue #454）と同じ
//! 実行本体（[`crate::core::EngineCore::run_scan_plan`]）をそのまま使う
//! （第 2 の SELECT 実行器を持たない）。
//!
//! protocol v3 の COPY サブプロトコルは CopyDone（'c'）で終端を表現するため、
//! protocol v2 由来の `\.` 終端行は本実装では受理・要求しない（PostgreSQL
//! 本家との既知の相違点。詳細は `docs/design/wire-copy-protocol.md` 参照）。

pub fn is_copy_statement(sql: &str) -> bool

/// `COPY <table> (<cols>) FROM STDIN` の逐次取り込み状態（Issue #939・
/// WIRE-17）。構築は [`crate::core::EngineCore::begin_copy`] のみが行う。
/// [`Self::feed`] を CopyData ごとに呼び、INDEX-4 の 4 上限を CopyDone より
/// 前に逐次判定する。[`Self::finish`] で末尾レコードを確定させ、実際の
/// commit（[`crate::core::EngineCore::commit_copy_in`]）へ渡す
/// [`CopyInBatch`] を返す。
#[derive(Debug)]
pub struct CopyInSession { /* private fields */ }

impl CopyInSession {
    pub fn table(&self) -> &str
    /// 列リストの列数（`id` 疑似列を含む）。
    pub fn column_count(&self) -> usize
    /// 1 個の CopyData メッセージ本文を取り込む。判定順序:
    /// 1. ③（生 CopyData バイト量の累計）を `pending` へ追加する前に判定（`54000`）。
    /// 2. 完了したレコードごとに、①（行数）→④（生成チャンク数。1 行=1 チャンク）→
    ///    フィールド分割・エスケープ解決・列型照合（`22000`）→②（当該行の
    ///    デコード後バイト量）の順に判定する。
    pub fn feed(&mut self, chunk: &[u8]) -> Result<(), SqlSurfaceError>
    /// CopyDone 到達時に呼ぶ。改行なしで終わった末尾レコード（存在する場合）を
    /// 確定させたうえで、0 行のままなら拒否する（既存の複数行 `INSERT` バッチと
    /// 同じ「空バッチ拒否」契約）。
    pub fn finish(mut self) -> Result<CopyInBatch, SqlSurfaceError>
}

/// [`CopyInSession::finish`] が返す、commit 直前の束縛済みバッチ。
pub struct CopyInBatch { /* pub(crate) fields */ }

impl CopyInBatch {
    pub fn table(&self) -> &str
    pub fn row_count(&self) -> usize
}
~~~

## Notes

- 上記フェンスは原文の module doc・doc comment・公開シグネチャの抜粋（関数本体と非公開の CSV／text 状態機械 `CsvRecordScanner`・`RecordSplitter` は省略）。完全な原文は出典ファイル参照。
- `is_copy_statement` は wire 層のホットパスで `lexer::tokenize` を増やさないための安価な先頭語判定。見逃した場合（コメント前置等）は通常の `validate_sql` 経路へ流れ `42601` で拒否される（fail-closed）。
- CSV は 1 回の走査でレコード分割とフィールドデコードを行い、フィールド途中の生引用符・閉じ引用符直後の非区切り文字・LF の続かない CR を `22000` で拒否する。text 形式の裸 CR も `22000`。
- 列リストは `CopyInResponse` 送出前に検証される（未知列は `22000`、`DEFAULT` も nullable でもない列の欠落は `23502`）。`DEFAULT` を持つ列は列リストに無くても補われる。
- `COPY ... TO STDOUT` は読み取り専用、`FROM STDIN` は書き込みとして複数文メッセージの配置判定に分類される（[statement-splitter](./statement-splitter.md) の `classify_statement`）。
- Distinct from `mssql` (node-mssql, T-SQL client) / `drizzle` (TypeScript ORM) / `supabase` (Postgres): this is the engine's own PostgreSQL wire v3 compatible COPY subset, not a general PostgreSQL `COPY` implementation.

## Related

- [allowlist](./allowlist.md)
- [parser](./parser.md)
- [scan](./scan.md)
- [statement-splitter](./statement-splitter.md)
- [transaction](./transaction.md)
