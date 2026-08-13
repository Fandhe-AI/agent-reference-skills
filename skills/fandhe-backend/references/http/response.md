# response

HTTP/1.1 レスポンス直列化。コアの接続ループが唯一の呼び出し元。`Response` は任意のヘッダ名・値を外部から受け取る API を意図的に持たず、CRLF を含む文字列がヘッダとして書き出される経路を型レベルで排除する（レスポンス分割対策）。

## Signature / Usage

```rust
pub struct Response {
    pub status: u16,
    pub body: Vec<u8>,
    // content_type, allow, extra_headers（非公開）
}

impl Response {
    pub fn new(status: u16, body: Vec<u8>) -> Self;
    pub fn empty(status: u16) -> Self;
    pub fn with_content_type(self, content_type: &'static str) -> Self;
    pub fn with_allow(self, allow: AllowedMethods) -> Self;
    pub fn with_header(self, name: impl Into<String>, value: impl Into<String>) -> Result<Self, HeaderError>;
    pub fn header(&self, name: &str) -> Option<&str>;
    pub fn with_set_cookie(self, cookie: crate::cookie::SetCookie) -> Self;
    pub fn redirect(status: u16, location: impl Into<String>) -> Result<Self, RedirectError>;
    pub fn serialize(&self, keep_alive: bool) -> Vec<u8>;
    pub fn serialize_into(&self, keep_alive: bool, out: &mut Vec<u8>);
    pub fn is_bodyless_status(status: u16) -> bool;
    pub fn serialize_chunked_head(&self, keep_alive: bool) -> Vec<u8>;
    pub fn serialize_streaming_head_http10(&self) -> Vec<u8>;
}

pub struct AllowedMethods { /* 非公開 */ }
impl AllowedMethods {
    pub fn from_methods(methods: impl IntoIterator<Item = String>) -> Option<Self>;
    pub fn to_header_value(&self) -> String;
}

pub enum HeaderError { InvalidName, InvalidValue, ReservedName }
pub enum RedirectError { UnsupportedStatus, EmptyLocation, InvalidLocation(HeaderError) }
```

```rust
use fandhe_backend_http::response::Response;

let res = Response::new(200, b"hi".to_vec());
let bytes = res.serialize(true);
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `Response::status` | `u16` | HTTP ステータスコード |
| `Response::body` | `Vec<u8>` | レスポンスボディの生バイト列 |
| `with_content_type` 引数 | `&'static str` | 呼び出し元がソースコード上に静的に書いた文字列のみ渡せる（型レベル制約） |
| `with_allow` 引数 | `AllowedMethods` | 構築時検証済み専用型のみ受理 |
| `with_header` 引数 | `impl Into<String>` × 2 | 検証付き（tchar 名前・CR/LF/NUL 拒否値）。`Content-Length` / `Connection` / `Transfer-Encoding` は上書き不可（`ReservedName`） |
| `with_set_cookie` 引数 | `crate::cookie::SetCookie` | 構築時検証済みのため infallible |
| `redirect` の `status` | `u16` | 301 / 302 / 303 / 307 / 308 のみ許容 |

## Notes

- ヘッダ送出経路は 4 つのみ: `with_content_type`（`&'static str` 限定）・`with_allow` / `with_set_cookie`（構築時検証済み専用型）・`with_header`（構築時検証 + `Result`）
- `with_header` は同名ヘッダを上書きせず追記する（`Set-Cookie` のような複数値ヘッダに対応）
- 専用フィールド（`Content-Type` / `Allow`）が設定済みの場合、同名の `with_header` 呼び出しは直列化時にスキップされ専用フィールドが優先される
- ヘッダ出力順: status line → `Content-Type` → `Allow` → `with_header` 追加ヘッダ（挿入順）→ `Content-Length` → `Connection`（必要時）→ 空行 → body
- `serialize` と `serialize_chunked_head` は経路が完全分離しており、`Content-Length` と `Transfer-Encoding: chunked` が同一応答に共存することは構造的に存在しない
- `serialize_into`（v0.4.0 追加、issue #584）は `serialize` と同じ直列化結果を呼び出し元が渡した `out: &mut Vec<u8>` の末尾に追記する。中間 `Vec<u8>` の確保・返却を避け、呼び出し元が保持するバッファへ直接書き込みたい場合に使う
- `is_bodyless_status`（1xx・204・304）に該当する場合、`serialize_chunked_head` は `Transfer-Encoding` 自体を出力しない（RFC 9112 §6.3、レスポンス分割防止）
- `redirect` はワイヤフォーマット上の妥当性のみ検証し、オープンリダイレクト対策（許可リスト検証等）は呼び出し元の責務
- reason phrase は固定テーブルから引く。未知のコードは空文字列（reason phrase 省略）

## Related

- [request](./request.md)
- [cookie](./cookie.md)
- [chunked](./chunked.md)
- [error](./error.md)
