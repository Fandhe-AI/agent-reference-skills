# Middleware

リクエスト/レスポンスを**観測するだけ**のフック。ロギング・メトリクス計測等の横断的関心事向けの拡張点。4 種の拡張点のうち唯一「観測専用」に限定される（`Interceptor` はレスポンスを書き換えられる点で異なる）。

## Signature / Usage

```rust
use fandhe_backend_core::extension::Middleware;
use fandhe_backend_http::request::RequestHead;
use std::time::Duration;

pub trait Middleware: Send + Sync {
    fn name(&self) -> &'static str;
    fn on_request(&self, head: &RequestHead);
    fn on_response(&self, head: &RequestHead, elapsed: Duration);
}
```

```rust
struct CountingMiddleware {
    requests: std::sync::atomic::AtomicUsize,
}

impl Middleware for CountingMiddleware {
    fn name(&self) -> &'static str {
        "counting-middleware"
    }
    fn on_request(&self, _head: &RequestHead) {
        self.requests.fetch_add(1, std::sync::atomic::Ordering::Relaxed);
    }
    fn on_response(&self, _head: &RequestHead, _elapsed: Duration) {}
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `name(&self)` | `-> &'static str` | 診断・ログ表示用の静的識別名。リクエスト内容（トークン・PII）を含めてはならない |
| `on_request(&self, head)` | `&RequestHead` | リクエストヘッド受理後、ルーティング前に呼ばれる観測フック |
| `on_response(&self, head, elapsed)` | `&RequestHead, Duration` | レスポンス送出後に呼ばれる観測フック。`elapsed` はリクエスト受理からレスポンス送出までの経過時間 |

## Notes

- 同期 API（dyn 互換性のため）だが、実装内で同期ブロッキング I/O を行ってはならない（PoC-3 実測でスループット最大 25% 劣化）。ロギング等で I/O が必要な実装は非同期チャネルへの送信に留め、実際の I/O は別タスクで行う
- 実装は `head` の内容を変更してはならない契約（型で強制されないため実装者が守る規約）
- `Server::middleware(m)` で登録すると登録順に `on_request`/`on_response` が呼ばれる

## Related

- [Server](./server.md)
- [RequestGate](./request-gate.md)
- [UpgradeHandler](./upgrade-handler.md)
