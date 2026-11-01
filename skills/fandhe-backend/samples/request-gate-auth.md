# RequestGate for authorization

`RequestGate` 拡張点で `X-Api-Key` ヘッダの有無だけを見るフェイルクローズな認可ゲートを自作し、`Server::gate` で登録する例。

```toml
[dependencies]
fandhe-backend-core = "0.6.1"
fandhe-backend-http = "0.6.1"
fandhe-backend-routes = "0.6.1"
tokio = { version = "1", features = ["rt-multi-thread", "macros"] }
```

```rust
use fandhe_backend_core::{GateContext, GateOutcome, RequestExtensions, RequestGate, Server};
use fandhe_backend_http::request::RequestHead;
use fandhe_backend_routes::Router;

/// `X-Api-Key` ヘッダの有無だけを見る例（フェイルクローズ）。
struct ApiKeyGate;

impl RequestGate for ApiKeyGate {
    fn name(&self) -> &'static str {
        "api-key-gate"
    }

    fn check(
        &self,
        head: &RequestHead,
        _ctx: &GateContext,
        _extensions: &mut RequestExtensions,
    ) -> GateOutcome {
        match head.header("x-api-key") {
            Some(_) => GateOutcome::Allow,
            // 判定不能・情報欠落時は必ず Reject（フェイルクローズ）
            None => GateOutcome::reject(401, Vec::new()),
        }
    }
}

#[tokio::main]
async fn main() -> std::io::Result<()> {
    let router = Router::new().route("GET", "/", |_head, _body| {
        fandhe_backend_http::response::Response::new(200, b"ok\n".to_vec())
    });

    let server = Server::new().handler(router).gate(ApiKeyGate);
    let bound = server.bind("127.0.0.1:3000").await?;
    bound.run().await
}
```

```bash
curl -si http://127.0.0.1:3000/                              # 401（X-Api-Key なし）
curl -si http://127.0.0.1:3000/ -H 'X-Api-Key: secret'        # 200
```

## Notes

- 判定に必要な情報が欠落・不正、あるいは判定不能な場合は必ず `Reject` を返す（フェイルクローズ、疑わしきは通過させない）
- Migration (v0.5 → v0.6): `RequestGate::check` に第 3 引数 `extensions: &mut RequestExtensions` が追加された（`fn check(&self, head: &RequestHead, ctx: &GateContext, extensions: &mut RequestExtensions) -> GateOutcome`）。ゲート専用の書き込み口で、検証結果（Claims・テナント等）を型付きで入れるとハンドラが `head.extensions().get::<T>()` で読める。値を入れない場合は `_extensions` で受ける。`RequestExtensions` は `fandhe_backend_core` ルートと `fandhe_backend_core::extension` の両方から参照できる
- `check` を直接呼ぶテストでは第 3 引数に `&mut RequestExtensions::new()` を渡す
- v0.3.0 で `check` の署名が破壊的に変更された（第 2 引数 `&GateContext` 追加）。`ctx.peer_addr() -> Option<SocketAddr>` で接続元アドレスを取得できる（`tokio::io::duplex` 経由など非ソケット経路では `None`）
- v0.3.0 で `GateOutcome::Reject { status, body }` は `GateOutcome::Reject { response: Response }` に変更された（ヘッダインジェクション等を型レベルで排除する `Response` ベースへの統一）。旧形相当の最小拒否には新設のヘルパー `GateOutcome::reject(status: u16, body: Vec<u8>) -> Self` を使う。`Retry-After` など追加ヘッダが必要な場合は `GateOutcome::Reject { response: Response::new(...).with_header(...)? }` を直接構築する
- 拒否レスポンス送出後も、登録済み `Middleware` の `on_response` は呼ばれる（観測の一貫性）
- 複数の `RequestGate` を登録した場合、登録順に評価し最初の `Reject` を優先する
- 上の例はヘッダの有無のみを見る最小例であり、そのまま認証に使ってはならない。本番実装ではトークン値の定数時間比較（タイミング攻撃対策）・失効管理・有効期限検証が必須
- プロダクション水準の実例は `fandhe-backend-plugin-jwt` の `JwtGate`（`Authorization: Bearer` の JWT 検証、[jwt-gate.md](./jwt-gate.md) 参照）、`fandhe-backend-plugin-csrf` の `CsrfGate`（状態変更要求の送信元検査、[csrf-gate.md](./csrf-gate.md) 参照）、`fandhe-backend-plugin-hub-wiring` の `TenantGate`（JWT 検証・テナント境界強制）を参照。0.5.0 以降の `TenantGateConfig::new` / `from_jwks_json` は `JwtPolicy` が必須引数になっている
- `RequestGate` は `Allow` / `Reject` の二値判定のみを返せる設計であり、`Location` ヘッダ付きリダイレクトは返せない。リダイレクト用途には v0.2.0 で追加された `Interceptor::intercept` を使う（[interceptor.md](./interceptor.md) 参照）
