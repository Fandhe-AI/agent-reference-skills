---
source: https://docs.rs/crate/fandhe-db-wire-server/0.2.0/source/src/dml_limits_opt.rs
---

# dml_limits_opt

`wire-server` バイナリ（`main.rs`）が起動時に受け取る `--max-dml-affected-rows` / `--max-insert-rows`（Issue #997）、`--batch-max-files`（Issue #1166）、分割実行 DML の `--partitioned-dml-*` 6 フラグ（Issue #1128・#1129）のパーサ・解決関数。プロセス全体に対する起動時 CLI のみ（セッション・テナント単位の設定は対象外）。

## Signature / Usage

~~~rust,ignore
pub const MAX_AFFECTED_ROWS_FLAG: &str = "--max-dml-affected-rows";
pub const MAX_INSERT_ROWS_FLAG: &str = "--max-insert-rows";
pub const BATCH_MAX_FILES_FLAG: &str = "--batch-max-files";

pub fn resolve(
    max_affected_rows_raw: Option<&str>,
    max_insert_rows_raw: Option<&str>,
) -> Result<DmlLimits, String>

pub fn resolve_batch_limits(
    base: engine::batch_limits::BatchLimits,
    raw: Option<&str>,
) -> Result<engine::batch_limits::BatchLimits, String>

pub fn resolve_partitioned_dml_limits(
    base: PartitionedDmlLimits,
    raw: PartitionedDmlRawFlags<'_>,
) -> Result<PartitionedDmlLimits, String>

pub fn insert_rows_cap_warning(
    limits: &DmlLimits,
    batch_limits: &engine::batch_limits::BatchLimits,
) -> Option<String>
~~~

## Options / Props

| Flag | Description |
|------|-------------|
| `--max-dml-affected-rows` | 述語形 UPDATE / DELETE の 1 文あたり影響行数上限 |
| `--max-insert-rows` | 複数行 `VALUES` の 1 文あたり行数上限 |
| `--batch-max-files` | `batch_limits.max_files_per_batch`。優先順位は CLI 明示 > 環境変数 `FANDHE_DB_BATCH_MAX_FILES` > 既定 64。範囲 `1..=MAX_BATCH_MAX_FILES` |
| `--partitioned-dml-chunk-rows` | 分割実行 DML のチャンク幅（1 チャンクの適用行数） |
| `--partitioned-dml-scan-budget` | チャンクごとの走査予算（行数） |
| `--partitioned-dml-max-hold-ms` | 1 チャンクの writer 保持時間上限（ミリ秒） |
| `--partitioned-dml-max-jobs-per-tenant` | テナント単位の同時実行数上限（既定 1・範囲 `1..=64`・全体の上限以下） |
| `--partitioned-dml-max-jobs` | プロセス全体の同時実行数上限（既定 4・範囲 `1..=64`） |
| `--partitioned-dml-max-interrupted-records` | `(tenant, table)` 単位の中断記録数上限（既定 1,000・範囲 `1..=1,000,000`） |

`PartitionedDmlRawFlags<'a>` は上記 6 フラグの生の値（未指定は `None`）を持つ `Default` 付き構造体（フィールド `chunk_rows` / `scan_budget` / `max_hold_ms` / `max_jobs_per_tenant` / `max_jobs` / `max_interrupted_records`、いずれも `Option<&'a str>`）。

## Notes

- オーナー判断の改訂（2026-09-27）: 汎用 RDB に合わせ、述語形 UPDATE / DELETE の影響行数上限と複数行 `VALUES` の行数上限は既定で無効（上限なし）。起動時フラグで明示指定した場合のみ有効。資源上限は既存の SQL 文長上限・1 文あたり総走査行数上限（`engine::tenant::MAX_SCANNED_ROWS`）で担保。
- `resolve` はフラグ未指定を `DmlLimits { max_affected_rows: None, max_insert_rows_per_statement: None }` とし、範囲外・不正値は `Err`（fail-closed。既定へ黙って読み替えない）。数値範囲 `MIN_DML_ROW_LIMIT..=MAX_DML_ROW_LIMIT` の判定は engine 側 `validate_dml_row_limit` が単一情報源で、本モジュールは厳密パース（ASCII 数字のみ。先頭 `+`・空白・全角数字を弾く）して渡すのみ。
- `main.rs` の引数ループは 2 回目以降の指定を fail-closed に拒否する（last-wins にしない）。
- `resolve_partitioned_dml_limits` は `Some` のフラグだけで `base`（`PartitionedDmlLimits::default`）を上書きし、最後に `PartitionedDmlLimits::validate`（テナント単位の同時実行数が全体を超える組合せも拒否）を通す。
- 複数行 `VALUES` は `max_insert_rows_per_statement` に加え `BatchLimits` の `max_files_per_batch`（既定 64。Issue #860）と `max_batch_chunks`（既定 4096）も通る多重ゲートで、実効上限は小さい方。`--max-insert-rows` がこの実効上限を超えると引き上げが黙って無効化されるため、明示指定時に限り `insert_rows_cap_warning` が英語の `WARNING` 文字列を返す（エラーにはしない。未指定は `None`）。`batch_limits` には main.rs が `EngineCore::with_batch_limits` へ渡すのと同じ解決済みの値を渡すこと。

## Related

- [limits.md](./limits.md)
- [main-cli.md](./main-cli.md)
- [durability-opt.md](./durability-opt.md)
