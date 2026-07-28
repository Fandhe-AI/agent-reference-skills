# RequestGate

早期拒否可能な拡張点。認証・認可・同意ゲート等、ルーティング前にリクエストを弾く判断をコアに提供する。

## Signature / Usage

```rust
use fandhe_backend_core::extension::{GateOutcome, RequestGate};
use fandhe_backend_http::request::RequestHead;

pub trait RequestGate: Send + Sync {
    fn name(&self) -> &'static str;
    fn check(&self, head: &RequestHead) -> GateOutcome;
}
```

```rust
struct RequireAuthHeader;

impl RequestGate for RequireAuthHeader {
    fn name(&self) -> &'static str {
        "require-auth-header"
    }
    fn check(&self, head: &RequestHead) -> GateOutcome {
        match head.header("authorization") {
            Some(_) => GateOutcome::Allow,
            None => GateOutcome::Reject { status: 401, body: Vec::new() },
        }
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `name(&self)` | `-> &'static str` | 診断・ログ表示用の静的識別名 |
| `check(&self, head)` | `-> GateOutcome` | リクエストヘッドを検査し許可/拒否を判定する |

`GateOutcome`:

| Variant | Fields | Description |
|---------|--------|--------------|
| `Allow` | - | リクエストを許可し以降の処理を続行 |
| `Reject` | `status: u16`, `body: Vec<u8>` | リクエストを拒否。`status` は HTTP ステータスコード、`body` はレスポンスボディの生バイト列 |

## Notes

- 実装は**フェイルクローズ**契約: 判定に必要な情報が欠落・不正・判定不能な場合は必ず `Reject` を返す
- `Reject` の `status` は数値のみを運ぶ設計で、任意文字列をそのままステータス行に書き出さない（レスポンス分割・ヘッダインジェクション対策）
- `Server::gate(g)` で複数登録した場合は登録順に評価し、最初の `Reject` を優先する
- コアループでは `RequestGate` を `UpgradeHandler` より先に評価する（将来の TenantGate が WebSocket アップグレードも既定拒否でゲートできるようにするため）

## Related

- [Server](./server.md)
- [Middleware](./middleware.md)
- [UpgradeHandler](./upgrade-handler.md)
