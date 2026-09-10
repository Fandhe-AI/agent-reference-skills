---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/scoring_boost.rs
---

# scoring_boost

宣言的スコアリングブースト API（TASK-148・EXT-4）。`hybrid.rs::BoostRule`／`apply_soft_boost` は「ヒント種別に依存しない候補 id 集合＋加点量」という汎用形で実装済みだが、一致判定（`path_hint_matches`/`kind_hint_matches`）はクエリ展開ヒント専用の 2 演算に閉じている。本モジュールは `declarative_filter.rs`（`extensions` scope 管轄）と同じ構成でこれを一般化し、メタデータ列への一致演算からブーストルールを宣言できるようにする。

## Signature / Usage

```rust,ignore
/// メタデータ列への一致演算。正規表現・glob は導入しない（ReDoS 類の余地を作らない方針）。
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum BoostMatchOp {
    Equals(String),
    StartsWith(String),
    Contains(String),
}

/// 未束縛の宣言的スコアリングブースト（列名指定）。
#[derive(Debug, Clone, PartialEq)]
pub struct ScoringBoost { column: String, op: BoostMatchOp, amount: f64 }
impl ScoringBoost {
    pub fn equals(column: impl Into<String>, value: impl Into<String>, amount: f64) -> Self
    pub fn starts_with(column: impl Into<String>, prefix: impl Into<String>, amount: f64) -> Self
    pub fn contains(column: impl Into<String>, needle: impl Into<String>, amount: f64) -> Self
    /// schema と照合して BoundScoringBoost へ束縛する。列名解決失敗・VECTOR 列指定は
    /// 22000 系で拒否。amount は有限かつ正であることを検証する。
    pub fn bind(&self, schema: &TableSchema) -> Result<BoundScoringBoost, SqlSurfaceError>
}

/// スキーマ照合済みのスコアリングブースト（ScoringBoost::bind の戻り値）。
#[derive(Debug, Clone, PartialEq)]
pub struct BoundScoringBoost { column: String, op: BoostMatchOp, amount: f64 }

/// 1 件の候補（融合済み id）と対象列の値を結び付ける呼び出し元提供のメタデータ。
pub struct BoostMetadata<'a> { id: u64, values: &'a [(&'a str, Option<&'a str>)] }
impl<'a> BoostMetadata<'a> {
    pub fn new(id: u64, values: &'a [(&'a str, Option<&'a str>)]) -> Self
}

/// apply_scoring_boosts が一致判定・アロケーション前に検証する宣言件数の上限
/// （crate::hybrid::MAX_BOOST_RULES を転用）。
pub const MAX_SCORING_BOOSTS: usize = MAX_BOOST_RULES;

/// hybrid::rrf_fuse/hybrid_search が返した融合済み候補列 hits へ、boosts と
/// metadata から一致候補 id 集合を構築し、apply_soft_boost へ委譲して加点を適用する。
pub fn apply_scoring_boosts(
    hits: &mut [HybridHit],
    boosts: &[BoundScoringBoost],
    metadata: &[BoostMetadata<'_>],
    cfg: &RrfConfig,
) -> Result<(), HybridError>
```

## Notes

- `apply_scoring_boosts` は `boosts.len() > MAX_SCORING_BOOSTS`・`metadata.len() > MAX_BOOST_IDS` をアロケーション・走査前に検証する（`boosts.len() * metadata.len()` に比例した無制限コストの発生を防ぐ、PR #260 codex-review 指摘対応）。
- `NULL`（`value_of` が `None` を返す）は常に不一致として扱う（fail-closed。`hybrid::path_hint_matches`/`kind_hint_matches` の空ヒント不一致と同じ方向）。
- スコア調整の意味論（加点合計の絶対上限・非有限拒否・決定的再ソート・候補集合を完全除外しない不変）は `hybrid::apply_soft_boost` へ一元化しており、本モジュールで再実装しない。
- SQL 表層への構文露出は TASK-148 の成果物指定外のため対象外（Rust API 直接利用者向け）。

## Related

- [hybrid.md](./hybrid.md)
