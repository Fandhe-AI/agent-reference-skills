# Router

method + `target` の完全一致、および `{name}` パスパラメータでハンドラを解決する最小ルータ。`crates/core::server::Server::handler` にそのまま登録して使う（`impl Handler for Router`）。

## Signature / Usage

```rust
use fandhe_backend_routes::Router;
use fandhe_backend_http::response::Response;

let router = Router::new()
    .route("GET", "/", |_head, _body| Response::new(200, b"ok".to_vec()))
    .route("POST", "/todos", |_head, _body| Response::empty(201));
```

async ハンドラ:

```rust
let router = Router::new().route_async("GET", "/slow", |_head, _body| async {
    Response::new(200, b"ok".to_vec())
});
```

パスパラメータ:

```rust
let router = Router::new()
    .route_param("GET", "/hello/{name}", |_head, params, _body| {
        let name = params.get("name").unwrap_or("world");
        Response::new(200, format!("hello, {name}").into_bytes())
    })
    .unwrap();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `new()` | `-> Self` | 空のルータを作る |
| `route(method, path, handler)` | `Fn(&RequestHead, &[u8]) -> Response` | 完全一致ルートを登録。同一 `(method, path)` の再登録は最後が有効 |
| `route_async(method, path, handler)` | `Fn(&RequestHead, &[u8]) -> Fut` | 完全一致ルートを async ハンドラで登録 |
| `route_param(method, pattern, handler)` | `Fn(&RequestHead, &PathParams<'_>, &[u8]) -> Response` | `{name}` / `{*name}` を含むパターンルートを登録。`Result<Self, RoutePatternError>` を返す |
| `route_param_async(method, pattern, handler)` | `Fn(&RequestHead, &PathParams<'_>, &[u8]) -> Fut` | パターンルートを async ハンドラで登録 |
| `options_fallback(handler)` | `Fn(&RequestHead, &AllowedMethods, &[u8]) -> Response` | OPTIONS プリフライトの opt-in フォールバック。未登録時は 405 + `Allow` のまま |
| `fallback(handler)` | `Fn(&RequestHead, &[u8]) -> Response` | 未マッチ（404）を委譲する共通フォールバック（`FallbackPolicy::NotFoundOnly` 相当） |
| `fallback_with(policy, handler)` | `FallbackPolicy, Fn(&RequestHead, &[u8]) -> Response` | フォールバックのポリシー明示版。`IncludeMethodNotAllowed` で 405 も委譲可能 |
| `dispatch(head, body)` | `-> HandlerFuture` | method + `target` に一致するハンドラへ委譲する |

`FallbackPolicy`:

| Variant | Description |
|---------|-------------|
| `NotFoundOnly`（既定） | 404 のみ fallback へ委譲。405 は従来どおり `Allow` 付きで返す |
| `IncludeMethodNotAllowed` | 404 に加え 405 も fallback へ委譲（`Allow` は付与されない） |

## Notes

- 解決優先順位: 1) 静的ルート（完全一致）、2) パラメータルート（登録順に線形走査、最初の一致）、3) `fallback` 登録済みなら委譲、未登録なら 404/405
- `route`/`route_param` は登録時のみを想定し、実行時にルートを追加・削除する API は持たない
- % デコード・末尾スラッシュ正規化は一切行わない（パーサが渡したバイト列をそのまま比較）
- パス照合は `RequestHead::path()`（`target` 中の最初の `?` より前）に対して行う。クエリ文字列は `RequestHead::query()` でハンドラ側が参照する
- 405 応答には RFC 9110 §15.5.6 に従いソート済み・重複排除済みの `Allow` ヘッダを付与する
- 明示登録された OPTIONS ルートは常に `options_fallback` より優先される
- `dispatch` 自体は同期関数で `HandlerFuture` を返す（ルーティング解決は同期、ハンドラ本体の実行のみ非同期）

## Related

- [Path Patterns](./path-patterns.md)
