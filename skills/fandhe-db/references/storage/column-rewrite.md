---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/column_rewrite.rs
---

# column_rewrite

列型の拡大変換（`INTEGER`→`BIGINT`・`REAL`→`DOUBLE PRECISION`）に伴う既存行の一括書き換え（TABLE-19・Issue #1361）。スカラー行ペイロード（`row_codec::encode_scalar_columns`）は列位置依存の固定形式で、この 2 変換は列のフレーム幅（presence 1 + 4 バイト → presence 1 + 8 バイト）を変える。カタログだけを書き換えると既存行を誤読するため、`catalog::Storage::alter_table_alter_column_type` が呼び出し元の write txn 内で本モジュールを呼び、全テナントの既存行を新スキーマで再エンコードする。`pub(crate)` でクレート外へは公開されない。

## Signature / Usage

```rust,ignore
/// 1 バッチで集めるキー数の上限。redb は走査中の insert を許さないため、
/// キーだけを集めて走査を閉じてから書き換える（行サイズによらずメモリを抑える）。
const REWRITE_BATCH_KEYS: usize = 1024;

/// 行の書き換えを要する拡大変換の種別。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) enum WideningKind {
    /// `INTEGER`（i32）→ `BIGINT`（i64）。
    IntegerToBigInt,
    /// `REAL`（f32）→ `DOUBLE PRECISION`（f64）。
    RealToDouble,
}

/// `logical_index` 列の値を拡大して、全テナントの既存行を `new_schema` で
/// 再エンコードする。`old_schema` は行を読むための変更前スキーマ。
pub(crate) fn rewrite_rows_for_widening_in_txn(
    write_txn: &redb::WriteTransaction,
    table_name: &str,
    old_schema: &TableSchema,
    new_schema: &TableSchema,
    logical_index: usize,
    kind: WideningKind,
) -> Result<(), CatalogError> { /* ... */ }
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `write_txn` | `&redb::WriteTransaction` | 呼び出し元の write トランザクション（本関数は commit しない） |
| `table_name` | `&str` | 対象テーブル |
| `old_schema` / `new_schema` | `&TableSchema` | 行を読むための変更前スキーマ / 再エンコード先の新スキーマ |
| `logical_index` | `usize` | 拡大対象列の論理インデックス |
| `kind` | `WideningKind` | `IntegerToBigInt`（`Value::Integer` → `Value::BigInt`）/ `RealToDouble`（`Value::Real` → `Value::Double`、`scalar_float::canonicalize_double(f64::from(r))`） |

## Notes

- 契約（fail-closed）: 書き換えるのは対象テーブルの行だけで、行キー `(tenant_id, id)`・tenant・visibility・embedding は保存する（行の追加・削除・テナント移動は行わない）。NULL は NULL のまま。
- 行キーとヘッダのテナントが不整合な行・デコード / エンコード失敗は `CatalogError::CorruptSchema`（`XX000`）の固定文言へ丸め、tenant・id・値をエラーへ含めない。呼び出し元は commit せず txn を破棄するため痕跡は残らない。
- 行ストア未作成（既存行 0 件）なら何もせず `Ok(())`。
- 走査は 1024 キーずつのバッチで、キーだけ集めて走査を閉じてから書き換える（redb は走査中の insert を許さない）。
- PK / UNIQUE / FOREIGN KEY の構成列も対象（Issue #1402）。型タグ付き索引（`user_uniq`・`key_index`）の失効は本モジュールの責務ではなく、呼び出し元の `alter_column_type_with` が同一 txn 内で行う。
- 関連 ADR: `docs/design/alter-table-drop-modify-column.md`（本ページでは未転記）。

## Related

- [catalog](./catalog.md)
- [row_codec](./row-codec.md)
- [key_index](./key-index.md)
- [scalar_float](./scalar-float.md)
