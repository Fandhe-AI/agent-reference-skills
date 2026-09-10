---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/rerank.rs
---

# rerank

検索カーネルのリランキング層（TASK-107、対象ビヘイビア: SEARCH-6, SEARCH-7, SEARCH-8）。`hybrid.rs`（TASK-103）が生成する候補プール（`HybridHit` の列、既定 `pool_depth = 200`）を受け取り、最終上位 `final_k` 件へ再順位付けする。

## Signature / Usage

```rust,ignore
const MAX_POOL_DEPTH: usize = 10_000;
const MAX_QUERY_TEXT_BYTES: usize = 16 * 1024;
const MAX_CANDIDATE_TEXT_BYTES: usize = 1024 * 1024;
const MAX_TOTAL_CANDIDATE_TEXT_BYTES: usize = 64 * 1024 * 1024;

/// リランク対象の候補 1 件。
#[derive(Debug, Clone, Copy, PartialEq)]
pub struct RerankCandidate<'a> { pub id: u64, pub fused_score: f64, pub text: &'a str }

/// 再順位付け後の検索結果 1 件。
#[derive(Debug, Clone, Copy, PartialEq)]
pub struct RerankedHit { pub id: u64, pub score: f64 }

/// リランキング層の設定（既定 pool_depth=200・final_k=20）。
#[derive(Debug, Clone, Copy, PartialEq)]
pub struct RerankConfig { pool_depth: usize, final_k: usize }
impl RerankConfig {
    pub fn new(pool_depth: usize, final_k: usize) -> Result<Self, RerankError>
    pub fn pool_depth(&self) -> usize
    pub fn final_k(&self) -> usize
}

#[derive(Debug, Clone, PartialEq)]
pub enum RerankError {
    InvalidConfig,
    InvalidK,
    TooManyCandidates { len: usize, max: usize },
    DuplicateId,
    UnsortedInput,
    NonFiniteScore,
    ForeignId,
    DuplicateOutputId,
    InvalidOutputOrder,
    OversizedResult { len: usize, max: usize },
    QueryTextTooLong { len: usize, max: usize },
    CandidateTextTooLong { id: u64, len: usize, max: usize },
    TotalCandidateTextTooLong { total: usize, max: usize },
    CrossEncoder(CrossEncoderError),
}
impl fmt::Display for RerankError { ... }
impl std::error::Error for RerankError {}
impl From<CrossEncoderError> for RerankError { ... }

/// リランキング方式を差し替え可能にする trait（object-safe・&self のみ）。
pub trait Reranker: Send + Sync {
    fn rerank(&self, query_text: &str, candidates: &[RerankCandidate<'_>], final_k: usize)
        -> Result<Vec<RerankedHit>, RerankError>;
}

/// リランカーを呼び出し候補を再順位付けする入口。
pub fn rerank_candidates(
    reranker: &dyn Reranker,
    query_text: &str,
    candidates: &[RerankCandidate<'_>],
    cfg: &RerankConfig,
) -> Result<Vec<RerankedHit>, RerankError>

/// ベースライン参照実装: 候補の入力順序（融合スコア降順）をそのまま final_k 件へ切り詰める恒等リランカー。
#[derive(Debug, Clone, Copy, Default)]
pub struct IdentityReranker;
impl Reranker for IdentityReranker { fn rerank(...) -> Result<Vec<RerankedHit>, RerankError> }

/// RRF 型の順位ベース融合を、字句一致順位と融合スコア順位に対して適用する暫定リランカー。
/// 既定重み fused_weight:lexical_weight = 3.0:1.0。
#[derive(Debug, Clone, Copy)]
pub struct LexicalOverlapReranker { k_const: f64, fused_weight: f64, lexical_weight: f64 }
impl Default for LexicalOverlapReranker { fn default() -> Self }
impl LexicalOverlapReranker {
    pub fn new(k_const: f64, fused_weight: f64, lexical_weight: f64) -> Result<Self, RerankError>
}
impl Reranker for LexicalOverlapReranker { fn rerank(...) -> Result<Vec<RerankedHit>, RerankError> }

/// CrossEncoderReranker が使う推論バックエンドの抽象化。
pub trait CrossEncoderBackend: Send + Sync {
    fn score_pairs(&self, query: &str, passages: &[&str]) -> Result<Vec<f64>, CrossEncoderError>;
    fn max_seq_len(&self) -> usize;
}

#[derive(Debug, Clone, PartialEq)]
pub enum CrossEncoderError {
    InvalidConfig,
    Backend(String),
    LengthMismatch { expected: usize, got: usize },
    NonFiniteScore,
    TooManyCandidates { len: usize, max: usize },
    TruncationFailed,
    BackendSeqLenMismatch { backend: usize, configured: usize },
    QueryTextTooLong { len: usize, max: usize },
    CandidateTextTooLong { len: usize, max: usize },
    TotalCandidateTextTooLong { total: usize, max: usize },
}
impl fmt::Display for CrossEncoderError { ... }
impl std::error::Error for CrossEncoderError {}

#[derive(Debug, Clone, Copy, PartialEq)]
pub struct CrossEncoderConfig { batch_size: usize, max_candidates: usize, max_seq_len: usize }
impl CrossEncoderConfig {
    pub fn new(batch_size: usize, max_candidates: usize, max_seq_len: usize) -> Result<Self, CrossEncoderError>
    pub fn batch_size(&self) -> usize
    pub fn max_candidates(&self) -> usize
    pub fn max_seq_len(&self) -> usize
}

/// クロスエンコーダ型リランカー本体（Reranker 実装）。
pub struct CrossEncoderReranker<B: CrossEncoderBackend> { backend: B, cfg: CrossEncoderConfig }
impl<B: CrossEncoderBackend> CrossEncoderReranker<B> {
    pub fn new(backend: B, cfg: CrossEncoderConfig) -> Result<Self, CrossEncoderError>
}
impl<B: CrossEncoderBackend> Reranker for CrossEncoderReranker<B> { fn rerank(...) -> Result<Vec<RerankedHit>, RerankError> }

#[cfg(feature = "cross-encoder")]
pub mod cross_encoder_onnx;
```

