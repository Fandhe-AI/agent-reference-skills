---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/sql/datetime_fn.rs
---

# sql::datetime_fn

`DATE`／`TIMESTAMP` 向け日時スカラー関数（`date_part`／`date_trunc`）と `DATE` 算術（加減算・差分）の値レベル計算（SQL-26、TASK-210、Issue #920）。`crate::datetime`（内部表現・暦計算の単一情報源）の上に構築する純粋関数のみ。

## Signature / Usage

```rust,ignore
//! field／unit の文字列解決（[`DatePartField::from_name`]・[`DateTruncUnit::from_name`]）は
//! `sql::udf_call::bind_call` が束縛時に一度だけ行い、行ループでは払い出し済みの
//! enum のみを扱う。
//!
//! 意味論は PostgreSQL 互換（`date_part`／`EXTRACT`／`date_trunc` の公開済み
//! 挙動）に合わせるが、以下は既知の差分として ADR に記録する: `TIMESTAMPTZ` 非対応・
//! `DATE` 入力の暗黙昇格・`EXTRACT` の既定列名差分等。

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum DatePartField {
    Microseconds, Milliseconds, Second, Minute, Hour, Day, Week, Month,
    Quarter, Year, Decade, Century, Millennium, Dow, IsoDow, Doy, IsoYear, Epoch,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum DateTruncUnit {
    Microseconds, Milliseconds, Second, Minute, Hour, Day, Week, Month,
    Quarter, Year, Decade, Century, Millennium,
}

impl DatePartField {
    pub(crate) fn from_name(name: &str) -> Option<Self>;
}
impl DateTruncUnit {
    pub(crate) fn from_name(name: &str) -> Option<Self>;
}

pub(crate) fn date_part(field: DatePartField, micros: i64) -> f64;
pub(crate) fn date_trunc(unit: DateTruncUnit, micros: i64) -> Result<i64, SqlSurfaceError>;
pub(crate) fn date_add_days(days: i32, n: f64) -> Result<i32, SqlSurfaceError>;
pub(crate) fn date_sub_days(days: i32, n: f64) -> Result<i32, SqlSurfaceError>;
pub(crate) fn date_diff_days(a: i32, b: i32) -> f64;
pub(crate) fn date_to_timestamp(days: i32) -> i64;
```

## Options / Props

| Name | Description |
|------|-------------|
| `DatePartField::from_name` | 大小無視・単数形/複数形いずれも受理（`microseconds` / `milliseconds` / `second` / `minute` / `hour` / `day` / `week` / `month` / `quarter` / `year` / `decade` / `century` / `millennium`（`millenniums`・`millennia` も）/ `dow` / `isodow` / `doy` / `isoyear` / `epoch`）。未知は `None`（呼び出し元 `bind_call` が `22000` へ写像） |
| `DateTruncUnit::from_name` | 同様。`dow` / `isodow` / `doy` / `isoyear` / `epoch` は切り捨て先として意味を持たないため対象外 |
| `date_part` | `micros` は `TIMESTAMP` の内部表現（`DATE` は呼び出し元が `BuiltinFn::DateToTimestamp` で深夜 0 時へ昇格済み）。常に有限値のため `Result` を返さない。`dow` は日曜 = 0、`isodow` は日曜 = 7、`week`・`isoyear` は ISO 8601 |
| `date_trunc` | 結果は常に `TIMESTAMP`。範囲外（`decade` 切り捨てで年 0 になる等）は `22008`（`datetime_field_overflow`） |
| `date_add_days` / `date_sub_days` | `n` が整数でなければ `42804`（Issue #1274）、`i32` 範囲外は `22003`、結果が `DATE` 受理範囲外は `22008`。判定順は非整数（`42804`）が `i32` 範囲検査（`22003`）より先 |
| `date_diff_days` | `DATE - DATE` の日数差。`f64` で正確に表現できる |

## Notes

- 出典は `fandhe-db-engine` 0.2.0（git SHA `dc888f6ea146d3078153d64a6848f5c8cf044431`）の `src/sql/datetime_fn.rs`（全520行、テスト除く先頭 357 行）。`date_part` / `date_trunc` の本体と ISO 週計算の private ヘルパーは掲載していない
- `date_add_or_sub_days` は加減算を `i64` で行い、「`DATE` として有効か」の単一判定（`crate::datetime::validate_date_days`）で結果の可否を決める。これにより `n == i32::MIN` の符号反転オーバーフローを回避し、「`n` 自体が無効なら `22003`、結果が無効なら `22008`」の 2 分類を保つ（PR #1120 codex / Cursor Bugbot 指摘対応）
- 1970-01-01 は木曜（曜日 4）を基準に曜日を求める
- 関連 ADR（commit `dc888f6`、`docs/design/datetime-scalar-functions.md`）。`TIMESTAMPTZ` 非対応・`DATE` 入力の暗黙昇格・`EXTRACT` の既定列名差分が既知の差分
- distinct from `mssql` / `drizzle` / `supabase`: fandhe-db 内部の日時関数実装であり、SQL Server の `DATEPART` / `DATETRUNC` や PostgreSQL 本体とは一部挙動が異なる

## Related

- [numeric-fn](./numeric-fn.md)
- [string-fn](./string-fn.md)
- [expr-program](./expr-program.md)
