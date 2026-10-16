# form

`application/x-www-form-urlencoded` ボディパーサー（sans-IO）。[`query`](./query.md)（`&`/`=` 分解）・[`percent`](./percent.md)（percent-decode）の既存 sans-IO 純関数を合成して提供する。

## Signature / Usage

```rust
pub const MAX_FORM_BYTES: usize = 8 * 1024; // 既定値
pub const MAX_FORM_PAIRS: usize = 256;      // 既定値

pub struct FormLimits { /* 非公開 */ }
impl FormLimits {
    pub const DEFAULT: FormLimits; // MAX_FORM_BYTES / MAX_FORM_PAIRS
    pub const fn with_max_bytes(self, max_bytes: usize) -> Self;
    pub const fn with_max_pairs(self, max_pairs: usize) -> Self;
    pub const fn max_bytes(&self) -> usize;
    pub const fn max_pairs(&self) -> usize;
}
impl Default for FormLimits; // DEFAULT

pub enum FormError {
    BodyTooLong,
    TooManyPairs,
    InvalidUtf8Body,
    Decode(PercentDecodeError),
}

impl IntoResponse for FormError;
impl From<FormError> for HttpError;

pub fn parse_form(body: &[u8]) -> Result<Vec<(String, String)>, FormError>;
pub fn parse_form_with_limit(body: &[u8], limits: FormLimits) -> Result<Vec<(String, String)>, FormError>;
pub fn is_form_content_type(content_type: &str) -> bool;
```

```rust
use fandhe_backend_http::form::{is_form_content_type, parse_form};

assert!(is_form_content_type("application/x-www-form-urlencoded; charset=UTF-8"));
let pairs = parse_form(b"title=Buy+milk&done=false").unwrap();
assert_eq!(
    pairs,
    vec![
        ("title".to_string(), "Buy milk".to_string()),
        ("done".to_string(), "false".to_string()),
    ]
);
```

```rust
use fandhe_backend_http::form::{parse_form_with_limit, FormError, FormLimits};

let small = FormLimits::DEFAULT.with_max_pairs(1);
assert_eq!(
    parse_form_with_limit(b"a=1&b=2", small).unwrap_err(),
    FormError::TooManyPairs
);
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `MAX_FORM_BYTES` | `usize` (8 KiB) | 既定値（`FormLimits::DEFAULT`）。クエリ上限とは独立した定数（現時点では同値）。超過は `BodyTooLong` |
| `MAX_FORM_PAIRS` | `usize` (256) | 既定値（`FormLimits::DEFAULT`）。クエリ上限とは独立した定数（現時点では同値）。超過は `TooManyPairs` |
| `parse_form_with_limit` の `limits` | `FormLimits` | 上限（バイト数・組数）を呼び出し側が指定。処理順・fail-closed は `parse_form` と同一 |
| `parse_form` の `body` | `&[u8]` | 生ボディ。呼び出し元が `is_form_content_type` で Content-Type を確認した後にのみ渡す想定 |

## Notes

- 処理順: `body.len() > MAX_FORM_BYTES` 検査 → UTF-8 検証 → `parse_query` で `&`/`=` 分解 → 各 key/value に `+` → 空白 → percent-decode を適用（WHATWG URL パーサ準拠）
- `+` → 半角スペース置換は percent-decode より**先**に適用する不変条件（逆順だと `%2B` が誤って空白化される）
- 二重デコード禁止: 返した `Vec<(String, String)>` の値を再度デコードに通してはならない（多重エンコードによるフィルタ回避防止、OWASP A03）。デコード後の再検証は呼び出し元の責務
- `is_form_content_type` は media-type 部分（最初の `;` より前）を OWS trim + 大小文字無視で厳密一致比較する。前置一致（`application/x-www-form-urlencoded-extra`）や別 media type は `false`
- v0.5.0（#831）: 上限は `FormLimits` + `parse_form_with_limit` で指定できる。既定値と `parse_form` の挙動は変わらない。クエリ上限とは独立で、内部では上限引数版のクエリ分解へ委譲するため二重判定で食い違わない
- `parse_form_with_limit` の実効上限は本文層の `MAX_BODY_BYTES`（既定 1 MiB、`Server::max_body_bytes` で変更可）でも上から抑えられる。大きな上限は解析コスト増につながる。上限 0 は空ボディのみ受理する
- `FormError` は `IntoResponse` と `From<FormError> for HttpError` を実装（v0.5.0）。`BodyTooLong`（`form body too large`）・`TooManyPairs`（`too many form fields`）は 413、`InvalidUtf8Body`（`form body is not valid UTF-8`）・`Decode(_)`（`invalid form encoding`）は 400。固定メッセージのみで、位置情報・ボディ内容は応答に含めない。`Result<Response, HttpError>` を返すハンドラで `parse_form(body)?` と書ける

## Related

- [query](./query.md)
- [percent](./percent.md)
