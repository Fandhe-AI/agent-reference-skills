---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/sql/string_fn.rs
---

# sql::string_fn

文字列スカラー関数群の純粋な実装（Issue #919、SQL-26、TASK-210）。行コンテキスト・`ExprValue` に依存しない純粋関数のみ。NULL 伝播・関数解決・組み込み名の予約は `sql::udf_call::apply_builtin` が担い、本モジュールは非 NULL の `&str` 入力のみを受け取る。

## Signature / Usage

```rust,ignore
//! # 文字単位（AC3）
//! 位置・長さはすべて **Unicode スカラー値（Rust の `char`）単位**で扱う
//! （書記素クラスタ単位ではない）。バイト単位を返す関数（`octet_length` 等）は
//! 本 Issue のスコープ外。
//!
//! # PostgreSQL との既知の差
//! - `lower`/`upper` は Rust 標準ライブラリの Unicode 既定変換
//!   （`str::to_lowercase`/`to_uppercase`）を使う。libc ロケール依存の
//!   PostgreSQL とは `ß` → `SS` のように結果が変わる文字がありうる。
//! - `trim` は半角空白 `' '` のみを除去する（PostgreSQL の `trim(both ' ' from s)`
//!   既定と同じで、タブ・改行・全角空白は対象外）。
//! - TEXT 同士の比較はバイト順（UTF-8 のコードポイント順）で、PostgreSQL の
//!   `"C"` 照合順に相当する。

const MAX_RESULT_LEN: usize = MAX_TEXT_FIELD_LEN as usize;

pub(crate) fn lower(s: &str) -> Result<String, SqlSurfaceError>;
pub(crate) fn upper(s: &str) -> Result<String, SqlSurfaceError>;
pub(crate) fn length(s: &str) -> f64;
pub(crate) fn substr(s: &str, start: f64, len: Option<f64>) -> Result<String, SqlSurfaceError>;
pub(crate) fn concat2(a: &str, b: &str) -> Result<String, SqlSurfaceError>;
pub(crate) fn trim(s: &str) -> Result<String, SqlSurfaceError>;
pub(crate) fn replace(s: &str, from: &str, to: &str) -> Result<String, SqlSurfaceError>;
pub(crate) fn position(haystack: &str, needle: &str) -> f64;
```

## Options / Props

| Name | SQL | Description |
|------|-----|-------------|
| `lower` / `upper` | `LOWER(s)` / `UPPER(s)` | Unicode 既定の小文字 / 大文字変換（ロケール非依存で決定的） |
| `length` | `LENGTH(s)` | 文字数（Unicode スカラー値単位）。`f64` で返す |
| `substr` | `SUBSTR(s, start[, len])` | 1 始まりの文字位置。`[start, start+len)` と `[1, 文字数]` の交差を返す。`start` が 0 以下でも `len` 分の窓で切る。負の `len`・非有限・非整数・`i64` 範囲外の引数は `22000` |
| `concat2` | `CONCAT(a, b, ...)` | 2 引数の畳み込み単位。可変長 `CONCAT` は束縛段（`sql::udf_call::bind_call`）で左畳み込みへ展開。NULL 引数は空文字として呼び出し元が写像済み |
| `trim` | `TRIM(s)` | 先頭・末尾の半角空白 `' '` のみ除去 |
| `replace` | `REPLACE(s, from, to)` | 部分文字列をすべて置換。`from` が空文字なら `s` をそのまま返す。確保前に最終長を `checked_*` 演算で見積もる |
| `position` | `POSITION(needle IN haystack)` | 1 始まりの文字位置。見つからなければ 0、`needle` が空文字なら 1 |
| `MAX_RESULT_LEN` | — | 結果 1 件あたりのバイト長上限。行の `TEXT` 列値 1 個分の上限 `MAX_TEXT_FIELD_LEN` と同値。超過は `54000` |

## Notes

- 出典は `fandhe-db-engine` 0.2.0（git SHA `dc888f6ea146d3078153d64a6848f5c8cf044431`）の `src/sql/string_fn.rs`（全423行、テスト除く先頭 243 行）。シグネチャと doc comment の要点のみで、関数本体・private ヘルパー（`check_result_len` / `arg_as_i64` / `replace_overflow`）は掲載していない
- `substr` は窓の終端を `i128` で求めて文字数へ飽和させるため、各引数が個別に有効ならオーバーフローを理由に拒否しない（PostgreSQL と同じ契約）
- `arg_as_i64` は `2^63`（`f64` では `i64::MAX` が丸められる）を範囲外として `22000` で拒否する
- untrusted な行データ・SQL リテラルを扱うため `unwrap`/`expect`/添字アクセス `[]` を使わない
- distinct from `mssql` / `drizzle`: fandhe-db 内部の文字列関数実装であり、SQL Server（`SUBSTRING` / `LEN` 等）とは関数名・挙動が異なる

## Related

- [numeric-fn](./numeric-fn.md)
- [datetime-fn](./datetime-fn.md)
- [expr-program](./expr-program.md)
