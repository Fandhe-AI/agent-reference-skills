---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/json.rs
---

# json (最小 JSON パーサ)

`engine::json`（0.2.0 で追加）。依存なしの最小 RFC 8259 JSON パーサと、`JSON` / `JSONB` 列向けの検証・正規化、パス参照 API。untrusted テキストを `JsonValue` へパースするまでが責務で、意味的検証は呼び出し元が行う。

## Signature / Usage

```rust,ignore
pub const MAX_JSON_DEPTH: usize = 16;
pub const MAX_JSON_STRING_CHARS: usize = 1024 * 1024;
pub const MAX_JSON_CONTAINER_ITEMS: usize = 65_536;

pub struct JsonError;

pub enum JsonValue {
    Null,
    Bool(bool),
    Number(JsonNumber),
    String(String),
    Array(Vec<JsonValue>),
    Object(BTreeMap<String, JsonValue>),
}

pub enum JsonNumber {
    PosInt(u64),
    NegInt(i64),
    Float { value: f64, text: Box<str> },
}

pub fn parse_json(s: &str) -> Result<JsonValue, JsonError>;
```

## Options / Props

| Item | Signature | Description |
|------|-----------|-------------|
| `parse_json` | `fn(&str) -> Result<JsonValue, JsonError>` | 全体を単一の JSON 値としてパース。末尾に余分な非空白文字があれば拒否 |
| `parse_f32_text` | `fn(&str) -> Result<f32, ParseFloatError>` | `str::parse::<f32>` の単一丸め。`JsonNumber::as_f32` と SQL ベクトルリテラルが共有する唯一の変換経路 |
| `JsonNumber::as_f64` | `fn(&self) -> f64` | 全 variant を `f64` へ。`NegInt(0)` は `-0.0` へ復元 |
| `JsonNumber::as_exact_u64` | `fn(&self) -> Option<u64>` | `PosInt` のときのみ `Some` |
| `JsonNumber::as_f32` | `fn(&self) -> Option<f32>` | 全 variant を `f32` へ。`Float` は `text` から直接変換（`f64` 経由の 2 回丸めを避ける）。非有限・パース不能は `None` |
| `validate_json_column_text` | `fn(&str) -> Result<(), JsonColumnError>` | `JSON` 列向け。長さを `parse_json` の前に判定してから構文検証 |
| `canonicalize_jsonb_text` | `fn(&str) -> Result<String, JsonColumnError>` | `JSONB` 列向け。検証後に `write_canonical` で再シリアライズ（キー昇順・空白なし）。正規化後の長さも再判定 |
| `write_canonical` | `fn(&JsonValue, &mut String)` | 唯一の正規化シリアライザ |
| `MAX_JSON_FIELD_LEN` | `usize` | `JSON` / `JSONB` 列 1 件の最大バイト長（`row_codec::MAX_SCALAR_PAYLOAD_LEN - row_codec::SCALAR_TEXT_ENTRY_OVERHEAD`） |
| `JsonColumnError` | `enum { TooLong, Invalid }` | `TooLong` は `ErrorClass::PayloadTooLarge`、`Invalid` は `ErrorClass::InvalidTextRepresentation` |
| `JsonPathStep` | `enum { Key(String), Index(usize) }` | パスの 1 段 |
| `JsonPath::new` | `fn(Vec<JsonPathStep>) -> Result<JsonPath, JsonPathError>` | ステップ数が `MAX_JSON_DEPTH` 超なら `Err` |
| `JsonPath::steps` | `fn(&self) -> &[JsonPathStep]` | ステップ参照 |
| `extract_path` | `fn<'a>(&'a JsonValue, &JsonPath) -> Option<&'a JsonValue>` | キー不在・型不一致・範囲外は `None` |
| `extract_path_text` | `fn(&str, &JsonPath) -> Result<Option<String>, JsonColumnError>` | 格納テキストをパースしパス先を正規化テキストで返す |

`JsonError` / `JsonColumnError` / `JsonPathError` は `wire_code()` を持ち `ClassifiedError` を実装する。

## Notes

- 失敗は常に不透明な `JsonError` 単一型（バイト位置等を外部へ漏らさない fail-closed）。`wire_code()` は `42601`（`UnsupportedSqlSyntax`）、`client_message` は `"invalid JSON"`。
- 拒否対象: オブジェクトの重複キー、非 RFC 8259 数値（先頭ゼロ、`1.` / `1e` / `1e+` 等の数字欠落、数値リテラル 64 バイト超）、深さ・件数・文字数上限超過、孤立サロゲート、生の制御文字。
- `JsonValue::Object` は `BTreeMap` のためキー反復順はキー文字列の昇順で決定的。
- 整数リテラル（小数点・指数部なし）は `u64` / `i64` で無損失保持し、範囲外のみ `Float` へ縮退する。
- `JsonColumnError` の `wire_code` は原文コメントで `22P02`（Issue #1187 で `42601` から変更）と `54000` へ写像すると記載。上記 `ErrorClass` の具体 SQLSTATE 値は `error_format` 側の定義による（本ページ原本では未確認）。
- `canonical_equality_text` は `pub(crate)` で公開 API ではない（UNIQUE 制約用の値等価正規化）。
- 仕様 ID（TABLE-14・NOSQL-8 等）は private spec のため詳細は非公開で未記載。

## Related

- [error-format](./error-format.md)
- [lib](./lib.md)
- [migration-0-2](./migration-0-2.md)
