---
source: https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/docs/design/three-client-e2e-harness.md
---

# Three-client e2e harness

`psql` / Python `psycopg` / Node.js `pg` の 3 クライアントを子プロセスとして駆動し、wire-server への実接続を検証する統合テストを実行する。

## Usage

```bash
make e2e-three-client
```

```bash
# make e2e-three-client の実体（Makefile より）
cargo test -p fandhe-vector-db-wire-server --test three_client_e2e -- --ignored
cargo test -p fandhe-vector-db-wire-server --test extended_syntax_e2e -- --ignored
```

```text
crates/wire-server/tests/
  three_client_e2e.rs          # 層B本体（Rust。3クライアントを子プロセスとして起動）
  extended_syntax_e2e.rs       # USING PLAN / EXPLAIN / HINT ORDER / UDF / INSERT の層B
  three_client/psycopg_client.py
  three_client/pg_client.js
  # psql は run_psql_session ヘルパーが直接コマンド実行するため
  # 専用スクリプトファイルは無い
```

## Notes

- `#[ignore]` テストのため `make ci` の必須経路には含まれない。`make e2e-three-client` から明示実行する（要 `psql`・`python3`+`psycopg`・`node`+`pg`。`PSQL_BIN`/`PYTHON_BIN`/`NODE_BIN` で上書き可）
- 層 A（`tests/wire1_simple_query.rs` 等、生バイトの wire クライアント）が `make ci` で常時回帰保護し、層 B（本ハーネス）は無改造クライアント経由の追加検証を担う
- 子プロセスの `psycopg_client.py` / `pg_client.js` は `WIRE_HOST` / `WIRE_PORT` / `WIRE_USER` / `WIRE_PASSWORD` / `WIRE_SQL`（任意 `WIRE_SQL_PRELUDE`）を環境変数で受け取る。ツール未導入・スクリプト失敗は silent skip せず `panic!` で失敗させる
- CI の必須チェックには含めない（psql・psycopg・pg の導入自動化が未整備なため。`docs/design/three-client-e2e-harness.md` 参照）

## Related

- `samples/connect-psql.md`
- `samples/connect-psycopg.md`
- `samples/connect-node-pg.md`
