---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/numeric.rs
---

# numeric

`NUMERIC(p, s)` 列型の内部表現・パース・整形（TABLE-13〔検討中〕・TASK-197、Issue #885）。十進固定小数を `unscaled × 10^-scale`（`i128` の符号付き整数 `unscaled` と `u8` の `scale`）で表現する自作実装で、外部クレートに依存しない。列の `scale` は行には持たずカタログの列型のみが正（ADR: `docs/design/column-type-extension.md`「#885 追記」節）。

## Signature / Usage

```rust,ignore
/// `NUMERIC` 列が宣言できる最大精度（全体桁数）。10^38 − 1 は `i128::MAX`（約 1.7 × 10^38）未満のため、
/// 38 桁までの `unscaled` は必ず `i128` へ収まる。
pub const MAX_PRECISION: u8 = 38;
pub const MAX_LITERAL_LEN: usize = 1024;

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum NumericError {
    /// 文法違反（空・符号のみ・複数の `.`・桁の無い指数・非数字・長さ超過等）。
    Malformed(String),
    /// 列の `NUMERIC(p, s)` に対して桁あふれ（丸め後の整数部が `p - s` 桁を超える）。
    OutOfRange,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub struct Decimal { unscaled: i128, scale: u8 }

impl Decimal {
    pub fn from_parts(unscaled: i128, scale: u8) -> Result<Self, NumericError>;
    pub fn unscaled(&self) -> i128;
    pub fn scale(&self) -> u8;
    pub fn fits_precision(&self, precision: u8) -> bool;
}

pub fn cmp_exact(a: &Decimal, b: &Decimal) -> std::cmp::Ordering;

/// `NUMERIC(precision, scale)` 列向けにリテラル文字列を解析し、束縛値 `Decimal` を返す（D4・D5）。
pub fn parse_for_column(text: &str, precision: u8, scale: u8) -> Result<Decimal, NumericError>;

/// 範囲比較リテラル用。列の `scale` に丸めず、リテラル自身の小数桁数を `scale` とする。
pub fn parse_literal_exact(text: &str) -> Result<Decimal, NumericError>;
```

```rust,ignore
// 999.995 を NUMERIC(5, 2) へ束縛すると丸め後 1000.00 が桁あふれ（D4: 22003）
let r = parse_for_column("999.995", 5, 2); // Err(NumericError::OutOfRange)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `precision` | `u8` | 全体桁数。最大 `MAX_PRECISION`（38） |
| `scale` | `u8` | 小数桁数。`Decimal::from_parts` は `scale > MAX_PRECISION` を `OutOfRange` で拒否（丸めない） |
| `NumericError::Malformed` | variant | 文法違反。`row_codec` / `sql::parser` が `wire_code` `22000` へ写像 |
| `NumericError::OutOfRange` | variant | 桁あふれ。`22003` へ写像 |

## Notes

- `MAX_PRECISION` の upstream doc comment（numeric.rs:13）は「`i128::MAX` は 10^38 未満」と大小を逆に書いている。正しい関係は同じファイル 65 行目のとおり（10^38 − 1 < `i128::MAX` ≈ 1.7 × 10^38）。上記コードブロックのコメントは訂正済み。
- リテラル文法: `[+-]?(digits)?(\.digits?)?([eE][+-]?digits)?`。整数部・小数部の少なくとも一方に 1 桁以上必要。空白・`NaN` / `Infinity`・複数の `.`・指数部の小数・桁の無い指数は拒否。指数部は Issue #1358 で受理。走査前に長さ（1024 バイト以下）・ASCII を検査する。
- 指数は小数点位置のシフトとして扱い、シフト後の値に対して丸め（half away from zero、D4）と桁検査を行う。極端に大きな負の指数は 0 へ丸まり、非ゼロ仮数の極端に大きな正の指数は `OutOfRange`（指数は絶対値 4096 で頭打ち）。
- `parse_literal_exact` の `scale` は `max(0, 小数部の桁数 - 指数)`（`1e-3` は scale 3、`1.5e3` は scale 0）。これが 38 を超える、または整数部が 38 桁に収まらない場合は `OutOfRange`。
- `cmp_exact` は丸めず正確に比較する: 整数部（`div_euclid`）を先に比較し、一致した場合のみ小数部を大きい方の `scale` へ揃えて比較する（`declarative_filter::MetadataFilter::matches` の `NUMERIC` 列比較述語から呼ばれる）。
- `Decimal` の `Display` は正規テキスト表現: 符号・整数部・（`scale > 0` のときのみ）`.` とちょうど `scale` 桁にゼロ埋めした小数部。先頭ゼロ・指数表記・`-0` を持たない（wire の DataRow テキスト・HTTP JSON number 化で共有）。
- `Decimal` を独立に持ち回る場面（束縛・投影・RETURNING・wire 出力）では常に列の `scale` と対にして扱う契約。`-0` は正規化される（`unscaled == 0` のとき符号は常に非負）。
- `rescale_bounds_for_column`（二次索引の `NUMERIC` 範囲比較）と `avg_unscaled`（`AVG(NUMERIC(p,s))` の長除算、half away from zero）は `pub(crate)`。

## Related

- [row_codec](./row-codec.md)
- [catalog](./catalog.md)
- [scalar_float](./scalar-float.md)
