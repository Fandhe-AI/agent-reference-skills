---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/sql/view.rs
---

# sql::view

非マテリアライズド `VIEW` の参照時展開（TABLE-18・SQL-23・TASK-205、Issue #909）。FROM に指定された名前を `resolve_from` へ通し、テーブル参照とビュー経由の参照を単一経路へ統一する。

## Signature / Usage

```rust,ignore
//! ビューはカタログに保存された定義（[`crate::catalog::ViewDef`]）を
//! 同じ許可リストパーサー（`sql::allowlist::parse_view_body`）で再検証し、
//! 連鎖（ビューがビューを参照する）を内側から畳み込んで最終的に 1 つの
//! 基底テーブル名＋合成済み `WHERE` 述語へ書き換える。第 2 の SQL パーサー・
//! 実行器は作らない。
//!
//! RLS-10 (b) の不変条件: ビュー定義は `tenant_id`／`PolicyContext`／作成者の
//! 情報を一切保持しない。畳み込み後の文は、参照した**セッション自身**の
//! `PolicyContext` を使う既存の実行経路でしか評価されないため、作成者の
//! 可視性が参照者へ引き継がれることは構造的に起こらない。

/// FROM に指定された名前の解決結果。
pub(crate) enum Resolved {
    /// 通常のテーブル参照。
    Table,
    /// ビュー参照（連鎖を内側から畳み込んだ結果）。
    View {
        base_table: String,
        view_predicates: Vec<WherePredicate>,
        view_columns: Option<Vec<String>>,
    },
    /// 評価後射影形ビュー（Issue #1192。`LIMIT`・`ORDER BY`・集計・JOIN を含む本文）。
    Buffered {
        view_name: String,
        body: Box<Statement>,
    },
}

pub(crate) fn resolve_from(
    lookup: &impl TableLookup,
    name: &str,
) -> Result<Resolved, SqlSurfaceError>;

pub(crate) fn check_columns_within_view(
    view_columns: Option<&[String]>,
    projection: &Projection,
    where_predicates: &[WherePredicate],
    order_by: &[ScalarOrderKey],
) -> Result<(), SqlSurfaceError>;

pub(crate) fn check_order_exprs_within_view(
    view_columns: Option<&[String]>,
    order_keys: &[ScanOrderKey],
) -> Result<(), SqlSurfaceError>;

pub(crate) fn check_aggregate_columns_within_view(
    view_columns: Option<&[String]>,
    items: &[AggregateSelectItem],
    group_by: Option<&GroupByClause>,
    where_predicates: &[WherePredicate],
) -> Result<(), SqlSurfaceError>;

pub(crate) fn check_window_columns_within_view(
    view_columns: Option<&[String]>,
    window_items: &[WindowSelectItem],
) -> Result<(), SqlSurfaceError>;
```

## Options / Props

| Name | Description |
|------|-------------|
| `Resolved::Table` | 通常のテーブル参照 |
| `Resolved::View` | 単純形ビュー。`base_table`（連鎖先の実テーブル）、`view_predicates`（内側のビューが先頭、クエリ自身の述語は後ろに追加）、`view_columns`（最終的な公開列集合。`None` は全段が `SELECT *`） |
| `Resolved::Buffered` | 評価後射影形ビュー。外側の `WHERE` を合成すると `LIMIT` / 集計の意味が変わるため本文を 1 文として実行し、結果へ外側クエリを適用する（`sql::view_buffered`） |
| `check_*_within_view` | 投影・`WHERE`・`ORDER BY`・集計・ウィンドウ項目が `view_columns` に収まることを検査。範囲外は `22000`（`InvalidInput`）。`view_columns` が `None` なら検査不要 |

## Notes

- 出典は `fandhe-db-engine` 0.2.0（git SHA `dc888f6ea146d3078153d64a6848f5c8cf044431`）の `src/sql/view.rs`（全773行、テスト除く先頭 604 行）。公開・`pub(crate)` アイテムのシグネチャと主要 doc comment の抜粋。`resolve_from` 本体と private ヘルパー（`expr_columns_within` / `check_predicate_columns_within` 等）は掲載していない
- `resolve_from`: テーブル・ビューのいずれにも存在しなければ `UndefinedTable`。カタログ保存のビュー本文の再検証・デコード失敗（カタログ破損）は固定文言の `SqlSurfaceError::Internal`（本文リテラルを含めない）。連鎖走査は `MAX_VIEW_RESOLVE_STEPS = 10_000` で打ち切る
- 列スコープ検査を欠くと、非公開列を `WHERE exposed = 'x' OR hidden = 'secret'` のようにフィルタへ使う filter oracle になるため、`OR` / `NOT` / 式木は再帰的に検査する
- 評価後射影形ビューの連鎖は `MAX_VIEW_NESTING_DEPTH` 超過で `54000`（Issue #1411）
- 関連 ADR（commit `dc888f6`、`docs/design/create-view.md`）
- distinct from `mssql` / `drizzle` / `supabase`: fandhe-db のビュー参照展開の内部実装であり、各 SQL ダイアレクトの `CREATE VIEW` 構文リファレンスではない

## Related

- [view-buffered](./view-buffered.md)
- [ddl](./ddl.md)
