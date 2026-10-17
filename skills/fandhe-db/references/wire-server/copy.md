---
source: https://docs.rs/crate/fandhe-db-wire-server/0.2.0/source/src/copy.rs
---

# copy

COPY プロトコル（`COPY ... FROM STDIN` / `COPY (...) TO STDOUT`）のメッセージ層（Issue #939・WIRE-17・TASK-220）。CopyIn / CopyOut サブプロトコルのフレーミング・状態遷移のみを担い、行のレコード分割・フィールドデコード・束縛・INDEX-4 上限判定・commit は `engine::sql::copy`（`EngineCore::begin_copy` / `commit_copy_in`）へ委譲する（第 2 の書き込み経路を作らない）。

## Signature / Usage

~~~rust,ignore
pub(crate) enum CopyStep {
    Completed, // CommandComplete "COPY n"（と finish に応じた ReadyForQuery）を書き終えた
    Failed,    // ErrorResponse + ReadyForQuery を書き終えた。以降の文は実行しない
    Closed,    // Terminate（'X'）受信・早期 EOF。接続ループを終了させる
}

pub(crate) fn run<'e, S: WireStream>(
    stream: &mut S,
    engine: &'e EngineCore,
    ctx: &PolicyContext,
    session: &mut SessionState,
    txn: &mut SessionTransaction<'e>,
    sql: &str,
    finish: Finish,
) -> io::Result<CopyStep>
~~~

## Options / Props

| Item | 内容 |
|------|------|
| CopyInResponse ('G') / CopyOutResponse ('H') | `Int8 format=0`・`Int16 num_columns`・`Int16[num_columns]`（各列 format=0）。CSV でも overall format は 0 |
| CopyDone ('c') | body なし固定 5 バイト |
| CopyData ('d') | text 形式は区切りタブ・NULL は `\N`、CSV 形式は区切りカンマ・NULL は引用符なしの空フィールド。区切り文字はクライアント指定不可（許可リスト外） |
| `limits::COPY_DISCARD_MAX_BYTES` | 16 MiB（エラー後の読み捨て総量） |
| `limits::COPY_DISCARD_MAX_MESSAGES` | 4096（エラー後の読み捨てフレーム件数） |

## Notes

- モジュールは `pub(crate)`（crate 外非公開）。`simple_query::run_copy_statement` が、分割済み 1 文に `engine::sql::copy::is_copy_statement` を適用して真なら（セッションが `Idle` または明示トランザクション中に）委譲する（Issue #1175・#1179。`Failed` 中は `25P02` で本モジュール到達前に拒否）。
- COPY サブプロトコルの開始から終了までを 1 回の呼び出しで完結させる。`finish` が `Finish::Continue` のとき成功時の `CommandComplete` 後に `ReadyForQuery` を送らず次の文へ制御を返す（エラー経路は常に ErrorResponse + `ReadyForQuery`）。
- `begin_copy_in_txn` の構造検証・`operation_id` 必須化ガード・テーブル解決が失敗した場合は CopyIn / CopyOutResponse を送らず通常の ErrorResponse + ReadyForQuery を返す。
- PostgreSQL 本家との既知の相違: protocol v3 の COPY は CopyDone で終端を表現するため protocol v2 由来の `\.` 終端行は受理・要求しない。COPY FROM STDIN の途中でエラーが起きた場合、CopyDone / CopyFail を受信し終えるまで ErrorResponse / ReadyForQuery の送出を遅らせる（本家は ErrorResponse を即送出）。
- 明示トランザクション中に COPY が失敗するとトランザクションを `Failed`（ReadyForQuery `'E'`）へ遷移させてから応答する。
- フレーミング破綻（`TooLarge` / `Malformed`）時は `wire_code` 付き ErrorResponse を送ってから接続を終了し、ReadyForQuery は送らない。読み捨て予算超過は `08P01`（`COPY discard budget exceeded`）の ErrorResponse 後に切断する。
- 設計 ADR `wire-copy-protocol` は本ページの出典として未参照（crate ソースの doc comment に限る）。

## Related

- [simple-query.md](./simple-query.md)
- [extended-query.md](./extended-query.md)
- [framing.md](./framing.md)
- [limits.md](./limits.md)
- [wire-stream.md](./wire-stream.md)
