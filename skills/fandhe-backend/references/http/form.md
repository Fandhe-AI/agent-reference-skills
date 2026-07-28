# form

`application/x-www-form-urlencoded` ボディパーサー（sans-IO）。[`query`](./query.md)（`&`/`=` 分解）・[`percent`](./percent.md)（percent-decode）の既存 sans-IO 純関数を合成して提供する。

## Signature / Usage

```rust
pub const MAX_FORM_BYTES: usize = MAX_QUERY_BYTES; // 8 KiB
pub const MAX_FORM_PAIRS: usize = MAX_QUERY_PAIRS; // 256

pub enum FormError {
    BodyTooLong,
    TooManyPairs,
    InvalidUtf8Body,
    Decode(PercentDecodeError),
}

pub fn parse_form(body: &[u8]) -> Result<Vec<(String, String)>, FormError>;
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

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `MAX_FORM_BYTES` | `usize` (8 KiB) | `MAX_QUERY_BYTES` と同値固定。超過は `BodyTooLong` |
| `MAX_FORM_PAIRS` | `usize` (256) | `MAX_QUERY_PAIRS` と同値固定。超過は `TooManyPairs` |
| `parse_form` の `body` | `&[u8]` | 生ボディ。呼び出し元が `is_form_content_type` で Content-Type を確認した後にのみ渡す想定 |

## Notes

- 処理順: `body.len() > MAX_FORM_BYTES` 検査 → UTF-8 検証 → `parse_query` で `&`/`=` 分解 → 各 key/value に `+` → 空白 → percent-decode を適用（WHATWG URL パーサ準拠）
- `+` → 半角スペース置換は percent-decode より**先**に適用する不変条件（逆順だと `%2B` が誤って空白化される）
- 二重デコード禁止: 返した `Vec<(String, String)>` の値を再度デコードに通してはならない（多重エンコードによるフィルタ回避防止、OWASP A03）。デコード後の再検証は呼び出し元の責務
- `is_form_content_type` は media-type 部分（最初の `;` より前）を OWS trim + 大小文字無視で厳密一致比較する。前置一致（`application/x-www-form-urlencoded-extra`）や別 media type は `false`
- 上限は `query` の対応する上限と同値で固定されており、`parse_query` への委譲で判定が食い違わない

## Related

- [query](./query.md)
- [percent](./percent.md)
