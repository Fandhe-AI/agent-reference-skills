---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/embedding.rs
---

# embedding

埋め込み抽象モジュール（TASK-120、INDEX-1 / INDEX-2）。`incremental.rs` がファイル形 `INSERT` の増分インデックス反映時にチャンク本文をベクトルへ変換する差し替え可能な注入点（`Embedder` トレイト）と、決定的・ネットワーク不要な参照実装 `HashingEmbedder` を提供する。

## Signature / Usage

```rust,ignore
//! 埋め込み抽象モジュール（TASK-120、対象ビヘイビア: INDEX-1, INDEX-2。ポインタ:
//! `docs/spec/05-tasks.md` TASK-120・`docs/spec/04-behavior/indexing.md`
//! INDEX-1, INDEX-2）。
//!
//! 責務境界: `incremental.rs`（ファイル形 `INSERT` の増分インデックス反映）が
//! チャンク本文をベクトルへ変換する際に呼び出す差し替え可能な注入点を提供する。
//! 本モジュール自身は外部埋め込みサービスへ一切接続せず（`dependency-policy.md`:
//! 依存追加は本タスクのスコープ外）、決定的・ネットワーク不要な参照実装
//! [`HashingEmbedder`] のみを提供する。実サービス（Ollama 等）クライアントは
//! 独立した設計・レビュー単位として後続タスクの管轄とする（PR 本文「対象外」参照）。
//!
//! `core::EngineCore` は `Option<Box<dyn Embedder>>` として本 trait の実装を保持し
//! （[`Self::with_embedder`] で注入）、未設定時はファイル形 `INSERT` を fail-closed に
//! 拒否する（意味のないベクトルが黙って索引化される fail-open を防ぐ。
//! `core.rs` モジュールドキュメント参照）。

/// チャンク本文の列をベクトル列へ変換する差し替え可能な注入点。
///
/// 呼び出し元は `incremental.rs::index_file`（write トランザクションの外で実行し、
/// 単一ライタの長時間占有を防ぐ。coding-rust.md「不安全な設計 / DoS」対応）。
pub trait Embedder: Send + Sync {
    /// この実装が返すベクトルの次元。呼び出し元は対象テーブルの `VECTOR(N)` と
    /// 突き合わせて次元不一致を検出する（`TableSchema::validate_embedding_dim`）。
    fn dim(&self) -> u32;

    /// `texts` の各要素を同じ順序でベクトルへ変換する。
    ///
    /// - 戻り値の長さは `texts.len()` と一致する
    /// - 各ベクトルの長さは [`Self::dim`] と一致する
    /// - 入力本文（`texts`）をエラーへ含めない（security.md「エラー・ログ経由で
    ///   他テナントのデータ・存在情報を漏らさない」と同じ方針。本文は untrusted）
    fn embed_batch(&self, texts: &[&str]) -> Result<Vec<Vec<f32>>, EmbedError>;
}

/// [`Embedder::embed_batch`] の失敗理由。
///
/// メッセージは英語（japanese-style.md: プログラム出力文字列は英語）。入力本文・
/// 応答本文を含めない（security.md P0）。
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum EmbedError {
    /// 埋め込みサービスが利用不能（未接続・タイムアウト等。実サービス実装向け。
    /// 参照実装 [`HashingEmbedder`] は返さない）。
    Unavailable,
    /// 埋め込みサービスの応答が想定形状ではなかった（実サービス実装向け）。
    InvalidResponse,
    /// 返されたベクトルの次元が [`Embedder::dim`] と一致しなかった。
    DimMismatch { expected: u32, got: usize },
    /// 1 回のバッチ呼び出しに対する入力件数が上限を超えた
    /// （coding-rust.md「長さフィールドは上限検証してからアロケーションに使う」対応）。
    TooManyInputs { len: usize, max: usize },
    /// 構築時に指定された次元が受理範囲（`1..=`[`MAX_EMBEDDER_DIM`]）外だった
    /// （codex-review P1 指摘・PR #221。無検証の巨大次元で infallible な確保を
    /// 行わないため、構築を `Result` にして境界で弾く）。
    InvalidDim { dim: u32, max: u32 },
    /// ベクトル確保に失敗した（メモリ逼迫）。`vec![]` の infallible 確保による
    /// abort を避け、`try_reserve_exact` の失敗をエラーとして返す。
    AllocationFailed,
}

/// 1 回の [`Embedder::embed_batch`] 呼び出しで受理する最大入力件数。
///
/// `incremental.rs` のファイル単位チャンク数上限（`MAX_CHUNKS_PER_FILE`）とは
/// 独立した本モジュール自身の防御線（呼び出し元の上限設定に関わらず、確保量を
/// 有界に保つ）。
pub const MAX_EMBED_BATCH: usize = 8_192;

/// [`Embedder`] 実装が受理してよい最大次元。カタログの `VECTOR(N)` 上限
/// （`storage::MAX_EMBEDDING_DIM`）と同値に固定する（この上限を超える次元は
/// どのみちテーブルへ書けないため、埋め込み側で先に弾いて確保量を有界にする）。
pub const MAX_EMBEDDER_DIM: u32 = crate::storage::MAX_EMBEDDING_DIM;

/// 決定的・ネットワーク不要な参照実装（feature hashing → 固定次元 → L2 正規化）。
///
/// **意味的埋め込みではない**（類似語・類義語を近づける学習済みモデルを一切
/// 使わない、小文字化トークンのハッシュ値による決定的な特徴射影）。用途はテスト・
/// ローカル検証・TASK-121（増分/全再構築比率の受け入れ基準回帰）の計測であり、
/// 検索品質（Recall）の実運用基準にはならない。
#[derive(Debug, Clone)]
pub struct HashingEmbedder {
    dim: u32,
}

impl HashingEmbedder {
    /// `dim` で参照実装を構築する。受理範囲は `1..=`[`MAX_EMBEDDER_DIM`]。
    ///
    /// 範囲外を `Result` で拒否する（`embed_batch` が入力ごとに `dim` 要素を確保する
    /// ため、未検証の巨大次元を受け付けると `Result` を返す API でありながら確保失敗が
    /// abort になる。codex-review P1 指摘・PR #221。coding-rust.md「長さフィールドは
    /// 上限検証してからアロケーションに使う」）。
    pub fn new(dim: u32) -> Result<Self, EmbedError> { /* ... */ }
}

impl Embedder for HashingEmbedder {
    fn dim(&self) -> u32 { /* ... */ }

    fn embed_batch(&self, texts: &[&str]) -> Result<Vec<Vec<f32>>, EmbedError> { /* ... */ }
}
```

## Notes

- モジュール冒頭の `//!` ドキュメントによれば、`Embedder` の実装は 0.1.0 時点で `HashingEmbedder`（決定的参照実装）のみ提供され、外部埋め込みサービス（Ollama 等）クライアントは「独立した設計・レビュー単位として後続タスクの管轄」であり本モジュールのスコープ外
- `core::EngineCore` は `Option<Box<dyn Embedder>>` として実装を保持し（`with_embedder` で注入）、未設定時はファイル形 `INSERT` を fail-closed に拒否する
- 1 語をハッシュして次元へ加算する private ヘルパー（`hash_token_into`、FNV-1a 使用）が実装内部に存在するが `pub` ではないため公開 API には含まれない
- Different from `upstash` (`@upstash/vector` embedding models) and `openai-api-core` / `anthropic-api-core` embedding APIs — this module is engine-internal layout/handling of embedding values (a deterministic test-only reference implementation), not a hosted embedding model API
- TASK-120 / INDEX-1 / INDEX-2 / TASK-121 は private spec（`docs/spec`）へのポインタのみ。spec 非公開のため判断理由・受入基準は未記載
- 0.1.0 時点の公開表面。安定性未確認のため利用前にソースを確認すること

## Related

- [chunking](./chunking.md)
