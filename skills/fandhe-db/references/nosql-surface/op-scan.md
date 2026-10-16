---
source: https://docs.rs/crate/fandhe-db-wire-server/0.2.0/source/docs/nosql-api.md
---

# op: scan (offset / sort)

順序保証なしの広域取得（SQL-15 の bare 形 `SELECT ... [WHERE ...] LIMIT n` と同一実行意味論。`limit` 件到達で早期終了・取得モード非適用）。`sort` を指定すると SQL 表層のスカラー `ORDER BY`（SQL-25 (a)）と同一の決定的な順序になる（Issue #946・NOSQL-15・TASK-224）。

## Signature / Usage

```json
{"op": "scan", "table": "docs", "limit": 10, "offset": 20, "columns": ["id", "lang"],
 "filter": [{"column": "lang", "op": "eq", "value": "ja"}]}
```

`sort` 指定:

```json
{"op": "scan", "table": "docs", "limit": 10, "columns": ["id", "lang"],
 "sort": [{"column": "lang", "dir": "desc"}, {"column": "id", "dir": "asc"}]}
```

## Options / Props

| キー | 必須 | 型 | 備考 |
| --- | --- | --- | --- |
| `op` | ○ | string | `"scan"` |
| `table` | ○ | string | |
| `limit` | ○ | number | `1..=10000`。非整数・負値・`u32` 超過等の形状不正は `42601`、`0` または `10001` 以上の範囲外は `22000` |
| `offset` | △ | number | `0..=10000`。非整数・負値・`u32` 超過等の形状不正は `42601`、`10001` 以上の範囲外は `22000`。省略時の既定値は `0`（`0` を明示指定した場合と等価） |
| `filter` | △ | object[] | [filter.md](./filter.md) 参照 |
| `columns` | △ | string[]（非空） | 省略時は `id`＋全実列 |
| `explain` | △ | bool | [explain.md](./explain.md) 参照。`true` は `QUERY PLAN` を返す。`false`／省略時は通常実行 |
| `sort` | △ | object[]（`{"column","dir"}`。非空、上限 8 要素） | `dir` は `"asc"`／`"desc"`（小文字完全一致）。省略時は順序保証なし |

## Notes

- `vector`／`plan`／`mode`／`hybrid` はスキーマが宣言しないフィールドのため、未知キーとして `42601` になる。`offset` も同じ理由で `search` へ付与すると `42601`（Issue #947・NOSQL-15）。`aggregate` の `offset` は `group_by` 付きに限り別途受理する（[op-aggregate.md](./op-aggregate.md) 参照。Issue #1198）。
- 応答には `score` 列相当が一切含まれない（`ORDER BY`／`hybrid` を経由しないため合成スコア列が構造上存在しない。`sort` 指定でも同様）。
- `offset`（ページング。Issue #947・NOSQL-15・TASK-224）は SQL 表層の広域取得 `LIMIT n OFFSET m`（SQL-25 (b)）と同一の実行計画へ写像する（第 2 の実行器は作らない）。`sort` 未指定でも `offset` は拒否されない（SQL 表層が `ORDER BY` なしの `LIMIT n OFFSET m` を受理する契約とのパリティ）。この場合の `offset` は物理走査順の上で適用され、値による意味的な順序ではない。同一スナップショット内では決定的だが、ページ取得の合間に書き込みがあると行の重複や欠落が起こりうる。安定したページングが必要な場合は `sort`（`id` をキーにする）と組み合わせることを推奨する。詳細は原文が指す `docs/design/sql-offset-paging.md`「`ORDER BY` なし `OFFSET` の意味論」節（本スキル未収録）。
- `explain: true`（Issue #948・NOSQL-16）は `sort`・`offset` を指定した場合も同じ束縛（`PreparedScan::bind`）を経由するため併用できる。
- `sort` の主な `wire_code`:
  - `sort` が空配列・非オブジェクト要素・`column`／`dir` 欠落・`dir` が `"asc"`／`"desc"` 以外（大文字混じりを含む）・`column` の識別子形状不正 → `42601`
  - `sort[].column` が未知列、または `VECTOR`／`ARRAY`／`BYTEA`／`JSON`／`JSONB` 列（並べ替え不能な型） → `22000`
  - `sort` の要素数が 8 を超える → `54000`（HTTP `413`）
- 検証コード（原文記載）: `crates/wire-server/tests/nosql3_scan_mapping.rs`・`nosql3_scan_wire_parity.rs`。

## Related

- [op-search.md](./op-search.md)
- [op-aggregate.md](./op-aggregate.md)
- [filter.md](./filter.md)
- [response-schema.md](./response-schema.md)
- [sql-nosql-mapping.md](./sql-nosql-mapping.md)
