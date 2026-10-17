---
source: https://docs.rs/crate/fandhe-db-wire-server/0.2.0/source/src/extended_query.rs
---

# extended_query

拡張クエリプロトコルの Parse（'P'）・Describe（'D'。statement・portal 両対象）・Bind（'B'）・Execute（'E'）・Sync（'S'）・Close（'C'）・Flush（'H'）を受理するモジュール（Issue #933・#934・TASK-71・WIRE-11）。`handshake::post_auth_loop` から engine が接続済み（`Some`）の場合にのみ呼ばれる。接続単位の `ExtendedQueryState` が Parse 済み `ParsedSql`（`PreparedStatementStore`）と portal（`PortalStore`）を保持し、接続終了で破棄する（接続間・テナント間で共有しない）。

## Signature / Usage

~~~rust,ignore
pub(crate) enum LoopSignal { Continue, Closed }

pub(crate) fn handle_parse<S: WireStream>(
    stream: &mut S,
    engine: &EngineCore,
    txn: &mut engine::sql::transaction::SessionTransaction<'_>,
    state: &mut ExtendedQueryState,
) -> io::Result<LoopSignal>

pub(crate) fn handle_describe<S: WireStream>(/* ... */) -> io::Result<LoopSignal>
pub(crate) fn handle_bind<S: WireStream>(/* ... */) -> io::Result<LoopSignal>
pub(crate) fn handle_execute<'e, S: WireStream>(
    stream: &mut S,
    engine: &'e EngineCore,
    ctx: &engine::policy::PolicyContext,
    session: &mut SessionState,
    txn: &mut engine::sql::transaction::SessionTransaction<'e>,
    state: &mut ExtendedQueryState,
) -> io::Result<LoopSignal>
pub(crate) fn handle_sync<S: WireStream>(
    stream: &mut S,
    state: &mut ExtendedQueryState,
    txn_status: engine::sql::transaction::TransactionStatus,
    active_generation: Option<u64>,
) -> io::Result<LoopSignal>
pub(crate) fn handle_close<S: WireStream>(/* ... */) -> io::Result<LoopSignal>
pub(crate) fn handle_flush<S: WireStream>(stream: &mut S) -> io::Result<LoopSignal>
~~~

## Options / Props

メッセージ body のレイアウト（PostgreSQL wire v3）と最小長。

| Message | Body | Min length |
|---------|------|------------|
| Parse ('P') | statement 名 cstr・クエリ cstr・型 OID 件数 i16・OID 列 i32 x 件数 | 4 |
| Describe ('D') | 種別 'S' / 'P'・対象名 cstr | 2 |
| Bind ('B') | portal 名 cstr・statement 名 cstr・param format code 件数 i16 + 列・param 件数 i16 + 各値（i32 長、-1 は NULL）・結果 format code 件数 i16 + 列 | 8 |
| Execute ('E') | portal 名 cstr・max_rows i32 | 5 |
| Close ('C') | 種別 'S' / 'P'・対象名 cstr | 2 |

セッション上限（`crate::limits`）。

| Constant | Value |
|----------|-------|
| `MAX_PREPARED_STATEMENTS_PER_SESSION` | 64 |
| `MAX_PORTALS_PER_SESSION` | 64 |
| `MAX_STATEMENT_NAME_LEN` | 63 |
| `MAX_PREPARED_SQL_BYTES_PER_SESSION` | 4 MiB |
| `MAX_BOUND_PARAM_BYTES_PER_SESSION` | 4 MiB |
| `MAX_SUSPENDED_PORTAL_BYTES_PER_SESSION` | 16 MiB |

SQLSTATE 写像（モジュール doc より）。

| 事象 | SQLSTATE |
|------|----------|
| 未定義 statement / portal 参照・重複作成・Bind のパラメータ数不一致・format code 個数不正・binary 値の長さ不正・body 構造不正（NUL 終端欠落・余剰バイト・負の件数・非 UTF-8・種別バイト不正）・結果 format code の値不正（0/1 以外） | `08P01` |
| binary 指定スロットが復号非対応・結果 format code が非対応型の列を binary 指定・Describe(Portal) 対象の受理不能 | `0A000` |
| 件数・名前長・保持バイト上限超過・パラメータ型宣言件数が `MAX_PARAMS` 超過 | `54000` |
| SQL 検証失敗・実行時エラー | 簡易クエリと同一（`SqlSurfaceError::error_class()`） |

