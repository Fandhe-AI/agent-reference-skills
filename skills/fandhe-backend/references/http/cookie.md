# cookie

Cookie 関連ヘルパー。読み取り側（`parse_cookie_header`、RFC 6265 cookie-pair 構文準拠）と書き込み側（`SetCookie`、構築時検証済みの `Set-Cookie` 専用型）の 2 つの独立した責務を持つ。

## Signature / Usage

```rust
pub const MAX_COOKIE_COUNT: usize = 100;
pub const MAX_COOKIE_STRING_BYTES: usize = 8 * 1024;

#[non_exhaustive]
pub enum CookieError {
    CookieStringTooLarge,
    TooManyCookies,
    InvalidCookiePair,
    InvalidName,
    InvalidValue,
    InvalidPath,
    ReservedPrefix,
    PrefixMismatch,
    HostPrefixPath,
    SessionSameSiteNone,
}

pub fn parse_cookie_header(value: &str) -> Result<Vec<(&str, &str)>, CookieError>;

pub enum SameSite { Strict, Lax, None }

#[derive(Default)]
pub enum SessionSameSite { #[default] Lax, Strict }
impl From<SessionSameSite> for SameSite;
impl TryFrom<SameSite> for SessionSameSite { type Error = CookieError; }

pub struct SetCookie { /* 非公開 */ }
impl SetCookie {
    pub fn new(name: impl Into<String>, value: impl Into<String>) -> Result<Self, CookieError>;
    pub fn host_prefixed(name: impl Into<String>, value: impl Into<String>) -> Result<Self, CookieError>;
    pub fn secure_prefixed(name: impl Into<String>, value: impl Into<String>) -> Result<Self, CookieError>;
    pub fn session(name: impl Into<String>, value: impl Into<String>) -> Result<Self, CookieError>;
    pub fn session_with(name: impl Into<String>, value: impl Into<String>, same_site: SessionSameSite) -> Result<Self, CookieError>;
    pub fn session_removal(name: impl Into<String>) -> Result<Self, CookieError>;
    pub fn session_removal_with(name: impl Into<String>, same_site: SessionSameSite) -> Result<Self, CookieError>;
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

```rust
use fandhe_backend_http::cookie::SetCookie;

assert_eq!(
    SetCookie::session("sid", "abc").unwrap().to_header_value(),
    "sid=abc; Path=/; SameSite=Lax; Secure; HttpOnly"
);
let cookie = SetCookie::host_prefixed("__Host-sid", "abc").unwrap().http_only();
assert_eq!(cookie.to_header_value(), "__Host-sid=abc; Path=/; Secure; HttpOnly");
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
| `SetCookie::new` の接頭辞 | — | `__Host-` / `__Secure-` で始まる名前（ASCII 大文字小文字無視）は `ReservedPrefix` で拒否 |
| `SetCookie::host_prefixed` | `(name, value)` | `__Host-` 名専用。`Secure` と `Path=/` を自動付与。接頭辞が合わなければ `PrefixMismatch`。以後の `path` は `/` のみ許可（他は `HostPrefixPath`） |
| `SetCookie::secure_prefixed` | `(name, value)` | `__Secure-` 名専用。`Secure` を自動付与。接頭辞が合わなければ（`__Host-` 名も含む）`PrefixMismatch` |
| `SetCookie::session` / `session_with` | `(name, value[, SessionSameSite])` | `HttpOnly`・`Secure`・`SameSite=Lax`（既定）・`Path=/` を付与。`Max-Age` なし。`__Host-` / `__Secure-` 名も受け付ける |
| `SetCookie::session_removal` / `session_removal_with` | `(name[, SessionSameSite])` | 発行用と同じ属性に `Max-Age=0` を加え値は空。`path` を変えて発行した場合は削除用にも同じ `path` を付ける |
| `SessionSameSite` | enum | `Lax`（既定）/ `Strict` のみ。`TryFrom<SameSite>` は `None` を `SessionSameSiteNone` で拒否 |

## Notes

- 読み取り側は不正な cookie-pair を明示スキップせず `InvalidCookiePair` を返す（fail-closed。認証・セッション情報を運ぶことが多いため）
- 読み取り側は % デコードを行わない（無正規化のまま返す契約）
- DQUOTE で囲んだ値は引用符を除去した内側を返す。SP は DQUOTE 内でも cookie-octet ではないため拒否
- pair 前後の OWS（SP/HTAB のみ）は trim するが、`str::trim()` の Unicode 空白全般 trim は使わない（NBSP 等を誤って trim しない）
- `SetCookie::path` は `/` で始まらない値を拒否する。理由: RFC 6265 のクッキーパス抽出アルゴリズムによりユーザーエージェント側でデフォルトパスへフォールバックされ、指定した `Path` が無視される不整合を防ぐため
- `to_header_value` は `Path` → `Max-Age` → `SameSite` → `Secure` → `HttpOnly` の固定順で直列化する
- `Domain` / `Expires` / `Partitioned` 属性は最小サブセット方針によりスコープ外
- `CookieError` は `#[non_exhaustive]`。外部からの `match` には `_ =>` アームが必要
- 読み取り側は受信した cookie 名の `__Host-` / `__Secure-` 接頭辞を検証しない（信頼判断は呼び出し元の責務）。書き込み側は構築時に強制する
- `session` 系は後から汎用の `same_site(SameSite::None)` で opt-out できる（型による排除は入口のみ）。TLS はリバースプロキシで終端する前提（`Secure` は外せない）
- Migration (v0.4.2 → v0.5.0): 接頭辞付きの名前は `host_prefixed` / `secure_prefixed` で作る（`SetCookie::new` は `ReservedPrefix` で拒否する）。`CookieError` を網羅 match している場合は `_ =>` アームを足す
- セッション ID 等のシークレットには `http_only()` の付与を強く推奨する（XSS 経由の cookie 窃取防止）

## Related

- [request](./request.md)
- [response](./response.md)
