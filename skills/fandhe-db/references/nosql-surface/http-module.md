---
source: https://docs.rs/crate/fandhe-db-wire-server/0.2.0/source/src/http/mod.rs
---

# http (HTTP/1.1 NoSQL 表層の実装モジュール)

NoSQL 表層（`--surface nosql`）が唯一の転送路として使う、自作 HTTP/1.1 最小サブセットのモジュール群（crate `fandhe-db-wire-server` 0.2.0 の `src/http/`）。`AGENTS.md` P1 の「Web API はスコープ外」が指す汎用 Web API フレームワークとは別物で、spec で規範化された内部転送プロトコル（HTTP-1〜13）の実装。pg wire v3 互換実装（`framing` 等）と並ぶもう一方の表層の接続処理層。エラー契約は SQL 表層（`wire_code` ＝ `engine::error_format::ErrorClass`）と完全共有し、新規 `wire_code` は追加しない。

## Signature / Usage

`http/mod.rs` の宣言（原文）:

```rust
pub mod body;
pub(crate) mod conn;
pub mod date;
pub(crate) mod deadline_stream;
pub mod error_body;
pub mod headers;
pub mod listener;
pub mod query;
pub mod request;
pub mod response;
pub mod router;
pub mod session;
pub mod status;
pub(crate) mod tls_transport;
```

production 入口の公開 API（`src/http/router.rs`・`listener.rs`）:

```rust
impl Router {
    pub fn new(users: Arc<UserStore>, sessions: SessionStore) -> Router;
    pub fn with_engine(users: Arc<UserStore>, sessions: SessionStore, engine: Arc<EngineCore>) -> Router;
}

pub fn accept_loop_with_router(
    listener: TcpListener, limiter: ConnectionLimiter, read_timeout: Duration, router: Router,
);
pub fn accept_loop_with_router_tls(
    listener: TcpListener, limiter: ConnectionLimiter, read_timeout: Duration, router: Router,
    tls_config: Arc<TlsServerConfig>, mode: TlsMode,
);
```

## Options / Props

モジュール構成（`mod.rs` の module doc に基づく）:

