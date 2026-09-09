---
source: https://docs.rs/crate/fandhe-vector-db-wire-server/0.1.0/source/src/simple_query.rs
---

# simple_query

簡易クエリプロトコル（'Q'）1 文の実行と応答整形を担う（TASK-73・WIRE-1）。`handshake::post_auth_loop` が UTF-8 検証済みの `'Q'` 本文を受け取った直後にここへ委譲する。責務境界は (1) `engine::core::EngineCore::execute_sql_in_session` 呼び出し、(2) 成功／失敗結果の wire メッセージへの整形（実バイト列生成は [result-encoder.md](./result-encoder.md) に委譲）、(3) 接続単位 `SessionState` の受け渡しのみ。SQL の構文解釈・許可リスト判定・RLS 適用はすべて engine 側に委ねる。

## Signature / Usage

~~~rust,ignore
/// 簡易クエリ 1 文を実行し、成功／失敗いずれの場合も応答（`ReadyForQuery` 込み）を
/// 書き切る。呼び出し元は UTF-8 検証済みの `sql` のみを渡すこと（バイト列のまま渡さない。
/// UTF-8 検証は `handshake::post_auth_loop` の責務）。
pub(crate) fn execute_and_respond(
    stream: &mut TcpStream,
    engine: &EngineCore,
    ctx: &PolicyContext,
    session: &mut SessionState,
    sql: &str,
) -> io::Result<()>
~~~

## Notes

- モジュール自体は `pub mod simple_query`（`lib.rs` 参照）で crate 外にも公開されているが、内部の処理用アイテム（`execute_and_respond`）は `pub(crate)`（crate 外非公開）。
- SQL の構文解釈・許可リスト判定（`engine::sql::allowlist::validate_sql`）・RLS 適用はすべて engine 側の責務であり、本モジュールでは行わない。
- `--search-engine` opt-in の解決結果は [search-engine-opt.md](./search-engine-opt.md) を経由して `EngineCore` へ渡される（本モジュール自体は opt-in の解釈を行わない）。

## Related

- [result-encoder.md](./result-encoder.md)
- [response-buffer.md](./response-buffer.md)
- [handshake.md](./handshake.md)
