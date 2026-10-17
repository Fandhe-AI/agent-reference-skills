---
source: https://raw.githubusercontent.com/Fandhe-AI/fandhe-db/dc888f6ea146d3078153d64a6848f5c8cf044431/crates/wire-server/tests/three_client/pg_extended.js
---

# Connect with extended query protocol

無改造の node `pg` / Python `psycopg` / `psql` から、`$n` 束縛付きの拡張クエリプロトコル（Parse / Describe / Bind / Execute）で SQL を実行する。

## Usage

```js
// node pg: values 付きの query は拡張クエリプロトコルで送られる
const pg = require("pg");

const client = new pg.Client({
  host: "127.0.0.1",
  port: 5432,
  user: "alice",
  password: "pw-alice",
  database: "irrelevant-db-name",
  connectionTimeoutMillis: 5000,
});

client
  .connect()
  .then(() =>
    client.query({
      text: "SELECT id, lang FROM docs WHERE lang = $1 ORDER BY embedding <=> $2 LIMIT 3",
      values: ["ja", "[1.0,0.0]"],
    }),
  )
  .then((result) => {
    for (const row of result.rows) console.log(Object.values(row).join("|"));
    return client.end();
  })
  .then(() => process.exit(0));
```

```python
# psycopg: RawCursor は $n プレースホルダをそのまま SQL に書ける（pg_extended 相当の psycopg_extended.py と同じ構成）
import psycopg

with psycopg.connect(
    host="127.0.0.1", port=5432, user="alice", password="pw-alice",
    dbname="irrelevant-db-name", autocommit=True, connect_timeout=5,
) as conn:
    with psycopg.RawCursor(conn) as cur:
        cur.execute(
            "SELECT id, lang FROM docs WHERE lang = $1 ORDER BY embedding <=> $2 LIMIT 3",
            ["ja", "[1.0,0.0]"],
        )
        if cur.description is not None:
            for row in cur.fetchall():
                print("|".join(str(v) for v in row))
```

```bash
# psql: -c はメタコマンドと混在できないため stdin へ \bind 付きで流す
echo "SELECT id, lang FROM docs WHERE lang = \$1 ORDER BY embedding <=> \$2 LIMIT 3 \\bind 'ja' '[1.0,0.0]' \\g" | \
  PGPASSWORD=pw-alice psql -h 127.0.0.1 -p <port> -U alice -d irrelevant-db-name -X -w -q -At -F '|'
```

## Notes

> **警告**: `pw-alice` は upstream のテストフィクスチャ。本番相当の認証情報を使わないこと

- 拡張クエリは 0.2.0 の wire-server で対応済み（WIRE-11・WIRE-12。0.1.0 では未対応）。`$n` の受理位置は限定され、`hybrid_rrf` の関数引数（C4）には `$n` を置けず `42601` で拒否される。C4 はリテラルのままパラメータ 0 個の拡張プロトコルで送る
- パラメータ 0 個でも拡張プロトコルを強制するには、node pg は `queryMode: "extended"`、psycopg は `prepare=True`、psql は `\bind \g` を使う
- `id` 列は numeric（OID 1700）でバイナリ結果非対応（`0A000`）。ネイティブ型はドライバ依存（psycopg は `Decimal`、node pg は `string`）
- バイナリ結果は psycopg の `binary=True` / node pg の `binary: true` で要求できる。node pg は `bytea(17)`・`uuid(2950)` のバイナリ parser を持たないため `pg.types.setTypeParser` で登録する。node pg はバイナリ DataRow を UTF-8 文字列として読むため、0x80 以上のバイトを含む値は壊れる（ドライバ側の制約）。psql は結果のバイナリ受信モードを持たない
- 上記スニペットは upstream の `pg_extended.js` / `psycopg_extended.py` / `three_client_extended_e2e.rs` の構成を最小化したもの。upstream のスクリプトは環境変数（`WIRE_PARAMS` / `WIRE_PARAMS_INT` / `WIRE_BINARY` / `WIRE_EXTENDED_NOPARAM`）で駆動する
- 簡易クエリ（values なし）は `connect-node-pg.md` / `connect-psycopg.md`

## Related

- [connect-node-pg.md](./connect-node-pg.md)
- [connect-psycopg.md](./connect-psycopg.md)
- [e2e-three-client.md](./e2e-three-client.md)
