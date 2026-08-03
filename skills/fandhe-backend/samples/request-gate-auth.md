# RequestGate for authorization

`RequestGate` 拡張点で `X-Api-Key` ヘッダの有無だけを見るフェイルクローズな認可ゲートを自作し、`Server::gate` で登録する例。

```toml
[dependencies]
fandhe-backend-core = "0.2.0"
fandhe-backend-http = "0.2.0"
fandhe-backend-routes = "0.2.0"
tokio = { version = "1", features = ["rt-multi-thread", "macros"] }
```

```rust
use fandhe_backend_core::{GateOutcome, RequestGate, Server};
use fandhe_backend_http::request::RequestHead;
use fandhe_backend_routes::Router;

/// `X-Api-Key` ヘッダの有無だけを見る例（フェイルクローズ）。
struct ApiKeyGate;

impl RequestGate for ApiKeyGate {
    fn name(&self) -> &'static str {
        "api-key-gate"
    }

    fn check(&self, head: &RequestHead) -> GateOutcome {
        match head.header("x-api-key") {
            Some(_) => GateOutcome::Allow,
            // 判定不能・情報欠落時は必ず Reject（フェイルクローズ）
            None => GateOutcome::Reject {
                status: 401,
                body: Vec::new(),
            },
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
- `GateOutcome::Reject` の `status` は数値（`u16`）のみを運ぶ。reason phrase の組み立てはコア側の責務であり、任意文字列をステータス行へ書き出せない設計でヘッダインジェクション等を型レベルで排除している
- 拒否レスポンス送出後も、登録済み `Middleware` の `on_response` は呼ばれる（観測の一貫性）
- 複数の `RequestGate` を登録した場合、登録順に評価し最初の `Reject` を優先する
- 上の例はヘッダの有無のみを見る最小例であり、そのまま認証に使ってはならない。本番実装ではトークン値の定数時間比較（タイミング攻撃対策）・失効管理・有効期限検証が必須
- プロダクション水準の実例は `fandhe-backend-plugin-hub-wiring` の `TenantGate`（JWT 検証・テナント境界強制）を参照
- `RequestGate` は `Allow` / `Reject` の二値判定のみを返せる設計であり、`Location` ヘッダ付きリダイレクトは返せない。リダイレクト用途には v0.2.0 で追加された `Interceptor::intercept` を使う（[interceptor.md](./interceptor.md) 参照）
