---
source: https://docs.rs/crate/fandhe-db-wire-server/0.2.0/source/docs/nosql-api.md
---

# op: create_table / alter_table / drop_table

NOSQL-13・TASK-207（Issue #910）で `op` 語彙へ加わった DDL 3 op。SQL 表層の `CREATE TABLE`／`ALTER TABLE ... ADD COLUMN`／`DROP TABLE`（SQL-23）と**同一の実行器**（`engine::core::EngineCore::execute_parsed_in_session`）へ、JSON の各フィールドを SQL 表層と同じ字句トークン列へ写像したうえで到達させる（第 2 の DDL 実行器・第 2 の権限判定は存在しない。写像の実装は `crates/wire-server/src/http/query/ddl.rs`）。

## Signature / Usage

```json
{"op": "create_table", "table": "docs", "columns": [
  {"name": "embedding", "type": "vector", "dim": 3},
  {"name": "lang", "type": "text", "nullable": true}
]}
```

```json
{"op": "alter_table", "table": "docs",
 "add_column": {"name": "note", "type": "text"}}
```

```json
{"op": "drop_table", "table": "docs"}
```

`FOREIGN KEY` の参照アクション（Issue #1148）:

```json
{"op": "create_table", "table": "children", "columns": [
  {"name": "parent_id", "type": "integer", "nullable": true},
  {"name": "note", "type": "text"}
], "constraints": [
  {"kind": "foreign_key", "columns": ["parent_id"],
   "references": {"table": "parents", "columns": ["id"],
   "on_delete": "cascade", "on_update": "set_null"}}
]}
```

配列・ENUM 列（Issue #1409）:

```json
{"op": "create_table", "table": "posts", "columns": [
  {"name": "tags", "type": "array", "element_type": "text", "max_len": 8},
  {"name": "prices", "type": "array", "element_type": "numeric", "precision": 10, "scale": 2},
  {"name": "mood", "type": "enum", "enum_type": "mood"}
]}
```

`NOT NULL`／`DEFAULT` を伴う `alter_table`（Issue #1338）:

```json
{"op": "alter_table", "table": "docs",
 "add_column": {"name": "n", "type": "integer", "not_null": true, "default": 0}}
```

## Options / Props

| キー | 必須 | 型 | 備考 |
| --- | --- | --- | --- |
| `op` | ○ | string | `"create_table"`／`"alter_table"`／`"drop_table"` |
| `table` | ○ | string | |
| `columns`（`create_table`） | ○ | object[] | `{"name","type","dim"?,"precision"?,"scale"?,"enum_type"?,"element_type"?,"max_len"?,"nullable"?,"default"?}`。`default` は文字列・数値・真偽値（配列の既定値は文字列 `"{1,2}"` 形）。予約列名（`id`／`tenant_id`／`visibility`／`check`／`constraint`）は `42601` |
| `constraints`（`create_table`） | △ | object[] | `{"kind":"primary_key"｜"unique"｜"foreign_key"｜"check","columns"?,"references"?,"name"?,"predicate"?}`。`references`＝`{"table","columns"?,"on_delete"?,"on_update"?}`。下記 Notes 参照 |
| `add_column`（`alter_table`） | △ | object | `{"name","type","dim"?,"precision"?,"scale"?,"enum_type"?,"element_type"?,"max_len"?,"not_null"?,"default"?}`。`drop_column` と排他必須（両方・双方欠落は `42601`）。`not_null` は bool（`true` のとき `default` が必須で、無ければ engine が `42601`。`false`・省略は nullable 列）、`default` は文字列・数値・真偽値（Issue #1338。SQL の `NOT NULL`／`DEFAULT <literal>` と同じ実行器・エラー契約）。DATE／TIMESTAMP／UUID／JSON／JSONB／ENUM の DEFAULT は文字列で渡す。`default` の `null`・配列・オブジェクト、`not_null` の非 bool、`nullable` などの未知キーは `42601`。`create_table` の `nullable` に対し `add_column` は `not_null` を使う（`nullable` は受け付けない） |
| `drop_column`（`alter_table`） | △ | object | `{"name"}`。SQL 表層の `ALTER TABLE ... DROP COLUMN` と同じ入口へ結線（Issue #1167。エラー契約は SQL 表層と同一）。`add_column` と排他必須 |

## Notes

