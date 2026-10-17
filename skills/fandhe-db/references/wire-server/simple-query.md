---
source: https://docs.rs/crate/fandhe-db-wire-server/0.2.0/source/src/simple_query.rs
---

# simple_query

簡易クエリプロトコル（'Q'）本文の実行と応答整形を担う（TASK-73・WIRE-1）。`handshake::post_auth_loop` が UTF-8 検証済みの `'Q'` 本文を受け取った直後にここへ委譲する。責務境界は (1) `engine::core::EngineCore::execute_sql_in_session` 呼び出し、(2) 成功／失敗結果の wire メッセージへの整形（実バイト列生成は [result-encoder.md](./result-encoder.md) に委譲）、(3) 接続単位 `SessionState` の受け渡しのみ。SQL の構文解釈・許可リスト判定・RLS 適用はすべて engine 側に委ねる。0.2.0 ではセミコロン区切りの複数文実行（WIRE-16）・明示トランザクション・`COPY`（WIRE-17）・`RETURNING` が加わった。

## Signature / Usage

~~~rust,ignore
//! 簡易クエリプロトコル（'Q'）本文の実行と応答整形を担う（TASK-73・WIRE-1）。
//!
//! **セミコロン区切りの複数文実行（WIRE-16・TASK-219・Issue #938）**: 1 つの `'Q'` 本文にセミコロン区切りで
//! 複数の SQL 文が含まれる場合、`engine::sql::statement_splitter::split_statements` へ分割を委譲する
//! （wire 層は SQL の字句知識を一切持たない）。各文は `RowDescription`／`DataRow`*／`CommandComplete` を
//! 順に送出し、最後の文の応答にのみ `ReadyForQuery` を付ける（`run_statement` の `finish` 引数）。途中の文が
//! エラーになった場合はそこで打ち切り、ErrorResponse＋`ReadyForQuery` を返して残りの文は実行しない。
//!
//! 実行方式は `engine::sql::statement_splitter::plan_multi_statement` が選ぶ（Issue #1175）。書き込み系文
//! （`INSERT`／`UPDATE`／`DELETE`／`TRUNCATE`。`StatementEffect::Write`）が最後の 1 文だけ、または
//! `BEGIN`／`COMMIT`／`ROLLBACK` を含むメッセージ・トランザクション中のセッションは文ごとに順次実行し
//! （`run_sequential_statements`。従来どおり `check_write_placement` が書き込み位置を検査し、違反は `0A000`）、
//! 書き込みが最後以外にあるメッセージはメッセージ全体を 1 つの暗黙トランザクションで原子的に実行する
//! （`run_implicit_transaction`。途中でエラーになれば先行する書き込みも残らず、接続は `ReadyForQuery('I')` のまま）。
//! 詳細・既知の逸脱は `docs/design/wire-multi-statement.md` 参照。途中でエラーになった場合はセッション状態
//! （`SET`／`CREATE FUNCTION` 等）もメッセージ受信前の値へ巻き戻す（`SessionState` の `clone` を保持し、失敗時に復元する）。
//! ただし順次実行でメッセージ内の明示トランザクションの境界（`BEGIN`/`COMMIT`/`ROLLBACK`）を跨いだ場合、
//! 巻き戻し先はその境界の時点の状態へ更新する（SQL-31・TASK-221。`MessageSnapshot` 参照）。
//!
//! `COPY`（WIRE-17）は文単位で `run_copy_statement` が扱い、複数文メッセージの 2 文目以降の `COPY` も
//! CopyIn／CopyOut サブプロトコルへ入る（Issue #1175）。
//!
//! `INSERT` は wire 経由で受理する（TASK-82・SQL-10）。`INSERT`／`DELETE`／`UPDATE`／UPSERT に `RETURNING` 句を
//! 付けた場合は `SqlOutcome::Returning` を返し、`respond_rows_with_tag` が `RowDescription`／`DataRow`* に続けて
//! `rows_affected`（`result.rows.len()` とは独立）由来の `CommandComplete` タグを送出する（Issue #873・SQL-21）。
//! engine 側の `INSERT` は行を常に `Visibility::Private` で書き込む固定仕様であり、wire 認証経由の `PolicyContext`
//! （`auth::verify`）は `Public` ＋ 自テナントの `Private` を許可可視性とする（RLS-11・TASK-195。read-your-writes）。
//! 他テナントの `Private` 行は引き続き不可視のまま。

