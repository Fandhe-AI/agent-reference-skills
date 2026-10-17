---
source: https://raw.githubusercontent.com/Fandhe-AI/fandhe-db/dc888f6ea146d3078153d64a6848f5c8cf044431/CHANGELOG.md
---

# Migration 0.1.0 → 0.2.0

0.2.0 は crate 名を `fandhe-vector-db-*` から `fandhe-db-*` へ改めた初公開版で、環境変数名・`ValidatedInsert`・`BoundInsertForm` に破壊的変更を含む。両クレートは同一バージョンで同期して公開される。

## Signature / Usage

```toml
# Cargo.toml: 依存名を新 crate 名へ置き換える（lib 名 `engine` / `wire_server` は不変のため `use` 文の変更は不要）
# 旧
fandhe-vector-db-engine = "0.1.0"
# 新
fandhe-db-engine = "0.2.0"
```

```text
# 環境変数の改名（旧名は読まれない）
VECTOR_DB_BATCH_MAX_FILES        -> FANDHE_DB_BATCH_MAX_FILES
VECTOR_DB_BATCH_MAX_TOTAL_BYTES  -> FANDHE_DB_BATCH_MAX_TOTAL_BYTES
VECTOR_DB_BATCH_MAX_CHUNKS       -> FANDHE_DB_BATCH_MAX_CHUNKS
```

**Breaking Changes**

| 対象 | 旧 | 新 / 移行 |
|------|----|-----------|
| crate 名 (engine) | `fandhe-vector-db-engine` | `fandhe-db-engine` |
| crate 名 (wire-server) | `fandhe-vector-db-wire-server` | `fandhe-db-wire-server` |
| バッチ上限の環境変数 | `VECTOR_DB_BATCH_MAX_FILES` / `VECTOR_DB_BATCH_MAX_TOTAL_BYTES` / `VECTOR_DB_BATCH_MAX_CHUNKS` | `FANDHE_DB_BATCH_MAX_FILES` / `FANDHE_DB_BATCH_MAX_TOTAL_BYTES` / `FANDHE_DB_BATCH_MAX_CHUNKS`。旧名は読まれず既定の上限が適用され、設定されていれば起動時に stderr へ警告が出る |
| `engine::sql::allowlist::ValidatedInsert` | `pub values: Vec<InsertLiteral>` | `pub rows: Vec<Vec<InsertLiteral>>`。単一行は `rows.len() == 1`。`stmt.values` を `stmt.rows[0]` へ読み替えるか `rows` を反復する |
| `engine::sql::parser::BoundInsertForm` | variant なし | 新 variant `RowBatch(Vec<BoundInsert>)` を追加。網羅的 `match` は対応を追加しないとコンパイルできない |

## Notes

- 旧 crate 名の 0.1.0 は crates.io に残る（yank はしない）が、以後は更新されない。0.2.0 以降は新名のみで公開される。
- `ValidatedInsert` / `BoundInsertForm` の変更は SQL 表層の複数行 `VALUES (...), (...)` 構文サポート（ビヘイビア ID: SQL-16、TASK-190）のためで、単一行 `INSERT` の外部観測可能な挙動（wire プロトコル応答・`wire_code`）は不変。
- プロジェクト改名は 2026-10-08（ADR `rename-to-fandhe-db`）。GitHub リポジトリは `Fandhe-AI/vector-db` から `Fandhe-AI/fandhe-db` へ改名され、旧 URL はリダイレクトされる。既存 clone は `git remote set-url origin git@github.com:Fandhe-AI/fandhe-db.git` で更新する。
- 据え置かれるもの: lib 名 `engine` / `wire_server`、bin 名 `wire-server`、submodule パス `docs/spec`、永続化 domain tag（`vector-db/op_ledger/...`・`vector-db/scram/...`。変更すると既存 redb の recovery 整合性と SCRAM ダミー応答の決定性が崩れるため）。
- 既存の他ページの crate 名表記（`fandhe-vector-db-*` / 0.1.0）は 0.1.0 時点の記述で、0.2.0 では新名に読み替える。

## Related

- [lib](./lib.md)
- [overview](./overview.md)
- [json](./json.md)
