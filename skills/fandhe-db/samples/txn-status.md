---
source: https://raw.githubusercontent.com/Fandhe-AI/fandhe-db/dc888f6ea146d3078153d64a6848f5c8cf044431/crates/wire-server/tests/three_client/psycopg_txn_status.py
---

# Transaction status

無改造の psycopg / node pg で、明示トランザクションの `ReadyForQuery` 状態（`I` / `T` / `E`）の遷移を観測する。

## Usage

```python
# psycopg: autocommit=False で接続すると、IDLE のときだけ暗黙の BEGIN が送られる
import psycopg
from psycopg.pq import TransactionStatus

names = {
    TransactionStatus.IDLE: "IDLE",
    TransactionStatus.INTRANS: "INTRANS",
    TransactionStatus.INERROR: "INERROR",
}

with psycopg.connect(
    host="127.0.0.1", port=5432, user="alice", password="pw-alice",
    dbname="irrelevant-db-name", connect_timeout=5,
) as conn:
    with psycopg.ClientCursor(conn) as cur:
        print(names[conn.info.transaction_status])   # IDLE
        cur.execute("INSERT INTO ...")                # 暗黙 BEGIN + INSERT（SQL は環境に合わせる）
        print(names[conn.info.transaction_status])   # INTRANS
        conn.commit()
        print(names[conn.info.transaction_status])   # IDLE
```

```js
// node pg: client.connection の readyForQuery イベントで状態バイトを購読する
const statuses = [];
client.connection.on("readyForQuery", (msg) => statuses.push(msg.status)); // 'I' | 'T' | 'E'

await client.connect();
await client.query("BEGIN");
// ... INSERT / SELECT ...
await client.query("COMMIT");
```

## Notes

- upstream の期待値（`three_client_e2e.rs`）: psycopg は `IDLE, INTRANS, INTRANS, IDLE, INERROR, IDLE`、node pg は `I, T, T, T, I, I, T, E, I`（BEGIN → INSERT → 別テーブル SELECT → COMMIT → 読み戻し → BEGIN → 構文エラー → ROLLBACK の各 `ReadyForQuery`）
- 同一トランザクション内で直前に書き込んだテーブル自身は読めない制約があるため、upstream は SELECT に別の・未書き込みのテーブルを使う（`docs/design/explicit-transaction.md`）
- `ReadyForQuery` の状態バイトが常に `I` だと、psycopg が 2 文目の前に `BEGIN` を再送し入れ子の BEGIN（`25001`）になる。この不具合クラスの検出が目的
- node pg は公開の transaction status API を持たないため、内部 `Connection` の `readyForQuery` イベントを購読する（ドライバのソースは変更しない）。`BEGIN` / `COMMIT` / `ROLLBACK` は明示送信する
- 上記スニペットは `psycopg_txn_status.py` / `pg_txn_status.js` の最小化。upstream は `INSERT` に `USING OPERATION_ID` を付け、SQL を環境変数 `WIRE_TXN_*` で渡す

## Related

- [connect-psycopg.md](./connect-psycopg.md)
- [connect-node-pg.md](./connect-node-pg.md)
- [e2e-three-client.md](./e2e-three-client.md)
