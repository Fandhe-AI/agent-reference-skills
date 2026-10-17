---
source: https://docs.rs/crate/fandhe-db-wire-server/0.2.0/source/docs/nosql-api.md
---

# explain (NoSQL)

`explain: true` は `search`（`vector`・`plan` いずれも）・`scan`・`aggregate`（`group_by`／`having` の有無を問わない）で受理し、検索・走査・集計の本体を実行せず SQL 表層の対応する `EXPLAIN` 文と同一内容の `QUERY PLAN` を返す。

## Signature / Usage

`plan` 指定 `search`:

```json
{"op": "search", "table": "docs", "plan": "find content", "limit": 10,
 "explain": true}
```

`vector` 指定 `search`:

```json
{"op": "search", "table": "docs", "vector": [0.1, 0.2, 0.3, 0.4], "limit": 10,
 "explain": true}
```

`scan`:

```json
{"op": "scan", "table": "docs", "limit": 10, "explain": true}
```

`aggregate`:

```json
{"op": "aggregate", "table": "docs",
 "aggregates": [{"fn": "count", "column": "*"}], "explain": true}
```

応答例（`200`）:

```json
{"explain": ["<QUERY PLAN の行>", "..."]}
```

## Notes

- `vector` 指定 `search`・`scan`・`aggregate` は Issue #948・NOSQL-16・SQL-27、`plan` 指定 `search` は TASK-186・NOSQL-10・Issue #765 で対応。索引の構築・ルックアップ・キャッシュ消費・行走査・書き込みはいずれの op でも一切行わない。
- `vector`・`plan` 同時指定＋`explain: true` → `42601`
- `vector`・`plan` 両方欠落＋`explain: true` → `42601`
- `insert`／`update`／`delete` への `explain` はいずれもスキーマが宣言しない未知キーとして `42601`（分割実行 DML も同様）
- `explain` が非 bool → `42601`
- 検証コード（原文記載）: `crates/wire-server/tests/nosql10_explain.rs`（`plan` 指定 `search`）・`nosql16_explain_targets.rs`（`vector` 指定 `search`・`scan`・`aggregate`）・`wire_explain.rs`。

## Related

- [op-search.md](./op-search.md)
- [op-scan.md](./op-scan.md)
- [op-aggregate.md](./op-aggregate.md)
- [../sql/explain.md](../sql/explain.md)
