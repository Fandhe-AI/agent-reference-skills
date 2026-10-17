---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/datetime.rs
---

# datetime

`DATE` / `TIMESTAMP` 列型（TABLE-13・TASK-197、Issue #884）のリテラル解析・内部表現変換・投影テキスト整形を集約する単一情報源。`catalog`（列型宣言）・`row_codec`（行バイト表現）・`sql::parser`（リテラル束縛）・`sql::exec` / `result_encoder`（投影テキスト整形）はすべてここへ委譲する。値は内部表現（`DATE` は 1970-01-01 起点の日数 `i32`、`TIMESTAMP` はマイクロ秒精度の同起点 `i64`。いずれもタイムゾーンを持たない naive 値）で扱う。

## Signature / Usage

```rust,ignore
pub const DATE_MIN_DAYS: i32 = -719_162;   // 0001-01-01
pub const DATE_MAX_DAYS: i32 = 2_932_896;  // 9999-12-31
pub const TIMESTAMP_MIN_MICROS: i64 = DATE_MIN_DAYS as i64 * MICROS_PER_DAY;
pub const TIMESTAMP_MAX_MICROS: i64 = DATE_MAX_DAYS as i64 * MICROS_PER_DAY + (MICROS_PER_DAY - 1);
pub const MAX_DATETIME_LITERAL_LEN: usize = 40;

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum DateTimeLiteralError {
    Format(String),
    Overflow(String),
}

pub fn validate_date_days(days: i32) -> bool;
pub fn validate_timestamp_micros(micros: i64) -> bool;

/// `DATE` リテラル（`YYYY-MM-DD`）を解析し、1970-01-01 起点の日数（`i32`）へ変換する。
pub fn parse_date(s: &str) -> Result<i32, DateTimeLiteralError>;

/// `TIMESTAMP` リテラル（`<DATE 部><区切り>HH:MM:SS[.f{1,6}]`）を解析し、
/// 1970-01-01 00:00:00 起点のマイクロ秒（`i64`）へ変換する。区切りは半角空白
/// または `T` の 1 文字のみを受理する（D-4・D-5）。
pub fn parse_timestamp(s: &str) -> Result<i64, DateTimeLiteralError>;

pub fn format_date(days: i32) -> String;
pub fn format_timestamp(micros: i64) -> String;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `DateTimeLiteralError::Format` | variant | 閉じた文法に一致しない（区切り文字違い・桁数不足・TZ 接尾辞・特殊語・前後空白・非 ASCII 数字・長さ超過等）。`sql::parser` が `22007`（`INVALID_DATETIME_FORMAT`、Issue #1187）へ写像 |
| `DateTimeLiteralError::Overflow` | variant | 文法上は解析できたが値が範囲外・暦上不正（月 13・2 月 30 日・非閏年の 2/29・時 24・分 60・秒 60・年 0000・年 10000 以上等）。`22008`（`DATETIME_FIELD_OVERFLOW`）へ写像 |
| `MAX_DATETIME_LITERAL_LEN` | `usize` = 40 | リテラル受理上限バイト長（パース前の早期拒否） |

## Notes

- **タイムゾーンなし**（ADR `datetime-column.md` D-4）: `TIMESTAMP` はタイムゾーンなし（naive）の値のみを扱い、セッションのタイムゾーン設定・変換・`AT TIME ZONE` は持たない。入力に TZ 接尾辞（`Z`、`+hh:mm`、`-hh`）があれば閉じた文法の外として `22007` で拒否する。値をどのタイムゾーンで解釈するかはクライアント側の責任。`TIMESTAMPTZ` は対象外。
- `datetime.rs` の `DateTimeLiteralError` の doc comment は旧写像 `22000` のまま残っているが、0.2.0 の実際の写像は `sql/parser.rs`・`error_format.rs` のとおり `22007`（ADR `datetime-column.md`: Issue #1187 で `22000` から変更）。
- エポックは 1970-01-01（Unix エポック）。PostgreSQL の内部エポック 2000-01-01 とは異なり、バイナリ結果形式（#998・WIRE-14）で PG のバイナリ表現を返す場合はオフセット変換が必要（ADR 注記）。
- `DATE` 文法は `Y{4,6}-MM-DD`（年は 4〜6 桁・月日は各 2 桁固定）。年は先発グレゴリオ暦の `0001..=9999` のみ。5〜6 桁の範囲外年は「文法違反」ではなく `Overflow`。
- `TIMESTAMP` の小数秒は 1〜6 桁のみ。7 桁以上は丸めず `Format` で拒否（D-5）。例: `.5` は 500000 マイクロ秒。
- `format_date` は年を常に 4 桁ゼロ埋めで `YYYY-MM-DD` へ整形。`format_timestamp` は `YYYY-MM-DD HH:MM:SS[.ffffff]`（小数秒が 0 なら省略・末尾の 0 は削る）。いずれも PostgreSQL 互換の既定出力形式。
- `validate_date_days` / `validate_timestamp_micros` は行コーデックの decode 側が格納済み（untrusted）バイト列の範囲外値を fail-closed に拒否するために使う（TABLE-7）。
- `days_from_civil` / `civil_from_days` / `MICROS_PER_DAY` は `pub(crate)`（`sql::datetime_fn` の `date_part` / `date_trunc` も共有）。

## Related

- [row_codec](./row-codec.md)
- [catalog](./catalog.md)
