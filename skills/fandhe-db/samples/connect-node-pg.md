---
source: https://raw.githubusercontent.com/Fandhe-AI/fandhe-db/dc888f6ea146d3078153d64a6848f5c8cf044431/crates/wire-server/tests/three_client/pg_client.js
---

# Connect with node pg

無改造の Node.js `pg` から wire-server へ接続し、簡易クエリプロトコルで SQL を 1 文実行する。

## Usage

```js
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
  .then(() => client.query("SELECT id FROM docs ORDER BY embedding <=> '[1.0,0.0]' LIMIT 3"))
  .then((result) => {
    for (const row of result.rows) {
      console.log(Object.values(row).join("|"));
    }
    return client.end();
  })
  .then(() => process.exit(0))
  .catch((err) => {
    const suffix = err && err.code ? ` [SQLSTATE=${err.code}]` : "";
    console.error(`query failed${suffix}: ${err}`);
    process.exit(1);
  });
```

## Notes

> **警告**: `pw-alice` は upstream 公開リポジトリのテストフィクスチャであり、本番相当の認証情報を使わないこと。既定の cleartext password 認証は TLS 未構成だと平文でパスワードが流れる（`--tls-cert` / `--tls-key` または `--auth-method scram-sha-256` を検討）

- `client.query(text)` を values 引数なしで呼ぶと簡易クエリプロトコルになる。values 付きは拡張クエリプロトコルになる（別サンプル `connect-extended-query.md` 参照）
- 認証失敗時は `err.code` に SQLSTATE（例 `28P01`）が入る。upstream の `pg_client.js` は SQLSTATE に加え `err.detail`（文字列の場合）を `[DETAIL=<detail>]` として stderr へ出す
- TLS 越しの接続は `ssl: { rejectUnauthorized: false }` を渡す。upstream の `pg_client.js` は環境変数 `WIRE_SSL=no-verify` のときのみこの設定を渡す（テスト証明書の chain 検証を行わない構成。非ループバック運用では使わない）
- upstream の `pg_client.js` は環境変数 `WIRE_PRINT_COMMAND_TAG=1` のとき、結果行の後に CommandComplete のコマンドタグ（例 `UPDATE 2`。INSERT は `INSERT <oid> <rowCount>`）を 1 行出力する
- `.catch` は原文（`tests/three_client/pg_client.js`）のとおり `client.end()` を呼ばずに `process.exit(1)` する短命な子プロセス用の設計。長時間稼働するプロセスで再利用する場合は `finally` で `client.end()` を呼んでから `process.exitCode = 1` を設定すること
- 標準の node `pg` クライアントで接続できるが、SQL 面は fandhe-db の対応範囲に限定される。`upstash`（@upstash/vector の SaaS クライアント）とは別物

## Related

- [start-wire-server.md](./start-wire-server.md)
- [connect-psql.md](./connect-psql.md)
- [connect-extended-query.md](./connect-extended-query.md)
