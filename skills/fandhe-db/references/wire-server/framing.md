---
source: https://docs.rs/crate/fandhe-vector-db-wire-server/0.1.0/source/src/framing.rs
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

pub fn read_startup_frame<R: Read>(reader: &mut R) -> Result<Vec<u8>, FrameError>

pub fn read_typed_frame_header<R: Read>(reader: &mut R) -> Result<Option<u8>, FrameError>
~~~

## Notes

- 対応: TASK-68（WIRE-4, WIRE-10）。エラーコード写像は `docs/spec/04-behavior/error-format.md`（private）ERR-2。
- `read_length_prefixed_body` は「検証を通過するまでアロケーションしない」契約（宣言長が `MAX_MESSAGE_LEN` 超過時は length の 4 バイトのみ消費して打ち切る）。
- `max_total` を `MAX_MESSAGE_LEN` 超で指定しても `MAX_MESSAGE_LEN` に丸められる（呼び出し側誤用で全体上限が緩まない fail-closed）。

## Related

- [handshake.md](./handshake.md)
- [protocol-dispatch.md](./protocol-dispatch.md)
