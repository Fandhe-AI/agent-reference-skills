---
source: https://docs.rs/crate/fandhe-db-wire-server/0.2.0/source/docs/nosql-api.md
---

# 分割実行 DML (show_partitioned_dml / cancel_partitioned_dml)

`update`／`delete` の `filter`（述語形）に `"mode": "partitioned"` を付けると、SQL 表層の `... USING OPERATION_ID '<id>' PARTITIONED [CHUNK n]`（SQL-19）と**同一の実行器・上限・部分完了の意味論**で、一致行をチャンク単位に commit しながら処理する（Issue #1130・NOSQL-12・RECOVER-11）。進捗照会・取り消しは `show_partitioned_dml`／`cancel_partitioned_dml` op で行う。

## Signature / Usage

```json
{"op": "update", "table": "docs", "set": {"lang": "en"},
 "filter": [{"column": "lang", "op": "not_null"}],
 "mode": "partitioned", "chunk": 100, "operation_id": "op-1"}
```

```json
{"op": "show_partitioned_dml", "table": "docs", "operation_id": "op-1"}
```

```json
{"op": "cancel_partitioned_dml", "table": "docs", "operation_id": "op-1"}
```

## Options / Props

`show_partitioned_dml`／`cancel_partitioned_dml`（SQL 表層の `SHOW`／`CANCEL PARTITIONED DML '<id>' ON <table>` に対応）:

| キー | 必須 | 型 | 備考 |
| --- | --- | --- | --- |
| `op` | ○ | string | `"show_partitioned_dml"`／`"cancel_partitioned_dml"` |
| `table` | ○ | string | 識別子検査は `42601` |
| `operation_id` | ○ | string | 欠落・`null`・空文字は `23502` |

それ以外のキー（`tenant_id` 自己申告を含む）は未知キーとして `42601`。

## Notes

分割実行（`mode: "partitioned"`）:

- 述語の語彙は既存の述語形 `update`／`delete` の `filter` と同じ（`search` と同じ語彙。Issue #1197 の `ne`・`like`・`between`・`is_null`・`not_null`・`not`、Issue #1356 の範囲比較・`in`・`or`・数値列の各語彙を含む）。
- `operation_id` は必須（欠落は `23502`）。内容照合ハッシュのドメインは SQL 表層の分割実行と共有するため、表層を跨いだ同一 `operation_id` の再送で、中断ジョブの再開・完了済みへの `23505`・内容不一致の `22023` が SQL 表層と一致する。原子的な述語形（`mode` なし）とはハッシュを共有しない（同じ `operation_id` は互いに `22023`）。
- 完了時の応答本文は原子実行と同じ形（`{"updated":<n>,"operation_id":"..."}`・`{"deleted":<n>,"operation_id":"..."}`。`n` は累計件数）。
- 1 チャンク以上 commit した後に止まると `409`・`VD001`（`PARTIAL_COMPLETION`）、取り消し済みジョブへの再送・取り消しで止まった文は `409`・`VD002`（`PARTITIONED_DML_CANCELLED`）を返す。本文の `error.data` に `committed`（自テナントで commit 済みの件数）と `operation_id`（クライアントが指定した値）が入る（[error-response.md](./error-response.md) 参照）。同じ要求を再送するとカーソルから再開する。
- `explain: true` は引き続き未知キーとして `42601`（`EXPLAIN ... PARTITIONED` の NoSQL 版は未対応）。
- 多列 `set` は JSON パース時点でキーがアルファベット順へ正規化される。分割実行の内容照合ハッシュは SQL の記述順に依存するため、SQL 表層が非アルファベット順で書いた多列 `SET` と同一内容でも表層を跨ぐと `22023` になる（単一列、またはアルファベット順で書けば一致する）。この順序依存は述語形（`filter` 形。`mode` なしの原子実行も同じ `push_dml_assignments` を通る）のハッシュのもの。単一行 `where`（`id` 完全一致）形の `update` は PR #992 でスキーマ列順へ正規化済みで、この非対称はない（[op-update-delete.md](./op-update-delete.md) 参照）。根拠（engine 0.2.0 `recovery/content_hash.rs`）: `for_update_where` ／ `for_update_where_partitioned` は `push_dml_assignments` で `SET` 割当を渡された順のまま連結し並べ替えない。スキーマ列順への正規化を述べるのは `for_update_columns`（`id` 指定の部分更新）のコメント側のみ。
- 長時間要求の注意: 分割実行は 1 つの HTTP 要求の中でチャンクを最後まで進める。クライアントが切断してもサーバー側のジョブは止まらない。実行中のジョブへの再送は `55P03`（503）、中断（`VD001`）後の再送で再開する。クライアント側のタイムアウトは余裕を持って設定すること。

`show_partitioned_dml`／`cancel_partitioned_dml`:

- 応答は SQL 表層と同じ結果セット形（`status`・`rows` の 2 列。`status` は `running`・`interrupted`・`completed`・`cancelled`、`cancel` のみ `cancelling` を返しうる。`rows` は commit 済みの件数〔`completed` は累計〕）。
- ジョブなし・他テナントのジョブ・テーブルなし・見えないテーブルは、いずれも 0 行の同一応答になる（RLS-9。バイト一致をテストで固定）。
- `cancel` は中断ジョブを `cancelled` にし、完了済みジョブは `completed` のまま変えない。実行中のジョブには取り消しを要求して `cancelling` を返し、実行器は次のチャンク境界で止まる（実行中の要求は `VD002` で終わる）。以後の `show` は `cancelled` を返す。commit 済みのチャンクは戻さない。
- 原文が参照する `docs/design/partitioned-dml.md` 10 節は本スキル未収録。
- 検証コード（原文記載）: `crates/wire-server/tests/nosql12_partitioned_dml.rs`・`crates/engine/tests/partitioned_dml_bound_session.rs`。

## Related

- [op-update-delete.md](./op-update-delete.md)
- [filter.md](./filter.md)
- [error-response.md](./error-response.md)
