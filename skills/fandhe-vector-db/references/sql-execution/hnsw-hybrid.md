---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/sql/hnsw_hybrid.rs
---

# sql::hnsw_hybrid

hybrid 密側再取得ループ専用の `SearchProvider` アダプタ（Issue #410）。`sql::exec::execute_statement_with_cache` がクエリ開始時に一度だけ `sql::hnsw_cache::prepare_full_visible`／`prepare_subset` を実行した結果を保持して構築する。

## Signature / Usage

```rust,ignore
/// hybrid 密側再取得ループ専用の `SearchProvider` アダプタ。
///
/// `sql::exec::execute_statement_with_cache` がクエリ開始時に一度だけ
/// `sql::hnsw_cache::prepare_full_visible`／`prepare_subset` を実行した結果
/// （`prepared`）を保持して構築する。`hybrid.rs` の密側再取得ループは同一
/// `SearchInput`（`ids`／`vectors` は不変・`k`（`dense_fetch_k`）のみ倍増）で
/// `provider.search` を複数ラウンド呼ぶ契約のため、本アダプタは呼ばれるたびに
/// `prepared` を再利用して `search_prepared` を呼ぶだけで済み、`Overlay::compute`／
/// `IndexedBase::build`（どちらも `k` に依存しない O(N) 相当の重い処理）はクエリ
/// 全体で 1 回に抑えられる。
///
/// # fail-closed な受理条件
///
/// `SearchProvider::search` は、渡された `input` がこのアダプタを構築した際の
/// クエリスナップショット（`arena`／`slot_ids`）と同一のバッファ（ポインタ・
/// 長さが一致）を参照している場合に限り索引経路を使う。1 つでも外れれば `inner`
/// （呼び出し元が元々使っていた provider。常に全件 brute-force と同じ意味論）へ
/// そのまま委譲する（別の可視集合・別の索引済みノード集合を索引経由で答えて
/// しまうことを構造的に防ぐ。RLS 相当のテナント境界は `prepared` 自体が
/// `(table, ctx)` の可視アリーナからしか解決されない `sql::hnsw_cache` の既存
/// fail-closed 契約に依拠する。`hybrid.rs` 側の可視 id 検証（`core::
/// provider_result_is_valid`・`HybridError::ProviderResultRejected`）も従来どおり
/// 全ラウンドに適用され続ける多層防御）。
pub(crate) struct HnswDenseProvider<'a> {
    access: &'a HnswCacheAccess<'a>,
    arena: &'a VectorArena,
    slot_ids: &'a [u64],
    inner: &'a dyn SearchProvider,
    prepared: PreparedHnswSearch,
    rounds: AtomicU64,
    resume: Mutex<Option<HnswResumeState>>,
}

/// `access`・`prepared`（解決済みの索引・オーバーレイ、または `FullScan` 判定）・
/// このクエリのアリーナ／スロット番号・`inner`（索引を使わない場合の委譲先）から
/// 構築する。
pub(crate) fn new(
    access: &'a HnswCacheAccess<'a>,
    arena: &'a VectorArena,
    slot_ids: &'a [u64],
    inner: &'a dyn SearchProvider,
    prepared: PreparedHnswSearch,
) -> Self;

/// クエリ終了時に呼び出し元（`sql::exec::execute_statement_with_cache`）が明示的
/// に呼ぶ（`Drop` にはしない——`rounds` の反映はロックを取る
/// `HnswIndexCache::record_hybrid_query_rounds` を伴うため、`Drop` 内でパニック・
/// ロック競合の意図しない挙動を持ち込まず、呼び出し元の制御下に置く）。索引経路を
/// 一度も通らなかったクエリ（`rounds == 0`。密のみ縮退で `inner` へ全ラウンド委譲
/// した場合を含む）は `hybrid_queries` を汚さない。
pub(crate) fn finish(&self);
```

## Notes

- crate 内部 API: 本ファイルの全公開項目は `pub(crate)` であり、`fandhe-vector-db-engine` の公開 API（`fandhe-vector-db` crate）からは到達しない
- `SearchProvider` トレイト自体・`HybridError` の詳細は本モジュールでは定義されず（`hybrid.rs` / `core.rs` 側の定義を参照）、この scope では未転記
- 関連 ADR: [`hnsw-hybrid-iterative-scan`](https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/docs/design/hnsw-hybrid-iterative-scan.md)（Issue #410。フィルタ付き ANN の境界再取得〔iterative scan 型〕と fail-closed 検証 = 本モジュールの密側再取得ループそのものの設計 ADR。前提 #408・#409）
- Distinct from `upstash`: not the @upstash/vector hybrid search SaaS client API, but a `SearchProvider` adapter internal to the engine that reuses the HNSW cache.

## Related

- [hnsw-cache](./hnsw-cache.md)
- [exec](./exec.md)
