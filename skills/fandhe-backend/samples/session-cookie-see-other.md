# Session cookie and 303 See Other

`SetCookie::session` で安全な既定値のセッション Cookie を作り、`Response::see_other` で POST 後の 303 リダイレクトを組み立てる例。

```toml
[dependencies]
fandhe-backend-http = "0.6.1"
```

```rust
use fandhe_backend_http::cookie::{CookieError, SetCookie};
use fandhe_backend_http::location::SameOriginLocation;
use fandhe_backend_http::response::Response;

fn main() {
    // セッション Cookie: HttpOnly / Secure / SameSite=Lax / Path=/
    assert_eq!(
        SetCookie::session("sid", "abc").unwrap().to_header_value(),
        "sid=abc; Path=/; SameSite=Lax; Secure; HttpOnly"
    );
    // __Host- 名との組み合わせ（Path は '/' のみ許可）
    let c = SetCookie::session("__Host-sid", "abc").unwrap();
    assert_eq!(c.to_header_value(), "__Host-sid=abc; Path=/; SameSite=Lax; Secure; HttpOnly");
    assert_eq!(c.path("/api").unwrap_err(), CookieError::HostPrefixPath);
    assert_eq!(SetCookie::session("", "abc").unwrap_err(), CookieError::InvalidName);
    assert_eq!(SetCookie::session("sid", "a;b").unwrap_err(), CookieError::InvalidValue);

    // POST 後の 303 See Other（同一オリジン相対パスのみ受理）
    let res = Response::see_other(SameOriginLocation::new("/todos").unwrap());
    let text = String::from_utf8(res.serialize(true)).unwrap();
    assert!(text.starts_with("HTTP/1.1 303 See Other\r\n"));
    assert!(text.contains("Location: /todos\r\n"));
    assert!(text.contains("Content-Length: 0\r\n"));
    assert!(SameOriginLocation::new("//evil.com").is_err());
}
```

## Notes

- `SetCookie::session` は `Max-Age` を付けない（ブラウザのセッション寿命）。永続化するなら `SetCookie::max_age`。発行後に `path` を変えた場合は、削除用の `SetCookie::session_removal` にも同じ `path` を付ける
- TLS はリバースプロキシで終端する前提（`Secure` は外せない）。`SameSite` を変えたい場合は `SetCookie::session_with` に `SessionSameSite` を渡す（`SessionSameSite` は `Lax` / `Strict` のみで、`SameSite=None` を型で排除するのは `session_with` の引数（入口）に限る。返された `SetCookie` に汎用の `same_site(SameSite::None)` を呼べば後から明示的に opt-out できる）
- `Response::see_other` は構築時検証済みの `SameOriginLocation` のみを受け取るため、オープンリダイレクトとヘッダ注入が型で防がれ、失敗しない。`//evil.com` のような値は `SameOriginLocation::new` が `Err` を返す
- 実際のレスポンスへ Cookie を付与するには `Response::with_set_cookie(cookie)` を使う
- 出典: https://docs.rs/crate/fandhe-backend-http/0.5.0/source/src/cookie.rs
- 出典: https://docs.rs/crate/fandhe-backend-http/0.5.0/source/src/response.rs
