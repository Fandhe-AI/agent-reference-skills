---
source: https://docs.rs/crate/fandhe-db-wire-server/0.2.0/source/src/protocol_dispatch.rs
---

# protocol_dispatch

認証後に届くフロントエンドメッセージの型バイト分類と、engine 未接続（`engine: None`）の経路で拡張クエリ系・COPY 系・未知メッセージを fail-closed に拒否して切断する処理を担う（TASK-71・WIRE-8）。engine 接続時は Parse/Bind/Describe（statement・portal）/Execute/Sync/Close/Flush をすべて `crate::extended_query`（`handle_*`）が受理する（`handshake::post_auth_loop` の分岐による）。`handshake::post_auth_loop` から呼ばれる。フレーミング（長さ検証）は `handshake` モジュール、接続数・タイムアウトは `server` モジュールの管轄のままで、本モジュールはどちらにも触れない。

## Signature / Usage

~~~rust,ignore
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) enum FrontendMessageKind {
    /// 簡易クエリ（'Q'）。実処理は `handshake::post_auth_loop` の既存分岐に委ねる。
    SimpleQuery,
    /// Terminate（'X'）。実処理は `handshake::post_auth_loop` の既存分岐に委ねる。
    Terminate,
    /// Parse（'P'）。WIRE-11（Issue #933）で `crate::extended_query::handle_parse`
    /// が受理する経路へ切り替わったため、本モジュールの `reject_and_close` には
    /// 到達しない（`classify` の全域性を保つために分類のみ残す）。
    Parse,
    /// Describe（'D'）。種別バイト（'S'/'P'）は body 側にあるため本分類では
    /// 判別しない。`crate::extended_query::handle_describe` が本文を読んで
    /// 種別ごとに振り分ける（statement は受理、portal は WIRE-8 のまま
    /// `0A000` + 切断）。
    Describe,
    /// 拡張クエリプロトコル系（Bind/Execute/Sync/Close/Flush）。WIRE-8 の
    /// 主対象のまま残る（Parse/Describe は上記へ切り出し済み）。中に元の
    /// 型バイトを保持する（ログ用途のみ）。
    ExtendedQuery(u8),
    /// COPY・関数呼び出し系（FunctionCall/CopyData/CopyDone/CopyFail）。同じ応答契約に倒す。
    UnsupportedFeature(u8),
    /// 上記いずれにも該当しない型バイト（認証後に来るべきでない 'p' を含む）。
    Unknown(u8),
}

/// 型バイト 1 つを `FrontendMessageKind` へ写像する。body・後続パイプラインは一切読まない。
pub(crate) fn classify(type_byte: u8) -> FrontendMessageKind

/// lingering close の上限（時間）。
pub(crate) const LINGER_DRAIN_TIMEOUT: Duration = Duration::from_secs(1);

/// lingering close の上限（バイト数）。
pub(crate) const LINGER_DRAIN_MAX_BYTES: usize = 64 * 1024;

/// 未対応メッセージへの応答（SQLSTATE 0A000 + 分類ごとの固定英語メッセージ）と、
/// 有界な lingering close を行う（WIRE-8 の本体）。ReadyForQuery は送らない。
pub(crate) fn reject_and_close<S: WireStream>(
    stream: &mut S,
    kind: FrontendMessageKind,
    write_error_response: WriteErrorResponseFn<S>,
) -> io::Result<()>
~~~

## Notes

- 対応: TASK-71（WIRE-8）。SQLSTATE `0A000` の応答契約は `docs/spec/04-behavior/error-format.md`（private）を参照。
- `ExtendedQuery` / `UnsupportedFeature` / `Unknown` はいずれも SQLSTATE `0A000` に統一されるが、メッセージ文言は分類ごとに事実に即した表現へ分ける。
- `classify` は Bind/Execute/Sync/Close/Flush を `FrontendMessageKind::ExtendedQuery` に分類する。engine 接続時（engine と txn がともに `Some`）、`handshake::post_auth_loop` は Parse/Describe/Bind/Execute/Sync/Close/Flush を `extended_query::handle_parse` / `handle_describe` / `handle_bind` / `handle_execute` / `handle_sync` / `handle_close` / `handle_flush` へ委譲する。`reject_and_close`（`0A000` + 切断）に到達するのは `engine: None` の経路だけ。
- `Describe` / `ExtendedQuery` の doc コメント（portal は `0A000` + 切断、Bind/Execute/Sync/Close/Flush は WIRE-8 の主対象）は原文のまま残した古い記述。0.2.0 の `extended_query.rs` のモジュール doc は statement・portal 両対象の Describe を受理するとしている。
- バージョン差異: 0.1.0 では拡張クエリプロトコル全系列（Parse/Bind/Describe/Execute/Sync/Close/Flush）が未対応で、すべて拒否応答＋切断だった。`reject_and_close` も `TcpStream` 固定から `<S: WireStream>` ジェネリクスに変わった。
- モジュール自体は `pub mod protocol_dispatch`（`lib.rs` 参照）で crate 外にも公開されているが、内部の処理用アイテム（`FrontendMessageKind`・`classify`・`LINGER_DRAIN_TIMEOUT`・`LINGER_DRAIN_MAX_BYTES`・`reject_and_close`）はすべて `pub(crate)`（crate 外非公開）。

## Related

- [handshake.md](./handshake.md)
- [framing.md](./framing.md)
- [error-response.md](./error-response.md)
- [extended-query.md](./extended-query.md)
