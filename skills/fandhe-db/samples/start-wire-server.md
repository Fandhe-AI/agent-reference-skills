---
source: https://raw.githubusercontent.com/Fandhe-AI/fandhe-db/dc888f6ea146d3078153d64a6848f5c8cf044431/README.md
---

# Start wire-server

`fandhe-db-wire-server` バイナリを起動し、PostgreSQL wire protocol v3 互換で接続を受け付ける。

## Usage

```bash
cargo run -p fandhe-db-wire-server -- --users <ユーザーストアのパス> --db <redb ファイルのパス> \
  [--bind 127.0.0.1:5432] [--surface sql|nosql] \
  [--search-engine default|hnsw|hnsw_f16|hnsw_i8] \
  [--hnsw-full-scan-ratio <num>/<den>] \
  [--hnsw-acorn-max-visible-ratio <num>/<den>] \
  [--hnsw-sparse-visited-max <N>] \
  [--hnsw-scope all|declared] \
  [--durability immediate|none] \
  [--max-dml-affected-rows <1-1000000>] [--max-insert-rows <1-1000000>] \
  [--batch-max-files <1-1000000>] \
  [--partitioned-dml-chunk-rows <1-1000000>] [--partitioned-dml-scan-budget <1-1000000>] \
  [--partitioned-dml-max-hold-ms <100-5000>] \
  [--partitioned-dml-max-jobs-per-tenant <1-64>] [--partitioned-dml-max-jobs <1-64>] \
  [--partitioned-dml-max-interrupted-records <1-1000000>] \
  [--ddl-allowed-users <user1>[,<user2>...]] \
  [--auth-method cleartext|scram-sha-256] \
  [--scram-mock-key-file <path>] \
  [--tls-cert <pem> --tls-key <pem> [--tls-mode require|allow] \
   [--tls-scram-channel-binding enable|disable]]
```

## Notes

- `--users`・`--db` はいずれも必須（省略時は匿名ログイン・匿名 DB を暗黙生成せず fail-closed で起動を拒否する）
- `--bind` 省略時は `127.0.0.1:5432`。psql・psycopg・node pg から無改造で cleartext password 認証つき接続できる
- `--surface` は `sql`（既定。PostgreSQL wire）と `nosql`（HTTP/1.1 最小サブセット）の排他選択。不正な値・値欠落・重複指定は fail-closed で起動エラー
- `--auth-method scram-sha-256` は全ユーザーの SCRAM 検証子（`wire-server hash-password --with-scram-sha-256` で生成）と `--scram-mock-key-file`（32 バイト以上）が必須で、`--surface nosql` とは併用できない
- `--tls-cert` / `--tls-key` は両方揃って初めて有効。`--tls-mode` は未指定時 `require`（平文 StartupMessage を `08P01` で拒否）、`allow` は平文も受理するため loopback 限定のまま。`--tls-scram-channel-binding` の既定は `disable`
- `--ddl-allowed-users` 未指定では全ユーザーの DDL（`CREATE TABLE` 等）が `42501` で拒否される
- `--search-engine` 未指定または `default` は brute-force のまま不変。`--hnsw-full-scan-ratio` / `--hnsw-acorn-max-visible-ratio` / `--hnsw-sparse-visited-max` は `hnsw` / `hnsw_f16` / `hnsw_i8` のときのみ指定できる。`--hnsw-scope`（`all` 既定 / `declared`）は HNSW opt-in が無効な構成では参照されず、起動エラーにもならない
- 本サンプルは `fandhe-db-wire-server` の起動手順。`upstash`（@upstash/vector の SaaS クライアント）・`supabase`（pgvector 拡張）とは別物
- バージョン差異: 0.1.0 では crate 名が `fandhe-vector-db-wire-server` で、`--surface` / `--auth-method` / `--tls-*` / `--ddl-allowed-users` 等は README の Usage に無かった

## Related

- [main-cli.md](../references/wire-server/main-cli.md)
