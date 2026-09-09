---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/arena.rs
---

# arena

コールドスタート・ベクトルアリーナ（TASK-87、対象ビヘイビア: TABLE-8）。`storage.rs` はクエリの都度 `redb` から行を読み直してデコードする経路しか提供しないため、本モジュールは単一の読み取りスナップショットから一度だけ全行を連続 `Vec<f32>` バッファへデコードし、以降の参照はそのバッファ上のスライスで完結させる「コールドスタート時の一括ロード」経路を追加する。検索カーネル本体（スコアリング・top-k・SIMD/GPU 経路）は本モジュールのスコープ外で、「一度デコードした連続バッファの提供」までを責務境界とする。

`VectorArena::build` は `catalog.rs` のテーブルスコープ行 API（`user_rows/{table_name}`）専用のテーブルだけを走査するため、他テーブルの行が次元一致だけで混入することはない。RLS との関係: `tenant_id`・`visibility` はデータとして同居保持するが、可視性判定ロジックそのもの（テナント一致判定・許可ラベル評価）は持たない。判定ロジックは `core.rs::EngineCore::search` が `PolicyContext::is_visible` から構築した述語として渡す（CORE-2 の判定ロジック集約を維持）。

## Signature / Usage

```rust,ignore
/// アリーナ構築層の公開エラー型。redb へは必ず StorageError 経由で到達し、
/// 本型は StorageError からの明示的な From のみを持つ（catalog.rs::CatalogError
/// と同方針）。
#[derive(Debug)]
pub enum ArenaError {
    /// 永続化層側で発生したエラー（redb バックエンドエラー・行デコード失敗等）。
    Storage(StorageError),
    /// カタログ層側で発生したエラー（対象テーブル不存在・識別子不正等）。
    Catalog(CatalogError),
    /// expected_dim が不正（0 または MAX_EMBEDDING_DIM 超過）。対象テーブルが
    /// VECTOR 列を持たない場合もこの variant を返す。
    InvalidDim,
    /// アリーナ構築対象の行数・総バイト量がアロケーション前の上限
    /// （MAX_ARENA_ROWS・MAX_ARENA_TOTAL_BYTES）を超過した（fail-closed）。
    CapacityExceeded,
    /// expected_dim と一致しない次元の行を検出した。黙殺スキップせず拒否する
    /// （部分的なアリーナを返さない）。
    DimMismatch { id: u64, expected: u32, found: u32 },
    /// アロケーション前の上限検証を通過した後、実際の Vec::try_reserve が
    /// メモリ不足で失敗した（OOM を allocator の abort ではなく Err として
    /// 伝える。security.md「不安全な設計｜無制限リソース確保（DoS）」対応）。
    AllocationFailed(String),
    /// 呼び出し元フック（on_visible_row）が、行データではなく値を理由に構築を
    /// 拒否した（TASK-79・SQL-9）。sql::exec::map_arena_error が
    /// SqlSurfaceError::InvalidInput（22000）へ写像する。
    InvalidInput(String),
}

pub type Result<T> = std::result::Result<T, ArenaError>;

/// VectorArena::build が単一の読み取りスナップショットから構築する。構築後に
/// Storage へ加わった変更（他ライタによる書き込みを含む）は反映されない
/// （redb::ReadTransaction のスナップショット契約）。
#[derive(Debug)]
pub struct VectorArena {
    table_name: String,
    dim: u32,
    /// 行 ID 昇順・row-major の連続バッファ。長さは常に ids.len() * dim と一致する。
    vectors: Vec<f32>,
    ids: Vec<u64>,
    /// 後続の RLS 事前フィルタが redb 再読なしでテナント判定できるよう同居保持
    /// （ポリシー評価自体は行わない）。
    tenant_ids: Vec<String>,
    visibilities: Vec<Visibility>,
}
```

### `impl VectorArena`

