---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/sql/lexer.rs
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
//!
//! `--` 行コメントと `/* */` ブロックコメント（PostgreSQL と同じく入れ子可）は空白と
//! 同様に読み飛ばす（WIRE-16・TASK-219。Issue #1346）。二重引用符識別子は、中身が
//! 引用符なしでもそのまま 1 個の [`Token::Ident`] として字句解析できる語（英数字と
//! `_` のみ・先頭は英字か `_`・予約語でない）に限って受理する。ビュー本体・CHECK 式は
//! 識別子を引用符なしで永続 SQL へ描画して再字句解析するため（`render_tokens` 等）、
//! 中身を自由にすると再解析で別の文・別のトークンへ化ける注入経路になる。
//! コメント・引用の終端走査（[`line_comment_end`]・[`block_comment_end`]・
//! [`quoted_identifier_end`]）は `sql::statement_splitter` と共有し、分割器と lexer の
//! 解釈が食い違わないようにしている。

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
    /// `(` `)` `,` `*` `=` `;` `+` `-` `/` `>` `<` `[` `]`（TASK-79・SQL-9 で `+ - / > <` を追加。
    /// `[`／`]` は配列型の列宣言 `<型>[N]`（SQL-23・TABLE-14。Issue #1348）専用で、
    /// 構文上の受理位置は `sql::ddl_column_type` の型名解析に限る（それ以外の位置に
    /// 現れた場合は各パーサーが `42601` で拒否する）。
    /// `*` は SELECT リストの `*` と式内の乗算の両方を表す。文脈による使い分けは
    /// `allowlist::Parser` の管轄）。
    Punct(char),
    /// `<=>`（密ベクトル距離演算子）
    DistanceOp,
    /// `<=`（TASK-79・SQL-9: 式述語の比較演算子）。
    Le,
    /// `>=`（TASK-79・SQL-9: 式述語の比較演算子）。
    Ge,
    /// `<qualifier>.<name>`（SQL-20・TASK-193・Issue #872）。`ON CONFLICT ...
    /// DO UPDATE SET` の右辺 `EXCLUDED.<col>` 専用の 2 語 1 トークン化。
    /// `lex_word` の直後に空白を挟まず `.` ＋識別子開始文字（英字・`_`）が続く
    /// 場合のみこの形になる（`.5`・`1.`・`1..2`・`a.`・`a. b`・`a.b.c` はいずれも
    /// 該当せず、従来どおり許可リスト外の `.` として `LexError` になる）。許可リスト
    /// （`sql::allowlist::Parser`）は `qualifier` を `EXCLUDED` と大小無視で
    /// 照合し、`ON CONFLICT ... SET` の右辺以外の位置に現れた場合は
    /// `expect_ident` 系ヘルパーが受理せず `42601` へ落とす。
    QualifiedIdent {
        qualifier: String,
        name: String,
    },
    /// 拡張クエリプロトコルのパラメータプレースホルダ `$n`（1 始まり。
    /// Issue #935・WIRE-12・TASK-217）。既定の [`tokenize`] は本トークンを一切
    /// 生成せず、`$` を引き続き「未対応文字」として拒否する。生成するのは
    /// [`tokenize_with_params`] のみで、生成した `Param` を消費するのは
    /// `sql::params`（Bind 時に実値の [`Token::StringLiteral`] へ置換する）に
    /// 限られる。`sql::allowlist::Parser`（許可リスト構造検証）はこの variant を
    /// 一切知らない設計（置換後のトークン列のみを見る）。
    Param(u16),
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

/// SQL テキストをトークン列へ変換する。`unwrap`/`expect`/添字アクセスを使わず、
/// `chars()` イテレータの先読み（`Peekable`）のみで走査する。`$n` プレースホルダ
/// （Issue #935・WIRE-12）は常に「未対応文字」として拒否する（[`tokenize_with_params`]
/// のみが受理する。両者は `tokenize_impl` を共有し、この関数の既存の受理・拒否
/// 契約は一切変えない）。
pub fn tokenize(input: &str) -> Result<Vec<Token>, LexError>

/// [`tokenize`] の `$n` プレースホルダ対応版（Issue #935・WIRE-12・TASK-217）。
/// 拡張クエリプロトコルの Parse（`sql::params`）だけがこの関数を呼ぶ。簡易クエリ
/// プロトコル・許可リスト構造検証（`sql::allowlist`）は引き続き [`tokenize`]
/// （`$` を拒否する既定の字句解析）を使う。
pub fn tokenize_with_params(input: &str) -> Result<Vec<Token>, LexError>

/// 字句解析するとトークンが 1 つも残らない（空白・コメントのみ）SQL か。字句解析に
/// 失敗する入力は `false`（通常の parse 経路でエラーにする。fail-closed）。
/// `wire-server::extended_query` の Parse が、コメントだけの文を空文
/// （EmptyQueryResponse）として扱う判定に使う。`$n` を含み得るため
/// [`tokenize_with_params`] で判定する。
pub fn is_effectively_empty(sql: &str) -> bool
~~~

## Notes

- `USING` / `SET` / `LIKE` は字句レベルでは非予約語（`Ident` のまま）。キーワード化は `allowlist::Parser` が文脈的に行う。
- Migration (0.1.0 → 0.2.0): `Token` に `QualifiedIdent { qualifier, name }` / `Param(u16)` が加わった（`Token` を網羅 `match` するコードは追随が必要）。`Keyword` は 0.2.0 でも `Select` / `From` / `Where` / `And` / `Order` / `By` / `Limit` の 7 語のままで、DDL・JOIN・`WITH`・`OVER` などの語は字句レベルでは `Ident` のまま `allowlist` 側が文脈的に照合する。`INSERT` / `INTO` / `VALUES` / `USING` / `OPERATION_ID` も同様に `Keyword` へ含めない（PR #189 レビュー指摘対応）。
- `Token::QualifiedIdent` の doc comment は「`EXCLUDED.<col>` 専用」「`ON CONFLICT ... SET` の右辺以外は `42601`」と記すが、これは SQL-20・TASK-193 導入時点の記述で 0.2.0 のソースでは更新されていない。0.2.0 では `allowlist::Parser::parse_join_colref`（`colref := <ident> | <qualifier>.<ident>`、JOIN の列参照解決へ再利用）も同トークンを `ColumnRef::qualified` として受理する（[relation](./relation.md)・[allowlist](./allowlist.md)）。
- `render_tokens`（`pub(crate)`）は検証済みトークン列を再トークン化で元と同一のトークン列に戻る正規化 SQL へ描画する（`CREATE VIEW` 本文の永続化用。Issue #1192）。`Token::Param` は DDL では `None`（fail-closed）。
- `MAX_INPUT_LEN` (1 MiB) / `MAX_TOKEN_COUNT` (20,000) は untrusted 入力に対する防御的上限。
- Distinct from `mssql` (node-mssql, T-SQL client) / `drizzle` (TypeScript ORM) / `supabase` (Postgres): this lexer implements a bespoke, intentionally minimal grammar, not general PostgreSQL SQL.

## Related

- [allowlist](./allowlist.md)
- [parser](./parser.md)
