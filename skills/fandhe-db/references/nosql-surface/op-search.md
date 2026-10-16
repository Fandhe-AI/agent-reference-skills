---
source: https://docs.rs/crate/fandhe-db-wire-server/0.2.0/source/docs/nosql-api.md
---

# op: search

ベクトル検索・ハイブリッド検索・クエリ展開検索（`plan`）の `POST /v1/query` op。

## Signature / Usage

要求例（ベクトル検索）:

```json
{"op": "search", "table": "docs", "vector": [0.1, 0.2, 0.3, 0.4], "limit": 10,
 "columns": ["id", "lang"]}
```

要求例（ハイブリッド検索）:

```json
{"op": "search", "table": "docs", "vector": [1.0, 0.0], "limit": 3,
 "columns": ["id"], "hybrid": {"text": "alpha"}}
```

要求例（クエリ展開検索）:

```json
{"op": "search", "table": "docs", "plan": "find content", "limit": 10}
```

## Options / Props

| キー | 必須 | 型 | 備考 |
| --- | --- | --- | --- |
| `op` | ○ | string | `"search"` |
| `table` | ○ | string | 識別子形状 |
| `limit` | ○ | number | `1..=10000`。非整数・負値・`u32` 超過等の形状不正は `42601`、`0` または `10001` 以上の範囲外は `22000` |
| `vector` | △ | number[] | `plan` と排他かつどちらか必須 |
| `plan` | △ | string | `vector` と排他かつどちらか必須。LLM クエリ展開 |
| `hybrid` | △ | `{"text": string}` | `vector` とのみ併用可（`plan` と併用は `42601`）。疎側テキスト列は固定で `body` 列 |
| `mode` | △ | string | `"recall"`（`vector` 検索の既定）／`"precision"`。`plan` 検索で省略時は下記参照 |
| `columns` | △ | string[]（非空） | 省略時は `id`＋全実列 |
| `filter` | △ | object[] | [filter.md](./filter.md) 参照 |
| `explain` | △ | bool | [explain.md](./explain.md) 参照 |

## Notes

- `mode` の解決（`resolve_mode_with_planner`。優先順位: 要求の `mode` フィールド ＞ セッション変数〔`SET` 相当。NoSQL 表層には対応する構文が無く、`/v1/query` は要求ごとに既定の `SessionState` で実行されるため常に未設定〕＞ プランナー推定 ＞ 既定 `recall`）。
  - `vector` 検索: `mode` 省略時は常に既定 `recall`（プランナーを経由しないため推定ヒントが存在しない）。
  - `plan` 検索: `mode` 省略時はクエリ展開（LLM プランナー）の推定結果 `mode_hint`（TASK-164・PLAN-11）が採用されうる。`mode_hint` が `"precision"` と推定されれば `mode` を明示指定しなくても `precision` モードで実行される（確信度ゲート・`explain` での `mode_source` 確認は SQL 表層の `USING PLAN` と同一契約）。
- 主な `wire_code`:
  - `vector`／`plan` 両方指定・両方欠落・`plan`＋`hybrid` 併用・`columns: []`・識別子形状不正 → `42601`
  - 未知テーブル → `42P01`
  - 未知列・`VECTOR` 列でない列への `ORDER BY` 相当・非有限ベクトル要素等 → `22000`
- `sort`（`scan`・`aggregate` op が持つ並べ替え指定）と `offset` は本スキーマに宣言されていないため、指定すると未知キー `42601` になる（ベクトル順位付けとの相互排他。NOSQL-15・SQL-25 (a)・Issue #946・#947）。
- 検証コード（原文記載）: `crates/wire-server/tests/nosql2_search.rs`・`nosql2_search_binding.rs`。

## Related

- [op-scan.md](./op-scan.md)
- [filter.md](./filter.md)
- [explain.md](./explain.md)
- [response-schema.md](./response-schema.md)
- [../search/hybrid.md](../search/hybrid.md)
