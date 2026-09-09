---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/tiering.rs
---

# tiering

質問類型推定・ティアリング（TASK-115、対象ビヘイビア: PLAN-8）。自然言語の質問文と辞書的情報源（`dictionary.rs`）から、質問の類型（`QuestionClass`）と対話ティア／高精度ティアのどちらへ振り分けるか（`Tier`）を決定的・純粋に判定する層。`storage`/`catalog`/`policy` へは一切結線しない。

## Signature / Usage

```rust,ignore
pub const MAX_QUESTION_CHARS: usize = crate::query_planner::MAX_QUESTION_CHARS;
pub const MAX_TOKENS: usize = 256;

/// 質問の類型。既定の類型→ティア割り当ては tier_for_class を参照。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum QuestionClass {
    /// 具体的なシンボル名・パスを名指ししている（対話ティア相当）。
    Direct,
    /// 意図はあるが、具体的なシンボル名・パスの手掛かりがない。
    Intent,
    /// 概念・説明を求める抽象的な言い回し。
    Abstraction,
}

/// LLM クエリプランニングのティア。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Tier { Dialogue, HighPrecision }

/// classify の判定根拠（観測用）。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ClassificationSignal {
    SymbolMatch,
    PathMatch,
    AbstractionCue,
    NoCue,
    /// 判定不能な縮退入力（空・上限超過等）を fail-safe 側へ倒した。
    Degenerate,
}

/// classify の結果。tier は class から tier_for_class で導出した値（常に整合する）。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Classification { pub class: QuestionClass, pub tier: Tier, pub signal: ClassificationSignal }

pub fn tier_for_class(class: QuestionClass) -> Tier {
    match class {
        QuestionClass::Direct => Tier::Dialogue,
        QuestionClass::Intent | QuestionClass::Abstraction => Tier::HighPrecision,
    }
}

/// 判定基準の調整可能な既定値。
#[derive(Debug, Clone)]
pub struct TieringCriteria {
    pub abstraction_cues: BTreeSet<String>,
    pub path_like_extensions: BTreeSet<String>,
}
impl Default for TieringCriteria { fn default() -> Self { ... } }

/// Dictionary::file_tree・Dictionary::symbols を ASCII 小文字化した照会専用の索引。
#[derive(Debug, Clone, Default)]
pub struct NormalizedDictionaryIndex { path_tokens: BTreeSet<String>, symbol_names: BTreeSet<String> }
impl NormalizedDictionaryIndex {
    pub fn build(dictionary: &Dictionary) -> Self
    pub fn approx_heap_bytes(&self) -> usize
}

/// question と index（NormalizedDictionaryIndex）から質問類型を判定する。
pub fn classify(
    question: &str,
    index: &NormalizedDictionaryIndex,
    criteria: &TieringCriteria,
) -> Classification

/// ティア別 LlmClient を束ね、classify の結果に応じてどちらのクライアントを使うか選択する。
pub struct TieredPlanner {
    dialogue: Box<dyn crate::query_planner::LlmClient>,
    high_precision: Box<dyn crate::query_planner::LlmClient>,
    criteria: TieringCriteria,
}
impl TieredPlanner {
    pub fn new(
        dialogue: Box<dyn crate::query_planner::LlmClient>,
        high_precision: Box<dyn crate::query_planner::LlmClient>,
        criteria: TieringCriteria,
    ) -> Self
    pub fn select(
        &self,
        question: &str,
        index: &NormalizedDictionaryIndex,
    ) -> (&dyn crate::query_planner::LlmClient, Classification)
}
```

## Notes

- 判定優先順序（ADR `docs/design/query-tiering-criteria.md`）: パス様トークン一致を最優先とし、次に手掛かり語一致（抽象的な言い回し）、次に辞書シンボル名への完全一致、いずれにも一致しなければ意図型（`Intent`）とする。手掛かり語一致をシンボル名一致より先に判定するのは、一般英語と衝突しうるありふれた識別子（`new`・`main`・`read` 等）を辞書シンボル名が含みうるため、説明・意図の質問が対話ティアへ誤ってルーティングされるのを防ぐ fail-safe 上の判断（Bugbot 指摘対応・PR #261）。
- fail-safe の方向: 空入力・上限超過等の縮退時は `Intent`（＝高精度ティア）へ倒す（品質を優先する側を安全側とする）。
- 質問側トークンは空白区切り＋境界句読点除去に加え英語短縮形接尾辞（`'s`・`n't` 等）の除去も行い基底語へ正規化する（`what's` が手掛かり語 `what` と一致せずシンボル一致へフォールスルーする問題への対応、PR #261）。
- ティア別レイテンシ受け入れ基準は ADR `docs/design/tier-latency-acceptance.md`（TASK-116）が「実測層（bench・時間依存）／判定ロジック層（純関数、`make ci` 対象）」の 2 層構成で検証する。GitHub ホステッド runner には常駐 Ollama が無いため CI 常時実行の経路は無く、実測は運用者が承認済み手順で直接実行する（2026-08-29 初回実測実施、Accepted 化は保留）。判定基準・数値基準そのものは spec 側 SSOT のため未記載。

## Related

- [query-planner.md](./query-planner.md)
