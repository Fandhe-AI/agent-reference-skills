---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/sql/lexer.rs
---

# sql::lexer

自作 SQL トークナイザ（TASK-74・SQL-8）。`sql::allowlist` の構造検証が消費する字句列を作る前段。untrusted な wire 入力を直接扱うため `unwrap`/`expect`/添字アクセスを使わず状態機械で線形走査する。未対応の記号は許可リスト外として `LexError` で拒否する（拒否リストではなく、既知トークンのみを許可リストとして認識する構造）。

## Signature / Usage

~~~rust,ignore
//! 自作 SQL トークナイザ（TASK-74・SQL-8 参照。docs/spec/05-tasks.md）。
//!
//! `sql::allowlist` の構造検証（呼び出し元）が消費する字句列を作る前段。untrusted な
//! wire 入力を直接扱うため、`unwrap`/`expect`/添字アクセスを使わず（coding-rust.md）
//! 状態機械で線形走査する。再帰を持たないため入力長に対してスタック消費が増えない。
//!
//! 未対応の記号は許可リスト外として [`LexError`] で拒否する（拒否リストではなく、
//! 既知トークンのみを許可リストとして認識する構造）。

/// トークナイザが認識する字句の種類。
///
/// キーワードは大文字小文字を区別せず ASCII 大文字へ正規化した上で,
/// 許可リストの文法が直接必要とする最小集合だけを [`Token::Keyword`] として
/// 区別する。それ以外の英字トークンはすべて [`Token::Ident`] として扱い,
/// 文法（許可リスト側）がこれらを期待しない位置に置くことで構造的に拒否させる。
///
/// `USING`・`SET`（TASK-161・SQL-12）は本レイヤでは予約語化しない。カタログ上は
/// 有効な識別子（テーブル名・列名）として従来どおり `Ident` になる語のため,
/// 字句解析の時点で無条件にキーワード化すると, その識別子が使えなくなる
/// 未告知の破壊的変更になる。構文上その語が必須の位置（`LIMIT` 直後の
/// `USING MODE ...`, statement 先頭の `SET search_mode = ...`）でのみ,
/// `allowlist` 側が `Ident` の文字列を大文字小文字を区別せず照合して
/// 文脈的にキーワードとして扱う（`allowlist.rs::parse_using_clause`・
/// `allowlist.rs::validate_sql` 参照）。`LIKE`（TASK-147・EXT-3）も同じ理由・同じ
/// 方式で `Keyword` へ含めない（`like` という列名の等価条件 `WHERE like = 'x'` を
/// 壊さないため。`allowlist.rs::Parser::parse_where` が `WHERE` 句内・`ident` の
/// 直後という位置でのみ文脈的に照合する）。
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Token {
    Keyword(Keyword),
    Ident(String),
    StringLiteral(String),
    Number(String),
    /// `(` `)` `,` `*` `=` `;` `+` `-` `/` `>` `<`（TASK-79・SQL-9 で `+ - / > <` を追加。
    /// `*` は SELECT リストの `*` と式内の乗算の両方を表す。文脈による使い分けは
    /// `allowlist::Parser` の管轄）。
    Punct(char),
    /// `<=>`（密ベクトル距離演算子）
    DistanceOp,
    /// `<=`（TASK-79・SQL-9: 式述語の比較演算子）。
    Le,
    /// `>=`（TASK-79・SQL-9: 式述語の比較演算子）。
    Ge,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Keyword {
    Select,
    From,
    Where,
    And,
    Order,
    By,
    Limit,
}

/// 字句解析エラー。位置情報はデバッグ用途に限り, 応答メッセージへは
/// `allowlist` 側が長さを切り詰めて含める（security.md「情報漏えい」対応）。
#[derive(Debug, Clone)]
pub struct LexError {
    pub message: String,
    pub byte_offset: usize,
}

/// 字句解析対象のバイト長上限。構造検証自体を線形時間で終わらせるための
/// 防御的上限（security.md「DoS」対応。値レベルの検証は本モジュールの管轄外）。
pub const MAX_INPUT_LEN: usize = 1_048_576;

/// 1 文で許容するトークン数上限。無制限 `Vec` 確保を避けるための防御的上限
/// （security.md「不安全な設計｜無制限リソース確保」対応）。
pub const MAX_TOKEN_COUNT: usize = 20_000;

/// SQL テキストをトークン列へ変換する。`unwrap`/`expect`/添字アクセスを使わず,
/// `chars()` イテレータの先読み（`Peekable`）のみで走査する。
pub fn tokenize(input: &str) -> Result<Vec<Token>, LexError>
~~~

## Notes

- `USING` / `SET` / `LIKE` は字句レベルでは非予約語（`Ident` のまま）。キーワード化は `allowlist::Parser` が文脈的に行う。
- `MAX_INPUT_LEN` (1 MiB) / `MAX_TOKEN_COUNT` (20,000) は untrusted 入力に対する防御的上限。
- Distinct from `mssql` (node-mssql, T-SQL client) / `drizzle` (TypeScript ORM) / `supabase` (Postgres): this lexer implements a bespoke, intentionally minimal grammar, not general PostgreSQL SQL.

## Related

- [allowlist](./allowlist.md)
- [parser](./parser.md)
