---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/constraint.rs
---

# constraint

行単位の宣言的制約（`PRIMARY KEY` 宣言・UNIQUE 制約・`CHECK` 制約。TABLE-16・TASK-204）と `FOREIGN KEY` 制約（TABLE-17・TASK-205）を検査する単一の検査点。書き込んだ行の検査の入口は `enforce_row_constraints_in_txn`、参照先側（削除・更新された行を参照する行が残っていないか）の入口は `enforce_referencing_rows_in_txn`。`src/constraint/unique_index.rs`（永続一意索引 `user_uniq/{table}`）を同モジュール配下に含む。すべて `pub(crate)` でクレート外へは公開されない。

## Signature / Usage

```rust,ignore
mod unique_index;

/// 一意キー 1 個分の NULL の扱い。`key_index.rs` も永続索引のキー正準化に
/// 共有する（索引は常に [`NullPolicy::Skip`] で使う。索引化と主キーの NULL
/// 拒否は別の関心事のため）。
#[derive(Clone, Copy, PartialEq, Eq)]
pub(crate) enum NullPolicy {
    /// 主キー: 構成列の NULL は内部矛盾（`nullable == false` が不変条件）。
    Reject,
    /// UNIQUE 制約・永続キー索引: NULL を含む行は対象外（NULLS DISTINCT）。
    Skip,
}

#[derive(Clone, Copy, PartialEq, Eq)]
pub(crate) enum FkCheckMode {
    All,
    ImmediateOnly,
}

/// `tenant.rs` の各書き込み関数が書き込み後・commit 前に呼ぶ唯一の入口
/// （TABLE-16・TASK-204）。永続キー索引（`key_index.rs`、Issue #1071）の同期 →
/// `CHECK` 制約（Issue #906）→ 一意性制約（主キー・UNIQUE）→ `FOREIGN KEY` の
/// 参照元側（TABLE-17・TASK-205、Issue #907。書いた行が参照する値の組が
/// 参照先に存在するか）の順に検査する。
pub(crate) fn enforce_row_constraints_in_txn(
    write_txn: &redb::WriteTransaction,
    table_name: &str,
    schema: &TableSchema,
    tenant_id: &str,
    written_ids: &[u64],
    fk_mode: FkCheckMode,
) -> Result<crate::key_index::KeyIndexDelta, TenantWriteError> { /* ... */ }

pub(crate) fn enforce_unique_keys_in_txn(
    write_txn: &redb::WriteTransaction,
    table_name: &str,
    schema: &TableSchema,
    tenant_id: &str,
    written_ids: &[u64],
) -> Result<(), TenantWriteError> { /* ... */ }

/// 参照先テーブルの行に加えた変更の種類（[`enforce_referencing_rows_in_txn`] の
/// 引数。TABLE-17・TASK-205、Issue #907）。
#[derive(Clone, Copy)]
pub(crate) enum ReferencedRowsChange<'a> {
    Removed { ids: &'a [u64] },
    ColumnsUpdated { indices: &'a [usize], delta: &'a crate::key_index::KeyIndexDelta },
    AllColumnsReplaced { delta: &'a crate::key_index::KeyIndexDelta },
    Truncated,
}

pub(crate) const MAX_REFERENTIAL_ACTION_DEPTH: u32 = 16;
pub(crate) const MAX_REFERENTIAL_ACTION_ROWS: u32 = 10_000;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `FkCheckMode::All` | enum variant | autocommit（1 文 = 1 トランザクション）は常に `All`。遅延指定（`DEFERRABLE` / `INITIALLY DEFERRED`）でも文単位で必ず検査する |
| `FkCheckMode::ImmediateOnly` | enum variant | 明示トランザクション中の `tenant::WriteTarget::InTxn` 経路のみ。`INITIALLY DEFERRED` の FK を文単位検査から除外し COMMIT 時（`enforce_deferred_foreign_keys_in_txn`）へ先送りする |
| `ReferencedRowsChange::Removed { ids }` | variant | 行の削除。参照アクションを発火させる |
| `ReferencedRowsChange::ColumnsUpdated { indices, delta }` | variant | 指定列のみの更新（`UPDATE ... SET`・UPSERT の `DO UPDATE SET`）。`id` は `SET` できないため失われない |
| `ReferencedRowsChange::AllColumnsReplaced { delta }` | variant | 既存行の全列置換（Rust API の `update_row`） |
| `ReferencedRowsChange::Truncated` | variant | `TRUNCATE`。参照アクションを発火させず、事後検証（NO ACTION の背後保証）のみ行う |
| `MAX_REFERENTIAL_ACTION_DEPTH` | `u32` = 16 | ON DELETE / ON UPDATE 連鎖の 1 文あたり最大深さ（元の文を 0 段目とする）。実装既定値で spec 由来ではない |
| `MAX_REFERENTIAL_ACTION_ROWS` | `u32` = 10_000 | 連鎖が 1 文あたりに削除・更新してよい自テナント所有の子行の総数。実装既定値で spec 由来ではない |

## Notes

- 検査順序: 永続キー索引の同期 → `CHECK` → 一意性（主キー・UNIQUE）→ `FOREIGN KEY` 参照元側。`CHECK` は一意性制約より先に評価され、両方に違反する行は `23514`（PostgreSQL の評価順序に倣う）。
- 呼び出し契約: `tenant.rs` の各書き込み関数が「`operation_id` 台帳への記録 → 行の書き込み」の後・テーブル世代 bump・commit の前に同一 write トランザクション内から呼ぶ。台帳照合を先に行うため `operation_id` の再送判定（`23505` / `22023`）が本検査より優先される。
- 主キー・UNIQUE・CHECK・FOREIGN KEY のいずれも宣言しないテーブルは検査対象 0 個で即座に成功する（コストゼロ）。`CHECK` 未宣言テーブルはコンパイル自体を行わない。
- キーの NULL の扱い: 主キーは構成列が `nullable == false`（`validate_schema` が強制）で、NULL・列欠落は内部矛盾として fail-closed に拒否。UNIQUE 制約は NULLS DISTINCT で、構成列のいずれかが NULL の行は検査対象外。
- 許可型: 主キーは `ColumnType::is_primary_key_allowed`、UNIQUE 制約はその上位集合 `ColumnType::is_unique_constraint_allowed`（Issue #1073 で REAL・DOUBLE PRECISION・NUMERIC・JSON / JSONB・配列型を追加）。
- 実装方式: 旧実装のテナント全行線形走査は永続一意索引 `user_uniq/{table}`（`unique_index` モジュール）へ置換済み（Issue #1070）。判定は正引きサブキーの点照会 O(k・log n)（k は宣言済み一意キー数）で、検査コストはテナントの保有行数に比例しない。既存 DB（索引テーブル未作成）では各テナントの最初の書き込みで 1 回だけ自テナントの既存行をバックフィルする（その回のみ O(n)）。
- `unique_index` の物理レイアウト: キーは `(tenant_id, subkey)`。`subkey` 先頭 1 バイトで `0x00` = 構築済みマーカー（値は `[format_version: u32 BE][signature]`、`FORMAT_VERSION` は 2）、`0x01` = 正引き（`[0x01][ordinal: u16 BE][正準キーバイト列]` → 行 `id` u64 BE）、`0x02` = 逆引き（`[0x02][id: u64 BE]`）。宣言済み一意キーの構成が変わる（`ALTER TABLE ... ADD UNIQUE` 等）とマーカーが不一致になり次回検査で自動再構築される。索引導入前のバイナリへのダウングレード書き込みはサポートしない。
- stale な正引きエントリは許容される（削除済み行・キー変更行を指す）。`check_and_update` が現在の行データを読み戻して再計算するため偽陽性・偽陰性は起きず、削除経路の後片付けは索引肥大防止の衛生措置に留まる。
- 参照アクション（`CASCADE` / `SET NULL` / `SET DEFAULT`。Issue #1076）: `enforce_referencing_rows_in_txn` は (1) `propagate_referential_actions` で宣言済み参照アクションを子テーブルへ再帰適用し、(2) 元の対象テーブルと連鎖で変更した各テーブルを参照する全 FK について事後状態検証（`verify_no_action_backstop`、NO ACTION 検査）を行う。(1) に不具合があっても (2) が最終状態の参照整合性を fail-closed に保証する。深さ・行数の上限超過は適用前に `TenantWriteError::ReferentialActionLimitExceeded`（副作用ゼロ）で拒否。`TRUNCATE ... CASCADE` は別構文で未実装のまま `42601`。
- テナント境界（RLS-9・RLS-10 (c)）: 走査は常にサーバー側導出テナントの物理キー範囲に閉じる。判定母集合はテナントが所有する全行（`Public` / `Private` を問わず可視性フィルタで縮めない）。違反時エラー `TenantWriteError::UniqueViolation` はキー値・列名・行 id・テナント名を含まない固定文言。
- `catalog.rs` の生書き込み API（`#[cfg(test)]` 限定）は検査点を経由しないが、`catalog::reject_constrained_table_for_raw_write`（Issue #1078）が制約宣言テーブルへの書き込みを fail-closed に拒否する。
- 関連 ADR（原文が参照）: `docs/design/sql-primary-key.md`・`unique-constraint.md`・`unique-index.md`・`sql-check-constraint.md`・`foreign-key.md`（参照アクションの設計判断は `foreign-key.md`「D13〜D19」節）。
- 本ページの記述は crates.io `fandhe-db-engine` 0.2.0 の `src/constraint.rs` と `src/constraint/unique_index.rs` の doc comment から転記。ADR 本文は未転記。

## Related

- [key_index](./key-index.md)
- [catalog](./catalog.md)
- [row_codec](./row-codec.md)
