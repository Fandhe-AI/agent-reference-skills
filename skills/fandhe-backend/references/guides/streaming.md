# レスポンスストリーミング

fandhe-backend は、レスポンス body を一括ではなく逐次送信する chunked ストリーミング送信を opt-in で提供する。SSE（`text/event-stream`）・大きなファイルの逐次生成・進捗つき長時間処理の応答などに使う。

## Signature / Usage

```rust,ignore
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

`Content-Type` が不要なら既定容量（8）の `StreamingResponse::new(status)` も使える。

## Options / Props

| API / 操作 | 説明 |
|------|-------------|
| `Handler::handle_streaming` | opt-in 既定メソッド。`Some(StreamingResponse)` を返すとコアの書き出しループが chunked framing で逐次送信する。既定実装は常に `None`（従来どおり一括応答、後方互換） |
| `StreamingResponse::channel(status, content_type, capacity)` | bounded mpsc チャネル容量 `capacity` を指定して構築する。満杯時の `send` は受信側が書き出して空きができるまで `.await` で待機（バックプレッシャ）。`capacity = 0` は `1` に切り上げ |
| `StreamingResponse::new(status)` | 既定容量（8）で構築する |
| `BodyWriter::send(data)` | 1 チャンク分を送る。空 `Vec` も成功するがワイヤへは無出力 |
| `BodyWriter::finish()` | 正常終端。終端チャンク（`0\r\n\r\n`）を送出し `self` を消費する（「`finish` 後の `send`」は型レベルで書けない） |

## Notes

- サーバ側バッファ上限は高々「`capacity` × 1 チャンク分」に有界。producer がソケットの処理速度を追い越して無制限にメモリを積み上げることはない（DoS 対策）
- `finish` を呼ばずに drop すると打ち切りとなり、受信側は終端チャンクを送出せず接続をクローズする（fail-closed の応答完全性維持。RFC 9112 の length 整合性）
- 戻り値 `Err(StreamClosed)` は受信側が既に終了（クライアント切断等）した後の送信を示し、producer は以降の送信を止めてタスクを終了してよい
- producer からの次チャンク待ちには書き込みタイムアウト（30 秒、固定値）が適用される。超過すると正常稼働中の producer でも接続が強制クローズされる。SSE のハートビート等は 30 秒未満の間隔で `writer.send(Vec::new())` を呼んで待ち時間をリセットできる（空チャンクはワイヤへ無出力）
- HTTP/1.1 は `Transfer-Encoding: chunked` framing、HTTP/1.0 は framing なしの生データを EOF（接続クローズ）で終端し常に `Connection: close`（コアが自動フォールバック、ハンドラ側の実装分けは不要）
- RFC 9112 §6.3 に従い、1xx・204・304 を `handle_streaming` から返した場合は body 送出ループへ入らずヘッド送出のみで完了する
- パスインターセプト型プラグイン（graphql / openapi / static 等）が処理を完結させなかった場合にのみ `handle_streaming` が確認され、`Some` ならそのリクエストに対して `handle` は呼ばれない
- レスポンス後処理型プラグイン（CORS ヘッダ付与・gzip 圧縮）はストリーミング応答には適用されない（`Response` 型前提のシームのため）。必要なヘッダはハンドラ・構成側で別途手当てする
- タイムアウト・書き込みエラー・producer 打ち切りの場合、`Middleware::on_response` は呼ばれない（「完走した応答のみ観測する」契約）
- チャンク待ち・実書き込みの双方に 30 秒のタイムアウトと接続生存期間上限（`Server::max_connection_lifetime`）の短い方が適用され、超過時は接続を強制クローズする

## Related

- [extension-points](./extension-points.md)
- [graceful-shutdown](./graceful-shutdown.md)
