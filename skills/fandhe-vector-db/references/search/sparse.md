---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/sparse.rs
---

# sparse

疎検索（BM25 Okapi）モジュール（TASK-102、対象ビヘイビア: SEARCH-1, SEARCH-3）。転置索引（posting list）＋可視ビットマップ 1 パス走査方式（Issue #386 Phase 1）で、コーパス文書数 `N` に対する posting へのスコアリング走査を排除している。

## Signature / Usage

```rust,ignore
pub type DocId = u64;

/// 疎検索モジュールの公開エラー型。fail-closed 方針に従い異常入力を明示的に拒否する。
#[derive(Debug, Clone, PartialEq)]
pub enum SparseError {
    EmptyCorpus,
    DuplicateDocId(DocId),
    InvalidParams { k1: f64, b: f64 },
    TooManyQueryTerms { unique_terms: usize, max: usize },
    QueryTooLong { len: usize, max: usize },
    DocTooLong { doc_id: DocId, len: usize, max: usize },
    TooManyDocs { len: usize, max: usize },
    CorpusTooLarge { total: usize, max: usize },
    TooManyTokens { total: usize, max: usize },
    LenClassBuildFailed,
}
impl std::fmt::Display for SparseError { }
impl std::error::Error for SparseError { }

/// Top-k 検索結果 1 件（文書 ID と BM25 スコア）。
#[derive(Debug, Clone, PartialEq)]
pub struct ScoredDoc {
    pub doc_id: DocId,
    /// BM25 スコア（降順ソート済み。同点は doc_id 昇順でタイブレークする）。
    pub score: f64,
}

/// クエリ・文書テキストをトークン列へ分割する（TASK-102 の簡易トークナイザ）。
pub fn tokenize(text: &str) -> Vec<String>;

/// tokenize の CJK ストップワード除去有無を選べる版（TASK-105・SEARCH-5）。
pub fn tokenize_with_options(text: &str, remove_stopwords: bool) -> Vec<String>;

/// Okapi BM25 による疎検索インデックス。
#[derive(Debug)]
pub struct SparseIndex { /* private fields */ }
impl SparseIndex {
    /// 既定パラメータ（k1 = 1.2, b = 0.75）でインデックスを構築する。
    pub fn build(docs: &[(DocId, &str)]) -> Result<Self, SparseError>;
    /// k1・b を明示してインデックスを構築する。
    pub fn with_params(docs: &[(DocId, &str)], k1: f64, b: f64) -> Result<Self, SparseError>;
    /// クエリに対する BM25 スコア降順の Top-k を返す。
    pub fn search(&self, query: &str, k: usize) -> Result<Vec<ScoredDoc>, SparseError>;
    /// search のテナント境界付き版。
    pub fn search_within(&self, query: &str, k: usize, visible_ids: &BTreeSet<DocId>) -> Result<Vec<ScoredDoc>, SparseError>;
    /// スコア > 0 の可視ヒット全件を返す（ラウンドごとの再計算回避、Issue #392）。
    pub fn score_within(&self, query: &str, visible_ids: &BTreeSet<DocId>) -> Result<SparseScored, SparseError>;
    /// 索引の推定ヒープ占有バイト数（Issue #357・SparseIndexCache の退避判定）。
    pub fn approx_heap_bytes(&self) -> usize;
}

/// SparseIndex::score_within が返す、1 クエリ分のスコア済み候補集合（Issue #392）。
#[derive(Debug)]
pub struct SparseScored { /* private fields */ }
impl SparseScored {
    /// スコア > 0 の可視ヒット総数。
    pub fn len(&self) -> usize;
    pub fn is_empty(&self) -> bool;
    /// スコア降順（同点は doc_id 昇順）で先頭 k 件を返す。
    pub fn top(&mut self, k: usize) -> Vec<ScoredDoc>;
}
```

## Notes

- ADR `docs/design/sparse-inverted-index.md`（Accepted、Issue #386 Phase 1）: 旧実装（クエリ毎に全文書を線形走査）を term インターニング（`TermId`）＋posting list（`postings: Vec<Vec<(doc_idx, tf)>>`）へ再構成し、`hybrid_rrf` の相対コストを密 KNN 単体比で before 10.63x → after 1.38x へ縮小した。
- CJK ストップワード除去（`tokenize_with_options`）は日本語コーパスへの影響を ADR `docs/design/cjk-tokenizer-impact-ja-corpus.md`（`extensions` scope 管轄）で検証している。
- BM25 は本 crate 内蔵の疎検索インデックス実装（Rust、インプロセス）であり、`@upstash/vector` のマネージド sparse index（JS client、hosted service）とは別物。
- 疎索引・RRF 融合の Recall 回帰は ADR `docs/design/hybrid-recall-regression.md` を参照（テスト構成の詳細は `hybrid.md` の Notes 参照）。

## Related

- [hybrid.md](./hybrid.md)
