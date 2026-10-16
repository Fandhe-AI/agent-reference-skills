---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/declarative_filter.rs
---

# declarative_filter

宣言的メタデータフィルタ API（TASK-147、EXT-3）。メタデータ列に対する等価・前方一致・`LIKE` 一般形・範囲比較・`IN`・`BETWEEN`・`IS [NOT] NULL`・`NOT` のフィルタを、任意の列名に対して宣言・スキーマへ束縛・評価する。SQL 経由（`sql::allowlist::parse_where` → `sql::parser::bind_where_predicates`）と Rust API 直接呼び出しの両方から構築できる。0.1.0 は `TEXT` 列の等価・前方一致のみだった。

## Signature / Usage

```rust,ignore
//! 宣言的メタデータフィルタ API（TASK-147・EXT-3。ポインタ:
//! `docs/spec/05-tasks.md` TASK-147・`docs/spec/04-behavior/extensions.md` EXT-3）。
//!
//! 責務境界: メタデータ列（`TEXT` 列）に対する**等価**・**前方一致**・**`LIKE` 一般形**
//! （中間一致・後方一致・`_` 1 文字ワイルドカード。SQL-24・TASK-208、Issue #914）のフィルタを、
//! 任意の列名に対して宣言（`DeclarativeFilter`）・スキーマへ束縛（`bind`/`bind_all`）・評価
//! （`MetadataFilter::matches`/`matches_all`）する。`LIKE` の一般形は二次索引が対応せず plain scan へ
//! 縮退する（`sql::scalar_plan`・`sql::scalar_index` 参照）。
//!
//! 呼び出し文脈: `sql::allowlist::parse_where` が構文（`<col> = '<literal>'`・`<col> LIKE '<prefix>%'`・
//! `<col> (< | > | <= | >=) '<literal>'`）を許可リスト判定し、`sql::parser::bind_where_predicates` が
//! 本モジュールの `DeclarativeFilter`・`bind_all` へ委譲してスキーマ照合済みの `MetadataFilter` 列を得る。
//! `sql::exec::execute_statement` の SCALAR 段（RLS 事前フィルタを通過した可視行に対する事前適用・
//! `HINT ORDER` で DISTANCE 先行時の事後適用の両方）が `matches_all` を呼んで評価する。
//!
//! `DATE`／`TIMESTAMP`／`NUMERIC`／`UUID`／`BYTEA` 列の範囲比較（`FilterOp::TypedCompare`。TABLE-13・
//! TASK-199、Issue #891）は、算術を持たない非数値型のみを対象にした宣言的経路（レーン B）。
//! INTEGER/BIGINT/REAL/DOUBLE 列を算術式・関数引数の中で使う経路（レーン A）は式評価系
//! （`sql::udf_call`・`sql::expr_program`）が担い、本モジュールの対象外のまま。
//!
//! `unwrap`/`expect`/添字アクセス `[]` を使わず `get()`・`strip_suffix`・`checked_*` で
//! untrusted なパターン文字列・列インデックスを扱う（`.claude/rules/coding-rust.md`）。

/// 1 文（`SELECT`）が持てるメタデータフィルタ件数の上限。無制限 `Vec` 確保を避ける
/// （`catalog::MAX_COLUMN_COUNT` と同値を採用する）。
pub const MAX_METADATA_FILTERS: usize = 256;

/// `<col> [NOT] IN (...)` 1 個が持てる要素数の上限（SQL-24。TASK-208 ポインタ）。`sql::allowlist::MAX_IN_LIST_ITEMS`
/// （SQL テキスト経由の構文段）と同値を採用する。NoSQL 表層 `wire-server::http::query::filter`
/// （Issue #945・NOSQL-14）が `in` 要素数上限の多層防御にも使う公開 API。
pub const MAX_IN_LIST_ITEMS: usize = 256;

/// `LIKE` パターン（生パターン。エスケープ解除前）のバイト長上限（SQL-24／TASK-208、Issue #914）。
/// `parse_like_pattern` が確保・解析より前に判定し、超過は `54000`。一般形の評価コストは O(n·m)
/// （n = 値のバイト長、m = パターン長）になるため、この上限で m を定数に抑え DoS を防ぐ。
pub const MAX_LIKE_PATTERN_LEN: usize = 4096;

/// フィルタの意味論。等価はバイト列一致、前方一致は `str::starts_with` によるバイト前方一致。
/// いずれも大文字小文字を区別する（PG の `=`/`LIKE` の既定動作に倣う）。
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum FilterOp {
    Equals(String),
    StartsWith(String),
    /// BOOLEAN 列の等価条件（TABLE-13・TASK-196、Issue #883・D-c）。BOOLEAN 列と文字列リテラルの等価
    /// （`flag = 'true'`）は Issue #1408 で `sql::parser` が `boolin` 互換文法で解釈してこの `BoolEquals` へ
    /// 振り分ける（公開 API の `equals` は TEXT 限定のまま。解釈できない文字列は `22P02`）。
    BoolEquals(bool),
    /// `DATE`／`TIMESTAMP`／`NUMERIC`／`UUID`／`BYTEA` 列の範囲比較条件（TABLE-13・TASK-199、Issue #891・レーン B）。
    /// `value` は列型で解析済みの型付きリテラルで、`bind` 時に一度だけ解析する。
    TypedCompare { op: CompareOp, value: TypedLiteral },
    /// `TypedCompare` の未束縛（列型未確定）版。`bind_impl` が列型で `CompareLiteral` を解析し `TypedCompare` へ確定させる。
    Compare { op: CompareOp, literal: CompareLiteral },
    /// `InText`／`InTyped` の未束縛版（SQL-24）。要素は構文段が保持した生の文字列リテラル。
    InListLiteral { values: Vec<String> },
    /// 束縛済み `IN` 条件（TEXT／ENUM 列）。値はソート・重複除去済み（二分探索で評価する）。
    InText(Vec<String>),
    /// 束縛済み `IN` 条件（DATE／TIMESTAMP／NUMERIC／UUID／BYTEA 列）。
    InTyped(Vec<TypedLiteral>),
    /// `Between` の未束縛版。`low`／`high` は構文段が保持した生の文字列リテラル。
    BetweenLiteral { low: String, high: String },
    /// 束縛済み `BETWEEN` 条件（DATE／TIMESTAMP／NUMERIC／UUID／BYTEA 列）。`low > high` の場合は評価が常に偽になる
    /// （エラーにはしない。PG の `BETWEEN` と同じ扱い）。
    Between { low: TypedLiteral, high: TypedLiteral },
    /// 配列列の等価条件（TABLE-14・Issue #1193）。右辺リテラルは `bind` 時に列の `ArrayType` で解析済み
    /// （NULL 要素どうしは等しい。PostgreSQL の `array_eq` と同じ）。二次索引は対応せず PlainScan へ縮退する。
    ArrayEquals(ArrayKey),
    /// 配列列の `IN`（Issue #1193）。要素数は `MAX_IN_LIST_ITEMS` で上限済み。
    InArray(Vec<ArrayKey>),
    /// `JSON`／`JSONB` 列の等価条件（TABLE-14・Issue #1193）。値は `crate::json::canonical_equality_text`
    /// （UNIQUE 制約と共通の値等価正規形）。
    JsonEquals(String),
    /// `JSON`／`JSONB` 列の `IN`（Issue #1193）。
    InJson(Vec<String>),
    /// `<col> IS NULL`。
    IsNull,
    /// `<col> IS NOT NULL`。
    IsNotNull,
    /// 前置・後置 `NOT` による否定。内側の評価結果を三値論理で反転する（UNKNOWN は UNKNOWN のまま）。
    Not(Box<FilterOp>),
    /// `TEXT` 列に対する `LIKE` の一般形（中間一致・後方一致・`_` 1 文字ワイルドカードを含む。SQL-24／TASK-208、Issue #914）。
    /// 純粋な前方一致は `StartsWith` へ、ワイルドカードを含まない完全一致は `Equals` へ束縛時に振り分ける。
    Like(LikePattern),
    /// `Like` の未束縛版（列名指定・生パターン未解析）。束縛済み `MetadataFilter` には現れない。
    LikeUnbound(String),
}

/// 配列等価述語の束縛済み右辺（Issue #1193）。行バイトと同じ正準エンコードを保持し、行側の
/// `crate::row_codec::ArrayRef` とバイト単位で比較する。フィールドは非公開。
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ArrayKey { /* elem, count, flags, bytes */ }

/// `TypedCompare`／`Compare` の比較演算子。`sql::allowlist::CompareOp`（構文層。`< > <= >=` のみ）とは別に
/// 本モジュール（意味層）で持つ。`Eq` は構文層に対応する variant を持たず、`WherePredicate::Equality`
/// （列型が非 TEXT/ENUM の場合）からのみ到達する。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum CompareOp { Eq, Lt, Le, Gt, Ge }

/// `FilterOp::Compare` が保持する未解析リテラル。`Text` は文字列リテラル形（`col > '...'`）。`Number` は
/// `NUMERIC` 列専用の裸数値リテラル形（`col > 1.5`）を表す `DeclarativeFilter::compare_numeric_literal` 専用の variant。
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum CompareLiteral {
    Text(String),
    Number(String),
}

/// `TypedCompare` が保持する、列型で解析済みの範囲比較リテラル（TABLE-13・TASK-199、Issue #891）。
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum TypedLiteral {
    /// `DATE` 列。1970-01-01 起点の日数。
    Date(i32),
    /// `TIMESTAMP` 列。1970-01-01 00:00:00 起点のマイクロ秒。
    Timestamp(i64),
    /// `NUMERIC` 列。列の `scale` に丸めず、リテラル自身の小数桁数で解析した正確な値（`numeric::cmp_exact` で比較する）。
    Numeric(Decimal),
    /// `UUID` 列。
    Uuid(Uuid),
    /// `BYTEA` 列。辞書順（バイト列の `Ord`）で比較する。
    Bytes(Vec<u8>),
}

/// 未束縛の宣言的フィルタ（列名指定）。`DeclarativeFilter::starts_with("path", "src/").bind(&schema)` のように使う。
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct DeclarativeFilter { /* column: String, op: FilterOp */ }

impl DeclarativeFilter {
    /// 等価フィルタを宣言する。
    pub fn equals(column: impl Into<String>, value: impl Into<String>) -> Self;

    /// 前方一致フィルタを宣言する。`prefix` が空の場合は `bind` 時に `22000` で拒否する。
    pub fn starts_with(column: impl Into<String>, prefix: impl Into<String>) -> Self;

    /// BOOLEAN 列の等価フィルタを宣言する（Issue #883・D-c）。
    pub fn bool_equals(column: impl Into<String>, value: bool) -> Self;

    /// `DATE`／`TIMESTAMP`／`NUMERIC`／`UUID`／`BYTEA` 列の範囲比較フィルタを文字列リテラル形
    /// （`col > '2024-01-01'` 等）で宣言する（TABLE-13・TASK-199、Issue #891）。列型に応じた解析は `bind` 時に行う。
    pub fn compare(column: impl Into<String>, op: CompareOp, value: impl Into<String>) -> Self;

    /// `NUMERIC` 列専用: 裸の数値リテラル形（`col > 1.5`）の範囲比較フィルタを宣言する。`raw` は引用符なしの数値
    /// テキストで、列の `scale` に丸めずリテラル自身の小数桁数で解析する（`crate::numeric::parse_literal_exact`）。
    pub fn compare_numeric_literal(column: impl Into<String>, op: CompareOp, raw: impl Into<String>) -> Self;

    /// `<col> [NOT] IN (...)` フィルタを文字列リテラル形で宣言する（SQL-24）。TEXT／ENUM は辞書等価、
    /// DATE／TIMESTAMP／NUMERIC／UUID／BYTEA は型付き等価で、`bind` 時に解析する。
    pub fn in_list(column: impl Into<String>, values: Vec<String>) -> Self;

    /// `<col> [NOT] BETWEEN '<low>' AND '<high>'` フィルタを文字列リテラル形で宣言する（SQL-24）。
    /// `DATE`／`TIMESTAMP`／`NUMERIC`／`UUID`／`BYTEA` 列のみ受理し、他の列型は `bind` 時に `22000`。
    pub fn between(column: impl Into<String>, low: impl Into<String>, high: impl Into<String>) -> Self;

    /// `<col> IS NULL` フィルタを宣言する（SQL-24）。`VECTOR` 列は `bind` 時に `22000`。
    pub fn is_null(column: impl Into<String>) -> Self;

    /// `<col> IS NOT NULL` フィルタを宣言する。
    pub fn is_not_null(column: impl Into<String>) -> Self;

    /// 自身を否定した新しいフィルタを返す（SQL-24）。
    pub fn negate(self) -> Self;

    /// `TEXT` 列に対する `LIKE` フィルタを宣言する（SQL-24／TASK-208、Issue #914）。`pattern` は生パターン（エスケープ解除前）で、
    /// `bind` 時に `parse_like_pattern` で解析し `Equals`／`StartsWith`／`Like` のいずれかへ確定させる。
    pub fn like(column: impl Into<String>, pattern: impl Into<String>) -> Self;

    /// `schema` と照合して `MetadataFilter` へ束縛する。列名解決・列型検査（`Equals`/`StartsWith` は `TEXT` 列限定・
    /// `BoolEquals` は `BOOLEAN` 列限定。いずれも不一致は `22000`）・リテラル長上限（`MAX_TEXT_FIELD_LEN` 超は `54000`）・
    /// 空 prefix 拒否（`22000`）を検証する。
    pub fn bind(&self, schema: &TableSchema) -> Result<MetadataFilter, SqlSurfaceError>;
}

/// `pattern`（`LIKE` 句の右辺リテラル）を前方一致の prefix へ変換する。SQL 表層の `LIKE` は Issue #914（SQL-24）以降
/// `DeclarativeFilter::like`／`parse_like_pattern` を経由し、本関数は通らない。本関数は Rust API 直接呼び出し
/// （`DeclarativeFilter::starts_with` 等）向けの前方一致限定パーサーとして公開 API のまま残す。
///
/// 受理する形状は「末尾がちょうど 1 つの `%` で、それ以外に `%`・`_`・`\` を含まず、prefix が非空」のみ。以下はすべて `22000` で拒否する:
/// - 末尾に `%` が無い（`'abc'`）
/// - prefix が空（`'%'`）
/// - 中間・先頭に `%` を含む（`'a%b%'`・`'%abc'`）
/// - `_`（1 文字ワイルドカード）を含む
/// - `\`（エスケープ）を含む
pub fn parse_prefix_pattern(pattern: &str) -> Result<String, SqlSurfaceError>;

/// `LIKE` の一般形（中間一致・後方一致・`_` を含む）を表す、コンパイル済みパターン（SQL-24／TASK-208、Issue #914）。
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct LikePattern { /* tokens: Vec<LikeToken> */ }

impl LikePattern {
    /// `s`（対象列の値）がこのパターンに一致するか判定する。貪欲法による古典的なワイルドカード照合アルゴリズム
    /// （再帰・バックトラックの指数爆発は起きない）。計算量は最悪 O(n·m)（n = `s` の文字数、m = パターンの文字数。
    /// m は `MAX_LIKE_PATTERN_LEN` で定数に抑えられる）。`s` の走査はバイトオフセットで行い `Vec<char>` へ事前展開しない。
    pub fn matches(&self, s: &str) -> bool;
}

/// `parse_like_pattern` が返す、振り分け済みのコンパイル結果。ワイルドカードを含まない完全一致・純粋な前方一致
/// （末尾 `%` のみ）は専用 variant へ、それ以外の一般形（中間一致・後方一致・`_`）だけを `General` に収める。
#[derive(Debug)]
pub enum CompiledLike {
    Exact(String),
    Prefix(String),
    General(LikePattern),
}

/// `pattern`（`LIKE` 句の右辺リテラル。生パターン・エスケープ解除前）をコンパイルする（SQL-24／TASK-208、Issue #914。
/// PostgreSQL 互換のワイルドカード意味論。詳細な契約は ADR `docs/design/like-wildcard-patterns.md` 参照）。
///
/// 意味論:
/// - `%`: 空列を含む任意の文字列に一致する（連続する `%%` は 1 つに正規化）。
/// - `_`: ちょうど 1 文字（Unicode scalar）に一致する。
/// - `\`: 既定のエスケープ文字。`\%`・`\_`・`\\` はそれぞれリテラルの `%`・`_`・`\` として扱い、`\<その他>` は
///   リテラル `<その他>` として扱う。パターン末尾の単独 `\`（次の文字が無い）は `22000`。
/// - `ESCAPE` 句は未対応（構文層で受理しない）。
///
/// 長さ検証はアロケーション・パース**より前**に行う。`MAX_LIKE_PATTERN_LEN` 超は `54000`。
pub fn parse_like_pattern(pattern: &str) -> Result<CompiledLike, SqlSurfaceError>;

/// 束縛済みのメタデータフィルタ 1 件（列インデックス解決済み）。
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct MetadataFilter { /* column_index: usize, op: FilterOp */ }

impl MetadataFilter {
    /// スキーマ上の列インデックス（`crate::row_codec::scan_scalar_columns` が返す `Vec` の添字と一致する）。
    pub fn column_index(&self) -> usize;

    /// フィルタの意味論。
    pub fn op(&self) -> &FilterOp;

    /// `value`（対象列の値。`None` は NULL）がこのフィルタに一致するかを PG 互換の三値論理（`eval`）で判定し、
    /// `Some(true)` のときだけ真とする（SQL-24）。UNKNOWN（型不一致・NULL 経由の未確定）は不一致として扱う（fail-closed。
    /// `NOT` による反転は `FilterOp::eval` 内で UNKNOWN のまま保たれるため、ここで `false` に丸めても `NOT` が誤って真に反転することはない）。
    pub fn matches(&self, value: Option<ScalarRef<'_>>) -> bool;
}

/// `count` 件のフィルタが `MAX_METADATA_FILTERS` を超えないことを検証する（`54000`）。`bind_all` の件数検査本体を
/// 切り出したもので、`Vec` 確保・要素の複製より前に呼べる形にする。`pub`: `wire-server::http::query::filter`
/// （NoSQL 表層の `filter` 配列。Issue #761・TASK-175・NOSQL-7）が JSON 配列要素を `DeclarativeFilter` へ写像する前に
/// 同じ上限を検査するために呼ぶ。
pub fn check_filter_count(count: usize) -> Result<(), SqlSurfaceError>;

/// `filters` を `schema` へ一括束縛する。件数が `MAX_METADATA_FILTERS` を超える場合は `Vec` を確保する前に `54000` で拒否する。
pub fn bind_all(
    filters: &[DeclarativeFilter],
    schema: &TableSchema,
) -> Result<Vec<MetadataFilter>, SqlSurfaceError>;

/// `scanned`（`row_codec::scan_scalar_columns` が返す列値。添字は列インデックス）に対して `filters` を全件 AND 評価する。
/// 範囲外インデックスは列値が NULL の場合（`Some(None)`）と区別し、常に不一致として扱う（fail-closed。
/// `FilterOp::IsNull` 導入により、範囲外を NULL と同一視すると「値を読めていない」列が誤って `IS NULL` に一致してしまうため）。
pub fn matches_all(filters: &[MetadataFilter], scanned: &[Option<ScalarRef<'_>>]) -> bool;
```

