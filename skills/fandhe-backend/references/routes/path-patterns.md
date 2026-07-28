# Path Patterns（PathParams / Segment / RoutePatternError）

`{name}` パスパラメータおよび末尾 `{*name}` ワイルドカードのパターンパース・セグメント照合。`Router::route_param` / `Router::route_param_async` が使う。

## Signature / Usage

```rust
use fandhe_backend_routes::Router;

let router = Router::new()
    .route_param("GET", "/users/{id}", |_head, params, _body| {
        assert_eq!(params.get("id"), Some("42"));
        fandhe_backend_http::response::Response::empty(200)
    })
    .unwrap();
```

末尾ワイルドカードで複数セグメント（`/` を含む）を 1 値として束縛する例:

```rust
let router = Router::new()
    .route_param("GET", "/static/{*path}", |_head, params, _body| {
        let path = params.get("path").unwrap_or("");
        fandhe_backend_http::response::Response::new(200, path.as_bytes().to_vec())
    })
    .unwrap();
// GET /static/css/app.css → path == "css/app.css"
```

## Options / Props

`PathParams<'a>`:

| Name | Type | Description |
|------|------|-------------|
| `get(name)` | `-> Option<&str>` | パラメータ名に対応する値を返す（% デコードしない生スライス） |
| `iter()` | `-> impl Iterator<Item = (&str, &str)>` | 束縛済み `(name, value)` をパターン上の出現順に返す |
| `len()` / `is_empty()` | `-> usize` / `-> bool` | 束縛済みパラメータ数 |

`Segment`:

| Variant | Description |
|---------|-------------|
| `Literal(String)` | リテラル文字列との完全一致 |
| `Param(String)` | `{name}` — 非空の 1 セグメントにマッチ |
| `Wildcard(String)` | `{*name}` — 最終セグメントのみ配置可。1 個以上の残りセグメント（`/` を含む）を吸収 |

`RoutePatternError`（登録時の検証エラー）:

| Variant | Description |
|---------|-------------|
| `MissingLeadingSlash` | パターンが `/` で始まっていない |
| `EmptyParamName` | `{}` のようにパラメータ名が空 |
| `InvalidParamName(String)` | `[A-Za-z0-9_]` 以外の文字を含む |
| `MixedSegment(String)` | `a{b}` のようなリテラルと `{name}` の混在 |
| `DuplicateParamName(String)` | 同一パターン内で同名パラメータが重複 |
| `EmptySegment` | 連続スラッシュ・末尾スラッシュによる空セグメント |
| `NoParamSegment` | `{name}` を 1 つも含まない（完全一致は `route()` を使う） |
| `WildcardNotLast(String)` | `{*name}` が最終セグメント以外に出現 |

## Notes

- `{name}` / `{*name}` は値が `.` / `..` と一致するセグメント、`?` / `#` を含むセグメントには一致しない（パス走査・過剰キャプチャ対策、`is_safe_segment_value`）
- % デコードは行わない。`%2e%2e` はリテラルとしてそのまま束縛される（デコード後の再検証は呼び出し側責務）
- `{*name}` ワイルドカードは 0 セグメントには一致しない（1 個以上を要求。空マッチだと `/static` 単体を意図せず捕捉するため）
- マッチング優先順位: 静的ルート（完全一致）を最優先、次にパラメータルートを**登録順**に線形走査し最初の一致を採用

## Related

- [Router](./router.md)
