---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/sql/params.rs
---

# sql::params

拡張クエリプロトコルの `$n` パラメータ束縛（Issue #935・WIRE-12・TASK-217）。Parse 時に許可位置のみを構造検証し、Bind 時に検証済みの値を 1 トークンへ置換する 2 段のトークン変換だけを提供する。値は SQL テキストへも字句解析器へも戻らず、値経由のインジェクション経路は構造的に存在しない。

## Signature / Usage

~~~rust,ignore
/// 1 文で許容するパラメータ番号の上限（実装既定値）。wire 層（Parse の宣言型
/// 件数・Bind の値件数）もこの定数を単一情報源として参照する。
pub const MAX_PARAMS: u16 = 64;

/// `tokens` 中の `Token::Param` がすべて許可位置に収まっていることを検証し、
/// 文が要求するパラメータ数（最大の `$n` 番号。1 始まり。`$n` が 1 つも
/// 無ければ 0）を返す。
///
/// - 許可位置以外に現れた `$n` は [`SqlSurfaceError::unsupported`]（`42601`）。
/// - `$n` の番号が [`MAX_PARAMS`] を超える場合は
///   [`SqlSurfaceError::payload_too_large`]（`54000`）。
pub fn validate_param_positions(tokens: &[Token]) -> Result<u16, SqlSurfaceError>

/// `$n` の型公告（`ParameterDescription` の OID 決定と、バイナリ受理可否の判定に使う）。
#[derive(Debug, Clone, PartialEq)]
pub enum PreparedParamType {
    /// text（OID 25）として公告し、バイナリ形式も可（UTF-8 バイト恒等）。
    Text,
    /// text（OID 25）として公告するが、値の実体がベクトルのため
    /// バイナリ形式は不可（WIRE-14）。
    VectorText,
    /// スカラー列（`id` 含む）の型。
    Column(crate::sql::exec::ColumnMeta),
}

impl PreparedParamType {
    pub fn binds_as_text_literal(&self) -> bool
}

/// Parse 時点の構造検証専用: すべての `$n` を、位置に依存しない固定ダミー値へ置換する。
pub fn substitute_dummy(tokens: &[Token]) -> Vec<Token>

/// Bind 時点: `values`（`$1` から順に 1 始まりで対応する実値）で全 `$n` を置換する。
pub fn substitute_values(tokens: &[Token], values: &[String]) -> Result<Vec<Token>, SqlSurfaceError>

/// Bind 値の UTF-8 検証・NUL 拒否・置換後総バイト長の上限判定
/// （[`crate::sql::lexer::MAX_INPUT_LEN`]）を行い、`Token::StringLiteral` へ
/// 格納できる文字列へ変換する。
/// - `NULL`（`values` の要素が `None`）は本バージョンのスコープ外として
///   [`SqlSurfaceError::invalid_input`]（`22000`）で拒否する。
/// - 非 UTF-8・NUL 文字混入は [`SqlSurfaceError::invalid_text_representation`]（`22P02`）。
/// - 置換後総バイト数超過は [`SqlSurfaceError::payload_too_large`]（`54000`）。
pub fn decode_bind_values(tokens: &[Token], values: &[Option<Vec<u8>>])
    -> Result<Vec<String>, SqlSurfaceError>

pub fn where_equality_literal_is_param(tokens: &[Token]) -> Vec<bool>
pub fn order_by_distance_literal_is_param(tokens: &[Token]) -> bool
~~~

## Options / Props

受理するプレースホルダ位置（WIRE-12 の規範形。これ以外は `42601`。原文 module doc より）。

| # | Position | Form |
|---|----------|------|
| 1 | ベクトル位置 | `ORDER BY <vec列> <=> $n`（直前トークンが `Token::DistanceOp`） |
| 2 | プラン | `USING PLAN($n)` |
| 3 | 操作 ID | `USING OPERATION_ID $n`（INSERT／TRUNCATE／DELETE／UPDATE 共通の文末句） |
| 4 | WHERE 等価 | `WHERE <列> = $n`（トップレベル `WHERE` 節の内側、`Ident '=' $n` の形のみ） |
| 5 | INSERT VALUES | `INSERT ... VALUES ($1, $2, ...)`（複数行含む） |

置換リテラルの種別（Issue #1342・`$n` の推論型から導出）:

| Kind | Columns | Behavior |
|------|---------|----------|
| String（既定） | 上記以外 | 常に 1 個の `Token::StringLiteral` |
| Integer | `id`・`INTEGER`・`BIGINT` | `-?[0-9]+` のみ `Token::Number`。それ以外は `22P02` |
| Float（Issue #1406） | `REAL`・`DOUBLE` | 字句解析器の数値トークン 1 個（符号なし）に一致するときのみ。それ以外は `22P02` |
| Boolean | `BOOLEAN` | `t`/`true`/`yes`/`on`/`1` 等（大小無視）を `Ident("true"/"false")` へ。それ以外は `22P02` |

## Notes

- 上記フェンスは公開関数・型の抜粋（`pub(crate)` の型付き版 `*_typed`・型推論 `infer_param_positions`・各句境界判定は省略）。完全な原文は出典ファイル参照。
- スコープ外（`42601`）: `LIMIT $n`・`USING MODE $n`・`HINT ORDER($n, ...)`・`SET search_mode = $n`・`UPDATE ... SET a = $n`・`ON CONFLICT ... DO UPDATE SET a = $n`・hybrid 関数引数・非等価比較（`id > $n` 等）。
- カーソル文（`DECLARE`／`FETCH`／`CLOSE`）・`WITH` 文・JOIN 文に `$n` を含めると一律 `42601`（fail-closed）。
- 不正値のエラーメッセージには値本文を含めない（番号と期待型のみ）。
- Distinct from `mssql` (node-mssql, T-SQL client) / `drizzle` (TypeScript ORM) / `supabase` (Postgres): `$n` here is the PostgreSQL wire extended-query placeholder restricted to five allowlisted positions, not a general parameterized-query API.

## Related

- [lexer](./lexer.md)
- [allowlist](./allowlist.md)
- [cursor](./cursor.md)
- [cte](./cte.md)
