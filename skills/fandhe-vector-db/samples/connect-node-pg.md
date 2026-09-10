---
source: https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/crates/wire-server/tests/three_client/pg_client.js
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

> **警告**: wire-server は 0.1.0 時点で cleartext password 認証のみ・TLS 未実装（`references/wire-server/auth.md` 参照）。`pw-alice` は upstream 公開リポジトリのテストフィクスチャであり、本番相当の認証情報を使わないこと

- `client.query(text)` を values 引数なしで呼ぶ（values を渡すと拡張クエリプロトコルになり、拡張クエリ未対応の本サーバーには使えない）
- 認証失敗時は `err.code` に SQLSTATE（例 `28P01`）が入る
- `.catch` は原文（`tests/three_client/pg_client.js`）のとおり `client.end()` を呼ばずに `process.exit(1)` する（プロセス終了で TCP 接続も閉じる前提の、短命な子プロセス用の設計）。ワンショットスクリプトではなく長時間稼働するプロセス内でこのパターンを再利用する場合は、`process.exit()` の代わりに `finally` ブロックで `client.end()` を呼んでから `process.exitCode = 1` を設定し、接続を残さないようにすること
- 標準の node `pg` クライアントで接続できるが、SQL 面は MVP サブセット（C1〜C4 相当）に限定される。`upstash`（@upstash/vector の SaaS クライアント）とは別物

## Related

- [start-wire-server.md](./start-wire-server.md)
- [connect-psql.md](./connect-psql.md)
