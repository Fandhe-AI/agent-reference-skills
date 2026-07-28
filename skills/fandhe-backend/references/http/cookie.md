# cookie

Cookie 関連ヘルパー。読み取り側（`parse_cookie_header`、RFC 6265 cookie-pair 構文準拠）と書き込み側（`SetCookie`、構築時検証済みの `Set-Cookie` 専用型）の 2 つの独立した責務を持つ。

## Signature / Usage

```rust
pub const MAX_COOKIE_COUNT: usize = 100;
pub const MAX_COOKIE_STRING_BYTES: usize = 8 * 1024;

pub enum CookieError {
    CookieStringTooLarge,
    TooManyCookies,
    InvalidCookiePair,
    InvalidName,
    InvalidValue,
    InvalidPath,
}

pub fn parse_cookie_header(value: &str) -> Result<Vec<(&str, &str)>, CookieError>;

pub enum SameSite { Strict, Lax, None }

pub struct SetCookie { /* 非公開 */ }
impl SetCookie {
    pub fn new(name: impl Into<String>, value: impl Into<String>) -> Result<Self, CookieError>;
    pub fn http_only(self) -> Self;
    pub fn secure(self) -> Self;
    pub fn same_site(self, same_site: SameSite) -> Self;
    pub fn path(self, path: impl Into<String>) -> Result<Self, CookieError>;
    pub fn max_age(self, seconds: i64) -> Self;
    pub fn to_header_value(&self) -> String;
}
```

```rust
use fandhe_backend_http::cookie::parse_cookie_header;

let pairs = parse_cookie_header("a=1; b=2").unwrap();
assert_eq!(pairs, vec![("a", "1"), ("b", "2")]);
```

```rust
use fandhe_backend_http::cookie::SetCookie;

let cookie = SetCookie::new("session", "abc123").unwrap()
    .path("/").unwrap()
    .max_age(3600)
    .http_only()
    .secure();
assert_eq!(cookie.to_header_value(), "session=abc123; Path=/; Max-Age=3600; Secure; HttpOnly");
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `MAX_COOKIE_COUNT` | `usize` (100) | 単一 `Cookie` ヘッダで許容する cookie-pair 数上限。`RequestHead::cookies` は複数ヘッダに跨る累積値として適用 |
| `MAX_COOKIE_STRING_BYTES` | `usize` (8 KiB) | 単一 `Cookie` ヘッダの最大バイト数。累積値として適用 |
| `SetCookie::new` の `name` | `impl Into<String>` | 非空・RFC 9110 tchar のみ。違反は `InvalidName` |
| `SetCookie::new` の `value` | `impl Into<String>` | RFC 6265 cookie-octet のみ。空値は許可。違反は `InvalidValue` |
| `SetCookie::path` の `path` | `impl Into<String>` | RFC 6265 path-value かつ `/` で始まる必要。違反は `InvalidPath` |
| `SameSite::None` | variant | `SameSite=None`。`same_site(SameSite::None)` は `Secure` を自動付与 |

## Notes

- 読み取り側は不正な cookie-pair を明示スキップせず `InvalidCookiePair` を返す（fail-closed。認証・セッション情報を運ぶことが多いため）
- 読み取り側は % デコードを行わない（無正規化のまま返す契約）
- DQUOTE で囲んだ値は引用符を除去した内側を返す。SP は DQUOTE 内でも cookie-octet ではないため拒否
- pair 前後の OWS（SP/HTAB のみ）は trim するが、`str::trim()` の Unicode 空白全般 trim は使わない（NBSP 等を誤って trim しない）
- `SetCookie::path` は `/` で始まらない値を拒否する。理由: RFC 6265 のクッキーパス抽出アルゴリズムによりユーザーエージェント側でデフォルトパスへフォールバックされ、指定した `Path` が無視される不整合を防ぐため
- `to_header_value` は `Path` → `Max-Age` → `SameSite` → `Secure` → `HttpOnly` の固定順で直列化する
- `Domain` / `Expires` / `Partitioned` 属性は最小サブセット方針によりスコープ外
- セッション ID 等のシークレットには `http_only()` の付与を強く推奨する（XSS 経由の cookie 窃取防止）

## Related

- [request](./request.md)
- [response](./response.md)
