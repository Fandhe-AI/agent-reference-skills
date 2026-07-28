# StreamingResponse / BodyWriter

レスポンス側 chunked ストリーミング送信の opt-in API。`Handler::handle_streaming` が返す `StreamingResponse` と、その producer 側ハンドル `BodyWriter` のペア。

## Signature / Usage

```rust
use fandhe_backend_core::streaming::StreamingResponse;

let (response, writer) = StreamingResponse::channel(200, Some("text/plain"), 4);

tokio::spawn(async move {
    writer.send(b"hello ".to_vec()).await.ok();
    writer.send(b"world".to_vec()).await.ok();
    writer.finish().await.ok();
});
```

`StreamingResponse::new(status)` は `Content-Type` なし・既定容量（8）版の薄いラッパー。

## Options / Props

`StreamingResponse`:

| Name | Type | Description |
|------|------|-------------|
| `status` | `u16`（public field） | 応答ステータスコード |
| `new(status)` | `-> (Self, BodyWriter)` | `Content-Type` なし・既定容量で組み立て |
| `channel(status, content_type, capacity)` | `-> (Self, BodyWriter)` | `Content-Type` と明示的な bounded mpsc 容量を指定して組み立て。`capacity` が `0` の場合は `1` に切り上げ |

`BodyWriter`（`Clone` 可、複数タスクから送信可能）:

| Name | Type | Description |
|------|------|-------------|
| `send(data)` | `async fn(&self, Vec<u8>) -> Result<(), StreamClosed>` | 1 チャンク分のデータを送る。チャネル満杯時は空きができるまで待機（バックプレッシャ） |
| `finish(self)` | `async fn(self) -> Result<(), StreamClosed>` | ストリームを正常終端する。`self` を消費し `finish` 後の `send` を型レベルで防ぐ |

## Notes

- `send` の bounded mpsc チャネルにより、受信側（コアの書き出しループ）がソケットへ実際に書けた分だけ取り出すため、producer がメモリを無制限に積み上げることはない
- `finish` を呼ばずに `BodyWriter`（全クローン）を drop した場合は打ち切り扱いとなり、受信側は終端チャンクを送らず接続をクローズする（応答完全性、RFC 9112 の length 整合性維持）
- `data` が空でも呼び出しは成功するが、`encode_chunk` が無出力にする契約のためワイヤ出力は生じない（内部キープアライブとして使える）
- producer からの次チャンク待ちには `DEFAULT_WRITE_TIMEOUT`（30秒）が適用され、超過すると接続が強制クローズされる

## Related

- [Handler](./handler.md)
