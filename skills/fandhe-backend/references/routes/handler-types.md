# Handler Types（HandlerFuture / RouteHandler / ParamRouteHandler / OptionsFallbackHandler）

`Router` の登録・ディスパッチ契約を支える公開型エイリアスと `ParamRoute`。`fandhe_backend_core::server::Handler::handle` を実装する側もこれらの型（特に `HandlerFuture`）を直接参照する。

## Signature / Usage

```rust
use std::future::Future;
use std::pin::Pin;
use fandhe_backend_http::request::RequestHead;
use fandhe_backend_routes::PathParams;
use fandhe_backend_http::response::{Response, AllowedMethods};

pub type HandlerFuture = Pin<Box<dyn Future<Output = Response> + Send>>;

pub type RouteHandler = Box<dyn Fn(&RequestHead, &[u8]) -> HandlerFuture + Send + Sync>;

pub type ParamRouteHandler =
    Box<dyn Fn(&RequestHead, &PathParams<'_>, &[u8]) -> HandlerFuture + Send + Sync>;

pub type OptionsFallbackHandler =
    Box<dyn Fn(&RequestHead, &AllowedMethods, &[u8]) -> Response + Send + Sync>;
```

`crates/core::server::Handler::handle` は `HandlerFuture` と同一シグネチャを返す（依存方向の制約上 trait は共有せず、独自の型として定義）。

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `HandlerFuture` | `Pin<Box<dyn Future<Output = Response> + Send>>` | ハンドラ実行の戻り値。`'static` 契約（借用を持ち越さない） |
| `RouteHandler` | `Box<dyn Fn(&RequestHead, &[u8]) -> HandlerFuture + Send + Sync>` | `Router::route` / `route_async` が登録するハンドラ型 |
| `ParamRouteHandler` | `Box<dyn Fn(&RequestHead, &PathParams<'_>, &[u8]) -> HandlerFuture + Send + Sync>` | `Router::route_param` / `route_param_async` が登録するハンドラ型 |
| `OptionsFallbackHandler` | `Box<dyn Fn(&RequestHead, &AllowedMethods, &[u8]) -> Response + Send + Sync>` | `Router::options_fallback` が登録するハンドラ型 |
| `ParamRoute` | `struct { method, segments, handler }`（フィールドは `pub(crate)`） | 登録済みパラメータ付きルート 1 件（method + パース済みパターン + ハンドラ）。`pattern` モジュールから re-export される不透明な内部表現 |

## Notes

- `HandlerFuture` は型消去に `async-trait` 等の外部依存を追加せず std のみで表現する（pay-for-what-you-use）
- 同期ハンドラ（`route` / `route_param` 経由）は内部で `std::future::ready` にラップされ、借用を future へ持ち越さない
- async ハンドラ（`route_async` / `route_param_async`）は `Fut: 'static` 契約のため、必要な値を同期部で `clone` してから `async move` へ渡す設計にすること

## Related

- [Router](./router.md)
- [Path Patterns](./path-patterns.md)
- [Handler](../core/handler.md)
