---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/scalar_float.rs
---

# scalar_float

`REAL` / `DOUBLE PRECISION` 列型（TABLE-13・TASK-196）の値表現に閉じた解析・整形・順序規約を集約するモジュール。SQL 表層（`sql::allowlist`・`sql::parser`）がリテラルを `parse_real` / `parse_double` で値へ束縛し、投影・wire 応答（`sql::exec`・wire-server）が `format_real` / `format_double` でテキストへ戻す。`row_codec` の encode / decode は本モジュールの値表現（正規化済みの有限値）を前提とする。

## Signature / Usage

```rust,ignore
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum ParseFloatError {
    /// 閉じた文法（`^-?[0-9]+(\.[0-9]+)?([eE][+-]?[0-9]+)?$`）に適合しない入力（SQL 表層では `22P02`）。
    Malformed,
    /// 非有限化（オーバーフロー）・非ゼロ入力のアンダーフロー。
    OutOfRange,
}

pub fn parse_real(input: &str) -> Result<f32, ParseFloatError>;
pub fn parse_double(input: &str) -> Result<f64, ParseFloatError>;
pub fn parse_real_text(input: &str) -> Result<f32, ParseFloatError>;

pub fn canonicalize_real(value: f32) -> f32;
pub fn canonicalize_double(value: f64) -> f64;

pub fn format_real(value: f32) -> String;
pub fn format_double(value: f64) -> String;

pub fn cmp_real(a: f32, b: f32) -> Ordering;
pub fn cmp_double(a: f64, b: f64) -> Ordering;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ParseFloatError::Malformed` | variant | 文法違反（`inf` / `nan` / `infinity` / `1.` / `.5` 等を含む） |
| `ParseFloatError::OutOfRange` | variant | 非有限化・非ゼロ入力のアンダーフロー（`0e5` は 0 であり対象外） |

## Notes

- 非有限値（NaN・±∞）は受け付けない（fail-closed）。`-0.0` は `+0.0` へ正規化（符号付きゼロは保持しない。F4）。
- `parse_real` / `parse_double` の手順: 文法検証 → `f32::from_str` / `f64::from_str` → 非有限・非ゼロアンダーフローの拒否 → `-0.0` 正規化。`f32` / `f64` は互いを経由せず直接その型の `FromStr` で解析する（二重丸め防止）。
- 指数表記リテラル（`1.5e3`）は Issue #1187 で受理（PostgreSQL と整合）。`parse_real_text` の doc comment には「SQL リテラルの束縛は引き続き指数表記を受理しない `parse_real` を使う」との旧記述が残るが、モジュール doc・`parse_real` の文法検査（`is_well_formed_literal`）は指数表記を受理しており、モジュール doc の記述を正とする。
- `parse_real_text` は `format_real` の出力（指数表記を含む）を受理する `REAL` 解析で、`COPY FROM` が `COPY TO` の出力を再投入する往復契約（WIRE-17）のために使う。
- `format_double` は PostgreSQL の float8 出力（最短往復桁・十進指数 `-4 <= e < 15` なら固定小数、それ以外は `1e+20` 形式。Issue #1343・WIRE-13）、`format_real` は float4 出力（`-4 <= e < 6`、`1e+06` 形式。Issue #1173）に揃える。`0.1f32` は `0.1`（f64 へ拡張した `0.10000000149011612` ではない）。特殊値は `NaN` / `Infinity` / `-Infinity` / `-0`。
- 比較・ソートは `cmp_real` / `cmp_double` が唯一の情報源（`a == b` のとき `Equal`、それ以外は `total_cmp`。`-0.0 == +0.0` を保つ）。`NULL` の並び位置は呼び出し側の責務。
- 対象外（原文の申し送り）: 文字列リテラルからの暗黙変換は後続 Issue の担当。
- 関連 ADR: `docs/design/float-column-types.md`（本ページでは未転記）。

## Related

- [row_codec](./row-codec.md)
- [column_rewrite](./column-rewrite.md)
- [numeric](./numeric.md)
