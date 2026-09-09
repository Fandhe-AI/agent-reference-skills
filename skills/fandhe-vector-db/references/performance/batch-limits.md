---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/batch_limits.rs
---

# batch-limits

一括投入（バッチファイル投入・インデクシング）の上限値と、その検証関数群。

## Signature / Usage

```rust
/// 一括投入 4 上限の設定値。
///
/// **既定値の出典に関する注記**（spec-confidentiality.md 準拠）: 具体的な上限
/// 数値は private spec（INDEX-4）の判断事項であり、本ソース（public リポ）に
/// 数値そのものとして固定しない。[`Default`] は環境変数による注入を優先し、
/// 未設定時は spec の決定値ではない保守的なプレースホルダー値へ fail-closed で
/// フォールバックする。実運用値は運用環境側で環境変数として注入する。
#[derive(Debug, Clone, Copy)]
pub struct BatchLimits {
    /// バッチあたり最大ファイル数。
    pub max_files_per_batch: usize,
    /// 1 ファイルあたり最大本文サイズ（バイト）。単一ファイル経由の
    /// `chunking::MAX_INPUT_BYTES` と一致させる。
    pub max_file_body_bytes: usize,
    /// バッチ合計最大サイズ（バイト）。全ファイルの `path` 長 + 本文長の合計。
    pub max_batch_total_bytes: usize,
    /// バッチあたり最大生成チャンク数（全ファイルの合計。サーバー側算定）。
    pub max_batch_chunks: usize,
}

/// [`validate_batch_shape`]・[`validate_chunk_total`]・[`validate_raw_sql_len`] の
/// 失敗理由。全 variant が `wire_code() == "54000"`（`PAYLOAD_TOO_LARGE`）へ
/// 写像される（ERR-2・TASK-152）。
#[derive(Debug)]
pub enum BatchLimitsError {
    TooManyFiles { count: usize, max: usize },
    /// `index` はバッチ内の 0 起点インデックス。
    FileBodyTooLarge { index: usize, len: usize, max: usize },
    /// 累算オーバーフローも本 variant へ倒す（`total` はオーバーフロー時 `usize::MAX`）。
    BatchTotalTooLarge { total: usize, max: usize },
    TooManyChunks { total: usize, max: usize },
    /// 解析前ガード: 1 文の生 SQL テキスト長が予算超過。束縛（トークン化・文字列
    /// 複製）より前の粗い早期リジェクト。
    SqlTextTooLarge { index: usize, len: usize, max: usize },
    BatchSqlTextTooLarge { total: usize, max: usize },
}

impl BatchLimitsError {
    /// SQLSTATE 風 `wire_code`（ERR-2 の共通分類）。
    pub fn wire_code(&self) -> &'static str;
}

/// ファイル数・ファイル単体本文サイズ・バッチ合計サイズを判定する
/// （バッチの解析段階。チャンク化・埋め込み・write トランザクションより前に
/// 呼ぶ契約。`incremental::index_file_batch` の唯一の呼び出し元）。
pub(crate) fn validate_batch_shape(
    files: &[(usize, usize)],
    limits: &BatchLimits,
) -> Result<(), BatchLimitsError>;

/// バッチあたり最大生成チャンク数を判定する（チャンク分割後・埋め込み処理の
/// 開始前に呼ぶ契約）。
pub(crate) fn validate_chunk_total(
    total_chunks: usize,
    limits: &BatchLimits,
) -> Result<(), BatchLimitsError>;

/// 束縛（`lexer::tokenize`・`bind_insert_form` の文字列複製）より前に、1 文の
/// 生 SQL テキスト長とバッチ内の累計テキスト長を判定する（解析前の粗い早期
/// リジェクト。codex-review 指摘・PR #242 対応）。
pub(crate) fn validate_raw_sql_len(
    index: usize,
    sql_len: usize,
    running_raw_total: usize,
    limits: &BatchLimits,
) -> Result<usize, BatchLimitsError>;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `max_files_per_batch` | `usize` | バッチあたり最大ファイル数（既定値は private spec 非公開のためプレースホルダー、環境変数で注入） |
| `max_file_body_bytes` | `usize` | 1 ファイルあたり最大本文サイズ。`chunking::MAX_INPUT_BYTES` と一致 |
| `max_batch_total_bytes` | `usize` | バッチ合計最大サイズ（`path` 長 + 本文長の合計） |
| `max_batch_chunks` | `usize` | バッチあたり最大生成チャンク数 |

## Notes

- `BatchLimits` の既定数値そのものは private spec（INDEX-4）の判断事項であり、本ソースにハードコードされた具体値は公開されていない（fail-closed なプレースホルダーへのフォールバックのみが公開挙動）。spec 非公開のため具体的な既定値は未記載。
- `validate_raw_sql_len` は束縛処理（トークン化・文字列複製）自体が入力サイズに比例したコストを要するため、束縛より前に生テキスト長で粗く早期リジェクトする防御層。正確な上限判定は束縛後の `validate_batch_shape` が最終防衛線として担う。
- 全エラー variant は `wire_code() == "54000"`（`PAYLOAD_TOO_LARGE`）へ写像される。

## Related

- [batch-search](./batch-search.md)
