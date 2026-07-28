# SSR page with Loader, respond_with, and Router

`Loader` trait を自作実装し、`respond_with` で一覧・詳細画面の SSR 応答を組み立て、独自ルートは `Router` で直接処理する。

```rust
use fandhe_frontend_app::router::Router;
use fandhe_frontend_app::{page_shell, Item, Loader};
use fandhe_frontend_core::{el, p, text};
use fandhe_frontend_server::ssr::respond_with;
use std::convert::Infallible;

struct ExampleItemsLoader;

impl Loader for ExampleItemsLoader {
    type Input = ();
    type Output = Vec<Item>;
    type Error = Infallible;

    fn load(&self, _input: &()) -> Result<Vec<Item>, Infallible> {
        Ok(vec![Item {
            id: "1".to_string(),
            title: "Welcome".to_string(),
            body: "fandhe_frontend_server::ssr::respond_with demo".to_string(),
        }])
    }
}

struct ExampleItemDetailLoader;

impl Loader for ExampleItemDetailLoader {
    type Input = String;
    type Output = Option<Item>;
    type Error = Infallible;

    fn load(&self, _id: &String) -> Result<Option<Item>, Infallible> {
        Ok(None)
    }
}

fn hello_router() -> Router<()> {
    Router::new()
        .route("/hello/:name", ())
        .expect("\"/hello/:name\" is a statically valid route pattern")
}

fn resolve_response(path: &str) -> (u16, &'static str, String) {
    if let Some(route_match) = hello_router().resolve(path) {
        let name = route_match.params.get("name").unwrap_or("world");
        let body = page_shell(
            "Hello",
            el("main", vec![], vec![p(vec![], vec![text(format!("Hello, {name}!"))])]),
        );
        return (200, "text/html; charset=utf-8", body);
    }

    match respond_with(&ExampleItemsLoader, &ExampleItemDetailLoader, path) {
        Some(response) => (response.status, response.content_type, response.body),
        None => (404, "text/html; charset=utf-8", page_shell("Not Found", el("main", vec![], vec![]))),
    }
}
```

## Notes

- `respond_with(&items_loader, &detail_loader, path)` は `fandhe_frontend_app::routes` の固定ルート表（`/` と `/items/:id`）にのみ一致し、未一致時は `None` を返す。404 応答の組み立ては呼び出し側の責務。
- `Router::Params`（`route_match.params.get("name")`）は URL デコードされていない生文字列。HTML へ出力する際は必ず `text()` 経由（既定エスケープ）で載せる。`format!` はタグ文字列の組み立てには使わない。
- `Loader::load` の `Error` は `Output` で 404 相当（`Option<Item>` の `None`）を表現し、`Error` は解決不能な失敗のみに使う契約。
