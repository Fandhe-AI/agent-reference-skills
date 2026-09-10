---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/precision.rs
---

# precision

`precision` モードの実行契約（TASK-162、対象ビヘイビア: SEARCH-9）。候補生成（`sql::exec::execute_statement` の DISTANCE 段。`recall` と共通の dense／hybrid RRF）が返した順位付き候補列に対して確信度判定（「ゲート」）を適用する純粋関数群。確信度が閾値以上なら上位少数件（既定 Top-1）を返し、閾値未満なら**空集合**（エラーではなく通常応答の 0 行）を返す（fail-closed）。

## Signature / Usage

```rust,ignore
/// dense／hybrid いずれかのランキング方式に対する確信度閾値。
#[derive(Debug, Clone, Copy, PartialEq)]
pub struct ConfidenceThresholds { min_top1: f64, min_margin: f64 }
impl ConfidenceThresholds {
    /// min_top1・min_margin は共に有限かつ厳密に正であることを要求する（0.0 は fail-open と等価のため拒否）。
    pub fn new(min_top1: f64, min_margin: f64) -> Result<Self, PrecisionError>
    pub fn min_top1(&self) -> f64
    pub fn min_margin(&self) -> f64
}

/// precision モードの実行契約を制御するサーバー側設定値。core::EngineCore が保持し、
/// with_precision_policy（ビルダー）以外に差し替え経路はない。
#[derive(Debug, Clone, Copy, PartialEq)]
pub struct PrecisionPolicy { dense: ConfidenceThresholds, hybrid: ConfidenceThresholds, max_results: usize }

pub const MAX_PRECISION_RESULTS: usize = 100;
pub const DEFAULT_DENSE_MIN_TOP1: f64 = 0.80;
pub const DEFAULT_DENSE_MIN_MARGIN: f64 = 0.05;
pub const DEFAULT_HYBRID_MIN_TOP1: f64 = 0.98;
pub const DEFAULT_HYBRID_MIN_MARGIN: f64 = 0.005;
pub const DEFAULT_MAX_RESULTS: usize = 1;

impl PrecisionPolicy {
    #[allow(clippy::too_many_arguments)]
    pub fn new(
        dense_min_top1: f64,
        dense_min_margin: f64,
        hybrid_min_top1: f64,
        hybrid_min_margin: f64,
        max_results: usize,
    ) -> Result<Self, PrecisionError>
    pub fn dense(&self) -> ConfidenceThresholds
    pub fn hybrid(&self) -> ConfidenceThresholds
    pub fn max_results(&self) -> usize
}

#[derive(Debug, Clone, PartialEq)]
pub enum PrecisionError {
    InvalidThreshold { detail: String },
    InvalidMaxResults { max_results: usize },
    /// 契約違反（非有限確信度）。閾値未達自体はエラーではなく空集合の通常応答として扱う。
    NonFiniteConfidence,
}

/// 確信度判定（ゲート）本体。戻り値は hits から先頭何件を残すか（hits.truncate(n) で使う）。
/// 規則: (1) conf が空→0 (2) conf[0] が非有限→Err (3) conf[0] < min_top1→0
/// (4) conf.len()>=2 かつ margin 未達→0（Top-2 不在ならマージン条件は満たす扱い）
/// (5) それ以外→min(limit, max_results, 先頭から連続して min_top1 を満たす件数)
pub fn apply_gate(
    conf: &[f64],
    thresholds: &ConfidenceThresholds,
    limit: usize,
    max_results: usize,
) -> Result<usize, PrecisionError>

/// クエリベクトルと候補 embedding の cosine 類似度を f64 で計算する。
/// ノルム 0・次元不一致・非有限結果は None（呼び出し元はゲートを空集合へ倒す）。
pub fn cosine_similarity(a: &[f32], b: &[f32]) -> Option<f64>

/// RRF 融合スコアを [0, 1] 近傍の共通尺度へ正規化する
/// （理論最大値 = (dense_weight + sparse_weight) / (k_const + 1)）。
pub fn rrf_normalized(score: f64, cfg: &crate::hybrid::RrfConfig) -> Option<f64>
```

## Notes

- 適用位置: `sql::exec::execute_statement` の DISTANCE 段（＋ `HINT ORDER` で SCALAR 事後フィルタが先行する場合はその後）の**後**、`RlsSafetyNet::apply` の**前**（ADR `docs/design/precision-confidence-gate.md`）。安全網は行を減らすことしかしないため、ゲート通過後に安全網が行を落としても「確信のない行が増える」方向にはならず fail-closed が保たれる。
- リランキング層（`rerank.rs`、SEARCH-7）が `sql::exec` へ接続された後もゲートの適用位置は変えない設計: 常に「実行経路の最終順位付けスコア」に対して判定する（候補生成スコアへは戻さない。リランキングが確信度判定を迂回する fail-open 経路になるのを防ぐため）。
- fail-open 経路の不在: `PrecisionPolicy` は `SessionState`・`BoundStatement`・SQL 構文のいずれにも対応するフィールド・句を持たず、外部入力（クエリ・セッション変数）から閾値を変更する経路は構造的に存在しない。`ConfidenceThresholds::new`／`PrecisionPolicy::new` は閾値 0・負値・非有限値を型レベルで拒否する。
- 既定値（`DEFAULT_*` 定数）は TASK-163（評価基準の実測・目標値確定）までの仮置き。hybrid の既定 `min_top1=0.98` は「両リストとも 1 位」=1.0・「両リストとも 2 位」≈0.984 の値域を踏まえ、単一検索器のみが 1 位に置いた候補（理論値の約半分）を意図的に通過させない値。
- ここでの `recall`/`precision` は本 crate の検索モード名（RRF 密+疎の網羅探索 vs 確信度ゲート付き高精度モード）であり、評価ハーネスの指標語。`openai-evals-tuning`／`anthropic-prompt-eval` の evals における precision/recall（LLM 出力の評価指標）とは別概念。

## Related

- [hybrid.md](./hybrid.md)
