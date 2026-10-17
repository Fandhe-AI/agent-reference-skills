---
source: https://raw.githubusercontent.com/Fandhe-AI/fandhe-db/dc888f6ea146d3078153d64a6848f5c8cf044431/Makefile
---

# Three-client e2e harness

`psql` / Python `psycopg` / Node.js `pg` の 3 クライアントを子プロセスとして駆動し、wire-server への実接続を検証する統合テストを実行する。

## Usage

```bash
make e2e-three-client
```

```bash
# make e2e-three-client の実体（Makefile より）
cargo test -p fandhe-db-wire-server --features fault-injection --test three_client_e2e -- --ignored
cargo test -p fandhe-db-wire-server --test extended_syntax_e2e -- --ignored
cargo test -p fandhe-db-wire-server --test three_client_extended_e2e -- --ignored
```

```text
crates/wire-server/tests/
  three_client_e2e.rs            # 層B本体（Rust。3クライアントを子プロセスとして起動）
  extended_syntax_e2e.rs         # USING PLAN / EXPLAIN / HINT ORDER / UDF / INSERT の層B
  three_client_extended_e2e.rs   # 拡張クエリ・型復元・バイナリ受信の層B
  three_client/psycopg_client.py
  three_client/pg_client.js
  three_client/psycopg_extended.py
  three_client/pg_extended.js
  three_client/psycopg_txn_status.py
  three_client/pg_txn_status.js
  # psql は run_psql_session ヘルパー等が直接コマンド実行するため
  # 簡易クエリ用の専用スクリプトファイルは無い
```

## Notes

- `#[ignore]` テストのため `make ci` の必須経路には含まれない。`make e2e-three-client` から明示実行する（要 `psql`・`python3`+`psycopg`・`node`+`pg`。`PSQL_BIN`/`PYTHON_BIN`/`NODE_BIN` で上書き可）
- `three_client_e2e` は `fault-injection` feature 付きでビルドされる（commit 後 panic 注入ケース用。Makefile コメントの Issue #705）
- Makefile の対象範囲は 0.1.0 から拡張されている: SCRAM・psql `\copy` 往復・複数行 INSERT と NoSQL `rows[]` パリティ（Issue #1177）、拡張クエリ・型復元・バイナリ受信（Issue #1176、`three_client_extended_e2e.rs`）、トランザクション状態遷移（Issue #943）ほか
- 子プロセスのクライアントスクリプトは `WIRE_HOST` / `WIRE_PORT` / `WIRE_USER` / `WIRE_PASSWORD` / `WIRE_SQL`（任意 `WIRE_SQL_PRELUDE`）を環境変数で受け取る。ツール未導入・スクリプト失敗は silent skip せず `panic!` で失敗させる
- TLS 版は `make e2e-three-client-tls`、NoSQL 表層の HTTP 版は `make e2e-three-client-http`（別サンプル参照）。いずれも `ci` には含まれない

## Related

- [connect-psql.md](./connect-psql.md)
- [connect-psycopg.md](./connect-psycopg.md)
- [connect-node-pg.md](./connect-node-pg.md)
- [e2e-three-client-tls.md](./e2e-three-client-tls.md)
- [e2e-three-client-http.md](./e2e-three-client-http.md)
