# ゲートの検証結果を WebSocket で使う

`RequestGate`（`TenantGate`・`JwtGate`・自作のゲート）が検証した値は、WebSocket の upgrade 要求にも同じように付く。ハンドラは次の 3 箇所から、読み取り専用で参照できる。

| 場所 | 読み方 |
|------|--------|
| ハンドシェイクのフック（101 の前） | `WsHandshakeContext::head().extensions()` |
| `WsMessageHandler::on_open` | `WsOpenContext::extensions()` |
| `on_message_with_ctx` / `on_close` | `WsConnContext::extensions()` |

ゲートが拒否した upgrade は 101 を返さず、フックにもハンドラにも届かない。ゲートを登録していないサーバでは器は空で、クライアントが送ったヘッダが値になることはない。続けて張った別の接続にも値は現れない。

## Signature / Usage

`TenantGate::verified` と `JwtGate::verified` は `&RequestHead` を取るので、WebSocket のコンテキストからは呼べない。代わりに型で引く。

- hub 共通配線: `ctx.extensions().get::<TenantVerified>()` から `.tenant().org_id()`
- `JwtGate`: `ctx.extensions().get::<GateVerified<E>>()` から `.claims()`。`E` はゲート登録時と同じ型でないと `None` になる

`None` は拒否側に倒す（fail-closed）。以下は原本の説明用コード（`rust,ignore`、コンパイル検証の対象外。API の呼び出し形は各 rustdoc の doc test が「正」）。

```rust,ignore
use fandhe_backend_core::Server;
use fandhe_backend_http::response::Response;
use fandhe_backend_plugin_hub_wiring::TenantVerified;
use fandhe_backend_plugin_websocket::handler::{WsMessageHandler, WsOpenContext};
use fandhe_backend_plugin_websocket::{WebSocketConfig, WsHandshakeContext};

struct MyHandler;

impl WsMessageHandler for MyHandler {
    fn name(&self) -> &'static str { "my-handler" }

    fn on_open(&self, ctx: WsOpenContext) {
        let Some(verified) = ctx.extensions().get::<TenantVerified>() else {
            // 値がなければ閉じる。close は async なので task で呼ぶ。
            let sender = ctx.sender().clone();
            tokio::spawn(async move { let _ = sender.close(1008, "unauthorized").await; });
            return;
        };
        let org_id = verified.tenant().org_id().to_string();
        // org_id を接続の状態として保持する、など。
        let _ = org_id;
    }

    // on_message ほかは省略
}

// 101 の前に拒否する書き方（推奨）。
let config = WebSocketConfig::default()
    .with_handshake_check(|ctx: &WsHandshakeContext<'_>| {
        if ctx.head().extensions().get::<TenantVerified>().is_none() {
            return Err(Response::empty(401));
        }
        Ok(())
    })
    .with_handler(MyHandler);

let server = Server::new().gate(tenant_gate).websocket(config);
```

## Notes

- 既知の限界: 値は WebSocket セッションが続く間ずっと保持される
- JWT の `exp` はハンドシェイク時点で検証するだけで、セッション中には再検証しない。鍵のローテーションや失効も、張ったあとのセッションには反映されない
- コアの `Server::max_connection_lifetime` は upgrade 後の委譲セッションには効かない。HTTP の keep-alive ループだけが参照する
- 緩和策: `on_open` で期限を読み、期限になったらサーバから閉じる。期限は `JwtGate` なら `GateVerified::claims().exp()`、hub 共通配線なら `TenantVerified::tenant().claims().exp()`。spawn した task で期限まで `sleep_until` し `WsSender::close` を呼ぶ。あわせて `WebSocketConfig::with_ping_interval` と `idle_timeout` を設定し、死んだ接続を残さない
- `Debug` には値が出ない（`RequestExtensions` は件数だけ、両コンテキストは内部情報を出さない）。クレームをログへ出さない
- 設計の背景（原本記載）: `gate-request-extensions.md` 14 節、`ws-connection-context-and-close.md` 17 節（`docs/design/`）。実 TCP での動作は `crates/core/tests/ws_gate_extensions.rs` が確認している
- v0.6.1 で追加
- 出典: https://fandhe-ai.github.io/fandhe-backend/guides/ws-gate-extensions/

## Related

- [websocket](../plugins/websocket.md)
- [hub-wiring](../plugins/hub-wiring.md)
- [jwt](../plugins/jwt.md)
- [extension-points](./extension-points.md)
- [RequestExtensions](../http/extensions.md)
