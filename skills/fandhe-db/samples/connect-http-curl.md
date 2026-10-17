---
source: https://raw.githubusercontent.com/Fandhe-AI/fandhe-db/dc888f6ea146d3078153d64a6848f5c8cf044431/crates/wire-server/docs/nosql-api.md
---

# Connect with curl (NoSQL surface)

`--surface nosql` で起動した wire-server へ curl で接続し、セッション発行・検索・セッション終了を行う。

## Usage

```bash
# 起動（NoSQL 表層。TLS 未構成のため loopback bind）
cargo run -p fandhe-db-wire-server -- --users <ユーザーストア> --db <redb ファイル> --surface nosql
```

```sh
# 1) セッション発行
TOKEN=$(curl -s -X POST http://127.0.0.1:5432/v1/session \
  -H 'Content-Type: application/json' \
  -d '{"user":"alice","password":"pw-alice"}' | \
  sed -n 's/.*"token":"\([^"]*\)".*/\1/p')

# 2) 検索
curl -s -X POST http://127.0.0.1:5432/v1/query \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"op":"search","table":"docs","vector":[0.1,0.2,0.3,0.4],"limit":10}'

# 3) セッション終了
curl -s -X POST http://127.0.0.1:5432/v1/session/close \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' -d '{}'
```

## Notes

> **警告**: `alice` / `pw-alice` は upstream のテストと同じダミー資格情報の一例。実運用では `--users` で構成したストアの実クレデンシャルを使う

- `/v1/query` は `Authorization: Bearer` 検証を通過した要求のみ受理する。欠落・重複・スキーム不一致・不正・失効済み・二重 close はいずれも `wire_code` `28000`（HTTP 401）に集約される
- クライアント自己申告の `tenant_id` 相当（JSON の未知キー・ヘッダ・パス位置）は `42601` で拒否され、テナント文脈はセッションから導出される
- `op` は閉じた語彙 `search` / `scan` / `aggregate` / `insert` / `update` / `delete` のみ。語彙外（DDL・UDF・トランザクション制御）は `0A000`（HTTP 501）
- `--surface nosql` では SQL wire のリスナーは bind されず、`--auth-method scram-sha-256` とは併用できない
- curl 例は `nosql-api.md` の「curl 例」節。ここでは SQL 表層（psql 等）ではなく HTTP/1.1 表層を扱う

## Related

- [start-wire-server.md](./start-wire-server.md)
- [e2e-three-client-http.md](./e2e-three-client-http.md)
