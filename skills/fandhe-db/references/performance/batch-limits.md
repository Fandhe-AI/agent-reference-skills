---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/batch_limits.rs
---

# batch-limits

一括投入（バッチファイル投入・インデクシング・複数行 `VALUES`・`COPY FROM STDIN`）の上限値と、その検証関数群。

## Signature / Usage

```rust
/// 一括投入 4 上限の設定値。既定値は [`Default`] 実装を参照。
///
/// `max_files_per_batch` の優先順位は「wire-server の CLI `--batch-max-files`
/// 明示 > 環境変数 `FANDHE_DB_BATCH_MAX_FILES` > 既定 64」（Issue #1166）。
/// 値は `1..=`[`MAX_BATCH_MAX_FILES`] に限定され、この範囲では
/// `batch_raw_sql_len_budget` の飽和演算がオーバーフローしない。
#[derive(Debug, Clone, Copy)]
pub struct BatchLimits {
    /// ① バッチあたり最大ファイル数。
    pub max_files_per_batch: usize,
    /// ② 1 ファイルあたり最大本文サイズ（バイト）。単一ファイル経由の
    /// `chunking::MAX_INPUT_BYTES` と一致させる。
    pub max_file_body_bytes: usize,
    /// ③ バッチ合計最大サイズ（バイト）。全ファイルの `path` 長 + 本文長の合計。
    pub max_batch_total_bytes: usize,
    /// ④ バッチあたり最大生成チャンク数（全ファイルの合計。サーバー側算定）。
    pub max_batch_chunks: usize,
}

/// `max_files_per_batch` の既定値（環境変数未設定・不正値時のフォールバック）。
pub const DEFAULT_MAX_FILES_PER_BATCH: usize = 64;

/// `max_files_per_batch` に設定できる上限。`--max-insert-rows` と範囲を揃える
/// ため既存公開定数 [`crate::sql::parser::MAX_DML_ROW_LIMIT`] を再利用する。
pub const MAX_BATCH_MAX_FILES: usize = crate::sql::parser::MAX_DML_ROW_LIMIT;

/// [`validate_max_files_per_batch`] の範囲外エラー。`Display` は値と範囲のみを含む。
#[derive(Debug, PartialEq, Eq)]
pub struct MaxFilesPerBatchOutOfRange { /* value: usize（非公開） */ }

/// `max_files_per_batch` の設定値を `1..=`[`MAX_BATCH_MAX_FILES`] で検証する
/// 単一情報源。CLI `--batch-max-files` と環境変数 `FANDHE_DB_BATCH_MAX_FILES` の両経路から使われる。
pub fn validate_max_files_per_batch(value: usize) -> Result<usize, MaxFilesPerBatchOutOfRange>;

/// 改名前（プロジェクト名 vector-db 時代）の環境変数名と、その後継名の対応表。
/// 旧名は読まない（値を一切適用しない）。
pub const LEGACY_BATCH_ENV_VARS: [(&str, &str); 3] = [
    ("VECTOR_DB_BATCH_MAX_FILES", "FANDHE_DB_BATCH_MAX_FILES"),
    ("VECTOR_DB_BATCH_MAX_TOTAL_BYTES", "FANDHE_DB_BATCH_MAX_TOTAL_BYTES"),
    ("VECTOR_DB_BATCH_MAX_CHUNKS", "FANDHE_DB_BATCH_MAX_CHUNKS"),
];

/// 現在のプロセス環境に設定されている旧名の一覧を `(旧名, 新名)` で返す。値は読まず
/// 存在のみを見る。wire-server の起動時に呼ばれ、1 変数 1 行の警告を出す。engine 自身は出力しない。
pub fn legacy_batch_env_vars_set() -> Vec<(&'static str, &'static str)>;

/// [`validate_batch_shape`]・[`validate_chunk_total`]・[`validate_raw_sql_len`] の
/// 失敗理由。全 variant が `wire_code() == "54000"`（`PAYLOAD_TOO_LARGE`）へ写像
/// される（ERR-2・TASK-152）。
#[derive(Debug)]
pub enum BatchLimitsError {
    TooManyFiles { count: usize, max: usize },
    /// `index` はバッチ内の 0 起点インデックス。
    FileBodyTooLarge { index: usize, len: usize, max: usize },
    /// 累算オーバーフローも本 variant へ倒す（`total` はオーバーフロー時 `usize::MAX`）。
    BatchTotalTooLarge { total: usize, max: usize },
    TooManyChunks { total: usize, max: usize },
    /// 解析前ガード: 1 文の生 SQL テキスト長が予算超過。
    SqlTextTooLarge { index: usize, len: usize, max: usize },
    BatchSqlTextTooLarge { total: usize, max: usize },
}

impl BatchLimitsError {
    /// SQLSTATE 風 `wire_code`（ERR-2 の共通分類）。常に "54000"。
    pub fn wire_code(&self) -> &'static str;
}

/// ①②③（ファイル数・ファイル単体本文サイズ・バッチ合計サイズ）を判定する
/// （バッチの解析段階。チャンク化・埋め込み・write トランザクションより前に呼ぶ契約）。
pub(crate) fn validate_batch_shape(
    files: &[(usize, usize)],
    limits: &BatchLimits,
) -> Result<(), BatchLimitsError>;

/// ④（バッチあたり最大生成チャンク数）を判定する。
pub(crate) fn validate_chunk_total(
    total_chunks: usize,
    limits: &BatchLimits,
) -> Result<(), BatchLimitsError>;

/// 束縛より前に、1 文の生 SQL テキスト長とバッチ内の累計テキスト長を判定する（解析前の粗い早期リジェクト）。
pub(crate) fn validate_raw_sql_len(
    index: usize,
    sql_len: usize,
    running_raw_total: usize,
    limits: &BatchLimits,
) -> Result<usize, BatchLimitsError>;

/// ①②③ を COPY FROM STDIN のストリーミング受信中に逐次判定する（Issue #939・WIRE-17）。
pub(crate) fn check_row_count(count: usize, limits: &BatchLimits) -> Result<(), BatchLimitsError>;
pub(crate) fn check_row_body_len(index: usize, len: usize, limits: &BatchLimits) -> Result<(), BatchLimitsError>;
pub(crate) fn check_running_total(running: usize, add: usize, limits: &BatchLimits) -> Result<usize, BatchLimitsError>;
```

