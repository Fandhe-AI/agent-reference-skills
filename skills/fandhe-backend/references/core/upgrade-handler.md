# UpgradeHandler

長時間接続（WebSocket・WebRTC シグナリング等）への**委譲判定のみ**をコアに公開する拡張点。フレーミング・プロトコルアップグレード後の読み書きは本 trait の責務外で、プラグイン側に閉じる。

## Signature / Usage

```rust
use fandhe_backend_core::extension::UpgradeHandler;
use fandhe_backend_http::request::RequestHead;

pub trait UpgradeHandler: Send + Sync {
    fn name(&self) -> &'static str;
    fn matches(&self, head: &RequestHead) -> bool;
}
```

```rust
struct WebSocketUpgrade;

impl UpgradeHandler for WebSocketUpgrade {
    fn name(&self) -> &'static str {
        "websocket-upgrade"
    }
    fn matches(&self, head: &RequestHead) -> bool {
        head.header("upgrade")
            .is_some_and(|v| v.eq_ignore_ascii_case("websocket"))
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `name(&self)` | `-> &'static str` | 診断・ログ表示用の静的識別名 |
| `matches(&self, head)` | `-> bool` | このリクエストが自分の担当するアップグレードプロトコルに該当するかを判定する |

## Notes

- `matches` が `true` を返した場合、以降の接続処理はこの実装（プラグイン）に委譲される契約
- `Server::upgrade_handler(h)` で登録すると登録順に `matches` が評価される
- コアループでの評価順は `Middleware::on_request` → `RequestGate::check` → `UpgradeHandler::matches` → `plugin::try_intercept` → `Handler::handle`
- マッチ後、読み取りバッファを明示解放してから委譲処理へ渡す
- shutdown_flag 受信後（graceful shutdown 中）は `matches` が `true` でも Upgrade へ委譲せず 503 で拒否する

## Related

- [Server](./server.md)
- [Middleware](./middleware.md)
- [RequestGate](./request-gate.md)