/// `execute_and_respond`・`run_statement` が使う「この応答の後に `ReadyForQuery` を送出するか」の指定（WIRE-16）。
/// 複数文メッセージでは最後の文の応答にのみ `Finish::ReadyForQuery` を渡し、途中の文は `Finish::Continue`
/// （`ReadyForQuery` を送らず次の文へ進む）にする。エラー応答（`respond_error_and_ready`）は `finish` に関係なく
/// 常に `ReadyForQuery` を送る（途中エラーで打ち切るため、その時点で確定する）。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) enum Finish {
    ReadyForQuery,
    Continue,
}

/// 簡易クエリ本文を実行し、成功／失敗いずれの場合も応答（`ReadyForQuery` 込み）を書き切る。呼び出し元は UTF-8 検証済みの
/// `sql` のみを渡すこと（UTF-8 検証は `handshake::post_auth_loop` の責務）。単一文は元の SQL テキストを無加工のまま
/// `run_statement` へ渡す ―― 単一文の既存挙動（応答バイト列・エラーコード・メッセージ）は構造的に不変のまま保たれる。
/// 戻り値 `LoopSignal::Closed` は COPY 中に Terminate を受信した場合で、呼び出し元は接続ループを終了させる。
/// SQL 本文・テナント ID はログへ出さない（security.md P0）。
///
/// commit 成功から本関数が応答を書き終える（`ReadyForQuery` 送出含む）までの区間全体を覆う RAII ガード
/// （`engine::recovery::commit_boundary::ResponseBoundaryGuard`。RECOVER-5 (3)）を `'Q'` 本文 1 通全体を覆ったまま保つ。
/// `_response_boundary` を `let _ = ...`（無名束縛）に書き換えると即座に drop され保護区間全体が無効化されるため、
/// 必ず名前付き束縛のまま保つ。
pub(crate) fn execute_and_respond<'e, S: WireStream>(
    stream: &mut S,
    engine: &'e EngineCore,
    ctx: &PolicyContext,
    session: &mut SessionState,
    txn: &mut SessionTransaction<'e>,
    sql: &str,
) -> io::Result<LoopSignal>

/// `WireStream::emergency_response_channel` が返す組（送出形式済みバイト列＋書き込み先の生ソケット複製）をそのまま
/// `engine::recovery::panic_hook::EmergencyResponseRegistration::register` へ渡す。TLS 接続では
/// `emergency_response_channel`（`crate::tls::stream::TlsStream` の上書き実装）が緊急応答を TLS レコードとして
/// 暗号化済みのバイト列を返す。
pub(crate) fn register_emergency_response<S: WireStream + ?Sized>(
    stream: &S,
) -> Option<engine::recovery::panic_hook::EmergencyResponseRegistration>

/// TASK-97（RECOVER-6・ERR-1）の「登録ブロック」を関数として切り出したもの（Issue #934・#933 の Execute〔拡張クエリ〕が
/// `EngineCore::execute_parsed_in_session` 呼び出しでも同じ緊急応答登録・panic 注入点の位置関係を再利用するための共有本体）。
/// 「outcome を決定する区間」を `f` 引数へ委譲することで、登録（eager）と panic 注入位置の契約を 1 箇所に保つ——`f` の呼び出し
/// 完了直後（ブロック終端）で `_emergency_registration` がレキシカルに drop される。feature `fault-injection` 有効時のみ、
/// ブロック終端で `crate::fault_injection::maybe_panic_after_commit(&outcome)` が commit 後 panic を注入する（Issue #705）。
pub(crate) fn execute_with_emergency_registration<S: WireStream>(
    stream: &mut S,
    f: impl FnOnce() -> Result<SqlOutcome, engine::sql::allowlist::SqlSurfaceError>,
) -> Result<SqlOutcome, engine::sql::allowlist::SqlSurfaceError>

