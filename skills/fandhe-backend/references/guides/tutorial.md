# チュートリアル

最小サーバから始め、拡張点（`Middleware`）の実装、feature 有効化までを段階的に学ぶ手順。

## Signature / Usage

```rust,ignore
use fandhe_backend_core::Middleware;
use fandhe_backend_http::request::RequestHead;
use std::sync::atomic::{AtomicUsize, Ordering};
use std::time::Duration;

struct CountingMiddleware {
    requests: AtomicUsize,
}

impl Middleware for CountingMiddleware {
    fn name(&self) -> &'static str {
        "counting-middleware"
    }

    fn on_request(&self, _head: &RequestHead) {
        self.requests.fetch_add(1, Ordering::Relaxed);
    }

    fn on_response(&self, _head: &RequestHead, _elapsed: Duration) {}
}

let server = Server::new()
    .handler(router)
    .middleware(CountingMiddleware { requests: AtomicUsize::new(0) });
```

## 手順

1. **最小サーバ**: `../getting-started/minimal-server.md` の手順で `examples/minimal.rs` を動かし、`Server` + `Router` の基本構成を確認する。`cargo test --doc -p fandhe-backend-core` でクレート doc のクイックスタートも検証できる
2. **拡張点を実装する（`Middleware`）**: コアが公開する 4 種の拡張点（`Middleware` / `UpgradeHandler` / `RequestGate` / `Interceptor`）のうち、最も単純な `Middleware`（リクエスト数を数えるだけの実装）で実装パターンを確認する。`Server::middleware` へ登録するとコアのリクエストループから `on_request` / `on_response` が呼ばれる
3. **feature を有効化する（websocket エコー）**: `UpgradeHandler` 拡張点を通じて WebSocket ハンドシェイクへ委譲する実装は `fandhe-backend-plugin-websocket` が提供する

```bash
cargo run --release --example ws_echo -p fandhe-backend-core --features websocket
curl -v http://127.0.0.1:3007/health   # 200 応答
```

feature を無効化してビルドし直すと（`cargo build -p fandhe-backend-core`）、`fandhe-backend-plugin-websocket` への依存が `cargo tree` から消えることを確認できる（pay-for-what-you-use）。

```bash
cargo tree -p fandhe-backend-core            # websocket 依存が出ない
cargo tree -p fandhe-backend-core --features websocket  # websocket 依存が出る
```

## Notes

- `Middleware` 実装は同期ブロッキング I/O を行ってはならない。非同期チャネルへの送信・別タスクでの I/O 実行に留める。実際のプロダクション実装は `crates/plugin-tracing` の `TracingMiddleware`（非同期・バッファ済み I/O）を参照する
- `Middleware` trait の完全な実装例は `crates/core/src/extension.rs` の doc comment（doc test として `cargo test` で検証）が正である
- 他 feature（graphql / webrtc 系 / tracing / openapi / hub-wiring）の最小サンプルは `feature-samples.md` を参照する

## Related

- [feature-samples](./feature-samples.md)
- [extension-points](./extension-points.md)
