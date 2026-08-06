# RequestGate

早期拒否可能な拡張点。認証・認可・同意ゲート等、ルーティング前にリクエストを弾く判断をコアに提供する。

## Signature / Usage

```rust
use fandhe_backend_core::extension::{GateContext, GateOutcome, RequestGate};
use fandhe_backend_http::request::RequestHead;

pub trait RequestGate: Send + Sync {
    fn name(&self) -> &'static str;
    fn check(&self, head: &RequestHead, ctx: &GateContext) -> GateOutcome;
}
```

```rust
struct RequireAuthHeader;

impl RequestGate for RequireAuthHeader {
    fn name(&self) -> &'static str {
        "require-auth-header"
    }
    fn check(&self, head: &RequestHead, _ctx: &GateContext) -> GateOutcome {
        match head.header("authorization") {
            Some(_) => GateOutcome::Allow,
            None => GateOutcome::reject(401, Vec::new()),
        }
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `name(&self)` | `-> &'static str` | 診断・ログ表示用の静的識別名 |
| `check(&self, head, ctx)` | `-> GateOutcome`（v0.3.0 で `ctx: &GateContext` 追加、issue #486、BREAKING） | リクエストヘッドとゲートコンテキストを検査し許可/拒否を判定する |

`GateOutcome`:

| Variant | Fields | Description |
|---------|--------|--------------|
| `Allow` | - | リクエストを許可し以降の処理を続行 |
| `Reject` | `response: Response`（v0.3.0 で `{ status: u16, body: Vec<u8> }` から変更、BREAKING） | リクエストを拒否。確定レスポンスをそのまま保持する |
| `reject(status, body)` | `fn(u16, Vec<u8>) -> GateOutcome`（v0.3.0 で新設） | 旧 `Reject { status, body }` 相当のヘルパー。内部で `Response` を組み立てて `Reject { response }` を返す |

## Notes

- 実装は**フェイルクローズ**契約: 判定に必要な情報が欠落・不正・判定不能な場合は必ず `Reject` を返す
- `GateOutcome::reject(status, body)` は旧形（`Reject { status, body }`）からの移行ヘルパー。任意文字列をそのままステータス行に書き出さない（レスポンス分割・ヘッダインジェクション対策）という制約は `Response` 側に引き継がれる
- `Server::gate(g)` で複数登録した場合は登録順に評価し、最初の `Reject` を優先する
- コアループでは `RequestGate` を `UpgradeHandler` より先に評価する（将来の TenantGate が WebSocket アップグレードも既定拒否でゲートできるようにするため）
- `GateContext` は非ソケット経路（テストダブル等）では `peer_addr()` が `None` を返す。peer アドレス必須の判定はフェイルクローズ契約に従い `None` の場合に `Reject` を返すこと

## Related

- [Server](./server.md)
- [Middleware](./middleware.md)
- [UpgradeHandler](./upgrade-handler.md)
- [GateContext](./gate-context.md)