/// `SqlOutcome` の行を返す応答が確定する際、`CommandComplete` タグの数値部分をどう決めるかの区別（Issue #934）。
pub(crate) enum TagShape {
    /// `prefix` と実際に送出した行数（`render` の `sent` 引数）からタグを組み立てる（`SELECT`／`FETCH`）。
    Dynamic(&'static str),
    /// 常に固定文字列（`EXPLAIN`。行を返すが件数を持たないタグ）。
    Fixed(String),
    /// タグの数値部分も固定（`INSERT 0 <n>`・`RETURNING` の `rows_affected`）。`result.rows.len()` とは独立の値。
    FixedTag(String),
}

impl TagShape {
    pub(crate) fn render(&self, sent: usize) -> String
}

/// `SqlOutcome` を「行を返す応答」か「`CommandComplete` 単独応答」かへ写像する（Issue #934。拡張クエリプロトコルの
/// Execute とも共有する。`CommandComplete` タグ文言・分岐の唯一の情報源）。
pub(crate) enum OutcomeResponse {
    Rows { result: engine::sql::exec::QueryResult, shape: TagShape },
    Command { tag: String },
}

/// タグ写像: `Query` → `SELECT <n>`（Dynamic）、`Explain` → `EXPLAIN`（Fixed）、`SetSearchMode` → `SET`、
/// `CreateFunction` → `CREATE FUNCTION`、`Insert` → `INSERT 0 <rows>`、`Truncate` → `TRUNCATE TABLE`、`Delete` → `DELETE <rows>`、
/// `Update` → `UPDATE <rows>`、`Returning` → `INSERT 0 <rows>`／`UPDATE <rows>`／`DELETE <rows>`（FixedTag）、
/// `Begin` → `BEGIN`、`Commit` → `COMMIT`、`Rollback` → `ROLLBACK`、`CreateTable` → `CREATE TABLE`、`DropTable` → `DROP TABLE`、
/// `DeclareCursor` → `DECLARE CURSOR`、`Fetch` → `FETCH <n>`（Dynamic）、`CloseCursor` → `CLOSE CURSOR`、`AlterTable` → `ALTER TABLE`、
/// `CreateView` → `CREATE VIEW`、`DropView` → `DROP VIEW`、`CreateIndex` → `CREATE INDEX`、`DropIndex` → `DROP INDEX`、
/// `CreateType` → `CREATE TYPE`、`DropType` → `DROP TYPE`。
pub(crate) fn map_outcome(outcome: SqlOutcome) -> OutcomeResponse

/// `execute_and_respond` が使う緊急応答バイト列（`D`=`state=may_be_committed` 込み）を crate 外から取得するための唯一の公開経路
/// （TASK-97・ERR-5）。呼び出し文脈は `crates/wire-server/tests/wire_emergency_response.rs`（層 A 結合テスト）。登録・送出のいずれにも関与しない。
pub fn emergency_response_bytes() -> Option<&'static [u8]>
~~~

## Notes

- Migration (0.1.0 → 0.2.0): `execute_and_respond` の引数が `&mut TcpStream` から `&mut S`（`S: WireStream`）になり、`txn: &mut SessionTransaction<'e>` が加わり、戻り値は `io::Result<()>` から `io::Result<LoopSignal>` に変わった（いずれも `pub(crate)`）。新規 pub: `emergency_response_bytes`。モジュール自体は `pub mod simple_query`（`lib.rs` 参照）で crate 外にも公開されているが、`execute_and_respond` などの処理用アイテムは `pub(crate)`（crate 外非公開）。
- SQL の構文解釈・許可リスト判定（`engine::sql::allowlist::validate_sql`）・RLS 適用はすべて engine 側の責務であり、本モジュールでは行わない。
- `--search-engine` opt-in の解決結果は [search-engine-opt.md](./search-engine-opt.md) を経由して `EngineCore` へ渡される（本モジュール自体は opt-in の解釈を行わない）。
- `respond_command_complete_with` はエンコード失敗時、明示トランザクション中なら `txn.fail()` で `Failed` へ遷移させる（SQL-31・TASK-221。PR #1041 レビュー指摘: `Active` のまま残すと後続の `COMMIT` が書き込みを永続化してしまう）。
- `execute_and_respond` から辿り着く private 関数 `respond_query_result` は応答を `ResponseBuffer`（[response-buffer.md](./response-buffer.md)）へ組み立てる。`RowDescription`／`CommandComplete`／`ReadyForQuery` は `push_frame` 経由（巨大フレームは直送されバッファを経由しない）だが、各 `DataRow` は `result_encoder::encode_data_row_into` でバッファへ直接追記してから閾値を確認する別経路であり、`push_frame` のサイズ保証は適用されない。詳細は [response-buffer.md](./response-buffer.md) の Notes を参照。
- 本ページは `fandhe-db-wire-server` 0.2.0（git SHA `dc888f6ea146d3078153d64a6848f5c8cf044431`）の `src/simple_query.rs`（pub／crate 内部の入口とモジュール doc の要点）から更新した。`run_statement` / `run_sequential_statements` / `run_implicit_transaction` / `run_copy_statement` / `respond_rows_with_tag` の本体は未転記。

## Related

- [result-encoder.md](./result-encoder.md)
- [response-buffer.md](./response-buffer.md)
- [handshake.md](./handshake.md)
