# GateContext

`RequestGate::check` に渡される接続情報。accept したソケットの実 peer address を gate 実装から参照可能にする（issue #486）。

## Signature / Usage

```rust
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub struct GateContext { /* private fields */ }

impl GateContext {
    pub fn new(peer_addr: Option<SocketAddr>) -> Self;
    pub fn peer_addr(&self) -> Option<SocketAddr>;
}

// RequestGate::check の第2引数として渡される
fn check(&self, head: &RequestHead, ctx: &GateContext) -> GateOutcome;
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| peer_addr | `Option<SocketAddr>` | accept したソケットの実 peer address。`GateContext::new` の唯一の引数であり `peer_addr()` で取得する |

## Notes

- `tokio::io::duplex` 等の非ソケット経路（統合テスト等）では `peer_addr` が `None` になる
- peer address を前提とする判定を行う gate 実装は、`None` の場合に必ず `GateOutcome::Reject` を返すこと（フェイルクローズ）
- リバースプロキシ配下では `peer_addr` はプロキシ自身のアドレスを指す。転送ヘッダー（spoofable）ではなく `peer_addr` を IP ベース認可の根拠にする
- `new` が public なのは、実ソケット経路と gate 実装の単体テストの両方を可能にするため

## Related

- [RequestGate](./request-gate.md)
- [Extension Points](./extension-points.md)
