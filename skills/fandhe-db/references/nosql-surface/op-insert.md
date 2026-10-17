---
source: https://docs.rs/crate/fandhe-db-wire-server/0.2.0/source/docs/nosql-api.md
---

# op: insert

`rows` をバッチ挿入する op。`operation_id` による台帳照合で再送を判定する。

## Signature / Usage

```json
{"op": "insert", "table": "docs",
 "rows": [{"id": 1, "embedding": [0.1, 0.2, 0.3], "lang": "ja"}],
 "operation_id": "op-1"}
```

成功時（`200`）:

```json
{"inserted": 1, "operation_id": "op-1"}
```

## Options / Props

| キー | 必須 | 型 | 備考 |
| --- | --- | --- | --- |
| `op` | ○ | string | `"insert"` |
| `table` | ○ | string | |
| `rows` | ○ | object[] | 各行は `id`（非負整数）＋スキーマ列名をキーとする値 |
| `operation_id` | △（実質必須） | string | 欠落・`null`・空文字はいずれも `23502` |

## Notes

- `VECTOR` 列は数値配列。`nullable` の宣言値に関わらず常に必須。省略・`null` はいずれも拒否されるが、`wire_code` は列の `nullable` 宣言で分岐する（TABLE-16・TASK-204、Issue #904）: `nullable = false` の `VECTOR` 列は SQL 表層（`fill_omitted_columns`）と同じ `23502`（`NOT_NULL_VIOLATION`）、`nullable = true` の `VECTOR` 列は従来どおり `22000`（「VECTOR は nullable でも常に必須」という NoSQL 表層固有の制約のため）。
- 列型ごとの JSON 表現（Issue #896・NOSQL-17。原文が指す `docs/design/nosql-typed-json-binding.md` は本スキル未収録）: `INTEGER`／`BIGINT` は JSON 整数（小数・指数表記は `22P02`、非数値は `42601`。範囲外は `22003`）、`REAL`／`DOUBLE PRECISION` は JSON 数値（指数表記を受理。範囲外は `22003`）、`NUMERIC` は JSON 数値または数値文字列（指数表記を受理しシフト後に列の scale へ丸める。桁あふれは `22003`。Issue #1358）、`BOOLEAN` は JSON 真偽値、`DATE`／`TIMESTAMP`／`UUID` は JSON 文字列（書式違反は `22007`、範囲外・暦上不正は `22008`、`UUID` の形式不正は `22P02`）、`TEXT[]`／`BOOLEAN[]` は JSON 配列（要素種別不一致は `42601`、要素数超過は `54000`）。`TEXT`／`VECTOR`（旧来型）の型不一致のみ引き続き `22000` を維持する（新型は `42601`。表層内の非対称は既知の制約）。
- 全型共通（`VECTOR` 列を除く）: 「省略」（キー自体を持たない）と「明示的な JSON `null`」を区別する（TABLE-16・TASK-204、Issue #904。`DEFAULT` は省略にのみ適用し、明示 `null` には適用しない）。省略時は `DEFAULT` 句を持つ列なら既定値を補い、持たない列は nullable なら `NULL`・非 nullable なら `23502`（`NOT_NULL_VIOLATION`）。明示 `null` は `DEFAULT` の有無に関わらず、nullable なら `NULL`・非 nullable なら `23502`（`NOT_NULL_VIOLATION`。旧 `22000` から契約変更）。
- 未知キー・次元不一致・型不一致は `22000`（新型の型不一致は `42601`）。
- 同一 `operation_id` の再送: 内容が一致すれば `23505`（`code`=`DUPLICATE_OPERATION_ID`）、不一致なら `22023`（台帳照合。TASK-101・RECOVER-10 の再送判定を透過する）。
- 同一テナント内の `id` 重複は `23505`（`code`=`UNIQUE_VIOLATION`。他テナントの同 `id` とは衝突せず、応答は「不在時」と同一。TABLE-12・RLS-9）。
- `rows` の行数上限は既定 64（`EngineCore::execute_bound_insert_in_session` が `rows.len()` を INDEX-4 の件数上限相当として判定。起動時 CLI `--batch-max-files`〔優先〕または環境変数 `FANDHE_DB_BATCH_MAX_FILES` で上書き可能）。超過は `54000`。
- 行・バッチ単位のバイト上限（INDEX-4 ②③。`batch_limits::validate_batch_shape`）: 各行のバイト量を `Σ TEXT 列.len() + VECTOR 列.len() × 4`（`Null` は 0）として積算し、1 行あたり `chunking::MAX_INPUT_BYTES`（固定）、またはバッチ合計 `FANDHE_DB_BATCH_MAX_TOTAL_BYTES`（未設定時は `incremental::MAX_INDEX_TOTAL_BYTES`）を超えると `54000`。
- 行数は上記の件数上限（①）とは別枠でチャンク数上限（④。`batch_limits::validate_chunk_total`。1 行＝1 チャンク換算。既定は `incremental::MAX_CHUNKS_PER_FILE`、環境変数 `FANDHE_DB_BATCH_MAX_CHUNKS` で上書き可能）でも判定され、超過は同じく `54000`。
- Migration (0.1.0 → 0.2.0): バッチ上限の環境変数は旧 `VECTOR_DB_BATCH_MAX_*` から `FANDHE_DB_BATCH_MAX_*` へ改名（旧名は読まれない）。詳細は getting-started の migration-0-2 ページ。
- 検証コード（原文記載）: `crates/wire-server/tests/nosql6_insert.rs`・`nosql6_tenant_row_id_scope.rs`・`http_insert_response_boundary.rs`・`wire_insert_operation_id.rs`。

## Related

- [op-update-delete.md](./op-update-delete.md)
- [response-schema.md](./response-schema.md)
- [error-response.md](./error-response.md)
- [../performance/batch-limits.md](../performance/batch-limits.md)
- [../getting-started/migration-0-2.md](../getting-started/migration-0-2.md)
