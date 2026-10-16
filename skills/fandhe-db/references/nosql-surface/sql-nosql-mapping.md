---
source: https://docs.rs/crate/fandhe-db-wire-server/0.2.0/source/docs/nosql-api.md
---

# SQL ↔ NoSQL 対応表

SQL 表層（pg wire）の文と NoSQL 表層（`POST /v1/query`）の op の対応。

## Signature / Usage

```text
SQL:   SELECT id, lang FROM docs ORDER BY embedding <=> '[0.1,0.2,0.3,0.4]' LIMIT 10
NoSQL: {"op":"search","table":"docs","vector":[0.1,0.2,0.3,0.4],"limit":10,"columns":["id","lang"]}
```

**対応表**

| SQL | NoSQL |
| --- | --- |
| `SELECT id, lang FROM docs ORDER BY embedding <=> '[0.1,0.2,0.3,0.4]' LIMIT 10` | `search` + `vector` + `columns` |
| `SELECT id FROM docs ORDER BY HYBRID(embedding, '[1.0,0.0]', body, 'alpha') LIMIT 3` | `search` + `vector` + `hybrid.text`（疎側列は `body` 固定） |
| `SELECT id FROM docs USING PLAN('find content') LIMIT 10` | `search` + `plan` |
| `... LIMIT n USING MODE 'recall'` | `"mode":"recall"` |
| `WHERE lang = 'ja'` | `filter` 要素 `{"op":"eq",...}` |
| `WHERE lang LIKE 'j%'` | `filter` 要素 `{"op":"prefix",...}` |
| `EXPLAIN SELECT id FROM docs USING PLAN('find content') LIMIT 10` | `search` + `plan` + `"explain":true` |
| `EXPLAIN SELECT id FROM docs ORDER BY embedding <=> '[0.1,0.2,0.3,0.4]' LIMIT 10` | `search` + `vector` + `"explain":true`（Issue #948） |
| `SELECT id, lang FROM docs WHERE lang = 'ja' LIMIT 10`（広域取得 SQL-15） | `scan` |
| `EXPLAIN SELECT id FROM docs LIMIT 10` | `scan` + `"explain":true`（Issue #948） |
| `SELECT id, lang FROM docs ORDER BY lang DESC LIMIT 10`（スカラー `ORDER BY`。SQL-25 (a)） | `scan` + `sort`（Issue #946・NOSQL-15） |
| `SELECT id, lang FROM docs LIMIT 10 OFFSET 20`（広域取得 `OFFSET`。SQL-25 (b)） | `scan` + `offset`（Issue #947・NOSQL-15） |
| `SELECT COUNT(*), SUM(id) FROM docs` | `aggregate` |
| `SELECT lang, COUNT(*) FROM docs GROUP BY lang HAVING count >= 2` | `aggregate` + `group_by` + `having` |
| `SELECT lang, COUNT(*) FROM docs GROUP BY lang ORDER BY count DESC LIMIT 10000 OFFSET 1`（SQL-25 (a)(b)） | `aggregate` + `group_by` + `sort` + `offset`（Issue #1198・NOSQL-15。`limit` 相当のキーは無く、`LIMIT` は SQL 側のグループ数上限と同値で対応） |
| `EXPLAIN SELECT COUNT(*) FROM docs` | `aggregate` + `"explain":true`（Issue #948） |
| `INSERT INTO docs (id, embedding, lang) VALUES (1, '[0.1,0.2,0.3]', 'ja') USING OPERATION_ID 'op-1'` | `insert` + `operation_id` |
| `UPDATE docs SET lang = 'en' WHERE id = 1 USING OPERATION_ID 'op-1'` | `update` + `where.id` + `operation_id`（同一実行器・同一台帳キー空間） |
| `UPDATE docs SET lang = 'en' WHERE lang = 'ja' USING OPERATION_ID 'op-1'` | `update` + `filter` + `operation_id`（同一実行器・同一台帳キー空間。Issue #1062） |
| `DELETE FROM docs WHERE id = 1 USING OPERATION_ID 'op-1'` | `delete` + `where.id` + `operation_id`（同一実行器・同一台帳キー空間） |
| `DELETE FROM docs WHERE lang = 'ja' USING OPERATION_ID 'op-1'` | `delete` + `filter` + `operation_id`（同一実行器・同一台帳キー空間。Issue #1062） |
| `CREATE TABLE docs (embedding VECTOR(3), lang TEXT)` | `create_table` + `columns`（Issue #910。同一実行器） |
| `CREATE TABLE posts (tags TEXT[8], price NUMERIC(10,2), mood mood)` | `create_table` + `columns`（`type:"array"`＋`element_type`／`max_len`、`numeric`、`enum`。Issue #1409。同一実行器・同一カタログ表現） |
| `FOREIGN KEY (parent_id) REFERENCES parents (id) ON DELETE CASCADE ON UPDATE SET NULL` | `constraints[kind=foreign_key].references.on_delete`／`on_update`（Issue #1148。同一実行器） |
| `CHECK (price > 0)` | `constraints[kind=check].predicate`（Issue #1199。同一実行器） |
| `ALTER TABLE docs ADD COLUMN note TEXT` | `alter_table` + `add_column`（Issue #910。同一実行器） |
| `ALTER TABLE docs ADD COLUMN n INTEGER NOT NULL DEFAULT 0` | `alter_table` + `add_column`（`not_null`／`default`。Issue #1338。同一実行器） |
| `DROP TABLE docs` | `drop_table`（Issue #910。同一実行器） |