### cross_encoder_onnx（`cross-encoder` feature 限定）

`ort`（ONNX Runtime）+ `tokenizers` による実推論バックエンド。承認済み依存（Issue #333 再 open コメント 2026-08-30）。

```rust,ignore
pub struct OnnxCrossEncoderBackend {
    session: Mutex<Session>,
    tokenizer: Tokenizer,
    max_seq_len: usize,
    has_token_type_ids: bool,
}
impl OnnxCrossEncoderBackend {
    /// model_path・tokenizer_path からバックエンドを構築する。
    pub fn from_files(model_path: &Path, tokenizer_path: &Path, max_seq_len: usize) -> Result<Self, CrossEncoderError>
}
```

## Notes

- `ORT_DYLIB_PATH` 未設定時は `from_files` 冒頭で `ort::` の他 API を一切呼ばずに `CrossEncoderError::Backend` を返す（`ort` の既定名前解決は `.expect(..)` で panic するため、library コードの panic 禁止規約に反しないよう自前でガードしている）。
- リランキング効果測定は ADR `docs/design/rerank-recall-regression.md`（TASK-108）が baseline（リランキングなし、hybrid_search 先頭 20 件）と after（`LexicalOverlapReranker::default()` 適用後）の Recall@20 を比較し、`after_hits20 >= baseline_hits20` の非劣化を層 A（`cargo test` 常時実行）でアサートする。
- fail-closed 契約: `Reranker` 実装（trait object）の出力が候補 id 集合外を含む場合は事後フィルタせず `RerankError::ForeignId` で検索全体を拒否する（件数差からの情報漏えいを避けるため）。
- This reranking layer is this crate's own in-process implementation (lexical overlap / cross-encoder ONNX), distinct from `@upstash/vector`'s managed reranking API (JS client over a hosted service). See `upstash` skill for the managed SaaS equivalent.

## Related

- [hybrid.md](./hybrid.md)
