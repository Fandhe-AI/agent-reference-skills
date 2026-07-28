# percent

RFC 3986 percent-encoding の逆変換ヘルパー（opt-in、sans-IO）。`RequestHead::path` / `query` のルーティング照合は生文字列のまま行う契約であり、本モジュールはハンドラが照合確定後に明示的に呼ぶ場合のみデコードする。

## Signature / Usage

```rust
pub enum PercentDecodeError {
    TruncatedEscape { at: usize },
    InvalidHexDigit { at: usize },
    InvalidUtf8,
}

pub fn decode_bytes(input: &[u8]) -> Result<Vec<u8>, PercentDecodeError>;
pub fn decode_str(input: &str) -> Result<String, PercentDecodeError>;
```

```rust
use fandhe_backend_http::percent::decode_str;

assert_eq!(decode_str("%E6%97%A5%E6%9C%AC%E8%AA%9E").unwrap(), "日本語");
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `decode_bytes` | `fn(&[u8]) -> Result<Vec<u8>, PercentDecodeError>` | `%XX` を 1 バイトへ復元。UTF-8 検証なし（`%FF` 等のバイナリ値も `Ok`）。`+` は変換しない |
| `decode_str` | `fn(&str) -> Result<String, PercentDecodeError>` | `decode_bytes` + `String::from_utf8` 厳密検証（lossy 変換なし） |
| `PercentDecodeError::TruncatedEscape { at }` | variant | `%` の直後に 2 桁の hex digit が続く前に入力終端。`at` は `%` の位置 |
| `PercentDecodeError::InvalidHexDigit { at }` | variant | `%` の後続 2 桁のいずれかが hex digit でない |
| `PercentDecodeError::InvalidUtf8` | variant | デコード後のバイト列が UTF-8 として不正（`decode_str` のみ返す） |

## Notes

- 二重デコード禁止: デコード済みの値を再度 `decode_str` / `decode_bytes` に通してはならない（多重エンコードによるフィルタ回避を防ぐ）
- デコード後の再検証はハンドラの責務（`%00`・制御文字・`../` 等が現れうる）
- `+` は空白に変換しない（`application/x-www-form-urlencoded` の意味論は [`form`](./form.md) の責務）
- 不正シーケンスは置換文字（U+FFFD）へ黙殺せず、必ず `Err` として呼び出し元に伝える（フェイルクローズ）
- デコードは 1 パス・再帰なしの `O(n)` で、出力長は常に入力長以下。入力は上流の `MAX_HEADER_BYTES`（16 KiB）で有界なため追加のサイズ上限は設けない

## Related

- [request](./request.md)
- [form](./form.md)
- [query](./query.md)
