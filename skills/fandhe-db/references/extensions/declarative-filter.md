---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/declarative_filter.rs
---

# declarative_filter

宣言的メタデータフィルタ API（TASK-147、EXT-3）。メタデータ列（`TEXT` 列）に対する等価・前方一致フィルタを、任意の列名に対して宣言・スキーマへ束縛・評価する。SQL 経由（`sql::allowlist::parse_where` → `sql::parser::bind_in_session`）と Rust API 直接呼び出しの両方から構築できる。

## Signature / Usage

```rust,ignore
//! 宣言的メタデータフィルタ API（TASK-147・EXT-3。ポインタ:
//! `docs/spec/05-tasks.md` TASK-147・`docs/spec/04-behavior/extensions.md` EXT-3）。
//!
//! 責務境界: メタデータ列（`TEXT` 列）に対する**等価**と**前方一致**のフィルタを、
//! 任意の列名に対して宣言（[`DeclarativeFilter`]）・スキーマへ束縛（[`bind`]/
//! [`bind_all`]）・評価（[`MetadataFilter::matches`]/[`matches_all`]）する。
//!
//! 呼び出し文脈: `sql::allowlist::parse_where` が構文（`<col> = '<literal>'`・
//! `<col> LIKE '<prefix>%'`）を許可リスト判定し、`sql::parser::bind_in_session` が
//! 本モジュールの [`DeclarativeFilter`]・[`bind_all`] へ委譲してスキーマ照合済みの
//! [`MetadataFilter`] 列を得る。`sql::exec::execute_statement` の SCALAR 段
//! （RLS 事前フィルタを通過した可視行に対する事前適用・`HINT ORDER` で DISTANCE
//! 先行時の事後適用の両方）が [`matches_all`] を呼んで評価する（SQL-2 の等価条件の
//! 実装例を汎用化したもの）。
//!
//! `unwrap`/`expect`/添字アクセス `[]` を使わず `get()`・`strip_suffix`・`checked_*`
//! で untrusted なパターン文字列・列インデックスを扱う（`.claude/rules/coding-rust.md`
//! 「untrusted 入力の扱い」）。

/// 1 文（`SELECT`）が持てるメタデータフィルタ件数の上限。無制限 `Vec` 確保を避ける
/// （`.claude/rules/security.md`「不安全な設計｜無制限リソース確保（DoS）」対応）。
/// `catalog::MAX_COLUMN_COUNT` と同値を採用する（1 列あたり複数フィルタを許すため
/// 列数と独立の定数だが、桁の妥当性は同じ方針に揃える）。
pub const MAX_METADATA_FILTERS: usize = 256;

/// フィルタの意味論。等価はバイト列一致、前方一致は `str::starts_with` による
/// バイト前方一致（`prefix` 自体が構築時点で valid `str` のため UTF-8 境界は安全）。
/// いずれも大文字小文字を区別する（PG の `=`/`LIKE` の既定動作に倣う。曖昧な照合は
/// 持ち込まない）。
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum FilterOp {
    Equals(String),
    StartsWith(String),
}

/// 未束縛の宣言的フィルタ（列名指定）。SQL 経由（`sql::parser::bind_in_session`）・
/// Rust API 直接呼び出しの両方から構築できる（汎用 API としての利用形。
/// `DeclarativeFilter::starts_with("path", "src/").bind(&schema)` のように使う）。
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct DeclarativeFilter {
    column: String,
    op: FilterOp,
}

impl DeclarativeFilter {
    /// 等価フィルタを宣言する。
    pub fn equals(column: impl Into<String>, value: impl Into<String>) -> Self { /* ... */ }

    /// 前方一致フィルタを宣言する。`prefix` が空の場合は [`bind`](Self::bind) 時に
    /// `22000` で拒否する（無条件に真となる無意味なフィルタを黙って受理しない）。
    pub fn starts_with(column: impl Into<String>, prefix: impl Into<String>) -> Self { /* ... */ }

    /// `schema` と照合して [`MetadataFilter`] へ束縛する。列名解決・`TEXT` 列限定
    /// （`VECTOR` 列は `22000`）・リテラル長上限（[`MAX_TEXT_FIELD_LEN`] 超は
    /// `54000`）・空 prefix 拒否（`22000`）を検証する。
    pub fn bind(&self, schema: &TableSchema) -> Result<MetadataFilter, SqlSurfaceError> { /* ... */ }
}

/// `pattern`（`LIKE` 句の右辺リテラル）を前方一致の prefix へ変換する。
///
/// 受理する形状は「末尾がちょうど 1 つの `%` で、それ以外に `%`・`_`・`\` を
/// 含まず、prefix が非空」のみ（PG の `LIKE` 全体は実装せず前方一致だけに限定して
/// fail-closed に倒す）。以下はすべて `22000` で拒否する:
/// - 末尾に `%` が無い（`'abc'`）
/// - prefix が空（`'%'`）
/// - 中間・先頭に `%` を含む（`'a%b%'`・`'%abc'`）
/// - `_`（1 文字ワイルドカード）を含む
/// - `\`（エスケープ）を含む
pub fn parse_prefix_pattern(pattern: &str) -> Result<String, SqlSurfaceError>

/// 束縛済みのメタデータフィルタ 1 件（列インデックス解決済み）。
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct MetadataFilter {
    column_index: usize,
    op: FilterOp,
}

impl MetadataFilter {
    /// スキーマ上の列インデックス（[`crate::row_codec::scan_scalar_columns`] が
    /// 返す `Vec` の添字と一致する）。
    pub fn column_index(&self) -> usize { /* ... */ }

    /// フィルタの意味論。
    pub fn op(&self) -> &FilterOp { /* ... */ }

    /// `value`（対象列の値。`None` は NULL）がこのフィルタに一致するか判定する。
    /// NULL は等価・前方一致のいずれでも常に不一致（fail-closed。PG の NULL 比較の
    /// 既定挙動に倣う）。
    pub fn matches(&self, value: Option<&str>) -> bool { /* ... */ }
}

/// `filters` を `schema` へ一括束縛する。件数が [`MAX_METADATA_FILTERS`] を超える
/// 場合は `Vec` を確保する**前**に `54000` で拒否する。
pub fn bind_all(
    filters: &[DeclarativeFilter],
    schema: &TableSchema,
) -> Result<Vec<MetadataFilter>, SqlSurfaceError>

/// `scanned`（`row_codec::scan_scalar_columns` が返す列値。添字は列インデックス）に
/// 対して `filters` を全件 AND 評価する。範囲外インデックスは不一致として扱う
/// （fail-closed。`scanned` は投影・フィルタが必要とする列だけを保持する構造の
/// ため、束縛時に検証済みの列インデックスでも呼び出し元の保持方針次第では
/// 範囲外になり得る）。
pub fn matches_all(filters: &[MetadataFilter], scanned: &[Option<&str>]) -> bool
```

## Notes

- SQL エラーコードはソース上の rustdoc に記載された `22000` / `54000` をそのまま返す（コード名の正式名称は本ソース・ADR 上に明示がないため転記しない）
- `FilterOp` はソース上 `Equals(String)` / `StartsWith(String)` の 2 バリアントのみ（LIKE の任意パターンには対応せず前方一致限定）
- `DeclarativeFilter` / `MetadataFilter` のフィールド（`column` / `op` / `column_index`）は private
- TASK-147 / EXT-3 / SQL-2 は private spec（`docs/spec`）へのポインタのみ。spec 非公開のため判断理由・受入基準は未記載
- 0.1.0 時点の公開表面。安定性未確認のため利用前にソースを確認すること

## Related

- [wasm-udf](./wasm-udf.md)