```rust,ignore
impl VectorArena {
    /// storage の現時点のスナップショットから、カタログ上のテーブル table_name を
    /// 対象としたアリーナを構築する公開エントリポイント（TABLE-8）。expected_dim は
    /// カタログから取得し呼び出し元からは受け取らない。対象テーブルがカタログに
    /// 存在しない・VECTOR 列を持たない場合は Err。次元不一致の行を検出した場合は
    /// スキップせず Err(ArenaError::DimMismatch)（fail-closed、部分的なアリーナを
    /// 返さない）。
    pub fn build(storage: &Storage, table_name: &str) -> Result<Self> { /* ... */ }

    /// build の構築時フィルタ付き版（codex P2・Issue #137 対応）。
    /// predicate(tenant_id, visibility) が false を返す行は decode 直後に破棄して
    /// アリーナへ格納しない。可視性判定は embedding のデコード・次元検証より前に
    /// 行う（codex P0 指摘対応: 他テナントの不可視行の破損で対象テナントの検索
    /// 全体が失敗する・破損という存在情報が漏れることを防ぐ）。
    pub fn build_filtered<F>(storage: &Storage, table_name: &str, predicate: F) -> Result<Self>
    where
        F: FnMut(&str, Visibility) -> bool,
    { /* ... */ }

    /// build_filtered へ、可視行ごとに呼ばれる第 2 段のフック
    /// on_visible_row(id, metadata) を追加した版（TASK-75、SQL-2）。sql::exec が
    /// WHERE <列> = '<literal>' の事前フィルタをここで適用する。on_visible_row が
    /// Ok(false) を返した行はアリーナへ格納しない。predicate（RLS 段）→
    /// on_visible_row（SCALAR 段）の評価順序は固定。Err を返した場合は fail-closed
    /// にアリーナ構築全体を拒否する。
    pub fn build_filtered_with_rows<F, G>(
        storage: &Storage,
        table_name: &str,
        predicate: F,
        on_visible_row: G,
    ) -> Result<Self>
    where
        F: FnMut(&str, Visibility) -> bool,
        G: FnMut(usize, u64, &[f32], &[u8]) -> std::result::Result<bool, ArenaError>,
    { /* ... */ }

    /// 構築時に build へ渡されたテーブル名。
    pub fn table_name(&self) -> &str { /* ... */ }

    /// 埋め込みの次元数。
    pub fn dim(&self) -> u32 { /* ... */ }

    /// 保持している行数。
    pub fn len(&self) -> usize { /* ... */ }

    /// 行を 1 件も保持していないか。
    pub fn is_empty(&self) -> bool { /* ... */ }

    /// 行 ID の一覧（構築時のスキャン順＝行 ID 昇順）。
    pub fn ids(&self) -> &[u64] { /* ... */ }

    /// row-major の連続ベクトルバッファ全体（長さ = len() * dim()）。
    pub fn vectors(&self) -> &[f32] { /* ... */ }

    /// index 番目の行の埋め込みスライスを返す。範囲外は None（添字アクセス []
    /// を production コードで使わない方針）。
    pub fn vector(&self, index: usize) -> Option<&[f32]> { /* ... */ }

    /// index 番目の行のテナント識別子。範囲外は None。
    pub fn tenant_id(&self, index: usize) -> Option<&str> { /* ... */ }

    /// index 番目の行の可視性ラベル。範囲外は None。
    pub fn visibility(&self, index: usize) -> Option<Visibility> { /* ... */ }
}
```

## Notes

- `RlsCaptureFn`・`MAX_ARENA_ROWS`（`1_000_000`）・`MAX_ARENA_TOTAL_BYTES`（`1024 * 1024 * 1024`）・`check_capacity`・`SqlArenaCaptureBuilder`・`validated_vector_dim_in_txn`・`build_filtered_with_rows_in_txn`・`build_filtered_with_rows_in_txn_capturing`・`build_from_cached_rls_rows`・`build_from_cached_rls_rows_subset`・`filter_cached_rls_rows_subset`・`approx_heap_bytes` はすべて `pub(crate)` のためクレート外非公開（`rls.rs::SearchTimeFilter`・`core.rs::PrefilterCache` が同一クレート内から参照する）。
- `build_filtered_with_rows_and_limits`・`build_filtered_with_limits`（上限値パラメータ化版）は `build`/`build_filtered`/`build_filtered_with_rows` の内部実装であり、`pub(crate)` の可能性が高いが本ページでは公開シグネチャのみを対象とし、実装詳細への言及は上記 3 公開関数の説明に留める。
- アリーナ容量の上限検証（`check_capacity`）は `predicate`（RLS 段）を通過した可視行のみを対象に、行を追加するたびに逐次行う（テーブル全行数を基準にすると、他テナントの不可視行の量が対象テナントの検索可用性へ干渉するため。codex 指摘・Issue #137 対応）。
- 本ページの記述は公開ソース（scratchpad の pin SHA verbatim ソースと突合済み）から検証済み。

## Related

- [storage](./storage.md)
- [buffer-pool](./buffer-pool.md)
- [catalog](./catalog.md)
