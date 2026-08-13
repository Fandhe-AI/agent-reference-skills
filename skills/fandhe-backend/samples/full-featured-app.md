# full-featured app template

`cors` / `compression` / `static` / `openapi` の 4 feature を 1 プロジェクトへ組み合わせて配線する実運用形テンプレート。配線順序（CORS プリフライト → 実リクエスト CORS → 圧縮 → 静的配信 → OpenAPI → 404 fallback → graceful shutdown）のドリフト防止が目的。

```toml
[dependencies]
fandhe-backend-core = { version = "0.4.0", features = ["cors", "compression", "static", "openapi"] }
fandhe-backend-http = "0.4.0"
fandhe-backend-routes = "0.4.0"
fandhe-backend-plugin-cors = "0.4.0"
fandhe-backend-plugin-static = "0.4.0"
fandhe-backend-plugin-compression = "0.4.0"
fandhe-backend-plugin-openapi = "0.4.0"
tokio = { version = "1", features = ["rt-multi-thread", "macros", "signal"] }
serde = { version = "1", features = ["derive"] }
serde_json = "1"
```

```rust
use fandhe_backend_core::Server;
use fandhe_backend_http::response::Response;
use fandhe_backend_plugin_cors::{CorsConfig, preflight_response};
use fandhe_backend_routes::Router;

fn cors_config() -> CorsConfig {
    CorsConfig::builder()
        .allow_origin("http://localhost:5173")
        .allow_methods(["GET", "POST", "PATCH", "DELETE"])
        .allow_headers(["Content-Type"])
        .max_age(600)
        .build()
        .expect("固定の許可オリジン設定は必ず成功する")
}

fn build_router(cors: CorsConfig) -> Router {
    Router::new()
        .route("GET", "/todos", |_head, _body| Response::new(200, b"[]".to_vec()))
        // CORS プリフライト側の配線（1/2）。`Server::cors(config)`（2/2、下記）と対になる。
        .options_fallback(move |head, allow, _body| preflight_response(head, allow, &cors))
        .fallback(|_head, _body| Response::new(404, br#"{"error":"not found"}"#.to_vec()))
}

#[tokio::main(flavor = "multi_thread")]
async fn main() -> std::io::Result<()> {
    let cors = cors_config();
    let router = build_router(cors.clone());

    // 静的ファイル配信: mount をルート "/" にはしない（パスインターセプト型プラグイン
    // は Router::dispatch より先に評価されるため、"/" mount は全 GET を横取りする）。
    let static_root = std::path::Path::new(env!("CARGO_MANIFEST_DIR")).join("static");
    let static_config =
        fandhe_backend_plugin_static::StaticFilesConfig::builder("/index.html", &static_root)
            .build()
            .expect("static/ ディレクトリが存在すれば構築に成功する");

    let openapi_doc =
        fandhe_backend_plugin_openapi::OpenApiDoc::from_json(include_str!("../openapi.json"))
            .expect("手書き検証済みの妥当な JSON オブジェクト");

    let server = Server::new()
        .handler(router)
        // 実リクエスト側の CORS 配線（2/2）
        .cors(cors)
        // CORS の後、body を確定させる最後の後処理として圧縮を適用する（圧縮は必ず最後）
        .compression(fandhe_backend_plugin_compression::CompressionConfig::builder().build())
        .static_files(static_config)
        .openapi_with(openapi_doc)
        .shutdown_grace_period(std::time::Duration::from_secs(10));

    let bound = server.bind("127.0.0.1:3000").await?;
    bound
        .run_until(async {
            tokio::signal::ctrl_c().await.expect("Ctrl-C ハンドラ登録に失敗した");
        })
        .await
}
```

```bash
curl -s -X POST http://127.0.0.1:3000/todos -d '{"title":"buy milk"}'
curl -s http://127.0.0.1:3000/todos
curl -s http://127.0.0.1:3000/openapi.json
curl -si http://127.0.0.1:3000/nope   # 404 + JSON エラーボディ
curl -si -X OPTIONS http://127.0.0.1:3000/todos \
    -H 'Origin: http://localhost:5173' \
    -H 'Access-Control-Request-Method: POST'
```

## Notes

- 複数 feature を同時配線する場合、順序は固定: CORS プリフライト（`Router::options_fallback`）→ 実リクエスト CORS（`Server::cors`）→ 圧縮（`Server::compression`）→ 静的配信 → OpenAPI → 404 fallback → graceful shutdown
- 個々の feature 単体の最小配線は各サンプル（[cors.md](./cors.md)、[compression.md](./compression.md)、[static-file-serving.md](./static-file-serving.md)、[graceful-shutdown.md](./graceful-shutdown.md)）を参照。本サンプルはそれらの組み合わせ配線の雛形
- `static_files` の mount をファイルパス（例 `/index.html`）に限定し、`/` にしないことで CRUD API 等の他ルートを静的配信が横取りしないようにする
- `OpenApiDoc::from_json` は手書き JSON を配信する構成。`utoipa::path` からの自動生成を使う場合は `gen-openapi` CLI（`gen-cli` feature）を使う
