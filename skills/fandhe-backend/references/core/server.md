# Server

4 拡張点（`Middleware` / `RequestGate` / `UpgradeHandler` / `Interceptor`）・既定 `Handler` を登録するビルダー。`bind` するまでは可変（`self` 消費チェーン）で、`bind` 後は `Arc<Server>` として複数コネクションタスクから共有参照される。

## Signature / Usage

```rust
use fandhe_backend_core::Server;
use fandhe_backend_http::response::Response;
use fandhe_backend_routes::Router;

let router = Router::new().route("GET", "/", |_head, _body| {
    Response::new(200, b"hello\n".to_vec())
});

let server = Server::new().handler(router);
let bound = server.bind("127.0.0.1:3000").await?;
bound.run().await
```

## Options / Props

`Server` のビルダーメソッド（すべて `self` を消費して返す）:

| Name | Type | Description |
|------|------|-------------|
| `new()` | `-> Self` | 拡張点・ハンドラを 1 件も持たない空の `Server` を作る |
| `middleware(m)` | `impl Middleware + 'static` | `Middleware` を登録（登録順に `on_request`/`on_response` 呼び出し） |
| `gate(g)` | `impl RequestGate + 'static` | `RequestGate` を登録（登録順評価、最初の `Reject` を優先） |
| `upgrade_handler(h)` | `impl UpgradeHandler + 'static` | `UpgradeHandler` を登録（登録順に `matches` 評価） |
| `interceptor(i)` | `impl Interceptor + 'static`（v0.2.0 で追加） | `Interceptor` を登録（登録順に `intercept`/`map_response` 評価） |
| `handler(h)` | `impl Handler + 'static` | 既定ハンドラを登録（未登録時は 404） |
| `max_connections(n)` | `usize`（既定 10,000） | 同時接続数上限。`0` は `bind` 側で `1` に切り上げ |
| `max_connection_lifetime(d)` | `Duration`（既定 300s） | 1 接続あたりの総生存期間上限 |
| `max_requests_per_connection(n)` | `usize`（既定 1,000） | keep-alive 接続 1 本あたりの最大リクエスト数 |
| `max_body_bytes(n)` | `usize`（既定 1 MiB） | 許容する body の最大バイト数。超過は 413 |
| `read_timeout(d)` | `Duration`（既定 30s） | 1 回の read 待ちタイムアウト |
| `keep_alive(bool)` | `bool`（既定 `true`） | keep-alive の有効/無効 |
| `shutdown_grace_period(d)` | `Duration`（既定 30s） | graceful shutdown の in-flight 完了待ち上限 |
| `diagnostics(sink)` | `impl Diagnostics`（v0.4.2 で追加、既定 `StderrDiagnostics`） | ライブラリ内部の実行時診断（accept 失敗・TCP_NODELAY 設定失敗・graceful shutdown / rebind の grace 超過強制クローズ）の送信先を差し替える。複数回呼ぶと最後の登録が有効（単一シンクのみ保持） |
| `bind(addr)` | `async fn(impl ToSocketAddrs) -> io::Result<BoundServer>` | TCP リスナーをバインドし `BoundServer` を返す |

feature 限定の登録メソッド（`webrtc-proxy` / `webrtc` / `websocket` / `graphql` / `openapi` / `openapi_with` / `cors` / `compression` / `static_files` / `tracing`）は各プラグインスキルの責務であり、`crates/plugin-*` 側に定義がある。

## Notes

- クレート直下の公開 API は `handle_connection` / `handle_connection_with_peer_addr` / `version()` の3つ。`version() -> &'static str`（`CARGO_PKG_VERSION` を返す）はビルド疎通確認用の最小 API で `Server` の挙動には関与しない。`handle_connection_with_peer_addr(server, stream, peer_addr)`（v0.3.0 で追加、issue #486）はカスタム accept ループから実 peer address を注入する経路で、`handle_connection` は peer address を省略する薄いラッパー
- `Handler` は非対称設計: 4 拡張点は同期のままだが `Handler::handle` はイシュー #315 で async 化されている
- `fandhe_backend_routes::Router` は `impl Handler for Router` により `.handler(router)` へそのまま登録できる（`Router::dispatch` への薄いアダプタ）
- `diagnostics(sink)`（v0.4.2、issue #720）: 未登録時は `StderrDiagnostics` が使われ、従来の `eprintln!` 出力と文言・接頭辞・出力先（stderr）が完全互換。`sink` の `report` は accept ループ・rebind の背景 drain タスク上で同期的に呼ばれるためブロッキング I/O を行ってはならない。クロージャを直接渡せる blanket impl があり、引数の型注釈は必須（`|_| {}` のみでは型推論に失敗する）: `Server::new().diagnostics(|_event: &DiagnosticEvent<'_>| {})`。`Diagnostics` / `DiagnosticEvent`（`#[non_exhaustive]`）/ `StderrDiagnostics` の詳細は [Diagnostics](./diagnostics.md)
- 挙動変更（v0.4.2）: 最終 graceful shutdown・rebind 旧世代 drain の grace 超過強制クローズでは、診断シンクへの通知を強制クローズの完了後に行う（利用側シンクの異常・遅延がフェイルクローズを妨げないため）
- `bind` は `addr` に TCP リスナーを張り `BoundServer` を返す。実際の accept ループは `BoundServer::run` / `run_until` が担う

## Related

- [BoundServer](./bound-server.md)
- [Diagnostics](./diagnostics.md)
- [Handler](./handler.md)
- [Middleware](./middleware.md)
- [RequestGate](./request-gate.md)
- [UpgradeHandler](./upgrade-handler.md)
- [Interceptor](./interceptor.md)