## Notes

対応の無いもの（NoSQL 側に受理形が存在しない。実際の応答は語彙外 `op` として `0A000`、または未知キーとして `42601`）:

- `HINT ORDER(...)` によるソフトブースト
- UDF 呼び出し・`CREATE FUNCTION`
- `SET`（`search_mode` 等のセッション変数設定）
- 定数のみの `SELECT`
- `aggregate` への `limit`（`GROUP BY ... LIMIT n` 相当。`sort`／`offset` は Issue #1198 で対応済み）
- `INSERT` のファイル形（`path`／`body` 列指定の増分インデックス投入）
- `ALTER TABLE ... ALTER COLUMN TYPE` 相当の op（`alter_table` に語彙なし。別論点）
- `alter_table` での `CHECK` の追加・削除、算術式を含む `CHECK` 述語、列制約形の既定名（Issue #1199 の対象外）
- `CREATE INDEX`／`DROP INDEX`／`CREATE VIEW`／`DROP VIEW`（NOSQL-13 の対象外）
- `FOREIGN KEY` の `MATCH {SIMPLE|FULL}`／`[NOT] DEFERRABLE`／`INITIALLY {DEFERRED|IMMEDIATE}` 句（NoSQL `references` に対応キーが無い。Issue #1148 の対象外。列リスト形の `SET NULL (col, ...)`／`SET DEFAULT (col, ...)` も SQL 表層でも未実装）

逆方向（NoSQL にあって SQL に対応形がないもの）は無い。

本対応表の 10 ケース（search-1〜5・scan-1・agg-1〜4）は無改造 `psql`（SQL 表層）と無改造 HTTP クライアント（NoSQL 表層）の双方を実バイナリ経由で実行して列名・型・行集合の一致を検証する層 B `three_client_http_e2e.rs`（Issue #779。`make e2e-three-client-http`）でも固定している。検証コード（原文記載）: `nosql3_scan_wire_parity.rs`・`nosql4_5_aggregate_wire_parity.rs`・`wire_using_plan.rs`・`wire_insert_operation_id.rs`・`crates/engine/tests/default_preset.rs`。

## Related

- [query-common.md](./query-common.md)
- [op-search.md](./op-search.md)
- [ddl.md](./ddl.md)
- [../sql/sql-module.md](../sql/sql-module.md)
