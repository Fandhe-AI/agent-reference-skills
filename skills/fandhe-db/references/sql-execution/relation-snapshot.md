---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/sql/relation_snapshot.rs
---

# sql::relation_snapshot

実行計画の複数テーブル対応基盤（SQL-28・RLS-10、TASK-212、Issue #924）その 3: テーブル単位の RLS 可視スナップショット `RelationSnapshot` と、複数テーブル横断で束ねる `MultiRelationSnapshot`。

## Signature / Usage

```rust,ignore
//! `VisibleSnapshot`（Issue #478）は行キーの `id` だけを保持するが、物理キーは
//! `(tenant_id, id)`（TABLE-12）であり、1 つの `PolicyContext` が複数テナントの
//! `Public` 行を見得るため `id` 単独では行を一意に識別できない。本モジュールの
//! [`RelationSnapshot`] は `(tenant_id, id)` を保持する。ただし `INNER JOIN`
//! （Issue #925。`sql::join`）は結合に列の値そのものを必要とするため、`EngineCore` への
//! 結線は見送っている（`docs/design/inner-join.md`「基盤の申し送り項目の扱い」節参照）。

/// 1 テーブル分の RLS 可視スナップショット。物理走査順に並んだ `(tenant_id, id)`
/// の列と、構築時の `ctx`・テーブル世代を保持する。
pub struct RelationSnapshot {
    visible_rows: Vec<(String, u64)>,
    built_table_generation: u64,
}

impl RelationSnapshot {
    pub fn visible_rows(&self) -> &[(String, u64)];
    pub fn built_table_generation(&self) -> u64;
}

pub struct MultiRelationSnapshot {
    snapshots: Vec<Arc<RelationSnapshot>>,
    key: TableGenerationKey,
}

impl MultiRelationSnapshot {
    pub fn snapshots(&self) -> &[Arc<RelationSnapshot>];
    pub fn generation_key(&self) -> &TableGenerationKey;
}

pub type RelationSnapshotCache = GenerationKeyedCache<RelationSnapshot>;

pub fn resolve_relation_snapshots(
    read_txn: &impl crate::storage::read_source::ReadSource,
    ctx: &PolicyContext,
    relations: &[(TableRef, &TableSchema)],
    cache: Option<(&crate::storage::Storage, &RelationSnapshotCache)>,
) -> Result<MultiRelationSnapshot, SqlSurfaceError>;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `read_txn` | `&impl ReadSource` | 同一 `read_txn`（同一スナップショット）から全テーブルを独立に解決 |
| `ctx` | `&PolicyContext` | サーバー側で導出済みのものだけを受け取る（クライアント指定の値を受ける引数は設けない） |
| `relations` | `&[(TableRef, &TableSchema)]` | 参照スロット順。上限 `MAX_TABLE_REFS`（超過・空は `54000`）。自己結合は同じ `Arc` を共有するがスロットは参照ごとに別 |
| `cache` | `Option<(&Storage, &RelationSnapshotCache)>` | `Some` のときだけキャッシュ利用。書き込みトランザクション由来の `read_txn`（`snapshot()` が `None`）では常に不使用（Issue #1179） |

`resolve_relation_snapshots` の手順: (1) 参照数上限の検証 → (2) 行走査前に `TableGenerationKey::capture` で全テーブルの世代を確定 → (3) `table_ref.table()` と `schema.name` の一致検証（不一致は `Internal` で fail-closed）→ (4) テーブルごとにキャッシュを単一テーブル鍵で引き、ミス時のみ走査して `insert` → (5) 自己結合は同じ `Arc` を共有。

## Notes

- 出典は `fandhe-db-engine` 0.2.0（git SHA `dc888f6ea146d3078153d64a6848f5c8cf044431`）の `src/sql/relation_snapshot.rs`（全649行、テスト除く先頭 318 行）。公開アイテムのシグネチャと主要 doc comment の抜粋で、private の `RelationSnapshot::build`・エラー写像ヘルパーは掲載していない
- 走査順序は `sql::aggregate` の走査規律と同一: ヘッダのみデコード → `PolicyContext::is_visible` → `verify_row_key_tenant` → dim・metadata の構造検証 → スカラー列の構造検証。可視行数が `crate::arena::MAX_ARENA_ROWS` を超えるとキャッシュ登録見送りではなく `54000` で拒否
- 走査・破損検出のエラーはストレージ詳細を含めない固定文言の `Internal`（`XX000`、`relation snapshot scan failed`）
- 原文 doc comment が明記するとおり `EngineCore` へのキャッシュ保持・結線は `INNER JOIN`（Issue #925）でも見送られており、キャッシュによる最適化は後続の検討事項
- distinct from `supabase` / `upstash`: fandhe-db 内部の RLS 可視スナップショット基盤であり、Supabase の RLS ポリシーとは別物

## Related

- [generation-key](./generation-key.md)
- [join](./join.md)
- [visible-cache](./visible-cache.md)
