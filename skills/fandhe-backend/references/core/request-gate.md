# RequestGate

早期拒否可能な拡張点。認証・認可・同意ゲート等、ルーティング前にリクエストを弾く判断をコアに提供する。

## Signature / Usage

```rust
use fandhe_backend_core::extension::{GateContext, GateOutcome, RequestExtensions, RequestGate};
use fandhe_backend_http::request::RequestHead;

pub trait RequestGate: Send + Sync {
    fn name(&self) -> &'static str;
    fn check(
        &self,
        head: &RequestHead,
        ctx: &GateContext,
        extensions: &mut RequestExtensions,
    ) -> GateOutcome;
}
```

```rust
struct RequireAuthHeader;

impl RequestGate for RequireAuthHeader {
    fn name(&self) -> &'static str {
        "require-auth-header"
    }
    fn check(&self, head: &RequestHead, _ctx: &GateContext, _extensions: &mut RequestExtensions) -> GateOutcome {
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
| `check(&self, head, ctx, extensions)` | `-> GateOutcome`（v0.3.0 で `ctx: &GateContext` 追加、issue #486、BREAKING。v0.6.0 で `extensions: &mut RequestExtensions` 追加、issue #924、BREAKING） | リクエストヘッド・ゲートコンテキスト・リクエスト単位の拡張領域を受け取り許可/拒否を判定する |

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

- `extensions: &mut RequestExtensions`（v0.6.0 で追加）は**このリクエスト専用**の器で、先に評価されたゲートが入れた値も読める。型は `fandhe-backend-http` の `extensions` モジュールの `RequestExtensions` で、`fandhe_backend_core::extension` と crate ルートから re-export される。全ゲートが `Allow` を返したときだけ、コアが器を `RequestHead::extensions` へ移し、ハンドラが `head.extensions().get::<T>()` で読める（いずれかが `Reject` なら破棄される）
- `extensions.insert(value)` が `Err` を返した場合（同じ型を別のゲートが先に入れた）は、検証結果の差し替えを避けるため拒否を返すこと
- `GateOutcome` と `GateContext` は v0.6.0 で変わらない。`RequestExtensions` の詳細は [RequestExtensions](../http/extensions.md) を参照
- Migration (v0.5 → v0.6): `RequestGate::check` に第 3 引数 `extensions: &mut RequestExtensions` を追加（BREAKING、非推奨期間なし）。値を渡さない既存ゲートは `impl RequestGate` の `check` に第 3 引数 `_extensions: &mut RequestExtensions` を足すだけで、挙動は変わらない。`check` を直接呼ぶテストは `gate.check(&head, &ctx, &mut RequestExtensions::new())` のように空の器を渡す。値を渡したいゲートは `extensions.insert(value)` で入れ、`Err` のときは拒否を返す。影響した workspace 内の実装は `fandhe-backend-plugin-csrf` の `CsrfGate`、`fandhe-backend-plugin-hub-wiring` の `TenantGate`、`fandhe-backend-plugin-jwt` の `JwtGate`（シグネチャの追随のみ）

## Related

- [Server](./server.md)
- [Middleware](./middleware.md)
- [UpgradeHandler](./upgrade-handler.md)
- [GateContext](./gate-context.md)
- [RequestExtensions](../http/extensions.md)
