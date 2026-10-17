---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/bytea.rs
---

# bytea

`BYTEA` 列型（TABLE-13・TASK-197。関連: WIRE-13・NOSQL-17）向けのテキスト表現（PostgreSQL 既定の `\x` 16 進形式）の解析・出力。`catalog.rs::ColumnType::Bytea`（カタログ往復）・`row_codec.rs::Value::Bytes`（行バイト表現）とは独立に、SQL リテラル（`sql/parser.rs`）と wire のテキスト応答（`wire-server::result_encoder`）が共有する変換のみを持つ（`engine::bytea` として公開）。

## Signature / Usage

```rust,ignore
/// `BYTEA` 列 1 個分のバイト長上限。行バイト表現（`row_codec::Value::Bytes`）の
/// 上限と同値を維持する（片方だけの変更を防ぐため下部の const assert で強制する）。
pub const MAX_BYTEA_FIELD_LEN: u32 = 4 * 1024 * 1024;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ByteaTextError {
    TooLong,
    MissingPrefix,
    OddLength,
    InvalidDigit,
}

/// PostgreSQL `\x` 16 進形式の文字列をバイト列へ解析する（B4）。
pub fn parse_hex_text(s: &str) -> Result<Vec<u8>, ByteaTextError> { /* ... */ }

/// [`parse_hex_text`] の逆変換。`\x` ＋ 小文字 16 進（PostgreSQL の
/// `bytea_output=hex` 既定と同じ表現。B5）。
pub fn format_hex_text(bytes: &[u8]) -> String { /* ... */ }
```

```rust,ignore
assert_eq!(parse_hex_text("\\xdeadbeef").unwrap(), vec![0xde, 0xad, 0xbe, 0xef]);
assert_eq!(format_hex_text(&[0xde, 0xad, 0xbe, 0xef]), "\\xdeadbeef");
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ByteaTextError::TooLong` | variant | 復号後の長さが `MAX_BYTEA_FIELD_LEN` を超える（確保より前に入力長から判定） |
| `ByteaTextError::MissingPrefix` | variant | `\x` / `\X` 接頭辞を持たない |
| `ByteaTextError::OddLength` | variant | 16 進本体の桁数が奇数 |
| `ByteaTextError::InvalidDigit` | variant | 16 進アルファベット外の文字を含む |

## Notes

- 受理: `\x` / `\X` 接頭辞 + 偶数個の 16 進数字（大小文字混在可）。`\x` のみ（本体 0 桁）は空バイト列として受理。拒否: 接頭辞なし・奇数桁・非 16 進文字・空白混在・escape 形式。PostgreSQL の `\x` 形式の最小部分集合で、曖昧さを避ける fail-closed な実装既定値。
- 出力 `format_hex_text` は常に `\x` + 小文字 16 進。
- untrusted 入力のため、確保（`Vec::with_capacity`）より前に入力長から上限超過を判定する（入力長が `2 * MAX + 2` 超なら `TooLong`）。エラーは値を含めず種別のみ。
- `MAX_BYTEA_FIELD_LEN` は `row_codec::MAX_TEXT_FIELD_LEN` と const assert で同値を強制している。

## Related

- [row_codec](./row-codec.md)
- [catalog](./catalog.md)
- [uuid](./uuid.md)
