---
source: https://docs.rs/crate/fandhe-db-wire-server/0.2.0/source/docs/nosql-api.md
---

# op: update / delete

`update`／`delete` は `where`（単一行・`id` 完全一致形）と `filter`（述語形。非空）のいずれも束縛・実行結線済み。`where` 形は SQL 表層 `UPDATE ... WHERE id = <n> USING OPERATION_ID`（SQL-17）／`DELETE FROM ... WHERE id = <n> USING OPERATION_ID`（SQL-18）と同一の実行器（`engine::sql::exec::execute_update_with_schema`／`execute_delete`）・同一の台帳キー空間 `(tenant, table, operation_id)` へ到達する（Issue #876・TASK-186・NOSQL-6・NOSQL-12）。`filter` 形は述語形（SQL-19。`execute_predicate_update`／`execute_predicate_delete`。Issue #1062）と同一。`filter: []`（空配列）のみ `42601` で拒否する（engine を呼ばない。SQL の `WHERE` 句省略とのパリティ）。

## Signature / Usage

`update`（`where` 形）:

```json
{"op": "update", "table": "docs", "set": {"lang": "en"}, "where": {"id": 1},
 "operation_id": "op-1"}
```

`delete`:

```json
{"op": "delete", "table": "docs", "where": {"id": 1}, "operation_id": "op-1"}
```

成功応答: `{"updated":<n>,"operation_id":"<echo>"}`／`{"deleted":<n>,"operation_id":"<echo>"}`。

## Options / Props

`update`:

| キー | 必須 | 型 | 備考 |
| --- | --- | --- | --- |
| `op` | ○ | string | `"update"` |
| `table` | ○ | string | |
| `set` | ○ | object（任意キー・非空） | 列名をキーに持つ部分更新。`id`／`tenant_id`／`visibility` は `42601`。`TEXT` 列は JSON 文字列、`VECTOR` 列は数値配列（**文字列形のベクトルリテラルは受理しない**）のみ受理。他の列型は `insert` と同じ JSON 表現。`null` は列型を問わず nullable 判定込みで `bind_update` へ委譲する（非 nullable 列への `null` は `22000`）。型不一致・未知列・次元不一致は `22000`（新型の型不一致は `42601`） |
| `where` | △ | `{"id": number}` | 単一行・`id` 完全一致形。小数は `22000`、負数は `42601`（SQL 表層の字句解析・束縛とのパリティ）。`filter` との排他（両方・双方欠落はいずれも `42601`） |
| `filter` | △ | object[] | [filter.md](./filter.md) 参照。空配列は `42601`。非空は述語形 `UPDATE` として実行される（影響行数上限 `MAX_DML_AFFECTED_ROWS` 超過は `54000`。副作用ゼロ） |
| `operation_id` | △ | string | 欠落・`null`・空文字は `23502`。同一値への再送は台帳照合により内容一致 `23505`（`DUPLICATE_OPERATION_ID`）・不一致 `22023`（SQL 表層と共有） |
| `mode` | | string | 分割実行の修飾（Issue #1130・NOSQL-12）。受理値は `"partitioned"` のみで、それ以外の文字列・非文字列は `42601`（黙って原子実行へ切り替えない）。`filter`（述語形）とだけ組み合わせられ、`where` との併用は `42601`。[partitioned-dml.md](./partitioned-dml.md) 参照 |
| `chunk` | | number | 1 チャンクの行数（`mode` 指定時のみ有効。`mode` なしは `42601`）。`0`・小数・`usize` 超過は `22000`、負数は `42601`、サーバー設定のチャンク幅超過は `22000`（SQL の `CHUNK n` と同じ規則） |

`delete`:

| キー | 必須 | 型 | 備考 |
| --- | --- | --- | --- |
| `op` | ○ | string | `"delete"` |
| `table` | ○ | string | |
| `where` | △ | `{"id": number}` | 単一行・`id` 完全一致形。小数は `22000`、負数は `42601`（SQL 表層とのパリティ）。`filter` との排他（両方・双方欠落はいずれも `42601`） |
| `filter` | △ | object[] | [filter.md](./filter.md) 参照。空配列は `42601`。非空は述語形 `DELETE` として実行される（影響行数上限 `MAX_DML_AFFECTED_ROWS` 超過は `54000`。副作用ゼロ） |
| `operation_id` | △ | string | 欠落・`null`・空文字は `23502`。同一値への再送は台帳照合により `23505`（`DUPLICATE_OPERATION_ID`。内容一致。`DELETE` は行の有無に関わらず同一内容） |
| `mode` | | string | `update` と同じ（`"partitioned"` のみ受理。`filter` とだけ組み合わせ可） |
| `chunk` | | number | `update` と同じ |

## Notes

- 成功応答の `n`: `where` 形（単一行）は `0` または `1`（他テナント所有 id・未存在 id はいずれも `updated:0`／`deleted:0`・`200` で応答バイト列が完全一致する。RLS-9）。`filter`（述語形）は `0` 以上 `MAX_DML_AFFECTED_ROWS` 以下（一致した自テナント所有行数。上限超過は `54000` で応答が返らない）。
- 複数列 `set` は JSON パース時点でキーのアルファベット順へ正規化される一方、SQL 表層の `UPDATE ... SET col1 = .., col2 = ..` はクライアントが記述した宣言順をそのまま保持する。台帳の内容照合ハッシュはこの列の記述順に依存しないようスキーマの列定義順へ正規化済み（PR #992）のため、SQL 表層がアルファベット順でない宣言順で書いた `UPDATE` と同一値の NoSQL `update` は、同一 `operation_id` への再送であれば内容一致の再送（`23505`）として正しく判定される。
- `VECTOR` 列の値（SQL 表層のベクトルリテラル文字列と NoSQL 表層の数値配列）は、`where` 形では元々同一の内容照合ハッシュに一致する（Issue #1061 で固定テスト追加）。述語形でも `SET` 側に `VECTOR` 列を含められ、跨表層一致・台帳照合は Issue #1062 で固定されている。
- 原文が参照する設計文書（`docs/design/nosql-update-delete-mapping.md` 等）は本スキル未収録。
- 検証コード（原文記載）: `crates/wire-server/src/http/query/op.rs`・`schema.rs`・`dml_target.rs`・`update.rs`・`delete.rs`・`gate.rs`・`crates/wire-server/tests/nosql9_op_allowlist.rs`・`nosql1_op_vocabulary.rs`・`nosql12_update_delete.rs`・`crates/engine/tests/sql_update_delete_session_public_api.rs`。

## Related

- [partitioned-dml.md](./partitioned-dml.md)
- [filter.md](./filter.md)
- [op-insert.md](./op-insert.md)
- [error-response.md](./error-response.md)
