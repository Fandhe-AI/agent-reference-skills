---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/query_planner.rs
---

# query_planner

LLM クエリプランニング（TASK-110、対象ビヘイビア: PLAN-1）。常駐 LLM プロセス（Ollama 等）に対する純粋なクエリ展開クライアント層。`storage`/`catalog`/`policy` へは一切結線しない。辞書的情報源（`dictionary.rs`）から得た `Arc<Dictionary>` を固定接頭辞コンテキストへレンダリングし、質問文と連結したプロンプトを `LlmClient` へ渡し、応答を厳格に検証済みの `QueryExpansion` へパースする。

## Signature / Usage

```rust,ignore
/// LlmClient::complete の失敗理由。
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum PlanError {
    Unavailable,
    Timeout,
    InvalidResponse,
    ResponseTooLarge,
    PromptTooLarge,
    /// 名前解決先がループバック以外だった（SSRF 対策の fail-closed 拒否、codex-review PR #252 P0 指摘）。
    UnsafeTarget,
}
impl std::fmt::Display for PlanError { }
impl std::error::Error for PlanError {}

/// 常駐 LLM プロセスに対するクエリ展開の差し替え可能な注入点。
pub trait LlmClient: Send + Sync {
    fn complete(&self, prompt: &str) -> Result<String, PlanError>;
}

/// クエリ展開結果。ハードフィルタ化はしないソフトな補助情報。#[non_exhaustive]（TASK-164）。
#[derive(Debug, Clone, Default, PartialEq, Eq)]
#[non_exhaustive]
pub struct QueryExpansion {
    pub search_terms: Vec<String>,
    pub path_hint: Option<String>,
    pub kind_hint: Option<String>,
    /// LLM による取得モード（recall/precision）推定（TASK-164・PLAN-11）。
    pub mode_hint: Option<crate::sql::mode::SearchMode>,
}

/// QueryExpansion とその mode_hint を明示指定と突き合わせて解決した実効モードの組。
#[derive(Debug, Clone, PartialEq, Eq)]
#[non_exhaustive]
pub struct PlannedQuery { expansion: QueryExpansion, mode: crate::sql::mode::ResolvedMode }
impl PlannedQuery {
    pub fn expansion(&self) -> &QueryExpansion
    pub fn mode(&self) -> crate::sql::mode::ResolvedMode
}

pub const MAX_PROMPT_PREFIX_BYTES: usize = 64 * 1024;
pub const MAX_QUESTION_CHARS: usize = 2_000;
pub const MAX_PROMPT_BYTES: usize = 256 * 1024;
pub const MAX_SEARCH_TERMS: usize = 32;
pub const MAX_TERM_LEN: usize = 128;
pub const MAX_HINT_LEN: usize = 256;
pub const MAX_RESPONSE_BYTES: usize = 1024 * 1024;
pub const DEFAULT_OLLAMA_HOST: &str = "127.0.0.1";
pub const DEFAULT_OLLAMA_PORT: u16 = 11434;

pub fn render_prompt_prefix(dictionary: &crate::dictionary::Dictionary) -> String
pub fn sanitize_question(question: &str) -> String
pub fn render_full_prompt(prefix: &str, question: &str) -> Result<String, PlanError>
pub fn render_reembedding_text(question: &str, expansion: &QueryExpansion) -> String
pub fn reembed_expansion(
    embedder: &dyn crate::embedding::Embedder,
    question: &str,
    expansion: &QueryExpansion,
) -> Result<Vec<f32>, crate::embedding::EmbedError>

#[derive(Debug, Clone, PartialEq)]
pub struct EmbeddedQuery { pub expansion: QueryExpansion, pub embedding: Vec<f32> }

/// LLM 応答の JSON を厳格パースし QueryExpansion を返す。
pub fn parse_expansion(response: &str) -> Result<QueryExpansion, PlanError>

/// Ollama（POST /api/generate、stream: false）に対する LlmClient 実装。
#[derive(Debug, Clone)]
pub struct OllamaConfig { host: String, port: u16, pub model: String, pub connect_timeout: Duration, pub read_timeout: Duration, pub keep_alive: String }
impl OllamaConfig {
    pub fn new(model: impl Into<String>) -> Self
    /// host が IP リテラルとして解釈できループバック以外なら PlanError::UnsafeTarget で拒否する。
    pub fn with_host(mut self, host: impl Into<String>) -> Result<Self, PlanError>
    pub fn with_port(mut self, port: u16) -> Self
    pub fn host(&self) -> &str
    pub fn port(&self) -> u16
}

#[derive(Debug, Clone)]
pub struct OllamaClient { config: OllamaConfig }
impl OllamaClient { pub fn new(config: OllamaConfig) -> Self }
impl LlmClient for OllamaClient { fn complete(&self, prompt: &str) -> Result<String, PlanError> }
```

## Notes

- SSRF 対策: `OllamaConfig::with_host` は IP リテラル指定時にループバック以外を構築時点で拒否する（codex-review PR #252 P0 指摘）。プロンプトはテナント固有情報を含みうるため、ループバック以外の宛先へ送信しうる構成を許さない。
- `QueryExpansion`／`PlannedQuery` は `#[non_exhaustive]`（TASK-164 で `mode_hint` 追加時に付与した意図的な破壊的変更）。クレート外の構造体リテラル構築は `QueryExpansion::default()` ＋フィールド代入形式が必須。
- `parse_expansion` は自前実装の再帰下降 JSON パーサ（`JsonParser`）で JSON 深度・文字列長・コンテナ要素数に上限を設ける（`MAX_JSON_DEPTH`・`MAX_JSON_STRING_CHARS`・`MAX_JSON_CONTAINER_ITEMS`。DoS 対策）。
- `render_prompt_prefix`／`sanitize_question`／`render_full_prompt` はいずれもバイト数上限（`MAX_PROMPT_PREFIX_BYTES`・`MAX_QUESTION_CHARS`・`MAX_PROMPT_BYTES`）を検証してから文字列を組み立てる。
- 辞書スナップショット（`dictionary_snapshot`。テナント境界の担保）との結線・`EngineCore` への注入点は `core.rs::EngineCore::with_query_planner`／`plan_query` の管轄で、本モジュールへは持ち込まない。
- クエリ展開の Recall 回帰は `docs/design/query-planning-recall-regression.md`（TASK-110〜113 関連、詳細は spec 非公開のため未記載）で検証されている。

## Related

- [tiering.md](./tiering.md)
