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
    fn on_response(&self, head: &RequestHead, elapsed: Duration) {}
    fn on_response_with_status(&self, head: &RequestHead, status: u16, elapsed: Duration) {}
}
```

`on_response` と `on_response_with_status` は既定実装付き（上記の `{}` は既定実装の省略表記。実際の既定: `on_response` は no-op、`on_response_with_status` は `status` を無視して `on_response` へ委譲）。ステータス付きアクセスログが必要な場合は `on_response_with_status` を override する:

```rust
impl Middleware for StatusLoggingMiddleware {
    fn name(&self) -> &'static str {
        "status-logging-middleware"
    }
    fn on_request(&self, _head: &RequestHead) {}
    fn on_response_with_status(&self, _head: &RequestHead, status: u16, _elapsed: Duration) {
        self.statuses.lock().unwrap().push(status);
    }
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
| `on_response(&self, head, elapsed)` | `&RequestHead, Duration` | レスポンス送出後に呼ばれる観測フック。`elapsed` はリクエスト受理からレスポンス送出までの経過時間。既定実装は no-op（v0.4.2 で必須メソッドから既定実装付きに変更） |
| `on_response_with_status(&self, head, status, elapsed)` | `&RequestHead, u16, Duration` | v0.4.2 で追加（issue #721）。`status` はクライアントへ実際に送出したステータスコード（`Interceptor::map_response` 等のレスポンス改変シーム適用後の最終値）。既定実装は `status` を無視して `on_response` へ委譲 |

## Notes

- 同期 API（dyn 互換性のため）だが、実装内で同期ブロッキング I/O を行ってはならない（PoC-3 実測でスループット最大 25% 劣化）。ロギング等で I/O が必要な実装は非同期チャネルへの送信に留め、実際の I/O は別タスクで行う
- 実装は `head` の内容を変更してはならない契約（型で強制されないため実装者が守る規約）
- `Server::middleware(m)` で登録すると登録順に `on_request`/`on_response_with_status` が呼ばれる
- コアが呼び出すのは新フック `on_response_with_status` のみ。`on_response` だけを実装した既存コードは、既定実装の委譲によりこれまでどおり呼ばれる（非破壊）。両方を override した場合、`on_response` はコアから呼ばれなくなる
- `on_response_with_status` が呼ばれるのは `on_response` と同じく応答が完走した場合のみ。Upgrade 委譲・委譲失敗時の 501・write 失敗・ストリーミング打ち切り/タイムアウト・パースエラー応答では呼ばれない

## Related

- [Server](./server.md)
- [RequestGate](./request-gate.md)
- [UpgradeHandler](./upgrade-handler.md)
