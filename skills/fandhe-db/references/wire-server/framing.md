---
source: https://docs.rs/crate/fandhe-db-wire-server/0.2.0/source/src/framing.rs
---

# framing

wire プロトコル入力のフレーミング検証（長さ上限・最小長・途中切断の分類）を 1 箇所へ集約するモジュール。`handshake.rs` の接続ハンドラから呼ばれ、untrusted なネットワークバイト列の「読み取り・検証・エラー分類」にのみ責務を限定する（応答メッセージの組み立ては `handshake.rs` が担う）。読み取り API は `Read` トレイトへジェネリックにし、`TcpStream` だけでなく `std::io::Cursor` でも動く（ソケットなしの単体テストのため）。

## Signature / Usage

~~~rust,ignore
/// 1 メッセージあたりの長さフィールド（自身の 4 バイトを含む）の上限（WIRE-4）。
pub const MAX_MESSAGE_LEN: usize = 1024 * 1024;

/// 認証前の最初のパケット（SSLRequest/GSSENCRequest/StartupMessage）に許す上限。
pub const MAX_STARTUP_LEN: usize = 32 * 1024;

/// StartupMessage の最小長（length 4 バイト + protocol/code 4 バイト）。
pub const MIN_STARTUP_LEN: usize = 8;

/// 型付きメッセージ（type byte の後）の最小長（length 4 バイトのみ）。
pub const MIN_TYPED_MESSAGE_LEN: usize = 4;

/// SQLSTATE `54000`（program_limit_exceeded）。WIRE-4。
pub const SQLSTATE_PROGRAM_LIMIT_EXCEEDED: &str =
    engine::error_format::ErrorClass::PayloadTooLarge.wire_code();

/// SQLSTATE `08P01`（protocol_violation）。WIRE-10。
pub const SQLSTATE_PROTOCOL_VIOLATION: &str =
    engine::error_format::ErrorClass::ProtocolViolation.wire_code();

#[derive(Debug)]
pub enum FrameError {
    /// WIRE-4: 宣言長が `MAX_MESSAGE_LEN` を超過。本文は未読・未確保。
    TooLarge { declared: usize, max: usize },
    /// WIRE-10: 負の長さ・最小値未満・StartupMessage 上限超過・型固有の形状違反等。
    Malformed(&'static str),
    /// WIRE-10: 宣言長より実際の送信が短く `read_exact` が `UnexpectedEof` を返した。
    Truncated,
    /// タイムアウト等、上記以外の I/O 異常。
    Io(io::Error),
}

impl FrameError {
    /// クライアントへ返す SQLSTATE。`None` は応答なしで切断する種別。
    pub fn sqlstate(&self) -> Option<&'static str>
    pub fn error_class(&self) -> Option<engine::error_format::ErrorClass>
    /// クライアントへ返す固定の英語メッセージ（内部理由・違反詳細は含めない）。
    pub fn client_message(&self) -> &'static str
}

impl From<io::Error> for FrameError { fn from(e: io::Error) -> Self }
impl std::fmt::Display for FrameError { fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result }

pub fn read_length_prefixed_body<R: Read>(
    reader: &mut R,
    min_total: usize,
    max_total: usize,
) -> Result<Vec<u8>, FrameError>

pub fn validate_typed_message_length_prefix<R: Read>(
    reader: &mut R,
    min_total: usize,
    max_total: usize,
) -> Result<usize, FrameError>

/// 指定バイト数だけ読み捨てる（アロケーションせず `io::copy` で `io::sink()` へ流す）。
/// 拡張クエリプロトコルのエラー後の同期回復（Issue #934・WIRE-11。`handshake::post_auth_loop`
/// の `ignore_till_sync` モード）が、後続メッセージの本文を解釈せず読み飛ばすために使う。
/// `len` は呼び出し元が `MAX_MESSAGE_LEN` 以内と確認済みの値であること（本関数自身は上限を
/// 検証しない）。実コピー長が `len` と一致しなければ `FrameError::Truncated` へ fail-closed に写像する。
pub fn discard_body<R: Read>(reader: &mut R, len: usize) -> Result<(), FrameError>

/// フレーム（長さフィールド・本文）の受信全体に期限を課すガード（SQL-31・TASK-221。PR #1041 レビュー指摘）。
/// `handshake::post_auth_loop` が、明示トランザクションが `Active`（単一ライタを保持中）の間だけ、型バイトを
/// 受信した直後に「持続時間上限（と接続の読み取りタイムアウト）」までの期限で設定する。期限が設定されている間、
/// 本モジュールの長さ・本文の読み取りは期限を過ぎた時点で `TimedOut` の I/O エラーを返す（呼び出し元は応答を送らずに
/// 接続を閉じ、`SessionTransaction` の drop でライタを解放する）。本文を少しずつ送り続けて期限後もライタを保持させる経路を
/// 塞ぐためのもの。wire-server は 1 接続 1 スレッドのため、スレッドローカルで接続単位の期限になる。drop で直前の値へ戻す。
/// `pub(crate)`（0.2.0 で追加）。
pub(crate) struct FrameDeadlineGuard { /* previous: Option<Instant> */ }

impl FrameDeadlineGuard {
    pub(crate) fn set(deadline: Instant) -> Self
}

pub fn read_startup_frame<R: Read>(reader: &mut R) -> Result<Vec<u8>, FrameError>

pub fn read_typed_frame_header<R: Read>(reader: &mut R) -> Result<Option<u8>, FrameError>
~~~

## Notes

- 対応: TASK-68（WIRE-4, WIRE-10）。エラーコード写像は `docs/spec/04-behavior/error-format.md`（private）ERR-2。
- `read_length_prefixed_body` は「検証を通過するまでアロケーションしない」契約（宣言長が `MAX_MESSAGE_LEN` 超過時は length の 4 バイトのみ消費して打ち切る）。
- Migration (0.1.0 → 0.2.0): 新規 pub `discard_body`。フレーム受信期限（`FRAME_DEADLINE`。`read_exact_within_deadline` 経由。非公開）が設定されている間は、`discard_body` は期限を確認しながら固定長のスタックバッファ（8192 バイト）で読み捨てる。`FrameError` の variant・既存関数のシグネチャは不変（`SQLSTATE_*` 定数・長さ定数の値も同一）。
- `max_total` を `MAX_MESSAGE_LEN` 超で指定しても `MAX_MESSAGE_LEN` に丸められる（呼び出し側誤用で全体上限が緩まない fail-closed）。

## Related

- [handshake.md](./handshake.md)
- [protocol-dispatch.md](./protocol-dispatch.md)
