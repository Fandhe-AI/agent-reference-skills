---
source: https://docs.rs/crate/fandhe-vector-db-wire-server/0.1.0/source/src/server.rs
---

# server

接続受け付けループ本体。1 接続 1 スレッドで処理し、同時接続数の有界化・I/O タイムアウトの適用を担う（契約値・実装は [limits.md](./limits.md) に集約）。ADR `wire-connection-model` は「1 接続 1 スレッド + `MAX_CONNECTIONS`（64）の上限」を Accepted としている（固定スレッドプール・async I/O は不採用）。

## Signature / Usage

~~~rust,ignore
/// 接続受け付けループ本体。1 接続 1 スレッドで処理するが、以下の防御を課す
/// （WIRE-5, WIRE-6。契約値・実装は [`crate::limits`] に集約）
pub fn accept_loop_with_limiter(
    listener: TcpListener,
    store: Arc<UserStore>,
    limiter: ConnectionLimiter,
    read_timeout: Duration,
)

/// engine（SQL 表層）を接続した接続受け付けループ（TASK-73・WIRE-1）。
pub fn accept_loop_with_engine(
    listener: TcpListener,
    store: Arc<UserStore>,
    engine: Arc<EngineCore>,
    limiter: ConnectionLimiter,
    read_timeout: Duration,
)
~~~

## Options / Props

| Item | Kind | Description |
|------|------|-------------|
| `bind_loopback` | fn (deprecated) | 旧 TASK-67 review 是正時点の後方互換ラッパー。`crate::bind_guard::GuardedBindAddrs::resolve(..., TransportSecurity::Cleartext)` を使うこと |
| `MAX_CONCURRENT_CONNECTIONS` | const usize (deprecated) | 旧・同時接続数上限。`crate::limits::MAX_CONNECTIONS` に統合済み |
| `CONNECTION_IO_TIMEOUT` | const Duration (deprecated) | 旧・認証前フェーズの I/O 期限。`crate::limits::READ_TIMEOUT` に統合済み |
| `POST_AUTH_IDLE_TIMEOUT` | const Duration (deprecated) | 旧・認証後アイドル期限。WIRE-5 で単一 `read_timeout` 契約に統一され未使用 |
| `accept_loop` | fn (deprecated) | 旧 5 引数シグネチャとの後方互換ラッパー。`accept_loop_with_limiter` を使うこと |

## Notes

- `accept_loop_with_engine` が engine（SQL 表層）を接続した本線の受け付けループ（TASK-73・WIRE-1）。`accept_loop_with_limiter` は engine 非接続の下位関数。
- 上記の `deprecated` 属性が付いた項目はすべて 0.1.0 時点で後方互換のためだけに残されており、新規利用は非推奨。
- This is a PostgreSQL wire protocol v3 connection-accept loop — distinct from `fandhe-backend`（同 org の Rust HTTP サーバーフレームワーク）や `fastify` / `hono` / `go-echo`（HTTP サーバーフレームワーク）。ここでの接続ループは HTTP ではなく Postgres wire protocol 用。

## Related

- [limits.md](./limits.md)
- [handshake.md](./handshake.md)
- [bind-guard.md](./bind-guard.md)