## Notes

- Migration (0.1.0 → 0.2.0): `FilterOp` は `Equals` / `StartsWith` の 2 variant から上記 19 variant に拡張された（`#[non_exhaustive]` なし。クレート外の網羅 `match` は追随が必要）。`MetadataFilter::matches` の引数は `Option<&str>` から `Option<ScalarRef<'_>>` に、`matches_all` の `scanned` は `&[Option<&str>]` から `&[Option<ScalarRef<'_>>]` に変わった。`MetadataFilter::matches` は三値論理（`eval`）で判定し UNKNOWN を不一致として扱う。新規 pub: `CompareOp` / `CompareLiteral` / `TypedLiteral` / `ArrayKey` / `LikePattern` / `CompiledLike` / `parse_like_pattern` / `check_filter_count` / `MAX_IN_LIST_ITEMS` / `MAX_LIKE_PATTERN_LEN` と `DeclarativeFilter` の追加コンストラクタ（`bool_equals` / `compare` / `compare_numeric_literal` / `in_list` / `between` / `is_null` / `is_not_null` / `negate` / `like`）
- SQL エラーコードはソース上の rustdoc に記載された `22000` / `22P02` / `54000` をそのまま返す（コード名の正式名称は本ソース・ADR 上に明示がないため転記しない）
- `DeclarativeFilter` / `MetadataFilter` のフィールド（`column` / `op` / `column_index`）は private
- `negate_folded` / `MetadataFilter::from_bound_text_in` / `bind_all_for_describe` は `pub(crate)`。`from_bound_text_in` は同じ列への等価 `OR` を 1 本の `IN` へ畳む際（Issue #1305）に使い、sort・dedup して空または `MAX_IN_LIST_ITEMS` 超は `None`（畳まない＝fail-closed）
- TASK-147 / EXT-3 / SQL-2 / SQL-24 は private spec（`docs/spec`）へのポインタのみ。spec 非公開のため判断理由・受入基準は未記載
- 本ページは `fandhe-db-engine` 0.2.0（git SHA `dc888f6ea146d3078153d64a6848f5c8cf044431`）の `src/declarative_filter.rs` の pub 項目と doc comment から更新した。`FilterOp::eval` / `bind_impl` の本体（列型ごとの解析・検証）は未転記

## Related

- [wasm-udf](./wasm-udf.md)
