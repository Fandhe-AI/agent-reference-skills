---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/incremental.rs
---

# incremental

増分インデックス反映モジュール（TASK-120、対象ビヘイビア: INDEX-1・INDEX-2）。ファイル形 `INSERT`（`sql::parser::BoundFileInsert`）1 件分を、チャンク化（`chunking::chunk_file`。TASK-119）→ 埋め込み（`embedding::Embedder`。write トランザクションの外で実行）→ テナント境界付き置換書き込み（`tenant::replace_typed_rows_by_text_key`）の順で結線する。`sql/exec.rs::execute_file_insert` から呼ばれる。途中で失敗した場合は write トランザクションを一切開始しない、または開始済みトランザクションを commit せず abort する（副作用ゼロ）。

## Signature / Usage

```rust,ignore
/// ファイル単位で生成してよいチャンク数の上限。埋め込み呼び出し・確保量を
/// 有界化する（DoS 対応）。一括投入 4 件上限（TASK-122）は本上限が代替しない。
pub const MAX_CHUNKS_PER_FILE: usize = 4_096;

/// 1 ファイル分のチャンク行として確保してよい総バイト数の上限（埋め込みベクトル +
/// 複製される Text 値 + チャンク本文の合計。codex-review P1 指摘・PR #221）。
pub const MAX_INDEX_TOTAL_BYTES: usize = 64 * 1024 * 1024;

/// index_file の挙動を調整する設定。
#[derive(Debug, Clone)]
pub struct IncrementalConfig {
    pub chunking: crate::chunking::ChunkingConfig,
    pub max_chunks_per_file: usize,
}

impl Default for IncrementalConfig {
    fn default() -> Self {
        Self {
            chunking: crate::chunking::ChunkingConfig::default(),
            max_chunks_per_file: MAX_CHUNKS_PER_FILE,
        }
    }
}

/// 各段階の所要時間（INDEX-1 の計測対象。ベンチマーク・回帰テスト TASK-121 向けに公開）。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct IndexTiming {
    pub chunking: Duration,
    pub embedding: Duration,
    /// 行バッファ構築 + tenant::replace_typed_rows_by_text_key の redb 書き込みの合計
    /// （codex-review P1 指摘・PR #241）。
    pub write: Duration,
}

/// index_file の成功応答。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct IndexOutcome {
    pub chunks_written: usize,
    pub rows_replaced: usize,
    pub timing: IndexTiming,
}

/// index_file の失敗理由。wire_code() で sql::allowlist::SqlSurfaceError への
/// 写像先を示す（実際の写像は sql/exec.rs::execute_file_insert が集約する）。
#[derive(Debug)]
pub enum IncrementalError {
    /// チャンク化入力・出力チャンク数の上限超過（54000 相当）。クライアント入力起因のみ。
    ChunkingTooLarge(String),
    /// サーバー側の事象に起因する失敗（XX000 相当）。detail は原因を展開しない固定文言のみ。
    Internal(&'static str),
    /// 埋め込みサービスの失敗・次元不一致（XX000 相当。応答本文・入力本文を含めない）。
    Embed(EmbedError),
    /// テナント境界付き書き込みの失敗（TenantWriteError をそのまま保持）。
    Write(TenantWriteError),
    /// チャンク化の結果、書き込み対象のチャンクが 0 件になった（22000 相当。
    /// 空・空白のみの本文で既存チャンクを全削除したまま挿入 0 件になる索引破壊を防ぐ）。
    EmptyChunks,
}

/// ファイル形 INSERT の束縛結果（sql::parser::bind_insert_form が構築）。
pub struct BoundFileIndexInput<'a> {
    pub table: &'a str,
    pub path: &'a str,
    pub body: &'a str,
    /// スキーマ列順のテンプレート値。path_column_index/body_column_index/VECTOR 列の
    /// 位置は呼び出し時点でプレースホルダ（Value::Null）でよい。
    pub template_values: &'a [Value],
    pub path_column_index: usize,
    pub body_column_index: usize,
    pub vector_column_index: usize,
}
```

## Notes

- 公開関数 `index_file` / `index_file_batch` は `pub(crate)` のためクレート外非公開（docs.rs source 実測）。`sql/exec.rs::execute_file_insert` が唯一の入口。
- `index_file` は内部的に副作用ゼロ区間の `chunk_phase`（チャンク化〜総バイト数上限判定まで）と、外部 I/O・write トランザクションを含む `embed_and_write_phase`（埋め込み〜置換書き込み）の 2 フェーズへ分割されている（TASK-122・INDEX-4）。`index_file_batch` はこの分割を利用し、バッチ内の全ファイルの `chunk_phase` を先に完走させてから全判定通過時のみ `embed_and_write_phase` を実行する。
- 同一パス再送時の置換セマンティクスは TASK-123 の決定に従う（`docs/design/resend-semantics.md`、`https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/docs/design/resend-semantics.md`）。

## Related

- [storage](./storage.md)
- [catalog](./catalog.md)
