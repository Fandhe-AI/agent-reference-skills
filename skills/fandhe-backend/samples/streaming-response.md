# streaming response

`Handler::handle_streaming` + `StreamingResponse` / `BodyWriter` で chunked ストリーミング応答を返す最小例。

```toml
[dependencies]
fandhe-backend-core = "0.4.0"
fandhe-backend-http = "0.4.0"
fandhe-backend-routes = "0.4.0"
tokio = { version = "1", features = ["rt-multi-thread", "macros"] }
```

```rust
use fandhe_backend_core::server::Handler;
use fandhe_backend_core::streaming::StreamingResponse;
use fandhe_backend_http::request::RequestHead;
use fandhe_backend_http::response::Response;

struct StreamingHandler;

impl Handler for StreamingHandler {
    fn handle(&self, _head: &RequestHead, _body: &[u8]) -> fandhe_backend_routes::HandlerFuture {
        Box::pin(async { Response::empty(404) })
    }

    fn handle_streaming(&self, _head: &RequestHead, _body: &[u8]) -> Option<StreamingResponse> {
        // status / Content-Type / チャネル容量（bounded mpsc）を指定して構築する
        let (response, writer) = StreamingResponse::channel(200, Some("text/plain"), 4);
        tokio::spawn(async move {
            writer.send(b"hello ".to_vec()).await.ok();
            writer.send(b"world".to_vec()).await.ok();
            writer.finish().await.ok();
        });
        Some(response)
    }
}
```

## Notes

- `handle_streaming` が `Some(StreamingResponse)` を返すとコアは chunked framing で逐次送信する。既存の `handle` のみ実装した型は本機能を意識せず従来どおり `Content-Length` 一括応答になる（後方互換）
- `send` は 1 チャンク分を送る。`finish()` は正常終端（`self` を消費するため「`finish` 後の `send`」は型レベルで書けない）。`finish` を呼ばずに drop すると打ち切りとなり終端チャンクを送らない（fail-closed）
- `StreamingResponse::channel` の `capacity` は bounded mpsc の容量。満杯時は `send` がバックプレッシャで待機し、サーバ側バッファは「`capacity` × 1 チャンク分」に有界（DoS 対策）
- 次チャンク待ちには 30 秒の書き込みタイムアウトが固定で適用される。SSE のハートビート等でイベントがまばらな場合は 30 秒未満の間隔で `writer.send(Vec::new())`（ワイヤへ無出力）を呼んでリセットする
- CORS ヘッダ付与・gzip 圧縮などのレスポンス後処理型プラグインはストリーミング応答には適用されない
