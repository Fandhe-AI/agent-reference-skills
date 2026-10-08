---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/lib.rs
---

# lib (engine crate root)

`engine` crate（crates.io 公開名 `fandhe-vector-db-engine`）のクレートルート。データロード・検索カーネル・認証・RLS 相当のテナント境界・`redb` ベースの永続化を担う。クエリの受付・応答整形など wire プロトコルの詳細は持たない。

## Signature / Usage

~~~rust,ignore
//! engine クレート: vector-db のコアロジック層。
//!
//! 責務境界: データロード・検索カーネル・認証・RLS 相当のテナント境界・redb ベースの
//! 永続化を担う（クエリの受付・応答整形など wire プロトコルの詳細は持たない）。
//! `wire-server`（バイナリクレート）から呼び出されるライブラリで、
//! ワークスペース内での相互参照は path 依存に限る。

pub mod arena;
pub mod batch_fallback;
pub mod batch_limits;
pub mod batch_search;
pub mod buffer_pool;
pub mod catalog;
pub mod chunking;
pub mod core;
pub mod declarative_filter;
pub mod dictionary;
pub mod dispatch;
pub mod embedding;
pub mod error_format;
pub(crate) mod f16;
pub mod gpu_batch;
pub mod hnsw;
pub mod hybrid;
pub mod incremental;
pub mod isa;
pub mod kernel;
pub mod parallel_search;
pub mod policy;
pub mod precision;
pub mod query_planner;
pub mod recovery;
pub mod rerank;
pub mod rls;
pub mod row_codec;
pub mod scoring_boost;
pub mod search_engine;
pub mod sparse;
pub(crate) mod sq8;
pub mod sql;
pub mod storage;
pub mod tenant;
pub mod tiering;
pub mod txn;
pub mod wasm_udf;

/// engine クレートの識別子。
///
/// wire-server がリンク時にこのクレートへ到達可能であることを確認するための
/// プレースホルダ API（TASK-66 時点の雛形）。後続タスクで実際の公開 API に置き換わる。
pub const ENGINE_NAME: &str = "engine";
~~~

## Notes

- `f16` と `sq8` のみ `pub(crate)`（クレート内部限定）で、他は全て `pub mod`。公開 API サーフェスの中心は `core`（`VectorCore` trait / `EngineCore`）。
- `#[cfg(test)] mod test_util;` はテスト専用の非公開モジュールで、公開 API には含まれない。
- `ENGINE_NAME` 定数はドキュメント上「TASK-66 時点の雛形」と明記されており、実運用上の意味を持つ値ではない。
- 各モジュールの割当先はカテゴリ別に分割している: `sql` は `sql` カテゴリ、`hnsw` / `hybrid` / `search_engine` / `sparse` / `rerank` / `scoring_boost` / `precision` / `query_planner` / `tiering` は `search` カテゴリ、`storage` / `row_codec` / `catalog` / `txn` / `recovery` / `incremental` / `arena` / `buffer_pool` は `storage` カテゴリ、`rls` / `tenant` / `policy` は `security` カテゴリ、`kernel` / `isa` / `dispatch` / `gpu_batch` / `batch_search` / `batch_fallback` / `batch_limits` / `parallel_search` は `performance` カテゴリ、`wasm_udf` / `declarative_filter` / `embedding` / `chunking` / `dictionary` は `extensions` カテゴリで別途収録（本 getting-started scope では扱わない）。

## Related

- [core](./core.md)
- [error-format](./error-format.md)
