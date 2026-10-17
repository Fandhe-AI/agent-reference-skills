---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/sql/view_buffered.rs
---

# sql::view_buffered

評価後射影形ビュー（本文に `LIMIT`・`ORDER BY`・集計・JOIN を含む `CREATE VIEW`。TABLE-18・Issue #1192）の外側処理。本文を参照セッション自身の `PolicyContext` で実行した評価済み結果セルに対し、外側クエリの後処理を行う。

## Signature / Usage

```rust,ignore
//! 外側の形は 2 つある（[`BufferedOuter`]）。
//!
//! - 行形（Issue #1360・Issue #1411）: `WHERE` の絞り込み・ウィンドウ関数・`ORDER BY`
//!   （列キーと式キー）の並べ替え・列射影・`LIMIT`／`OFFSET` の切り出し。
//! - 集計形（Issue #1411）: `COUNT`／`SUM`／`AVG`／`MIN`／`MAX`・`GROUP BY`・`HAVING`・
//!   `SELECT DISTINCT`（脱糖後の集計形）。
//!
//! Describe（拡張クエリ）は [`plan_outer`] だけを呼び、本文は実行しない。Execute と
//! Describe が同じ [`plan_outer`] を通るため、束縛エラーが両経路で一致する。

pub(crate) fn resolve_projection(
    body_columns: &[ColumnMeta],
    projection: &Projection,
) -> Result<(Vec<usize>, Vec<ColumnMeta>), SqlSurfaceError>;

pub(crate) struct OuterPlan {
    columns: Vec<ColumnMeta>,
    kind: OuterKind,
}

impl OuterPlan {
    /// 外側の後処理後の結果列メタデータ（Describe の応答になる）。
    pub(crate) fn columns(&self) -> &[ColumnMeta];
}

pub(crate) fn plan_outer(
    body_columns: &[ColumnMeta],
    view: &ValidatedBufferedView,
    udfs: &UdfRegistry,
) -> Result<OuterPlan, SqlSurfaceError>;

pub(crate) fn apply_outer(
    result: QueryResult,
    plan: &OuterPlan,
) -> Result<QueryResult, SqlSurfaceError>;
```

## Options / Props

| Name | Description |
|------|-------------|
| `resolve_projection` | 外側の射影を本文の結果列に対して解決。`*` は本文の全列。存在しない名前は `22000`、同名列が複数で一意に決まらない名前は `42702`（fail-closed） |
| `plan_outer` | 外側クエリを本文の結果列へ束縛・解決（Describe / Execute 共通）。行形のエラー優先順位は射影（`22000`／`42702`）→ 公開範囲（`22000`）→ 同名列... |
| `apply_outer` | 行形の適用順は WHERE → ORDER BY → OFFSET／LIMIT → 射影。集計形は WHERE → 集計（`HAVING`・`ORDER BY`・`OFFSET`／`LIMIT` を含む） |

## Notes

- 出典は `fandhe-db-engine` 0.2.0（git SHA `dc888f6ea146d3078153d64a6848f5c8cf044431`）の `src/sql/view_buffered.rs`（全1312行、テスト除く先頭 864 行）。公開・`pub(crate)` アイテムのシグネチャと主要 doc comment の抜粋で、private の `plan_rows` / `apply_rows` / `apply_aggregate` / `check_outer_scope` 等は掲載していない。`plan_outer` の優先順位の記述は原文 doc comment が途中で続くため省略している
- 外側の式・述語・集計は、本文の結果列から合成したスキーマに対し既存の束縛器（`sql::parser::bind_scan`・`bind_aggregate`）で束縛し、評価済みセル→`ScalarRef` アダプタ（`sql::join::values::cell_scalar`）経由で既存の述語・式・アキュムレータを再利用する。ウィンドウ関数は `sql::window::CellWindowEvaluator`、集計は `sql::group_by::GroupedRowAccumulator` へ流し込む
- RLS-10 (b): 本モジュールは `PolicyContext` を受け取らず可視性判定に関与しない。可視行の確定は本文の実行経路が参照セッションの `ctx` で行う。外側が解決できるのは本文の**結果列**だけで、ビューが公開していない物理キー（`id` 等）での絞り込み・並べ替え・グループ化・集計は不可（filter oracle 防止）
- 順序: 外側 `ORDER BY` が無ければ本文の順序を保つ。外側 `ORDER BY` は安定ソート（`sort_by`）で、`sort_unstable*` は使わない
- 列インデックスが行のセル数を超える場合は内部エラー（fail-closed）
- distinct from `mssql` / `drizzle` / `supabase`: fandhe-db の内部実装であり、各 SQL ダイアレクトのビュー機能ではない

## Related

- [view](./view.md)
- [window](./window.md)
- [group-by](./group-by.md)
