---
source: https://docs.rs/crate/fandhe-db-wire-server/0.2.0/source/docs/nosql-api.md
---

# op: aggregate

単一行集計（`GROUP BY` なし）と `GROUP BY`／`HAVING` 集計の両方を、SQL テキストを一切組み立てずに束縛・実行する（SQL-13・SQL-14 と同一の実行計画）。

## Signature / Usage

単一行集計:

```json
{"op": "aggregate", "table": "docs",
 "aggregates": [{"fn": "count", "column": "*"}, {"fn": "sum", "column": "id"}]}
```

`GROUP BY`／`HAVING`:

```json
{"op": "aggregate", "table": "docs",
 "aggregates": [{"fn": "count", "column": "*"}],
 "group_by": ["lang"],
 "having": [{"fn": "count", "column": "*", "op": ">=", "value": 2}]}
```

単一文字列形 `group_by`＋`sort`＋`offset`:

```json
{"op": "aggregate", "table": "docs",
 "aggregates": [{"fn": "count", "column": "*"}],
 "group_by": "lang",
 "sort": [{"column": "count", "dir": "desc"}],
 "offset": 1}
```

## Options / Props

| キー | 必須 | 型 | 備考 |
| --- | --- | --- | --- |
| `op` | ○ | string | `"aggregate"` |
| `table` | ○ | string | |
| `aggregates` | ○ | object[]（`{"fn","column"}`。1〜32 要素） | `fn` は `count`／`sum`／`avg`／`min`／`max`（小文字完全一致）。`column` は列名、または `count` 専用の `"*"` |
| `filter` | △ | object[] | [filter.md](./filter.md) 参照 |
| `group_by` | △ | string \| string[]（配列は 1〜8 要素。`engine::sql::allowlist::MAX_GROUP_BY_COLUMNS`） | 単一文字列形 `"lang"` は 1 要素配列 `["lang"]` と完全に同じ扱い（NOSQL-16 (b)。Issue #1198）。`TEXT`・`INTEGER`／`BIGINT`／`REAL`／`DOUBLE PRECISION` 列（Issue #1183。数値キーは昇順・NULL 末尾・`-0.0` と `0.0` は同一グループ） |
| `having` | △ | object[]（`{"fn","column","op","value"}`） | `group_by` 必須。`op` は `=`／`<`／`<=`／`>`／`>=` の完全一致 |
| `sort` | △ | object[]（`{"column","dir"}`。非空、上限 8 要素） | `group_by` 必須。`column` は集計結果の出力列名（`group_by` 列名、または集計項目の既定エイリアス `count`／`sum`／`avg`／`min`／`max`）。`dir` は `"asc"`／`"desc"`（小文字完全一致）。同値はグループキー順。SQL の `GROUP BY ... ORDER BY` と同一結果（Issue #1198・NOSQL-15） |
| `offset` | △ | number | `group_by` 必須。`0..=10000`。ソート後の結果から先頭 `offset` グループを読み飛ばす（RLS 適用後の可視グループのみが対象）。`sort` 省略時はグループキー昇順の上で適用（Issue #1198・NOSQL-15） |
| `explain` | △ | bool | [explain.md](./explain.md) 参照。`true` は `QUERY PLAN` を返す（`group_by`／`having`／`sort`／`offset` 付きでも受理）。`false`／省略時は通常実行 |

## Notes

主な `wire_code`:

- `aggregates` が空配列 → `group_by`／`having` の有無を問わず一律 `42601`（`having` の参照解決より必ず先に検査する）
- `group_by` 要素数が 0・`group_by` なしの `having`／`sort`／`offset`（`offset: 0` の明示を含む。SQL 表層に単一行集計への `ORDER BY`／`OFFSET` の受理形がなく、黙って無視すると fail-open になるため）・`fn`／`op` が語彙外・識別子形状不正（`group_by` の空文字列を含む）→ `42601`
- `sort` が空配列・非オブジェクト要素・`column`／`dir` 欠落・`dir` が語彙外・`column` が識別子形状不正（`"*"` を含む）→ `42601`。要素数が 8 超過 → `54000`（HTTP `413`）。`column` が出力列名に存在しない → `22000`（複数の出力列に一致して曖昧な場合は `42702`）
- `offset` が非整数・負値・`u32` 超過 → `42601`、`10001` 以上 → `22000`
- `group_by` 要素数が 8（`MAX_GROUP_BY_COLUMNS`）超過・グループ数上限（10,000）・グループキー累計バイト・`having` 述語数上限超過 → `54000`
- `group_by` 列が `TEXT`／数値列（INTEGER／BIGINT／REAL／DOUBLE）でない・`having` が `MIN`/`MAX(<TEXT列>)` を参照・参照先が `aggregates` に存在しない／曖昧（`(fn, column)` の重複照合） → `22000`
- `sort[].column` が複数一致で曖昧（例: `count(*)` と `count(<列>)` を併記した既定名 `count`） → `42702`（Issue #1270。SQL の `ORDER BY` と同じ分類。候補は列挙せず参照名のみを返す）
- `VECTOR` 列の集計: `count` は列の裸の列参照を受理し非 `NULL` 行数を数える（`resolve_aggregate_input` の `AggregateInput::VectorColumnPresence`）。`sum`／`avg`／`min`／`max` は同じ `VECTOR` 列参照を `42883`（`UNDEFINED_FUNCTION`。Issue #1349）で拒否
- 上記の `42883` について: 原文 nosql-api.md の当該箇所は `22000` と記すが、同じ文書のエラー表（`42883`、Issue #1349）・engine `sql/parser.rs` の `resolve_aggregate_input`（`(ColumnType::Vector(_), 非 count)` は `undefined_function`）・wire-server `http/query/aggregate.rs` のテスト（`wire_code() == "42883"`）が一致して `42883` を示すため、実装に合わせて記載している。原文は内部で不整合
- `sum` オーバーフロー → `22003`

その他:

- `sort`／`offset` は engine の `BoundAggregate::with_group_order_by`／`with_group_offset`（SQL テキスト経由の `GROUP BY ... ORDER BY ... LIMIT ... OFFSET ...` と同じ対象名解決・実行器を共有。第 2 の実行器は持たない）へ写像する。
- `limit` 相当のキーは持たない（SQL の `OFFSET` 単独が受理されないため、`offset` のみの要求と SQL の一致は `LIMIT 10000 OFFSET m` で確認する）。
- 検証コード（原文記載）: `crates/wire-server/tests/nosql4_aggregate.rs`・`nosql5_group_by.rs`・`nosql4_5_aggregate_wire_parity.rs`。

## Related

- [op-scan.md](./op-scan.md)
- [filter.md](./filter.md)
- [explain.md](./explain.md)
- [sql-nosql-mapping.md](./sql-nosql-mapping.md)
- [../sql-execution/group-by.md](../sql-execution/group-by.md)