## Options / Props

| Name | Type | Default | Description |
|------|------|------|-------------|
| `max_files_per_batch` | `usize` | `64`（`DEFAULT_MAX_FILES_PER_BATCH`） | バッチあたり最大ファイル数。SQL 複数行 `VALUES`・NoSQL `insert` の `rows[]`・ファイル形バッチ・`COPY FROM STDIN` が共有。優先順位は CLI `--batch-max-files` > 環境変数 `FANDHE_DB_BATCH_MAX_FILES` > 既定。範囲 `1..=1_000_000`（`MAX_BATCH_MAX_FILES`） |
| `max_file_body_bytes` | `usize` | `chunking::MAX_INPUT_BYTES`（`16 * 1024 * 1024`） | 1 ファイルあたり最大本文サイズ。`chunking::MAX_INPUT_BYTES` と一致 |
| `max_batch_total_bytes` | `usize` | `incremental::MAX_INDEX_TOTAL_BYTES`（`64 * 1024 * 1024`） | バッチ合計最大サイズ（`path` 長 + 本文長の合計）。環境変数 `FANDHE_DB_BATCH_MAX_TOTAL_BYTES` で上書き |
| `max_batch_chunks` | `usize` | `incremental::MAX_CHUNKS_PER_FILE`（`4_096`） | バッチあたり最大生成チャンク数。環境変数 `FANDHE_DB_BATCH_MAX_CHUNKS` で上書き |

## Notes

- 既定値は 0.2.0 ソースの `impl Default for BatchLimits`（`max_files_per_batch` は `parse_env_max_files`、他 2 つは `env_usize_or`）と既存公開定数から確認した値。ソース doc は依然として「具体的な上限数値は private spec（INDEX-4）の判断事項で、実装既定値は本リポ独自の保守的な値」と記載しており、spec 側の決定値ではない。
- `max_files_per_batch` の環境変数は範囲外（0・上限超過）・非数値・未設定のいずれも既定 64 へ倒れる。`FANDHE_DB_BATCH_MAX_TOTAL_BYTES` / `FANDHE_DB_BATCH_MAX_CHUNKS` は未設定・空文字・非数値・0 でフォールバック（上限チェックは無い）。
- `validate_raw_sql_len` は束縛処理（トークン化・文字列複製）自体が入力サイズに比例したコストを要するため、束縛より前に生テキスト長で粗く早期リジェクトする防御層。正確な上限判定は束縛後の `validate_batch_shape` が最終防衛線として担う。
- 全エラー variant は `wire_code() == "54000"`（`PAYLOAD_TOO_LARGE`）へ写像される。
- Migration (0.1.0 → 0.2.0): 環境変数は `VECTOR_DB_BATCH_MAX_FILES` / `VECTOR_DB_BATCH_MAX_TOTAL_BYTES` / `VECTOR_DB_BATCH_MAX_CHUNKS` から `FANDHE_DB_BATCH_MAX_FILES` / `FANDHE_DB_BATCH_MAX_TOTAL_BYTES` / `FANDHE_DB_BATCH_MAX_CHUNKS` へ改名された。旧名は読まれず（設定しても既定の上限が適用される）、設定されていれば起動時に stderr へ警告が出る（CHANGELOG 0.2.0）。新規 pub: `DEFAULT_MAX_FILES_PER_BATCH` / `MAX_BATCH_MAX_FILES` / `MaxFilesPerBatchOutOfRange` / `validate_max_files_per_batch` / `LEGACY_BATCH_ENV_VARS` / `legacy_batch_env_vars_set`、CLI `--batch-max-files`。
- `check_row_count` / `check_row_body_len` / `check_running_total`（COPY 用）は `pub(crate)`。COPY では「ファイル数」を行数、「本文サイズ」を 1 行あたりのデコード後バイト量と読み替え、合計は生 CopyData バイト量を累算する。

## Related

- [batch-search](./batch-search.md)
