# CRUD routing with shared state

`route_async` / `route_param_async` とパスパラメータ、`Arc<RwLock<...>>` 共有状態、404 fallback を組み合わせた ToDo API。

```toml
[dependencies]
fandhe-backend-core = "0.3.0"
fandhe-backend-http = "0.3.0"
fandhe-backend-routes = "0.3.0"
tokio = { version = "1", features = ["rt-multi-thread", "macros", "signal"] }
serde = { version = "1", features = ["derive"] }
serde_json = "1"
```

```rust
use fandhe_backend_core::Server;
use fandhe_backend_http::response::Response;
use fandhe_backend_routes::Router;
use serde::{Deserialize, Serialize};
use std::collections::BTreeMap;
use std::sync::Arc;
use std::sync::atomic::{AtomicU64, Ordering};
use tokio::sync::RwLock;

#[derive(Debug, Clone, Serialize, Deserialize)]
struct Todo {
    id: u64,
    title: String,
    done: bool,
}

#[derive(Default)]
struct Store {
    todos: BTreeMap<u64, Todo>,
}

#[derive(Debug, Serialize, Deserialize)]
struct ErrorBody {
    error: String,
}

fn error_response(status: u16, message: &str) -> Response {
    let body = serde_json::to_vec(&ErrorBody { error: message.to_string() }).unwrap_or_else(|_| b"{}".to_vec());
    Response::new(status, body).with_content_type("application/json")
}

fn json_response(status: u16, payload: &impl Serialize) -> Response {
    let body = serde_json::to_vec(payload).unwrap_or_else(|_| b"{}".to_vec());
    Response::new(status, body).with_content_type("application/json")
}

#[derive(Debug, Deserialize)]
struct CreateTodoBody {
    title: String,
}

fn build_router(store: Arc<RwLock<Store>>, next_id: Arc<AtomicU64>) -> Router {
    Router::new()
        .route_async("GET", "/todos", {
            let store = store.clone();
            move |_head, _body| {
                let store = store.clone();
                async move {
                    let store = store.read().await;
                    let todos: Vec<&Todo> = store.todos.values().collect();
                    json_response(200, &todos)
                }
            }
        })
        .route_async("POST", "/todos", {
            let store = store.clone();
            let next_id = next_id.clone();
            move |_head, body| {
                let store = store.clone();
                let next_id = next_id.clone();
                let body = body.to_vec();
                async move {
                    let Ok(parsed) = serde_json::from_slice::<CreateTodoBody>(&body) else {
                        return error_response(400, "invalid json body");
                    };
                    let title = parsed.title.trim();
                    if title.is_empty() {
                        return error_response(400, "title must not be blank");
                    }
                    let id = next_id.fetch_add(1, Ordering::SeqCst);
                    let todo = Todo { id, title: title.to_string(), done: false };
                    store.write().await.todos.insert(id, todo.clone());
                    json_response(201, &todo)
                }
            }
        })
        .route_param_async("GET", "/todos/{id}", {
            let store = store.clone();
            move |_head, params, _body| {
                let store = store.clone();
                let id_str = params.get("id").unwrap_or("").to_string();
                async move {
                    let Ok(id) = id_str.parse::<u64>() else {
                        return error_response(404, "todo not found");
                    };
                    let store = store.read().await;
                    match store.todos.get(&id) {
                        Some(todo) => json_response(200, todo),
                        None => error_response(404, "todo not found"),
                    }
                }
            }
        })
        .unwrap()
        // パラメータ・静的いずれのルートにも一致しなかったリクエストの共通 404
        .fallback(|_head, _body| error_response(404, "not found"))
}

#[tokio::main(flavor = "multi_thread")]
async fn main() -> std::io::Result<()> {
    let store = Arc::new(RwLock::new(Store::default()));
    let next_id = Arc::new(AtomicU64::new(1));
    let server = Server::new().handler(build_router(store, next_id));
    let bound = server.bind("127.0.0.1:3000").await?;
    bound.run().await
}
```

```bash
curl -s -X POST http://127.0.0.1:3000/todos -d '{"title":"buy milk"}'
curl -s http://127.0.0.1:3000/todos
curl -s http://127.0.0.1:3000/todos/1
curl -si http://127.0.0.1:3000/nope   # 404 + JSON エラーボディ
```

## Notes

- `route_param_async("...", "/todos/{id}", ...)` は `Result` を返すため `.unwrap()` でチェーンする（重複パターン登録時のエラーを型で表現している）
- CRUD ハンドラは `Arc<RwLock<Store>>` を `.clone()` してキャプチャし、ロック保持区間を 1 回の読み取り／書き込み操作のみに区切る（ロック保持中の `.await` を避ける）
- `Router::fallback` は静的・パラメータいずれのルートにも一致しなかったリクエストに対する共通 404 を提供する
