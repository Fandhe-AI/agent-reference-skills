---
source: https://docs.rs/crate/fandhe-db-wire-server/0.2.0/source/src/ddl_permission_opt.rs
---

# ddl_permission_opt

`wire-server` バイナリ（`main.rs`）が起動時に受け取る `--ddl-allowed-users` opt-in CLI 引数の閉じた検証パーサ（Issue #902・SQL-23・TASK-203。`CREATE TABLE`（Issue #899・TASK-202）も同じ権限フラグを共有する単一の判定点）。`engine::sql::mode::SessionState::allow_ddl`（`DROP TABLE` / `CREATE TABLE` 分岐が `sql::ddl::require_ddl_permission` で参照）へ untrusted な CLI 文字列から到達する唯一の入口。

## Signature / Usage

~~~rust,ignore
pub const FLAG: &str = "--ddl-allowed-users";

pub fn parse(raw: &str) -> Result<Vec<String>, String>
~~~

## Options / Props

| 入力 | 結果 |
|------|------|
| `alice` | `Ok(["alice"])` |
| `alice,bob` | `Ok(["alice", "bob"])` |
| 空文字列全体 | `Err`（フラグを指定するなら少なくとも 1 人を挙げる契約） |
| 空要素（`alice,,bob`・先頭または末尾のカンマ） | `Err` |
| 重複要素（`alice,alice`） | `Err` |
| 空白入り（` alice`） | trim せずそのまま 1 要素として通す |

## Notes

- 本モジュールはカンマ区切り username 列挙のパースと重複・空要素の fail-closed 拒否まで。列挙した username が `--users` のユーザーストアに実在するかは `auth::UserStore::with_ddl_allowed_users` が起動時に 1 回だけ検証する（未知ユーザーの指定を黙って無視しない）。
- 未指定は DDL 実行権限を持つユーザーを 0 人のまま維持する（全 DDL 文が `42501` で拒否される既定。`sql::ddl::require_ddl_permission` の doc 参照）。
- 要素は trim しない（厳密一致のみ受理）。空白入り username を許容すると `--users` ファイル側と黙って不一致になる事故を防げないため。

## Related

- [auth.md](./auth.md)
- [auth-method-opt.md](./auth-method-opt.md)
- [main-cli.md](./main-cli.md)
