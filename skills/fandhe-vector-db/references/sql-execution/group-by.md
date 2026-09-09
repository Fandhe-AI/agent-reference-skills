---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/sql/group_by.rs
---

# sql::group_by

`GROUP BY <TEXT 列>` 集計（複数行結果、TASK-167・SQL-14）の実行本体。`sql::aggregate::execute_aggregate` が `BoundAggregate::group_by` を検出した場合にのみ呼ばれる。

## Signature / Usage

```rust,ignore
//! `GROUP BY <TEXT 列>` 集計（複数行結果、TASK-167・SQL-14）の実行本体。
//!
//! 責務境界: `crate::sql::aggregate::execute_aggregate` が `BoundAggregate::group_by`
//! を検出した場合にのみ呼ばれる（`GROUP BY` なしの単一行集計は `aggregate.rs` が
//! 引き続き担う）。行の走査・RLS 適用順序（ヘッダのみで可視性判定 → 可視行のみ
//! ヘッダのオフセットを引き継いで本体デコード → `WHERE` → 可視性の再検査 → 集計）は
//! `aggregate.rs` の単一行経路と同一の規約を踏襲する。
//! **不可視行のグループキーは結果に一切現れない**（他テナントにしか存在しない
//! グループ値からの存在推測を防ぐ。RLS-7・RLS-8 の `GROUP BY` 版）。
//!
//! グループ数・グループキー文字列の累計バイト数・`MIN`/`MAX(<TEXT 列>)` 集計状態
//! （`Accumulator::TextMin`/`TextMax`）の累計バイト数は、それぞれ `MAX_GROUPS`・
//! `MAX_GROUP_KEY_TOTAL_BYTES`・`MAX_TEXT_ACCUMULATOR_TOTAL_BYTES` で頭打ちにし、
//! 超過は `SqlSurfaceError::payload_too_large`（`54000`）で fail-closed に拒否する。
//! `TEXT` 値は 1 件あたり最大 4 MiB 許容されるため、件数上限だけでは有界にならない。

/// `GROUP BY` が生成してよいグループ数の上限（無制限 `BTreeMap` 確保を避ける）。
pub(crate) const MAX_GROUPS: usize = 10_000;

/// グループキー文字列（`Some` 側）が累計で保持してよいバイト数の上限。
const MAX_GROUP_KEY_TOTAL_BYTES: usize = 16 * 1024 * 1024;

/// クエリ全体で `MIN`/`MAX(<TEXT 列>)` 集計項目が保持してよい文字列の累計バイト数の上限。
const MAX_TEXT_ACCUMULATOR_TOTAL_BYTES: usize = 16 * 1024 * 1024;

/// グループキー（`GROUP BY` 対象列の値）。`None` は NULL 値のグループ（`TEXT` 列の
/// NULL は 1 つのグループへまとめる。PostgreSQL 互換）。`Ord` はバイト順、`None` は
/// 常に末尾。
#[derive(Debug, Clone, PartialEq, Eq)]
struct GroupKey(Option<String>);

/// PR #603 codex-review P1 指摘対応: `observe_candidate_slots_grouped` 内部
/// （候補走査形）専用のエラー型。TEXT 集計容量超過とそれ以外の `SqlSurfaceError`
/// を、`?` 演算子で自然に伝播させつつ区別する。
enum GroupAccumulateError {
    /// キー順・候補順に依存する一時的な TEXT 集計容量超過。呼び出し元は索引経路の
    /// 途中結果を破棄し全走査へフォールバックする。
    TextBudgetExceeded,
    /// それ以外の `SqlSurfaceError`（走査順に依存しない即時失敗）。そのまま伝播する。
    Other(SqlSurfaceError),
}

/// `BoundAggregate`（`group_by` が `Some` であることを前提）を実行し、複数行の
/// `QueryResult` を返す（TASK-167・SQL-14）。RLS 適用順序・行走査は
/// `aggregate.rs::execute_aggregate` の単一行経路と同一の規約を独立して踏襲する
/// （責務分離のためモジュールを分けたことによる意図的な複製）。
pub(crate) fn execute_grouped_aggregate(
    read_txn: &redb::ReadTransaction,
    ctx: &PolicyContext,
    schema: &TableSchema,
    bound: &BoundAggregate,
    // Issue #475: `sql::scalar_index::ScalarIndex` 経由の候補削減・キー列挙。
    // `WHERE` なしの `GROUP BY`（列挙形）・索引対応述語のみの `WHERE` を持つ
    // `GROUP BY`（候補走査形）に限り消費する。
    arena_cache: Option<crate::sql::arena_cache::ArenaCacheAccess<'_>>,
    scalar_cache: Option<crate::sql::scalar_index::ScalarCacheAccess<'_>>,
) -> Result<QueryResult, SqlSurfaceError>;
```

## Notes

- 上記は main が pin SHA（`7022d112e79760dca916480599553fcac256b5fb`）で保存したソース（`src/engine/src/sql/group_by.rs`、全1319行）から Read で verbatim 転記した公開・crate内定数・型・エントリ関数。`is_text_accumulator_budget_error` 以下の private ヘルパー関数（`check_new_group_budget` / `new_accumulators` / `accumulate_row` / `observe_group_enumeration` / `observe_group_slots` / `observe_candidate_slots_grouped` / `observe_candidate_slots_grouped_inner` / `cmp_integer_to_literal` / `having_matches` / `cmp_cell_values` / `order_with_nulls_last` / `has_text_min_max_aggregate`）は内部実装のため掲載していない
- `MAX_GROUPS = 10_000`、`MAX_GROUP_KEY_TOTAL_BYTES` / `MAX_TEXT_ACCUMULATOR_TOTAL_BYTES` はいずれも `16 * 1024 * 1024`（16 MiB）
- 関連 ADR: [`aggregate-decode-skip`](https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/docs/design/aggregate-decode-skip.md)（Issue #350・Accepted。集計経路の embedding 非参照デコードスキップと必要列限定デコード = 行走査ループが `DecodeTier` に応じてデコード範囲を絞る根拠）
- distinct from `mssql` / `drizzle` GROUP BY: internal streaming aggregation implementation, not a SQL dialect feature

## Related

- [aggregate](./aggregate.md)
- [exec](./exec.md)
