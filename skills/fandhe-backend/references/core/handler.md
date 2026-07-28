# Handler

リクエストに対する最終応答を生成する、コアが公開する既定ハンドラ拡張点。3 拡張点（`Middleware` / `UpgradeHandler` / `RequestGate`）とは別枠で、ルーティング結果を最終応答へ変換する差し込み口。

## Signature / Usage

```rust
use fandhe_backend_core::server::Handler;
use fandhe_backend_http::request::RequestHead;

pub trait Handler: Send + Sync {
    fn handle(&self, head: &RequestHead, body: &[u8]) -> fandhe_backend_routes::HandlerFuture;

    fn handle_streaming(
        &self,
        _head: &RequestHead,
        _body: &[u8],
    ) -> Option<fandhe_backend_core::streaming::StreamingResponse> {
        None
    }
}
```

`fandhe_backend_routes::Router` は `impl Handler for Router` により `Server::handler(router)` へそのまま登録できる（`Router::dispatch` への薄いアダプタ）。

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `handle(head, body)` | `-> fandhe_backend_routes::HandlerFuture` | リクエストヘッドと body からレスポンスを組み立てる future を返す（必須実装） |
| `handle_streaming(head, body)` | `-> Option<StreamingResponse>` | chunked ストリーミング送信の opt-in 拡張点。既定実装は常に `None` |

## Notes

- `handle` はイシュー #315 で async 契約へ移行済み。3 拡張点は意図的に同期のまま据え置かれた非対称設計
- `handle_streaming` で `Some` を返すと、書き出しループは `Content-Length` 一括応答の代わりに chunked framing で逐次送信する
- `handle_streaming` の producer からの次チャンク待ちには `DEFAULT_WRITE_TIMEOUT`（30秒）が適用される。SSE のハートビート等アイドル区間が長い実装は `BodyWriter::send(Vec::new())`（空チャンクは無出力）を間隔内に呼んでリセットする
- ハンドラ内 panic は接続単位で spawn されたタスク内に閉じ込められ、他コネクションの処理を妨げない

## Related

- [Server](./server.md)
- [StreamingResponse / BodyWriter](./streaming-response.md)
- [Handler Types (HandlerFuture)](../routes/handler-types.md)
