# request

HTTP/1.1 リクエストライン・ヘッダの sans-IO パーサー。`parse_request_head` はソケット I/O を一切持たない純関数（`&[u8]` → 構造体）。body の読み取り・keep-alive 判定・`Content-Length` / `Transfer-Encoding` の意味解釈は責務外（[`body`](./body.md) が担う）。

## Signature / Usage

```rust
pub const MAX_HEADER_BYTES: usize = 16 * 1024;
pub const MAX_HEADER_COUNT: usize = 100;

pub enum HttpVersion {
    Http10,
    Http11,
}

pub struct RequestHead {
    pub method: String,
    pub target: String,
    pub version: HttpVersion,
    // headers: Vec<(String, String)>（非公開）
}

impl RequestHead {
    pub fn header(&self, name: &str) -> Option<&str>;
    pub fn headers(&self) -> impl Iterator<Item = (&str, &str)>;
    pub fn path(&self) -> &str;
    pub fn query(&self) -> Option<&str>;
    pub fn cookies(&self) -> Result<Vec<(&str, &str)>, crate::cookie::CookieError>;
}

pub enum ParseOutcome {
    Complete { head: RequestHead, consumed: usize },
    Incomplete,
}

pub enum ParseError {
    HeaderSectionTooLarge,
    TooManyHeaders,
    InvalidRequestLine,
    UnsupportedVersion,
    InvalidHeader,
}

pub fn parse_request_head(buf: &[u8]) -> Result<ParseOutcome, ParseError>;
```

```rust
use fandhe_backend_http::request::parse_request_head;

let buf = b"GET / HTTP/1.1\r\nHost: example.com\r\n\r\n";
let outcome = parse_request_head(buf).unwrap();
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `MAX_HEADER_BYTES` | `usize` (16 KiB) | リクエストヘッド（リクエストライン + ヘッダ + 空行）の許容バイト数上限。超過は `ParseError::HeaderSectionTooLarge` |
| `MAX_HEADER_COUNT` | `usize` (100) | 1 リクエストで許容するヘッダ本数上限。超過は `ParseError::TooManyHeaders` |
| `RequestHead::method` | `String` | RFC 9110 tchar のみで構成される token として検証済み |
| `RequestHead::target` | `String` | SP・制御文字を含まないことを検証済み（無正規化・非デコード） |
| `RequestHead::version` | `HttpVersion` | `Http10` / `Http11` のみ受理 |

## Notes

- `HttpVersion::Http10` / `Http11` 以外（HTTP/0.9・HTTP/2 等）は `ParseError::UnsupportedVersion` として拒否する
- 行終端は `\r\n` のみ受理（bare LF・bare CR は拒否）。継続行（obs-fold）も拒否する
- `RequestHead::header` は同名ヘッダが複数存在する場合は最初の 1 件のみ返す。全件走査は `headers()` を使う
- `path()` / `query()` は `?` の 1 点のみで分離し、% デコード・末尾スラッシュ正規化等は一切行わない（ルート照合とのデコード差異による正規化バイパスを防ぐ契約）
- `cookies()` は複数 `Cookie` ヘッダを `"; "` 結合と等価に扱い、[`cookie::MAX_COOKIE_COUNT`](./cookie.md) / [`cookie::MAX_COOKIE_STRING_BYTES`](./cookie.md) の累積上限を適用する（ヘッダ分割による迂回防止）
- `is_tchar` は `response::AllowedMethods` と判定基準を共有する（`pub(crate)`）

## Related

- [body](./body.md)
- [cookie](./cookie.md)
- [query](./query.md)
- [connection](./connection.md)
