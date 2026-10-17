---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/key_index.rs
---

# key_index

永続キー索引（Issue #1071）。`constraint.rs` の `FOREIGN KEY` 参照整合性検査（TABLE-17・TASK-205）が全行走査に頼っていた 2 箇所（参照元側の列参照存在確認・参照先側の被参照確認）を、テナントの保有行数に比例しない索引照会へ置き換える下位モジュール。`constraint.rs` の単一検査点からのみ呼ばれる `pub(crate)` で、クレート外・wire-server へは公開しない。

## Signature / Usage

```rust,ignore
/// 索引登録簿の総エントリ数の上限（fail-closed。破損 DB での無限走査を防ぐ。
/// `catalog.rs::MAX_INDEX_COUNT` と同じ判断）。
const MAX_KEY_INDEXES: usize = 4096;

/// 索引登録簿: `(table, name, tenant) -> ()`。エントリの存在が「そのテナントで
/// 索引構築済み」を表す（テナント単位。モジュール doc 参照）。
const REGISTRY_TABLE: TableDefinition<(&str, &str, &str), ()> =
    TableDefinition::new("key_index_registry");

fn fwd_table_name(table: &str, name: &str) -> String {
    format!("key_index/{table}/{name}")
}

fn rev_table_name(table: &str, name: &str) -> String {
    format!("key_index_rev/{table}/{name}")
}

/// 索引名を構成列名（宣言順）から組み立てる（唯一の生成点）。
pub(crate) fn index_name_for_columns(columns: &[String]) -> String {
    format!("k:{}", columns.join(","))
}

pub(crate) fn parent_id_key_bytes(
    column_ty: &crate::catalog::ColumnType,
    id: u64,
) -> Result<Option<Vec<u8>>, TenantWriteError> { /* ... */ }

#[derive(Debug, Default, Clone)]
pub(crate) struct KeyIndexDelta { /* lost / registered */ }

impl KeyIndexDelta {
    pub(crate) fn lost_keys(&self, columns: &[String]) -> BTreeSet<Vec<u8>>;
    pub(crate) fn is_registered(&self, columns: &[String]) -> bool;
}

pub(crate) fn sync_rows_in_txn(
    write_txn: &redb::WriteTransaction,
    table: &str,
    schema: &TableSchema,
    tenant_id: &str,
    ids: &[u64],
) -> Result<KeyIndexDelta, TenantWriteError> { /* ... */ }
```

## Options / Props

| Name | Description |
|------|-------------|
| `index_name_for_columns` | 索引名 `k:{col1},{col2},...` を構成列から生成する唯一の生成点 |
| `parent_id_key_bytes` | 参照元列（`INTEGER` / `BIGINT`）の物理 `id`（`u64`）を列の正準エンコードへ変換。列の値域外なら `Ok(None)` |
| `KeyIndexDelta::lost_keys` / `is_registered` | 索引ごとの失われたキー値集合 / 計算時点で登録済みだったか |
| `sync_rows_in_txn` | 書き込み直後（CHECK / UNIQUE / FK 検査より前）に呼ぶ登録済み索引の同期点 |
| `clear_tenant_in_txn` | `TRUNCATE` が呼ぶテナント単位の索引消去（逆引き・順引きのこのテナント分を削除） |
| `drop_indexes_for_table_in_txn` | `Storage::drop_table` が同一 write txn から呼び、対象テーブルの索引（順引き・逆引き・登録簿エントリ）をすべて削除 |
| `prune_unneeded_indexes_in_txn` | `required_names` に含まれない索引を実テーブルごと削除し全テナント分の登録簿エントリを除去（`alter_table_drop_constraint` / `alter_table_add_foreign_key` が呼ぶ） |
| `drop_indexes_containing_column_in_txn` | 構成列に `column` を含む索引を全テナント分削除（Issue #1402。`ALTER COLUMN TYPE` 拡大変換後） |
| `ensure_index_in_txn` | 指定列の索引をテナントの現在行から構築しそのテナントに限り登録（初回のみ・DDL 級コスト。登録済みなら何もしない） |
| `all_keys_exist_in_txn` | 参照元側: 親テーブルの索引で `keys` の全キーがテナントに存在するか確認。欠ければ `ForeignKeyViolation`、索引未登録なら `Ok(None)` |
| `none_referenced_in_txn` | 参照先側: `lost_keys` のいずれかを子行が今も参照していないか確認。参照していれば `ForeignKeyViolation`、未登録なら `Ok(None)` |
| `none_referenced_for_tenant_in_txn` | `TRUNCATE` 用: 子の索引にテナントのエントリが 1 件でも残っていないか確認（粗い判定） |

## Notes

- 索引は `(テーブル, 索引名)` で識別。同じテーブル・同じ列集合を指す索引は 1 本へ集約される（例: 自己参照 FK で参照元列・参照先列が一致する場合）。
- 各索引は 2 つの redb テーブルを持つ: 順引き `key_index/{table}/{name}`（`(tenant, key_bytes, row_id) -> ()`、前方一致 range で「このテナントにこのキー値を持つ行が存在するか」を判定）と逆引き `key_index_rev/{table}/{name}`（`(tenant, row_id) -> key_bytes`、同期時に行の直前のキー値 pre-image を求め順引き側の旧エントリを O(1) で特定）。
- 構築済みの記録は `key_index_registry`（`(table, name, tenant) -> ()`）で**テナント単位**（Issue #1071 レビュー P0: `(table, name)` 単位で登録すると、初回構築した 1 テナントの backfill が他テナントの索引済み状態まで確定させてしまう）。未登録のテナントでは呼び出し元（`constraint.rs`）が全行走査へフォールバックした上で `ensure_index_in_txn` を呼び、以後の文から索引経路に切り替える。fwd / rev の実テーブルは `(table, name)` 単位で共有される。
- キー値の正準エンコードは一意性制約の検査点（`constraint::key_bytes`）と共有。FK が `id` 疑似列を参照する場合も子列の値を同じ正準エンコードで索引化する（`parent_id_key_bytes` が `u64` の物理 id を子列の型へ変換）。索引は常に `NullPolicy::Skip`（NULLS DISTINCT: いずれかの列が NULL の行は対象外）。
- テナント境界（RLS-9・RLS-10 (c)）: 索引キーの第 1 成分は常にサーバー側導出テナント。判定母集合は可視性を問わない全行。他テナントの索引エントリには触れない。
- 呼び出し契約: `sync_rows_in_txn` は `enforce_row_constraints_in_txn` の先頭（CHECK / UNIQUE / FK のいずれの検査より前）で書き込み済みの行 id 集合に対して呼ぶ。削除・TRUNCATE は `enforce_referencing_rows_in_txn` が `Removed` / `Truncated` の場合に限り `sync_rows_in_txn` / `clear_tenant_in_txn` を呼ぶ。`ColumnsUpdated` / `AllColumnsReplaced` は計算済みの `KeyIndexDelta` を再利用する（同じ id を二重に同期すると変化を検出できなくなる）。
- 登録簿の上限 `MAX_KEY_INDEXES`（4096）超過は `CatalogError::CorruptSchema`。FK / 主キー / UNIQUE をいずれも宣言しないテーブルは登録簿を照会せずコストゼロ。
- 設計詳細の ADR は `docs/design/foreign-key.md`（原文が参照）。

## Related

- [constraint](./constraint.md)
- [catalog](./catalog.md)
