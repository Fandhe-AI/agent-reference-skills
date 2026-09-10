---
source: https://docs.rs/crate/fandhe-vector-db-wire-server/0.1.0/source/src/handshake.rs
---

# handshake

PostgreSQL wire プロトコル v3 のハンドシェイク・簡易クエリ最小応答を担う。`main.rs` の接続受け付けループ（`TcpListener` + thread-per-connection）から 1 接続 1 スレッドで呼ばれる。認証の実照合は `auth::verify` に委譲し、本モジュールはメッセージのフレーミング（読み書き・長さ検証）と応答メッセージの組み立てに専念する。受信データ（SSLRequest/StartupMessage/PasswordMessage/簡易クエリ）はすべて untrusted 入力として扱う。

## Signature / Usage

~~~rust,ignore
/// StartupMessage が名乗るべきプロトコルバージョン（3.0 = major 3, minor 0）。
const PROTOCOL_VERSION_3_0: i32 = 0x0003_0000;

const SSL_REQUEST_CODE: i32 = 80_877_103;
const GSSENC_REQUEST_CODE: i32 = 80_877_104;
const CANCEL_REQUEST_CODE: i32 = 80_877_102;

/// 対応: TASK-69（WIRE-5）。旧 3 引数シグネチャ（`post_auth_idle_timeout` を
/// 直接受け取る形）は [`handle_connection`]（deprecated 互換ラッパー）として
/// 維持する。
///
/// `engine` が `None` の場合、簡易クエリには従来どおり `0A000`（未実装）を返す
/// （本関数の既存呼び出し元・既存テストの契約を変えない）。`Some` を渡す新規
/// エントリポイントは [`handle_connection_with_engine`]（TASK-73・WIRE-1）。
pub fn handle_connection_bounded(stream: TcpStream, store: &UserStore) -> io::Result<()>

/// engine（SQL 表層）を接続した簡易クエリ実行経路（TASK-73・WIRE-1）。
/// `server::accept_loop_with_engine` の接続受け付けスレッドから呼ばれる。
/// 認証・ハンドシェイクの契約は [`handle_connection_bounded`] と同一で、簡易
/// クエリ（'Q'）の実処理だけが `engine::core::EngineCore` へ委譲される点が異なる。
pub fn handle_connection_with_engine(
    stream: TcpStream,
    store: &UserStore,
    engine: &engine::core::EngineCore,
) -> io::Result<()>

/// ErrorResponse（'E'）。SQLSTATE と英語メッセージのみを含む最小フィールド構成
/// （severity 'S'・code 'C'・message 'M' のみ。他テナント・存在情報は含めない）。
/// `protocol_dispatch::reject_and_close` から呼ばれる `io::Result` 版のラッパー。
/// `HandshakeError`／`handshake::Result` は本モジュール限定の型のため、モジュール
/// 境界をまたいで直接公開せず、戻り値を `io::Result` へ写像したこの関数のみを
/// `pub(crate)` にする（`HandshakeError` 自体は private のまま維持する）。
pub(crate) fn write_error_response_io(
    stream: &mut TcpStream,
    class: ErrorClass,
    message: &str,
) -> io::Result<()>

/// `write_ready_for_query` の `io::Result` 版ラッパー。[`crate::simple_query`] は
/// 本モジュール限定の `handshake::Result` を扱えないため、`ReadyForQuery` を
/// 送出する唯一の経路としてこの関数を `pub(crate)` にする。
pub(crate) fn write_ready_for_query_io(stream: &mut TcpStream) -> io::Result<()>

/// 旧 `(stream, store, post_auth_idle_timeout)` 3 引数シグネチャとの後方互換
/// ラッパー（旧名・旧シグネチャをそのまま維持）。`post_auth_idle_timeout` は
/// WIRE-5 の単一タイムアウト契約により**無視**する。新規コードは
/// `handle_connection_bounded` を直接呼ぶこと。
#[deprecated(
    since = "0.1.0",
    note = "use handle_connection_bounded(stream, store) instead; post_auth_idle_timeout is ignored (WIRE-5 uses a single read_timeout for the whole connection)"
)]
pub fn handle_connection(
    stream: TcpStream,
    store: &UserStore,
    _post_auth_idle_timeout: Duration,
) -> io::Result<()>
~~~

## Notes

- `handle_connection_with_engine` が本線（engine 接続済み、簡易クエリを engine SQL 表層へ接続する TASK-73・WIRE-1 経路）。`handle_connection_bounded`（`engine: None` 固定の内部呼び出し）は engine 非接続の下位関数、`handle_connection` は deprecated。
- `PROTOCOL_VERSION_3_0` / `SSL_REQUEST_CODE` / `GSSENC_REQUEST_CODE` / `CANCEL_REQUEST_CODE` はいずれも非公開（`pub` なし）の内部定数。
- 対応: TASK-67（WIRE-1, WIRE-2, WIRE-3）、TASK-68（正式なフレーミング上限体系。WIRE-4, WIRE-10）。
- SSLRequest/GSSENCRequest/CancelRequest のコード定数を持つが、TLS 自体は 0.1.0 時点で未実装（[auth.md](./auth.md) の Notes 参照）。
- `handle_connection_inner`（`pub` ではない共通実装）が StartupMessage 交渉 → cleartext password 認証（`auth::verify`）→ AuthenticationOk・BackendKeyData・ParameterStatus・ReadyForQuery 送出 → 接続単位 `SessionState` の生成 → `post_auth_loop` という流れを担う。認証失敗時（`auth::verify` が `Err`）は固定メッセージ（`auth::AuthFailure::MESSAGE`）の `ErrorResponse` を送出したあと `Ok(())` を返して `handle_connection_inner` を抜ける。この関数はローカル変数として `TcpStream` を所有しており、`Ok(())` で関数を抜けるとその `stream` が drop されて接続が終了する（TCP 接続がクローズされる）。**認証失敗後の再試行には新しい接続が必要**であり、同一接続上での ReadyForQuery 経由の再認証はできない（原文の doc comment・コメントには本挙動を明示する記述が無いため、`Read` による実装確認に基づく記述）。

## Related

- [auth.md](./auth.md)
- [framing.md](./framing.md)
- [protocol-dispatch.md](./protocol-dispatch.md)
