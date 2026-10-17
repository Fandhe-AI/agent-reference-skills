---
source: https://raw.githubusercontent.com/Fandhe-AI/fandhe-db/dc888f6ea146d3078153d64a6848f5c8cf044431/crates/wire-server/tests/three_client/psycopg_client.py
---

# Connect with psycopg

無改造の Python `psycopg` から wire-server へ接続し、簡易クエリプロトコルで SQL を 1 文実行する。

## Usage

```python
import psycopg

with psycopg.connect(
    host="127.0.0.1",
    port=5432,
    user="alice",
    password="pw-alice",
    dbname="irrelevant-db-name",
    autocommit=True,
    connect_timeout=5,
) as conn:
    with psycopg.ClientCursor(conn) as cur:
        cur.execute("SELECT id FROM docs ORDER BY embedding <=> '[1.0,0.0]' LIMIT 3")
        if cur.description is not None:
            for row in cur.fetchall():
                print("|".join(str(value) for value in row))
```

## Notes

> **警告**: `pw-alice` は upstream 公開リポジトリのテストフィクスチャであり、本番相当の認証情報を使わないこと。既定の cleartext password 認証は TLS 未構成だと平文でパスワードが流れる（`--tls-cert` / `--tls-key` または `--auth-method scram-sha-256` を検討）

- `autocommit=True` は簡易クエリ経路の各文を独立に実行するために使う。非 autocommit だと psycopg が最初の文の前に暗黙の `BEGIN` を送り、各文が明示トランザクション内で実行される（`BEGIN` は SQL-31 で受理されるが、DDL は `0A000`、分割実行 DML はトランザクション内で拒否される）
- `psycopg.ClientCursor` は SQL をクライアント側で文字列合成し簡易クエリプロトコル（`Q` メッセージ）で送る。既定の `Cursor` はサーバーサイドバインド（Parse/Bind/Execute）を使う。拡張クエリは 0.2.0 で対応済み（別サンプル `connect-extended-query.md` 参照）
- `INSERT` 等 `CommandComplete` のみを返す文は `cur.description` が `None` になるため、`fetchall()` の前に確認する
- TLS 越しは `psycopg.connect(..., sslmode="require")` を追加する。upstream の `psycopg_client.py` は環境変数 `WIRE_SSLMODE`（`disable` / `allow` / `prefer` / `require` / `verify-ca` / `verify-full`）で渡す。`WIRE_PRINT_COMMAND_TAG=1` で `cur.statusmessage`（例 `UPDATE 2`）を出力し、失敗時は `[SQLSTATE=...]` と `[DETAIL=...]`（`e.diag.message_detail`）を stderr へ出す
- 標準の psycopg クライアントで接続できるが、SQL 面は fandhe-db の対応範囲に限定される。`supabase`（pgvector 拡張）とは別物

## Related

- [start-wire-server.md](./start-wire-server.md)
- [connect-psql.md](./connect-psql.md)
- [connect-extended-query.md](./connect-extended-query.md)
