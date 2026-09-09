---
source: https://docs.rs/crate/fandhe-vector-db-wire-server/0.1.0/source/src/protocol_dispatch.rs
---

# protocol_dispatch

認証後に届くフロントエンドメッセージの型バイト分類と、拡張クエリプロトコル系メッセージ（未対応）に対する fail-closed な拒否応答＋切断を担う（TASK-71・WIRE-8）。`handshake::post_auth_loop` から呼ばれる。フレーミング（長さ検証）は `handshake` モジュール、接続数・タイムアウトは `server` モジュールの管轄のままで、本モジュールはどちらにも触れない。

## Signature / Usage

~~~rust,ignore
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) enum FrontendMessageKind {
    /// 簡易クエリ（'Q'）。実処理は `handshake::post_auth_loop` の既存分岐に委ねる。
    SimpleQuery,
    /// Terminate（'X'）。実処理は `handshake::post_auth_loop` の既存分岐に委ねる。
    Terminate,
    /// 拡張クエリプロトコル系（Parse/Bind/Describe/Execute/Sync/Close/Flush）。WIRE-8 の主対象。
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
pub(crate) fn reject_and_close(
    stream: &mut TcpStream,
    kind: FrontendMessageKind,
    write_error_response: WriteErrorResponseFn,
) -> io::Result<()>
~~~

## Notes

- 対応: TASK-71（WIRE-8）。SQLSTATE `0A000` の応答契約は `docs/spec/04-behavior/error-format.md`（private）を参照。
- `ExtendedQuery` / `UnsupportedFeature` / `Unknown` はいずれも SQLSTATE `0A000` に統一されるが、メッセージ文言は分類ごとに事実に即した表現へ分ける。
- 拡張クエリプロトコル（Parse/Bind/Describe/Execute/Sync/Close/Flush）は 0.1.0 時点で未対応。すべて拒否応答＋切断となる。
- モジュール全体が `pub(crate)`（crate 外非公開）。

## Related

- [handshake.md](./handshake.md)
- [framing.md](./framing.md)
- [error-response.md](./error-response.md)