| モジュール | 公開範囲 | 役割 |
|-----------|----------|------|
| `request` | pub | 要求行（メソッド・ターゲット・バージョン）の解析。`MAX_REQUEST_LINE_LEN`＝4 KiB、`Method`／`Version`／`RequestLine`／`parse_request_line`／`find_crlf_within`（HTTP-2, HTTP-11） |
| `headers` | pub | ヘッダ部の解析。`MAX_HEADER_SECTION_LEN`＝8 KiB・`MAX_HEADER_COUNT`＝32、`Content-Length` 必須・一意・digits-only、`Transfer-Encoding` 拒否。`Headers`／`HeaderParse`／`parse_headers` |
| `body` | pub | 本文を読む前の `Content-Type`（`application/json`・`charset=utf-8` のみ）検証と本文長上限 `MAX_BODY_LEN`＝1 MiB 判定（`08P01`／`54000`）、読み取り後の UTF-8 昇格（`42601`）。`plan_body`／`body_as_utf8` |
| `status` | pub | `ErrorClass` → HTTP ステータスの決定的射影（`http_status`。ERR-4） |
| `error_body` | pub | `ErrorClass` → JSON エラー本文。`encode`／`encode_may_be_committed`／`encode_partitioned(class, message, committed, operation_id)`／定数 `MAY_BE_COMMITTED_STATE`（ERR-4・ERR-5） |
| `response` | pub | ステータスコード＋JSON 本文 → HTTP/1.1 応答バイト列。`encode`／`encode_ok`／`encode_error`／`encode_error_may_be_committed`／`encode_error_partitioned`／`reason_phrase`／定数 `CONTENT_TYPE_JSON_UTF8` |
| `date` | pub | IMF-fixdate 整形（`format_http_date`） |
| `conn` | pub(crate) | 接続 1 本ぶんの受理後処理。要求行→ヘッダ→本文の読み取りとパース → `RequestHandler` へのルーティング（`handle_connection_with`）。不正フレーム時も応答を書いてから有界に読み捨ててクローズし（PoC-15）、panic は `catch_unwind` で多層防御する（HTTP-12）。同時接続数超過時に 503／`53300` を返す `reject_too_many_connections` も担う |
| `listener` | pub | accept ループ本体（`accept_loop_with_router`／`accept_loop_with_router_tls`）。読み取り 30 秒タイムアウト・同時接続数 64 の共有リミッターを SQL wire と同一契約で適用する。`accept_loop_with_limiter`（`PlaceholderRouter` 固定）は後方互換 API として残置、`accept_loop_stub` は `#[deprecated(since = "0.1.0")]` |
| `router` | pub | production 入口のルータ `Router`。`/v1/session` → `session::issue::handle`、`/v1/session/close` → `session::close::handle`、`/v1/query` → `session::middleware::authenticate` 経由で `query::gate::handle` へディスパッチ。それ以外（クエリ文字列付き・末尾スラッシュ違い等）は `08P01` で拒否 |
| `session` | pub | セッション認証の構成要素: `token`（`TOKEN_BYTES`＝32・`TOKEN_ENCODED_LEN`＝43・`SessionToken`）、`store`（`SessionStore`・`SessionGrant`・`IssueError`）、`issue`（`POST /v1/session`）、`bearer`（`extract_bearer_token`）、`close`（`POST /v1/session/close`）、`middleware`（`authenticate`・`SessionPrincipal`・`reject_tenant_headers`） |
| `query` | pub | `POST /v1/query` の op 別写像: `op`（`Op` 11 variant・`Op::ALL`・`Op::parse`・`UNSUPPORTED_OP_MESSAGE`＝`"unsupported op"`）、`schema`（JSON クエリオブジェクトの意味的検証）、`filter`、`response`（`encode`／`encode_explain`）、`search`／`scan`／`aggregate`／`insert`／`update`／`delete`／`ddl`／`partitioned`／`explain`、`gate`（`handle(principal, headers, raw_body, engine, now_wall)`）、`typed_json`／`base64_std`／`ident`／`dml_target` |
| `tls_transport` | pub(crate) | `--surface nosql` と TLS opt-in の組み合わせ時の接続 1 本の TLS 終端（先頭バイトで TLS／平文を判定 → ハンドシェイク → `conn::handle_connection_with` へ委譲。Issue #968。WIRE-9・HTTP-9・HTTP-10） |
| `deadline_stream` | pub(crate) | 内部用（原文 module doc に説明なし） |

`session::middleware::authenticate` / `session::issue::handle` のシグネチャ（原文）:

```rust
pub fn authenticate(
    sessions: &SessionStore,
    headers: &Headers<'_>,
    now_mono: impl Fn() -> Instant,
) -> Result<SessionPrincipal, MiddlewareError>;

pub fn handle(
    users: &UserStore,
    sessions: &SessionStore,
    body: &[u8],
    now_mono: impl Fn() -> Instant,
    now_wall: SystemTime,
) -> Vec<u8>; // session::issue::handle
```

## Notes

- 本ページは crate ソースのモジュール粒度の要約。`pub(crate)` のモジュール（`conn`／`deadline_stream`／`tls_transport`）は crate 外から使えない。個別アイテムの網羅は意図しない（内部 crate の直接利用は公式にも非サポート）。
- `mod.rs` の module doc は、op 語彙を「6 値」・`filter` の `op` を「`eq`／`prefix`」・`update`／`delete` の `filter` 形を「実行結線待ち」と記述する箇所があるが、これは古い記述で、実際の仕様は 11 値・14 語彙・述語形結線済み（`op.rs` の `Op::ALL: [Op; 11]` および docs/nosql-api.md に基づく）。
- 要求受理規則・応答ヘッダ・エンドポイントの仕様は [overview.md](./overview.md)、セッションは [session.md](./session.md)、エラー射影は [error-response.md](./error-response.md) を参照。
- crates.io の crate 名は 0.2.0 で `fandhe-vector-db-wire-server` から `fandhe-db-wire-server` へ改名（lib 名 `wire_server` は不変）。

## Related

- [overview.md](./overview.md)
- [session.md](./session.md)
- [query-common.md](./query-common.md)
- [error-response.md](./error-response.md)
- [../wire-server/lib.md](../wire-server/lib.md)
- [../wire-server/server.md](../wire-server/server.md)
- [../getting-started/migration-0-2.md](../getting-started/migration-0-2.md)
