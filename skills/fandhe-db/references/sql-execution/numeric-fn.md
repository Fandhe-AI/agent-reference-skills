---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/sql/numeric_fn.rs
---

# sql::numeric_fn

数値スカラー関数群（`ABS` / `ROUND` / `FLOOR` / `CEIL`・`CEILING` / `MOD` / `POWER` / `SQRT`）の純粋関数実装（Issue #920、SQL-26、TASK-210）。行コンテキストを持たない値レベルの計算のみ。`sql::udf_call::BuiltinFn` の解決・型検査・行ループでの呼び出しは `sql::udf_call::bind_call`・`apply_builtin` が担い、本モジュールへ委譲する。

## Signature / Usage

```rust,ignore
//! fail-closed の方針: 0 除算・未定義（`0^負数`・負数の非整数乗）・非有限値の生成は
//! 黙って丸めず `Err` で拒否する。オーバーフロー・アンダーフローは
//! `SqlSurfaceError::numeric_out_of_range`（`22003`）、0 除算は
//! `SqlSurfaceError::division_by_zero`（`22012`、Issue #1163）、
//! それ以外の不正入力（非整数の丸め桁数・sqrt の負数等）は
//! `SqlSurfaceError::invalid_input`（`22000`）に写像する。

pub(crate) fn abs(x: f64) -> Result<f64, SqlSurfaceError>;
pub(crate) fn round1(x: f64) -> Result<f64, SqlSurfaceError>;
pub(crate) fn round2(x: f64, n: f64) -> Result<f64, SqlSurfaceError>;
pub(crate) fn floor(x: f64) -> Result<f64, SqlSurfaceError>;
pub(crate) fn ceil(x: f64) -> Result<f64, SqlSurfaceError>;
pub(crate) fn modulo(x: f64, y: f64) -> Result<f64, SqlSurfaceError>;
pub(crate) fn power(x: f64, y: f64) -> Result<f64, SqlSurfaceError>;
pub(crate) fn sqrt(x: f64) -> Result<f64, SqlSurfaceError>;
```

## Options / Props

| Name | SQL | Errors / Description |
|------|-----|----------------------|
| `abs` | `abs(x)` | 非有限結果は `22003` |
| `round1` | `round(x)` | 0.5 は 0 から遠い側へ丸める（`f64::round` と同じ） |
| `round2` | `round(x, n)` | 小数点以下 `n` 桁。`n` は整数値でなければ `22000`、`i32` 範囲外は `22003`。0.5 は 0 から遠い側。`x` の最短往復表現（10 進数字列）上で桁の切り捨て・繰り上げを行い、浮動小数点の乗除算を経由しない（`1.005` 等の `*.5` 誤判定を避ける）。非有限・0 は `x` をそのまま返す。丸め後が `f64` 範囲超過なら `22003` |
| `floor` | `floor(x)` | — |
| `ceil` | `ceil(x)` / `ceiling(x)` | `ceiling` の別名は `sql::udf_call::builtin_from_name` が解決 |
| `modulo` | `mod(x, y)` | 符号は被除数 `x` に従う（`f64` の `%` と同じ）。除数 0 は `22012` |
| `power` | `power(x, y)` | `0` の負数乗・結果が NaN（負の底の非整数乗）は `22000`、`±∞` は `22003`（overflows）、底が非零で結果 `0` は `22003`（underflows） |
| `sqrt` | `sqrt(x)` | 負の入力は `22000` |

## Notes

- 出典は `fandhe-db-engine` 0.2.0（git SHA `dc888f6ea146d3078153d64a6848f5c8cf044431`）の `src/sql/numeric_fn.rs`（全435行、テスト除く先頭 241 行）。`round2` の 10 進数字列処理本体（`increment_decimal_digits` 含む）と `finite_result` は掲載していない
- `round(x, n)` の方式は PR #1107 codex-review P1 指摘対応（`x * 10^n` を `f64` で計算すると 10 進で厳密に `*.5` の中間値が丸め方向を誤る）
- 丸め単位が整数部の桁数より大きい負の `n` は必ず 0 に縮退する（意図的。符号付きゼロを保持）
- 関連 ADR（commit `dc888f6`、`docs/design/numeric-scalar-functions.md`）
- distinct from `mssql` / `drizzle`: fandhe-db 内部の数値関数実装であり、SQL Server の `ROUND` / `POWER` 等とは挙動が異なる場合がある

## Related

- [string-fn](./string-fn.md)
- [datetime-fn](./datetime-fn.md)
- [expr-program](./expr-program.md)