## Notes

- 本文の語はモジュール doc に基づく。ハンドラ関数・`LoopSignal`・各ストア型は `pub(crate)`（crate 外非公開）、モジュール自体は `pub mod extended_query`。
- エラー後の同期回復（ignore-till-sync）: `read_length_prefixed_body` 成功後に判明した回復可能エラーは ErrorResponse を送出し `ExtendedQueryState::ignore_till_sync` を立て、次の Sync まで後続メッセージを読み捨てる。Sync 到達でフラグを解除し `ReadyForQuery` を返す。'X' は通常終了、COPY・FunctionCall・未知の型バイトは破棄対象にせず fail-closed に切断する。
- `read_length_prefixed_body` 自体が失敗した場合（境界確定不能・宣言長が上限超過等）は ErrorResponse 後に有界 lingering close で接続を終了する（回復不能）。
- portal のライフサイクル: Bind が `ParsedSql` のスナップショットを保持して portal を構築し、Execute が実行・`max_rows` による分割送出（`PortalState::Suspended`）・完了（`PortalState::Done`。副作用は再実行しない）を管理する。Sync で無名 portal は常に破棄、名前付き portal は `Idle` / `Failed` で破棄。明示トランザクション中（`InTransaction`）は同じトランザクション世代で Bind した名前付き portal のみ Sync を越えて保持し（WIRE-11・Issue #1174）、`COMMIT` / `ROLLBACK` / abort / 期限切れで失効する。`Idle` 中に Bind し同一サイクルで `BEGIN` した portal は破棄する（PostgreSQL の暗黙ブロック昇格とは異なる）。名前付き prepared statement は Sync を越えて残り、Close(Statement) はその statement から作られた portal もまとめて閉じる。
- Execute の `max_rows` は `0` のみが無制限取得。負値は `08P01` で拒否する。送出予定分は 1 行ずつエンコードして送出し、中断保持分の合計を `MAX_SUSPENDED_PORTAL_BYTES_PER_SESSION` で接続全体に対して判定する（超過時は 1 バイトも送らず拒否）。
- カーソル `FETCH`（WIRE-15・TASK-218）から作った portal は `CursorBinding`（トランザクション世代・カーソル個体識別子）を再開前に突き合わせ、`CLOSE` / `COMMIT` / `ROLLBACK` / 同名の再 `DECLARE` 後に蓄積済みフレームを送出しない。
- Parse は宣言 OID を受理するが値検証には使わない（WIRE-12）。`$n` を含む文は `PreparedStatement::Parameterized` として engine の `PreparedSql` テンプレートと `ParamSlot`（公告 OID・binary 復号種別）を保持し、Bind が `engine.bind_prepared` で値を束縛する。binary 復号種別の決定は text 系（宣言 OID 0 / 25 / 1043）・int・Real(700)・Double(701)・Boolean(16)・Bytea(17)・Uuid(2950) のみで、それ以外は `Unsupported`（`0A000`）。
- `engine: None`（`handle_connection_bounded` 経由の後方互換パス）では 'P' / 'D' / 'B' / 'E' / 'S' / 'C' / 'H' は従来どおり `protocol_dispatch::reject_and_close`（`0A000` + 切断、WIRE-8）。
- ADR 3 件（`wire-extended-query-parse-describe` / `wire-extended-query-bind-execute-sync` / `wire-extended-query-param-binding`）は本 Notes の出典として未参照。上記は crate ソースの doc comment に限る。

## Related

- [binary-param.md](./binary-param.md)
- [simple-query.md](./simple-query.md)
- [copy.md](./copy.md)
- [wire-stream.md](./wire-stream.md)
- [limits.md](./limits.md)
- [result-encoder.md](./result-encoder.md)
