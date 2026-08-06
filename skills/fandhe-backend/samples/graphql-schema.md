# GraphQL schema wiring

`graphql` feature の配線（`async_graphql::dynamic` による実行時スキーマ構築 + `Server::graphql` への登録 + `POST /graphql` の最小クエリ実行）。

```toml
[dependencies]
fandhe-backend-core = { version = "0.3.0", features = ["graphql"] }
fandhe-backend-http = "0.3.0"
fandhe-backend-routes = "0.3.0"
fandhe-backend-plugin-graphql = "0.3.0"
async-graphql = { version = "7", default-features = false, features = ["dynamic-schema"] }
tokio = { version = "1", features = ["rt-multi-thread", "macros", "signal"] }
```

```rust
use async_graphql::Value;
use async_graphql::dynamic::{Field, FieldFuture, InputValue, Object, Schema, TypeRef};
use fandhe_backend_core::Server;
use fandhe_backend_http::response::Response;
use fandhe_backend_plugin_graphql::GraphQlConfig;
use fandhe_backend_routes::Router;

/// `hello`（引数なし）・`echo(value: String!)` を持つ最小デモスキーマ。
fn graphql_config() -> GraphQlConfig {
    let query = Object::new("Query")
        .field(Field::new(
            "hello",
            TypeRef::named_nn(TypeRef::STRING),
            |_ctx| FieldFuture::new(async move { Ok(Some(Value::from("world"))) }),
        ))
        .field(
            Field::new("echo", TypeRef::named_nn(TypeRef::STRING), |ctx| {
                FieldFuture::new(async move {
                    let value = ctx.args.try_get("value")?.string()?.to_owned();
                    Ok(Some(Value::from(value)))
                })
            })
            .argument(InputValue::new("value", TypeRef::named_nn(TypeRef::STRING))),
        );

    let schema = Schema::build(query.type_name(), None, None)
        // クエリ深さ・複雑度制限はスキーマ登録者の責務（リソース枯渇 DoS 対策）
        .limit_depth(8)
        .limit_complexity(64)
        .register(query)
        .finish()
        .expect("静的に妥当なデモスキーマは必ず構築に成功する");
    GraphQlConfig::new(schema)
}

fn build_router() -> Router {
    Router::new().route("GET", "/", |_head, _body| {
        Response::new(200, b"try POST /graphql\n".to_vec())
    })
}

#[tokio::main(flavor = "multi_thread")]
async fn main() -> std::io::Result<()> {
    let router = build_router();
    let server = Server::new().handler(router).graphql(graphql_config());

    let bound = server.bind("127.0.0.1:3000").await?;
    bound.run().await
}
```

```bash
# クエリ実行（{"data":{"hello":"world"}} を確認）
curl -s -X POST http://127.0.0.1:3000/graphql -d '{"query":"{ hello }"}'

# variables 付きクエリ実行（{"data":{"echo":"hi"}} を確認）
curl -s -X POST http://127.0.0.1:3000/graphql \
    -d '{"query":"query($v: String!) { echo(value: $v) }","variables":{"v":"hi"}}'

# 無関係パス（GraphQL インターセプトが波及しないことを確認）
curl -s http://127.0.0.1:3000/
```

## Notes

- GraphQL はパスインターセプト型プラグイン。`Server::graphql(config)` 登録時のみ既定 `Handler` より先に `POST /graphql` を捕捉し、未登録時は feature 有効でもフォールスルーする（`Router` には一切配線しない）
- `#[Object]` 派生マクロではなく `async_graphql::dynamic`（実行時スキーマ構築 API）を使う。派生マクロの生成コードは workspace の forbid lint と衝突しうる
- クエリ深さ・複雑度制限（`limit_depth` / `limit_complexity`）は本体クレートが既定値を提供しないため、呼び出し側で必ず設定する
- introspection は `async-graphql` の既定で有効のまま。本番相当の非開発環境では `Schema::disable_introspection` の追加を検討する