- DDL 実行権限: `--ddl-allowed-users` に列挙したユーザーのみ実行できる（`POST /v1/session` のログイン成功直後に確定し、以後そのセッションの寿命中固定される）。権限の無いセッションは、対象テーブルの有無にかかわらず常に `42501`（`403`）のみを返す（存在オラクル非公開。テナント境界とは別軸の判定）。
- `alter_table` は `add_column`／`drop_column` のどちらか一方が必須（排他）。原文の表は `drop_column` を ○ と表記しているが、同じ表の備考の排他必須の記述に合わせて △ とした。
- 成功応答は 3 op 共通で `{"ok":true}`（行数・件数を返さない）。
- `create_table.columns[].type` と `alter_table.add_column.type` は SQL 表層と同じ型集合（Issue #1409）: `text`／`integer`／`bigint`／`real`／`double`（`DOUBLE PRECISION`）／`boolean`／`date`／`timestamp`／`bytea`／`json`／`jsonb`／`uuid`／`numeric`（`precision`／`scale` 必須）／`vector`（`dim` 必須。`add_column` では構文は通るが実行段で `0A000`）／`enum`（`enum_type` 必須）／`array`。大文字小文字は区別しない。
- 配列は `{"type":"array","element_type":"<要素型>","max_len":N}` で宣言する（SQL の `<要素型>[N]`。`max_len` 省略は `[]`）。`element_type` は上記のうち `array` 以外の型名で、要素型のパラメータ（`precision`／`scale`／`enum_type`）は通常の型と同じキーで渡す。`max_len` が 0・1024 超、要素型が `vector`、入れ子配列、未登録の ENUM 型名は `42601`。型と無関係なパラメータ（配列でない型への `element_type`／`max_len` 等）も黙って無視せず `42601`。配列要素数の上限超過の書き込みは `54000`（HTTP 413）。
- `constraints` の詳細:
  - `check` は `name`（任意）と `predicate`（filter 葉形 `column`／`op`／`value` の配列。AND 結合）を取り、SQL 表層と同じ DDL 入口へ合流する（Issue #1199・NOSQL-13・TABLE-16）。
  - `primary_key` も `name`（任意）を取り、SQL の `CONSTRAINT <name> PRIMARY KEY (...)` と同じカタログ表現になる（`ALTER TABLE ... DROP CONSTRAINT <name>` の対象。Issue #1437・NOSQL-13・TABLE-22）。名前付きの `["id"]` 単独・主キー名と `check` 名の衝突・不正な識別子は `42601`、主キーの重複宣言は名前の有無に関わらず `42P16`。`unique`／`foreign_key` への `name` は引き続き `42601`。
  - 違反した `insert`／`update` は `23514`。`kind` と矛盾するフィールド・`in`／`or`・語彙外の `op`・RLS 述語名の列は `42601`、葉数の上限超過は `54000`。
  - `foreign_key` の `on_delete`／`on_update` は `"no_action"｜"restrict"｜"cascade"｜"set_null"｜"set_default"` の固定語彙（小文字 snake_case・完全一致。Issue #1148）で参照アクション（TABLE-17・TASK-205、Issue #907）を宣言できる。省略時・`"no_action"`／`"restrict"` はいずれも `NO ACTION` と同じカタログ表現になる。語彙外・大文字混じり・非文字列値は `42601`（副作用ゼロ）。参照元列が `NOT NULL` の状態で `"set_null"` を付ける・DEFAULT の無い `NOT NULL` 列に `"set_default"` を付けるなど宣言時に常に失敗する組み合わせは `42830`。宣言済みテーブルへの `update`／`delete` op は SQL 表層と同一の単一検査点を通るため連鎖が発火し、連鎖の深さ・行数の上限超過は `54000`（HTTP `413`。副作用ゼロ）。
- 意図した差分: 制御文字（改行など）を含む文字列の `default` は、`create_table` と同じく NoSQL では `42601` で拒否する（SQL 表層では受理される）。数値の `default` は指数表記（`1e5`・`1E-3` 等）を `42601` で拒否する（SQL 表層の数値リテラルも指数表記を受理しない。`100000`・`0.001` のように通常の十進表記で渡す）。
- `create_index`／`drop_index`／`create_view`／`drop_view` は NOSQL-13 の対象外のまま語彙外（`0A000`）に据え置く。
- 原文が参照する `docs/design/nosql-ddl-mapping.md`（CHECK 制約の写像表・拒否条件）は本スキル未収録。
- 検証コード（原文記載）: `crates/wire-server/src/http/query/op.rs`・`schema.rs`・`ddl.rs`・`gate.rs`・`crates/wire-server/tests/nosql13_ddl.rs`・`nosql1_op_vocabulary.rs`・`nosql8_schema_validation.rs`・`nosql9_op_allowlist.rs`・`crates/engine/tests/sql_ddl_tokens_public_api.rs`。

## Related

- [query-common.md](./query-common.md)
- [sql-nosql-mapping.md](./sql-nosql-mapping.md)
- [error-response.md](./error-response.md)
- [../storage/catalog.md](../storage/catalog.md)
