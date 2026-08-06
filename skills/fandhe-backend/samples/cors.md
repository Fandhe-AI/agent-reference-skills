# CORS wiring

`cors` feature の 2 層配線（`Router::options_fallback` によるプリフライト委譲 + `Server::cors` による実リクエストへのヘッダ付与）だけを見せる最小 ToDo API サンプル。

```toml
[dependencies]
fandhe-backend-core = { version = "0.3.0", features = ["cors"] }
fandhe-backend-http = "0.3.0"
fandhe-backend-routes = "0.3.0"
fandhe-backend-plugin-cors = "0.3.0"
tokio = { version = "1", features = ["rt-multi-thread", "macros", "signal"] }
serde = { version = "1", features = ["derive"] }
serde_json = "1"
```

```rust
use fandhe_backend_core::Server;
use fandhe_backend_http::response::Response;
use fandhe_backend_plugin_cors::{CorsConfig, preflight_response};
use fandhe_backend_routes::Router;
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use std::sync::atomic::{AtomicU64, Ordering};
use tokio::sync::RwLock;

#[derive(Debug, Clone, Serialize, Deserialize)]
struct Todo {
    id: u64,
    title: String,
}

type Store = Arc<RwLock<Vec<Todo>>>;

/// `https://app.example.com` のみを許可する CORS 設定。
fn cors_config() -> CorsConfig {
    CorsConfig::builder()
        .allow_origin("https://app.example.com")
        .allow_headers(["Content-Type"])
        .max_age(600)
        .build()
        .expect("allow_any_origin + credentials 併用を含まない固定設定は必ず成功する")
}

fn build_router(store: Store, next_id: Arc<AtomicU64>, cors: CorsConfig) -> Router {
    Router::new()
        .route_async("GET", "/todos", {
            let store = store.clone();
            move |_head, _body| {
                let store = store.clone();
                async move {
                    let todos = store.read().await;
                    let body = serde_json::to_vec(&*todos).unwrap_or_else(|_| b"[]".to_vec());
                    Response::new(200, body).with_content_type("application/json")
                }
            }
        })
        // プリフライト側の配線（1/2）。`Server::cors(config)`（2/2）と対になる 2 層構成。
        .options_fallback(move |head, allow, _body| preflight_response(head, allow, &cors))
}

#[tokio::main(flavor = "multi_thread")]
async fn main() -> std::io::Result<()> {
    let store: Store = Arc::new(RwLock::new(Vec::new()));
    let next_id = Arc::new(AtomicU64::new(1));
    let cors = cors_config();

    let router = build_router(store, next_id, cors.clone());
    let server = Server::new()
        .handler(router)
        // 実リクエスト側の CORS 配線（2/2）。未登録時は feature 有効でもフォールスルーする。
        .cors(cors);

    let bound = server.bind("127.0.0.1:3000").await?;
    bound.run().await
}
```

```bash
# プリフライト（204 + Access-Control-Allow-* を確認）
curl -si -X OPTIONS http://127.0.0.1:3000/todos \
    -H 'Origin: https://app.example.com' \
    -H 'Access-Control-Request-Method: POST'

# 実リクエスト（許可オリジン、Access-Control-Allow-Origin 付与を確認）
curl -si http://127.0.0.1:3000/todos -H 'Origin: https://app.example.com'

# 実リクエスト（不許可オリジン、Access-Control-Allow-Origin なしを確認）
curl -si http://127.0.0.1:3000/todos -H 'Origin: https://evil.example'
```

## Notes

- CORS は「プリフライト（`options_fallback`）」と「実リクエストへのヘッダ付与（`Server::cors`）」の 2 点で配線する。片方だけでは機能しない
- `CorsConfig::builder().allow_any_origin()` と `allow_credentials(true)` の併用は `build()` が `Err` を返す（フェイルクローズ、credentials 付き全開放の防止）
- `Server::cors` を未登録のまま `cors` feature を有効化しても完全にフォールスルーする（opt-in）
